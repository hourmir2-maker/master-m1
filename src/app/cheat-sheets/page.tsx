'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import { 
  ArrowLeft, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  Lightbulb,
  Award,
  Zap
} from 'lucide-react'

export default function CheatSheetsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'math' | 'science' | 'english' | 'thai'>('all')

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/40 to-red-50 text-slate-800 flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white/85 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40 shadow-sm no-print">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-orange-600">
                <ArrowLeft className="w-4 h-4 mr-1" />
                แดชบอร์ด
              </Button>
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <h1 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span>📄 สรุปสูตรลับแผ่นเดียว</span>
            </h1>
          </div>

          <Button
            onClick={handlePrint}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-md shadow-orange-500/20"
          >
            <Printer className="w-4 h-4 mr-1.5" />
            พิมพ์ / บันทึก PDF (A4)
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 w-full flex-1">
        {/* Category Tabs (Clean & Professional without parentheses) */}
        <div className="flex flex-wrap gap-2 justify-center mb-6 no-print">
          {(
            [
              { id: 'all', label: 'รวมครบ 4 วิชา', icon: '📚' },
              { id: 'math', label: 'คณิตศาสตร์', icon: '🔢' },
              { id: 'science', label: 'วิทยาศาสตร์', icon: '🔬' },
              { id: 'english', label: 'ภาษาอังกฤษ', icon: '🗣️' },
              { id: 'thai', label: 'ภาษาไทย 1000%', icon: '🇹🇭' },
            ] as const
          ).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white shadow-md scale-105'
                  : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Printable Cheat Sheet Document */}
        <div className="bg-white border-2 border-orange-200 rounded-3xl p-6 sm:p-10 shadow-lg print:border-none print:shadow-none print:p-2 space-y-8">
          {/* Sheet Header */}
          <div className="border-b-2 border-orange-500 pb-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              MASTER ม.1 — สรุปสูตรลับ & จุดเน้นพิชิตข้อสอบเข้า ม.1
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              รวบรวมสุดยอดสูตรลัดติดจรวด วิธีคิดลัด และจุดดักข้อสอบที่ออกสอบบ่อยที่สุด
            </p>
          </div>

          {/* 1. MATHEMATICS SECTION */}
          {(activeTab === 'all' || activeTab === 'math') && (
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-orange-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔢</span>
                  <h3 className="text-lg sm:text-xl font-black text-orange-950">
                    1. หมวดวิชาคณิตศาสตร์
                  </h3>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full">
                  Speed Math & Formulas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {/* Column 1: Speed Arithmetic & Algebra */}
                <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200 space-y-2.5">
                  <h4 className="font-bold text-orange-950 flex items-center gap-1.5 border-b border-orange-200/60 pb-1.5">
                    <Sparkles className="w-4 h-4 text-orange-600" /> สูตรคิดเลขเร็ว & พีชคณิต
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="bg-white/80 p-2.5 rounded-xl border border-orange-100">
                      <strong>⚡ ถอดรูท √N ใน 3 วินาที:</strong><br />
                      ตัด 2 ตัวท้าย ➔ ดูตัวหน้าหาหลักสิบกำลังสองไม่เกิน ➔ ตัดสินด้วยเลขท้าย 5
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-orange-100">
                      <strong>⚡ ยกกำลังสองเลขลงท้าย 5:</strong><br />
                      ตัวหน้า × (ตัวหน้า + 1) แล้วต่อท้าย 25 เช่น 85² = (8 × 9)25 = 7,225
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-orange-100">
                      <strong>⚡ อนุกรมเศษส่วนตัดกัน (Telescoping):</strong><br />
                      1/[a(a+d)] = (1/d) × [(1/a) - 1/(a+d)]<br />
                      เช่น 1/(1×2) + 1/(2×3) + ... + 1/(99×100) = 1 - (1/100) = 99/100
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-orange-100">
                      <strong>⚡ ผลบวก 1 ถึง n (อนุกรมเกาส์):</strong> S = [n(n + 1)] / 2 เช่น 1 ถึง 100 = 5,050
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-orange-100">
                      <strong>⚡ ทฤษฎีผลคูณ 2 จำนวน:</strong> A × B = ห.ร.ม.(A,B) × ค.ร.น.(A,B)
                    </li>
                  </ul>
                </div>

                {/* Column 2: Geometry, Ratio & Word Problems */}
                <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200 space-y-2.5">
                  <h4 className="font-bold text-orange-950 flex items-center gap-1.5 border-b border-orange-200/60 pb-1.5">
                    <Award className="w-4 h-4 text-orange-600" /> สูตรเรขาคณิต & โจทย์ประยุกต์
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="bg-white/80 p-2.5 rounded-xl border border-orange-100">
                      <strong>⚡ สูตรหามุมเข็มนาฬิกา:</strong><br />
                      มุม = |30H - 5.5M|° เช่น 03:40 น. ➔ |30(3) - 5.5(40)| = 130°
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-orange-100">
                      <strong>⚡ พื้นที่ใบไม้แรเงาในจัตุรัสด้าน a:</strong><br />
                      พื้นที่ = (4/7) × a² เช่น ด้าน 14 ซม. ➔ (4/7) × 14 × 14 = 112 ตร.ซม.
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-orange-100">
                      <strong>⚡ สูตรทำงานพร้อมกัน 2 คน:</strong><br />
                      เวลาเสร็จ = (A × B) / (A + B)
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-orange-100">
                      <strong>⚡ โมเดลแท่งแก้โจทย์เศษส่วนเหลือ:</strong><br />
                      วาดกล่องหาค่า 1 Unit เสมอ เพื่อเลี่ยงสมการติดเศษส่วนซับซ้อน
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-orange-100">
                      <strong>⚡ แปลง % เป็นองศาบนแผนภูมิวงกลม:</strong> มุมองศา = เปอร์เซ็นต์ × 3.6°
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* 2. SCIENCE SECTION */}
          {(activeTab === 'all' || activeTab === 'science') && (
            <section className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between border-b-2 border-red-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔬</span>
                  <h3 className="text-lg sm:text-xl font-black text-red-950">
                    2. หมวดวิชาวิทยาศาสตร์
                  </h3>
                </div>
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2.5 py-1 rounded-full">
                  Physics, Chemistry & Biology
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {/* Biology & Human Body */}
                <div className="p-4 bg-red-50/60 rounded-2xl border border-red-200 space-y-2.5">
                  <h4 className="font-bold text-red-950 flex items-center gap-1.5 border-b border-red-200/60 pb-1.5">
                    <Lightbulb className="w-4 h-4 text-red-600" /> ชีววิทยา ร่างกายมนุษย์ & ระบบนิเวศ
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="bg-white/80 p-2.5 rounded-xl border border-red-100">
                      <strong>🔬 เซลล์และออร์แกเนลล์:</strong><br />
                      พืชมี <em>ผนังเซลล์ + คลอโรพลาสต์</em> | สัตว์ไม่มี | ไมโทคอนเดรีย = แหล่งสร้างพลังงาน ATP
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-red-100">
                      <strong>🌸 หลังปฏิสนธิพืชดอก:</strong><br />
                      รังไข่ ➔ ผล | ออวุล ➔ เมล็ด | ไข่ ➔ ต้นอ่อน | สเปิร์ม + โพลาร์ ➔ เอนโดสเปิร์ม (3n)
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-red-100">
                      <strong>👓 เลนส์กับสายตา:</strong><br />
                      สายตาสั้น = <em>เลนส์เว้า</em> (กระจายแสง) | สายตายาว = <em>เลนส์นูน</em> (รวมแสง)
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-red-100">
                      <strong>📉 กฎ 10% พลังงาน:</strong><br />
                      พลังงานส่งต่อขั้นละ 10% (ตัด 0 ออก 1 ตัวทุกขั้น) อีก 90% สูญเสียเป็นความร้อน
                    </li>
                  </ul>
                </div>

                {/* Physics & Chemistry */}
                <div className="p-4 bg-red-50/60 rounded-2xl border border-red-200 space-y-2.5">
                  <h4 className="font-bold text-red-950 flex items-center gap-1.5 border-b border-red-200/60 pb-1.5">
                    <Zap className="w-4 h-4 text-red-600" /> ฟิสิกส์ เคมี & การคำนวณ
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="bg-white/80 p-2.5 rounded-xl border border-red-100">
                      <strong>🔥 คำนวณพลังงานความร้อน:</strong><br />
                      เปลี่ยน T ใช้ Q = mcΔt | เปลี่ยนสถานะใช้ Q = mL (Lหลอมเหลว = 80, Lกลายเป็นไอ = 540)
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-red-100">
                      <strong>✈️ หลักแบร์นูลลี:</strong><br />
                      ลมพัดเร็ว ➔ ความดันอากาศต่ำ ➔ เกิดแรงยกใต้ปีกเครื่องบิน / หลังคาเปิด
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-red-100">
                      <strong>🧪 โครมาโทกราฟี:</strong><br />
                      Rf = ระยะทางที่สารเคลื่อนที่ ÷ ระยะทางที่ตัวทำละลาย (ค่า 0 ≤ Rf ≤ 1)
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-red-100">
                      <strong>💡 วงจรไฟฟ้าบ้าน:</strong> ต่อแบบ <em>ขนาน</em> (หลอดหนึ่งขาด หลอดอื่นยังสว่างปกติ)
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* 3. ENGLISH SECTION */}
          {(activeTab === 'all' || activeTab === 'english') && (
            <section className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between border-b-2 border-amber-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🗣️</span>
                  <h3 className="text-lg sm:text-xl font-black text-amber-950">
                    3. หมวดวิชาภาษาอังกฤษ
                  </h3>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                  Grammar, Reading & Traps
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {/* Grammar Essentials */}
                <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2.5">
                  <h4 className="font-bold text-amber-950 flex items-center gap-1.5 border-b border-amber-200/60 pb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" /> สูตรลับไวยากรณ์ออกสอบ 100%
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                      <strong>👑 กฎเรียงคุณศัพท์ OSASCOMP:</strong><br />
                      Opinion ➔ Size ➔ Age ➔ Shape ➔ Color ➔ Origin ➔ Material ➔ Purpose
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                      <strong>🔤 กฎ a vs an:</strong><br />
                      ดูเสียงอ่าน! เสียง อ. ใช้ <em>an</em> (an hour, an honest boy) | เสียง ย./พยัญชนะ ใช้ <em>a</em> (a university)
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                      <strong>🔮 If-Clause Type 1 & 2:</strong><br />
                      • Type 1: If + V.1, will + V.inf<br />
                      • Type 2: If + V.2, would + V.inf (กฎใช้ <em>If I were you</em>)
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                      <strong>⏳ Past Continuous แทรก:</strong><br />
                      While + was/were + V.ing, V.2 (กำลังเกิดใช้ Cont, เข้ามาแทรกใช้ Simple)
                    </li>
                  </ul>
                </div>

                {/* Vocab & Structure Traps */}
                <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2.5">
                  <h4 className="font-bold text-amber-950 flex items-center gap-1.5 border-b border-amber-200/60 pb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" /> กับดักคำศัพท์ & โครงสร้าง
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                      <strong>🥛 คำนามนับไม่ได้ยอดฮิต:</strong><br />
                      <em>Advice, Information, Furniture, Bread, Homework</em> (ห้ามเติม -s และห้ามใช้ a/an)
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                      <strong>🎯 Present Perfect:</strong><br />
                      S + have/has + V.3 | <em>Since</em> (จุดเริ่มเวลา) vs <em>For</em> (ช่วงระยะเวลา)
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                      <strong>🔗 Relative Pronouns:</strong><br />
                      คน + who + V | คน + whom + S + V | คน + whose + คำนาม (เจ้าของ)
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                      <strong>🧩 Suffix บอกชนิดคำ:</strong><br />
                      -tion, -ment, -ness = <em>คำนาม</em> | -ful, -less, -ous = <em>คุณศัพท์</em>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Thai Cheat Sheet */}
          {(activeTab === 'all' || activeTab === 'thai') && (
            <section className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-100 space-y-4 print-section">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🇹🇭</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      สรุปสูตรลัดภาษาไทย 3 วินาที (สพฐ. 2551 ปรับปรุง 2560)
                    </h3>
                    <p className="text-xs text-emerald-600 font-medium">
                      เทคนิคตัดช้อยส์บาลี-สันสกฤต ราชาศัพท์ และการอ่านจับใจความ O-NET
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  ไทย 1000%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {/* Pali vs Sanskrit */}
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2.5">
                  <h4 className="font-bold text-emerald-950 flex items-center gap-1.5 border-b border-emerald-200/60 pb-1.5">
                    <Zap className="w-4 h-4 text-emerald-600" /> สูตรลัด 3 วิ: แยกคำยืม บาลี vs สันสกฤต
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                      <strong>✨ สันสกฤต (ตัดช้อยส์ใน 3 วิ):</strong><br />
                      เจอ <em>ศ ษ ฤ ฤๅ ฦ ฦๅ รหัน (รร) ควบกล้ำ</em> = <strong>สันสกฤตแน่นอน!</strong><br />
                      <span className="text-[11px] text-slate-500">เช่น กษัตริย์, ศิลปะ, ฤกษ์, ภรรยา, พฤกษ์</span>
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                      <strong>📌 บาลี (พยัญชนะวรรคเคร่งครัด):</strong><br />
                      ใช้ <em>ส ตัวเดียว</em> (ไม่มี ศ ษ) + พยัญชนะสะกดแถว 1 ตามด้วย 1 หรือ 2<br />
                      <span className="text-[11px] text-slate-500">เช่น สิกขา (ก=1 ข=2), วุฒิ, ปัญญา, สงฆ์</span>
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                      <strong>👑 คำไทยแท้:</strong> สระไอไม้พะม้วน 20 คำ + คำโดดเสียงวรรณยุกต์ซ้อน
                    </li>
                  </ul>
                </div>

                {/* Royal & Sentence Structure */}
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2.5">
                  <h4 className="font-bold text-emerald-950 flex items-center gap-1.5 border-b border-emerald-200/60 pb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> กับดักประโยค & คำราชาศัพท์
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                      <strong>🏰 คำราชาศัพท์ "ทรง":</strong><br />
                      <em>ทรง + คำกริยาราชาศัพท์ = ผิด!</em> (ห้ามใช้ ทรงโปรด, ทรงเสด็จ)<br />
                      <em>ทรง + คำนามธรรมดา = ถูก</em> (ทรงศีล, ทรงดนตรี)
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                      <strong>🧩 ชนิดประโยค 3 แบบ:</strong><br />
                      • ความเดียว: ประธาน 1 + กริยา 1<br />
                      • ความรวม: มีคำเชื่อม <em>และ, แต่, หรือ, จึง</em><br />
                      • ความซ้อน: มีประโยคย่อยเชื่อมด้วย <em>ที่, ซึ่ง, อัน, ว่า, ให้</em>
                    </li>
                    <li className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                      <strong>📖 อ่านจับใจความ O-NET:</strong><br />
                      ใจความสำคัญมักอยู่ <em>ประโยคแรก</em> หรือ <em>ประโยคสุดท้าย</em> ของย่อหน้า
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Footer Note */}
          <div className="border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
            <p className="font-semibold text-slate-700">
              © 2026 MASTER ม.1 — สรุปสูตรลับ & จุดเน้นพิชิตข้อสอบเข้า ม.1 | สงวนลิขสิทธิ์
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              พร้อมสำหรับพิมพ์แผ่นเดียวขนาด A4 หน้า-หลัง ทบทวนหน้าห้องสอบ
            </p>
          </div>

          <div className="no-print">
            <AdBanner slotId="cheat_sheet_bottom" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
