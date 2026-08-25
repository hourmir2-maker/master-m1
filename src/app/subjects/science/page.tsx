'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import { ChevronRight, ArrowLeft, Lightbulb, CheckCircle2 } from 'lucide-react'

const SCIENCE_MODULES = [
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
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  },
  { 
    id: 'human_body', 
    title: 'ร่างกายมนุษย์และสุขภาพ (Human Body & Health)', 
    desc: '⚡ แผนผังระบบย่อยอาหาร (เอนไซม์/อวัยวะ), หัวใจ 4 ห้องและการไหลเวียนเลือด, และวิตามินที่ขาดไม่ได้ (ADEK vs BC)', 
    emoji: '🫀', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'chemical_changes', 
    title: 'การเปลี่ยนแปลงทางกายภาพและเคมี (Reactions)', 
    desc: '⚡ กายภาพ (ย้อนกลับได้) vs เคมี (ได้สารใหม่), การเกิดสนิมเหล็ก (น้ำ+ออกซิเจน), และปฏิกิริยากรด+เบส ได้เกลือ+น้ำ', 
    emoji: '🧪', 
    lessons: 5, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'scientific_inquiry', 
    title: 'ทักษะกระบวนการและการทดลอง (Inquiry & Variables)', 
    desc: '⚡ การระบุตัวแปรต้น-ตาม-ควบคุมอย่างแม่นยำ, การตั้งสมมติฐาน และการอ่านกราฟผลการทดลองสไตล์ สสวท./PISA', 
    emoji: '🔬', 
    lessons: 5, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  },
]

export default function SciencePage() {
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
          <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-xl shadow-red-500/20">
            <div className="text-5xl mb-2">🔬</div>
            <h1 className="text-2xl sm:text-3xl font-black">วิทยาศาสตร์เตรียมสอบเข้า ม.1</h1>
            <p className="text-orange-100 text-sm mt-1 font-medium">5 โมดูลเข้มข้น • 19 บทเรียนพร้อมเทคนิควิเคราะห์การทดลอง</p>
          </div>

          {/* Secret Technique Box */}
          <div className="bg-white/90 backdrop-blur-sm border border-orange-200 rounded-2xl p-5 mb-6 shadow-sm">
            <p className="text-orange-950 font-bold text-sm flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-red-500 fill-red-400" /> 
              เทคนิคเฉพาะ: SCIENCE DETECTIVE
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 text-xs">
              <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                <span className="font-bold text-red-700 block mb-0.5">1. ISOLATE VARIABLES</span>
                <span className="text-slate-600">แยกตัวแปรต้น ตัวแปรตาม และตัวแปรควบคุมให้ขาดในทุกโจทย์</span>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                <span className="font-bold text-orange-800 block mb-0.5">2. CAUSE & EFFECT</span>
                <span className="text-slate-600">คิดแบบเหตุไปสู่ผล เชื่อมโยงหลักการธรรมชาติ</span>
              </div>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <span className="font-bold text-amber-800 block mb-0.5">3. ANALOGY BRIDGE</span>
                <span className="text-slate-600">เปรียบเทียบกลไกทางวิทย์กับเหตุการณ์ในชีวิตประจำวัน</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {SCIENCE_MODULES.map((mod, i) => (
            <Card key={mod.id} className="border border-orange-100 shadow-md hover:shadow-lg transition-all bg-white rounded-2xl overflow-hidden hover:border-orange-300">
              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                      {mod.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-bold text-red-600">โมดูลที่ {i+1}</span>
                        <h3 className="font-bold text-base sm:text-lg text-slate-800">{mod.title}</h3>
                        <Badge variant="outline" className={`${mod.badgeColor} text-[11px] font-bold`}>
                          {mod.difficulty}
                        </Badge>
                      </div>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{mod.desc}</p>
                      <p className="text-[11px] text-red-700/80 font-bold mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> {mod.lessons} บทเรียนย่อย • วิเคราะห์โจทย์จำลองการทดลองจริง
                      </p>
                    </div>
                  </div>
                  
                  <Link href={`/subjects/science/${mod.id}`} className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold shadow-md shadow-red-500/20 flex-shrink-0">
                      เริ่มเรียน <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
