# รายงานการสำรวจโครงสร้างข้อมูลบทเรียนภาษาไทย (Thai Lessons Data Structure & UI Survey)

**Agent**: Explorer 1 (Thai Lessons Data Structure Specialist)  
**Target Directory**: `C:\Users\bkky9\master-m1\.agents\explorer_survey_1`  
**Parent Conversation ID**: `0415758e-2dfb-4162-9408-e0d0aba663ad`  
**Timestamp**: 2026-08-28T14:46:00+07:00  

---

## 1. Observation (ผลการสังเกตโดยตรงและหลักฐานเชิงประจักษ์)

จากการตรวจสอบไฟล์ที่เกี่ยวข้องในโปรเจกต์ `master-m1` พบข้อเท็จจริงดังนี้:

### 1.1 Type Definition และ Data Model ใน `src/lib/lessons-data.ts`
- มีการประกาศ Interface สำหรับบทเรียนและแบบฝึกหัด (บรรทัด 1–23):
  ```typescript
  export interface PracticeQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
    tip?: string
  }

  export interface LessonData {
    id: string
    subject: 'math' | 'science' | 'english' | 'thai'
    title: string
    subtitle: string
    emoji: string
    secretFormula: {
      name: string
      concept: string
      steps: string[]
    }
    summaryPoints: string[]
    practiceQuestions: PracticeQuestion[]
  }
  ```
- ใน `src/lib/lessons-data.ts` บรรทัด 1638 กำหนด `thai: {}` และบรรทัด 1641–1644 นำเข้าและผสานข้อมูล:
  ```typescript
  import { THAI_LESSONS_DATA } from './thai-lessons-data'
  if (THAI_LESSONS_DATA) {
    Object.assign(LESSONS_DATA.thai, THAI_LESSONS_DATA)
  }
  ```

### 1.2 สถานะปัจจุบันของเนื้อหาภาษาไทยใน `src/lib/thai-lessons-data.ts`
- ไฟล์มีขนาด 309 บรรทัด กำหนด 8 โมดูลโดยใช้ Module IDs ดังนี้:
  1. `thai_reading`: การอ่านจับใจความ ตีความ โวหารภาพพจน์ & แยกแยะข้อเท็จจริง (มีโจทย์ Set A เพียง 2 ข้อ)
  2. `thai_word_classes`: ชนิดของคำ 7 ชนิด & หน้าที่ของคำในประโยค (มีโจทย์ Set A เพียง 2 ข้อ)
  3. `thai_royal_loanwords`: คำราชาศัพท์ คำสุภาพ & คำยืมภาษาต่างประเทศ (มีโจทย์ Set A เพียง 2 ข้อ)
  4. `thai_sentence_structures`: โครงสร้างประโยค (สามัญ รวม ซ้อน) & ระดับภาษา (มีโจทย์ Set A เพียง 1 ข้อ)
  5. `thai_idioms_dialects`: สำนวน สุภาษิต คำพังเพย & ภาษาไทยมาตรฐาน vs ภาษาถิ่น 4 ภาค (มีโจทย์ Set A เพียง 1 ข้อ)
  6. `thai_literature_poetry`: ฉันทลักษณ์ กลอนสุภาพ & วรรณคดีวรรณกรรม ป.6 (มีโจทย์ Set A เพียง 1 ข้อ)
  7. `thai_writing`: การเขียนสื่อสาร เขียนย่อความ & เขียนเรื่องตามจินตนาการ (มีโจทย์ Set A เพียง 1 ข้อ)
  8. `thai_listening_speaking`: การฟัง การดู การพูด & การวิเคราะห์สื่อโฆษณา (มีโจทย์ Set A เพียง 1 ข้อ)
- **สรุปสถานะ**: เป็นเพียง **Skeleton / Placeholder Draft** มีโจทย์รวมทั้งสิ้นเพียง 11 ข้อ (ขาดอีก 69 ข้อเพื่อให้ครบ 10 ข้อ × 8 โมดูล = 80 ข้อสำหรับ Set A ตามมาตรฐาน Rule 16)

### 1.3 UI การแสดงผลใน `src/app/subjects/thai/page.tsx`
- มีการประกาศอาเรย์ `THAI_MODULES_P6` (บรรทัด 22–95) เพื่อเรนเดอร์การ์ดโมดูล 8 ตัว:
  - ใช้ fields: `id`, `title`, `desc`, `emoji`, `lessons`, `difficulty`, `badgeColor`
  - ลิงก์ตรงไปยังเส้นทาง `/subjects/thai/${mod.id}`
  - Module IDs ตรงกัน 100% กับ `thai-lessons-data.ts` และ `curriculum-knowledge-base.ts`

### 1.4 UI การแสดงผลใน `src/app/subjects/[subject]/[moduleId]/page.tsx`
- หน้าเรียนดึงข้อมูลผ่าน `LESSONS_DATA[subject]?.[moduleId]` (บรรทัด 55)
- **Fields ของ `LessonData` ที่ UI เรียกใช้**:
  1. `lesson.emoji` ➔ แสดงบนหัว Banner
  2. `lesson.title` ➔ แสดงชื่อเรื่องหลักบน Banner
  3. `lesson.subtitle` ➔ แสดงคำอธิบายสรุปใต้ชื่อเรื่อง
  4. `lesson.secretFormula.name` ➔ หัวข้อการ์ดสูตรลับ
  5. `lesson.secretFormula.concept` ➔ ไฮไลต์ "💡 หัวใจสำคัญ:"
  6. `lesson.secretFormula.steps` ➔ ลูปแสดงการ์ดสเต็ป 1, 2, 3... พร้อมไอคอนตัวเลข
  7. `lesson.summaryPoints` ➔ ลูปแสดงลิสต์ข้อสรุปพร้อมไอคอน `CheckCircle2`
  8. `lesson.practiceQuestions` ➔ ลูปแสดงคำถามแบบฝึกหัด (Set A)
- **Fields ของ `PracticeQuestion` ที่ UI เรียกใช้**:
  1. `q.id` ➔ คีย์ระบุข้อ, state คำตอบ, modal รายงานจุดผิด
  2. `q.question` ➔ ข้อความโจทย์ (รองรับ `whitespace-pre-line`)
  3. `q.options` ➔ ปุ่มตัวเลือก A, B, C, D (4 ตัวเลือก)
  4. `q.correctAnswer` ➔ ตัวตรวจคำตอบถูก/ผิด และเปลี่ยนสีปุ่ม
  5. `q.explanation` ➔ เฉลยละเอียดและวิธีคิดทีละขั้นตอน (แสดงหลังกดส่งตรวจ)
  6. `q.tip` (optional) ➔ กล่องเคล็ดลับสีส้ม `💡` หรือ `⚡`
- **ระบบรวมโจทย์ Set B (บรรทัด 86–90)**:
  ```typescript
  const extraSets = DYNAMIC_QUESTION_POOL[subject]?.[moduleId] || []
  const setB = extraSets[0] || []
  const combined = [...(lesson.practiceQuestions || []), ...setB]
  setQuestions(combined.length > 0 ? combined : (lesson.practiceQuestions || []))
  ```
- **การคำนวณบทถัดไป (Next Module Navigation)**:
  - ใช้ลำดับ Object keys ใน `LESSONS_DATA[subject]` คำนวณ `nextModuleId` และดึง `nextModuleData.title` มาแสดงบนปุ่ม `[ ➡️ ไปต่อโมดูลถัดไป: ... ]`

### 1.5 จุดบกพร่องสำคัญที่พบในระบบปัจจุบัน (Discrepancies & Bugs Found)
1. **Module ID Mismatch ใน `src/lib/dynamic-quiz-pool.ts`**:
   - ใน `src/lib/dynamic-quiz-pool.ts` (บรรทัด 1214–1614) ใช้คีย์วิชาไทยเก่า 8 ตัว ได้แก่:
     - `thai_phonetics_tones`, `thai_grammar_syntax`, `thai_spelling_rules`, `thai_morphology`, `thai_proverbs_idioms`, `thai_royal_vocabulary`, `thai_literature_appreciation`, `thai_reading_comprehension`
   - ซึ่ง **ไม่ตรงกัน** กับคีย์มาตรฐานใน `thai-lessons-data.ts`, `subjects/thai/page.tsx` และ `curriculum-knowledge-base.ts` (เช่น `thai_reading`, `thai_word_classes`, ฯลฯ)
   - ส่งผลให้ในหน้าเรียน `/subjects/thai/<moduleId>` ไม่สามารถดึงโจทย์ Set B มารวมได้ (`DYNAMIC_QUESTION_POOL['thai']?.[moduleId]` ได้ `undefined`)
2. **`SUBJECT_CONFIG` ใน `src/app/subjects/[subject]/[moduleId]/page.tsx` ขาด Key `thai`**:
   - ในบรรทัด 41–45 มีเฉพาะ `math`, `science`, `english`
   - เมื่อเข้าวิชา `thai` จะ fallback เป็น `math` ทำให้ Header และ Badge แสดงข้อความว่า "คณิตศาสตร์" ผิดพลาด

---

## 2. Logic Chain (ลำดับการวิเคราะห์และข้อสรุปเชิงตรรกะ)

```
[Observation 1.1 - 1.4] โครงสร้าง LessonData และการเรียกใช้ใน UI
       ↓
[Inference A] หน้าเว็บ /subjects/thai และ /subjects/[subject]/[moduleId] อ้างอิง Module IDs 8 ตัวที่เป็น Snake_case (thai_reading, thai_word_classes, thai_royal_loanwords, thai_sentence_structures, thai_idioms_dialects, thai_literature_poetry, thai_writing, thai_listening_speaking)
       ↓
[Observation 1.2] ปัจจุบัน thai-lessons-data.ts มี 8 โมดูล แต่มีโจทย์แค่ 1-2 ข้อ/โมดูล (รวม 11 ข้อ) ขาดความสมบูรณ์ตามเกณฑ์ R1 และ Rule 16
       ↓
[Observation 1.5] dynamic-quiz-pool.ts ใช้ชุด ID ที่ไม่ตรงกัน ทำให้โหลดโจทย์ Set B ล้มเหลว และ page.tsx ขาด SUBJECT_CONFIG.thai
       ↓
[Conclusion / Recommendation] 
1. ต้องคง Module IDs ทั้ง 8 ตัวตามมาตรฐานปัจจุบัน เพื่อให้สอดคล้องกับ curriculum-knowledge-base.ts, audio-tutor.ts และ thai/page.tsx
2. ทีมสร้างเนื้อหา R1 (Thai Language Specialist) ต้องสร้าง LessonData เต็มรูปแบบ 8 โมดูล โดยมี Set A ครบ 10 ข้อ/โมดูล (รวม 80 ข้อ)
3. ทีมคลังโจทย์ R2 (Quiz & Technique Expert) ต้องอัปเดต dynamic-quiz-pool.ts ให้ใช้ Module IDs ทั้ง 8 ตัวให้ตรงกัน พร้อมสร้าง Set B ครบ 10 ข้อ/โมดูล (รวม 80 ข้อ)
4. ต้องเพิ่ม SUBJECT_CONFIG.thai ใน src/app/subjects/[subject]/[moduleId]/page.tsx
```

---

## 3. Caveats (ข้อจำกัดและสมมติฐาน)

1. **ขอบเขตการสำรวจ**: ทำการสำรวจแบบ Read-Only ไม่ได้ทำการแก้ไขโค้ดโปรเจกต์โดยตรง
2. **ความเชื่อมโยงกับโมดูลเสียง (Audio Tutor)**: ไฟล์ `src/lib/audio-tutor.ts` ดึงข้อมูลจาก `CURRICULUM_KNOWLEDGE_BASE['thai']` ซึ่งใช้ 8 Module IDs เดียวกันอยู่แล้ว การรักษาชื่อ ID เดิมไว้จึงปลอดภัยที่สุด
3. **การเรียงลำดับโมดูล**: ใน `THAI_LESSONS_DATA` ควรเรียงลำดับโมดูลให้ตรงกับ `THAI_MODULES_P6` ใน `subjects/thai/page.tsx` เพื่อให้ระบบ Next Module Navigation ทำงานได้อย่างถูกต้องและลื่นไหล

---

## 4. Conclusion & Structural Blueprint (ข้อสรุปและพิมพ์เขียวโครงสร้าง)

### 4.1 ตารางกำหนด 8 Module IDs มาตรฐาน (Unified Standard Keys)

| ลำดับ | Module ID | ชื่อบทเรียน (Title) | สาระ / ตัวชี้วัด สพฐ. | Emoji |
|---|---|---|---|---|
| 1 | `thai_reading` | การอ่านจับใจความ ตีความ โวหารภาพพจน์ & แยกแยะข้อเท็จจริง | ท 1.1 ป.6/1 - ป.6/5 | 📖 |
| 2 | `thai_word_classes` | ชนิดของคำ 7 ชนิด & หน้าที่ของคำในประโยค | ท 4.1 ป.6/1 | 🏷️ |
| 3 | `thai_royal_loanwords` | คำราชาศัพท์ คำสุภาพ & คำยืมภาษาต่างประเทศ | ท 4.1 ป.6/2 | 👑 |
| 4 | `thai_sentence_structures` | โครงสร้างประโยค (สามัญ รวม ซ้อน) & ระดับภาษา | ท 4.1 ป.6/3 | 🧩 |
| 5 | `thai_idioms_dialects` | สำนวน สุภาษิต คำพังเพย & ภาษาไทยมาตรฐาน vs ภาษาถิ่น 4 ภาค | ท 4.1 ป.6/5, ป.6/6 | 🗣️ |
| 6 | `thai_literature_poetry` | ฉันทลักษณ์ กลอนสุภาพ & วรรณคดีวรรณกรรม ป.6 | ท 4.1 ป.6/4, ท 5.1 | 📜 |
| 7 | `thai_writing` | การเขียนสื่อสาร เขียนย่อความ & เขียนเรื่องตามจินตนาการ (อัตนัย 15 คะแนน) | ท 2.1 ป.6/1 - ป.6/8 | ✍️ |
| 8 | `thai_listening_speaking` | การฟัง การดู การพูด & การวิเคราะห์สื่อโฆษณา | ท 3.1 ป.6/1 - ป.6/3 | 🎙️ |

### 4.2 สเปกโครงสร้างข้อมูลบทเรียน (Data Structure Specification for R1/R2)

#### สำหรับ `src/lib/thai-lessons-data.ts` (Set A - 80 ข้อ):
- ต้อง Export `THAI_LESSONS_DATA: Record<string, LessonData>`
- แต่ละโมดูลต้องประกอบด้วย:
  - `id`: ตรงตามตาราง 4.1
  - `subject`: `'thai'`
  - `title`: ชัดเจน ตรงหลักสูตร
  - `subtitle`: สรุปจุดเน้นและเทคนิคเด่น
  - `emoji`: ตรงตามธีม
  - `secretFormula`:
    - `name`: ชื่อสูตรลับ 3 วิ
    - `concept`: คอนเซ็ปต์แก่นสำคัญ 1-2 ประโยค
    - `steps`: รายการเทคนิค/สูตรลัด 3-5 ข้อ (มีเครื่องหมาย `⚡`)
  - `summaryPoints`: ลิสต์สรุปประเด็นและจุดดัก 3-5 ข้อ
  - `practiceQuestions`: อาเรย์ `PracticeQuestion` ครบ **10 ข้อ** (จัดความยากตาม Scaffolding Rule 16: ข้อ 1–3 พื้นฐาน, 4–7 ประยุกต์/สูตรลัด, 8–10 Gifted/จุดลวง O-NET 10 ปี)
  - ทุกคำถามต้องมี `explanation` ละเอียด (ระบุเหตุผลที่ตัวเลือกอื่นผิด) และ `tip` สั้นกระชับ

#### สำหรับ `src/lib/dynamic-quiz-pool.ts` (Set B - 80 ข้อ):
- ต้องกำหนด key `thai` ใน `DYNAMIC_QUESTION_POOL` โดยใช้ 8 Module IDs เดียวกัน
- แต่ละโมดูลมีอาเรย์โจทย์ `[ [ ...ข้อสอบ 10 ข้อ (Set B)... ] ]`
- โจทย์ Set B ต้องแตกต่างและไม่ซ้ำซ้อนกับ Set A

#### สำหรับ UI Patch (`src/app/subjects/[subject]/[moduleId]/page.tsx`):
- เสนอให้เพิ่ม `thai` ใน `SUBJECT_CONFIG`:
  ```typescript
  thai: { label: 'ภาษาไทย', gradient: 'from-amber-500 via-orange-500 to-red-500', text: 'text-amber-600', bg: 'bg-amber-50' }
  ```

---

## 5. Verification Method (วิธีการตรวจสอบความถูกต้อง)

1. **ตรวจสอบความสอดคล้องของ Type และ Keys**:
   - ตรวจสอบว่าโมดูลใน `src/lib/thai-lessons-data.ts`, `src/lib/dynamic-quiz-pool.ts`, `src/lib/curriculum-knowledge-base.ts` และ `src/app/subjects/thai/page.tsx` ใช้ Key เดียวกันทั้ง 8 โมดูล
2. **Build Verification**:
   - รันคำสั่ง `npm run build` เพื่อยืนยันว่าไม่มีข้อผิดพลาด TypeScript / Next.js
3. **Route Navigation Verification**:
   - ทดสอบเปิด URL:
     - `/subjects/thai`
     - `/subjects/thai/thai_reading`
     - `/subjects/thai/thai_word_classes`
     - `/subjects/thai/thai_royal_loanwords`
     - `/subjects/thai/thai_sentence_structures`
     - `/subjects/thai/thai_idioms_dialects`
     - `/subjects/thai/thai_literature_poetry`
     - `/subjects/thai/thai_writing`
     - `/subjects/thai/thai_listening_speaking`
   - ตรวจสอบว่าแสดงผลเนื้อหาครบ ทั้งสูตรลับ, สรุปจุดเน้น, เสียงบรรยาย (Audio Tutor), โจทย์รวม 20 ข้อ (Set A 10 ข้อ + Set B 10 ข้อ), เฉลยละเอียด และปุ่มไปต่อโมดูลถัดไป
