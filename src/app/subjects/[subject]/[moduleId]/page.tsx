'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LESSONS_DATA, LessonData, PracticeQuestion } from '@/lib/lessons-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ReportModal from '@/components/ReportModal'
import Footer from '@/components/Footer'
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
  RotateCcw,
  Loader2,
  RefreshCw,
  Flag
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
  const [questions, setQuestions] = useState<PracticeQuestion[]>(lesson?.practiceQuestions || [])
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [submittedQuiz, setSubmittedQuiz] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [savingProgress, setSavingProgress] = useState(false)
  const [generatingAI, setGeneratingAI] = useState(false)
  const [aiSource, setAiSource] = useState<string>('คลังข้อสอบมาตรฐาน (Curated Bank)')

  // Report Modal State
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [reportQuestionId, setReportQuestionId] = useState<string | undefined>(undefined)
  const [reportContextTitle, setReportContextTitle] = useState<string | undefined>(undefined)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id)
      }
    })
    if (lesson) {
      setQuestions(lesson.practiceQuestions)
    }
  }, [subject, moduleId])

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
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct++
    })
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / (questions.length || 1)) * 100)
    }
  }

  const handleFinishLesson = async () => {
    setSubmittedQuiz(true)
    const scoreObj = calculateScore()
    setSavingProgress(true)

    if (userId) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            subject,
            moduleId,
            score: scoreObj.percentage
          })
        })
      } catch (err) {
        console.warn('Progress sync warning:', err)
      }
    }
    setSavingProgress(false)
  }

  const resetQuiz = () => {
    setSelectedAnswers({})
    setSubmittedQuiz(false)
  }

  const handleGenerateAIQuiz = async () => {
    setGeneratingAI(true)
    resetQuiz()
    try {
      const res = await fetch('/api/lessons/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, moduleId })
      })
      const data = await res.json()
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions)
        setAiSource(data.generatedBy || 'ชุดโจทย์สุ่มใหม่ 🤖')
      }
    } catch (err) {
      console.warn('AI Quiz generator error:', err)
    } finally {
      setGeneratingAI(false)
    }
  }

  const openReport = (questionId?: string, title?: string) => {
    setReportQuestionId(questionId)
    setReportContextTitle(title || `${lesson.title} (${subjectInfo.label})`)
    setIsReportOpen(true)
  }

  const scoreResult = calculateScore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/60 via-amber-50/40 to-red-50/50 pb-20">
      {/* Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        subject={subject}
        moduleId={moduleId}
        questionId={reportQuestionId}
        contextTitle={reportContextTitle}
        userId={userId}
      />

      {/* Top Bar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40 shadow-sm">
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => openReport(undefined, `บทเรียน: ${lesson.title}`)}
              className="text-slate-500 hover:text-red-600 hover:bg-red-50 border-slate-200 text-xs font-semibold h-7 px-2"
            >
              <Flag className="w-3.5 h-3.5 mr-1 text-red-500" /> แจ้งจุดผิด
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6">
        {/* Banner */}
        <div className={`bg-gradient-to-r ${subjectInfo.gradient} rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-xl shadow-orange-500/20`}>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-100 uppercase tracking-wide mb-1">
            <span>{lesson.emoji}</span> บทเรียนเข้มข้น & โจทย์แข่งขัน ม.1
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
            <HelpCircle className="w-4 h-4" /> แบบฝึกหัดท้าทาย ({questions.length} ข้อ)
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
                  <Sparkles className="w-5 h-5 text-orange-600" /> สรุปประเด็นและจุดดักในข้อสอบ
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
              <Button
                size="lg"
                onClick={() => setCurrentTab('quiz')}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-8 py-6 rounded-2xl shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
              >
                📝 ทำแบบฝึกหัด {questions.length} ข้อ <ChevronRight className="w-5 h-5 ml-1.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openReport(undefined, `เนื้อหา: ${lesson.title}`)}
                className="text-slate-500 hover:text-red-600 text-xs font-semibold"
              >
                <Flag className="w-3.5 h-3.5 mr-1 text-red-500" /> แจ้งข้อผิดพลาดในบทเรียนนี้
              </Button>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Practice Quiz */}
        {currentTab === 'quiz' && (
          <div className="space-y-6">
            {/* Header with AI Generator Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
              <div>
                <span className="text-xs font-bold text-orange-700 block">แหล่งที่มาของข้อสอบ:</span>
                <span className="text-xs text-slate-500 font-medium">{aiSource}</span>
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleGenerateAIQuiz}
                disabled={generatingAI}
                className="border-orange-300 text-orange-800 hover:bg-orange-50 font-bold text-xs shadow-sm"
              >
                {generatingAI ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> กำลังสุ่มข้อสอบชุดใหม่...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> 🤖 สุ่มโจทย์ใหม่ด้วย AI
                  </>
                )}
              </Button>
            </div>

            {questions.map((q, qIndex) => {
              const isSelected = selectedAnswers[q.id]
              const isCorrect = isSelected === q.correctAnswer

              return (
                <Card key={q.id || qIndex} className="border border-orange-100 shadow-md bg-white rounded-3xl overflow-hidden">
                  <CardHeader className="bg-orange-50/60 pb-3 pt-4 px-6 border-b border-orange-100/60">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-orange-700">คำถามข้อที่ {qIndex + 1} จาก {questions.length}</span>
                      <div className="flex items-center gap-2">
                        {submittedQuiz && (
                          isCorrect ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200 font-bold text-xs">
                              ✓ ถูกต้อง (+1 คะแนน)
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 border-red-200 font-bold text-xs">
                              ✗ ยังไม่ถูกต้อง
                            </Badge>
                          )
                        )}
                        <button
                          onClick={() => openReport(q.id, `ข้อ ${qIndex + 1}: ${q.question.slice(0, 35)}...`)}
                          className="text-slate-400 hover:text-red-500 text-xs flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                          title="รายงานข้อผิดพลาดของข้อนี้"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-[11px] font-semibold">แจ้งจุดผิด</span>
                        </button>
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-bold text-slate-800 mt-1 whitespace-pre-line leading-relaxed">
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
                            optionStyle = 'border-red-500 bg-red-50 text-red-900 font-semibold'
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

                    {/* Show Detailed Explanation and Tips when submitted */}
                    {submittedQuiz && (
                      <div className="mt-4 space-y-2">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-xs sm:text-sm">
                          <div className="flex justify-between items-center mb-1.5">
                            <p className="font-bold text-amber-950 flex items-center gap-1.5">
                              💡 เฉลยละเอียด & วิธีคิดทีละขั้นตอน:
                            </p>
                            <button
                              onClick={() => openReport(q.id, `เฉลยข้อ ${qIndex + 1}: ${q.question.slice(0, 30)}...`)}
                              className="text-[11px] text-amber-900/80 hover:text-red-600 font-semibold flex items-center gap-1"
                            >
                              <Flag className="w-3 h-3" /> เฉลยไม่ถูกต้อง?
                            </button>
                          </div>
                          <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-line">{q.explanation}</p>
                        </div>
                        {q.tip && (
                          <div className="p-3 rounded-xl bg-orange-100/70 border border-orange-200 text-xs text-orange-900 font-semibold">
                            {q.tip}
                          </div>
                        )}
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
                  disabled={Object.keys(selectedAnswers).length < questions.length}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-10 py-6 rounded-2xl shadow-xl shadow-orange-500/25 transition-all hover:scale-105"
                >
                  {savingProgress ? 'กำลังบันทึกคะแนน...' : `✅ ส่งคำตอบ & ตรวจแบบฝึกหัด (${Object.keys(selectedAnswers).length}/${questions.length})`}
                </Button>
                {Object.keys(selectedAnswers).length < questions.length && (
                  <p className="text-xs text-slate-400 mt-2 font-medium">กรุณาตอบคำถามให้ครบทุกข้อ ({Object.keys(selectedAnswers).length}/{questions.length} ข้อ) ก่อนส่งตรวจ</p>
                )}
              </div>
            ) : (
              <Card className="border-2 border-orange-300 shadow-xl bg-gradient-to-br from-white via-orange-50/50 to-amber-50 rounded-3xl p-6 sm:p-8 text-center">
                <div className="text-5xl mb-2">🏆</div>
                <h3 className="text-2xl font-black text-slate-800 mb-1">สรุปผลการทำแบบฝึกหัด</h3>
                <p className="text-sm text-slate-600 mb-4">
                  ทำได้ถูกต้อง: <span className="font-black text-orange-600 text-xl">{scoreResult.correct} จาก {scoreResult.total} ข้อ</span> ({scoreResult.percentage}%)
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={resetQuiz}
                    className="border-orange-200 text-orange-800 hover:bg-orange-50 font-bold"
                  >
                    <RotateCcw className="w-4 h-4 mr-1.5" /> ลองทำข้อสอบชุดนี้ซ้ำ
                  </Button>
                  <Button
                    onClick={handleGenerateAIQuiz}
                    disabled={generatingAI}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-md shadow-orange-500/20"
                  >
                    <RefreshCw className="w-4 h-4 mr-1.5" /> สุ่มโจทย์ชุดใหม่ด้วย AI
                  </Button>
                  <Link href={`/subjects/${subject}`}>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-md shadow-orange-500/20">
                      <Trophy className="w-4 h-4 mr-1.5" /> กลับสู่หน้ารายวิชา
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
