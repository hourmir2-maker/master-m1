'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Coffee, Eye, GlassWater, Dumbbell, Timer, CheckCircle2, Play } from 'lucide-react'

const BREAK_INTERVAL_MINUTES = 25 // เตือนพักทุกๆ 25 นาทีตามหลัก Pomodoro
const BREAK_DURATION_SECONDS = 5 * 60 // พัก 5 นาที

const HEALTHY_TIPS = [
  {
    icon: Eye,
    title: 'กฎพักสายตา 20-20-20',
    desc: 'มองออกไปไกลๆ ประมาณ 20 ฟุต (6 เมตร) เป็นเวลา 20 วินาที เพื่อคลายกล้ามเนื้อตา',
    color: 'text-blue-500 bg-blue-50 border-blue-200'
  },
  {
    icon: GlassWater,
    title: 'ดื่มน้ำเปล่า 1 แก้ว 💧',
    desc: 'น้ำช่วยให้เซลล์สมองทำงานได้ไวขึ้น 14% และลดอาการง่วงนอน',
    color: 'text-sky-500 bg-sky-50 border-sky-200'
  },
  {
    icon: Dumbbell,
    title: 'ยืดเหยียดร่างกาย 🧘‍♂️',
    desc: 'หมุนหัวไหล่ เอียงคอซ้าย-ขวาเบาๆ เพื่อให้เลือดไหลเวียนไปเลี้ยงสมองได้ดีขึ้น',
    color: 'text-amber-500 bg-amber-50 border-amber-200'
  }
]

export default function SmartBreakReminder() {
  const [showModal, setShowModal] = useState(false)
  const [breakTimeLeft, setBreakTimeLeft] = useState(BREAK_DURATION_SECONDS)
  const [isBreakActive, setIsBreakActive] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    // นับเวลาการเรียน 25 นาที
    const sessionTimer = setInterval(() => {
      // ตรวจสอบว่าน้องกำลังทำอะไรอยู่ ถ้าครบ 25 นาทีให้เปิดเตือน
      setShowModal(true)
      setIsBreakActive(true)
      setBreakTimeLeft(BREAK_DURATION_SECONDS)
      setTipIndex(Math.floor(Math.random() * HEALTHY_TIPS.length))
    }, BREAK_INTERVAL_MINUTES * 60 * 1000)

    return () => clearInterval(sessionTimer)
  }, [])

  useEffect(() => {
    let countdown: NodeJS.Timeout | null = null
    if (isBreakActive && breakTimeLeft > 0) {
      countdown = setInterval(() => {
        setBreakTimeLeft(prev => {
          if (prev <= 1) {
            setIsBreakActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (countdown) clearInterval(countdown)
    }
  }, [isBreakActive, breakTimeLeft])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleResume = () => {
    setShowModal(false)
    setIsBreakActive(false)
  }

  const currentTip = HEALTHY_TIPS[tipIndex] || HEALTHY_TIPS[0]
  const TipIcon = currentTip.icon

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-md bg-gradient-to-br from-orange-50 via-white to-sky-50 border-2 border-orange-200 rounded-3xl p-6 shadow-2xl text-center">
        <DialogHeader className="items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-orange-500/25 mb-2 animate-bounce">
            🍵
          </div>
          <DialogTitle className="text-xl font-black text-slate-800 flex items-center gap-2">
            <span>พักสมองและสายตา 5 นาทีกันเถอะ!</span>
          </DialogTitle>
          <p className="text-xs text-slate-500 font-medium">
            เรียนต่อเนื่องครบ 25 นาทีแล้ว เก่งมากครับ! พักสักนิดเพื่อความจำที่เฉียบคม 🧠✨
          </p>
        </DialogHeader>

        {/* Visual Countdown Timer */}
        <div className="my-4 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-orange-100 shadow-inner flex flex-col items-center">
          <Badge className="bg-orange-100 text-orange-900 border-orange-200 text-[10px] font-bold mb-2">
            ⏱️ เวลาพักผ่อน (Brain Rest Timer)
          </Badge>
          <div className="text-4xl font-black text-orange-600 font-mono tracking-widest">
            {formatTime(breakTimeLeft)}
          </div>
          <span className="text-[10px] text-slate-400 mt-1">
            {breakTimeLeft > 0 ? 'ปล่อยให้สมองได้ประมวลผลข้อมูล' : '🎉 พักผ่อนครบแล้ว สมองพร้อมลุยต่อ 100%!'}
          </span>
        </div>

        {/* Brain Booster Activity Card */}
        <div className={`p-4 rounded-2xl border ${currentTip.color} text-left space-y-1 mb-4 shadow-sm`}>
          <div className="flex items-center gap-2 font-bold text-xs">
            <TipIcon className="w-4 h-4 shrink-0" />
            <span>ภารกิจพักผ่อน: {currentTip.title}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-600">
            {currentTip.desc}
          </p>
        </div>

        {/* Action Button */}
        <div className="space-y-2">
          <Button
            onClick={handleResume}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black py-5 rounded-xl shadow-lg shadow-orange-500/25 transition-all text-sm"
          >
            {breakTimeLeft === 0 ? '🚀 พร้อมลุยบทเรียนต่อไปแล้ว!' : '✨ สดชื่นแล้ว พร้อมลุยต่อเลย →'}
          </Button>
          <p className="text-[10px] text-slate-400">
            💡 กฎจิตวิทยาการเรียนรู้: พัก 5 นาทีทุก 25 นาที ช่วยให้จำบทเรียนได้ยาวนานขึ้น 3 เท่า!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
