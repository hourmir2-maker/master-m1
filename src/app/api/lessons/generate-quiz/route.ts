import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { LESSONS_DATA, PracticeQuestion } from '@/lib/lessons-data'

// Smart procedural question scrambler and variation generator
function generateProceduralVariations(questions: PracticeQuestion[]): PracticeQuestion[] {
  const names = ['ด.ช. ภูมิใจ', 'ด.ญ. มินตรา', 'กานต์', 'แพรวา', 'ธันวา', 'ปานวาด', 'ณภัทร', 'อารียา']
  const randomName = () => names[Math.floor(Math.random() * names.length)]

  return questions.map((q, idx) => {
    // Shuffle options while tracking correct answer
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5)
    
    // Replace names if applicable
    let newQuestion = q.question.replace(/สมชาย|มานะ|เจน|ทอม|ลิซ่า|ปีเตอร์|ซาร่าห์|แอน/g, randomName())
    
    return {
      ...q,
      id: `dynamic_q_${idx + 1}_${Date.now()}`,
      question: newQuestion,
      options: shuffledOptions,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      tip: q.tip
    }
  })
}

export async function POST(req: NextRequest) {
  try {
    const { subject, moduleId } = await req.json()
    const currentLesson = LESSONS_DATA[subject]?.[moduleId]

    if (!currentLesson) {
      return NextResponse.json({ 
        questions: [],
        message: 'Lesson not found' 
      }, { status: 200 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    const isApiKeyValid = apiKey && apiKey.startsWith('AIzaSy')

    // If Gemini key is valid, attempt AI generation with timeout protection
    if (isApiKeyValid) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey)
        const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const subjectName = subject === 'math' ? 'คณิตศาสตร์' : subject === 'science' ? 'วิทยาศาสตร์' : 'ภาษาอังกฤษ'

        const prompt = `คุณคืออาจารย์ผู้เชี่ยวชาญการออกข้อสอบเตรียมเข้า ม.1 ในประเทศไทย
กรุณาสร้างชุดข้อสอบใหม่ 5 ข้อ สำหรับหัวข้อ: "${currentLesson.title}" (${subjectName})
มี 4 ตัวเลือก และเฉลยละเอียด

ตอบกลับเป็น JSON Array เท่านั้น:
[
  {
    "id": "ai_q_1",
    "question": "คำถามพร้อมตัวเลขใหม่...",
    "options": ["ตัวเลือก A", "ตัวเลือก B", "ตัวเลือก C", "ตัวเลือก D"],
    "correctAnswer": "ตัวเลือกที่ถูกต้อง",
    "explanation": "【วิธีคิดละเอียด】...",
    "tip": "💡 ข้อควรระวัง..."
  }
]`

        const result = await geminiModel.generateContent(prompt)
        const text = result.response.text()
        const jsonMatch = text.match(/\[[\s\S]*\]/)

        if (jsonMatch) {
          const generatedQuestions = JSON.parse(jsonMatch[0]) as PracticeQuestion[]
          if (generatedQuestions.length >= 3) {
            return NextResponse.json({ 
              questions: generatedQuestions,
              generatedBy: 'Gemini AI Dynamic Generator 🤖'
            }, { status: 200 })
          }
        }
      } catch (aiErr) {
        console.warn('Gemini API call warning, fallback to procedural variation generator:', aiErr)
      }
    }

    // Always fallback smoothly with Status 200 OK
    const proceduralQuestions = generateProceduralVariations(currentLesson.practiceQuestions)
    return NextResponse.json({ 
      questions: proceduralQuestions,
      generatedBy: 'Smart Dynamic Quiz Engine ✨'
    }, { status: 200 })

  } catch (error: unknown) {
    console.error('Quiz route error handled gracefully:', error)
    return NextResponse.json({ 
      questions: [],
      generatedBy: 'Default Engine'
    }, { status: 200 })
  }
}
