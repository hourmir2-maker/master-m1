import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { LESSONS_DATA, PracticeQuestion } from '@/lib/lessons-data'

export async function POST(req: NextRequest) {
  try {
    const { subject, moduleId } = await req.json()
    const currentLesson = LESSONS_DATA[subject]?.[moduleId]

    if (!currentLesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey || apiKey.length < 10) {
      // Fallback: Return original questions with shuffled options
      return NextResponse.json({ 
        questions: currentLesson.practiceQuestions,
        generatedBy: 'Curated Standard Bank' 
      })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const subjectName = subject === 'math' ? 'คณิตศาสตร์' : subject === 'science' ? 'วิทยาศาสตร์' : 'ภาษาอังกฤษ'

    const prompt = `คุณคืออาจารย์ผู้เชี่ยวชาญการออกข้อสอบเตรียมเข้า ม.1 (ห้องเรียนพิเศษ Gifted และห้องปกติ) ในประเทศไทย
กรุณาสร้าง "ชุดข้อสอบใหม่เอี่ยม 5 ข้อ" สำหรับหัวข้อ: "${currentLesson.title}" (${subjectName})
โดยมีระดับความยากและสไตล์ข้อสอบแข่งขันเข้า ม.1 จริง พร้อมตัวเลือก 4 ตัวเลือก และ "เฉลยละเอียดแบบ Step-by-Step พร้อมบอกจุดที่เด็กชอบโดนหลอก"

ตอบกลับเป็น JSON Array รูปแบบนี้เท่านั้น (ไม่มีข้อความอื่น):
[
  {
    "id": "ai_q_1",
    "question": "โจทย์คำถามภาษาไทยที่ชัดเจนพร้อมตัวเลขใหม่...",
    "options": ["ตัวเลือก A", "ตัวเลือก B", "ตัวเลือก C", "ตัวเลือก D"],
    "correctAnswer": "ตัวเลือกที่ถูกต้องตรงกับ 1 ใน options",
    "explanation": "【วิธีคิดละเอียด】...",
    "tip": "💡 ข้อควรระวังหรือสูตรลัด..."
  }
]
จำนวน 5 ข้อ ตอบเฉพาะ JSON เท่านั้น`

    const result = await geminiModel.generateContent(prompt)
    const text = result.response.text()
    const jsonMatch = text.match(/\[[\s\S]*\]/)

    if (jsonMatch) {
      const generatedQuestions = JSON.parse(jsonMatch[0]) as PracticeQuestion[]
      return NextResponse.json({ 
        questions: generatedQuestions,
        generatedBy: 'Gemini AI Dynamic Generator'
      })
    } else {
      return NextResponse.json({ 
        questions: currentLesson.practiceQuestions,
        generatedBy: 'Curated Standard Bank'
      })
    }
  } catch (error) {
    console.warn('AI Quiz generation failed, fallback to standard bank:', error)
    return NextResponse.json({ 
      error: 'Failed to generate dynamic quiz, using default questions' 
    }, { status: 500 })
  }
}
