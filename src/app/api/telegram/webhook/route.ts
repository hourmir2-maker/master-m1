import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { LESSONS_DATA } from '@/lib/lessons-data'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message = body.message || body.channel_post
    if (!message || !message.text) {
      return NextResponse.json({ ok: true })
    }

    const chatId = message.chat.id
    const text = (message.text || '').trim().toLowerCase()
    const botToken = process.env.PARENT_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || '8674389337:AAF-z2Xu6L6aNud9kNSTCM6-lvyO0n0ROeI'

    const sendReply = async (replyText: string) => {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: replyText,
          parse_mode: 'HTML'
        })
      })
    }

    const supabase = await createClient()

    // 1. Fetch Student Profile & Progress
    const { data: profile } = await supabase.from('profiles').select('*').eq('email', 'phumrapeeft@gmail.com').maybeSingle()
    const studentName = profile?.full_name || 'ด.ช.ภูมิรพีร์ มากแก้ว'
    const studentId = profile?.id || '4ec823eb-be30-4e1c-a709-a3382ee85491'

    const { data: progressList } = await supabase.from('progress').select('*').eq('user_id', studentId)
    const prog = progressList || []

    const mathPassed = prog.filter(p => p.subject === 'math' && p.completed)
    const sciPassed = prog.filter(p => p.subject === 'science' && p.completed)
    const engPassed = prog.filter(p => p.subject === 'english' && p.completed)

    if (text === '/start' || text === '/help') {
      const welcomeMsg = `👋 <b>สวัสดีครับคุณพ่อ! ยินดีต้อนรับสู่ระบบผู้ช่วยติดตามการเรียน MASTER ม.1</b> 🎓

👦 <b>นักเรียนในความดูแล:</b> ${studentName}
🎯 <b>เป้าหมาย:</b> ม.1 Gifted วิทย์-คณิต สู่ เภสัชกร 💊

📲 <b>คำสั่งด่วนสำหรับคุณพ่อ:</b>
• <b>/report</b> — ดูรายงานสรุปคะแนนและพัฒนาการทุกวิชา
• <b>/math</b> — ดูความก้าวหน้าวิชาคณิตศาสตร์
• <b>/science</b> — ดูความก้าวหน้าวิชาวิทยาศาสตร์
• <b>/english</b> — ดูความก้าวหน้าวิชาภาษาอังกฤษ

✨ <i>ระบบจะแจ้งเตือนเด้งเข้าแชทนี้อัตโนมัติทันทีที่น้องทำแบบฝึกหัดเสร็จครับ!</i>`
      await sendReply(welcomeMsg)
      return NextResponse.json({ ok: true })
    }

    if (text.includes('/report') || text.includes('รายงาน') || text.includes('คะแนน')) {
      const reportMsg = `📊 <b>รายงานพัฒนาการการเรียน: ${studentName}</b> 👦
━━━━━━━━━━━━━━━━━━━━
🎯 <b>เป้าหมาย:</b> ม.1 Gifted สู่คณะเภสัชศาสตร์ 💊

🔢 <b>คณิตศาสตร์:</b> ผ่านแล้ว ${mathPassed.length}/8 บท
${mathPassed.map(p => `  • ${LESSONS_DATA.math?.[p.module_id]?.title || p.module_id}: <b>${p.score}%</b>`).join('\n') || '  <i>(กำลังเตรียมตัวเริ่มบทที่ 1)</i>'}

🔬 <b>วิทยาศาสตร์:</b> ผ่านแล้ว ${sciPassed.length}/8 บท
${sciPassed.map(p => `  • ${LESSONS_DATA.science?.[p.module_id]?.title || p.module_id}: <b>${p.score}%</b>`).join('\n') || '  <i>(ฐานวิทยาศาสตร์เดิมยอดเยี่ยม 80%)</i>'}

🗣️ <b>ภาษาอังกฤษ:</b> ผ่านแล้ว ${engPassed.length}/8 บท
${engPassed.map(p => `  • ${LESSONS_DATA.english?.[p.module_id]?.title || p.module_id}: <b>${p.score}%</b>`).join('\n') || '  <i>(ระดับพื้นฐานดี 60%)</i>'}
━━━━━━━━━━━━━━━━━━━━
💡 <b>ข้อเสนอแนะ:</b> ปัจจุบันข้อสอบในระบบได้เพิ่มขึ้นเป็น <b>เท่าตัว</b> พร้อมสูตรลัด 3 วินาทีเพื่อช่วยให้น้องคำนวณไวขึ้นครับ!
🌐 <b>เปิดดูผลบนเว็บ:</b> https://master-m1.vercel.app/learning-path`

      await sendReply(reportMsg)
      return NextResponse.json({ ok: true })
    }

    if (text.includes('/math') || text.includes('คณิต')) {
      const mathMsg = `🔢 <b>ความก้าวหน้าวิชาคณิตศาสตร์: ${studentName}</b>
━━━━━━━━━━━━━━━━━━━━
• ผ่านแล้ว: <b>${mathPassed.length} จาก 8 บท</b>
${mathPassed.map(p => `✅ ${LESSONS_DATA.math?.[p.module_id]?.title || p.module_id} (ได้ ${p.score}%)`).join('\n') || '📌 แนะนำให้น้องเริ่มจากบท: <b>ตัวเลข & ห.ร.ม./ค.ร.น.</b> และ <b>เศษส่วนทศนิยม</b>'}
━━━━━━━━━━━━━━━━━━━━
💡 น้องสามารถฝึกคิดเลขเร็วสูตรลัด 3 วิ ได้ที่: https://master-m1.vercel.app/subjects/math`
      await sendReply(mathMsg)
      return NextResponse.json({ ok: true })
    }

    // Default response
    await sendReply(`สวัสดีครับคุณพ่อ พิมพ์ <b>/report</b> เพื่อดูสรุปคะแนน หรือ <b>/help</b> เพื่อดูคำสั่งทั้งหมดได้เลยครับ 😊`)
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error('Telegram Webhook error:', err)
    return NextResponse.json({ ok: true })
  }
}
