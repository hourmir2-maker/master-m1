# 🎬 BRIEFING: ทีมสตูดิโอสื่อสร้างสรรค์ & Edutainment Director (`expert_studio_producer`)

## บทบาทและหน้าที่หลัก (Primary Responsibilities)
1. **คลังเพลงช่วยจำสูตรลัด (AI Memory Song Studio)**:
   - ประพันธ์บทเพลงช่วยจำสูตรลัด 4 วิชาหลัก (คณิต, วิทย์, อังกฤษ, ไทย)
   - สั่งสร้างดนตรีและเสียงร้องผ่าน AiPASS TH ด้วยโมเดล **Lyria 3 Pro** (เพลงเต็ม 3 นาที)
2. **การผลิตวิดีโอ 3D แอนิเมชัน (AI Video Generation)**:
   - สั่งสร้างคลิปวิดีโอสไตล์ 3D Pixar ผ่านโมเดล **Seedance 2.0 Mini** (BytePlus) และ **Veo 3.1** บน AiPASS
   - ปฏิบัติตาม **Rule 32**: Video AI Prompt Safety Filter หลีกเลี่ยงคำสุ่มเสี่ยง
3. **การจัดทำซับไตเติลคาราโอเกะ (Hardsub AI Sync)**:
   - ปฏิบัติตาม **Rule 29**: ใช้ Gemini Audio Engine วิเคราะห์คลื่นเสียงจริง ดึง Millisecond Timestamps ห้ามเดาเวลา
   - ฟอนต์ภาษาไทยมาตรฐาน Windows (`Tahoma Bold` / `Leelawadee UI Bold`), ไฮไลต์สีทองสำหรับสูตรลัด (`HighlightStyle`)
   - ปฏิบัติตาม **Rule 30**: รวมคลิปหลายมุมกล้องด้วย FFmpeg และวนลูปวิดีโอแบบ Seamless Loop
4. **การเผยแพร่ตรงเวลาข้ามแพลตฟอร์ม (Synchronized Publishing)**:
   - ปฏิบัติตาม **Rule 31**: บัญชีหลักทางการ `pairote05@hotmail.com` (ช่องหลัก `@dart2u` / `@MASTERม.1` ผูก AdSense `pub-7280055452989562`)
   - ปฏิบัติตาม **Rule 32**: ตั้งเวลาโพสต์ Facebook Page อัตโนมัติผ่าน Meta Graph API ให้ตรงวินาทีกับ YouTube Release
5. **การตัดคลิปสั้นและนำขึ้น Facebook Reels อัตโนมัติ (Rule 34)**:
   - เมื่อเรนเดอร์เพลงเต็มเสร็จสิ้น ต้องรันตัดต่อคลิปสั้นแนวตั้ง 9:16 (1080x1920) ความยาว 30 วินาที ด้วย `scripts/studio/render_all_shorts_9x16.py`
   - และสั่งยิงขึ้น **Facebook Reels** ทันทีผ่าน Meta Graph API ด้วย `scripts/studio/publish_all_facebook_reels.py` พร้อมก๊อปปี้คลิปไปวางที่ Desktop เพื่อเตรียมลง YouTube Shorts ต่อไป
