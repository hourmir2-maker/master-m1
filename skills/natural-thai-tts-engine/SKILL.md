---
name: natural-thai-tts-engine
description: >-
  Centralized Natural AI Voice Speech Engine with Thai phonetics preprocessor.
  Implements sentence streaming (<= 120 chars) to prevent 15-second browser timeouts,
  150ms natural breath pauses, Microsoft Niwat/Premwadee voice prioritization, and converts
  complex math/science symbols and English grammar notation into authentic Thai phonetics.
---

# 🗣️ Natural Thai AI TTS Speech Engine Standard

`natural-thai-tts-engine` คือ Custom Skill สำหรับระบบสังเคราะห์เสียงพูดภาษาไทยธรรมชาติระดับสูง (Text-to-Speech) พัฒนาขึ้นเพื่อแก้ปัญหาเสียงแข็ง เสียงกระตุก และเบราว์เซอร์ตัดเสียงหลัง 15 วินาที พร้อมพจนานุกรมแปลงสัญลักษณ์ทางวิชาการให้เป็นคำอ่านไทยที่ถูกต้อง 100%

--------------------------------------------------------------------------------

## 🌟 คุณสมบัติหลัก 4 ด้าน (Core Standards - Rule 27)

### 1. ลำดับเสียงพรีเมียม (Voice Preference Hierarchy)
ระบบจะค้นหาและเลือกใช้เสียงธรรมชาติที่ดีที่สุดตามลำดับ:
1. `Microsoft Niwat Online (Natural) - Thai (Thailand)` (เสียงครูผู้ชาย นุ่มนวล ชัดเจน)
2. `Microsoft Premwadee Online (Natural) - Thai (Thailand)` (เสียงครูผู้หญิง อ่อนโยน มีจังหวะจะโคน)
3. `Google ภาษาไทย` (เสียงสำรองมาตรฐาน Android / Chrome)

### 2. แบ่งประโยคต่อเนื่อง (Sentence Streaming Architecture)
- เบราว์เซอร์ส่วนใหญ่ (Chrome, Edge, Safari) มักมีบั๊กตัดเสียงทิ้งหากข้อความพูดยาวเกิน 15 วินาที
- ระบบแบ่งข้อความเป็นท่อนย่อย (Sentence Chunking $\le 120$ ตัวอักษร) ตามจุดตัดธรรมชาติ (`\n`, `.`, `!`, `?`, เว้นวรรค)
- เว้นจังหวะลมหายใจระหว่างประโยคย่อย 150ms เพื่อให้ฟังดูเป็นธรรมชาติ ไม่รัวและไม่กระตุก

### 3. พจนานุกรมแปลงสัญลักษณ์วิชาการ (Academic Phonetics Preprocessor)
ก่อนส่งข้อความเข้า Web Speech API ระบบจะแปลงสัญลักษณ์พิเศษให้เป็นคำอ่านภาษาไทย:

| หมวดหมู่ | สัญลักษณ์ต้นฉบับ | คำอ่านที่แปลงให้อัตโนมัติ |
| :--- | :--- | :--- |
| **คณิตศาสตร์** | `ห.ร.ม.` | "หอ-รอ-มอ หรือ หารร่วมมาก" |
| **คณิตศาสตร์** | `ค.ร.น.` | "คอ-รอ-นอ หรือ คูณร่วมน้อย" |
| **คณิตศาสตร์** | $a^2, b^2, c^2$ | "เอ กำลังสอง, บี กำลังสอง, ซี กำลังสอง" |
| **วิทยาศาสตร์** | $\Delta t$ | "เดลต้า ที" |
| **วิทยาศาสตร์** | $Q = mc\Delta t$ | "คิว เท่ากับ เอ็ม ซี เดลต้า ที" |
| **วิทยาศาสตร์** | $Q = mL$ | "คิว เท่ากับ เอ็ม แอล" |
| **ไวยากรณ์อังกฤษ** | `V.1`, `V.2`, `V.3` | "กริยาช่องหนึ่ง, กริยาช่องสอง, กริยาช่องสาม" |
| **ไวยากรณ์อังกฤษ** | `V.inf`, `V.ing` | "กริยารูปเดิม, กริยาเติมไอเอ็นจี" |
| **ไวยากรณ์อังกฤษ** | `S + V` | "ประธาน บวก กริยา" |

--------------------------------------------------------------------------------

## 💻 การนำไปใช้งานใน TypeScript / React (`tts-engine.ts`)

```typescript
// Single Source of Truth
import { speakNaturalText, stopSpeech } from '@/lib/tts-engine'

// 1. เรียกใช้งานเสียงติวเตอร์บรรยาย
speakNaturalText("เมื่ออุณหภูมิเปลี่ยน ให้ใช้สูตร Q = mcΔt นะครับน้องๆ", {
  rate: 0.95,
  pitch: 1.0,
  onEnd: () => console.log("พูดจบแล้ว")
})

// 2. หยุดเสียงทันทีเมื่อเปลี่ยนหน้า
stopSpeech()
```
