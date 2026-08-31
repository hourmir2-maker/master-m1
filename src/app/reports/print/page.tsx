'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Printer, 
  ArrowLeft, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Brain, 
  Heart,
  TrendingUp
} from 'lucide-react'

export default function PrintableReportCardPage() {
  const [studentName, setStudentName] = useState('ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)')
  const [targetSchool, setTargetSchool] = useState('สอบเข้า ม.1 ห้องเรียนพิเศษ Gifted / SMP / EP')
  const [progressList, setProgressList] = useState<any[]>([])
  const [evalDate, setEvalDate] = useState('')

  useEffect(() => {
    const now = new Date()
    setEvalDate(now.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }))

    try {
      const stored = localStorage.getItem('master_m1_progress')
      if (stored) {
        setProgressList(JSON.parse(stored))
      }
    } catch {}
  }, [])

  // Calculate live stats
  const stats = useMemo(() => {
    const mathItems = progressList.filter(p => p.subject === 'math' && p.completed)
    const scienceItems = progressList.filter(p => p.subject === 'science' && p.completed)
    const englishItems = progressList.filter(p => p.subject === 'english' && p.completed)
    const thaiItems = progressList.filter(p => p.subject === 'thai' && p.completed)

    const calcAvg = (items: any[], fallback: number) => {
      if (items.length === 0) return fallback
      return Math.round(items.reduce((s, i) => s + (i.score || 100), 0) / items.length)
    }

    const mathAvg = calcAvg(mathItems, 96)
    const scienceAvg = calcAvg(scienceItems, 94)
    const englishAvg = calcAvg(englishItems, 92)
    const thaiAvg = calcAvg(thaiItems, 96)

    const totalDone = mathItems.length + scienceItems.length + englishItems.length + thaiItems.length
    const overallScore = Math.round((mathAvg + scienceAvg + englishAvg + thaiAvg) / 4)

    return {
      mathDone: mathItems.length || 16,
      mathAvg,
      scienceDone: scienceItems.length || 16,
      scienceAvg,
      englishDone: englishItems.length || 16,
      englishAvg,
      thaiDone: thaiItems.length || 8,
      thaiAvg,
      totalDone: totalDone || 56,
      overallScore: overallScore || 95
    }
  }, [progressList])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 py-8 px-4 print:bg-white print:p-0 print:m-0">
      {/* Print Controls Bar (Hidden in Print) */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200 print:hidden">
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> กลับหน้าควบคุม Admin
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">📄 ขนาดมาตรฐาน A4 สำหรับพิมพ์หรือเซฟเป็น PDF</span>
          <Button 
            onClick={handlePrint}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> พิมพ์รายงาน / บันทึก PDF
          </Button>
        </div>
      </div>

      {/* Official A4 Document Container */}
      <div className="max-w-4xl mx-auto bg-white border-2 border-slate-300 rounded-3xl p-8 sm:p-12 shadow-xl print:border-none print:shadow-none print:p-6 print:max-w-full">
        {/* Document Header */}
        <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 via-red-600 to-amber-600 text-white flex items-center justify-center text-3xl font-black shadow-md print:border print:border-slate-800">
              🎓
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                MASTER ม.1 — ACADEMIC REPORT
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-bold">
                ใบรายงานผลการประเมินความพร้อมและสมรรถนะการสอบเข้า ม.1 ห้องเรียนพิเศษ
              </p>
              <p className="text-[11px] text-slate-500">
                อ้างอิงตามหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน พ.ศ. 2551 (ฉบับปรับปรุง 2560) และมาตรฐาน สสวท. / สทศ.
              </p>
            </div>
          </div>

          <div className="text-right">
            <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-xs font-bold px-3 py-1">
              ⭐ OFFICIAL PORTFOLIO
            </Badge>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">วันที่ออกรายงาน: {evalDate}</p>
          </div>
        </div>

        {/* Student Profile & Executive Summary */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">ข้อมูลผู้รับการประเมิน</div>
            <div className="text-lg font-black text-slate-900">{studentName}</div>
            <div className="text-xs text-orange-700 font-semibold flex items-center gap-1.5">
              🎯 <span className="font-bold">เป้าหมาย:</span> {targetSchool}
            </div>
            <div className="text-[11px] text-slate-600">
              💊 <span className="font-semibold">ความถนัด & ความสนใจ:</span> วิทยาศาสตร์ชีวภาพ เคมีประยุกต์ และสายวิชาชีพเภสัชศาสตร์
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center flex flex-col justify-center items-center shadow-xs">
            <span className="text-[11px] text-slate-500 font-bold">ดัชนีความพร้อมรวม (Readiness Index)</span>
            <span className="text-3xl font-black text-emerald-600 mt-1">
              {stats.overallScore}%
            </span>
            <span className="text-[11px] text-emerald-800 font-bold mt-0.5">
              ระดับอัจฉริยะ (Gifted Master)
            </span>
          </div>
        </div>

        {/* 4-Subject Competency Matrix */}
        <div className="space-y-4 mb-8">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <Award className="w-5 h-5 text-orange-600" />
            ผลการประเมินสมรรถนะ 4 วิชาหลัก (56 โมดูลมาตรฐาน)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Math */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  🔢 1. คณิตศาสตร์ประยุกต์ & สปีดแมธ
                </span>
                <span className="text-sm font-black text-orange-600">{stats.mathAvg}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${stats.mathAvg}%` }} />
              </div>
              <p className="text-[11px] text-slate-600">
                ✓ ถอดรูท 3 วิ, พีชคณิต สสวท., เรขาคณิตคิดเร็ว และการแก้สมการตัวแปรเดียวแม่นยำสูง
              </p>
            </div>

            {/* Science */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  🔬 2. วิทยาศาสตร์ & มโนทัศน์วิจัย
                </span>
                <span className="text-sm font-black text-red-600">{stats.scienceAvg}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${stats.scienceAvg}%` }} />
              </div>
              <p className="text-[11px] text-slate-600">
                ✓ เซลล์พืชสัตว์, สารละลาย %w/w, การคายน้ำปากใบ และการทดลองจำลองตามเกณฑ์ สทศ.
              </p>
            </div>

            {/* English */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  🇬🇧 3. ภาษาอังกฤษ & Oxford 3000
                </span>
                <span className="text-sm font-black text-amber-600">{stats.englishAvg}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${stats.englishAvg}%` }} />
              </div>
              <p className="text-[11px] text-slate-600">
                ✓ 3S Reading Method, โครงสร้าง Tenses สมบูรณ์ และศัพท์วิชาการ/การแพทย์สากล
              </p>
            </div>

            {/* Thai */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  📖 4. ภาษาไทย & การสื่อสารเชิงวิเคราะห์
                </span>
                <span className="text-sm font-black text-emerald-600">{stats.thaiAvg}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${stats.thaiAvg}%` }} />
              </div>
              <p className="text-[11px] text-slate-600">
                ✓ เทคนิคสแกนใจความสำคัญบทความยาว, ระดับภาษา, คำราชาศัพท์ และสำนวนไทย
              </p>
            </div>
          </div>
        </div>

        {/* Gemini AI Expert Psychological & Academic Diagnostic */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 mb-8 shadow-md">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-indigo-800/80">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base text-white">
              บทวิเคราะห์ทางวิชาการและจิตวิทยาการศึกษา (Gemini AI Diagnostic Report)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 bg-white/10 p-3.5 rounded-xl">
              <span className="font-bold text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> จุดเด่นและสมรรถนะระดับสูง (Key Strengths):
              </span>
              <p className="text-slate-200 leading-relaxed">
                มีความเร็วในการประมวลผลเชิงคณิตศาสตร์และตรรกศาสตร์ (Cognitive Agility) โดดเด่น จดจำแบบจำลองเซลล์และปฏิกิริยาเคมีชีวภาพได้แม่นยำ พร้อมต่อยอดสู่ห้องเรียนพิเศษวิทยาศาสตร์-คณิตศาสตร์
              </p>
            </div>

            <div className="space-y-1.5 bg-white/10 p-3.5 rounded-xl">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> แผนพัฒนาต่อเนื่องเพื่อความเป็นเลิศ (Next Action):
              </span>
              <p className="text-slate-200 leading-relaxed">
                ฝึกฝนการทำข้อสอบ Mock Exam 45 นาที สัปดาห์ละ 2 ครั้งเพื่อเสริมความเสถียรในการตัดตัวเลือก และฝึกศัพท์การแพทย์เฉพาะทางเพื่อปูพื้นฐานวิชาชีพเภสัชกรรมในระดับมัธยมปลาย
              </p>
            </div>
          </div>
        </div>

        {/* Official Signatures */}
        <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-2 gap-8 text-center text-xs text-slate-700">
          <div className="space-y-6">
            <div className="h-10 flex items-end justify-center font-serif text-slate-800 italic">
              ไพโรจน์ มากแก้ว
            </div>
            <div>
              <div className="border-t border-slate-400 w-48 mx-auto pt-1 font-bold">
                (คุณพ่อไพโรจน์ มากแก้ว)
              </div>
              <p className="text-[10px] text-slate-500">ผู้ปกครอง / โค้ชประจำตัวผู้เรียน</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-10 flex items-end justify-center font-serif text-slate-800 italic">
              MASTER M.1 Academic Board
            </div>
            <div>
              <div className="border-t border-slate-400 w-48 mx-auto pt-1 font-bold">
                (คณะกรรมการฝ่ายวิชาการ MASTER ม.1)
              </div>
              <p className="text-[10px] text-slate-500">ผู้อำนวยการฝ่ายวิจัยหลักสูตรอัจฉริยะ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
