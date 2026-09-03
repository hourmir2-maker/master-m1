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
- **Dedicated Bot Token**: ใช้บอท "ครูพี่ MASTER AI" (`@MasterM1_Parent_bot`) ผ่าน Webhook `/api/telegram/webhook` และ Environment Variable `PARENT_TELEGRAM_BOT_TOKEN`
- **Zero Hardcoded Secrets Invariant**: ห้ามใส่ String ค่า Fallback สำหรับ API Key / Bot Token ในซอร์สโค้ดเด็ดขาด (`const botToken = process.env.TOKEN || 'hardcoded_key'`) ให้ใช้เฉพาะ `process.env.<VAR>` พร้อมระบบ Null Safety Check เพื่อป้องกันคีย์รั่วไหลไปสู่ภายนอก 100%
- **PostgREST Query Invariant**: ห้ามใช้ `.ilike` บนคอลัมน์ UUID (เช่น `id`) ใน Supabase `.or(...)` filter เด็ดขาด ให้ค้นหาเฉพาะ `email.ilike.%...%` และ `full_name.ilike.%...%` เพื่อป้องกัน PostgreSQL Type Error 42883
- **Attempt History & Score Growth**: ทุกการทำแบบฝึกหัดใน `/api/progress` ต้องบันทึกประวัติทุกรอบ (Attempt count) และคำนวณผลต่างคะแนน (+% Growth) ส่งแจ้งเตือน Real-time เข้า Telegram ผู้ปกครอง
- **Dynamic Zero-Typing QR Code**: หน้า Dashboard ต้องสร้าง Dynamic QR Code สู่ `https://t.me/MasterM1_Parent_bot?start=link_<email>` ตามบัญชีที่ล็อกอิน เพื่อให้ผู้ปกครองสแกนแล้วผูกบัญชีได้ทันที
- **24/7 Commands Support**: บอทต้องรองรับคำสั่ง `/pretest`, `/report`, `/history`, `/math`, `/science`, `/english`, `/thai`, `/onet`, `/link <email>` ตลอด 24 ชม.

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

### Rule 17 — Smart Brain-Break Reminder & Playful Socratic Pivot Standard
- **Smart 25-Minute Break Reminder**: ใน `src/components/SmartBreakReminder.tsx` ต้องจับเวลา 25 นาทีและแสดง Modal พักสมอง 5 นาทีตามหลัก Pomodoro พร้อมกฎพักสายตา 20-20-20 และดื่มน้ำ
- **Exam-Page Suppression Invariant**: SmartBreakReminder ต้องใช้ `usePathname()` ตรวจก่อนเสมอ — ถ้า path เริ่มด้วย `/onet-exam`, `/mock-exam`, `/pre-test` ให้ return ออกทันทีโดยไม่ตั้ง interval เพื่อป้องกันการรบกวนขณะสอบ
- **Playful Banter & Socratic Pivot**: `/api/chat-tutor` AI Tutor ต้องตอบรับบทสนทนาทั่วไปด้วยน้ำเสียงอบอุ่น 1-2 ประโยค แล้ววกกลับเข้าบทเรียนโดยผูกเรื่องที่น้องคุยเข้ากับหลักการทางวิชาการเสมอ (The Socratic Pivot)

### Rule 18 — AdSense Native Script & Telegram Command Completeness
- **AdSense Script Invariant**: ใน `src/app/layout.tsx` ต้องใช้ native `<script async>` tag สำหรับ Google AdSense เสมอ ห้ามใช้ Next.js `<Script strategy="afterInteractive">` เพราะจะเพิ่ม `data-nscript` attribute ที่ AdSense ไม่รองรับ
- **Telegram Command Parity Invariant**: ทุกครั้งที่เพิ่มวิชาใหม่หรือ feature ใหม่ ต้องเพิ่ม Telegram bot command handler ใน `/api/telegram/webhook/route.ts` คู่กันเสมอ
- **Default Help Menu Standard**: Default reply ของบอท (กรณีไม่ตรง command ไหน) ต้องแสดงเมนูคำสั่งครบทุกคำสั่ง (`/pretest`, `/report`, `/history`, `/math`, `/science`, `/english`, `/thai`, `/onet`, `/link`) เสมอ

### Rule 19 — Web Audio Synthesizer Standard
- **Zero-External Asset Audio Invariant**: ใน `src/lib/sound-fx.ts` การเล่นเสียงประกอบ (ตอบถูก ตอบผิด ฉลอง Fanfare) ต้องใช้ Web Audio API สังเคราะห์เสียงผ่าน `AudioContext` และ `OscillatorNode` เท่านั้น ห้ามโหลดไฟล์เสียง MP3/WAV ภายนอก เพื่อให้รองรับการทำงานออฟไลน์ 100%
- **SSR Safety Invariant**: ทุกฟังก์ชันเกี่ยวกับเสียงต้องตรวจสอบ `typeof window !== 'undefined'` และมี `try...catch` ครอบเสมอ เพื่อป้องกัน Error ระหว่าง Server-Side Rendering (SSR) และ Next.js Build

### Rule 20 — Git Secret History Hygiene & GitHub Sync Standard
- **Zero-Secret Commit Invariant**: ห้าม Commit ไฟล์ความลับ เช่น `token.json`, `credentials.json`, `.env.local` หรือ API Key ลงใน Git Repository เด็ดขาด ต้องมีบันทึกระบุใน `.gitignore` เสมอ
- **GitHub Push Protection Resolution**: หากการ `git push` โดนบล็อกด้วย GitHub Push Protection (GH013) ต้องใช้ `git filter-branch` หรือ `git filter-repo` ทำความสะอาดประวัติ commit ย้อนหลังให้สะอาด ก่อนทำการ `--force` push เสมอ
- **Repository Parity**: ทุกครั้งที่จบเซสชันการพัฒนา ต้องตรวจสอบว่า local commit ทั้งหมดถูก Push ขึ้น remote origin (`main`) บน GitHub (`hourmir2-maker/master-m1`) ครบถ้วน เพื่อรองรับการทำงานข้ามเครื่อง

### Rule 21 — Smart Conditional Privacy & Personalized Student Identity Invariant
- **Student Identity**: บุตรชายของผู้พัฒนาคือ **ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)**
- **Smart Conditional Privacy**: ทุกการแสดงผลข้อความส่วนตัว/ข้อคิดกำลังใจจากผู้ปกครอง (คุณพ่อไพโรจน์ มากแก้ว) ต้องผูกกับระบบ `isPhumrapee` (`userProfile?.email === 'phumrapeeft@gmail.com' || userProfile?.full_name?.includes('ภูมิรพีร์')`) เสมอ
- **General Fallback Mode**: หากเป็นนักเรียนทั่วไปหรือผู้ใช้อื่นเข้าสู่ระบบ หน้าเว็บต้องสลับไปแสดงการ์ดเทคนิควิชาการทั่วไป (General Academic Coaching Card) อัตโนมัติ เพื่อความเป็นส่วนตัวและความปลอดภัย 100%

### Rule 22 — 56-Module Full Dual-Track Curriculum & 560-Question Scaffolding Invariant
- **Full Curriculum Structure**: โครงสร้างหลักสูตร MASTER ม.1 ประกอบด้วย **56 โมดูลเต็ม (รวม 560 ข้อสอบ Scaffolding)**:
  - 📖 ภาษาไทย (8 โมดูลหลัก สพฐ. / 80 ข้อ)
  - 🔢 คณิตศาสตร์ (16 โมดูล: ป.6 สอบเข้า ม.1 [8 บท] + ม.1 Advance [8 บท] / 160 ข้อ)
  - 🔬 วิทยาศาสตร์ (16 โมดูล: ป.6 สอบเข้า ม.1 [8 บท] + ม.1 Advance [8 บท] / 160 ข้อ)
  - 🇬🇧 ภาษาอังกฤษ (16 โมดูล: ป.6 สอบเข้า ม.1 [8 บท] + ม.1 Advance EP [8 บท] / 160 ข้อ)
- **Modular Data Architecture**: ข้อมูลบทเรียนต้องแยกเป็นไฟล์ Dataset อิสระ (`src/lib/*-lessons-data.ts`) แล้วนำเข้าและผสานรวมผ่าน `Object.assign` ใน `src/lib/lessons-data.ts` เพื่อความปลอดภัยของหน่วยความจำและง่ายต่อการบำรุงรักษา

### Rule 23 — 4-Tier Academic Accuracy & Quality Verification Standard
- **Zero-Error Academic Invariant**: เนื้อหาบทเรียนและเฉลยข้อสอบต้องผ่านการตรวจสอบความถูกต้อง 100% ด้วยมาตรฐาน 4 ชั้น:
  1. *Tier 1 (Curriculum Grounding)*: อ้างอิงหลักสูตรแกนกลาง สพฐ. 2551 (ปรับปรุง 2560), ตำรา สสวท., และ CEFR A2-B1
  2. *Tier 2 (Double-Solver Audit)*: คำนวณแก้โจทย์ซ้ำ ตรวจสอบว่ามี 1 คำตอบที่ถูกแท้จริง และอธิบายตัวเลือกผิดทุกข้อ
  3. *Tier 3 (Automated Data Linter)*: ตรวจสอบ `correctAnswer` ตรงกับ `options` 100%, มี `explanation` และ `tip` ดักจุดลวง
  4. *Tier 4 (Real-time Telemetry)*: มีปุ่ม `[ 🚩 แจ้งจุดผิด ]` เชื่อมต่อ API `/api/reports` ส่งเตือนเข้า Telegram ครูพี่ AI 24 ชม.

### Rule 24 — Oxford 3000 & Interactive Lexical Mastery System Invariant
- **Smart Vocab Bank (`/vocab-bank`)**: รวมคำศัพท์ Oxford 3000™ และ CEFR A1-C1 ครบ 11 หมวดหมู่ พร้อมระบบออกเสียงเจ้าของภาษา US ด้วย Web Speech API และมีคำอ่านสัทอักษรภาษาไทย (`thaiPhonetic`) กำกับทุกคำ
- **Spaced Repetition Flashcards (`/flashcards`)**: ระบบการ์ดคำศัพท์ช่วยจำเพื่อถ่ายโอนข้อมูลสู่ความจำระยะยาว (Long-Term Memory)
- **Affixes & Roots Decoding**: ฝึกทักษะการแกะความหมายคำศัพท์ด้วย Prefix/Suffix ใน 3 วินาที

### Rule 25 — Strict Real-Data Invariant (ห้ามจำลองคะแนนสอบ / ใช้ข้อมูลจริง 100%)
- **Real-Data Only**: ห้ามรันสคริปต์ส่ง mock score หรือจำลองผลสอบปลอมเข้าสู่ Production Database หรือ Telegram เด็ดขาด
- **Authentic Student Telemetry**: สถิติคะแนน, ประวัติการทำแบบฝึกหัด, และการแจ้งเตือนความก้าวหน้าทั้งหมดต้องเกิดขึ้นจากการเรียนจริงของผู้เรียน (ด.ช.ภูมิรพีร์ มากแก้ว / ผู้เรียนในระบบ) เท่านั้น 100%

### Rule 26 — User-Scoped Local Storage & Multi-Account Isolation Standard
- **User-Scoped Caching**: การบันทึกข้อมูล `localStorage` ทุกชนิด (เช่น ความคืบหน้าการเรียน, คิว Spaced Repetition) ต้องใช้คีย์ที่ผูกกับ User ID เสมอ เช่น `master_m1_progress_${userId}` เพื่อป้องกันการดึงคะแนนเก่าข้ามบัญชีเมื่อมีการสลับบัญชีล็อกอินในเบราว์เซอร์เดียวกัน
- **Zero Static Fallback Identity**: การแสดงชื่อ, อีเมล, และเป้าหมายโรงเรียนในทุกหน้าและคอมโพเนนต์ ต้องดึงจาก Session Profile จริงของผู้ใช้ที่ล็อกอินอยู่เท่านั้น ห้ามใส่ชื่อหรืออีเมล Fallback แบบ Hardcode ในคอมโพเนนต์ UI เด็ดขาด

### Rule 27 — Centralized Natural AI Voice Speech Engine Standard
- **Single Source of Truth**: ทุกคอมโพเนนต์ที่ใช้เสียง (แชทติวเตอร์, โทรคุยสด, บรรยายสรุปบทเรียน, Flashcards) ต้องเรียกใช้ `speakNaturalText` จาก `src/lib/tts-engine.ts` เท่านั้น
- **Continuous Sentence Streaming**: ต้องแบ่งประโยคย่อย (Sentence Chunking $\le 120$ ตัวอักษร) และพูดต่อเนื่องพร้อมเว้นจังหวะลมหายใจ 150ms เพื่อป้องกันบั๊กเบราว์เซอร์ตัดเสียงหลัง 15 วินาที
- **Voice Preference Hierarchy**: จัดลำดับเสียงพรีเมียมอันดับ 1 คือ `Microsoft Niwat Online (Natural)`, อันดับ 2 คือ `Microsoft Premwadee Online (Natural)`, และอันดับ 3 คือ `Google ภาษาไทย`
- **Comprehensive Phonetics Preprocessor**: ต้องแปลงสัญลักษณ์คณิตศาสตร์ ($\Delta t$, $Q=mc\Delta t$, $a^2$, ห.ร.ม., ค.ร.น.) และไวยากรณ์ภาษาอังกฤษ (`V.1`, `V.2`, `S + V`) เป็นคำอ่านภาษาไทยที่ถูกต้อง โดยไม่ใส่เครื่องหมายจุลภาคพร่ำเพรื่อเพื่อไม่ให้เกิดเสียงกระตุก

### Rule 28 — Merit-Based VIP Unlock & Adaptive Exam Assistant Standard
- **Dual VIP Pathway**: นักเรียนสามารถเข้าถึงคลังสูตรลัดมหาเทพ 3 วินาที (VIP Vault) ได้จาก 2 ช่องทาง: 1) แอดมินปรับสิทธิ์ในหน้า `/admin` หรือ 2) ทำคะแนนแบบฝึกหัดท้ายบทได้ $\ge 90\%$ (Auto-Unlock ผ่าน `/api/progress`)
- **Exam Assistance Tools**: หน้าทำแบบฝึกหัดและสนามสอบจำลอง (O-NET, Mock Exam, NT, RT) ต้องติดตั้ง `<DigitalScratchpad />` สำหรับทดเลข และ `<PaceCoach />` ช่วยฝึกการบริหารเวลา $\le 90$ วินาที/ข้อ เสมอ

### Rule 29 — Audio-Video Synchronization & AI Lyric Alignment Standard
- **Zero-Guessing Lyric Timestamps**: ห้ามใช้เวลาคาดคะเน (Estimated Timestamps) ในการทำซับไตเติลเพลงเด็ดขาด เนื่องจากเพลงที่สังเคราะห์ด้วย AI (เช่น Lyria 3 Pro) มีความยาวช่วง Intro (10-15 วินาที) และการเว้นวรรคจังหวะดนตรีที่ไม่คงที่
- **AI Waveform Ingestion & Alignment**: ก่อนทำซับไตเติล ต้องส่งไฟล์เสียง (`.mp3`) ให้ Gemini Audio Engine (`gemini-3.6-flash` / API) ฟังคลื่นเสียงจริงและวิเคราะห์หาเวลาเริ่ม-จบที่แท้จริงระดับมิลลิวินาที (Exact Millisecond Timestamps) เสมอ
- **Thai Typography & Formula Highlighting**:
  1. ใช้ฟอนต์ไทยสากลมาตรฐาน Windows: `Tahoma Bold` หรือ `Leelawadee UI Bold`
  2. กำหนดขนาด 24-27px พร้อมเส้นขอบสีดำหนา (Outline 2.5-3.5px) เพื่อให้อ่านออกชัดเจนบนทุกพื้นหลังภาพ
  3. แยกสไตล์ `HighlightStyle` (สีทอง/เหลืองสด `&H002BF7FF` หรือ `&H0000FFFF`) สำหรับท่อนสูตรลัดและจุดลวง สทศ. เพื่อกระตุ้นความจำ
- **Hardsub Re-encoding**: เรนเดอร์ฝังซับไตเติลลงในวิดีโอด้วย `ffmpeg -vf ass='...'` เสมอ เพื่อให้สามารถเล่นบนทุกอุปกรณ์ (มือถือ, แท็บเล็ต, เว็บ, โซเชียล) ได้อย่างสมบูรณ์แบบโดยไม่ต้องพึ่งพาตัวเล่นภายนอก

### Rule 30 — AiPASS Multi-Modal Pipeline & Multi-Angle Video Assembly Standard
- **Topic-Aware Multi-Clip Concatenation**: เมื่อมีการสร้างคลิปวิดีโอมากกว่า 1 คลิปสำหรับวิชา/เพลงเดียวกัน ให้ตรวจสอบความสอดคล้องของ Prompt และนำคลิปมาร้อยเรียงต่อกัน (Concatenate via FFmpeg) สลับมุมกล้องและฉาก เพื่อสร้างความหลากหลายทางภาพ ไม่ให้นำคลิปไปจับคู่ผิดวิชาเด็ดขาด
- **Video-to-Audio Looping**: เมื่อวิดีโอต้นฉบับสั้นกว่าเพลง ให้ใช้เทคนิค `-stream_loop -1` และ `-shortest` เพื่อวนลูปภาพต่อเนื่องแบบ Seamless Loop จนจบเพลงพอดี
- **Automated Public Sync**: ไฟล์วิดีโอและเพลงที่เรนเดอร์เสร็จสมบูรณ์ ต้องจัดเก็บสำรองไว้ที่ `C:\Users\bkky9\master_m1_media\` และทำสำเนาเข้าสู่ `public/media/` ของโปรเจกต์ พร้อมเพิ่มใน `.gitignore` เพื่อป้องกัน Repository บวม

### Rule 31 — Account Authority, Studio Assets & Local Picker Architecture
- **Strict Account Authority Invariant**: 
  - บัญชีหลักอย่างเป็นทางการที่ผูกกับ **Google AdSense (`pub-7280055452989562`)** และเพจ Facebook คือ **`pairote05@hotmail.com`**
  - **Official YouTube Channel**: Channel ID **`UCL_9roKIZ7-5oL3-I_Sj6eg`** (URL: [https://youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg](https://youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg))
  - **Official Facebook Page**: Page ID **`645243598902533`** (URL: [https://www.facebook.com/645243598902533](https://www.facebook.com/645243598902533))
  - ห้ามระบบอัตโนมัติหรือบอทอัปโหลดสื่อหรือสร้างช่องในบัญชีจำลอง/บัญชีสำรองอื่นเด็ดขาด
- **Local Media & Desktop Hub Structure**:
  - สื่อวิดีโอและกราฟิกที่พร้อมเผยแพร่ ต้องจัดเก็บในโครงสร้างโฟลเดอร์ภาษาไทยที่ชัดเจน ค้นหาง่าย และเข้าถึงได้ทันทีจาก Windows File Dialog:
    1. `C:\Users\bkky9\master_m1_media\` (คลังไฟล์ต้นฉบับและเรนเดอร์)
    2. `Desktop ➔ คลิปสำหรับลง_YouTube` (โฟลเดอร์สำหรับผู้ใช้คลิกเลือกอัปโหลดบนหน้าจอ)
    3. `public/media/` (ไฟล์บนเว็บไซต์ MASTER ม.1)
  - ต้องมีไฟล์ `ข้อความสำหรับโพสต์_YouTube.txt` กำกับในทุกโฟลเดอร์ รวบรวมชื่อคลิป (Title), คำอธิบาย (Description), ลิงก์เว็บ, และแฮชแท็กครบทุกคลิป
- **Branding Assets Specification**:
  - ภาพปกเพจ Facebook และภาพแบนเนอร์ YouTube ต้องใช้สัดส่วน 16:9 สไตล์ 3D Pixar คุณภาพสูง มีตัวอักษร 3D `MASTER ม.1` เด่นชัดตรงกลาง พร้อม Safe Zone รองรับการแสดงผลทั้งบนสมาร์ตโฟนและเดสก์ท็อป

### Rule 32 — Synchronized Cross-Platform Scheduling & AI Content Safety Invariant
- **Cross-Platform Scheduling Invariant**:
  - เมื่อมีการตั้งเวลาเผยแพร่วิดีโอบน YouTube (Schedule Release) ระบบต้องใช้ **Meta Graph API** (`/v21.0/{page_id}/feed`) ตั้งค่า `published=false` พร้อมส่งค่า `scheduled_publish_time` (UNIX Timestamp) เพื่อให้โพสต์บน Facebook เผยแพร่อัตโนมัติในวินาทีเดียวกันกับวิดีโอบน YouTube เสมอ
  - ทุกโพสต์ต้องแนบลิงก์คลิปวิดีโอ คำอธิบายสูตรลัด และลิงก์นำทางกลับสู่แพลตฟอร์ม [master-m1.vercel.app](https://master-m1.vercel.app)
- **Video AI Prompt Safety Filter Standard (BytePlus / Seedance 2.0 Mini)**:
  - หลีกเลี่ยงคำที่สุ่มเสี่ยงต่อระบบคัดกรองความปลอดภัย (Safety Filter) เช่น `hero student`, `anime`, `celebrity`, หรือตัวละครที่มีลิขสิทธิ์
  - ให้ใช้คำบรรยายสถานการณ์เชิงวิทยาศาสตร์และคณิตศาสตร์อย่างเป็นกลาง เช่น `glowing mathematical laboratory`, `geometric 3D right triangles`, `educational diagrams showing formulas a² + b² = c²` เพื่อให้สร้างคลิปวิดีโอ 3D ผ่านฉลุย 100%

### Rule 33 — Expert Agent Guild & Autonomous Multi-Agent Collaboration Standard
- **5 Expert Subagents Invariant**: ระบบได้รับการจัดโครงสร้าง 5 ทีมงานผู้เชี่ยวชาญระดับสูงที่พร้อมถูกเรียกใช้งานผ่าน `invoke_subagent`:
  1. `expert_studio_producer`: ผลิตเพลงสูตรลัด (Lyria 3 Pro), วิดีโอ 3D (Seedance 2.0), ซับคาราโอเกะ Hardsub (Rule 29/30) และตั้งเวลาโพสต์ YouTube/Facebook อัตโนมัติ (Rule 31/32)
  2. `expert_gifted_olympiad`: สกัดโจทย์แข่งขัน สสวท., MWIT, KVIS, สอวน. ผ่าน DeepSeek R1 / Claude Sonnet 5, ออกแบบสูตรลัด 3 วินาที และดูแลเส้นทางสู่เภสัชกรของน้องฟอร์จูน
  3. `expert_interactive_lab`: พัฒนาและขยายขีดความสามารถของ Virtual Science Lab 7 สถานี และสร้าง Interactive STEM Simulators (Math 3D Lab / Physics Lab)
  4. `expert_school_growth`: บริหาร School Portal (`/school`), รูปแบบเอกสารราชการ/ทางการมาตรฐานสากล, การนำเข้ารายชื่อ และระบบส่งรายงานผลถึงผู้ปกครองผ่าน Telegram/LINE
  5. `expert_growth_hacker`: ออกแบบ Hook 3 วินาทีแรก, Looping Video ดึง Retention > 100%, ซอย 1 เพลงยาวเป็น 3 Shorts, คัดกรอง SEO/Hashtags และกำหนดตารางเวลาโพสต์ทองคำ (Prime Time)
- **Zero Hallucination Academic Standard**: ทุกข้อสอบและเนื้อหาที่สร้างโดยทีมงาน ต้องตรงตามหลักสูตรแกนกลาง สพฐ. 2551 (ปรับปรุง 2560) และ Blueprint สทศ. 100%

### Rule 34 — Automated Short-Form Rendering & Instant Facebook Reels Publishing Standard
- **Automated 9:16 Shorts Extraction**: ทุกครั้งที่ทีมสตูดิโอ (`expert_studio_producer`) ผลิตคลิปเพลงและวิดีโอตัวเต็มเสร็จสิ้น ระบบต้องรันตัดต่อคลิปสั้นแนวตั้ง 9:16 (1080x1920) ความยาว 25–45 วินาที ด้วย FFmpeg อัตโนมัติ (`render_all_shorts_9x16.py`) โดยใส่ Dynamic Blurred Background, แถบ Hook ด้านบน, และ แถบ CTA ด้านล่าง
- **Instant Facebook Reels Auto-Publish**: ระบบต้องสั่งยิงไฟล์คลิปสั้นเข้าสู่ **Facebook Reels** ของเพจ Master ม.1 ทันทีผ่าน Meta Graph API v21.0 (`video_reels` 3-phase binary upload) โดยไม่ต้องรอให้ผู้ใช้มาอัปโหลดมือ พร้อมแนบแคปชันสูตรลัดและลิงก์เว็บไซต์ [master-m1.vercel.app](https://master-m1.vercel.app)
- **Desktop Artifact Mirroring**: วางไฟล์คลิปแนวตั้งและไฟล์ข้อความโพสต์ไว้ที่ `Desktop\คลิปสำหรับลง_YouTube\Shorts_9x16` เพื่อความสะดวกในการนำไปอัปโหลดเป็น YouTube Shorts ต่อไป

---

## 🗺️ แผนงานและฟีเจอร์ในอนาคต (Future Roadmap)
- ดูรายละเอียดฟีเจอร์ Gamification, Mock Exam, Printable PDF, Audio TTS, และระบบส่งผลให้ผู้ปกครอง ได้ที่ [ROADMAP.md](./ROADMAP.md)




