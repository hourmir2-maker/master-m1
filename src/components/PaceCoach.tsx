'use client'

import { useState, useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Timer, AlertTriangle, CheckCircle2, Sparkles, X } from 'lucide-react'

interface PaceCoachProps {
  currentQuestionIndex: number
  totalQuestions: number
  recommendedSecondsPerQuestion?: number // default 90s (1.5 mins)
  onPaceWarning?: (timeSpent: number) => void
}

export default function PaceCoach({
  currentQuestionIndex,
  totalQuestions,
  recommendedSecondsPerQuestion = 90
}: PaceCoachProps) {
  const [secondsSpent, setSecondsSpent] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [isDismissedForQuestion, setIsDismissedForQuestion] = useState(false)
  const prevIndexRef = useRef(currentQuestionIndex)

  // Reset timer on question change
  useEffect(() => {
    if (prevIndexRef.current !== currentQuestionIndex) {
      setSecondsSpent(0)
      setShowWarning(false)
      setIsDismissedForQuestion(false)
      prevIndexRef.current = currentQuestionIndex
    }
  }, [currentQuestionIndex])

  // Count seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSpent(prev => {
        const next = prev + 1
        if (next >= recommendedSecondsPerQuestion && !isDismissedForQuestion) {
          setShowWarning(true)
        }
        return next
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [recommendedSecondsPerQuestion, isDismissedForQuestion])

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const getPaceStatus = () => {
    if (secondsSpent < recommendedSecondsPerQuestion * 0.5) {
      return { label: '⚡ สปีดเร็วมาก', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
    }
    if (secondsSpent < recommendedSecondsPerQuestion) {
      return { label: '⏱️ จังหวะกำลังดี', color: 'bg-blue-100 text-blue-800 border-blue-300' }
    }
    return { label: '⚠️ ใช้เวลาเกินเกณฑ์', color: 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse' }
  }

  const pace = getPaceStatus()

  return (
    <div className="flex flex-col gap-2">
      {/* Live Question Pace Meter */}
      <div className="flex items-center justify-between gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
          <Timer className="w-3.5 h-3.5 text-orange-500" />
          <span>เวลาข้อนี้: <strong className="text-slate-900 font-mono">{formatTime(secondsSpent)}</strong></span>
        </div>
        <Badge className={`text-[10px] font-bold px-2 py-0.5 border ${pace.color}`}>
          {pace.label}
        </Badge>
      </div>

      {/* Gentle Pace Coaching Alert Banner */}
      {showWarning && !isDismissedForQuestion && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-3 rounded-2xl shadow-lg border border-white/40 animate-bounce-in flex items-start justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="p-1 bg-white/20 rounded-lg shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <h5 className="font-black text-amber-100 flex items-center gap-1">
                โค้ชจับเวลาเตือนจังหวะ <Sparkles className="w-3 h-3 text-amber-300" />
              </h5>
              <p className="text-[11px] text-white/90 leading-relaxed mt-0.5">
                ข้อนี้ใช้เวลาเกิน {Math.round(recommendedSecondsPerQuestion / 60)} นาทีแล้ว (เกณฑ์สอบจริงแนะนำ $\le 1.5$ นาที/ข้อ) แนะนำลองตัดช้อยส์ที่ไม่ใช่ แล้วข้ามไปทำข้ออื่นก่อนนะลูก!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowWarning(false)
              setIsDismissedForQuestion(true)
            }}
            className="text-white/70 hover:text-white p-1 rounded-md"
            title="ปิดการแจ้งเตือนข้อนี้"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
