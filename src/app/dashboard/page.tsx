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
import { BookOpen, Target, LogOut, FlaskConical, MessageCircle, Sparkles, ChevronRight, Award } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<{ full_name: string; school_target?: string } | null>(null)
  const [progressData, setProgressData] = useState<{ subject: string; completed: boolean; score?: number }[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const { data: authData } = await supabase.auth.getUser()
        if (!authData.user) { router.push('/login'); return }

        // Use maybeSingle to prevent 406 Not Acceptable error
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', authData.user.id).maybeSingle()
        setUser(profile || { full_name: authData.user.user_metadata?.full_name || 'นักเรียน', school_target: authData.user.user_metadata?.school_target || 'โรงเรียนในฝัน' })

        const { data: prog } = await supabase.from('progress').select('*').eq('user_id', authData.user.id)
        setProgressData(prog || [])
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50/60 via-amber-50/40 to-red-50/50">
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
            <span className="text-slate-700 text-xs sm:text-sm font-semibold hidden sm:inline-block">
              👋 สวัสดี, <span className="text-orange-600 font-bold">{user?.full_name || 'นักเรียน'}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-1.5" /> ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              Dashboard การเรียนรู้ 📊
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              เป้าหมาย: <span className="font-semibold text-orange-600">{user?.school_target || 'สอบเข้า ม.1 โรงเรียนชั้นนำ'}</span>
            </p>
          </div>
          
          <Link href="/learning-path">
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-md shadow-orange-500/25">
              <Sparkles className="w-4 h-4 mr-1.5" /> ดูแผนการเรียน AI
            </Button>
          </Link>
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

        {/* Subject Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <Link href="/pre-test">
                <Button variant="outline" className="gap-2 border-orange-200 text-orange-800 hover:bg-orange-50 text-xs font-semibold">
                  <FlaskConical className="w-4 h-4 text-orange-600" /> ทำ Pre-Test ใหม่
                </Button>
              </Link>
              <Link href="/learning-path">
                <Button variant="outline" className="gap-2 border-orange-200 text-orange-800 hover:bg-orange-50 text-xs font-semibold">
                  <Target className="w-4 h-4 text-red-600" /> ดูคำแนะนำ AI
                </Button>
              </Link>
              <Link href="/subjects/math">
                <Button variant="outline" className="gap-2 border-orange-200 text-orange-800 hover:bg-orange-50 text-xs font-semibold">
                  <BookOpen className="w-4 h-4 text-orange-600" /> สูตรลับคณิตศาสตร์
                </Button>
              </Link>
              <Link href="/subjects/science">
                <Button variant="outline" className="gap-2 border-orange-200 text-orange-800 hover:bg-orange-50 text-xs font-semibold">
                  <FlaskConical className="w-4 h-4 text-red-600" /> เทคนิควิทยาศาสตร์
                </Button>
              </Link>
              <Link href="/subjects/english">
                <Button variant="outline" className="gap-2 border-orange-200 text-orange-800 hover:bg-orange-50 text-xs font-semibold">
                  <MessageCircle className="w-4 h-4 text-amber-600" /> เทคนิคภาษาอังกฤษ
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
