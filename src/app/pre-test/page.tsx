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
import { Loader2, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const SUBJECT_CONFIG = {
  math:    { label: 'คณิตศาสตร์', emoji: '🔢', color: 'bg-blue-100 text-blue-800' },
  science: { label: 'วิทยาศาสตร์', emoji: '🔬', color: 'bg-green-100 text-green-800' },
  english: { label: 'ภาษาอังกฤษ',  emoji: '🗣️', color: 'bg-purple-100 text-purple-800' },
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
  const progress = (currentIndex / questions.length) * 100
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
      setTimeout(() => setCurrentIndex(i => i + 1), 400)
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
      if (!res.ok) throw new Error('Analysis failed')
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-lg font-bold text-gray-700">🧪 แบบทดสอบก่อนเรียน</h2>
              <p className="text-xs text-gray-400">ตอบ {answeredCount}/{questions.length} ข้อ</p>
            </div>
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          {/* Subject indicator dots */}
          <div className="flex gap-1 mt-2">
            {questions.map((q, i) => (
              <div key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 flex-1 rounded-full cursor-pointer transition-colors ${
                  answers[q.id] ? 'bg-indigo-500' :
                  i === currentIndex ? 'bg-indigo-300' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-3">
              <Badge className={subjectConfig.color}>
                {subjectConfig.emoji} {subjectConfig.label}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">{currentQ.difficulty}</Badge>
            </div>
            <CardTitle className="text-lg font-semibold leading-relaxed text-gray-800">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-6">
            {currentQ.options.map((option, i) => {
              const isSelected = answers[currentQ.id] === option
              const letter = String.fromCharCode(65 + i)
              return (
                <button key={i} onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex items-center gap-3
                    ${isSelected
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100'
                      : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 text-gray-700'}`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0
                    ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {letter}
                  </span>
                  <span className="flex-1">{option}</span>
                  {isSelected && <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />}
                </button>
              )
            })}

            {/* Navigation */}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0}>
                <ChevronLeft className="w-4 h-4 mr-1" /> ย้อนกลับ
              </Button>
              {!isLastQuestion ? (
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700" onClick={() => setCurrentIndex(i => i + 1)} disabled={!isAnswered}>
                  ถัดไป <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleSubmit}
                  disabled={submitting || answeredCount < questions.length}>
                  {submitting
                    ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> AI กำลังวิเคราะห์...</>
                    : '✅ ส่งคำตอบ → ดูแผนการเรียน'}
                </Button>
              )}
            </div>

            {isLastQuestion && answeredCount < questions.length && (
              <p className="text-center text-sm text-orange-600 bg-orange-50 p-2 rounded-lg">
                ⚠️ ยังตอบไม่ครบ ({answeredCount}/{questions.length}) — กรุณาตอบทุกข้อก่อนส่ง
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
