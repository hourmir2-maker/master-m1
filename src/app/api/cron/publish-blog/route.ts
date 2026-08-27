import { NextResponse } from 'next/server'
import { ARTICLES_ROADMAP } from '@/lib/articles-roadmap'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const manualIndex = searchParams.get('index')

    // 1. คำนวณเลือกบทความประจำวัน (หมุนเวียน 52 บทความตลอดปี)
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24)
    const articleIndex = manualIndex !== null ? parseInt(manualIndex, 10) : dayOfYear % ARTICLES_ROADMAP.length
    const topic = ARTICLES_ROADMAP[articleIndex] || ARTICLES_ROADMAP[0]

    const geminiKey = process.env.GEMINI_API_KEY
    if (!geminiKey) {
      return NextResponse.json({
        success: false,
        message: 'Missing GEMINI_API_KEY environment variable'
      }, { status: 500 })
    }

    // 2. เรียกใช้ Gemini API สรุปเนื้อหาและสูตรลัดประจำวัน
    const prompt = `คุณคือผู้เชี่ยวชาญด้านการศึกษาระดับแนวหน้าของแพลตฟอร์ม MASTER ม.1
โปรดเขียนแคปชั่นสรุปบทเรียน/สูตรลับการศึกษา สพฐ. ให้อ่านเข้าใจง่าย สนุก ดึงดูดสายตา มีประโยชน์สูง และน่าแชร์ (ความยาว 3-5 บรรทัด)
หัวข้อ: "${topic.title}"
วิชา: ${topic.subject}
สาระสำคัญ: "${topic.summaryConcept}"

ข้อกำหนด:
- ใช้อิโมจิน่ารักที่เข้ากับวิชา (เช่น 📐, 🔬, 📖, ⚡, 🎯)
- สรุปให้ตรงประเด็น อ่านแล้วจำได้ทันที
- ปิดท้ายชวนฝึกทำข้อสอบเสมือนจริง ห้ามใส่ลิงก์ในเนื้อหา (เพราะระบบจะต่อท้ายลิงก์ให้เอง)`

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )

    const geminiData = await geminiRes.json()
    const aiCaption = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || topic.summaryConcept

    // 3. เตรียมข้อความโพสต์ Facebook
    const fbPostContent = `🎓 [สรุปสูตรลับ & บทเรียน สพฐ. ประจำวัน โดย MASTER ม.1]\n\n${aiCaption}\n\n─────────────\n🎯 เข้าทำข้อสอบจำลอง O-NET 2570 เสมือนจริง ครบ 4 วิชา ฟรี 100%:\n👉 ${topic.examUrl}\n\n🛒 พิกัดไอเทมอุปกรณ์การเรียนและหนังสือดีๆ จิ้มดูที่คอมเมนต์แรกใต้โพสต์นี้เลยจ้า 👇`
    const fbCommentContent = `📌 รวมพิกัดสำหรับน้องๆ และคุณครู:\n\n1️⃣ 🌐 ทดลองสอบจำลองและอ่านสรุปสูตรฉบับเต็ม (ฟรี):\n👉 ${topic.examUrl}\n\n2️⃣ 🛍️ ช้อปอุปกรณ์การเรียน / หนังสือเตรียมสอบ Shopee:\n👉 https://shopee.co.th`

    let fbPosted = false
    const fbToken = process.env.FB_PAGE_TOKEN
    const fbPageId = process.env.FB_PAGE_ID

    // 4. ยิงโพสต์ Facebook Page
    if (fbToken && fbPageId) {
      try {
        const postRes = await fetch(`https://graph.facebook.com/${fbPageId}/feed`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: fbPostContent,
            access_token: fbToken
          })
        })
        const postData = await postRes.json()
        if (postData.id) {
          fbPosted = true
          await fetch(`https://graph.facebook.com/${postData.id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: fbCommentContent,
              access_token: fbToken
            })
          })
        }
      } catch (err) {
        console.error('FB Auto-Post Error:', err)
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      schedule: 'Every day at 24:00 (Midnight Thailand Time)',
      article: {
        index: articleIndex,
        title: topic.title,
        subject: topic.subject,
        examUrl: topic.examUrl
      },
      social: {
        facebookPosted: fbPosted
      },
      message: `Vercel Daily Cron executed successfully for: "${topic.title}"`
    })

  } catch (error: any) {
    console.error('Cron Execution Error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
