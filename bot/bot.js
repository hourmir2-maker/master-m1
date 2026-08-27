require('dotenv').config();
const axios = require('axios');
const db = require('./database');

// 1. ฟังก์ชันแปลงลิงก์ปกติให้เป็นลิงก์ Affiliate นายหน้า
async function convertToAffiliateLink(originalUrl) {
  // หากลิงก์ที่ผู้ใช้ใส่เข้ามาเป็นลิงก์นายหน้าที่แปลงสำเร็จรูปแล้ว ให้ส่งคืนใช้โพสต์ได้ทันที
  if (originalUrl.includes('shope.ee') || originalUrl.includes('s.shopee.co.th') || originalUrl.includes('s.lazada')) {
    console.log("ℹ️ พบลิงก์นายหน้าสำเร็จรูป: นำไปใช้งานโดยตรง");
    return originalUrl;
  }

  const shopeeAppKey = process.env.SHOPEE_APP_KEY;
  const shopeeSecret = process.env.SHOPEE_APP_SECRET;

  // หากผู้ใช้ยังไม่ได้กรอก API Key ทางการ (ระหว่างรออนุมัติ)
  if (!shopeeAppKey || !shopeeSecret) {
    console.log("⚠️ ไม่พบ Shopee API Key: ใช้โหมดลิงก์ทดสอบ (Mock Link)");
    const dummyAffId = process.env.MY_AFFILIATE_ID || 'member_id';
    return `${originalUrl}?utm_source=affiliate&utm_medium=bot&sub_id=${dummyAffId}`;
  }

  try {
    // โค้ดสำหรับต่อ API จริงของ Shopee (Shopee Open API)
    // ส่ง Request ไปยัง endpoint แปลง url (generateLink)
    // สำหรับผู้ใช้ระดับเริ่มต้น สามารถใช้ระบบแปลงลิงก์อัตโนมัติอื่นๆ หรือแชร์ลิงก์ตรงๆ ได้
    console.log("กำลังแปลงลิงก์ผ่าน Shopee API...");
    // หมายเหตุ: โครงสร้างจริงต้องลงลายมือชื่อดิจิทัล (Signature) ตามกฎของ Shopee
    // ในที่นี้เป็นตัวอย่างโครงสร้างพื้นฐาน
    return `https://shope.ee/converted_by_api`; 
  } catch (error) {
    console.error("แปลงลิงก์ผ่าน API ล้มเหลว:", error.message);
    return originalUrl;
  }
}

// ฟังก์ชันเรียกใช้ Gemini API พร้อมระบบ Retry เผื่อระบบขัดข้องชั่วคราว (เช่น Status 503 หรือ 429)
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
        delay *= 2; // เพิ่มเวลารอบสองเท่า
      } else {
        throw error;
      }
    }
  }
}

// 2. ฟังก์ชันใช้ Gemini API เขียนคำโฆษณา (Caption)
async function generateAIPost(productName, price) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const priceText = price && price > 0 ? `${price} บาท` : `ราคาพิเศษ มีส่วนลดเยอะมาก`;
  
  if (!geminiKey) {
    console.log("⚠️ ไม่พบ GEMINI_API_KEY: ใช้คำโฆษณาเริ่มต้น");
    return `👉 ของมันต้องมี! หมวดหมู่สินค้า "${productName}" ${priceText}! พิกัดช้อปด่วนเลยจ้า ลดราคาแรงมากตอนนี้`;
  }

  try {
    // เรียกใช้ Gemini 2.5 Flash API (ประหยัด รวดเร็ว และฟรีในระดับเริ่มต้น)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
    
    const prompt = `คุณคือผู้เชี่ยวชาญด้านการเขียนป้ายยาขายของในโซเชียลมีเดียชาวไทย โปรดเขียนแคปชั่นภาษาไทยที่อ่านแล้วตลก สนุกสนาน ดึงดูดสายตา มีการใส่อิโมจิชวนซื้อ เพื่อชวนคนมาคลิกช้อปปิ้งสินค้าหรือหมวดหมู่สินค้าชิ้นนี้:
ชื่อสินค้า/หมวดหมู่: "${productName}"
ราคา: ${priceText}
ข้อกำหนด:
- กระชับ ไม่ยาวเกินไป
- ห้ามใช้สัญลักษณ์ Markdown เช่นเครื่องหมายดอกจัน (**) หรือชาร์ป (#) เยอะเกินไปจนดูรก
- เขียนเน้นการป้ายยาและบอกสรรพคุณ/จุดเด่นของสินค้าให้คนอยากได้ ห้ามใส่มุกหรือคำชี้ชวนคลิกลิงก์ท้ายข้อความ (เช่น ห้ามมีคำว่า 'พิกัด...' หรือชี้ลิงก์) เพราะระบบจะนำไปต่อยอดและสร้างปุ่ม/ลิงก์แยกให้ในระบบโพสต์เอง`;

    const response = await callGeminiWithRetry(url, {
      contents: [{
        parts: [{ text: prompt }]
      }]
    });

    const aiText = response.data.candidates[0].content.parts[0].text;
    return aiText.trim();
  } catch (error) {
    console.error("เรียกใช้ Gemini API ผิดพลาด:", error.message);
    return `👉 ชี้เป้าโปรดี! ${productName} เหลือเพียง ${priceText}`;
  }
}

// 3. ฟังก์ชันโพสต์ลง LINE Notify (ฟรีและเหมาะกับใช้ทดสอบในกลุ่ม LINE)
async function postToLineNotify(message) {
  const lineToken = process.env.LINE_NOTIFY_TOKEN;
  if (!lineToken) {
    console.log("⚠️ ข้ามการส่ง LINE: เนื่องจากไม่พบ LINE_NOTIFY_TOKEN");
    return false;
  }

  try {
    const url = 'https://notify-api.line.me/api/notify';
    const params = new URLSearchParams();
    params.append('message', message);

    await axios.post(url, params, {
      headers: {
        'Authorization': `Bearer ${lineToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log("✅ ส่งข้อมูลเข้ากลุ่ม LINE สำเร็จ!");
    return true;
  } catch (error) {
    console.error("ส่ง LINE Notify ล้มเหลว:", error.message);
    return false;
  }
}

// 4. ฟังก์ชันโพสต์ลง Facebook Page (เมื่อใส่ Token เพจ)
async function postToFacebookPage(message, commentMessage) {
  const pageToken = process.env.FB_PAGE_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!pageToken || !pageId) {
    console.log("⚠️ ข้ามการส่ง Facebook: เนื่องจากไม่พบ FB_PAGE_TOKEN หรือ FB_PAGE_ID");
    return false;
  }

  try {
    const url = `https://graph.facebook.com/${pageId}/feed`;
    const response = await axios.post(url, {
      message: message,
      access_token: pageToken
    });
    console.log("✅ โพสต์เนื้อหาลง Facebook Page สำเร็จ!");

    const postId = response.data.id;
    if (postId && commentMessage) {
      console.log(`กำลังส่งคอมเมนต์ลิงก์ไปยังโพสต์ ID: ${postId}...`);
      const commentUrl = `https://graph.facebook.com/${postId}/comments`;
      await axios.post(commentUrl, {
        message: commentMessage,
        access_token: pageToken
      });
      console.log("✅ ส่งคอมเมนต์ลิงก์สำเร็จ!");
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

// === ฟังก์ชันการทำงานหลักของบอท ===
async function runBot() {
  console.log(`[${new Date().toLocaleString()}] เริ่มการตรวจสอบคิวสินค้า...`);
  
  try {
    // 1. ดึงสินค้าคิวถัดไปจาก SQLite
    const product = await db.getNextPendingProduct();
    
    if (!product) {
      console.log("❌ ไม่มีสินค้าค้างอยู่ในคิวโพสต์ โปรดเพิ่มรายการสินค้าลงในระบบฐานข้อมูล");
      return;
    }

    console.log(`พบสินค้าชิ้นถัดไปในคิว: ${product.name} (ราคา ${product.price} บาท)`);

    // 2. แปลงลิงก์เป็นลิงก์นายหน้า
    const affiliateUrl = await convertToAffiliateLink(product.original_url);

    // 3. เจนแคปชั่นด้วย AI
    const captionText = await generateAIPost(product.name, product.price);

    // ประกอบร่างเนื้อหาโพสต์แยกตามแพลตฟอร์ม
    // LINE Notify: แนบลิงก์ไปด้วยได้โดยตรง
    const linePostContent = `${captionText}\n\n🛒 สนใจช้อปกดลิงก์นี้เลยจ้า:\n👉 ${affiliateUrl}`;

    // Facebook: แยกเนื้อหาและคอมเมนต์เพื่อไม่ให้เพจโดนปิดกั้น Reach และลดสแปม
    const fbPostContent = `${captionText}\n\n📌 พิกัดสั่งซื้อสินค้าจิ้มที่คอมเมนต์แรกใต้โพสต์นี้เลยนะจ้า! 👇`;
    const fbCommentContent = `🛒 พิกัดสั่งซื้อ / เช็คราคาและโปรโมชั่น:\n👉 ${affiliateUrl}`;

    console.log("\n====== เนื้อหาที่จะโพสต์ (LINE Notify) ======\n");
    console.log(linePostContent);
    console.log("\n====== เนื้อหาที่จะโพสต์ (Facebook Feed) ======\n");
    console.log(fbPostContent);
    console.log("\n====== เนื้อหาคอมเมนต์ (Facebook Comment) ======\n");
    console.log(fbCommentContent);
    console.log("\n============================================\n");

    let isPosted = false;

    // 4. ดำเนินการส่งข้อมูลไปยังเป้าหมายที่ตั้งค่าไว้
    const postLineSuccess = await postToLineNotify(linePostContent);
    const postFbSuccess = await postToFacebookPage(fbPostContent, fbCommentContent);

    if (postLineSuccess || postFbSuccess) {
      isPosted = true;
    }

    if (isPosted) {
      // 5. บันทึกข้อมูลว่าส่งสำเร็จแล้วลง DB และบันทึกประวัติการส่ง (ใช้เนื้อหาที่โพสต์บน Facebook เป็นหลัก)
      await db.updateProductStatus(product.id, 'posted');
      await db.logPosting(product.id, fbPostContent, affiliateUrl, postFbSuccess ? 'facebook' : 'line');
      console.log("🎉 ทำงานเสร็จสิ้นการโพสต์สำหรับสินค้าชิ้นนี้!");
    } else {
      console.log("❌ ไม่มีช่องทางใดโพสต์สำเร็จ กรุณาตั้งค่า API Keys ใน .env");
    }

  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการรันบอท:", err);
  }
}

// รันโปรแกรมหลัก
runBot();
