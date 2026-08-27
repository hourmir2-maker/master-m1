'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import { 
  ChevronRight, 
  ArrowLeft, 
  Lightbulb, 
  CheckCircle2, 
  Sparkles, 
  Rocket, 
  Target,
  BookOpen
} from 'lucide-react'

const THAI_MODULES_P6 = [
  {
    id: 'thai_reading',
    title: 'การอ่านจับใจความ ตีความ โวหารภาพพจน์ & แยกแยะข้อเท็จจริง',
    desc: '⚡ เทคนิค 5W1H จับใจความใน 30 วิ, สแกนคำชี้ขาดข้อคิดเห็น, โวหารภาพพจน์ (อุปมา/อุปลักษณ์) และความหมายโดยนัย',
    emoji: '📖',
    lessons: 5,
    difficulty: 'พื้นฐาน',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200'
  },
  {
    id: 'thai_word_classes',
    title: 'ชนิดของคำ 7 ชนิด & หน้าที่ของคำในประโยค',
    desc: '⚡ สูตรแยกอาการนาม (การ/ความ), สมุหนาม vs ลักษณนาม, บุพบทเชื่อมคำ สันธานเชื่อมประโยค (ท 4.1 ป.6/1)',
    emoji: '🏷️',
    lessons: 5,
    difficulty: 'พื้นฐาน',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200'
  },
  {
    id: 'thai_royal_loanwords',
    title: 'คำราชาศัพท์ คำสุภาพ & คำยืมภาษาต่างประเทศ',
    desc: '⚡ กฎเหล็กต้องห้ามของ "ทรง", คำสุภาพยอดฮิต และสูตรสแกนคำยืม บาลี-สันสกฤต เขมร จีน อังกฤษ (ท 4.1 ป.6/2)',
    emoji: '👑',
    lessons: 5,
    difficulty: 'ปานกลาง',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
  },
  {
    id: 'thai_sentence_structures',
    title: 'โครงสร้างประโยค (สามัญ รวม ซ้อน) & ระดับภาษา',
    desc: '⚡ สแกนคำเชื่อมประโยคความรวม (และ/แต่/หรือ) vs ประโยคความซ้อน (ผู้/ที่/ซึ่ง/อัน) และระดับภาษาทางการ-กึ่งทางการ',
    emoji: '🧩',
    lessons: 5,
    difficulty: 'ปานกลาง',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
  },
  {
    id: 'thai_idioms_dialects',
    title: 'สำนวน สุภาษิต คำพังเพย & ภาษาไทยมาตรฐาน vs ภาษาถิ่น 4 ภาค',
    desc: '⚡ ตารางเปรียบเทียบคำศัพท์ 4 ภาค (เหนือ อีสาน ใต้ กลาง) และความหมายสำนวนยอดฮิตในข้อสอบ สทศ.',
    emoji: '🗣️',
    lessons: 5,
    difficulty: 'พื้นฐาน',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200'
  },
  {
    id: 'thai_literature_poetry',
    title: 'ฉันทลักษณ์ กลอนสุภาพ & วรรณคดีวรรณกรรม ป.6',
    desc: '⚡ ท่องเสียงท้ายวรรคกลอนแปด, คุณค่าวรรณคดี: รามเกียรติ์ ศึกไมยราพ, ขุนช้างขุนแผน พลายงาม, สุภาษิตสอนหญิง',
    emoji: '📜',
    lessons: 5,
    difficulty: 'ท้าทาย',
    badgeColor: 'bg-red-100 text-red-900 border-red-200'
  },
  {
    id: 'thai_writing',
    title: 'การเขียนสื่อสาร เขียนย่อความ & เขียนเรื่องตามจินตนาการ',
    desc: '⚡ เจาะลึกเกณฑ์ตรวจอัตนัย 15 คะแนน สทศ., กฎเหล็กห้ามใช้คำย่อ และโครงสร้าง 3 ท่อนทองคำพิชิตคะแนนเต็ม',
    emoji: '✍️',
    lessons: 5,
    difficulty: 'ท้าทาย',
    badgeColor: 'bg-red-100 text-red-900 border-red-200'
  },
  {
    id: 'thai_listening_speaking',
    title: 'การฟัง การดู การพูด & การวิเคราะห์สื่อโฆษณา',
    desc: '⚡ จุดจับผิดโฆษณาเกินจริง (Overclaim), การวิเคราะห์เจตนาผู้ส่งสาร และมารยาทในการสื่อสาร (ท 3.1)',
    emoji: '🎙️',
    lessons: 5,
    difficulty: 'พื้นฐาน',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-200'
  }
]

export default function ThaiSubjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/40 to-red-50 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-white/85 backdrop-blur-md border-b border-amber-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                แดชบอร์ด
              </Button>
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              📖 ภาษาไทย (Thai Language)
            </span>
          </div>

          <Link href="/onet-exam">
            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 text-white font-bold text-xs shadow-xs">
              🎯 สอบจำลอง O-NET 2570
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-3">
          <Badge className="bg-white/20 text-white border-white/30 text-xs font-bold">
            มาตรฐานหลักสูตรแกนกลาง สพฐ. (ท 1.1 - ท 5.1)
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black">
            📖 ภาษาไทย: พิชิต O-NET & สอบเข้า ม.1
          </h1>
          <p className="text-white/90 text-sm max-w-2xl leading-relaxed">
            ครอบคลุม 8 โมดูลหลัก สพฐ.: การอ่านจับใจความ, หลักภาษา 7 ชนิดคำ, คำราชาศัพท์, ประโยคซ้อน, วรรณคดี ป.6, และเทคนิคเขียนอัตนัย 15 คะแนนเต็ม
          </p>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-600" />
            เลือกบทเรียนเพื่อเริ่มติว (8 โมดูล)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {THAI_MODULES_P6.map((mod) => (
              <Link key={mod.id} href={`/subjects/thai/${mod.id}`} className="block group">
                <Card className="border border-amber-100 bg-white rounded-2xl p-5 shadow-xs group-hover:shadow-md group-hover:border-orange-300 transition-all h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{mod.emoji}</span>
                      <Badge variant="outline" className={`text-[10px] font-bold ${mod.badgeColor}`}>
                        {mod.difficulty}
                      </Badge>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-orange-600 font-bold">
                    <span>เริ่มเรียนบทนี้ ➔</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* AdSense Placement */}
        <AdBanner slotId="thai_subject_bottom" />
      </main>

      <Footer />
    </div>
  )
}
