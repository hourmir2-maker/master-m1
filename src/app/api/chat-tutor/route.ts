import { NextRequest, NextResponse } from 'next/server'
import { LESSONS_DATA } from '@/lib/lessons-data'
import { searchCurriculumKnowledge } from '@/lib/curriculum-knowledge-base'

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

    // Extract the latest user question
    const userMessages = messages.filter((m: ChatMessage) => m.role === 'user')
    const lastUserQuery = userMessages.length > 0 ? userMessages[userMessages.length - 1].content.trim() : 'ช่วยอธิบายสรุปบทเรียนนี้หน่อยครับ'

    // Retrieve official Thai curriculum & exam knowledge base
    const curriculumContext = searchCurriculumKnowledge(lastUserQuery, subject, moduleId)

    // Build chat history context (last 3 interactions)
    const recentHistory = messages
      .slice(-5)
      .map((m: ChatMessage) => `${m.role === 'user' ? 'นักเรียน' : 'ครูพี่ AI'}: ${m.content}`)
      .join('\n')

    // Build rich context from lesson data
    let lessonContextText = `วิชา: ${subjectName}\nหน่วยการเรียนรู้: ${currentLesson?.title || lessonTitle || moduleId}`
    if (currentLesson?.secretFormula) {
      lessonContextText += `\nสูตรลับประจำบท (${currentLesson.secretFormula.name}): ${currentLesson.secretFormula.concept}`
      lessonContextText += `\nเทคนิคคิดเร็ว:\n- ${currentLesson.secretFormula.steps.join('\n- ')}`
    }
    if (currentLesson?.summaryPoints) {
      lessonContextText += `\nจุดสรุปสำคัญ:\n- ${currentLesson.summaryPoints.join('\n- ')}`
    }

    const systemPrompt = `คุณคือ "ครูพี่ AI (MASTER ม.1 Tutor)" ติวเตอร์ผู้เชี่ยวชาญการสอนเด็กนักเรียน ป.6 เตรียมสอบเข้า ม.1 โรงเรียนชื่อดังทั่วประเทศ

📚 คลังความรู้มาตรฐานหลักสูตร สพฐ. & ทฤษฎีสากล (Official Knowledge Base):
${curriculumContext}

บทเรียนปัจจุบัน:
${lessonContextText}

ประวัติการสนทนาล่าสุด:
${recentHistory}

คำถามล่าสุดของนักเรียน: "${lastUserQuery}"

คำสั่งสำคัญสำหรับการตอบ (Strict Grounding):
1. ตอบคำถามที่นักเรียนถามล่าสุด ("${lastUserQuery}") ให้ตรงประเด็นและเจาะลึก โดยอ้างอิงจากหลักสูตรและทฤษฎีในคลังความรู้ข้างต้น 100%
2. อธิบายแบบย่อยง่าย สำหรับเด็ก ป.6 ทีละสเต็ป พร้อมยกตัวอย่างประโยค/โจทย์ 1-2 ข้อให้เห็นภาพชัดเจน
3. หากเป็นภาษาอังกฤษ: แปลคำย่อ (เช่น V.1 = กริยาช่อง 1, S = ประธาน) และอธิบายกฎจำง่ายๆ
4. เสริมด้วยเทคนิคคิดเร็ว หรือจุดลวงที่ข้อสอบคัดเลือกชอบหลอกเสมอ
5. ปิดท้ายด้วยคำพูดให้กำลังใจอบอุ่น 1 บรรทัด`

    const apiKey = process.env.GEMINI_API_KEY

    if (apiKey && apiKey.length > 10) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: systemPrompt }]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000
              }
            })
          }
        )

        if (response.ok) {
          const data = await response.json()
          const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text
          if (aiReply && aiReply.trim().length > 0) {
            return NextResponse.json({ reply: aiReply.trim() })
          }
        } else {
          const errData = await response.text()
          console.warn('Gemini REST API returned error status:', response.status, errData)
        }
      } catch (fetchErr: any) {
        console.warn('Gemini fetch error:', fetchErr?.message || fetchErr)
      }
    }

    // Dynamic smart answer for common grammar questions if offline
    if (lastUserQuery.includes('Present Simple') || lastUserQuery.includes('V.1')) {
      return NextResponse.json({
        reply: `💡 Present Simple Tense (V.1) คือ ไวยากรณ์บอก "ความจริงทั่วไป" หรือ "สิ่งที่ทำเป็นประจำ" ครับ!\n\n📌 โครงสร้างสำคัญ:\n1. ประธานเอกพจน์ (คนเดียว: He, She, It, สมชาย) ➔ กริยาเติม s หรือ es เช่น "He plays football."\n2. ประธานพหูพจน์ (หลายคน: I, You, We, They) ➔ กริยาช่อง 1 รูปเดิม ไม่ต้องเติมอะไร เช่น "They play football."\n\n⚡ คีย์เวิร์ดสังเกต: always (เสมอ), usually (ปกติ), every day (ทุกวัน)\n\n📝 ตัวอย่างใน If-Clause Type 1: "If it rains (ฝนตก-จริง), I will stay home." (กริยา rain จึงเติม s ครับ!) 🎯`
      })
    }

    // Fallback response
    if (currentLesson) {
      const formula = currentLesson.secretFormula
      return NextResponse.json({
        reply: `สำหรับคำถาม "${lastUserQuery}" ในหัวข้อ "${currentLesson.title}" ครับ:\n\n👉 หัวใจสำคัญ: ${formula.concept}\n\n⚡ ขั้นตอนจำง่าย:\n${formula.steps.slice(0, 3).map((s, idx) => `${idx + 1}. ${s}`).join('\n')}\n\n💡 มีจุดไหนที่อยากให้ครูพี่ยกตัวอย่างเพิ่มเป็นพิเศษ พิมพ์ถามต่อได้เลยนะคร้าบ! 🎯`
      })
    }

    return NextResponse.json({
      reply: `ครูพี่ยินดีอธิบายเรื่อง "${lastUserQuery}" ครับ! หัวใจสำคัญคือการทำความเข้าใจความหมายและนำไปใช้กับโจทย์จริง มีข้อสงสัยจุดไหนถามต่อได้เลยนะคร้าบ! 🎯`
    })

  } catch (error: any) {
    console.error('Chat tutor error:', error)
    return NextResponse.json({ 
      reply: 'ขออภัยครับ ระบบกำลังประมวลผล ลองพิมพ์ถามใหม่อีกครั้งนะคร้าบ 😊' 
    })
  }
}
