'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAudioSummaryForModule, preprocessNaturalSpeech, AudioLessonSummary } from '@/lib/audio-tutor'
import { 
  Headphones, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Zap,
  Radio
} from 'lucide-react'

import { speakNaturalText, stopSpeaking as stopTts, initVoiceEngine } from '@/lib/tts-engine'

interface AudioLessonPlayerProps {
  subject: string
  moduleId: string
}

export default function AudioLessonPlayer({ subject, moduleId }: AudioLessonPlayerProps) {
  const [summary, setSummary] = useState<AudioLessonSummary | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.90)
  const [showTranscript, setShowTranscript] = useState(false)
  const [activeVoiceName, setActiveVoiceName] = useState<string>('Microsoft Niwat (Natural)')

  useEffect(() => {
    initVoiceEngine()
    const data = getAudioSummaryForModule(subject, moduleId)
    setSummary(data)
    stopAudio()
  }, [subject, moduleId])

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  const stopAudio = () => {
    stopTts()
    setIsPlaying(false)
  }

  const handlePlayPause = () => {
    if (!summary) return

    if (isPlaying) {
      stopAudio()
      return
    }

    setIsPlaying(true)
    speakNaturalText(summary.narrationScript, {
      rate: speechSpeed,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    })
  }

  const toggleSpeed = () => {
    let next = 0.78
    if (speechSpeed === 0.78) next = 0.88
    else if (speechSpeed === 0.88) next = 1.0
    else next = 0.78
    setSpeechSpeed(next)

    if (isPlaying) {
      stopAudio()
      setTimeout(() => {
        handlePlayPause()
      }, 100)
    }
  }

  if (!summary) return null

  return (
    <div className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-orange-500/20 mb-6 transition-all">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Title & Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayPause}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md shrink-0 ${
              isPlaying
                ? 'bg-white text-orange-600 ring-4 ring-white/30 scale-105'
                : 'bg-white/20 hover:bg-white text-white hover:text-orange-600'
            }`}
            title={isPlaying ? 'หยุดชั่วคราว' : 'กดฟังเสียงสรุปบทเรียน'}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Headphones className="w-3 h-3" /> Audio Masterclass
              </span>
              <span className="text-[11px] text-white/80 font-mono">
                ⏱️ {summary.durationEstimate}
              </span>
            </div>
            <h4 className="font-black text-sm sm:text-base mt-1 text-white flex items-center gap-1.5">
              <span>🎧 ฟังเสียงครูพี่ AI สรุปสูตรลับบทนี้</span>
            </h4>
          </div>
        </div>

        {/* Action Controls & Waveform */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {/* Animated Waveform Bars */}
          {isPlaying && (
            <div className="flex items-center gap-1 h-6 px-2">
              <span className="w-1 bg-white rounded-full h-4 animate-bounce" />
              <span className="w-1 bg-white rounded-full h-6 animate-pulse" />
              <span className="w-1 bg-white rounded-full h-3 animate-bounce" />
              <span className="w-1 bg-white rounded-full h-5 animate-pulse" />
            </div>
          )}

          {/* Speed Toggle */}
          <button
            onClick={toggleSpeed}
            className="px-2.5 py-1 bg-white/15 hover:bg-white/25 rounded-lg text-xs font-mono font-bold transition-all"
            title="ปรับความเร็วเสียง"
          >
            {speechSpeed === 0.78 ? '0.78x' : speechSpeed === 0.88 ? '0.88x' : '1.0x'}
          </button>

          {/* Transcript Toggle */}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-white hover:bg-white/20 text-xs font-bold h-8 px-2.5"
          >
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            {showTranscript ? 'ซ่อนบทอ่าน' : 'อ่านสคริปต์'}
            {showTranscript ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
          </Button>
        </div>
      </div>

      {/* Collapsible Transcript & Key Takeaways */}
      {showTranscript && (
        <div className="mt-4 pt-4 border-t border-white/20 text-xs text-white/95 leading-relaxed bg-black/15 p-4 rounded-xl space-y-3">
          <p className="font-semibold text-amber-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> สคริปต์คำบรรยายเสียง:
          </p>
          <p className="italic text-slate-100 whitespace-pre-line">
            &ldquo;{summary.narrationScript}&rdquo;
          </p>

          <div className="pt-2 border-t border-white/10">
            <p className="font-bold text-amber-200 mb-1">📌 จุดเน้น 1 นาที:</p>
            <ul className="space-y-1 text-slate-100">
              {summary.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
