require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const db = require('./database');

// ฟังก์ชันเรียกใช้ Gemini API พร้อมระบบ Retry
async function callGeminiWithRetry(url, data, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(url, data);
      return response;
    } catch (error) {
      const isTimeOutOr5xx = error.code === 'ECONNABORTED' || 
                            !error.response || 
                            error.response.status === 503 || 
                            error.response.status === 429 ||
                            error.response.status >= 500;
      if (isTimeOutOr5xx && i < retries - 1) {
        console.log(`⚠️ Gemini API ขัดข้อง (สถานะ: ${error.response ? error.response.status : 'Timeout/Network'}) - กำลังลองใหม่ในอีก ${delay / 1000} วินาที... (ครั้งที่ ${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
}

// ฟังก์ชันใช้ Gemini API สรุปบทความการศึกษาให้น่าอ่านและดึงดูดใจ
async function summarizeEduArticle(title, subject, summary, speedHack) {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.log("⚠️ ไม่พบ GEMINI_API_KEY: ใช้เนื้อหาเริ่มต้น");
    return `📚 [สรุปสูตรลัด ${subject}] ${title}\n\n💡 ${summary}\n\n⚡ สูตรลัด: ${speedHack}`;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
    
    const prompt = `คุณคือครูพี่ติวเตอร์สุดเก่งและเป็นกันเองของเพจการศึกษา "MASTER ม.1"
โปรดช่วยสรุปเนื้อหาบทเรียน/สูตรลัดการศึกษานี้ให้เป็นแคปชั่น Facebook สั้นๆ (3-5 บรรทัด) ให้อ่านสนุก เข้าใจง่าย มีประโยชน์ และน่าแชร์ต่อนักเรียนและผู้ปกครอง

ข้อมูลบทความ:
วิชา: ${subject}
หัวข้อ: "${title}"
เนื้อหาสาระสำคัญ: "${summary}"
เทคนิคพิเศษ/สูตรลัด: "${speedHack}"

ข้อกำหนด:
- กระชับ อ่านเข้าใจทันทีใน 30 วินาที ใช้อิโมจิน่ารักที่เข้ากับวิชา (เช่น 📐, 🔬, 📖, ⚡, 🎯)
- ห้ามใช้ดอกจัน (**) ซ้ำซ้อนจนรก
- เขียนปิดท้ายให้ชวนติดตามฝึกทำโจทย์ ไม่ต้องใส่ลิงก์ในเนื้อหา (เพราะระบบจะต่อท้ายลิงก์เว็บและ Shopee ให้เอง)`;

    const response = await callGeminiWithRetry(url, {
      contents: [{
        parts: [{ text: prompt }]
      }]
    });

    const aiText = response.data.candidates[0].content.parts[0].text;
    return aiText.trim();
  } catch (error) {
    console.error("เรียกใช้ Gemini API สรุปบทความล้มเหลว:", error.message);
    return `📚 [สรุปสูตรลัด ${subject}] ${title}\n\n💡 ${summary}\n\n⚡ สูตรลับ: ${speedHack}`;
  }
}

// ฟังก์ชันส่งโพสต์เข้า Facebook Page พร้อมส่งคอมเมนต์ลิงก์ Shopee + Web App
async function postEduArticleToFacebook(message, commentMessage) {
  const token = process.env.FB_PAGE_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!token || !pageId) {
    console.log("⚠️ ข้ามการโพสต์ Facebook: ขาดการตั้งค่าคีย์หรือไอดีเพจ (FB_PAGE_TOKEN / FB_PAGE_ID)");
    return false;
  }

  try {
    const url = `https://graph.facebook.com/${pageId}/feed`;
    const response = await axios.post(url, {
      message: message,
      access_token: token
    });
    console.log("✅ โพสต์บทความสรุปการศึกษาลง Facebook Page สำเร็จ!");

    const postId = response.data.id;
    if (postId && commentMessage) {
      console.log(`กำลังส่งคอมเมนต์ลิงก์เว็บไซต์ & ลิงก์ Shopee ไปยังโพสต์ ID: ${postId}...`);
      const commentUrl = `https://graph.facebook.com/${postId}/comments`;
      await axios.post(commentUrl, {
        message: commentMessage,
        access_token: token
      });
      console.log("✅ ส่งคอมเมนต์ลิงก์เว็บและพิกัด Shopee สำเร็จ!");
    }
    return true;
  } catch (error) {
    console.error("โพสต์ลง Facebook ล้มเหลว:", error.message);
    if (error.response) {
      console.error("รายละเอียด Error:", JSON.stringify(error.response.data, null, 2));
    }
    return false;
  }
}

// === ฟังก์ชันหลัก: รันระบบโพสต์บทความการศึกษา + ลิงก์ Shopee ===
async function runEduBot() {
  console.log(`[${new Date().toLocaleString()}] 🎓 เริ่มต้นระบบคัดย่อบทความบล็อกการศึกษา MASTER ม.1...`);

  try {
    // 1. อ่านบทความจากคลังบทความการศึกษา (edu_articles.json)
    const articlesPath = path.join(__dirname, 'edu_articles.json');
    if (!fs.existsSync(articlesPath)) {
      console.error("❌ ไม่พบไฟล์ edu_articles.json");
      return;
    }

    const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    console.log(`พบคลังบทความทั้งหมด ${articles.length} รายการ`);

    let selectedArticle = null;

    // 2. ค้นหาบทความที่ยังไม่เคยโพสต์
    for (const art of articles) {
      const isPosted = await db.hasArticleBeenPosted(art.id);
      if (!isPosted) {
        selectedArticle = art;
        break;
      }
    }

    // หากโพสต์ครบทุกบทความแล้ว ให้รีเซ็ตวนลูปบทความแรกมาโพสต์ซ้ำได้
    if (!selectedArticle) {
      console.log("🔄 โพสต์ครบทุกบทความแล้ว! ระบบจะวนลูปนำบทความมาโพสต์ซ้ำเพื่อรักษาความต่อเนื่อง");
      selectedArticle = articles[Math.floor(Math.random() * articles.length)];
    }

    console.log(`📖 เลือกบทความ: "${selectedArticle.title}" (วิชา: ${selectedArticle.subject})`);

    // 3. ใช้ AI สรุปเนื้อหาบทเรียนและสูตรลัด
    const aiSummary = await summarizeEduArticle(
      selectedArticle.title,
      selectedArticle.subject,
      selectedArticle.summary,
      selectedArticle.speedHack
    );

    // 4. ดึงสินค้า Shopee Affiliate จากฐานข้อมูลเพื่อแนบพิกัด
    const shopeeProduct = await db.getRandomAffiliateProduct();
    const productPriceText = shopeeProduct.price > 0 ? ` (ราคาพิเศษเพียง ${shopeeProduct.price} บาท)` : '';

    // 5. ประกอบร่างข้อความโพสต์และคอมเมนต์
    const fbPostContent = `🎓 [ติวเข้ม & สรุปสูตรลับ สพฐ. โดย MASTER ม.1]\n\n${aiSummary}\n\n─────────────\n🎯 เข้าทำข้อสอบจำลอง O-NET 2570 เสมือนจริง ครบ 4 วิชา ฟรี 100%:\n👉 ${selectedArticle.examUrl}\n\n🛒 พิกัดไอเทมอุปกรณ์การเรียนและหนังสือดีๆ จิ้มดูที่คอมเมนต์แรกใต้โพสต์นี้เลยจ้า 👇`;

    const fbCommentContent = `📌 รวมพิกัดสำหรับน้องๆ และคุณครู:\n\n1️⃣ 🌐 ทดลองสอบจำลองและอ่านสรุปสูตรฉบับเต็ม (ฟรี):\n👉 ${selectedArticle.examUrl}\n\n2️⃣ 🛍️ ช้อปอุปกรณ์การเรียน / หนังสือเตรียมสอบ Shopee:\n👉 ${shopeeProduct.name}${productPriceText}\n🔗 ${shopeeProduct.original_url}`;

    console.log("\n====== 📝 เนื้อหาโพสต์ Facebook ======\n");
    console.log(fbPostContent);
    console.log("\n====== 💬 เนื้อหาคอมเมนต์ (เว็บ + Shopee) ======\n");
    console.log(fbCommentContent);
    console.log("\n=====================================\n");

    // 6. โพสต์ลง Facebook Page
    const success = await postEduArticleToFacebook(fbPostContent, fbCommentContent);

    if (success) {
      // 7. บันทึกประวัติการโพสต์
      await db.logArticlePosted(selectedArticle.id, selectedArticle.title);
      console.log("🎉 บันทึกประวัติการโพสต์บทความเรียบร้อย!");
    }

  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการรันบอทการศึกษา:", error.message);
  } finally {
    db.db.close();
  }
}

runEduBot();
