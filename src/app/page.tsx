import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  BookOpen, 
  Brain, 
  Target, 
  Trophy, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  Layers,
  Timer,
  Printer,
  Volume2
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/40 to-red-50 text-slate-800">
      {/* Navbar */}
      <header className="bg-white/85 backdrop-blur-md border-b border-orange-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-orange-600 to-red-500 text-white rounded-xl p-2 shadow-md shadow-orange-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">MASTER ม.1</span>
              <p className="text-[11px] text-orange-900/60 font-medium leading-none mt-0.5">เตรียมพร้อม พิชิตทุกข้อสอบ</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/school">
              <Button variant="outline" className="border-blue-200 text-blue-800 bg-blue-50/80 hover:bg-blue-100 font-bold text-xs shadow-xs">
                🏫 สำหรับโรงเรียน (School Portal)
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-orange-800 hover:text-orange-900 hover:bg-orange-100/60 font-medium text-xs sm:text-sm">เข้าสู่ระบบ</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md shadow-orange-500/25 font-semibold text-xs sm:text-sm">สมัครฟรี</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 bg-orange-100/90 text-orange-800 border border-orange-200/80 rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
            ระบบกวดวิชา AI วิเคราะห์และปรับบทเรียนเฉพาะบุคคล (EdTech Framework)
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            เตรียมพร้อมสอบเข้า
            <span className="bg-gradient-to-r from-orange-600 via-red-500 to-amber-500 bg-clip-text text-transparent block mt-1">
              ม.1 โรงเรียนในฝัน
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-4 max-w-2xl mx-auto font-normal">
            ทดสอบก่อนเรียน (Pre-Test) ให้ <span className="font-semibold text-orange-700">Gemini AI</span> วิเคราะห์จุดอ่อน ท่องจำด้วย <span className="font-semibold text-amber-700">Flashcards</span> และสอบเสมือนจริงด้วย <span className="font-semibold text-red-700">Mock Exam 45 นาที</span>
          </p>
          
          <p className="text-sm font-medium text-orange-800/70 mb-10 flex items-center justify-center gap-2">
            <span>🔢 คณิตศาสตร์</span> • <span>🔬 วิทยาศาสตร์</span> • <span>🗣️ ภาษาอังกฤษ</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-xl shadow-orange-500/25 font-bold transition-all hover:scale-[1.02]">
                🚀 เริ่มทดสอบ Pre-Test ฟรี!
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/onet-exam" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-8 py-6 border-2 border-orange-500 bg-white text-orange-700 hover:bg-orange-50 font-bold shadow-md">
                🎯 สอบจำลอง O-NET 2570 (4 วิชา)
              </Button>
            </Link>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: 'AI วินิจฉัยแม่นยำ', desc: 'Gemini AI ชี้จุดอ่อน-จุดแข็งรายหัวข้อ พร้อมจัดลำดับการเรียนเฉพาะตัว', color: 'text-orange-600 bg-orange-100/70' },
              { icon: Layers, title: 'Flashcards 3D & TTS', desc: 'ระบบ Spaced Repetition ท่องจำสูตรลัดและศัพท์ พร้อมเสียงอ่านครูพี่ AI', color: 'text-amber-600 bg-amber-100/70' },
              { icon: Timer, title: 'Mock Exam 45 นาที', desc: 'ระบบจับเวลาจำลองสอบจริง 3 วิชา 30 ข้อ วิเคราะห์เกรดและความพร้อมทันที', color: 'text-red-600 bg-red-100/70' },
              { icon: Printer, title: 'ชีทสรุปสูตรลับแผ่นเดียว', desc: 'ดาวน์โหลดและพิมพ์สูตรลัด High-Yield 3 วิชาไปอ่านทบทวนหน้าห้องสอบ', color: 'text-yellow-700 bg-yellow-100/70' },
            ].map((f, i) => (
              <Card key={i} className="border border-orange-100 shadow-sm hover:shadow-lg transition-all bg-white rounded-2xl overflow-hidden">
                <CardContent className="pt-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-14 border-t border-orange-200/60">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 mb-2">ระบบทำงานอย่างไร?</h2>
          <p className="text-center text-slate-500 text-sm mb-12">4 ขั้นตอนสู่ความพร้อม 100% ในวันสอบ</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '1', icon: '📝', title: 'ทำ Pre-Test', desc: 'ทดสอบ 30 ข้อ ครอบคลุม 3 วิชาหลัก ประเมินพื้นฐานจริง' },
              { step: '2', icon: '🤖', title: 'AI ประมวลผล', desc: 'Gemini AI ชี้จุดอ่อน-จุดแข็ง พร้อมวิเคราะห์ลึกรายหัวข้อ' },
              { step: '3', icon: '📚', title: 'เรียน 24 โมดูล', desc: 'ฝึกฝนสูตรลัดและทำโจทย์ พร้อมทบทวนด้วย Flashcards' },
              { step: '4', icon: '🏆', title: 'สอบ Mock Exam', desc: 'จำลองสอบ 45 นาที เก็บ Badge และพร้อมลงสนามสอบจริง' },
            ].map((item) => (
              <div key={item.step} className="bg-white/70 backdrop-blur-sm border border-orange-100/80 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-lg mx-auto mb-4 font-black shadow-md shadow-orange-500/20">
                  {item.step}
                </div>
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-slate-800 text-base mb-1.5">{item.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subjects Preview */}
        <section className="py-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 mb-2">3 วิชาหลัก พร้อมสูตรลับ & เทคนิคขั้นสูง</h2>
          <p className="text-center text-slate-500 text-sm mb-12">เน้นความเข้าใจ กระชับ ไม่เน้นท่องจำ (24 โมดูลครบถ้วน)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                emoji: '🔢', subject: 'คณิตศาสตร์ (8 โมดูล)', color: 'from-orange-500 via-amber-500 to-yellow-500',
                secret: 'สูตรลัดติดจรวด', modules: ['ตัวเลข การดำเนินการ & ห.ร.ม./ค.ร.น.', 'เศษส่วน ทศนิยม & คำนวณระคน', 'ร้อยละ กำไร-ขาดทุน & ดอกเบี้ย', 'พีชคณิต สมการ & โจทย์อายุ/เงิน', 'เรขาคณิต 2 มิติ & พื้นที่แรเงา', 'อัตราส่วน & มาตราส่วน (Ratio)', 'รูปทรง 3 มิติ & ปริมาตรความจุ', 'สถิติ แผนภูมิวงกลม & ความน่าจะเป็น']
              },
              {
                emoji: '🔬', subject: 'วิทยาศาสตร์ (8 โมดูล)', color: 'from-red-500 via-orange-500 to-amber-500',
                secret: 'ทักษะวิทย์สสวท.', modules: ['เซลล์ พืช สัตว์ พันธุศาสตร์ & นิเวศ', 'สารบริสุทธิ์ สารผสม & แยกสาร', 'แรง การเคลื่อนที่ ความดัน & ลอยตัว', 'พลังงาน ความร้อน แสง เลนส์ & ไฟฟ้า', 'โลก ดาราศาสตร์ & ภัยธรรมชาติ', 'ร่างกายมนุษย์ & สารอาหาร (Health)', 'การเปลี่ยนแปลงกายภาพ & เคมี', 'ทักษะกระบวนการ & การทดลอง']
              },
              {
                emoji: '🗣️', subject: 'ภาษาอังกฤษ (8 โมดูล)', color: 'from-amber-500 via-orange-500 to-red-500',
                secret: 'เทคนิค 3S Reading', modules: ['Grammar, Tenses, If-Clause & Tags', 'Vocabulary Power & Root Words', 'Reading Comprehension (Skim/Scan)', 'Everyday Polite Communication', 'Error Identification & Structure', 'Active vs Passive & Modal Verbs', 'Comparison & Conjunctions', 'Cloze Test & Paragraph Completion']
              },
            ].map((s, i) => (
              <Card key={i} className="overflow-hidden border-orange-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 bg-white rounded-2xl">
                <div className={`bg-gradient-to-br ${s.color} text-white p-6 relative`}>
                  <div className="text-5xl mb-2">{s.emoji}</div>
                  <h3 className="text-2xl font-bold tracking-tight">{s.subject}</h3>
                  <span className="inline-block bg-black/20 text-white/95 text-xs font-semibold px-2.5 py-1 rounded-md mt-2">
                    🔑 สูตรลับ: {s.secret}
                  </span>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-2.5">
                    {s.modules.map((m, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Badge System */}
        <section className="py-14">
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl shadow-orange-600/20">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">ระบบจัดอันดับ & Badge ความเชี่ยวชาญ</h2>
            <p className="text-orange-100 text-sm max-w-xl mx-auto mb-8">สะสมคะแนนจากการทำแบบฝึกหัด เพื่อปลดล็อกตราสัญลักษณ์ตามระดับความพร้อมสู่สนามสอบ</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { badge: '🥉 BRONZE', desc: 'แม่นพื้นฐาน', score: '≥ 60%' },
                { badge: '🥈 SILVER', desc: 'แก้โจทย์ประยุกต์', score: '≥ 75%' },
                { badge: '🥇 GOLD', desc: 'พร้อมสอบเข้า ม.1', score: '≥ 85%' },
                { badge: '💎 DIAMOND', desc: 'ระดับห้องคิง / กิฟต์เต็ด', score: '≥ 95%' },
              ].map((b, i) => (
                <div key={i} className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-4 transition-transform hover:scale-105">
                  <div className="text-2xl mb-1.5">{b.badge}</div>
                  <p className="text-xs sm:text-sm font-medium text-white/90">{b.desc}</p>
                  <p className="text-xs text-orange-200 mt-1 font-semibold">{b.score}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">พร้อมเริ่มต้นพิชิต ม.1 หรือยัง?</h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base mb-8">
            สมัครฟรีวันนี้ ทำแบบทดสอบเพียง 20 นาที แล้วรับแผนการเรียนที่ออกแบบมาเพื่อคุณโดยเฉพาะ
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="text-base sm:text-lg px-10 py-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-xl shadow-orange-500/25 font-bold transition-all hover:scale-105">
                🎯 เริ่มทำ Pre-Test ฟรีทันที
              </Button>
            </Link>
            <Link href="/cheat-sheets">
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-8 py-6 border-2 border-orange-300 text-orange-800 hover:bg-orange-100/60 font-bold">
                📄 ดูสูตรลับ Cheat Sheet
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-orange-100 py-8 text-center text-slate-500 text-xs sm:text-sm">
        <p className="font-semibold text-slate-700">© 2026 MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ | สงวนลิขสิทธิ์</p>
        <p className="text-xs text-slate-500 mt-1">
          พัฒนาโดย <span className="font-bold text-orange-600">Phairot Makkaew</span> ร่วมกับ <span className="font-bold text-amber-600">Gemini AI</span>
        </p>
      </footer>
    </div>
  )
}
