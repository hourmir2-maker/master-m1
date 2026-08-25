'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, ArrowLeft, Lightbulb, CheckCircle2 } from 'lucide-react'

const MATH_MODULES = [
  { 
    id: 'numbers_basics', 
    title: 'ตัวเลขและการดำเนินการ & ห.ร.ม./ค.ร.น.', 
    desc: 'เทคนิคตัดช้อยส์, แยกตัวประกอบเร็ว, โจทย์ปัญหา ค.ร.น. ห.ร.ม. ประยุกต์', 
    emoji: '🔢', 
    lessons: 4, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'fractions_decimals', 
    title: 'เศษส่วน ทศนิยม และร้อยละ', 
    desc: 'สูตรคิดเลขไวเรื่องกำไร-ขาดทุน, ดอกเบี้ย, อัตราส่วนและร้อยละสะสม', 
    emoji: '½', 
    lessons: 4, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'algebra_intro', 
    title: 'พีชคณิตและสมการตัวแปรเดียว', 
    desc: 'เทคนิค "ตราชั่งสมดุล", ย้ายข้างแก้สมการใน 10 วินาที, ตีโจทย์อายุและเงิน', 
    emoji: '✏️', 
    lessons: 3, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'geometry', 
    title: 'เรขาคณิต พื้นที่ และปริมาตร', 
    desc: 'สูตรลับเส้นขนาน, พับรูปตัดแปะหาพื้นที่แรเงา, ปริมาตรทรงกระบอกและปริซึม', 
    emoji: '📐', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'statistics', 
    title: 'สถิติ แผนภูมิ และความน่าจะเป็น', 
    desc: 'วิเคราะห์แผนภูมิวงกลม, คำนวณค่าเฉลี่ยถ่วงน้ำหนัก, หาความน่าจะเป็นลูกเต๋า/เหรียญ', 
    emoji: '📊', 
    lessons: 3, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  },
]

export default function MathPage() {
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
            <p className="text-orange-100 text-sm mt-1 font-medium">5 โมดูลเข้มข้น • 19 บทเรียนพร้อมแบบฝึกหัดสไตล์สอบแข่งขัน</p>
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
          {MATH_MODULES.map((mod, i) => (
            <Card key={mod.id} className="border border-orange-100 shadow-md hover:shadow-lg transition-all bg-white rounded-2xl overflow-hidden hover:border-orange-300">
              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                      {mod.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-bold text-orange-600">โมดูลที่ {i+1}</span>
                        <h3 className="font-bold text-base sm:text-lg text-slate-800">{mod.title}</h3>
                        <Badge variant="outline" className={`${mod.badgeColor} text-[11px] font-bold`}>
                          {mod.difficulty}
                        </Badge>
                      </div>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{mod.desc}</p>
                      <p className="text-[11px] text-orange-700/80 font-bold mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> {mod.lessons} บทเรียนย่อย • มีเทคนิคและโจทย์ท้าทาย
                      </p>
                    </div>
                  </div>
                  
                  <Link href={`/subjects/math/${mod.id}`} className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-md shadow-orange-500/20 flex-shrink-0">
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
