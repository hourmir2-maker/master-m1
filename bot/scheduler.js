require('dotenv').config();
const { exec } = require('child_process');

// สถานะการโพสต์สลับ (0 = โพสต์สรุปบทความการศึกษา MASTER ม.1 + ลิงก์ Shopee, 1 = โพสต์ป้ายยาสินค้า Shopee ตรง)
let postTypeToggle = 0; 

// กำหนดช่วงเวลาทำงาน (เริ่ม 8 โมงเช้า ถึง 20:00 น.)
const START_HOUR = 8;
const END_HOUR = 20; 

// กำหนดเวลาหน่วงในการโพสต์แต่ละรอบ: 1.5 ชั่วโมง (90 นาที)
const POST_INTERVAL_MS = 1.5 * 60 * 60 * 1000; 

function runScript(scriptName) {
  return new Promise((resolve) => {
    console.log(`[${new Date().toLocaleString()}] 🚀 กำลังสั่งรัน: node ${scriptName}`);
    
    exec(`node ${scriptName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ เกิดข้อผิดพลาดใน ${scriptName}:`, error.message);
      }
      if (stdout) console.log(stdout.trim());
      if (stderr) console.error(stderr.trim());
      resolve();
    });
  });
}

async function checkAndPost() {
  const currentHour = new Date().getHours();
  console.log(`[${new Date().toLocaleString()}] ตรวจสอบเวลาปัจจุบัน: ${currentHour}:00 น.`);

  // 1. ตรวจสอบว่าอยู่ในช่วงเวลานอนหลับหรือไม่
  if (currentHour < START_HOUR || currentHour > END_HOUR) {
    console.log("💤 [โหมดนอนหลับ] นอกเวลาทำงานของบอท ระบบหยุดพักชั่วคราว");
    return;
  }

  // 2. อยู่ในช่วงเวลาทำงาน -> สลับโพสต์บทความการศึกษา และสินค้า Shopee
  if (postTypeToggle === 0) {
    console.log("🎓 ถึงคิวโพสต์: สรุปบทความการศึกษา & สูตรลับ สพฐ. (MASTER ม.1) + ลิงก์ Shopee");
    await runScript('news_bot.js');
    postTypeToggle = 1; // สลับรอบหน้าให้โพสต์สินค้า
  } else {
    console.log("🛒 ถึงคิวโพสต์: แนะนำสินค้าอุปกรณ์การเรียน Shopee ปักตะกร้า");
    await runScript('bot.js');
    postTypeToggle = 0; // สลับรอบหน้าวนกลับมาโพสต์บทความการศึกษา
  }
}

// ฟังก์ชันเริ่มต้นควบคุมการจัดเวลา
function startScheduler() {
  console.log("==================================================");
  console.log(" ⏱️ ระบบจัดตารางเวลาโพสต์บทความการศึกษา & Shopee เริ่มทำงาน!");
  console.log(`   - ช่วงเวลาทำงาน: ${START_HOUR}:00 - ${END_HOUR}:59 น.`);
  console.log(`   - ความถี่การโพสต์: ทุกๆ 1.5 ชั่วโมง`);
  console.log("   - แหล่งเนื้อหา: คลังบทความการศึกษา MASTER ม.1 100%");
  console.log("==================================================");

  // รันตรวจสอบครั้งแรกทันทีเมื่อเปิดโปรแกรม
  checkAndPost();

  // ตั้งค่าตรวจสอบและโพสต์ซ้ำตามรอบเวลา
  setInterval(checkAndPost, POST_INTERVAL_MS);
}

startScheduler();
