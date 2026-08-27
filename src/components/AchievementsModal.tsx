'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ALL_BADGES, getGamificationState } from '@/lib/gamification'
import { Trophy, Flame, Zap, Award, Sparkles, CheckCircle2, Lock } from 'lucide-react'

interface AchievementsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const state = getGamificationState()
  const unlockedCount = state.unlockedBadgeIds.length
  const totalCount = ALL_BADGES.length
  const progressPercent = Math.round((unlockedCount / totalCount) * 100)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-3xl border-2 border-orange-200 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2 border-b border-orange-100">
          <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-amber-400 to-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25 mb-2">
            <Trophy className="w-7 h-7" />
          </div>
          <DialogTitle className="text-2xl font-black text-slate-900">
            หอเกียรติยศ & เหรียญรางวัล (Achievements)
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-xs sm:text-sm">
            สะสมเหรียญรางวัล เพิ่มค่าพลัง XP และรักษาสถิติการฝึกฝนต่อเนื่องทุกวัน
          </DialogDescription>
        </DialogHeader>

        {/* User Stats Overview */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="p-3.5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200 text-center">
            <div className="flex items-center justify-center gap-1 text-orange-600 text-xs font-bold mb-1">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" /> ไฟต่อเนื่อง
            </div>
            <p className="text-2xl font-black text-orange-900">{state.currentStreak} วัน</p>
          </div>

          <div className="p-3.5 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-600 text-xs font-bold mb-1">
              <Zap className="w-4 h-4 text-amber-500" /> ระดับ (Level)
            </div>
            <p className="text-2xl font-black text-amber-900">Lv. {state.level}</p>
          </div>

          <div className="p-3.5 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-200 text-center">
            <div className="flex items-center justify-center gap-1 text-red-600 text-xs font-bold mb-1">
              <Sparkles className="w-4 h-4 text-red-500" /> ค่าพลังรวม
            </div>
            <p className="text-2xl font-black text-red-900">{state.totalXp} XP</p>
          </div>
        </div>

        {/* Badge Collection Progress */}
        <div className="mb-4 space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-600">
            <span>ปลดล็อกเหรียญแล้ว ({unlockedCount}/{totalCount})</span>
            <span className="text-orange-600">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2.5 bg-orange-100" />
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ALL_BADGES.map(badge => {
            const isUnlocked = state.unlockedBadgeIds.includes(badge.id)

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-orange-50/80 to-amber-50/80 border-orange-300 shadow-sm'
                    : 'bg-slate-50/80 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm ${
                  isUnlocked ? 'bg-white border border-orange-200' : 'bg-slate-200 grayscale'
                }`}>
                  {isUnlocked ? badge.icon : '🔒'}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className={`text-xs sm:text-sm font-bold truncate ${isUnlocked ? 'text-slate-900' : 'text-slate-500'}`}>
                      {badge.title}
                    </h4>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {badge.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
