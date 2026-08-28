## 2026-08-28T07:46:40Z
คุณคือ Worker 1 (Thai Language Specialist)
ทำงานในไดเรกทอรี: C:\Users\bkky9\master-m1\.agents\worker_thai_lessons
Parent ID: 0415758e-2dfb-4162-9408-e0d0aba663ad

อ่านไฟล์เหล่านี้ก่อนเริ่มงาน:
1. C:\Users\bkky9\master-m1\.agents\ORIGINAL_REQUEST.md
2. C:\Users\bkky9\master-m1\GEMINI.md
3. C:\Users\bkky9\master-m1\PROJECT.md
4. C:\Users\bkky9\master-m1\.agents\explorer_survey_1\handoff.md
5. C:\Users\bkky9\master-m1\src\lib\thai-lessons-data.ts

ไฟล์ที่คุณถือสิทธิ์เขียนแต่เพียงผู้เดียว (Exclusive Write Ownership):
- `C:\Users\bkky9\master-m1\src\lib\thai-lessons-data.ts`

ภารกิจ:
สร้างเนื้อหาบทเรียนวิชาภาษาไทยครบ 8 โมดูล (t1 - t8) ให้สมบูรณ์และแม่นยำระดับเทพ 100% ตรงตามหลักสูตร สพฐ. 2551 (ปรับปรุง 2560) ใน `src/lib/thai-lessons-data.ts`:
1. `thai_reading`: การอ่านจับใจความ ตีความ โวหารภาพพจน์ & แยกแยะข้อเท็จจริง (ท 1.1 ป.6/1-ป.6/5)
2. `thai_word_classes`: ชนิดของคำ 7 ชนิด & หน้าที่ของคำในประโยค (ท 4.1 ป.6/1)
3. `thai_royal_loanwords`: คำราชาศัพท์ คำสุภาพ & คำยืมภาษาต่างประเทศ (บาลี สันสกฤต เขมร อังกฤษ จีน) (ท 4.1 ป.6/2)
4. `thai_sentence_structures`: โครงสร้างประโยค (สามัญ รวม ซ้อน) & ระดับภาษา (ท 4.1 ป.6/3)
5. `thai_idioms_dialects`: สำนวน สุภาษิต คำพังเพย & ภาษาไทยมาตรฐาน vs ภาษาถิ่น 4 ภาค (ท 4.1 ป.6/5, ป.6/6)
6. `thai_literature_poetry`: ฉันทลักษณ์ กลอนสุภาพ & วรรณคดีวรรณกรรม ป.6 (รามเกียรติ์, ขุนช้างขุนแผน ตอนกำเนิดพลายงาม, โคลงโลกนิติ, สุภาษิตสอนหญิง) (ท 4.1 ป.6/4, ท 5.1 ป.6/1-ป.6/3)
7. `thai_writing`: การเขียนสื่อสาร เขียนย่อความ & เขียนเรื่องตามจินตนาการ (อัตนัย 15 คะแนน สทศ.) (ท 2.1 ป.6/1-ป.6/8)
8. `thai_listening_speaking`: การฟัง การดู การพูด & การวิเคราะห์สื่อโฆษณา (ท 3.1 ป.6/1-ป.6/3)

ข้อกำหนดทุกโมดูล:
- `secretFormula`: สูตรลัด 3 วินาที + จุดลวง สทศ. (อ้างอิงข้อสอบ O-NET ย้อนหลัง 10 ปี 2558-2568)
- `summaryPoints`: สรุปหลักการ ตารางเปรียบเทียบ/แผนภูมิช่วยจำ
- `practiceQuestions`: **Set A ครบ 10 ข้อต่อโมดูล (รวม 80 ข้อ)**
  - จัดความยากตาม Scaffolding Rule 16: ข้อ 1-3 พื้นฐาน, ข้อ 4-7 ประยุกต์+สูตรลัด 3 วิ, ข้อ 8-10 Gifted Challenge & ดักจุดลวง สทศ.
  - ทุกข้อต้องมี 4 ตัวเลือก, `correctAnswer` (ตรงกับตัวเลือกเป๊ะ), `explanation` แบบ **Diagnostic Explanation** อธิบายเหตุผลที่ตัวเลือกอื่นทั้ง 3 ข้อผิดอย่างละเอียด, และ `tip` สูตรลัด
