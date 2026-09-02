/**
 * MASTER ม.1 — Weekly Telegram Digest & Learning Progress Telemetry
 * ระบบสรุปรายงานการเรียนรู้ประจำสัปดาห์ (Weekly Report Card) ส่งตรงเข้า Telegram ผู้ปกครอง
 */

import { createClient } from '@/lib/supabase/server'

interface WeeklyStats {
  studentName: string
  targetSchool: string
  lessonsCompletedWeek: number
  totalLessonsAllTime: number
  avgScoreWeek: number
  totalMinutesWeek: number
  isVip: boolean
  strongestSubject: string
  weakestSubject: string
  coachingMessage: string
}

export async function sendWeeklyTelegramDigest(targetUserId?: string): Promise<{ success: boolean; message: string }> {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram token or chat ID missing')
    return { success: false, message: 'Telegram credentials missing' }
  }

  try {
    const supabase = await createClient()

    // 1. Fetch user profile
    const query = supabase.from('profiles').select('*')
    if (targetUserId) query.eq('id', targetUserId)
    const { data: profiles } = await query

    if (!profiles || profiles.length === 0) {
      return { success: false, message: 'No profiles found' }
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    for (const profile of profiles) {
      // 2. Fetch progress in last 7 days
      const { data: recentProgress } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', profile.id)
        .gte('completed_at', sevenDaysAgo)

      const { data: allProgress } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', profile.id)

      const lessonsCompletedWeek = recentProgress?.length || 0
      const totalLessonsAllTime = allProgress?.length || 0

      const scores = (recentProgress && recentProgress.length > 0)
        ? recentProgress.map(p => p.score || 0)
        : (allProgress ? allProgress.map(p => p.score || 0) : [0])

      const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / (scores.length || 1))
      const totalTimeSec = (recentProgress || []).reduce((acc, p) => acc + (p.time_spent || 0), 0)
      const totalMinutes = Math.round(totalTimeSec / 60)

      const isFortune = profile.email === 'phumrapeeft@gmail.com' || profile.full_name?.includes('ภูมิรพีร์')
      const studentName = profile.full_name || (isFortune ? 'ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)' : 'นักเรียน')
      const targetSchool = profile.school_target || (isFortune ? 'ม.1 Gifted วิทย์-คณิต สู่ เภสัชกร 💊' : 'เตรียมสอบเข้า ม.1')
      const isVip = profile.school_target === 'vip' || avgScore >= 90

      // Formulate Telegram Card
      const msg = `📊 *【รายงานสรุปพัฒนาการประจำสัปดาห์ — MASTER ม.1】*
📅 สัปดาห์สิ้นสุดวันที่: ${new Date().toLocaleDateString('th-TH', { dateStyle: 'long' })}
━━━━━━━━━━━━━━━━━━━━

👤 *ผู้เรียน:* ${studentName}
🎯 *เป้าหมาย:* ${targetSchool}
👑 *สถานะ VIP:* ${isVip ? '👑 VIP Gifted (ปลดล็อกแล้ว)' : '🌱 ระดับมาตรฐาน'}

📈 *สถิติการเรียนรู้รอบ 7 วันที่ผ่านมา:*
• 📝 แบบฝึกหัดและบทเรียนที่ทำ: *${lessonsCompletedWeek} บท* (สะสมรวม ${totalLessonsAllTime} บท)
• 🎯 คะแนนเฉลี่ยประจำสัปดาห์: *${avgScore}%*
• ⏱️ เวลาเรียนรู้สะสม: *${totalMinutes} นาที*

💡 *ข้อคิดและคำแนะนำกำลังใจจากคุณพ่อไพโรจน์:*
${
  avgScore >= 85
    ? '🌟 "ยอดเยี่ยมมากครับลูก! ผลงานสัปดาห์นี้สม่ำเสมอและมีความพร้อมสูงมาก รักษามาตรฐานนี้ไว้เพื่อก้าวสู่ห้อง Gifted อย่างมั่นใจ!"'
    : avgScore >= 70
    ? '👍 "ทำได้ดีมากครับ! ค่อยๆ ทบทวนจุดลวงในคลังข้อผิดพลาดอีกนิด จะช่วยให้คะแนนพุ่งแตะ 90%+ ได้อย่างแน่นอน!"'
    : '💪 "ความสำเร็จเกิดจากความพยายามในทุกๆ วัน ทบทวนสูตรลัด 3 วิ แล้วมาลุยด้วยกันใหม่นะลูก พ่อเป็นกำลังใจให้เสมอครับ!"'
}

━━━━━━━━━━━━━━━━━━━━
🔗 ดูแดชบอร์ดเต็มรูปแบบ: https://master-m1.vercel.app/dashboard`

      // Send to Telegram
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: msg,
          parse_mode: 'Markdown'
        })
      })
    }

    return { success: true, message: 'Weekly digest sent successfully' }
  } catch (err: any) {
    console.error('Weekly digest error:', err)
    return { success: false, message: err?.message || 'Failed to send weekly digest' }
  }
}
