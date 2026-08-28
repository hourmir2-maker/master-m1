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
    const subjectName = subject === 'math' ? 'คณิตศาสตร์' : subject === 'science' ? 'วิทยาศาสตร์' : subject === 'thai' ? 'ภาษาไทย' : 'ภาษาอังกฤษ'

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

    const systemInstruction = `คุณคือ "ครูพี่ AI (MASTER ม.1 Tutor)" ติวเตอร์รุ่นพี่ใจดี อารมณ์ดี และเชี่ยวชาญการสอนเด็ก ป.6 เตรียมสอบเข้า ม.1 โรงเรียนชื่อดังและห้อง Gifted ทั่วประเทศ

📚 คลังความรู้มาตรฐานหลักสูตร สพฐ. & ทฤษฎีสากล (Official Knowledge Base):
${curriculumContext}

บทเรียนปัจจุบัน:
วิชา: ${subjectName} | หน่วยการเรียนรู้: ${currentLesson?.title || lessonTitle || moduleId}

🎭 กฎจิตวิทยาการสนทนา (Playful Rapport & Socratic Pivot):
1. **คุยเล่นและเป็นกันเองได้เสมอ**: ถ้าน้องชวนคุยเล่น แซว บ่นเหนื่อย หรือเล่าเรื่องเกม/การ์ตูน/ชีวิตประจำวัน ให้รับมุกอย่างอบอุ่น อารมณ์ดี มีมุกตลกน่ารัก 1-2 ประโยค เพื่อคลายเครียด
2. **วกกลับเข้าบทเรียนอย่างแนบเนียน (The Socratic Pivot)**: หลังจากรับมุกแล้ว ให้ผูกเรื่องที่น้องคุยเข้ากับบทเรียนหรือตัวอย่างสนุกๆ ในชีวิตจริงเสมอ เช่น เชื่อมโยงพลังในเกมเข้ากับพีชคณิต/แรง หรือเชื่อมโยงเรื่องกินขนมเข้ากับเรื่องเศษส่วน/ร้อยละ
3. **คำอธิบายกระชับและจบสมบูรณ์ 100%**: เมื่ออธิบายเนื้อหา ให้ใช้ภาษาง่าย มีสูตรลัด 3 วินาที ตัวอย่างชัดเจน และจุดที่ข้อสอบชอบหลอก
4. **ให้กำลังใจและเสริม Growth Mindset**: ชมน้องเมื่อคิดถูก และให้กำลังใจเมื่อตอบผิด สร้างบรรยากาศที่เด็กกล้าถามโดยไม่กลัวผิด`

    const userPrompt = `คำถามของนักเรียน: "${lastUserQuery}"
กรุณาอธิบายเรื่องนี้ให้นักเรียนเข้าใจอย่างละเอียด เห็นภาพชัดเจน มีขั้นตอน ตัวอย่าง และจุดที่ข้อสอบชอบหลอก โดยตอบให้จบครบถ้วนสมบูรณ์ครับ`

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
                  role: 'user',
                  parts: [{ text: userPrompt }]
                }
              ],
              systemInstruction: {
                parts: [{ text: systemInstruction }]
              },
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 4096
              }
            })
          }
        )

        if (response.ok) {
          const data = await response.json()
          const candidate = data?.candidates?.[0]
          const aiReply = candidate?.content?.parts?.[0]?.text
          if (aiReply && aiReply.trim().length > 0) {
            return NextResponse.json({ reply: aiReply.trim() })
          }
        } else {
          const errData = await response.text()
          console.warn('Gemini REST API returned error status:', response.status, errData)
        }
      } catch (fetchErr: unknown) {
        console.warn('Gemini fetch error:', fetchErr)
      }
    }

    // Dynamic smart answer for common grammar questions if offline
    if (lastUserQuery.includes('Present Simple') || lastUserQuery.includes('V.1')) {
      return NextResponse.json({
        reply: `💡 Present Simple Tense (V.1) คือ ไวยากรณ์บอก "ความจริงทั่วไป" หรือ "สิ่งที่ทำเป็นประจำ" ครับ!\n\n📌 โครงสร้างสำคัญ:\n1. ประธานเอกพจน์ (คนเดียว: He, She, It, สมชาย) ➔ กริยาเติม s หรือ es เช่น "He plays football."\n2. ประธานพหูพจน์ (หลายคน: I, You, We, They) ➔ กริยาช่อง 1 รูปเดิม ไม่ต้องเติมอะไร เช่น "They play football."\n\n⚡ คีย์เวิร์ดสังเกต: always (เสมอ), usually (ปกติ), every day (ทุกวัน)\n\n📝 ตัวอย่างใน If-Clause Type 1: "If it rains (ฝนตก-จริง), I will stay home." (กริยา rain จึงเติม s ครับ!) 🎯`
      })
    }

    if (lastUserQuery.toLowerCase().includes('an') || lastUserQuery.includes('a/an') || lastUserQuery.includes('article')) {
      return NextResponse.json({
        reply: `🎯 **หลักการใช้ "an" และ "a" ฉบับพิชิตข้อสอบเข้า ม.1**\n\nทั้ง **a** และ **an** เป็นคำนำหน้านาม (Indefinite Article) แปลว่า "หนึ่งอัน / หนึ่งคน / หนึ่งตัว" ใช้กับคำนามเอกพจน์นับได้ทั่วไปครับ\n\n---\n\n### 📌 กฎทองการเลือกใช้:\n1. **ใช้ "an"** ➔ นำหน้าคำที่ขึ้นต้นด้วย **"เสียงสระ" (Vowel Sound: อะ, อา, อิ, อี, อุ, อู, เอ, โอ)**\n   • an apple (แอปเปิ้ล)\n   • an egg (ไข่ไก่)\n   • an umbrella (ร่ม — เสียง อัม)\n\n2. **ใช้ "a"** ➔ นำหน้าคำที่ขึ้นต้นด้วย **"เสียงพยัญชนะ" (Consonant Sound)**\n   • a book (หนังสือ)\n   • a cat (แมว)\n\n---\n\n### ⚠️ จุดลวงข้อสอบเข้า ม.1 ที่เด็กมักโดนหลอก 100%! (ดูที่ "เสียงอ่าน" ไม่ใช่ตัวสะกด):\n\n❌ **กับดักที่ 1 (ตัว H แต่ออกเสียงสระ):**\n• **an hour** (1 ชั่วโมง) — เพราะตัว h ไม่ออกเสียง อ่านว่า "อาว-เวอะ" (เสียง อ.) จึงต้องใช้ **an**!\n• **an honest boy** (เด็กที่ซื่อสัตย์) — อ่านว่า "ออน-นิสต์" จึงต้องใช้ **an**!\n\n❌ **กับดักที่ 2 (ตัว U/E แต่ออกเสียงพยัญชนะ ย):**\n• **a university** (มหาวิทยาลัย) — ออกเสียงว่า "ยู-นิเวอร์ซิตี้" (เสียง ย. เป็นพยัญชนะ) จึงต้องใช้ **a**!\n• **a European country** (ประเทศในยุโรป) — ออกเสียงว่า "ยู-โรเปียน" จึงใช้ **a**!\n• **a one-way ticket** (ตั๋วเที่ยวเดียว) — one ออกเสียงว่า "วัน" (เสียง ว. พยัญชนะ) จึงใช้ **a**!\n\n💡 **สรุปสูตรลัด:** ท่องจำไว้เลยว่า *"ดูที่เสียงอ่าน ถ้าขึ้นต้นด้วยเสียง อ. ให้ใช้ an เสมอ!"* 🎯✨`
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
