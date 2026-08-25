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
import { BookOpen, Trophy, Target, LogOut, FlaskConical, MessageCircle } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<{ full_name: string; school_target?: string } | null>(null)
  const [progressData, setProgressData] = useState<{ subject: string; completed: boolean; score?: number }[]>([])

  useEffect(() => {
    const load = async () => {
      const { data: authData } = await supabase.auth.getUser()
      if (!authData.user) { router.push('/login'); return }

      const { data: profile } = await supabase.from('profiles').select('*').eq('id', authData.user.id).single()
      setUser(profile)

      const { data: prog } = await supabase.from('progress').select('*').eq('user_id', authData.user.id)
      setProgressData(prog || [])
    }
    load()
  }, [])

  const handleLogout = async () => { await supabase.auth.signOut(); router.push('/') }

  const totalCompleted = progressData.filter(p => p.completed).length
  const mathCount = progressData.filter(p => p.subject === 'math' && p.completed).length
  const scienceCount = progressData.filter(p => p.subject === 'science' && p.completed).length
  const englishCount = progressData.filter(p => p.subject === 'english' && p.completed).length
  const avgScore = progressData.filter(p => p.score).length > 0
    ? Math.round(progressData.filter(p => p.score).reduce((a, b) => a + (b.score ?? 0), 0) / progressData.filter(p => p.score).length)
    : 0

  const getBadge = (count: number) => {
    if (count >= 12) return { label: '💎 DIAMOND', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' }
    if (count >= 8)  return { label: '🥇 GOLD',    color: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
    if (count >= 4)  return { label: '🥈 SILVER',  color: 'bg-gray-100 text-gray-700 border-gray-200' }
    return                  { label: '🥉 BRONZE',  color: 'bg-orange-100 text-orange-700 border-orange-200' }
  }
  const badge = getBadge(totalCompleted)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white rounded-xl p-1.5"><BookOpen className="w-5 h-5" /></div>
            <span className="text-lg font-bold text-indigo-700">MASTER ม.1</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm hidden sm:block">สวัสดี, {user?.full_name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard 📊</h1>
          <p className="text-gray-500 text-sm">ติดตามความก้าวหน้าการเรียนของคุณ</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'บทที่เรียนแล้ว', value: totalCompleted, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'คะแนนเฉลี่ย', value: `${avgScore}%`, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'ระดับปัจจุบัน', value: <Badge className={`${badge.color} border text-xs`}>{badge.label}</Badge>, color: '', bg: 'bg-amber-50' },
            { label: 'บทที่เหลือ', value: Math.max(0, 15 - totalCompleted), color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((stat, i) => (
            <Card key={i} className={`border-0 shadow-sm ${stat.bg}`}>
              <CardContent className="pt-5 pb-4 text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subject Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: '🔢 คณิตศาสตร์', count: mathCount, href: '/subjects/math', color: 'text-blue-600', prog: 'bg-blue-500' },
            { label: '🔬 วิทยาศาสตร์', count: scienceCount, href: '/subjects/science', color: 'text-green-600', prog: 'bg-green-500' },
            { label: '🗣️ ภาษาอังกฤษ', count: englishCount, href: '/subjects/english', color: 'text-purple-600', prog: 'bg-purple-500' },
          ].map(s => (
            <Card key={s.label} className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className={`text-lg ${s.color}`}>{s.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={(s.count / 5) * 100} className="mb-2 h-2" />
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{s.count}/5 โมดูล</span>
                  <span className="font-medium">{Math.round((s.count / 5) * 100)}%</span>
                </div>
                <Link href={s.href}>
                  <Button className="w-full" variant="outline">เข้าเรียน →</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">เมนูลัด</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/learning-path">
                <Button variant="outline" className="gap-2">
                  <Target className="w-4 h-4 text-indigo-600" /> ดูแผนการเรียน AI
                </Button>
              </Link>
              <Link href="/pre-test">
                <Button variant="outline" className="gap-2">
                  <FlaskConical className="w-4 h-4 text-green-600" /> ทำ Pre-Test ใหม่
                </Button>
              </Link>
              <Link href="/subjects/math">
                <Button variant="outline" className="gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" /> คณิตศาสตร์
                </Button>
              </Link>
              <Link href="/subjects/science">
                <Button variant="outline" className="gap-2">
                  <FlaskConical className="w-4 h-4 text-green-600" /> วิทยาศาสตร์
                </Button>
              </Link>
              <Link href="/subjects/english">
                <Button variant="outline" className="gap-2">
                  <MessageCircle className="w-4 h-4 text-purple-600" /> ภาษาอังกฤษ
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
