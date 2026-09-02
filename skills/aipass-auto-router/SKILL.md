---
name: aipass-auto-router
description: >-
  Custom skill for routing prompts to AiPASS TH models via Chrome DevTools Protocol (CDP).
  Includes Task-Class Routing (Code, Math/Research, Thai Creative, General), 15-minute Auto-Failover on rate limits,
  Windows CDP session isolation, React input automation, and seamless extraction of answers back into Antigravity context or local Second Brain markdown files.
---

# AiPASS Auto-Router & Auto-Failover Engine (CDP Browser Bridge)

`aipass-auto-router` คือ Custom Skill อัจฉริยะที่เชื่อมต่อ Antigravity เข้ากับเบราว์เซอร์ (Brave / Chrome) ผ่าน **Chrome DevTools Protocol (CDP)** เพื่อใช้งานโมเดล AI บนหน้าเว็บ AiPASS TH (`https://aipass.go.th/` / `de.aipass.net`) ได้โดยตรงแบบอัตโนมัติ 100% แม้ AiPASS จะไม่มี Public API ก็ตาม

--------------------------------------------------------------------------------

## 🚀 คุณสมบัติหลัก 3 ด้าน (Core Features)

### 1. Task-Class Routing (จำแนกงานและเลือกโมเดลอัตโนมัติ)
ระบบจะวิเคราะห์ประเภทของ Prompt และจับคู่กับลำดับโมเดลที่เหมาะสมที่สุดให้อัตโนมัติ:

| หมวดหมู่งาน (Task Class) | ลักษณะงาน / คีย์เวิร์ด | ลำดับโมเดลหลัก ➔ สำรอง |
| :--- | :--- | :--- |
| **`code`** | เขียนโค้ด, แก้วิภาษ, Refactor, SQL, HTML/CSS/JS | **Claude Sonnet 5** ➔ DeepSeek V3.2 ➔ Gemini 3.7 Flash |
| **`math_research`** | คำนวณ, วิเคราะห์การเงิน/หุ้น/BTC, วิจัยลึก, พิสูจน์สูตร | **DeepSeek R1** ➔ Claude Sonnet 5 ➔ Sonar Reasoning Pro |
| **`thai_creative`** | แต่งข้อความไทย, เรียงความ, ร่างจดหมายราชการ, ถอดความ | **Pathumma ThaiLLM** ➔ Typhoon-2 ➔ Claude Sonnet 5 |
| **`music`** | สร้างเพลง, แต่งทำนอง, เพลงจำสูตร, เนื้อร้องภาษาไทย | **Lyria 3 Pro** (สูงสุด 3 นาที มีเนื้อร้อง) ➔ Lyria 3 Clip (30 วิ) |
| **`video`** | สร้างวิดีโอ 3D, แอนิเมชัน, ประกอบการสอน, 16:9 480p/720p | **Seedance 2.0 Mini** (BytePlus) ➔ Veo 3.1 Fast (Google) |
| **`general_fast`** | ถามตอบทั่วไป, ค้นหาข้อมูลเร็วๆ | **Gemini 3.1 Flash Lite** ➔ Gemini 3.7 Flash ➔ DeepSeek V3.2 |

---

### 2. Multi-Modal CDP Model Selection Navigation:
- **สร้างเพลง**: เปิด Model Selector Modal ➔ คลิกแท็บ `"สร้างเพลง"` ➔ คลิก `"เลือก"` บนการ์ด `Lyria 3 Pro` ➔ คลิกปุ่ม `"ยืนยัน"`
- **สร้างวิดีโอ**: เปิด Model Selector Modal ➔ คลิกแท็บ `"สร้างวิดีโอ"` ➔ คลิก `"เลือก"` บนการ์ด `Seedance 2.0 Mini` ➔ คลิกปุ่ม `"ยืนยัน"`
- **เสียงและซับไตเติล (Audio Precision Alignment)**: เมื่อสร้างวิดีโอและเพลง ให้ใช้ `gemini-3.6-flash` ฟังคลื่นเสียงจริงและดึง Millisecond Timestamps ก่อนทำ Hardsub ด้วย FFmpeg เสมอ ห้ามเดาเวลาล่วงหน้า

---

### 3. Auto-Failover System (สลับโมเดลสำรองอัตโนมัติเมื่อติดโควต้า)
- เมื่อโมเดลใดขึ้นการแจ้งเตือนติด Rate Limit หรือโควตารายวันเต็ม (Quota Exceeded) ระบบจะ **พักโมเดลนั้นไว้อัตโนมัติ 15 นาที** (บันทึกไว้ใน `failover_state.json`)
- ระบบจะสลับไปยิงคำถามซ้ำกับโมเดลสำรองลำดับถัดไปใน Priority Chain ทันทีโดยที่ผู้ใช้ไม่ต้องกดเปลี่ยนเอง

---

### 3. Local Processing & Second Brain Artifact Export
- ดึงคำตอบกลับมาประมวลผลต่อใน Antigravity context
- สามารถสั่งบันทึกผลลัพธ์ลงโฟลเดอร์ Artifacts หรือ Second Brain ได้ทันทีผ่านพารามิเตอร์ `--output`

--------------------------------------------------------------------------------

## 🧠 บทเรียนและเทคนิคทางเทคนิคที่เรียนรู้แล้ว (Learned Technical Invariants)

### 1. การจัดการ CDP Port 9222 บน Windows
- **การใช้ `--user-data-dir`**: บน Windows หากมี Chrome เปิดใช้อยู่แล้ว การสั่งเปิด `--remote-debugging-port=9222` จะถูกปฏิเสธ จำเป็นต้องใส่พารามิเตอร์ `--user-data-dir="C:\Users\bkky9\.aipass_browser_data"` เพื่อเปิดเป็นโปรไฟล์แยกต่างหากถึงจะเปิดพอร์ต 9222 ได้สำเร็จ 100%
- **OneDrive Desktop**: โฟลเดอร์ Desktop หลักบนเครื่องที่เปิด OneDrive Sync จะอยู่ที่ `[Environment]::GetFolderPath('Desktop')` (`C:\Users\bkky9\OneDrive\Desktop`)

### 2. การควบคุม React / Next.js Controlled Textarea
- **การพิมพ์ข้อความ**: การใช้ `.fill(prompt)` DOM ตรงๆ จะไม่ส่งสัญญาณ React `onChange` ทำให้ปุ่ม Send ถูก Disabled ค้างอยู่ ต้องใช้ `page.keyboard.insert_text(prompt)` เพื่อให้ React Synthetic Event อัปเดต State ภายใน
- **การกดส่งข้อความ**: ใช้ JavaScript Evaluation สั่ง `sendBtn.click()` โดยตรงผ่าน `page.evaluate()` เพื่อป้องกันการถูก Intercept โดย UI Overlay Element
- **การยืนยัน Modal**: เมื่อเปลี่ยนโมเดลบน AiPASS TH ต้องคลิกเลือกโมเดล และตามด้วยการคลิกปุ่ม **"ยืนยัน" (Confirm)** ใน Modal เสมอ ก่อนส่ง `Escape` ปิด Overlay

--------------------------------------------------------------------------------

## 🛠️ วิธีการเปิดใช้งานเบราว์เซอร์ Remote Debugging Mode (CDP)

ก่อนเริ่มใช้งาน ให้เปิดเบราว์เซอร์ด้วยพารามิเตอร์ `--remote-debugging-port=9222` ดังนี้:

### กรณีใช้งานผ่าน Shortcut บน Desktop:
ดับเบิลคลิกไอคอน **`AiPASS Browser`** ที่อยู่บนหน้าจอ Desktop (`C:\Users\bkky9\OneDrive\Desktop\AiPASS Browser.lnk`)

### กรณีใช้งานผ่าน PowerShell:
```powershell
Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList "--remote-debugging-port=9222","--user-data-dir=C:\Users\bkky9\.aipass_browser_data","https://aipass.go.th/"
```

--------------------------------------------------------------------------------

## 💻 การเรียกใช้งานสคริปต์ Router จาก Command Line

### 1. วิเคราะห์งานและเลือกโมเดลให้อัตโนมัติ (Auto-Routing)
```bash
python C:\Users\bkky9\.gemini\config\skills\aipass-auto-router\scripts\aipass_router.py --prompt "วิเคราะห์ราคา Bitcoin 4 มิติ พร้อมแนวโน้มสัปดาห์หน้า"
```

### 2. ระบุ Task Class หรือบังคับเลือกโมเดลเฉพาะเจาะจง
```bash
# บังคับหมวดหมู่งานเขียนโค้ด (ใช้ Claude Sonnet 5)
python C:\Users\bkky9\.gemini\config\skills\aipass-auto-router\scripts\aipass_router.py --task-class code --prompt "เขียน Python script สำหรับรวมไฟล์ PDF 10 ไฟล์"

# บังคับเลือกโมเดลเฉพาะ (เช่น DeepSeek R1)
python C:\Users\bkky9\.gemini\config\skills\aipass-auto-router\scripts\aipass_router.py --model "DeepSeek R1" --prompt "พิสูจน์สมการ Euler-Lagrange"
```

### 3. เซฟผลลัพธ์ลงไฟล์ใน Second Brain / Artifacts
```bash
python C:\Users\bkky9\.gemini\config\skills\aipass-auto-router\scripts\aipass_router.py --prompt "แต่งบทความเกี่ยวกับเทคโนโลยี AI" --output "C:\Users\bkky9\bitcoin_analysis.md"
```

--------------------------------------------------------------------------------

## 📁 โครงสร้างไฟล์ใน Custom Skill

- `SKILL.md`: คู่มือการใช้งานและหลักการทำงานของ Skill (บทเรียนที่บันทึกไว้)
- `scripts/aipass_router.py`: เครื่องมือหลักสำหรับเชื่อมต่อ CDP, Route งาน, สลับโมเดล และดึงข้อความกลับ
- `scripts/launch_browser_cdp.py`: สคริปต์ช่วยตรวจสอบและเปิด Brave/Chrome ในโหมด CDP port 9222
- `scripts/failover_state.json`: ไฟล์เก็บสถานะ Rate-Limit และ Cooldown ของแต่ละโมเดล
- `scripts/aipass_logo.ico`: ไฟล์ไอคอนโลโก้ทางการของ AiPASS TH
