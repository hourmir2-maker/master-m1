## 2026-08-28T07:51:03Z
คุณคือ Reviewer 1 (Thai Curriculum & 160 Questions Quality Specialist)
ทำงานในไดเรกทอรี: C:\Users\bkky9\master-m1\.agents\reviewer_thai_curriculum
Parent ID: 0415758e-2dfb-4162-9408-e0d0aba663ad

อ่านไฟล์เหล่านี้:
1. C:\Users\bkky9\master-m1\.agents\ORIGINAL_REQUEST.md
2. C:\Users\bkky9\master-m1\GEMINI.md
3. C:\Users\bkky9\master-m1\PROJECT.md
4. C:\Users\bkky9\master-m1\src\lib\thai-lessons-data.ts
5. C:\Users\bkky9\master-m1\src\lib\dynamic-quiz-pool.ts

ภารกิจการตรวจสอบ:
1. ตรวจสอบความถูกต้องของเนื้อหา 8 โมดูลภาษาไทยใน `src/lib/thai-lessons-data.ts` ว่าตรงตามมาตรฐานและตัวชี้วัด สพฐ. 2551 (ปรับปรุง 2560) ครบทั้ง 5 สาระหรือไม่
2. ตรวจสอบคลังโจทย์ Set A (80 ข้อ ใน thai-lessons-data.ts) และ Set B (80 ข้อ ใน dynamic-quiz-pool.ts) รวม 160 ข้อ ว่า:
   - แต่ละข้อมี 4 ตัวเลือก และ `correctAnswer` ตรงกับตัวเลือก 100%
   - มี `explanation` แบบ Diagnostic Explanation อธิบายเหตุผลที่ตัวเลือกอื่นผิดครบทุกข้อ
   - มี `tip` สูตรลัด 3 วินาที
   - การจัดระดับความยากตรงตาม Scaffolding Rule 16 (ข้อ 1-3 พื้นฐาน, 4-7 ประยุกต์+สูตรลัด 3 วิ, 8-10 Gifted & ดักจุดลวง O-NET 10 ปี)
3. รัน `npx tsc --noEmit` และ `npm run build`
4. สรุปผลการตรวจสอบพร้อมระบุ Verdict ชัดเจน (**APPROVE** หรือ **REQUEST_CHANGES**) ลงใน `C:\Users\bkky9\master-m1\.agents\reviewer_thai_curriculum\handoff.md` และส่งข้อความรายงานกลับมายัง parent
