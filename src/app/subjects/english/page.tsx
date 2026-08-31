'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import { ChevronRight, ArrowLeft, Lightbulb, CheckCircle2, Rocket, Target, Sparkles, Coffee, Heart, Award } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const ENGLISH_MODULES_P6 = [
  { 
    id: 'm1_daily_vocab_collocations', 
    title: 'คำศัพท์ชีวิตประจำวัน & กลุ่มคำใช้บ่อย (Daily Life & Collocations)', 
    desc: '⚡ Oxford 3000 คำศัพท์ประจำวัน, การเลือกใช้ Make vs Do, กริยาวลี Phrasal Verbs และสำนวนบอกทาง/ช้อปปิ้ง', 
    emoji: '☕', 
    lessons: 5, 
    difficulty: 'ใช้บ่อยในชีวิตจริง', 
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200' 
  },
  { 
    id: 'grammar_basics', 
    title: 'Tenses พื้นฐาน, S-V Agreement & Pronouns', 
    desc: '⚡ กฎ Present Simple กริยาเติม s/es, ประธานเอกพจน์/พหูพจน์, Anyone/Everyone เป็นเอกพจน์, และ Subject/Object Pronouns', 
    emoji: '✍️', 
    lessons: 5, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'vocabulary', 
    title: 'คำศัพท์ หมวดหมู่ Synonyms & Antonyms', 
    desc: '⚡ เทคนิคตัดรากศัพท์ Prefix (un-, dis-, im- = ไม่) / Suffix (-tion, -ment = คำนาม), และคำศัพท์ความหมายเหมือน/ตรงข้าม', 
    emoji: '📖', 
    lessons: 5, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'reading', 
    title: 'การอ่านจับใจความ Main Idea & Inference', 
    desc: '⚡ เทคนิค 3S Method: Skim (อ่านเร็ว) + Scan (หา Keyword) + Structure (โครงสร้างประโยค) และวิธีจับ Main Idea บรรทัดแรก/ท้าย', 
    emoji: '🔍', 
    lessons: 5, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  },
  { 
    id: 'listening_speaking', 
    title: 'สำนวน บทสนทนาในชีวิตประจำวัน & Question Tags', 
    desc: '⚡ สำนวนสอบบ่อย (Piece of cake, Break a leg), กฎ Question Tag "หน้าบอกเล่า หลังปฏิเสธ", และการถาม-ตอบสุภาพ', 
    emoji: '🗣️', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'writing', 
    title: 'โครงสร้างประโยค Conjunctions & Error Identification', 
    desc: '⚡ เทคนิคจำ FANBOYS (เชื่อมประโยค), Because vs Although, และสูตรสแกนหาจุดผิดไวยากรณ์ (Error Detection)', 
    emoji: '📝', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'passive_modals', 
    title: 'Passive Voice & กริยาช่วย (Modal Verbs)', 
    desc: '⚡ โครงสร้าง Subject + be + V.3 (ประธานถูกกระทำ), การใช้ Can/Could, Must/Should, และ May/Might', 
    emoji: '🛡️', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'comparison_conjunctions', 
    title: 'การเปรียบเทียบ (Comparisons) & If-Clause Type 1', 
    desc: '⚡ ขั้นกว่า (-er/more) vs ขั้นสุด (the -est/most), โครงสร้าง If-Clause Type 1 (If + V.1, will + V.inf)', 
    emoji: '⚖️', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'cloze_test', 
    title: 'Cloze Test & การเติมคำในช่องว่าง', 
    desc: '⚡ เทคนิคดูคำข้างหน้า-ข้างหลังช่องว่าง (Part of Speech), การเลือกคำเชื่อม และการตัดช้อยส์อย่างเป็นระบบ', 
    emoji: '🧩', 
    lessons: 5, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  }
]

const ENGLISH_MODULES_M1 = [
  { 
    id: 'm1_daily_vocab_collocations', 
    title: 'คำศัพท์ชีวิตประจำวัน & กลุ่มคำใช้บ่อย (Daily Vocab & Collocations)', 
    desc: '⚡ Oxford 3000 คำศัพท์ประจำวัน, การเลือกใช้ Make vs Do, กริยาวลี Phrasal Verbs และสำนวนบอกทาง/ช้อปปิ้ง', 
    emoji: '☕', 
    lessons: 5, 
    difficulty: 'ใช้บ่อยในชีวิตจริง', 
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200' 
  },
  { 
    id: 'm1_past_tenses', 
    title: 'Past Simple vs Past Continuous (When vs While)', 
    desc: '⚡ กฎเชื่อมเหตุการณ์ในอดีต: กำลังเกิดใช้ was/were + V.ing | เข้ามาแทรกใช้ Past Simple V.2', 
    emoji: '⏳', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_present_perfect', 
    title: 'Present Perfect Tense (Experience & Result)', 
    desc: '⚡ โครงสร้าง S + have/has + V.3, การใช้ Since (จุดเริ่ม) vs For (ช่วงเวลา), Already, Yet และ Just', 
    emoji: '🎯', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_comparatives_superlatives', 
    title: 'Comparatives & Superlatives (ขั้นกว่า-ขั้นสุด)', 
    desc: '⚡ การเปลี่ยนรูป adj/adv (-er/more vs -est/most), as...as และคำเปลี่ยนรูปพิเศษ good/better/best', 
    emoji: '⚖️', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_modal_verbs', 
    title: 'Modal Auxiliaries (กริยาช่วย ม.1 เจาะลึก)', 
    desc: '⚡ Can/Could, May/Might, Must/Have to, Should/Ought to และกฎตามด้วย V.infinitive เสมอ', 
    emoji: '🔑', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_relative_clauses', 
    title: 'Relative Pronouns & Clauses (ประธานเชื่อมประโยค)', 
    desc: '⚡ การเลือกใช้ Who, Whom, Whose (เจ้าของ), Which, That และ Where ขยายคำนามอย่างถูกต้อง', 
    emoji: '🔗', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_advanced_passive', 
    title: 'Passive Voice across Multiple Tenses (ประโยคถูกกระทำ)', 
    desc: '⚡ โครงสร้าง Subject + be + V.3 ใน Past, Present, Future และ Modals Passive', 
    emoji: '🛡️', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_conditionals_type1_2', 
    title: 'Second Conditional Sentences (สมมติในปัจจุบัน)', 
    desc: '⚡ โครงสร้าง If + V.2, would + V.inf และกฎการใช้ If I were you กับประธานทุกตัว', 
    emoji: '🔮', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_context_clues_reading', 
    title: 'Context Clues & Academic Reading Comprehension', 
    desc: '⚡ 4 สัญญาณเดาศัพท์จากบริบท (Definition, Synonym, Contrast, Cause-Effect) และ Main Idea', 
    emoji: '📖', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  }
]

export default function EnglishSubjectPage() {
  const [activeTrack, setActiveTrack] = useState<'p6' | 'm1'>('p6')
  const [completedModules, setCompletedModules] = useState<Record<string, number>>({})
  const [userProfile, setUserProfile] = useState<{ email?: string; full_name?: string } | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
          setUserProfile({ email: user.email, full_name: profile?.full_name })
        } else {
          const savedName = localStorage.getItem('master_m1_user_name')
          if (savedName) setUserProfile({ full_name: savedName })
        }
      } catch (e) {
        console.warn('Auth check error:', e)
      }

      try {
        const stored = localStorage.getItem('master_m1_progress')
        if (stored) {
          const list = JSON.parse(stored)
          const map: Record<string, number> = {}
          list.forEach((item: { subject?: string; completed?: boolean; moduleId?: string; module_id?: string; score?: number }) => {
            if (item.subject === 'english' && item.completed) {
              map[item.moduleId || item.module_id || ''] = item.score || 100
            }
          })
          setCompletedModules(map)
        }
      } catch (e) {
        console.warn('Error reading progress:', e)
      }
    }
    loadData()
  }, [])

  const isPhumrapee = userProfile?.email === 'phumrapeeft@gmail.com' || (userProfile?.full_name && userProfile.full_name.includes('ภูมิรพีร์'))

  const currentModules = activeTrack === 'p6' ? ENGLISH_MODULES_P6 : ENGLISH_MODULES_M1

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 pt-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4 text-amber-800 hover:bg-amber-100 font-semibold">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> กลับหน้า Dashboard
            </Button>
          </Link>

          {/* Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-xl shadow-amber-500/20">
            <div className="text-5xl mb-2">🗣️</div>
            <h1 className="text-2xl sm:text-3xl font-black">ภาษาอังกฤษ MASTER ม.1</h1>
            <p className="text-amber-100 text-sm mt-1 font-medium">
              ครอบคลุมหลักสูตร สพฐ. ป.6 ติวสอบเข้า ม.1 และเนื้อหา ม.1 ล่วงหน้า
            </p>
          </div>

          {/* Spotlight Quick Access for Daily Vocab */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl p-4 sm:p-5 mb-6 shadow-lg shadow-emerald-600/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
                ☕
              </div>
              <div>
                <h4 className="font-black text-sm sm:text-base flex items-center gap-2">
                  <span>โมดูลใหม่: คำศัพท์ชีวิตประจำวัน & กลุ่มคำใช้บ่อย</span>
                  <Badge className="bg-amber-400 text-emerald-950 font-black text-[10px]">HOT</Badge>
                </h4>
                <p className="text-emerald-100 text-xs mt-0.5">
                  รวม Oxford 3000 คำศัพท์, การใช้ Make vs Do, กริยาวลี และการเอาตัวรอดในชีวิตจริง
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Link href="/vocab-bank" className="w-full sm:w-auto">
                <Button size="sm" variant="outline" className="bg-white/15 hover:bg-white/25 text-white border-white/30 font-bold text-xs w-full shadow-sm">
                  📖 เปิดคลังศัพท์ Oxford 3000
                </Button>
              </Link>
              <Link href="/subjects/english/m1_daily_vocab_collocations" className="w-full sm:w-auto">
                <Button size="sm" className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs w-full shadow-sm">
                  เริ่มบทเรียนเลย →
                </Button>
              </Link>
            </div>
          </div>

          {/* Track Switcher */}
          <div className="flex gap-2 p-1.5 bg-amber-100/80 border border-amber-200 rounded-2xl mb-6 shadow-sm">
            <button
              onClick={() => setActiveTrack('p6')}
              className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTrack === 'p6'
                  ? 'bg-white text-amber-900 shadow-md scale-[1.02]'
                  : 'text-slate-600 hover:text-amber-900'
              }`}
            >
              <Target className="w-4 h-4 text-amber-600" />
              <span>🎯 ติวสอบเข้า ม.1 (ป.6) [9 บท]</span>
            </button>
            <button
              onClick={() => setActiveTrack('m1')}
              className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTrack === 'm1'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md scale-[1.02]'
                  : 'text-slate-600 hover:text-purple-900'
              }`}
            >
              <Rocket className="w-4 h-4 text-amber-300" />
              <span>🚀 เรียนล่วงหน้า ม.1 (Advance) [9 บท]</span>
            </button>
          </div>

          {/* Secret Formula Box */}
          <div className="bg-white/90 backdrop-blur-sm border border-amber-200 rounded-2xl p-5 mb-6 shadow-sm">
            <p className="text-amber-950 font-bold text-sm flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-amber-600 fill-amber-500" /> 
              สูตรลับเฉพาะ: 3S READING METHOD
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 text-xs">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <span className="font-bold text-amber-700 block mb-0.5">1. SKIM</span>
                <span className="text-slate-600">กวาดตาอ่านหัวข้อและประโยคแรก-ท้าย เพื่อจับ Main Idea</span>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                <span className="font-bold text-orange-800 block mb-0.5">2. SCAN</span>
                <span className="text-slate-600">หา Keyword สำคัญ เช่น ตัวเลข, ชื่อเฉพาะ, ปี ค.ศ., สถานที่</span>
              </div>
              <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                <span className="font-bold text-red-700 block mb-0.5">3. STRUCTURE</span>
                <span className="text-slate-600">วิเคราะห์โครงสร้าง S + V + O + P ตัดช้อยส์ไวยากรณ์ผิด</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {currentModules.map((mod, i) => {
            const isPassed = completedModules[mod.id] !== undefined
            const score = completedModules[mod.id]

            return (
              <Card 
                key={mod.id}
                className="bg-white/90 backdrop-blur-sm border border-amber-100/80 hover:border-amber-300 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group"
              >
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-100 to-orange-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {mod.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-400">บทที่ {i + 1}</span>
                        <Badge className={`text-[10px] font-bold ${mod.badgeColor}`}>
                          {mod.difficulty}
                        </Badge>
                        {isPassed && (
                          <span className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> ผ่านแล้ว ({score}%)
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors text-sm sm:text-base">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>
                  </div>

                  <Link href={`/subjects/english/${mod.id}`}>
                    <Button 
                      size="sm" 
                      className={`font-bold rounded-xl shadow-md transition-all ${
                        activeTrack === 'm1'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/20'
                          : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-amber-500/20'
                      }`}
                    >
                      เริ่มเรียน <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Special Mentoring & Motivation Card (Personalized for Nong Fortune) */}
        {isPhumrapee ? (
          <div className="mt-8 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-lg space-y-3 border-2 border-amber-300/30">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 text-xs font-bold px-3 py-1 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" /> พิเศษเฉพาะ: ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)
              </Badge>
              <Badge className="bg-amber-400/30 text-amber-100 border-amber-300/40 text-xs font-bold">
                🎯 เส้นทางสู่ห้องเรียนพิเศษ ม.1 EP / Gifted & สากล
              </Badge>
            </div>
            <h3 className="text-xl font-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-200" />
              ข้อคิดและกำลังใจจากคุณพ่อไพโรจน์ มากแก้ว
            </h3>
            <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-medium">
              &ldquo;ภาษาอังกฤษคือสะพานเชื่อมฟอร์จูนเข้าสู่วารสารการแพทย์และวิทยาศาสตร์ระดับสากล ไม่ต้องกลัวความผิดพลาด ยิ่งฝึกพูด ฝึกอ่าน และใช้เทคนิคตัดช้อยส์ 3 วินาทีทุกวัน ฟอร์จูนจะเก่งภาษาอังกฤษอย่างเป็นธรรมชาติแน่นอน พ่อเป็นกำลังใจให้ลูกเสมอ!&rdquo;
            </p>
          </div>
        ) : (
          <div className="mt-8 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-lg space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 text-xs font-bold px-3 py-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-200" /> เส้นทางสู่ห้องเรียนพิเศษ ม.1 (EP, MEP & Gifted)
              </Badge>
              <Badge className="bg-amber-400/30 text-amber-100 border-amber-300/40 text-xs font-bold">
                ⚡ สรุปหัวใจภาษาอังกฤษ 3 วินาที
              </Badge>
            </div>
            <h3 className="text-xl font-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-200" />
              ข้อคิดและเทคนิคพิชิตภาษาอังกฤษ MASTER ม.1
            </h3>
            <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-medium">
              &ldquo;ภาษาอังกฤษระดับสอบเข้า ม.1 และห้องเรียนพิเศษ EP เน้นความแม่นยำด้านโครงสร้างไวยากรณ์ (Grammar), คลังคำศัพท์ Oxford 3000 และทักษะการอ่านเร็ว 3S Method ฝึกฝนสม่ำเสมอแล้วห้องเรียนพิเศษในฝันจะเป็นของเรา!&rdquo;
            </p>
          </div>
        )}

        {/* AdSense Placement */}
        <div className="mt-6">
          <AdBanner slotId="english_subject_bottom" />
        </div>
      </div>

      <Footer />
    </div>
  )
}
