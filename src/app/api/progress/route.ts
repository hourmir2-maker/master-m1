import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { userId, lessonId, subject, moduleId, score, timeSpent } = await req.json()

    const { data, error } = await supabase.from('progress').upsert({
      user_id: userId,
      lesson_id: lessonId || null,
      subject,
      module_id: moduleId,
      completed: true,
      score,
      time_spent: timeSpent,
      completed_at: new Date().toISOString(),
    }).select().single()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const userId = new URL(req.url).searchParams.get('userId')
    const { data, error } = await supabase.from('progress').select('*').eq('user_id', userId)
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 })
  }
}
