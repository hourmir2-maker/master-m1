---
name: school-portal-onboarding
description: >-
  Dual-Pathway School Management & Student Roster Onboarding Framework.
  Implements School Onboarding Wizard, dynamic 6-character class code generation,
  CSV and text paste student roster ingestion, and zero-email student login pathway.
---

# 🏫 School Portal Onboarding & Dual-Pathway Framework

`school-portal-onboarding` คือ Custom Skill สำหรับระบบบริหารจัดการสถานศึกษาและห้องเรียน (School Portal) ออกแบบด้วยสถาปัตยกรรม **Dual-Pathway** เพื่อให้นักเรียนระดับประถมและมัธยมต้นสามารถเข้าเรียนได้ง่ายโดยไม่ต้องใช้อีเมลส่วนตัว

--------------------------------------------------------------------------------

## 🌟 3 เสาหลักของสถาปัตยกรรม Dual-Pathway

### 1. Zero-Email Student Entry Pathway
* **นักเรียนทั่วไป:** ล็อกอินด้วยอีเมล/รหัสผ่านตามปกติ (`/login`)
* **นักเรียนในโรงเรียนพันธมิตร:** เข้าผ่านหน้า `/school` ด้วย:
  1. รหัสห้องเรียน 6 ตัวอักษร (เช่น `MATH01`, `SCI701`)
  2. เลขประจำตัวนักเรียน หรือชื่อ-นามสกุล
  *ไม่ต้องใช้อีเมล ไม่ต้องจำรหัสผ่าน ปลอดภัยสำหรับเด็ก 100%*

### 2. School Onboarding Wizard & Class Creator
* ครูผู้ดูแลเปิดโรงเรียนใหม่ผ่านระบบ Wizard ใน 3 นาที
* กำหนดชื่อโรงเรียน, ระดับชั้น, และสร้างห้องเรียนพร้อมรับ Class Code เฉพาะตัวทันที

### 3. Student Roster Import Engine
รองรับการนำเข้ารายชื่อนักเรียน 2 รูปแบบ:
* **อัปโหลดไฟล์ CSV**: คอลัมน์ `student_id`, `full_name`, `grade`
* **วางข้อความโดยตรง (Text Paste)**: วางรายชื่อแบบคั่นด้วยบรรทัดหรือแท็บ ระบบจะ Parse และบันทึกเข้าตาราง `classrooms` และ `students` ใน Supabase อัตโนมัติ

--------------------------------------------------------------------------------

## 🗄️ โครงสร้างฐานข้อมูลหลัก (`school-schema.sql`)
* `schools`: ข้อมูลโรงเรียน, รหัสโรงเรียน, จังหวัด, อีเมลผู้ดูแล
* `classrooms`: รหัสห้องเรียน (`class_code`), ชื่อห้อง, ครูประจำวิชา
* `students`: รหัสนักเรียน, ชื่อเต็ม, โรงเรียน, ห้องเรียน
* `submissions`: คะแนนการทำแบบฝึกหัดและการส่งงานของนักเรียนในห้อง
