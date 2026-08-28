# BRIEFING — 2026-08-28T07:46:00Z

## Mission
สำรวจและวิเคราะห์ Type Definition, โครงสร้างข้อมูล Quiz Pool (Set A / Set B) และการประยุกต์ใช้ Scaffolding Rule 16 สำหรับวิชาภาษาไทย (thai) ในโปรเจกต์ MASTER ม.1

## 🔒 My Identity
- Archetype: explorer
- Roles: thai-quiz-pool-and-scaffolding-specialist
- Working directory: C:\Users\bkky9\master-m1\.agents\explorer_survey_2
- Original parent: 0415758e-2dfb-4162-9408-e0d0aba663ad
- Milestone: survey-thai-quiz-pool

## 🔒 Key Constraints
- Read-only investigation — do NOT implement / do NOT modify source code directly
- สื่อสารเป็นภาษาไทยทั้งหมด (Thai communication)
- ยึดหลัก Scaffolding Rule 16: ข้อ 1-3 ง่ายปูพื้นฐาน, ข้อ 4-7 ประยุกต์+สูตรลัด 3 วิ, ข้อ 8-10 Gifted+ดักจุดลวง O-NET 10 ปี
- ปฏิบัติตามแบบแผน Set A / Set B ของ dynamic-quiz-pool.ts

## Current Parent
- Conversation ID: 0415758e-2dfb-4162-9408-e0d0aba663ad
- Updated: 2026-08-28T07:46:00Z

## Investigation State
- **Explored paths**:
  - `src/lib/dynamic-quiz-pool.ts` (lines 1-1616)
  - `src/lib/lessons-data.ts` (lines 1-1653)
  - `src/lib/thai-lessons-data.ts` (lines 1-309)
  - `src/lib/curriculum-knowledge-base.ts` (lines 836-1025)
  - `src/app/subjects/thai/page.tsx` (lines 1-96)
  - `src/app/subjects/[subject]/[moduleId]/page.tsx` (lines 1-150)
  - `src/app/api/lessons/generate-quiz/route.ts` (lines 1-100)
  - `GEMINI.md` & `ORIGINAL_REQUEST.md`
- **Key findings**:
  1. `PracticeQuestion` ใช้ `correctAnswer: string` (ไม่ใช่ index) ทำให้การ shuffle ตัวเลือกใน quiz API ทำได้ปลอดภัย
  2. `DYNAMIC_QUESTION_POOL` มีโครงสร้าง `Record<string, Record<string, PracticeQuestion[][]>>` โดย Set B อยู่ที่ `pool[subject][moduleId][0]`
  3. `DYNAMIC_QUESTION_POOL.thai` ปัจจุบันใช้ module IDs เก่า 8 ตัวที่ไม่ตรงกับระบบหลัก (`thai_reading`, `thai_word_classes`, `thai_royal_loanwords`, `thai_sentence_structures`, `thai_idioms_dialects`, `thai_literature_poetry`, `thai_writing`, `thai_listening_speaking`) และมีเพียง 5 ข้อต่อโมดูล
  4. Scaffolding Rule 16 ต้องแบ่งเป็น 3 ระดับ: ข้อ 1-3 (Confidence Builder), ข้อ 4-7 (Application + 3-sec speed hacks), ข้อ 8-10 (Gifted + O-NET traps)
- **Unexplored areas**: None (การสำรวจครบถ้วนทุกมิติ)

## Key Decisions Made
- จัดทำโครงสร้างคำแนะนำสำหรับ Set A (ใน `thai-lessons-data.ts`) 10 ข้อ/โมดูล และ Set B (ใน `dynamic-quiz-pool.ts`) 10 ข้อ/โมดูล รวม 160 ข้อ
- ออกแบบเทมเพลตและ Diagnostic Explanation ให้มีวิเคราะห์ตัวเลือกลวงทั้ง 3 ตัวเลือก

## Artifact Index
- `C:\Users\bkky9\master-m1\.agents\explorer_survey_2\handoff.md` — รายงานสรุปผลการสำรวจและโครงสร้าง Quiz Pool วิชาภาษาไทยฉบับสมบูรณ์
