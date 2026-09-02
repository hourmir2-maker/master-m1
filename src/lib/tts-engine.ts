/**
 * MASTER ม.1 — State-of-the-Art AI Voice Speech Engine (ครูพี่ MASTER Voice Engine)
 * ระบบสังเคราะห์เสียงพูดครูพี่ AI คุณภาพสูง เป็นธรรมชาติ ลื่นไหล ไม่กระตุก
 * รองรับภาษาไทย 100% พร้อมการแปลงสูตรคณิตศาสตร์และไวยากรณ์ภาษาอังกฤษเป็นคำอ่านที่ถูกต้อง
 */

let cachedVoices: SpeechSynthesisVoice[] = []
let isInitialized = false
let activeQueue: SpeechSynthesisUtterance[] = []
let currentOnEndCallback: (() => void) | null = null

export function initVoiceEngine(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  if (isInitialized) return

  const loadVoices = () => {
    try {
      const v = window.speechSynthesis.getVoices()
      if (v && v.length > 0) {
        cachedVoices = v
        isInitialized = true
      }
    } catch (e) {
      console.warn('Voice load error:', e)
    }
  }

  loadVoices()
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices
  }
}

export function getBestVoice(isThai: boolean): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null
  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices()
  }

  const voices = cachedVoices
  if (!voices || voices.length === 0) return null

  if (isThai) {
    // 1. Prioritize Microsoft Niwat (Natural male tutor voice)
    const niwat = voices.find(v => 
      (v.lang.startsWith('th') || v.lang === 'th-TH' || v.lang === 'th_TH') &&
      (v.name.toLowerCase().includes('niwat') || v.name.includes('นิวัฒน์'))
    )
    if (niwat) return niwat

    // 2. Prioritize Microsoft Premwadee / Natural Thai
    const premwadee = voices.find(v => 
      (v.lang.startsWith('th') || v.lang === 'th-TH' || v.lang === 'th_TH') &&
      (v.name.toLowerCase().includes('premwadee') || v.name.includes('natural'))
    )
    if (premwadee) return premwadee

    // 3. Google ภาษาไทย
    const googleThai = voices.find(v => 
      (v.lang.startsWith('th') || v.lang === 'th-TH' || v.lang === 'th_TH') &&
      v.name.includes('Google')
    )
    if (googleThai) return googleThai

    // 4. Any Thai voice (Kanya, Narisa, Siri Thai, etc.)
    const anyThai = voices.find(v => v.lang.startsWith('th') || v.lang === 'th-TH' || v.lang === 'th_TH')
    if (anyThai) return anyThai
  } else {
    // English Natural Voices
    const naturalEn = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny'))
    )
    if (naturalEn) return naturalEn
    const anyEn = voices.find(v => v.lang.startsWith('en'))
    if (anyEn) return anyEn
  }

  return voices[0] || null
}

export function preprocessSpeechText(text: string): string {
  if (!text) return ''

  let s = text
    // Remove Markdown formatting & emojis
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[*_~#💡⚡🎯✨👋🤖🏆🥇🥈🥉❤️💖🎉👑💎📘📖🔬🔢🗣️🇹🇭]/g, ' ')
    
    // Clean section headers & tags
    .replace(/【วิธีคิด】/g, 'วิธีคิดคือ ')
    .replace(/【.*?】/g, ' ')
    
    // Mathematical symbols & formula reading
    .replace(/\bQ\s*=\s*mc\s*Δt\b/gi, 'คิว เท่ากับ เอ็ม ซี เดลต้า ที')
    .replace(/\bQ\s*=\s*mc\s*Delta\s*t\b/gi, 'คิว เท่ากับ เอ็ม ซี เดลต้า ที')
    .replace(/Δt/g, 'เดลต้า ที')
    .replace(/√(\d+)/g, 'สแควรูท $1')
    .replace(/√/g, 'สแควรูท ')
    .replace(/π/g, 'พาย ')
    .replace(/a²/g, 'เอ ยกกำลังสอง')
    .replace(/b²/g, 'บี ยกกำลังสอง')
    .replace(/c²/g, 'ซี ยกกำลังสอง')
    .replace(/x²/g, 'เอ็กซ์ ยกกำลังสอง')
    .replace(/y²/g, 'วาย ยกกำลังสอง')
    .replace(/(\d+)²/g, '$1 ยกกำลังสอง')
    .replace(/(\d+)³/g, '$1 ยกกำลังสาม')
    .replace(/ห\.ร\.ม\./g, 'หอรอมอ')
    .replace(/ค\.ร\.น\./g, 'คอรอนอ')
    .replace(/O₂/g, 'ออกซิเจน')
    .replace(/CO₂/g, 'คาร์บอนไดออกไซด์')
    .replace(/H₂O/g, 'น้ำ เอช ทู โอ')
    .replace(/°C/g, 'องศาเซลเซียส')
    .replace(/%/g, ' เปอร์เซ็นต์')
    .replace(/÷/g, ' หารด้วย ')
    .replace(/×/g, ' คูณ ')
    .replace(/≠/g, ' ไม่เท่ากับ ')
    .replace(/≤/g, ' น้อยกว่าหรือเท่ากับ ')
    .replace(/≥/g, ' มากกว่าหรือเท่ากับ ')
    .replace(/→/g, ' จะได้ว่า ')
    
    // English Grammar Phonetics for Crystal Clear Thai TTS
    .replace(/\bV\.inf\b|\bV\.infinitive\b/gi, 'กริยาช่องเดิมไม่ผัน')
    .replace(/\bV\.ing\b/gi, 'กริยาเติม ไอ เอ็น จี')
    .replace(/\bV\.1\b|\bV1\b/gi, 'กริยาช่องหนึ่ง')
    .replace(/\bV\.2\b|\bV2\b/gi, 'กริยาช่องสอง')
    .replace(/\bV\.3\b|\bV3\b/gi, 'กริยาช่องสาม')
    .replace(/\bS\s*\+\s*/g, 'ประธาน ตามด้วย ')
    .replace(/\bIf-Clause\b/gi, 'อิฟ คลอส')
    .replace(/\bQuestion Tag\b/gi, 'เควสชัน แท็ก')
    .replace(/\bQuestion Tags\b/gi, 'เควสชัน แท็กส์')
    .replace(/\bPresent Simple\b/gi, 'เพรสเซนต์ ซิมเปิล')
    .replace(/\bPresent Continuous\b/gi, 'เพรสเซนต์ คอนทินิวอัส')
    .replace(/\bPast Simple\b/gi, 'พาสต์ ซิมเปิล')
    .replace(/\bPast Continuous\b/gi, 'พาสต์ คอนทินิวอัส')
    .replace(/\bFuture Simple\b/gi, 'ฟิวเจอร์ ซิมเปิล')
    .replace(/\bSubject-Verb Agreement\b/gi, 'ซับเจกต์ เวิร์บ อะกรีเมนต์')
    .replace(/\bis\/am\/are\b/gi, 'อิส แอม อาร์')
    .replace(/\bwas\/were\b/gi, 'วอส เวิร์')
    
    // Natural Breathing & Pauses (No robotic excessive commas)
    .replace(/\n\s*•/g, '. ')
    .replace(/\n\s*-\s*/g, '. ')
    .replace(/\n\s*(\d+)\.\s*/g, '. ข้อ $1 ')
    .replace(/\n+/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim()

  return s
}

export function splitIntoNaturalSentences(text: string): string[] {
  // Split by full stops, question marks, exclamation marks, or Thai natural clauses
  const rawChunks = text.split(/(?<=[.?!])\s+|(?<=[ฯ])\s*|\n+/)
  const cleanChunks: string[] = []

  rawChunks.forEach(chunk => {
    const trimmed = chunk.trim()
    if (!trimmed) return

    // If chunk is still too long (> 120 chars), break by comma or whitespace to avoid Chrome TTS cutoff
    if (trimmed.length > 120) {
      const sub = trimmed.split(/(?<=[,;])\s+/)
      sub.forEach(sc => {
        if (sc.trim()) cleanChunks.push(sc.trim())
      })
    } else {
      cleanChunks.push(trimmed)
    }
  })

  return cleanChunks.length > 0 ? cleanChunks : [text]
}

export interface SpeakOptions {
  rate?: number // 0.85 - 1.0 (default 0.92 for warm natural tutor pace)
  pitch?: number // 1.0
  onStart?: () => void
  onEnd?: () => void
  onError?: (err?: any) => void
}

export function stopSpeaking(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    activeQueue = []
    if (currentOnEndCallback) {
      currentOnEndCallback = null
    }
  } catch (e) {
    console.warn('Stop speech error:', e)
  }
}

export function speakNaturalText(rawText: string, options?: SpeakOptions): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

  stopSpeaking()
  initVoiceEngine()

  const cleanText = preprocessSpeechText(rawText)
  if (!cleanText) {
    options?.onEnd?.()
    return
  }

  const sentences = splitIntoNaturalSentences(cleanText)
  const isThai = /[ก-๙]/.test(cleanText)
  const voice = getBestVoice(isThai)
  const rate = options?.rate ?? (isThai ? 0.90 : 0.92)
  const pitch = options?.pitch ?? 1.02

  let currentIndex = 0
  options?.onStart?.()

  const speakNextSentence = () => {
    if (currentIndex >= sentences.length) {
      currentOnEndCallback = null
      options?.onEnd?.()
      return
    }

    const sentenceText = sentences[currentIndex]
    currentIndex++

    const utterance = new SpeechSynthesisUtterance(sentenceText)
    utterance.lang = isThai ? 'th-TH' : 'en-US'
    utterance.rate = rate
    utterance.pitch = pitch
    if (voice) utterance.voice = voice

    utterance.onend = () => {
      // Small natural breath pause between sentences (150ms)
      setTimeout(speakNextSentence, 150)
    }

    utterance.onerror = (e) => {
      console.warn('TTS sentence error:', e)
      options?.onError?.(e)
      speakNextSentence()
    }

    window.speechSynthesis.speak(utterance)
  }

  currentOnEndCallback = options?.onEnd || null
  speakNextSentence()
}
