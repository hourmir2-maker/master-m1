require('dotenv').config();
const axios = require('axios');

async function checkPageTasks() {
  const token = process.env.FB_PAGE_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  try {
    // ดึงข้อมูลเพจพร้อมกับ tasks (สิทธิ์ในการทำงานของคีย์บนเพจนี้)
    const response = await axios.get(`https://graph.facebook.com/${pageId}?fields=name,tasks,id&access_token=${token}`);
    
    console.log("\n================ รายละเอียดของคีย์บนเพจ ================");
    console.log(`- ชื่อเพจ: ${response.data.name}`);
    console.log(`- Page ID: ${response.data.id}`);
    
    if (response.data.tasks) {
      console.log("- สิทธิ์การทำงานบนเพจที่ได้สิทธิ์ผ่านคีย์นี้ (Tasks):");
      response.data.tasks.forEach(task => {
        console.log(`  🔹 ${task}`);
      });
    } else {
      console.log("⚠️ ไม่พบฟิลด์ Tasks (คีย์นี้อาจจะไม่มีสิทธิ์เป็นแอดมินหรือผู้พัฒนาที่เพจนี้)");
    }
    console.log("=====================================================");

  } catch (error) {
    console.error("❌ ดึงข้อมูลเพจล้มเหลว:");
    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

checkPageTasks();
