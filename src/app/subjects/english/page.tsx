'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'

const ENGLISH_MODULES = [
  { id: 'grammar_basics', title: 'Grammar Essentials', desc: 'Parts of Speech, Tenses, Sentence Structure', emoji: '📝', lessons: 5, difficulty: 'พื้นฐาน', color: 'border-purple-200 bg-purple-50' },
  { id: 'vocabulary', title: 'Vocabulary Power', desc: 'Word Families, Prefix/Suffix, Context Clues', emoji: '📚', lessons: 4, difficulty: 'พื้นฐาน', color: 'border-purple-200 bg-purple-50' },
  { id: 'reading', title: 'Reading Comprehension', desc: 'Main Idea, Inference, Skim & Scan', emoji: '👁️', lessons: 4, difficulty: 'กลาง', color: 'border-pink-200 bg-pink-50' },
  { id: 'listening_speaking', title: 'Listening & Speaking', desc: 'Pronunciation, Common Expressions', emoji: '🎙️', lessons: 3, difficulty: 'กลาง', color: 'border-pink-200 bg-pink-50' },
  { id: 'writing', title: 'Writing Basics', desc: 'Paragraph Structure, Essay, Hamburger Model', emoji: '✍️', lessons: 3, difficulty: 'สูง', color: 'border-red-200 bg-red-50' },
]

export default function EnglishPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 pt-4">
          <Link href="/dashboard"><Button variant="outline" size="sm" className="mb-4">← กลับ</Button></Link>
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-6 text-white mb-6">
            <div className="text-5xl mb-2">🗣️</div>
            <h1 className="text-3xl font-bold">ภาษาอังกฤษ</h1>
            <p className="text-purple-100 mt-1">5 โมดูล • เทคนิค: 3S Method (Skim → Scan → Answer)</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
            <p className="text-purple-800 font-semibold text-sm">💡 เทคนิค 3S Method:</p>
            <p className="text-purple-600 text-sm mt-1">SKIM: อ่านหัวข้อ → SCAN: หาคำตอบ → ANSWER: ตอบจากเนื้อหา ไม่ต้องแปลทุกคำ</p>
          </div>
        </div>
        <div className="space-y-4">
          {ENGLISH_MODULES.map((mod) => (
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
                  <Button className="bg-purple-600 hover:bg-purple-700 flex-shrink-0">
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
