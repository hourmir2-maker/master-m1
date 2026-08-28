# รายงานการส่งมอบงาน (Handoff Report) — Worker 2 (Quiz & Technique Expert)
**ตำแหน่งไฟล์**: `C:\Users\bkky9\master-m1\.agents\worker_thai_quiz\handoff.md`  
**ภารกิจ**: สร้างคลังโจทย์วิชาภาษาไทย Set B ครบ 80 ข้อ (10 ข้อ × 8 โมดูล) ใน `src/lib/dynamic-quiz-pool.ts` key `thai`  
**สถานะ**: สำเร็จสมบูรณ์ 100% (Hard Handoff)

---

## 1. Observation (การสังเกตเชิงประจักษ์)

1. **โครงสร้างเดิมใน `src/lib/dynamic-quiz-pool.ts`**:
   - เดิม key `thai` บรรจุโมดูลแบบเก่า 8 ตัวที่ไม่ตรงกับระบบหลัก (`thai_phonetics_tones`, `thai_grammar_syntax`, `thai_spelling_rules`, `thai_morphology`, `thai_proverbs_idioms`, `thai_royal_vocabulary`, `thai_literature_appreciation`, `thai_reading_comprehension`) โดยมีเพียงโมดูลละ 5 ข้อ (รวม 40 ข้อ)
2. **8 Unified Module IDs ตามมาตรฐานหลักสูตร สพฐ. 2551 (ปรับปรุง 2560)**:
   - `thai_reading`: การอ่านจับใจความ ตีความ โวหารภาพพจน์ & แยกแยะข้อเท็จจริง (ท 1.1)
   - `thai_word_classes`: ชนิดของคำ 7 ชนิด & หน้าที่ของคำในประโยค (ท 4.1 ป.6/1)
   - `thai_royal_loanwords`: คำราชาศัพท์ คำสุภาพ & คำยืมภาษาต่างประเทศ (ท 4.1 ป.6/2)
   - `thai_sentence_structures`: โครงสร้างประโยค (สามัญ รวม ซ้อน) & ระดับภาษา (ท 4.1 ป.6/3)
   - `thai_idioms_dialects`: สำนวน สุภาษิต คำพังเพย & ภาษาไทยมาตรฐาน vs ภาษาถิ่น 4 ภาค (ท 4.1 ป.6/5, ป.6/6)
   - `thai_literature_poetry`: ฉันทลักษณ์ กลอนสุภาพ & วรรณคดีวรรณกรรม ป.6 (ท 4.1 ป.6/4, ท 5.1)
   - `thai_writing`: การเขียนสื่อสาร เขียนย่อความ & เขียนเรื่องตามจินตนาการ (อัตนัย 15 คะแนน) (ท 2.1)
   - `thai_listening_speaking`: การฟัง การดู การพูด & การวิเคราะห์สื่อโฆษณา (ท 3.1)
3. **ผลการสร้างและผนวกข้อมูลใน `src/lib/dynamic-quiz-pool.ts` (บรรทัด 1214–2295)**:
   - สร้างคลังโจทย์ Set B ใหม่ทั้งหมด 80 ข้อ (โมดูลละ 10 ข้อ)
   - ทุกข้อมี 4 ตัวเลือก (`options.length === 4`)
   - ค่า `correctAnswer` ตรงกับ 1 ใน `options` แบบ Strict Equality 100%
   - คำอธิบาย `explanation` ทุกข้อมีส่วนวิเคราะห์ Diagnostic Explanations ระบุสาเหตุที่ตัวเลือกที่ถูกต้องเป็นคำตอบที่ถูก และระบุเหตุผลที่ตัวเลือกที่เหลืออีก 3 ตัวเลือกผิดอย่างละเอียด
   - มีเทคนิค `tip` (สูตรลัด 3 วินาที หรือคำเตือนดักจุดลวง O-NET) บรรจุครบทั้ง 80 ข้อ
4. **ผลการรันคำสั่งตรวจสอบ (Verification Commands Output)**:
   - `npx tsc --noEmit`: จบการทำงานด้วย `exit code 0` (0 errors)
   - `npm run build`:
     ```text
     ✓ Compiled successfully in 1371ms
     Finished TypeScript in 2.5s ...
     ✓ Generating static pages using 7 workers (28/28) in 563ms
     ```

---

## 2. Logic Chain (สายธารตรรกะและการวิเคราะห์)

```
[Observation 1 & 2: Module IDs เดิมไม่ตรงกับระบบหลักและมีเพียง 40 ข้อ]
                         ↓
[ความจำเป็น: ต้องอัปเกรดเป็น 8 Unified Module IDs และเพิ่มเป็น 80 ข้อ Set B เต็มรูปแบบ]
                         ↓
[การออกแบบเนื้อหาตาม Scaffolding Rule 16]:
• ข้อ 1–3 (Confidence Builder): นิยาม หลักภาษาพื้นฐาน สรรพนาม ลักษณนาม ส่วนประกอบประโยค
• ข้อ 4–7 (Application Zone): ประยุกต์ใช้กับบทความจริง + เทคนิคตัดช้อยส์ 3 วิ (สมุหนาม, สันสกฤต, สันธาน, ย่อความ)
• ข้อ 8–10 (Gifted Challenge): ดักจุดลวง O-NET 10 ปี (สทศ. 2558-2568) เช่น การบ้าน/การเมืองไม่ใช่อาการนาม, โคลงโลกนิติชำระโดยกรมพระยาเดชาดิศร, ชมพู่ภาษาใต้แปลว่าฝรั่ง, ห้ามทรงนำหน้ากริยาราชาศัพท์แท้, ห้ามใช้คำย่อในข้อสอบอัตนัย
                         ↓
[Observation 3: ทุกข้อมี 4 ตัวเลือก, Diagnostic Explanations สำหรับ 3 ตัวเลือกที่ผิด, และ tip]
                         ↓
[Observation 4: Build และ Type Check ผ่านฉลุย 100%]
```

---

## 3. Caveats (ข้อพึงระวังและขอบเขต)

1. **ขอบเขตการแก้ไขไฟล์**: ดำเนินการเฉพาะในส่วน key `thai` ของ `src/lib/dynamic-quiz-pool.ts` ตามสิทธิ์ Exclusive Write Ownership เท่านั้น ไม่ได้แตะต้องวิชาอื่น (math, science, english)
2. **ความสอดคล้องกับ Set A**: ข้อสอบ Set B ทั้ง 80 ข้อ ถูกสร้างขึ้นใหม่โดยไม่ซ้ำกับ Set A ใน `src/lib/thai-lessons-data.ts` ทั้งในส่วนบทความ ตัวอย่างคำศัพท์ และสถานการณ์โจทย์

---

## 4. Conclusion (ข้อสรุป)

ภารกิจการสร้างคลังโจทย์วิชาภาษาไทย **Set B จำนวน 80 ข้อ ครบ 8 โมดูล (โมดูลละ 10 ข้อ)** ใน `src/lib/dynamic-quiz-pool.ts` เสร็จสมบูรณ์ ตรงตามมาตรฐานหลักสูตร สพฐ. 2551 (ปรับปรุง 2560), สอดคล้องกับ Scaffolding Rule 16 และมี Diagnostic Explanations ครบถ้วน พร้อมสำหรับการทำ Cross-Audit และ Deploy Production ได้ทันที

---

## 5. Verification Method (วิธีการตรวจสอบความถูกต้องอย่างอิสระ)

Auditor หรือผู้ดูแลระบบสามารถตรวจสอบผลลัพธ์ได้อย่างอิสระผ่านขั้นตอนดังต่อไปนี้:

1. **ตรวจสอบความสมบูรณ์ของโครงสร้างข้อมูล**:
   - ตรวจสอบไฟล์ `src/lib/dynamic-quiz-pool.ts` ในบล็อก `thai`:
     - มี 8 โมดูล: `thai_reading`, `thai_word_classes`, `thai_royal_loanwords`, `thai_sentence_structures`, `thai_idioms_dialects`, `thai_literature_poetry`, `thai_writing`, `thai_listening_speaking`
     - แต่ละโมดูลมี array `[0]` บรรจุ `PracticeQuestion` จำนวน 10 ข้อ พอดี
2. **ตรวจสอบ Type Safety และ Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```
   ต้องไม่มี Error หรือ Type Mismatch ใดๆ
3. **ตรวจสอบคุณภาพของเฉลยและจุดลวง**:
   - ทุกข้อใน `explanation` ต้องมีข้อความ `🔍 【วิเคราะห์ตัวเลือกที่ผิด (Diagnostic Explanations)】:` วิเคราะห์ 3 ช้อยส์ที่ผิด
   - `correctAnswer` ต้องตรงกับสตริงใน `options` เป๊ะ 100%
