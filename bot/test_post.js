require('dotenv').config();
const axios = require('axios');

async function testPostDetailed() {
  const token = process.env.FB_PAGE_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  console.log(`กำลังส่งโพสต์จำลองไปที่ Page ID: ${pageId}...`);

  try {
    const response = await axios.post(`https://graph.facebook.com/${pageId}/feed`, {
      message: "ทดสอบการทำงานของบอทโพสต์อัตโนมัติ 🤖",
      access_token: token
    });
    console.log("✅ โพสต์สำเร็จ!", response.data);
  } catch (error) {
    console.log("\n❌ เกิดข้อผิดพลาดรหัส 403 จาก Facebook โดยมีรายละเอียดดังนี้:");
    if (error.response) {
      console.log(JSON.stringify(error.response.data, null, 2));
    } else {
      console.log(error.message);
    }
  }
}

testPostDetailed();
