'use client'
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Beaker, 
  Flame, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Sun, 
  Magnet, 
  Lock, 
  Unlock, 
  Trophy, 
  Sliders, 
  RotateCcw,
  Microscope,
  FlaskConical,
  Palette,
  Edit2,
  Save,
  Link2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { getCustomYoutubeUrl, setCustomYoutubeUrl } from '@/lib/admin-settings'
import NutrientTestingLab from '@/components/labs/NutrientTestingLab'
import LightShadowLab from '@/components/labs/LightShadowLab'
import MagnetLab from '@/components/labs/MagnetLab'
import MicroscopeLab from '@/components/labs/MicroscopeLab'
import AcidBaseLab from '@/components/labs/AcidBaseLab'
import ChromatographyLab from '@/components/labs/ChromatographyLab'
import Footer from '@/components/Footer'

function getYouTubeEmbedUrl(url?: string): string {
  if (!url) return 'https://www.youtube-nocookie.com/embed/SLumB462LQU?rel=0'
  try {
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube-nocookie.com/embed/${id}?rel=0`
    }
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0]
      return `https://www.youtube-nocookie.com/embed/${id}?rel=0`
    }
    if (url.includes('/embed/')) {
      return url
    }
    return 'https://www.youtube-nocookie.com/embed/SLumB462LQU?rel=0'
  } catch {
    return 'https://www.youtube-nocookie.com/embed/SLumB462LQU?rel=0'
  }
}

export type LabId = 'shadow' | 'magnet' | 'acidbase' | 'microscope' | 'nutrients' | 'chromatography' | 'heat'

interface LabTier {
  id: LabId
  name: string
  shortTitle: string
  subtitle: string
  levelName: string
  badgeEmoji: string
  minScore: number
  targetModuleId: string
  targetModuleName: string
  accentColor: string
  activeGrad: string
  desc: string
}

const LAB_TIERS: LabTier[] = [
  {
    id: 'shadow',
    name: '🪞 การเกิดเงา: เงามืด & เงามัว',
    shortTitle: 'แสงและเงา',
    subtitle: 'สสวท. ป.4 - ป.6 • แหล่งกำเนิดแสงและการบังแสง',
    levelName: 'Level 1: นักวิทยาศาสตร์ฝึกหัด',
    badgeEmoji: '🥉',
    minScore: 0,
    targetModuleId: 'force_motion',
    targetModuleName: 'แสงและเงา',
    accentColor: 'border-amber-300 text-amber-900 bg-amber-50',
    activeGrad: 'bg-amber-500 text-white shadow-amber-500/30 ring-amber-300',
    desc: 'ปูพื้นฐานการสังเกตแสง เงามืด เงามัว และขนาดของเงาตามระยะวัตถุ'
  },
  {
    id: 'magnet',
    name: '🧲 แม่เหล็ก & สารแม่เหล็ก',
    shortTitle: 'แม่เหล็ก & แรงดูด',
    subtitle: 'สสวท. ป.3 - ป.6 • แรงดูด-แรงผลัก และจุดดักข้อสอบ',
    levelName: 'Level 2: นักวิจัยรุ่นเยาว์',
    badgeEmoji: '🥈',
    minScore: 35,
    targetModuleId: 'force_motion',
    targetModuleName: 'แรงและการเคลื่อนที่',
    accentColor: 'border-rose-300 text-rose-900 bg-rose-50',
    activeGrad: 'bg-rose-600 text-white shadow-rose-600/30 ring-rose-300',
    desc: 'จำแนกสารแม่เหล็ก สารที่ไม่ใช่แม่เหล็ก (อะลูมิเนียม) และแรงระหว่างขั้ว N-S'
  },
  {
    id: 'acidbase',
    name: '💧 กรด-เบส & อินดิเคเตอร์',
    shortTitle: 'กรด-เบส & pH',
    subtitle: 'สสวท. ป.5 - ม.1 • กระดาษลิตมัส, ฟีนอล์ฟทาลีน & pH',
    levelName: 'Level 3: นักวิเคราะห์สารเคมี',
    badgeEmoji: '🧪',
    minScore: 50,
    targetModuleId: 'matter_properties',
    targetModuleName: 'สารบริสุทธิ์และสารผสม',
    accentColor: 'border-violet-300 text-violet-900 bg-violet-50',
    activeGrad: 'bg-violet-600 text-white shadow-violet-600/30 ring-violet-300',
    desc: 'ทดสอบกระดาษลิตมัสแดง-น้ำเงิน ฟีนอล์ฟทาลีน และวัดสเกล pH 1-14 ของสารในชีวิตประจำวัน'
  },
  {
    id: 'microscope',
    name: '🔬 กล้องจุลทรรศน์: เซลล์พืช vs สัตว์',
    shortTitle: 'กล้องส่องเซลล์',
    subtitle: 'สสวท. ม.1 • ส่องเซลล์เยื่อหอม, สาหร่าย & เยื่อบุข้างแก้ม',
    levelName: 'Level 4: นักจุลชีววิทยา',
    badgeEmoji: '🔬',
    minScore: 65,
    targetModuleId: 'living_things',
    targetModuleName: 'เซลล์และสิ่งมีชีวิต',
    accentColor: 'border-teal-300 text-teal-900 bg-teal-50',
    activeGrad: 'bg-teal-600 text-white shadow-teal-600/30 ring-teal-300',
    desc: 'หมุนปุ่มปรับภาพละเอียด สลับกำลังขยาย 40x-400x ย้อมสีสไลด์ และจำแนกออร์แกเนลล์'
  },
  {
    id: 'nutrients',
    name: '🥣 การทดสอบสารอาหาร 4 ชนิด',
    shortTitle: 'ทดสอบสารอาหาร',
    subtitle: 'สสวท. ม.1 • ไอโอดีน, เบเนดิกต์ต้มเดือด, ไบยูเร็ต',
    levelName: 'Level 5: นักสืบวิทยาศาสตร์ ม.1',
    badgeEmoji: '🥇',
    minScore: 75,
    targetModuleId: 'human_body',
    targetModuleName: 'ร่างกายมนุษย์และสารอาหาร',
    accentColor: 'border-emerald-300 text-emerald-900 bg-emerald-50',
    activeGrad: 'bg-emerald-600 text-white shadow-emerald-600/30 ring-emerald-300',
    desc: 'เทคนิคการทดสอบแป้ง น้ำตาลรีดิวซ์ โปรตีน และหลุมพรางน้ำตาลทรายซูโครส'
  },
  {
    id: 'chromatography',
    name: '🌈 โครมาโทกราฟี & การคำนวณค่า Rf',
    shortTitle: 'โครมาโทกราฟี',
    subtitle: 'สสวท. ม.1 • แยกสารผสม, แถบสี & ไม้บรรทัดวัด Rf',
    levelName: 'Level 6: ผู้เชี่ยวชาญการแยกสาร',
    badgeEmoji: '🎨',
    minScore: 85,
    targetModuleId: 'matter_properties',
    targetModuleName: 'เทคนิคการแยกสารผสม',
    accentColor: 'border-purple-300 text-purple-900 bg-purple-50',
    activeGrad: 'bg-purple-600 text-white shadow-purple-600/30 ring-purple-300',
    desc: 'แยกองค์ประกอบหมึกสีและรงควัตถุพืช พร้อมคำนวณค่า Rf = d_สาร / d_ตัวทำละลาย'
  },
  {
    id: 'heat',
    name: '🌡️ สมดุลความร้อน Q=mcΔt',
    shortTitle: 'สมดุลความร้อน',
    subtitle: 'ห้องเรียนพิเศษ Gifted/สสวท. • การคำนวณอุณหพลศาสตร์',
    levelName: 'Level 7: ปรมาจารย์แล็บ Gifted',
    badgeEmoji: '💎',
    minScore: 92,
    targetModuleId: 'energy',
    targetModuleName: 'พลังงานความร้อน',
    accentColor: 'border-orange-300 text-orange-900 bg-orange-50',
    activeGrad: 'bg-orange-600 text-white shadow-orange-600/30 ring-orange-300',
    desc: 'จำลองการถ่ายโอนความร้อน Q_loss = Q_gain พร้อมสูตรลัด 3 วินาทีสำหรับสอบเข้า ม.1'
  },
]

export default function VirtualLabPage() {
  const [activeTab, setActiveTab] = useState<LabId>('shadow')
  
  // Gamification Unlock State
  const [actualScienceScore, setActualScienceScore] = useState<number>(0)
  const [demoScoreOverride, setDemoScoreOverride] = useState<number | null>(null)
  const [studentName, setStudentName] = useState<string>('นักเรียน')
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false)
  const [isEditingLabVideo, setIsEditingLabVideo] = useState<boolean>(false)
  const [labVideoInput, setLabVideoInput] = useState<string>('')
  const [labSaveNotice, setLabSaveNotice] = useState<string | null>(null)
  const [labVideoVersion, setLabVideoVersion] = useState<number>(0)

  // State for Heat Simulator
  const [mHot, setMHot] = useState<number>(100) // g
  const [tHot, setTHot] = useState<number>(80) // C
  const [mCold, setMCold] = useState<number>(100) // g
  const [tCold, setTCold] = useState<number>(20) // C

  const finalTemp = Math.round(((mHot * tHot + mCold * tCold) / (mHot + mCold)) * 10) / 10

  useEffect(() => {
    const loadScienceMastery = async () => {
      try {
        const supabase = createClient()
        const { data: authData } = await supabase.auth.getUser()
        
        let calculatedScore = 0

        if (authData.user) {
          const userEmail = authData.user.email || ''
          const isPhumrapee = userEmail === 'phumrapeeft@gmail.com'

          const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', authData.user.id).maybeSingle()
          const name = profile?.full_name || (isPhumrapee ? 'ด.ช.ภูมิรพีร์ มากแก้ว' : 'นักเรียน')
          setStudentName(name)

          const { data: preTest } = await supabase
            .from('pre_test_results')
            .select('*')
            .eq('user_id', authData.user.id)
            .eq('subject', 'science')
            .maybeSingle()

          let preScorePct = 0
          if (preTest && preTest.total_questions > 0) {
            preScorePct = Math.round((preTest.score / preTest.total_questions) * 100)
          }

          const { data: progList } = await supabase
            .from('progress')
            .select('*')
            .eq('user_id', authData.user.id)
            .eq('subject', 'science')

          let avgQuizScore = 0
          if (progList && progList.length > 0) {
            const sum = progList.reduce((acc, p) => acc + (p.score || 0), 0)
            avgQuizScore = Math.round(sum / progList.length)
          }

          if (isPhumrapee && preScorePct === 0) {
            preScorePct = 80
          }

          calculatedScore = Math.max(preScorePct, avgQuizScore)
        }

        try {
          const localProg = localStorage.getItem('master_m1_local_progress')
          if (localProg) {
            const parsed = JSON.parse(localProg)
            const sciItems = parsed.filter((p: any) => p.subject === 'science')
            if (sciItems.length > 0) {
              const sum = sciItems.reduce((acc: number, p: any) => acc + (p.score || 0), 0)
              const avg = Math.round(sum / sciItems.length)
              calculatedScore = Math.max(calculatedScore, avg)
            }
          }
        } catch (e) {
          console.warn('Local storage error:', e)
        }

        setActualScienceScore(calculatedScore > 0 ? calculatedScore : 50)
      } catch (err) {
        console.warn('Error loading science score:', err)
        setActualScienceScore(50)
      }
    }

    loadScienceMastery()
  }, [])

  const effectiveScore = demoScoreOverride !== null ? demoScoreOverride : actualScienceScore
  const currentTier = LAB_TIERS.slice().reverse().find(t => effectiveScore >= t.minScore) || LAB_TIERS[0]
  const currentActiveTier = LAB_TIERS.find(t => t.id === activeTab) || LAB_TIERS[0]
  const isCurrentTabUnlocked = effectiveScore >= currentActiveTier.minScore

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-emerald-50/40 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-emerald-700 font-bold">
                <ArrowLeft className="w-4 h-4 mr-1" />
                แดชบอร์ด
              </Button>
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <h1 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span>🔬 Virtual Science Lab</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                7 สถานีทดลอง สสวท. & Gifted
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowVideoModal(true)}
              className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200 font-bold rounded-xl text-xs sm:text-sm shadow-xs"
            >
              <span>🎬 ดูคลิปเพลงแล็บวิทย์ 7 สถานี</span>
            </Button>

            <Link href="/subjects/science">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 text-xs sm:text-sm">
                <span>📚 ทำโจทย์เพิ่มคะแนนวิทย์</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 w-full flex-1 space-y-6">
        
        {/* Gamification Science Mastery Hub Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-cyan-400 flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/20 shrink-0">
                {currentTier.badgeEmoji}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-400/30 font-mono">
                    {currentTier.levelName}
                  </span>
                  <span className="text-xs text-slate-300">
                    • {studentName}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  ระดับความพร้อมวิทยาศาสตร์: <span className="text-amber-400 font-mono">{effectiveScore}%</span>
                </h2>
                <p className="text-slate-300 text-xs mt-0.5">
                  ยิ่งทำแบบฝึกหัดวิทย์ได้คะแนนสูง ห้องแล็บขั้นสูงจะเปิดให้ทดลองเพิ่มขึ้นเรื่อยๆ
                </p>
              </div>
            </div>

            {/* Quick Demo Simulator Buttons */}
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-xs flex flex-col items-end gap-1.5 w-full md:w-auto">
              <div className="flex items-center gap-1 text-[11px] text-amber-300 font-bold">
                <Sliders className="w-3.5 h-3.5" />
                <span>จำลองระดับคะแนน (Demo Switch):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: '0%', score: 10 },
                  { label: '40%', score: 40 },
                  { label: '60%', score: 60 },
                  { label: '75%', score: 75 },
                  { label: '88%', score: 88 },
                  { label: '95% (ครบ!)', score: 95 },
                ].map(demo => (
                  <button
                    key={demo.score}
                    onClick={() => setDemoScoreOverride(demo.score)}
                    className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
                      effectiveScore === demo.score
                        ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {demo.label}
                  </button>
                ))}
                {demoScoreOverride !== null && (
                  <button
                    onClick={() => setDemoScoreOverride(null)}
                    title="กลับสู่คะแนนจริงของนักเรียน"
                    className="text-[10px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded-lg flex items-center gap-0.5"
                  >
                    <RotateCcw className="w-3 h-3" /> คะแนนจริง
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 7-Tier Unlock Progress Bar */}
          <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {LAB_TIERS.map(tier => {
                const isUnlocked = effectiveScore >= tier.minScore
                return (
                  <div 
                    key={tier.id}
                    className={`p-2 rounded-xl border transition-all ${
                      isUnlocked 
                        ? 'bg-white/10 border-emerald-400/40 text-white' 
                        : 'bg-slate-900/60 border-slate-700/60 text-slate-400 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold flex items-center gap-1 truncate">
                        <span>{tier.badgeEmoji}</span>
                        <span className={isUnlocked ? 'text-emerald-300' : 'text-slate-400'}>{tier.shortTitle}</span>
                      </span>
                      {isUnlocked ? (
                        <span className="text-[9px] font-bold text-emerald-400 flex items-center">
                          <Unlock className="w-2.5 h-2.5" />
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-slate-400 font-mono">
                          {tier.minScore}%
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${isUnlocked ? 'bg-gradient-to-r from-emerald-400 to-cyan-400' : 'bg-slate-600'}`}
                        style={{ width: `${Math.min(100, (effectiveScore / (tier.minScore || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 7 Lab Buttons Navigation Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>สถานีการทดลองทั้งหมด 7 สถานี (สสวท. ประถม & ม.1 Gifted):</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ปลดล็อกแล้ว <strong>{LAB_TIERS.filter(t => effectiveScore >= t.minScore).length} / 7</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
            {LAB_TIERS.map(tier => {
              const isUnlocked = effectiveScore >= tier.minScore
              const isSelected = activeTab === tier.id

              return (
                <button
                  key={tier.id}
                  onClick={() => setActiveTab(tier.id)}
                  className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[90px] ${
                    isSelected
                      ? `${tier.activeGrad} ring-2 scale-[1.02] shadow-md font-bold`
                      : isUnlocked
                      ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-xs'
                      : 'bg-slate-100 border-dashed border-slate-300 text-slate-500 hover:bg-slate-200/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xl">{tier.badgeEmoji}</span>
                    {isUnlocked ? (
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Unlock className="w-2.5 h-2.5" /> พร้อม
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 font-mono">
                        <Lock className="w-2.5 h-2.5" /> {tier.minScore}%
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className={`font-black text-xs leading-tight mb-0.5 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {tier.shortTitle}
                    </h3>
                    <p className={`text-[10px] leading-tight line-clamp-1 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                      {tier.subtitle.split('•')[0]}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dynamic Display: Unlocked Lab OR Locked Gate Card */}
        {isCurrentTabUnlocked ? (
          <div className="space-y-6">
            {activeTab === 'shadow' && <LightShadowLab />}
            {activeTab === 'magnet' && <MagnetLab />}
            {activeTab === 'acidbase' && <AcidBaseLab />}
            {activeTab === 'microscope' && <MicroscopeLab />}
            {activeTab === 'nutrients' && (
              <div className="space-y-6">
                <NutrientTestingLab />

                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-black text-slate-900 flex items-center gap-2 text-base sm:text-lg mb-3">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    สรุปสูตรลัดและจุดลวงข้อสอบ สสวท. ม.1 เรื่องสารอาหาร
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1.5">
                      <div className="font-bold text-emerald-950">1. ไอโอดีน (ตรวจแป้ง)</div>
                      <p className="text-slate-600 leading-relaxed">
                        น้ำตาลกลูโคสและเซลลูโลสในกระดาษจะไม่เปลี่ยนสีกับไอโอดีน จะต้องเป็นโมเลกุลแป้ง (Amylose) เท่านั้น
                      </p>
                    </div>
                    <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100 space-y-1.5">
                      <div className="font-bold text-sky-950">2. เบเนดิกต์ (ตรวจน้ำตาลรีดิวซ์)</div>
                      <p className="text-slate-600 leading-relaxed">
                        ต้องต้มในน้ำเดือดเสมอ ตะกอนสีแดงอิฐคือ Cu₂O น้ำตาลซูโครส (น้ำตาลทราย) จะไม่เกิดปฏิกิริยาเด็ดขาด
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-1.5">
                      <div className="font-bold text-purple-950">3. ไบยูเร็ต (ตรวจโปรตีน)</div>
                      <p className="text-slate-600 leading-relaxed">
                        ประกอบด้วย NaOH + CuSO₄ จะทำปฏิกิริยากับสารที่มีพันธะเพปไทด์ตั้งแต่ 2 พันธะขึ้นไปเปลี่ยนเป็นสีม่วง
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'chromatography' && <ChromatographyLab />}
            {activeTab === 'heat' && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                    <span>🌡️ เครื่องจำลองสมดุลความร้อน (Thermal Equilibrium Simulator)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    ทดลองผสมน้ำร้อนและน้ำเย็น สังเกตการถ่ายโอนพลังงานความร้อนตามกฎทรงพลังงาน Q_loss = Q_gain
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    {/* Hot Water Box */}
                    <div className="bg-red-50/70 border-2 border-red-200 p-5 rounded-2xl space-y-4">
                      <h3 className="font-bold text-red-900 flex items-center justify-between">
                        <span>🔥 น้ำร้อน (สารสูญเสียความร้อน: Q_loss)</span>
                        <span className="text-xs bg-red-200 text-red-900 px-2 py-0.5 rounded-full">{tHot}°C</span>
                      </h3>

                      <div>
                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                          <span>มวลน้ำร้อน (m₁):</span>
                          <span className="font-bold">{mHot} กรัม</span>
                        </div>
                        <input 
                          type="range" 
                          min="10" 
                          max="500" 
                          step="10" 
                          value={mHot} 
                          onChange={(e) => setMHot(Number(e.target.value))}
                          className="w-full accent-red-600 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                          <span>อุณหภูมิน้ำร้อน (T₁):</span>
                          <span className="font-bold">{tHot} °C</span>
                        </div>
                        <input 
                          type="range" 
                          min="50" 
                          max="100" 
                          step="5" 
                          value={tHot} 
                          onChange={(e) => setTHot(Number(e.target.value))}
                          className="w-full accent-red-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Cold Water Box */}
                    <div className="bg-blue-50/70 border-2 border-blue-200 p-5 rounded-2xl space-y-4">
                      <h3 className="font-bold text-blue-900 flex items-center justify-between">
                        <span>❄️ น้ำเย็น (สารได้รับความร้อน: Q_gain)</span>
                        <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full">{tCold}°C</span>
                      </h3>

                      <div>
                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                          <span>มวลน้ำเย็น (m₂):</span>
                          <span className="font-bold">{mCold} กรัม</span>
                        </div>
                        <input 
                          type="range" 
                          min="10" 
                          max="500" 
                          step="10" 
                          value={mCold} 
                          onChange={(e) => setMCold(Number(e.target.value))}
                          className="w-full accent-blue-600 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                          <span>อุณหภูมิน้ำเย็น (T₂):</span>
                          <span className="font-bold">{tCold} °C</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="40" 
                          step="5" 
                          value={tCold} 
                          onChange={(e) => setTCold(Number(e.target.value))}
                          className="w-full accent-blue-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Equilibrium Results Column */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                    <div className="bg-slate-900 text-white rounded-2xl p-6 text-center space-y-4 shadow-xl">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        อุณหภูมิผสมสุดท้ายที่จุดสมดุล (Equilibrium Temperature)
                      </div>
                      
                      <div className="text-5xl sm:text-6xl font-black text-amber-400 tracking-tight">
                        {finalTemp} <span className="text-3xl text-amber-200 font-normal">°C</span>
                      </div>

                      <div className="text-xs text-slate-300 bg-slate-800 py-2 px-4 rounded-xl inline-block font-mono">
                        m₁c(T₁ - T) = m₂c(T - T₂)
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 text-left space-y-1">
                        <div>• มวลรวมทั้งหมด: <span className="text-white font-bold">{mHot + mCold} กรัม</span></div>
                        <div>• พลังงานความร้อนที่ถ่ายโอน: <span className="text-amber-300 font-bold">{Math.round(mHot * 1 * (tHot - finalTemp))} แคลอรี (cal)</span></div>
                        <div>• สมมติฐาน: ไม่มีพลังงานความร้อนสูญเสียสู่สิ่งแวดล้อมหรือภาชนะ</div>
                      </div>
                    </div>

                    <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-2xl space-y-2">
                      <h4 className="font-bold text-orange-950 flex items-center gap-1.5 text-xs sm:text-sm">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        สูตรลัด 3 วินาทีสำหรับสอบเข้า ม.1 ห้อง Gifted:
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        หาก <strong>มวลน้ำเท่ากัน (m₁ = m₂)</strong> อุณหภูมิผสมสุดท้ายจะเป็น <em>ค่าเฉลี่ยเลขคณิต</em> ทันที!
                        <br />
                        <span className="font-mono bg-white px-2 py-0.5 rounded border border-orange-200 text-orange-800 font-bold inline-block mt-1">
                          T_final = (T₁ + T₂) / 2
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Locked Gate Screen */
          <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
            <div className="max-w-md mx-auto space-y-5">
              <div className="w-20 h-20 rounded-3xl bg-slate-100 text-slate-400 border-2 border-slate-200 flex items-center justify-center text-4xl mx-auto shadow-inner">
                <Lock className="w-10 h-10 text-slate-400" />
              </div>

              <div>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  🔒 สถานีทดลองยังล็อกอยู่ (Locked Laboratory)
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  {currentActiveTier.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {currentActiveTier.desc}
                </p>
              </div>

              {/* Requirement Box */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">เกณฑ์คะแนนที่ต้องใช้:</span>
                  <span className="font-mono font-black text-rose-600 text-sm">
                    ≥ {currentActiveTier.minScore}%
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">คะแนนปัจจุบันของคุณ:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {effectiveScore}% (ขาดอีก {currentActiveTier.minScore - effectiveScore}%)
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (effectiveScore / currentActiveTier.minScore) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link href={`/subjects/science/${currentActiveTier.targetModuleId}`}>
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 text-xs sm:text-sm px-6">
                    🚀 ทบทวนบทเรียนเพื่อปลดล็อกแล็บนี้ →
                  </Button>
                </Link>

                <Button 
                  variant="outline" 
                  onClick={() => setDemoScoreOverride(currentActiveTier.minScore)}
                  className="text-xs text-slate-600 hover:text-slate-900 border-slate-300 rounded-xl"
                >
                  ✨ ทดลองปลดล็อก (Demo)
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Embedded YouTube Video Modal */}
        {showVideoModal && (() => {
          const currentLabVideoUrl = getCustomYoutubeUrl('song_sci_virtual_lab', 'https://youtu.be/SLumB462LQU')
          const embedLabUrl = getYouTubeEmbedUrl(currentLabVideoUrl)

          const handleOpenEditLabVideo = () => {
            setLabVideoInput(currentLabVideoUrl)
            setIsEditingLabVideo(true)
            setLabSaveNotice(null)
          }

          const handleSaveLabVideo = () => {
            if (!labVideoInput.trim()) {
              alert('กรุณากรอกลิงก์ YouTube ที่ถูกต้อง')
              return
            }
            setCustomYoutubeUrl('song_sci_virtual_lab', labVideoInput.trim())
            setLabVideoVersion(v => v + 1)
            setLabSaveNotice('✅ บันทึกและเปลี่ยนคลิปเพลงแล็บวิทย์แล้ว!')
            setTimeout(() => {
              setIsEditingLabVideo(false)
              setLabSaveNotice(null)
            }, 1500)
          }

          const handleResetLabVideo = () => {
            setCustomYoutubeUrl('song_sci_virtual_lab', 'https://youtu.be/SLumB462LQU')
            setLabVideoInput('https://youtu.be/SLumB462LQU')
            setLabVideoVersion(v => v + 1)
            setLabSaveNotice('🔄 คืนค่าเป็นคลิปตัวอย่างเริ่มต้นแล้ว')
            setTimeout(() => {
              setIsEditingLabVideo(false)
              setLabSaveNotice(null)
            }, 1500)
          }

          return (
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" 
              onClick={() => setShowVideoModal(false)}
            >
              <div 
                className="bg-slate-900 border-2 border-amber-400 rounded-3xl max-w-3xl w-full p-4 sm:p-6 space-y-4 shadow-2xl relative" 
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center text-white pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl animate-bounce">🎵</span>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-amber-300">
                        เพลง 7 สถานีแล็บวิทย์พิชิต ม.1 (Virtual Science Lab Anthem)
                      </h3>
                      <p className="text-xs text-slate-400">สูตรจำภาพสีจากห้องแล็บจริง พร้อมต่อยอดสอบเข้า ม.1</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowVideoModal(false)} 
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-slate-700 bg-black">
                  <iframe
                    src={embedLabUrl}
                    title="Virtual Science Lab Anthem"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="flex justify-between items-center text-xs text-slate-300 pt-1">
                  <span>💡 ส่องกล้อง ย้อมสี ลิตมัสเปลี่ยนสี คำนวณความร้อน เป๊ะ 100%</span>
                  <a 
                    href={currentLabVideoUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-sky-400 hover:underline font-bold"
                  >
                    เปิดดูในแอป YouTube ↗
                  </a>
                </div>
              </div>
            </div>
          )
        })()}
      </main>

      <Footer />
    </div>
  )
}
