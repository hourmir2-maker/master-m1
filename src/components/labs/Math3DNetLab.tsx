'use client'

import React, { useState } from 'react'
import { Box, Rotate3d, Sliders, CheckCircle, Calculator, Sparkles, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ShapeType = 'cube' | 'pyramid' | 'cylinder' | 'cone'

interface ShapeData {
  id: ShapeType
  name: string
  nameEn: string
  faces: number
  edges: number
  vertices: number
  surfaceFormula: string
  volumeFormula: string
  tips: string
}

const SHAPES: Record<ShapeType, ShapeData> = {
  cube: {
    id: 'cube',
    name: 'ลูกบาศก์ (Cube)',
    nameEn: 'Cube 3D',
    faces: 6,
    edges: 12,
    vertices: 8,
    surfaceFormula: '6 × a²',
    volumeFormula: 'a³',
    tips: 'มีหน้า 6 หน้าเป็นสี่เหลี่ยมจัตุรัสที่เท่ากันทุกประการ เมื่อคลี่ออกจะได้รูปกากบาท 6 ช่อง'
  },
  pyramid: {
    id: 'pyramid',
    name: 'พีระมิดฐานสี่เหลี่ยม (Square Pyramid)',
    nameEn: 'Square Pyramid',
    faces: 5,
    edges: 8,
    vertices: 5,
    surfaceFormula: 'พื้นที่ฐาน (a²) + 4 × (½ × ฐาน × สูงเอียง)',
    volumeFormula: '⅓ × พื้นที่ฐาน × สูงตรง',
    tips: 'เมื่อคลี่ออกจะได้สี่เหลี่ยมจัตุรัสตรงกลาง ล้อมรอบด้วยสามเหลี่ยมหน้าจั่ว 4 รูป'
  },
  cylinder: {
    id: 'cylinder',
    name: 'ทรงกระบอก (Cylinder)',
    nameEn: 'Cylinder',
    faces: 3,
    edges: 2,
    vertices: 0,
    surfaceFormula: '2πr² (วงกลม 2 วง) + 2πrh (ผิวข้าง)',
    volumeFormula: 'πr²h',
    tips: 'คลี่ออกแล้วจะได้ สี่เหลี่ยมผืนผ้า 1 รูป (กว้าง=h, ยาว=2πr) ประกบด้วยวงกลมหัว-ท้าย 2 รูป'
  },
  cone: {
    id: 'cone',
    name: 'ทรงกรวย (Cone)',
    nameEn: 'Cone',
    faces: 2,
    edges: 1,
    vertices: 1,
    surfaceFormula: 'πr² (ฐาน) + πrℓ (ผิวข้าง, ℓ=สูงเอียง)',
    volumeFormula: '⅓ × πr²h',
    tips: 'คลี่ออกแล้วจะได้ รูปพัด (Sector) 1 รูป ประกบด้วยวงกลมฐาน 1 รูป'
  }
}

export default function Math3DNetLab() {
  const [activeShape, setActiveShape] = useState<ShapeType>('cube')
  const [unfoldPercent, setUnfoldPercent] = useState<number>(0) // 0 = 3D folded, 100 = 2D unfolded
  const [sideA, setSideA] = useState<number>(5)
  const [heightH, setHeightH] = useState<number>(8)

  const current = SHAPES[activeShape]

  // Calculate stats based on inputs
  const calculateStats = () => {
    if (activeShape === 'cube') {
      const surface = 6 * sideA * sideA
      const volume = sideA * sideA * sideA
      return { surface: `${surface} ตร.หน่วย`, volume: `${volume} ลบ.หน่วย` }
    }
    if (activeShape === 'pyramid') {
      const slantHeight = Math.sqrt(heightH * heightH + (sideA / 2) * (sideA / 2))
      const baseArea = sideA * sideA
      const lateral = 4 * (0.5 * sideA * slantHeight)
      const surface = (baseArea + lateral).toFixed(1)
      const volume = ((1 / 3) * baseArea * heightH).toFixed(1)
      return { surface: `${surface} ตร.หน่วย`, volume: `${volume} ลบ.หน่วย` }
    }
    if (activeShape === 'cylinder') {
      const r = sideA
      const surface = (2 * Math.PI * r * r + 2 * Math.PI * r * heightH).toFixed(1)
      const volume = (Math.PI * r * r * heightH).toFixed(1)
      return { surface: `${surface} ตร.หน่วย`, volume: `${volume} ลบ.หน่วย` }
    }
    if (activeShape === 'cone') {
      const r = sideA
      const slant = Math.sqrt(r * r + heightH * heightH)
      const surface = (Math.PI * r * r + Math.PI * r * slant).toFixed(1)
      const volume = ((1 / 3) * Math.PI * r * r * heightH).toFixed(1)
      return { surface: `${surface} ตร.หน่วย`, volume: `${volume} ลบ.หน่วย` }
    }
    return { surface: '-', volume: '-' }
  }

  const stats = calculateStats()

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
            <Box className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              🧊 แล็บคลี่รูปทรงเรขาคณิต 3 มิติ (3D Net Unfolder)
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                สสวท. ป.6 - ม.1
              </span>
            </h3>
            <p className="text-sm text-slate-400">
              ทดลองคลี่รูปทรง 3D ออกเป็น 2D เพื่อง่ายต่อการหาพื้นที่ผิวและปริมาตร
            </p>
          </div>
        </div>

        {/* Shape Selectors */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(SHAPES) as ShapeType[]).map((st) => (
            <button
              key={st}
              onClick={() => {
                setActiveShape(st)
                setUnfoldPercent(0)
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeShape === st
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {SHAPES[st].name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Canvas */}
        <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800 rounded-xl p-6 relative flex flex-col items-center justify-center min-h-[380px] overflow-hidden">
          {/* Status Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <Rotate3d className="w-4 h-4 text-amber-400" />
            <span>สถานะ: {unfoldPercent === 0 ? 'รูปทรง 3 มิติ (พับสนิท)' : unfoldPercent === 100 ? 'รูปคลี่ 2 มิติ (กาง 100%)' : `กำลังคลี่ (${unfoldPercent}%)`}</span>
          </div>

          {/* SVG Animated Net */}
          <div className="w-full max-w-[420px] aspect-square flex items-center justify-center relative">
            <svg viewBox="0 0 400 400" className="w-full h-full filter drop-shadow-xl">
              {/* Dynamic rendering based on shape and unfoldPercent */}
              {activeShape === 'cube' && (
                <g transform="translate(200, 200)">
                  {/* Center square (base) */}
                  <rect x="-35" y="-35" width="70" height="70" fill="#f59e0b" fillOpacity="0.8" stroke="#fbbf24" strokeWidth="2" rx="4" />
                  <text x="0" y="5" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">ฐาน</text>

                  {/* Top Flap (folds down) */}
                  <g transform={`translate(0, -35) rotate(${-unfoldPercent * 0.9}, 0, 0)`}>
                    <rect x="-35" y="-70" width="70" height="70" fill="#3b82f6" fillOpacity="0.75" stroke="#60a5fa" strokeWidth="2" rx="4" />
                    <text x="0" y="-30" textAnchor="middle" fill="#ffffff" fontSize="11">บน</text>
                    {/* Top Top Flap */}
                    <g transform={`translate(0, -70) rotate(${-unfoldPercent * 0.9}, 0, 0)`}>
                      <rect x="-35" y="-70" width="70" height="70" fill="#6366f1" fillOpacity="0.75" stroke="#818cf8" strokeWidth="2" rx="4" />
                      <text x="0" y="-30" textAnchor="middle" fill="#ffffff" fontSize="11">ฝาบน</text>
                    </g>
                  </g>

                  {/* Bottom Flap */}
                  <g transform={`translate(0, 35) rotate(${unfoldPercent * 0.9}, 0, 0)`}>
                    <rect x="-35" y="0" width="70" height="70" fill="#10b981" fillOpacity="0.75" stroke="#34d399" strokeWidth="2" rx="4" />
                    <text x="0" y="40" textAnchor="middle" fill="#ffffff" fontSize="11">ล่าง</text>
                  </g>

                  {/* Left Flap */}
                  <g transform={`translate(-35, 0) rotate(${unfoldPercent * 0.9}, 0, 0)`}>
                    <rect x="-70" y="-35" width="70" height="70" fill="#ec4899" fillOpacity="0.75" stroke="#f472b6" strokeWidth="2" rx="4" />
                    <text x="-35" y="5" textAnchor="middle" fill="#ffffff" fontSize="11">ซ้าย</text>
                  </g>

                  {/* Right Flap */}
                  <g transform={`translate(35, 0) rotate(${-unfoldPercent * 0.9}, 0, 0)`}>
                    <rect x="0" y="-35" width="70" height="70" fill="#8b5cf6" fillOpacity="0.75" stroke="#a78bfa" strokeWidth="2" rx="4" />
                    <text x="35" y="5" textAnchor="middle" fill="#ffffff" fontSize="11">ขวา</text>
                  </g>
                </g>
              )}

              {activeShape === 'pyramid' && (
                <g transform="translate(200, 200)">
                  {/* Center Square */}
                  <rect x="-40" y="-40" width="80" height="80" fill="#f59e0b" fillOpacity="0.8" stroke="#fbbf24" strokeWidth="2" rx="4" />
                  <text x="0" y="5" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">ฐาน</text>

                  {/* Top Triangle */}
                  <g transform={`translate(0, -40) rotate(${-unfoldPercent * 0.8}, 0, 0)`}>
                    <polygon points="-40,0 40,0 0,-85" fill="#3b82f6" fillOpacity="0.75" stroke="#60a5fa" strokeWidth="2" />
                  </g>
                  {/* Bottom Triangle */}
                  <g transform={`translate(0, 40) rotate(${unfoldPercent * 0.8}, 0, 0)`}>
                    <polygon points="-40,0 40,0 0,85" fill="#10b981" fillOpacity="0.75" stroke="#34d399" strokeWidth="2" />
                  </g>
                  {/* Left Triangle */}
                  <g transform={`translate(-40, 0) rotate(${unfoldPercent * 0.8}, 0, 0)`}>
                    <polygon points="0,-40 0,40 -85,0" fill="#ec4899" fillOpacity="0.75" stroke="#f472b6" strokeWidth="2" />
                  </g>
                  {/* Right Triangle */}
                  <g transform={`translate(40, 0) rotate(${-unfoldPercent * 0.8}, 0, 0)`}>
                    <polygon points="0,-40 0,40 85,0" fill="#8b5cf6" fillOpacity="0.75" stroke="#a78bfa" strokeWidth="2" />
                  </g>
                </g>
              )}

              {activeShape === 'cylinder' && (
                <g transform="translate(200, 200)">
                  {/* Body rectangle */}
                  <rect 
                    x={-100 * (0.4 + (unfoldPercent / 100) * 0.6)} 
                    y="-50" 
                    width={200 * (0.4 + (unfoldPercent / 100) * 0.6)} 
                    height="100" 
                    fill="#3b82f6" 
                    fillOpacity="0.75" 
                    stroke="#60a5fa" 
                    strokeWidth="2" 
                    rx="4" 
                  />
                  <text x="0" y="5" textAnchor="middle" fill="#ffffff" fontSize="12">ผิวข้าง (2πrh)</text>

                  {/* Top Circle */}
                  <g transform={`translate(0, ${-50 - (unfoldPercent / 100) * 45})`}>
                    <circle cx="0" cy="0" r="35" fill="#f59e0b" fillOpacity="0.85" stroke="#fbbf24" strokeWidth="2" />
                    <text x="0" y="4" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">πr²</text>
                  </g>
                  {/* Bottom Circle */}
                  <g transform={`translate(0, ${50 + (unfoldPercent / 100) * 45})`}>
                    <circle cx="0" cy="0" r="35" fill="#10b981" fillOpacity="0.85" stroke="#34d399" strokeWidth="2" />
                    <text x="0" y="4" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">πr²</text>
                  </g>
                </g>
              )}

              {activeShape === 'cone' && (
                <g transform="translate(200, 200)">
                  {/* Sector (Lateral) */}
                  <path 
                    d={`M 0 0 L -80 -80 A 113 113 0 0 1 80 -80 Z`} 
                    transform={`scale(${0.7 + (unfoldPercent / 100) * 0.6}) rotate(${unfoldPercent * 0.2})`}
                    fill="#8b5cf6" 
                    fillOpacity="0.8" 
                    stroke="#a78bfa" 
                    strokeWidth="2" 
                  />
                  <text x="0" y="-40" textAnchor="middle" fill="#ffffff" fontSize="11">ผิวข้าง (πrℓ)</text>

                  {/* Base Circle */}
                  <g transform={`translate(0, ${40 + (unfoldPercent / 100) * 40})`}>
                    <circle cx="0" cy="0" r="35" fill="#f59e0b" fillOpacity="0.85" stroke="#fbbf24" strokeWidth="2" />
                    <text x="0" y="4" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">ฐาน (πr²)</text>
                  </g>
                </g>
              )}
            </svg>
          </div>

          {/* Interactive Slider Controller */}
          <div className="w-full max-w-md mt-6 bg-slate-900/90 border border-slate-700/60 p-4 rounded-xl flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-400" /> แดร็กสไลเดอร์เพื่อคลี่รูปทรง:
              </span>
              <span className="text-amber-400 text-sm font-bold">{unfoldPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={unfoldPercent}
              onChange={(e) => setUnfoldPercent(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>3D รูปทรงทึบ (0%)</span>
              <span>กำลังกางออก (50%)</span>
              <span>2D รูปคลี่สมบูรณ์ (100%)</span>
            </div>
          </div>
        </div>

        {/* Right: Formulas & Dynamic Calculation */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Shape Properties Card */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4" /> องค์ประกอบเรขาคณิต
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                <div className="text-slate-400">จำนวนหน้า</div>
                <div className="text-base font-bold text-white mt-0.5">{current.faces} หน้า</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                <div className="text-slate-400">ขอบ/เส้นขอบ</div>
                <div className="text-base font-bold text-white mt-0.5">{current.edges} ขอบ</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                <div className="text-slate-400">จุดยอด</div>
                <div className="text-base font-bold text-white mt-0.5">{current.vertices} จุด</div>
              </div>
            </div>
            <p className="text-xs text-slate-300 bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg leading-relaxed">
              💡 <span className="font-semibold text-amber-300">สูตรลับความจำ:</span> {current.tips}
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <Calculator className="w-4 h-4" /> คำนวณพื้นที่ผิว & ปริมาตรจริง
            </h4>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">ความยาวด้าน a / รัศมี r:</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={sideA}
                  onChange={(e) => setSideA(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
              {activeShape !== 'cube' && (
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">ความสูง h:</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={heightH}
                    onChange={(e) => setHeightH(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                  />
                </div>
              )}
            </div>

            {/* Formulas and Outputs */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <div>
                  <div className="text-slate-400 font-medium">พื้นที่ผิวรวม (Surface Area)</div>
                  <div className="text-[11px] text-amber-400 font-mono mt-0.5">{current.surfaceFormula}</div>
                </div>
                <div className="text-sm font-bold text-emerald-300 font-mono">{stats.surface}</div>
              </div>

              <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <div>
                  <div className="text-slate-400 font-medium">ปริมาตร (Volume)</div>
                  <div className="text-[11px] text-blue-400 font-mono mt-0.5">{current.volumeFormula}</div>
                </div>
                <div className="text-sm font-bold text-cyan-300 font-mono">{stats.volume}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
