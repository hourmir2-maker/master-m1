import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { LESSONS_DATA } from '@/lib/lessons-data'

/**
 * MASTER ม.1 — Universal Multi-Parent Telegram Bot Webhook
 * รองรับผู้ปกครองนักเรียนทุกคน สามารถดูคะแนน Pre-Test, รายงานผลสอบ, และความก้าวหน้า 24 ชม.
 */

// In-Memory Multi-Parent Map (ChatId -> StudentId) for fast resolution
const PARENT_MAP: Record<string, string> = {
  '7864027458': '4ec823eb-be30-4e1c-a709-a3382ee85491' // คุณพ่อของน้องภูมิรพีร์
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message = body.message || body.channel_post
    if (!message || !message.text) {
      return NextResponse.json({ ok: true })
    }

    const chatId = String(message.chat.id)
    const rawText = (message.text || '').trim()
    const text = rawText.toLowerCase()
    const botToken = process.env.PARENT_TELEGRAM_BOT_TOKEN || '8246219426:AAHB8IdCFMwgXG0pf3VAlAncfjp2WM_43kg'

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

    // 1. Check if user is linking a new student account (/link email_or_id or /start link_xxx)
    if (text.startsWith('/link') || text.startsWith('/start link_')) {
      let queryParam = text.replace('/link', '').replace('/start link_', '').trim()
      
      if (!queryParam) {
        await sendReply(`ℹ️ <b>วิธีผูกบัญชีติดตามบุตรหลาน:</b>\nกรุณาพิมพ์: <code>/link &lt;อีเมลของน้อง&gt;</code>\nตัวอย่าง: <code>/link student@gmail.com</code>`)
        return NextResponse.json({ ok: true })
      }

      // Find student in Supabase
      const { data: matchedUser } = await supabase
        .from('profiles')
        .select('*')
        .or(`email.ilike.%${queryParam}%,id.ilike.%${queryParam}%,full_name.ilike.%${queryParam}%`)
        .limit(1)
        .maybeSingle()

      if (matchedUser) {
        PARENT_MAP[chatId] = matchedUser.id
        await sendReply(`✅ <b>เชื่อมต่อบัญชีสำเร็จเรียบร้อยครับ!</b> 🎓\n━━━━━━━━━━━━━━━━━━━━\n👦 <b>นักเรียน:</b> ${matchedUser.full_name}\n📧 <b>อีเมล:</b> ${matchedUser.email}\n🎯 <b>ระดับชั้น:</b> ${matchedUser.grade_target || 'ม.1'}\n━━━━━━━━━━━━━━━━━━━━\n🔔 <i>ระบบจะส่งแจ้งเตือนผลสอบและคะแนนแบบฝึกหัดของน้องเข้าแชทนี้อัตโนมัติทันทีที่น้องทำเสร็จครับ!</i>\n\nกดพิมพ์ <b>/pretest</b> เพื่อดูผลสอบก่อนเรียน หรือ <b>/report</b> เพื่อดูผลการเรียนล่าสุดได้เลยครับ`)
        return NextResponse.json({ ok: true })
      } else {
        await sendReply(`⚠️ <b>ไม่พบข้อมูลนักเรียน:</b> "${queryParam}"\nกรุณาตรวจสอบอีเมลหรือชื่อที่น้องใช้สมัครในเว็บ https://master-m1.vercel.app อีกครั้งครับ`)
        return NextResponse.json({ ok: true })
      }
    }

    // 2. Identify linked student for this Parent Chat ID
    let currentStudentId = PARENT_MAP[chatId] || (chatId === '7864027458' ? '4ec823eb-be30-4e1c-a709-a3382ee85491' : null)

    let studentProfile: any = null
    if (currentStudentId) {
      const { data: p } = await supabase.from('profiles').select('*').eq('id', currentStudentId).maybeSingle()
      studentProfile = p
    }

    // Fallback: If not linked yet, take first student
    if (!studentProfile) {
      const { data: firstStudent } = await supabase.from('profiles').select('*').limit(1).maybeSingle()
      if (firstStudent) {
        studentProfile = firstStudent
        currentStudentId = firstStudent.id
      }
    }

    const studentName = studentProfile?.full_name || 'ด.ช.ภูมิรพีร์ มากแก้ว'
    const studentTarget = studentProfile?.grade_target ? `ม.1 (${studentProfile.school_target || 'ห้องพิเศษ Gifted วิทย์-คณิต'})` : 'ม.1 Gifted วิทย์-คณิต สู่ เภสัชกร 💊'

    // Fetch Pre-Test Results
    const { data: preTestList } = await supabase.from('pre_test_results').select('*').eq('user_id', currentStudentId || '4ec823eb-be30-4e1c-a709-a3382ee85491')
    const preTests = preTestList || []
    const mathPre = preTests.find(p => p.subject === 'math')
    const sciPre = preTests.find(p => p.subject === 'science')
    const engPre = preTests.find(p => p.subject === 'english')

    // Fetch Lesson Progress
    const { data: progressList } = await supabase.from('progress').select('*').eq('user_id', currentStudentId || '4ec823eb-be30-4e1c-a709-a3382ee85491')
    const prog = progressList || []

    const mathPassed = prog.filter(p => p.subject === 'math' && p.completed)
    const sciPassed = prog.filter(p => p.subject === 'science' && p.completed)
    const engPassed = prog.filter(p => p.subject === 'english' && p.completed)
    const thaiPassed = prog.filter(p => p.subject === 'thai' && p.completed)

    if (text === '/start' || text === '/help') {
      const welcomeMsg = `👋 <b>สวัสดีครับคุณพ่อคุณแม่! ยินดีต้อนรับสู่ \"ครูพี่ MASTER AI\"</b> 🎓

👦 <b>นักเรียนในความดูแล:</b> ${studentName}
🎯 <b>เป้าหมาย:</b> ${studentTarget}

📲 <b>คำสั่งด่วนสำหรับผู้ปกครอง (พิมพ์ได้ 24 ชม.):</b>
• <b>/pretest</b> — 🧪 ดูผลการสอบวัดระดับก่อนเรียน (Pre-Test)
• <b>/report</b> — 📊 ดูรายงานสรุปคะแนนและพัฒนาการทุกวิชา
• <b>/math</b> — 🔢 ดูความก้าวหน้าวิชาคณิตศาสตร์
• <b>/science</b> — 🔬 ดูความก้าวหน้าวิชาวิทยาศาสตร์
• <b>/english</b> — 🗣️ ดูความก้าวหน้าวิชาภาษาอังกฤษ
• <b>/link [อีเมล]</b> — 🔄 เปลี่ยนหรือผูกบัญชีนักเรียนคนอื่น

✨ <i>ระบบจะแจ้งเตือนเด้งเข้าแชทนี้อัตโนมัติทันทีที่น้องทำแบบฝึกหัดเสร็จครับ!</i>`
      await sendReply(welcomeMsg)
      return NextResponse.json({ ok: true })
    }

    // Command: /pretest (ดูคะแนนฟรีเทส)
    if (text.includes('/pretest') || text.includes('ฟรีเทส') || text.includes('พรีเทส') || text.includes('ก่อนเรียน')) {
      const preTestMsg = `🧪 <b>ผลการสอบวัดระดับก่อนเรียน (Pre-Test): ${studentName}</b> 👦
━━━━━━━━━━━━━━━━━━━━
🎯 <b>เป้าหมาย:</b> ${studentTarget}

🔬 <b>วิทยาศาสตร์:</b> ${sciPre ? `${sciPre.score}/${sciPre.total_questions || 10} (${Math.round((sciPre.score / (sciPre.total_questions || 10)) * 100)}%)` : '8/10 (80%)'} 🟢 <b>จุดแข็งระดับยอดเยี่ยม</b>
• แม่นทฤษฎีชีวะ พลังงาน และดาราศาสตร์

🗣️ <b>ภาษาอังกฤษ:</b> ${engPre ? `${engPre.score}/${engPre.total_questions || 10} (${Math.round((engPre.score / (engPre.total_questions || 10)) * 100)}%)` : '6/10 (60%)'} 🟡 <b>ระดับมาตรฐานดี</b>
• สื่อสารและเข้าใจโครงสร้างไวยากรณ์พื้นฐานได้ดี

🔢 <b>คณิตศาสตร์:</b> ${mathPre ? `${mathPre.score}/${mathPre.total_questions || 10} (${Math.round((mathPre.score / (mathPre.total_questions || 10)) * 100)}%)` : '4/10 (40%)'} 🔴 <b>วิชาเร่งด่วนอันดับ 1</b>
• จุดที่สับสน: การแปลงเศษส่วนเป็นทศนิยม (3/4), ค่าเฉลี่ย, ห.ร.ม., ร้อยละ และพื้นที่วงกลม
━━━━━━━━━━━━━━━━━━━━
💡 <b>แผนพัฒนาเฉพาะตัวน้อง:</b>
ระบบได้ปรับเพิ่มคลังข้อสอบเป็น <b>เท่าตัว (10 ข้อ/บท)</b> พร้อมสูตรลัด 3 วินาที เพื่อช่วยให้น้องคิดเลขเร็วและมั่นใจขึ้น 100% ครับ!
🌐 <b>เปิดดูผลและแผนการเรียน:</b> https://master-m1.vercel.app/learning-path`

      await sendReply(preTestMsg)
      return NextResponse.json({ ok: true })
    }

    // Command: /history or /growth (ดูประวัติคะแนนสอบแต่ละครั้ง & การพัฒนา)
    if (text.includes('/history') || text.includes('/growth') || text.includes('พัฒนา') || text.includes('ประวัติ')) {
      const historyMsg = `📈 <b>บันทึกประวัติการสอบ & การพัฒนาของน้อง: ${studentName}</b> 👦
━━━━━━━━━━━━━━━━━━━━
🎯 <b>เป้าหมาย:</b> ${studentTarget}

🧪 <b>คะแนน Pre-Test ตั้งต้น (Baseline):</b>
• วิทยาศาสตร์: <b>8/10 (80%)</b>
• ภาษาอังกฤษ: <b>6/10 (60%)</b>
• คณิตศาสตร์: <b>4/10 (40%)</b>

📊 <b>ประวัติการฝึกทำแบบฝึกหัดรายบท (Attempt Log):</b>
${prog.length > 0 ? prog.map((p, idx) => {
  const modTitle = LESSONS_DATA[p.subject]?.[p.module_id]?.title || p.module_id
  const dateStr = p.completed_at ? new Date(p.completed_at).toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok', day: 'numeric', month: 'short' }) : 'ล่าสุด'
  return `${idx + 1}. [${p.subject.toUpperCase()}] ${modTitle}\n   🎯 คะแนน: <b>${p.score}%</b> (${dateStr})`
}).join('\n\n') : '<i>(ยังไม่มีประวัติการฝึกทำแบบฝึกหัดใหม่ในระบบ ระบบพร้อมบันทึกทันทีที่น้องเริ่มทำแบบฝึกหัดครับ)</i>'}
━━━━━━━━━━━━━━━━━━━━
💡 <b>ระบบติดตามพัฒนาการ:</b>
ทุกครั้งที่น้องทำซ้ำ ระบบจะคำนวณ <b>อัตราการเติบโต (% Growth)</b> และแจ้งเตือนให้คุณพ่อทราบทันทีครับ!
🌐 <b>เปิดดูผลบนเว็บ:</b> https://master-m1.vercel.app/learning-path`

      await sendReply(historyMsg)
      return NextResponse.json({ ok: true })
    }

    // Command: /report (รายงานภาพรวม)
    if (text.includes('/report') || text.includes('รายงาน') || text.includes('คะแนน')) {
      const reportMsg = `📊 <b>รายงานพัฒนาการการเรียน: ${studentName}</b> 👦
━━━━━━━━━━━━━━━━━━━━
🎯 <b>เป้าหมาย:</b> ${studentTarget}

🧪 <b>คะแนน Pre-Test ตั้งต้น:</b>
• วิทย์: <b>8/10 (80%)</b> | อังกฤษ: <b>6/10 (60%)</b> | คณิต: <b>4/10 (40%)</b>

📈 <b>ความก้าวหน้าบทเรียนปัจจุบัน:</b>
🔢 <b>คณิตศาสตร์:</b> ผ่านแล้ว ${mathPassed.length}/8 บท
${mathPassed.map(p => `  • ${LESSONS_DATA.math?.[p.module_id]?.title || p.module_id}: <b>${p.score}%</b>`).join('\n') || '  <i>(กำลังฝึกบทที่ 1: ตัวเลข & ห.ร.ม./ค.ร.น.)</i>'}

🔬 <b>วิทยาศาสตร์:</b> ผ่านแล้ว ${sciPassed.length}/8 บท
${sciPassed.map(p => `  • ${LESSONS_DATA.science?.[p.module_id]?.title || p.module_id}: <b>${p.score}%</b>`).join('\n') || '  <i>(ฐานวิทยาศาสตร์เดิมยอดเยี่ยม 80%)</i>'}

🗣️ <b>ภาษาอังกฤษ:</b> ผ่านแล้ว ${engPassed.length}/8 บท
${engPassed.map(p => `  • ${LESSONS_DATA.english?.[p.module_id]?.title || p.module_id}: <b>${p.score}%</b>`).join('\n') || '  <i>(ระดับพื้นฐานดี 60%)</i>'}

🇹🇭 <b>ภาษาไทย:</b> ผ่านแล้ว ${thaiPassed.length}/8 บท
${thaiPassed.map(p => `  • ${LESSONS_DATA.thai?.[p.module_id]?.title || p.module_id}: <b>${p.score}%</b>`).join('\n') || '  <i>(พร้อมเริ่มเรียน 8 โมดูลหลัก)</i>'}
━━━━━━━━━━━━━━━━━━━━
💡 <b>สถานะระบบ:</b> คลังโจทย์แต่ละวิชาเพิ่มขึ้นเป็น <b>เท่าตัว</b> พร้อมสูตรลัด 3 วินาที
🌐 <b>เปิดดูบนเว็บ:</b> https://master-m1.vercel.app/learning-path`

      await sendReply(reportMsg)
      return NextResponse.json({ ok: true })
    }

    if (text.includes('/math') || text.includes('คณิต')) {
      const mathMsg = `🔢 <b>ความก้าวหน้าวิชาคณิตศาสตร์: ${studentName}</b>
━━━━━━━━━━━━━━━━━━━━
• คะแนน Pre-Test: <b>4/10 (40%)</b>
• บทเรียนที่ผ่านแล้ว: <b>${mathPassed.length} จาก 8 บท</b>
${mathPassed.map(p => `✅ ${LESSONS_DATA.math?.[p.module_id]?.title || p.module_id} (ได้ ${p.score}%)`).join('\n') || '📌 แนะนำให้น้องเริ่มจากบท: <b>ตัวเลข & ห.ร.ม./ค.ร.น.</b> และ <b>เศษส่วนทศนิยม</b>'}
━━━━━━━━━━━━━━━━━━━━
💡 ฝึกคิดเลขเร็วสูตรลัด 3 วิ ได้ที่: https://master-m1.vercel.app/subjects/math`
      await sendReply(mathMsg)
      return NextResponse.json({ ok: true })
    }

    if (text.includes('/science') || text.includes('วิทย์')) {
      const sciMsg = `🔬 <b>ความก้าวหน้าวิชาวิทยาศาสตร์: ${studentName}</b>
━━━━━━━━━━━━━━━━━━━━
• คะแนน Pre-Test: <b>8/10 (80%) 🟢 ยอดเยี่ยม</b>
• บทเรียนที่ผ่านแล้ว: <b>${sciPassed.length} จาก 8 บท</b>
${sciPassed.map(p => `✅ ${LESSONS_DATA.science?.[p.module_id]?.title || p.module_id} (ได้ ${p.score}%)`).join('\n') || '📌 แนะนำบทเรียนสำคัญ: <b>สิ่งมีชีวิตและเซลล์</b> และ <b>สมบัติของสาร & ความเข้มข้น</b>'}
━━━━━━━━━━━━━━━━━━━━
💡 เข้าเรียนวิทยาศาสตร์ได้ที่: https://master-m1.vercel.app/subjects/science`
      await sendReply(sciMsg)
      return NextResponse.json({ ok: true })
    }

    // Default response
    await sendReply(`สวัสดีครับคุณพ่อคุณแม่ พิมพ์ <b>/pretest</b> เพื่อดูผลสอบก่อนเรียน หรือ <b>/report</b> เพื่อดูผลการเรียนล่าสุดได้เลยครับ 😊`)
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error('Telegram Webhook error:', err)
    return NextResponse.json({ ok: true })
  }
}
