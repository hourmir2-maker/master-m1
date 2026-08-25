import { NextRequest, NextResponse } from 'next/server'
import { analyzePreTestResults } from '@/lib/gemini'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, results } = body

    if (!results || !results.math || !results.science || !results.english) {
      return NextResponse.json({ error: 'ข้อมูลผลการสอบไม่ครบถ้วน' }, { status: 400 })
    }

    // 1. Analyze with Gemini AI / Smart Engine (Always succeeds)
    const aiResult = await analyzePreTestResults(results)

    // 2. Try persisting to Supabase if user and DB are available
    if (userId) {
      try {
        const supabase = await createClient()

        // Save pre-test results
        for (const [subject, data] of Object.entries(results) as [string, { score: number; total: number; answers: Record<string, string>; weakTopics: string[]; strongTopics: string[] }][]) {
          await supabase.from('pre_test_results').insert({
            user_id: userId,
            subject,
            score: data.score || 0,
            total_questions: data.total || 10,
            answers: data.answers || {},
            weak_topics: data.weakTopics || [],
            strong_topics: data.strongTopics || [],
          })
        }

        // Save learning path (upsert)
        await supabase.from('learning_paths').upsert({
          user_id: userId,
          math_modules: aiResult.math_modules,
          science_modules: aiResult.science_modules,
          english_modules: aiResult.english_modules,
          priority_subject: aiResult.priority_subject,
          ai_analysis: JSON.stringify(aiResult),
          updated_at: new Date().toISOString(),
        })
      } catch (dbError) {
        console.warn('Supabase DB persistence warning (non-fatal):', dbError)
      }
    }

    return NextResponse.json({ success: true, learningPath: aiResult })
  } catch (error: unknown) {
    console.error('Pre-test analyze error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error during analysis' },
      { status: 500 }
    )
  }
}
