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
import Footer from '@/components/Footer'
import { Loader2, Brain, BookOpen, ChevronRight, Star, Sparkles, ArrowRight, FlaskConical } from 'lucide-react'
import { AiAnalysis } from '@/types'

const MODULE_LABELS: Record<string, string> = {
  numbers_basics: 'ตัวเลข การดำเนินการ & ห.ร.ม./ค.ร.น.',
  fractions_decimals: 'เศษส่วน ทศนิยม & การคำนวณระคน',
  percentages: 'ร้อยละ กำไร-ขาดทุน & ดอกเบี้ย',
  algebra_intro: 'พีชคณิต สมการเชิงเส้น & โจทย์ปัญหา',
  geometry: 'เรขาคณิต 2 มิติ เส้นขนาน & พื้นที่แรเงา',
  ratio_proportion: 'อัตราส่วนและมาตราส่วน (Ratio & Scale)',
  geometry_3d: 'รูปทรง 3 มิติ ปริมาตรและความจุ',
  statistics_probability: 'สถิติ แผนภูมิวงกลม ค่าเฉลี่ย & ความน่าจะเป็น',
  living_things: 'สิ่งมีชีวิต เซลล์ พืช สัตว์ & ระบบนิเวศ',
  matter_properties: 'สารบริสุทธิ์ สารผสม & เทคนิคการแยกสาร',
  force_motion: 'แรง การเคลื่อนที่ ความดัน & แรงลอยตัว',
  energy: 'พลังงาน ความร้อน แสง เลนส์ & ไฟฟ้า',
  earth_space: 'โลก ดาราศาสตร์ บรรยากาศ & ภัยธรรมชาติ',
  human_body: 'ร่างกายมนุษย์และสุขภาพ (Human Body)',
  chemical_changes: 'การเปลี่ยนแปลงทางกายภาพและเคมี',
  scientific_inquiry: 'ทักษะกระบวนการและการทดลอง (Inquiry)',
  grammar_basics: 'Grammar Essentials, Tenses & SV Agreement',
  vocabulary: 'Vocabulary Power & Root Words',
  reading: 'Reading Comprehension (Skim & Scan)',
  listening_speaking: 'Everyday Communication & Expressions',
  writing: 'Error Identification & Sentence Structure',
  passive_modals: 'Active vs Passive Voice & Modal Verbs',
  comparison_conjunctions: 'Comparison & Conjunctions (การเปรียบเทียบ)',
  cloze_test: 'Cloze Test & Paragraph Completion',
}

const PRIORITY_LABELS: Record<string, string> = { 
  math: 'คณิตศาสตร์ 🔢', 
  science: 'วิทยาศาสตร์ 🔬', 
  english: 'ภาษาอังกฤษ 🗣️' 
}

const LEVEL_LABELS: Record<string, { label: string; color: string }> = {
  basic:        { label: 'ระดับพื้นฐาน (ต้องปูพื้นเพิ่ม)',      color: 'bg-amber-100 text-amber-900 border-amber-200' },
  intermediate: { label: 'ระดับปานกลาง (พร้อมลุยโจทย์ประยุกต์)', color: 'bg-orange-100 text-orange-900 border-orange-200' },
  advanced:     { label: 'ระดับสูง (ติวเข้มห้องพิเศษ/กิฟต์เต็ด)', color: 'bg-red-100 text-red-900 border-red-200' },
}

const DEFAULT_ANALYSIS: AiAnalysis = {
  priority_subject: 'math',
  overall_level: 'intermediate',
  analysis: 'ยินดีต้อนรับสู่หลักสูตร MASTER ม.1 (24 โมดูลเข้มข้น)! ระบบได้จัดเตรียมเส้นทางการเรียนรู้ 3 วิชาหลัก พร้อมสูตรลับและเทคนิคเฉพาะบุคคล เพื่อให้คุณพร้อมที่สุดสำหรับทุกสนามสอบ',
  math_modules: ['numbers_basics', 'fractions_decimals', 'percentages', 'algebra_intro', 'geometry', 'ratio_proportion', 'geometry_3d', 'statistics_probability'],
  science_modules: ['living_things', 'matter_properties', 'force_motion', 'energy', 'earth_space', 'human_body', 'chemical_changes', 'scientific_inquiry'],
  english_modules: ['grammar_basics', 'vocabulary', 'reading', 'listening_speaking', 'writing', 'passive_modals', 'comparison_conjunctions', 'cloze_test'],
  study_tips: [
    'คณิตศาสตร์: ใช้สูตรลับตัวคูณรวดเดียว และเทคนิคสมมติขา/เชื่อมสะพานอัตราส่วนเพื่อประหยัดเวลาทำโจทย์',
    'วิทยาศาสตร์: ใช้เทคนิคแยกตัวแปรต้น-ตาม-ควบคุม และวิเคราะห์ผลการทดลองสไตล์ สสวท.',
    'ภาษาอังกฤษ: ใช้เทคนิค 3S METHOD โดย Skim ภาพรวม Scan หา Keyword และสแกน Error 3 ตำแหน่งหลัก'
  ],
  estimated_weeks: 8
}

export default function LearningPathPage() {
  const router = useRouter()
  const supabase = createClient()
  const [path, setPath] = useState<{ math_modules: string[]; science_modules: string[]; english_modules: string[]; analysis: AiAnalysis } | null>(null)
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [hasPreTest, setHasPreTest] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { data: authData } = await supabase.auth.getUser()
        if (!authData.user) { router.push('/login'); return }

        // Use maybeSingle to prevent 406 Not Acceptable error
        const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', authData.user.id).maybeSingle()
        setUserName(profile?.full_name || authData.user.user_metadata?.full_name || 'นักเรียน')

        const { data: pathData } = await supabase.from('learning_paths').select('*').eq('user_id', authData.user.id).maybeSingle()
        
        if (pathData) {
          const analysis = (typeof pathData.ai_analysis === 'string' ? JSON.parse(pathData.ai_analysis) : pathData.ai_analysis) as AiAnalysis
          setPath({ 
            math_modules: pathData.math_modules || DEFAULT_ANALYSIS.math_modules, 
            science_modules: pathData.science_modules || DEFAULT_ANALYSIS.science_modules, 
            english_modules: pathData.english_modules || DEFAULT_ANALYSIS.english_modules, 
            analysis: analysis || DEFAULT_ANALYSIS 
          })
          setHasPreTest(true)
        } else {
          // If no pre-test yet, provide default path
          setPath({
            math_modules: DEFAULT_ANALYSIS.math_modules,
            science_modules: DEFAULT_ANALYSIS.science_modules,
            english_modules: DEFAULT_ANALYSIS.english_modules,
            analysis: DEFAULT_ANALYSIS
          })
          setHasPreTest(false)
        }
      } catch (err) {
        console.warn('Learning path load warning:', err)
        setPath({
          math_modules: DEFAULT_ANALYSIS.math_modules,
          science_modules: DEFAULT_ANALYSIS.science_modules,
          english_modules: DEFAULT_ANALYSIS.english_modules,
          analysis: DEFAULT_ANALYSIS
        })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      <div className="text-center bg-white/80 p-8 rounded-3xl border border-orange-100 shadow-xl backdrop-blur-md">
        <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
        <p className="text-slate-800 font-bold text-lg">กำลังโหลดแผนการเรียนรู้...</p>
        <p className="text-slate-500 text-sm mt-1">เตรียมความพร้อมสู่ความสำเร็จ</p>
      </div>
    </div>
  )

  const subjects = [
    { 
      key: 'math', 
      label: 'คณิตศาสตร์', 
      emoji: '🔢', 
      modules: path?.math_modules || DEFAULT_ANALYSIS.math_modules, 
      href: '/subjects/math', 
      color: 'border-orange-200 bg-orange-50/50', 
      btnColor: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-200'
    },
    { 
      key: 'science', 
      label: 'วิทยาศาสตร์', 
      emoji: '🔬', 
      modules: path?.science_modules || DEFAULT_ANALYSIS.science_modules, 
      href: '/subjects/science', 
      color: 'border-red-200 bg-red-50/50', 
      btnColor: 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600',
      badgeColor: 'bg-red-100 text-red-900 border-red-200'
    },
    { 
      key: 'english', 
      label: 'ภาษาอังกฤษ', 
      emoji: '🗣️', 
      modules: path?.english_modules || DEFAULT_ANALYSIS.english_modules, 
      href: '/subjects/english', 
      color: 'border-amber-200 bg-amber-50/50', 
      btnColor: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    },
  ]

  const analysis = path?.analysis || DEFAULT_ANALYSIS
  const levelInfo = LEVEL_LABELS[analysis.overall_level] || LEVEL_LABELS.intermediate

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 p-4 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-800 rounded-full px-4 py-1.5 text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4 text-orange-600" /> แผนการเรียนเฉพาะบุคคล (Personalized Path)
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
            แผนเตรียมตัวสอบเข้า ม.1 ของ {userName} 🎯
          </h1>
          <p className="text-slate-600 text-sm">วิเคราะห์และออกแบบเพื่ออุดจุดอ่อนและเสริมจุดแข็งให้พร้อมที่สุด</p>
          
          {!hasPreTest && (
            <div className="mt-4 bg-orange-100/90 border border-orange-200 rounded-2xl p-4 max-w-lg mx-auto flex items-center justify-between gap-3 text-left">
              <div>
                <p className="text-xs font-bold text-orange-950">💡 ยังไม่ได้ทำแบบทดสอบวัดระดับ (Pre-Test)?</p>
                <p className="text-[11px] text-orange-800">ทำแบบทดสอบ 30 ข้อ เพื่อให้ AI ปรับแผนให้แม่นยำยิ่งขึ้น</p>
              </div>
              <Link href="/pre-test">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-xs flex-shrink-0 shadow-sm">
                  <FlaskConical className="w-3.5 h-3.5 mr-1" /> ทำ Pre-Test
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* AI Analysis Card */}
        <Card className="mb-8 border-orange-100 shadow-xl bg-white/95 backdrop-blur-md overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 p-1" />
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="flex items-center gap-2.5 text-slate-900 text-lg sm:text-xl font-black">
              <div className="bg-gradient-to-tr from-orange-500 to-red-500 text-white p-2 rounded-xl shadow-md shadow-orange-500/20">
                <Brain className="w-5 h-5" />
              </div>
              บทวิเคราะห์และข้อแนะนำจาก AI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-medium bg-orange-50/60 p-4 rounded-2xl border border-orange-100">
              {analysis.analysis}
            </p>
            
            <div className="flex flex-wrap gap-2.5 pt-1">
              <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold px-3 py-1 text-xs shadow-sm">
                ⚡ วิชาที่ต้องเร่งพัฒนา: {PRIORITY_LABELS[analysis.priority_subject] || analysis.priority_subject}
              </Badge>
              <Badge className={`${levelInfo.color} border font-bold px-3 py-1 text-xs`}>
                {levelInfo.label}
              </Badge>
              <Badge variant="outline" className="border-orange-200 text-orange-900 bg-orange-50 font-semibold px-3 py-1 text-xs">
                ⏱️ ระยะเวลาแนะนำ: {analysis.estimated_weeks || 8} สัปดาห์
              </Badge>
            </div>

            {analysis.study_tips && analysis.study_tips.length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200/80 mt-4">
                <p className="font-bold text-amber-950 text-sm mb-3 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-orange-600 fill-orange-500" /> กลยุทธ์และสูตรลับการอ่านหนังสือสำหรับคุณ:
                </p>
                <ul className="space-y-2">
                  {analysis.study_tips.map((tip: string, i: number) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 font-medium">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subject Cards */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <span>📚</span> โมดูลบทเรียนที่ต้องเรียนตามลำดับ
          </h2>

          {subjects.map(s => (
            <Card key={s.key} className={`border-2 ${s.color} shadow-md hover:shadow-lg transition-all bg-white`}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2 text-slate-900">
                      <span className="text-2xl">{s.emoji}</span> {s.label}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {s.modules.map((m: string) => (
                        <Badge key={m} variant="outline" className={`${s.badgeColor} text-xs font-semibold`}>
                          {MODULE_LABELS[m] || m}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <Progress value={((s.modules.length || 5) / 5) * 100} className="h-1.5 bg-orange-100 [&>div]:bg-orange-500" />
                      <p className="text-[11px] text-slate-400 mt-1 font-medium">{s.modules.length || 5} โมดูลแนะนำ</p>
                    </div>
                  </div>
                  
                  <Link href={s.href} className="w-full sm:w-auto">
                    <Button className={`${s.btnColor} text-white font-bold w-full sm:w-auto shadow-md shadow-orange-500/20`}>
                      <BookOpen className="w-4 h-4 mr-1.5" /> เข้าสู่บทเรียน <ChevronRight className="w-4 h-4 ml-0.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center pt-2 pb-8">
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="px-8 border-2 border-orange-300 text-orange-800 hover:bg-orange-100/60 font-bold shadow-sm">
              ไปยังหน้าหลัก Dashboard <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
