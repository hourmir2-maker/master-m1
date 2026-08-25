'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { PRE_TEST_QUESTIONS } from '@/lib/pretest-questions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const SUBJECT_CONFIG = {
  math:    { label: 'คณิตศาสตร์', emoji: '🔢', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  science: { label: 'วิทยาศาสตร์', emoji: '🔬', color: 'bg-red-100 text-red-800 border-red-200' },
  english: { label: 'ภาษาอังกฤษ',  emoji: '🗣️', color: 'bg-amber-100 text-amber-900 border-amber-200' },
}

export default function PreTestPage() {
  const router = useRouter()
  const supabase = createClient()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const questions = PRE_TEST_QUESTIONS
  const currentQ = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const answeredCount = Object.keys(answers).length

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else setUserId(data.user.id)
    })
  }, [])

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: answer }))
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(i => i + 1), 350)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const subjects = ['math', 'science', 'english'] as const
      const results: Record<string, { score: number; total: number; answers: Record<string, string>; weakTopics: string[]; strongTopics: string[] }> = {}

      for (const subject of subjects) {
        const subjectQs = questions.filter(q => q.subject === subject)
        const correct = subjectQs.filter(q => answers[q.id] === q.correctAnswer)
        const wrong   = subjectQs.filter(q => answers[q.id] !== q.correctAnswer)
        results[subject] = {
          score: correct.length,
          total: subjectQs.length,
          answers,
          weakTopics:   [...new Set(wrong.map(q => q.topic))],
          strongTopics: [...new Set(correct.map(q => q.topic))],
        }
      }

      const res = await fetch('/api/pre-test/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, results }),
      })
      if (!res.ok) throw new Error('AI Analysis failed')
      router.push('/learning-path')
    } catch (err) {
      console.error(err)
      setSubmitting(false)
    }
  }

  if (!currentQ) return null
  const subjectConfig = SUBJECT_CONFIG[currentQ.subject]
  const isLastQuestion = currentIndex === questions.length - 1
  const isAnswered = !!answers[currentQ.id]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="mb-5 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-orange-100 shadow-sm">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧪</span>
              <div>
                <h2 className="text-base font-extrabold text-slate-800">แบบทดสอบก่อนเรียน (Pre-Test)</h2>
                <p className="text-xs text-orange-900/60 font-medium">ตอบแล้ว {answeredCount} จาก {questions.length} ข้อ</p>
              </div>
            </div>
            <span className="text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 rounded-full shadow-sm">
              ข้อที่ {currentIndex + 1} / {questions.length}
            </span>
          </div>
          
          <Progress value={progress} className="h-2.5 bg-orange-100 [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-red-600" />
          
          {/* Quick Nav dots */}
          <div className="flex gap-1 mt-3 overflow-x-auto pb-1">
            {questions.map((q, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 flex-1 min-w-[12px] rounded-full transition-all ${
                  answers[q.id] 
                    ? 'bg-orange-500' 
                    : i === currentIndex 
                    ? 'bg-red-400 ring-2 ring-orange-300' 
                    : 'bg-orange-200/60'
                }`}
                title={`ข้อที่ ${i+1}`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-xl border-orange-100 bg-white/95 backdrop-blur-md overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 w-full" />
          <CardHeader className="pb-3 pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Badge className={`${subjectConfig.color} border font-bold text-xs`}>
                {subjectConfig.emoji} {subjectConfig.label}
              </Badge>
              <Badge variant="outline" className="text-xs border-orange-200 text-orange-700 bg-orange-50/50 capitalize font-medium">
                ระดับ: {currentQ.difficulty === 'basic' ? 'พื้นฐาน' : currentQ.difficulty === 'intermediate' ? 'ปานกลาง' : 'ท้าทาย'}
              </Badge>
            </div>
            <CardTitle className="text-lg md:text-xl font-bold leading-relaxed text-slate-800">
              {currentQ.question}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 pb-6">
            {currentQ.options.map((option, i) => {
              const isSelected = answers[currentQ.id] === option
              const letter = String.fromCharCode(65 + i)
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex items-center gap-3.5
                    ${isSelected
                      ? 'border-orange-500 bg-orange-50/90 text-orange-950 shadow-md shadow-orange-500/10'
                      : 'border-orange-100 bg-white hover:border-orange-300 hover:bg-orange-50/40 text-slate-700'}`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0
                    ${isSelected ? 'bg-gradient-to-tr from-orange-500 to-red-500 text-white shadow-sm' : 'bg-orange-100/70 text-orange-800'}`}>
                    {letter}
                  </span>
                  <span className="flex-1 text-sm md:text-base font-semibold">{option}</span>
                  {isSelected && <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />}
                </button>
              )
            })}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-3">
              <Button 
                variant="outline" 
                className="flex-1 border-orange-200 text-orange-800 hover:bg-orange-50" 
                onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} 
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> ข้อก่อนหน้า
              </Button>

              {!isLastQuestion ? (
                <Button 
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold" 
                  onClick={() => setCurrentIndex(i => i + 1)} 
                  disabled={!isAnswered}
                >
                  ข้อถัดไป <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button 
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-lg shadow-green-600/20" 
                  onClick={handleSubmit}
                  disabled={submitting || answeredCount < questions.length}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gemini กำลังวิเคราะห์ผล...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-1" /> ส่งคำตอบ → ให้ AI สร้างแผนการเรียน
                    </>
                  )}
                </Button>
              )}
            </div>

            {isLastQuestion && answeredCount < questions.length && (
              <p className="text-center text-xs text-orange-800 bg-orange-100/70 p-2.5 rounded-xl border border-orange-200 font-semibold mt-2">
                ⚠️ คุณยังตอบไม่ครบ ({answeredCount}/{questions.length} ข้อ) — กรุณาย้อนกลับไปตอบข้อที่เว้นไว้ให้ครบก่อนส่ง
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
