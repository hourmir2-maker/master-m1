import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ',
  description: 'ระบบกวดวิชาออนไลน์ AI Personalized สำหรับนักเรียนเตรียมเข้า ม.1 ครบ 3 วิชา',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={geist.className}>{children}</body>
    </html>
  )
}
