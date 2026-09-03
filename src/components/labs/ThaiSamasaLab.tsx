'use client'

import React, { useState } from 'react'
import { Sparkles, Zap, CheckCircle, XCircle, BookOpen, RotateCcw, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WordPair {
  id: string
  word1: string
  word2: string
  result: string
  type: 'samasa' | 'sandhi' | 'trap_compound'
  typeLabel: string
  ruleExplanation: string
  trapAlert?: string
}

const SAMPLE_PAIRS: WordPair[] = [
  {
    id: '1',
    word1: 'ภูมิ',
    word2: 'ศาสตร์',
    result: 'ภูมิศาสตร์',
    type: 'samasa',
    typeLabel: 'สมาสชน (ชนกันตรงๆ)',
    ruleExplanation: 'คำบาลี-สันสกฤตสองคำ นำมาชนกันตรงๆ แปลจากหลังมาหน้า "ศาสตร์แห่งแผ่นดิน" ห้ามใส่ทัณฑฆาตหรือสระอะ'
  },
  {
    id: '2',
    word1: 'กาย',
    word2: 'อินทรีย์',
    result: 'กายินทรีย์',
    type: 'sandhi',
    typeLabel: 'สนธิเชื่อม (กลืนเสียงสระ)',
    ruleExplanation: 'ตัดสระอะที่คำหน้า แล้วเชื่อมเข้ากับสระอิของคำหลัง กลายเป็น กาย + อินทรีย์ ➔ "กายินทรีย์"'
  },
  {
    id: '3',
    word1: 'มหา',
    word2: 'อัศจรรย์',
    result: 'มหัศจรรย์',
    type: 'sandhi',
    typeLabel: 'สนธิเชื่อม (กลืนเสียงสระ)',
    ruleExplanation: 'ตัดสระอาที่คำหน้า (มหา) กลืนเข้ากับ อัศจรรย์ กลายเป็น "มหัศจรรย์"'
  },
  {
    id: '4',
    word1: 'ประวัติ',
    word2: 'ศาสตร์',
    result: 'ประวัติศาสตร์',
    type: 'samasa',
    typeLabel: 'สมาสชน (ชนกันตรงๆ)',
    ruleExplanation: 'ประวัติ + ศาสตร์ นำมาเรียงชนกันโดยตรง อ่านออกเสียงสระเชื่อมระหว่างคำ "ประ-หวัด-ติ-สาด"'
  },
  {
    id: '5',
    word1: 'ผล',
    word2: 'ไม้',
    result: 'ผลไม้',
    type: 'trap_compound',
    typeLabel: 'จุดลวง สทศ. (คำประสม!)',
    ruleExplanation: 'ระวังโดนหลอก! "ผล" เป็นคำบาลี แต่ "ไม้" เป็นคำไทยแท้ สมาสต้องเป็นบาลี/สันสกฤตทั้งคู่เท่านั้น คำนี้จึงเป็น "คำประสม"',
    trapAlert: 'สทศ. ชอบเอาคำภาษาไทยมาปน เช่น ผลไม้, พระอู่, หวานเย็น ➔ จัดเป็นคำประสมทันที!'
  },
  {
    id: '6',
    word1: 'ธนู',
    word2: 'อาคม',
    result: 'ธันวาคม',
    type: 'sandhi',
    typeLabel: 'สนธิเชื่อม (ธนู+อาคม)',
    ruleExplanation: 'ธนู (อุ) + อาคม กลืนเสียงเป็น วา กลายเป็นชื่อเดือน "ธันวาคม"'
  }
]

export default function ThaiSamasaLab() {
  const [selectedPair, setSelectedPair] = useState<WordPair>(SAMPLE_PAIRS[0])
  const [isColliding, setIsColliding] = useState<boolean>(false)
  const [hasCollided, setHasCollided] = useState<boolean>(true)

  const handleCollide = () => {
    setIsColliding(true)
    setHasCollided(false)
    setTimeout(() => {
      setIsColliding(false)
      setHasCollided(true)
    }, 600)
  }

  const selectPair = (p: WordPair) => {
    setSelectedPair(p)
    setIsColliding(false)
    setHasCollided(true)
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              💥 แท่นหลอมคำ: สมาสชน-สนธิเชื่อม (Word Collider Lab)
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                ภาษาไทย O-NET & ม.1
              </span>
            </h3>
            <p className="text-sm text-slate-400">
              ท่องคาถา: &ldquo;สมาสชน... สนธิเชื่อม&rdquo; ทดลองนำคำมาชนและเชื่อมเสียงเพื่อจับจุดลวง สทศ.
            </p>
          </div>
        </div>

        {/* Pair selector pills */}
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PAIRS.map((p) => (
            <button
              key={p.id}
              onClick={() => selectPair(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedPair.id === p.id
                  ? 'bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {p.result}
            </button>
          ))}
        </div>
      </div>

      {/* Main Collider Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Collision Arena */}
        <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800 rounded-xl p-6 relative flex flex-col items-center justify-center min-h-[360px] overflow-hidden">
          {/* Top category badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-bold border mb-8 ${
            selectedPair.type === 'samasa'
              ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
              : selectedPair.type === 'sandhi'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse'
          }`}>
            {selectedPair.typeLabel}
          </div>

          {/* Collision Visualizer */}
          <div className="w-full max-w-lg flex items-center justify-center gap-4 py-4 relative">
            {!hasCollided ? (
              <>
                {/* Word 1 moving right */}
                <div className={`px-6 py-4 rounded-xl bg-indigo-600 text-white text-2xl font-bold font-mono shadow-xl border border-indigo-400 transition-all duration-500 ${
                  isColliding ? 'translate-x-16 opacity-50 scale-95' : 'translate-x-0'
                }`}>
                  {selectedPair.word1}
                </div>

                <div className="text-2xl font-bold text-slate-500 animate-pulse">+</div>

                {/* Word 2 moving left */}
                <div className={`px-6 py-4 rounded-xl bg-fuchsia-600 text-white text-2xl font-bold font-mono shadow-xl border border-fuchsia-400 transition-all duration-500 ${
                  isColliding ? '-translate-x-16 opacity-50 scale-95' : 'translate-x-0'
                }`}>
                  {selectedPair.word2}
                </div>
              </>
            ) : (
              /* Fused Result Word */
              <div className="flex flex-col items-center animate-in zoom-in-75 duration-300">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-amber-600 rounded-2xl blur opacity-75 animate-pulse"></div>
                  <div className="relative px-8 py-5 bg-slate-900 rounded-xl border border-purple-500/50 shadow-2xl text-3xl font-bold font-mono text-amber-300">
                    {selectedPair.result}
                  </div>
                </div>
                <span className="text-xs text-slate-400 mt-3 font-mono">
                  ({selectedPair.word1} + {selectedPair.word2})
                </span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-8 flex items-center gap-3">
            <Button
              onClick={handleCollide}
              disabled={isColliding}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 shadow-lg shadow-purple-600/30"
            >
              <Zap className="w-4 h-4 mr-2" /> สั่งชนและหลอมคำใหม่!
            </Button>
          </div>
        </div>

        {/* Right: Rules & Trap Alerts */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> คำอธิบายหลักภาษา
            </h4>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {selectedPair.ruleExplanation}
            </div>

            {selectedPair.trapAlert && (
              <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg text-xs text-rose-200 flex items-start gap-2 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-300">จุดลวง สทศ.:</span> {selectedPair.trapAlert}
                </div>
              </div>
            )}

            <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-lg text-xs text-purple-200">
              💡 <span className="font-bold text-purple-300">สูตรจำใน 3 วินาที:</span> สมาสชน สนธิเชื่อม แปลจากหลังมาหน้า ห้ามมีภาษาไทยปน!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
