'use client'

import React, { useState } from 'react'
import { Sun, Lightbulb, MoveHorizontal, RefreshCw, BookOpen, AlertTriangle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

type LightSourceSize = 'point' | 'small' | 'large'
type ObjectOpacity = 'opaque' | 'translucent' | 'transparent'

export default function LightShadowLab() {
  // Distance from light to object (10 to 90 % of distance to screen)
  const [objectPos, setObjectPos] = useState<number>(50) // 10 = near light, 90 = near screen
  const [lightSize, setLightSize] = useState<LightSourceSize>('small')
  const [objectOpacity, setObjectOpacity] = useState<ObjectOpacity>('opaque')

  const handleReset = () => {
    setObjectPos(50)
    setLightSize('small')
    setObjectOpacity('opaque')
  }

  // Calculate Shadow Dimensions
  // Closer to light (low objectPos) -> Bigger shadow on screen
  // Closer to screen (high objectPos) -> Smaller shadow on screen
  const scaleFactor = (100 - objectPos) / 40 // ~2.25 at pos 10, ~0.25 at pos 90

  let umbraRadius = 0
  let penumbraRadius = 0

  if (objectOpacity === 'opaque') {
    if (lightSize === 'point') {
      umbraRadius = Math.round(30 * scaleFactor)
      penumbraRadius = 0 // จุดกำเนิดแสงขนาดเล็ก ไม่มีเงามัว
    } else if (lightSize === 'small') {
      umbraRadius = Math.round(24 * scaleFactor)
      penumbraRadius = Math.round(42 * scaleFactor)
    } else {
      // Large light source
      umbraRadius = Math.max(0, Math.round(15 * (100 - objectPos * 1.5) / 50))
      penumbraRadius = Math.round(55 * (1 + (objectPos / 80)))
    }
  } else if (objectOpacity === 'translucent') {
    umbraRadius = 0
    penumbraRadius = Math.round(35 * scaleFactor)
  } else {
    // Transparent
    umbraRadius = 0
    penumbraRadius = 0
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 p-6 text-white flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-100 text-xs font-bold uppercase tracking-wider mb-1">
            <Sun className="w-4 h-4" />
            <span>ระดับประถมศึกษา (ป.4 - ป.6) • มาตรฐาน สสวท.</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            🪞 ห้องแล็บการเกิดเงา: เงามืด & เงามัว (Light & Shadows Simulator)
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 mt-1">
            ปรับตำแหน่งวัตถุและขนาดแหล่งกำเนิดแสง สังเกตการเปลี่ยนแปลงของเงามืดและเงามัวบนฉากรับแสง
          </p>
        </div>

        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-xl"
        >
          <RefreshCw className="w-4 h-4 mr-1.5" />
          รีเซ็ตแล็บ (Reset)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-8 gap-8">
        {/* Optical Bench 2D Simulator */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 rounded-2xl p-6 relative overflow-hidden min-h-[380px]">
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Top Label */}
          <div className="flex justify-between text-[11px] text-slate-400 font-mono z-10">
            <span>[ แหล่งกำเนิดแสง ]</span>
            <span>[ วัตถุกั้นแสง ]</span>
            <span>[ ฉากรับแสง (Screen) ]</span>
          </div>

          {/* Optical Bench Apparatus */}
          <div className="relative w-full h-44 flex items-center justify-between my-auto z-10 px-4">
            {/* 1. Light Source */}
            <div className="flex flex-col items-center shrink-0">
              <div 
                className={`rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.8)] ${
                  lightSize === 'point' 
                    ? 'w-6 h-6 bg-yellow-300' 
                    : lightSize === 'small' 
                    ? 'w-10 h-10 bg-gradient-to-r from-amber-300 to-yellow-400' 
                    : 'w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-300'
                }`}
              >
                <Lightbulb className="w-5 h-5 text-amber-900" />
              </div>
              <span className="text-[10px] text-amber-300 font-bold mt-2">
                {lightSize === 'point' ? 'จุดแสงเล็ก' : lightSize === 'small' ? 'หลอดไฟขนาดปกติ' : 'โคมไฟขนาดใหญ่'}
              </span>
            </div>

            {/* Light Rays Projection Lines */}
            <div className="absolute inset-x-12 inset-y-0 pointer-events-none opacity-20">
              <svg className="w-full h-full">
                <line x1="0" y1="50%" x2="100%" y2="10%" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="50%" x2="100%" y2="90%" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* 2. Obstacle Object (Movable) */}
            <div 
              className="absolute transition-all duration-150 flex flex-col items-center"
              style={{ left: `${15 + (objectPos * 0.65)}%` }}
            >
              <div 
                className={`w-12 h-12 rounded-full border-2 transition-all shadow-lg ${
                  objectOpacity === 'opaque'
                    ? 'bg-gradient-to-br from-slate-600 to-slate-800 border-slate-400'
                    : objectOpacity === 'translucent'
                    ? 'bg-amber-500/50 border-amber-300 backdrop-blur-xs'
                    : 'bg-cyan-400/20 border-cyan-200 backdrop-blur-xs'
                }`}
              />
              <span className="text-[10px] text-slate-300 font-bold mt-1 bg-slate-900/80 px-2 py-0.5 rounded">
                {objectOpacity === 'opaque' ? 'วัตถุทึบแสง' : objectOpacity === 'translucent' ? 'วัตถุโปร่งแสง' : 'วัตถุโปร่งใส'}
              </span>
            </div>

            {/* 3. Screen (ฉากรับแสง) */}
            <div className="flex flex-col items-center shrink-0 h-40 justify-center">
              <div className="w-6 h-36 bg-slate-200 border-2 border-slate-400 rounded-sm relative flex items-center justify-center overflow-hidden shadow-inner">
                {/* Penumbra Ring (เงามัว) */}
                {penumbraRadius > 0 && (
                  <div 
                    className="absolute bg-slate-400/60 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(30, penumbraRadius * 0.7)}px`, 
                      height: `${Math.min(130, penumbraRadius * 1.8)}px` 
                    }}
                  />
                )}

                {/* Umbra Core (เงามืด) */}
                {umbraRadius > 0 && (
                  <div 
                    className="absolute bg-slate-950 rounded-full transition-all duration-300 shadow-md"
                    style={{ 
                      width: `${Math.min(22, umbraRadius * 0.7)}px`, 
                      height: `${Math.min(100, umbraRadius * 1.8)}px` 
                    }}
                  />
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-bold mt-1">ฉากสีขาว</span>
            </div>
          </div>

          {/* Optical Bench Scale Indicator */}
          <div className="w-full pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400 z-10">
            <span>← ใกล้แหล่งกำเนิดแสง</span>
            <span className="text-amber-400 font-bold">ตำแหน่งวัตถุ: {objectPos}%</span>
            <span>ใกล้ฉากรับแสง →</span>
          </div>
        </div>

        {/* Controls & Scientific Explanation */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          {/* Slider: Object Position */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <MoveHorizontal className="w-4 h-4 text-orange-600" />
                เลื่อนตำแหน่งวัตถุกั้นแสง:
              </label>
              <span className="text-xs font-black text-orange-600">
                {objectPos < 40 ? 'ใกล้ไฟฉาย' : objectPos > 60 ? 'ใกล้ฉาก' : 'กึ่งกลาง'}
              </span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="90" 
              value={objectPos} 
              onChange={(e) => setObjectPos(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>ยิ่งใกล้วัตถุ ➔ เงายิ่งใหญ่</span>
              <span>ยิ่งใกล้ฉาก ➔ เงายิ่งเล็ก</span>
            </div>
          </div>

          {/* Toggle: Light Source Size */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              💡 ขนาดของแหล่งกำเนิดแสง:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'point', label: 'จุดกำเนิดแสงเล็ก' },
                { id: 'small', label: 'ขนาดปานกลาง' },
                { id: 'large', label: 'ขนาดใหญ่กว่าวัตถุ' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setLightSize(opt.id as LightSourceSize)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    lightSize === opt.id
                      ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle: Object Opacity */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              🧱 ความโปร่งแสงของวัตถุ:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'opaque', label: 'ทึบแสง (ดินน้ำมัน)' },
                { id: 'translucent', label: 'โปร่งแสง (กระดาษไข)' },
                { id: 'transparent', label: 'โปร่งใส (แก้วใส)' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setObjectOpacity(opt.id as ObjectOpacity)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    objectOpacity === opt.id
                      ? 'bg-orange-600 text-white border-orange-700 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Scientific Diagnosis */}
          <div className="bg-amber-50/70 border-2 border-amber-200 p-4 rounded-2xl space-y-2">
            <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm border-b border-amber-200/60 pb-1.5">
              <BookOpen className="w-4 h-4 text-amber-700" />
              ผลการทดลองตามหลักสูตร สสวท. ป.4 - ป.6:
            </h4>
            <div className="text-xs text-slate-700 space-y-1 leading-relaxed">
              <div>• <strong>เงามืด (Umbra):</strong> {umbraRadius > 0 ? `ปรากฏเงามืดชัดเจน (รัศมี ${umbraRadius} px) ไม่มีแสงผ่านได้เลย` : 'ไม่เกิดเงามืด'}</div>
              <div>• <strong>เงามัว (Penumbra):</strong> {penumbraRadius > 0 ? `ปรากฏเงามัวล้อมรอบ (รัศมี ${penumbraRadius} px) มีแสงบางส่วนผ่านได้` : 'ไม่เกิดเงามัว (เพราะแหล่งกำเนิดแสงเป็นจุดเล็ก)'}</div>
              <div>• <strong>ขนาดเงา:</strong> {objectPos < 40 ? '🔥 เงาบนฉากขยายใหญ่มาก เนื่องจากวัตถุอยู่ใกล้แหล่งกำเนิดแสง ขวางลำแสงเป็นมุมกว้าง' : objectPos > 60 ? 'เงาบนฉากมีขนาดเล็กลงและคมชัดขึ้น เนื่องจากวัตถุอยู่ใกล้ฉากรับแสง' : 'เงาขนาดมาตรฐาน'}</div>
            </div>

            <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5 mt-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>🎯 ข้อสอบ O-NET ชอบออก:</strong> เมื่อนำแหล่งกำเนิดแสงขนาดใหญ่กว่าวัตถุมาส่อง จะเกิด <em>เงามืดรูปกรวยแหลม</em> หากวางฉากพ้นปลายกรวยเงามืด จะเห็นเฉพาะ <strong>เงามัว</strong> (หลักการเดียวกับการเกิดสุริยุปราคาวงแหวน)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
