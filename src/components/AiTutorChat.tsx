'use client'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Loader2, 
  HelpCircle, 
  Lightbulb, 
  BookOpen,
  RotateCcw,
  Volume2,
  VolumeX,
  Mic,
  MicOff
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  time: string
}

interface AiTutorChatProps {
  subject?: string
  moduleId?: string
  lessonTitle?: string
}

export default function AiTutorChat({ subject = 'math', moduleId = 'numbers_basics', lessonTitle = 'บทเรียนทั่วไป' }: AiTutorChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.78) // 0.78 = slow, calm, natural tutor voice
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<any>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 สวัสดีครับนักเรียน! ครูพี่ AI ยินดีช่วยเหลือครับ วันนี้กำลังเรียนเรื่อง "${lessonTitle}" อยู่ใช่ไหมครับ? มีตรงไหนที่ยังสงสัย หรืออยากให้ยกตัวอย่างเพิ่ม ถามครูพี่ได้เลยนะคร้าบ! 🎯✨`,
      time: 'เมื่อสักครู่'
    }
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Speech Recognition (Voice Input)
  const toggleListening = () => {
    if (typeof window === 'undefined') return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('เบราว์เซอร์นี้ไม่รองรับการสั่งการด้วยเสียงโดยตรง แต่คุณสามารถกดไอคอนไมโครโฟนบนแป้นพิมพ์โทรศัพท์ได้ตามปกติครับ! 🎙️')
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = subject === 'english' ? 'en-US' : 'th-TH'
      recognition.continuous = false
      recognition.interimResults = true

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript
        }
        if (transcript) {
          setInput(transcript)
        }
      }

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
      recognition.start()
    } catch (err) {
      console.warn('Voice input error:', err)
      setIsListening(false)
    }
  }

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
    }
  }

  const speakText = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    if (speakingId === id) {
      stopSpeaking()
      return
    }

    stopSpeaking()

    // 1. Clean & Format text with natural human pauses and readable grammar phonetics
    let formattedText = text
      .replace(/[#*_`~💡⚡🎯✨👋🤖🏆🥇🥈🥉]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/【วิธีคิด】/g, 'วิธีคิดครับ, ')
      .replace(/【.*?】/g, ', ')
      // English Grammar Phonetics for Crystal Clear Thai TTS
      .replace(/\bV\.inf\b|\bV\.infinitive\b/gi, 'กริยาช่องเดิมไม่ผัน')
      .replace(/\bV\.ing\b/gi, 'กริยาเติม ไอเอ็นจี')
      .replace(/\bV\.1\b|\bV1\b/gi, 'กริยาช่องหนึ่ง')
      .replace(/\bV\.2\b|\bV2\b/gi, 'กริยาช่องสอง')
      .replace(/\bV\.3\b|\bV3\b/gi, 'กริยาช่องสาม')
      .replace(/\bS\s*\+\s*/g, 'ประธาน บวก ')
      .replace(/\bS\s*\(/g, 'ประธาน (')
      .replace(/\bIf-Clause\b/gi, 'อิฟ คลอส')
      .replace(/\bQuestion Tag\b/gi, 'เควสชัน แท็ก')
      .replace(/\bQuestion Tags\b/gi, 'เควสชัน แท็กส์')
      .replace(/\bPresent Simple\b/gi, 'เพรสเซนต์ ซิมเปิล')
      .replace(/\bPresent Continuous\b/gi, 'เพรสเซนต์ คอนทินิวอัส')
      .replace(/\bPast Simple\b/gi, 'พาสต์ ซิมเปิล')
      .replace(/\bPast Continuous\b/gi, 'พาสต์ คอนทินิวอัส')
      .replace(/\bFuture Simple\b/gi, 'ฟิวเจอร์ ซิมเปิล')
      .replace(/\bis\/am\/are\b/gi, 'อิส แอม อาร์')
      .replace(/\bwas\/were\b/gi, 'วอส เวิร์')
      .replace(/√(\d+)/g, 'สแควรูท $1')
      .replace(/√/g, 'สแควรูท ')
      .replace(/ห\.ร\.ม\./g, 'หอรอมอ')
      .replace(/ค\.ร\.น\./g, 'คอรอนอ')
      // Pauses
      .replace(/ครับ/g, 'ครับ, ')
      .replace(/ค่ะ/g, 'ค่ะ, ')
      .replace(/นะคร้าบ/g, 'นะคร้าบ, ')
      .replace(/\n\s*•/g, ', และ ')
      .replace(/\n\s*-\s*/g, ', ')
      .replace(/\n\s*(\d+)\.\s*/g, ', ขั้นตอนที่ $1, ')
      .replace(/\n+/g, ', ')
      .replace(/→/g, ' จะได้ ')
      .replace(/:/g, ' คือ ')
      .replace(/\s{2,}/g, ' ')
      .trim()

    const utterance = new SpeechSynthesisUtterance(formattedText)
    
    // 2. Select language and find best natural sounding voice
    const hasThai = /[ก-๙]/.test(formattedText)
    utterance.lang = hasThai ? 'th-TH' : 'en-US'
    
    // Set calm, gentle tutor speed
    utterance.rate = speechSpeed // Use user-selected or default calm speed (0.78)
    utterance.pitch = 1.0

    // Try to pick Microsoft Niwat (Top Priority) or high-quality natural voices available on user's system
    const voices = window.speechSynthesis.getVoices()
    if (voices && voices.length > 0) {
      if (hasThai) {
        // 1. Search for Microsoft Niwat (Natural male tutor voice)
        const niwatVoice = voices.find(v => 
          (v.lang.startsWith('th') || v.lang === 'th-TH' || v.lang === 'th_TH') && 
          (v.name.toLowerCase().includes('niwat') || v.name.includes('นิวัฒน์'))
        )

        // 2. Search for other premium natural voices (Premwadee, Google, Natural, Kanya, Narisa)
        const otherNaturalVoice = voices.find(v => 
          (v.lang.startsWith('th') || v.lang === 'th-TH' || v.lang === 'th_TH') && 
          (v.name.includes('Premwadee') || v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Kanya') || v.name.includes('Narisa'))
        ) || voices.find(v => v.lang.startsWith('th'))

        const selectedVoice = niwatVoice || otherNaturalVoice
        if (selectedVoice) {
          utterance.voice = selectedVoice
        }
      } else {
        const bestEnVoice = voices.find(v => 
          v.lang.startsWith('en') && 
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Jenny'))
        )
        if (bestEnVoice) {
          utterance.voice = bestEnVoice
        }
      }
    }

    utterance.onend = () => {
      setSpeakingId(null)
    }

    utterance.onerror = () => {
      setSpeakingId(null)
    }

    setSpeakingId(id)
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    return () => {
      stopSpeaking()
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input.trim()
    if (!textToSend || loading) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: textToSend,
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    if (!customText) setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          subject,
          moduleId,
          lessonTitle
        })
      })

      const data = await res.json()
      const assistantMessage: Message = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'ครูพี่พร้อมช่วยเสมอครับ มีจุดไหนสงสัยถามเพิ่มได้เลยนะ!',
        time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      console.warn('AI Chat error:', err)
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          content: 'ขออภัยครับ สัญญาณขัดข้องชั่วคราว ลองพิมพ์ถามใหม่อีกครั้งนะคร้าบ 😊',
          time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-white px-5 py-3.5 rounded-full shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 transition-all duration-300 border-2 border-white/80 animate-bounce hover:animate-none"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-200"></span>
            </span>
            <Bot className="w-5 h-5" />
            <span className="font-bold text-sm">💬 ถามครูพี่ AI</span>
            <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
          </button>
        ) : null}
      </div>

      {/* Chat Modal / Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex items-end sm:items-auto justify-center sm:justify-end">
          <Card className="w-full sm:w-[420px] h-[90vh] sm:h-[580px] max-h-[90vh] flex flex-col bg-white border-2 border-orange-200 shadow-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 p-3.5 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg shadow-inner">
                  🤖
                </div>
                <div>
                  <h3 className="font-black text-sm flex items-center gap-1.5 leading-tight">
                    ครูพี่ AI (MASTER ม.1) <Sparkles className="w-3 h-3 text-yellow-300" />
                  </h3>
                  <p className="text-[10px] text-orange-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse"></span>
                    พร้อมติว: <span className="font-bold underline truncate max-w-[120px]">{lessonTitle}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Voice Speed Toggle */}
                <button
                  onClick={() => {
                    const nextSpeed = speechSpeed === 0.75 ? 0.85 : speechSpeed === 0.85 ? 1.0 : 0.75
                    setSpeechSpeed(nextSpeed)
                    stopSpeaking()
                  }}
                  className="px-2 py-1 rounded-full bg-white/20 hover:bg-white/30 text-[10px] font-black flex items-center gap-1 transition-all border border-white/30"
                  title="คลิกเพื่อเปลี่ยนความเร็วเสียงพูด"
                >
                  <span>🔊 {speechSpeed === 0.75 ? '0.75x (ช้า)' : speechSpeed === 0.85 ? '0.85x' : '1.0x (ปกติ)'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="bg-orange-50/80 border-b border-orange-100 p-2.5 flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
              <button
                onClick={() => handleQuickPrompt('ช่วยอธิบายวิธีคิดเรื่องนี้แบบเข้าใจง่ายๆ หน่อยครับ')}
                className="whitespace-nowrap bg-white hover:bg-orange-100 text-orange-900 border border-orange-200 px-2.5 py-1 rounded-full font-semibold transition-all shadow-2xs"
              >
                💡 อธิบายแบบเข้าใจง่าย
              </button>
              <button
                onClick={() => handleQuickPrompt('ขอสูตรลัดหรือเทคนิคจำง่ายๆ ของบทนี้หน่อยครับ')}
                className="whitespace-nowrap bg-white hover:bg-orange-100 text-orange-900 border border-orange-200 px-2.5 py-1 rounded-full font-semibold transition-all shadow-2xs"
              >
                ⚡ ขอสูตรลัดจำง่าย
              </button>
              <button
                onClick={() => handleQuickPrompt('ขอตัวอย่างโจทย์เรื่องนี้พร้อมวิธีทำ 1 ข้อครับ')}
                className="whitespace-nowrap bg-white hover:bg-orange-100 text-orange-900 border border-orange-200 px-2.5 py-1 rounded-full font-semibold transition-all shadow-2xs"
              >
                📝 ขอตัวอย่างโจทย์
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-orange-50/20 via-white to-amber-50/20">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 text-white flex items-center justify-center text-xs flex-shrink-0 shadow-sm mt-1">
                      🤖
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-tr-none'
                        : 'bg-white border border-orange-100 text-slate-800 font-medium rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {m.content}
                    <div
                      className={`text-[10px] mt-2 pt-1 border-t flex items-center justify-between font-normal ${
                        m.role === 'user' ? 'text-orange-200 border-white/20' : 'text-slate-400 border-orange-100'
                      }`}
                    >
                      {m.role === 'assistant' ? (
                        <button
                          onClick={() => speakText(m.id, m.content)}
                          className="inline-flex items-center gap-1 text-[11px] text-orange-600 hover:text-orange-700 font-bold bg-orange-50 hover:bg-orange-100 px-2 py-0.5 rounded-full transition-all"
                        >
                          {speakingId === m.id ? (
                            <>
                              <VolumeX className="w-3 h-3 text-red-600" />
                              <span className="text-red-600">หยุดเสียง</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" />
                              <span>🔊 ฟังเสียงอ่าน</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span />
                      )}
                      <span>{m.time}</span>
                    </div>
                  </div>

                  {m.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-xs flex-shrink-0 shadow-sm mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 text-white flex items-center justify-center text-xs flex-shrink-0 shadow-sm mt-1">
                    🤖
                  </div>
                  <div className="bg-white border border-orange-100 rounded-2xl rounded-tl-none p-3.5 shadow-sm text-xs text-slate-500 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-600" />
                    <span>ครูพี่ AI กำลังพิมพ์คำตอบให้คร้าบ... ✍️</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-orange-100 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-red-500/50 ring-2 ring-red-400'
                    : 'bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200'
                }`}
                title={isListening ? 'แตะเพื่อหยุดฟัง' : 'แตะเพื่อพูดคำถาม'}
              >
                {isListening ? <MicOff className="w-4 h-4 animate-bounce" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder={isListening ? '🔴 กำลังฟังเสียงพูด... (พูดเสร็จแตะปุ่มไมค์อีกครั้ง)' : 'พิมพ์หรือกดปุ่มไมค์เพื่อพูดถาม...'}
                className={`flex-1 text-xs sm:text-sm border focus:border-orange-500 focus:bg-white focus:outline-none rounded-xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 transition-all ${
                  isListening ? 'bg-red-50/60 border-red-300 text-red-900 font-medium' : 'bg-orange-50/50 border-orange-200'
                }`}
              />

              <Button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || loading}
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl px-3.5 py-2.5 shadow-md shadow-orange-500/20 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
