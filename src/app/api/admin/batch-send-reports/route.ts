import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Parent Chat ID mappings (chatId -> studentId or studentEmail)
const PARENT_MAP: Record<string, string> = {
  '7864027458': '4ec823eb-be30-4e1c-a709-a3382ee85491' // คุณพ่อไพโรจน์ -> น้องฟอร์จูน
}

export async function POST(req: NextRequest) {
  try {
    const botToken = process.env.PARENT_TELEGRAM_BOT_TOKEN
    const defaultParentChatId = process.env.PARENT_TELEGRAM_CHAT_ID
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://master-m1.vercel.app'

    if (!botToken || !defaultParentChatId) {
      console.warn('[Telegram Batch Reports] Missing bot token or parent chat id environment variables.')
      return NextResponse.json({ ok: false, error: 'Telegram configuration missing' }, { status: 500 })
    }

    const supabase = await createClient()

    // 1. Fetch all student profiles
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, email, school_target')
      .order('created_at', { ascending: false })

    const studentList = (profiles && profiles.length > 0) ? profiles : [
      {
        id: '4ec823eb-be30-4e1c-a709-a3382ee85491',
        full_name: 'ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)',
        email: 'phumrapeeft@gmail.com',
        school_target: 'สอบเข้า ม.1 ห้องเรียนพิเศษ Gifted / SMP / EP'
      }
    ]

    // 2. Fetch all progress records
    const { data: allProgress } = await supabase
      .from('progress')
      .select('*')
      .order('created_at', { ascending: false })

    const progressRecords = allProgress || []

    const now = new Date()
    const thaiDateStr = now.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', day: 'numeric', month: 'long', year: 'numeric' })
    const thaiTimeStr = now.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' })

    const dispatchResults: Array<{ studentName: string; chatId: string; success: boolean }> = []

    // 3. Loop through each student and send personalized report to their own parent
    for (const student of studentList) {
      const studentProgress = progressRecords.filter(p => p.user_id === student.id)
      
      const mathItems = studentProgress.filter(p => p.subject === 'math' && p.completed)
      const scienceItems = studentProgress.filter(p => p.subject === 'science' && p.completed)
      const englishItems = studentProgress.filter(p => p.subject === 'english' && p.completed)
      const thaiItems = studentProgress.filter(p => p.subject === 'thai' && p.completed)

      const calcAvg = (items: typeof studentProgress) => {
        if (items.length === 0) return null
        return Math.round(items.reduce((s, i) => s + (i.score ?? 0), 0) / items.length)
      }

      const mathAvg = calcAvg(mathItems)
      const scienceAvg = calcAvg(scienceItems)
      const englishAvg = calcAvg(englishItems)
      const thaiAvg = calcAvg(thaiItems)

      const totalDone = mathItems.length + scienceItems.length + englishItems.length + thaiItems.length
      const completionPercent = Math.round((totalDone / 56) * 100)

      // Resolve parent chat ID for this specific student
      let targetChatId = defaultParentChatId
      for (const [chatId, sId] of Object.entries(PARENT_MAP)) {
        if (sId === student.id || (student.email && sId.includes(student.email))) {
          targetChatId = chatId
          break
        }
      }

      const personalizedReportUrl = `${appUrl}/reports/print?studentId=${student.id}`

      const messageText = `📄 <b>[ใบรายงานผลการเรียนทางการ • OFFICIAL REPORT]</b>\n👦 <b>ผู้เรียน:</b> ${student.full_name || 'ผู้เรียน'}\n🎯 <b>เป้าหมาย:</b> ${student.school_target || 'ม.1 ห้องเรียนพิเศษ Gifted / SMP / EP'}\n━━━━━━━━━━━━━━━━━━━━\n📊 <b>ความคืบหน้ารวม:</b> ${totalDone}/56 บทเรียน (${completionPercent}%)\n\n<b>ผลประเมิน 4 วิชาหลัก (ข้อมูลจริงจากระบบ):</b>\n🔢 <b>คณิตศาสตร์:</b> ${mathAvg !== null ? `${mathAvg}% (${mathItems.length}/16 บท)` : 'ยังไม่เริ่ม (0/16 บท)'}\n🔬 <b>วิทยาศาสตร์:</b> ${scienceAvg !== null ? `${scienceAvg}% (${scienceItems.length}/16 บท)` : 'ยังไม่เริ่ม (0/16 บท)'}\n🇬🇧 <b>ภาษาอังกฤษ:</b> ${englishAvg !== null ? `${englishAvg}% (${englishItems.length}/16 บท)` : 'ยังไม่เริ่ม (0/16 บท)'}\n📖 <b>ภาษาไทย:</b> ${thaiAvg !== null ? `${thaiAvg}% (${thaiItems.length}/8 บท)` : 'ยังไม่เริ่ม (0/8 บท)'}\n\n💡 <b>คำแนะนำวิชาการ:</b>\n${totalDone > 0 ? 'น้องได้เริ่มต้นสะสมบทเรียนแล้ว แนะนำให้ทบทวนและฝึกทำซ้ำเพื่อยกระดับคะแนนสู่ 80%+ ก่อนเริ่มวิชาถัดไปครับ' : 'แนะนำให้น้องเริ่มทำแบบทดสอบวัดระดับ Pre-Test หรือบทเรียนระบบจำนวนบทที่ 1'}\n━━━━━━━━━━━━━━━━━━━━\n🖨️ <b>เปิดดูใบรายงานผลของน้อง / บันทึก PDF:</b>\n<a href="${personalizedReportUrl}">${personalizedReportUrl}</a>\n\n⏰ <i>ส่งตรงจากระบบ MASTER ม.1 • ${thaiDateStr} ${thaiTimeStr} น.</i>`

      if (botToken && targetChatId) {
        try {
          const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: targetChatId,
              text: messageText,
              parse_mode: 'HTML',
              disable_web_page_preview: false
            })
          })
          dispatchResults.push({
            studentName: student.full_name || 'ผู้เรียน',
            chatId: targetChatId,
            success: res.ok
          })
        } catch (err) {
          dispatchResults.push({
            studentName: student.full_name || 'ผู้เรียน',
            chatId: targetChatId,
            success: false
          })
        }
      }
    }

    const successCount = dispatchResults.filter(r => r.success).length

    return NextResponse.json({
      success: true,
      totalStudents: studentList.length,
      sentCount: successCount,
      details: dispatchResults
    })
  } catch (error: any) {
    console.error('Error in batch send reports:', error)
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}
