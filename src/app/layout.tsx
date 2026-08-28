import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import SmartBreakReminder from '@/components/SmartBreakReminder'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ',
  description: 'ระบบกวดวิชาออนไลน์ AI Personalized สำหรับนักเรียนเตรียมเข้า ม.1 และสนามสอบ O-NET ครบ 4 วิชา',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseClientId = 'ca-pub-7280055452989562'

  return (
    <html lang="th">
      <head>
        {/* Google AdSense Auto Ads — ใช้ native <script> ป้องกัน data-nscript warning */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={geist.className}>
        {children}
        <SmartBreakReminder />
      </body>
    </html>
  )
}


