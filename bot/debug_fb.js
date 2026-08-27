require('dotenv').config();
const axios = require('axios');

async function debugFacebook() {
  const token = process.env.FB_PAGE_TOKEN;
  
  if (!token || token.includes('YOUR_')) {
    console.log("❌ ไม่พบ FB_PAGE_TOKEN ใน .env");
    return;
  }

  console.log("กำลังตรวจสอบสิทธิ์ของคีย์เฟซบุ๊กของคุณ...");
  
  try {
    // 1. ตรวจสอบว่าคีย์นี้เป็นของใคร หรือของเพจไหน
    const meRes = await axios.get(`https://graph.facebook.com/me?fields=id,name&access_token=${token}`);
    console.log("\n================ ข้อมูลคีย์ปัจจุบัน ================");
    console.log(`- ชื่อบัญชี/เพจ: ${meRes.data.name}`);
    console.log(`- หมายเลข ID ในคีย์: ${meRes.data.id}`);
    console.log("=================================================");

    // 2. ดึงรายการเพจทั้งหมดที่คีย์นี้สามารถเข้าจัดการได้
    console.log("\nกำลังค้นหารายชื่อเพจทั้งหมดที่คุณเป็นแอดมิน...");
    const accountsRes = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${token}`);
    
    const pages = accountsRes.data.data;
    if (!pages || pages.length === 0) {
      console.log("❌ ไม่พบเพจที่คุณมีสิทธิ์จัดการในคีย์นี้ กรุณาตรวจสอบการเลือกเพจตอนสร้างแอป");
    } else {
      console.log(`\nพบเพจทั้งหมด ${pages.length} เพจ ดังนี้:`);
      pages.forEach((page, index) => {
        console.log(`\n[เพจที่ ${index + 1}]`);
        console.log(`- ชื่อเพจ: ${page.name}`);
        console.log(`- Page ID (สำหรับใส่ช่อง FB_PAGE_ID): ${page.id}`);
        console.log(`- คีย์เฉพาะของเพจนี้ (Page Access Token): ${page.access_token}`);
      });
    }

  } catch (error) {
    console.error("\n❌ เกิดข้อผิดพลาดในการเรียกข้อมูลจาก Facebook:");
    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

debugFacebook();
