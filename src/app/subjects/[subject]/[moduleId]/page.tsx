'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LESSONS_DATA, LessonData } from '@/lib/lessons-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Trophy, 
  ChevronRight, 
  Sparkles,
  HelpCircle,
  RotateCcw
} from 'lucide-react'

const SUBJECT_CONFIG: Record<string, { label: string; gradient: string; text: string; bg: string }> = {
  math:    { label: 'คณิตศาสตร์', gradient: 'from-orange-500 via-amber-500 to-red-500', text: 'text-orange-600', bg: 'bg-orange-50' },
  science: { label: 'วิทยาศาสตร์', gradient: 'from-red-500 via-orange-500 to-amber-500', text: 'text-red-600', bg: 'bg-red-50' },
  english: { label: 'ภาษาอังกฤษ',  gradient: 'from-amber-500 via-orange-500 to-red-500', text: 'text-amber-600', bg: 'bg-amber-50' },
}

export default function LessonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const subject = (params.subject as string) || 'math'
  const moduleId = (params.moduleId as string) || 'numbers_basics'

  const lesson: LessonData | undefined = LESSONS_DATA[subject]?.[moduleId]

  const [currentTab, setCurrentTab] = useState<'content' | 'quiz'>('content')
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [submittedQuiz, setSubmittedQuiz] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [savingProgress, setSavingProgress] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id)
      }
    })
  }, [])

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8 border-orange-100 shadow-xl">
          <div className="text-4xl mb-3">🔍</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">ไม่พบบทเรียนที่ต้องการ</h2>
          <p className="text-slate-500 text-sm mb-6">กรุณาเลือกบทเรียนจากหน้ารายวิชา</p>
          <Link href={`/subjects/${subject}`}>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold">
              ← กลับไปหน้ารายวิชา
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  const subjectInfo = SUBJECT_CONFIG[subject] || SUBJECT_CONFIG.math

  const handleSelectOption = (questionId: string, option: string) => {
    if (submittedQuiz) return
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }))
  }

  const calculateScore = () => {
    let correct = 0
    lesson.practiceQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct++
    })
    return {
      correct,
      total: lesson.practiceQuestions.length,
      percentage: Math.round((correct / lesson.practiceQuestions.length) * 100)
    }
  }

  const handleFinishLesson = async () => {
    setSubmittedQuiz(true)
    const scoreObj = calculateScore()
    setSavingProgress(true)

    if (userId) {
      try {
        // Safe check-then-upsert to prevent 409 Conflict
        const { data: existing } = await supabase
          .from('progress')
          .select('id')
          .eq('user_id', userId)
          .eq('module_id', moduleId)
          .maybeSingle()

        if (existing && existing.id) {
          await supabase
            .from('progress')
            .update({
              completed: true,
              score: scoreObj.percentage,
              completed_at: new Date().toISOString()
            })
            .eq('id', existing.id)
        } else {
          await supabase
            .from('progress')
            .insert({
              user_id: userId,
              subject,
              module_id: moduleId,
              completed: true,
              score: scoreObj.percentage,
              completed_at: new Date().toISOString()
            })
        }
      } catch (err) {
        console.warn('Failed to save progress to DB (non-fatal):', err)
      }
    }
    setSavingProgress(false)
    setCompleted(true)
  }

  const resetQuiz = () => {
    setSelectedAnswers({})
    setSubmittedQuiz(false)
  }

  const scoreResult = calculateScore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/60 via-amber-50/40 to-red-50/50 pb-20">
      {/* Top Bar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href={`/subjects/${subject}`}>
            <Button variant="ghost" size="sm" className="text-orange-800 hover:bg-orange-100 font-semibold text-xs">
              <ArrowLeft className="w-4 h-4 mr-1" /> กลับไป {subjectInfo.label}
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-100 text-orange-900 border border-orange-200 font-bold text-xs">
              {subjectInfo.label}
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6">
        {/* Banner */}
        <div className={`bg-gradient-to-r ${subjectInfo.gradient} rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-xl shadow-orange-500/20`}>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-100 uppercase tracking-wide mb-1">
            <span>{lesson.emoji}</span> บทเรียนเข้มข้น ม.1
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{lesson.title}</h1>
          <p className="text-orange-100 text-sm mt-1 font-medium">{lesson.subtitle}</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1.5 bg-orange-100/70 border border-orange-200/80 rounded-2xl mb-6">
          <button
            onClick={() => setCurrentTab('content')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              currentTab === 'content'
                ? 'bg-white text-orange-800 shadow-sm'
                : 'text-slate-600 hover:text-orange-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> สรุปเนื้อหา & สูตรลับ
          </button>
          <button
            onClick={() => setCurrentTab('quiz')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              currentTab === 'quiz'
                ? 'bg-white text-orange-800 shadow-sm'
                : 'text-slate-600 hover:text-orange-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> แบบฝึกหัดท้าทาย ({lesson.practiceQuestions.length} ข้อ)
          </button>
        </div>

        {/* Tab 1: Content & Secret Formula */}
        {currentTab === 'content' && (
          <div className="space-y-6">
            {/* Secret Formula Box */}
            <Card className="border-2 border-orange-300 shadow-lg bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-white rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-1" />
              <CardHeader className="pb-2 pt-6 px-6">
                <CardTitle className="flex items-center gap-2.5 text-orange-950 font-black text-lg sm:text-xl">
                  <div className="bg-gradient-to-tr from-orange-500 to-red-500 text-white p-2 rounded-xl shadow-md">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  {lesson.secretFormula.name}
                </CardTitle>
                <p className="text-slate-700 text-sm font-semibold mt-1 bg-white/80 p-3 rounded-xl border border-orange-100">
                  💡 หัวใจสำคัญ: {lesson.secretFormula.concept}
                </p>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-2.5 mt-2">
                  {lesson.secretFormula.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-orange-100/90 shadow-sm">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Core Concepts */}
            <Card className="border border-orange-100 shadow-md bg-white rounded-3xl">
              <CardHeader className="pb-2 pt-6 px-6">
                <CardTitle className="text-slate-800 font-bold text-base sm:text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-600" /> สรุปประเด็นที่มักออกข้อสอบ
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <ul className="space-y-3">
                  {lesson.summaryPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action to Practice */}
            <div className="text-center pt-2">
              <Button
                size="lg"
                onClick={() => setCurrentTab('quiz')}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-8 py-6 rounded-2xl shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
              >
                📝 ทดลองทำแบบฝึกหัดท้ายบท <ChevronRight className="w-5 h-5 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Practice Quiz */}
        {currentTab === 'quiz' && (
          <div className="space-y-6">
            {lesson.practiceQuestions.map((q, qIndex) => {
              const isSelected = selectedAnswers[q.id]
              const isCorrect = isSelected === q.correctAnswer

              return (
                <Card key={q.id} className="border border-orange-100 shadow-md bg-white rounded-3xl overflow-hidden">
                  <CardHeader className="bg-orange-50/60 pb-3 pt-4 px-6 border-b border-orange-100/60">
                    <span className="text-xs font-bold text-orange-700">คำถามข้อที่ {qIndex + 1}</span>
                    <CardTitle className="text-base sm:text-lg font-bold text-slate-800 mt-1">
                      {q.question}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-6 space-y-3">
                    <div className="space-y-2.5">
                      {q.options.map((opt, optIndex) => {
                        const optLetter = String.fromCharCode(65 + optIndex)
                        const isThisChosen = isSelected === opt
                        let optionStyle = 'border-orange-100 bg-white hover:border-orange-300 hover:bg-orange-50/40 text-slate-700'

                        if (submittedQuiz) {
                          if (opt === q.correctAnswer) {
                            optionStyle = 'border-green-500 bg-green-50 text-green-900 font-bold'
                          } else if (isThisChosen && !isCorrect) {
                            optionStyle = 'border-red-500 bg-red-50 text-red-900'
                          }
                        } else if (isThisChosen) {
                          optionStyle = 'border-orange-500 bg-orange-50 text-orange-950 font-semibold shadow-sm'
                        }

                        return (
                          <button
                            key={optIndex}
                            disabled={submittedQuiz}
                            onClick={() => handleSelectOption(q.id, opt)}
                            className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center gap-3 ${optionStyle}`}
                          >
                            <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              isThisChosen ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {optLetter}
                            </span>
                            <span className="flex-1 text-xs sm:text-sm">{opt}</span>

                            {submittedQuiz && opt === q.correctAnswer && (
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                            )}
                            {submittedQuiz && isThisChosen && !isCorrect && (
                              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {/* Show Explanation when submitted */}
                    {submittedQuiz && (
                      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-xs sm:text-sm">
                        <p className="font-bold text-amber-950 flex items-center gap-1.5 mb-1">
                          💡 เฉลยละเอียด & แนวคิด:
                        </p>
                        <p className="text-slate-700 leading-relaxed font-medium">{q.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}

            {/* Submit / Result Section */}
            {!submittedQuiz ? (
              <div className="text-center pt-2">
                <Button
                  size="lg"
                  onClick={handleFinishLesson}
                  disabled={Object.keys(selectedAnswers).length < lesson.practiceQuestions.length}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-10 py-6 rounded-2xl shadow-xl shadow-orange-500/25 transition-all"
                >
                  {savingProgress ? 'กำลังบันทึกคะแนน...' : '✅ ส่งคำตอบ & ตรวจแบบฝึกหัด'}
                </Button>
                {Object.keys(selectedAnswers).length < lesson.practiceQuestions.length && (
                  <p className="text-xs text-slate-400 mt-2">กรุณาตอบคำถามให้ครบทุกข้อก่อนตรวจ</p>
                )}
              </div>
            ) : (
              <Card className="border-2 border-orange-300 shadow-xl bg-gradient-to-br from-white via-orange-50/50 to-amber-50 rounded-3xl p-6 text-center">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-xl font-black text-slate-800 mb-1">ยอดเยี่ยมมาก! คุณเรียนจบโมดูลนี้แล้ว</h3>
                <p className="text-sm text-slate-600 mb-4">
                  คะแนนแบบฝึกหัด: <span className="font-bold text-orange-600 text-lg">{scoreResult.correct} / {scoreResult.total}</span> ({scoreResult.percentage}%)
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={resetQuiz}
                    className="border-orange-200 text-orange-800 hover:bg-orange-50 font-semibold"
                  >
                    <RotateCcw className="w-4 h-4 mr-1.5" /> ลองทำใหม่อีกครั้ง
                  </Button>
                  <Link href={`/subjects/${subject}`}>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-md shadow-orange-500/20">
                      <Trophy className="w-4 h-4 mr-1.5" /> สำเร็จโมดูลนี้แล้ว กลับสู่หน้ารายวิชา
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
