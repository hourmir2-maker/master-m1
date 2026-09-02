import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { 
      studentName, 
      coachingType, 
      subject, 
      moduleTitle, 
      customMessage,
      recipient = 'both',
      studentTelegramId = ''
    } = await req.json()

    const botToken = process.env.PARENT_TELEGRAM_BOT_TOKEN
    const parentChatId = process.env.PARENT_TELEGRAM_CHAT_ID
    const studentChatId = studentTelegramId || process.env.STUDENT_TELEGRAM_CHAT_ID || ''

    if (!botToken || !parentChatId) {
      console.warn('[Telegram Coaching] Missing bot token or parent chat id environment variables.')
      return NextResponse.json({ ok: false, error: 'Telegram configuration missing' }, { status: 500 })
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

    const targetChatIds: string[] = []

    if ((recipient === 'parent' || recipient === 'both') && parentChatId) {
      targetChatIds.push(parentChatId)
    }

    if ((recipient === 'student' || recipient === 'both') && studentChatId) {
      targetChatIds.push(studentChatId)
    }

    // Dispatch messages
    let atLeastOneSuccess = false
    if (botToken && targetChatIds.length > 0) {
      for (const chatId of targetChatIds) {
        try {
          const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: messageText,
              parse_mode: 'HTML'
            })
          })
          if (res.ok) atLeastOneSuccess = true
        } catch (err) {
          console.warn(`Error sending to chatId ${chatId}:`, err)
        }
      }
    } else {
      atLeastOneSuccess = true
    }

    const questPayload = {
      id: 'quest_' + Date.now(),
      studentName: studentName || 'น้องฟอร์จูน',
      coachingType,
      typeTitle,
      emoji,
      subject: subject || 'math',
      message: customMessage,
      createdAt: now.toISOString(),
      senderName: 'คุณพ่อไพโรจน์ มากแก้ว'
    }

    return NextResponse.json({ 
      success: atLeastOneSuccess, 
      sentCount: targetChatIds.length,
      quest: questPayload 
    })
  } catch (error: any) {
    console.error('Error sending coaching Telegram:', error)
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}
