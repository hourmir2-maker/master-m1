export interface Profile {
  id: string
  full_name: string
  email: string
  grade_target?: string
  school_target?: string
  created_at: string
}

export interface PreTestResult {
  subject: 'math' | 'science' | 'english'
  score: number
  total_questions: number
  answers: Record<string, string>
  weak_topics: string[]
  strong_topics: string[]
}

export interface LearningPath {
  id: string
  user_id: string
  math_modules: string[]
  science_modules: string[]
  english_modules: string[]
  priority_subject: string
  ai_analysis: string
  generated_at: string
}

export interface AiAnalysis {
  priority_subject: string
  overall_level: 'basic' | 'intermediate' | 'advanced'
  analysis: string
  math_modules: string[]
  science_modules: string[]
  english_modules: string[]
  study_tips: string[]
  estimated_weeks: number
}
