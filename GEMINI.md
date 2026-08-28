# กฎเฉพาะโปรเจกต์ MASTER ม.1 (C:\Users\bkky9\master-m1)

## 🎯 เกี่ยวกับโปรเจกต์
- **ชื่อระบบ**: MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ
- **เป้าหมาย**: ติวสอบเข้มข้น ม.1 (คณิตศาสตร์, วิทยาศาสตร์, ภาษาอังกฤษ) พร้อมระบบ AI วิเคราะห์จุดอ่อน และจัดแผนการเรียนเฉพาะบุคคล
- **ผู้พัฒนา**: Phairot Makkaew ร่วมกับ Gemini AI
- **Production URL**: https://master-m1.vercel.app

---

## 🛡️ กฎเหล็กและการพัฒนา (Development Rules)

### Rule 1 — หลีกเลี่ยงข้อผิดพลาด 409 Conflict ใน Supabase Progress
- **ห้าม** ใช้ `supabase.from('progress').upsert(...)` จาก Browser Client โดยตรงเมื่อไม่มี Unique Constraint ที่แน่นอน
- ทุกการบันทึกผลคะแนนแบบฝึกหัด/โมดูล ต้องส่งผ่าน **Internal Server API (`/api/progress`)** และใช้กลยุทธ์ **Delete-then-Insert** หรือ **Check-then-Update** เสมอ

### Rule 2 — ระบบสุ่มโจทย์ AI และ Multi-Set Question Fallback
- ระบบสุ่มข้อสอบต้องมี **Multi-Set Question Bank (Set A / Set B / Set C)** สำรองในตัวเสมอ
- ฝั่ง API Route (`/api/lessons/generate-quiz`) ต้องตอบกลับด้วย `Status 200 OK` พร้อมชุดโจทย์สำรองเสมอ แม้ API Key หรือการเชื่อมต่อภายนอกจะติดขัด เพื่อป้องกัน `500 Internal Server Error`

### Rule 3 — ลิขสิทธิ์และ Footer Attribution
- ทุกหน้าของเว็บ MASTER ม.1 ต้องมี Footer แสดงข้อความลิขสิทธิ์และชื่อผู้พัฒนา:
  ```text
  © 2026 MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ | สงวนลิขสิทธิ์
  พัฒนาโดย Phairot Makkaew ร่วมกับ Gemini AI
  ```

### Rule 4 — ระบบรายงานข้อผิดพลาด (Feedback & Bug Reporting)
- ในหน้าสรุปบทเรียนและข้อสอบทุกข้อ ต้องมีปุ่ม `[ 🚩 แจ้งจุดผิด ]` เชื่อมต่อกับ `ReportModal` และ API `/api/reports` เพื่อเก็บข้อเสนอแนะในการปรับปรุงเนื้อหา

### Rule 5 — Vercel Deployment Commands
- การ Deploy สู่ Vercel Production ต้องระบุ `--scope hourmir2-3686s-projects`:
  ```bash
  npx vercel --prod --yes --scope hourmir2-3686s-projects
  ```

### Rule 6 — Quiz Submission UX & Instant Feedback Invariant
- **ห้าม** ปิดการทำงาน (Disable) ปุ่มส่งคำตอบโดยไม่แสดงข้อความเตือนเด็ดขาด
- เมื่อผู้ใช้กดส่งคำตอบขณะที่ยังตอบไม่ครบ ต้องแสดง **Warning Banner** ระบุข้อที่ยังไม่ได้ทำทันที (เช่น `⚠️ ยังไม่ได้ตอบข้อ 2, 4`)
- เมื่อส่งตรวจสำเร็จ ต้องแสดง **Score Result Dialog Popup** กลางหน้าจอเพื่อสรุปผลคะแนนอย่างชัดเจนทันที พร้อมปุ่มดูเฉลยละเอียดและลองทำใหม่

### Rule 7 — 24-Module Full Curriculum Synchronization
- โครงสร้างระบบหลักสูตรกำหนดไว้ที่ **24 โมดูล (วิชาละ 8 โมดูล)**
- ทุกส่วนการคำนวณในหน้า Dashboard (`src/app/dashboard/page.tsx`), Landing Page (`src/app/page.tsx`), และ Learning Path (`src/app/learning-path/page.tsx`) ต้องอ้างอิงฐาน 24 โมดูลและ 8 โมดูลต่อวิชาเสมอ (เช่น `Math.max(0, 24 - totalCompleted)`)

### Rule 8 — High-Yield Speed Math & Shortcuts Standard
- บทเรียนและข้อสอบต้องมีสูตรลัดประจำเรื่องเสมอ:
  1. การถอดรูทเร็วใน 3 วินาที (ตัด 2 ตัวท้าย ส่องหลักหน่วย & เทียบเลขลงท้าย 5)
  2. ยกกำลังสองเลขลงท้าย 5: $85^2 \rightarrow (8\times 9)25 = 7,225$
  3. คูณ 11 แบบแยกหัวท้าย
  4. พื้นที่ใบไม้แรเงาในสี่เหลี่ยมจัตุรัส: $\frac{4}{7}a^2$
  5. แปลงเปอร์เซ็นต์เป็นมุมองศาบนแผนภูมิวงกลม: $\text{มุม} = \% \times 3.6^\circ$

### Rule 9 — Dual-Save Progress Strategy (LocalStorage + Supabase)
- ทุกการบันทึกผลการทำแบบฝึกหัด ต้องบันทึกลง LocalStorage (`master_m1_progress`) เสมอเพื่อความเสถียร 100%
- พร้อมซิงค์ขึ้น Supabase Database (`/api/progress`) เมื่อมีผู้ใช้เข้าสู่ระบบ
- ทุกหน้าที่แสดงผล (Dashboard, หน้ารายวิชา) ต้อง Merge ข้อมูลจากทั้ง 2 แหล่ง และเลือกคะแนนที่ดีที่สุดเสมอ

### Rule 10 — Post-Quiz UX & Next Module Navigation
- การ์ดสรุปผลท้ายบทเรียนต้องแสดงสถานะผ่านเกณฑ์ชัดเจน (`✅ ผ่านเกณฑ์บทเรียนแล้ว (บันทึกสำเร็จ)`) เมื่อคะแนน $\ge 60\%$
- ต้องคำนวณและแสดงปุ่ม `[ ➡️ ไปต่อโมดูลถัดไป: {ชื่อโมดูล} ]` เสมอ เพื่อความลื่นไหลในการเรียนรู้
- หน้ารายวิชาต้องแสดงตรา `✓ ผ่านแล้ว (xx%)` สีเขียวบนโมดูลที่ทำคะแนนผ่านเกณฑ์แล้ว และเปลี่ยนปุ่มเป็น `[ ทบทวน / ทำซ้ำ ]`

### Rule 11 — Thai OBEC Curriculum Knowledge Base & Gemini 3.6 Flash Invariant
- **Model Endpoint**: ต้องใช้ `gemini-3.6-flash` สำหรับ API Routes ทุกตัว (`/api/chat-tutor`, `/api/lessons/generate-quiz`, `/api/pre-test/analyze`) เพื่อป้องกันข้อผิดพลาด 404 Model Deprecated
- **Grounding Architecture**: ทุกคำถามในแชทบอทครูพี่ AI ต้องดึงข้อมูลจาก `src/lib/curriculum-knowledge-base.ts` (รหัสตัวชี้วัด สพฐ., ทฤษฎี สสวท., สูตรลัด, จุดลวงข้อสอบ 10 ปี) เข้าไปเป็น System Grounding เสมอ
- **Complete Standalone Answer Standard**: คำตอบของครูพี่ AI ต้องมีโครงสร้างสมบูรณ์ในตัวเองเสมอ: 1) ความหมาย 2) ขั้นตอนวิธีทำ 3) ตัวอย่างจริงในชีวิตประจำวัน 4) จุดเน้นข้อสอบ/จุดที่มักโดนหลอก

### Rule 12 — Voice TTS Phonetics & Microsoft Niwat Engine Standard
- **Voice Preference**: ใน `src/components/AiTutorChat.tsx` ต้องจัดลำดับให้เสียง `Microsoft Niwat` (`Niwat` / `นิวัฒน์`) เป็นตัวเลือกอันดับ 1 เสมอ ตามด้วยเสียงธรรมชาติอื่นๆ (`Premwadee`, `Google ภาษาไทย`, `Kanya`)
- **Speech Speed**: ความเร็วเสียงเริ่มต้นกำหนดไว้ที่ `0.75x - 0.78x` พร้อมปุ่ม Toggle ปรับความเร็ว `[ 🔊 0.75x / 0.85x / 1.0x ]` บนหัวแชท
- **Grammar Phonetics Preprocessor**: ระบบสังเคราะห์เสียงต้องแปลงตัวย่อภาษาอังกฤษและสัญลักษณ์ทางวิทยาศาสตร์/คณิตศาสตร์ให้อ่านเป็นภาษาไทยที่ชัดเจนเสมอ เช่น:
  - `V.1` ➔ *"กริยาช่องหนึ่ง"*, `V.inf` ➔ *"กริยาช่องเดิมไม่ผัน"*, `S +` ➔ *"ประธาน บวก"*, `If-Clause` ➔ *"อิฟ คลอส"*, `√` ➔ *"สแควรูท"*, `ห.ร.ม.` ➔ *"หอรอมอ"*

### Rule 13 — Blogger & Facebook Auto-Publish Invariant
- **Model Endpoint**: ต้องใช้ `gemini-3.6-flash` ใน `/api/cron/publish-blog` เสมอ
- **Label & Title Sanitization**: ทุกการยิงโพสต์ขึ้น Google Blogger v3 ต้อง sanitize แท็ก `labels` (ลบเครื่องหมายพิเศษ ., &, / ออก) และคลีน `title` เสมอ เพื่อป้องกันข้อผิดพลาด 400 `INVALID_ARGUMENT`
- **Vercel Serverless Optimization**: ต้องรันกระบวนการดึง AI Caption และการขอ Token Blogger แบบขนาน (`Promise.all`) พร้อมใช้ Rich HTML Template สำเร็จรูป เพื่อให้เวลาประมวลผลอยู่ต่ำกว่า 3 วินาที ป้องกัน Serverless Timeout

### Rule 14 — Production Environment Variables Alignment
- เมื่อมีการเพิ่ม Environment Variables สำหรับระบบ Automation ใน `.env.local` ต้องเพิ่มขึ้น Vercel Production เสมอ (`FB_PAGE_TOKEN`, `FB_PAGE_ID`, `BLOGGER_CLIENT_ID`, `BLOGGER_CLIENT_SECRET`, `BLOGGER_REFRESH_TOKEN`, `BLOGGER_BLOG_ID`, `PARENT_TELEGRAM_BOT_TOKEN`, `PARENT_TELEGRAM_CHAT_ID`)

### Rule 15 — Universal Multi-Parent Telegram Monitoring & PostgREST Invariant
- **Dedicated Bot Token**: ใช้บอท "ครูพี่ MASTER AI" (`@MasterM1_Parent_bot` / Token: `8246219426:AAHB8IdCFMwgXG0pf3VAlAncfjp2WM_43kg`) ผ่าน Webhook `/api/telegram/webhook`
- **PostgREST Query Invariant**: ห้ามใช้ `.ilike` บนคอลัมน์ UUID (เช่น `id`) ใน Supabase `.or(...)` filter เด็ดขาด ให้ค้นหาเฉพาะ `email.ilike.%...%` และ `full_name.ilike.%...%` เพื่อป้องกัน PostgreSQL Type Error 42883
- **Attempt History & Score Growth**: ทุกการทำแบบฝึกหัดใน `/api/progress` ต้องบันทึกประวัติทุกรอบ (Attempt count) และคำนวณผลต่างคะแนน (+% Growth) ส่งแจ้งเตือน Real-time เข้า Telegram ผู้ปกครอง
- **Dynamic Zero-Typing QR Code**: หน้า Dashboard ต้องสร้าง Dynamic QR Code สู่ `https://t.me/MasterM1_Parent_bot?start=link_<email>` ตามบัญชีที่ล็อกอิน เพื่อให้ผู้ปกครองสแกนแล้วผูกบัญชีได้ทันที
- **24/7 Commands Support**: บอทต้องรองรับคำสั่ง `/pretest`, `/report`, `/history`, `/math`, `/science`, `/english`, `/link <email>` ตลอด 24 ชม.

### Rule 16 — Cognitive Learning Psychology & 10-Question Scaffolding Standard
- **Micro-Learning Session Length**: แบบฝึกหัดทุกบทเรียนต้องยึดมาตรฐานชุดละ **10 ข้อ (12–15 นาที)** เพื่อให้สอดคล้องกับช่วงสมาธิสูงสุด (Peak Focus Span) ป้องกันความเครียดและอาการหมดไฟ (No Burnout)
- **Stepped Cognitive Scaffolding**: โครงสร้างข้อสอบ 10 ข้อต้องจัดระดับความยากแบบขั้นบันไดเสมอ:
  - **ข้อ 1–3**: สร้างความมั่นใจ ปูพื้นฐาน (Confidence Builder)
  - **ข้อ 4–7**: โจทย์ประยุกต์ สสวท. พร้อมฝึกสูตรลัด 3 วินาที (Application Zone)
  - **ข้อ 8–10**: โจทย์ประลองไหวพริบระดับห้องพิเศษ Gifted & ดักจุดลวงข้อสอบ 10 ปี (Gifted Challenge)
- **Dual-Track Pathway Alignment**:
  - **Personalized Track**: เส้นทางเฉพาะตัวตามเป้าหมายอาชีพ (เช่น เภสัชกร/แพทย์ เน้นสารละลาย %w/w, เซลล์, เลขคิดเร็ว 3 วิ)
  - **OBEC Standard Track**: ครบ 4 วิชาหลัก 32 โมดูล (คณิต, วิทย์, อังกฤษ, ไทย 1000%) ตรงตามหลักสูตร สพฐ. 2551 (ปรับปรุง 2560)
- **Comprehensive Telegram Telemetry**: ผลการเรียนทุกรูปแบบ (Pre-Test, แบบฝึกหัด 32 โมดูล, O-NET 2570, และประวัติพัฒนาการ) ต้องส่งแจ้งเตือนและเรียกดูผ่านคำสั่งบอทได้ 24 ชม.

---

## 🗺️ แผนงานและฟีเจอร์ในอนาคต (Future Roadmap)
- ดูรายละเอียดฟีเจอร์ Gamification, Mock Exam, Printable PDF, Audio TTS, และระบบส่งผลให้ผู้ปกครอง ได้ที่ [ROADMAP.md](./ROADMAP.md)


