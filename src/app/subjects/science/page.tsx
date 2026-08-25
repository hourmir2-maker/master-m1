'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, ArrowLeft, Lightbulb, CheckCircle2 } from 'lucide-react'

const SCIENCE_MODULES = [
  { 
    id: 'living_things', 
    title: 'สิ่งมีชีวิต พืช สัตว์ และระบบนิเวศ', 
    desc: 'โครงสร้างเซลล์พืช-สัตว์, การสังเคราะห์ด้วยแสง, ห่วงโซ่อาหาร และการปรับตัวของสิ่งมีชีวิต', 
    emoji: '🌱', 
    lessons: 4, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'matter_properties', 
    title: 'สารบริสุทธิ์ สารผสม และการแยกสาร', 
    desc: 'สถานะและการเปลี่ยนรูป, การกรอง ตกผลึก กลั่น, อินดิเคเตอร์ทดสอบกรด-เบส', 
    emoji: '⚗️', 
    lessons: 4, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'force_motion', 
    title: 'แรง การเคลื่อนที่ และความดัน', 
    desc: 'กฎการเคลื่อนที่, แรงโน้มถ่วง แรงเสียดทาน แรงพยุง, การคำนวณงานและโมเมนต์ของแรง', 
    emoji: '⚡', 
    lessons: 4, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'energy', 
    title: 'พลังงาน ความร้อน แสง เสียง และไฟฟ้า', 
    desc: 'การถ่ายโอนความร้อน, การหักเหของแสงและเลนส์, วงจรไฟฟ้าอนุกรม-ขนาน', 
    emoji: '💡', 
    lessons: 4, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'earth_space', 
    title: 'โลก ธรณีวิทยา ดาราศาสตร์ และอวกาศ', 
    desc: 'โครงสร้างโลก หิน ดิน แร่, ลมฟ้าอากาศ พายุ, ระบบสุริยะ และปรากฏการณ์ข้างขึ้น-ข้างแรม', 
    emoji: '🌍', 
    lessons: 3, 
    difficulty: 'ปานกลาง', 
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
    </div>
  )
}
