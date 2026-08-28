require('dotenv').config();
const Parser = require('rss-parser');
const axios = require('axios');
const db = require('./database');

const parser = new Parser();

// ฟังก์ชันเรียกใช้ Gemini API พร้อมระบบ Retry เผื่อระบบขัดข้องชั่วคราว
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

// ฟังก์ชันใช้ Gemini API สรุปข่าวกีฬาแบบปลอดภัย 100%
async function summarizeSportsNews(title, snippet) {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.log("⚠️ ไม่พบ GEMINI_API_KEY: ใช้สไลด์เนื้อข่าวกีฬาเริ่มต้น");
    return `⚽ อัปเดตข่าวกีฬาเด็ด: ${title}\n\n${snippet}`;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiKey}`;
    
    const prompt = `คุณคือคอลัมนิสต์และบล็อกเกอร์ข่าวกีฬาชาวไทยที่มีความรู้ลึกซึ้งเรื่องฟุตบอลและกีฬาต่างประเทศ มีสไตล์การเขียนที่สนุกสนาน เป็นกันเอง ดึงดูดความสนใจได้ดี
โปรดสรุปและวิเคราะห์ข่าวกีฬาชิ้นนี้เป็นภาษาไทยสั้นๆ (ประมาณ 3-5 บรรทัด) ให้อ่านเข้าใจง่าย น่าตื่นเต้น และสนุกสนาน
ข้อมูลข่าว:
หัวข้อข่าว: "${title}"
รายละเอียด: "${snippet}"

ข้อกำหนดสำคัญมาก (ความปลอดภัย 100%):
- ห้ามพูดถึงเรื่องการพนัน การแทงบอล การเดิมพัน ราคาต่อรอง หรืออัตราใดๆ ทั้งสิ้นอย่างเด็ดขาด! เน้นเฉพาะเรื่องเกมกีฬา แท็กติก สถิติ ความรู้สึกของนักกีฬา และความสนุกสนานของการแข่งขันเท่านั้น
- กระชับ เข้าใจง่าย ใช้อิโมจิแนวฟุตบอล/กีฬาที่เหมาะสม (เช่น ⚽, 🏆, 🔴, 🔵, 🏃)
- ห้ามใช้สัญลักษณ์ Markdown เยอะเกินไป (ห้ามมีดอกจัน ** ซ้ำซ้อน)
- ลงท้ายด้วยประโยคชวนลุ้นแบบสนุกสนาน โดยห้ามพิมพ์คำว่า 'พิกัด...' หรือชี้ลิงก์แหล่งที่มาในตัวโพสต์หลักเด็ดขาด เนื่องจากระบบจะนำไปต่อยอดและสร้างคอมเมนต์แยกให้เอง`;

    const response = await callGeminiWithRetry(url, {
      contents: [{
        parts: [{ text: prompt }]
      }]
    });

    const aiSummary = response.data.candidates[0].content.parts[0].text;
    return aiSummary.trim();
  } catch (error) {
    console.error("เรียกใช้ Gemini API เพื่อสรุปข่าวกีฬาล้มเหลว:", error.message);
    return `⚽ อัปเดตข่าวกีฬาเด็ดวันนี้: ${title}`;
  }
}

// ฟังก์ชันส่งโพสต์เข้า Facebook Page พร้อมคอมเมนต์ลิงก์ที่มาข่าว
async function postSportsToFacebook(message, commentMessage) {
  const token = process.env.FB_PAGE_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!token || !pageId) {
    console.log("⚠️ ข้ามการโพสต์ Facebook: ขาดการตั้งค่าคีย์หรือไอดีเพจ");
    return false;
  }

  try {
    const url = `https://graph.facebook.com/${pageId}/feed`;
    const response = await axios.post(url, {
      message: message,
      access_token: token
    });
    console.log("✅ โพสต์ข่าวกีฬาลง Facebook Page สำเร็จ!");

    const postId = response.data.id;
    if (postId && commentMessage) {
      console.log(`กำลังส่งคอมเมนต์แหล่งข่าวไปยังโพสต์ ID: ${postId}...`);
      const commentUrl = `https://graph.facebook.com/${postId}/comments`;
      await axios.post(commentUrl, {
        message: commentMessage,
        access_token: token
      });
      console.log("✅ ส่งคอมเมนต์แหล่งข่าวกีฬาสร้างสรรค์สำเร็จ!");
    }
    return true;
  } catch (error) {
    console.error("โพสต์ข่าวกีฬาลง Facebook ล้มเหลว:", error.message);
    if (error.response) {
      console.error("รายละเอียด Error:", JSON.stringify(error.response.data, null, 2));
    }
    return false;
  }
}

// === ฟังก์ชันหลักของระบบโพสต์ข่าวกีฬาอัตโนมัติ ===
async function runSportsBot() {
  console.log(`[${new Date().toLocaleString()}] เริ่มค้นหาข่าวกีฬาล่าสุด...`);

  try {
    // ดึงข่าวฟุตบอลจาก BBC Sport Football
    const feed = await parser.parseURL('https://feeds.bbci.co.uk/sport/football/rss.xml');
    console.log(`พบข่าวกีฬาล่าสุดทั้งหมด ${feed.items.length} รายการ`);

    let selectedNews = null;

    // วนลูปค้นหาข่าวแรกที่ยังไม่ได้แชร์ลงระบบ
    for (const item of feed.items) {
      const isPosted = await db.hasNewsBeenPosted(item.link);
      if (!isPosted) {
        selectedNews = item;
        break;
      }
    }

    if (!selectedNews) {
      console.log("😴 ข่าวกีฬาทั้งหมดได้รับการโพสต์ไปแล้ว ไม่มีข่าวสารใหม่เพิ่มในรอบนี้");
      return;
    }

    console.log(`พบข่าวกีฬาใหม่ที่รอโพสต์: "${selectedNews.title}"`);

    // ใช้ AI เขียนและสรุปข่าวกีฬา
    const summary = await summarizeSportsNews(selectedNews.title, selectedNews.contentSnippet || selectedNews.content);

    // ประกอบร่างโพสต์ข่าวหลักและคอมเมนต์แบบปลอดภัย ปลอดการพนัน 100%
    const fbPostContent = `⚽ [อัปเดตข่าวกีฬาและฟุตบอลรอบโลก]\n\n${summary}\n\n📌 สนใจอ่านรายละเอียดและบทความเต็มจิ้มที่คอมเมนต์แรกใต้โพสต์นี้ได้เลยครับ 👇\n\n(ขอบคุณเนื้อหาข่าวกีฬาจากแหล่งที่มาต้นฉบับ หากต้องการปรับปรุงหรือนำออก สามารถติดต่อ Inbox แจ้งแอดมินได้ตลอดเวลาครับ)`;
    const fbCommentContent = `🔗 อ่านรายละเอียดและที่มาของข่าวฉบับเต็มได้ที่นี่:\n👉 ${selectedNews.link}`;

    console.log("\n====== เนื้อหาข่าวกีฬาที่จะโพสต์ ======\n");
    console.log(fbPostContent);
    console.log("\n====== เนื้อหาคอมเมนต์แหล่งข่าวกีฬา ======\n");
    console.log(fbCommentContent);
    console.log("\n======================================\n");

    // ส่งโพสต์ไปยังเพจ Facebook
    const success = await postSportsToFacebook(fbPostContent, fbCommentContent);

    if (success) {
      // บันทึกประวัติข่าวสารกีฬาเพื่อป้องกันการแชร์ซ้ำ
      await db.logNewsPosted(selectedNews.link, selectedNews.title);
      console.log("🎉 บันทึกประวัติข่าวกีฬาเรียบร้อยและจบการทำงานสำหรับหัวข้อนี้!");
    }

  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการรันระบบข่าวกีฬา:", error.message);
  } finally {
    db.db.close();
  }
}

runSportsBot();
