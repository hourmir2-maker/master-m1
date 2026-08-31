import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import SmartBreakReminder from '@/components/SmartBreakReminder'
import AdsenseScript from '@/components/AdsenseScript'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ',
  description: 'ระบบกวดวิชาออนไลน์ AI Personalized สำหรับนักเรียนเตรียมเข้า ม.1 และสนามสอบ O-NET ครบ 4 วิชา',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={geist.className} suppressHydrationWarning>
        <AdsenseScript />
        {children}
        <SmartBreakReminder />
      </body>
    </html>
  )
}


