import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { SAMPLE_CLASSROOMS, SAMPLE_ASSIGNMENTS } from '@/lib/school-portal-data'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const code = req.nextUrl.searchParams.get('code')

    if (!code) {
      return NextResponse.json({ success: false, error: 'Missing class code' }, { status: 400 })
    }

    const cleanCode = code.trim().toUpperCase()

    // 1. Try Supabase classrooms table
    let foundClass: any = null
    try {
      const { data } = await supabase
        .from('classrooms')
        .select('*, schools(*)')
        .eq('class_code', cleanCode)
        .maybeSingle()
      if (data) foundClass = data
    } catch {}

    // 2. Fallback to Local/Preset classrooms
    if (!foundClass) {
      foundClass = SAMPLE_CLASSROOMS.find(c => c.classCode.toUpperCase() === cleanCode)
    }

    // If still not found, return virtual demo class
    if (!foundClass) {
      foundClass = {
        id: `cls_${cleanCode}`,
        class_code: cleanCode,
        classCode: cleanCode,
        grade_level: 'p6',
        gradeNameTh: 'ประถมศึกษาปีที่ 6',
        roomName: `ห้องเรียนรหัส ${cleanCode}`,
        teacherName: 'คุณครูประจำวิชา',
        studentCount: 30
      }
    }

    return NextResponse.json({
      success: true,
      classroom: foundClass,
      assignments: SAMPLE_ASSIGNMENTS
    })
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
