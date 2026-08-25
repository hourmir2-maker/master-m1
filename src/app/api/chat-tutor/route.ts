import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { LESSONS_DATA } from '@/lib/lessons-data'

interface ChatMessage {
  id?: string
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages, subject, moduleId, lessonTitle } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 })
    }

    const currentLesson = LESSONS_DATA[subject]?.[moduleId]
    const subjectName = subject === 'math' ? 'คณิตศาสตร์' : subject === 'science' ? 'วิทยาศาสตร์' : 'ภาษาอังกฤษ'

    // Build rich context from lesson data
    let lessonContextText = `วิชา: ${subjectName}\nหัวข้อ: ${currentLesson?.title || lessonTitle || moduleId}`
    if (currentLesson?.secretFormula) {
      lessonContextText += `\nสูตรลับประจำบท (${currentLesson.secretFormula.name}): ${currentLesson.secretFormula.concept}`
      lessonContextText += `\nขั้นตอนเทคนิคคิดเร็ว:\n- ${currentLesson.secretFormula.steps.join('\n- ')}`
    }
    if (currentLesson?.summaryPoints) {
      lessonContextText += `\nจุดสรุปสำคัญ:\n- ${currentLesson.summaryPoints.join('\n- ')}`
    }

    const systemInstruction = `คุณคือ "ครูพี่ AI (MASTER ม.1 Tutor)" ติวเตอร์อัจฉริยะใจดีและเชี่ยวชาญการสอนเด็กนักเรียนชั้น ป.6 เตรียมสอบเข้า ม.1 โรงเรียนชั้นนำทั่วประเทศ

📚 คลังความรู้ของบทเรียนปัจจุบัน:
${lessonContextText}

หลักการตอบคำถามของคุณ:
1. ตอบคำถามนักเรียนอย่างตรงประเด็น เข้าใจง่าย และให้กำลังใจเสมอ (เช่น "ครูพี่ขออธิบายอย่างนี้นะครับ...", "เก่งมากที่สงสัยจุดนี้!", "จำง่ายๆ เลยครับว่า...")
2. หากนักเรียนขอให้อธิบายวิธีคิดเรื่องนี้แบบเข้าใจง่ายๆ ให้นำ "สูตรลับ/วิธีคิดเร็ว" ของบทนี้มาย่อยให้เห็นภาพชัดเจนเป็นข้อๆ 1, 2, 3
3. เสริมด้วย "⚡ เทคนิคคิดลัด / จุดที่มักโดนหลอก" เสมอ
4. หากนักเรียนขอตัวอย่างโจทย์ ให้ตั้งโจทย์ 1 ข้อพร้อมเฉลยวิธีทำทีละสเต็ป
5. ตอบกระชับ น่าอ่าน ไม่ยาวจนเกินไป เหมาะกับเด็ก ป.6/ม.1`

    // Extract the latest user question
    const userMessages = messages.filter((m: ChatMessage) => m.role === 'user')
    const lastUserQuery = userMessages.length > 0 ? userMessages[userMessages.length - 1].content : 'ช่วยอธิบายสรุปบทเรียนนี้หน่อยครับ'

    const apiKey = process.env.GEMINI_API_KEY

    // Try Gemini API
    if (apiKey && apiKey.length > 20) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-1.5-flash',
          systemInstruction
        })

        // Build valid alternating chat contents starting with 'user'
        const validContents: any[] = []
        for (const m of messages) {
          if (m.role === 'assistant' && validContents.length === 0) {
            continue // Skip initial greeting so history starts with user
          }
          validContents.push({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          })
        }

        if (validContents.length === 0 || validContents[validContents.length - 1].role !== 'user') {
          validContents.push({
            role: 'user',
            parts: [{ text: lastUserQuery }]
          })
        }

        const result = await model.generateContent({
          contents: validContents,
        })

        const replyText = result.response.text()
        if (replyText && replyText.trim().length > 0) {
          return NextResponse.json({ reply: replyText.trim() })
        }
      } catch (aiErr: any) {
        console.warn('Gemini SDK error, attempting direct REST fetch:', aiErr?.message || aiErr)

        // Try direct REST call
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemInstruction}\n\nคำถามของนักเรียน: "${lastUserQuery}"` }]
                }
              ]
            })
          })
          const data = await res.json()
          const restReply = data.candidates?.[0]?.content?.parts?.[0]?.text
          if (restReply && restReply.trim().length > 0) {
            return NextResponse.json({ reply: restReply.trim() })
          }
        } catch (restErr) {
          console.warn('Direct REST fetch failed:', restErr)
        }
      }
    }

    // High-Quality Intelligent Contextual Fallback
    if (currentLesson) {
      const formula = currentLesson.secretFormula
      const fallbackReply = `ครูพี่ยินดีอธิบายเรื่อง "${currentLesson.title}" ให้ฟังครับ! 💡✨\n\nหัวใจสำคัญของบทนี้คือ:\n👉 ${formula.concept}\n\n⚡ ขั้นตอนและเทคนิคคิดเร็ว:\n${formula.steps.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}\n\n🌟 จำง่ายๆ: เน้นฝึกสังเกตคีย์เวิร์ดของโจทย์แล้วเลือกสูตรลัดมาใช้ จะช่วยประหยัดเวลาทำข้อสอบได้เยอะมากครับ! มีข้อไหนสงสัยพิมพ์ถามครูพี่ต่อได้เลยนะคร้าบ 🎯`
      return NextResponse.json({ reply: fallbackReply })
    }

    return NextResponse.json({
      reply: `ยินดีต้อนรับครับ! สำหรับบทเรียนนี้ ให้เน้นทำความเข้าใจหัวใจสำคัญของเรื่องและฝึกทำโจทย์แบบฝึกหัดทีละข้อ หากติดขัดตรงไหนพิมพ์บอกครูพี่ได้เลยนะคร้าบ! 🎯`
    })

  } catch (error: any) {
    console.error('Chat tutor error:', error)
    return NextResponse.json({ 
      reply: 'ขออภัยครับ ระบบกำลังประมวลผล ลองพิมพ์ถามใหม่อีกครั้งนะคร้าบ 😊' 
    })
  }
}
