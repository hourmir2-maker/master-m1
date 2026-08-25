'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'

const MATH_MODULES = [
  { id: 'numbers_basics', title: 'ตัวเลขและการดำเนินการ', desc: 'บวก ลบ คูณ หาร / ห.ร.ม. ค.ร.น.', emoji: '🔢', lessons: 4, difficulty: 'พื้นฐาน', color: 'border-blue-200 bg-blue-50' },
  { id: 'fractions_decimals', title: 'เศษส่วนและทศนิยม', desc: 'เศษส่วน ทศนิยม เปอร์เซ็นต์', emoji: '½', lessons: 4, difficulty: 'พื้นฐาน', color: 'border-blue-200 bg-blue-50' },
  { id: 'algebra_intro', title: 'พีชคณิตเบื้องต้น', desc: 'ตัวแปร นิพจน์ สมการ', emoji: '✏️', lessons: 3, difficulty: 'กลาง', color: 'border-yellow-200 bg-yellow-50' },
  { id: 'geometry', title: 'เรขาคณิต', desc: 'รูปทรง พื้นที่ ปริมาตร มุม', emoji: '📐', lessons: 5, difficulty: 'กลาง', color: 'border-yellow-200 bg-yellow-50' },
  { id: 'statistics', title: 'สถิติและความน่าจะเป็น', desc: 'ค่าเฉลี่ย กราฟ ความน่าจะเป็น', emoji: '📊', lessons: 3, difficulty: 'สูง', color: 'border-red-200 bg-red-50' },
]

export default function MathPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 pt-4">
          <Link href="/dashboard"><Button variant="outline" size="sm" className="mb-4">← กลับ</Button></Link>
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-6 text-white mb-6">
            <div className="text-5xl mb-2">🔢</div>
            <h1 className="text-3xl font-bold">คณิตศาสตร์</h1>
            <p className="text-blue-100 mt-1">5 โมดูล • สูตรลับ: 3-STEP ATTACK</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-blue-800 font-semibold text-sm">🔑 สูตรลับ 3-STEP ATTACK:</p>
            <p className="text-blue-600 text-sm mt-1">STEP 1: อ่านโจทย์ ขีดเส้นใต้ → STEP 2: วาดภาพ/ตาราง → STEP 3: เลือกเครื่องมือ</p>
          </div>
        </div>
        <div className="space-y-4">
          {MATH_MODULES.map((mod) => (
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
                  <Button className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
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
