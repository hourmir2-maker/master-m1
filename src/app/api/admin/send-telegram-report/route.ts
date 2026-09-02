import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { studentName, targetSchool } = await req.json().catch(() => ({}))

    const botToken = process.env.PARENT_TELEGRAM_BOT_TOKEN
    const parentChatId = process.env.PARENT_TELEGRAM_CHAT_ID

    if (!botToken || !parentChatId) {
      console.warn('[Telegram Report] Missing bot token or parent chat id environment variables.')
      return NextResponse.json({ ok: false, error: 'Telegram configuration missing' }, { status: 500 })
    }

    const supabase = await createClient()

    // 1. Fetch real progress records from database
    const { data: progressRecords } = await supabase
      .from('progress')
      .select('*')
      .order('created_at', { ascending: false })

    const progressList = progressRecords || []

    const mathItems = progressList.filter(p => p.subject === 'math' && p.completed)
    const scienceItems = progressList.filter(p => p.subject === 'science' && p.completed)
    const englishItems = progressList.filter(p => p.subject === 'english' && p.completed)
    const thaiItems = progressList.filter(p => p.subject === 'thai' && p.completed)

    const calcAvg = (items: typeof progressList) => {
      if (items.length === 0) return null
      return Math.round(items.reduce((s, i) => s + (i.score ?? 0), 0) / items.length)
    }

    const mathAvg = calcAvg(mathItems)
    const scienceAvg = calcAvg(scienceItems)
    const englishAvg = calcAvg(englishItems)
    const thaiAvg = calcAvg(thaiItems)

    const totalDone = mathItems.length + scienceItems.length + englishItems.length + thaiItems.length
    const completionPercent = Math.round((totalDone / 56) * 100)

    const now = new Date()
    const thaiDateStr = now.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', day: 'numeric', month: 'long', year: 'numeric' })
    const thaiTimeStr = now.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' })

    const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://master-m1.vercel.app'}/reports/print`

    const messageText = `📄 <b>[ใบรายงานผลการเรียนทางการ • OFFICIAL REPORT]</b>\n👦 <b>ผู้เรียน:</b> ${studentName || 'ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)'}\n🎯 <b>เป้าหมาย:</b> ${targetSchool || 'ม.1 ห้องเรียนพิเศษ Gifted / SMP / EP'}\n━━━━━━━━━━━━━━━━━━━━\n📊 <b>ความคืบหน้ารวม:</b> ${totalDone}/56 บทเรียน (${completionPercent}%)\n\n<b>ผลประเมิน 4 วิชาหลัก (ข้อมูลจริงจากระบบ):</b>\n🔢 <b>คณิตศาสตร์:</b> ${mathAvg !== null ? `${mathAvg}% (${mathItems.length}/16 บท)` : 'ยังไม่เริ่ม (0/16 บท)'}\n🔬 <b>วิทยาศาสตร์:</b> ${scienceAvg !== null ? `${scienceAvg}% (${scienceItems.length}/16 บท)` : 'ยังไม่เริ่ม (0/16 บท)'}\n🇬🇧 <b>ภาษาอังกฤษ:</b> ${englishAvg !== null ? `${englishAvg}% (${englishItems.length}/16 บท)` : 'ยังไม่เริ่ม (0/16 บท)'}\n📖 <b>ภาษาไทย:</b> ${thaiAvg !== null ? `${thaiAvg}% (${thaiItems.length}/8 บท)` : 'ยังไม่เริ่ม (0/8 บท)'}\n\n💡 <b>คำแนะนำจากระบบวิชาการ:</b>\n${totalDone > 0 ? 'น้องได้เริ่มต้นทำแบบฝึกหัดวิชาคณิตศาสตร์แล้ว แนะนำให้ทบทวนและฝึกทำซ้ำเพื่อยกระดับคะแนนสู่ 80%+ ก่อนเริ่มวิชาถัดไปครับ' : 'แนะนำให้น้องเริ่มทำแบบทดสอบวัดระดับ Pre-Test หรือบทเรียนระบบจำนวนบทที่ 1'}\n━━━━━━━━━━━━━━━━━━━━\n🖨️ <b>เปิดดูใบรายงานผลฉบับเต็ม / บันทึก PDF:</b>\n<a href="${reportUrl}">${reportUrl}</a>\n\n⏰ <i>ออกรายงานวันที่ ${thaiDateStr} เวลา ${thaiTimeStr} น.</i>`

    // Dispatch to Telegram
    let sendSuccess = false
    if (botToken && parentChatId) {
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: parentChatId,
          text: messageText,
          parse_mode: 'HTML',
          disable_web_page_preview: false
        })
      })
      sendSuccess = res.ok
    }

    return NextResponse.json({ success: sendSuccess })
  } catch (error: any) {
    console.error('Error sending telegram report:', error)
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}
