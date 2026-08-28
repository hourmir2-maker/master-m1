'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import AchievementsModal from '@/components/AchievementsModal'
import { updateDailyStreak, GamificationState, getGamificationState } from '@/lib/gamification'
import { 
  BookOpen, 
  Target, 
  LogOut, 
  FlaskConical, 
  MessageCircle, 
  Sparkles, 
  ChevronRight, 
  Award,
  Timer,
  Layers,
  Printer,
  Flame,
  Zap,
  Trophy,
  PhoneCall
} from 'lucide-react'
import VoiceCallModal from '@/components/VoiceCallModal'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<{ full_name: string; email?: string; school_target?: string } | null>(null)
  const [progressData, setProgressData] = useState<{ subject: string; completed: boolean; score?: number }[]>([])
  const [gameState, setGameState] = useState<GamificationState>(getGamificationState())
  const [showAchievements, setShowAchievements] = useState(false)
  const [showVoiceCall, setShowVoiceCall] = useState(false)

  useEffect(() => {
    // Update daily streak on load
    const updatedGame = updateDailyStreak()
    setGameState(updatedGame)

    const load = async () => {
      try {
        const { data: authData } = await supabase.auth.getUser()
        if (!authData.user) { router.push('/login'); return }

        // Use maybeSingle to prevent 406 Not Acceptable error
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', authData.user.id).maybeSingle()
        setUser(profile || { full_name: authData.user.user_metadata?.full_name || 'นักเรียน', school_target: authData.user.user_metadata?.school_target || 'โรงเรียนในฝัน' })

        // Fetch Supabase cloud progress
        const { data: prog } = await supabase.from('progress').select('*').eq('user_id', authData.user.id)
        const cloudProgress = prog || []

        // Fetch LocalStorage offline progress
        let localProgress: Array<{ subject: string; moduleId?: string; module_id?: string; completed: boolean; score?: number }> = []
        try {
          const stored = localStorage.getItem('master_m1_progress')
          if (stored) {
            localProgress = JSON.parse(stored).map((item: any) => ({
              subject: item.subject,
              module_id: item.moduleId || item.module_id,
              completed: item.completed,
              score: item.score
            }))
          }
        } catch (lsErr) {
          console.warn('LocalStorage load warning:', lsErr)
        }

        // Merge deduplicating by subject + module_id (prefer highest score)
        const mergedMap = new Map<string, { subject: string; module_id: string; completed: boolean; score?: number }>()
        
        cloudProgress.forEach(p => {
          const key = `${p.subject}_${p.module_id}`
          mergedMap.set(key, { subject: p.subject, module_id: p.module_id, completed: p.completed, score: p.score })
        })

        localProgress.forEach(p => {
          const key = `${p.subject}_${p.module_id}`
          if (mergedMap.has(key)) {
            const existing = mergedMap.get(key)!
            mergedMap.set(key, {
              ...existing,
              completed: existing.completed || p.completed,
              score: Math.max(existing.score || 0, p.score || 0)
            })
          } else {
            mergedMap.set(key, { subject: p.subject, module_id: p.module_id || '', completed: p.completed, score: p.score })
          }
        })

        setProgressData(Array.from(mergedMap.values()))
      } catch (err) {
        console.warn('Dashboard load warning:', err)
      }
    }
    load()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const totalCompleted = progressData.filter(p => p.completed).length
  const mathCount = progressData.filter(p => p.subject === 'math' && p.completed).length
  const scienceCount = progressData.filter(p => p.subject === 'science' && p.completed).length
  const englishCount = progressData.filter(p => p.subject === 'english' && p.completed).length
  
  const scoredItems = progressData.filter(p => typeof p.score === 'number')
  const avgScore = scoredItems.length > 0
    ? Math.round(scoredItems.reduce((a, b) => a + (b.score ?? 0), 0) / scoredItems.length)
    : 0

  const getBadge = (count: number) => {
    if (count >= 20) return { label: '💎 DIAMOND (ระดับหัวกะทิ)', color: 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm' }
    if (count >= 14) return { label: '🥇 GOLD (พร้อมสอบ ม.1)',     color: 'bg-amber-500 text-white shadow-sm' }
    if (count >= 8)  return { label: '🥈 SILVER (กำลังไต่ระดับ)',   color: 'bg-orange-500 text-white shadow-sm' }
    return                  { label: '🥉 BRONZE (เริ่มต้นเรียนรู้)', color: 'bg-orange-100 text-orange-900 border border-orange-200' }
  }
  const badge = getBadge(totalCompleted)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/60 via-amber-50/40 to-red-50/50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-orange-500 to-red-500 text-white rounded-xl p-2 shadow-md shadow-orange-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">MASTER ม.1</span>
              <p className="text-[10px] text-orange-900/60 font-semibold leading-none">เตรียมพร้อม พิชิตทุกข้อสอบ</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Daily Streak Counter */}
            <div 
              onClick={() => setShowAchievements(true)}
              className="flex items-center gap-1.5 bg-orange-100/80 hover:bg-orange-200 text-orange-900 px-3 py-1 rounded-full text-xs font-bold border border-orange-200 cursor-pointer transition-all shadow-2xs"
              title="ดูเหรียญรางวัลและสถิติ"
            >
              <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
              <span>{gameState.currentStreak} วัน</span>
            </div>

            <span className="text-slate-700 text-xs sm:text-sm font-semibold hidden sm:inline-block">
              👋 สวัสดี, <span className="text-orange-600 font-bold">{user?.full_name || 'นักเรียน'}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-1.5" /> ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              Dashboard การเรียนรู้ 📊
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              เป้าหมาย: <span className="font-semibold text-orange-600">{user?.school_target || 'สอบเข้า ม.1 โรงเรียนชั้นนำ'}</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            <Button
              onClick={() => setShowAchievements(true)}
              variant="outline"
              className="border-amber-300 bg-amber-50/70 hover:bg-amber-100 text-amber-900 font-bold shadow-xs text-xs"
            >
              <Trophy className="w-4 h-4 mr-1.5 text-amber-600" /> หอเกียรติยศ ({gameState.unlockedBadgeIds.length}/10)
            </Button>
            <Link href="/learning-path">
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-md shadow-orange-500/25 text-xs">
                <Sparkles className="w-4 h-4 mr-1.5" /> แผนการเรียน AI
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'บทเรียนที่ผ่านแล้ว', value: `${totalCompleted} / 24`, color: 'text-orange-600', bg: 'bg-white border-orange-100' },
            { label: 'คะแนนเฉลี่ยรวม', value: `${avgScore}%`, color: 'text-red-600', bg: 'bg-white border-orange-100' },
            { label: 'สถานะ Badge ปัจจุบัน', value: <Badge className={`${badge.color} text-[11px] font-bold py-0.5`}>{badge.label}</Badge>, color: '', bg: 'bg-white border-orange-100' },
            { label: 'บทเรียนคงเหลือ', value: Math.max(0, 24 - totalCompleted), color: 'text-amber-600', bg: 'bg-white border-orange-100' },
          ].map((stat, i) => (
            <Card key={i} className={`border shadow-sm ${stat.bg} rounded-2xl`}>
              <CardContent className="pt-5 pb-4 text-center">
                <div className={`text-2xl sm:text-3xl font-black ${stat.color} mb-1 flex items-center justify-center min-h-[36px]`}>
                  {stat.value}
                </div>
                <p className="text-xs text-slate-500 font-semibold">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* O-NET 2570 Exam Mastery Hub Banner */}
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 text-white rounded-3xl p-5 sm:p-6 mb-8 shadow-xl shadow-orange-600/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-orange-400/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shrink-0 shadow-inner">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-black text-base sm:text-lg">สนามสอบจำลอง O-NET 2570 (เสมือนจริง 4 วิชา)</span>
                <Badge className="bg-amber-300 text-orange-950 font-black text-[10px]">สทศ. 2570</Badge>
              </div>
              <p className="text-orange-100 text-xs sm:text-sm max-w-xl leading-relaxed">
                ฝึกทำข้อสอบตรงตาม Test Blueprint สทศ. (สอบ ก.พ. 2570) ครบ 4 วิชา: คณิต, วิทย์, ไทย, อังกฤษ พร้อมกระดาษฝนตัวเลขและเฉลย 4 สเต็ป
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <Link href="/onet-exam" className="w-full sm:w-auto">
              <Button size="lg" className="bg-white text-orange-900 hover:bg-orange-50 font-extrabold text-sm px-6 py-6 rounded-2xl shadow-lg w-full">
                🚀 เข้าสนามสอบ O-NET →
              </Button>
            </Link>
          </div>
        </div>

        {/* M.1 Advance Announcement Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white rounded-2xl p-4 sm:p-5 mb-8 shadow-lg shadow-purple-600/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0">
              🚀
            </div>
            <div>
              <h4 className="font-black text-sm sm:text-base flex items-center gap-2">
                <span>เปิดตัวหลักสูตรเสริม: เรียนล่วงหน้า ม.1 (Advance Track)</span>
                <Badge className="bg-amber-400 text-purple-950 font-black text-[10px]">NEW</Badge>
              </h4>
              <p className="text-purple-100 text-xs mt-0.5">
                เสริมความพร้อมห้อง Gifted และเตรียมตัวล่วงหน้า ครบทั้งจำนวนเต็ม, เลขยกกำลัง, Q=mcΔt, และ Past Continuous
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link href="/subjects/math" className="w-full sm:w-auto">
              <Button size="sm" className="bg-white text-purple-900 hover:bg-purple-50 font-bold text-xs w-full">
                ลองเรียนเลย →
              </Button>
            </Link>
          </div>
        </div>

        {/* Parent Real-time Telegram Monitoring Banner */}
        <div className="bg-gradient-to-br from-blue-700 via-sky-700 to-indigo-800 text-white rounded-3xl p-6 sm:p-7 mb-8 shadow-xl shadow-blue-600/20 border border-blue-400/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-5 border-b border-blue-400/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shrink-0 shadow-inner">
                📱
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-lg sm:text-xl">สำหรับผู้ปกครอง: ติดตามผลการเรียนผ่าน Telegram 24 ชม.</h3>
                  <Badge className="bg-emerald-400 text-emerald-950 font-black text-[10px]">Real-Time Bot</Badge>
                </div>
                <p className="text-blue-100 text-xs sm:text-sm max-w-xl leading-relaxed">
                  คุณพ่อคุณแม่สามารถรับรายงานคะแนนและพัฒนาการของน้องได้ทันทีที่ทำแบบฝึกหัดเสร็จ โดยไม่ต้องเปิดคอมพิวเตอร์
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                  <span className="bg-blue-900/60 text-sky-200 px-3 py-1 rounded-lg border border-blue-400/30 font-medium">
                    👦 นักเรียน: <b>{user?.full_name || 'ด.ช.ภูมิรพีร์ มากแก้ว'}</b>
                  </span>
                  <span className="bg-blue-900/60 text-sky-200 px-3 py-1 rounded-lg border border-blue-400/30 font-mono text-[11px]">
                    📧 รหัสผูกบัญชี: <b>{user?.email || 'phumrapeeft@gmail.com'}</b>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto shrink-0">
              <a 
                href={`https://t.me/MasterM1_Parent_bot?start=link_${user?.email || user?.full_name || 'student'}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-sm px-6 py-6 rounded-2xl shadow-lg w-full hover:scale-105 transition-transform">
                  💬 กดผูกบัญชีน้องเข้า Telegram →
                </Button>
              </a>
            </div>
          </div>

          {/* 3-Step Guide Card for Parents */}
          <div className="bg-blue-950/40 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-blue-300/20">
            <div className="text-xs font-bold text-sky-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>💡 ตัวอย่างขั้นตอนการผูกบัญชีและการใช้งานสำหรับผู้ปกครอง:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-blue-900/40 p-3.5 rounded-xl border border-blue-400/20 space-y-1">
                <span className="font-bold text-white block text-sm text-sky-300">1. กดปุ่มผูกบัญชี</span>
                <p className="text-blue-100 text-[11px] leading-relaxed">
                  แตะปุ่ม <b>"กดผูกบัญชีน้องเข้า Telegram"</b> ด้านบน เพื่อเปิดบอท <b>ครูพี่ MASTER AI</b>
                </p>
              </div>
              <div className="bg-blue-900/40 p-3.5 rounded-xl border border-blue-400/20 space-y-1">
                <span className="font-bold text-white block text-sm text-sky-300">2. กด Start ใน Telegram</span>
                <p className="text-blue-100 text-[11px] leading-relaxed">
                  แตะ <b>Start</b> ระบบจะผูกบัญชีกับ <b>{user?.full_name || 'น้อง'}</b> อัตโนมัติ (หรือพิมพ์ <code>/link {user?.email || 'อีเมลน้อง'}</code>)
                </p>
              </div>
              <div className="bg-blue-900/40 p-3.5 rounded-xl border border-blue-400/20 space-y-1">
                <span className="font-bold text-white block text-sm text-sky-300">3. เช็คผลได้ตลอด 24 ชม.</span>
                <p className="text-blue-100 text-[11px] leading-relaxed">
                  • <code>/pretest</code> ➔ ดูผลสอบก่อนเรียน<br/>
                  • <code>/report</code> ➔ สรุปคะแนนทุกวิชา<br/>
                  • <code>/history</code> ➔ ดูประวัติพัฒนาการ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Hub - 3 Core New Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Flashcards */}
          <Link href="/flashcards" className="group">
            <Card className="border-2 border-orange-200/90 bg-gradient-to-br from-orange-50 to-white shadow-md hover:shadow-xl hover:border-orange-400 transition-all rounded-2xl h-full flex flex-col justify-between overflow-hidden">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center text-xl shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    🃏
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 font-bold text-[10px]">
                    Spaced Repetition
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                  Flashcards สูตรลับ ม.1
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  การ์ดพลิก 3D ท่องจำสูตรคิดเร็ว วิทย์จุดลวง และศัพท์สำคัญ พร้อมเสียงอ่าน TTS
                </p>
              </CardContent>
              <div className="px-5 py-2.5 bg-orange-100/50 border-t border-orange-100 flex justify-between items-center text-xs font-bold text-orange-700">
                <span>เริ่มท่องจำ</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          {/* Mock Exam 45 Mins */}
          <Link href="/mock-exam" className="group">
            <Card className="border-2 border-red-200/90 bg-gradient-to-br from-red-50 to-white shadow-md hover:shadow-xl hover:border-red-400 transition-all rounded-2xl h-full flex flex-col justify-between overflow-hidden">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center text-xl shadow-md shadow-red-500/20 group-hover:scale-110 transition-transform">
                    ⏱️
                  </div>
                  <Badge className="bg-red-100 text-red-800 border-red-200 font-bold text-[10px]">
                    จับเวลา 45 นาที
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors">
                  Mock Exam จำลองสอบจริง
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  ชุดข้อสอบรวม 3 วิชา 30 ข้อ ประเมินเกรด วิเคราะห์ความพร้อมก่อนลงสนามจริง
                </p>
              </CardContent>
              <div className="px-5 py-2.5 bg-red-100/50 border-t border-red-100 flex justify-between items-center text-xs font-bold text-red-700">
                <span>เข้าห้องสอบจำลอง</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          {/* Printable Cheat Sheets */}
          <Link href="/cheat-sheets" className="group">
            <Card className="border-2 border-amber-200/90 bg-gradient-to-br from-amber-50 to-white shadow-md hover:shadow-xl hover:border-amber-400 transition-all rounded-2xl h-full flex flex-col justify-between overflow-hidden">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
                    📄
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200 font-bold text-[10px]">
                    พิมพ์ PDF แผ่นเดียว
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                  สรุปสูตรลับ Cheat Sheet
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  สรุปสูตรลัดและจุดเน้น 3 วิชาแบบหน้าเดียว พิมพ์พกไปอ่านทบทวนหน้าห้องสอบ
                </p>
              </CardContent>
              <div className="px-5 py-2.5 bg-amber-100/50 border-t border-amber-100 flex justify-between items-center text-xs font-bold text-amber-700">
                <span>เปิดดู & พิมพ์</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        </div>

        {/* Subject Progress Cards (32 Modules - 4 Core Subjects) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { 
              label: 'คณิตศาสตร์', 
              emoji: '🔢',
              count: mathCount, 
              href: '/subjects/math', 
              color: 'text-orange-600', 
              gradient: 'from-orange-500 to-amber-500',
              border: 'border-orange-100',
              secret: '8 โมดูล + สูตรลัดติดจรวด'
            },
            { 
              label: 'วิทยาศาสตร์', 
              emoji: '🔬',
              count: scienceCount, 
              href: '/subjects/science', 
              color: 'text-red-600', 
              gradient: 'from-red-500 to-orange-500',
              border: 'border-red-100',
              secret: '8 โมดูล + ทักษะวิทย์สสวท.'
            },
            { 
              label: 'ภาษาอังกฤษ', 
              emoji: '🗣️',
              count: englishCount, 
              href: '/subjects/english', 
              color: 'text-amber-600', 
              gradient: 'from-amber-500 to-orange-500',
              border: 'border-amber-100',
              secret: '8 โมดูล + เทคนิค 3S Reading'
            },
            { 
              label: 'ภาษาไทย', 
              emoji: '📖',
              count: 8, 
              href: '/subjects/thai', 
              color: 'text-rose-600', 
              gradient: 'from-rose-500 to-pink-500',
              border: 'border-rose-100',
              secret: '8 โมดูล + อัตนัย 15 คะแนน สพฐ.'
            },
          ].map(s => (
            <Card key={s.label} className={`border ${s.border} shadow-md bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all`}>
              <div className={`bg-gradient-to-r ${s.gradient} p-3 text-white flex justify-between items-center`}>
                <span className="font-bold text-sm flex items-center gap-1.5">
                  <span className="text-lg">{s.emoji}</span> {s.label}
                </span>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded font-semibold">
                  {s.secret}
                </span>
              </div>
              
              <CardContent className="pt-5 pb-6">
                <Progress value={(s.count / 8) * 100} className="mb-2 h-2.5 bg-orange-100 [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-red-500" />
                <div className="flex justify-between text-xs text-slate-500 font-semibold mb-5">
                  <span>ความคืบหน้า: {s.count}/8 โมดูล</span>
                  <span className="font-bold text-orange-700">{Math.round((s.count / 8) * 100)}%</span>
                </div>
                
                <Link href={s.href}>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-md shadow-orange-500/15">
                    เข้าสู่บทเรียน <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Menu */}
        <Card className="border border-orange-100 shadow-md bg-white rounded-2xl">
          <CardContent className="p-6">
            <h3 className="font-bold text-slate-900 mb-4 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-600" /> เมนูด่วนสำหรับการฝึกฝน
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => setShowVoiceCall(true)}
                className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                <PhoneCall className="w-4 h-4" /> 📞 คุยสดกับครูพี่ AI
              </Button>
              <Link href="/pre-test">
                <Button variant="outline" className="gap-2 border-orange-200 text-orange-800 hover:bg-orange-50 text-xs font-semibold">
                  <FlaskConical className="w-4 h-4 text-orange-600" /> ทำ Pre-Test ใหม่
                </Button>
              </Link>
              <Link href="/flashcards">
                <Button variant="outline" className="gap-2 border-orange-200 text-orange-800 hover:bg-orange-50 text-xs font-semibold">
                  <Layers className="w-4 h-4 text-orange-600" /> ท่องจำ Flashcards
                </Button>
              </Link>
              <Link href="/mock-exam">
                <Button variant="outline" className="gap-2 border-orange-200 text-orange-800 hover:bg-orange-50 text-xs font-semibold">
                  <Timer className="w-4 h-4 text-red-600" /> สอบ Mock Exam 45 นาที
                </Button>
              </Link>
              <Link href="/vocab-bank">
                <Button variant="outline" className="gap-2 border-amber-300 text-amber-900 bg-amber-50/60 hover:bg-amber-100 text-xs font-bold shadow-xs">
                  <BookOpen className="w-4 h-4 text-amber-600" /> 📖 คลังศัพท์ Oxford 3000
                </Button>
              </Link>
              <Link href="/cheat-sheets">
                <Button variant="outline" className="gap-2 border-orange-200 text-orange-800 hover:bg-orange-50 text-xs font-semibold">
                  <Printer className="w-4 h-4 text-amber-600" /> โหลดชีทสรุปสูตรลับ
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
      />

      {/* Realtime Live Voice Call Modal */}
      <VoiceCallModal
        isOpen={showVoiceCall}
        onClose={() => setShowVoiceCall(false)}
        subject="math"
        moduleId="numbers_basics"
        lessonTitle="ภาพรวมเตรียมสอบ ม.1"
      />

      <Footer />
    </div>
  )
}
