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
import Footer from '@/components/Footer'
import { RT_P1_EXAM_DATA, RTQuestion } from '@/lib/rt-nt-exam-data'
import { soundFX } from '@/lib/sound-fx'
import {
  ArrowLeft,
  Timer,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Volume2,
  BookOpen,
  Award,
  Share2
} from 'lucide-react'

export default function RTExamPage() {
  const router = useRouter()
  const supabase = createClient()

  const allQuestions = RT_P1_EXAM_DATA.parts[0].questions
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [isStarted, setIsStarted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [timeLeft, setTimeLeft] = useState(RT_P1_EXAM_DATA.durationMinutes * 60)
  const [userId, setUserId] = useState<string | null>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id)
    })
  }, [])

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
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }))
  }

  const currentQ = allQuestions[currentIdx]
  const isSelected = selectedAnswers[currentQ?.id]

  const calculateScore = () => {
    let correct = 0
    allQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct++
    })
    return {
      correct,
      total: allQuestions.length,
      percentage: Math.round((correct / allQuestions.length) * 100)
    }
  }

  const handleSubmit = (auto: boolean = false) => {
    if (!auto && Object.keys(selectedAnswers).length < allQuestions.length) {
      if (!confirm('คุณยังตอบคำถามไม่ครบทุกข้อ ต้องการส่งข้อสอบเลยหรือไม่?')) return
    }
    setIsSubmitted(true)
    setShowResultModal(true)
    const score = calculateScore()
    if (score.percentage >= 70) soundFX.playFanfare()
    else soundFX.playCorrect()

    // Sync to API
    try {
      if (userId) {
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            subject: 'thai',
            moduleId: 'rt_p1_reading',
            score: score.percentage
          })
        })
      }
    } catch (e) {
      console.warn('Sync RT score warning:', e)
    }
  }

  const resetExam = () => {
    setSelectedAnswers({})
    setIsSubmitted(false)
    setShowResultModal(false)
    setCurrentIdx(0)
    setTimeLeft(RT_P1_EXAM_DATA.durationMinutes * 60)
    setIsStarted(false)
  }

  const result = calculateScore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/70 via-orange-50/50 to-red-50/60 pb-20">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-orange-800 hover:bg-orange-100 font-semibold text-xs">
              <ArrowLeft className="w-4 h-4 mr-1" /> หน้าหลัก
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500 text-amber-950 font-black text-xs px-3 py-1">
              📖 สนามสอบจำลอง RT ป.1 (สพฐ.)
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-100 uppercase tracking-wide mb-1">
            <span>📖</span> การประเมินความสามารถด้านการอ่าน (Reading Test)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{RT_P1_EXAM_DATA.title}</h1>
          <p className="text-orange-100 text-xs sm:text-sm mt-1 font-medium">
            ปีการศึกษา {RT_P1_EXAM_DATA.year} • ตรงตามมาตรฐาน สพฐ. 100%
          </p>
        </div>

        {/* Start Screen or Exam Screen */}
        {!isStarted ? (
          <Card className="border border-orange-100 shadow-xl bg-white rounded-3xl p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-4xl shadow-lg">
              📖
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">คำชี้แจงการทดสอบ RT ป.1</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                ข้อสอบชุดนี้ประเมินความสามารถด้านการอ่านออกเสียงและการอ่านรู้เรื่องคำ ประโยค และนิทาน มีทั้งหมด {allQuestions.length} ข้อ เวลาทำข้อสอบ {RT_P1_EXAM_DATA.durationMinutes} นาที
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-left text-xs font-semibold text-slate-700">
              <div className="bg-orange-50 p-3.5 rounded-2xl border border-orange-200">
                <span className="block text-orange-600 font-bold">📝 จำนวนข้อสอบ</span>
                <span className="text-base font-black text-slate-800">{allQuestions.length} ข้อ</span>
              </div>
              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                <span className="block text-amber-600 font-bold">⏱️ เวลาทำสอบ</span>
                <span className="text-base font-black text-slate-800">{RT_P1_EXAM_DATA.durationMinutes} นาที</span>
              </div>
              <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200">
                <span className="block text-rose-600 font-bold">🎯 เกณฑ์ผ่านดีเยี่ยม</span>
                <span className="text-base font-black text-slate-800">80% ขึ้นไป</span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setIsStarted(true)}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 text-white font-black text-base px-10 py-6 rounded-2xl shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
            >
              🚀 เริ่มทำข้อสอบ RT ป.1 ทันที
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Top Bar: Progress & Timer */}
            <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">ความคืบหน้า:</span>
                <span className="text-xs font-black text-orange-600">ข้อ {currentIdx + 1} จาก {allQuestions.length}</span>
              </div>

              <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200 text-orange-900 text-xs font-black">
                <Timer className="w-4 h-4 text-orange-600 animate-pulse" />
                <span>เวลาที่เหลือ: {formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Question Card */}
            <Card className="border border-orange-100 shadow-lg bg-white rounded-3xl overflow-hidden">
              <CardHeader className="bg-orange-50/60 pb-3 pt-5 px-6 border-b border-orange-100">
                <div className="flex justify-between items-center">
                  <Badge className="bg-orange-100 text-orange-800 font-bold text-xs">
                    {currentQ.title} • {currentQ.subskill}
                  </Badge>
                  {currentQ.phoneticGuide && (
                    <span className="text-[11px] text-slate-500 font-medium bg-white px-2.5 py-1 rounded-lg border border-orange-200">
                      🗣️ คำอ่าน: {currentQ.phoneticGuide}
                    </span>
                  )}
                </div>
                <CardTitle className="text-base sm:text-lg font-black text-slate-800 mt-2 whitespace-pre-line leading-relaxed">
                  {currentQ.content}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 space-y-3">
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, optIdx) => {
                    const optLetter = String.fromCharCode(65 + optIdx)
                    const isThisChosen = isSelected === opt
                    let style = 'border-orange-100 bg-white hover:border-orange-300 hover:bg-orange-50/40 text-slate-700'

                    if (isSubmitted) {
                      if (opt === currentQ.correctAnswer) {
                        style = 'border-green-500 bg-green-50 text-green-900 font-bold'
                      } else if (isThisChosen && opt !== currentQ.correctAnswer) {
                        style = 'border-red-500 bg-red-50 text-red-900 font-semibold'
                      }
                    } else if (isThisChosen) {
                      style = 'border-orange-500 bg-orange-50 text-orange-950 font-semibold shadow-sm'
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(currentQ.id, opt)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${style}`}
                      >
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          isThisChosen ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {optLetter}
                        </span>
                        <span className="flex-1 text-xs sm:text-sm font-medium">{opt}</span>
                        {isSubmitted && opt === currentQ.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        )}
                        {isSubmitted && isThisChosen && opt !== currentQ.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Explanation when submitted */}
                {isSubmitted && (
                  <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm space-y-1">
                    <p className="font-bold text-amber-950">💡 เฉลยละเอียดและวิธีคิด:</p>
                    <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-line">{currentQ.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="border-slate-300 font-bold text-xs rounded-xl"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> ข้อก่อนหน้า
              </Button>

              {currentIdx < allQuestions.length - 1 ? (
                <Button
                  onClick={() => setCurrentIdx(prev => Math.min(allQuestions.length - 1, prev + 1))}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  ข้อถัดไป <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitted}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 text-white font-black text-xs px-6 rounded-xl shadow-md"
                >
                  ✓ ส่งข้อสอบ RT ป.1
                </Button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Result Modal */}
      <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
        <DialogContent className="max-w-md bg-white rounded-3xl p-6 text-center border-orange-100">
          <DialogHeader>
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-3xl shadow-lg mb-2">
              🏆
            </div>
            <DialogTitle className="text-xl font-black text-slate-800">
              ผลการทดสอบ RT ชั้น ป.1 (สพฐ.)
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              บันทึกคะแนนและวิเคราะห์ทักษะการอ่านเรียบร้อยแล้ว
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 bg-orange-50 p-5 rounded-2xl border border-orange-200 space-y-3">
            <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {result.percentage}%
            </div>
            <p className="text-xs font-bold text-slate-700">
              ทำถูกต้อง {result.correct} จาก {result.total} ข้อ
            </p>
            <Badge className={`text-xs font-black px-3 py-1 ${
              result.percentage >= 80 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-amber-950'
            }`}>
              {result.percentage >= 80 ? '🌟 ระดับยอดเยี่ยม (ผ่านเกณฑ์ สพฐ.)' : '👍 ระดับพอใช้ (ฝึกฝนเพิ่มเติม)'}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={resetExam}
              className="flex-1 border-slate-300 font-bold text-xs rounded-xl"
            >
              <RotateCcw className="w-4 h-4 mr-1" /> ทำใหม่อีกครั้ง
            </Button>
            <Button
              onClick={() => router.push('/dashboard')}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md"
            >
              กลับหน้าแดชบอร์ด
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
