import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Brain, Target, Trophy, CheckCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white rounded-xl p-2">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-indigo-700">MASTER ม.1</span>
              <p className="text-xs text-gray-400 leading-none">เตรียมพร้อม พิชิตทุกข้อสอบ</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="outline" className="border-indigo-200 text-indigo-700">เข้าสู่ระบบ</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-indigo-600 hover:bg-indigo-700">สมัครฟรี</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <section className="py-20 text-center">
          <div className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            🤖 AI-Powered Personalized Learning
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            เตรียมพร้อมสอบเข้า
            <span className="text-indigo-600 block"> ม.1 อย่างชาญฉลาด</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            AI วิเคราะห์ผล Pre-Test และสร้างแผนการเรียนเฉพาะบุคคล เพื่อเป้าหมายเดียวกัน — ติดโรงเรียนในฝัน
          </p>
          <p className="text-gray-400 mb-10">คณิตศาสตร์ • วิทยาศาสตร์ • ภาษาอังกฤษ</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-10 py-6 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                🚀 เริ่มเรียนฟรีเลย!
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-10 py-6">
                มีบัญชีแล้ว? เข้าสู่ระบบ
              </Button>
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">ระบบทำงานอย่างไร?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', icon: '📝', title: 'ทำ Pre-Test', desc: 'ทดสอบ 30 ข้อ ครอบคลุม 3 วิชา ใช้เวลาประมาณ 20 นาที' },
              { step: '2', icon: '🤖', title: 'AI วิเคราะห์', desc: 'Gemini AI วิเคราะห์จุดอ่อน-จุดแข็ง และสร้างแผนเฉพาะบุคคล' },
              { step: '3', icon: '📚', title: 'เรียนตามแผน', desc: 'เรียนบทเรียนที่ AI แนะนำ พร้อมสูตรลับและเทคนิคพิเศษ' },
              { step: '4', icon: '🏆', title: 'ติดตามผล', desc: 'ดู Progress, Badge และคะแนนในทุกบท' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-bold shadow-lg shadow-indigo-200">
                  {item.step}
                </div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: 'AI วิเคราะห์', desc: 'Gemini AI วิเคราะห์จุดอ่อนและแนะแนวทางการเรียน', color: 'text-indigo-600 bg-indigo-50' },
              { icon: Target, title: 'เป้าหมายชัดเจน', desc: 'แผนการเรียนส่วนตัว เหมาะกับระดับของแต่ละคน', color: 'text-blue-600 bg-blue-50' },
              { icon: BookOpen, title: '3 วิชาหลัก', desc: 'คณิต วิทย์ และภาษาอังกฤษ ครบในที่เดียว', color: 'text-green-600 bg-green-50' },
              { icon: Trophy, title: 'ติดตามผล', desc: 'ดู Progress และ Badge ที่ได้รับในทุกบท', color: 'text-orange-600 bg-orange-50' },
            ].map((f, i) => (
              <Card key={i} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mx-auto mb-4`}>
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Subjects */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">3 วิชาหลัก พร้อมสูตรลับ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🔢', subject: 'คณิตศาสตร์', color: 'from-blue-500 to-blue-700',
                secret: '3-STEP ATTACK', modules: ['ตัวเลขและการดำเนินการ', 'เศษส่วน-ทศนิยม', 'พีชคณิต', 'เรขาคณิต', 'สถิติ']
              },
              {
                emoji: '🔬', subject: 'วิทยาศาสตร์', color: 'from-green-500 to-green-700',
                secret: 'SCIENCE DETECTIVE', modules: ['สิ่งมีชีวิต', 'สารและสมบัติ', 'แรงและการเคลื่อนที่', 'พลังงาน', 'โลกและอวกาศ']
              },
              {
                emoji: '🗣️', subject: 'ภาษาอังกฤษ', color: 'from-purple-500 to-purple-700',
                secret: '3S METHOD', modules: ['Grammar', 'Vocabulary', 'Reading', 'Listening & Speaking', 'Writing']
              },
            ].map((s, i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`bg-gradient-to-br ${s.color} text-white p-6`}>
                  <div className="text-5xl mb-3">{s.emoji}</div>
                  <h3 className="text-2xl font-bold">{s.subject}</h3>
                  <span className="text-white/80 text-sm">สูตรลับ: {s.secret}</span>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-2">
                    {s.modules.map((m, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Badge System */}
        <section className="py-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">ระบบ Badge & Level</h2>
            <p className="text-indigo-200 mb-8">สะสม Badge เพื่อวัดระดับความพร้อมสอบเข้า ม.1</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { badge: '🥉 BRONZE', desc: 'เข้าใจพื้นฐาน', score: '≥ 60%' },
                { badge: '🥈 SILVER', desc: 'แก้โจทย์หลากหลาย', score: '≥ 75%' },
                { badge: '🥇 GOLD', desc: 'พร้อมสอบ ม.1', score: '≥ 85%' },
                { badge: '💎 DIAMOND', desc: 'ระดับทุน', score: '≥ 95%' },
              ].map((b, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-4">
                  <div className="text-2xl mb-2">{b.badge}</div>
                  <p className="text-sm text-indigo-100">{b.desc}</p>
                  <p className="text-xs text-indigo-200 mt-1">{b.score}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">พร้อมเริ่มต้นหรือยัง?</h2>
          <p className="text-xl text-gray-500 mb-8">สมัครฟรี ทำ Pre-Test และรับแผนการเรียนจาก AI ทันที</p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-12 py-6 bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200">
              🎯 เริ่มเรียนฟรีเลย!
            </Button>
          </Link>
        </section>
      </main>

      <footer className="bg-white border-t py-8 text-center text-gray-400 text-sm">
        <p>© 2026 MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ</p>
      </footer>
    </div>
  )
}
