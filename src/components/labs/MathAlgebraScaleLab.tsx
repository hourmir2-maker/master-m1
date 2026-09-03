'use client'

import React, { useState } from 'react'
import { Scale, Plus, Minus, Divide, CheckCircle, RotateCcw, Sparkles, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PresetEquation {
  id: string
  label: string
  a: number // coefficient of x
  b: number // constant on left (+b)
  c: number // total on right
}

const PRESETS: PresetEquation[] = [
  { id: '1', label: '2x + 4 = 14', a: 2, b: 4, c: 14 },
  { id: '2', label: '3x + 3 = 18', a: 3, b: 3, c: 18 },
  { id: '3', label: '4x + 8 = 24', a: 4, b: 8, c: 24 },
  { id: '4', label: '2x + 7 = 19', a: 2, b: 7, c: 19 }
]

export default function MathAlgebraScaleLab() {
  const [selectedPreset, setSelectedPreset] = useState<PresetEquation>(PRESETS[0])
  const [currentA, setCurrentA] = useState<number>(PRESETS[0].a)
  const [currentB, setCurrentB] = useState<number>(PRESETS[0].b)
  const [currentC, setCurrentC] = useState<number>(PRESETS[0].c)
  const [history, setHistory] = useState<string[]>(['เริ่มต้น: 2x + 4 = 14'])
  const [isSolved, setIsSolved] = useState<boolean>(false)

  // Load a preset
  const loadPreset = (p: PresetEquation) => {
    setSelectedPreset(p)
    setCurrentA(p.a)
    setCurrentB(p.b)
    setCurrentC(p.c)
    setHistory([`เริ่มต้น: ${p.label}`])
    setIsSolved(false)
  }

  // Reset current equation
  const resetEquation = () => {
    loadPreset(selectedPreset)
  }

  // Subtract constant from both sides
  const subtractConstant = (val: number) => {
    if (currentB >= val && currentC >= val) {
      const newB = currentB - val
      const newC = currentC - val
      setCurrentB(newB)
      setCurrentC(newC)
      const stepText = `หักออก ${val} ทั้งสองข้าง ➔ ${currentA}x ${newB > 0 ? `+ ${newB}` : ''} = ${newC}`
      setHistory(prev => [...prev, stepText])
      if (currentA === 1 && newB === 0) {
        setIsSolved(true)
      }
    }
  }

  // Divide both sides by A
  const divideBothSides = (val: number) => {
    if (val > 0 && currentB === 0 && currentC % val === 0 && currentA % val === 0) {
      const newA = currentA / val
      const newC = currentC / val
      setCurrentA(newA)
      setCurrentC(newC)
      const stepText = `หารด้วย ${val} ทั้งสองข้าง ➔ x = ${newC}`
      setHistory(prev => [...prev, stepText])
      if (newA === 1) {
        setIsSolved(true)
      }
    }
  }

  // Calculate tilt angle based on balance (0deg if equal)
  const leftWeight = currentA * ((selectedPreset.c - selectedPreset.b) / selectedPreset.a) + currentB
  const rightWeight = currentC
  const tiltAngle = Math.max(-12, Math.min(12, (rightWeight - leftWeight) * 1.5))

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Scale className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              ⚖️ แล็บตาชั่งสมดุลแก้สมการ (Algebra Balance Scale)
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                สสวท. ป.6 - ม.1
              </span>
            </h3>
            <p className="text-sm text-slate-400">
              เข้าใจหลักการ "ย้ายข้างสมการ คือการทำเหมือนกันทั้งสองข้าง" ผ่านตาชั่งจำลอง
            </p>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => loadPreset(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedPreset.id === p.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={resetEquation}
            className="h-8 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> รีเซ็ต
          </Button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: The Balance Scale SVG */}
        <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800 rounded-xl p-6 relative flex flex-col items-center justify-center min-h-[380px]">
          {/* Solved celebration banner */}
          {isSolved && (
            <div className="absolute top-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold animate-bounce z-10">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              ยินดีด้วย! คุณหาค่า x ได้สำเร็จ: x = {currentC}
            </div>
          )}

          {/* SVG Balance Scale */}
          <div className="w-full max-w-[500px] aspect-[4/3] flex items-center justify-center relative">
            <svg viewBox="0 0 500 350" className="w-full h-full filter drop-shadow-xl">
              {/* Stand Base */}
              <polygon points="210,320 290,320 260,180 240,180" fill="#334155" stroke="#475569" strokeWidth="2" />
              <circle cx="250" cy="180" r="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2" />

              {/* Tilting Beam */}
              <g transform={`rotate(${tiltAngle}, 250, 180)`}>
                {/* Horizontal Beam */}
                <rect x="70" y="176" width="360" height="8" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
                <circle cx="100" cy="180" r="5" fill="#f59e0b" />
                <circle cx="400" cy="180" r="5" fill="#f59e0b" />

                {/* Left Pan Chains & Plate */}
                <g transform="translate(100, 180)">
                  <line x1="0" y1="0" x2="-35" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="0" y1="0" x2="35" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <ellipse cx="0" cy="70" rx="55" ry="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />

                  {/* Left Items (X Blocks + Coins) */}
                  <g transform="translate(-40, 50)">
                    {/* X Blocks */}
                    {Array.from({ length: currentA }).map((_, i) => (
                      <g key={`x-${i}`} transform={`translate(${i * 26}, ${-Math.floor(i / 3) * 26})`}>
                        <rect x="0" y="0" width="24" height="24" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1.5" />
                        <text x="12" y="16" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">X</text>
                      </g>
                    ))}
                    {/* Constant Coins */}
                    {Array.from({ length: currentB }).map((_, i) => (
                      <g key={`coin-${i}`} transform={`translate(${(i % 5) * 16 + 2}, ${-24 - Math.floor(i / 5) * 16})`}>
                        <circle cx="6" cy="6" r="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1" />
                        <text x="6" y="9" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">1</text>
                      </g>
                    ))}
                  </g>
                </g>

                {/* Right Pan Chains & Plate */}
                <g transform="translate(400, 180)">
                  <line x1="0" y1="0" x2="-35" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="0" y1="0" x2="35" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <ellipse cx="0" cy="70" rx="55" ry="12" fill="#1e293b" stroke="#34d399" strokeWidth="2" />

                  {/* Right Items (Constant Coins) */}
                  <g transform="translate(-42, 50)">
                    {Array.from({ length: Math.min(25, currentC) }).map((_, i) => (
                      <g key={`r-coin-${i}`} transform={`translate(${(i % 6) * 14}, ${-Math.floor(i / 6) * 14})`}>
                        <circle cx="6" cy="6" r="6" fill="#10b981" stroke="#34d399" strokeWidth="1" />
                        <text x="6" y="9" textAnchor="middle" fill="#064e3b" fontSize="8" fontWeight="bold">1</text>
                      </g>
                    ))}
                    {currentC > 25 && (
                      <text x="40" y="-35" fill="#34d399" fontSize="12" fontWeight="bold">+{currentC - 25}</text>
                    )}
                  </g>
                </g>
              </g>

              {/* Current Equation Display on Board */}
              <rect x="180" y="30" width="140" height="42" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <text x="250" y="56" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold" fontFamily="monospace">
                {currentA}x {currentB > 0 ? `+ ${currentB}` : ''} = {currentC}
              </text>
            </svg>
          </div>
        </div>

        {/* Right: Interactive Action Controls */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Action Pad */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> เลือกขั้นตอนการแก้สมการ
            </h4>

            {/* Step 1: Subtract Constants */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 block font-medium">สเต็ป 1: กำจัดตัวเลขคงที่ (+{currentB})</span>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentB < 1 || isSolved}
                  onClick={() => subtractConstant(1)}
                  className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-xs text-amber-300"
                >
                  <Minus className="w-3.5 h-3.5 mr-1" /> หักออก 1 ทั้งสองข้าง
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentB === 0 || isSolved}
                  onClick={() => subtractConstant(currentB)}
                  className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-xs text-amber-300 font-bold"
                >
                  <Minus className="w-3.5 h-3.5 mr-1" /> หักออก {currentB} หมดเลย
                </Button>
              </div>
            </div>

            {/* Step 2: Divide by coefficient */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 block font-medium">สเต็ป 2: กำจัดสัมประสิทธิ์หน้า x ({currentA}x)</span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentB > 0 || currentA <= 1 || isSolved}
                onClick={() => divideBothSides(currentA)}
                className="w-full bg-slate-900 border-slate-700 hover:bg-slate-800 text-xs text-emerald-400 font-bold"
              >
                <Divide className="w-3.5 h-3.5 mr-1" /> หารด้วย {currentA} ทั้งสองข้าง
              </Button>
            </div>

            {/* Hint Box */}
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg text-xs text-slate-300 leading-relaxed">
              💡 <span className="text-amber-300 font-semibold">กุญแจสำคัญ:</span> สมการเปรียบเหมือนตาชั่งที่ต้องเอียงเท่ากันเสมอ ถ้าเราหักลูกตุ้มออกจากจานซ้าย เราต้องหักออกจากจานขวาในจำนวนเท่ากันด้วย!
            </div>
          </div>

          {/* Step History Log */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex-1">
            <h5 className="text-xs font-bold text-slate-400 mb-2">ประวัติการแก้สมการ:</h5>
            <div className="space-y-1 text-xs font-mono text-slate-300 max-h-[140px] overflow-y-auto">
              {history.map((h, idx) => (
                <div key={idx} className="flex items-center gap-1.5 py-0.5 border-b border-slate-900">
                  <span className="text-slate-600">{idx + 1}.</span>
                  <span className={idx === history.length - 1 ? 'text-emerald-400 font-bold' : ''}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
