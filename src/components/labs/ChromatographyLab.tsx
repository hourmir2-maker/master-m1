'use client'

import React, { useState } from 'react'
import { Palette, Play, RefreshCw, Sparkles, BookOpen, Ruler, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InkSample {
  id: string
  name: string
  components: { name: string; color: string; rf: number }[]
  solventFront: number // cm e.g. 10 cm
  note: string
}

const INK_SAMPLES: InkSample[] = [
  {
    id: 'black',
    name: 'หมึกปากกาเคมีสีดำ (Black Ink)',
    components: [
      { name: 'สีเหลือง (Yellow)', color: 'bg-yellow-400 text-yellow-950', rf: 0.85 },
      { name: 'สีแดง (Red)', color: 'bg-rose-500 text-white', rf: 0.55 },
      { name: 'สีน้ำเงิน (Blue)', color: 'bg-blue-600 text-white', rf: 0.25 },
    ],
    solventFront: 10,
    note: 'สีเหลืองมีค่า Rf สูงสุด (0.85) แสดงว่าละลายในตัวทำละลายได้ดีที่สุด และถูกดูดซับน้อยที่สุด'
  },
  {
    id: 'leaf',
    name: 'รงควัตถุสารสกัดจากใบไม้ (Leaf Pigments)',
    components: [
      { name: 'แคโรทีน (Carotene - สีส้ม)', color: 'bg-amber-500 text-white', rf: 0.90 },
      { name: 'คลอโรฟิลล์ เอ (Chlorophyll a - เขียวเข้ม)', color: 'bg-emerald-600 text-white', rf: 0.60 },
      { name: 'คลอโรฟิลล์ บี (Chlorophyll b - เขียวตอง)', color: 'bg-lime-500 text-slate-950', rf: 0.40 },
    ],
    solventFront: 10,
    note: 'แคโรทีนเคลื่อนที่ได้เร็วและไกลที่สุด ส่วนคลอโรฟิลล์ บี เกาะติดกระดาษกรองได้แน่นที่สุด'
  },
  {
    id: 'purple',
    name: 'หมึกผสมสีม่วง (Purple Ink Mixture)',
    components: [
      { name: 'สีแดง (Red)', color: 'bg-rose-500 text-white', rf: 0.70 },
      { name: 'สีน้ำเงิน (Blue)', color: 'bg-blue-600 text-white', rf: 0.30 },
    ],
    solventFront: 10,
    note: 'สีม่วงเป็นสารผสม 2 ชนิด ไม่ใช่สารบริสุทธิ์ จึงแยกเป็นแถบสีแดงและสีน้ำเงิน'
  },
]

export default function ChromatographyLab() {
  const [selectedSample, setSelectedSample] = useState<InkSample>(INK_SAMPLES[0])
  const [isDeveloping, setIsDeveloping] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(100) // 0 to 100%

  const handleStart = () => {
    setIsDeveloping(true)
    setProgress(0)
    let cur = 0
    const interval = setInterval(() => {
      cur += 5
      if (cur >= 100) {
        cur = 100
        clearInterval(interval)
        setIsDeveloping(false)
      }
      setProgress(cur)
    }, 80)
  }

  const handleReset = () => {
    setProgress(0)
    setIsDeveloping(false)
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 p-6 text-white flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-pink-100 text-xs font-bold uppercase tracking-wider mb-1">
            <Palette className="w-4 h-4" />
            <span>ระดับมัธยมศึกษาตอนต้น (ม.1) • สสวท. การแยกสารผสม</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            🌈 โครมาโทกราฟี & การคำนวณค่า $R_f$ (Paper Chromatography Lab)
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 mt-1">
            แยกองค์ประกอบของสารสีด้วยกระดาษกรอง ลากไม้บรรทัดวัดระยะทาง และคำนวณค่า $R_f$ ตามสูตรจริง
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleStart}
            disabled={isDeveloping}
            className="bg-white text-purple-900 hover:bg-white/90 font-bold rounded-xl shadow-md text-xs"
          >
            <Play className="w-3.5 h-3.5 mr-1 fill-purple-900" />
            เริ่มแยกสาร (Run Chromatography)
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-xl text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-8 gap-8">
        {/* Chromatography Tank Simulation */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 rounded-3xl p-6 relative overflow-hidden min-h-[420px]">
          <div className="flex justify-between text-xs text-slate-400 font-mono z-10">
            <span>[ หลอดทดลองโครมาโทกราฟี ]</span>
            <span>[ ตัวทำละลาย: เอทานอล / น้ำ ]</span>
          </div>

          {/* Apparatus view */}
          <div className="relative my-auto flex items-center justify-center gap-6 z-10">
            {/* Paper Strip Chamber */}
            <div className="w-48 h-80 border-4 border-slate-700 rounded-2xl bg-white/5 backdrop-blur-xs relative flex flex-col items-center justify-between p-2 shadow-2xl overflow-hidden">
              {/* Top clip hanging the paper */}
              <div className="w-16 h-3 bg-slate-600 rounded-sm absolute top-1 z-30" />

              {/* Chromatography Paper */}
              <div className="w-28 h-72 bg-amber-50 rounded-sm relative shadow-md flex flex-col justify-between overflow-hidden border border-slate-300">
                {/* Solvent Front Line */}
                <div 
                  className="absolute w-full border-b-2 border-dashed border-sky-400 z-20 transition-all duration-100"
                  style={{ bottom: `${10 + (progress * 0.75)}%` }}
                >
                  <span className="text-[7px] text-sky-600 bg-sky-100 px-1 rounded absolute -top-3 right-1 font-mono">
                    ระดับตัวทำละลาย ({Math.round(10 * (progress / 100))} cm)
                  </span>
                </div>

                {/* Separated Pigment Spots */}
                {selectedSample.components.map((comp, idx) => {
                  const currentDistancePercent = 10 + (progress * 0.75 * comp.rf)
                  const currentDistCm = Math.round(10 * comp.rf * (progress / 100) * 10) / 10

                  return (
                    <div
                      key={idx}
                      className="absolute w-full flex items-center justify-center transition-all duration-100"
                      style={{ bottom: `${currentDistancePercent}%` }}
                    >
                      <div className={`w-6 h-3 rounded-full ${comp.color} shadow-sm border border-black/20 flex items-center justify-center text-[7px] font-bold`}>
                        {currentDistCm > 0 ? `${currentDistCm}cm` : ''}
                      </div>
                    </div>
                  )
                })}

                {/* Baseline Spot (จุดเริ่มต้นหยดสาร) */}
                <div className="absolute bottom-[10%] w-full border-b border-slate-400 flex justify-between items-center px-1">
                  <span className="text-[7px] text-slate-500 font-mono">จุดเริ่มต้น (Baseline)</span>
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Solvent Pool at bottom */}
              <div className="w-full h-8 bg-sky-400/40 rounded-b-xl border-t border-sky-300 backdrop-blur-xs flex items-center justify-center text-[9px] text-sky-200 font-mono">
                ตัวทำละลาย (Solvent)
              </div>
            </div>

            {/* Metric Ruler Beside Paper */}
            <div className="h-72 w-10 border-l border-slate-600 flex flex-col justify-between py-2 text-[9px] font-mono text-slate-400 select-none">
              {[10, 8, 6, 4, 2, 0].map(cm => (
                <div key={cm} className="flex items-center gap-1">
                  <span className="w-2 h-px bg-slate-500" />
                  <span>{cm} cm</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400 z-10">
            <span>ความคืบหน้าการแยกสาร: <strong className="text-pink-400">{progress}%</strong></span>
            <span>{progress === 100 ? '✅ แยกสารเสร็จสมบูรณ์' : 'กดปุ่ม Run เพื่อเริ่มแยกสาร'}</span>
          </div>
        </div>

        {/* Right Side: Sample Picker & Rf Calculation */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Pick Ink Sample */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              🌈 1. เลือกสารที่ต้องการนำมาแยกสี:
            </label>
            <div className="space-y-2">
              {INK_SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setSelectedSample(sample)
                    setProgress(100)
                  }}
                  className={`w-full p-3 rounded-2xl border text-left transition-all ${
                    selectedSample.id === sample.id
                      ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-slate-900">{sample.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    ประกอบด้วย {sample.components.length} องค์ประกอบ
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Rf Calculation Table */}
          <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-2xl space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center justify-between text-xs sm:text-sm border-b border-slate-200 pb-2">
              <span className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-purple-600" />
                ตารางคำนวณค่า $R_f$ (Retention Factor):
              </span>
              <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                Rf = d_สาร / d_ตัวทำละลาย
              </span>
            </h4>

            <div className="space-y-2">
              {selectedSample.components.map((c, i) => {
                const soluteDist = Math.round(10 * c.rf * (progress / 100) * 10) / 10
                const solventDist = Math.round(10 * (progress / 100) * 10) / 10
                const calculatedRf = solventDist > 0 ? Math.round((soluteDist / solventDist) * 100) / 100 : 0

                return (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${c.color} inline-block border border-slate-300`} />
                      <span className="font-bold text-slate-800">{c.name}</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-slate-500">{soluteDist}cm ÷ {solventDist}cm =</span>
                      <span className="font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                        Rf = {calculatedRf.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
              💡 <strong>วิเคราะห์ผล:</strong> {selectedSample.note}
            </p>
          </div>

          {/* Gifted Science Rule Alert */}
          <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-2xl space-y-2 text-xs text-purple-950">
            <h5 className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              กฎเหล็กโครมาโทกราฟี (ข้อสอบเข้า ม.1 ห้อง Gifted):
            </h5>
            <ul className="space-y-1 text-slate-700 leading-relaxed">
              <li>1. <strong>ค่า $R_f$ ต้องไม่เกิน 1.0 เสมอ</strong> เพราะสารไม่สามารถวิ่งเร็วกว่าตัวทำละลายได้</li>
              <li>2. <strong>สารที่ละลายดีกว่า</strong> จะเคลื่อนที่ได้ไกลกว่า ($R_f$ มีค่ามากกว่า)</li>
              <li>3. <strong>สารที่ถูกดูดซับดีกว่า</strong> จะเกาะติดกระดาษกรองแน่น เคลื่อนที่ได้ใกล้ ($R_f$ มีค่าน้อยกว่า)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
