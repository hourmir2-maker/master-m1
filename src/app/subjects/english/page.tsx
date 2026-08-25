'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import { ChevronRight, ArrowLeft, Lightbulb, CheckCircle2 } from 'lucide-react'

const ENGLISH_MODULES = [
  { 
    id: 'grammar_basics', 
    title: 'Grammar Essentials, Tenses & SV Agreement', 
    desc: '⚡ จับสัญญาณเวลา (Time Markers) เลือก Tense ถูก 100%, Subject-Verb Agreement, และ Preposition (IN/ON/AT)', 
    emoji: '📝', 
    lessons: 5, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'vocabulary', 
    title: 'Vocabulary Power, Prefix-Suffix & Context Clues', 
    desc: '⚡ ถอดรหัสรากศัพท์ 3 วิ (Prefix-Root-Suffix), เดาศัพท์จากบริบท (Context Clues), และ Synonyms ยอดฮิต', 
    emoji: '📚', 
    lessons: 5, 
    difficulty: 'พื้นฐาน', 
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200' 
  },
  { 
    id: 'reading', 
    title: 'Reading Comprehension (Skim & Scan)', 
    desc: '⚡ เทคนิค 3S (Stop-Skim-Scan), ป้ายประกาศ (Notices), ตารางเวลา (Schedules) และการจับใจความ Main Idea', 
    emoji: '👁️', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'listening_speaking', 
    title: 'Everyday Communication & Polite Expressions', 
    desc: '⚡ คู่สนทนามารยาทสากล (ขอบคุณ/ขอโทษ/แสดงความยินดี/ถามทาง) และ Would you mind...? (ตอบ Not at all)', 
    emoji: '🎙️', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'writing', 
    title: 'Error Identification & Sentence Structure', 
    desc: '⚡ สแกน Error 3 ตำแหน่งหลัก (SV Agreement, Tense, Part of Speech) และกฎเหล็กห้ามใช้ Although คู่กับ but', 
    emoji: '✍️', 
    lessons: 5, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  },
  { 
    id: 'passive_modals', 
    title: 'Active vs Passive Voice & Modal Verbs', 
    desc: '⚡ ประโยคถูกกระทำ (is/am/are/was/were + V.3) และกริยาช่วย can, could, should, must + V.inf ไม่ผัน', 
    emoji: '🔄', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'comparison_conjunctions', 
    title: 'Comparison & Conjunctions (การเปรียบเทียบ & คำเชื่อม)', 
    desc: '⚡ ขั้นกว่ามี than (-er/more), ขั้นสุดมี the (-est/the most), และคำเชื่อมบอกเหตุผล/ผลลัพธ์ (because vs so)', 
    emoji: '⚖️', 
    lessons: 5, 
    difficulty: 'ปานกลาง', 
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' 
  },
  { 
    id: 'cloze_test', 
    title: 'Cloze Test & Paragraph Completion', 
    desc: '⚡ สแกนช่องว่าง 3 สเต็ป (หน้า-หลัง-ความหมาย), วิเคราะห์ Part of Speech เพื่อเติมคำในช่องว่างบทความอย่างแม่นยำ', 
    emoji: '📑', 
    lessons: 5, 
    difficulty: 'ท้าทาย', 
    badgeColor: 'bg-red-100 text-red-900 border-red-200' 
  },
]

export default function EnglishPage() {
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
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-xl shadow-amber-500/20">
            <div className="text-5xl mb-2">🗣️</div>
            <h1 className="text-2xl sm:text-3xl font-black">ภาษาอังกฤษเตรียมสอบเข้า ม.1</h1>
            <p className="text-orange-100 text-sm mt-1 font-medium">5 โมดูลเข้มข้น • 19 บทเรียนพร้อมเทคนิควิเคราะห์โครงสร้างประโยค</p>
          </div>

          {/* Secret Technique Box */}
          <div className="bg-white/90 backdrop-blur-sm border border-orange-200 rounded-2xl p-5 mb-6 shadow-sm">
            <p className="text-orange-950 font-bold text-sm flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-amber-600 fill-amber-400" /> 
              สูตรลับเฉพาะ: 3S METHOD
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 text-xs">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <span className="font-bold text-amber-800 block mb-0.5">1. SKIM</span>
                <span className="text-slate-600">กวาดสายตาดูหัวข้อและภาพรวม 30 วินาทีแรก</span>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                <span className="font-bold text-orange-800 block mb-0.5">2. SCAN</span>
                <span className="text-slate-600">มองหา Keyword จากคำถาม (ชื่อเฉพาะ, ตัวเลข, เวลา)</span>
              </div>
              <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                <span className="font-bold text-red-700 block mb-0.5">3. SVOP CHECK</span>
                <span className="text-slate-600">เช็คโครงสร้าง Subject + Verb + Object + Place/Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {ENGLISH_MODULES.map((mod, i) => (
            <Card key={mod.id} className="border border-orange-100 shadow-md hover:shadow-lg transition-all bg-white rounded-2xl overflow-hidden hover:border-orange-300">
              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                      {mod.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-bold text-amber-700">โมดูลที่ {i+1}</span>
                        <h3 className="font-bold text-base sm:text-lg text-slate-800">{mod.title}</h3>
                        <Badge variant="outline" className={`${mod.badgeColor} text-[11px] font-bold`}>
                          {mod.difficulty}
                        </Badge>
                      </div>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{mod.desc}</p>
                      <p className="text-[11px] text-amber-800 font-bold mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> {mod.lessons} บทเรียนย่อย • ครอบคลุมทั้ง Grammar, Vocab และ Reading
                      </p>
                    </div>
                  </div>
                  
                  <Link href={`/subjects/english/${mod.id}`} className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-md shadow-amber-500/20 flex-shrink-0">
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
