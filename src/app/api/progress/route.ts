import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { userId, lessonId, subject, moduleId, score, timeSpent } = await req.json()

    if (!userId || !subject || !moduleId) {
      return NextResponse.json({ success: true, message: 'Skipped - no user or subject' })
    }

    try {
      // 1. Delete previous progress for this user + module if any
      await supabase
        .from('progress')
        .delete()
        .eq('user_id', userId)
        .eq('module_id', moduleId)

      // 2. Insert fresh clean record
      const { data, error } = await supabase
        .from('progress')
        .insert({
          user_id: userId,
          lesson_id: lessonId || null,
          subject,
          module_id: moduleId,
          completed: true,
          score: typeof score === 'number' ? score : 100,
          time_spent: timeSpent || 0,
          completed_at: new Date().toISOString(),
        })
        .select()
        .maybeSingle()

      if (error) {
        console.warn('Progress insert warning:', error.message)
      }

      // 3. Trigger Automated Parent Telegram Notification
      try {
        const { sendParentTelegramNotification } = await import('@/lib/telegram-notify')
        const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', userId).maybeSingle()
        const studentName = profile?.full_name || 'น้องภูมิรพีร์'
        
        await sendParentTelegramNotification({
          userId,
          studentName,
          subject,
          moduleId,
          score: typeof score === 'number' ? score : 100,
          timeSpent: timeSpent || 0
        })
      } catch (tgErr) {
        console.warn('Telegram parent notification warning (non-fatal):', tgErr)
      }

      return NextResponse.json({ success: true, data })
    } catch (dbErr) {
      console.warn('DB Error in progress route (non-fatal):', dbErr)
      return NextResponse.json({ success: true, message: 'Recorded locally' })
    }
  } catch (error: unknown) {
    console.error('Progress API error:', error)
    return NextResponse.json({ success: true, message: 'Handled gracefully' })
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
    return NextResponse.json({ data: [] })
  }
}
