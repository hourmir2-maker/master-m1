'use client'
import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { preprocessNaturalSpeech } from '@/lib/audio-tutor'
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Zap,
  Radio
} from 'lucide-react'
import { speakNaturalText, stopSpeaking as stopTts, initVoiceEngine } from '@/lib/tts-engine'

interface VoiceCallModalProps {
  isOpen: boolean
  onClose: () => void
  subject?: string
  moduleId?: string
  lessonTitle?: string
}

type CallStatus = 'connecting' | 'listening' | 'thinking' | 'speaking' | 'paused'

export default function VoiceCallModal({
  isOpen,
  onClose,
  subject = 'math',
  moduleId = 'numbers_basics',
  lessonTitle = 'บทเรียนทั่วไป'
}: VoiceCallModalProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>('connecting')
  const [isMuted, setIsMuted] = useState(false)
  const speechSpeed = 0.78
  const [lastUserSpeech, setLastUserSpeech] = useState<string>('')
  const [lastAiReply, setLastAiReply] = useState<string>('')
  const [callDuration, setCallDuration] = useState(0)

  const recognitionRef = useRef<{ stop: () => void; start: () => void } | null>(null)
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const durationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Start Call Lifecycle
  useEffect(() => {
    if (isOpen) {
      setCallDuration(0)
      setCallStatus('connecting')
      setLastUserSpeech('')
      setLastAiReply('')

      durationTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)

      // Initial AI greeting after 1 second
      const timer = setTimeout(() => {
        const greeting = `สวัสดีครับ! ครูพี่ AI ยินดีที่ได้คุยสดด้วยกันครับ วันนี้เรียนเรื่อง "${lessonTitle}" มีข้อสงสัยหรืออยากให้ครูพี่ช่วยอธิบายตรงไหน พูดบอกได้เลยนะคร้าบ!`
        speakAiResponse(greeting)
      }, 1000)

      return () => {
        clearTimeout(timer)
        cleanupCall()
      }
    } else {
      cleanupCall()
    }
  }, [isOpen])

  const cleanupCall = () => {
    if (durationTimerRef.current) clearInterval(durationTimerRef.current)
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (e) {
        console.warn(e)
      }
    }
    stopSpeaking()
  }

  // Voice TTS (Microsoft Niwat Engine - Centralized Engine)
  const stopSpeaking = () => {
    stopTts()
  }

  const speakAiResponse = (text: string) => {
    stopSpeaking()
    setCallStatus('speaking')
    setLastAiReply(text)

    speakNaturalText(text, {
      rate: speechSpeed,
      onEnd: () => {
        setCallStatus('listening')
        startListening()
      },
      onError: () => {
        setCallStatus('listening')
        startListening()
      }
    })
  }

  // Speech-to-Text Recognition
  const startListening = () => {
    if (typeof window === 'undefined' || isMuted) return

    const win = window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition
    if (!SpeechRecognition) return

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop() } catch {}
      }

      const recognition = new SpeechRecognition()
      recognition.lang = subject === 'english' ? 'en-US' : 'th-TH'
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onresult = (event: { resultIndex: number; results: Array<Array<{ transcript: string }> & { isFinal?: boolean }> }) => {
        let interimText = ''
        let finalText = ''

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript
          } else {
            interimText += event.results[i][0].transcript
          }
        }

        const currentSpeech = finalText || interimText
        if (currentSpeech.trim()) {
          setLastUserSpeech(currentSpeech)

          // Reset silence timer: user paused for 1.6 seconds -> trigger response
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)
          silenceTimerRef.current = setTimeout(() => {
            handleUserQuery(currentSpeech.trim())
          }, 1600)
        }
      }

      recognition.onerror = (e: unknown) => {
        console.warn('Speech recognition error:', e)
      }

      recognition.start()
      recognitionRef.current = recognition
    } catch (err) {
      console.warn('Failed to start recognition:', err)
    }
  }

  const handleUserQuery = async (queryText: string) => {
    if (!queryText.trim()) return

    // Stop listening while AI thinks and speaks
    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch {}
    }

    setCallStatus('thinking')

    try {
      const response = await fetch('/api/chat-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: queryText }],
          subject,
          moduleId,
          lessonTitle
        })
      })

      if (response.ok) {
        const data = await response.json()
        const reply = data.reply || 'เข้าใจแล้วครับ มีคำถามจุดไหนเพิ่มเติมไหมครับ?'
        speakAiResponse(reply)
      } else {
        speakAiResponse('ขออภัยครับ สัญญาณขัดข้องเล็กน้อย ลองพูดใหม่อีกครั้งได้เลยครับ!')
      }
    } catch (err: unknown) {
      console.warn('Voice query error:', err)
      speakAiResponse('ขออภัยครับ ลองถามใหม่อีกครั้งได้เลยนะคร้าบ!')
    }
  }

  const handleEndCall = () => {
    cleanupCall()
    onClose()
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      if (callStatus === 'listening') startListening()
    } else {
      setIsMuted(true)
      if (recognitionRef.current) {
        try { recognitionRef.current.stop() } catch {}
      }
    }
  }

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleEndCall}>
      <DialogContent className="max-w-lg bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl border-2 border-orange-500/40 shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-between min-h-[520px]">
        {/* Hidden Accessibility Title */}
        <DialogTitle className="sr-only">
          โทรคุยสดกับครูพี่ AI — ติวเตอร์ส่วนตัว
        </DialogTitle>

        {/* Top Bar */}
        <div className="w-full flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="font-semibold text-slate-200">สายสนทนาสด (Live Voice)</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-amber-400 border-amber-400/40 font-mono text-xs">
              ⏱️ {formatDuration(callDuration)}
            </Badge>
          </div>
        </div>

        {/* Lesson Context */}
        <div className="text-center my-2">
          <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <span>ครูพี่ AI (MASTER ม.1 Tutor)</span>
          </h3>
          <p className="text-xs text-orange-400 font-medium mt-0.5">
            เรื่อง: {lessonTitle}
          </p>
        </div>

        {/* Animated Glowing Voice Orb / Waves */}
        <div className="my-6 relative flex items-center justify-center">
          {/* Outer Pulsing Rings */}
          <div className={`absolute w-44 h-44 rounded-full transition-all duration-700 ${
            callStatus === 'speaking'
              ? 'bg-orange-500/30 animate-ping'
              : callStatus === 'listening'
              ? 'bg-emerald-500/20 animate-pulse'
              : 'bg-amber-500/10'
          }`} />

          <div className={`absolute w-36 h-36 rounded-full transition-all duration-500 ${
            callStatus === 'speaking'
              ? 'bg-gradient-to-tr from-orange-600/40 to-red-600/40 scale-110'
              : callStatus === 'listening'
              ? 'bg-gradient-to-tr from-emerald-600/30 to-teal-600/30 scale-105'
              : 'bg-white/5'
          }`} />

          {/* Central Orb Core */}
          <div className={`w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 z-10 ${
            callStatus === 'speaking'
              ? 'bg-gradient-to-tr from-orange-500 via-red-500 to-amber-500 text-white shadow-orange-500/50 scale-105'
              : callStatus === 'listening'
              ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-emerald-500/40'
              : 'bg-gradient-to-tr from-slate-800 to-slate-700 text-slate-300'
          }`}>
            {callStatus === 'speaking' && <Volume2 className="w-10 h-10 animate-bounce" />}
            {callStatus === 'listening' && <Mic className="w-10 h-10 animate-pulse" />}
            {callStatus === 'thinking' && <Sparkles className="w-10 h-10 animate-spin text-amber-300" />}
            {callStatus === 'connecting' && <Radio className="w-8 h-8 animate-pulse text-slate-400" />}
          </div>
        </div>

        {/* Live Status Label */}
        <div className="text-center min-h-[32px] mb-2">
          {callStatus === 'speaking' && (
            <Badge className="bg-orange-500/20 text-orange-300 border border-orange-400/40 font-bold px-3 py-1 animate-pulse">
              🗣️ ครูพี่ AI กำลังพูดอธิบาย...
            </Badge>
          )}
          {callStatus === 'listening' && (
            <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold px-3 py-1">
              🎙️ กำลังฟังเสียงคุณ... (พูดคำถามได้เลย)
            </Badge>
          )}
          {callStatus === 'thinking' && (
            <Badge className="bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold px-3 py-1">
              🤔 ครูพี่ AI กำลังประมวลผลคำตอบ...
            </Badge>
          )}
          {callStatus === 'connecting' && (
            <Badge variant="outline" className="text-slate-400 border-slate-700">
              กำลังเชื่อมต่อสายสนทนา...
            </Badge>
          )}
        </div>

        {/* Real-time Subtitles / Live Transcript */}
        <div className="w-full max-h-24 overflow-y-auto bg-white/5 border border-white/10 rounded-2xl p-3 text-xs leading-relaxed mb-4 text-center">
          {callStatus === 'listening' && lastUserSpeech && (
            <p className="text-emerald-300">
              <strong>คุณ:</strong> &ldquo;{lastUserSpeech}&rdquo;
            </p>
          )}
          {callStatus === 'speaking' && lastAiReply && (
            <p className="text-orange-200">
              <strong>ครูพี่ AI:</strong> &ldquo;{lastAiReply.slice(0, 140)}...&rdquo;
            </p>
          )}
          {!lastUserSpeech && !lastAiReply && (
            <p className="text-slate-500 text-[11px]">
              พูดคำถามด้วยน้ำเสียงปกติ ครูพี่ AI จะตอบกลับด้วยเสียงภาษาไทยทันที
            </p>
          )}
        </div>

        {/* Bottom Call Controls */}
        <div className="w-full flex items-center justify-center gap-4 pt-2 border-t border-white/10">
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
              isMuted ? 'bg-red-500/80 text-white ring-2 ring-red-400' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title={isMuted ? 'เปิดไมค์' : 'ปิดไมค์'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/40 hover:scale-105 transition-all"
            title="วางสาย"
          >
            <PhoneOff className="w-7 h-7" />
          </button>

          {/* Interrupt / Stop Speech Button */}
          <button
            onClick={() => {
              stopSpeaking()
              setCallStatus('listening')
              startListening()
            }}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all shadow-md"
            title="ขัดจังหวะเพื่อพูดแทรก"
          >
            <Zap className="w-5 h-5 text-amber-400" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
