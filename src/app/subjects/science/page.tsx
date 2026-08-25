'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'

const SCIENCE_MODULES = [
  { id: 'living_things', title: 'สิ่งมีชีวิตและสิ่งแวดล้อม', desc: 'เซลล์ ระบบนิเวศ ห่วงโซ่อาหาร', emoji: '🌱', lessons: 4, difficulty: 'พื้นฐาน', color: 'border-green-200 bg-green-50' },
  { id: 'matter_properties', title: 'สารและสมบัติของสาร', desc: 'สถานะของสาร สารบริสุทธิ์ กรด-เบส', emoji: '⚗️', lessons: 4, difficulty: 'พื้นฐาน', color: 'border-green-200 bg-green-50' },
  { id: 'force_motion', title: 'แรงและการเคลื่อนที่', desc: 'แรงโน้มถ่วง F=ma แรงเสียดทาน', emoji: '⚡', lessons: 4, difficulty: 'กลาง', color: 'border-yellow-200 bg-yellow-50' },
  { id: 'energy', title: 'พลังงาน', desc: 'ความร้อน แสง เสียง ไฟฟ้า การเปลี่ยนรูป', emoji: '💡', lessons: 4, difficulty: 'กลาง', color: 'border-yellow-200 bg-yellow-50' },
  { id: 'earth_space', title: 'โลก ดาราศาสตร์ และอวกาศ', desc: 'ระบบสุริยะ ฤดูกาล ปรากฏการณ์โลก', emoji: '🌍', lessons: 3, difficulty: 'กลาง', color: 'border-orange-200 bg-orange-50' },
]

export default function SciencePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 pt-4">
          <Link href="/dashboard"><Button variant="outline" size="sm" className="mb-4">← กลับ</Button></Link>
          <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-2xl p-6 text-white mb-6">
            <div className="text-5xl mb-2">🔬</div>
            <h1 className="text-3xl font-bold">วิทยาศาสตร์</h1>
            <p className="text-green-100 mt-1">5 โมดูล • เทคนิค: SCIENCE DETECTIVE</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-green-800 font-semibold text-sm">🔍 เทคนิค SCIENCE DETECTIVE:</p>
            <p className="text-green-600 text-sm mt-1">สังเกต → ตั้งสมมติฐาน → ทดลอง → สรุป ทุกโจทย์มีเส้นทางนี้เสมอ</p>
          </div>
        </div>
        <div className="space-y-4">
          {SCIENCE_MODULES.map((mod) => (
            <Card key={mod.id} className={`border-2 ${mod.color} hover:shadow-lg transition-all`}>
              <CardContent className="p-5">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-4xl">{mod.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-lg">{mod.title}</h3>
                        <Badge variant="outline" className="text-xs">{mod.difficulty}</Badge>
                      </div>
                      <p className="text-gray-500 text-sm">{mod.desc}</p>
                      <p className="text-xs text-gray-400 mt-1">{mod.lessons} บทเรียน</p>
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 flex-shrink-0">
                    เรียน <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
