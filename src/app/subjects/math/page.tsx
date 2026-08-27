'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import { ChevronRight, ArrowLeft, Lightbulb, CheckCircle2, Sparkles, Rocket, Target } from 'lucide-react'

const MATH_MODULES_P6 = [
  { 
    id: 'numbers_basics', 
    title: 'ตัวเลข การดำเนินการ ห.ร.ม. / ค.ร.น. & เทคนิคถอดรูท', 
    desc: '⚡ เทคนิคถอดรูท (√) ใน 3 วิ, สูตรลัดคูณ 11/25/99, ยกกำลังสองลงท้าย 5, และตัดช้อยส์ ห.ร.ม. / ค.ร.น.', 
    emoji: '🔢', 
    lessons: 5, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'fractions_decimals', 
    title: 'เศษส่วน ทศนิยม & การคำนวณระคน', 
    desc: '⚡ เทคนิคคูณไขว้เปรียบเทียบเศษส่วนใน 2 วินาที, เศษส่วนซ้อน, และโจทย์ตัดเชือกเหลือเศษส่วนต่อเนื่อง', 
    emoji: '½', 
    lessons: 5, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'percentages', 
    title: 'ร้อยละ กำไร-ขาดทุน & ดอกเบี้ย', 
    desc: '⚡ สูตรลัดตัวคูณรวดเดียว 1 บรรทัด, กำไรซ้อนลดราคา, บัญญัติไตรยางศ์ย้อนกลับหาทุนแท้จริง', 
    emoji: '🏷️', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'algebra_intro', 
    title: 'พีชคณิต สมการเชิงเส้น & โจทย์ปัญหา', 
    desc: '⚡ เทคนิคสมมติขาเป็ด-ขาหมู, สูตรลัดทำงานพร้อมกัน (A×B)/(A+B), และตารางอายุ 3 ยุค', 
    emoji: '✏️', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'geometry', 
    title: 'เรขาคณิต 2 มิติ เส้นขนาน & พื้นที่แรเงา', 
    desc: '⚡ สูตรลัดพื้นที่ใบไม้ (4/7)a², ผลต่างกำลังสองพื้นที่วงแหวน, และมุมแย้งเส้นขนานรูปตัว Z/U', 
    emoji: '📐', 
    lessons: 5, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'ratio_proportion', 
    title: 'อัตราส่วนและมาตราส่วน (Ratio & Scale)', 
    desc: '⚡ เทคนิคเชื่อมสะพานตัวกลาง A:B:C ด้วย ค.ร.น., การแบ่งเงินตามสัดส่วน, และคำนวณระยะทางจริงจากแผนที่', 
    emoji: '⚖️', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'geometry_3d', 
    title: 'รูปทรง 3 มิติ ปริมาตรและความจุ (3D Geometry)', 
    desc: '⚡ เทคนิคการแทนที่น้ำหาก้อนหิน, ปริมาตรทรงสี่เหลี่ยม/ทรงกระบอก, รูปคลี่เรขาคณิต และแปลง cm³ เป็นลิตร', 
    emoji: '📦', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'statistics_probability', 
    title: 'สถิติ แผนภูมิวงกลม & ความน่าจะเป็น', 
    desc: '⚡ เทคนิคแปลง % เป็นมุมที่จุดศูนย์กลาง (คูณ 3.6°), ค่าเฉลี่ยเลขคณิตสมดุล, และสูตรความน่าจะเป็น P(E) = n(E)/n(S)', 
    emoji: '📊', 
    lessons: 5, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  }
]

const MATH_MODULES_M1 = [
  { 
    id: 'm1_integers', 
    title: 'จำนวนเต็มและการดำเนินการ (Integers Mastery)', 
    desc: '⚡ กฎเครื่องหมายลบคูณลบเป็นบวก, ค่าสัมบูรณ์ |a|, เส้นจำนวน และสมบัติการแจกแจงพีชคณิต', 
    emoji: '➕➖', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_exponents', 
    title: 'เลขยกกำลังและสัญกรณ์วิทยาศาสตร์ (Exponents)', 
    desc: '⚡ กฎ 5 ข้อของเลขยกกำลัง aᵐ×aⁿ=aᵐ⁺ⁿ, กำลังติดลบ a⁻ⁿ=1/aⁿ และสัญกรณ์วิทย์ A × 10ⁿ', 
    emoji: '🔟', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_linear_equations', 
    title: 'สมการเชิงเส้นตัวแปรเดียว & โจทย์ปัญหา ม.1', 
    desc: '⚡ การย้ายข้างสมการ, กำจัดตัวส่วนด้วย ค.ร.น. และตั้งสมการโจทย์ปัญหาอายุ/เงิน/ระยะทาง', 
    emoji: '⚖️', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_ratios_proportions', 
    title: 'อัตราส่วน สัดส่วน และร้อยละ ม.1 (Proportions)', 
    desc: '⚡ สัดส่วนตรง (คูณไขว้) vs สัดส่วนผกผัน (ผลคูณคงที่), อัตราส่วน 3 จำนวน และโจทย์คนทำงาน', 
    emoji: '📊', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_linear_graphs', 
    title: 'กราฟและความสัมพันธ์เชิงเส้น (Linear Graphs)', 
    desc: '⚡ คู่อันดับ (x,y), จตุภาค 1-4 (Quadrants), สมการเส้นตรง y = mx + c และความชัน Slope', 
    emoji: '📈', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_statistics', 
    title: 'สถิติและการนำเสนอข้อมูล ม.1 (Data Analysis)', 
    desc: '⚡ ค่าเฉลี่ยเลขคณิต (Mean), มัธยฐาน (Median), ฐานนิยม (Mode) และแผนภาพต้น-ใบ', 
    emoji: '📉', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_geometric_transformations', 
    title: 'การแปลงทางเรขาคณิต (Transformations)', 
    desc: '⚡ การเลื่อนขนาน (Translation), การสะท้อนข้ามแกน (Reflection) และการหมุน (Rotation)', 
    emoji: '🔄', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_constructions', 
    title: 'การสร้างทางเรขาคณิตด้วยวงเวียนและสันตรง', 
    desc: '⚡ การแบ่งครึ่งส่วนของเส้นตรง, แบ่งครึ่งมุม และการสร้างมุมมาตรฐาน 60°, 90°, 75°, 45°', 
    emoji: '📐', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  }
]

export default function MathSubjectPage() {
  const [activeTrack, setActiveTrack] = useState<'p6' | 'm1'>('p6')
  const [completedModules, setCompletedModules] = useState<Record<string, number>>({})

  useEffect(() => {
    try {
      const stored = localStorage.getItem('master_m1_progress')
      if (stored) {
        const list = JSON.parse(stored)
        const map: Record<string, number> = {}
        list.forEach((item: { subject?: string; completed?: boolean; moduleId?: string; module_id?: string; score?: number }) => {
          if (item.subject === 'math' && item.completed) {
            map[item.moduleId || item.module_id || ''] = item.score || 100
          }
        })
        setCompletedModules(map)
      }
    } catch (e) {
      console.warn('Error reading progress:', e)
    }
  }, [])

  const currentModules = activeTrack === 'p6' ? MATH_MODULES_P6 : MATH_MODULES_M1

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 p-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 pt-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4 text-orange-800 hover:bg-orange-100 font-semibold">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> กลับหน้า Dashboard
            </Button>
          </Link>

          {/* Banner */}
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-xl shadow-orange-500/20">
            <div className="text-5xl mb-2">🔢</div>
            <h1 className="text-2xl sm:text-3xl font-black">คณิตศาสตร์ MASTER ม.1</h1>
            <p className="text-orange-100 text-sm mt-1 font-medium">
              ครอบคลุมหลักสูตร สพฐ. ป.6 ติวสอบเข้า ม.1 และเนื้อหา ม.1 ล่วงหน้า
            </p>
          </div>

          {/* Track Switcher */}
          <div className="flex gap-2 p-1.5 bg-orange-100/80 border border-orange-200 rounded-2xl mb-6 shadow-sm">
            <button
              onClick={() => setActiveTrack('p6')}
              className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTrack === 'p6'
                  ? 'bg-white text-orange-900 shadow-md scale-[1.02]'
                  : 'text-slate-600 hover:text-orange-900'
              }`}
            >
              <Target className="w-4 h-4 text-orange-600" />
              <span>🎯 ติวสอบเข้า ม.1 (ป.6) [8 บท]</span>
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
              <span>🚀 เรียนล่วงหน้า ม.1 (Advance) [8 บท]</span>
            </button>
          </div>

          {/* Secret Formula Box */}
          <div className="bg-white/90 backdrop-blur-sm border border-orange-200 rounded-2xl p-5 mb-6 shadow-sm">
            <p className="text-orange-950 font-bold text-sm flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-orange-600 fill-orange-500" /> 
              สูตรลับเฉพาะ: 3-STEP ATTACK
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 text-xs">
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                <span className="font-bold text-orange-700 block mb-0.5">1. DRAW IT</span>
                <span className="text-slate-600">วาดภาพหรือแปลงโจทย์เป็นตาราง/บาร์โมเดลก่อนคำนวณ</span>
              </div>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <span className="font-bold text-amber-800 block mb-0.5">2. ESTIMATE FIRST</span>
                <span className="text-slate-600">ประมาณการคำตอบคร่าวๆ เพื่อตัดช้อยส์ที่เป็นไปไม่ได้</span>
              </div>
              <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                <span className="font-bold text-red-700 block mb-0.5">3. REVERSE CHECK</span>
                <span className="text-slate-600">แทนค่าคำตอบย้อนกลับเข้าโจทย์ เพื่อความถูกต้อง 100%</span>
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
                className="bg-white/90 backdrop-blur-sm border border-orange-100/80 hover:border-orange-300 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group"
              >
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-100 to-amber-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
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
                      <h3 className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors text-sm sm:text-base">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>
                  </div>

                  <Link href={`/subjects/math/${mod.id}`}>
                    <Button 
                      size="sm" 
                      className={`font-bold rounded-xl shadow-md transition-all ${
                        activeTrack === 'm1'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/20'
                          : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-orange-500/20'
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
      </div>

      <Footer />
    </div>
  )
}
