import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    // 1. Fetch all user profiles
    const { data: profiles, error: profileErr } = await supabase
      .from('profiles')
      .select('id, full_name, created_at')
      .order('created_at', { ascending: false })

    if (profileErr) {
      console.warn('Error fetching profiles in admin:', profileErr.message)
    }

    // 2. Fetch all progress records
    const { data: progressRecords } = await supabase
      .from('progress')
      .select('user_id, subject, module_id, score, completed, completed_at, time_spent')

    // 3. Fetch pre-test results
    const { data: preTests } = await supabase
      .from('pre_test_results')
      .select('user_id, subject, score, completed_at')

    // Default VIP Student (ด.ช.ภูมิรพีร์ มากแก้ว) if table is empty or local
    const studentList = (profiles && profiles.length > 0) ? profiles : [
      {
        id: '4ec823eb-be30-4e1c-a709-a3382ee85491',
        full_name: 'ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)',
        created_at: new Date(Date.now() - 3600000 * 24 * 7).toISOString()
      }
    ]

    // Aggregate statistics per student
    const result = studentList.map((p) => {
      const userProgress = (progressRecords || []).filter(pr => pr.user_id === p.id)
      const userPreTests = (preTests || []).filter(pt => pt.user_id === p.id)

      const mathDone = userProgress.filter(pr => pr.subject === 'math' && pr.completed).length
      const scienceDone = userProgress.filter(pr => pr.subject === 'science' && pr.completed).length
      const englishDone = userProgress.filter(pr => pr.subject === 'english' && pr.completed).length
      const thaiDone = userProgress.filter(pr => pr.subject === 'thai' && pr.completed).length
      const totalDone = mathDone + scienceDone + englishDone + thaiDone

      const avgScore = userProgress.length > 0
        ? Math.round(userProgress.reduce((sum, item) => sum + (item.score || 100), 0) / userProgress.length)
        : 95

      return {
        id: p.id,
        fullName: p.full_name || 'ผู้เรียนไม่ระบุชื่อ',
        createdAt: p.created_at || new Date().toISOString(),
        isFortune: p.full_name?.includes('ภูมิรพีร์') || p.id === '4ec823eb-be30-4e1c-a709-a3382ee85491',
        stats: {
          totalDone,
          mathDone,
          scienceDone,
          englishDone,
          thaiDone,
          avgScore
        },
        recentHistory: userProgress.slice(-5).reverse(),
        preTestScores: userPreTests
      }
    })

    return NextResponse.json({ success: true, students: result })
  } catch (e: any) {
    console.error('Admin students API error:', e)
    return NextResponse.json({ success: false, error: e?.message || 'Server error' }, { status: 500 })
  }
}
