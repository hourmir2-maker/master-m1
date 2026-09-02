'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Footer from '@/components/Footer'
import { 
  SAMPLE_SCHOOL, 
  SAMPLE_CLASSROOMS, 
  SAMPLE_ASSIGNMENTS, 
  SAMPLE_SUBMISSIONS, 
  SAMPLE_ROSTERS,
  ClassroomInfo, 
  SchoolAssignment,
  StudentSubmission,
  StudentRosterItem,
  SchoolInfo,
  parseRosterText
} from '@/lib/school-portal-data'
import { 
  Building2, 
  ArrowLeft, 
  Users, 
  BookOpen, 
  Award, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Printer, 
  Download, 
  Sparkles,
  School,
  FileSpreadsheet,
  Copy,
  Edit3,
  Loader2,
  UserPlus,
  Upload,
  FileText,
  Trash2
} from 'lucide-react'

import { getAdminSettings } from '@/lib/admin-settings'

export default function TeacherPortalPage() {
  const [currentSchool, setCurrentSchool] = useState<SchoolInfo>(SAMPLE_SCHOOL)
  const [classrooms, setClassrooms] = useState<ClassroomInfo[]>(SAMPLE_CLASSROOMS)
  const [selectedClassId, setSelectedClassId] = useState<string>('cls_p6_1')
  const [assignments, setAssignments] = useState<SchoolAssignment[]>(SAMPLE_ASSIGNMENTS)
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(SAMPLE_SUBMISSIONS)
  const [rosters, setRosters] = useState<Record<string, StudentRosterItem[]>>(SAMPLE_ROSTERS)
  
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAddClassModal, setShowAddClassModal] = useState(false)
  const [showSchoolModal, setShowSchoolModal] = useState(false)
  const [showRosterModal, setShowRosterModal] = useState(false)

  // Forms
  const [newTitle, setNewTitle] = useState('')
  const [newSubject, setNewSubject] = useState<'math' | 'science' | 'thai' | 'english'>('math')
  
  // New Class Form
  const [newGradeLevel, setNewGradeLevel] = useState<'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'm1'>('p6')
  const [newRoomName, setNewRoomName] = useState('')
  const [newTeacherName, setNewTeacherName] = useState('')
  const [customClassCode, setCustomClassCode] = useState('')
  const [isCreatingClass, setIsCreatingClass] = useState(false)

  // School Form
  const [editSchoolName, setEditSchoolName] = useState(currentSchool.schoolName)
  const [editProvince, setEditProvince] = useState(currentSchool.province)
  const [editAffiliation, setEditAffiliation] = useState(currentSchool.affiliation)
  const [isSavingSchool, setIsSavingSchool] = useState(false)

  // Roster Import Form
  const [rosterImportTab, setRosterImportTab] = useState<'paste' | 'file' | 'current'>('paste')
  const [rawRosterText, setRawRosterText] = useState('')
  const [previewRoster, setPreviewRoster] = useState<StudentRosterItem[]>([])
  const [isSavingRoster, setIsSavingRoster] = useState(false)

  const [adminSettings, setAdminSettings] = useState(getAdminSettings())
  const [copiedCode, setCopiedCode] = useState(false)

  useEffect(() => {
    setAdminSettings(getAdminSettings())
    // Load local stored school, classrooms, and rosters if any
    try {
      const storedSchool = localStorage.getItem('master_m1_school_info')
      if (storedSchool) setCurrentSchool(JSON.parse(storedSchool))
      const storedClasses = localStorage.getItem('master_m1_classrooms')
      if (storedClasses) setClassrooms(JSON.parse(storedClasses))
      const storedRosters = localStorage.getItem('master_m1_rosters')
      if (storedRosters) setRosters(JSON.parse(storedRosters))
    } catch {}
  }, [])

  if (!adminSettings.school_enabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white flex flex-col justify-between p-4">
        <div className="max-w-md mx-auto my-auto text-center space-y-4 py-12">
          <div className="text-4xl">🏫</div>
          <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30 text-xs">ปิดปรับปรุงชั่วคราว</Badge>
          <h2 className="text-xl font-bold text-white">แดชบอร์ดคุณครูอยู่ในช่วงปิดปรับปรุงชั่วคราว</h2>
          <p className="text-xs text-slate-400">{adminSettings.maintenance_message}</p>
          <div className="pt-2 flex justify-center gap-2">
            <Link href="/dashboard">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs">
                ไปหน้าบทเรียนทั่วไป
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 text-xs font-bold">
                Admin Unlock
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentClass = classrooms.find(c => c.id === selectedClassId) || classrooms[0] || SAMPLE_CLASSROOMS[0]
  const currentRoster = rosters[currentClass.id] || []

  // คำนวณค่าสถิติห้องเรียน
  const totalSubmissions = submissions.length
  const avgClassScore = totalSubmissions > 0 
    ? (submissions.reduce((sum, s) => sum + s.score, 0) / totalSubmissions).toFixed(1)
    : '0'
  const passRate = totalSubmissions > 0
    ? Math.round((submissions.filter(s => s.percentage >= 60).length / totalSubmissions) * 100)
    : 0

  // สรุปตัวชี้วัดที่เด็กในห้องอ่อนที่สุด (Deficiencies)
  const deficiencyMap: Record<string, number> = {}
  submissions.forEach(s => {
    s.indicatorDeficiencies.forEach(d => {
      deficiencyMap[d] = (deficiencyMap[d] || 0) + 1
    })
  })
  const topDeficiencies = Object.entries(deficiencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  // สร้างห้องเรียนใหม่
  const handleCreateClassroom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRoomName.trim() || !newTeacherName.trim()) return

    setIsCreatingClass(true)
    const gradeLabelMap: Record<string, string> = {
      p1: 'ประถมศึกษาปีที่ 1',
      p2: 'ประถมศึกษาปีที่ 2',
      p3: 'ประถมศึกษาปีที่ 3',
      p4: 'ประถมศึกษาปีที่ 4',
      p5: 'ประถมศึกษาปีที่ 5',
      p6: 'ประถมศึกษาปีที่ 6',
      m1: 'มัธยมศึกษาปีที่ 1'
    }

    try {
      const res = await fetch('/api/school/create-classroom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolId: currentSchool.id,
          gradeLevel: newGradeLevel,
          gradeNameTh: gradeLabelMap[newGradeLevel] || 'ประถมศึกษาปีที่ 6',
          roomName: newRoomName.trim(),
          teacherName: newTeacherName.trim(),
          customCode: customClassCode.trim() || undefined
        })
      })
      const result = await res.json()
      if (result.success && result.data) {
        const created: ClassroomInfo = {
          id: result.data.id || `cls_${Date.now()}`,
          schoolId: currentSchool.id,
          classCode: result.data.class_code || customClassCode.toUpperCase() || `MST-${Math.floor(100 + Math.random() * 900)}`,
          gradeLevel: newGradeLevel,
          gradeNameTh: gradeLabelMap[newGradeLevel] || 'ประถมศึกษาปีที่ 6',
          roomName: newRoomName.trim(),
          teacherName: newTeacherName.trim(),
          studentCount: 30
        }
        const updated = [...classrooms, created]
        setClassrooms(updated)
        setSelectedClassId(created.id)
        localStorage.setItem('master_m1_classrooms', JSON.stringify(updated))
        setShowAddClassModal(false)
        setNewRoomName('')
        setNewTeacherName('')
        setCustomClassCode('')
      }
    } catch {
      // Fallback local creation
      const created: ClassroomInfo = {
        id: `cls_${Date.now()}`,
        schoolId: currentSchool.id,
        classCode: customClassCode.toUpperCase() || `MST-${Math.floor(100 + Math.random() * 900)}`,
        gradeLevel: newGradeLevel,
        gradeNameTh: gradeLabelMap[newGradeLevel] || 'ประถมศึกษาปีที่ 6',
        roomName: newRoomName.trim(),
        teacherName: newTeacherName.trim(),
        studentCount: 30
      }
      const updated = [...classrooms, created]
      setClassrooms(updated)
      setSelectedClassId(created.id)
      localStorage.setItem('master_m1_classrooms', JSON.stringify(updated))
      setShowAddClassModal(false)
    } finally {
      setIsCreatingClass(false)
    }
  }

  // บันทึกข้อมูลโรงเรียน
  const handleSaveSchool = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editSchoolName.trim() || !editProvince.trim()) return

    setIsSavingSchool(true)
    try {
      await fetch('/api/school/create-school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName: editSchoolName.trim(),
          province: editProvince.trim(),
          affiliation: editAffiliation.trim()
        })
      })
    } catch {}

    const updated: SchoolInfo = {
      ...currentSchool,
      schoolName: editSchoolName.trim(),
      province: editProvince.trim(),
      affiliation: editAffiliation.trim()
    }
    setCurrentSchool(updated)
    localStorage.setItem('master_m1_school_info', JSON.stringify(updated))
    setIsSavingSchool(false)
    setShowSchoolModal(false)
  }

  // แปลงข้อความรายชื่อนักเรียน
  const handleParseRoster = () => {
    if (!rawRosterText.trim()) return
    const parsed = parseRosterText(rawRosterText, currentClass.id)
    setPreviewRoster(parsed)
  }

  // อัปโหลดไฟล์ CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      const text = evt.target?.result as string
      if (text) {
        setRawRosterText(text)
        const parsed = parseRosterText(text, currentClass.id)
        setPreviewRoster(parsed)
      }
    }
    reader.readAsText(file, 'UTF-8')
  }

  // บันทึกรายชื่อนักเรียนเข้าสู่ห้องเรียน
  const handleSaveRoster = async () => {
    if (previewRoster.length === 0) return
    setIsSavingRoster(true)

    const updatedRosters = {
      ...rosters,
      [currentClass.id]: previewRoster
    }
    setRosters(updatedRosters)
    localStorage.setItem('master_m1_rosters', JSON.stringify(updatedRosters))

    // Update classroom studentCount
    const updatedClasses = classrooms.map(c => 
      c.id === currentClass.id ? { ...c, studentCount: previewRoster.length } : c
    )
    setClassrooms(updatedClasses)
    localStorage.setItem('master_m1_classrooms', JSON.stringify(updatedClasses))

    try {
      await fetch('/api/school/import-roster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classroomId: currentClass.id,
          students: previewRoster
        })
      })
    } catch {}

    setIsSavingRoster(false)
    setShowRosterModal(false)
    setRawRosterText('')
    setPreviewRoster([])
  }

  const handleDownloadTemplate = () => {
    const templateContent = '\uFEFFเลขที่,ชื่อ-นามสกุล,รหัสนักเรียน\n1,เด็กชายกิตติศักดิ์ พรหมดี,6901\n2,เด็กหญิงชลธิชา สิทธิโชค,6902\n3,เด็กชายนพรัตน์ วงศ์สุวรรณ,6903\n4,เด็กหญิงปานรวี แก้วมณี,6904\n5,เด็กชายภูมิรพีร์ มากแก้ว,6905'
    const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'template_student_roster.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const newAsg: SchoolAssignment = {
      id: `asg_${Date.now()}`,
      classroomId: selectedClassId,
      title: newTitle.trim(),
      subject: newSubject,
      examType: 'ONET',
      totalQuestions: newSubject === 'math' ? 15 : newSubject === 'science' ? 20 : newSubject === 'thai' ? 22 : 32,
      durationMinutes: newSubject === 'thai' ? 90 : 60,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true
    }
    setAssignments(prev => [newAsg, ...prev])
    setNewTitle('')
    setShowCreateModal(false)
  }

  const handleExportCSV = () => {
    const headers = ['เลขที่', 'ชื่อ-นามสกุล', 'คะแนนที่ได้', 'คะแนนเต็ม', 'ร้อยละ', 'วันเวลาที่ส่ง']
    const rows = submissions.map(s => [
      s.studentNumber,
      `"${s.studentName}"`,
      s.score,
      s.maxScore,
      `${s.percentage}%`,
      `"${s.submittedAt}"`
    ])
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `ตารางคะแนน_${currentClass.roomName}_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/school">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 text-xs">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                หน้าหลักพอร์ทัล
              </Button>
            </Link>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div>
                <span className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                  <School className="w-4 h-4 text-blue-600" />
                  {currentSchool.schoolName}
                </span>
                <p className="text-[10px] text-slate-400 leading-none mt-0.5">
                  จ.{currentSchool.province} • สังกัด {currentSchool.affiliation}
                </p>
              </div>
              <button
                onClick={() => setShowSchoolModal(true)}
                className="p-1 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                title="แก้ไขข้อมูลโรงเรียน"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setPreviewRoster(currentRoster)
                setShowRosterModal(true)
              }}
              className="border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold text-xs rounded-xl shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5 mr-1 text-blue-600" /> นำเข้ารายชื่อนักเรียน ({currentRoster.length})
            </Button>
            <Button
              size="sm"
              onClick={() => setShowAddClassModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> สร้างห้องเรียนใหม่
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full space-y-8">
        {/* Classroom Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 shrink-0">เลือกห้องเรียน:</span>
            <div className="flex flex-wrap gap-2">
              {classrooms.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedClassId(c.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedClassId === c.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c.roomName} ({c.classCode})
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="outline" className="text-xs font-mono font-bold border-blue-200 text-blue-800 bg-blue-50 py-1 px-3 flex items-center gap-1.5">
              <span>รหัสห้องสอบ: <b>{currentClass.classCode}</b></span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://master-m1.vercel.app/school/join?code=${currentClass.classCode}`)
                  setCopiedCode(true)
                  setTimeout(() => setCopiedCode(false), 2000)
                }}
                className="text-blue-600 hover:text-blue-800 ml-1"
                title="คัดลอกลิงก์สำหรับนักเรียน"
              >
                {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </Badge>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-slate-200 bg-white rounded-2xl shadow-xs">
            <CardContent className="pt-5 pb-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-0.5">
                {currentRoster.length > 0 ? currentRoster.length : currentClass.studentCount} คน
              </div>
              <p className="text-xs text-slate-500 font-semibold">จำนวนนักเรียนในห้อง</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white rounded-2xl shadow-xs">
            <CardContent className="pt-5 pb-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 mb-0.5">
                {avgClassScore} / 100
              </div>
              <p className="text-xs text-slate-500 font-semibold">คะแนนเฉลี่ยการสอบล่าสุด</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white rounded-2xl shadow-xs">
            <CardContent className="pt-5 pb-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600 mb-0.5">
                {passRate}%
              </div>
              <p className="text-xs text-slate-500 font-semibold">อัตราการผ่านเกณฑ์ (≥60%)</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white rounded-2xl shadow-xs">
            <CardContent className="pt-5 pb-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-orange-600 mb-0.5">
                {totalSubmissions} / {currentRoster.length > 0 ? currentRoster.length : currentClass.studentCount}
              </div>
              <p className="text-xs text-slate-500 font-semibold">ส่งกระดาษคำตอบแล้ว</p>
            </CardContent>
          </Card>
        </div>

        {/* Diagnostic AI Alert: Top Deficiencies in Class */}
        {topDeficiencies.length > 0 && (
          <div className="p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border-2 border-amber-200 rounded-3xl space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                🤖 AI วินิจฉัยตัวชี้วัดที่นักเรียนในห้องนี้ยังอ่อน (สพฐ. Deficiency Alert)
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              จากการวิเคราะห์คำตอบในชุดข้อสอบจำลอง สทศ. พบว่านักเรียนในห้องส่วนใหญ่ตอบผิดในตัวชี้วัดต่อไปนี้ แนะนำให้คุณครูสอนเน้นย้ำเสริม:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {topDeficiencies.map(([ind, count], i) => (
                <Badge key={i} className="bg-white border-amber-300 text-amber-950 font-bold text-xs py-1 px-3 shadow-xs">
                  ⚠️ {ind} (พบจุดผิด {count} คน)
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Two Columns: Assignment Manager (Left) & Student Score Roster (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Assignments (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                ชุดสอบที่มอบหมาย ({assignments.length})
              </h3>
              <Button
                size="sm"
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> สร้างชุดสอบใหม่
              </Button>
            </div>

            <div className="space-y-3">
              {assignments.map(asg => (
                <Card key={asg.id} className="border border-slate-200 bg-white rounded-2xl p-4 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-[10px] font-bold border-blue-200 text-blue-700">
                      {asg.examType}
                    </Badge>
                    <span className="text-[11px] text-slate-400">กำหนดส่ง: {asg.dueDate}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{asg.title}</h4>
                  <p className="text-[11px] text-slate-500 mb-3">
                    ⏱️ {asg.durationMinutes} นาที • {asg.totalQuestions} ข้อ
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        navigator.clipboard.writeText(`https://master-m1.vercel.app/school/join?code=${currentClass.classCode}`)
                        alert(`คัดลอกลิงก์สอบสำหรับนักเรียนเรียบร้อย: https://master-m1.vercel.app/school/join?code=${currentClass.classCode}`)
                      }}
                      className="text-xs font-bold text-blue-700 border-blue-200 flex-1"
                    >
                      🔗 คัดลอกลิงก์ส่งให้เด็ก
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Student Roster & Live Scores (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                ผลคะแนนรายบุคคล ({submissions.length} คน)
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="text-xs border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
              >
                <Download className="w-3.5 h-3.5 mr-1" /> ส่งออก Excel (CSV)
              </Button>
            </div>

            <Card className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xs">
              <div className="divide-y divide-slate-100">
                {submissions.map(sub => (
                  <div key={sub.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {sub.studentNumber}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{sub.studentName}</div>
                        <div className="text-[11px] text-slate-400">ส่งเมื่อ: {sub.submittedAt}</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono font-black text-sm text-slate-900">
                        {sub.score} <span className="text-[10px] text-slate-400 font-normal">/ {sub.maxScore}</span>
                      </div>
                      <Badge className={`text-[10px] font-bold ${
                        sub.percentage >= 80 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : sub.percentage >= 60 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {sub.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Modal: Import Student Roster */}
      {showRosterModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" /> นำเข้ารายชื่อนักเรียน ({currentClass.roomName})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  เมื่อนำเข้าแล้ว นักเรียนจะสามารถเลือกชื่อตัวเองเพื่อเข้าสอบได้ทันทีโดยไม่ต้องพิมพ์เอง
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRosterModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </Button>
            </div>

            {/* Sub-tabs */}
            <div className="flex gap-2 border-b border-slate-100 pb-2">
              <button
                onClick={() => setRosterImportTab('paste')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  rosterImportTab === 'paste' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                📋 คัดลอกวางข้อความ (ด่วน)
              </button>
              <button
                onClick={() => setRosterImportTab('file')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  rosterImportTab === 'file' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                📁 อัปโหลดไฟล์ CSV (Excel)
              </button>
              <button
                onClick={() => setRosterImportTab('current')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  rosterImportTab === 'current' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                👥 รายชื่อปัจจุบัน ({currentRoster.length} คน)
              </button>
            </div>

            {rosterImportTab === 'paste' && (
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-xl text-xs text-blue-900 leading-relaxed border border-blue-100">
                  💡 <b>วิธีใช้งาน:</b> คัดลอกรายชื่อจาก Word หรือ Excel มาวางได้เลย (รองรับทั้งแบบมีเลขที่หรือไม่มีเลขที่)
                  <div className="font-mono text-[11px] text-blue-700 mt-1 bg-white/60 p-2 rounded-lg">
                    1. ด.ช.กิตติศักดิ์ พรหมดี<br/>
                    2. ด.ญ.ชลธิชา สิทธิโชค<br/>
                    3. ด.ช.นพรัตน์ วงศ์สุวรรณ
                  </div>
                </div>

                <textarea
                  rows={6}
                  value={rawRosterText}
                  onChange={e => setRawRosterText(e.target.value)}
                  placeholder="วางรายชื่อนักเรียนที่นี่..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono focus:border-blue-500 outline-hidden"
                />

                <Button
                  type="button"
                  onClick={handleParseRoster}
                  disabled={!rawRosterText.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl"
                >
                  ⚡ ตรวจสอบและสกัดรายชื่อนักเรียน
                </Button>
              </div>
            )}

            {rosterImportTab === 'file' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center space-y-3 hover:border-blue-400 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl">
                    📊
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">เลือกไฟล์ CSV รายชื่อนักเรียน</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">รองรับไฟล์ .csv (UTF-8)</p>
                  </div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl text-xs">
                  <span className="text-slate-600">ยังไม่มีแบบฟอร์ม?</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadTemplate}
                    className="text-xs text-blue-600 border-blue-200 font-bold"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> ดาวน์โหลดแม่แบบ Excel (CSV)
                  </Button>
                </div>
              </div>
            )}

            {rosterImportTab === 'current' && (
              <div className="space-y-3">
                {currentRoster.length === 0 ? (
                  <p className="text-center py-6 text-xs text-slate-400">ยังไม่มีรายชื่อนักเรียนในห้องนี้</p>
                ) : (
                  <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-2xl">
                    {currentRoster.map(r => (
                      <div key={r.id} className="p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-mono font-bold flex items-center justify-center text-[10px]">
                            {r.studentNumber}
                          </span>
                          <span className="font-bold text-slate-800">{r.studentName}</span>
                        </div>
                        {r.studentCode && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                            รหัส: {r.studentCode}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Preview Section */}
            {previewRoster.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    พบรายชื่อนักเรียน {previewRoster.length} คน:
                  </h4>
                  <Badge className="bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    พร้อมบันทึก
                  </Badge>
                </div>

                <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-2xl">
                  {previewRoster.map((item, i) => (
                    <div key={i} className="p-2.5 px-3 flex items-center justify-between text-xs hover:bg-slate-50">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold flex items-center justify-center text-[10px]">
                          {item.studentNumber}
                        </span>
                        <span className="font-semibold text-slate-800">{item.studentName}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPreviewRoster([])}
                    className="flex-1 text-xs"
                  >
                    ล้างข้อมูล
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSaveRoster}
                    disabled={isSavingRoster}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    {isSavingRoster ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : '💾 ยืนยันบันทึกรายชื่อเข้าห้อง ➔'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Add New Classroom */}
      {showAddClassModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <School className="w-5 h-5 text-blue-600" /> สร้างห้องเรียนใหม่
            </h3>
            <form onSubmit={handleCreateClassroom} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ระดับชั้น</label>
                <select
                  value={newGradeLevel}
                  onChange={e => setNewGradeLevel(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="p6">ประถมศึกษาปีที่ 6 (เตรียมสอบ O-NET / เข้า ม.1)</option>
                  <option value="p5">ประถมศึกษาปีที่ 5</option>
                  <option value="p4">ประถมศึกษาปีที่ 4</option>
                  <option value="p3">ประถมศึกษาปีที่ 3 (เตรียมสอบ NT)</option>
                  <option value="p2">ประถมศึกษาปีที่ 2</option>
                  <option value="p1">ประถมศึกษาปีที่ 1 (เตรียมสอบ RT)</option>
                  <option value="m1">มัธยมศึกษาปีที่ 1 (Advance Track)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อห้องเรียน</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ป.6/1 (ห้องเรียนพิเศษ Gifted)"
                  value={newRoomName}
                  onChange={e => setNewRoomName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อคุณครูประจำวิชา / ประจำชั้น</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น คุณครูสมหมาย ใฝ่รู้"
                  value={newTeacherName}
                  onChange={e => setNewTeacherName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  รหัสห้องเรียน (กำหนดเอง หรือปล่อยว่างเพื่อให้ระบบสุ่มอัตโนมัติ)
                </label>
                <input
                  type="text"
                  placeholder="เช่น P6-GIFTED (ไม่บังคับ)"
                  value={customClassCode}
                  onChange={e => setCustomClassCode(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddClassModal(false)}
                  className="flex-1 text-xs"
                >
                  ยกเลิก
                </Button>
                <Button 
                  type="submit" 
                  disabled={isCreatingClass}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  {isCreatingClass ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : 'บันทึกห้องเรียน ➔'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit School Profile */}
      {showSchoolModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" /> ข้อมูลโรงเรียน
            </h3>
            <form onSubmit={handleSaveSchool} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อโรงเรียน</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น โรงเรียนอนุบาลสาธิตศึกษา"
                  value={editSchoolName}
                  onChange={e => setEditSchoolName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">จังหวัด</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น กรุงเทพมหานคร / นนทบุรี"
                  value={editProvince}
                  onChange={e => setEditProvince(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">สังกัด</label>
                <select
                  value={editAffiliation}
                  onChange={e => setEditAffiliation(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)">สพฐ. (สพป. / สพม.)</option>
                  <option value="สำนักการศึกษา กรุงเทพมหานคร (กทม.)">กทม.</option>
                  <option value="สำนักงานคณะกรรมการส่งเสริมการศึกษาเอกชน (สช.)">เอกชน (สช.)</option>
                  <option value="โรงเรียนสาธิตมหาวิทยาลัย">โรงเรียนสาธิตฯ</option>
                </select>
              </div>

              <div className="flex gap-2 pt-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowSchoolModal(false)}
                  className="flex-1 text-xs"
                >
                  ยกเลิก
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSavingSchool}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  {isSavingSchool ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : 'บันทึกข้อมูล ➔'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Assignment */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <h3 className="text-lg font-black text-slate-900">สร้างชุดสอบ / การบ้านใหม่</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">เลือกวิชา</label>
                <select
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="math">คณิตศาสตร์ (15 ข้อ / 60 นาที)</option>
                  <option value="science">วิทยาศาสตร์ (20 ข้อ / 60 นาที)</option>
                  <option value="thai">ภาษาไทย (22 ข้อ / 90 นาที)</option>
                  <option value="english">ภาษาอังกฤษ (32 ข้อ / 60 นาที)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อชุดสอบ</label>
                <input
                  type="text"
                  placeholder="เช่น สอบเก็บคะแนน O-NET ชุดที่ 2"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 text-xs"
                >
                  ยกเลิก
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  มอบหมายงาน ➔
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
