import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { 
      title, 
      subjectLabel, 
      hook3Sec, 
      coreTechnique, 
      youtubeUrl, 
      genre, 
      targetBpm 
    } = await req.json()

    const botToken = process.env.PARENT_TELEGRAM_BOT_TOKEN
    const parentChatId = process.env.PARENT_TELEGRAM_CHAT_ID

    if (!botToken || !parentChatId) {
      return NextResponse.json({ ok: false, error: 'Telegram configuration missing' }, { status: 500 })
    }

    const now = new Date()
    const timeStr = now.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' })

    const text = `🎬 <b>[สตูดิโอสื่อ AI] ไฮไลต์คลิปสั้น & สูตรลัด 3 วินาที</b> ⚡
━━━━━━━━━━━━━━━━━━━━
📚 <b>วิชา:</b> ${subjectLabel || 'บทเรียน ม.1'}
📌 <b>หัวข้อ:</b> <b>${title}</b>
${targetBpm ? `🎵 <b>จังหวะ/สไตล์:</b> ${targetBpm} BPM (${genre || 'Edutainment'})` : ''}

⚡ <b>Hook 3 วิแรก:</b>
<i>"${hook3Sec || 'สูตรลัดที่น้องต้องรู้ก่อนสอบ!'}"</i>

💡 <b>จุดลวง สทศ. & วิธีแก้เกมใน 3 วิ:</b>
<code>${coreTechnique}</code>
━━━━━━━━━━━━━━━━━━━━
${youtubeUrl ? `🔗 <b>ดูคลิปเต็มบน YouTube:</b> ${youtubeUrl}\n` : ''}⏰ <i>ส่งตรงจากระบบ MASTER M.1 Studio Hub • ${timeStr} น.</i>`

    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: parentChatId,
        text,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            ...(youtubeUrl ? [[{ text: '▶️ เปิดดูคลิปบน YouTube', url: youtubeUrl }]] : []),
            [
              { text: '🌐 เข้าฝึกทำโจทย์บนเว็บ', url: 'https://master-m1.vercel.app' },
              { text: '🎬 ดูคลิปสูตรลัดอื่นๆ', callback_data: '/clips' }
            ]
          ]
        }
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      console.warn('[Telegram Broadcast Clip] Failed:', errText)
      return NextResponse.json({ ok: false, error: errText }, { status: 500 })
    }

    return NextResponse.json({ ok: true, message: 'ส่งคลิปเข้า Telegram สำเร็จ' })
  } catch (error: any) {
    console.error('[Telegram Broadcast Clip Error]', error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}
