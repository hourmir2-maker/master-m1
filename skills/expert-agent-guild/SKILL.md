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

## 🌟 4 เสาหลักทีมงานผู้เชี่ยวชาญ (The 4 Expert Subagents)

| รหัสทีมงาน | บทบาทหน้าที่ | โมเดลหลักใน AiPASS ที่ถูกเรียกใช้ | เอกสารประจำทีม |
| :--- | :--- | :--- | :--- |
| **`expert_studio_producer`** | ผลิตสื่อ Edutainment, เพลงช่วยจำสูตรลัด 4 วิชา, วิดีโอ 3D, ซับคาราโอเกะ Hardsub (Rule 29/30), เผยแพร่ข้ามแพลตฟอร์ม YouTube & Facebook (Rule 31/32) | **Lyria 3 Pro** (เพลงเต็ม 3 นาที)<br>**Seedance 2.0 Mini** (วิดีโอ 3D)<br>**Pathumma ThaiLLM** | `.agents/expert_studio_producer/BRIEFING.md` |
| **`expert_gifted_olympiad`** | สกัดข้อสอบแข่งขัน สสวท., MWIT, KVIS, สอวน., คิดสูตรลัด 3 วินาที (3-Sec Tricks), วางเส้นทาง "ม.1 Gifted วิทย์-คณิต สู่ เภสัชกร 💊" (น้องฟอร์จูน) | **DeepSeek R1** (Reasoning CoT)<br>**Claude Sonnet 5** | `.agents/expert_gifted_olympiad/BRIEFING.md` |
| **`expert_interactive_lab`** | ดูแล Virtual Science Lab 7 สถานี, สร้างแล็บใหม่: Math 3D Lab (เรขาคณิตคลี่รูป) & Physics Lab (วงจรไฟฟ้า), คุมระบบปลดล็อกตามคะแนน (Score Gates) | **Claude Sonnet 5**<br>**Gemini 3.7 Flash** | `.agents/expert_interactive_lab/BRIEFING.md` |
| **`expert_school_growth`** | บริหาร School Portal (`/school`), รูปแบบเอกสารทางการและราชการมาตรฐานสากล, ใบรายงานผล (Report Card / PDF), ส่งผล 1-on-1 เข้า Telegram/LINE ผู้ปกครอง | **Pathumma ThaiLLM**<br>**Typhoon-2** | `.agents/expert_school_growth/BRIEFING.md` |

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

## 🛡️ กฎเหล็กที่ทุกทีมต้องปฏิบัติตาม (Non-Negotiable Invariants)
- **Rule 25 & 26**: ห้ามใช้ Mock/Placeholder Data ในรายงาน และต้องใช้ User-Scoped Storage ผูกกับ User ID เสมอ
- **Rule 29 & 30**: ห้ามเดาเวลาซับไตเติล (ใช้ Gemini Audio ดึงเวลาจริง) และใช้ฟอนต์มาตรฐาน Windows ไฮไลต์สูตรลัดสีทอง
- **Rule 31 & 32**: ควบคุมสิทธิ์บัญชีทางการ `pairote05@hotmail.com` (@dart2u / @MASTERม.1) และตั้งเวลาโพสต์ Facebook ตรงวินาทีเดียวกับ YouTube
- **Rule 33**: ยึดถือโครงสร้าง 4 Expert Subagents และคงมาตรฐานวิชาการ สพฐ. 100%
