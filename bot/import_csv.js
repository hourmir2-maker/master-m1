const fs = require('fs');
const path = require('path');
const db = require('./database');

const csvPath = `C:\\Users\\bkky9\\Downloads\\ลิงก์ร้านค้าหลายลิงก์20260618145007-70bf2a1dae82434287b8a3e98aea9405.csv`;

async function importCsv() {
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ ไม่พบไฟล์ CSV ที่เส้นทาง: ${csvPath}`);
    return;
  }

  console.log("กำลังอ่านไฟล์ CSV...");
  const content = fs.readFileSync(csvPath, 'utf8');

  // ตัวแกะไฟล์ CSV (รองรับกรณีมี Newline ขึ้นบรรทัดใหม่ในช่องข้อมูลแบบใช้ฟันหนูครอบ)
  const rows = [];
  let row = [];
  let inQuotes = false;
  let currentVal = '';

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (currentVal || row.length > 0) {
        row.push(currentVal.trim());
        rows.push(row);
        currentVal = '';
        row = [];
      }
    } else {
      currentVal += char;
    }
  }
  if (currentVal || row.length > 0) {
    row.push(currentVal.trim());
    rows.push(row);
  }

  console.log(`อ่านข้อมูลเสร็จสิ้น พบแถวข้อมูลทั้งหมด ${rows.length - 1} รายการ (ไม่รวมหัวตาราง)`);

  let importCount = 0;
  let skipCount = 0;

  // วนลูปรันตั้งแต่แถวที่ 2 เป็นต้นไป (ข้ามแถวแรกที่เป็น Header)
  for (let i = 1; i < rows.length; i++) {
    const currentRow = rows[i];
    if (currentRow.length < 5) continue; // ข้ามแถวที่คอลัมน์ไม่ครบ

    const rawName = currentRow[0]; // คอลัมน์ที่ 1: ชื่อข้อเสนอ
    const url = currentRow[4]; // คอลัมน์ที่ 5: ลิงก์ข้อเสนอ

    // คลีนชื่อข้อเสนอ
    let name = rawName.replace(/^Direct\s+[\d\.]+%?\s*\/\s*Indirect\s+[\d\.]+%?\s*-\s*/i, '');
    
    // หากเป็นลิงก์ร้านค้า ให้ใส่สร้อยต่อท้ายนำร่องให้ AI
    if (csvPath.includes('ลิงก์ร้านค้า')) {
      name = `${name} (ร้านค้าแนะนำ)`;
    }
    
    // ตั้งราคาเริ่มต้นเป็น 0 (เพราะเป็นลิงก์หมวดหมู่ใหญ่ราคาพิเศษหลากหลาย)
    const price = 0;

    try {
      const changes = await db.addProduct(url, name, price);
      if (changes > 0) {
        console.log(`✅ เพิ่มคิวสำเร็จ: หมวดหมู่ "${name}" -> ${url}`);
        importCount++;
      } else {
        skipCount++;
      }
    } catch (err) {
      console.error(`❌ เกิดข้อผิดพลาดในการบันทึกรายชื่อ "${name}":`, err.message);
    }
  }

  console.log("\n================ สรุปผลการนำเข้า ================");
  console.log(`🎉 นำเข้าสำเร็จ: ${importCount} รายการ`);
  console.log(`⚠️ ข้ามเนื่องจากมีข้อมูลซ้ำอยู่แล้ว: ${skipCount} รายการ`);
  console.log("=================================================\n");

  db.db.close();
}

importCsv();
