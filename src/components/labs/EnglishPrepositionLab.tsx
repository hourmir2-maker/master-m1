'use client'

import React, { useState } from 'react'
import { MapPin, Clock, Sparkles, CheckCircle2, XCircle, RefreshCw, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type PrepositionMode = 'time' | 'place'

interface PrepositionQuizItem {
  id: string
  phrase: string
  correct: 'IN' | 'ON' | 'AT'
  explanation: string
  type: 'time' | 'place'
}

const QUIZ_ITEMS: PrepositionQuizItem[] = [
  { id: '1', phrase: '___ Monday morning', correct: 'ON', explanation: 'มีชื่อวัน (Monday) ต้องใช้ ON เสมอ!', type: 'time' },
  { id: '2', phrase: '___ 2026', correct: 'IN', explanation: 'ปี ค.ศ. เป็นช่วงเวลายาวขนาดใหญ่ จัดอยู่ในพีระมิดชั้นบนสุด ใช้ IN!', type: 'time' },
  { id: '3', phrase: '___ 8:30 AM', correct: 'AT', explanation: 'เวลาเป๊ะๆ ตามหน้าปัดนาฬิกา เป็นจุดเวลาเฉพาะเจาะจง ใช้ AT!', type: 'time' },
  { id: '4', phrase: '___ Thailand', correct: 'IN', explanation: 'ชื่อประเทศเป็นพื้นที่อาณาเขตกว้างขวาง ใช้ IN!', type: 'place' },
  { id: '5', phrase: '___ Silom Road', correct: 'ON', explanation: 'ชื่อถนน ไม่มีเลขที่บ้าน เป็นแนวยาว ใช้ ON!', type: 'place' },
  { id: '6', phrase: '___ 99/5 Sukhumvit Road', correct: 'AT', explanation: 'มีบ้านเลขที่ระบุจุดตำแหน่งเป๊ะๆ ฟันธงใช้ AT!', type: 'place' },
  { id: '7', phrase: '___ Christmas Day', correct: 'ON', explanation: 'มีคำว่า Day ต่อท้าย เป็นวันเฉพาะ ใช้วัน ➔ ON!', type: 'time' },
  { id: '8', phrase: '___ Christmas', correct: 'AT', explanation: 'ระวังจุดลวง สทศ.! ถ้าไม่มีคำว่า Day หมายถึงช่วงเทศกาล ใช้ AT Christmas!', type: 'time' }
]

export default function EnglishPrepositionLab() {
  const [mode, setMode] = useState<PrepositionMode>('time')
  const [activeQuizIdx, setActiveQuizIdx] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<'IN' | 'ON' | 'AT' | null>(null)

  const filteredItems = QUIZ_ITEMS.filter(q => q.type === mode)
  const currentQuiz = filteredItems[activeQuizIdx % filteredItems.length]

  const handleSelectAnswer = (ans: 'IN' | 'ON' | 'AT') => {
    setSelectedAnswer(ans)
  }

  const nextQuestion = () => {
    setActiveQuizIdx(prev => prev + 1)
    setSelectedAnswer(null)
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <MapPin className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              📍 พีระมิดกลับหัวบุพบท IN, ON, AT (Preposition Pyramid Lab)
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                O-NET ป.6 & ม.1
              </span>
            </h3>
            <p className="text-sm text-slate-400">
              จดจำสเกลพีระมิด: IN ใหญ่กว้าง ➔ ON ขนาดกลาง ➔ AT จุดเป๊ะๆ
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setMode('time')
              setActiveQuizIdx(0)
              setSelectedAnswer(null)
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'time'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> เวลา (Time)
          </button>
          <button
            onClick={() => {
              setMode('place')
              setActiveQuizIdx(0)
              setSelectedAnswer(null)
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'place'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" /> สถานที่ (Place)
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: The Visual Inverted Pyramid */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Inverted Pyramid Layers */}
          <div className="space-y-2">
            {/* Top Layer: IN (Largest) */}
            <div className="bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-blue-500/40 p-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-blue-400 font-mono tracking-wider">IN (ใหญ่สุด / กว้างสุด)</span>
                <span className="text-[11px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md">
                  {mode === 'time' ? 'ศตวรรษ, ปี, เดือน, ฤดูกาล' : 'ประเทศ, เมือง, ในห้อง'}
                </span>
              </div>
              <div className="text-xs text-slate-300 mt-1.5 font-mono">
                {mode === 'time' 
                  ? 'in 2026 • in May • in summer • in the morning' 
                  : 'in Thailand • in Bangkok • in the car • in the room'}
              </div>
            </div>

            {/* Middle Layer: ON (Medium) */}
            <div className="bg-gradient-to-r from-amber-950/80 to-orange-950/80 border-2 border-amber-500/40 p-3.5 rounded-2xl shadow-lg mx-6">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-amber-400 font-mono tracking-wider">ON (ขนาดกลาง / วัน & ถนน)</span>
                <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md">
                  {mode === 'time' ? 'วัน, วันที่, วันสำคัญ' : 'ถนน, ยานพาหนะใหญ่'}
                </span>
              </div>
              <div className="text-xs text-slate-300 mt-1 font-mono">
                {mode === 'time' 
                  ? 'on Monday • on May 5th • on my birthday' 
                  : 'on Sukhumvit Road • on the bus • on the train'}
              </div>
            </div>

            {/* Bottom Layer: AT (Precise Point) */}
            <div className="bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-500/40 p-3 rounded-2xl shadow-lg mx-14">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-emerald-400 font-mono tracking-wider">AT (จุดเป๊ะๆ 100%)</span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">
                  {mode === 'time' ? 'เวลาบนหน้าปัด' : 'บ้านเลขที่, จุดนัด'}
                </span>
              </div>
              <div className="text-xs text-slate-300 mt-0.5 font-mono">
                {mode === 'time' 
                  ? 'at 7:00 AM • at noon • at midnight' 
                  : 'at home • at 99 Main Street • at the door'}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Challenge Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> ทดสอบความจำ สทศ.
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  ข้อที่ {(activeQuizIdx % filteredItems.length) + 1} / {filteredItems.length}
                </span>
              </div>

              {/* Challenge Phrase */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center mb-5">
                <div className="text-xl font-mono font-black text-white">
                  {currentQuiz.phrase}
                </div>
              </div>

              {/* Answer Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {(['IN', 'ON', 'AT'] as const).map(choice => {
                  const isSelected = selectedAnswer === choice
                  const isCorrect = choice === currentQuiz.correct

                  return (
                    <Button
                      key={choice}
                      onClick={() => handleSelectAnswer(choice)}
                      disabled={selectedAnswer !== null}
                      className={`text-base font-black font-mono py-4 rounded-xl border transition-all ${
                        selectedAnswer === null
                          ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                          : isCorrect
                          ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30'
                          : isSelected
                          ? 'bg-rose-600 border-rose-400 text-white'
                          : 'bg-slate-800 text-slate-500 border-slate-800 opacity-50'
                      }`}
                    >
                      {choice}
                    </Button>
                  )
                })}
              </div>

              {/* Feedback box */}
              {selectedAnswer !== null && (
                <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                  selectedAnswer === currentQuiz.correct
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                }`}>
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {selectedAnswer === currentQuiz.correct ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                    <span>{selectedAnswer === currentQuiz.correct ? 'ตอบถูก!' : 'ยังไม่ถูกครับ!'}</span>
                  </div>
                  <p>{currentQuiz.explanation}</p>
                </div>
              )}
            </div>

            {selectedAnswer !== null && (
              <Button
                onClick={nextQuestion}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs shadow-md"
              >
                ข้อต่อไป ➔
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
