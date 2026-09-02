'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Music, 
  Play, 
  Pause, 
  Sparkles, 
  Copy, 
  Check, 
  Video, 
  Headphones, 
  Lightbulb, 
  AlertTriangle,
  ChevronRight,
  Flame
} from 'lucide-react'
import { MEMORY_SONGS_DATA, MemorySong } from '@/lib/memory-songs-data'
import { speakNaturalText, stopSpeaking, initVoiceEngine } from '@/lib/tts-engine'

interface MemorySongPlayerProps {
  initialSubject?: 'math' | 'science' | 'english' | 'thai' | 'all'
  compact?: boolean
}

export default function MemorySongPlayer({ 
  initialSubject = 'all',
  compact = false 
}: MemorySongPlayerProps) {
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'math' | 'science' | 'english' | 'thai'>(initialSubject)
  const [activeSongIndex, setActiveSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [copiedPrompt, setCopiedPrompt] = useState<'music' | 'video' | null>(null)

  const songs = selectedSubject === 'all' 
    ? MEMORY_SONGS_DATA 
    : MEMORY_SONGS_DATA.filter(s => s.subject === selectedSubject)

  const currentSong = songs[activeSongIndex] || songs[0]

  const handlePlaySong = (song: MemorySong) => {
    if (isPlaying) {
      stopSpeaking()
      setIsPlaying(false)
      return
    }

    initVoiceEngine()
    setIsPlaying(true)

    // Build speech text from lyrics
    const fullLyricsText = song.lyrics
      .map(sec => `${sec.section}. ${sec.lines.join('. ')}`)
      .join('. ')

    speakNaturalText(`เพลงช่วยจำ ${song.title}. ${fullLyricsText}`, {
      rate: 0.92,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    })
  }

  const handleCopy = (text: string, type: 'music' | 'video') => {
    navigator.clipboard.writeText(text)
    setCopiedPrompt(type)
    setTimeout(() => setCopiedPrompt(null), 3000)
  }

  return (
    <Card className="border-2 border-amber-300/80 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/60 rounded-3xl shadow-lg overflow-hidden">
      {/* Header Banner */}
      <CardHeader className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl animate-bounce">🎵</span>
              <CardTitle className="text-xl sm:text-2xl font-black tracking-tight">
                เพลงจำสูตรลัด ม.1 (AI Memory Beats)
              </CardTitle>
            </div>
            <p className="text-white/90 text-xs sm:text-sm font-medium">
              ท่องจำสูตรลัดและจุดลวง สทศ. ผ่านจังหวะดนตรีจำง่าย พร้อมต่อยอดด้วย AiPASS Music & Video
            </p>
          </div>

          <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm text-xs px-3 py-1 font-bold">
            ✨ โควตาผู้สร้างสรรค์ AiPASS
          </Badge>
        </div>

        {/* Subject Filter Tabs */}
        {!compact && (
          <div className="flex flex-wrap gap-1.5 pt-3">
            {[
              { id: 'all', label: '🌟 ทั้งหมด' },
              { id: 'math', label: '🔢 คณิตคิดเร็ว' },
              { id: 'science', label: '🔬 วิทย์ Q=mcΔt' },
              { id: 'english', label: '🇬🇧 อังกฤษ If-Clause' },
              { id: 'thai', label: '📖 ไทย สมาส-สนธิ' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedSubject(tab.id as any)
                  setActiveSongIndex(0)
                  stopSpeaking()
                  setIsPlaying(false)
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSubject === tab.id
                    ? 'bg-white text-slate-900 shadow-md scale-105'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-5 sm:p-6 space-y-6">
        {currentSong && (
          <div className="space-y-5">
            {/* Song Meta Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shrink-0">
                  {currentSong.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm sm:text-base">
                      {currentSong.title}
                    </span>
                    <Badge className={currentSong.badgeColor}>
                      {currentSong.subjectLabel}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    แนวเพลง: {currentSong.genre} • จังหวะ: {currentSong.bpm} BPM • หัวข้อ: {currentSong.formulaTopic}
                  </p>
                </div>
              </div>

              {/* Play Audio Button */}
              <Button
                onClick={() => handlePlaySong(currentSong)}
                className={`rounded-2xl font-bold px-5 py-2.5 transition-all shadow-md ${
                  isPlaying 
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-1.5" /> หยุดเล่น
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1.5" /> 🎧 ฟังครูพี่ AI ท่องเพลง
                  </>
                )}
              </Button>
            </div>

            {/* Lyrics Card */}
            <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/50 p-4 sm:p-5 rounded-2xl border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Headphones className="w-4 h-4" /> ท่อนฮุคช่วยจำ (Memorization Lyrics)
                </span>
                <span className="text-[11px] font-bold text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full">
                  {currentSong.catchphrase}
                </span>
              </div>

              <div className="space-y-3 font-sans">
                {currentSong.lyrics.map((sec, sIdx) => (
                  <div key={sIdx} className="bg-white/85 p-3 rounded-xl border border-amber-100">
                    <div className="text-[11px] font-bold text-amber-700 mb-1">
                      {sec.section}:
                    </div>
                    {sec.lines.map((line, lIdx) => (
                      <p key={lIdx} className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy & Trap Advice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                  <Lightbulb className="w-4 h-4 text-emerald-600" /> เทคนิคสูตรลัด 3 วินาที:
                </div>
                <div className="text-emerald-900 font-mono font-medium leading-relaxed">
                  {currentSong.speedTechnique}
                </div>
              </div>

              <div className="p-3.5 bg-red-50 rounded-2xl border border-red-200">
                <div className="font-bold text-red-800 flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> จุดลวงข้อสอบ สทศ.:
                </div>
                <div className="text-red-900 font-medium leading-relaxed">
                  {currentSong.trapToAvoid}
                </div>
              </div>
            </div>

            {/* AiPASS AI Integration Box */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-xs sm:text-sm text-amber-300">
                    นำไปสร้างใน AiPASS (Music & Video Generator)
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  ใช้โควตาผู้สร้างสรรค์ 20 คลิป/เพลง
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  onClick={() => handleCopy(currentSong.aipassMusicPrompt, 'music')}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl"
                >
                  {copiedPrompt === 'music' ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-300" /> คัดลอก Music Prompt แล้ว!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1.5" /> 🎵 ก๊อปปี้ Prompt สร้างเพลง AI
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  onClick={() => handleCopy(currentSong.aipassVideoPrompt, 'video')}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl"
                >
                  {copiedPrompt === 'video' ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-300" /> คัดลอก Video Prompt แล้ว!
                    </>
                  ) : (
                    <>
                      <Video className="w-3.5 h-3.5 mr-1.5" /> 🎬 ก๊อปปี้ Prompt สร้างคลิปวิดีโอ AI
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Song Navigation Selector if multiple songs */}
            {songs.length > 1 && (
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-500 font-medium">
                  เพลงที่ {activeSongIndex + 1} จาก {songs.length}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={activeSongIndex === 0}
                    onClick={() => {
                      setActiveSongIndex(prev => Math.max(0, prev - 1))
                      stopSpeaking()
                      setIsPlaying(false)
                    }}
                    className="text-xs font-bold"
                  >
                    เพลงก่อนหน้า
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={activeSongIndex === songs.length - 1}
                    onClick={() => {
                      setActiveSongIndex(prev => Math.min(songs.length - 1, prev + 1))
                      stopSpeaking()
                      setIsPlaying(false)
                    }}
                    className="text-xs font-bold"
                  >
                    เพลงถัดไป <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
