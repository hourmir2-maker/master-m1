import { NextRequest, NextResponse } from 'next/server'
import { LESSONS_DATA, PracticeQuestion } from '@/lib/lessons-data'
import { DYNAMIC_QUESTION_POOL } from '@/lib/dynamic-quiz-pool'

export async function POST(req: NextRequest) {
  try {
    const { subject, moduleId } = await req.json()
    const currentLesson = LESSONS_DATA[subject]?.[moduleId]

    if (!currentLesson) {
      return NextResponse.json({ questions: [] }, { status: 200 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    // 1. Try Gemini Direct REST API Call (Supports all Google API Key formats)
    if (apiKey && apiKey.length > 20) {
      try {
        const subjectName = subject === 'math' ? 'คณิตศาสตร์' : subject === 'science' ? 'วิทยาศาสตร์' : 'ภาษาอังกฤษ'
        const promptText = `คุณคืออาจารย์ผู้เชี่ยวชาญการออกข้อสอบเตรียมสอบเข้า ม.1 ในประเทศไทย
กรุณาแต่งชุดข้อสอบใหม่ 5 ข้อ ไม่ซ้ำของเดิม ในหัวข้อ: "${currentLesson.title}" (${subjectName})
มี 4 ตัวเลือกและเฉลยละเอียด

ส่งกลับเป็น JSON Array ล้วนๆ ห้ามมีข้อความอื่น:
[
  {
    "id": "gemini_q_1",
    "question": "คำถามภาษาไทยข้อที่ 1...",
    "options": ["ตัวเลือก A", "ตัวเลือก B", "ตัวเลือก C", "ตัวเลือก D"],
    "correctAnswer": "ตัวเลือกที่ถูกต้องตรงกับ 1 ใน options",
    "explanation": "【วิธีคิดทีละขั้นตอน】...",
    "tip": "💡 ข้อควรระวัง..."
  }
]`

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 6000) // 6s timeout

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: { responseMimeType: 'application/json' }
            }),
            signal: controller.signal
          }
        )
        clearTimeout(timeoutId)

        if (response.ok) {
          const resData = await response.json()
          const rawText = resData?.candidates?.[0]?.content?.parts?.[0]?.text
          if (rawText) {
            const parsed = JSON.parse(rawText) as PracticeQuestion[]
            if (Array.isArray(parsed) && parsed.length >= 3) {
              return NextResponse.json({
                questions: parsed,
                generatedBy: 'Gemini AI สดใหม่แบบ Realtime 🤖'
              }, { status: 200 })
            }
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini REST API fetch skipped, using dynamic question pool:', geminiErr)
      }
    }

    // 2. High-Quality Alternate Question Sets (Guarantees completely new questions)
    const poolSets = DYNAMIC_QUESTION_POOL[subject]?.[moduleId]
    if (poolSets && poolSets.length > 0) {
      // Pick random alternate set
      const selectedSet = poolSets[Math.floor(Math.random() * poolSets.length)]
      const randomizedSet = selectedSet.map(q => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5)
      })).sort(() => Math.random() - 0.5)

      return NextResponse.json({
        questions: randomizedSet,
        generatedBy: 'คลังข้อสอบชุดท้าทายใหม่ (Set B/C) 🎯'
      }, { status: 200 })
    }

    // 3. Fallback: Return shuffled base questions
    const fallbackQuestions = currentLesson.practiceQuestions.map((q, idx) => ({
      ...q,
      id: `shuffled_${idx}_${Date.now()}`,
      options: [...q.options].sort(() => Math.random() - 0.5)
    })).sort(() => Math.random() - 0.5)

    return NextResponse.json({
      questions: fallbackQuestions,
      generatedBy: 'ชุดโจทย์สุ่มอัตโนมัติ ✨'
    }, { status: 200 })

  } catch (error: unknown) {
    console.error('Quiz route error:', error)
    return NextResponse.json({ questions: [] }, { status: 200 })
  }
}
