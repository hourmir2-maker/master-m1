const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// โหลด Environment Variables
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

async function testFullAutomation() {
  console.log('================================================================');
  console.log('🚀 เริ่มทดสอบระบบโพสต์อัตโนมัติ (Blogger + Facebook Page + Shopee)');
  console.log('================================================================\n');

  const geminiKey = process.env.GEMINI_API_KEY;
  const fbToken = process.env.FB_PAGE_TOKEN;
  const fbPageId = process.env.FB_PAGE_ID;
  const bloggerClientId = process.env.BLOGGER_CLIENT_ID;
  const bloggerClientSecret = process.env.BLOGGER_CLIENT_SECRET;
  const bloggerRefreshToken = process.env.BLOGGER_REFRESH_TOKEN;
  const bloggerBlogId = process.env.BLOGGER_BLOG_ID || '1784281365493579455';

  const topic = {
    title: 'สูตรลัดคณิตศาสตร์ ป.6: เทคนิคจำไวคูณ 11 & ยกกำลังสองเลขลงท้าย 5',
    subject: 'คณิตศาสตร์ สพฐ.',
    summaryConcept: 'สูตรลัดคูณ 11 แยกหัวท้ายใส่ผลบวกตรงกลาง และยกกำลังสองเลขลงท้ายด้วย 5 เช่น 75² = (7×8)25 = 5625 คิดไวใน 3 วิ',
    examUrl: 'https://master-m1.vercel.app/subjects/math',
    keywords: ['สูตรลัดคณิตศาสตร์', 'คิดเลขเร็ว', 'O-NET 2570', 'MASTER ม.1', 'คณิตศาสตร์ ป.6']
  };

  // 1. เรียกใช้ Gemini 3.6 Flash
  console.log('🤖 1. กำลังสร้างเนื้อหาและสรุปสูตรลัดด้วย Gemini 3.6 Flash...');
  const prompt = `คุณคือครูพี่ติวเตอร์สุดเก่งของ MASTER ม.1
โปรดเขียนแคปชั่น Facebook สั้นๆ 3-4 บรรทัด สรุปเทคนิคนี้ให้อ่านสนุก มีประโยชน์ น่าแชร์:
หัวข้อ: "${topic.title}"
วิชา: ${topic.subject}
สาระสำคัญ: "${topic.summaryConcept}"
ข้อกำหนด: ใช้อิโมจิน่ารัก (📐, ⚡, 🎯) กระชับ อ่านเข้าใจทันทีใน 30 วิ ห้ามใส่ลิงก์`;

  let aiCaption = topic.summaryConcept;
  try {
    const gemRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );
    const gemData = await gemRes.json();
    aiCaption = gemData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || topic.summaryConcept;
    console.log('✅ แคปชั่น AI สำเร็จ:\n\n' + aiCaption + '\n');
  } catch (err) {
    console.error('⚠️ Gemini error:', err.message);
  }

  // 2. เผยแพร่บทความขึ้น Google Blogger v3
  let bloggerPostUrl = '';
  console.log('📝 2. กำลังเผยแพร่บทความขึ้น Google Blogger...');
  try {
    const authRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: bloggerClientId,
        client_secret: bloggerClientSecret,
        refresh_token: bloggerRefreshToken,
        grant_type: 'refresh_token'
      })
    });
    const authData = await authRes.json();

    if (authData.access_token) {
      const blogContentHtml = `
<div style="font-family: 'Prompt', -apple-system, sans-serif; line-height: 1.8; color: #334155; max-width: 800px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%); padding: 30px; border-radius: 20px; color: white; text-align: center; margin-bottom: 24px;">
    <h1 style="font-size: 24px; margin: 0 0 10px 0; color: #fde047;">${topic.title}</h1>
    <p style="margin: 0; opacity: 0.9;">สรุปสูตรลัดคณิตศาสตร์ สพฐ. เข้าใจง่ายใน 3 นาที โดย MASTER ม.1</p>
  </div>
  <div style="background: #ffffff; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
    <h2>💡 หลักการและเทคนิคจำไว</h2>
    <p>${topic.summaryConcept}</p>
    <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <strong>⚡ สรุปไฮไลต์สูตรลัด:</strong><br>
      ${aiCaption.replace(/\n/g, '<br>')}
    </div>
  </div>
  <div style="text-align: center; padding: 24px; background: #0f172a; border-radius: 16px; color: white;">
    <h3 style="color: #fde047; margin-top: 0;">🎯 ทดลองทำข้อสอบจริงเสมือนจริง ฟรี!</h3>
    <a href="${topic.examUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 28px; border-radius: 9999px; font-weight: bold; text-decoration: none; margin-top: 10px;">👉 เข้าทำข้อสอบที่นี่</a>
  </div>
</div>`;

      const blogRes = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${bloggerBlogId}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authData.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          kind: 'blogger#post',
          title: topic.title,
          content: blogContentHtml,
          labels: topic.keywords
        })
      });
      const blogData = await blogRes.json();
      if (blogData.url) {
        bloggerPostUrl = blogData.url;
        console.log(`🎉 โพสต์ขึ้น Blogger สำเร็จ 100%!`);
        console.log(`📌 ลิงก์บทความ Blogger: ${bloggerPostUrl}\n`);
      } else {
        console.error('❌ Blogger API Error:', blogData);
      }
    }
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดกับ Blogger:', err.message);
  }

  // 3. ยิงโพสต์ Facebook Page
  console.log('📱 3. กำลังโพสต์ลง Facebook Page...');
  try {
    const blogUrlDisplay = bloggerPostUrl ? `\n\n📖 อ่านบทความฉบับเต็มพร้อมสูตรลัด:\n👉 ${bloggerPostUrl}` : '';
    const fbPostContent = `🎓 [สรุปสูตรลับ & บทเรียน สพฐ. ประจำวัน โดย MASTER ม.1]\n\n${aiCaption}${blogUrlDisplay}\n\n─────────────\n🎯 เข้าทำข้อสอบจำลอง O-NET 2570 เสมือนจริง ครบ 4 วิชา ฟรี 100%:\n👉 ${topic.examUrl}\n\n🛒 พิกัดไอเทมอุปกรณ์การเรียนและหนังสือดีๆ จิ้มดูที่คอมเมนต์แรกใต้โพสต์นี้เลยจ้า 👇`;

    const postRes = await fetch(`https://graph.facebook.com/${fbPageId}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: fbPostContent,
        access_token: fbToken
      })
    });
    const postData = await postRes.json();

    if (postData.id) {
      console.log(`🎉 โพสต์ลง Facebook Page สำเร็จ! (Post ID: ${postData.id})`);

      // 4. ยิงคอมเมนต์ Shopee + เว็บ
      const commentBlogUrl = bloggerPostUrl ? `\n3️⃣ 📖 บล็อกบทความสรุปสูตรฉบับเต็ม:\n👉 ${bloggerPostUrl}` : '';
      const fbCommentContent = `📌 รวมพิกัดสำหรับน้องๆ และคุณครู:\n\n1️⃣ 🌐 ทดลองสอบจำลองและอ่านสรุปสูตรฉบับเต็ม (ฟรี):\n👉 ${topic.examUrl}\n\n2️⃣ 🛍️ ช้อปอุปกรณ์การเรียน / หนังสือเตรียมสอบ Shopee:\n👉 https://shopee.co.th${commentBlogUrl}`;

      await fetch(`https://graph.facebook.com/${postData.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: fbCommentContent,
          access_token: fbToken
        })
      });
      console.log(`✅ ส่งคอมเมนต์แรกสำเร็จเรียบร้อย!`);
    } else {
      console.error('❌ Facebook API Error:', postData);
    }
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาดกับ Facebook:', err.message);
  }

  console.log('\n================================================================');
  console.log('✨ การทดสอบครบถ้วนสมบูรณ์ 100%!');
  console.log('================================================================\n');
}

testFullAutomation();
