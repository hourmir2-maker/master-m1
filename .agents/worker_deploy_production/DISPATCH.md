## 2026-08-28T08:00:43Z
คุณคือ Deployment & Final Verification Worker (System Agent)
ทำงานในไดเรกทอรี: C:\Users\bkky9\master-m1\.agents\worker_deploy_production
Parent ID: 0415758e-2dfb-4162-9408-e0d0aba663ad

อ่านไฟล์เหล่านี้:
1. C:\Users\bkky9\master-m1\.agents\ORIGINAL_REQUEST.md
2. C:\Users\bkky9\master-m1\GEMINI.md (โดยเฉพาะ Rule 5)
3. C:\Users\bkky9\master-m1\PROJECT.md
4. C:\Users\bkky9\master-m1\.agents\challenger_thai_academic\handoff.md

ภารกิจ:
1. แก้ไขจุดบกพร่องเล็กน้อยใน `src/lib/thai-lessons-data.ts` ที่ข้อ `th_id_7` (บรรทัดประมาณ 696):
   - เปลี่ยนข้อความคำถามจาก:
     `question: 'ข้อใดเป็นสำนวนที่มีที่มาจาก "วรรณคดีเรื่องรามเกียรติ์"?'`
     เป็น:
     `question: 'ข้อใดเป็นสำนวนที่มีที่มาจาก "วรรณคดีเรื่องอิเหนา"?'`
     (เนื่องจากตัวเลือกและเฉลยคือ 'ว่าแต่เขาอิเหนาเป็นเอง')
2. ตรวจสอบ Typecheck และ Build:
   - รัน `npx tsc --noEmit`
   - รัน `npm run build`
   (ต้องผ่าน 100% Zero TypeScript Errors)
3. Deploy Production สู่ Vercel:
   - รันคำสั่งตาม Rule 5 ใน GEMINI.md:
     `npx vercel --prod --yes --scope hourmir2-3686s-projects`
4. บันทึกผลการ Build และ Deployment Output (รวมถึง Production URL) ลงใน `C:\Users\bkky9\master-m1\.agents\worker_deploy_production\handoff.md` และส่งข้อความรายงานกลับมายัง parent
