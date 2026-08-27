import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ',
  description: 'ระบบกวดวิชาออนไลน์ AI Personalized สำหรับนักเรียนเตรียมเข้า ม.1 และสนามสอบ O-NET ครบ 4 วิชา',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'

  return (
    <html lang="th">
      <head>
        {/* Google AdSense Auto Ads Script */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={geist.className}>{children}</body>
    </html>
  )
}

