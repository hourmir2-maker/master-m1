# Project: MASTER ม.1 — Thai Curriculum & 160-Question Bank Implementation

## Architecture & Integration
- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Supabase
- **Thai Curriculum Engine**:
  - `src/lib/thai-lessons-data.ts` (8 Modules, Set A: 80 Questions, Secret Formulas, Summary Points)
  - `src/lib/lessons-data.ts` (Imports and assigns `THAI_LESSONS_DATA` to `LESSONS_DATA.thai`)
  - `src/lib/dynamic-quiz-pool.ts` (8 Modules, Set B: 80 Questions, Multi-Set Fallback)
  - `src/lib/curriculum-knowledge-base.ts` (OBEC 2551/2560 Standards, Thai Knowledge Base Grounding)
  - `src/app/subjects/thai/page.tsx` (Thai Curriculum Dashboard / Module Index)
  - `src/app/subjects/[subject]/[moduleId]/page.tsx` (Interactive Lesson & Quiz Runner)
  - `src/app/api/chat-tutor/route.ts` (AI Tutor Socratic Grounding for Thai)
  - `src/app/api/telegram/webhook/route.ts` (Telegram Command Parity & Monitoring)

## Feature Inventory
| # | Feature | Description | Milestone | Source | Status |
|---|---|---|---|---|---|
| 1 | 8 Thai Curriculum Modules | 8 Modules aligned with OBEC 2551 (2560): t1-t8 with principles, real-world examples, memory tables | M1 | ORIGINAL_REQUEST §R1 | DONE |
| 2 | 3-Second Shortcuts & O-NET Traps | Speed hacks & 10-year O-NET traps (2558-2568) for each module | M1 | ORIGINAL_REQUEST §R2 | DONE |
| 3 | Set A 80 Questions | 10 questions/module with Scaffolding Rule 16 & Diagnostic Explanations in `thai-lessons-data.ts` | M1 | ORIGINAL_REQUEST §R3 | DONE |
| 4 | Set B 80 Questions | 10 questions/module in `dynamic-quiz-pool.ts` distinct from Set A | M2 | ORIGINAL_REQUEST §R3 | DONE |
| 5 | Curriculum Knowledge Base & Telegram Parity | Fix `CURRICULUM_KNOWLEDGE_BASE.thai` merge, Chat Tutor subject support, Telegram `/thai` menu parity | M3 | ORIGINAL_REQUEST §R1, R18, GEMINI.md | DONE |
| 6 | Cross-Audit & Integrity Verification | Cross-team audit on OBEC standards, 160-question answer correctness, Set A vs B diversity | M4 | ORIGINAL_REQUEST §R4 | DONE |
| 7 | Build & Production Deploy | Run `npm run build` and deploy to Vercel production with `--scope hourmir2-3686s-projects` | M5 | ORIGINAL_REQUEST §R5 | DONE |

## Unified Standard Module Keys
| # | Module ID | Title | OBEC Standards | Emoji |
|---|---|---|---|---|
| 1 | `thai_reading` | การอ่านจับใจความ ตีความ โวหารภาพพจน์ & แยกแยะข้อเท็จจริง | ท 1.1 ป.6/1 - ป.6/5 | 📖 |
| 2 | `thai_word_classes` | ชนิดของคำ 7 ชนิด & หน้าที่ของคำในประโยค | ท 4.1 ป.6/1 | 🏷️ |
| 3 | `thai_royal_loanwords` | คำราชาศัพท์ คำสุภาพ & คำยืมภาษาต่างประเทศ | ท 4.1 ป.6/2 | 👑 |
| 4 | `thai_sentence_structures` | โครงสร้างประโยค (สามัญ รวม ซ้อน) & ระดับภาษา | ท 4.1 ป.6/3 | 🧩 |
| 5 | `thai_idioms_dialects` | สำนวน สุภาษิต คำพังเพย & ภาษาไทยมาตรฐาน vs ภาษาถิ่น 4 ภาค | ท 4.1 ป.6/5, ป.6/6 | 🗣️ |
| 6 | `thai_literature_poetry` | ฉันทลักษณ์ กลอนสุภาพ & วรรณคดีวรรณกรรม ป.6 | ท 4.1 ป.6/4, ท 5.1 ป.6/1 - ป.6/3 | 📜 |
| 7 | `thai_writing` | การเขียนสื่อสาร เขียนย่อความ & เขียนเรื่องตามจินตนาการ (อัตนัย 15 คะแนน) | ท 2.1 ป.6/1 - ป.6/8 | ✍️ |
| 8 | `thai_listening_speaking` | การฟัง การดู การพูด & การวิเคราะห์สื่อโฆษณา | ท 3.1 ป.6/1 - ป.6/3 | 🎙️ |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| M0 | Survey & Planning | Survey data structures, keys, UI hooks, and webhook handlers | none | DONE |
| M1 | Thai Lessons Data (R1 + R2 + Set A) | Write complete 8 modules with 3s shortcuts, traps, and 80 Set A questions in `src/lib/thai-lessons-data.ts` | M0 | DONE |
| M2 | Dynamic Quiz Pool (R3 Set B) | Write 80 Set B questions in `src/lib/dynamic-quiz-pool.ts` with unified keys and diagnostic explanations | M1 | DONE |
| M3 | System Integration & Telegram Parity | Update `curriculum-knowledge-base.ts`, `chat-tutor/route.ts`, `[moduleId]/page.tsx`, and `webhook/route.ts` | M1 | DONE |
| M4 | Cross-Audit & Integrity Review | Reviewers, Challengers, and Forensic Auditor verify 100% curriculum adherence and 160 questions | M1, M2, M3 | DONE |
| M5 | Production Build & Deploy | Execute `npm run build` and `npx vercel --prod --yes --scope hourmir2-3686s-projects` | M4 | DONE |
