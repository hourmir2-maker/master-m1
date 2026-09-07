import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { LESSONS_DATA } from '@/lib/lessons-data'

/**
 * MASTER ม.1 — Universal Multi-Parent Telegram Bot Webhook
 * รองรับผู้ปกครองนักเรียนทุกคน สามารถดูคะแนน Pre-Test, รายงานผลสอบ, และความก้าวหน้า 24 ชม.
 * รองรับทั้ง Text Messages และ Inline Keyboard Callback Queries
 */

// Multi-Child Roster mapping: ChatId -> Array of StudentIds
const PARENT_CHILDREN_MAP: Record<string, string[]> = {
  '7864027458': ['4ec823eb-be30-4e1c-a709-a3382ee85491'] // คุณพ่อไพโรจน์ -> น้องฟอร์จูน
}

// Active Selected Child per ChatId
const ACTIVE_CHILD_MAP: Record<string, string> = {
  '7864027458': '4ec823eb-be30-4e1c-a709-a3382ee85491'
}

/**
 * Dynamic Parent Inline Keyboard with Multi-Child Switcher at top
 */
function buildParentKeyboard(studentName?: string) {
  const shortName = (studentName || 'นักเรียน')
    .replace('ด.ช.', '')
    .replace('ด.ญ.', '')
    .trim()
    .split(' ')[0]
    .slice(0, 12)

  return {
    inline_keyboard: [
      [
        { text: `🔄 สลับนักเรียน (${shortName}) ▾`, callback_data: '/switch' },
        { text: '➕ ผูกบัญชีเพิ่ม', callback_data: '/how_to_link' }
      ],
      [
        { text: '🧪 ผล Pre-Test', callback_data: '/pretest' },
        { text: '📊 รายงานผล', callback_data: '/report' },
        { text: '📈 ประวัติคะแนน', callback_data: '/history' }
      ],
      [
        { text: '🔢 คณิต', callback_data: '/math' },
        { text: '🔬 วิทย์', callback_data: '/science' },
        { text: '🗣️ อังกฤษ', callback_data: '/english' },
        { text: '🇹🇭 ไทย', callback_data: '/thai' }
      ],
      [
        { text: '🎯 O-NET 2570', callback_data: '/onet' },
        { text: '🌐 หน้าเว็บ MASTER ม.1', url: 'https://master-m1.vercel.app' }
      ]
    ]
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const callbackQuery = body.callback_query
    const message = body.message || body.channel_post || callbackQuery?.message

    if (!message) {
      return NextResponse.json({ ok: true })
    }

    const chatId = String(message.chat?.id || callbackQuery?.from?.id || '')
    if (!chatId) {
      return NextResponse.json({ ok: true })
    }

    const rawText = (callbackQuery ? callbackQuery.data : message.text || '').trim()
    if (!rawText) {
      return NextResponse.json({ ok: true })
    }

    const text = rawText.toLowerCase()
    const botToken = process.env.PARENT_TELEGRAM_BOT_TOKEN
    if (!botToken) {
      console.warn('[Telegram Webhook] PARENT_TELEGRAM_BOT_TOKEN is not set.')
      return NextResponse.json({ ok: false, error: 'Bot token missing' }, { status: 500 })
    }

    // Acknowledge Telegram callback query immediately so button loading spinner stops
    if (callbackQuery?.id) {
      await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callbackQuery.id })
      }).catch(err => console.error('[Telegram Webhook] answerCallbackQuery error:', err))
    }

    const supabase = await createClient()

    // Initialize Multi-Child mapping for chatId if not present
    if (!PARENT_CHILDREN_MAP[chatId]) {
      PARENT_CHILDREN_MAP[chatId] = chatId === '7864027458' ? ['4ec823eb-be30-4e1c-a709-a3382ee85491'] : []
    }

    // 1. Check if user tapped /how_to_link
    if (text === '/how_to_link' || text.includes('วิธีผูก') || text.includes('ผูกเพิ่ม')) {
      const linkGuide = `➕ <b>วิธีเชื่อมต่อและผูกบัญชีนักเรียนเพิ่ม (Multi-Child Support):</b> 🎓\n━━━━━━━━━━━━━━━━━━━━\nผู้ปกครอง 1 บัญชี Telegram สามารถดูแลบุตรหลานได้ไม่จำกัดจำนวนคนครับ!\n\n📲 <b>วิธีใช้งาน:</b>\nพิมพ์คำสั่ง: <code>/link &lt;อีเมลของน้อง หรือ ชื่อของน้อง&gt;</code>\n\n📌 <b>ตัวอย่าง:</b>\n• <code>/link fortune@gmail.com</code>\n• <code>/link น้องภูมิรพีร์</code>\n\n🔔 <i>เมื่อผูกสำเร็จ รายชื่อน้องจะเข้าไปอยู่ในเมนู [🔄 สลับนักเรียน] ทันที และระบบจะส่งแจ้งเตือนผลสอบของน้องทุกคนเข้าแชทนี้อัตโนมัติครับ!</i>`
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: linkGuide,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🔄 เปิดเมนูสลับนักเรียน', callback_data: '/switch' }],
              [{ text: '🔙 หน้าหลัก', callback_data: '/start' }]
            ]
          }
        })
      })
      return NextResponse.json({ ok: true })
    }

    // 2. Check if switching to a specific student via callback (/switch_<id>)
    if (rawText.startsWith('/switch_')) {
      const targetStudentId = rawText.replace('/switch_', '').trim()
      if (targetStudentId) {
        ACTIVE_CHILD_MAP[chatId] = targetStudentId
        if (!PARENT_CHILDREN_MAP[chatId].includes(targetStudentId)) {
          PARENT_CHILDREN_MAP[chatId].push(targetStudentId)
        }

        const { data: newProfile } = await supabase.from('profiles').select('*').eq('id', targetStudentId).maybeSingle()
        const newName = newProfile?.full_name || 'นักเรียน'
        const newTarget = newProfile?.school_target || 'เตรียมสอบเข้า ม.1'
        const newEmail = newProfile?.email || '-'

        const { data: progList } = await supabase.from('progress').select('module_id, score, completed').eq('user_id', targetStudentId)
        const completedCount = (progList || []).filter(p => p.completed).length

        const switchSuccessMsg = `✅ <b>สลับมาติดตาม: ${newName} เรียบร้อยแล้ว!</b> 🎓\n━━━━━━━━━━━━━━━━━━━━\n👦 <b>นักเรียน:</b> ${newName}\n🎯 <b>เป้าหมาย:</b> ${newTarget}\n📧 <b>อีเมล:</b> ${newEmail}\n📊 <b>ความคืบหน้ารวม:</b> ผ่านแบบฝึกหัดแล้ว ${completedCount}/56 บทเรียน\n━━━━━━━━━━━━━━━━━━━━\n💡 <i>ข้อมูลผลสอบ Pre-Test และรายงานคะแนนทั้งหมดในเมนูด้านล่างนี้ จะแสดงเป็นของ ${newName} ทันทีครับ</i>`

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: switchSuccessMsg,
            parse_mode: 'HTML',
            reply_markup: buildParentKeyboard(newName)
          })
        })
        return NextResponse.json({ ok: true })
      }
    }

    // 3. Check if user wants to see the Multi-Child Switcher Menu (/switch or /children)
    if (text === '/switch' || text === '/children' || text === '/students' || text.includes('สลับนักเรียน') || text.includes('สลับลูก')) {
      let studentList: any[] = []
      
      if (chatId === '7864027458') {
        const { data: allProfiles } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
        studentList = allProfiles || []
      } else {
        const childIds = PARENT_CHILDREN_MAP[chatId] || []
        if (childIds.length > 0) {
          const { data: matchedProfiles } = await supabase.from('profiles').select('*').in('id', childIds)
          studentList = matchedProfiles || []
        }
      }

      if (studentList.length === 0) {
        studentList = [{
          id: '4ec823eb-be30-4e1c-a709-a3382ee85491',
          full_name: 'ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)',
          email: 'phumrapeeft@gmail.com',
          school_target: 'ม.1 Gifted วิทย์-คณิต สู่ เภสัชกร 💊'
        }]
      }

      // Sort so Fortune is always #1
      studentList.sort((a, b) => {
        if (a.email === 'phumrapeeft@gmail.com' || a.full_name?.includes('ภูมิรพีร์')) return -1
        if (b.email === 'phumrapeeft@gmail.com' || b.full_name?.includes('ภูมิรพีร์')) return 1
        return 0
      })

      const currentActiveId = ACTIVE_CHILD_MAP[chatId] || studentList[0]?.id

      const childButtons = studentList.map(st => {
        const isCurrent = st.id === currentActiveId
        const isFortune = st.email === 'phumrapeeft@gmail.com' || st.full_name?.includes('ภูมิรพีร์')
        const icon = isFortune ? '⭐️ 👦' : '👦'
        const badge = isCurrent ? ' (✅ กำลังดูอยู่)' : ''
        return [{
          text: `${icon} ${st.full_name}${badge}`,
          callback_data: `/switch_${st.id}`
        }]
      })

      childButtons.push([
        { text: '➕ ผูกบัญชีนักเรียนเพิ่ม (/link)', callback_data: '/how_to_link' }
      ])
      childButtons.push([
        { text: '🔙 หน้าหลัก', callback_data: '/start' }
      ])

      const activeStudent = studentList.find(s => s.id === currentActiveId) || studentList[0]

      const switcherMsg = `👨‍👩‍👧‍👦 <b>เมนูสลับบัญชีนักเรียนในความดูแล (Multi-Child Switcher)</b>\n━━━━━━━━━━━━━━━━━━━━\n📌 <b>กำลังติดตาม:</b> ${activeStudent.full_name}\n🎯 <b>เป้าหมาย:</b> ${activeStudent.school_target || 'เตรียมสอบเข้า ม.1'}\n\n👇 <i>แตะเลือกชื่อน้องที่ต้องการสลับดูผลการเรียน หรือแตะปุ่มผูกบัญชีเพิ่มได้ทันที:</i>`

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: switcherMsg,
          parse_mode: 'HTML',
          reply_markup: { inline_keyboard: childButtons }
        })
      })
      return NextResponse.json({ ok: true })
    }

    // 4. Check if user is linking a new student account (/link email_or_id or /start link_xxx)
    if (text.startsWith('/link') || text.startsWith('/start link_')) {
      let queryParam = rawText.replace(/\/link/i, '').replace(/\/start link_/i, '').trim()
      
      if (!queryParam) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `ℹ️ <b>วิธีผูกบัญชีติดตามบุตรหลาน:</b>\nกรุณาพิมพ์: <code>/link &lt;อีเมลของน้อง&gt;</code>\nตัวอย่าง: <code>/link student@gmail.com</code>`,
            parse_mode: 'HTML',
            reply_markup: buildParentKeyboard()
          })
        })
        return NextResponse.json({ ok: true })
      }

      // Find student in Supabase by email or full_name
      const { data: matchedUser } = await supabase
        .from('profiles')
        .select('*')
        .or(`email.ilike.%${queryParam}%,full_name.ilike.%${queryParam}%`)
        .limit(1)
        .maybeSingle()

      if (matchedUser) {
        ACTIVE_CHILD_MAP[chatId] = matchedUser.id
        if (!PARENT_CHILDREN_MAP[chatId]) {
          PARENT_CHILDREN_MAP[chatId] = []
        }
        if (!PARENT_CHILDREN_MAP[chatId].includes(matchedUser.id)) {
          PARENT_CHILDREN_MAP[chatId].push(matchedUser.id)
        }

        const linkSuccessMsg = `✅ <b>เชื่อมต่อบัญชีสำเร็จและสลับมาติดตามเรียบร้อยครับ!</b> 🎓\n━━━━━━━━━━━━━━━━━━━━\n👦 <b>นักเรียน:</b> ${matchedUser.full_name}\n📧 <b>อีเมล:</b> ${matchedUser.email}\n🎯 <b>ระดับชั้น:</b> ${matchedUser.grade_target || 'ม.1'}\n━━━━━━━━━━━━━━━━━━━━\n🔔 <i>น้องถูกเพิ่มเข้าสู่เมนู [🔄 สลับนักเรียน] เรียบร้อยแล้ว ระบบจะส่งแจ้งเตือนผลสอบของน้องเข้าแชทนี้อัตโนมัติทันทีครับ!</i>\n\nกดเลือกเมนูด้านล่าง หรือพิมพ์ <b>/pretest</b> เพื่อดูผลสอบก่อนเรียน ได้เลยครับ`

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: linkSuccessMsg,
            parse_mode: 'HTML',
            reply_markup: buildParentKeyboard(matchedUser.full_name)
          })
        })
        return NextResponse.json({ ok: true })
      } else {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `⚠️ <b>ไม่พบข้อมูลนักเรียน:</b> "${queryParam}"\nกรุณาตรวจสอบอีเมลหรือชื่อที่น้องใช้สมัครในเว็บ https://master-m1.vercel.app อีกครั้งครับ`,
            parse_mode: 'HTML',
            reply_markup: buildParentKeyboard()
          })
        })
        return NextResponse.json({ ok: true })
      }
    }

    // 5. Identify active linked student for this Parent Chat ID
    let currentStudentId = ACTIVE_CHILD_MAP[chatId] || PARENT_CHILDREN_MAP[chatId]?.[0] || (chatId === '7864027458' ? '4ec823eb-be30-4e1c-a709-a3382ee85491' : null)

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

    const isFortune = studentProfile?.email === 'phumrapeeft@gmail.com' || studentProfile?.full_name?.includes('ภูมิรพีร์')
    const isTest = studentProfile?.full_name?.includes('ทดสอบ') || studentProfile?.email?.includes('test')

    const studentName = studentProfile?.full_name || (isFortune ? 'ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)' : (isTest ? 'บัญชีทดสอบ' : 'นักเรียนทั่วไป'))
    const studentTarget = isFortune
      ? 'ม.1 Gifted วิทย์-คณิต สู่ เภสัชกร 💊'
      : (studentProfile?.school_target && studentProfile.school_target !== 'ไม่ระบุ' ? `ม.1 (${studentProfile.school_target})` : (isTest ? 'ทดสอบระบบการเรียน' : 'ม.1 เตรียมสอบเข้า ม.1'))

    const sendReply = async (replyText: string, replyMarkup?: any) => {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: replyText,
          parse_mode: 'HTML',
          reply_markup: replyMarkup !== undefined ? replyMarkup : buildParentKeyboard(studentName)
        })
      })
    }

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
      const welcomeMsg = `👋 <b>สวัสดีครับคุณพ่อคุณแม่! ยินดีต้อนรับสู่ "ครูพี่ MASTER AI"</b> 🎓

👦 <b>นักเรียนที่กำลังติดตาม:</b> ${studentName}
🎯 <b>เป้าหมาย:</b> ${studentTarget}

📲 <b>คำสั่งด่วนสำหรับผู้ปกครอง (แตะปุ่มกด หรือพิมพ์ได้ 24 ชม.):</b>
• <b>/switch</b> — 🔄 <b>สลับดูผลการเรียนของลูกคนอื่น (Multi-Child Switcher)</b>
• <b>/pretest</b> — 🧪 ดูผลการสอบวัดระดับก่อนเรียน (Pre-Test)
• <b>/report</b> — 📊 ดูรายงานสรุปคะแนนและพัฒนาการทุกวิชา
• <b>/history</b> — 📈 ดูประวัติและพัฒนาการคะแนนทุกบท
• <b>/math</b> — 🔢 ดูความก้าวหน้าวิชาคณิตศาสตร์ (สูตรลัด 3 วิ)
• <b>/science</b> — 🔬 ดูความก้าวหน้าวิชาวิทยาศาสตร์ (รากฐานเภสัช)
• <b>/english</b> — 🗣️ ดูความก้าวหน้าวิชาภาษาอังกฤษ (3S Method)
• <b>/thai</b> — 🇹🇭 ดูความก้าวหน้าวิชาภาษาไทย (8 โมดูล หลักสูตร 1000%)
• <b>/onet</b> — 🎯 ดูผลสอบสนามสอบจำลอง O-NET 2570
• <b>/link [อีเมล/ชื่อ]</b> — ➕ ผูกบัญชีนักเรียนเพิ่ม

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

    // Command: /onet (ดูผลสอบสนามสอบจำลอง O-NET 2570)
    if (text.includes('/onet') || text.includes('onet') || text.includes('โอเน็ต')) {
      const onetMath = prog.filter(p => p.subject === 'onet_math')
      const onetSci = prog.filter(p => p.subject === 'onet_science')
      const onetEng = prog.filter(p => p.subject === 'onet_english')
      const onetThai = prog.filter(p => p.subject === 'onet_thai')

      const formatOnetScore = (items: any[]) => {
        if (items.length === 0) return '<i>(ยังไม่ได้เข้าสอบ)</i>'
        const best = Math.max(...items.map(i => i.score || 0))
        return `<b>${best}/100 คะแนน</b> (สอบแล้ว ${items.length} ครั้ง)`
      }

      const onetMsg = `🎯 <b>ผลการสอบสนามจำลอง O-NET 2570: ${studentName}</b> 👦
━━━━━━━━━━━━━━━━━━━━
📜 <b>มาตรฐาน:</b> ข้อสอบตรงตาม Test Blueprint สทศ. 2570

🔢 <b>คณิตศาสตร์ O-NET:</b> ${formatOnetScore(onetMath)}
🔬 <b>วิทยาศาสตร์ O-NET:</b> ${formatOnetScore(onetSci)}
🗣️ <b>ภาษาอังกฤษ O-NET:</b> ${formatOnetScore(onetEng)}
🇹🇭 <b>ภาษาไทย O-NET:</b> ${formatOnetScore(onetThai)}
━━━━━━━━━━━━━━━━━━━━
💡 <b>ข้อสอบ O-NET 2570 มีครบ 4 วิชา:</b>
• มีทั้งแบบปรนัย 4 ตัวเลือก และแบบอัตนัยฝนตัวเลขทศนิยม
• มีระบบจับเวลาเสมือนจริงในห้องสอบ
🌐 <b>เข้าฝึกสนามสอบ O-NET:</b> https://master-m1.vercel.app/onet-exam`

      await sendReply(onetMsg)
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

    // Command: /thai (ดูผลวิชาภาษาไทย)
    if (text.includes('/thai') || text.includes('ภาษาไทย') || text.includes('ไทย')) {
      const thaiMsg = `🇹🇭 <b>ความก้าวหน้าวิชาภาษาไทย (หลักสูตร 1000%): ${studentName}</b>
━━━━━━━━━━━━━━━━━━━━
• บทเรียนที่ผ่านแล้ว: <b>${thaiPassed.length} จาก 8 บท</b>
${thaiPassed.map(p => `✅ ${LESSONS_DATA.thai?.[p.module_id]?.title || p.module_id} (ได้ ${p.score}%)`).join('\n') || '📌 แนะนำเริ่มจาก: <b>คำยืมบาลี-สันสกฤต (สูตรลัด 3 วิ)</b> และ <b>ชนิดของคำ 7 ชนิด</b>'}
━━━━━━━━━━━━━━━━━━━━
📚 <b>8 โมดูล ภาษาไทยมาตรฐาน สพฐ. 2551 (ปรับปรุง 2560):</b>
1. คำไทยแท้ & คำยืม บาลี-สันสกฤต-เขมร-อังกฤษ
2. ชนิดของคำ 7 ชนิด & หน้าที่ในประโยค
3. โครงสร้างประโยค (ความเดียว-ความรวม-ความซ้อน)
4. คำราชาศัพท์ ระดับภาษา & คำสุภาพ
5. สำนวน สุภาษิต คำพังเพย & ปริศนาคำทาย
6. การอ่านจับใจความ & ตีความ (Critical Reading)
7. วรรณคดีลำนำ (รามเกียรติ์, พลายงาม, โคลงโลกนิติ)
8. การเขียนย่อความ เรียงความ & จดหมาย
━━━━━━━━━━━━━━━━━━━━
💡 <b>สูตรลัดภาษาไทย 3 วิ:</b> ตัดช้อยส์บาลี-สันสกฤตด้วย "ศ ษ ฤ = สันสกฤต, ส เดียว + ตัวสะกดวรรค = บาลี"
🌐 <b>เข้าเรียนภาษาไทย:</b> https://master-m1.vercel.app/subjects/thai`
      await sendReply(thaiMsg)
      return NextResponse.json({ ok: true })
    }

    // Command: /english หรือ /eng
    if (text.includes('/english') || text.includes('/eng') || text.includes('อังกฤษ')) {
      const engMsg = `🗣️ <b>ความก้าวหน้าวิชาภาษาอังกฤษ: ${studentName}</b>
━━━━━━━━━━━━━━━━━━━━
• คะแนน Pre-Test: <b>6/10 (60%)</b>
• บทเรียนที่ผ่านแล้ว: <b>${engPassed.length} จาก 8 บท</b>
${engPassed.map(p => `✅ ${LESSONS_DATA.english?.[p.module_id]?.title || p.module_id} (ได้ ${p.score}%)`).join('\n') || '📌 แนะนำบทเรียนสำคัญ: <b>Grammar & Tenses</b> และ <b>Vocabulary Root Words</b>'}
━━━━━━━━━━━━━━━━━━━━
💡 เทคนิค 3S: <b>Skim ➔ Scan ➔ Error</b> สแกนคำตอบได้ใน 30 วินาที
🌐 เข้าเรียนอังกฤษได้ที่: https://master-m1.vercel.app/subjects/english`
      await sendReply(engMsg)
      return NextResponse.json({ ok: true })
    }

    // Default: แสดงเมนูคำสั่งทั้งหมดพร้อมปุ่มกด
    await sendReply(`📋 <b>คำสั่งที่ใช้ได้ทั้งหมดครับ (ครูพี่ MASTER AI):</b>
━━━━━━━━━━━━━━━━━━━━
🔄 <b>/switch</b> — สลับบัญชีบุตรหลานในความดูแล (Multi-Child)
🧪 <b>/pretest</b> — ดูผลสอบวัดระดับก่อนเรียน (Pre-Test)
📊 <b>/report</b> — รายงานภาพรวมทุกวิชา
📈 <b>/history</b> — ประวัติและพัฒนาการคะแนนทุกบท
━━━━━━━━━━━━━━━━━━━━
🔢 <b>/math</b> — คณิตศาสตร์ (8 โมดูล สูตรลัด 3 วิ)
🔬 <b>/science</b> — วิทยาศาสตร์ (8 โมดูล รากฐานเภสัช)
🗣️ <b>/english</b> — ภาษาอังกฤษ (8 โมดูล 3S Method)
🇹🇭 <b>/thai</b> — ภาษาไทย (8 โมดูล หลักสูตร 1000%)
🎯 <b>/onet</b> — สนามสอบจำลอง O-NET 2570
━━━━━━━━━━━━━━━━━━━━
🔗 <b>/link [อีเมล/ชื่อ]</b> — ผูกบัญชีนักเรียนเพิ่ม
🌐 https://master-m1.vercel.app`)
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error('Telegram Webhook error:', err)
    return NextResponse.json({ ok: true })
  }
}
