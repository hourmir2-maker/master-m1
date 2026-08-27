'use client'

import { useEffect, useRef } from 'react'

interface AdBannerProps {
  slotId?: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal'
  responsive?: boolean
  className?: string
}

declare global {
  interface Window {
    adsbygoogle?: any[]
  }
}

export default function AdBanner({
  slotId = '1234567890',
  format = 'auto',
  responsive = true,
  className = ''
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null)
  const isLoaded = useRef(false)

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'

  useEffect(() => {
    // ป้องกันการ push ซ้ำใน React 18/19 StrictMode
    if (isLoaded.current) return
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({})
        isLoaded.current = true
      }
    } catch (err) {
      console.warn('AdSense push warning:', err)
    }
  }, [])

  return (
    <div className={`w-full overflow-hidden my-4 text-center ${className}`}>
      <div className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">
        ผู้สนับสนุน / โฆษณา
      </div>
      
      {/* Google AdSense ins tag */}
      <ins
        ref={adRef}
        className="adsbygoogle block mx-auto rounded-xl overflow-hidden bg-slate-50/50 border border-slate-100 min-h-[90px]"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
