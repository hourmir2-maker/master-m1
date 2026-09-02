import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { StudentRosterItem } from '@/lib/school-portal-data'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { classroomId, students } = await req.json()

    if (!classroomId || !Array.isArray(students) || students.length === 0) {
      return NextResponse.json({ success: false, error: 'ข้อมูลนักเรียนไม่ถูกต้อง' }, { status: 400 })
    }

    try {
      // Update student_count in classrooms table
      await supabase
        .from('classrooms')
        .update({ student_count: students.length })
        .eq('id', classroomId)
    } catch {}

    return NextResponse.json({
      success: true,
      count: students.length,
      students
    })
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
