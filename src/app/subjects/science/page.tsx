'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import { ChevronRight, ArrowLeft, Lightbulb, CheckCircle2, Rocket, Target, Sparkles, Heart, Award } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const SCIENCE_MODULES_P6 = [
  { 
    id: 'living_things', 
    title: 'สิ่งมีชีวิต เซลล์ พืช สัตว์ & ระบบนิเวศ', 
    desc: '⚡ ออร์แกเนลล์เซลล์พืช vs สัตว์, การสังเคราะห์ด้วยแสง, กฎ 10% พีระมิดพลังงาน และภาวะความสัมพันธ์', 
    emoji: '🌱', 
    lessons: 5, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'matter_properties', 
    title: 'สารบริสุทธิ์ สารผสม & เทคนิคการแยกสาร', 
    desc: '⚡ กราฟจุดเดือดสารบริสุทธิ์ vs สารผสม, การกรอง ตกผลึก กลั่น โครมาโทกราฟี และการทดสอบกรด-เบส', 
    emoji: '⚗️', 
    lessons: 5, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'force_motion', 
    title: 'แรง การเคลื่อนที่ ความดัน & แรงลอยตัว', 
    desc: '⚡ สัดส่วนวัตถุจม Dวัตถุ/Dน้ำ, สมดุลโมเมนต์คาน, ความดันของเหลวกับความลึก และแปลง km/h ↔ m/s', 
    emoji: '⚡', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'energy', 
    title: 'พลังงาน ความร้อน แสง เลนส์ & ไฟฟ้า', 
    desc: '⚡ การถ่ายโอนความร้อน 3 แบบ (นำ พา แผ่รังสี), วงจรไฟฟ้าบ้าน (ขนาน), และภาพกระจกนูน/เว้า เลนส์นูน/เว้า', 
    emoji: '💡', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'earth_space', 
    title: 'โลก ดาราศาสตร์ บรรยากาศ & ภัยธรรมชาติ', 
    desc: '⚡ น้ำเกิด-น้ำตาย (ขึ้น/แรม 15 ค่ำ vs 8 ค่ำ), สุริยุปราคา-จันทรุปราคา, ชั้นบรรยากาศ และลมบก-ลมทะเล', 
    emoji: '🌍', 
    lessons: 5, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  },
  { 
    id: 'human_body', 
    title: 'ร่างกายมนุษย์ การย่อย เลือด & การหายใจ', 
    desc: '⚡ ลำดับการย่อยแป้ง-โปรตีน-ไขมัน, หัวใจ 4 ห้อง (ล่างซ้ายหนาสุด), ระบบขับถ่าย และการแลกเปลี่ยนแก๊ส', 
    emoji: '🫀', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'chemical_changes', 
    title: 'การเปลี่ยนแปลงทางกายภาพและเคมี', 
    desc: '⚡ 4 สัญญาณเกิดปฏิกิริยาเคมี (สี/แก๊ส/ตะกอน/ความร้อน), การเกิดสนิม (เหล็ก+น้ำ+O₂), ปฏิกิริยากรดกับโลหะ', 
    emoji: '🔬', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'scientific_inquiry', 
    title: 'ทักษะกระบวนการวิทย์ & การออกแบบทดลอง', 
    desc: '⚡ เทคนิคแยกตัวแปรต้น-ตัวแปรตาม-ตัวแปรควบคุม, การวิเคราะห์ตารางและกราฟผลการทดลอง', 
    emoji: '📊', 
    lessons: 5, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  }
]

const SCIENCE_MODULES_M1 = [
  { 
    id: 'm1_microscope_cells', 
    title: 'กล้องจุลทรรศน์ & เซลล์พืชสัตว์เชิงลึก', 
    desc: '⚡ คำนวณกำลังขยายรวม, ภาพเสมือนหัวกลับ 180°, ไมโทคอนเดรีย และเยื่อเลือกผ่าน Cell Membrane', 
    emoji: '🔬', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_cellular_transport', 
    title: 'การลำเลียงสารเข้า-ออกจากเซลล์ (Cell Transport)', 
    desc: '⚡ การแพร่ (Diffusion), ออสโมซิส (Hypo/Hyper/Isotonic), เซลล์เต่ง/เหี่ยว และ Active Transport', 
    emoji: '💧', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_plant_transport_photosynthesis', 
    title: 'การสังเคราะห์ด้วยแสง & การลำเลียงของพืช', 
    desc: '⚡ สมการสังเคราะห์ด้วยแสง, ไซเลม (Xylem-น้ำ) vs โฟลเอ็ม (Phloem-อาหาร) และการคายน้ำผ่านปากใบ', 
    emoji: '🌿', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_plant_reproduction', 
    title: 'การสืบพันธุ์ & การขยายพันธุ์ของพืชดอก', 
    desc: '⚡ การปฏิสนธิซ้อน (Double Fertilization), เอนโดสเปิร์ม (3n), และการเพาะเลี้ยงเนื้อเยื่อ (Tissue Culture)', 
    emoji: '🌸', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_thermal_physics', 
    title: 'ความร้อนและการเปลี่ยนแปลงของสาร (Q=mcΔt & Q=mL)', 
    desc: '⚡ สูตรคำนวณความร้อนเปลี่ยนอุณหภูมิ vs เปลี่ยนสถานะ, ความร้อนแฝง และสมดุลความร้อน Qสูญเสีย = Qได้รับ', 
    emoji: '🔥', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_substances_separation', 
    title: 'สารบริสุทธิ์ สารผสม & การแยกสารขั้นสูง', 
    desc: '⚡ การกลั่นลำดับส่วน, การสกัดด้วยไอน้ำ, โครมาโทกราฟีกระดาษ และสูตรคำนวณค่า Rf', 
    emoji: '🧪', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_atmosphere_weather', 
    title: 'ชั้นบรรยากาศ ความกดอากาศ และความชื้น', 
    desc: '⚡ 5 ชั้นบรรยากาศ (โทรโพสเฟียร์, สตราโทสเฟียร์โอโซน), บารอมิเตอร์ และไฮโกรมิเตอร์วัดความชื้น', 
    emoji: '☁️', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  },
  { 
    id: 'm1_climate_change', 
    title: 'ลมฟ้าอากาศ พายุ & การเปลี่ยนแปลงภูมิอากาศ', 
    desc: '⚡ การจำแนกความเร็วพายุ (ดีเปรสชัน/โซนร้อน/ไต้ฝุ่น ≥ 118 km/h), ลมมรสุม และเอลนีโญ-ลานีญา', 
    emoji: '🌪️', 
    lessons: 5, 
    difficulty: 'ม.1 ล่วงหน้า', 
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200' 
  }
]

export default function ScienceSubjectPage() {
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
            if (item.subject === 'science' && item.completed) {
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

  const currentModules = activeTrack === 'p6' ? SCIENCE_MODULES_P6 : SCIENCE_MODULES_M1

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 p-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 pt-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4 text-red-800 hover:bg-red-100 font-semibold">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> กลับหน้า Dashboard
            </Button>
          </Link>

          {/* Banner */}
          <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-xl shadow-red-500/20">
            <div className="text-5xl mb-2">🔬</div>
            <h1 className="text-2xl sm:text-3xl font-black">วิทยาศาสตร์ MASTER ม.1</h1>
            <p className="text-red-100 text-sm mt-1 font-medium">
              ครอบคลุมหลักสูตร สพฐ. ป.6 ติวสอบเข้า ม.1 และเนื้อหา ม.1 ล่วงหน้า
            </p>
          </div>

          {/* Track Switcher */}
          <div className="flex gap-2 p-1.5 bg-red-100/80 border border-red-200 rounded-2xl mb-6 shadow-sm">
            <button
              onClick={() => setActiveTrack('p6')}
              className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTrack === 'p6'
                  ? 'bg-white text-red-900 shadow-md scale-[1.02]'
                  : 'text-slate-600 hover:text-red-900'
              }`}
            >
              <Target className="w-4 h-4 text-red-600" />
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
          <div className="bg-white/90 backdrop-blur-sm border border-red-200 rounded-2xl p-5 mb-6 shadow-sm">
            <p className="text-red-950 font-bold text-sm flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-red-600 fill-red-500" /> 
              สูตรลับเฉพาะ: SCIENCE DETECTIVE
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 text-xs">
              <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                <span className="font-bold text-red-700 block mb-0.5">1. INDEPENDENT VAR</span>
                <span className="text-slate-600">ตัวแปรต้น คือสิ่งที่จัดให้ต่างกันเพื่อทดลอง</span>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                <span className="font-bold text-orange-800 block mb-0.5">2. DEPENDENT VAR</span>
                <span className="text-slate-600">ตัวแปรตาม คือผลลัพธ์ที่ต้องสังเกตหรือวัดค่า</span>
              </div>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <span className="font-bold text-amber-800 block mb-0.5">3. CONTROLLED VAR</span>
                <span className="text-slate-600">ตัวแปรควบคุม คือสิ่งที่ต้องควบคุมให้เหมือนกันทุกชุด</span>
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
                className="bg-white/90 backdrop-blur-sm border border-red-100/80 hover:border-red-300 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden group"
              >
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-100 to-orange-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
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
                      <h3 className="font-bold text-slate-800 group-hover:text-red-600 transition-colors text-sm sm:text-base">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>
                  </div>

                  <Link href={`/subjects/science/${mod.id}`}>
                    <Button 
                      size="sm" 
                      className={`font-bold rounded-xl shadow-md transition-all ${
                        activeTrack === 'm1'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/20'
                          : 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-red-500/20'
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
          <div className="mt-8 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-3xl p-6 text-white shadow-lg space-y-3 border-2 border-amber-300/30">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 text-xs font-bold px-3 py-1 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" /> พิเศษเฉพาะ: ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)
              </Badge>
              <Badge className="bg-amber-400/30 text-amber-100 border-amber-300/40 text-xs font-bold">
                🎯 เส้นทางสู่ห้องเรียนพิเศษ ม.1 Gifted & เภสัชกร
              </Badge>
            </div>
            <h3 className="text-xl font-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-200" />
              ข้อคิดและกำลังใจจากคุณพ่อไพโรจน์ มากแก้ว
            </h3>
            <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-medium">
              &ldquo;วิทยาศาสตร์คือการสังเกต คิดวิเคราะห์อย่างเป็นเหตุเป็นผล และการทดลองจริง ความรู้ชีววิทยาและเคมีจะเป็นบันไดขั้นสำคัญสู่ความฝันการเป็นเภสัชกรและนักวิทยาศาสตร์ผู้สร้างสรรค์ พ่อเชื่อมั่นในตัวฟอร์จูนเสมอ สู้ๆ นะลูก!&rdquo;
            </p>
          </div>
        ) : (
          <div className="mt-8 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-3xl p-6 text-white shadow-lg space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30 text-xs font-bold px-3 py-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-200" /> เส้นทางสู่ห้องเรียนพิเศษ ม.1 (Gifted & SMP)
              </Badge>
              <Badge className="bg-amber-400/30 text-amber-100 border-amber-300/40 text-xs font-bold">
                ⚡ สรุปหัวใจวิทย์ 3 วินาที
              </Badge>
            </div>
            <h3 className="text-xl font-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-200" />
              ข้อคิดและเทคนิคพิชิตวิทยาศาสตร์ MASTER ม.1
            </h3>
            <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-medium">
              &ldquo;วิทยาศาสตร์ระดับสอบเข้า ม.1 เน้นการคิดเชิงตรรกะ ทักษะการทดลอง และการเชื่อมโยงสูตรฟิสิกส์-เคมี-ชีวะ ฝึกฝนวิเคราะห์ตัวแปรและจับจุดลวง สทศ. ทุกวัน เพื่อคว้าคะแนนเต็ม 100%!&rdquo;
            </p>
          </div>
        )}

        {/* AdSense Placement */}
        <div className="mt-6">
          <AdBanner slotId="science_subject_bottom" />
        </div>
      </div>

      <Footer />
    </div>
  )
}
