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
