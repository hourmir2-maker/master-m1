'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'

export default function AdsenseScript() {
  const pathname = usePathname()
  const adsenseClientId = 'ca-pub-7280055452989562'

  // Do not load AdSense on admin or login/sensitive backend routes (AdSense Policy Compliant)
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/login') || pathname?.startsWith('/register')

  if (isAdminRoute) {
    return null
  }

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
      crossOrigin="anonymous"
    />
  )
}
