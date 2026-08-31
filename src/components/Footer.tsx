import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-orange-100 py-6 px-4 text-center text-xs text-slate-500 mt-auto">
      <div className="max-w-4xl mx-auto space-y-1">
        <p className="font-semibold text-slate-700">
          © 2026 MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ | สงวนลิขสิทธิ์
        </p>
        <p className="text-[11px] sm:text-xs text-slate-500">
          พัฒนาโดย <span className="font-bold text-orange-700">Phairot Makkaew</span> ร่วมกับ <span className="font-bold text-amber-700">Gemini AI</span>
        </p>
        <div className="pt-2">
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
