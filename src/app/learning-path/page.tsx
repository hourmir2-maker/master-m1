'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Loader2, Brain, BookOpen, ChevronRight, Star } from 'lucide-react'
import { AiAnalysis } from '@/types'

const MODULE_LABELS: Record<string, string> = {
  numbers_basics: 'ตัวเลขและการดำเนินการ', fractions_decimals: 'เศษส่วนและทศนิยม',
  algebra_intro: 'พีชคณิตเบื้องต้น', geometry: 'เรขาคณิต', statistics: 'สถิติ',
  living_things: 'สิ่งมีชีวิตและสิ่งแวดล้อม', matter_properties: 'สารและสมบัติ',
  force_motion: 'แรงและการเคลื่อนที่', energy: 'พลังงาน', earth_space: 'โลกและอวกาศ',
  grammar_basics: 'ไวยากรณ์พื้นฐาน', vocabulary: 'คำศัพท์', reading: 'การอ่าน',
  listening_speaking: 'ฟัง-พูด', writing: 'การเขียน',
}

const PRIORITY_LABELS: Record<string, string> = { math: 'คณิตศาสตร์', science: 'วิทยาศาสตร์', english: 'ภาษาอังกฤษ' }
const LEVEL_LABELS: Record<string, { label: string; color: string }> = {
  basic:        { label: 'พื้นฐาน',      color: 'bg-orange-100 text-orange-700' },
  intermediate: { label: 'กลาง',         color: 'bg-blue-100 text-blue-700' },
  advanced:     { label: 'สูง',          color: 'bg-green-100 text-green-700' },
}

export default function LearningPathPage() {
  const router = useRouter()
  const supabase = createClient()
  const [path, setPath] = useState<{ math_modules: string[]; science_modules: string[]; english_modules: string[]; analysis: AiAnalysis } | null>(null)
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data: authData } = await supabase.auth.getUser()
      if (!authData.user) { router.push('/login'); return }

      const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', authData.user.id).single()
      setUserName(profile?.full_name || 'นักเรียน')

      const { data: pathData } = await supabase.from('learning_paths').select('*').eq('user_id', authData.user.id).single()
      if (pathData) {
        const analysis = JSON.parse(pathData.ai_analysis || '{}') as AiAnalysis
        setPath({ math_modules: pathData.math_modules, science_modules: pathData.science_modules, english_modules: pathData.english_modules, analysis })
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">AI กำลังสร้างแผนการเรียน...</p>
        <p className="text-gray-400 text-sm mt-1">อาจใช้เวลาสักครู่</p>
      </div>
    </div>
  )

  const subjects = [
    { key: 'math', label: 'คณิตศาสตร์', emoji: '🔢', modules: path?.math_modules || [], href: '/subjects/math', color: 'border-blue-200 bg-blue-50', btnColor: 'bg-blue-600 hover:bg-blue-700' },
    { key: 'science', label: 'วิทยาศาสตร์', emoji: '🔬', modules: path?.science_modules || [], href: '/subjects/science', color: 'border-green-200 bg-green-50', btnColor: 'bg-green-600 hover:bg-green-700' },
    { key: 'english', label: 'ภาษาอังกฤษ', emoji: '🗣️', modules: path?.english_modules || [], href: '/subjects/english', color: 'border-purple-200 bg-purple-50', btnColor: 'bg-purple-600 hover:bg-purple-700' },
  ]

  const analysis = path?.analysis
  const levelInfo = analysis ? LEVEL_LABELS[analysis.overall_level] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            แผนการเรียนของ {userName} 🎯
          </h1>
          <p className="text-gray-500">วิเคราะห์โดย Gemini AI จากผล Pre-Test ของคุณ</p>
        </div>

        {/* AI Analysis Card */}
        {analysis && (
          <Card className="mb-6 border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-indigo-800">
                <div className="bg-indigo-100 p-2 rounded-xl"><Brain className="w-5 h-5 text-indigo-600" /></div>
                การวิเคราะห์จาก AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{analysis.analysis}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-indigo-600 text-white">
                  ⚡ วิชาเร่งด่วน: {PRIORITY_LABELS[analysis.priority_subject] || analysis.priority_subject}
                </Badge>
                {levelInfo && <Badge className={levelInfo.color}>ระดับ: {levelInfo.label}</Badge>}
                <Badge variant="outline">⏱️ ประมาณ {analysis.estimated_weeks} สัปดาห์</Badge>
              </div>
              {analysis.study_tips && analysis.study_tips.length > 0 && (
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-1">
                    <Star className="w-4 h-4" /> เคล็ดลับการเรียนจาก AI:
                  </p>
                  <ul className="space-y-1">
                    {analysis.study_tips.map((tip: string, i: number) => (
                      <li key={i} className="text-sm text-amber-700 flex gap-2">
                        <span className="text-amber-400">•</span>{tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Subject Cards */}
        <div className="space-y-4 mb-6">
          {subjects.map(s => (
            <Card key={s.key} className={`border-2 ${s.color} shadow-md`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="text-2xl">{s.emoji}</span> {s.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {s.modules.map((m: string) => (
                        <Badge key={m} variant="outline" className="text-xs font-normal">
                          {MODULE_LABELS[m] || m}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Progress value={(s.modules.length / 5) * 100} className="h-1.5" />
                      <p className="text-xs text-gray-400 mt-1">{s.modules.length}/5 โมดูล</p>
                    </div>
                  </div>
                  <Link href={s.href}>
                    <Button className={`${s.btnColor} text-white flex-shrink-0`}>
                      <BookOpen className="w-4 h-4 mr-2" />เรียน<ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="px-8">ไปยัง Dashboard →</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
