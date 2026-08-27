'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import { 
  SAMPLE_CLASSROOMS, 
  SAMPLE_ASSIGNMENTS, 
  ClassroomInfo, 
  SchoolAssignment 
} from '@/lib/school-portal-data'
import { 
  Building2, 
  ArrowLeft, 
  UserCheck, 
  CheckCircle2, 
  Play, 
  Timer, 
  BookOpen, 
  Sparkles,
  School
} from 'lucide-react'

function SchoolJoinContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialCode = searchParams.get('code') || ''

  const [classCode, setClassCode] = useState(initialCode)
  const [selectedClass, setSelectedClass] = useState<ClassroomInfo | null>(null)
  const [studentNumber, setStudentNumber] = useState('')
  const [studentName, setStudentName] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (initialCode) {
      const match = SAMPLE_CLASSROOMS.find(c => c.classCode.toLowerCase() === initialCode.trim().toLowerCase())
      if (match) {
        setSelectedClass(match)
      } else {
        // Fallback demo classroom
        setSelectedClass(SAMPLE_CLASSROOMS[0])
      }
    }
  }, [initialCode])

  const handleVerifyClass = (e: React.FormEvent) => {
    e.preventDefault()
    if (!classCode.trim()) {
      setErrorMessage('กรุณาระบุรหัสห้องเรียน')
      return
    }
    const match = SAMPLE_CLASSROOMS.find(c => c.classCode.toLowerCase() === classCode.trim().toLowerCase())
    if (match) {
      setSelectedClass(match)
      setErrorMessage('')
    } else {
      // Create a virtual match for demo
      setSelectedClass({
        id: 'cls_custom',
        schoolId: 'school_demo_1',
        classCode: classCode.toUpperCase(),
        gradeLevel: 'p6',
        gradeNameTh: 'ประถมศึกษาปีที่ 6',
        roomName: `ห้องเรียนรหัส ${classCode.toUpperCase()}`,
        teacherName: 'คุณครูประจำวิชา',
        studentCount: 30
      })
      setErrorMessage('')
    }
  }

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentNumber.trim() || !studentName.trim()) {
      setErrorMessage('กรุณาระบุเลขที่และชื่อ-นามสกุลของนักเรียนครับ')
      return
    }
    setIsJoined(true)
    setErrorMessage('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/school">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 text-xs">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                พอร์ทัลโรงเรียน
              </Button>
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <span className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <School className="w-4 h-4 text-blue-600" />
              ห้องสอบโรงเรียน
            </span>
          </div>

          <Badge variant="outline" className="text-xs font-mono border-blue-200 text-blue-700 bg-blue-50">
            {selectedClass ? selectedClass.classCode : 'รอรหัสห้อง'}
          </Badge>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 flex-1 w-full space-y-6">
        {!selectedClass ? (
          /* Step 1: Input Class Code */
          <Card className="border-2 border-blue-100 bg-white rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto text-2xl">
                🎟️
              </div>
              <h2 className="text-2xl font-black text-slate-900">กรอกรหัสห้องเรียน</h2>
              <p className="text-xs text-slate-500">สอบถามรหัสห้องเรียนจากคุณครูผู้สอนประจำวิชา</p>
            </div>

            <form onSubmit={handleVerifyClass} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">รหัสห้องเรียน (Class Code)</label>
                <input
                  type="text"
                  placeholder="เช่น DEMO-P601"
                  value={classCode}
                  onChange={e => {
                    setClassCode(e.target.value)
                    setErrorMessage('')
                  }}
                  className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl font-mono text-base font-bold text-slate-900 uppercase outline-hidden focus:border-blue-500"
                />
              </div>
              {errorMessage && <p className="text-xs text-red-500 font-bold">{errorMessage}</p>}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-2xl">
                ค้นหาห้องเรียน ➔
              </Button>
            </form>
          </Card>
        ) : !isJoined ? (
          /* Step 2: Student Identity (เลขที่ + ชื่อ) */
          <Card className="border-2 border-blue-100 bg-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
            <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase">ห้องเรียนที่พบ</span>
                <h3 className="font-extrabold text-slate-900 text-base">{selectedClass.roomName}</h3>
                <p className="text-xs text-slate-500">ครูผู้สอน: {selectedClass.teacherName} • {selectedClass.gradeNameTh}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedClass(null)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                เปลี่ยนห้อง
              </Button>
            </div>

            <div className="text-left space-y-1">
              <h2 className="text-lg font-black text-slate-900">ระบุข้อมูลนักเรียนเพื่อเข้าสอบ</h2>
              <p className="text-xs text-slate-500">คะแนนจะถูกส่งไปยังรายงานของคุณครูผู้สอนโดยอัตโนมัติ</p>
            </div>

            <form onSubmit={handleStartSession} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">เลขที่</label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    placeholder="เช่น 1"
                    value={studentNumber}
                    onChange={e => setStudentNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-mono text-center text-base font-bold text-slate-900 outline-hidden focus:border-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">ชื่อ - นามสกุล นักเรียน</label>
                  <input
                    type="text"
                    placeholder="เด็กชาย / เด็กหญิง..."
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-900 outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              {errorMessage && <p className="text-xs text-red-500 font-bold">{errorMessage}</p>}

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white font-bold py-6 rounded-2xl shadow-md shadow-blue-500/20">
                เข้าสู่ห้องสอบของห้องเรียน ➔
              </Button>
            </form>
          </Card>
        ) : (
          /* Step 3: Assignment List for this classroom */
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center text-sm">
                  {studentNumber}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{studentName}</h3>
                  <p className="text-xs text-slate-500">{selectedClass.roomName} • เลขที่ {studentNumber}</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 font-bold text-xs">
                ✓ พร้อมสอบ
              </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                ชุดข้อสอบที่ได้รับมอบหมายจากคุณครู
              </h3>

              {SAMPLE_ASSIGNMENTS.map((asg) => (
                <Card key={asg.id} className="border border-slate-200 bg-white rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] font-bold border-blue-200 text-blue-700">
                          {asg.examType}
                        </Badge>
                        <span className="text-xs text-slate-400">ครบกำหนด: {asg.dueDate}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{asg.title}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-3">
                        <span>⏱️ เวลาสอบ {asg.durationMinutes} นาที</span>
                        <span>📝 จำนวน {asg.totalQuestions} ข้อ</span>
                      </p>
                    </div>

                    <Link href={`/onet-exam?classroom=${selectedClass.classCode}&student=${studentNumber}`}>
                      <Button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 text-white font-bold text-xs px-6 rounded-xl shadow-xs">
                        <Play className="w-3.5 h-3.5 mr-1 fill-white" /> เริ่มทำข้อสอบ
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function SchoolJoinPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">กำลังโหลด...</div>}>
      <SchoolJoinContent />
    </Suspense>
  )
}
