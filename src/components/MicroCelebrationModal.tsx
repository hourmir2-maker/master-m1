'use client'

import { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Sparkles, Trophy, Flame, Star, CheckCircle2 } from 'lucide-react'
import { soundFX } from '@/lib/sound-fx'

interface MicroCelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  earnedXp?: number
  streakDays?: number
  achievementType?: 'streak' | 'spaced_repetition' | 'vip_merit' | 'exam_passed'
}

export default function MicroCelebrationModal({
  isOpen,
  onClose,
  title = 'ยอดเยี่ยมมาก! เคลียร์ภารกิจสำเร็จ 🎉',
  subtitle = 'คุณได้พิชิตการทบทวนจุดอ่อนประจำวัน ความสม่ำเสมอคือกุญแจสู่ความสำเร็จ!',
  earnedXp = 150,
  streakDays = 1,
  achievementType = 'spaced_repetition'
}: MicroCelebrationModalProps) {
  useEffect(() => {
    if (isOpen) {
      soundFX.playFanfare()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white via-orange-50/50 to-amber-50/70 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden">
        {/* Decorative Glow Elements */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl pointer-events-none" />

        <DialogHeader className="text-center relative z-10">
          <div className="text-6xl mb-3 animate-bounce">
            {achievementType === 'streak' ? '🔥 🏆 🔥' : achievementType === 'vip_merit' ? '👑 ✨ 💎' : '🌟 🎯 🌟'}
          </div>

          <DialogTitle className="text-2xl font-black text-slate-900 text-center flex items-center justify-center gap-2">
            <span>{title}</span>
          </DialogTitle>

          <DialogDescription className="text-slate-600 text-center pt-2 text-xs sm:text-sm font-medium leading-relaxed">
            {subtitle}
          </DialogDescription>
        </DialogHeader>

        {/* XP & Streak Rewards Box */}
        <div className="my-5 grid grid-cols-2 gap-3 relative z-10">
          <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 shadow-sm flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" /> ได้รับพลังงาน
            </div>
            <div className="text-2xl sm:text-3xl font-black text-orange-600">
              +{earnedXp} XP
            </div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 shadow-sm flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-orange-600 font-bold text-xs mb-1">
              <Flame className="w-4 h-4" /> สถิติสะสม (Streak)
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">
              {streakDays} วันติด
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-2 relative z-10">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-extrabold text-sm py-6 rounded-2xl shadow-lg shadow-orange-500/25"
          >
            🚀 ลุยต่อยอดเยี่ยมมาก! (รับรางวัล)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
