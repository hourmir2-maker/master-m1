import { NextRequest, NextResponse } from 'next/server'
import { sendAiDiagnosticTelegramNotification } from '@/lib/telegram-notify'

export async function POST(req: NextRequest) {
  try {
    const { analysis } = await req.json()
    if (!analysis || !analysis.studentName) {
      return NextResponse.json({ error: 'Missing analysis data' }, { status: 400 })
    }

    const success = await sendAiDiagnosticTelegramNotification(analysis)
    return NextResponse.json({ success, message: success ? 'Sent to Telegram' : 'Failed to send' })
  } catch (error: any) {
    console.error('Error sending Telegram diagnostic:', error)
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}
