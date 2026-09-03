'use client'

import React, { useState } from 'react'
import { Magnet, RefreshCw, CheckCircle, XCircle, AlertTriangle, Sparkles, BookOpen, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MaterialItem {
  id: string
  name: string
  material: string
  isMagnetic: boolean
  icon: string
  trapNote: string
}

const TEST_MATERIALS: MaterialItem[] = [
  { id: 'nail', name: 'ตะปูเหล็ก', material: 'เหล็ก (Iron - Fe)', isMagnetic: true, icon: '🔩', trapNote: 'เป็นสารแม่เหล็กแท้ แม่เหล็กจะดูดติดอย่างแรง' },
  { id: 'clip', name: 'ลวดเสียบกระดาษ', material: 'เหล็กกล้าชุบสังกะสี', isMagnetic: true, icon: '📎', trapNote: 'ทำจากเหล็ก แม่เหล็กสามารถดูดติดได้ง่าย' },
  { id: 'coin', name: 'เหรียญ 1 บาทไทย', material: 'เหล็กชุบนิกเกิล', isMagnetic: true, icon: '🪙', trapNote: 'เหรียญกษาปณ์หมุนเวียนปัจจุบันมีไส้ในเป็นเหล็ก แม่เหล็กจึงดูดติด' },
  { id: 'can', name: 'กระป๋องน้ำอัดลม', material: 'อะลูมิเนียม (Aluminium)', isMagnetic: false, icon: '🥫', trapNote: '🚨 จุดดักข้อสอบอันดับ 1! อะลูมิเนียมเป็นโลหะ แต่ "ไม่ใช่สารแม่เหล็ก" แม่เหล็กจึงไม่ดูด!' },
  { id: 'copper', name: 'ลวดทองแดง', material: 'ทองแดง (Copper - Cu)', isMagnetic: false, icon: '〰️', trapNote: 'ทองแดงเป็นโลหะนำไฟฟ้าได้ดีเยี่ยม แต่ "ไม่ใช่สารแม่เหล็ก" แม่เหล็กไม่ดูด!' },
  { id: 'ruler', name: 'ไม้บรรทัดพลาสติก', material: 'พลาสติก (Polymer)', isMagnetic: false, icon: '📏', trapNote: 'เป็นอโลหะและฉนวน ไม่ใช่สารแม่เหล็ก แม่เหล็กไม่ดูดเด็ดขาด' },
]

export default function MagnetLab() {
  const [selectedItem, setSelectedItem] = useState<MaterialItem>(TEST_MATERIALS[0])
  const [magnetDistance, setMagnetDistance] = useState<number>(30) // 10 = touching, 80 = far
  const [labMode, setLabMode] = useState<'materials' | 'poles'>('materials')
  
  // Poles Mode
  const [poleLeft, setPoleLeft] = useState<'N' | 'S'>('N')
  const [poleRight, setPoleRight] = useState<'N' | 'S'>('S')

  const isAttracted = selectedItem.isMagnetic && magnetDistance < 45
  const isPolesAttract = poleLeft !== poleRight // N-S or S-N attract, N-N or S-S repel

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 p-6 text-white flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-100 text-xs font-bold uppercase tracking-wider mb-1">
            <Magnet className="w-4 h-4" />
            <span>ระดับประถมศึกษา (ป.3 - ป.6) • มาตรฐาน สสวท.</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            🧲 ห้องแล็บแม่เหล็ก & สารแม่เหล็ก (Magnets & Magnetic Forces Lab)
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 mt-1">
            ทดสอบแรงดูดของแม่เหล็กกับวัตถุต่างๆ และทดลองแรงผลัก-แรงดูดระหว่างขั้วแม่เหล็ก
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-black/20 p-1 rounded-xl backdrop-blur-xs">
          <button
            onClick={() => setLabMode('materials')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              labMode === 'materials' ? 'bg-white text-slate-900 shadow-md' : 'text-white/80 hover:text-white'
            }`}
          >
            🧪 ทดสอบสารแม่เหล็ก
          </button>
          <button
            onClick={() => setLabMode('poles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              labMode === 'poles' ? 'bg-white text-slate-900 shadow-md' : 'text-white/80 hover:text-white'
            }`}
          >
            🔄 ขั้วแม่เหล็ก N-S
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-8 gap-8">
        {/* Interactive Magnetic Stage */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900 rounded-2xl p-6 relative overflow-hidden min-h-[380px]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Top Info */}
          <div className="flex justify-between text-xs text-slate-400 font-mono z-10">
            <span>[ แท่งแม่เหล็ก (Magnet) ]</span>
            <span>{labMode === 'materials' ? `[ วัตถุ: ${selectedItem.name} ]` : '[ แท่งแม่เหล็กที่ 2 ]'}</span>
          </div>

          {/* Stage Animation Area */}
          <div className="relative w-full h-44 flex items-center justify-between my-auto z-10 px-8">
            {labMode === 'materials' ? (
              <>
                {/* 1. Bar Magnet */}
                <div 
                  className="flex items-center shadow-2xl transition-transform duration-200"
                  style={{ transform: `translateX(${100 - magnetDistance * 1.5}px)` }}
                >
                  <div className="w-16 h-12 bg-red-600 text-white font-black flex items-center justify-center rounded-l-xl text-lg shadow-inner border-r border-red-700">
                    N
                  </div>
                  <div className="w-16 h-12 bg-blue-600 text-white font-black flex items-center justify-center rounded-r-xl text-lg shadow-inner border-l border-blue-700">
                    S
                  </div>
                </div>

                {/* Magnetic Field Rays (if close) */}
                {selectedItem.isMagnetic && magnetDistance < 50 && (
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-75 animate-pulse">
                    <span className="text-sky-400 font-mono text-xs">⚡ เส้นแรงแม่เหล็ก ⚡</span>
                  </div>
                )}

                {/* 2. Test Material */}
                <div 
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isAttracted ? 'translate-x-[-40px] rotate-[-15deg]' : ''
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-4xl shadow-lg backdrop-blur-xs">
                    {selectedItem.icon}
                  </div>
                  <span className="text-[11px] font-bold text-white mt-2">
                    {selectedItem.name}
                  </span>
                  {isAttracted && (
                    <span className="text-[10px] text-emerald-400 font-black mt-0.5 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500">
                      🧲 ดูดติดแม่เหล็ก!
                    </span>
                  )}
                </div>
              </>
            ) : (
              /* Poles Interaction Mode */
              <>
                {/* Left Magnet */}
                <div className="flex items-center shadow-2xl">
                  <div className={`w-14 h-12 text-white font-black flex items-center justify-center rounded-l-xl text-lg ${poleLeft === 'N' ? 'bg-red-600' : 'bg-blue-600'}`}>
                    {poleLeft === 'N' ? 'S' : 'N'}
                  </div>
                  <div className={`w-14 h-12 text-white font-black flex items-center justify-center rounded-r-xl text-lg ${poleLeft === 'N' ? 'bg-blue-600' : 'bg-red-600'}`}>
                    {poleLeft}
                  </div>
                </div>

                {/* Force Lines & State */}
                <div className="text-center px-4">
                  {isPolesAttract ? (
                    <div className="text-emerald-400 font-black text-sm flex flex-col items-center gap-1 animate-bounce">
                      <span>🧲 ดูดกัน (Attract)</span>
                      <span className="text-[10px] font-mono text-slate-400">ขั้วต่างกัน N ⇄ S</span>
                    </div>
                  ) : (
                    <div className="text-rose-400 font-black text-sm flex flex-col items-center gap-1 animate-pulse">
                      <span>⚡ ผลักกัน (Repel)</span>
                      <span className="text-[10px] font-mono text-slate-400">ขั้วเหมือนกัน {poleLeft} ⇆ {poleRight}</span>
                    </div>
                  )}
                </div>

                {/* Right Magnet */}
                <div className="flex items-center shadow-2xl">
                  <div className={`w-14 h-12 text-white font-black flex items-center justify-center rounded-l-xl text-lg ${poleRight === 'N' ? 'bg-red-600' : 'bg-blue-600'}`}>
                    {poleRight}
                  </div>
                  <div className={`w-14 h-12 text-white font-black flex items-center justify-center rounded-r-xl text-lg ${poleRight === 'N' ? 'bg-blue-600' : 'bg-red-600'}`}>
                    {poleRight === 'N' ? 'S' : 'N'}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Bottom Slider / Controls */}
          {labMode === 'materials' ? (
            <div className="w-full pt-3 border-t border-slate-800 space-y-1.5 z-10">
              <div className="flex justify-between text-xs text-slate-300 font-bold">
                <span>เลื่อนแม่เหล็กเข้าใกล้วัตถุ:</span>
                <span className="text-amber-400">{magnetDistance < 45 ? 'ระยะใกล้ (สนามแม่เหล็กส่งผล)' : 'ระยะห่าง'}</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={magnetDistance}
                onChange={(e) => setMagnetDistance(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>
          ) : (
            <div className="w-full pt-3 border-t border-slate-800 flex justify-center gap-4 z-10">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPoleLeft(p => p === 'N' ? 'S' : 'N')}
                className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 rounded-xl text-xs"
              >
                🔄 สลับขั้วแท่งซ้าย ({poleLeft})
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPoleRight(p => p === 'N' ? 'S' : 'N')}
                className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 rounded-xl text-xs"
              >
                🔄 สลับขั้วแท่งขวา ({poleRight})
              </Button>
            </div>
          )}
        </div>

        {/* Right Side: Materials Grid & Diagnosis */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {labMode === 'materials' ? (
            <>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  📦 เลือกวัตถุเพื่อทดสอบกับแม่เหล็ก:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TEST_MATERIALS.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`p-3 rounded-2xl border text-left flex flex-col items-center text-center transition-all ${
                        selectedItem.id === item.id
                          ? 'border-rose-500 bg-rose-50 shadow-md ring-2 ring-rose-200'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl mb-1">{item.icon}</span>
                      <span className="text-xs font-bold text-slate-800">{item.name}</span>
                      <span className="text-[10px] text-slate-500 truncate max-w-full">{item.material}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Scientific Diagnosis */}
              <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-xs text-slate-800">ผลการทดลอง:</span>
                  {selectedItem.isMagnetic ? (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" /> เป็นสารแม่เหล็ก (ดูดติด)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                      <XCircle className="w-3.5 h-3.5" /> ไม่ใช่สารแม่เหล็ก (ไม่ดูด)
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedItem.trapNote}
                </p>

                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5 mt-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>🧠 ทริกจำสอบ สสวท. & O-NET:</strong> สารที่แม่เหล็กดูดได้ มีเพียง 3 ชนิดหลักคือ <strong>เหล็ก (Fe), นิเกิล (Ni), โคบอลต์ (Co)</strong> ส่วนโลหะอื่นๆ เช่น <em>ทองคำ, เงิน, ทองแดง, อะลูมิเนียม</em> แม่เหล็ก <u>ไม่ดูดเด็ดขาด</u>!
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-200 p-5 rounded-2xl space-y-2.5">
                <h4 className="font-bold text-blue-950 flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  กฎแรงแม่เหล็ก (Magnetic Poles Law)
                </h4>
                <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600">✓ ขั้วต่างกัน (N กับ S):</span>
                    <span>เกิด <strong>แรงดึงดูด (Attraction)</strong> เส้นแรงแม่เหล็กจะพุ่งออกจากขั้วเหนือ (N) เข้าสู่ขั้วใต้ (S)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-600">✗ ขั้วเหมือนกัน (N กับ N หรือ S กับ S):</span>
                    <span>เกิด <strong>แรงผลัก (Repulsion)</strong> เส้นแรงแม่เหล็กจะเบนหนีออกจากกัน เกิดเป็น <em>จุดสะเทิน (Neutral Point)</em> ตรงกลาง</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>🎯 ข้อสอบเตรียมเข้า ม.1 ถามบ่อย:</strong> หากนำแท่งแม่เหล็กมาหักออกเป็น 2 ท่อน แท่งแม่เหล็กแต่ละท่อน <em>จะเกิดเป็นแท่งแม่เหล็กใหม่ที่มีทั้งขั้ว N และ S เสมอ</em> (ไม่สามารถแยกขั้วแม่เหล็กเดี่ยว หรือ Magnetic Monopole ได้ในทางปฏิบัติ)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
