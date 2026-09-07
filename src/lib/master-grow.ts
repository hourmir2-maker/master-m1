/**
 * MASTER-GROW Coaching Engine
 * แพลตฟอร์มการเรียนรู้และเตรียมสอบ MASTER ม.1 (สพฐ. 2551 / 2560)
 * 
 * สถาปัตยกรรม 4 เสาหลัก:
 * 1. G - Goal Mastery (GRI 0-100% & Target Profiles)
 * 2. R - Real-time Cloud Telemetry (Score Leakage Detection 56 โมดูล)
 * 3. O - Optimized Micro-Pathway (สูตรลัด 3 วินาที & จุดลวง สทศ.)
 * 4. W - Win & Cognitive Reframing (ปรับจิตวิทยาชัยชนะ & Parent Coaching Telegram)
 * 
 * Co-designed with AiPASS (GPT-5.6 Terra) & Antigravity
 */

export type GoalType = 'gifted_m1' | 'onet_2570' | 'nt_p3' | 'rt_p1' | 'general'

export interface GoalProfile {
  id: string
  title: string
  targetCohort: string
  nearTermGoal: string
  longTermAspiration?: string
  targetGRI: number
  keySubjects: Array<'math' | 'science' | 'thai' | 'english'>
}

export const PRESET_GOALS: Record<string, GoalProfile> = {
  fortune_gifted: {
    id: 'fortune_gifted',
    title: 'ม.1 Gifted วิทย์-คณิต สู่ เภสัชกร 💊',
    targetCohort: 'ป.6 เตรียมสอบเข้า ม.1',
    nearTermGoal: 'สอบติด ม.1 ห้องเรียนพิเศษ Gifted วิทย์-คณิต',
    longTermAspiration: 'ศึกษาต่อระดับอุดมศึกษา สาขาเภสัชศาสตร์ (Doctor of Pharmacy)',
    targetGRI: 85,
    keySubjects: ['math', 'science', 'english', 'thai']
  },
  onet_2570: {
    id: 'onet_2570',
    title: 'พิชิต O-NET 2570 ระดับประเทศ',
    targetCohort: 'ป.6 ประเมินระดับชาติ',
    nearTermGoal: 'คะแนนเฉลี่ยรวม 4 วิชา สูงกว่า 80% ตามผัง สทศ.',
    targetGRI: 80,
    keySubjects: ['math', 'science', 'thai', 'english']
  },
  nt_p3: {
    id: 'nt_p3',
    title: 'ทดสอบความสามารถระดับชาติ (NT ป.3)',
    targetCohort: 'ป.3',
    nearTermGoal: 'สมรรถนะคณิตศาสตร์และภาษาไทยระดับดีเยี่ยม',
    targetGRI: 75,
    keySubjects: ['math', 'thai']
  }
}

export interface GoalReadinessResult {
  griScore: number // 0 - 100
  evidenceConfidence: number // 0 - 1 (0-100%)
  readinessLabel: 'กำลังเก็บข้อมูล' | 'เริ่มจากจุดคุ้มที่สุด' | 'กำลังสร้างฐาน' | 'ใกล้เป้าหมาย' | 'พร้อมท้าทาย'
  components: {
    mastery: number // 30%
    coverage: number // 20%
    retention: number // 15%
    examFit: number // 15%
    pacing: number // 10%
    calibration: number // 5%
    consistency: number // 5%
  }
  summaryText: string
}

export interface ScoreLeakage {
  moduleId: string
  subject: string
  title: string
  leakageType: 'concept_gap' | 'trap_vulnerability' | 'time_pressure' | 'retention_decay'
  severityScore: number // 0 - 100
  trapDescription?: string
  recommendedMove: string
}

export interface TrapCard {
  id: string
  subject: string
  moduleTitle: string
  trapQuestion: string
  redFlag: string
  escapeMove3Sec: string
  exampleCodeOrFormula: string
}

export const SAMPLE_TRAP_CARDS: TrapCard[] = [
  {
    id: 'math-fraction-add',
    subject: 'math',
    moduleTitle: 'การบวกลบเศษส่วน',
    trapQuestion: 'เห็น 1/3 + 1/4 แล้วเผลอบวกเป็น (1+1)/(3+4) = 2/7 ใช่ไหม?',
    redFlag: 'ตัวส่วนไม่เท่ากัน ห้ามนำเศษบวกเศษ ส่วนบวกส่วนเด็ดขาด!',
    escapeMove3Sec: 'ทำส่วนให้เท่ากันด้วย ค.ร.น. (12) ➔ 4/12 + 3/12 = 7/12',
    exampleCodeOrFormula: 'a/b + c/d = (ad + bc) / bd'
  },
  {
    id: 'science-series-parallel',
    subject: 'science',
    moduleTitle: 'วงจรไฟฟ้าเบื้องต้น',
    trapQuestion: 'ถอดหลอดไฟ 1 หลอดในวงจรขนาน แล้วคิดว่าหลอดอื่นจะดับตาม?',
    redFlag: 'วงจรขนานกระแสไฟฟ้าแยกไหลคนละสาย!',
    escapeMove3Sec: 'ท่องจำ: อนุกรมสายเดียวขาดดับหมด | ขนานแยกสายขาดหลอดยังติด',
    exampleCodeOrFormula: 'Parallel Circuit: Independent Branches'
  },
  {
    id: 'thai-topic-sentence',
    subject: 'thai',
    moduleTitle: 'การอ่านจับใจความสำคัญ',
    trapQuestion: 'เลือกประโยคที่มีคำว่า "เช่น" หรือ "ได้แก่" เป็นใจความสำคัญ?',
    redFlag: 'คำว่า เช่น, ได้แก่, อาทิ คือ "พลความ" (ส่วนขยายประกอบตัวอย่าง)',
    escapeMove3Sec: 'ตัดส่วนยกตัวอย่างทิ้ง ➔ ใจความหลักมักอยู่ต้นหรือท้ายย่อหน้า',
    exampleCodeOrFormula: 'ใจความหลัก = ประโยคสรุปที่ไม่มีคำขยายตัวอย่าง'
  },
  {
    id: 'english-part-of-speech',
    subject: 'english',
    moduleTitle: 'Subject-Verb Agreement',
    trapQuestion: 'เห็นประโยค The quality of these apples (is/are) good แล้วเลือก are เพราะตามหลัง apples?',
    redFlag: 'คำนามหน้า of คือประธานแท้ (The quality เป็นเอกพจน์)!',
    escapeMove3Sec: 'มองข้าม [of preposition phrase] ➔ The quality [of apples] IS good',
    exampleCodeOrFormula: 'Singular Subject + Singular Verb (is)'
  }
]

/**
 * 1. G — Calculate Goal Readiness Index (GRI)
 */
export function calculateGoalReadiness(
  progressList: Array<{ subject: string; module_id?: string; score?: number; completed: boolean }>,
  targetGoal: GoalProfile = PRESET_GOALS.fortune_gifted
): GoalReadinessResult {
  const totalModulesTarget = 56
  const completedModules = progressList.filter(p => p.completed)
  
  // 1. Mastery (30%) - Average score of completed modules
  const scores = completedModules.map(p => p.score || 0)
  const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length) / 100 : 0
  const mastery = Math.min(1, Math.max(0, avgScore))

  // 2. Coverage (20%) - Proportion of target modules completed with valid evidence
  const coverage = Math.min(1, completedModules.length / totalModulesTarget)

  // 3. Retention (15%) - Consistency of high scores
  const highScored = completedModules.filter(p => (p.score || 0) >= 80).length
  const retention = completedModules.length > 0 ? highScored / completedModules.length : 0

  // 4. ExamFit (15%) - Weight in critical subjects (Math & Science for Gifted)
  const mathSciCompleted = completedModules.filter(p => p.subject === 'math' || p.subject === 'science').length
  const examFit = Math.min(1, mathSciCompleted / 28)

  // 5. Pacing (10%)
  const pacing = Math.min(1, (completedModules.length * 1.2) / totalModulesTarget)

  // 6. Calibration (5%) & 7. Consistency (5%)
  const calibration = 0.85
  const consistency = completedModules.length >= 10 ? 0.95 : 0.60

  // GRI Composite Formula
  const griRaw = 100 * (
    0.30 * mastery +
    0.20 * coverage +
    0.15 * retention +
    0.15 * examFit +
    0.10 * pacing +
    0.05 * calibration +
    0.05 * consistency
  )
  const griScore = Math.round(Math.min(100, Math.max(0, griRaw)))

  // Evidence confidence (how much data we have)
  const evidenceConfidence = Math.min(1, completedModules.length / 20)

  let readinessLabel: GoalReadinessResult['readinessLabel'] = 'กำลังเก็บข้อมูล'
  if (evidenceConfidence < 0.25) {
    readinessLabel = 'กำลังเก็บข้อมูล'
  } else if (griScore >= 80) {
    readinessLabel = 'พร้อมท้าทาย'
  } else if (griScore >= 60) {
    readinessLabel = 'ใกล้เป้าหมาย'
  } else if (griScore >= 40) {
    readinessLabel = 'กำลังสร้างฐาน'
  } else {
    readinessLabel = 'เริ่มจากจุดคุ้มที่สุด'
  }

  const summaryText = `Goal Readiness Index (GRI): ${griScore}/100 [${readinessLabel}] (ความน่าเชื่อถือของข้อมูล ${Math.round(evidenceConfidence * 100)}%)`

  return {
    griScore,
    evidenceConfidence,
    readinessLabel,
    components: {
      mastery: Math.round(mastery * 100),
      coverage: Math.round(coverage * 100),
      retention: Math.round(retention * 100),
      examFit: Math.round(examFit * 100),
      pacing: Math.round(pacing * 100),
      calibration: Math.round(calibration * 100),
      consistency: Math.round(consistency * 100)
    },
    summaryText
  }
}

/**
 * 2. R — Detect Score Leakage from authentic attempts
 */
export function detectScoreLeakage(
  progressList: Array<{ subject: string; module_id?: string; score?: number; completed: boolean }>
): ScoreLeakage[] {
  const leakages: ScoreLeakage[] = []

  for (const p of progressList) {
    const score = p.score || 0
    if (score < 80) {
      let leakageType: ScoreLeakage['leakageType'] = 'trap_vulnerability'
      if (score < 50) leakageType = 'concept_gap'
      else if (score < 70) leakageType = 'time_pressure'

      const matchedTrap = SAMPLE_TRAP_CARDS.find(t => t.subject === p.subject)

      leakages.push({
        moduleId: p.module_id || p.subject,
        subject: p.subject,
        title: matchedTrap ? matchedTrap.moduleTitle : (p.module_id || p.subject),
        leakageType,
        severityScore: Math.round(100 - score),
        trapDescription: matchedTrap?.trapQuestion,
        recommendedMove: matchedTrap ? matchedTrap.escapeMove3Sec : 'ทบทวนสรุปสาระสำคัญและคลิกทำแบบฝึกหัดสปีดรัน 3 วินาที'
      })
    }
  }

  // Sort by severity descending
  return leakages.sort((a, b) => b.severityScore - a.severityScore).slice(0, 3)
}

/**
 * 4. W — Generate Cognitive Reframing Message for Student (Growth Mindset)
 */
export function getCognitiveReframingMessage(
  studentName: string,
  subject: string,
  moduleTitle: string,
  score: number
): { studentNotice: string; parentCoachingTip: string } {
  const isFortune = studentName.includes('ภูมิรพีร์') || studentName.includes('ฟอร์จูน')
  const nameDisplay = isFortune ? 'น้องฟอร์จูน' : studentName

  let studentNotice = ''
  let parentCoachingTip = ''

  if (subject.includes('math')) {
    studentNotice = `🌟 ${nameDisplay} ครับ ข้อนี้ไม่ใช่เพราะเราทำเลขไม่ได้นะ แต่โจทย์ข้อนี้แอบซ่อน "จุดลวง สทศ." เรื่อง ${moduleTitle} ไว้! จำกฎ 3 วินาทีนี้ไว้ให้แม่น ในห้องสอบจริงเราจะแซงหน้าคู่แข่งทันที +5 คะแนน!`
    parentCoachingTip = `💡 คำแนะนำสำหรับคุณพ่อ: น้องกำลังฝึกฝนเรื่อง ${moduleTitle} จุดนี้แก้ได้ง่ายมากเพียงชวนน้องทบทวน "สูตรลัด 3 วิ" สัก 2 นาที ไม่ต้องกดดันคะแนนครับ น้องทำได้ดีมากแล้ว`
  } else if (subject.includes('science')) {
    studentNotice = `🔬 ยอดเยี่ยมมาก ${nameDisplay}! การทดลองนี้ทำให้เราจับจุดสำคัญของ ${moduleTitle} ได้แล้ว สลับแนวคิดเพียงนิดเดียวก็จะได้คะแนนเต็ม 100% แล้วครับ!`
    parentCoachingTip = `💡 คำแนะนำสำหรับคุณพ่อ: น้องมีทักษะการสังเกตวิทยาศาสตร์ที่ดี เรื่อง ${moduleTitle} ชวนน้องดูคลิปสรุปสั้น 3 นาทีในระบบด้วยกันจะช่วยให้น้องจำติดตาขึ้นทันทีครับ`
  } else if (subject.includes('english')) {
    studentNotice = `🗣️ Good job ${nameDisplay}! ข้อนี้คำบอกใบ้อยู่หน้า-หลังช่องว่าง 2 คำ ครั้งต่อไปใช้เทคนิคตัดช้อยส์ 3 วินาที จะตอบได้แม่นยำแน่นอน!`
    parentCoachingTip = `💡 คำแนะนำสำหรับคุณพ่อ: น้องกำลังสั่งสมคลังคำศัพท์ภาษาอังกฤษ ชมน้องที่ตั้งใจทำสม่ำเสมอ และให้กำลังใจน้องลุยต่อครับ`
  } else {
    studentNotice = `🇹🇭 เก่งมาก ${nameDisplay}! ข้อนี้โจทย์ทดสอบการแยก "ใจความสำคัญ" ออกจากตัวอย่าง แค่ตัดคำว่า เช่น/ได้แก่ ออก ก็จะเห็นคำตอบที่แท้จริงทันที!`
    parentCoachingTip = `💡 คำแนะนำสำหรับคุณพ่อ: น้องอ่านจับใจความได้เร็ว เพียงสังเกตคำเชื่อมอีกนิดเดียวจะเก็บคะแนนเต็มได้แน่นอนครับ`
  }

  return { studentNotice, parentCoachingTip }
}
