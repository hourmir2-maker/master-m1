import { NextRequest, NextResponse } from 'next/server'
import { analyzePreTestResults } from '@/lib/gemini'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, results } = body

    const supabase = await createClient()

    // Save pre-test results per subject
    for (const [subject, data] of Object.entries(results) as [string, { score: number; total: number; answers: Record<string, string>; weakTopics: string[]; strongTopics: string[] }][]) {
      await supabase.from('pre_test_results').insert({
        user_id: userId,
        subject,
        score: data.score,
        total_questions: data.total,
        answers: data.answers,
        weak_topics: data.weakTopics,
        strong_topics: data.strongTopics,
      })
    }

    // Analyze with Gemini AI
    const aiResult = await analyzePreTestResults(results as Parameters<typeof analyzePreTestResults>[0])

    // Save learning path (upsert)
    const { error } = await supabase.from('learning_paths').upsert({
      user_id: userId,
      math_modules: aiResult.math_modules,
      science_modules: aiResult.science_modules,
      english_modules: aiResult.english_modules,
      priority_subject: aiResult.priority_subject,
      ai_analysis: JSON.stringify(aiResult),
      updated_at: new Date().toISOString(),
    })

    if (error) throw error

    return NextResponse.json({ success: true, learningPath: aiResult })
  } catch (error: unknown) {
    console.error('Pre-test analyze error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
