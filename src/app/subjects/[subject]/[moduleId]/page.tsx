'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LESSONS_DATA, LessonData, PracticeQuestion } from '@/lib/lessons-data'
import { DYNAMIC_QUESTION_POOL } from '@/lib/dynamic-quiz-pool'
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
import AiTutorChat from '@/components/AiTutorChat'
import AudioLessonPlayer from '@/components/AudioLessonPlayer'
import Footer from '@/components/Footer'
import { soundFX } from '@/lib/sound-fx'
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
  Flag,
  AlertCircle,
  Award
} from 'lucide-react'

const SUBJECT_CONFIG: Record<string, { label: string; gradient: string; text: string; bg: string }> = {
  math:    { label: 'คณิตศาสตร์', gradient: 'from-orange-500 via-amber-500 to-red-500', text: 'text-orange-600', bg: 'bg-orange-50' },
  science: { label: 'วิทยาศาสตร์', gradient: 'from-red-500 via-orange-500 to-amber-500', text: 'text-red-600', bg: 'bg-red-50' },
  english: { label: 'ภาษาอังกฤษ',  gradient: 'from-amber-500 via-orange-500 to-red-500', text: 'text-amber-600', bg: 'bg-amber-50' },
  thai:    { label: 'ภาษาไทย',    gradient: 'from-amber-500 via-orange-500 to-red-500', text: 'text-amber-600', bg: 'bg-amber-50' },
}

export default function LessonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const subject = (params.subject as string) || 'math'
  const moduleId = (params.moduleId as string) || 'numbers_basics'

  const lesson: LessonData | undefined = LESSONS_DATA[subject]?.[moduleId]

  // Calculate Next Module
  const subjectModuleKeys = Object.keys(LESSONS_DATA[subject] || {})
  const currentIndex = subjectModuleKeys.indexOf(moduleId)
  const nextModuleId = currentIndex >= 0 && currentIndex < subjectModuleKeys.length - 1 ? subjectModuleKeys[currentIndex + 1] : null
  const nextModuleData = nextModuleId ? LESSONS_DATA[subject]?.[nextModuleId] : null

  const [currentTab, setCurrentTab] = useState<'content' | 'quiz'>('content')
  const [questions, setQuestions] = useState<PracticeQuestion[]>(lesson?.practiceQuestions || [])
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [submittedQuiz, setSubmittedQuiz] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)
  const [validationWarning, setValidationWarning] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [savingProgress, setSavingProgress] = useState(false)
  const [generatingAI, setGeneratingAI] = useState(false)
  const [aiSource, setAiSource] = useState<string>('คลังข้อสอบมาตรฐาน (Curated Bank)')

  // Report Modal State
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [reportQuestionId, setReportQuestionId] = useState<string | undefined>(undefined)
  const [reportContextTitle, setReportContextTitle] = useState<string | undefined>(undefined)

  // VIP Gifted Mode & 90%+ Merit Unlock System
  const [isVipUnlocked, setIsVipUnlocked] = useState<boolean>(false)
  const [highestScore, setHighestScore] = useState<number>(0)
  const [showVipCelebration, setShowVipCelebration] = useState<boolean>(false)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        setUserId(data.user.id)
        try {
          const { data: profile } = await supabase.from('profiles').select('school_target, is_vip').eq('id', data.user.id).maybeSingle()
          if (profile?.school_target === 'vip' || (profile as any)?.is_vip === true) {
            setIsVipUnlocked(true)
          }
          const { data: prog } = await supabase.from('progress').select('score').eq('user_id', data.user.id).eq('subject', subject)
          if (prog && prog.length > 0) {
            const maxS = Math.max(...prog.map((p: any) => p.score || 0))
            setHighestScore(maxS)
            if (maxS >= 90) setIsVipUnlocked(true)
          }
        } catch (err) {
          console.warn('VIP check warning:', err)
        }
      }
    })

    // Local Storage check for offline / immediate VIP unlock
    try {
      const localVip = localStorage.getItem(`master_m1_vip_unlocked_${subject}`) || localStorage.getItem('master_m1_is_vip')
      if (localVip === 'true') setIsVipUnlocked(true)
      const storedProg = localStorage.getItem('master_m1_progress')
      if (storedProg) {
        const list: any[] = JSON.parse(storedProg)
        const subList = list.filter((p: any) => p.subject === subject)
        if (subList.length > 0) {
          const maxS = Math.max(...subList.map((p: any) => p.score || 0))
          setHighestScore(prev => Math.max(prev, maxS))
          if (maxS >= 90) setIsVipUnlocked(true)
        }
      }
    } catch (e) {
      console.warn('Local VIP check warning:', e)
    }

    if (lesson) {
      const extraSets = DYNAMIC_QUESTION_POOL[subject]?.[moduleId] || []
      const setB = extraSets[0] || []
      const vipList = lesson.vipQuestions || []
      const combined = [...(lesson.practiceQuestions || []), ...setB, ...vipList]
      setQuestions(combined.length > 0 ? combined : (lesson.practiceQuestions || []))
    }
  }, [subject, moduleId, lesson])

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
    setValidationWarning(null)
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
    // Check if all questions are answered
    const unansweredIndices: number[] = []
    questions.forEach((q, idx) => {
      if (!selectedAnswers[q.id]) {
        unansweredIndices.push(idx + 1)
      }
    })

    if (unansweredIndices.length > 0) {
      soundFX.playWrong()
      setValidationWarning(`⚠️ คุณยังไม่ได้ตอบข้อ ${unansweredIndices.join(', ')} (ตอบแล้ว ${Object.keys(selectedAnswers).length}/${questions.length} ข้อ) กรุณาเลือกคำตอบให้ครบก่อนส่งตรวจครับ`)
      return
    }

    setValidationWarning(null)
    setSubmittedQuiz(true)
    setShowScoreModal(true)
    const scoreObj = calculateScore()
    setHighestScore(prev => Math.max(prev, scoreObj.percentage))

    // 🌟 Check 90%+ Merit VIP Unlock
    if (scoreObj.percentage >= 90) {
      setIsVipUnlocked(true)
      setShowVipCelebration(true)
      try {
        localStorage.setItem(`master_m1_vip_unlocked_${subject}`, 'true')
        localStorage.setItem('master_m1_is_vip', 'true')
      } catch (e) {}
      soundFX.playFanfare()
    } else if (scoreObj.percentage >= 70) {
      soundFX.playFanfare()
    } else {
      soundFX.playCorrect()
    }
    setSavingProgress(true)

    // 1. Always save to LocalStorage for instant and reliable offline/client persistence
    try {
      const stored = localStorage.getItem('master_m1_progress')
      const progressList: Array<{ subject: string; moduleId: string; score: number; completed: boolean; completed_at: string }> = stored ? JSON.parse(stored) : []
      const existingIdx = progressList.findIndex(p => p.subject === subject && p.moduleId === moduleId)
      const newItem = {
        subject,
        moduleId,
        score: scoreObj.percentage,
        completed: true,
        completed_at: new Date().toISOString()
      }
      if (existingIdx >= 0) {
        progressList[existingIdx] = {
          ...progressList[existingIdx],
          score: Math.max(progressList[existingIdx].score || 0, scoreObj.percentage),
          completed: true
        }
      } else {
        progressList.push(newItem)
      }
      localStorage.setItem('master_m1_progress', JSON.stringify(progressList))
    } catch (lsErr) {
      console.warn('LocalStorage save error:', lsErr)
    }

    // 2. Sync with Supabase Database
    try {
      const { data: authData } = await supabase.auth.getUser()
      const currentUserId = authData?.user?.id || userId
      if (currentUserId) {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUserId,
            subject,
            moduleId,
            score: scoreObj.percentage
          })
        })
      }
    } catch (err) {
      console.warn('Progress sync warning:', err)
    } finally {
      setSavingProgress(false)
    }
  }

  const resetQuiz = () => {
    setSelectedAnswers({})
    setSubmittedQuiz(false)
    setShowScoreModal(false)
    setValidationWarning(null)
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
            {/* Audio Lesson Masterclass Player */}
            <AudioLessonPlayer subject={subject} moduleId={moduleId} />

            {/* VIP Gifted Mastery Vault (Unlocked vs Locked based on 90%+ Merit) */}
            {lesson.vipTricks && lesson.vipTricks.length > 0 && (
              isVipUnlocked ? (
                <Card className="border-2 border-amber-400 shadow-xl bg-gradient-to-br from-amber-500/10 via-amber-100/30 to-orange-50/50 rounded-3xl overflow-hidden animate-fade-in">
                  <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 p-1.5" />
                  <CardHeader className="pb-2 pt-6 px-6">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <CardTitle className="flex items-center gap-2 text-amber-950 font-black text-lg sm:text-xl">
                        <div className="bg-gradient-to-tr from-amber-500 to-yellow-500 text-white p-2 rounded-xl shadow-md text-lg">
                          👑
                        </div>
                        คลังเทคนิคขั้นเทพ & สูตรลัด สสวท. (VIP Gifted Track)
                      </CardTitle>
                      <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-black text-[11px] px-3 py-1 shadow-xs border border-amber-300">
                        👑 VIP UNLOCKED (สิทธิ์พิเศษ)
                      </Badge>
                    </div>
                    <div className="text-amber-900 text-xs sm:text-sm font-semibold mt-1 bg-white/90 p-3 rounded-xl border border-amber-200 flex items-center justify-between flex-wrap gap-2">
                      <span>💎 สูตรลัดและความรู้เกินหลักสูตรระดับ ม.ต้น สำหรับเตรียมสอบเข้าห้องพิเศษ Gifted & สสวท.</span>
                      <span className="text-amber-700 text-xs font-black bg-amber-100 px-2.5 py-1 rounded-lg">✨ ปลดล็อกแล้วด้วยคะแนน ≥ 90%</span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="space-y-3 mt-1">
                      {lesson.vipTricks.map((trick, idx) => (
                        <div key={idx} className="bg-white/95 p-4 rounded-2xl border border-amber-300 shadow-xs text-xs sm:text-sm text-slate-800 font-medium leading-relaxed flex items-start gap-3">
                          <span className="text-amber-600 text-base shrink-0">⚡</span>
                          <span>{trick}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-dashed border-amber-400/80 shadow-md bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-white rounded-3xl overflow-hidden p-6 sm:p-7">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shrink-0 border border-amber-300 shadow-xs">
                        🔒
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-black text-slate-900 text-base sm:text-lg">
                            คลังสูตรลัดมหาเทพ 3 วินาที (VIP Gifted Vault)
                          </h4>
                          <Badge className="bg-amber-200 text-amber-900 font-black text-[10px]">
                            🔒 ล็อกอยู่
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                          ปลดล็อกสูตรลัด 3 วินาที และข้อสอบแข่งขัน สสวท. ฟรี! เพียงทำคะแนนแบบฝึกหัดท้ายบทให้ได้ <span className="font-black text-amber-700">90% ขึ้นไป</span>
                        </p>
                        <div className="mt-2.5 flex items-center gap-2">
                          <div className="w-36 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(100, (highestScore / 90) * 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-amber-900">
                            คะแนนสูงสุด: {highestScore}% / 90%
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setCurrentTab('quiz')}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white font-black text-xs px-5 py-5 rounded-xl shadow-md shrink-0 w-full sm:w-auto"
                    >
                      🚀 ไปทำแบบฝึกหัดเพื่อปลดล็อก VIP →
                    </Button>
                  </div>
                </Card>
              )
            )}

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
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-orange-700">คำถามข้อที่ {qIndex + 1} จาก {questions.length}</span>
                        {q.isVipExclusive && (
                          <Badge className="bg-amber-400 text-amber-950 font-black text-[10px] px-2 py-0.5 shadow-xs">
                            👑 VIP Gifted สสวท.
                          </Badge>
                        )}
                      </div>
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
                {validationWarning && (
                  <div className="mb-4 p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-red-900 text-sm font-semibold flex items-center justify-center gap-2 max-w-lg mx-auto animate-pulse">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span>{validationWarning}</span>
                  </div>
                )}

                <Button
                  size="lg"
                  onClick={handleFinishLesson}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-10 py-6 rounded-2xl shadow-xl shadow-orange-500/25 transition-all hover:scale-105"
                >
                  {savingProgress ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" /> กำลังบันทึกคะแนน...
                    </span>
                  ) : (
                    `✅ ส่งคำตอบ & ตรวจแบบฝึกหัด (${Object.keys(selectedAnswers).length}/${questions.length})`
                  )}
                </Button>
                {Object.keys(selectedAnswers).length < questions.length && (
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    ตอบแล้ว {Object.keys(selectedAnswers).length} จาก {questions.length} ข้อ (กดปุ่มเพื่อตรวจหรือดูข้อที่ยังไม่ได้ทำ)
                  </p>
                )}
              </div>
            ) : (
              <Card className="border-2 border-orange-300 shadow-2xl bg-gradient-to-br from-white via-orange-50/40 to-amber-50 rounded-3xl p-6 sm:p-8 text-center">
                <div className="text-6xl mb-3 animate-bounce">
                  {scoreResult.percentage >= 80 ? '🌟 🏆 🌟' : scoreResult.percentage >= 60 ? '👍 🎯' : '💪 📚'}
                </div>

                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full mb-3 text-xs font-black shadow-sm tracking-wide uppercase ${scoreResult.percentage >= 60 ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-amber-100 text-amber-900 border border-amber-300'}">
                  {scoreResult.percentage >= 60 ? '✅ ผ่านเกณฑ์บทเรียนแล้ว (บันทึกสำเร็จ)' : '⚠️ ยังไม่ผ่านเกณฑ์ (ต้องได้ 60% ขึ้นไป)'}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
                  {scoreResult.percentage === 100
                    ? 'ยอดเยี่ยมมาก! คะแนนเต็ม 100%'
                    : scoreResult.percentage >= 80
                    ? 'เก่งมาก! ผ่านเกณฑ์ระดับยอดเยี่ยม'
                    : scoreResult.percentage >= 60
                    ? 'ทำได้ดี! ผ่านเกณฑ์มาตรฐาน'
                    : 'พยายามอีกนิด! ทบทวนแล้วลุยใหม่'}
                </h3>

                <p className="text-sm text-slate-600 mb-4 font-medium">
                  คุณทำแบบฝึกหัดได้: <span className="font-black text-orange-600 text-2xl">{scoreResult.correct} จาก {scoreResult.total} ข้อ</span>{' '}
                  <span className="text-slate-500 font-bold">({scoreResult.percentage}%)</span>
                </p>

                <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/80 border border-orange-200 text-xs text-slate-700 leading-relaxed font-medium mb-6 shadow-sm">
                  {scoreResult.percentage >= 60
                    ? '🎉 ระบบได้บันทึกความก้าวหน้านี้ลงใน Dashboard และปลดล็อกสถิติของบทเรียนนี้เรียบร้อยแล้วครับ สามารถไปต่อบทถัดไปได้เลย!'
                    : '💡 ลองดูเฉลยละเอียดและเทคนิคคิดลัดด้านบน เพื่อทำความเข้าใจแล้วกด "ลองทำซ้ำ" เพื่อเก็บคะแนนให้ผ่านเกณฑ์นะ!'}
                </div>

                <div className="flex flex-wrap gap-3 justify-center max-w-xl mx-auto">
                  {nextModuleId && nextModuleData && (
                    <Link href={`/subjects/${subject}/${nextModuleId}`} className="w-full">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6 rounded-2xl shadow-lg shadow-orange-500/25 text-sm sm:text-base"
                      >
                        ➡️ ไปต่อโมดูลถัดไป: {nextModuleData.title} <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    </Link>
                  )}

                  <Link href="/dashboard" className="flex-1 min-w-[160px]">
                    <Button
                      variant="outline"
                      className="w-full border-orange-200 text-orange-800 hover:bg-orange-100 font-bold text-xs sm:text-sm py-5 rounded-xl shadow-sm"
                    >
                      <Trophy className="w-4 h-4 mr-1.5 text-orange-600" /> ดู Dashboard
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    onClick={resetQuiz}
                    className="flex-1 min-w-[160px] border-orange-200 text-orange-800 hover:bg-orange-100 font-bold text-xs sm:text-sm py-5 rounded-xl shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4 mr-1.5 text-orange-600" /> ลองทำซ้ำอีกครั้ง
                  </Button>

                  <Button
                    onClick={handleGenerateAIQuiz}
                    disabled={generatingAI}
                    className="flex-1 min-w-[160px] bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm py-5 rounded-xl shadow-sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-1.5" /> สุ่มโจทย์ใหม่ด้วย AI
                  </Button>

                  <Link href={`/subjects/${subject}`} className="flex-1 min-w-[160px]">
                    <Button
                      variant="ghost"
                      className="w-full text-slate-600 hover:text-orange-600 hover:bg-orange-50 font-bold text-xs sm:text-sm py-5 rounded-xl"
                    >
                      ← หน้ารวมวิชา{subjectInfo.label}
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>

      {/* Score Result Popup Dialog */}
      <Dialog open={showScoreModal} onOpenChange={setShowScoreModal}>
        <DialogContent className="sm:max-w-md bg-white border-2 border-orange-200 rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
          <DialogHeader className="text-center">
            <div className="text-6xl mb-2 animate-bounce">
              {scoreResult.percentage >= 80 ? '🌟 🏆 🌟' : scoreResult.percentage >= 60 ? '👍 🎯' : '💪 📚'}
            </div>
            <DialogTitle className="text-2xl font-black text-slate-900 text-center">
              {scoreResult.percentage === 100
                ? 'ยอดเยี่ยมมาก! คะแนนเต็ม 100%'
                : scoreResult.percentage >= 80
                ? 'เก่งมาก! ผ่านเกณฑ์ระดับยอดเยี่ยม'
                : scoreResult.percentage >= 60
                ? 'ทำได้ดี! ผ่านเกณฑ์พื้นฐาน'
                : 'พยายามอีกนิด! ทบทวนแล้วลุยใหม่'}
            </DialogTitle>
            <DialogDescription className="text-slate-600 text-center pt-2">
              คุณทำแบบฝึกหัดบทนี้ได้{' '}
              <span className="text-orange-600 font-black text-xl">
                {scoreResult.correct} / {scoreResult.total}
              </span>{' '}
              ข้อ ({scoreResult.percentage}%)
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 p-4 rounded-2xl bg-orange-50 border border-orange-100 text-xs text-orange-950 font-medium leading-relaxed space-y-2">
            {scoreResult.percentage >= 90 && (
              <div className="p-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-sm animate-pulse">
                <span>👑</span>
                <span>ยินดีด้วย! ปลดล็อกสิทธิ์ VIP Gifted & คลังสูตรลัด 3 วิ สำเร็จแล้ว!</span>
              </div>
            )}
            <p>
              {scoreResult.percentage >= 80
                ? '🎉 ความรู้ของคุณแน่นมาก พร้อมลุยข้อสอบบทต่อไปหรือสุ่มโจทย์ท้าทายเพิ่มได้เลย!'
                : '💡 ลองดูเฉลยละเอียดและเทคนิคคิดลัดด้านล่าง เพื่ออุดจุดที่พลาดแล้วลองทำใหม่อีกครั้งนะ!'}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 mt-2">
            <Button
              onClick={() => setShowScoreModal(false)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-5 rounded-xl shadow-md shadow-orange-500/20"
            >
              🔍 ปิดหน้าต่าง & ดูเฉลยละเอียดทีละข้อ
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={resetQuiz}
                className="flex-1 border-orange-200 text-orange-800 hover:bg-orange-50 font-semibold text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> ทำซ้ำ
              </Button>
              <Link href={`/subjects/${subject}`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-orange-200 text-orange-800 hover:bg-orange-50 font-semibold text-xs"
                >
                  <Trophy className="w-3.5 h-3.5 mr-1" /> หน้ารายวิชา
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating AI Tutor Chatbot */}
      <AiTutorChat 
        subject={subject} 
        moduleId={moduleId} 
        lessonTitle={lesson.title} 
      />

      <Footer />
    </div>
  )
}
