# กฎเฉพาะโปรเจกต์ MASTER ม.1 (C:\Users\bkky9\master-m1)

## 🎯 เกี่ยวกับโปรเจกต์
- **ชื่อระบบ**: MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ
- **เป้าหมาย**: ติวสอบเข้มข้น ม.1 (คณิตศาสตร์, วิทยาศาสตร์, ภาษาอังกฤษ) พร้อมระบบ AI วิเคราะห์จุดอ่อน และจัดแผนการเรียนเฉพาะบุคคล
- **ผู้พัฒนา**: Phairot Makkaew ร่วมกับ Gemini AI
- **Production URL**: https://master-m1.vercel.app

---

## 🛡️ กฎเหล็กและการพัฒนา (Development Rules)

### Rule 1 — หลีกเลี่ยงข้อผิดพลาด 409 Conflict ใน Supabase Progress
- **ห้าม** ใช้ `supabase.from('progress').upsert(...)` จาก Browser Client โดยตรงเมื่อไม่มี Unique Constraint ที่แน่นอน
- ทุกการบันทึกผลคะแนนแบบฝึกหัด/โมดูล ต้องส่งผ่าน **Internal Server API (`/api/progress`)** และใช้กลยุทธ์ **Delete-then-Insert** หรือ **Check-then-Update** เสมอ

### Rule 2 — ระบบสุ่มโจทย์ AI และ Multi-Set Question Fallback
- ระบบสุ่มข้อสอบต้องมี **Multi-Set Question Bank (Set A / Set B / Set C)** สำรองในตัวเสมอ
- ฝั่ง API Route (`/api/lessons/generate-quiz`) ต้องตอบกลับด้วย `Status 200 OK` พร้อมชุดโจทย์สำรองเสมอ แม้ API Key หรือการเชื่อมต่อภายนอกจะติดขัด เพื่อป้องกัน `500 Internal Server Error`

### Rule 3 — ลิขสิทธิ์และ Footer Attribution
- ทุกหน้าของเว็บ MASTER ม.1 ต้องมี Footer แสดงข้อความลิขสิทธิ์และชื่อผู้พัฒนา:
  ```text
  © 2026 MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ | สงวนลิขสิทธิ์
  พัฒนาโดย Phairot Makkaew ร่วมกับ Gemini AI
  ```

### Rule 4 — ระบบรายงานข้อผิดพลาด (Feedback & Bug Reporting)
- ในหน้าสรุปบทเรียนและข้อสอบทุกข้อ ต้องมีปุ่ม `[ 🚩 แจ้งจุดผิด ]` เชื่อมต่อกับ `ReportModal` และ API `/api/reports` เพื่อเก็บข้อเสนอแนะในการปรับปรุงเนื้อหา

### Rule 5 — Vercel Deployment Commands
- การ Deploy สู่ Vercel Production ต้องระบุ `--scope hourmir2-3686s-projects`:
  ```bash
  npx vercel --prod --yes --scope hourmir2-3686s-projects
  ```

### Rule 6 — Quiz Submission UX & Instant Feedback Invariant
- **ห้าม** ปิดการทำงาน (Disable) ปุ่มส่งคำตอบโดยไม่แสดงข้อความเตือนเด็ดขาด
- เมื่อผู้ใช้กดส่งคำตอบขณะที่ยังตอบไม่ครบ ต้องแสดง **Warning Banner** ระบุข้อที่ยังไม่ได้ทำทันที (เช่น `⚠️ ยังไม่ได้ตอบข้อ 2, 4`)
- เมื่อส่งตรวจสำเร็จ ต้องแสดง **Score Result Dialog Popup** กลางหน้าจอเพื่อสรุปผลคะแนนอย่างชัดเจนทันที พร้อมปุ่มดูเฉลยละเอียดและลองทำใหม่

### Rule 7 — 24-Module Full Curriculum Synchronization
- โครงสร้างระบบหลักสูตรกำหนดไว้ที่ **24 โมดูล (วิชาละ 8 โมดูล)**
- ทุกส่วนการคำนวณในหน้า Dashboard (`src/app/dashboard/page.tsx`), Landing Page (`src/app/page.tsx`), และ Learning Path (`src/app/learning-path/page.tsx`) ต้องอ้างอิงฐาน 24 โมดูลและ 8 โมดูลต่อวิชาเสมอ (เช่น `Math.max(0, 24 - totalCompleted)`)

### Rule 8 — High-Yield Speed Math & Shortcuts Standard
- บทเรียนและข้อสอบต้องมีสูตรลัดประจำเรื่องเสมอ:
  1. การถอดรูทเร็วใน 3 วินาที (ตัด 2 ตัวท้าย ส่องหลักหน่วย & เทียบเลขลงท้าย 5)
  2. ยกกำลังสองเลขลงท้าย 5: $85^2 \rightarrow (8\times 9)25 = 7,225$
  3. คูณ 11 แบบแยกหัวท้าย
  4. พื้นที่ใบไม้แรเงาในสี่เหลี่ยมจัตุรัส: $\frac{4}{7}a^2$
  5. แปลงเปอร์เซ็นต์เป็นมุมองศาบนแผนภูมิวงกลม: $\text{มุม} = \% \times 3.6^\circ$

### Rule 9 — Dual-Save Progress Strategy (LocalStorage + Supabase)
- ทุกการบันทึกผลการทำแบบฝึกหัด ต้องบันทึกลง LocalStorage (`master_m1_progress`) เสมอเพื่อความเสถียร 100%
- พร้อมซิงค์ขึ้น Supabase Database (`/api/progress`) เมื่อมีผู้ใช้เข้าสู่ระบบ
- ทุกหน้าที่แสดงผล (Dashboard, หน้ารายวิชา) ต้อง Merge ข้อมูลจากทั้ง 2 แหล่ง และเลือกคะแนนที่ดีที่สุดเสมอ

### Rule 10 — Post-Quiz UX & Next Module Navigation
- การ์ดสรุปผลท้ายบทเรียนต้องแสดงสถานะผ่านเกณฑ์ชัดเจน (`✅ ผ่านเกณฑ์บทเรียนแล้ว (บันทึกสำเร็จ)`) เมื่อคะแนน $\ge 60\%$
- ต้องคำนวณและแสดงปุ่ม `[ ➡️ ไปต่อโมดูลถัดไป: {ชื่อโมดูล} ]` เสมอ เพื่อความลื่นไหลในการเรียนรู้
- หน้ารายวิชาต้องแสดงตรา `✓ ผ่านแล้ว (xx%)` สีเขียวบนโมดูลที่ทำคะแนนผ่านเกณฑ์แล้ว และเปลี่ยนปุ่มเป็น `[ ทบทวน / ทำซ้ำ ]`

---

## 🗺️ แผนงานและฟีเจอร์ในอนาคต (Future Roadmap)
- ดูรายละเอียดฟีเจอร์ Gamification, Mock Exam, Printable PDF, Audio TTS, และระบบส่งผลให้ผู้ปกครอง ได้ที่ [ROADMAP.md](./ROADMAP.md)
