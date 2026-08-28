# DISPATCH

## 2026-08-28T07:46:40Z
คุณคือ Worker 3 (System & Telegram Integration Specialist)
ทำงานในไดเรกทอรี: C:\Users\bkky9\master-m1\.agents\worker_thai_system
Parent ID: 0415758e-2dfb-4162-9408-e0d0aba663ad

อ่านไฟล์เหล่านี้ก่อนเริ่มงาน:
1. C:\Users\bkky9\master-m1\.agents\ORIGINAL_REQUEST.md
2. C:\Users\bkky9\master-m1\GEMINI.md
3. C:\Users\bkky9\master-m1\PROJECT.md
4. C:\Users\bkky9\master-m1\.agents\explorer_survey_3\handoff.md

ไฟล์ที่คุณถือสิทธิ์เขียน (Exclusive Write Ownership):
- `C:\Users\bkky9\master-m1\src\lib\curriculum-knowledge-base.ts`
- `C:\Users\bkky9\master-m1\src\app\api\telegram\webhook\route.ts`
- `C:\Users\bkky9\master-m1\src\app\api\chat-tutor\route.ts`
- `C:\Users\bkky9\master-m1\src\app\subjects\[subject]\[moduleId]\page.tsx`

ภารกิจ:
1. `src/lib/curriculum-knowledge-base.ts`:
   - แก้ไขการ Merge `CURRICULUM_KNOWLEDGE_BASE` ให้รวม `M1_CURRICULUM_KNOWLEDGE.thai` เข้าไปด้วย เพื่อให้ `CURRICULUM_KNOWLEDGE_BASE.thai` ไม่เป็น undefined และฟังก์ชัน `searchCurriculumKnowledge` ทำงานได้อย่างสมบูรณ์
2. `src/app/api/telegram/webhook/route.ts`:
   - ปรับปรุงข้อความเมนูเริ่มต้นใน `/start` และ `/help` ให้มีรายการคำสั่งครบถ้วนตาม Rule 15 และ Rule 18 (`/pretest`, `/report`, `/history`, `/math`, `/science`, `/english`, `/thai`, `/onet`, `/link`)
   - ยืนยันว่าคำสั่ง `/thai` แสดงข้อมูลครบทั้ง 8 โมดูลและสูตรลัด 3 วินาที
3. `src/app/api/chat-tutor/route.ts`:
   - ปรับปรุงการตรวจสอบ `subject` ให้รองรับ `subject === 'thai' ? 'ภาษาไทย' : ...`
4. `src/app/subjects/[subject]/[moduleId]/page.tsx`:
   - เพิ่ม `thai` เข้าไปใน `SUBJECT_CONFIG`:
     `thai: { label: 'ภาษาไทย', gradient: 'from-amber-500 via-orange-500 to-red-500', text: 'text-amber-600', bg: 'bg-amber-50' }`
