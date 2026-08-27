'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import ReportModal from '@/components/ReportModal'
import Footer from '@/components/Footer'
import { MOCK_EXAM_QUESTIONS, MockExamQuestion, evaluateMockExam, MockExamResult } from '@/lib/mock-exam-pool'
import { saveMistakeQuestion } from '@/lib/flashcards-data'
import { awardBadge } from '@/lib/gamification'
import {
  ArrowLeft,
  Timer,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Trophy,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Flag,
  Share2,
  BookOpen,
  Award
} from 'lucide-react'

const TOTAL_SECONDS = 45 * 60 // 45 minutes

export default function MockExamPage() {
  const router = useRouter()
  const supabase = createClient()

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS)
  const [isStarted, setIsStarted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [validationWarning, setValidationWarning] = useState<string | null>(null)
  const [examResult, setExamResult] = useState<MockExamResult | null>(null)
  const [savingProgress, setSavingProgress] = useState(false)
  const [reportQuestionId, setReportQuestionId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        if (data.user) setUserId(data.user.id)
      } catch (err) {
        console.warn('Auth check error:', err)
      }
    }
    checkAuth()
  }, [])

  // Timer Countdown
  useEffect(() => {
    if (isStarted && !isSubmitted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            handleSubmit(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isStarted, isSubmitted, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSelectOption = (questionId: string, option: string) => {
    if (isSubmitted) return
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: option
    }))
    setValidationWarning(null)
  }

  const handleSubmit = async (isAutoSubmit = false) => {
    if (isSubmitted) return

    // Rule 6 Invariant: Check if all questions are answered
    if (!isAutoSubmit) {
      const unansweredIndices: number[] = []
      MOCK_EXAM_QUESTIONS.forEach((q, idx) => {
        if (!selectedAnswers[q.id]) {
          unansweredIndices.push(idx + 1)
        }
      })

      if (unansweredIndices.length > 0) {
        setValidationWarning(
          `⚠️ ยังไม่ได้ตอบข้อ ${unansweredIndices.slice(0, 10).join(', ')}${unansweredIndices.length > 10 ? ` และอีก ${unansweredIndices.length - 10} ข้อ` : ''} กรุณาตอบให้ครบก่อนส่งครับ`
        )
        return
      }
    }

    if (timerRef.current) clearInterval(timerRef.current)
    setIsSubmitted(true)

    // Evaluate Result
    const res = evaluateMockExam(selectedAnswers)
    setExamResult(res)
    setShowResultModal(true)

    // Collect Mistakes for Spaced Repetition Flashcards
    MOCK_EXAM_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] !== q.correctAnswer) {
        saveMistakeQuestion({
          subject: q.subject,
          question: q.question,
          correctAnswer: q.correctAnswer,
          explanation: `${q.explanation.principle}\n${q.explanation.steps}`,
          tip: q.explanation.shortcut,
          topic: q.topic
        })
      }
    })

    // Award Badges
    awardBadge('mock_exam_taker', 100)
    if (res.percentage >= 80) {
      awardBadge('mock_exam_high_scorer', 200)
    }

    // Save Dual Progress (Rule 9 Strategy)
    try {
      setSavingProgress(true)
      localStorage.setItem('master_m1_mock_result', JSON.stringify(res))

      if (userId) {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            subject: 'mock_exam',
            moduleId: 'full_mock_set_1',
            score: res.score,
            total: res.total,
            completed: true
          })
        })
      }
    } catch (err) {
      console.warn('Progress sync warning:', err)
    } finally {
      setSavingProgress(false)
    }
  }

  const currentQ = MOCK_EXAM_QUESTIONS[currentIdx]
  const answeredCount = Object.keys(selectedAnswers).length
  const totalCount = MOCK_EXAM_QUESTIONS.length

  // Start Screen
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/40 to-red-50 text-slate-800 flex flex-col">
        <header className="bg-white/85 backdrop-blur-md border-b border-orange-100 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3.5 flex justify-between items-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-orange-600">
                <ArrowLeft className="w-4 h-4 mr-1" />
                แดชบอร์ด
              </Button>
            </Link>
            <h1 className="font-bold text-slate-800 text-base sm:text-lg">⏱️ โหมดจำลองสอบเสมือนจริง (Mock Exam)</h1>
            <div className="w-16" />
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-12 flex-1 flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-gradient-to-tr from-orange-500 to-red-600 text-white rounded-3xl shadow-xl shadow-orange-500/25 mb-6 animate-pulse">
            <Timer className="w-12 h-12" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            ชุดจำลองข้อสอบเข้า ม.1 เสมือนจริง
          </h2>
          <p className="text-slate-600 max-w-lg mb-8 leading-relaxed">
            ทดสอบความพร้อมรอบด้าน ครบทั้ง <strong className="text-orange-700">3 วิชาหลัก (30 ข้อ)</strong> ในเวลา <strong className="text-red-700">45 นาที</strong> พร้อมระบบจับเวลาและวิเคราะห์จุดอ่อนอัตโนมัติ
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl mb-8 text-left">
            <div className="bg-white p-4 rounded-xl border border-orange-200/80 shadow-sm">
              <div className="text-2xl mb-1">🔢</div>
              <h4 className="font-bold text-slate-900 text-sm">คณิตศาสตร์</h4>
              <p className="text-xs text-slate-500">10 ข้อ (คิดเร็ว & เรขา)</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-orange-200/80 shadow-sm">
              <div className="text-2xl mb-1">🔬</div>
              <h4 className="font-bold text-slate-900 text-sm">วิทยาศาสตร์</h4>
              <p className="text-xs text-slate-500">10 ข้อ (ตัวแปร & พืช-สัตว์)</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-orange-200/80 shadow-sm">
              <div className="text-2xl mb-1">🗣️</div>
              <h4 className="font-bold text-slate-900 text-sm">ภาษาอังกฤษ</h4>
              <p className="text-xs text-slate-500">10 ข้อ (Grammar & Reading)</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-xl text-left text-xs text-amber-900 mb-8 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-600" /> กติกาการสอบเสมือนจริง:
            </p>
            <p>1. ระบบไม่เฉลยคำตอบระหว่างสอบ เพื่อวัดผลสัมฤทธิ์จริง</p>
            <p>2. มีเวลา 45:00 นาที เมื่อหมดเวลาระบบจะส่งตรวจคำตอบอัตโนมัติ</p>
            <p>3. หลังส่งตรวจ คุณจะได้รับ <strong>Report Card วิเคราะห์จุดอ่อน</strong> พร้อมเฉลยละเอียดและสูตรลัดครบทุกข้อ</p>
          </div>

          <Button
            size="lg"
            onClick={() => setIsStarted(true)}
            className="text-lg px-10 py-7 bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl shadow-orange-500/25 font-black hover:scale-105 transition-all"
          >
            🚀 เริ่มทำข้อสอบทันที (45 นาที)
          </Button>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/40 to-red-50 text-slate-800 flex flex-col">
      {/* Test Header with Timer */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-orange-600">
                <ArrowLeft className="w-4 h-4 mr-1" />
                ออก
              </Button>
            </Link>
            <div>
              <h1 className="font-black text-slate-800 text-sm sm:text-base">MASTER ม.1 Mock Exam</h1>
              <p className="text-[11px] text-slate-500">ตอบแล้ว {answeredCount}/{totalCount} ข้อ</p>
            </div>
          </div>

          {/* Real-time Countdown Timer */}
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-mono text-sm sm:text-base font-black shadow-sm ${
            timeLeft <= 300 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-orange-100 text-orange-950 border border-orange-200'
          }`}>
            <Timer className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      {/* Main Examination Area */}
      <main className="max-w-5xl mx-auto px-4 py-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Question Area (3 Cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Validation Warning Banner (Rule 6 Invariant) */}
          {validationWarning && (
            <div className="p-4 bg-amber-50 border-2 border-amber-400 text-amber-950 rounded-xl shadow-md flex items-start gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm font-semibold">
                {validationWarning}
              </div>
            </div>
          )}

          {/* Current Question Card */}
          <Card className="border-2 border-orange-200/80 shadow-md bg-white">
            <CardHeader className="pb-3 border-b border-orange-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-500 text-white font-bold text-xs">
                    ข้อที่ {currentIdx + 1} จาก {totalCount}
                  </Badge>
                  <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-300 text-xs">
                    {currentQ.subject === 'math' ? '🔢 คณิตศาสตร์' : currentQ.subject === 'science' ? '🔬 วิทยาศาสตร์' : '🗣️ ภาษาอังกฤษ'}
                  </Badge>
                </div>
                <button
                  onClick={() => setReportQuestionId(currentQ.id)}
                  className="text-xs text-slate-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <Flag className="w-3.5 h-3.5" /> แจ้งจุดผิด
                </button>
              </div>
              <CardTitle className="text-base sm:text-lg font-bold text-slate-900 mt-2 leading-relaxed whitespace-pre-line">
                {currentQ.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-4 space-y-3">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === opt
                const isCorrect = currentQ.correctAnswer === opt
                
                let optionStyle = 'border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 bg-white text-slate-800'
                if (isSubmitted) {
                  if (isCorrect) optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                  else if (isSelected) optionStyle = 'border-red-500 bg-red-50 text-red-950 line-through'
                } else if (isSelected) {
                  optionStyle = 'border-orange-500 bg-orange-50 text-orange-950 font-bold shadow-sm ring-1 ring-orange-400'
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(currentQ.id, opt)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-center justify-between text-xs sm:text-sm ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0 bg-white">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                  </button>
                )
              })}

              {/* Detailed Explanation (Visible after submit) */}
              {isSubmitted && (
                <div className="mt-6 p-4 sm:p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl text-xs sm:text-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> เฉลยและวิธีคิดอย่างละเอียด
                    </span>
                    <Badge variant="outline" className="text-slate-300 border-white/20 text-[10px]">
                      {currentQ.standardCode}
                    </Badge>
                  </div>
                  <p className="text-slate-300 font-medium">
                    <strong className="text-white">หลักการ:</strong> {currentQ.explanation.principle}
                  </p>
                  <div className="text-slate-200 whitespace-pre-line bg-white/5 p-3 rounded-lg border border-white/10 font-mono text-xs leading-relaxed">
                    {currentQ.explanation.steps}
                  </div>
                  {currentQ.explanation.shortcut && (
                    <p className="text-amber-200 font-semibold bg-amber-500/20 p-2.5 rounded-lg border border-amber-400/30">
                      {currentQ.explanation.shortcut}
                    </p>
                  )}
                  {currentQ.explanation.trapWarning && (
                    <p className="text-red-200 font-semibold bg-red-500/20 p-2.5 rounded-lg border border-red-400/30">
                      {currentQ.explanation.trapWarning}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="bg-white hover:bg-orange-50 border-slate-300"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> ข้อก่อนหน้า
            </Button>

            {!isSubmitted ? (
              <Button
                onClick={() => handleSubmit(false)}
                className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-6 shadow-md"
              >
                ส่งตรวจข้อสอบ 🏁
              </Button>
            ) : (
              <Button
                onClick={() => setShowResultModal(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-6 shadow-md"
              >
                🏆 ดู Report Card
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => setCurrentIdx(prev => Math.min(totalCount - 1, prev + 1))}
              disabled={currentIdx === totalCount - 1}
              className="bg-white hover:bg-orange-50 border-slate-300"
            >
              ข้อถัดไป <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Right Column: Question Navigator Matrix (1 Col) */}
        <div className="space-y-4">
          <Card className="border border-orange-200/80 bg-white shadow-sm sticky top-20">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-bold text-slate-700 flex justify-between items-center">
                <span>ตารางข้อสอบ</span>
                <span className="text-orange-600">{answeredCount}/{totalCount} ข้อ</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="grid grid-cols-5 gap-2">
                {MOCK_EXAM_QUESTIONS.map((q, idx) => {
                  const isAnswered = !!selectedAnswers[q.id]
                  const isCurrent = idx === currentIdx
                  const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctAnswer

                  let btnColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  if (isSubmitted) {
                    btnColor = isCorrect ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-red-500 text-white border-red-600'
                  } else if (isAnswered) {
                    btnColor = 'bg-orange-500 text-white border-orange-600 font-bold'
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-9 rounded-lg font-bold text-xs border transition-all flex items-center justify-center ${btnColor} ${
                        isCurrent ? 'ring-2 ring-slate-900 scale-105' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" /> ตอบแล้ว
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" /> ยังไม่ได้ตอบ
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Score Result Dialog Popup (Rule 6 Invariant) */}
      {examResult && (
        <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
          <DialogContent className="max-w-xl bg-white rounded-3xl border-2 border-orange-200 shadow-2xl p-6 sm:p-8">
            <DialogHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-amber-400 to-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25 mb-3">
                <Trophy className="w-8 h-8" />
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-black text-slate-900">
                คะแนน Mock Exam ของคุณ
              </DialogTitle>
              <DialogDescription className="text-slate-600 text-xs sm:text-sm">
                วิเคราะห์ผลสัมฤทธิ์รอบด้าน 3 วิชา สำหรับเตรียมพร้อมสอบเข้า ม.1
              </DialogDescription>
            </DialogHeader>

            {/* Score Big Display */}
            <div className="my-4 p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 text-center">
              <div className="text-4xl sm:text-5xl font-black text-orange-600 mb-1 font-mono">
                {examResult.score} <span className="text-2xl text-slate-400 font-sans">/ {examResult.total}</span>
              </div>
              <div className="flex justify-center items-center gap-2 font-bold text-sm text-slate-700">
                <Badge className="bg-emerald-600 text-white text-xs px-3 py-0.5">
                  เกรด {examResult.grade} ({examResult.percentage}%)
                </Badge>
              </div>
              <p className="text-xs font-semibold text-orange-900/80 mt-3 max-w-md mx-auto">
                {examResult.targetReadiness}
              </p>
            </div>

            {/* Subject Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
              <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                <p className="font-bold text-orange-900">คณิตศาสตร์</p>
                <p className="text-lg font-black text-orange-700">{examResult.mathScore}/10</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                <p className="font-bold text-red-900">วิทยาศาสตร์</p>
                <p className="text-lg font-black text-red-700">{examResult.scienceScore}/10</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="font-bold text-amber-900">ภาษาอังกฤษ</p>
                <p className="text-lg font-black text-amber-700">{examResult.englishScore}/10</p>
              </div>
            </div>

            {/* Weak topics note */}
            {examResult.weakTopics.length > 0 && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 mb-6">
                <span className="font-bold text-red-600">🎯 หัวข้อที่ควรทบทวนเพิ่ม:</span>{' '}
                {examResult.weakTopics.join(', ')}
                <p className="text-[11px] text-slate-400 mt-1">
                  * ข้อที่ตอบผิดถูกบันทึกลง <strong>"Flashcard จุดที่เคยผิด"</strong> ให้เรียบร้อยแล้ว
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setShowResultModal(false)}
                className="flex-1 border-orange-200 text-orange-800 hover:bg-orange-50 font-bold"
              >
                ดูเฉลยละเอียดทีละข้อ 📖
              </Button>
              <Link href="/flashcards" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 text-white font-bold">
                  ท่องจำ Flashcard ต่อ 🃏
                </Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Report Bug Modal (Rule 4) */}
      <ReportModal
        isOpen={!!reportQuestionId}
        onClose={() => setReportQuestionId(null)}
        subject="mock_exam"
        moduleId="full_mock_set_1"
        questionId={reportQuestionId || undefined}
        userId={userId}
      />

      <Footer />
    </div>
  )
}
