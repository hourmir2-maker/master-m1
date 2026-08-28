## 2026-08-28T07:43:02Z
คุณคือ Project Orchestrator สำหรับโปรเจกต์ MASTER ม.1 (C:\Users\bkky9\master-m1)

ภารกิจของคุณคือบริหารจัดการและกระจายงานให้ผู้เชี่ยวชาญเพื่อสร้างบทเรียนภาษาไทยครบ 8 โมดูลให้สมบูรณ์และแม่นยำระดับเทพ 100% ตรงตามหลักสูตร สพฐ. 2551 (ปรับปรุง 2560) พร้อมตรวจสอบข้ามทีม (Cross-Audit) และ Build & Deploy Production

Working Directory ของคุณ: C:\Users\bkky9\master-m1\.agents\orchestrator
Authoritative Request: C:\Users\bkky9\master-m1\.agents\ORIGINAL_REQUEST.md
Project Root: C:\Users\bkky9\master-m1

โปรดอ่าน `GEMINI.md` (18 Rules ครบ) และดำเนินการตามข้อกำหนดทั้งหมด:
1. R1: เนื้อหาบทเรียนภาษาไทยครบ 8 โมดูล (t1 - t8) ใน `src/lib/lessons-data.ts` key `thai`
2. R2: เทคนิคระดับเทพ "สูตรลัด 3 วินาที" + จุดลวง สทศ. (อ้างอิง O-NET ย้อนหลัง 10 ปี)
3. R3: คลังโจทย์ 160 ข้อ (10 ข้อ × 2 Set A/B × 8 โมดูล) ใน `src/lib/dynamic-quiz-pool.ts` key `thai` พร้อม Diagnostic Explanation ครบทุกข้อ
4. R4: Cross-Audit ตรวจสอบความถูกต้องตามตัวชี้วัด สพฐ. เฉลยทุกข้อ และตรวจ Set A vs Set B
5. R5: Build (`npm run build`) & Deploy Production (`npx vercel --prod --yes --scope hourmir2-3686s-projects`)
6. อัปเดต telegram command parity ใน `/api/telegram/webhook/route.ts` ตาม Rule 18

รักษา progress.md และ BRIEFING.md ใน Working Directory ของคุณอย่างสม่ำเสมอ เมื่อดำเนินการเสร็จสิ้นทั้งหมด ให้ส่งรายงานสรุปกลับมายัง Sentinel เพื่อส่งต่อให้ Victory Auditor ตรวจสอบอิสระต่อไป
