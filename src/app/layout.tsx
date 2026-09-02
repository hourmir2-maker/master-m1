import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import SmartBreakReminder from '@/components/SmartBreakReminder'
import AdsenseScript from '@/components/AdsenseScript'
import PwaInstallPrompt from '@/components/PwaInstallPrompt'

const geist = Geist({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#EA580C',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ',
  description: 'ระบบกวดวิชาออนไลน์ AI Personalized สำหรับนักเรียนเตรียมเข้า ม.1 และสนามสอบ O-NET, NT ป.3, RT ป.1 ครบ 4 วิชา',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MASTER ม.1',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={geist.className} suppressHydrationWarning>
        <AdsenseScript />
        {children}
        <SmartBreakReminder />
        <PwaInstallPrompt />
      </body>
    </html>
  )
}
