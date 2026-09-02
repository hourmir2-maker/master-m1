/**
 * MASTER ม.1 — Predictive School Readiness Gauge & Target Probability Engine
 * ระบบประเมินและพยากรณ์โอกาสสอบติด ม.1 ห้องเรียนพิเศษและโรงเรียนชั้นนำระดับประเทศ
 */

export interface SchoolBenchmark {
  id: string
  name: string
  type: 'gifted' | 'demonstration' | 'ep' | 'general'
  emoji: string
  minAvgScore: number
  keySubjects: ('math' | 'science' | 'english' | 'thai')[]
  description: string
}

export const TOP_SCHOOL_BENCHMARKS: SchoolBenchmark[] = [
  {
    id: 'gifted_smp',
    name: 'ห้องเรียนพิเศษ Gifted / SMP (สวนกุหลาบ / สตรีวิทยา / บดินทรเดชา)',
    type: 'gifted',
    emoji: '🏆',
    minAvgScore: 85,
    keySubjects: ['math', 'science'],
    description: 'เน้นความลึกด้านคณิตศาสตร์และวิทยาศาสตร์ขั้นสูง (สูตรลัด สสวท. & คลังข้อสอบแข่งขัน)'
  },
  {
    id: 'satit_patumwan',
    name: 'โรงเรียนสาธิตชั้นนำ (สาธิตปทุมวัน / สาธิตจุฬาฯ / สาธิต มศว ประสานมิตร)',
    type: 'demonstration',
    emoji: '🎓',
    minAvgScore: 82,
    keySubjects: ['math', 'science', 'english', 'thai'],
    description: 'เน้นความสมดุลทั้ง 4 วิชาหลัก พร้อมทักษะการคิดวิเคราะห์เชิงลึกและการประยุกต์'
  },
  {
    id: 'english_program',
    name: 'ห้องเรียนพิเศษสองภาษา EP / MEP (English Program)',
    type: 'ep',
    emoji: '🌍',
    minAvgScore: 78,
    keySubjects: ['english', 'math'],
    description: 'เน้นความเชี่ยวชาญด้านไวยากรณ์ คำศัพท์ Oxford 3000 และการสื่อสารระดับสากล CEFR A2-B1'
  },
  {
    id: 'top_provincial',
    name: 'โรงเรียนมัธยมประจำจังหวัดยอดนิยม (ห้องเรียนคุณภาพ สพฐ.)',
    type: 'general',
    emoji: '🏫',
    minAvgScore: 68,
    keySubjects: ['math', 'science', 'english', 'thai'],
    description: 'ครอบคลุมตัวชี้วัด สพฐ. 2551 (ปรับปรุง 2560) และมาตรฐานข้อสอบ O-NET 2570'
  }
]

export interface ReadinessEvaluation {
  overallScore: number
  probabilityPercent: number
  readinessLevel: 'exceptional' | 'high' | 'moderate' | 'needs_reinforcement'
  levelTitle: string
  matchedSchools: {
    benchmark: SchoolBenchmark
    chancePercent: number
    status: 'high_chance' | 'good_chance' | 'stretch'
  }[]
  subjectStrengths: {
    subject: string
    label: string
    score: number
  }[]
  actionableAdvice: string
}

export function evaluateSchoolReadiness(
  subjectScores: { math: number; science: number; english: number; thai: number },
  targetSchoolName?: string
): ReadinessEvaluation {
  const scores = [
    subjectScores.math || 0,
    subjectScores.science || 0,
    subjectScores.english || 0,
    subjectScores.thai || 0
  ]
  const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / 4)

  let readinessLevel: ReadinessEvaluation['readinessLevel'] = 'needs_reinforcement'
  let levelTitle = 'ต้องการการเสริมสร้างพื้นฐาน'

  if (overallScore >= 85) {
    readinessLevel = 'exceptional'
    levelTitle = '🌟 ยอดเยี่ยมพร้อมสอบติดห้องพิเศษ Gifted'
  } else if (overallScore >= 75) {
    readinessLevel = 'high'
    levelTitle = '👍 โอกาสสูงมากสำหรับโรงเรียนชั้นนำ'
  } else if (overallScore >= 60) {
    readinessLevel = 'moderate'
    levelTitle = '🎯 พื้นฐานดี มีโอกาสสอบผ่านตามเกณฑ์'
  }

  const matchedSchools = TOP_SCHOOL_BENCHMARKS.map(bench => {
    let chance = Math.min(99, Math.round((overallScore / bench.minAvgScore) * 88))
    if (overallScore >= bench.minAvgScore) {
      chance = Math.min(99, 85 + Math.round((overallScore - bench.minAvgScore) * 1.2))
    }

    let status: 'high_chance' | 'good_chance' | 'stretch' = 'stretch'
    if (chance >= 80) status = 'high_chance'
    else if (chance >= 65) status = 'good_chance'

    return {
      benchmark: bench,
      chancePercent: Math.max(15, chance),
      status
    }
  })

  const subjectStrengths = [
    { subject: 'math', label: 'คณิตศาสตร์', score: subjectScores.math || 0 },
    { subject: 'science', label: 'วิทยาศาสตร์', score: subjectScores.science || 0 },
    { subject: 'english', label: 'ภาษาอังกฤษ', score: subjectScores.english || 0 },
    { subject: 'thai', label: 'ภาษาไทย', score: subjectScores.thai || 0 }
  ]

  // Find lowest subject for advice
  const sorted = [...subjectStrengths].sort((a, b) => a.score - b.score)
  const lowest = sorted[0]
  const highest = sorted[sorted.length - 1]

  let actionableAdvice = `จุดเด่นคือวิชา${highest.label} (${highest.score}%) แนะนำเสริมวิชา${lowest.label} (${lowest.score}%) เพิ่มอีกประมาณ ${Math.max(5, 85 - lowest.score)} คะแนน เพื่อดันโอกาสสอบติด Gifted ให้แตะ 95%+!`

  return {
    overallScore,
    probabilityPercent: Math.min(99, Math.max(20, Math.round(overallScore * 1.05))),
    readinessLevel,
    levelTitle,
    matchedSchools,
    subjectStrengths,
    actionableAdvice
  }
}
