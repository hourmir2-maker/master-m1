/**
 * MASTER ม.1 — Gamification, Daily Streak & Badges System
 * ระบบแรงจูงใจ ไฟการเรียนต่อเนื่อง (Daily Streak), เหรียญตราเกียรติยศ (Badges) ครบ 56 โมดูล และระบบวันพักสมอง (Streak Freeze)
 */

export interface Badge {
  id: string
  title: string
  description: string
  icon: string
  category: 'math' | 'science' | 'english' | 'thai' | 'streak' | 'exam' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpReward: number
  unlockedAt?: string
}

export interface GamificationState {
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
  totalXp: number
  level: number
  streakFreezes: number // จำนวนวันพักสมองสะสม (ไม่ตัดไฟ streak)
  lastFreezeUsedDate?: string
  unlockedBadgeIds: string[]
}

export const ALL_BADGES: Badge[] = [
  // 1. Beginner & Milestones
  {
    id: 'first_step',
    title: 'ก้าวแรกสู่ ม.1',
    description: 'ฝึกทำแบบฝึกหัดบทเรียนแรกสำเร็จในระบบ',
    icon: '🌱',
    category: 'special',
    rarity: 'common',
    xpReward: 50
  },
  // 2. Daily Streak Badges
  {
    id: 'streak_3',
    title: 'ไฟแรง 3 วันติด',
    description: 'เข้าสู่ระบบและฝึกทำโจทย์ต่อเนื่อง 3 วัน',
    icon: '🔥',
    category: 'streak',
    rarity: 'common',
    xpReward: 100
  },
  {
    id: 'streak_7',
    title: 'เปลวเพลิง 7 วัน',
    description: 'เข้าสู่ระบบและฝึกทำโจทย์ต่อเนื่อง 7 วันเต็ม',
    icon: '💥',
    category: 'streak',
    rarity: 'rare',
    xpReward: 250
  },
  {
    id: 'streak_14',
    title: 'มังกรเพลิง 14 วัน',
    description: 'ฝึกทำโจทย์สม่ำเสมอต่อเนื่อง 2 สัปดาห์',
    icon: '⚡',
    category: 'streak',
    rarity: 'epic',
    xpReward: 500
  },
  {
    id: 'streak_30',
    title: 'ราชันย์เพลิง 30 วัน',
    description: 'สุดยอดวินัยการเรียนต่อเนื่อง 1 เดือนเต็ม',
    icon: '🌟',
    category: 'streak',
    rarity: 'legendary',
    xpReward: 1000
  },
  // 3. Mathematics
  {
    id: 'math_speedster',
    title: 'เซียนคิดเลขเร็ว 3 วิ',
    description: 'ทำคะแนนวิชาคณิตศาสตร์ได้ 100% เต็มในบทใดก็ได้',
    icon: '🔢',
    category: 'math',
    rarity: 'rare',
    xpReward: 150
  },
  {
    id: 'math_champion_16',
    title: 'ปรมาจารย์ 16 บทคณิต',
    description: 'ผ่านเกณฑ์บทเรียนคณิตศาสตร์ครบทั้ง 16 โมดูล',
    icon: '📐',
    category: 'math',
    rarity: 'epic',
    xpReward: 500
  },
  // 4. Science
  {
    id: 'science_detective',
    title: 'นักสืบวิทย์ยอดเยี่ยม',
    description: 'ทำคะแนนวิทยาศาสตร์ได้ 100% เต็มในบทใดก็ได้',
    icon: '🔬',
    category: 'science',
    rarity: 'rare',
    xpReward: 150
  },
  {
    id: 'science_pharma_ready',
    title: 'รากฐานเภสัช-การแพทย์',
    description: 'ผ่านเกณฑ์บทเรียนวิทยาศาสตร์ครบทั้ง 16 โมดูล',
    icon: '💊',
    category: 'science',
    rarity: 'epic',
    xpReward: 500
  },
  // 5. English
  {
    id: 'grammar_champion',
    title: 'ผู้พิชิตไวยากรณ์ 3S',
    description: 'ทำคะแนนภาษาอังกฤษได้ 100% เต็มในบทใดก็ได้',
    icon: '🇬🇧',
    category: 'english',
    rarity: 'rare',
    xpReward: 150
  },
  {
    id: 'oxford_vocab_titan',
    title: 'ไททัน Oxford 3000',
    description: 'ผ่านเกณฑ์บทเรียนภาษาอังกฤษครบทั้ง 16 โมดูล',
    icon: '🗣️',
    category: 'english',
    rarity: 'epic',
    xpReward: 500
  },
  // 6. Thai Language
  {
    id: 'thai_master_obec',
    title: 'ยอดฝีมือภาษาไทย สพฐ.',
    description: 'ทำคะแนนภาษาไทยได้ 100% เต็มในบทใดก็ได้',
    icon: '🇹🇭',
    category: 'thai',
    rarity: 'rare',
    xpReward: 150
  },
  {
    id: 'thai_legend_8',
    title: 'ปราชญ์ภาษาไทย 8 โมดูล',
    description: 'ผ่านเกณฑ์บทเรียนภาษาไทยมาตรฐาน สพฐ. ครบ 8 บท',
    icon: '📜',
    category: 'thai',
    rarity: 'epic',
    xpReward: 400
  },
  // 7. Exams & Competitions
  {
    id: 'onet_high_scorer',
    title: 'อัศวินสนามสอบ O-NET',
    description: 'ทำคะแนนสนามจำลอง O-NET 2570 ได้ตั้งแต่ 80 คะแนนขึ้นไป',
    icon: '🏆',
    category: 'exam',
    rarity: 'epic',
    xpReward: 500
  },
  {
    id: 'flashcard_master',
    title: 'จอมจำสูตรลัด 3 วิ',
    description: 'ทบทวนการ์ด Flashcards จำสูตรลัดแม่นยำ',
    icon: '🃏',
    category: 'special',
    rarity: 'rare',
    xpReward: 150
  },
  // 8. Ultimate Master Achievement
  {
    id: 'master_all_rounder',
    title: 'มหาเทพ 56 โมดูลเต็ม',
    description: 'เรียนจบและผ่านเกณฑ์ครบทั้ง 56 โมดูล (สพฐ. 2551 ปรับปรุง 2560)',
    icon: '👑',
    category: 'special',
    rarity: 'legendary',
    xpReward: 2000
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
      streakFreezes: 2,
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
        streakFreezes: 2,
        unlockedBadgeIds: ['first_step']
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
      return initial
    }
    const parsed = JSON.parse(raw)
    return {
      currentStreak: parsed.currentStreak || 1,
      longestStreak: parsed.longestStreak || 1,
      lastActiveDate: parsed.lastActiveDate || new Date().toISOString().split('T')[0],
      totalXp: parsed.totalXp || 50,
      level: parsed.level || 1,
      streakFreezes: typeof parsed.streakFreezes === 'number' ? parsed.streakFreezes : 2,
      lastFreezeUsedDate: parsed.lastFreezeUsedDate,
      unlockedBadgeIds: parsed.unlockedBadgeIds || ['first_step']
    }
  } catch {
    return {
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalXp: 50,
      level: 1,
      streakFreezes: 2,
      unlockedBadgeIds: ['first_step']
    }
  }
}

/**
 * อัปเดต Daily Streak เมื่อผู้ใช้เข้าใช้งาน พร้อมระบบ Streak Freeze (วันพักสมอง)
 */
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
  let newFreezes = state.streakFreezes
  let freezeUsedDate = state.lastFreezeUsedDate

  if (diffDays === 1) {
    // ใช้งานต่อเนื่องปกติ วันถัดไป
    newStreak += 1
  } else if (diffDays === 2 && newFreezes > 0) {
    // ขาดไป 1 วัน แต่มี Streak Freeze (วันพักสมอง) ➔ รักษาสถิติไฟต่อเนื่องไว้ได้!
    newFreezes -= 1
    freezeUsedDate = today
    newStreak += 1
  } else if (diffDays > 1) {
    // ขาดเกินกว่านั้น ➔ รีเซ็ตไฟเป็น 1 และคืนสิทธิ์ Streak Freeze ให้ 2 วัน
    newStreak = 1
    newFreezes = 2
  }

  const longestStreak = Math.max(state.longestStreak, newStreak)
  const newBadgeIds = [...state.unlockedBadgeIds]

  // Streak Milestones
  if (newStreak >= 3 && !newBadgeIds.includes('streak_3')) newBadgeIds.push('streak_3')
  if (newStreak >= 7 && !newBadgeIds.includes('streak_7')) newBadgeIds.push('streak_7')
  if (newStreak >= 14 && !newBadgeIds.includes('streak_14')) newBadgeIds.push('streak_14')
  if (newStreak >= 30 && !newBadgeIds.includes('streak_30')) newBadgeIds.push('streak_30')

  const dailyXpBonus = 25
  const updatedXp = state.totalXp + dailyXpBonus
  const updatedLevel = Math.floor(updatedXp / 100) + 1

  const updated: GamificationState = {
    ...state,
    currentStreak: newStreak,
    longestStreak,
    lastActiveDate: today,
    totalXp: updatedXp,
    level: updatedLevel,
    streakFreezes: newFreezes,
    lastFreezeUsedDate: freezeUsedDate,
    unlockedBadgeIds: newBadgeIds
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }
  return updated
}

/**
 * มอบ Badge และ XP รางวัล
 */
export function awardBadge(badgeId: string, customXpBonus?: number): { state: GamificationState; newlyUnlocked: boolean } {
  const state = getGamificationState()
  if (state.unlockedBadgeIds.includes(badgeId)) {
    return { state, newlyUnlocked: false }
  }

  const targetBadge = ALL_BADGES.find(b => b.id === badgeId)
  const xpBonus = customXpBonus ?? (targetBadge?.xpReward || 50)

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

/**
 * ตรวจสอบความก้าวหน้าจริง 100% จาก Supabase/LocalStorage เพื่อปลดล็อก Badge อัตโนมัติ (Rule 25)
 */
export function evaluateAndAwardBadges(
  progressList: Array<{ subject: string; module_id?: string; moduleId?: string; score?: number; completed?: boolean }>
): GamificationState {
  let state = getGamificationState()
  const badgesToAdd: string[] = []

  const completedItems = progressList.filter(p => p.completed)
  
  if (completedItems.length > 0 && !state.unlockedBadgeIds.includes('first_step')) {
    badgesToAdd.push('first_step')
  }

  // 1. Math Badges
  const mathPassed = completedItems.filter(p => p.subject === 'math')
  const hasPerfectMath = progressList.some(p => p.subject === 'math' && (p.score || 0) === 100)
  if (hasPerfectMath && !state.unlockedBadgeIds.includes('math_speedster')) badgesToAdd.push('math_speedster')
  if (mathPassed.length >= 16 && !state.unlockedBadgeIds.includes('math_champion_16')) badgesToAdd.push('math_champion_16')

  // 2. Science Badges
  const sciPassed = completedItems.filter(p => p.subject === 'science')
  const hasPerfectSci = progressList.some(p => p.subject === 'science' && (p.score || 0) === 100)
  if (hasPerfectSci && !state.unlockedBadgeIds.includes('science_detective')) badgesToAdd.push('science_detective')
  if (sciPassed.length >= 16 && !state.unlockedBadgeIds.includes('science_pharma_ready')) badgesToAdd.push('science_pharma_ready')

  // 3. English Badges
  const engPassed = completedItems.filter(p => p.subject === 'english')
  const hasPerfectEng = progressList.some(p => p.subject === 'english' && (p.score || 0) === 100)
  if (hasPerfectEng && !state.unlockedBadgeIds.includes('grammar_champion')) badgesToAdd.push('grammar_champion')
  if (engPassed.length >= 16 && !state.unlockedBadgeIds.includes('oxford_vocab_titan')) badgesToAdd.push('oxford_vocab_titan')

  // 4. Thai Badges
  const thaiPassed = completedItems.filter(p => p.subject === 'thai')
  const hasPerfectThai = progressList.some(p => p.subject === 'thai' && (p.score || 0) === 100)
  if (hasPerfectThai && !state.unlockedBadgeIds.includes('thai_master_obec')) badgesToAdd.push('thai_master_obec')
  if (thaiPassed.length >= 8 && !state.unlockedBadgeIds.includes('thai_legend_8')) badgesToAdd.push('thai_legend_8')

  // 5. O-NET High Scorer
  const hasHighOnet = progressList.some(p => p.subject?.startsWith('onet_') && (p.score || 0) >= 80)
  if (hasHighOnet && !state.unlockedBadgeIds.includes('onet_high_scorer')) badgesToAdd.push('onet_high_scorer')

  // 6. 56-Module Master All-Rounder
  if (completedItems.length >= 56 && !state.unlockedBadgeIds.includes('master_all_rounder')) {
    badgesToAdd.push('master_all_rounder')
  }

  if (badgesToAdd.length > 0) {
    let newXp = state.totalXp
    const finalBadgeIds = [...state.unlockedBadgeIds]

    badgesToAdd.forEach(bId => {
      if (!finalBadgeIds.includes(bId)) {
        finalBadgeIds.push(bId)
        const badgeObj = ALL_BADGES.find(b => b.id === bId)
        newXp += (badgeObj?.xpReward || 50)
      }
    })

    const updatedState: GamificationState = {
      ...state,
      totalXp: newXp,
      level: Math.floor(newXp / 100) + 1,
      unlockedBadgeIds: finalBadgeIds
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState))
    }
    return updatedState
  }

  return state
}
