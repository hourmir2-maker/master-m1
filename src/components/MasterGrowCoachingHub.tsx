'use client'

import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  calculateGoalReadiness, 
  detectScoreLeakage, 
  SAMPLE_TRAP_CARDS,
  PRESET_GOALS,
  GoalProfile 
} from '@/lib/master-grow'
import { 
  Target, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  Heart,
  Brain,
  Award,
  AlertCircle
} from 'lucide-react'

interface MasterGrowHubProps {
  studentName?: string
  studentEmail?: string
  studentTarget?: string
  progressList: Array<{ subject: string; module_id?: string; score?: number; completed: boolean }>
}

export default function MasterGrowCoachingHub({
  studentName = 'น้องฟอร์จูน',
  studentEmail = '',
  studentTarget,
  progressList
}: MasterGrowHubProps) {
  const isFortune = studentEmail === 'phumrapeeft@gmail.com' || studentName.includes('ภูมิรพีร์') || studentName.includes('ฟอร์จูน')
  
  const targetGoal: GoalProfile = useMemo(() => {
    if (isFortune) return PRESET_GOALS.fortune_gifted
    return {
      id: 'custom_goal',
      title: studentTarget || 'ม.1 เตรียมสอบเข้าโรงเรียนชั้นนำ',
      targetCohort: 'ป.6 เตรียมสอบเข้า ม.1',
      nearTermGoal: studentTarget || 'สอบเข้า ม.1 ห้องเรียนพิเศษ',
      targetGRI: 80,
      keySubjects: ['math', 'science', 'english', 'thai']
    }
  }, [isFortune, studentTarget])

  const readiness = useMemo(() => {
    return calculateGoalReadiness(progressList, targetGoal)
  }, [progressList, targetGoal])

  const leakages = useMemo(() => {
    return detectScoreLeakage(progressList)
  }, [progressList])

  const featuredTrap = SAMPLE_TRAP_CARDS[0]

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-6 text-white shadow-xl border border-indigo-500/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-amber-400/90 text-amber-950 font-bold px-3 py-1 hover:bg-amber-400">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> MASTER-GROW Coaching Model
              </Badge>
              <Badge variant="outline" className="border-indigo-300 text-indigo-200">
                สพฐ. 2551 (ปรับปรุง 2560)
              </Badge>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
              <span>{isFortune ? '👦 ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)' : studentName}</span>
              {isFortune && <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-normal">เภสัชกรตัวน้อย 💊</span>}
            </h2>
            <p className="text-indigo-200 text-sm mt-1 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-amber-300" />
              <span>เป้าหมายหลัก: <b>{targetGoal.title}</b></span>
            </p>
          </div>

          {/* Goal Readiness Meter */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 min-w-[240px] text-center">
            <div className="text-xs text-indigo-200 uppercase tracking-wider font-semibold">Goal Readiness Index (GRI)</div>
            <div className="flex items-baseline justify-center gap-1 my-1">
              <span className="text-3xl font-black text-amber-300">{readiness.griScore}</span>
              <span className="text-sm text-indigo-200">/ 100</span>
            </div>
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, readiness.griScore)}%` }}
              />
            </div>
            <Badge className="bg-indigo-700/80 text-white text-xs">
              สถานะ: {readiness.readinessLabel}
            </Badge>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid (G - R - O - W) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar G */}
        <Card className="border-indigo-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-600" /> [G] Goal Mastery
            </CardTitle>
            <Badge variant="secondary" className="text-xs font-semibold">เป้าหมาย</Badge>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div className="text-slate-600 dark:text-slate-400 font-medium">
              {targetGoal.nearTermGoal}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
              ความมั่นใจของข้อมูล: <b>{Math.round(readiness.evidenceConfidence * 100)}%</b>
            </div>
          </CardContent>
        </Card>

        {/* Pillar R */}
        <Card className="border-indigo-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> [R] Cloud Telemetry
            </CardTitle>
            <Badge variant="secondary" className="text-xs font-semibold">56 โมดูลจริง</Badge>
          </CardHeader>
          <CardContent className="text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">ความแม่นยำ (Mastery):</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{readiness.components.mastery}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">เนื้อหาที่ผ่าน (Coverage):</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{readiness.components.coverage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">ความจำคงทน (Retention):</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{readiness.components.retention}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Pillar O */}
        <Card className="border-indigo-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> [O] สูตรลัด 3 วินาที
            </CardTitle>
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs">Do Less</Badge>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
              จุดลวง สทศ.: {featuredTrap.moduleTitle}
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              {featuredTrap.escapeMove3Sec}
            </p>
          </CardContent>
        </Card>

        {/* Pillar W */}
        <Card className="border-indigo-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" /> [W] Win & Reframing
            </CardTitle>
            <Badge variant="outline" className="text-xs border-rose-300 text-rose-600">จิตวิทยาบวก</Badge>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
              "ข้อที่ทำผิดไม่ใช่ความล้มเหลว แต่คือแต้มต่อ +5 คะแนนในสนามสอบจริง!"
            </p>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> ซิงก์ Telegram คุณพ่ออัตโนมัติ
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
