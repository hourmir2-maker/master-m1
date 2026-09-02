'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import ReportModal from '@/components/ReportModal'
import PaceCoach from '@/components/PaceCoach'
import Footer from '@/components/Footer'
import { 
  ONetSubject, 
  ONetQuestionType, 
  ONET_SUBJECTS_CONFIG, 
  ONetSubjectMeta 
} from '@/lib/onet-blueprint-data'
import { 
  ONET_EXAM_POOL, 
  ONetQuestion, 
  evaluateONetSubjectExam, 
  ONetExamEvaluationResult 
} from '@/lib/onet-exam-pool'
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
  Award,
  Layers,
  HelpCircle,
  FileText,
  Check,
  Zap,
  Target
} from 'lucide-react'

export default function ONetExamPage() {
  const router = useRouter()
  const supabase = createClient()

  const [activeSubject, setActiveSubject] = useState<ONetSubject>('math')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({})
  const [timeLeft, setTimeLeft] = useState(60 * 60) // default 60 minutes
  const [isStarted, setIsStarted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [validationWarning, setValidationWarning] = useState<string | null>(null)
  const [examResult, setExamResult] = useState<ONetExamEvaluationResult | null>(null)
  const [savingProgress, setSavingProgress] = useState(false)
  const [reportQuestionId, setReportQuestionId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentMeta = ONET_SUBJECTS_CONFIG[activeSubject]
  const currentQuestions = ONET_EXAM_POOL[activeSubject] || []
  const currentQuestion = currentQuestions[currentIdx]

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        if (data.user) setUserId(data.user.id)
      } catch (err) {
        console.warn('Auth check warning:', err)
      }
    }
    checkAuth()
  }, [])

  // เมื่อสลับวิชาขณะที่ยังไม่ได้เริ่มสอบ ให้รีเซ็ตเวลาตามวิชานั้นๆ
  useEffect(() => {
    if (!isStarted) {
      setTimeLeft(currentMeta.durationMinutes * 60)
      setCurrentIdx(0)
      setSelectedAnswers({})
      setFlaggedQuestions({})
      setIsSubmitted(false)
      setExamResult(null)
    }
  }, [activeSubject, isStarted])

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

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleStartExam = () => {
    setTimeLeft(currentMeta.durationMinutes * 60)
    setCurrentIdx(0)
    setSelectedAnswers({})
    setFlaggedQuestions({})
    setIsSubmitted(false)
    setExamResult(null)
    setIsStarted(true)
  }

  const handleAnswerSelect = (questionId: string, answer: any) => {
    if (isSubmitted) return
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
    setValidationWarning(null)
  }

  const handleComplexToggle = (questionId: string, subId: string, value: 'yes' | 'no') => {
    if (isSubmitted) return
    setSelectedAnswers(prev => {
      const currentObj = prev[questionId] || {}
      return {
        ...prev,
        [questionId]: {
          ...currentObj,
          [subId]: value
        }
      }
    })
    setValidationWarning(null)
  }

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
  }

  const isQuestionAnswered = (q: ONetQuestion) => {
    const ans = selectedAnswers[q.id]
    if (ans === undefined || ans === null || ans === '') return false
    if (q.type === 'complex_mcq') {
      if (typeof ans !== 'object') return false
      const subKeys = q.subStatements?.map(s => s.id) || []
      return subKeys.every(k => ans[k] !== undefined)
    }
    return true
  }

  const handleSubmit = async (autoSubmit: boolean = false) => {
    if (!autoSubmit) {
      // ตรวจว่าตอบครบหรือยัง
      const unanswered = currentQuestions
        .filter(q => !isQuestionAnswered(q))
        .map(q => q.itemNumber)

      if (unanswered.length > 0) {
        setValidationWarning(`⚠️ ยังไม่ได้ตอบข้อ: ${unanswered.join(', ')} กรุณาตอบให้ครบก่อนส่งตรวจครับ`)
        return
      }
    }

    if (timerRef.current) clearInterval(timerRef.current)

    // คำนวณคะแนนตามเกณฑ์ สทศ.
    const result = evaluateONetSubjectExam(activeSubject, selectedAnswers)
    setExamResult(result)
    setIsSubmitted(true)
    setShowResultModal(true)

    // บันทึกผล Dual-Save (LocalStorage + Supabase)
    setSavingProgress(true)
    try {
      // 1. LocalStorage
      const localKey = 'master_m1_onet_results'
      const existing = localStorage.getItem(localKey)
      let list = existing ? JSON.parse(existing) : []
      list = list.filter((r: any) => r.subject !== activeSubject)
      list.push({
        subject: activeSubject,
        score: result.score,
        percentage: result.percentage,
        completedAt: new Date().toISOString()
      })
      localStorage.setItem(localKey, JSON.stringify(list))

      // 2. Award gamification badge if score >= 80%
      if (result.percentage >= 80) {
        awardBadge('onet_champion')
      }

      // 3. Supabase Sync
      if (userId) {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            subject: `onet_${activeSubject}`,
            moduleId: 'onet_mock_2570',
            completed: true,
            score: result.score,
            answers: selectedAnswers
          })
        })
      }
    } catch (err) {
      console.warn('O-NET result save error:', err)
    } finally {
      setSavingProgress(false)
    }
  }

  const answeredCount = currentQuestions.filter(q => isQuestionAnswered(q)).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-blue-50/20 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                แดชบอร์ด
              </Button>
            </Link>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-lg font-black bg-gradient-to-r from-orange-600 via-red-600 to-blue-600 bg-clip-text text-transparent">
                O-NET 2570 Mastery
              </span>
              <Badge variant="outline" className="text-[10px] font-bold border-orange-200 text-orange-700 bg-orange-50 hidden sm:inline-flex">
                สอบ ก.พ. 2570
              </Badge>
            </div>
          </div>

          {isStarted && !isSubmitted && (
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono font-bold text-sm border shadow-xs ${
              timeLeft < 300 
                ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              <Timer className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {!isStarted ? (
          /* ========================================================================= */
          /* 1. LOBBY / SUBJECT SELECTOR / TEST BLUEPRINT SPECS                         */
          /* ========================================================================= */
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/80 text-orange-800 text-xs font-bold border border-orange-200">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                มาตรฐาน สทศ. (NIETS) และหลักสูตรแกนกลางฯ ฉบับปรับปรุง 2560
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                สนามสอบจำลอง O-NET ป.6 (ปีการศึกษา 2569)
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                ฝึกทำข้อสอบเสมือนจริง จัดสอบปี 2570 ครบ 4 วิชาหลัก พร้อมระบบจับเวลา กระดาษฝนคำตอบ และเฉลยละเอียด 4 สเต็ป
              </p>
            </div>

            {/* Subject Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['math', 'science', 'thai', 'english'] as ONetSubject[]).map(sub => {
                const meta = ONET_SUBJECTS_CONFIG[sub]
                const isSelected = activeSubject === sub
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setActiveSubject(sub)}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                      isSelected
                        ? 'border-orange-500 bg-white shadow-md ring-2 ring-orange-500/20'
                        : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{meta.icon}</div>
                    <div className="font-bold text-slate-900 text-sm">{meta.nameTh}</div>
                    <div className="text-[11px] text-slate-500">{meta.totalQuestions} ข้อ • {meta.durationMinutes} นาที</div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Selected Subject Blueprint Card */}
            <Card className="border-slate-200 shadow-sm bg-white rounded-3xl overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${currentMeta.gradient} text-white p-6`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl">{currentMeta.icon}</span>
                      <CardTitle className="text-2xl font-extrabold">{currentMeta.nameTh} ({currentMeta.nameEn})</CardTitle>
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm">
                      เวลาสอบ {currentMeta.durationMinutes} นาที • {currentMeta.totalQuestions} ข้อ • คะแนนเต็ม {currentMeta.totalScore} คะแนน
                    </p>
                  </div>
                  <Badge className="bg-white/20 text-white hover:bg-white/30 border-0 text-xs">
                    ข้อสอบปี 2570
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    รูปแบบข้อสอบตาม Test Blueprint สทศ.
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentMeta.formatBreakdown.map((fmt, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-xs text-slate-800">{fmt.typeNameTh}</div>
                          <div className="text-[11px] text-slate-500">จำนวน {fmt.count} ข้อ (ข้อละ {fmt.scorePerItem} คะแนน)</div>
                        </div>
                        <Badge variant="secondary" className="font-mono font-bold text-xs bg-white border border-slate-200">
                          {fmt.totalScore} คะแนน
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    สาระการเรียนรู้และน้ำหนักคะแนน
                  </h3>
                  <div className="space-y-2.5">
                    {currentMeta.strands.map(st => (
                      <div key={st.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 text-xs">
                        <div className="flex justify-between font-bold text-slate-800 mb-1">
                          <span>{st.name}</span>
                          <span className="text-orange-600 font-mono">{st.weightPercent}%</span>
                        </div>
                        <div className="text-[11px] text-slate-500 leading-relaxed">
                          {st.standards.join(' • ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ระบบจะจับเวลาจริงและคำนวณคะแนนตามสถิติ สทศ.
                  </div>
                  <Button 
                    onClick={handleStartExam} 
                    size="lg" 
                    className="w-full sm:w-auto px-8 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-2xl shadow-md shadow-orange-500/20"
                  >
                    🚀 เริ่มสอบวิชา{currentMeta.nameTh} ({currentMeta.totalQuestions} ข้อ)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* ========================================================================= */
          /* 2. ACTIVE EXAM ROOM & REVIEW SUITE                                        */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left/Main Question Area (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {validationWarning && (
                <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  {validationWarning}
                </div>
              )}

              {currentQuestion && (
                <Card className="border-slate-200 bg-white rounded-3xl shadow-sm overflow-hidden">
                  <CardHeader className="bg-slate-50/80 border-b border-slate-100 p-5 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-slate-900 text-white text-xs px-2.5 py-1">
                        ข้อที่ {currentQuestion.itemNumber} / {currentQuestions.length}
                      </Badge>
                      <Badge variant="outline" className="text-[11px] font-mono border-slate-200 text-slate-600">
                        {currentQuestion.standardCode}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] text-slate-500">
                        {currentQuestion.points} คะแนน
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFlag(currentQuestion.id)}
                        className={`text-xs ${flaggedQuestions[currentQuestion.id] ? 'text-amber-600 bg-amber-50' : 'text-slate-400'}`}
                      >
                        <Flag className="w-3.5 h-3.5 mr-1" />
                        {flaggedQuestions[currentQuestion.id] ? 'ปักหมุดแล้ว' : 'ปักหมุดทบทวน'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReportQuestionId(currentQuestion.id)}
                        className="text-slate-400 hover:text-red-500 text-xs"
                      >
                        🚩 แจ้งจุดผิด
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Time Allocation Pace Coach */}
                    {!isSubmitted && (
                      <PaceCoach
                        currentQuestionIndex={currentIdx}
                        totalQuestions={currentQuestions.length}
                        recommendedSecondsPerQuestion={90}
                      />
                    )}

                    {/* Question Topic & Text */}
                    <div>
                      <div className="text-xs font-bold text-orange-600 mb-1">
                        {currentQuestion.topic}
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                        {currentQuestion.question}
                      </h2>
                    </div>

                    {/* Context Text if any */}
                    {currentQuestion.contextText && (
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
                        {currentQuestion.contextText}
                      </div>
                    )}

                    {/* ------------------------------------------------------------- */}
                    {/* TYPE A: Standard Multiple Choice (4 Options)                  */}
                    {/* ------------------------------------------------------------- */}
                    {currentQuestion.type === 'mcq' && currentQuestion.options && (
                      <div className="space-y-3">
                        {currentQuestion.options.map((opt, oIdx) => {
                          const isSelected = selectedAnswers[currentQuestion.id] === opt
                          const isCorrectOpt = isSubmitted && opt === currentQuestion.correctAnswer
                          const isWrongSelected = isSubmitted && isSelected && !isCorrectOpt

                          let borderStyle = 'border-slate-200 bg-white hover:border-orange-300'
                          if (isSubmitted) {
                            if (isCorrectOpt) borderStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500'
                            else if (isWrongSelected) borderStyle = 'border-red-500 bg-red-50 text-red-900 ring-1 ring-red-500'
                          } else if (isSelected) {
                            borderStyle = 'border-orange-500 bg-orange-50/70 text-orange-950 font-semibold ring-2 ring-orange-500/20'
                          }

                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={isSubmitted}
                              onClick={() => handleAnswerSelect(currentQuestion.id, opt)}
                              className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${borderStyle}`}
                            >
                              <div className="flex items-center gap-3 text-xs sm:text-sm">
                                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                              {isSubmitted && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                              {isSubmitted && isWrongSelected && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {/* ------------------------------------------------------------- */}
                    {/* TYPE B: Numeric Grid-in (ระบายตัวเลขคำตอบ)                      */}
                    {/* ------------------------------------------------------------- */}
                    {currentQuestion.type === 'grid_numeric' && (
                      <div className="p-5 bg-orange-50/40 rounded-2xl border border-orange-100 space-y-4">
                        <div className="text-xs font-bold text-orange-900 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-orange-600" />
                          กระดาษฝนคำตอบตัวเลข (Grid-in Numeric Answer)
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <div className="relative flex-1 w-full">
                            <input
                              type="text"
                              disabled={isSubmitted}
                              placeholder="พิมพ์คำตอบตัวเลข (เช่น 24 หรือ 3.8 หรือ 82000)"
                              value={selectedAnswers[currentQuestion.id] || ''}
                              onChange={e => handleAnswerSelect(currentQuestion.id, e.target.value)}
                              className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-xl font-mono text-base font-bold text-slate-900 outline-hidden focus:border-orange-500"
                            />
                          </div>
                          {isSubmitted && (
                            <div className="text-xs font-bold px-4 py-3 bg-white rounded-xl border border-slate-200">
                              เฉลยที่ถูกต้อง: <span className="text-emerald-600 font-mono font-black">{currentQuestion.correctAnswer as string}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">
                          💡 คำแนะนำ: สำหรับข้อสอบอัตนัยฝนตัวเลขของ สทศ. สามารถกรอกเป็นจำนวนเต็ม หรือทศนิยมไม่เกิน 2 ตำแหน่ง
                        </p>
                      </div>
                    )}

                    {/* ------------------------------------------------------------- */}
                    {/* TYPE C: Complex Multiple Choice (เลือกตอบเชิงซ้อน ใช่/ไม่ใช่)  */}
                    {/* ------------------------------------------------------------- */}
                    {currentQuestion.type === 'complex_mcq' && currentQuestion.subStatements && (
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-slate-600 mb-2">
                          พิจารณาข้อความย่อยทั้ง 3 ข้อ แล้วระบุ "ใช่" หรือ "ไม่ใช่":
                        </div>
                        {currentQuestion.subStatements.map(sub => {
                          const currentSubAns = selectedAnswers[currentQuestion.id]?.[sub.id]
                          const correctSubAns = (currentQuestion.correctAnswer as Record<string, string>)?.[sub.id]
                          
                          return (
                            <div key={sub.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <span className="text-xs sm:text-sm font-medium text-slate-800 flex-1">
                                {sub.statement}
                              </span>
                              <div className="flex gap-2 shrink-0">
                                <Button
                                  type="button"
                                  size="sm"
                                  disabled={isSubmitted}
                                  variant={currentSubAns === 'yes' ? 'default' : 'outline'}
                                  onClick={() => handleComplexToggle(currentQuestion.id, sub.id, 'yes')}
                                  className={`text-xs font-bold px-4 ${currentSubAns === 'yes' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                                >
                                  {isSubmitted && correctSubAns === 'yes' ? '✓ ใช่' : 'ใช่'}
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  disabled={isSubmitted}
                                  variant={currentSubAns === 'no' ? 'default' : 'outline'}
                                  onClick={() => handleComplexToggle(currentQuestion.id, sub.id, 'no')}
                                  className={`text-xs font-bold px-4 ${currentSubAns === 'no' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}`}
                                >
                                  {isSubmitted && correctSubAns === 'no' ? '✓ ไม่ใช่' : 'ไม่ใช่'}
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* ------------------------------------------------------------- */}
                    {/* TYPE D: Ordering / Written Response                           */}
                    {/* ------------------------------------------------------------- */}
                    {currentQuestion.type === 'ordering' && currentQuestion.options && (
                      <div className="space-y-3">
                        {currentQuestion.options.map((opt, oIdx) => {
                          const isSelected = selectedAnswers[currentQuestion.id] === opt
                          const isCorrectOpt = isSubmitted && opt === currentQuestion.correctAnswer
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={isSubmitted}
                              onClick={() => handleAnswerSelect(currentQuestion.id, opt)}
                              className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-50/70 text-blue-950 font-bold'
                                  : 'border-slate-200 bg-white hover:border-blue-300'
                              } ${isSubmitted && isCorrectOpt ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold' : ''}`}
                            >
                              <span className="text-xs sm:text-sm">{opt}</span>
                              {isSubmitted && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {currentQuestion.type === 'written' && (
                      <div className="space-y-3">
                        <textarea
                          rows={6}
                          disabled={isSubmitted}
                          placeholder="เขียนบรรยายเล่าเรื่องตามจินตนาการ (ความยาว 4-7 บรรทัด)..."
                          value={selectedAnswers[currentQuestion.id] || ''}
                          onChange={e => handleAnswerSelect(currentQuestion.id, e.target.value)}
                          className="w-full p-4 bg-white border-2 border-blue-200 rounded-2xl text-xs sm:text-sm text-slate-900 outline-hidden focus:border-blue-500 font-serif leading-relaxed"
                        />
                        {isSubmitted && currentQuestion.sampleAnswer && (
                          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                            <div className="text-xs font-bold text-emerald-800">🌟 ตัวอย่างงานเขียนระดับคะแนนเต็ม 15/15:</div>
                            <p className="text-xs text-slate-700 leading-relaxed font-serif">{currentQuestion.sampleAnswer}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ------------------------------------------------------------- */}
                    {/* EXPLANATION ACCORDION (Visible in Review Mode)               */}
                    {/* ------------------------------------------------------------- */}
                    {isSubmitted && (
                      <div className="mt-6 pt-6 border-t border-slate-100 space-y-4 bg-slate-50/60 p-5 rounded-2xl">
                        <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                          <BookOpen className="w-4 h-4 text-orange-600" />
                          เฉลยละเอียด 4 สเต็ปมาตรฐาน
                        </div>

                        <div className="space-y-3 text-xs leading-relaxed">
                          <div className="p-3 bg-white rounded-xl border border-slate-200/70">
                            <span className="font-bold text-blue-700">💡 1. หลักการสำคัญ: </span>
                            <span className="text-slate-700">{currentQuestion.explanation.principle}</span>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-slate-200/70">
                            <span className="font-bold text-slate-800">📝 2. ขั้นตอนวิธีทำ: </span>
                            <p className="text-slate-700 mt-1 whitespace-pre-line font-mono">{currentQuestion.explanation.steps}</p>
                          </div>

                          {currentQuestion.explanation.shortcut && (
                            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-amber-900 font-semibold">
                              <span>⚡ 3. สูตรลัดคิดเร็ว: </span>
                              <span>{currentQuestion.explanation.shortcut}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Prev / Next Navigation Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentIdx === 0}
                        onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                        className="text-xs"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        ข้อก่อนหน้า
                      </Button>

                      {currentIdx < currentQuestions.length - 1 ? (
                        <Button
                          size="sm"
                          onClick={() => setCurrentIdx(prev => Math.min(currentQuestions.length - 1, prev + 1))}
                          className="bg-slate-900 text-white hover:bg-slate-800 text-xs px-4"
                        >
                          ข้อถัดไป
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      ) : (
                        !isSubmitted && (
                          <Button
                            size="sm"
                            onClick={() => handleSubmit(false)}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs px-6 shadow-md"
                          >
                            ✓ ส่งตรวจข้อสอบ
                          </Button>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Sidebar / Question Navigator (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="border-slate-200 bg-white rounded-3xl shadow-sm sticky top-20">
                <CardHeader className="p-5 border-b border-slate-100">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-orange-600" />
                      แถบข้อสอบ ({answeredCount}/{currentQuestions.length} ข้อ)
                    </CardTitle>
                    <Badge variant="secondary" className="text-[10px]">
                      {currentMeta.nameTh}
                    </Badge>
                  </div>
                  <Progress value={(answeredCount / currentQuestions.length) * 100} className="h-1.5 mt-2" />
                </CardHeader>

                <CardContent className="p-5 space-y-5">
                  <div className="grid grid-cols-5 gap-2">
                    {currentQuestions.map((q, idx) => {
                      const isCurrent = currentIdx === idx
                      const isAnswered = isQuestionAnswered(q)
                      const isFlagged = flaggedQuestions[q.id]
                      const itemRes = examResult?.itemResults.find(r => r.questionId === q.id)

                      let btnStyle = 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400'
                      if (isSubmitted && itemRes) {
                        if (itemRes.isCorrect) btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold'
                        else btnStyle = 'bg-red-500 text-white border-red-600 font-bold'
                      } else if (isAnswered) {
                        btnStyle = 'bg-orange-500 text-white border-orange-600 font-bold shadow-xs'
                      }

                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => setCurrentIdx(idx)}
                          className={`h-10 rounded-xl border text-xs font-mono font-bold flex items-center justify-center relative transition-all ${btnStyle} ${
                            isCurrent ? 'ring-2 ring-slate-900 ring-offset-1' : ''
                          }`}
                        >
                          {idx + 1}
                          {isFlagged && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-orange-500 shrink-0" />
                      <span>ตอบแล้ว ({answeredCount} ข้อ)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300 shrink-0" />
                      <span>ยังไม่ได้ตอบ ({currentQuestions.length - answeredCount} ข้อ)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                      <span>ปักหมุดทบทวน</span>
                    </div>
                  </div>

                  {!isSubmitted ? (
                    <Button
                      onClick={() => handleSubmit(false)}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl py-5 shadow-md shadow-emerald-600/20"
                    >
                      ✓ ส่งตรวจข้อสอบ ({currentMeta.nameTh})
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsStarted(false)
                        setIsSubmitted(false)
                        setExamResult(null)
                      }}
                      variant="outline"
                      className="w-full border-slate-200 text-slate-700 font-bold rounded-xl"
                    >
                      <RotateCcw className="w-4 h-4 mr-1.5" />
                      เลือกวิชาอื่น / ทำใหม่
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 3. SCORE RESULT DIALOG POPUP (RULE 6 COMPLIANT)                           */}
      {/* ========================================================================= */}
      <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
        <DialogContent className="max-w-xl p-0 overflow-hidden rounded-3xl border-0 shadow-2xl bg-white">
          <div className={`p-6 text-white text-center bg-gradient-to-r ${currentMeta.gradient}`}>
            <Trophy className="w-12 h-12 mx-auto mb-2 drop-shadow-md text-amber-300 animate-bounce" />
            <DialogTitle className="text-2xl font-black text-white">
              ผลการสอบ O-NET 2570: {currentMeta.nameTh}
            </DialogTitle>
            <DialogDescription className="text-white/80 text-xs mt-1">
              คำนวณคะแนนตามสัดส่วนและมาตรฐาน สทศ. (ปีการศึกษา 2569 สอบ 2570)
            </DialogDescription>
          </div>

          <div className="p-6 space-y-6">
            {/* Score Big Display */}
            <div className="text-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-4xl font-black text-slate-900 font-mono tracking-tight">
                {examResult?.score} <span className="text-lg text-slate-400 font-normal">/ {examResult?.maxScore} คะแนน</span>
              </div>
              <div className="text-xs font-bold text-orange-600 mt-1">
                คิดเป็น {examResult?.percentage}% • {examResult?.gradeLevel}
              </div>
              <p className="text-xs text-slate-600 mt-2 px-4 leading-relaxed font-medium">
                {examResult?.recommendation}
              </p>
            </div>

            {/* Strand Scores Breakdown */}
            {examResult?.strandScores && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  คะแนนแยกตามสาระการเรียนรู้
                </h4>
                {Object.entries(examResult.strandScores).map(([k, val]) => (
                  <div key={k} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{k}</span>
                      <span className="font-mono text-orange-600">{val.percentage}% ({val.earned}/{val.total} คะแนน)</span>
                    </div>
                    <Progress value={val.percentage} className="h-1.5" />
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowResultModal(false)}
                className="flex-1 border-slate-200 text-slate-700 font-bold rounded-xl"
              >
                ดูเฉลยละเอียดรายข้อ
              </Button>
              <Button
                onClick={() => {
                  setShowResultModal(false)
                  setIsStarted(false)
                  setIsSubmitted(false)
                }}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl"
              >
                สอบวิชาต่อไป ➔
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bug Reporting Modal (Rule 4) */}
      <ReportModal
        isOpen={!!reportQuestionId}
        onClose={() => setReportQuestionId(null)}
        subject={`onet_${activeSubject}`}
        moduleId="onet_mock_2570"
        questionId={reportQuestionId || ''}
        contextTitle={`ข้อสอบ O-NET 2570 วิชา${currentMeta.nameTh} ข้อที่ ${currentQuestion?.itemNumber || 1}`}
        userId={userId}
      />

      <Footer />
    </div>
  )
}
