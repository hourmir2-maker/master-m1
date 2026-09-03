---
name: shopee-affiliate-automation
description: >-
  Automated E-Commerce & Educational Supplies Affiliate Bot Framework.
  Features SQLite product queue management, duplicate link prevention, Gemini AI Thai creative
  copywriting for social media captions, and automated multi-channel posting (Facebook, LINE, Telegram).
---

# 🛍️ Shopee / E-Commerce Affiliate Auto-Poster Bot Framework

`shopee-affiliate-automation` คือ Custom Skill สำหรับระบบสร้างรายได้เสริมอัตโนมัติ (Affiliate Marketing) สำหรับการแนะนำหนังสือเรียน อุปกรณ์เครื่องเขียน และสื่อการศึกษา ผ่าน Node.js, SQLite และ Gemini AI

--------------------------------------------------------------------------------

## 🛠️ สถาปัตยกรรมระบบคิว (Queue Architecture)

```text
[เพิ่มสินค้า: node add_product.js "ชื่อสินค้า" ราคา "ลิงก์"]
                     ↓
[ฐานข้อมูล SQLite: bot/affiliate_bot.db (เช็ค URL ซ้ำ)]
                     ↓
[สั่งรัน: npm start (ดึงสินค้าคิวเก่าสุดที่ยังไม่โพสต์)]
                     ↓
[Gemini AI: แต่งแคปชันภาษาไทย ป้ายยาน่ารัก เป็นมิตร มีประโยชน์]
                     ↓
[โพสต์ลงช่องทางเป้าหมาย: LINE Notify / Facebook Page / Telegram]
                     ↓
[อัปเดตสถานะ: posted = 1]
```

--------------------------------------------------------------------------------

## 💻 คำสั่งสำคัญในการใช้งาน (`bot/`)

### 1. เริ่มสร้างฐานข้อมูล
```bash
npm run init-db
```

### 2. เพิ่มสินค้าเข้าคิวรอโพสต์
```bash
node add_product.js "เครื่องคิดเลขวิทยาศาสตร์ Casio FX-991CW สำหรับ ม.ต้น" 890 "https://shopee.co.th/product/..."
```

### 3. ประมวลผลและโพสต์สินค้า 1 รายการ
```bash
npm start
```
*ระบบจะเรียก Gemini AI แต่งข้อความและส่งออกทางช่องทางที่กำหนดอัตโนมัติ*

--------------------------------------------------------------------------------

## ⚙️ การตั้งค่า Environment Variables (`.env`)
* `GEMINI_API_KEY`: คีย์สำหรับขับเคลื่อน AI เจนแคปชัน
* `LINE_NOTIFY_TOKEN`: โทเคนส่งเข้ากลุ่ม LINE
* `FACEBOOK_PAGE_ACCESS_TOKEN`: โทเคนสำหรับโพสต์ลงหน้าเพจ Facebook อัตโนมัติ
