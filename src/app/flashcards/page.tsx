'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Footer from '@/components/Footer'
import { CORE_FLASHCARDS, getMistakeFlashcards, Flashcard } from '@/lib/flashcards-data'
import { awardBadge } from '@/lib/gamification'
import MicroCelebrationModal from '@/components/MicroCelebrationModal'
import MemorySongPlayer from '@/components/MemorySongPlayer'
import { 
  ArrowLeft, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Award,
  Layers,
  Flame,
  Brain
} from 'lucide-react'

// Phonetics Preprocessor (Rule 12 Standard)
function preprocessForSpeech(text: string): string {
  let res = text
  res = res.replace(/V\.1/gi, 'กริยาช่องหนึ่ง')
  res = res.replace(/V\.2/gi, 'กริยาช่องสอง')
  res = res.replace(/V\.3/gi, 'กริยาช่องสาม')
  res = res.replace(/V\.inf/gi, 'กริยาช่องเดิมไม่ผัน')
  res = res.replace(/S\s*\+/gi, 'ประธาน บวก ')
  res = res.replace(/If-Clause/gi, 'อิฟ คลอส')
  res = res.replace(/ห\.ร\.ม\./gi, 'หอรอมอ')
  res = res.replace(/ค\.ร\.น\./gi, 'คอรอนอ')
  res = res.replace(/√/g, 'สแควรูท ')
  res = res.replace(/π/g, 'พาย ')
  res = res.replace(/a²/g, 'เอ กำลังสอง')
  res = res.replace(/O₂/g, 'ออกซิเจน')
  return res
}

export default function FlashcardsPage() {
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'math' | 'science' | 'english' | 'mistakes'>('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [masteredIds, setMasteredIds] = useState<string[]>([])
  const [mistakeCards, setMistakeCards] = useState<Flashcard[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [unlockedToast, setUnlockedToast] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    // Load mastered cards from localStorage
    try {
      const stored = localStorage.getItem('master_m1_mastered_flashcards')
      if (stored) setMasteredIds(JSON.parse(stored))
    } catch (e) {
      console.warn(e)
    }
    setMistakeCards(getMistakeFlashcards())
  }, [])

  const allCards = useMemo(() => {
    const list = [...CORE_FLASHCARDS, ...mistakeCards]
    if (selectedSubject === 'all') return list
    return list.filter(c => c.subject === selectedSubject)
  }, [selectedSubject, mistakeCards])

  const currentCard = allCards[currentIndex] || allCards[0]

  const handleNext = () => {
    setIsFlipped(false)
    stopSpeech()
    setCurrentIndex(prev => (prev + 1) % allCards.length)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    stopSpeech()
    setCurrentIndex(prev => (prev - 1 + allCards.length) % allCards.length)
  }

  const handleMarkMastered = (cardId: string) => {
    let next: string[]
    if (masteredIds.includes(cardId)) {
      next = masteredIds.filter(id => id !== cardId)
    } else {
      next = [...masteredIds, cardId]
      // Trigger Micro-Celebration at milestones
      if (next.length % 5 === 0 || next.length >= allCards.length) {
        setShowCelebration(true)
      }
      // Check Badge Unlock
      if (next.length >= 10) {
        const { newlyUnlocked } = awardBadge('flashcard_master')
        if (newlyUnlocked) {
          setUnlockedToast('🏆 ปลดล็อกเหรียญ "จอมจำสูตรลัด" สำเร็จ!')
          setTimeout(() => setUnlockedToast(null), 4000)
        }
      }
    }
    setMasteredIds(next)
    localStorage.setItem('master_m1_mastered_flashcards', JSON.stringify(next))
    handleNext()
  }

  // Voice TTS (Rule 12 Standard: Microsoft Niwat Engine)
  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleSpeak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    if (isSpeaking) {
      stopSpeech()
      return
    }

    const cleanText = preprocessForSpeech(text)
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 0.78 // Natural calm tutor pace

    const voices = window.speechSynthesis.getVoices()
    const thaiVoice = 
      voices.find(v => v.name.includes('Niwat') || v.name.includes('นิวัฒน์')) ||
      voices.find(v => v.name.includes('Premwadee')) ||
      voices.find(v => v.lang === 'th-TH' || v.lang.startsWith('th')) ||
      voices.find(v => v.lang.startsWith('en'))

    if (thaiVoice) utterance.voice = thaiVoice

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const isCurrentMastered = currentCard && masteredIds.includes(currentCard.id)
  const progressPercent = allCards.length > 0 ? Math.round((masteredIds.length / allCards.length) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/40 to-red-50 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-white/85 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-orange-600">
                <ArrowLeft className="w-4 h-4 mr-1" />
                แดชบอร์ด
              </Button>
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <h1 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>🃏 Flashcards สูตรลับ ม.1</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 font-bold px-3 py-1">
              ✨ จำได้แล้ว {masteredIds.length}/{allCards.length}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 w-full flex-1 flex flex-col items-center">
        {/* Unlocked Toast Banner */}
        {unlockedToast && (
          <div className="w-full mb-4 p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg font-bold text-center animate-bounce flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>{unlockedToast}</span>
          </div>
        )}

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-6 w-full">
          {(
            [
              { id: 'all', label: 'ทั้งหมด', icon: '📚' },
              { id: 'math', label: 'คณิตคิดเร็ว', icon: '🔢' },
              { id: 'science', label: 'วิทย์จุดจำ', icon: '🔬' },
              { id: 'english', label: 'English Rules', icon: '🗣️' },
              { id: 'mistakes', label: `จุดที่เคยผิด (${mistakeCards.length})`, icon: '❌' },
            ] as const
          ).map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedSubject(tab.id)
                setCurrentIndex(0)
                setIsFlipped(false)
                stopSpeech()
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                selectedSubject === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md shadow-orange-500/20 scale-105'
                  : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xl mb-4 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>ความแม่นยำรวม</span>
            <span className="text-orange-600">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2 bg-orange-100" />
        </div>

        {/* Card Counter */}
        <div className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
          <span>การ์ดที่ {currentIndex + 1} จาก {allCards.length}</span>
          {isCurrentMastered && (
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> แม่นยำแล้ว
            </span>
          )}
        </div>

        {/* 3D Flip Flashcard with Dynamic Auto-Expanding Height */}
        {currentCard ? (
          <div className="w-full max-w-xl perspective-1000 mb-6">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`relative w-full rounded-3xl cursor-pointer transition-transform duration-500 transform-style-3d shadow-xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT OF CARD */}
              <div className={`w-full bg-white border-2 border-orange-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between backface-hidden shadow-sm hover:border-orange-400 transition-all ${
                isFlipped ? 'absolute inset-0 pointer-events-none opacity-0' : 'relative min-h-[360px] h-auto'
              }`}>
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs font-bold">
                      {currentCard.topic}
                    </Badge>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSpeak(`${currentCard.front.title} ${currentCard.front.formulaOrQuestion}`)
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        isSpeaking ? 'bg-orange-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-orange-100 hover:text-orange-600'
                      }`}
                      title="ฟังเสียงครูพี่ AI"
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 mt-4">
                    {currentCard.front.title}
                  </h3>
                  {currentCard.front.subtitle && (
                    <p className="text-sm text-slate-500 font-medium mb-4">
                      {currentCard.front.subtitle}
                    </p>
                  )}

                  <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100 text-center my-4">
                    <p className="text-xl sm:text-2xl font-black text-orange-950 font-mono tracking-wide break-words">
                      {currentCard.front.formulaOrQuestion}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 mt-4">
                  <span className="flex items-center gap-1 text-orange-600 font-medium">
                    💡 คำใบ้: {currentCard.front.hint || 'คลิกที่การ์ดเพื่อดูเฉลย'}
                  </span>
                  <span className="font-semibold text-slate-500 flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" /> แตะเพื่อพลิก
                  </span>
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className={`w-full bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between rotate-y-180 backface-hidden shadow-sm transition-all ${
                isFlipped ? 'relative min-h-[360px] h-auto' : 'absolute inset-0 pointer-events-none opacity-0'
              }`}>
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      เฉลยและวิธีคิดละเอียด
                    </Badge>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSpeak(`คำตอบคือ ${currentCard.back.answer} ${currentCard.back.explanation}`)
                      }}
                      className="p-2 rounded-full bg-white/10 text-white hover:bg-orange-500 transition-colors"
                      title="ฟังเสียงเฉลย"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="my-3">
                    <p className="text-xs text-slate-400 font-medium">คำตอบที่ถูกต้อง:</p>
                    <p className="text-2xl sm:text-3xl font-black text-amber-300 mt-0.5 break-words">
                      {currentCard.back.answer}
                    </p>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed my-3 bg-white/5 p-4 rounded-2xl border border-white/10 break-words">
                    {currentCard.back.explanation}
                  </div>

                  {currentCard.back.shortcutTrick && (
                    <div className="p-3 bg-amber-500/20 border border-amber-400/30 rounded-xl text-xs sm:text-sm text-amber-200 font-semibold flex items-start gap-2 my-2">
                      <span className="text-base">⚡</span>
                      <span className="leading-relaxed">{currentCard.back.shortcutTrick}</span>
                    </div>
                  )}

                  {currentCard.back.commonTrap && (
                    <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-xs sm:text-sm text-red-200 font-semibold mt-2 flex items-start gap-2">
                      <span className="text-base">⚠️</span>
                      <span className="leading-relaxed">{currentCard.back.commonTrap}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-400 mt-4">
                  <span>MASTER ม.1 Spaced Repetition</span>
                  <span className="font-semibold text-amber-400 flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" /> แตะเพื่อพลิกกลับ
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl p-8 border border-slate-200">
            <p className="text-slate-500 font-semibold">ไม่มีการ์ดในหมวดหมู่นี้</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full max-w-xl justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={allCards.length <= 1}
            className="flex-1 bg-white hover:bg-orange-50 border-slate-300 text-slate-700 font-semibold"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> ย้อนกลับ
          </Button>

          <Button
            onClick={() => currentCard && handleMarkMastered(currentCard.id)}
            className={`flex-1 font-bold shadow-md transition-all ${
              isCurrentMastered
                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/20'
            }`}
          >
            {isCurrentMastered ? 'ทบทวนใหม่ 🔄' : 'จำแม่นแล้ว! 🎯'}
          </Button>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={allCards.length <= 1}
            className="flex-1 bg-white hover:bg-orange-50 border-slate-300 text-slate-700 font-semibold"
          >
            ถัดไป <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* AI Memory Songs & Formula Rhymes Section */}
        <div className="w-full mt-10">
          <MemorySongPlayer initialSubject={selectedSubject === 'mistakes' ? 'all' : selectedSubject} />
        </div>
      </main>

      {/* Daily Micro-Celebration Popup */}
      <MicroCelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        title="สุดยอดมาก! พิชิตการทบทวนสำเร็จ 🎉"
        subtitle="คุณจำสูตรลับและจุดลวงได้แม่นยำขึ้นอีกขั้น พลังความพยายามคือพลังที่ยิ่งใหญ่ที่สุด!"
        earnedXp={150}
        streakDays={1}
        achievementType="spaced_repetition"
      />

      <Footer />
    </div>
  )
}
