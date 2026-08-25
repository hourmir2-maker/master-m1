import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

interface SubjectResult {
  score: number
  total: number
  answers: Record<string, string>
  weakTopics: string[]
  strongTopics: string[]
}

interface PreTestResults {
  math: SubjectResult
  science: SubjectResult
  english: SubjectResult
}

export async function analyzePreTestResults(results: PreTestResults) {
  const prompt = `คุณคือครูผู้เชี่ยวชาญด้านการศึกษาสำหรับนักเรียนเตรียมเข้า ม.1 ในประเทศไทย

ผลการทดสอบก่อนเรียน (Pre-Test):
- คณิตศาสตร์: ${results.math.score}/${results.math.total} คะแนน (${Math.round(results.math.score/results.math.total*100)}%)
  จุดอ่อน: ${results.math.weakTopics.join(', ') || 'ไม่มี'}
- วิทยาศาสตร์: ${results.science.score}/${results.science.total} คะแนน (${Math.round(results.science.score/results.science.total*100)}%)
  จุดอ่อน: ${results.science.weakTopics.join(', ') || 'ไม่มี'}
- ภาษาอังกฤษ: ${results.english.score}/${results.english.total} คะแนน (${Math.round(results.english.score/results.english.total*100)}%)
  จุดอ่อน: ${results.english.weakTopics.join(', ') || 'ไม่มี'}

กรุณาวิเคราะห์และสร้างแผนการเรียนส่วนตัวเป็น JSON ดังนี้:
{
  "priority_subject": "วิชาที่ควรเน้นมากที่สุด (math/science/english)",
  "overall_level": "ระดับรวม (basic/intermediate/advanced)",
  "analysis": "วิเคราะห์จุดอ่อนและจุดแข็งโดยสรุป 2-3 ประโยค เป็นภาษาไทย",
  "math_modules": ["module1", "module2"],
  "science_modules": ["module1", "module2"],
  "english_modules": ["module1", "module2"],
  "study_tips": ["เคล็ดลับ 1", "เคล็ดลับ 2", "เคล็ดลับ 3"],
  "estimated_weeks": 10
}

Modules ที่มีในระบบ:
คณิต: numbers_basics, fractions_decimals, algebra_intro, geometry, statistics
วิทย์: living_things, matter_properties, force_motion, energy, earth_space
อังกฤษ: grammar_basics, vocabulary, reading, listening_speaking, writing

ตอบเป็น JSON เท่านั้น ไม่มีข้อความอื่น`

  const result = await geminiModel.generateContent(prompt)
  const text = result.response.text()
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Invalid AI response')
  return JSON.parse(jsonMatch[0])
}
