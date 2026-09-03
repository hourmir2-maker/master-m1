'use client'

import React, { useState } from 'react'
import { ArrowLeftRight, Sparkles, AlertTriangle, RefreshCw, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PassiveVoiceCase {
  id: string
  tenseName: string
  activeSubject: string
  activeVerb: string
  activeObject: string
  activeSentence: string
  activeTrans: string
  passiveSubject: string
  passiveBe: string
  passiveV3: string
  passiveBy: string
  passiveSentence: string
  passiveTrans: string
  formula: string
}

const CASES: PassiveVoiceCase[] = [
  {
    id: '1',
    tenseName: 'Present Simple',
    activeSubject: 'The cat',
    activeVerb: 'eats',
    activeObject: 'the fish',
    activeSentence: 'The cat eats the fish.',
    activeTrans: 'แมวกินปลา (ประธานเป็นผู้กระทำ)',
    passiveSubject: 'The fish',
    passiveBe: 'is',
    passiveV3: 'eaten',
    passiveBy: 'by the cat.',
    passiveSentence: 'The fish is eaten by the cat.',
    passiveTrans: 'ปลาถูกกินโดยแมว (ประธานเป็นผู้ถูกกระทำ)',
    formula: 'Subject + is/am/are + V.3'
  },
  {
    id: '2',
    tenseName: 'Past Simple',
    activeSubject: 'J.K. Rowling',
    activeVerb: 'wrote',
    activeObject: 'Harry Potter',
    activeSentence: 'J.K. Rowling wrote Harry Potter.',
    activeTrans: 'เจ.เค. โรว์ลิง เขียนแฮร์รี่ พอตเตอร์',
    passiveSubject: 'Harry Potter',
    passiveBe: 'was',
    passiveV3: 'written',
    passiveBy: 'by J.K. Rowling.',
    passiveSentence: 'Harry Potter was written by J.K. Rowling.',
    passiveTrans: 'แฮร์รี่ พอตเตอร์ ถูกเขียนโดย เจ.เค. โรว์ลิง',
    formula: 'Subject + was/were + V.3'
  },
  {
    id: '3',
    tenseName: 'Future Simple',
    activeSubject: 'The mechanic',
    activeVerb: 'will fix',
    activeObject: 'the car',
    activeSentence: 'The mechanic will fix the car.',
    activeTrans: 'ช่างจะซ่อมรถยนต์',
    passiveSubject: 'The car',
    passiveBe: 'will be',
    passiveV3: 'fixed',
    passiveBy: 'by the mechanic.',
    passiveSentence: 'The car will be fixed by the mechanic.',
    passiveTrans: 'รถยนต์จะถูกซ่อมโดยช่าง',
    formula: 'Subject + will be + V.3'
  },
  {
    id: '4',
    tenseName: 'Present Continuous',
    activeSubject: 'The chef',
    activeVerb: 'is cooking',
    activeObject: 'dinner',
    activeSentence: 'The chef is cooking dinner.',
    activeTrans: 'เชฟกำลังปรุงอาหารเย็น',
    passiveSubject: 'Dinner',
    passiveBe: 'is being',
    passiveV3: 'cooked',
    passiveBy: 'by the chef.',
    passiveSentence: 'Dinner is being cooked by the chef.',
    passiveTrans: 'อาหารเย็นกำลังถูกปรุงโดยเชฟ (มี being เสมอ!)',
    formula: 'Subject + is/am/are + being + V.3'
  },
  {
    id: '5',
    tenseName: 'Present Perfect',
    activeSubject: 'Lisa',
    activeVerb: 'has cleaned',
    activeObject: 'the room',
    activeSentence: 'Lisa has cleaned the room.',
    activeTrans: 'ลิซ่าทำความสะอาดห้องเรียบร้อยแล้ว',
    passiveSubject: 'The room',
    passiveBe: 'has been',
    passiveV3: 'cleaned',
    passiveBy: 'by Lisa.',
    passiveSentence: 'The room has been cleaned by Lisa.',
    passiveTrans: 'ห้องถูกทำความสะอาดเรียบร้อยแล้วโดยลิซ่า',
    formula: 'Subject + has/have + been + V.3'
  }
]

export default function EnglishPassiveVoiceLab() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const [isPassive, setIsPassive] = useState<boolean>(false)

  const current = CASES[selectedIdx]

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <ArrowLeftRight className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              🔄 แล็บหม้อแปลง Active vs. Passive Voice (Voice Transformer)
              <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-mono">
                สสวท. & Gifted ม.1
              </span>
            </h3>
            <p className="text-sm text-slate-400">
              สลับกรรมขึ้นเป็นประธาน แปลงกริยาเป็น Verb to be + V.3 จับจุดข้อสอบ สทศ.
            </p>
          </div>
        </div>

        {/* Tense Selectors */}
        <div className="flex flex-wrap gap-2">
          {CASES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedIdx(i)
                setIsPassive(false)
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedIdx === i
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {c.tenseName}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Transformer Arena */}
        <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800 rounded-xl p-6 relative flex flex-col items-center justify-center min-h-[340px]">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 mb-6">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
              !isPassive 
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}>
              1. Active Voice (ประธานทำเอง)
            </span>
            <span className="text-slate-500">➔</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
              isPassive 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}>
              2. Passive Voice (ประธานถูกกระทำ)
            </span>
          </div>

          {/* Dynamic Visualizer */}
          <div className="w-full max-w-xl p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center shadow-xl">
            {!isPassive ? (
              /* Active View */
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/30">
                    {current.activeSubject}
                  </span>{' '}
                  <span className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/30">
                    {current.activeVerb}
                  </span>{' '}
                  <span className="text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg border border-purple-500/30">
                    {current.activeObject}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  🇹🇭 {current.activeTrans}
                </p>
              </div>
            ) : (
              /* Passive View */
              <div className="space-y-4 animate-in zoom-in-95 duration-300">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                  <span className="text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg border border-purple-500/30">
                    {current.passiveSubject}
                  </span>{' '}
                  <span className="text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/30">
                    {current.passiveBe} {current.passiveV3}
                  </span>{' '}
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/30">
                    {current.passiveBy}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  🇹🇭 {current.passiveTrans}
                </p>
              </div>
            )}
          </div>

          {/* Action Button: Transform! */}
          <div className="mt-6 flex items-center gap-3">
            <Button
              onClick={() => setIsPassive(!isPassive)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg shadow-indigo-600/30"
            >
              <ArrowLeftRight className="w-4 h-4 mr-2" /> 
              {isPassive ? 'สลับกลับเป็น Active Voice' : 'กดแปลงร่างเป็น Passive Voice!'}
            </Button>
          </div>
        </div>

        {/* Right: Structural Formula & Trap Guide */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> กฎเหล็ก Passive Voice 3 สเต็ป
            </h4>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px]">1</span>
                <span>เอากรรม (Object) มาเป็นประธานใหม่</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px]">2</span>
                <span>เติม <strong>Verb to be</strong> ตาม Tense เดิม</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px]">3</span>
                <span>เปลี่ยนกริยาแท้เป็น <strong>กริยาช่อง 3 (V.3)</strong> เสมอ!</span>
              </div>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">สูตรของ Tense นี้:</span>
              <div className="text-sm font-mono font-bold text-amber-300 mt-0.5">
                {current.formula}
              </div>
            </div>

            {/* Trap Warning */}
            <div className="bg-rose-500/10 border border-rose-500/30 p-3.5 rounded-lg text-xs text-rose-200 flex items-start gap-2 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-300">จุดลวง สทศ.:</span>
                <p className="mt-0.5">กริยาที่ไม่ต้องการกรรม (Intransitive Verbs) เช่น die, happen, arrive, sleep <strong>ห้ามทำเป็น Passive Voice เด็ดขาด!</strong> (ผิด: The accident was happened ❌)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
