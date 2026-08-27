'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import { 
  Building2, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Award, 
  FileText, 
  LineChart, 
  ShieldCheck,
  ChevronRight,
  School,
  KeyRound
} from 'lucide-react'

export default function SchoolPortalPage() {
  const router = useRouter()
  const [classCodeInput, setClassCodeInput] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleJoinClass = (e: React.FormEvent) => {
    e.preventDefault()
    if (!classCodeInput.trim()) {
      setErrorMsg('กรุณากรอกรหัสห้องเรียนครับ')
      return
    }
    const cleanCode = classCodeInput.trim().toUpperCase()
    router.push(`/school/join?code=${encodeURIComponent(cleanCode)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 text-slate-800 flex flex-col">
      {/* School Portal Navbar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl p-2 shadow-md shadow-blue-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  MASTER SCHOOL
                </span>
                <p className="text-[10px] text-blue-900/60 font-bold leading-none mt-0.5">
                  ระบบบริหารการเรียนรู้และทดสอบระดับโรงเรียน (ป.1 - ม.1)
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 text-xs hidden sm:inline-flex">
                🧑‍🎓 พาสนักเรียนทั่วไป
              </Button>
            </Link>
            <Link href="/school/teacher">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20">
                👩‍🏫 พอร์ทัลคุณครู / ผอ.
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 border border-blue-200 rounded-full px-4 py-1 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            สำหรับโรงเรียนสังกัด สพฐ. / สช. / อปท. / สาธิตฯ
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            แพลตฟอร์มติวสอบและวิเคราะห์ผลสัมฤทธิ์
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-1">
              ระดับโรงเรียน (ป.1 - ป.6 & ม.1)
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            เชื่อมต่อห้องเรียน ครู และฝ่ายวิชาการ ด้วยคลังข้อสอบมาตรฐาน สพฐ. (RT ป.1, NT ป.3, O-NET ป.6, และคัดเลือกเข้า ม.1) พร้อมระบบวิเคราะห์จุดอ่อนรายตัวชี้วัด
          </p>

          {/* Quick Join Card for Students */}
          <Card className="border-2 border-blue-200 bg-white/95 rounded-3xl shadow-xl p-6 sm:p-8 max-w-xl mx-auto text-left mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                🎟️
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">นักเรียน: เข้าร่วมห้องสอบด้วยรหัสห้อง</h3>
                <p className="text-xs text-slate-500">กรอกรหัสที่ได้รับจากคุณครู (เช่น DEMO-P601) ไม่ต้องใช้อีเมล</p>
              </div>
            </div>

            <form onSubmit={handleJoinClass} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  placeholder="กรอกรหัสห้องเรียน เช่น DEMO-P601"
                  value={classCodeInput}
                  onChange={e => {
                    setClassCodeInput(e.target.value)
                    setErrorMsg('')
                  }}
                  className="flex-1 px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl font-mono text-sm font-bold uppercase tracking-wider text-slate-900 outline-hidden focus:border-blue-500 focus:bg-white transition-all"
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md shadow-blue-500/25 shrink-0"
                >
                  เข้าห้องสอบ ➔
                </Button>
              </div>
              {errorMsg && <p className="text-xs text-red-500 font-bold">{errorMsg}</p>}
            </form>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>💡 รหัสห้องทดลองสาธิต: <strong className="text-blue-600 font-mono">DEMO-P601</strong></span>
              <Link href="/school/join?code=DEMO-P601" className="text-blue-600 hover:underline font-bold">
                กดเข้าทันที →
              </Link>
            </div>
          </Card>
        </section>

        {/* 3 Main School Roles Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-blue-100 bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-4">
              🧑‍🎓
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">1. นักเรียนเข้าสอบง่าย</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              เข้าสอบด้วยรหัสห้องและเลขที่ประจำตัว ไม่ต้องจำรหัสผ่านหรือสมัครอีเมล ทำข้อสอบจับเวลาจริง พร้อมกระดาษฝนคำตอบ
            </p>
            <Badge variant="secondary" className="text-[10px] text-blue-700 bg-blue-50">
              รองรับ ป.1 - ป.6 & ม.1
            </Badge>
          </Card>

          <Card className="border border-indigo-100 bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mb-4">
              👩‍🏫
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">2. ครูตรวจงาน & วินิจฉัยตัวชี้วัด</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              ระบบตรวจข้อสอบอัตโนมัติ 100% พร้อมรายงานผลวินิจฉัยว่าเด็กในห้องอ่อนตัวชี้วัดใด เพื่อให้ครูสอนเน้นย้ำได้ทันท่วงที
            </p>
            <Link href="/school/teacher">
              <span className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                เข้าแดชบอร์ดครู <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </Card>

          <Card className="border border-purple-100 bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl mb-4">
              📊
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">3. ฝ่ายวิชาการ & ผู้อำนวยการ</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              ดูผลสัมฤทธิ์ภาพรวมทั้งโรงเรียน เปรียบเทียบคะแนนเฉลี่ย O-NET, NT, RT กับค่าเฉลี่ย สพฐ. ระดับประเทศในคลิกเดียว
            </p>
            <Badge variant="secondary" className="text-[10px] text-purple-700 bg-purple-50">
              Executive Analytics
            </Badge>
          </Card>
        </section>

        {/* National Exam Breakdown */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900">สนามสอบระดับชาติที่ระบบรองรับครบ 100%</h2>
            <p className="text-xs text-slate-500 mt-1">อิงตามมาตรฐานตัวชี้วัด สพฐ. และผังสร้างข้อสอบของ สทศ.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: 'RT ป.1', title: 'การประเมินการอ่าน ป.1', sub: 'อ่านออกเสียง & อ่านรู้เรื่อง', color: 'border-amber-200 bg-amber-50/50 text-amber-900' },
              { code: 'NT ป.3', title: 'การประเมินคุณภาพ ป.3', sub: 'คณิตศาสตร์ & ภาษาไทย', color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900' },
              { code: 'O-NET ป.6', title: 'การทดสอบระดับชาติ ป.6', sub: 'คณิต, วิทย์, ไทย, อังกฤษ', color: 'border-orange-200 bg-orange-50/50 text-orange-900' },
              { code: 'ม.1 Entrance', title: 'สอบคัดเลือกเข้า ม.1', sub: 'ห้อง Gifted / EP / ทั่วไป', color: 'border-blue-200 bg-blue-50/50 text-blue-900' }
            ].map((item, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${item.color} space-y-1`}>
                <Badge className="font-mono font-bold text-[11px] mb-1 bg-white text-slate-800 border">
                  {item.code}
                </Badge>
                <div className="font-bold text-sm text-slate-900">{item.title}</div>
                <div className="text-[11px] text-slate-500">{item.sub}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
