import { NextRequest, NextResponse } from 'next/server'
import { sendWeeklyTelegramDigest } from '@/lib/telegram-weekly-digest'

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // Allow internal/manual calls if cron secret isn't matching
    }

    const userId = req.nextUrl.searchParams.get('userId') || undefined
    const result = await sendWeeklyTelegramDigest(userId)

    return NextResponse.json({
      success: result.success,
      message: result.message,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Weekly Digest Cron API Error:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  return GET(req)
}
