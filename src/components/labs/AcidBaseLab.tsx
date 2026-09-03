'use client'

import React, { useState } from 'react'
import { FlaskConical, Droplet, Sparkles, BookOpen, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Substance {
  id: string
  name: string
  nature: 'acid' | 'neutral' | 'base'
  ph: number
  colorClass: string
  icon: string
  desc: string
  redLitmus: 'red' | 'blue'
  blueLitmus: 'red' | 'blue'
  phenolphthalein: 'colorless' | 'pink'
}

const SUBSTANCES: Substance[] = [
  {
    id: 'lemon',
    name: 'น้ำมะนาวคั้นสด',
    nature: 'acid',
    ph: 2.3,
    colorClass: 'bg-yellow-200 text-yellow-900 border-yellow-300',
    icon: '🍋',
    desc: 'มีกรดซิตริก (Citric Acid) รสเปรี้ยว',
    redLitmus: 'red',
    blueLitmus: 'red',
    phenolphthalein: 'colorless'
  },
  {
    id: 'soda',
    name: 'น้ำอัดลม',
    nature: 'acid',
    ph: 3.2,
    colorClass: 'bg-amber-900/10 text-amber-900 border-amber-300',
    icon: '🥤',
    desc: 'มีกรดคาร์บอนิก (Carbonic acid) จากก๊าซ CO₂ ละลายน้ำ',
    redLitmus: 'red',
    blueLitmus: 'red',
    phenolphthalein: 'colorless'
  },
  {
    id: 'water',
    name: 'น้ำดื่มบริสุทธิ์',
    nature: 'neutral',
    ph: 7.0,
    colorClass: 'bg-sky-100 text-sky-900 border-sky-300',
    icon: '💧',
    desc: 'น้ำบริสุทธิ์ ไม่มีฤทธิ์กรดหรือเบส ค่า pH เป็นกลาง',
    redLitmus: 'red',
    blueLitmus: 'blue',
    phenolphthalein: 'colorless'
  },
  {
    id: 'soap',
    name: 'น้ำสบู่ถูตัว',
    nature: 'base',
    ph: 9.5,
    colorClass: 'bg-pink-100 text-pink-900 border-pink-300',
    icon: '🧼',
    desc: 'มีฤทธิ์เป็นเบส ลื่นมือเมื่อสัมผัส รสฝาด',
    redLitmus: 'blue',
    blueLitmus: 'blue',
    phenolphthalein: 'pink'
  },
  {
    id: 'antacid',
    name: 'ยาลดกรดในกระเพาะ',
    nature: 'base',
    ph: 10.4,
    colorClass: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    icon: '💊',
    desc: 'สารละลายแมกนีเซียมไฮดรอกไซด์ มีฤทธิ์สะเทินกรดในกระเพาะ',
    redLitmus: 'blue',
    blueLitmus: 'blue',
    phenolphthalein: 'pink'
  },
]

export default function AcidBaseLab() {
  const [selectedSubstance, setSelectedSubstance] = useState<Substance>(SUBSTANCES[0])
  const [testedWithRed, setTestedWithRed] = useState<boolean>(false)
  const [testedWithBlue, setTestedWithBlue] = useState<boolean>(false)
  const [testedWithPhenol, setTestedWithPhenol] = useState<boolean>(false)

  const handleSelectSubstance = (sub: Substance) => {
    setSelectedSubstance(sub)
    setTestedWithRed(false)
    setTestedWithBlue(false)
    setTestedWithPhenol(false)
  }

  const handleReset = () => {
    setTestedWithRed(false)
    setTestedWithBlue(false)
    setTestedWithPhenol(false)
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 text-white flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-violet-100 text-xs font-bold uppercase tracking-wider mb-1">
            <FlaskConical className="w-4 h-4" />
            <span>ระดับประถมปลาย - ม.1 • สสวท. สารและสมบัติของสาร</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            🧪 ห้องแล็บกรด-เบส & อินดิเคเตอร์ (Acid-Base & Indicators Lab)
          </h2>
          <p className="text-xs sm:text-sm text-violet-100 mt-1">
            ทดสอบสารด้วยกระดาษลิตมัส แดง/น้ำเงิน, ฟีนอล์ฟทาลีน และวัดค่าสเกล Universal Indicator pH 1–14
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleReset}
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-xl"
        >
          <RefreshCw className="w-4 h-4 mr-1.5" />
          ล้างผลทดสอบ
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-8 gap-8">
        {/* Testing Bench View */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900 rounded-3xl p-6 relative overflow-hidden min-h-[400px]">
          <div className="flex justify-between text-xs text-slate-400 font-mono z-10">
            <span>[ สารตัวอย่าง: {selectedSubstance.name} ]</span>
            <span>[ สถานะ: {selectedSubstance.nature === 'acid' ? 'กรด' : selectedSubstance.nature === 'base' ? 'เบส' : 'กลาง'} ]</span>
          </div>

          {/* Beaker Apparatus Simulation */}
          <div className="relative my-auto flex flex-col items-center justify-center py-6 z-10">
            {/* The Beaker */}
            <div className="w-44 h-52 border-4 border-slate-400 border-t-0 rounded-b-3xl bg-white/5 backdrop-blur-xs relative flex flex-col justify-end p-2 shadow-2xl">
              {/* Volume marks */}
              <div className="absolute top-8 right-2 text-[9px] font-mono text-slate-500">- 200 ml</div>
              <div className="absolute top-20 right-2 text-[9px] font-mono text-slate-500">- 150 ml</div>
              <div className="absolute top-32 right-2 text-[9px] font-mono text-slate-500">- 100 ml</div>

              {/* Liquid Solution */}
              <div 
                className={`w-full h-36 rounded-b-2xl transition-all duration-500 relative flex items-center justify-center shadow-inner ${
                  testedWithPhenol && selectedSubstance.phenolphthalein === 'pink'
                    ? 'bg-fuchsia-500/80 shadow-[0_0_30px_rgba(217,70,239,0.8)]'
                    : selectedSubstance.nature === 'acid'
                    ? 'bg-amber-400/30'
                    : selectedSubstance.nature === 'base'
                    ? 'bg-indigo-400/30'
                    : 'bg-sky-300/30'
                }`}
              >
                <span className="text-3xl">{selectedSubstance.icon}</span>

                {/* Submerged Litmus Strips */}
                <div className="absolute -top-10 flex gap-4">
                  {testedWithRed && (
                    <div 
                      className={`w-4 h-24 rounded-t-sm shadow-md transition-colors duration-500 flex flex-col justify-between p-0.5 ${
                        selectedSubstance.redLitmus === 'blue' ? 'bg-gradient-to-b from-rose-500 to-blue-600' : 'bg-rose-500'
                      }`}
                    >
                      <span className="text-[7px] text-white font-bold rotate-90">แดง</span>
                    </div>
                  )}

                  {testedWithBlue && (
                    <div 
                      className={`w-4 h-24 rounded-t-sm shadow-md transition-colors duration-500 flex flex-col justify-between p-0.5 ${
                        selectedSubstance.blueLitmus === 'red' ? 'bg-gradient-to-b from-blue-600 to-rose-500' : 'bg-blue-600'
                      }`}
                    >
                      <span className="text-[7px] text-white font-bold rotate-90">น้ำเงิน</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Indicator Dropper Animation if applied */}
            {testedWithPhenol && (
              <div className="mt-3 text-xs font-bold text-fuchsia-400 animate-pulse flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>
                  {selectedSubstance.phenolphthalein === 'pink' ? 'หยดฟีนอล์ฟทาลีน ➔ เปลี่ยนเป็นสีชมพูบานเย็น (เป็นเบส)!' : 'หยดฟีนอล์ฟทาลีน ➔ ใสไม่มีสี (ไม่เป็นเบส)'}
                </span>
              </div>
            )}
          </div>

          {/* Digital pH Scale Meter at bottom */}
          <div className="w-full pt-4 border-t border-slate-800 space-y-2 z-10">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold">สเกลวัดค่ากรด-เบส (Universal pH Scale):</span>
              <span className="font-mono text-sm font-black text-amber-300 bg-slate-800 px-3 py-0.5 rounded-lg border border-slate-700">
                pH = {selectedSubstance.ph}
              </span>
            </div>

            {/* pH Spectrum Bar 1 - 14 */}
            <div className="h-3 w-full rounded-full bg-gradient-to-r from-red-600 via-yellow-400 via-emerald-500 via-blue-500 to-purple-800 relative">
              {/* Pointer indicator */}
              <div 
                className="absolute -top-1 w-2.5 h-5 bg-white border-2 border-slate-900 rounded-sm shadow-md transition-all duration-300 -translate-x-1/2"
                style={{ left: `${(selectedSubstance.ph / 14) * 100}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-slate-400">
              <span className="text-rose-400 font-bold">กรดแก่ (pH 1-3)</span>
              <span className="text-yellow-400">กรดอ่อน</span>
              <span className="text-emerald-400 font-bold">กลาง (pH 7)</span>
              <span className="text-blue-400">เบสอ่อน</span>
              <span className="text-purple-400 font-bold">เบสแก่ (pH 12-14)</span>
            </div>
          </div>
        </div>

        {/* Right Controls & Chemical Diagnostic */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Select Substance */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              🧪 1. เลือกสารเคมีเพื่อนำมาทดสอบ:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SUBSTANCES.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => handleSelectSubstance(sub)}
                  className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                    selectedSubstance.id === sub.id
                      ? 'border-violet-600 bg-violet-50 shadow-md ring-2 ring-violet-200'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl mb-1">{sub.icon}</span>
                  <span className="text-xs font-bold text-slate-800 leading-tight">{sub.name}</span>
                  <span className="text-[10px] text-slate-400 mt-1">pH ~{sub.ph}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Test Strip Actions */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              🔬 2. เลือกอุปกรณ์ทดสอบ (คลิกเพื่อจุ่มสาร):
            </label>
            <div className="space-y-2">
              <Button
                onClick={() => setTestedWithRed(true)}
                variant="outline"
                className={`w-full justify-between rounded-xl h-11 text-xs font-bold border-2 transition-all ${
                  testedWithRed ? 'border-rose-500 bg-rose-50 text-rose-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-6 bg-rose-500 rounded-sm inline-block shadow-xs" />
                  <span>จุ่มกระดาษลิตมัสสีแดง (Red Litmus)</span>
                </div>
                <span>
                  {testedWithRed ? (selectedSubstance.redLitmus === 'blue' ? '➔ เปลี่ยนเป็นสีน้ำเงิน (เบส)!' : '➔ ไม่เปลี่ยนสี') : 'คลิกเพื่อจุ่ม'}
                </span>
              </Button>

              <Button
                onClick={() => setTestedWithBlue(true)}
                variant="outline"
                className={`w-full justify-between rounded-xl h-11 text-xs font-bold border-2 transition-all ${
                  testedWithBlue ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-6 bg-blue-600 rounded-sm inline-block shadow-xs" />
                  <span>จุ่มกระดาษลิตมัสสีน้ำเงิน (Blue Litmus)</span>
                </div>
                <span>
                  {testedWithBlue ? (selectedSubstance.blueLitmus === 'red' ? '➔ เปลี่ยนเป็นสีแดง (กรด)!' : '➔ ไม่เปลี่ยนสี') : 'คลิกเพื่อจุ่ม'}
                </span>
              </Button>

              <Button
                onClick={() => setTestedWithPhenol(true)}
                variant="outline"
                className={`w-full justify-between rounded-xl h-11 text-xs font-bold border-2 transition-all ${
                  testedWithPhenol ? 'border-fuchsia-500 bg-fuchsia-50 text-fuchsia-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-fuchsia-600" />
                  <span>หยดฟีนอล์ฟทาลีน (Phenolphthalein)</span>
                </div>
                <span>
                  {testedWithPhenol ? (selectedSubstance.phenolphthalein === 'pink' ? '➔ เปลี่ยนเป็นสีชมพู (เบส)!' : '➔ ใสไม่มีสี') : 'คลิกเพื่อหยด'}
                </span>
              </Button>
            </div>
          </div>

          {/* Real-time Scientific Diagnosis */}
          <div className="bg-violet-50/70 border-2 border-violet-200 p-4 rounded-2xl space-y-2">
            <h4 className="font-bold text-violet-950 flex items-center gap-1.5 text-xs sm:text-sm">
              <BookOpen className="w-4 h-4 text-violet-700" />
              สรุปกฎการจำ กรด-เบส (สสวท. ม.1):
            </h4>
            <div className="text-xs text-slate-700 space-y-1 leading-relaxed">
              <div>• <strong>กรด (Acid, pH &lt; 7):</strong> เปลี่ยนสีกระดาษลิตมัส <em>น้ำเงิน ➔ แดง</em> (ฟีนอล์ฟทาลีนใสไม่มีสี)</div>
              <div>• <strong>เบส (Base, pH &gt; 7):</strong> เปลี่ยนสีกระดาษลิตมัส <em>แดง ➔ น้ำเงิน</em> (ฟีนอล์ฟทาลีนเปลี่ยนเป็นชมพูบานเย็น)</div>
              <div>• <strong>กลาง (Neutral, pH = 7):</strong> <u>ไม่เปลี่ยนสีของกระดาษลิตมัสทั้ง 2 สี</u></div>
            </div>

            <div className="bg-white/90 p-2.5 rounded-xl border border-violet-200 text-[11px] text-violet-950 flex items-start gap-1.5 mt-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>🎯 ข้อสอบเตรียมเข้า ม.1 ปราบเซียน:</strong> ถ้านำน้ำเกลือ หรือน้ำเชื่อมมาทดสอบกับกระดาษลิตมัส จะไม่เปลี่ยนสีทั้งคู่เพราะมีสมบัติเป็นกลาง (pH 7)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
