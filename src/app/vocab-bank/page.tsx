'use client'
export const dynamic = 'force-dynamic'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import { 
  OXFORD_VOCAB_BANK, 
  VOCAB_CATEGORIES, 
  VocabItem 
} from '@/lib/oxford-3000-data'
import { 
  Search, 
  Volume2, 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  Filter,
  Copy,
  Check,
  Flame,
  Zap,
  Swords,
  Trophy,
  RotateCcw,
  Award
} from 'lucide-react'

export default function VocabBankPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1'>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)

  // Vocab Arena Fast-Paced State
  const [arenaActive, setArenaActive] = useState<boolean>(false)
  const [arenaQuestions, setArenaQuestions] = useState<Array<{ word: VocabItem; options: string[]; answer: string }>>([])
  const [arenaIndex, setArenaIndex] = useState<number>(0)
  const [arenaScore, setArenaScore] = useState<number>(0)
  const [arenaStreak, setArenaStreak] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [arenaFinished, setArenaFinished] = useState<boolean>(false)

  // Start Fast-Paced Vocab Arena
  const startArena = () => {
    const shuffled = [...OXFORD_VOCAB_BANK].sort(() => Math.random() - 0.5).slice(0, 10)
    const questions = shuffled.map(word => {
      // Pick 3 random distractors
      const distractors = OXFORD_VOCAB_BANK
        .filter(w => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.meaning)
      
      const options = [word.meaning, ...distractors].sort(() => Math.random() - 0.5)
      return { word, options, answer: word.meaning }
    })

    setArenaQuestions(questions)
    setArenaIndex(0)
    setArenaScore(0)
    setArenaStreak(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setArenaFinished(false)
    setArenaActive(true)
  }

  // Answer a question in Vocab Arena
  const handleAnswerArena = (option: string) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(option)
    const currentQ = arenaQuestions[arenaIndex]
    const correct = option === currentQ.answer
    setIsCorrect(correct)

    if (correct) {
      setArenaScore(prev => prev + 10 + (arenaStreak * 2))
      setArenaStreak(prev => prev + 1)
      handleSpeak(currentQ.word)
    } else {
      setArenaStreak(0)
    }

    setTimeout(() => {
      if (arenaIndex + 1 < arenaQuestions.length) {
        setArenaIndex(prev => prev + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else {
        setArenaFinished(true)
        // Award XP
        try {
          const storedGame = localStorage.getItem('master_m1_gamification')
          if (storedGame) {
            const parsed = JSON.parse(storedGame)
            parsed.totalXp = (parsed.totalXp || 0) + 150
            localStorage.setItem('master_m1_gamification', JSON.stringify(parsed))
          }
        } catch {}
      }
    }, 1200)
  }

  // Filtered Vocabulary List
  const filteredVocab = useMemo(() => {
    return OXFORD_VOCAB_BANK.filter(item => {
      // Category Filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false
      }
      // Level Filter
      if (selectedLevel !== 'all' && item.level !== selectedLevel) {
        return false
      }
      // Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchWord = item.word.toLowerCase().includes(q)
        const matchMeaning = item.meaning.toLowerCase().includes(q)
        const matchPhonetic = item.thaiPhonetic.toLowerCase().includes(q)
        const matchExample = item.example.toLowerCase().includes(q)
        return matchWord || matchMeaning || matchPhonetic || matchExample
      }
      return true
    })
  }, [searchQuery, selectedCategory, selectedLevel])

  // Play Native Pronunciation via Web Speech API
  const handleSpeak = (item: VocabItem) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(item.word)
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    
    setPlayingId(item.id)
    utterance.onend = () => setPlayingId(null)
    utterance.onerror = () => setPlayingId(null)
    
    window.speechSynthesis.speak(utterance)
  }

  // Copy Word & Meaning
  const handleCopy = (item: VocabItem) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`${item.word} (${item.pos}) [${item.thaiPhonetic}] = ${item.meaning}`)
      setCopiedId(item.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/40 to-red-50 text-slate-800 flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white/85 backdrop-blur-md border-b border-amber-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-amber-700 font-semibold">
                <ArrowLeft className="w-4 h-4 mr-1" />
                แดชบอร์ด
              </Button>
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <Link href="/subjects/english">
              <Button variant="ghost" size="sm" className="text-amber-800 hover:text-amber-900 font-semibold">
                วิชาภาษาอังกฤษ
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-amber-100 text-amber-900 border-amber-300 font-bold text-xs py-1 px-3">
              <BookOpen className="w-3.5 h-3.5 mr-1 text-amber-700" />
              Oxford 3000 High-Frequency
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-6 w-full flex-1 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-500/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" /> คลังศัพท์มาตรฐานระดับโลก
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                📖 คลังคำศัพท์ใช้บ่อย & ในชีวิตประจำวัน (Oxford 3000)
              </h1>
              <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl font-medium leading-relaxed">
                รวบรวมคำศัพท์ที่ออกสอบบ่อยที่สุด พร้อมการออกเสียง (IPA + ถอดเสียงไทย), ชนิดของคำ, คำแปลไทย, และตัวอย่างประโยคจริง
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  onClick={startArena}
                  className="bg-white text-orange-900 hover:bg-amber-100 font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Swords className="w-4 h-4 text-orange-600 animate-bounce" /> 
                  ⚔️ เข้าสู่ Vocab Arena (ประลองศัพท์ 10 ข้อ Fast-Paced)
                </Button>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shrink-0 w-full sm:w-auto">
              <span className="block text-2xl sm:text-3xl font-black text-amber-100">{filteredVocab.length}</span>
              <span className="text-[11px] text-amber-200 font-medium">คำศัพท์ที่ค้นพบ</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            VOCAB ARENA INTERACTIVE SPEED QUIZ MODAL
            ========================================================================= */}
        {arenaActive && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-xl w-full text-white shadow-2xl space-y-6">
              {!arenaFinished ? (
                <div className="space-y-6">
                  {/* Top Arena Bar */}
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <Swords className="w-5 h-5 text-amber-400" />
                      <span className="font-black text-amber-300 text-sm">
                        VOCAB ARENA — ข้อที่ {arenaIndex + 1}/10
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {arenaStreak > 1 && (
                        <Badge className="bg-orange-500 text-white font-black text-xs animate-pulse">
                          🔥 COMBO x{arenaStreak}
                        </Badge>
                      )}
                      <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-xs font-bold">
                        คะแนน: {arenaScore}
                      </Badge>
                      <button
                        onClick={() => setArenaActive(false)}
                        className="text-slate-400 hover:text-white text-base font-bold ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Word Card */}
                  <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 text-center space-y-2">
                    <span className="text-xs text-amber-400 font-mono font-bold tracking-wider uppercase">
                      คำศัพท์ระดับ {arenaQuestions[arenaIndex].word.level} ({arenaQuestions[arenaIndex].word.pos})
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {arenaQuestions[arenaIndex].word.word}
                    </h2>
                    <p className="text-slate-400 text-xs font-mono">
                      {arenaQuestions[arenaIndex].word.phonetic} • [{arenaQuestions[arenaIndex].word.thaiPhonetic}]
                    </p>

                    <Button
                      onClick={() => handleSpeak(arenaQuestions[arenaIndex].word)}
                      variant="ghost"
                      size="sm"
                      className="text-amber-300 hover:text-white text-xs mt-2"
                    >
                      <Volume2 className="w-4 h-4 mr-1" /> ฟังเสียงอ่านสำเนียง US
                    </Button>
                  </div>

                  {/* 4 Choices */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {arenaQuestions[arenaIndex].options.map((option, idx) => {
                      const isSelected = selectedAnswer === option
                      const isTarget = option === arenaQuestions[arenaIndex].answer
                      
                      let btnStyle = 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                      if (selectedAnswer !== null) {
                        if (isTarget) {
                          btnStyle = 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-600 border-rose-400 text-white'
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerArena(option)}
                          disabled={selectedAnswer !== null}
                          className={`p-4 rounded-xl text-left border text-xs sm:text-sm font-bold transition-all ${btnStyle}`}
                        >
                          <span className="text-amber-400 mr-2 font-mono">{idx + 1}.</span>
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                /* Arena Finished View */
                <div className="text-center space-y-6 py-4 animate-fade-in">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center text-4xl mx-auto shadow-xl">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">ยอดเยี่ยมมาก! การประลองสิ้นสุด</h3>
                    <p className="text-xs text-amber-300 font-semibold mt-1">
                      คุณทำคะแนนได้ {arenaScore} แต้ม • รับพลัง EXP +150 แต้ม! 🚀
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1 text-xs text-slate-300">
                    <p>✓ สะสมคลังคำศัพท์ Oxford 3000 เตรียมสอบเข้า ม.1 Gifted / EP สำเร็จไปอีก 10 คำ</p>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={startArena}
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 text-white font-bold text-xs rounded-xl shadow-md"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" /> ประลองอีกรอบ (10 คำใหม่)
                    </Button>
                    <Button
                      onClick={() => setArenaActive(false)}
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:text-white text-xs rounded-xl"
                    >
                      กลับสู่คลังคำศัพท์
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="bg-white/90 backdrop-blur-sm border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="🔍 ค้นหาคำศัพท์ภาษาอังกฤษ, คำแปลไทย, การออกเสียง เช่น routine, ล้างจาน, anxious..."
              className="pl-11 h-12 rounded-xl border-amber-200 focus-visible:ring-amber-500 text-sm sm:text-base bg-amber-50/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded-md"
              >
                ล้างคำค้น
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-600" /> เลือกตามหมวดหมู่การใช้งาน:
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {VOCAB_CATEGORIES.map(cat => {
                const count = cat.id === 'all' 
                  ? OXFORD_VOCAB_BANK.length 
                  : OXFORD_VOCAB_BANK.filter(v => v.category === cat.id).length

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? 'bg-amber-600 text-white shadow-md scale-[1.02]'
                        : 'bg-white text-slate-600 hover:bg-amber-50 border border-slate-200'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat.id ? 'bg-amber-800/60 text-amber-100' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs flex-wrap">
            <span className="font-bold text-slate-500">ระดับความยาก (CEFR Level):</span>
            {(['all', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                  selectedLevel === lvl
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl === 'all' ? 'ทุกระดับ (A1 - C1)' : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Vocabulary Cards Grid */}
        {filteredVocab.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 shadow-sm space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-lg font-bold text-slate-800">ไม่พบคำศัพท์ที่ตรงกับการค้นหา</h3>
            <p className="text-xs text-slate-500">ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นดูนะครับ</p>
            <Button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLevel('all') }}
              variant="outline" 
              size="sm"
              className="border-amber-300 text-amber-800 hover:bg-amber-50"
            >
              แสดงคำศัพท์ทั้งหมด
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVocab.map((item, index) => {
              const isPlaying = playingId === item.id
              const isCopied = copiedId === item.id

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-amber-100/90 shadow-sm hover:shadow-md hover:border-amber-300 transition-all space-y-3 group"
                >
                  {/* Top Bar: Word, POS, Audio */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                        <Badge className="bg-amber-100 text-amber-900 border-amber-200 font-bold text-[10px]">
                          {item.pos}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] font-bold text-slate-500 border-slate-200">
                          {item.level}
                        </Badge>
                      </div>
                      
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                          {item.word}
                        </h3>
                        <span className="text-xs font-medium text-slate-400 font-mono">
                          {item.phonetic}
                        </span>
                      </div>

                      {/* Thai Reading Aid */}
                      <div className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md mt-1 font-medium border border-amber-100">
                        <span>🗣️ อ่านว่า:</span>
                        <strong className="font-bold">{item.thaiPhonetic}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleSpeak(item)}
                        className={`rounded-xl transition-all ${
                          isPlaying 
                            ? 'bg-amber-500 text-white animate-pulse' 
                            : 'text-amber-700 hover:bg-amber-100'
                        }`}
                        title="ฟังเสียงอ่านเจ้าของภาษา"
                      >
                        <Volume2 className="w-5 h-5" />
                      </Button>
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleCopy(item)}
                        className="rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        title="คัดลอกคำศัพท์"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Meaning Box */}
                  <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100/70">
                    <p className="text-sm font-bold text-slate-800">
                      🇹🇭 {item.meaning}
                    </p>
                  </div>

                  {/* Example Sentence Box */}
                  <div className="text-xs space-y-1 text-slate-600 border-l-2 border-amber-400 pl-3 py-0.5">
                    <p className="font-medium text-slate-800 italic">
                      &quot;{item.example}&quot;
                    </p>
                    <p className="text-slate-500">
                      แปล: {item.exampleTh}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
