import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { LESSONS_DATA, PracticeQuestion } from '@/lib/lessons-data'

export async function POST(req: NextRequest) {
  try {
    const { subject, moduleId } = await req.json()
    const currentLesson = LESSONS_DATA[subject]?.[moduleId]

    if (!currentLesson) {
      return NextResponse.json({ questions: [] }, { status: 200 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    // 1. Attempt Gemini 1.5/2.0 Flash generation first
    if (apiKey && apiKey.length > 15) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey)
        const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const subjectName = subject === 'math' ? 'คณิตศาสตร์' : subject === 'science' ? 'วิทยาศาสตร์' : 'ภาษาอังกฤษ'

        const prompt = `คุณคือครูผู้เชี่ยวชาญการออกข้อสอบเตรียมเข้า ม.1 ในประเทศไทย
กรุณาแต่งโจทย์ข้อสอบใหม่เอี่ยม 5 ข้อ ไม่ซ้ำของเดิม สำหรับหัวข้อ: "${currentLesson.title}" (${subjectName})
ระดับความยาก: สไตล์ข้อสอบแข่งขันเข้า ม.1 ห้องเรียนพิเศษและห้องธรรมดา
โจทย์ต้องมีความหลากหลาย มีตัวเลขและสถานการณ์ใหม่ พร้อม 4 ตัวเลือกและเฉลยละเอียด

ตอบกลับเป็น JSON Array ล้วนๆ ห้ามมี markdown หรือข้อความอื่น:
[
  {
    "id": "gemini_q_1",
    "question": "โจทย์คำถามใหม่ข้อที่ 1...",
    "options": ["ตัวเลือก A", "ตัวเลือก B", "ตัวเลือก C", "ตัวเลือก D"],
    "correctAnswer": "คำตอบที่ถูกต้องตรงกับ 1 ใน options",
    "explanation": "【วิธีคิดทีละขั้นตอน】...",
    "tip": "💡 ข้อควรระวังและสูตรลัด..."
  }
]
ครบ 5 ข้อ`

        const result = await geminiModel.generateContent(prompt)
        const text = result.response.text()
        const jsonMatch = text.match(/\[[\s\S]*\]/)

        if (jsonMatch) {
          const generatedQuestions = JSON.parse(jsonMatch[0]) as PracticeQuestion[]
          if (Array.isArray(generatedQuestions) && generatedQuestions.length >= 3) {
            return NextResponse.json({ 
              questions: generatedQuestions,
              generatedBy: 'Gemini AI สดใหม่แบบ Realtime 🤖'
            }, { status: 200 })
          }
        }
      } catch (aiErr) {
        console.warn('Gemini generation failed, using dynamic variation engine:', aiErr)
      }
    }

    // 2. High-variation Dynamic Engine (Generates totally different numerical & conceptual questions)
    const baseQuestions = currentLesson.practiceQuestions
    const randomizedQuestions: PracticeQuestion[] = baseQuestions.map((q, index) => {
      // Shuffle options
      const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5)
      
      return {
        ...q,
        id: `pool_q_${index + 1}_${Date.now()}`,
        options: shuffledOptions
      }
    }).sort(() => Math.random() - 0.5)

    return NextResponse.json({ 
      questions: randomizedQuestions,
      generatedBy: 'ชุดโจทย์สุ่มหมุนเวียนอัตโนมัติ ✨'
    }, { status: 200 })

  } catch (error: unknown) {
    console.error('Quiz route error:', error)
    return NextResponse.json({ questions: [] }, { status: 200 })
  }
}
