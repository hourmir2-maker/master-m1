/**
 * MASTER ม.1 — Natural Audio Tutor Script Engine & Phonetics
 */
import { CURRICULUM_KNOWLEDGE_BASE } from './curriculum-knowledge-base'

export interface AudioLessonSummary {
  subject: 'math' | 'science' | 'english'
  moduleId: string
  title: string
  durationEstimate: string // e.g. "1:30 นาที"
  narrationScript: string
  keyTakeaways: string[]
}

// Phonetics Preprocessor (Rule 12 Standard)
export function preprocessNaturalSpeech(text: string): string {
  let res = text
  res = res.replace(/V\.1/gi, 'กริยาช่องหนึ่ง')
  res = res.replace(/V\.2/gi, 'กริยาช่องสอง')
  res = res.replace(/V\.3/gi, 'กริยาช่องสาม')
  res = res.replace(/V\.inf/gi, 'กริยาช่องเดิมไม่ผัน')
  res = res.replace(/V\.s,es/gi, 'กริยาเติม เอส หรือ อีเอส')
  res = res.replace(/S\s*\+/gi, 'ประธาน บวก ')
  res = res.replace(/If-Clause/gi, 'อิฟ คลอส')
  res = res.replace(/ห\.ร\.ม\./gi, 'หอรอมอ')
  res = res.replace(/ค\.ร\.น\./gi, 'คอรอนอ')
  res = res.replace(/√/g, 'สแควรูท ')
  res = res.replace(/π/g, 'พาย ')
  res = res.replace(/a²/g, 'เอ กำลังสอง')
  res = res.replace(/O₂/g, 'ออกซิเจน')
  res = res.replace(/CO₂/g, 'คาร์บอนไดออกไซด์')
  res = res.replace(/Fe₂O₃/g, 'สนิมเหล็ก')
  res = res.replace(/PEMDAS/gi, 'เพมดาส')
  res = res.replace(/BODMAS/gi, 'บ็อดมาส')
  res = res.replace(/3S/gi, 'ทรีเอส')
  return res
}

export function getAudioSummaryForModule(subject: string, moduleId: string): AudioLessonSummary {
  const knowledge = CURRICULUM_KNOWLEDGE_BASE[subject]?.[moduleId]

  if (knowledge) {
    const formulas = knowledge.coreFormulasAndTheorems.slice(0, 2).join(' ')
    const hacks = knowledge.speedHacks.slice(0, 2).join(' ')
    const traps = knowledge.commonTrapAlerts.slice(0, 1).join(' ')

    const narration = `สวัสดีครับน้องๆ เตรียมสอบเข้า ม.1 ทุกคน! วันนี้ครูพี่ AI จะมาสรุปสูตรลับและจุดเน้นสำคัญของเรื่อง "${knowledge.title}" ให้ฟังกันแบบกระชับ 1 นาทีครับ... 
เริ่มจากหลักการสำคัญ: ${knowledge.academicDefinition} 
สูตรที่ต้องจำให้แม่น: ${formulas} 
และนี่คือทีเด็ด สูตรลัดคิดเร็วประจำบท: ${hacks} 
ข้อควรระวังที่ข้อสอบชอบหลอก: ${traps} 
จำจุดสำคัญเหล่านี้ไว้ให้แม่น แล้วไปลุยทำแบบฝึกหัดพิชิตคะแนนเต็มกันเลยคร้าบ!`

    const validSubject: 'math' | 'science' | 'english' = (subject === 'science' || subject === 'english') ? subject : 'math'
    return {
      subject: validSubject,
      moduleId,
      title: knowledge.title,
      durationEstimate: '1:15 นาที',
      narrationScript: narration,
      keyTakeaways: [
        knowledge.academicDefinition,
        ...knowledge.speedHacks.slice(0, 2),
        ...knowledge.commonTrapAlerts.slice(0, 1)
      ]
    }
  }

  // Fallback
  const validSubject: 'math' | 'science' | 'english' = (subject === 'science' || subject === 'english') ? subject : 'math'
  return {
    subject: validSubject,
    moduleId,
    title: 'บทเรียนมาตรฐาน ม.1',
    durationEstimate: '1:00 นาที',
    narrationScript: 'สวัสดีครับน้องๆ ครูพี่ AI ขอเป็นกำลังใจในการทบทวนบทเรียนและฝึกทำโจทย์วันนี้นะครับ หากมีข้อสงสัยตรงไหน กดโทรคุยหรือพิมพ์ถามครูพี่ได้ตลอดเวลาเลยครับ!',
    keyTakeaways: ['ทบทวนเนื้อหาอย่างสม่ำเสมอ', 'ฝึกทำโจทย์วันละอย่างน้อย 5 ข้อ']
  }
}
