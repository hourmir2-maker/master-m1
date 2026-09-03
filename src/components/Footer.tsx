import Link from 'next/link'
import { Lock, ExternalLink } from 'lucide-react'

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function YouTubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-white/85 backdrop-blur-md border-t border-orange-100 py-8 px-4 text-center text-xs text-slate-500 mt-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Official Social Links & Community Hub */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.facebook.com/645243598902533"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-200 transition-all font-semibold shadow-2xs hover:scale-105"
          >
            <FacebookIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Facebook เพจ: Master ม.1</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 border border-red-200 transition-all font-semibold shadow-2xs hover:scale-105"
          >
            <YouTubeIcon className="w-3.5 h-3.5 text-red-600" />
            <span>YouTube: ช่อง Master ม.1</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <Link
            href="/virtual-lab"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800 border border-purple-200 transition-all font-semibold shadow-2xs hover:scale-105"
          >
            <span>🔬 ห้องแล็บเสมือนจริง 15 สถานี 4 วิชา</span>
          </Link>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-slate-700">
            © 2026 MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ | สงวนลิขสิทธิ์
          </p>
          <p className="text-[11px] sm:text-xs text-slate-500">
            พัฒนาโดย <span className="font-bold text-orange-700">Phairot Makkaew</span> ร่วมกับ <span className="font-bold text-amber-700">Gemini AI</span>
          </p>
        </div>

        <div className="pt-1">
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-orange-600 transition-colors"
            title="ระบบผู้ดูแลระบบ (Admin)"
          >
            <Lock className="w-3 h-3" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
