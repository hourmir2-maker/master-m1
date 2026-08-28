'use client'

import { useEffect, useRef, useState } from 'react'

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
  const [mounted, setMounted] = useState(false)

  const clientId = 'ca-pub-7280055452989562'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || isLoaded.current) return
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && adRef.current && adRef.current.offsetWidth > 0) {
          window.adsbygoogle = window.adsbygoogle || []
          window.adsbygoogle.push({})
          isLoaded.current = true
        }
      } catch (err) {
        // Safe catch for AdSense pending review states
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [mounted])

  if (!mounted) {
    return (
      <div className={`w-full overflow-hidden my-4 text-center ${className}`}>
        <div className="min-h-[90px] bg-slate-50/50 rounded-xl border border-slate-100 animate-pulse" />
      </div>
    )
  }

  return (
    <div className={`w-full overflow-hidden my-4 text-center ${className}`} suppressHydrationWarning>
      <div className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">
        ผู้สนับสนุน
      </div>
      
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

