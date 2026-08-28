import { LESSONS_DATA } from './lessons-data'

/**
 * MASTER ม.1 — Automated Parent Telegram Notification System
 * ส่งผลการสอบและความก้าวหน้าของน้องภูมิรพีร์เข้า Telegram คุณพ่อแบบ Real-time
 */

interface ProgressNotificationParams {
  userId: string
  studentName?: string
  subject: string
  moduleId: string
  score: number
  timeSpent?: number
  attemptCount?: number
  prevScore?: number
}

const SUBJECT_EMOJIS: Record<string, string> = {
  math: '🔢 คณิตศาสตร์',
  science: '🔬 วิทยาศาสตร์',
  english: '🗣️ ภาษาอังกฤษ',
  thai: '🇹🇭 ภาษาไทย'
}

export async function sendParentTelegramNotification({
  userId,
  studentName = 'น้องภูมิรพีร์',
  subject,
  moduleId,
  score,
  timeSpent = 0,
  attemptCount = 1,
  prevScore = 0
}: ProgressNotificationParams): Promise<boolean> {
  const botToken = process.env.PARENT_TELEGRAM_BOT_TOKEN || '8246219426:AAHB8IdCFMwgXG0pf3VAlAncfjp2WM_43kg'
  const parentChatId = process.env.PARENT_TELEGRAM_CHAT_ID || '7864027458'

  if (!botToken) {
    console.warn('[TelegramNotify] Missing TELEGRAM_BOT_TOKEN')
    return false
  }

  const subjectLabel = SUBJECT_EMOJIS[subject] || subject
  const moduleTitle = LESSONS_DATA[subject]?.[moduleId]?.title || moduleId
  const isPassed = score >= 60
  const passBadge = score === 100 ? '🌟 คะแนนเต็ม 100% (ยอดเยี่ยมมาก!)' : score >= 80 ? '🏆 ระดับยอดเยี่ยม (80%+)' : isPassed ? '✅ ผ่านเกณฑ์มาตรฐาน' : '💪 ยังไม่ผ่าน (ต้องได้ 60%+)'

  // Growth calculation
  let growthText = ''
  if (attemptCount > 1 && prevScore > 0) {
    const diff = score - prevScore
    if (diff > 0) {
      growthText = `\n📈 <b>การพัฒนา:</b> ทำครั้งที่ ${attemptCount} (คะแนนเพิ่มขึ้น +${diff}% จากครั้งก่อน! 🚀)`
    } else if (diff === 0) {
      growthText = `\n📈 <b>การพัฒนา:</b> ทำครั้งที่ ${attemptCount} (รักษามาตรฐานคะแนนได้ดีเยี่ยม)`
    } else {
      growthText = `\n📈 <b>การพัฒนา:</b> ทำครั้งที่ ${attemptCount}`
    }
  } else {
    growthText = `\n📈 <b>การพัฒนา:</b> ฝึกทำครั้งแรก (First Attempt)`
  }

  // Format current Thai date & time
  const now = new Date()
  const thaiTimeStr = now.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' })
  const thaiDateStr = now.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', day: 'numeric', month: 'short', year: 'numeric' })

  const messageText = `🔔 <b>[รายงานผลการเรียน & พัฒนาการ] ${studentName}</b> 👦
━━━━━━━━━━━━━━━━━━━━
🎯 <b>เป้าหมาย:</b> ม.1 Gifted วิทย์-คณิต สู่ เภสัชกร 💊
📚 <b>วิชา:</b> ${subjectLabel}
📖 <b>บทเรียน:</b> ${moduleTitle}
🎯 <b>คะแนนครั้งนี้:</b> ${score}% (${passBadge})${growthText}
⏰ <b>เวลาทำเสร็จ:</b> ${thaiDateStr} | ${thaiTimeStr} น.
━━━━━━━━━━━━━━━━━━━━
💡 <i>พิมพ์ <code>/history</code> หรือ <code>/report</code> เพื่อดูเส้นทางพัฒนาการทั้งหมดได้ตลอด 24 ชม. ครับ</i>`

  // If parentChatId is available, send directly
  if (parentChatId) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: parentChatId,
          text: messageText,
          parse_mode: 'HTML'
        })
      })
      const resData = await res.json()
      if (!resData.ok) {
        // Fallback without parse_mode
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: parentChatId,
            text: messageText
          })
        })
      }
      return true
    } catch (e) {
      console.warn('[TelegramNotify] Error sending Telegram message:', e)
      return false
    }
  } else {
    console.log('[TelegramNotify] Ready to notify. Message payload:', messageText)
    return true
  }
}
