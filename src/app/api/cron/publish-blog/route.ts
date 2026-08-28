import { NextResponse } from 'next/server'
import { ARTICLES_ROADMAP, ArticleTopic } from '@/lib/articles-roadmap'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

/**
 * ฟังก์ชันขอ Access Token จาก Google OAuth2 ด้วย Refresh Token
 */
async function getBloggerAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string | null> {
  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
    })

    if (!res.ok) {
      console.error('Blogger token refresh failed with status:', res.status)
      return null
    }

    const data = await res.json()
    return data.access_token || null
  } catch (error) {
    console.error('Error refreshing Blogger token:', error)
    return null
  }
}

/**
 * สร้าง HTML บทความการศึกษาระดับพรีเมียม (โหลดเร็ว ปลอดภัย Responsive 100%)
 */
function buildBloggerArticleHtml(topic: ArticleTopic, aiCaption: string): string {
  const formattedKeywords = (topic.keywords || []).map(k => `<span style="display:inline-block; background:#e0f2fe; color:#0369a1; padding:4px 12px; border-radius:9999px; font-size:12px; margin:3px; font-weight:600;">#${k}</span>`).join(' ')
  
  return `
<div style="font-family: 'Prompt', 'Sarabun', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #334155; max-width: 800px; margin: 0 auto; padding: 10px;">
  
  <!-- Hero Header Banner with Official Logo -->
  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%); padding: 36px 20px; border-radius: 24px; color: #ffffff; text-align: center; margin-bottom: 24px; box-shadow: 0 12px 30px -5px rgba(30, 58, 138, 0.4); border: 1px solid rgba(255, 255, 255, 0.1);">
    <div style="margin-bottom: 14px;">
      <img src="https://master-m1.vercel.app/logo.png" alt="MASTER M.1 Logo" style="width: 90px; height: 90px; border-radius: 22px; box-shadow: 0 8px 20px rgba(0,0,0,0.35); border: 2px solid rgba(253, 224, 71, 0.7); display: inline-block; object-fit: cover;" />
    </div>
    <span style="background: rgba(253, 224, 71, 0.2); color: #fef08a; border: 1px solid rgba(253, 224, 71, 0.4); padding: 5px 16px; border-radius: 9999px; font-size: 13px; font-weight: bold; letter-spacing: 0.5px;">🎯 วิชา: ${topic.subject} | สพฐ. 2551 (ปรับปรุง 2560)</span>
    <h1 style="font-size: 24px; font-weight: 900; margin: 16px 0 10px 0; color: #ffffff; line-height: 1.4;">
      ${topic.title}
    </h1>
    <p style="font-size: 14px; opacity: 0.9; margin: 0; font-weight: 400;">
      คลังบทเรียน ติวเข้ม O-NET และเทคนิคพิชิต ม.1 โดย MASTER ม.1
    </p>
  </div>

  <!-- Summary Box -->
  <div style="background: #ffffff; padding: 24px; border-radius: 18px; border: 1px solid #e2e8f0; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
    <h2 style="font-size: 20px; font-weight: 800; color: #1e293b; border-left: 5px solid #2563eb; padding-left: 12px; margin: 0 0 14px 0;">
      💡 สาระสำคัญประจำบทเรียน
    </h2>
    <p style="font-size: 15px; color: #475569; margin: 0 0 16px 0; line-height: 1.7;">
      ${topic.summaryConcept}
    </p>
    
    <!-- AI Highlight Box -->
    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 5px solid #f59e0b; padding: 18px; border-radius: 12px; margin: 16px 0;">
      <h3 style="font-size: 16px; font-weight: 700; color: #b45309; margin: 0 0 8px 0;">
        ⚡ เทคนิคคิดเร็ว & สรุปสูตรลับประจำวัน:
      </h3>
      <div style="font-size: 14px; color: #334155; line-height: 1.7;">
        ${aiCaption.replace(/\n/g, '<br>')}
      </div>
    </div>

    <!-- Tags -->
    <div style="margin-top: 16px;">
      ${formattedKeywords}
    </div>
  </div>

  <!-- Interactive Call-To-Action Box -->
  <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 20px; padding: 28px 20px; text-align: center; color: #ffffff; border: 2px solid #3b82f6; box-shadow: 0 10px 25px rgba(0,0,0,0.2); margin-bottom: 24px;">
    <h3 style="font-size: 20px; font-weight: 800; color: #fde047; margin: 0 0 10px 0;">
      🚀 ทดสอบความพร้อมด้วยข้อสอบจำลองเสมือนจริง 100% ฟรี!
    </h3>
    <p style="font-size: 14px; color: #cbd5e1; margin: 0 0 18px 0; line-height: 1.6;">
      ฝึกทำข้อสอบตรงตามตัวชี้วัด สพฐ. พร้อมระบบ AI ตรวจวิเคราะห์จุดอ่อนรายบุคคลทันที
    </p>
    <a href="${topic.examUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #2563eb; color: #ffffff; font-weight: 800; font-size: 15px; padding: 14px 32px; border-radius: 9999px; text-decoration: none; box-shadow: 0 6px 18px rgba(37, 99, 235, 0.4);">
      👉 คลิกเข้าทำข้อสอบวิชานี้ ฟรีทันที
    </a>
  </div>

  <!-- Footer Attribution -->
  <div style="text-align: center; font-size: 12px; color: #94a3b8; padding: 10px 0;">
    © 2026 MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ | สงวนลิขสิทธิ์<br>
    พัฒนาโดย Phairot Makkaew ร่วมกับ Gemini AI
  </div>
</div>
`
}

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

    const bloggerClientId = process.env.BLOGGER_CLIENT_ID
    const bloggerClientSecret = process.env.BLOGGER_CLIENT_SECRET
    const bloggerRefreshToken = process.env.BLOGGER_REFRESH_TOKEN
    const bloggerBlogId = process.env.BLOGGER_BLOG_ID || '1784281365493579455'
    const fbToken = process.env.FB_PAGE_TOKEN
    const fbPageId = process.env.FB_PAGE_ID

    // 2. รัน AI Caption และ Blogger Token Refresh พร้อมกันแบบ Parallel (ประหยัดเวลา < 1.5 วินาที)
    const fbPrompt = `คุณคือผู้เชี่ยวชาญด้านการศึกษาระดับแนวหน้าของแพลตฟอร์ม MASTER ม.1
โปรดเขียนแคปชั่นสรุปบทเรียน/สูตรลับการศึกษา สพฐ. ให้อ่านเข้าใจง่าย สนุก ดึงดูดสายตา มีประโยชน์สูง และน่าแชร์ (ความยาว 3-4 บรรทัด)
หัวข้อ: "${topic.title}"
วิชา: ${topic.subject}
สาระสำคัญ: "${topic.summaryConcept}"

ข้อกำหนด:
- ใช้อิโมจิน่ารักที่เข้ากับวิชา (เช่น 📐, 🔬, 📖, ⚡, 🎯)
- สรุปให้ตรงประเด็น อ่านแล้วจำได้ทันที
- ปิดท้ายชวนฝึกทำข้อสอบเสมือนจริง ห้ามใส่ลิงก์ในเนื้อหา (เพราะระบบจะต่อท้ายลิงก์ให้เอง)`

    const [aiCaptionResult, bloggerAccessToken] = await Promise.all([
      fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: fbPrompt }] }] })
      }).then(r => r.json()).then(d => d.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || topic.summaryConcept).catch(() => topic.summaryConcept),
      
      bloggerClientId && bloggerClientSecret && bloggerRefreshToken
        ? getBloggerAccessToken(bloggerClientId, bloggerClientSecret, bloggerRefreshToken)
        : Promise.resolve(null)
    ])

    const aiCaption = aiCaptionResult || topic.summaryConcept

    // 3. โพสต์ขึ้น Google Blogger v3
    let bloggerResult: { published: boolean; url?: string; id?: string; error?: string } = { published: false }

    if (bloggerAccessToken) {
      try {
        const blogHtml = buildBloggerArticleHtml(topic, aiCaption)
        const cleanTitle = topic.title.replace(/[&<>]/g, ' ').replace(/\s+/g, ' ').trim()
        const cleanLabels = [
          topic.subject,
          'ONET 2570',
          'สรุปสูตรลัด'
        ].filter(Boolean)

        const bloggerRes = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${bloggerBlogId}/posts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${bloggerAccessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            kind: 'blogger#post',
            title: cleanTitle,
            content: blogHtml,
            labels: cleanLabels
          })
        })

        const bloggerData = await bloggerRes.json()
        if (bloggerData.url) {
          bloggerResult = {
            published: true,
            url: bloggerData.url,
            id: bloggerData.id
          }
        } else {
          bloggerResult.error = bloggerData.error?.message || 'Failed to insert post'
        }
      } catch (err: any) {
        console.error('Blogger Auto-Post Error:', err)
        bloggerResult.error = err.message
      }
    } else {
      bloggerResult.error = 'Blogger Access Token not available or credentials missing'
    }

    // 4. เตรียมข้อความโพสต์ Facebook
    const blogUrlDisplay = bloggerResult.url ? `\n\n📖 อ่านบทความฉบับเต็มพร้อมสูตรลัด:\n👉 ${bloggerResult.url}` : ''
    const fbPostContent = `🎓 [สรุปสูตรลับ & บทเรียน สพฐ. ประจำวัน โดย MASTER ม.1]\n\n${aiCaption}${blogUrlDisplay}\n\n─────────────\n🎯 เข้าทำข้อสอบจำลอง O-NET 2570 เสมือนจริง ครบ 4 วิชา ฟรี 100%:\n👉 ${topic.examUrl}\n\n🛒 พิกัดไอเทมอุปกรณ์การเรียนและหนังสือดีๆ จิ้มดูที่คอมเมนต์แรกใต้โพสต์นี้เลยจ้า 👇`
    
    const commentBlogUrl = bloggerResult.url ? `\n3️⃣ 📖 บล็อกบทความสรุปสูตรฉบับเต็ม:\n👉 ${bloggerResult.url}` : ''
    const fbCommentContent = `📌 รวมพิกัดสำหรับน้องๆ และคุณครู:\n\n1️⃣ 🌐 ทดลองสอบจำลองและอ่านสรุปสูตรฉบับเต็ม (ฟรี):\n👉 ${topic.examUrl}\n\n2️⃣ 🛍️ ช้อปอุปกรณ์การเรียน / หนังสือเตรียมสอบ Shopee:\n👉 https://shopee.co.th${commentBlogUrl}`

    // 5. ยิงโพสต์ Facebook Page
    let fbPosted = false
    let fbPostId: string | undefined
    let fbError: string | undefined

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
          fbPostId = postData.id
          await fetch(`https://graph.facebook.com/${postData.id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: fbCommentContent,
              access_token: fbToken
            })
          })
        } else {
          fbError = postData.error?.message || 'Failed to post on Facebook'
        }
      } catch (err: any) {
        console.error('FB Auto-Post Error:', err)
        fbError = err.message
      }
    } else {
      fbError = 'Missing FB_PAGE_TOKEN or FB_PAGE_ID'
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      schedule: 'Every day at 24:00 (Midnight Thailand Time / 17:00 UTC)',
      article: {
        index: articleIndex,
        title: topic.title,
        subject: topic.subject,
        examUrl: topic.examUrl
      },
      blogger: bloggerResult,
      facebook: {
        published: fbPosted,
        postId: fbPostId,
        error: fbError
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
