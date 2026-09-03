'use client'

import React, { useState } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Sparkles, HelpCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AgreementRule {
  id: string
  ruleTitle: string
  ruleSummary: string
  subjectHighlight: string
  interveningHighlight?: string
  verbCorrect: string
  verbWrong: string
  sentencePrefix: string
  sentenceSuffix: string
  explanation: string
  trapCategory: string
}

const RULES: AgreementRule[] = [
  {
    id: '1',
    ruleTitle: 'กลุ่มส่วนขยายกวนใจ (Prepositional Phrases)',
    ruleSummary: 'อย่ามองคำที่อยู่ใกล้กริยา ให้ตัดส่วนขยาย (of..., in..., with...) ทิ้ง แล้วมองหาประธานแท้ตัวแรก!',
    subjectHighlight: 'The box',
    interveningHighlight: 'of chocolates',
    verbCorrect: 'is',
    verbWrong: 'are',
    sentencePrefix: '',
    sentenceSuffix: 'on the teacher\'s table.',
    explanation: 'ประธานแท้คือ "The box" (กล่อง 1 ใบ เป็นเอกพจน์) ส่วน "of chocolates" เป็นแค่วลีขยาย จึงต้องใช้กริยาเอกพจน์ "is" ไม่ใช่ "are"!',
    trapCategory: 'กับดักส่วนขยาย of'
  },
  {
    id: '2',
    ruleTitle: 'Neither...nor / Either...or (ผันตามตัวใกล้)',
    ruleSummary: 'เมื่อมี Neither...nor หรือ Either...or กริยาจะผันตาม "ประธานตัวที่อยู่ใกล้กริยาที่สุด" เท่านั้น!',
    subjectHighlight: 'the students',
    interveningHighlight: 'Neither the teacher nor',
    verbCorrect: 'were',
    verbWrong: 'was',
    sentencePrefix: 'Neither the teacher nor ',
    sentenceSuffix: 'in the laboratory.',
    explanation: 'กริยาอยู่ใกล้ "the students" (พหูพจน์) ดังนั้นจึงต้องผันตามประธานตัวหลัง กลายเป็น "were"!',
    trapCategory: 'คู่เชื่อม Neither...nor'
  },
  {
    id: '3',
    ruleTitle: 'Along with / As well as / Together with (ผันตามตัวหน้า)',
    ruleSummary: 'ต่างจาก Either/Neither! คำพวก as well as, along with, together with กริยาจะผันตาม "ประธานตัวหน้าสุด" เท่านั้น!',
    subjectHighlight: 'The teacher',
    interveningHighlight: 'along with her students',
    verbCorrect: 'is',
    verbWrong: 'are',
    sentencePrefix: '',
    sentenceSuffix: 'participating in the contest.',
    explanation: 'ประธานตัวจริงคือ "The teacher" (เอกพจน์ตัวหน้า) ส่วน along with her students เป็นแค่ส่วนเสริม จึงต้องใช้ "is"!',
    trapCategory: 'คำพ่วง Along with'
  },
  {
    id: '4',
    ruleTitle: 'Every / Each / Everyone (เอกพจน์ตลอดกาล)',
    ruleSummary: 'คำว่า Each, Every, Everyone, Someone, Nobody ถือเป็น "เอกพจน์ 100%" เสมอ กริยาต้องเติม s/es!',
    subjectHighlight: 'Everyone',
    verbCorrect: 'wants',
    verbWrong: 'want',
    sentencePrefix: '',
    sentenceSuffix: 'to get 100% in O-NET.',
    explanation: 'ถึงความหมายภาษาไทยจะแปลว่า "ทุกคน" แต่ในไวยากรณ์ภาษาอังกฤษถือว่านับทีละคน (เอกพจน์) กริยาจึงต้องเติม s เสมอ: "wants"!',
    trapCategory: 'สรรพนามไม่เจาะจง'
  },
  {
    id: '5',
    ruleTitle: 'The number of vs. A number of (จุดตัดคะแนน)',
    ruleSummary: 'The number of = "จำนวนของ..." (เอกพจน์) | A number of = "มีหลายคน..." (พหูพจน์)',
    subjectHighlight: 'The number of students',
    verbCorrect: 'is',
    verbWrong: 'are',
    sentencePrefix: '',
    sentenceSuffix: 'increasing every semester.',
    explanation: '"The number" แปลว่า "ตัวเลขจำนวน..." จัดเป็นเอกพจน์ 1 สิ่ง กริยาจึงต้องใช้ "is" (ถ้าเป็น A number of ถึงจะใช้ are)!',
    trapCategory: 'สทศ. ออกสอบ 100%'
  }
]

export default function EnglishSubjectVerbAgreementLab() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const [userChoice, setUserChoice] = useState<string | null>(null)
  const [score, setScore] = useState<number>(0)

  const current = RULES[selectedIdx]

  const handleSelectAnswer = (choice: string) => {
    setUserChoice(choice)
    if (choice === current.verbCorrect) {
      setScore(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    setSelectedIdx((prev) => (prev + 1) % RULES.length)
    setUserChoice(null)
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              🎯 แล็บประลองดักจับ Subject-Verb Agreement (กับดักประธาน-กริยา)
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-mono">
                หัวใจข้อสอบ O-NET
              </span>
            </h3>
            <p className="text-sm text-slate-400">
              วิเคราะห์ประธานแท้ ตัดส่วนขยายกวนใจ และเลือกกริยาให้ตรงจุดลวง สทศ.
            </p>
          </div>
        </div>

        {/* Rule Navigator */}
        <div className="flex flex-wrap gap-2">
          {RULES.map((r, i) => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedIdx(i)
                setUserChoice(null)
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedIdx === i
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              ด่านที่ {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Challenge Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Challenge Stage */}
        <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800 rounded-xl p-6 relative flex flex-col items-center justify-center min-h-[320px]">
          <div className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 mb-6">
            หมวด: {current.trapCategory}
          </div>

          {/* Sentence with Blank Box */}
          <div className="w-full max-w-xl p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center shadow-2xl">
            <div className="text-lg sm:text-2xl font-bold font-mono text-white leading-relaxed">
              {current.sentencePrefix}
              <span className="text-amber-300 underline decoration-amber-500 decoration-2 underline-offset-4">
                {current.subjectHighlight}
              </span>{' '}
              {current.interveningHighlight && current.id === '1' && (
                <span className="text-slate-500 text-base sm:text-lg italic line-through decoration-rose-500 decoration-2">
                  ({current.interveningHighlight})
                </span>
              )}{' '}
              {current.interveningHighlight && current.id === '3' && (
                <span className="text-slate-500 text-base sm:text-lg italic">
                  [{current.interveningHighlight}]
                </span>
              )}{' '}
              <span className="inline-block px-4 py-1 rounded-lg border-2 border-dashed border-sky-400 text-sky-300 font-black mx-1 bg-sky-500/10">
                {userChoice || '???'}
              </span>{' '}
              <span className="text-slate-200">
                {current.sentenceSuffix}
              </span>
            </div>
          </div>

          {/* Interactive Answer Options */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <span className="text-xs text-slate-400 font-medium">เลือกกริยาที่ถูกต้อง:</span>
            {[current.verbCorrect, current.verbWrong].sort().map((opt) => {
              const isSelected = userChoice === opt
              const isCorrect = opt === current.verbCorrect

              return (
                <Button
                  key={opt}
                  onClick={() => handleSelectAnswer(opt)}
                  disabled={userChoice !== null}
                  className={`text-base font-bold font-mono px-6 py-2 rounded-xl border transition-all ${
                    userChoice === null
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                      : isCorrect
                      ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/40'
                      : isSelected
                      ? 'bg-rose-600 border-rose-400 text-white'
                      : 'bg-slate-800 text-slate-500 border-slate-800 opacity-50'
                  }`}
                >
                  {opt}
                </Button>
              )
            })}
          </div>

          {/* Feedback & Explanation Box */}
          {userChoice !== null && (
            <div className={`w-full max-w-xl mt-6 p-4 rounded-xl border text-left animate-in fade-in duration-300 flex items-start gap-3 ${
              userChoice === current.verbCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
            }`}>
              {userChoice === current.verbCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="font-bold text-sm">
                  {userChoice === current.verbCorrect ? 'ถูกต้องยอดเยี่ยม! 🎉' : 'ยังไม่ถูกต้องครับ! ลองดูเหตุผลด้านล่าง 👇'}
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {current.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Next Button */}
          {userChoice !== null && (
            <div className="mt-4">
              <Button
                onClick={nextQuestion}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-1.5 rounded-xl text-xs shadow-md"
              >
                ลุยต่อด่านถัดไป ➔
              </Button>
            </div>
          )}
        </div>

        {/* Right: Cheat Sheet & Traps */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> สรุปสูตรลับกฎข้อนี้
            </h4>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
              <span className="font-bold text-xs text-white block mb-1">
                {current.ruleTitle}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {current.ruleSummary}
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs text-amber-200 leading-relaxed">
              💡 <span className="font-bold text-amber-300">เทคนิค 3 วินาที:</span> สแกนหาคำเชื่อมก่อน ถ้าเจอ Neither/Either ให้มองไปข้างหลัง แต่ถ้าเจอ along with ให้มองย้อนมาข้างหน้า!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
