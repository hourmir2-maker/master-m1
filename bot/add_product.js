const db = require('./database');

// ดึง Arguments จาก Command Line
// เช่น node add_product.js "ชื่อสินค้า" "ราคา" "ลิงก์"
const args = process.argv.slice(2);

if (args.length < 3) {
  console.log("\n❌ กรุณากรอกข้อมูลสินค้าให้ครบถ้วน!");
  console.log("วิธีใช้งาน:");
  console.log("node add_product.js \"ชื่อสินค้า\" ราคา \"ลิงก์สินค้า\"\n");
  console.log("ตัวอย่าง:");
  console.log("node add_product.js \"พัดลมพกพา ชาร์จ USB ลมแรง\" 199 \"https://shopee.co.th/product-12345\"\n");
  process.exit(1);
}

const name = args[0];
const price = parseFloat(args[1]);
const url = args[2];

if (isNaN(price)) {
  console.log("❌ ราคาต้องเป็นตัวเลขเท่านั้น!");
  process.exit(1);
}

console.log(`กำลังบันทึกสินค้าลงคิว...`);
console.log(`- ชื่อ: ${name}`);
console.log(`- ราคา: ${price} บาท`);
console.log(`- ลิงก์: ${url}`);

db.addProduct(url, name, price)
  .then((changes) => {
    if (changes > 0) {
      console.log("✅ เพิ่มสินค้าลงคิวสำเร็จแล้ว!");
    } else {
      console.log("⚠️ ลิงก์สินค้านี้มีอยู่ในฐานข้อมูลแล้ว (เพื่อป้องกันการโพสต์ซ้ำ)");
    }
    db.db.close();
  })
  .catch((err) => {
    console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", err.message);
  });
