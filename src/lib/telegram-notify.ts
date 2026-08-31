import { LESSONS_DATA } from './lessons-data'

/**
 * MASTER ม.1 — Automated Parent Telegram Notification System
 * ส่งผลการสอบและความก้าวหน้าของน้องฟอร์จูนเข้า Telegram คุณพ่อแบบ Real-time
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
  studentName = 'น้องฟอร์จูน',
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

  let subjectLabel = SUBJECT_EMOJIS[subject] || subject
  let moduleTitle = LESSONS_DATA[subject]?.[moduleId]?.title || moduleId

  if (subject.startsWith('onet_')) {
    const rawSub = subject.replace('onet_', '')
    subjectLabel = `🎯 สนามสอบจำลอง O-NET 2570 (${SUBJECT_EMOJIS[rawSub] || rawSub})`
    moduleTitle = `ข้อสอบเสมือนจริงตรงตาม Blueprint สทศ. (เต็ม 100 คะแนน)`
  } else if (subject.startsWith('mock_')) {
    subjectLabel = `🏆 สนามสอบจำลองเข้า ม.1 Gifted (${SUBJECT_EMOJIS[subject.replace('mock_', '')] || subject})`
    moduleTitle = `ชุดข้อสอบคัดเลือกห้องเรียนพิเศษ`
  }
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
  }
  return true
}

/**
 * ส่งผลวิเคราะห์ AI รายบุคคลจากหน้า Admin เข้า Telegram ผู้ปกครอง
 */
export async function sendAiDiagnosticTelegramNotification(analysis: {
  studentName: string
  overallReadiness: number
  gradeLevelPrediction: string
  strengths: string[]
  weaknesses: string[]
  giftedRecommendation: string
  parentCoachingTip: string
}): Promise<boolean> {
  const botToken = process.env.PARENT_TELEGRAM_BOT_TOKEN || '8246219426:AAHB8IdCFMwgXG0pf3VAlAncfjp2WM_43kg'
  const parentChatId = process.env.PARENT_TELEGRAM_CHAT_ID || '7864027458'

  if (!botToken || !parentChatId) return false

  const now = new Date()
  const thaiTimeStr = now.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' })
  const thaiDateStr = now.toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', day: 'numeric', month: 'short', year: 'numeric' })

  const strengthsList = (analysis.strengths || []).map(s => `• ${s}`).join('\n')
  const weaknessesList = (analysis.weaknesses || []).map(w => `• ${w}`).join('\n')

  const messageText = `🧠 <b>[รายงานการวินิจฉัย AI รายบุคคล] ${analysis.studentName}</b>
━━━━━━━━━━━━━━━━━━━━
🎯 <b>ดัชนีความพร้อมรวม:</b> ${analysis.overallReadiness}% (${analysis.gradeLevelPrediction})

🌟 <b>จุดแข็งโดดเด่น:</b>
${strengthsList}

⚠️ <b>จุดลวงที่ต้องระวัง/จุดที่ต้องเสริม:</b>
${weaknessesList}

🎯 <b>แผนกลยุทธ์สอบเข้าห้องพิเศษ Gifted:</b>
${analysis.giftedRecommendation}

💖 <b>ข้อคิดโค้ชชิ่งสำหรับคุณพ่อ:</b>
${analysis.parentCoachingTip}
━━━━━━━━━━━━━━━━━━━━
⏰ <i>วิเคราะห์โดย Gemini AI • ${thaiDateStr} ${thaiTimeStr} น.</i>`

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
    return res.ok
  } catch (e) {
    console.warn('Error sending diagnostic to Telegram:', e)
    return false
  }
}
