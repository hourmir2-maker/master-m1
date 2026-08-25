'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import { ChevronRight, ArrowLeft, Lightbulb, CheckCircle2 } from 'lucide-react'

const MATH_MODULES = [
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
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  },
  { 
    id: 'statistics_probability', 
    title: 'สถิติ แผนภูมิวงกลม ค่าเฉลี่ย & ความน่าจะเป็น', 
    desc: '⚡ สูตรลัดแปลง % เป็นองศา (×3.6°), หาค่าเฉลี่ยเลขคณิตเมื่อมีคนเพิ่ม, ความน่าจะเป็น P(E)=n(E)/n(S) และอนุกรมเกาส์', 
    emoji: '📊', 
    lessons: 5, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  },
]

export default function MathPage() {
  const [completedModules, setCompletedModules] = useState<Record<string, number>>({})

  useEffect(() => {
    try {
      const stored = localStorage.getItem('master_m1_progress')
      if (stored) {
        const list = JSON.parse(stored)
        const map: Record<string, number> = {}
        list.forEach((item: any) => {
          if (item.subject === 'math' && item.completed) {
            map[item.moduleId || item.module_id] = item.score || 100
          }
        })
        setCompletedModules(map)
      }
    } catch (e) {
      console.warn('Error reading progress:', e)
    }
  }, [])

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
            <h1 className="text-2xl sm:text-3xl font-black">คณิตศาสตร์เตรียมสอบเข้า ม.1</h1>
            <p className="text-orange-100 text-sm mt-1 font-medium">8 โมดูลเข้มข้น • 40 ข้อสอบพร้อมสูตรลัดติดจรวดสไตล์แข่งขัน</p>
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
                <span className="text-slate-600">วาดภาพหรือแปลงโจทย์เป็นตารางก่อนคิดคำนวณ</span>
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
          {MATH_MODULES.map((mod, i) => {
            const isPassed = completedModules[mod.id] !== undefined
            const score = completedModules[mod.id]

            return (
              <Card key={mod.id} className={`border ${isPassed ? 'border-green-300 bg-green-50/20' : 'border-orange-100 bg-white'} shadow-md hover:shadow-lg transition-all rounded-2xl overflow-hidden hover:border-orange-300`}>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-2xl ${isPassed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}>
                        {isPassed ? '✅' : mod.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-xs font-bold text-orange-600">โมดูลที่ {i+1}</span>
                          <h3 className="font-bold text-base sm:text-lg text-slate-800">{mod.title}</h3>
                          <Badge variant="outline" className={`${mod.badgeColor} text-[11px] font-bold`}>
                            {mod.difficulty}
                          </Badge>
                          {isPassed && (
                            <Badge className="bg-green-600 text-white text-[11px] font-bold py-0.5 shadow-sm">
                              ✓ ผ่านแล้ว ({score}%)
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{mod.desc}</p>
                        <p className="text-[11px] text-orange-700/80 font-bold mt-2 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> {mod.lessons} บทเรียนย่อย • มีเทคนิคและโจทย์ท้าทาย
                        </p>
                      </div>
                    </div>
                    
                    <Link href={`/subjects/math/${mod.id}`} className="w-full sm:w-auto">
                      <Button className={`w-full sm:w-auto ${isPassed ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'} text-white font-bold shadow-md shadow-orange-500/20 flex-shrink-0`}>
                        {isPassed ? 'ทบทวน / ทำซ้ำ' : 'เริ่มเรียน'} <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
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
