import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { userId, lessonId, subject, moduleId, score, timeSpent } = await req.json()

    if (!userId || !subject || !moduleId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data: existing } = await supabase
      .from('progress')
      .select('id')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .maybeSingle()

    let result
    if (existing && existing.id) {
      result = await supabase
        .from('progress')
        .update({
          completed: true,
          score,
          time_spent: timeSpent || 0,
          completed_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .maybeSingle()
    } else {
      result = await supabase
        .from('progress')
        .insert({
          user_id: userId,
          lesson_id: lessonId || null,
          subject,
          module_id: moduleId,
          completed: true,
          score,
          time_spent: timeSpent || 0,
          completed_at: new Date().toISOString(),
        })
        .select()
        .maybeSingle()
    }

    if (result.error) throw result.error
    return NextResponse.json({ success: true, data: result.data })
  } catch (error: unknown) {
    console.error('Progress save error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const userId = new URL(req.url).searchParams.get('userId')
    if (!userId) return NextResponse.json({ data: [] })

    const { data, error } = await supabase.from('progress').select('*').eq('user_id', userId)
    if (error) throw error
    return NextResponse.json({ data: data || [] })
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 })
  }
}
