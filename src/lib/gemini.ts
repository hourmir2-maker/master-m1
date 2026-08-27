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

export interface AiAnalysisResult {
  priority_subject: 'math' | 'science' | 'english'
  overall_level: 'basic' | 'intermediate' | 'advanced'
  analysis: string
  math_modules: string[]
  science_modules: string[]
  english_modules: string[]
  study_tips: string[]
  estimated_weeks: number
}

// Smart Heuristic Fallback Analysis in case Gemini API key is missing or quota exceeded
function generateSmartFallbackAnalysis(results: PreTestResults): AiAnalysisResult {
  const mathPct = results.math.total > 0 ? (results.math.score / results.math.total) * 100 : 0
  const sciPct = results.science.total > 0 ? (results.science.score / results.science.total) * 100 : 0
  const engPct = results.english.total > 0 ? (results.english.score / results.english.total) * 100 : 0

  const avgPct = Math.round((mathPct + sciPct + engPct) / 3)

  let prioritySubject: 'math' | 'science' | 'english' = 'math'
  if (sciPct < mathPct && sciPct <= engPct) {
    prioritySubject = 'science'
  } else if (engPct < mathPct && engPct < sciPct) {
    prioritySubject = 'english'
  }

  let overallLevel: 'basic' | 'intermediate' | 'advanced' = 'basic'
  if (avgPct >= 80) overallLevel = 'advanced'
  else if (avgPct >= 50) overallLevel = 'intermediate'

  const subjectNames: Record<string, string> = {
    math: 'คณิตศาสตร์',
    science: 'วิทยาศาสตร์',
    english: 'ภาษาอังกฤษ'
  }

  const analysisText = `จากการประเมินพื้นฐาน 3 วิชา คุณทำคะแนนรวมได้ ${avgPct}% (คณิต: ${Math.round(mathPct)}%, วิทย์: ${Math.round(sciPct)}%, อังกฤษ: ${Math.round(engPct)}%) โดยวิชาที่ควรได้รับการฟื้นฟูและเน้นเทคนิคเสริมความเข้าใจเป็นอันดับแรกคือ "${subjectNames[prioritySubject]}" เพื่อเตรียมพร้อมสำหรับข้อสอบเข้า ม.1`

  const allMath = ['numbers_basics', 'fractions_decimals', 'algebra_intro', 'geometry', 'statistics']
  const allSci = ['living_things', 'matter_properties', 'force_motion', 'energy', 'earth_space']
  const allEng = ['grammar_basics', 'vocabulary', 'reading', 'listening_speaking', 'writing']

  // Reorder modules prioritizing weak topics
  const orderModules = (all: string[], weak: string[]) => {
    const weakSet = new Set(weak)
    const weakList = all.filter(m => weakSet.has(m))
    const restList = all.filter(m => !weakSet.has(m))
    return [...weakList, ...restList]
  }

  return {
    priority_subject: prioritySubject,
    overall_level: overallLevel,
    analysis: analysisText,
    math_modules: orderModules(allMath, results.math.weakTopics),
    science_modules: orderModules(allSci, results.science.weakTopics),
    english_modules: orderModules(allEng, results.english.weakTopics),
    study_tips: [
      'คณิตศาสตร์: ใช้สูตร 3-STEP ATTACK โดยเริ่มจากการวาดภาพหรือแปลงโจทย์เป็นตารางก่อนลงมือคิด',
      'วิทยาศาสตร์: ใช้เทคนิค SCIENCE DETECTIVE เน้นแยกตัวแปรต้น ตัวแปรตาม และมองหาความสัมพันธ์เหตุ-ผล',
      'ภาษาอังกฤษ: ใช้ 3S METHOD โดย Skim อ่านภาพรวม Scan หา Keyword และเช็คโครงสร้างประโยค SVOP'
    ],
    estimated_weeks: avgPct >= 80 ? 6 : avgPct >= 50 ? 8 : 10
  }
}

export async function analyzePreTestResults(results: PreTestResults): Promise<AiAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey || apiKey.length < 10) {
    console.warn('Gemini API key not found or invalid. Using Smart Expert Fallback Analysis.')
    return generateSmartFallbackAnalysis(results)
  }

  try {
    const prompt = `คุณคือครูผู้เชี่ยวชาญด้านการศึกษาสำหรับนักเรียนเตรียมเข้า ม.1 ในประเทศไทย

ผลการทดสอบก่อนเรียน (Pre-Test):
- คณิตศาสตร์: ${results.math.score}/${results.math.total} คะแนน (${Math.round((results.math.score / results.math.total) * 100)}%)
  จุดอ่อน: ${results.math.weakTopics.join(', ') || 'ไม่มี'}
- วิทยาศาสตร์: ${results.science.score}/${results.science.total} คะแนน (${Math.round((results.science.score / results.science.total) * 100)}%)
  จุดอ่อน: ${results.science.weakTopics.join(', ') || 'ไม่มี'}
- ภาษาอังกฤษ: ${results.english.score}/${results.english.total} คะแนน (${Math.round((results.english.score / results.english.total) * 100)}%)
  จุดอ่อน: ${results.english.weakTopics.join(', ') || 'ไม่มี'}

กรุณาวิเคราะห์และสร้างแผนการเรียนส่วนตัวเป็น JSON รูปแบบนี้เท่านั้น:
{
  "priority_subject": "math หรือ science หรือ english",
  "overall_level": "basic หรือ intermediate หรือ advanced",
  "analysis": "วิเคราะห์จุดอ่อนและจุดแข็งโดยสรุป 2-3 ประโยค เป็นภาษาไทยเชิงบวกให้กำลังใจ",
  "math_modules": ["numbers_basics", "fractions_decimals", "percentages", "algebra_intro", "geometry", "ratio_proportion", "geometry_3d", "statistics_probability"],
  "science_modules": ["living_things", "matter_properties", "force_motion", "energy", "earth_space", "human_body", "chemical_changes", "scientific_inquiry"],
  "english_modules": ["grammar_basics", "vocabulary", "reading", "listening_speaking", "writing", "passive_modals", "comparison_conjunctions", "cloze_test"],
  "study_tips": ["เคล็ดลับที่ 1 พร้อมเทคนิค", "เคล็ดลับที่ 2", "เคล็ดลับที่ 3"],
  "estimated_weeks": 8
}

ตอบเฉพาะ JSON string ล้วนๆ ไม่มี markdown หรือข้อความอื่น`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      }
    )

    if (response.ok) {
      const data = await response.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
      if (text) {
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim()
        return JSON.parse(cleanJson) as AiAnalysisResult
      }
    }
    return generateSmartFallbackAnalysis(results)
  } catch (error) {
    console.error('Gemini API call failed, switching to Smart Expert Fallback:', error)
    return generateSmartFallbackAnalysis(results)
  }
}
