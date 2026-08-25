import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages, subject, moduleId, lessonTitle } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ 
        reply: 'ครูพี่ยินดีช่วยเหลือครับ! ขณะนี้ระบบเชื่อมต่อ AI กำลังปรับปรุงชั่วคราว แต่หากมีข้อสงสัยเกี่ยวกับบทเรียนนี้ สามารถลองอ่านสรุปสูตรลับและเฉลยละเอียดในแต่ละข้อได้เลยนะคร้าบ 💡✨' 
      })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const subjectName = subject === 'math' ? 'คณิตศาสตร์' : subject === 'science' ? 'วิทยาศาสตร์' : 'ภาษาอังกฤษ'

    const systemInstruction = `คุณคือ "ครูพี่ AI (MASTER ม.1 Tutor)" ติวเตอร์อัจฉริยะใจดีและเชี่ยวชาญการสอนเด็กนักเรียนชั้น ป.6 เตรียมสอบเข้า ม.1 โรงเรียนชั้นนำทั่วประเทศ

บริบทปัจจุบันของนักเรียน:
- วิชา: ${subjectName}
- หน่วยการเรียนรู้: ${lessonTitle || moduleId || 'บทเรียนทั่วไป'}

หลักการตอบคำถามของคุณ:
1. ใช้ภาษาไทยที่สุภาพ เป็นกันเอง อบอุ่น และให้กำลังใจนักเรียนเสมอ (เช่น "ครูพี่ขออธิบายอย่างนี้นะครับ...", "เก่งมากที่สงสัยจุดนี้!", "จำง่ายๆ เลยครับว่า...")
2. อธิบายแบบย่อยง่าย เห็นภาพชัดเจน ทีละขั้นตอน ไม่ใช้ศัพท์วิชาการที่ยากเกินวัยเด็ก ป.6/ม.1
3. เสริมด้วย "⚡ เทคนิคคิดลัด / วิธีจำง่ายๆ" เสมอ เมื่ออธิบายจบ
4. หากนักเรียนขอตัวอย่าง ให้ตั้งโจทย์สั้นๆ 1 ข้อพร้อมแสดงวิธีทำให้ดูทันที
5. ตอบกระชับ ไม่เยิ่นเย้อ ความยาวพอเหมาะกับการอ่านบนมือถือ`

    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        systemInstruction
      })

      // Convert chat history format for Gemini
      const chatHistory = messages.slice(0, -1).map((m: ChatMessage) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }))

      const lastMessage = messages[messages.length - 1].content

      const chat = model.startChat({
        history: chatHistory
      })

      const result = await chat.sendMessage(lastMessage)
      const reply = result.response.text() || 'ครูพี่พร้อมช่วยอธิบายเสมอครับ มีจุดไหนที่ยังสงสัยถามต่อได้เลยนะ!'

      return NextResponse.json({ reply })
    } catch (aiErr: any) {
      console.warn('Gemini SDK error, falling back to direct REST:', aiErr?.message || aiErr)

      // Fallback REST call
      try {
        const lastMessage = messages[messages.length - 1].content
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemInstruction}\n\nคำถามจากนักเรียน: ${lastMessage}` }] }]
          })
        })
        const data = await res.json()
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'ครูพี่พร้อมช่วยเสมอครับ มีจุดไหนสงสัยถามเพิ่มได้เลยนะ!'
        return NextResponse.json({ reply })
      } catch (restErr) {
        return NextResponse.json({
          reply: `ครูพี่ขอแนะนำสำหรับหัวข้อ "${lessonTitle || 'บทเรียนนี้'}": ให้นักเรียนจำหัวใจสำคัญและสูตรลัดประจำโมดูล แล้วลองทำแบบฝึกหัดทีละข้อ หากติดตรงไหนกดดูเฉลยละเอียดได้เลยนะคร้าบ สู้ๆ ครับ! 🎯🌟`
        })
      }
    }
  } catch (error: any) {
    console.error('Chat tutor error:', error)
    return NextResponse.json({ 
      reply: 'ขออภัยครับ ระบบกำลังประมวลผล ลองพิมพ์ถามใหม่อีกครั้งนะคร้าบ 😊' 
    })
  }
}
