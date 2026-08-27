/**
 * MASTER ม.1 — Gamification, Daily Streak & Badges System
 */

export interface Badge {
  id: string
  title: string
  description: string
  icon: string
  category: 'math' | 'science' | 'english' | 'streak' | 'exam' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: string
}

export interface GamificationState {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
  totalXp: number
  level: number
  unlockedBadgeIds: string[]
}

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_step',
    title: 'ก้าวแรกสู่ ม.1',
    description: 'ทำแบบฝึกหัดบทเรียนแรกสำเร็จ',
    icon: '🌱',
    category: 'special',
    rarity: 'common'
  },
  {
    id: 'math_speedster',
    title: 'เซียนคิดเลขเร็ว',
    description: 'ทำคะแนนวิชาคณิตศาสตร์ได้ 100% ในบทใดก็ได้',
    icon: '⚡',
    category: 'math',
    rarity: 'rare'
  },
  {
    id: 'science_detective',
    title: 'นักสืบวิทย์ยอดเยี่ยม',
    description: 'ทำคะแนนวิทยาศาสตร์ได้ 100% ในบทใดก็ได้',
    icon: '🔬',
    category: 'science',
    rarity: 'rare'
  },
  {
    id: 'grammar_champion',
    title: 'ผู้พิชิตไวยากรณ์',
    description: 'ทำคะแนนภาษาอังกฤษได้ 100% ในบทใดก็ได้',
    icon: '🇬🇧',
    category: 'english',
    rarity: 'rare'
  },
  {
    id: 'streak_3',
    title: 'ไฟแรง 3 วันติด',
    description: 'เข้าสู่ระบบและฝึกทำโจทย์ต่อเนื่อง 3 วัน',
    icon: '🔥',
    category: 'streak',
    rarity: 'common'
  },
  {
    id: 'streak_7',
    title: 'เปลวเพลิง 7 วัน',
    description: 'เข้าสู่ระบบและฝึกทำโจทย์ต่อเนื่อง 7 วัน',
    icon: '💥',
    category: 'streak',
    rarity: 'rare'
  },
  {
    id: 'mock_exam_taker',
    title: 'ผู้กล้าลงสนามสอบ',
    description: 'ทำข้อสอบ Mock Exam 45 นาทีจนจบชุดแรก',
    icon: '⏱️',
    category: 'exam',
    rarity: 'rare'
  },
  {
    id: 'mock_exam_high_scorer',
    title: 'หัวกะทิสนามสอบ',
    description: 'ทำคะแนน Mock Exam ได้ตั้งแต่ 80% ขึ้นไป',
    icon: '🏆',
    category: 'exam',
    rarity: 'epic'
  },
  {
    id: 'flashcard_master',
    title: 'จอมจำสูตรลัด',
    description: 'ท่องจำ Flashcard สูตรลัดแม่นยำครบ 20 การ์ด',
    icon: '🃏',
    category: 'special',
    rarity: 'rare'
  },
  {
    id: 'master_all_rounder',
    title: 'ยอดอัจฉริยะ 3 วิชา',
    description: 'เรียนจบผ่านเกณฑ์ครบทั้ง 24 โมดูล',
    icon: '👑',
    category: 'special',
    rarity: 'legendary'
  }
]

const STORAGE_KEY = 'master_m1_gamification'

export function getGamificationState(): GamificationState {
  if (typeof window === 'undefined') {
    return {
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalXp: 50,
      level: 1,
      unlockedBadgeIds: ['first_step']
    }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const today = new Date().toISOString().split('T')[0]
      const initial: GamificationState = {
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: today,
        totalXp: 50,
        level: 1,
        unlockedBadgeIds: ['first_step']
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
      return initial
    }
    return JSON.parse(raw)
  } catch {
    return {
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalXp: 50,
      level: 1,
      unlockedBadgeIds: ['first_step']
    }
  }
}

export function updateDailyStreak(): GamificationState {
  const state = getGamificationState()
  const today = new Date().toISOString().split('T')[0]
  
  if (state.lastActiveDate === today) {
    return state
  }

  const lastDate = new Date(state.lastActiveDate)
  const currentDate = new Date(today)
  const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  let newStreak = state.currentStreak
  if (diffDays === 1) {
    newStreak += 1
  } else if (diffDays > 1) {
    newStreak = 1
  }

  const longestStreak = Math.max(state.longestStreak, newStreak)
  const newBadgeIds = [...state.unlockedBadgeIds]

  if (newStreak >= 3 && !newBadgeIds.includes('streak_3')) {
    newBadgeIds.push('streak_3')
  }
  if (newStreak >= 7 && !newBadgeIds.includes('streak_7')) {
    newBadgeIds.push('streak_7')
  }

  const updated: GamificationState = {
    ...state,
    currentStreak: newStreak,
    longestStreak,
    lastActiveDate: today,
    totalXp: state.totalXp + 20, // Daily login XP
    level: Math.floor((state.totalXp + 20) / 100) + 1,
    unlockedBadgeIds: newBadgeIds
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }
  return updated
}

export function awardBadge(badgeId: string, xpBonus: number = 50): { state: GamificationState; newlyUnlocked: boolean } {
  const state = getGamificationState()
  if (state.unlockedBadgeIds.includes(badgeId)) {
    return { state, newlyUnlocked: false }
  }

  const newBadgeIds = [...state.unlockedBadgeIds, badgeId]
  const newXp = state.totalXp + xpBonus
  const newLevel = Math.floor(newXp / 100) + 1

  const updated: GamificationState = {
    ...state,
    totalXp: newXp,
    level: newLevel,
    unlockedBadgeIds: newBadgeIds
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }
  return { state: updated, newlyUnlocked: true }
}
