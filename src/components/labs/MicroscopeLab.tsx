'use client'

import React, { useState } from 'react'
import { Microscope, ZoomIn, Eye, Sparkles, BookOpen, Droplets, RefreshCw, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type SlideType = 'onion' | 'elodea' | 'cheek'
type Magnification = '40x' | '100x' | '400x'

interface SlideInfo {
  id: SlideType
  name: string
  type: 'plant' | 'animal'
  stain: string
  keyFeatures: string[]
  trapNote: string
}

const SLIDES: SlideInfo[] = [
  {
    id: 'onion',
    name: 'เซลล์เยื่อหอมแดง (Onion Epidermal Cells)',
    type: 'plant',
    stain: 'สารละลายไอโอดีน (Iodine Solution)',
    keyFeatures: ['มีผนังเซลล์ (Cell Wall) แข็งแรง รูปร่างเหลี่ยมคล้ายกำแพงอิฐ', 'พบนิวเคลียสติดสีเหลือง-น้ำตาลชัดเจน', 'ไม่พบคลอโรพลาสต์ (เพราะหัวหอมอยู่ใต้ดิน ไม่ได้สังเคราะห์แสง)'],
    trapNote: '🚨 จุดดักข้อสอบยอดฮิต: เซลล์เยื่อหอมเป็นเซลล์พืช แต่ "ไม่มีคลอโรพลาสต์" เพราะอยู่ในดิน!'
  },
  {
    id: 'elodea',
    name: 'เซลล์สาหร่ายหางกระรอก (Elodea Leaf Cells)',
    type: 'plant',
    stain: 'น้ำเปล่า (ไม่ต้องย้อมสีเพราะมีคลอโรฟิลล์สีเขียวในตัว)',
    keyFeatures: ['เห็นเม็ดคลอโรพลาสต์ (Chloroplast) เม็ดกลมสีเขียวจำนวนมาก', 'มีผนังเซลล์และเยื่อหุ้มเซลล์', 'สามารถสังเกตการไหลเวียนของไซโทพลาซึม (Cyclosis) ได้'],
    trapNote: 'คลอโรพลาสต์เป็นแหล่งสังเคราะห์ด้วยแสง พบได้ในเซลล์พืชส่วนที่มีสีเขียว เช่น ใบ'
  },
  {
    id: 'cheek',
    name: 'เซลล์เยื่อบุข้างแก้ม (Human Cheek Epithelial Cells)',
    type: 'animal',
    stain: 'เมทิลีนบลู (Methylene Blue Solution)',
    keyFeatures: ['ไม่มีผนังเซลล์ (No Cell Wall) ทำให้รูปร่างไม่แน่นอน แบนหรือกลมรี', 'นิวเคลียสย้อมติดสีน้ำเงินเข้มเด่นชัดตรงกลาง', 'ไม่มีคลอโรพลาสต์ มีเพียงเยื่อหุ้มเซลล์ ไซโทพลาซึม และนิวเคลียส'],
    trapNote: 'ข้อสอบถามบ่อย: ทำไมเซลล์สัตว์จึงอ่อนนุ่มและเปลี่ยนรูปร่างได้ง่าย? ➔ ตอบ: เพราะไม่มีผนังเซลล์ (Cell Wall)'
  },
]

export default function MicroscopeLab() {
  const [selectedSlide, setSelectedSlide] = useState<SlideType>('onion')
  const [magnification, setMagnification] = useState<Magnification>('100x')
  const [focusLevel, setFocusLevel] = useState<number>(50) // 50 = perfectly sharp, 0/100 = blurry
  const [isStained, setIsStained] = useState<boolean>(true)

  const currentSlideInfo = SLIDES.find(s => s.id === selectedSlide)!

  // Blur calculation: distance from 50 (sharp center)
  const blurAmount = Math.abs(focusLevel - 50) / 10 // 0px at 50, up to 5px at 0 or 100

  // Zoom scale factor
  const zoomScale = magnification === '40x' ? 0.75 : magnification === '100x' ? 1.1 : 1.7

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 p-6 text-white flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-100 text-xs font-bold uppercase tracking-wider mb-1">
            <Microscope className="w-4 h-4" />
            <span>ระดับมัธยมศึกษาตอนต้น (ม.1) • มาตรฐาน สสวท. ชีววิทยา</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            🔬 กล้องจุลทรรศน์เสมือนจริง: เซลล์พืช vs เซลล์สัตว์ (Virtual Microscope Lab)
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-1">
            ปรับปุ่มปรับภาพละเอียด สลับกำลังขยาย $40\times, 100\times, 400\times$ และส่องดูโครงสร้างออร์แกเนลล์เซลล์
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setFocusLevel(50)
            setMagnification('100x')
            setIsStained(true)
          }}
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-xl"
        >
          <RefreshCw className="w-4 h-4 mr-1.5" />
          รีเซ็ตกล้อง
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-8 gap-8">
        {/* Eyepiece Circular Viewport (กล้องจุลทรรศน์) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-between bg-slate-950 rounded-3xl p-6 relative overflow-hidden min-h-[420px]">
          {/* Eyepiece circular frame */}
          <div className="text-center mb-2 z-10">
            <span className="text-xs text-slate-400 font-mono">
              [ ลำกล้องขยาย: เลนส์ใกล้ตา 10× × เลนส์ใกล้วัตถุ = <strong className="text-emerald-400">{magnification}</strong> ]
            </span>
          </div>

          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-8 border-slate-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.3)] overflow-hidden flex items-center justify-center bg-slate-900 my-auto">
            {/* Field of View Grid Reticle */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] z-20" />
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Crosshair */}
              <div className="w-full h-px bg-emerald-500/20 absolute top-1/2" />
              <div className="h-full w-px bg-emerald-500/20 absolute left-1/2" />
            </div>

            {/* Specimen Visual Rendering */}
            <div 
              className="w-full h-full flex items-center justify-center transition-all duration-300 select-none"
              style={{
                filter: `blur(${blurAmount}px)`,
                transform: `scale(${zoomScale})`,
                opacity: isStained ? 1 : 0.4
              }}
            >
              {selectedSlide === 'onion' && (
                /* Onion Epidermal Cells (Brick Wall Pattern) */
                <div className="grid grid-cols-3 gap-1.5 p-4 w-full h-full">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="border-2 border-amber-500/80 bg-amber-100/40 rounded-sm relative flex items-center justify-center p-2 min-h-[50px]">
                      {/* Nucleus */}
                      <div className="w-4 h-4 rounded-full bg-amber-700/80 absolute shadow-sm" style={{ top: `${20 + (i * 7) % 50}%`, left: `${30 + (i * 11) % 40}%` }} />
                      <span className="text-[8px] text-amber-900/60 font-mono">ผนังเซลล์</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedSlide === 'elodea' && (
                /* Elodea Leaf Cells with Chloroplasts */
                <div className="grid grid-cols-3 gap-2 p-4 w-full h-full">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="border-2 border-emerald-500/90 bg-emerald-950/40 rounded-md relative p-2 min-h-[55px] overflow-hidden">
                      {/* Chloroplasts dots */}
                      {[...Array(6)].map((_, j) => (
                        <div 
                          key={j} 
                          className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] absolute"
                          style={{ top: `${15 + (j * 14)}%`, left: `${20 + ((j * 23) % 60)}%` }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {selectedSlide === 'cheek' && (
                /* Cheek Cells (Irregular oval with central nucleus) */
                <div className="flex flex-wrap items-center justify-center gap-6 p-4 w-full h-full">
                  {[
                    { rot: 'rotate-12', w: 'w-24', h: 'h-20' },
                    { rot: '-rotate-6', w: 'w-28', h: 'h-22' },
                    { rot: 'rotate-45', w: 'w-20', h: 'h-18' },
                  ].map((c, i) => (
                    <div 
                      key={i} 
                      className={`${c.w} ${c.h} ${c.rot} rounded-[40%_60%_70%_30%/50%_60%_40%_50%] border-2 border-cyan-400/80 bg-cyan-900/40 relative flex items-center justify-center shadow-inner`}
                    >
                      {/* Blue Nucleus */}
                      <div className="w-5 h-5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      <span className="text-[8px] text-cyan-200/70 absolute bottom-1">เยื่อหุ้มเซลล์</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Focus status indicator on viewport */}
            <div className="absolute bottom-3 text-[10px] font-mono z-30 px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white">
              {blurAmount === 0 ? '✨ โฟกัสคมชัด 100%' : `⚠️ โฟกัสเบลอ (ปรับปุ่มหาจุดคม)`}
            </div>
          </div>

          {/* Bottom Focus Knob Slider */}
          <div className="w-full pt-4 border-t border-slate-800 space-y-1 z-10">
            <div className="flex justify-between text-xs text-slate-300 font-bold">
              <span>🎛️ ปุ่มปรับภาพละเอียด (Fine Focus Adjustment):</span>
              <span className={blurAmount === 0 ? 'text-emerald-400 font-black' : 'text-amber-400'}>
                {blurAmount === 0 ? 'คมชัดที่สุด (Sharp Focus)' : 'กำลังหมุนหาโฟกัส...'}
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={focusLevel} 
              onChange={(e) => setFocusLevel(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>หมุนทวนเข็ม</span>
              <span>หมุนตรงกลาง (50) คมชัดที่สุด</span>
              <span>หมุนตามเข็ม</span>
            </div>
          </div>
        </div>

        {/* Controls & Educational Science Box */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Select Specimen Slide */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              🔬 1. เลือกแผ่นสไลด์ตัวอย่าง (Specimen Slide):
            </label>
            <div className="space-y-2">
              {SLIDES.map(slide => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setSelectedSlide(slide.id)
                    setFocusLevel(50) // auto sharp on switch
                  }}
                  className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    selectedSlide === slide.id
                      ? 'border-emerald-500 bg-emerald-50 shadow-sm ring-2 ring-emerald-200'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900">{slide.name}</div>
                    <div className="text-[11px] text-slate-500">
                      ประเภท: <span className="font-bold text-emerald-700">{slide.type === 'plant' ? '🌱 เซลล์พืช' : '🐾 เซลล์สัตว์'}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono bg-white px-2 py-1 rounded-lg border border-slate-200 font-bold">
                    สไลด์ #{slide.id}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Objective Lens Magnification */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              🔍 2. เลนส์ใกล้วัตถุ (กำลังขยายรวม):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { mag: '40x', label: 'กำลังต่ำ (4×)', total: '40 เท่า' },
                { mag: '100x', label: 'กำลังกลาง (10×)', total: '100 เท่า' },
                { mag: '400x', label: 'กำลังสูง (40×)', total: '400 เท่า' },
              ].map(opt => (
                <button
                  key={opt.mag}
                  onClick={() => setMagnification(opt.mag as Magnification)}
                  className={`p-2.5 rounded-xl text-center border transition-all ${
                    magnification === opt.mag
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-black">{opt.mag}</div>
                  <div className={`text-[10px] ${magnification === opt.mag ? 'text-emerald-100' : 'text-slate-400'}`}>{opt.total}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Staining Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-600" />
              <div>
                <div className="text-xs font-bold text-slate-800">สีย้อมสไลด์: {currentSlideInfo.stain}</div>
                <div className="text-[10px] text-slate-500">ช่วยให้มองเห็นนิวเคลียสและขอบเซลล์ชัดเจนขึ้น</div>
              </div>
            </div>
            <Button
              size="sm"
              variant={isStained ? 'default' : 'outline'}
              onClick={() => setIsStained(!isStained)}
              className={isStained ? 'bg-cyan-600 hover:bg-cyan-700 text-xs h-7' : 'text-xs h-7'}
            >
              {isStained ? 'ย้อมสีแล้ว' : 'ไม่ย้อมสี'}
            </Button>
          </div>

          {/* Organelle Analysis Card */}
          <div className="bg-emerald-50/70 border-2 border-emerald-200 p-4 rounded-2xl space-y-2">
            <h4 className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs sm:text-sm">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              การเปรียบเทียบโครงสร้างเซลล์ (สสวท. ม.1):
            </h4>
            <ul className="text-xs text-slate-700 space-y-1">
              {currentSlideInfo.keyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-200 text-[11px] text-emerald-950 flex items-start gap-1.5 mt-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                <strong>{currentSlideInfo.trapNote}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
