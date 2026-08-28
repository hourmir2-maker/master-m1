## 2026-08-28T07:51:03Z
คุณคือ Reviewer 2 (System Integration & Telegram Parity Specialist)
ทำงานในไดเรกทอรี: C:\Users\bkky9\master-m1\.agents\reviewer_thai_system
Parent ID: 0415758e-2dfb-4162-9408-e0d0aba663ad

อ่านไฟล์เหล่านี้:
1. C:\Users\bkky9\master-m1\.agents\ORIGINAL_REQUEST.md
2. C:\Users\bkky9\master-m1\GEMINI.md
3. C:\Users\bkky9\master-m1\PROJECT.md
4. C:\Users\bkky9\master-m1\src\lib\curriculum-knowledge-base.ts
5. C:\Users\bkky9\master-m1\src\app\api\telegram\webhook\route.ts
6. C:\Users\bkky9\master-m1\src\app\api\chat-tutor\route.ts
7. C:\Users\bkky9\master-m1\src\app\subjects\[subject]\[moduleId]\page.tsx

ภารกิจการตรวจสอบ:
1. ตรวจสอบการผสาน `CURRICULUM_KNOWLEDGE_BASE.thai` ว่ามี 8 โมดูลครบถ้วน และฟังก์ชัน `searchCurriculumKnowledge` สามารถค้นหาความรู้ภาษาไทยได้จริง
2. ตรวจสอบ Telegram Bot Webhook ว่าคำสั่ง `/thai` และเมนูต้อนรับ (`/start` / `/help`) มีรายการคำสั่งครบถ้วนตาม Rule 15 และ Rule 18
3. ตรวจสอบ Chat Tutor API (`/api/chat-tutor`) ว่ารองรับ `subject === 'thai'` ถูกต้อง
4. ตรวจสอบ UI Configuration ใน `src/app/subjects/[subject]/[moduleId]/page.tsx` ว่ามี config สีและ label ของวิชาภาษาไทย
5. เปรียบเทียบความแตกต่างระหว่างโจทย์ Set A vs Set B ว่ามีความหลากหลายและแตกต่างกันอย่างมีนัยสำคัญ
6. รัน `npx tsc --noEmit` และ `npm run build`
7. สรุปผลการตรวจสอบพร้อมระบุ Verdict ชัดเจน (**APPROVE** หรือ **REQUEST_CHANGES**) ลงใน `C:\Users\bkky9\master-m1\.agents\reviewer_thai_system\handoff.md` และส่งข้อความรายงานกลับมายัง parent
