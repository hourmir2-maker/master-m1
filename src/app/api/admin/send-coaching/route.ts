import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { studentName, coachingType, subject, moduleTitle, customMessage } = await req.json()

    const botToken = process.env.PARENT_TELEGRAM_BOT_TOKEN || '8246219426:AAHB8IdCFMwgXG0pf3VAlAncfjp2WM_43kg'
    const parentChatId = process.env.PARENT_TELEGRAM_CHAT_ID || '7864027458'

    if (!botToken || !parentChatId) {
      return NextResponse.json({ error: 'Telegram configuration missing' }, { status: 400 })
    }

    const now = new Date()
    const thaiTimeStr = now.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' })
    const thaiDateStr = now.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', day: 'numeric', month: 'short', year: 'numeric' })

    let typeTitle = '📝 การบ้าน & ภารกิจประจำวัน'
    let emoji = '🎯'

    if (coachingType === 'cheer') {
      typeTitle = '💖 ข้อความให้กำลังใจ & ปลุกพลังจากคุณพ่อ'
      emoji = '🌟'
    } else if (coachingType === 'trap') {
      typeTitle = '⚡ เคล็ดลับระวังจุดลวง สทศ. 10 ปี'
      emoji = '⚠️'
    } else if (coachingType === 'custom') {
      typeTitle = '💬 ข้อความโค้ชชิ่งพิเศษ'
      emoji = '📢'
    }

    let detailContent = ''
    if (subject && moduleTitle) {
      detailContent = `📚 <b>วิชา:</b> ${subject}\n📖 <b>บทเรียนแนะนำ:</b> ${moduleTitle}\n`
    }

    const messageText = `${emoji} <b>[${typeTitle}]</b>\n👦 <b>สำหรับ:</b> ${studentName || 'น้องฟอร์จูน'}\n━━━━━━━━━━━━━━━━━━━━\n${detailContent}💡 <b>ข้อความ/คำแนะนำ:</b>\n${customMessage || 'ฝึกฝนวันละนิดอย่างสม่ำเสมอ พ่อเชื่อมั่นในตัวน้อง 100% ครับ!'}\n━━━━━━━━━━━━━━━━━━━━\n⏰ <i>ส่งตรงจากระบบ MASTER M.1 Admin • ${thaiDateStr} ${thaiTimeStr} น.</i>`

    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: parentChatId,
        text: messageText,
        parse_mode: 'HTML'
      })
    })

    return NextResponse.json({ success: res.ok })
  } catch (error: any) {
    console.error('Error sending coaching Telegram:', error)
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}
