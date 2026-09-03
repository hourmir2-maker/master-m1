'use client'

import React, { useState } from 'react'
import { Clock, Play, CheckCircle, Sparkles, BookOpen, ChevronRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

type TimePeriod = 'past' | 'present' | 'future'
type AspectType = 'simple' | 'continuous' | 'perfect'
type SubjectChoice = 'I' | 'She' | 'They'
type VerbChoice = 'eat' | 'play' | 'study'

interface TenseRule {
  name: string
  nameTh: string
  formula: string
  keyword: string
  verbForms: Record<VerbChoice, Record<SubjectChoice, { verb: string; fullSentence: string; translation: string }>>
}

const TENSES_DATA: Record<TimePeriod, Record<AspectType, TenseRule>> = {
  past: {
    simple: {
      name: 'Past Simple',
      nameTh: 'อดีตที่จบลงไปแล้วอย่างชัดเจน',
      formula: 'Subject + V.2',
      keyword: 'yesterday, last night, 2 days ago, in 2020',
      verbForms: {
        eat: {
          I: { verb: 'ate', fullSentence: 'I ate pizza yesterday.', translation: 'ฉันกินพิซซ่าเมื่อวานนี้' },
          She: { verb: 'ate', fullSentence: 'She ate pizza yesterday.', translation: 'เธอกินพิซซ่าเมื่อวานนี้' },
          They: { verb: 'ate', fullSentence: 'They ate pizza yesterday.', translation: 'พวกเขากินพิซซ่าเมื่อวานนี้' }
        },
        play: {
          I: { verb: 'played', fullSentence: 'I played football last week.', translation: 'ฉันเล่นฟุตบอลเมื่อสัปดาห์ที่แล้ว' },
          She: { verb: 'played', fullSentence: 'She played football last week.', translation: 'เธอเล่นฟุตบอลเมื่อสัปดาห์ที่แล้ว' },
          They: { verb: 'played', fullSentence: 'They played football last week.', translation: 'พวกเขากินฟุตบอลเมื่อสัปดาห์ที่แล้ว' }
        },
        study: {
          I: { verb: 'studied', fullSentence: 'I studied English last night.', translation: 'ฉันอ่านภาษาอังกฤษเมื่อคืนนี้' },
          She: { verb: 'studied', fullSentence: 'She studied English last night.', translation: 'เธออ่านภาษาอังกฤษเมื่อคืนนี้' },
          They: { verb: 'studied', fullSentence: 'They studied English last night.', translation: 'พวกเขาอ่านภาษาอังกฤษเมื่อคืนนี้' }
        }
      }
    },
    continuous: {
      name: 'Past Continuous',
      nameTh: 'กำลังกระทำอยู่ในช่วงเวลาใดเวลาหนึ่งในอดีต',
      formula: 'Subject + was/were + V.ing',
      keyword: 'at 8 PM yesterday, while, when',
      verbForms: {
        eat: {
          I: { verb: 'was eating', fullSentence: 'I was eating dinner at 8 PM yesterday.', translation: 'ฉันกำลังกินข้าวตอน 2 ทุ่มเมื่อวาน' },
          She: { verb: 'was eating', fullSentence: 'She was eating dinner at 8 PM yesterday.', translation: 'เธอกำลังกินข้าวตอน 2 ทุ่มเมื่อวาน' },
          They: { verb: 'were eating', fullSentence: 'They were eating dinner at 8 PM yesterday.', translation: 'พวกเขากำลังกินข้าวตอน 2 ทุ่มเมื่อวาน' }
        },
        play: {
          I: { verb: 'was playing', fullSentence: 'I was playing games when Mom arrived.', translation: 'ฉันกำลังเล่นเกมตอนแม่มาถึง' },
          She: { verb: 'was playing', fullSentence: 'She was playing games when Mom arrived.', translation: 'เธอกำลังเล่นเกมตอนแม่มาถึง' },
          They: { verb: 'were playing', fullSentence: 'They were playing games when Mom arrived.', translation: 'พวกเขากำลังเล่นเกมตอนแม่มาถึง' }
        },
        study: {
          I: { verb: 'was studying', fullSentence: 'I was studying while he was sleeping.', translation: 'ฉันกำลังอ่านหนังสือในขณะที่เขาหลับ' },
          She: { verb: 'was studying', fullSentence: 'She was studying while he was sleeping.', translation: 'เธอกำลังอ่านหนังสือในขณะที่เขาหลับ' },
          They: { verb: 'were studying', fullSentence: 'They were studying while he was sleeping.', translation: 'พวกเขากำลังอ่านหนังสือในขณะที่เขาหลับ' }
        }
      }
    },
    perfect: {
      name: 'Past Perfect',
      nameTh: 'เหตุการณ์ที่เกิดและจบก่อนอีกเหตุการณ์หนึ่งในอดีต',
      formula: 'Subject + had + V.3',
      keyword: 'before, after, by the time',
      verbForms: {
        eat: {
          I: { verb: 'had eaten', fullSentence: 'I had eaten before the bell rang.', translation: 'ฉันกินเสร็จเรียบร้อยก่อนกริ่งจะดัง' },
          She: { verb: 'had eaten', fullSentence: 'She had eaten before the bell rang.', translation: 'เธอกินเสร็จเรียบร้อยก่อนกริ่งจะดัง' },
          They: { verb: 'had eaten', fullSentence: 'They had eaten before the bell rang.', translation: 'พวกเขากินเสร็จเรียบร้อยก่อนกริ่งจะดัง' }
        },
        play: {
          I: { verb: 'had played', fullSentence: 'I had played tennis before it rained.', translation: 'ฉันเล่นเทนนิสเสร็จก่อนฝนตก' },
          She: { verb: 'had played', fullSentence: 'She had played tennis before it rained.', translation: 'เธอเล่นเทนนิสเสร็จก่อนฝนตก' },
          They: { verb: 'had played', fullSentence: 'They had played tennis before it rained.', translation: 'พวกเขาเล่นเทนนิสเสร็จก่อนฝนตก' }
        },
        study: {
          I: { verb: 'had studied', fullSentence: 'I had studied hard before the exam started.', translation: 'ฉันอ่านหนังสือมาหนักมากก่อนสอบเริ่ม' },
          She: { verb: 'had studied', fullSentence: 'She had studied hard before the exam started.', translation: 'เธออ่านหนังสือมาหนักมากก่อนสอบเริ่ม' },
          They: { verb: 'had studied', fullSentence: 'They had studied hard before the exam started.', translation: 'พวกเขาอ่านหนังสือมาหนักมากก่อนสอบเริ่ม' }
        }
      }
    }
  },
  present: {
    simple: {
      name: 'Present Simple',
      nameTh: 'ความจริงทั่วไป กิจวัตร หรือนิสัยประจำ',
      formula: 'Subject + V.1 (ประธานเอกพจน์กริยาเติม s/es)',
      keyword: 'always, usually, every day, often, normally',
      verbForms: {
        eat: {
          I: { verb: 'eat', fullSentence: 'I eat breakfast every morning.', translation: 'ฉันกินอาหารเช้าทุกเช้า' },
          She: { verb: 'eats', fullSentence: 'She eats breakfast every morning.', translation: 'เธอกินอาหารเช้าทุกเช้า (ประธานเดี่ยว เติม s)' },
          They: { verb: 'eat', fullSentence: 'They eat breakfast every morning.', translation: 'พวกเขากินอาหารเช้าทุกเช้า' }
        },
        play: {
          I: { verb: 'play', fullSentence: 'I play guitar every Sunday.', translation: 'ฉันเล่นกีตาร์ทุกวันอาทิตย์' },
          She: { verb: 'plays', fullSentence: 'She plays guitar every Sunday.', translation: 'เธอเล่นกีตาร์ทุกวันอาทิตย์ (ประธานเดี่ยว เติม s)' },
          They: { verb: 'play', fullSentence: 'They play guitar every Sunday.', translation: 'พวกเขาเล่นกีตาร์ทุกวันอาทิตย์' }
        },
        study: {
          I: { verb: 'study', fullSentence: 'I study science every day.', translation: 'ฉันเรียนวิทยาศาสตร์ทุกวัน' },
          She: { verb: 'studies', fullSentence: 'She studies science every day.', translation: 'เธอเรียนวิทยาศาสตร์ทุกวัน (เปลี่ยน y เป็น ies)' },
          They: { verb: 'study', fullSentence: 'They study science every day.', translation: 'พวกเขาเรียนวิทยาศาสตร์ทุกวัน' }
        }
      }
    },
    continuous: {
      name: 'Present Continuous',
      nameTh: 'กำลังกระทำอยู่ ณ ตอนนี้ในขณะที่พูด',
      formula: 'Subject + is/am/are + V.ing',
      keyword: 'now, right now, at the moment, Look!, Listen!',
      verbForms: {
        eat: {
          I: { verb: 'am eating', fullSentence: 'I am eating lunch right now.', translation: 'ฉันกำลังกินข้าวเที่ยงอยู่ตอนนี้' },
          She: { verb: 'is eating', fullSentence: 'She is eating lunch right now.', translation: 'เธอกำลังกินข้าวเที่ยงอยู่ตอนนี้' },
          They: { verb: 'are eating', fullSentence: 'They are eating lunch right now.', translation: 'พวกเขากำลังกินข้าวเที่ยงอยู่ตอนนี้' }
        },
        play: {
          I: { verb: 'am playing', fullSentence: 'I am playing online games now.', translation: 'ฉันกำลังเล่นเกมออนไลน์อยู่ตอนนี้' },
          She: { verb: 'is playing', fullSentence: 'She is playing online games now.', translation: 'เธอกำลังเล่นเกมออนไลน์อยู่ตอนนี้' },
          They: { verb: 'are playing', fullSentence: 'They are playing online games now.', translation: 'พวกเขากำลังเล่นเกมออนไลน์อยู่ตอนนี้' }
        },
        study: {
          I: { verb: 'am studying', fullSentence: 'I am studying for the M.1 exam now.', translation: 'ฉันกำลังอ่านเตรียมสอบ ม.1 ตอนนี้' },
          She: { verb: 'is studying', fullSentence: 'She is studying for the M.1 exam now.', translation: 'เธอกำลังอ่านเตรียมสอบ ม.1 ตอนนี้' },
          They: { verb: 'are studying', fullSentence: 'They are studying for the M.1 exam now.', translation: 'พวกเขากำลังอ่านเตรียมสอบ ม.1 ตอนนี้' }
        }
      }
    },
    perfect: {
      name: 'Present Perfect',
      nameTh: 'ทำตั้งแต่อดีตจนถึงปัจจุบัน หรือเพิ่งทำเสร็จ',
      formula: 'Subject + has/have + V.3',
      keyword: 'since, for, already, yet, just, ever',
      verbForms: {
        eat: {
          I: { verb: 'have eaten', fullSentence: 'I have already eaten dinner.', translation: 'ฉันกินมื้อเย็นเรียบร้อยแล้ว' },
          She: { verb: 'has eaten', fullSentence: 'She has already eaten dinner.', translation: 'เธอกินมื้อเย็นเรียบร้อยแล้ว' },
          They: { verb: 'have eaten', fullSentence: 'They have already eaten dinner.', translation: 'พวกเขากินมื้อเย็นเรียบร้อยแล้ว' }
        },
        play: {
          I: { verb: 'have played', fullSentence: 'I have played the piano for 3 years.', translation: 'ฉันเล่นเปียโนมานาน 3 ปีแล้ว (และยังเล่นอยู่)' },
          She: { verb: 'has played', fullSentence: 'She has played the piano for 3 years.', translation: 'เธอเล่นเปียโนมานาน 3 ปีแล้ว' },
          They: { verb: 'have played', fullSentence: 'They have played the piano for 3 years.', translation: 'พวกเขาเล่นเปียโนมานาน 3 ปีแล้ว' }
        },
        study: {
          I: { verb: 'have studied', fullSentence: 'I have studied in this school since 2022.', translation: 'ฉันเรียนที่โรงเรียนนี้มาตั้งแต่ปี 2022' },
          She: { verb: 'has studied', fullSentence: 'She has studied in this school since 2022.', translation: 'เธอเรียนที่โรงเรียนนี้มาตั้งแต่ปี 2022' },
          They: { verb: 'have studied', fullSentence: 'They have studied in this school since 2022.', translation: 'พวกเขาเรียนที่โรงเรียนนี้มาตั้งแต่ปี 2022' }
        }
      }
    }
  },
  future: {
    simple: {
      name: 'Future Simple',
      nameTh: 'สิ่งที่จะเกิดขึ้นในอนาคต ตัดสินใจทันที',
      formula: 'Subject + will + V.inf',
      keyword: 'tomorrow, next week, soon, in the future',
      verbForms: {
        eat: {
          I: { verb: 'will eat', fullSentence: 'I will eat ramen tomorrow.', translation: 'ฉันจะกินราเมงในวันพรุ่งนี้' },
          She: { verb: 'will eat', fullSentence: 'She will eat ramen tomorrow.', translation: 'เธอจะกินราเมงในวันพรุ่งนี้' },
          They: { verb: 'will eat', fullSentence: 'They will eat ramen tomorrow.', translation: 'พวกเขาจะกินราเมงในวันพรุ่งนี้' }
        },
        play: {
          I: { verb: 'will play', fullSentence: 'I will play badminton next Saturday.', translation: 'ฉันจะเล่นแบดมินตันเสาร์หน้า' },
          She: { verb: 'will play', fullSentence: 'She will play badminton next Saturday.', translation: 'เธอจะเล่นแบดมินตันเสาร์หน้า' },
          They: { verb: 'will play', fullSentence: 'They will play badminton next Saturday.', translation: 'พวกเขาจะเล่นแบดมินตันเสาร์หน้า' }
        },
        study: {
          I: { verb: 'will study', fullSentence: 'I will study hard to enter M.1 Gifted.', translation: 'ฉันจะตั้งใจเรียนเพื่อสอบเข้า ม.1 Gifted' },
          She: { verb: 'will study', fullSentence: 'She will study hard to enter M.1 Gifted.', translation: 'เธอจะตั้งใจเรียนเพื่อสอบเข้า ม.1 Gifted' },
          They: { verb: 'will study', fullSentence: 'They will study hard to enter M.1 Gifted.', translation: 'พวกเขาจะตั้งใจเรียนเพื่อสอบเข้า ม.1 Gifted' }
        }
      }
    },
    continuous: {
      name: 'Future Continuous',
      nameTh: 'จะกำลังกระทำอยู่ ณ เวลาที่แน่นอนในอนาคต',
      formula: 'Subject + will be + V.ing',
      keyword: 'at 10 AM tomorrow, this time next week',
      verbForms: {
        eat: {
          I: { verb: 'will be eating', fullSentence: 'I will be eating lunch at noon tomorrow.', translation: 'เที่ยงพรุ่งนี้ฉันจะกำลังนั่งกินข้าวอยู่' },
          She: { verb: 'will be eating', fullSentence: 'She will be eating lunch at noon tomorrow.', translation: 'เที่ยงพรุ่งนี้เธอจะกำลังนั่งกินข้าวอยู่' },
          They: { verb: 'will be eating', fullSentence: 'They will be eating lunch at noon tomorrow.', translation: 'เที่ยงพรุ่งนี้พวกเขาจะกำลังนั่งกินข้าวอยู่' }
        },
        play: {
          I: { verb: 'will be playing', fullSentence: 'I will be playing games at 9 PM tonight.', translation: 'สามทุ่มคืนนี้ฉันจะกำลังเล่นเกมอยู่' },
          She: { verb: 'will be playing', fullSentence: 'She will be playing games at 9 PM tonight.', translation: 'สามทุ่มคืนนี้เธอจะกำลังเล่นเกมอยู่' },
          They: { verb: 'will be playing', fullSentence: 'They will be playing games at 9 PM tonight.', translation: 'สามทุ่มคืนนี้พวกเขาจะกำลังเล่นเกมอยู่' }
        },
        study: {
          I: { verb: 'will be studying', fullSentence: 'I will be studying all day tomorrow.', translation: 'พรุ่งนี้ฉันจะนั่งอ่านหนังสือทั้งวัน' },
          She: { verb: 'will be studying', fullSentence: 'She will be studying all day tomorrow.', translation: 'พรุ่งนี้เธอจะนั่งอ่านหนังสือทั้งวัน' },
          They: { verb: 'will be studying', fullSentence: 'They will be studying all day tomorrow.', translation: 'พรุ่งนี้พวกเขาจะนั่งอ่านหนังสือทั้งวัน' }
        }
      }
    },
    perfect: {
      name: 'Future Perfect',
      nameTh: 'จะกระทำเสร็จสิ้นสมบูรณ์ก่อนถึงเวลาหนึ่งในอนาคต',
      formula: 'Subject + will have + V.3',
      keyword: 'by tomorrow, by next year, by 5 PM',
      verbForms: {
        eat: {
          I: { verb: 'will have eaten', fullSentence: 'I will have eaten by 8 PM.', translation: 'ฉันจะกินเสร็จเรียบร้อยก่อน 2 ทุ่ม' },
          She: { verb: 'will have eaten', fullSentence: 'She will have eaten by 8 PM.', translation: 'เธอจะกินเสร็จเรียบร้อยก่อน 2 ทุ่ม' },
          They: { verb: 'will have eaten', fullSentence: 'They will have eaten by 8 PM.', translation: 'พวกเขาจะกินเสร็จเรียบร้อยก่อน 2 ทุ่ม' }
        },
        play: {
          I: { verb: 'will have played', fullSentence: 'I will have played for 2 hours by then.', translation: 'เมื่อถึงตอนนั้นฉันจะเล่นครบ 2 ชั่วโมงแล้ว' },
          She: { verb: 'will have played', fullSentence: 'She will have played for 2 hours by then.', translation: 'เมื่อถึงตอนนั้นเธอจะเล่นครบ 2 ชั่วโมงแล้ว' },
          They: { verb: 'will have played', fullSentence: 'They will have played for 2 hours by then.', translation: 'เมื่อถึงตอนนั้นพวกเขาจะเล่นครบ 2 ชั่วโมงแล้ว' }
        },
        study: {
          I: { verb: 'will have studied', fullSentence: 'I will have studied all 57 modules by next week.', translation: 'ฉันจะอ่านครบ 57 โมดูลก่อนสัปดาห์หน้า' },
          She: { verb: 'will have studied', fullSentence: 'She will have studied all 57 modules by next week.', translation: 'เธอจะอ่านครบ 57 โมดูลก่อนสัปดาห์หน้า' },
          They: { verb: 'will have studied', fullSentence: 'They will have studied all 57 modules by next week.', translation: 'พวกเขาจะอ่านครบ 57 โมดูลก่อนสัปดาห์หน้า' }
        }
      }
    }
  }
}

export default function EnglishTensesLab() {
  const [period, setPeriod] = useState<TimePeriod>('present')
  const [aspect, setAspect] = useState<AspectType>('simple')
  const [subject, setSubject] = useState<SubjectChoice>('She')
  const [verb, setVerb] = useState<VerbChoice>('eat')

  const currentTense = TENSES_DATA[period][aspect]
  const currentSentence = currentTense.verbForms[verb][subject]

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              ⏰ แล็บไทม์แมชชีนกาลเวลา (English Tenses Time-Machine)
              <span className="text-xs bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/30">
                สสวท. & Gifted ม.1
              </span>
            </h3>
            <p className="text-sm text-slate-400">
              ทดลองหมุนเข็มเวลา สังเกตการแปลงร่างของกริยาตาม 12 Tenses สทศ.
            </p>
          </div>
        </div>

        {/* Action Controls: Subject & Verb */}
        <div className="flex items-center gap-3">
          {/* Subject selector */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 px-2">ประธาน:</span>
            {(['I', 'She', 'They'] as SubjectChoice[]).map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  subject === s ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Verb selector */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 px-2">กริยา:</span>
            {(['eat', 'play', 'study'] as VerbChoice[]).map((v) => (
              <button
                key={v}
                onClick={() => setVerb(v)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  verb === v ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Time Slider and Interactive Visualizer */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Timeline Bar (Past -> Present -> Future) */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5">
            <span className="text-xs text-slate-400 font-semibold block mb-3">1. เลือกช่วงเวลา (Time Period):</span>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPeriod('past')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  period === 'past'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold shadow-lg shadow-rose-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="text-base font-bold">⏪ อดีต (Past)</div>
                <div className="text-[11px] opacity-75 mt-0.5">เกิดขึ้นและจบไปแล้ว</div>
              </button>

              <button
                onClick={() => setPeriod('present')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  period === 'present'
                    ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold shadow-lg shadow-sky-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="text-base font-bold">⏸️ ปัจจุบัน (Present)</div>
                <div className="text-[11px] opacity-75 mt-0.5">ความจริง / กำลังทำอยู่</div>
              </button>

              <button
                onClick={() => setPeriod('future')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  period === 'future'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="text-base font-bold">⏩ อนาคต (Future)</div>
                <div className="text-[11px] opacity-75 mt-0.5">ยังไม่เกิดขึ้น วางแผนไว้</div>
              </button>
            </div>
          </div>

          {/* Aspect Bar (Simple, Continuous, Perfect) */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5">
            <span className="text-xs text-slate-400 font-semibold block mb-3">2. เลือกลักษณะเหตุการณ์ (Aspect):</span>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setAspect('simple')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  aspect === 'simple'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="text-sm font-bold">Simple</div>
                <div className="text-[11px] opacity-75">ธรรมดา / กิจวัตร</div>
              </button>

              <button
                onClick={() => setAspect('continuous')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  aspect === 'continuous'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="text-sm font-bold">Continuous</div>
                <div className="text-[11px] opacity-75">กำลังกระทำ (-ing)</div>
              </button>

              <button
                onClick={() => setAspect('perfect')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  aspect === 'perfect'
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="text-sm font-bold">Perfect</div>
                <div className="text-[11px] opacity-75">เสร็จสิ้นสมบูรณ์ (V.3)</div>
              </button>
            </div>
          </div>

          {/* Dynamic Sentence Screen */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[160px]">
            <div className="absolute top-3 left-4 text-xs font-mono text-slate-500 uppercase">
              {currentTense.name}
            </div>

            {/* Glowing Big Sentence */}
            <div className="text-2xl lg:text-3xl font-bold font-mono tracking-wide text-white mb-2">
              <span className="text-sky-400">{subject}</span>{' '}
              <span className="text-amber-400 underline decoration-amber-500/60 decoration-4 underline-offset-8">
                {currentSentence.verb}
              </span>{' '}
              <span className="text-slate-200">
                {currentSentence.fullSentence.replace(`${subject} ${currentSentence.verb} `, '')}
              </span>
            </div>

            {/* Thai Translation */}
            <p className="text-sm text-slate-400 mt-2 font-sans">
              🇹🇭 &ldquo;{currentSentence.translation}&rdquo;
            </p>
          </div>
        </div>

        {/* Right: Rules & Cheat Sheet */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> โครงสร้างและจุดสังเกต
            </h4>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">สูตรโครงสร้างหลัก:</span>
              <div className="text-base font-mono font-bold text-amber-300 mt-0.5">
                {currentTense.formula}
              </div>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">คำบอกเวลาที่ออกสอบบ่อย (Time Markers):</span>
              <div className="text-xs font-mono text-emerald-300 mt-1 leading-relaxed">
                {currentTense.keyword}
              </div>
            </div>

            <div className="bg-sky-500/10 border border-sky-500/20 p-3 rounded-lg text-xs text-sky-200 leading-relaxed">
              💡 <span className="font-semibold text-sky-300">ความหมายหลัก:</span> {currentTense.nameTh}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
