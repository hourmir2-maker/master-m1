---
name: expert-agent-guild
description: >-
  Autonomous 4-Expert Team Guild for MASTER M.1. Orchestrates specialized autonomous subagents
  (Studio Producer, Gifted Olympiad, Interactive Lab, School Growth) with autonomous cross-team hand-offs
  and routes heavy reasoning/creative workloads to AiPASS TH (DeepSeek R1, Claude Sonnet 5, Lyria 3 Pro, Seedance 2.0)
  for 100% token-free heavy lifting.
---

# 🏛️ Expert Agent Guild & Autonomous Multi-Agent Orchestrator

`expert-agent-guild` คือ Custom Skill สำหรับขับเคลื่อน **สมาพันธ์ 4 ทีมงานผู้เชี่ยวชาญเฉพาะทางระดับสูง (Expert Agent Guild)** ประจำโครงการ MASTER ม.1 ซึ่งผสานการทำงานแบบอัตโนมัติระหว่าง Antigravity (สถาปนิกและผู้ควบคุมระบบ) เข้ากับ **AiPASS TH (ขุมกำลังประมวลผลฟรี 10,000 เครดิต/วัน)**

--------------------------------------------------------------------------------

## 🌟 5 เสาหลักทีมงานผู้เชี่ยวชาญ (The 5 Expert Subagents)

| รหัสทีมงาน | บทบาทหน้าที่ | โมเดลหลักใน AiPASS ที่ถูกเรียกใช้ | เอกสารประจำทีม |
| :--- | :--- | :--- | :--- |
| **`expert_studio_producer`** | ผลิตสื่อ Edutainment, เพลงช่วยจำสูตรลัด 4 วิชา, วิดีโอ 3D, ซับคาราโอเกะ Hardsub (Rule 29/30), เผยแพร่ข้ามแพลตฟอร์ม YouTube & Facebook (Rule 31/32) | **Lyria 3 Pro** (เพลงเต็ม 3 นาที)<br>**Seedance 2.0 Mini** (วิดีโอ 3D)<br>**Pathumma ThaiLLM** | `.agents/expert_studio_producer/BRIEFING.md` |
| **`expert_gifted_olympiad`** | สกัดข้อสอบแข่งขัน สสวท., MWIT, KVIS, สอวน., คิดสูตรลัด 3 วินาที (3-Sec Tricks), วางเส้นทาง "ม.1 Gifted วิทย์-คณิต สู่ เภสัชกร 💊" (น้องฟอร์จูน) | **DeepSeek R1** (Reasoning CoT)<br>**Claude Sonnet 5** | `.agents/expert_gifted_olympiad/BRIEFING.md` |
| **`expert_interactive_lab`** | ดูแล Virtual Science Lab 7 สถานี, สร้างแล็บใหม่: Math 3D Lab (เรขาคณิตคลี่รูป) & Physics Lab (วงจรไฟฟ้า), คุมระบบปลดล็อกตามคะแนน (Score Gates) | **Claude Sonnet 5**<br>**Gemini 3.7 Flash** | `.agents/expert_interactive_lab/BRIEFING.md` |
| **`expert_school_growth`** | บริหาร School Portal (`/school`), รูปแบบเอกสารทางการและราชการมาตรฐานสากล, ใบรายงานผล (Report Card / PDF), ส่งผล 1-on-1 เข้า Telegram/LINE ผู้ปกครอง | **Pathumma ThaiLLM**<br>**Typhoon-2** | `.agents/expert_school_growth/BRIEFING.md` |
| **`expert_growth_hacker`** | วางกลยุทธ์ดันยอดวิวคลิปสั้น (Shorts/Reels/TikTok), Hook 3 วินาทีแรก, Looping Video ดึง Retention > 100%, ซอย 1 เพลงเป็น 3 คลิป, วางคีย์เวิร์ด SEO/แฮชแท็ก | **Claude Sonnet 5**<br>**DeepSeek V3.2** | `.agents/expert_growth_hacker/BRIEFING.md` |

--------------------------------------------------------------------------------

## 🔄 โปรโตคอลการส่งไม้อัตโนมัติ (Autonomous Cross-Team Hand-off Protocol)

เมื่อมีการสั่งงานในหัวข้อใดหัวข้อหนึ่ง หากงานนั้นเกี่ยวข้องกับทีมอื่น ให้ส่งต่อและเรียกทีมที่เกี่ยวข้องทำงานร่วมกันอัตโนมัติดังนี้:

```text
               ┌─── [1. วิเคราะห์และสกัดโจทย์] ➔ 🧪 expert_gifted_olympiad
               │         (ใช้ DeepSeek R1 บน AiPASS หาข้อสอบ & สูตรลัด 3 วิ)
               │
               ├─── [2. แต่งเพลงและสร้างสื่อ] ➔ 🎬 expert_studio_producer
ภารกิจใหม่ ───┤         (ใช้ Lyria 3 + Seedance บน AiPASS เจนเพลง + วิดีโอ)
               │
               ├─── [3. สร้างห้องแล็บจำลอง] ➔ 📐 expert_interactive_lab
               │         (สร้าง React Interactive Component สำหรับทดลองเสมือนจริง)
               │
               └─── [4. กระจายผลและรายงาน] ➔ 🏫 expert_school_growth
                         (จัดทำเอกสารทางการและส่งรายงานผลให้ผู้ปกครอง)
```

--------------------------------------------------------------------------------

## ⚡ สถาปัตยกรรมประหยัดโทเคน (Token-Free AiPASS Integration)

ทุกครั้งที่ทีมงานต้องทำงานที่ใช้การคิดหนัก (Reasoning), แต่งเนื้อหายาว (Long-form Content), หรือสร้างเพลง/วิดีโอ:
1. **ห้ามนำบริบทดิบขนาดยาวมาประมวลผลใน Antigravity โดยตรง**
2. ให้สั่งรันคำสั่งผ่านสคริปต์ Auto-Router เพื่อใช้โควตาฟรีของ AiPASS:
   ```bash
   # สำหรับงานคำนวณและพิสูจน์สูตร (DeepSeek R1):
   python skills/aipass-auto-router/scripts/aipass_router.py --task-class math_research --prompt "..."

   # สำหรับงานเขียนโค้ดและ Refactor (Claude Sonnet 5):
   python skills/aipass-auto-router/scripts/aipass_router.py --task-class code --prompt "..."

   # สำหรับงานแต่งคำกลอนภาษาไทย (Pathumma ThaiLLM):
   python skills/aipass-auto-router/scripts/aipass_router.py --task-class thai_creative --prompt "..."
   ```
3. ดึงเฉพาะผลลัพธ์สุดท้าย (Clean Answer / Artifact) กลับมาประกอบร่างใน Next.js แพลตฟอร์ม

--------------------------------------------------------------------------------

## 🎬 สกิลการทำซับคาราโอเกะวิ่งตรงจังหวะเพลง (Lyric-Synced Hardsub Video Recipe)

สูตรและขั้นตอนมาตรฐานสำหรับสร้างคลิปวิดีโอที่มีเนื้อเพลงวิ่งเปลี่ยนสีตรงกับจังหวะเพลง 100%:

### 1. ถอดเวลาคลื่นเสียงจริงด้วย AI Audio Waveform Ingestion (Rule 29)
- ส่งไฟล์เสียง `.mp3` ให้ Gemini Audio Engine (`gemini-3.6-flash`) วิเคราะห์หาเวลาเริ่ม-จบระดับมิลลิวินาที (ห้ามเดาเวลาล่วงหน้า):
  ```bash
  python scripts/studio/align_all_3_songs.py
  ```
- ผลลัพธ์ที่ได้: ไฟล์ `*_aligned.json` ที่มีโครงสร้าง `[{"line": 1, "text": "...", "start": "00:08.50", "end": "00:12.30"}]`

### 2. สร้างไฟล์ซับไตเติลคาราโอเกะ ASS v4.00+ พร้อมไฮไลต์สีทอง
- ฟอนต์ไทยมาตรฐาน Windows: `Tahoma Bold` ขนาด 34px, ขอบสีดำหนา 4px (Outline: 4)
- สีตัวอักษรปกติ: สีขาว `&H00FFFFFF&`
- **สูตรลัดและจุดลวง สทศ.**: ไฮไลต์ด้วยแท็กสีทองคำ `{\c&H002BF7FF&}...{\c&H00FFFFFF&}`

### 3. ตัดต่อและเรนเดอร์ Hardsub ฝังลงวิดีโอด้วย FFmpeg (Rule 30)
- นำคลิปวิดีโอ 3D มาวนลูปแบบไร้รอยต่อให้ยาวเท่ากับเพลง และฝังซับไตเติลถาวร:
  ```bash
  python scripts/studio/assemble_all_3_songs.py
  ```
  *(เบื้องหลังใช้: `ffmpeg -stream_loop -1 -i video.mp4 -i song.mp3 -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,ass='lyrics.ass'" -c:v libx264 -preset fast -crf 20 -c:a aac -b:a 192k -shortest output.mp4`)*

### 4. นำส่ง Desktop Hub & ตั้งเวลาเผยแพร่ข้ามแพลตฟอร์ม (Rule 31/32)
- ก๊อปปี้ไฟล์ `.mp4` พร้อม `ข้อความสำหรับโพสต์_YouTube.txt` ไปที่ `Desktop ➔ คลิปสำหรับลง_YouTube`
- สั่งยิง Meta Graph API ตั้งเวลาโพสต์ Facebook Page ให้ตรงวินาทีกับ YouTube ด้วย `python scripts/studio/schedule_all_facebook_posts.py`

### 5. ตัดต่อคลิปสั้นแนวตั้ง (Shorts & Reels 9:16) และนำขึ้น Facebook Reels อัตโนมัติ (Rule 34)
- **ตัดท่อนฮุก 30 วิ แปลงเป็น 9:16:** รันสคริปต์ตัดต่อจัดหน้าจอแนวตั้ง 1080x1920 พร้อม Dynamic Blurred Background, แถบ Hook บน และ แถบ CTA ล่าง:
  ```bash
  python scripts/studio/render_all_shorts_9x16.py
  ```
- **นำขึ้น Facebook Reels อัตโนมัติในทันที:** สั่งยิง Meta Graph API v21.0 (`video_reels` 3-phase upload) เผยแพร่ตรงสู่เพจ Master ม.1 ทันที:
  ```bash
  python scripts/studio/publish_all_facebook_reels.py
  ```
- **เตรียมไฟล์ YouTube Shorts:** ก๊อปปี้คลิปพร้อม `ข้อความสำหรับโพสต์_Shorts.txt` ไว้ที่ `Desktop ➔ คลิปสำหรับลง_YouTube ➔ Shorts_9x16`

--------------------------------------------------------------------------------

## 🛡️ กฎเหล็กที่ทุกทีมต้องปฏิบัติตาม (Non-Negotiable Invariants)
- **Rule 25 & 26**: ห้ามใช้ Mock/Placeholder Data ในรายงาน และต้องใช้ User-Scoped Storage ผูกกับ User ID เสมอ
- **Rule 29 & 30**: ห้ามเดาเวลาซับไตเติล (ใช้ Gemini Audio ดึงเวลาจริง) และใช้ฟอนต์มาตรฐาน Windows ไฮไลต์สูตรลัดสีทอง
- **Rule 31 & 32**: ควบคุมสิทธิ์บัญชีทางการ `pairote05@hotmail.com` (@dart2u / @MASTERม.1) และตั้งเวลาโพสต์ Facebook ตรงวินาทีเดียวกับ YouTube
- **Rule 33**: ยึดถือโครงสร้าง 5 Expert Subagents และคงมาตรฐานวิชาการ สพฐ. 100%
- **Rule 34 (Reels & Shorts Automation Standard)**: เมื่อทำคลิปเต็มเสร็จสิ้นทุกครั้ง ต้องตัดต่อคลิปสั้นแนวตั้ง 9:16 (30 วินาที) และยิงขึ้น Facebook Reels อัตโนมัติทันที ห้ามปล่อยให้ค้างเติ่ง
