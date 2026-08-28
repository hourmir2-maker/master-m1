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
import { 
  Loader2, 
  Brain, 
  BookOpen, 
  ChevronRight, 
  Star, 
  Sparkles, 
  ArrowRight, 
  FlaskConical, 
  Pill, 
  GraduationCap, 
  CheckCircle2, 
  Zap, 
  Target 
} from 'lucide-react'
import { AiAnalysis } from '@/types'

const MODULE_LABELS: Record<string, string> = {
  // Math
  numbers_basics: 'ตัวเลข การดำเนินการ & ห.ร.ม./ค.ร.น.',
  fractions_decimals: 'เศษส่วน ทศนิยม & การคำนวณระคน',
  percentages: 'ร้อยละ กำไร-ขาดทุน & ดอกเบี้ย',
  algebra_intro: 'พีชคณิต สมการเชิงเส้น & โจทย์ปัญหา',
  geometry: 'เรขาคณิต 2 มิติ เส้นขนาน & พื้นที่แรเงา',
  ratio_proportion: 'อัตราส่วนและมาตราส่วน (Ratio & Scale)',
  geometry_3d: 'รูปทรง 3 มิติ ปริมาตรและความจุ',
  statistics_probability: 'สถิติ แผนภูมิวงกลม ค่าเฉลี่ย & ความน่าจะเป็น',
  // Science
  living_things: 'สิ่งมีชีวิต เซลล์ พืช สัตว์ & ระบบนิเวศ',
  matter_properties: 'สารบริสุทธิ์ สารผสม & เทคนิคการแยกสาร',
  force_motion: 'แรง การเคลื่อนที่ ความดัน & แรงลอยตัว',
  energy: 'พลังงาน ความร้อน แสง เลนส์ & ไฟฟ้า',
  earth_space: 'โลก ดาราศาสตร์ บรรยากาศ & ภัยธรรมชาติ',
  human_body: 'ร่างกายมนุษย์และสุขภาพ (Human Body)',
  chemical_changes: 'การเปลี่ยนแปลงทางกายภาพและเคมี',
  scientific_inquiry: 'ทักษะกระบวนการและการทดลอง (Inquiry)',
  // English
  grammar_basics: 'Grammar Essentials, Tenses & SV Agreement',
  vocabulary: 'Vocabulary Power & Root Words',
  reading: 'Reading Comprehension (Skim & Scan)',
  listening_speaking: 'Everyday Communication & Expressions',
  writing: 'Error Identification & Sentence Structure',
  passive_modals: 'Active vs Passive Voice & Modal Verbs',
  comparison_conjunctions: 'Comparison & Conjunctions (การเปรียบเทียบ)',
  cloze_test: 'Cloze Test & Paragraph Completion',
  // Thai
  t1: 'คำไทยแท้ & คำยืม บาลี-สันสกฤต-เขมร-อังกฤษ',
  t2: 'ชนิดของคำ 7 ชนิด & หน้าที่ในประโยค',
  t3: 'โครงสร้างประโยค (ความเดียว-ความรวม-ความซ้อน)',
  t4: 'คำราชาศัพท์ ระดับภาษา & คำสุภาพ',
  t5: 'สำนวน สุภาษิต คำพังเพย & ปริศนาคำทาย',
  t6: 'การอ่านจับใจความ & ตีความ (Critical Reading)',
  t7: 'วรรณคดีลำนำ (รามเกียรติ์, พลายงาม, โคลงโลกนิติ)',
  t8: 'การเขียนย่อความ เรียงความ & จดหมาย',
}

const PRIORITY_LABELS: Record<string, string> = { 
  math: 'คณิตศาสตร์ 🔢', 
  science: 'วิทยาศาสตร์ 🔬', 
  english: 'ภาษาอังกฤษ 🗣️',
  thai: 'ภาษาไทย 🇹🇭'
}

const LEVEL_LABELS: Record<string, { label: string; color: string }> = {
  basic:        { label: 'ระดับพื้นฐาน (เน้นปูพื้นฐานแน่น)',      color: 'bg-amber-100 text-amber-900 border-amber-200' },
  intermediate: { label: 'ระดับปานกลาง (พร้อมลุยโจทย์ประยุกต์)', color: 'bg-orange-100 text-orange-900 border-orange-200' },
  advanced:     { label: 'ระดับสูง (ติวเข้มห้องพิเศษ Gifted/สสวท.)', color: 'bg-red-100 text-red-900 border-red-200' },
}

const DEFAULT_ANALYSIS: AiAnalysis = {
  priority_subject: 'math',
  overall_level: 'intermediate',
  analysis: 'ยินดีต้อนรับสู่หลักสูตร MASTER ม.1 (32 โมดูล 4 วิชาหลัก)! ระบบได้จัดเตรียมเส้นทางการเรียนรู้ตรงตามหลักสูตร สพฐ. 2551 (ปรับปรุง 2560) พร้อมสูตรลับ 3 วินาที เพื่อเตรียมน้องให้พร้อมที่สุดสำหรับทุกสนามสอบ',
  math_modules: ['numbers_basics', 'fractions_decimals', 'percentages', 'algebra_intro', 'geometry', 'ratio_proportion', 'geometry_3d', 'statistics_probability'],
  science_modules: ['living_things', 'matter_properties', 'force_motion', 'energy', 'earth_space', 'human_body', 'chemical_changes', 'scientific_inquiry'],
  english_modules: ['grammar_basics', 'vocabulary', 'reading', 'listening_speaking', 'writing', 'passive_modals', 'comparison_conjunctions', 'cloze_test'],
  study_tips: [
    'คณิตศาสตร์: ใช้สูตรลัด 3 วินาที (ตัด 2 ตัวท้ายถอดรูท, ร้อยละตัดศูนย์, และคูณ 11 แยกหัวท้าย)',
    'วิทยาศาสตร์: เน้นเรื่องสารละลาย & ความเข้มข้น, ระบบเซลล์ และการทดลอง สสวท. สู่พื้นฐานเภสัชศาสตร์',
    'ภาษาอังกฤษ: ใช้เทคนิค 3S METHOD โดย Skim ภาพรวม Scan หา Keyword และจับ Error 3 ตำแหน่ง',
    'ภาษาไทย: ตัดช้อยส์บาลี-สันสกฤตใน 3 วิ และแยกประโยคความเดียว-รวม-ซ้อนจากคำเชื่อม'
  ],
  estimated_weeks: 8
}

export default function LearningPathPage() {
  const router = useRouter()
  const supabase = createClient()
  const [path, setPath] = useState<{ math_modules: string[]; science_modules: string[]; english_modules: string[]; analysis: AiAnalysis } | null>(null)
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [hasPreTest, setHasPreTest] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { data: authData } = await supabase.auth.getUser()
        if (!authData.user) { router.push('/login'); return }

        setUserEmail(authData.user.email || '')
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', authData.user.id).maybeSingle()
        
        let resolvedName = profile?.full_name || authData.user.user_metadata?.full_name || 'นักเรียน'
        if (resolvedName === 'ทดสอบ' || resolvedName === 'นักเรียน') {
          if (authData.user.email === 'phumrapeeft@gmail.com' || profile?.email === 'phumrapeeft@gmail.com') {
            resolvedName = 'ด.ช.ภูมิรพีร์ มากแก้ว'
          }
        }
        setUserName(resolvedName)

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
        <p className="text-slate-800 font-bold text-lg">กำลังโหลดแผนการเรียนรู้เฉพาะบุคคล...</p>
        <p className="text-slate-500 text-sm mt-1">เตรียมความพร้อมสู่เป้าหมาย ม.1 Gifted & เภสัชกร</p>
      </div>
    </div>
  )

  const isPhumrapee = userEmail === 'phumrapeeft@gmail.com' || userName.includes('ภูมิรพีร์')

  const subjects = [
    { 
      key: 'math', 
      label: 'คณิตศาสตร์', 
      emoji: '🔢', 
      modules: path?.math_modules || DEFAULT_ANALYSIS.math_modules, 
      href: '/subjects/math', 
      color: 'border-orange-200 bg-orange-50/50', 
      btnColor: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-200',
      desc: '8 โมดูลเข้มข้น พร้อมเทคนิคคิดเร็ว 3 วิ (ถอดรูท, ร้อยละตัดศูนย์, พื้นที่แรเงา)'
    },
    { 
      key: 'science', 
      label: 'วิทยาศาสตร์', 
      emoji: '🔬', 
      modules: path?.science_modules || DEFAULT_ANALYSIS.science_modules, 
      href: '/subjects/science', 
      color: 'border-red-200 bg-red-50/50', 
      btnColor: 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600',
      badgeColor: 'bg-red-100 text-red-900 border-red-200',
      desc: '8 โมดูลพื้นฐานสู่แพทย์-เภสัช (สารละลายและความเข้มข้น, เซลล์, พลังงาน & ดาราศาสตร์)'
    },
    { 
      key: 'english', 
      label: 'ภาษาอังกฤษ', 
      emoji: '🗣️', 
      modules: path?.english_modules || DEFAULT_ANALYSIS.english_modules, 
      href: '/subjects/english', 
      color: 'border-amber-200 bg-amber-50/50', 
      btnColor: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      desc: '8 โมดูลไวยากรณ์ & คลังคำศัพท์ Root Words (3S Method: Skim, Scan, Error)'
    },
    { 
      key: 'thai', 
      label: 'ภาษาไทย (หลักสูตร 1000%)', 
      emoji: '🇹🇭', 
      modules: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8'], 
      href: '/subjects/thai', 
      color: 'border-emerald-200 bg-emerald-50/50', 
      btnColor: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      desc: '8 โมดูลมาตรฐาน สพฐ. 2551 (คำยืมบาลี-สันสกฤต, ประโยค 3 แบบ, คำราชาศัพท์, วรรณคดี)'
    },
  ]

  const analysis = path?.analysis || DEFAULT_ANALYSIS
  const levelInfo = LEVEL_LABELS[analysis.overall_level] || LEVEL_LABELS.intermediate

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 p-4 pb-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-800 rounded-full px-4 py-1.5 text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4 text-orange-600" /> แผนการเรียนเฉพาะบุคคล (Adaptive Personalized Track)
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
            แผนเตรียมตัวสอบเข้า ม.1 ของ {userName} 🎯
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            ออกแบบเฉพาะบุคคลเพื่อปลดล็อกจุดอ่อน เสริมจุดแข็งระดับท็อป และปูรากฐานสู่อาชีพในฝัน
          </p>
        </div>

        {/* Personalized Career & Gifted Special Track Banner */}
        <div className="mb-8 p-6 sm:p-7 bg-gradient-to-br from-indigo-900 via-blue-900 to-sky-950 text-white rounded-3xl shadow-2xl border border-sky-400/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5 pb-5 border-b border-sky-500/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-3xl shadow-lg shadow-sky-500/25 shrink-0">
                💊
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {isPhumrapee ? 'เส้นทางพิเศษ: ด.ช.ภูมิรพีร์ ม.1 Gifted สู่ เภสัชกร' : `เส้นทางเฉพาะตัว: ${userName} สู่ห้องเรียนพิเศษ ม.1`}
                  </h2>
                  <Badge className="bg-amber-400 text-indigo-950 font-black text-[10px]">Pharmacy Track</Badge>
                </div>
                <p className="text-sky-200 text-xs sm:text-sm">
                  แผนเร่งรัดคณิต-วิทย์-อังกฤษ-ไทย ด้วยสูตรลัด 3 วินาที และคลังโจทย์ 2 เท่า
                </p>
              </div>
            </div>

            <Link href="/subjects/math" className="w-full md:w-auto shrink-0">
              <Button size="lg" className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-slate-950 font-black text-sm px-6 py-6 rounded-2xl shadow-lg shadow-sky-500/20 w-full hover:scale-105 transition-transform">
                🚀 เริ่มลุยบทเรียนข้อ 1 →
              </Button>
            </Link>
          </div>

          {/* 4 Pillars of Mastery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1 text-sm">
                <span>🔢</span> คณิตศาสตร์ (เร่งด่วน)
              </div>
              <p className="text-sky-100 text-[11px] leading-relaxed">
                ปลดล็อก 5 จุดอ่อน: แปลงเศษส่วนทศนิยม, ร้อยละตัดศูนย์, ค่าเฉลี่ย, ห.ร.ม. & วงกลม
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1 text-sm">
                <span>🔬</span> วิทยาศาสตร์ (ต่อยอดเภสัช)
              </div>
              <p className="text-sky-100 text-[11px] leading-relaxed">
                เน้นสารบริสุทธิ์-สารผสม, ความเข้มข้นสารละลาย, และระบบเซลล์สิ่งมีชีวิต
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-1.5 font-bold text-sky-300 mb-1 text-sm">
                <span>🗣️</span> ภาษาอังกฤษ (Medical/Sci)
              </div>
              <p className="text-sky-100 text-[11px] leading-relaxed">
                คลังรากศัพท์วิทยาศาสตร์ (Root Words) + เทคนิคสแกน Error 3 ตำแหน่ง
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-1.5 font-bold text-teal-300 mb-1 text-sm">
                <span>🇹🇭</span> ภาษาไทย (หลักสูตร 1000%)
              </div>
              <p className="text-sky-100 text-[11px] leading-relaxed">
                สูตรลัดตัดช้อยส์บาลี-สันสกฤต 3 วิ และแยกประโยคความเดียว-รวม-ซ้อน
              </p>
            </div>
          </div>
        </div>

        {/* AI Diagnostic Summary Card */}
        <Card className="mb-8 border-orange-100 shadow-xl bg-white/95 backdrop-blur-md overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 p-1" />
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="flex items-center gap-2.5 text-slate-900 text-lg sm:text-xl font-black">
              <div className="bg-gradient-to-tr from-orange-500 to-red-500 text-white p-2 rounded-xl shadow-md shadow-orange-500/20">
                <Brain className="w-5 h-5" />
              </div>
              บทวิเคราะห์และข้อแนะนำการเรียนเฉพาะบุคคล
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
                ⏱️ แผนเวลาแนะนำ: 8 สัปดาห์ (สัปดาห์ละ 4 โมดูล)
              </Badge>
            </div>

            {analysis.study_tips && analysis.study_tips.length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200/80 mt-4">
                <p className="font-bold text-amber-950 text-sm mb-3 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-orange-600 fill-orange-500" /> สูตรลับและเทคนิคคิดเร็วประจำตัวน้อง:
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

        {/* 4 Subjects Module Grid */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <span>📚</span> หลักสูตรครบ 4 วิชา 32 โมดูล (สพฐ. 2551 ปรับปรุง 2560)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map(s => (
              <Card key={s.key} className={`border-2 ${s.color} shadow-md hover:shadow-xl transition-all bg-white rounded-3xl flex flex-col justify-between`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-black flex items-center gap-2 text-slate-900">
                      <span className="text-2xl">{s.emoji}</span> {s.label}
                    </h3>
                    <Badge className="bg-slate-100 text-slate-700 font-bold text-[10px]">
                      8 โมดูล (100% สพฐ.)
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed">
                    {s.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4 max-h-36 overflow-y-auto pr-1">
                    {s.modules.map((m: string) => (
                      <Badge key={m} variant="outline" className={`${s.badgeColor} text-[11px] font-semibold py-0.5`}>
                        {MODULE_LABELS[m] || m}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <Link href={s.href} className="w-full block">
                      <Button className={`${s.btnColor} text-white font-black w-full rounded-xl shadow-md`}>
                        <BookOpen className="w-4 h-4 mr-1.5" /> เข้าเรียนวิชานี้ <ChevronRight className="w-4 h-4 ml-0.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-3 pt-2 pb-8">
          <Link href="/onet-exam">
            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-black shadow-lg">
              🎯 ไปสนามสอบ O-NET 2570
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="border-2 border-orange-300 text-orange-800 hover:bg-orange-100/60 font-bold shadow-sm">
              ไปยังหน้าหลัก Dashboard <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  )
}
