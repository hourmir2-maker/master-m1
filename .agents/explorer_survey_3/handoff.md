# รายงานผลการสำรวจและวิเคราะห์ (Survey & Gap Analysis Report)
**ตำแหน่ง**: Explorer 3 (Telegram Parity & Knowledge Base Specialist)  
**ไดเรกทอรีทำงาน**: `C:\Users\bkky9\master-m1\.agents\explorer_survey_3`  
**วันที่สำรวจ**: 2026-08-28  

---

## 1. Observation (ผลการสังเกตการณ์โดยละเอียด)

### 1.1 Telegram Bot Webhook Handler (`src/app/api/telegram/webhook/route.ts`)
- **การรองรับคำสั่ง `/thai`**:
  - พบ Handler สำหรับ `/thai` ที่บรรทัด 258–279:
    ```typescript
    // Command: /thai (ดูผลวิชาภาษาไทย)
    if (text.includes('/thai') || text.includes('ภาษาไทย') || text.includes('ไทย')) {
      const thaiMsg = `🇹🇭 <b>ความก้าวหน้าวิชาภาษาไทย (หลักสูตร 1000%): ${studentName}</b>
    ━━━━━━━━━━━━━━━━━━━━
    • บทเรียนที่ผ่านแล้ว: <b>${thaiPassed.length} จาก 8 บท</b>
    ${thaiPassed.map(p => `✅ ${LESSONS_DATA.thai?.[p.module_id]?.title || p.module_id} (ได้ ${p.score}%)`).join('\n') || '📌 แนะนำเริ่มจาก: <b>คำยืมบาลี-สันสกฤต (สูตรลัด 3 วิ)</b> และ <b>ชนิดของคำ 7 ชนิด</b>'}
    ━━━━━━━━━━━━━━━━━━━━
    📚 <b>8 โมดูล ภาษาไทยมาตรฐาน สพฐ. 2551 (ปรับปรุง 2560):</b>
    1. คำไทยแท้ & คำยืม บาลี-สันสกฤต-เขมร-อังกฤษ
    2. ชนิดของคำ 7 ชนิด & หน้าที่ในประโยค
    3. โครงสร้างประโยค (ความเดียว-ความรวม-ความซ้อน)
    4. คำราชาศัพท์ ระดับภาษา & คำสุภาพ
    5. สำนวน สุภาษิต คำพังเพย & ปริศนาคำทาย
    6. การอ่านจับใจความ & ตีความ (Critical Reading)
    7. วรรณคดีลำนำ (รามเกียรติ์, พลายงาม, โคลงโลกนิติ)
    8. การเขียนย่อความ เรียงความ & จดหมาย
    ━━━━━━━━━━━━━━━━━━━━
    💡 <b>สูตรลัดภาษาไทย 3 วิ:</b> ตัดช้อยส์บาลี-สันสกฤตด้วย "ศ ษ ฤ = สันสกฤต, ส เดียว + ตัวสะกดวรรค = บาลี"
    🌐 <b>เข้าเรียนภาษาไทย:</b> https://master-m1.vercel.app/subjects/thai`
      await sendReply(thaiMsg)
      return NextResponse.json({ ok: true })
    }
    ```
- **การบูรณาการในคำสั่งอื่น**:
  - `/report` (บรรทัด 224–225): มีการนำ `thaiPassed` มาแสดงผลความก้าวหน้า `${thaiPassed.length}/8 บท`
  - `/onet` (บรรทัด 179, 194): มีการดึง `onetThai` และแสดงผล `🇹🇭 ภาษาไทย O-NET`
  - Default Menu (บรรทัด 305): มีการแสดง `🇹🇭 /thai — ภาษาไทย (8 โมดูล หลักสูตร 1000%)`
- **จุดบกพร่อง / Gap ที่พบใน Telegram Handler**:
  - บรรทัด 106–120 ใน Handler ของ `/start` และ `/help` ขาดรายการคำสั่ง `/thai`, `/onet`, และ `/history`:
    ```typescript
    // บรรทัด 112-119 ขาด /thai และ /onet
    • /pretest — 🧪 ดูผลการสอบวัดระดับก่อนเรียน (Pre-Test)
    • /report — 📊 ดูรายงานสรุปคะแนนและพัฒนาการทุกวิชา
    • /math — 🔢 ดูความก้าวหน้าวิชาคณิตศาสตร์
    • /science — 🔬 ดูความก้าวหน้าวิชาวิทยาศาสตร์
    • /english — 🗣️ ดูความก้าวหน้าวิชาภาษาอังกฤษ
    • /link [อีเมล] — 🔄 เปลี่ยนหรือผูกบัญชีนักเรียนคนอื่น
    ```
    ซึ่งขัดกับ Rule 15 และ Rule 18 ใน `GEMINI.md` ที่ระบุว่าเมนูเริ่มต้นและคำสั่ง 24 ชม. ต้องมี `/pretest`, `/report`, `/history`, `/math`, `/science`, `/english`, `/thai`, `/onet`, `/link` ครบถ้วน

---

### 1.2 Curriculum Knowledge Base (`src/lib/curriculum-knowledge-base.ts`)
- **ความครอบคลุมสาระและตัวชี้วัด สพฐ. 2551 (ปรับปรุง 2560)**:
  - ใน `M1_CURRICULUM_KNOWLEDGE.thai` (บรรทัด 839–1025) มีการนิยาม 8 โมดูลภาษาไทย ครบทั้ง 5 สาระการเรียนรู้ (ท 1.1 ถึง ท 5.1):
    1. `thai_reading` (บรรทัด 840–862): สาระที่ 1 การอ่าน (`ท 1.1 ป.6/1, ป.6/2, ป.6/3, ป.6/4, ป.6/5`)
    2. `thai_writing` (บรรทัด 864–885): สาระที่ 2 การเขียน (`ท 2.1 ป.6/1, ป.6/2, ป.6/5, ป.6/8` - ครอบคลุมอัตนัย 15 คะแนน)
    3. `thai_listening_speaking` (บรรทัด 887–906): สาระที่ 3 การฟัง การดู และการพูด (`ท 3.1 ป.6/1, ป.6/2, ป.6/3` - วิเคราะห์สื่อโฆษณา)
    4. `thai_word_classes` (บรรทัด 908–930): สาระที่ 4 หลักการใช้ภาษาไทย (`ท 4.1 ป.6/1` - ชนิดคำ 7 ชนิด)
    5. `thai_royal_loanwords` (บรรทัด 932–954): สาระที่ 4 หลักการใช้ภาษาไทย (`ท 4.1 ป.6/2` - ราชาศัพท์ & คำยืม)
    6. `thai_sentence_structures` (บรรทัด 956–978): สาระที่ 4 หลักการใช้ภาษาไทย (`ท 4.1 ป.6/3` - โครงสร้างประโยค)
    7. `thai_idioms_dialects` (บรรทัด 980–1000): สาระที่ 4 หลักการใช้ภาษาไทย (`ท 4.1 ป.6/5, ป.6/6` - สำนวน & ภาษาถิ่น 4 ภาค)
    8. `thai_literature_poetry` (บรรทัด 1002–1024): สาระที่ 4 และ สาระที่ 5 วรรณคดีและวรรณกรรม (`ท 4.1 ป.6/4, ท 5.1 ป.6/1, ป.6/2, ป.6/3` - กลอนสุภาพ & วรรณคดี ป.6)

- **⚠️ CRITICAL BUG: ข้อผิดพลาดการ Merge ข้อมูลที่ Runtime**:
  - บรรทัด 19–20: `CURRICULUM_KNOWLEDGE_BASE` ประกาศเฉพาะ `math`, `science`, `english` (ไม่มีคีย์ `thai` เริ่มต้น)
  - บรรทัด 1028–1032:
    ```typescript
    // Auto-merge M.1 curriculum knowledge
    if (M1_CURRICULUM_KNOWLEDGE) {
      if (M1_CURRICULUM_KNOWLEDGE.math) Object.assign(CURRICULUM_KNOWLEDGE_BASE.math, M1_CURRICULUM_KNOWLEDGE.math)
      if (M1_CURRICULUM_KNOWLEDGE.science) Object.assign(CURRICULUM_KNOWLEDGE_BASE.science, M1_CURRICULUM_KNOWLEDGE.science)
      if (M1_CURRICULUM_KNOWLEDGE.english) Object.assign(CURRICULUM_KNOWLEDGE_BASE.english, M1_CURRICULUM_KNOWLEDGE.english)
    }
    ```
    **ไม่มีการ merge `M1_CURRICULUM_KNOWLEDGE.thai` เข้าสู่ `CURRICULUM_KNOWLEDGE_BASE`**!
  - **ผลกระทบ**:
    1. `CURRICULUM_KNOWLEDGE_BASE.thai` มีค่าเป็น `undefined`
    2. ฟังก์ชัน `searchCurriculumKnowledge(query, 'thai', moduleId)` (บรรทัด 1039–1040) จะพบว่า `CURRICULUM_KNOWLEDGE_BASE['thai']` เป็น `undefined` และ return `''` เสมอ
    3. ส่งผลให้ AI Tutor ใน `src/app/api/chat-tutor/route.ts` ไม่สามารถ Grounding องค์ความรู้ภาษาไทย สพฐ. ได้ (ขัดกับ Rule 11)
    4. ฟังก์ชัน `src/lib/audio-tutor.ts` (`getAudioSummaryForModule`) ไม่สามารถดึงสรุปบทเรียนวิชาภาษาไทยได้

---

### 1.3 ปัญหาความไม่สอดคล้องของ Module Keys (Key Discrepancy)
- ใน `src/lib/thai-lessons-data.ts` และ `src/lib/curriculum-knowledge-base.ts` ใช้ Keys:
  `thai_reading`, `thai_word_classes`, `thai_royal_loanwords`, `thai_sentence_structures`, `thai_idioms_dialects`, `thai_literature_poetry`, `thai_writing`, `thai_listening_speaking`
- ใน `src/lib/dynamic-quiz-pool.ts` (บรรทัด 1214–1615) คีย์วิชาภาษาไทยเป็น:
  `thai_phonetics_tones`, `thai_grammar_syntax`, `thai_spelling_rules`, `thai_morphology`, `thai_proverbs_idioms`, `thai_royal_vocabulary`, `thai_literature_appreciation`, `thai_reading_comprehension`
- **ผลกระทบ**: API `/api/lessons/generate-quiz` ไม่สามารถดึงชุดโจทย์ Set B/C สำหรับ 8 โมดูลภาษาไทยได้เนื่องจาก key ไม่ตรงกัน

---

### 1.4 Chat Tutor Route Bug (`src/app/api/chat-tutor/route.ts`)
- บรรทัด 20:
  ```typescript
  const subjectName = subject === 'math' ? 'คณิตศาสตร์' : subject === 'science' ? 'วิทยาศาสตร์' : 'ภาษาอังกฤษ'
  ```
  เมื่อส่ง `subject = 'thai'` ค่า `subjectName` จะถูก fallback เป็น `'ภาษาอังกฤษ'` แทนที่จะเป็น `'ภาษาไทย'`

---

### 1.5 Package.json Scripts และ Dependencies
- `scripts` ใน `package.json`:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
  ```
- **ข้อสังเกต**:
  1. มีคำสั่ง `"build": "next build"` สำหรับการ compile และ type check ผ่าน Next.js
  2. ไม่มีคำสั่ง `"test"` หรือ Test Runner (เช่น `jest`, `vitest`, `playwright`) ติดตั้งไว้ใน `devDependencies`
  3. การทดสอบความถูกต้องของ TypeScript Type Check สามารถสั่งรันผ่าน `npx tsc --noEmit` ซึ่งให้ Exit Code 0 (ผ่านเรียบร้อย)

---

## 2. Logic Chain (การวิเคราะห์เชิงตรรกะและเหตุผล)

1. **จาก Observation 1.1**: Telegram bot webhook ใน `route.ts` มี command handler `/thai` และดึงข้อมูล 8 โมดูลพร้อมสูตรลัด 3 วินาทีแล้ว แต่ในเมนูต้อนรับ (`/start` / `/help`) ยังไม่ได้ใส่คำสั่ง `/thai` และ `/onet` ลงไป ทำให้ผู้ปกครองใหม่ไม่เห็นคำสั่งนี้จากรายการเริ่มต้น → **ข้อเสนอแนะ**: ปรับแก้ข้อความต้อนรับใน `/start` ให้แสดงคำสั่งครบถ้วนตาม Rule 18
2. **จาก Observation 1.2**: ข้อมูลเนื้อหาหลักสูตร สพฐ. 2551 (ปรับปรุง 2560) สำหรับภาษาไทย ทั้ง 5 สาระ (ท 1.1 - ท 5.1) มีการจัดเตรียมไว้อย่างสมบูรณ์และถูกต้องในตัวแปร `M1_CURRICULUM_KNOWLEDGE.thai` แต่เกิดข้อผิดพลาดในการรวม Object (Object.assign) ที่บรรทัด 1028–1032 ทำให้ตัวแปรหลัก `CURRICULUM_KNOWLEDGE_BASE.thai` ไม่ได้รับข้อมูล → **ข้อเสนอแนะ**: ต้องแก้ไขโค้ดการ merge ใน `src/lib/curriculum-knowledge-base.ts` เพื่อให้ AI Tutor และ Audio Engine ใช้งานได้ 100%
3. **จาก Observation 1.3**: คลังโจทย์ `DYNAMIC_QUESTION_POOL.thai` ใน `src/lib/dynamic-quiz-pool.ts` ใช้คีย์ชื่อโมดูลที่ไม่ตรงกับ `THAI_LESSONS_DATA` ส่งผลให้ระบบสุ่มโจทย์แบบ Multi-Set ไม่สามารถค้นหาโจทย์สำรองของภาษาไทยได้ → **ข้อเสนอแนะ**: ทีม R3 (Quiz & Technique Expert) ต้องสร้าง/ปรับชื่อโมดูลใน `dynamic-quiz-pool.ts` ให้ตรงกับ 8 โมดูลหลักของ `thai-lessons-data.ts`
4. **จาก Observation 1.4**: `src/app/api/chat-tutor/route.ts` ยังไม่ได้เพิ่มเงื่อนไข `subject === 'thai'` ส่งผลให้ Prompt ของระบบมองว่ากำลังสอนวิชาภาษาอังกฤษ → **ข้อเสนอแนะ**: เพิ่ม `subject === 'thai' ? 'ภาษาไทย' : ...`
5. **จาก Observation 1.5**: ไม่มีคำสั่ง `test` ใน `package.json` ดังนั้นคำสั่งหลักที่ใช้ในการ Verify คุณภาพโค้ดและ Type-Safety ก่อน Deploy สู่ Production คือ `npx tsc --noEmit` และ `npm run build`

---

## 3. Caveats (ข้อจำกัดและสมมติฐาน)

- การสำรวจนี้เป็นการตรวจสอบแบบ **Read-only** ตามกฎ Explorer ยังไม่ได้ทำการแก้ไขโค้ดในไฟล์ระบบ
- ในส่วนของโจทย์ Set A และ Set B จำนวน 160 ข้อตาม Requirement R3 ยังจำเป็นต้องให้ทีม Quiz & Technique Expert ดำเนินการสร้างให้ครบ 10 ข้อ × 2 Set × 8 โมดูล พร้อม Diagnostic Explanation
- ไม่พบ Integration Test suite อัตโนมัติในโปรเจกต์ การทดสอบ Webhook ทำงานผ่านการรัน API จำลองหรือ Type Checking

---

## 4. Conclusion (ข้อสรุปและแผนการดำเนินการที่แนะนำ)

1. **Telegram Command Parity (Rule 18)**:
   - Handler สำหรับ `/thai` มีอยู่แล้วและทำงานได้ถูกต้อง
   - ปรับปรุงเล็กน้อย: เพิ่ม `/thai` และ `/onet` ลงในรายการคำสั่งของเมนูต้อนรับ (`/start` / `/help`) ใน `src/app/api/telegram/webhook/route.ts`
2. **Curriculum Knowledge Base (Rule 11)**:
   - มีเนื้อหาหลักสูตร สพฐ. 2551 (ปรับปรุง 2560) ครบทั้ง 5 สาระ (ท 1.1 - ท 5.1) ใน `M1_CURRICULUM_KNOWLEDGE.thai`
   - **ต้อง Fix Bug**: เพิ่ม `CURRICULUM_KNOWLEDGE_BASE.thai = Object.assign({}, M1_CURRICULUM_KNOWLEDGE.thai)` ใน `src/lib/curriculum-knowledge-base.ts`
3. **Chat Tutor Route**:
   - ปรับแก้บรรทัด 20 ใน `src/app/api/chat-tutor/route.ts` ให้รองรับ `subject === 'thai'`
4. **Dynamic Quiz Pool Parity**:
   - ต้องปรับแก้ Key ใน `src/lib/dynamic-quiz-pool.ts` ให้ตรงกับ 8 โมดูลของ `src/lib/thai-lessons-data.ts`
5. **Build & Test Verification**:
   - การ Build & Test หลักใช้ `npx tsc --noEmit` และ `npm run build`

---

## 5. Verification Method (วิธีการตรวจสอบความถูกต้อง)

1. **ตรวจสอบความถูกต้องของ TypeScript Types**:
   ```bash
   npx tsc --noEmit
   ```
2. **ตรวจสอบการ Build โปรเจกต์**:
   ```bash
   npm run build
   ```
3. **ตรวจสอบการ Merge ข้อมูล Knowledge Base**:
   - ตรวจสอบว่า `CURRICULUM_KNOWLEDGE_BASE.thai` มี 8 โมดูลครบถ้วน
   - ทดสอบเรียกฟังก์ชัน `searchCurriculumKnowledge('การอ่านจับใจความ', 'thai', 'thai_reading')` ต้องไม่คืนค่าเป็น String ว่าง
4. **ตรวจสอบ Telegram Bot Commands**:
   - ยิง POST request จำลองมายัง `/api/telegram/webhook` ด้วย payload: `{"message": {"chat": {"id": 7864027458}, "text": "/thai"}}` และ `/start` ตรวจสอบข้อความตอบกลับ
