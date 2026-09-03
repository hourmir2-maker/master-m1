'use client'

import React, { useState } from 'react'
import { Beaker, Flame, Droplets, RefreshCw, AlertTriangle, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SampleFood {
  id: string
  name: string
  mainNutrient: 'starch' | 'reducing_sugar' | 'sucrose' | 'protein' | 'lipid'
  description: string
  trapNote?: string
}

const SAMPLES: SampleFood[] = [
  { id: 'rice', name: '🍚 น้ำข้าวต้มบดละเอียด', mainNutrient: 'starch', description: 'ประกอบด้วยแป้ง (คาร์โบไฮเดรตสายยาว)' },
  { id: 'glucose', name: '🍇 น้ำองุ่นคั้นสด', mainNutrient: 'reducing_sugar', description: 'มีน้ำตาลโมเลกุลเดี่ยว (กลูโคส/ฟรักโทส)' },
  { id: 'egg', name: '🥚 สารละลายไข่ขาว', mainNutrient: 'protein', description: 'มีโปรตีนอัลบูมินที่มีพันธะเพปไทด์' },
  { id: 'sucrose', name: '🍬 น้ำเชื่อมน้ำตาลทราย', mainNutrient: 'sucrose', description: 'น้ำตาลโมเลกุลคู่ (ซูโครส)', trapNote: '⚠️ จุดดักข้อสอบ: น้ำตาลทรายไม่ใช่น้ำตาลรีดิวซ์ ไม่ทำปฏิกิริยากับเบเนดิกต์!' },
  { id: 'oil', name: '🌻 น้ำมันพืช', mainNutrient: 'lipid', description: 'สารอาหารประเภทลิพิด/ไขมัน' },
]

type Reagent = 'iodine' | 'benedict' | 'biuret'

export default function NutrientTestingLab() {
  const [selectedSample, setSelectedSample] = useState<SampleFood>(SAMPLES[0])
  const [addedReagent, setAddedReagent] = useState<Reagent | null>(null)
  const [isHeated, setIsHeated] = useState<boolean>(false)
  const [isDropping, setIsDropping] = useState<boolean>(false)

  // Reset experiment
  const handleReset = () => {
    setAddedReagent(null)
    setIsHeated(false)
    setIsDropping(false)
  }

  // Handle sample change
  const handleSelectSample = (sample: SampleFood) => {
    setSelectedSample(sample)
    handleReset()
  }

  // Handle reagent addition
  const handleAddReagent = (reagent: Reagent) => {
    setIsDropping(true)
    setTimeout(() => {
      setAddedReagent(reagent)
      setIsHeated(false)
      setIsDropping(false)
    }, 600)
  }

  // Calculate liquid color and state
  const getReactionState = () => {
    if (!addedReagent) {
      return {
        liquidColor: 'bg-amber-50/70 border-amber-200',
        textColor: 'text-slate-600',
        colorName: 'สารละลายตัวอย่างใสขุ่น',
        hasPrecipitate: false,
        resultType: 'neutral',
        explanation: 'ยังไม่ได้หยดสารเคมีทดสอบ กรุณาเลือกสารเคมีทางขวามือ'
      }
    }

    // 1. Iodine Test (แป้ง)
    if (addedReagent === 'iodine') {
      if (selectedSample.mainNutrient === 'starch') {
        return {
          liquidColor: 'bg-indigo-950 border-indigo-900 shadow-inner',
          textColor: 'text-indigo-600 font-black',
          colorName: 'เปลี่ยนเป็นสีน้ำเงินเข้มแกมดำ (Blue-Black) 🔵',
          hasPrecipitate: false,
          resultType: 'positive',
          explanation: '✅ ผลบวก: โมเลกุลของไอโอดีน (I₃⁻) แทรกตัวเข้าไปในเกลียวของอะไมโลสในแป้ง ทำให้ดูดกลืนแสงและเห็นเป็นสีน้ำเงินเข้ม'
        }
      }
      return {
        liquidColor: 'bg-amber-400 border-amber-500',
        textColor: 'text-amber-800 font-bold',
        colorName: 'สียังคงเป็นสีน้ำตาลอมส้มของไอโอดีน 🟠',
        hasPrecipitate: false,
        resultType: 'negative',
        explanation: '❌ ผลลบ: สารตัวอย่างไม่มีแป้ง ไอโอดีนจึงคงสีน้ำตาลเหลืองเดิม'
      }
    }

    // 2. Benedict Test (น้ำตาลรีดิวซ์)
    if (addedReagent === 'benedict') {
      if (!isHeated) {
        return {
          liquidColor: 'bg-sky-400 border-sky-500',
          textColor: 'text-sky-700 font-bold',
          colorName: 'สารละลายเป็นสีฟ้าของเบเนดิกต์ (ยังไม่ได้รับความร้อน) 🧊',
          hasPrecipitate: false,
          resultType: 'waiting_heat',
          explanation: '⚠️ สารละลายเบเนดิกต์ต้อง "ต้มในน้ำเดือด" ก่อนจึงจะเกิดปฏิกิริยา! กรุณากดปุ่มจุดตะเกียงต้มความร้อนด้านล่าง'
        }
      }

      // Heated
      if (selectedSample.mainNutrient === 'reducing_sugar') {
        return {
          liquidColor: 'bg-gradient-to-b from-orange-500 to-red-600 border-red-700',
          textColor: 'text-red-600 font-black',
          colorName: 'เกิดตะกอนสีแดงอิฐ (Brick-Red Precipitate: Cu₂O) 🔴',
          hasPrecipitate: true,
          resultType: 'positive',
          explanation: '✅ ผลบวก: น้ำตาลรีดิวซ์จะรีดิวซ์ Cu²⁺ (สีฟ้า) กลายเป็น Cu⁺ ตกตะกอนเป็นคอปเปอร์(I)ออกไซด์สีแดงอิฐ'
        }
      }

      if (selectedSample.mainNutrient === 'sucrose') {
        return {
          liquidColor: 'bg-sky-400 border-sky-500',
          textColor: 'text-amber-700 font-bold',
          colorName: 'คงเป็นสีฟ้า ไม่เปลี่ยนสีและไม่มีตะกอน 🔵',
          hasPrecipitate: false,
          resultType: 'negative_trap',
          explanation: '🎯 ดักข้อสอบ สสวท. 10 ปี: น้ำตาลทราย (ซูโครส) เป็น Non-reducing sugar ไม่มีหมู่อัลดีไฮด์อิสระ จึงไม่ทำปฏิกิริยากับเบเนดิกต์ แม้จะต้มแล้วก็ตาม!'
        }
      }

      return {
        liquidColor: 'bg-sky-400 border-sky-500',
        textColor: 'text-slate-600 font-medium',
        colorName: 'คงเป็นสีฟ้าของเบเนดิกต์ ไม่มีตะกอน 🔵',
        hasPrecipitate: false,
        resultType: 'negative',
        explanation: '❌ ผลลบ: สารตัวอย่างไม่มีน้ำตาลรีดิวซ์'
      }
    }

    // 3. Biuret Test (โปรตีน)
    if (addedReagent === 'biuret') {
      if (selectedSample.mainNutrient === 'protein') {
        return {
          liquidColor: 'bg-purple-600 border-purple-800 shadow-inner',
          textColor: 'text-purple-700 font-black',
          colorName: 'เปลี่ยนเป็นสีม่วงสด (Violet / Purple) 🟣',
          hasPrecipitate: false,
          resultType: 'positive',
          explanation: '✅ ผลบวก: Cu²⁺ ในสารไบยูเร็ตสร้างสารเชิงซ้อนกับพันธะเพปไทด์ (Peptide bonds) ในสารละลายเบส เกิดเป็นสีม่วงสดใส'
        }
      }
      return {
        liquidColor: 'bg-blue-300 border-blue-400',
        textColor: 'text-slate-600 font-medium',
        colorName: 'เป็นสีฟ้าอ่อนของคอปเปอร์ซัลเฟต 🔵',
        hasPrecipitate: false,
        resultType: 'negative',
        explanation: '❌ ผลลบ: ไม่พบพันธะเพปไทด์ (โปรตีน) ในสารตัวอย่างนี้'
      }
    }

    return {
      liquidColor: 'bg-amber-50',
      textColor: 'text-slate-600',
      colorName: '',
      hasPrecipitate: false,
      resultType: 'neutral',
      explanation: ''
    }
  }

  const reaction = getReactionState()

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 p-6 text-white flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Beaker className="w-4 h-4" />
            <span>Interactive Science Simulator • IPST Standards</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            🔬 ห้องแล็บทดสอบสารอาหารเสมือนจริง (Virtual Food Lab)
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            ทดลองหยดสารเคมี สังเกตปฏิกิริยาเปลี่ยนสี และพิชิตจุดลวงข้อสอบ สสวท. ม.1
          </p>
        </div>

        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-xl"
        >
          <RefreshCw className="w-4 h-4 mr-1.5" />
          ล้างหลอดทดลอง (Reset)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-8 gap-8">
        {/* Left Column: Test Tube Visualizer & Heat Controls */}
        <div className="lg:col-span-6 flex flex-col items-center justify-between bg-slate-900 rounded-2xl p-6 relative overflow-hidden min-h-[420px]">
          {/* Lab Background Grid */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Reagent Dropping Animation Indicator */}
          {isDropping && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-20">
              <Droplets className="w-8 h-8 text-cyan-400" />
              <span className="text-xs text-cyan-300 font-bold mt-1">กำลังหยดสารทดสอบ...</span>
            </div>
          )}

          {/* Test Tube Stand & Vessel */}
          <div className="relative flex flex-col items-center my-auto z-10">
            {/* Tube Rim */}
            <div className="w-20 h-4 rounded-full border-2 border-slate-300 bg-white/40 shadow-sm" />
            
            {/* Glass Tube Body */}
            <div className="w-16 h-64 border-x-2 border-b-4 border-slate-300/80 rounded-b-full bg-slate-800/40 backdrop-blur-sm relative overflow-hidden flex flex-col justify-end p-1 shadow-2xl">
              {/* Internal Liquid Column */}
              <div 
                className={`w-full rounded-b-full transition-all duration-700 relative overflow-hidden ${
                  addedReagent ? 'h-36' : 'h-24'
                } ${reaction.liquidColor}`}
              >
                {/* Surface Reflection Line */}
                <div className="w-full h-1 bg-white/40 absolute top-1 left-0" />
                
                {/* Precipitate sediment at bottom if true */}
                {reaction.hasPrecipitate && (
                  <div className="absolute bottom-0 inset-x-0 h-6 bg-red-800/90 rounded-b-full flex items-center justify-center animate-pulse">
                    <span className="text-[9px] text-red-100 font-bold">ตะกอน Cu₂O</span>
                  </div>
                )}

                {/* Heat steam effect */}
                {isHeated && (
                  <div className="absolute inset-0 bg-white/10 animate-pulse flex justify-around">
                    <div className="w-0.5 h-full bg-white/30 animate-ping" />
                    <div className="w-0.5 h-full bg-white/30 animate-ping delay-100" />
                  </div>
                )}
              </div>
            </div>

            {/* Test Tube Label Tag */}
            <div className="mt-3 bg-slate-800/90 border border-slate-700 px-3 py-1 rounded-lg text-center max-w-[200px]">
              <div className="text-[10px] text-slate-400 font-medium">ตัวอย่างในหลอด:</div>
              <div className="text-xs font-bold text-white truncate">{selectedSample.name}</div>
            </div>
          </div>

          {/* Heating Controls (ตะเกียงแอลกอฮอล์) */}
          <div className="w-full pt-4 border-t border-slate-800 flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isHeated ? 'bg-orange-500 animate-ping' : 'bg-slate-700'}`} />
              <span className="text-xs text-slate-300 font-medium">
                {isHeated ? '🔥 ตะเกียงแอลกอฮอล์กำลังต้มเดือด' : '❄️ อุณหภูมิห้อง (ยังไม่ต้ม)'}
              </span>
            </div>

            {addedReagent === 'benedict' && (
              <Button
                onClick={() => setIsHeated(!isHeated)}
                size="sm"
                className={`font-bold transition-all rounded-xl shadow-lg ${
                  isHeated 
                    ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                    : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white animate-pulse'
                }`}
              >
                <Flame className="w-4 h-4 mr-1.5" />
                {isHeated ? 'ดับตะเกียงความร้อน' : 'จุดตะเกียงต้ม (Heat)'}
              </Button>
            )}
          </div>
        </div>

        {/* Right Column: Lab Shelf Controls & Scientific Explanation */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* 1. Step 1: Choose Sample Food */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
              <span>1️⃣ เลือกสารตัวอย่างที่ต้องการตรวจ:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                    selectedSample.id === sample.id
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{sample.name}</span>
                  <span className="text-[10px] text-slate-500 font-normal mt-0.5">{sample.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Step 2: Select Chemical Reagent */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
              <span>2️⃣ เลือกหยดสารเคมีทดสอบ:</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <Button
                onClick={() => handleAddReagent('iodine')}
                variant={addedReagent === 'iodine' ? 'default' : 'outline'}
                className={`h-auto py-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold ${
                  addedReagent === 'iodine' 
                    ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                    : 'border-amber-300 text-amber-900 hover:bg-amber-50'
                }`}
              >
                <Droplets className="w-5 h-5 text-amber-500" />
                <span>ไอโอดีน</span>
                <span className="text-[9px] opacity-80 font-normal">(ตรวจแป้ง)</span>
              </Button>

              <Button
                onClick={() => handleAddReagent('benedict')}
                variant={addedReagent === 'benedict' ? 'default' : 'outline'}
                className={`h-auto py-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold ${
                  addedReagent === 'benedict' 
                    ? 'bg-sky-600 hover:bg-sky-700 text-white' 
                    : 'border-sky-300 text-sky-900 hover:bg-sky-50'
                }`}
              >
                <Droplets className="w-5 h-5 text-sky-500" />
                <span>เบเนดิกต์</span>
                <span className="text-[9px] opacity-80 font-normal">(ตรวจน้ำตาล)</span>
              </Button>

              <Button
                onClick={() => handleAddReagent('biuret')}
                variant={addedReagent === 'biuret' ? 'default' : 'outline'}
                className={`h-auto py-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold ${
                  addedReagent === 'biuret' 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'border-purple-300 text-purple-900 hover:bg-purple-50'
                }`}
              >
                <Droplets className="w-5 h-5 text-purple-500" />
                <span>ไบยูเร็ต</span>
                <span className="text-[9px] opacity-80 font-normal">(ตรวจโปรตีน)</span>
              </Button>
            </div>
          </div>

          {/* 3. Real-time Diagnostic Analysis Card */}
          <div className="bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                ผลการวิเคราะห์ทางวิทยาศาสตร์:
              </span>
              <span className={`text-xs ${reaction.textColor}`}>
                {reaction.colorName || 'รอการทดสอบ'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {reaction.explanation}
            </p>

            {selectedSample.trapNote && (
              <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-2.5 text-[11px] text-amber-900 font-medium flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{selectedSample.trapNote}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
