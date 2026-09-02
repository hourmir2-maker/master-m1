import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { studentId, isVip } = await req.json()

    if (!studentId) {
      return NextResponse.json({ success: false, error: 'Missing studentId' }, { status: 400 })
    }

    const targetLabel = isVip 
      ? 'ห้องพิเศษ Gifted วิทย์-คณิต (👑 VIP Gifted Track)' 
      : 'ม.1 ห้องเรียนทั่วไป'

    try {
      await supabase
        .from('profiles')
        .update({
          school_target: targetLabel,
          updated_at: new Date().toISOString()
        })
        .eq('id', studentId)
    } catch (dbErr) {
      console.warn('DB update VIP warning:', dbErr)
    }

    return NextResponse.json({
      success: true,
      studentId,
      isVip,
      schoolTarget: targetLabel
    })
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
