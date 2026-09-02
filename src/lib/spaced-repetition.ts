/**
 * MASTER ม.1 — Adaptive Spaced Repetition Engine (SM-2 / Leitner Algorithm)
 * ระบบทบทวนจุดอ่อนอัจฉริยะตามวงรอบความจำ (Day 1 ➔ Day 3 ➔ Day 7 ➔ Day 14 Mastered)
 * ช่วยให้นักเรียนอุดจุดผิดพลาด (Mistake Bank) ให้กลายเป็นคะแนนเต็ม 100%
 */

export interface SpacedRepetitionItem {
  id: string
  questionId: string
  subject: string
  moduleId: string
  questionText: string
  options: string[]
  correctAnswer: string
  explanation: string
  tip?: string
  boxLevel: number // 1: Day 1, 2: Day 3, 3: Day 7, 4: Mastered (Day 14)
  lastReviewedAt: string
  nextReviewDate: string
  consecutiveCorrect: number
  totalMistakes: number
}

const INTERVAL_DAYS = [1, 3, 7, 14]

export function calculateNextReview(currentBox: number, isCorrect: boolean): { nextBox: number; nextDate: string } {
  const now = new Date()
  let nextBox = currentBox

  if (isCorrect) {
    nextBox = Math.min(4, currentBox + 1)
  } else {
    nextBox = 1 // Reset to Box 1 for immediate 24h reinforcement
  }

  const daysToAdd = INTERVAL_DAYS[nextBox - 1] || 1
  now.setDate(now.getDate() + daysToAdd)

  return {
    nextBox,
    nextDate: now.toISOString().split('T')[0]
  }
}

export function getSpacedRepetitionQueue(items: SpacedRepetitionItem[]): {
  dueToday: SpacedRepetitionItem[]
  upcoming: SpacedRepetitionItem[]
  mastered: SpacedRepetitionItem[]
} {
  const todayStr = new Date().toISOString().split('T')[0]

  const dueToday: SpacedRepetitionItem[] = []
  const upcoming: SpacedRepetitionItem[] = []
  const mastered: SpacedRepetitionItem[] = []

  items.forEach(item => {
    if (item.boxLevel >= 4 && item.consecutiveCorrect >= 3) {
      mastered.push(item)
    } else if (item.nextReviewDate <= todayStr) {
      dueToday.push(item)
    } else {
      upcoming.push(item)
    }
  })

  return { dueToday, upcoming, mastered }
}

export function loadLocalSpacedRepetitionItems(): SpacedRepetitionItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('master_m1_spaced_repetition_queue')
    if (raw) return JSON.parse(raw)
    
    // Fallback: convert mistake bank
    const mistakesRaw = localStorage.getItem('master_m1_mistake_bank')
    if (mistakesRaw) {
      const mistakes: any[] = JSON.parse(mistakesRaw)
      return mistakes.map(m => ({
        id: m.id || `sr_${Date.now()}_${Math.random()}`,
        questionId: m.id || m.questionId || 'q',
        subject: m.subject || 'math',
        moduleId: m.moduleId || 'numbers_basics',
        questionText: m.question || m.questionText || '',
        options: m.options || [],
        correctAnswer: m.correctAnswer || '',
        explanation: m.explanation || '',
        tip: m.tip,
        boxLevel: 1,
        lastReviewedAt: new Date().toISOString(),
        nextReviewDate: new Date().toISOString().split('T')[0],
        consecutiveCorrect: 0,
        totalMistakes: 1
      }))
    }
    return []
  } catch (e) {
    console.warn('Load spaced repetition items error:', e)
    return []
  }
}

export function saveLocalSpacedRepetitionItems(items: SpacedRepetitionItem[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('master_m1_spaced_repetition_queue', JSON.stringify(items))
  } catch (e) {
    console.warn('Save spaced repetition items error:', e)
  }
}
