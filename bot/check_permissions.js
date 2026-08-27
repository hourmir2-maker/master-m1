require('dotenv').config();
const axios = require('axios');

async function checkPermissions() {
  const token = process.env.FB_PAGE_TOKEN;
  
  try {
    const response = await axios.get(`https://graph.facebook.com/me/permissions?access_token=${token}`);
    console.log("\n================ สิทธิ์ในคีย์นี้ปัจจุบัน ================");
    response.data.data.forEach(item => {
      console.log(`- ${item.permission}: ${item.status}`);
    });
    console.log("=================================================");
  } catch (error) {
    console.error("❌ ไม่สามารถดึงสิทธิ์ในคีย์ได้:");
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

checkPermissions();
