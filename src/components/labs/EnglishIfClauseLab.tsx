'use client'

import React, { useState } from 'react'
import { Zap, Sparkles, AlertTriangle, CheckCircle, ArrowRight, Play, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

type IfType = '0' | '1' | '2' | '3'

interface IfClauseData {
  type: IfType
  name: string
  concept: string
  ifStructure: string
  mainStructure: string
  formulaBadge: string
  exampleIf: string
  exampleMain: string
  fullSentence: string
  translation: string
  trapAlert: string
  scenarios: {
    ifPart: string
    mainPart: string
    trans: string
  }[]
}

const IF_CLAUSE_CONFIG: Record<IfType, IfClauseData> = {
  '0': {
    type: '0',
    name: 'Type 0: จริงเสมอตามธรรมชาติ (General Truth)',
    concept: 'ความจริงทางวิทยาศาสตร์ กฎธรรมชาติ ถ้าเกิดเหตุนี้ ผลนี้จะตามมาแน่นอน 100%',
    ifStructure: 'If + Present Simple (V.1)',
    mainStructure: 'Present Simple (V.1)',
    formulaBadge: 'If Present, Present',
    exampleIf: 'If you heat water to 100°C,',
    exampleMain: 'it boils.',
    fullSentence: 'If you heat water to 100°C, it boils.',
    translation: 'ถ้าคุณต้มน้ำจนถึง 100 องศาเซลเซียส น้ำจะเดือด (จริงเสมอตามธรรมชาติ)',
    trapAlert: 'ห้ามใส่ will ในประโยคหลักเด็ดขาด เพราะเป็นความจริงทางวิทยาศาสตร์ ไม่ใช่การทำนายอนาคต',
    scenarios: [
      { ifPart: 'If you drop an apple,', mainPart: 'it falls to the ground.', trans: 'ถ้าปล่อยแอปเปิล มันจะตกลงพื้นตามแรงโน้มถ่วง' },
      { ifPart: 'If you freeze water,', mainPart: 'it becomes ice.', trans: 'ถ้านำน้ำไปแช่แข็ง มันจะกลายเป็นน้ำแข็ง' }
    ]
  },
  '1': {
    type: '1',
    name: 'Type 1: เป็นไปได้ในอนาคต (Possible Future)',
    concept: 'เงื่อนไขที่อาจเกิดขึ้นจริงในอนาคต ถ้าทำตอนนี้ จะเกิดผลนั้นในวันข้างหน้า',
    ifStructure: 'If + Present Simple (V.1)',
    mainStructure: 'will / can / may + V.inf',
    formulaBadge: 'If Present, will + V.inf',
    exampleIf: 'If you study hard today,',
    exampleMain: 'you will pass the M.1 exam.',
    fullSentence: 'If you study hard today, you will pass the M.1 exam.',
    translation: 'ถ้าเธอตั้งใจอ่านหนังสือวันนี้ เธอจะสอบติด ม.1 แน่นอน',
    trapAlert: 'ห้ามใส่ will หลังคำว่า If เด็ดขาด! (ผิด: If you will study... ❌ | ถูก: If you study... ✅)',
    scenarios: [
      { ifPart: 'If it rains tomorrow,', mainPart: 'we will cancel the picnic.', trans: 'ถ้าพรุ่งนี้ฝนตก พวกเราจะยกเลิกการไปปิกนิก' },
      { ifPart: 'If you wake up early,', mainPart: 'you will catch the school bus.', trans: 'ถ้าตื่นเช้า เธอจะทันรถโรงเรียน' }
    ]
  },
  '2': {
    type: '2',
    name: 'Type 2: สมมติฝันกลางวัน / ตรงข้ามความจริงปัจจุบัน (Unreal Present)',
    concept: 'เรื่องสมมติที่เป็นไปไม่ได้ หรือตรงข้ามกับความจริงในปัจจุบัน ท่องไว้: ประธานทุกคนใช้ WERE!',
    ifStructure: 'If + Past Simple (V.2 / were)',
    mainStructure: 'would / could / might + V.inf',
    formulaBadge: 'If Past (were), would + V.inf',
    exampleIf: 'If I were you,',
    exampleMain: 'I would join MASTER M.1.',
    fullSentence: 'If I were you, I would join MASTER M.1.',
    translation: 'ถ้าฉันเป็นเธอ (ซึ่งเป็นไปไม่ได้) ฉันจะเข้ามาติวที่ MASTER ม.1 ทันที',
    trapAlert: 'จุดลวง สทศ. อันดับ 1! ประธานเอกพจน์ (I, He, She, It) ในโลกสมมติ ต้องใช้ WERE เท่านั้น ห้ามใช้ was!',
    scenarios: [
      { ifPart: 'If I had wings,', mainPart: 'I would fly around the world.', trans: 'ถ้าฉันมีปีก ฉันจะบินไปรอบโลก (ความจริงไม่มีปีก)' },
      { ifPart: 'If he knew her number,', mainPart: 'he would call her right now.', trans: 'ถ้าเขารู้เบอร์เธอ เขาคงโทรหาแล้ว (ความจริงไม่รู้)' }
    ]
  },
  '3': {
    type: '3',
    name: 'Type 3: เสียดายอดีต / แก้ไขไม่ได้แล้ว (Unreal Past)',
    concept: 'สมมติตรงข้ามกับสิ่งที่เกิดขึ้นจริงในอดีต ย้อนเวลากลับไปแก้ไม่ได้ มักใช้แสดงความเสียดาย',
    ifStructure: 'If + Past Perfect (had + V.3)',
    mainStructure: 'would have + V.3',
    formulaBadge: 'If had + V.3, would have + V.3',
    exampleIf: 'If she had studied harder,',
    exampleMain: 'she would have passed the exam.',
    fullSentence: 'If she had studied harder, she would have passed the exam.',
    translation: 'ถ้าตอนนั้นเธออ่านหนังสือหนักกว่านี้ เธอคงสอบผ่านไปแล้ว (ความจริงในอดีตสอบตก)',
    trapAlert: 'คู่กริยาต้องแมตช์ 3 สเต็ป: หน้าเป็น had + V.3 ➔ หลังต้องเป็น would have + V.3 อย่าลืม have!',
    scenarios: [
      { ifPart: 'If we had left earlier,', mainPart: 'we would not have missed the train.', trans: 'ถ้าพวกเราออกเร็วกว่านั้น ก็คงไม่ตกรถไฟแล้ว' },
      { ifPart: 'If I had set the alarm,', mainPart: 'I would not have overslept.', trans: 'ถ้าฉันตั้งนาฬิกาปลุกไว้ ฉันคงไม่ตื่นสายหรอก' }
    ]
  }
}

export default function EnglishIfClauseLab() {
  const [activeType, setActiveType] = useState<IfType>('1')
  const [scenarioIdx, setScenarioIdx] = useState<number>(0)
  const [isSwitched, setIsSwitched] = useState<boolean>(false)

  const current = IF_CLAUSE_CONFIG[activeType]
  const scenario = current.scenarios[scenarioIdx % current.scenarios.length]

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
            <Zap className="w-6 h-6 animate-pulse text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              ⚡ แล็บสวิตช์เหตุการณ์ If-Clause 4 สเต็ป (Conditionals Simulator)
              <span className="text-xs bg-sky-500/20 text-sky-300 px-2.5 py-0.5 rounded-full border border-sky-500/30 font-mono">
                O-NET & Gifted ม.1
              </span>
            </h3>
            <p className="text-sm text-slate-400">
              ท่องคาถา: &ldquo;ศูนย์จริง หนึ่งเป็นไปได้ สองฝันกลางวัน were สามเสียดายอดีต&rdquo;
            </p>
          </div>
        </div>

        {/* Type Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {(['0', '1', '2', '3'] as IfType[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setActiveType(t)
                setScenarioIdx(0)
                setIsSwitched(false)
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeType === t
                  ? 'bg-sky-500 text-slate-950 font-black shadow-lg shadow-sky-500/30 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Type {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Simulation Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Formula Banner */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 font-mono">
                {current.formulaBadge}
              </span>
              <span className="text-xs text-slate-300">{current.name}</span>
            </div>
            <div className="text-[11px] text-slate-400 italic">
              {current.concept}
            </div>
          </div>

          {/* Interactive Cause & Effect Connector */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 relative flex flex-col items-center justify-center min-h-[260px]">
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3">
              {/* If Clause Block */}
              <div className="w-full md:w-1/2 p-5 rounded-xl bg-blue-950/70 border-2 border-blue-500/40 shadow-xl flex flex-col items-center text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 mb-1">
                  1. ประโยคเงื่อนไข (If-Clause)
                </span>
                <span className="text-xs text-slate-400 font-mono mb-2">
                  {current.ifStructure}
                </span>
                <div className="text-base sm:text-lg font-black text-amber-300 font-mono">
                  {scenario.ifPart}
                </div>
              </div>

              {/* Connecting Arrow */}
              <div className="p-2 bg-slate-800 rounded-full border border-slate-700 text-slate-400">
                <ArrowRight className="w-5 h-5 animate-pulse text-amber-400" />
              </div>

              {/* Main Clause Block */}
              <div className="w-full md:w-1/2 p-5 rounded-xl bg-indigo-950/70 border-2 border-indigo-500/40 shadow-xl flex flex-col items-center text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 mb-1">
                  2. ผลลัพธ์ที่ตามมา (Main Clause)
                </span>
                <span className="text-xs text-slate-400 font-mono mb-2">
                  {current.mainStructure}
                </span>
                <div className="text-base sm:text-lg font-black text-emerald-300 font-mono">
                  {scenario.mainPart}
                </div>
              </div>
            </div>

            {/* Combined Sentence Screen */}
            <div className="w-full mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-sm sm:text-base font-bold text-white font-mono">
                &ldquo;{scenario.ifPart} {scenario.mainPart}&rdquo;
              </div>
              <p className="text-xs text-slate-400 mt-1.5 font-sans">
                🇹🇭 {scenario.trans}
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-5 flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setScenarioIdx(prev => prev + 1)}
                className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> เปลี่ยนตัวอย่างประโยค
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Traps & Rules */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> โครงสร้างคู่กริยามหาเทพ
            </h4>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">ฝั่ง If:</span>
                <span className="font-mono font-bold text-blue-300">{current.ifStructure}</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-slate-400">ฝั่ง Main:</span>
                <span className="font-mono font-bold text-indigo-300">{current.mainStructure}</span>
              </div>
            </div>

            {/* Trap Warning */}
            <div className="bg-rose-500/10 border border-rose-500/30 p-3.5 rounded-lg text-xs text-rose-200 flex items-start gap-2 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-300">ระวังจุดลวง สทศ.:</span>
                <p className="mt-0.5">{current.trapAlert}</p>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-xs text-amber-200">
              💡 <span className="font-bold text-amber-300">สลับตำแหน่งได้:</span> สามารถเอา Main Clause ขึ้นก่อน If ได้ โดยไม่ต้องใส่เครื่องหมายจุลภาค (Comma) คั่นกลาง!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
