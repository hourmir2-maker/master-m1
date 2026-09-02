'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Sparkles, X } from 'lucide-react'

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  if (isInstalled || isDismissed || !deferredPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 animate-bounce-in">
      <div className="bg-gradient-to-r from-slate-900 via-orange-950 to-slate-900 border border-orange-500/40 rounded-2xl p-4 text-white shadow-2xl backdrop-blur-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-xl shrink-0 shadow-md">
            📱
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-amber-300 flex items-center gap-1.5">
              ติดตั้ง MASTER ม.1 <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </h4>
            <p className="text-[11px] text-slate-300">
              ใช้งานเหมือนแอปจริงบนมือถือ สะดวกรวดเร็ว
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={handleInstall}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-slate-950 font-black text-xs px-3 py-1.5 rounded-lg shadow-md h-8"
          >
            <Download className="w-3.5 h-3.5 mr-1" /> ติดตั้ง
          </Button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-md text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
