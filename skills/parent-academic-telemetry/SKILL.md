---
name: parent-academic-telemetry
description: >-
  Authentic Academic Progress Telemetry & Parent Dispatcher Standard.
  Enforces 56-module authentic Supabase progress denominator (Rule 25 No Mocks),
  user-scoped multi-account storage isolation (Rule 26), 1-on-1 personalized Telegram/LINE
  progress card delivery, and official printable academic report cards (PDF).
---

# 📊 Parent Academic Telemetry & 1-on-1 Report Dispatcher

`parent-academic-telemetry` คือ Custom Skill สำหรับระบบวัดและรายงานพัฒนาการของนักเรียนสู่ผู้ปกครองแบบแม่นยำ 100% ยึดหลัก **Zero-Placeholder Invariant** รายงานผลจากฐานข้อมูล Supabase จริง และมีระบบส่งต่อผลการเรียนเข้า Telegram/LINE ผู้ปกครองใน 1 คลิก

--------------------------------------------------------------------------------

## 🛡️ กฎเหล็กประจำระบบ (Academic Invariants - Rule 25 & 26)

### 1. Authentic Progress Denominator (ฐาน 56 โมดูลจริง)
* ทุกใบรายงานผลและแถบเปอร์เซ็นต์ ต้องคำนวณจากสัดส่วนของ **56 บทเรียนหลักสูตรแกนกลาง สพฐ.** เท่านั้น:
  - 🔢 คณิตศาสตร์: 16 บท
  - 🔬 วิทยาศาสตร์: 16 บท
  - 🗣️ ภาษาอังกฤษ: 16 บท
  - 📖 ภาษาไทย: 8 บท
* **ห้ามเด็ดขาด**: การใช้คะแนนสุ่ม (Random Score), ข้อมูลจำลอง (Mock Data), หรือชื่อจำลองในรายงานทางการ

### 2. User-Scoped Local Storage Isolation
* ทุกแคชต้องผูกกับ User ID: `master_m1_progress_${userId}` เพื่อป้องกันการดึงคะแนนเก่าเมื่อมีการสลับบัญชีในเครื่องเดียวกัน

--------------------------------------------------------------------------------

## 🚀 ฟังก์ชันการทำงานหลัก (Core Features)

1. **1-Click 1-on-1 Telegram Dispatcher (`/api/admin/send-telegram-report`)**:
   - ดึงคะแนน Pre-Test และแบบฝึกหัดจริงของนักเรียน
   - แปลงเป็นข้อความสรุปพัฒนาการ (จุดแข็งสีเขียว 🟢, จุดอ่อนเร่งด่วนสีแดง 🔴, คำแนะนำวิชาการ)
   - ส่งตรงเข้าแชท Telegram ของผู้ปกครองพร้อมลิงก์รายงานเฉพาะบุคคล

2. **ใบรายงานผลทางการสั่งพิมพ์ได้ (`/reports/print`)**:
   - ออกแบบตามฟอร์แมตเอกสารราชการ/สถาบันการศึกษา
   - มีตราสัญลักษณ์, ตารางสรุป 4 วิชา, กราฟ Radar ชี้สมรรถนะ, และปุ่มบันทึกเป็น PDF ในคลิกเดียว

3. **Weekly Academic Digest Cron (`/api/cron/weekly-digest`)**:
   - ระบบประมวลผลอัตโนมัติทุกวันอาทิตย์ สรุปเวลาเรียนสะสม, จำนวนข้อที่ทำ, และเหรียญรางวัลที่ได้รับประจำสัปดาห์
