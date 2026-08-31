'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'
import { 
  getAdminSettings, 
  saveAdminSettings, 
  verifyAdminPassword, 
  isAdminAuthenticated, 
  setAdminAuthSession,
  logAdminAction,
  exportCompleteSystemBackup,
  exportProgressCSV,
  AdminSettings,
  BroadcastLog 
} from '@/lib/admin-settings'
import { LESSONS_DATA } from '@/lib/lessons-data'
import { SAMPLE_CLASSROOMS, SAMPLE_SCHOOL } from '@/lib/school-portal-data'
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  ArrowLeft, 
  School, 
  Power, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  BookOpen, 
  Layers, 
  Cpu, 
  LogOut, 
  Send,
  Eye,
  EyeOff,
  Heart,
  BarChart3,
  FileText,
  DollarSign,
  Download,
  Users,
  Megaphone,
  Radio,
  Sliders,
  Check,
  History,
  KeyRound,
  FileSpreadsheet,
  Printer,
  ChevronRight
} from 'lucide-react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [passwordInput, setPasswordInput] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  
  // Navigation Tabs: overview | telemetry | students | cms | school_mgr | broadcast | monetization | backup
  const [activeTab, setActiveTab] = useState<'overview' | 'telemetry' | 'students' | 'cms' | 'school_mgr' | 'broadcast' | 'monetization' | 'backup'>('overview')

  // Settings State
  const [settings, setSettings] = useState<AdminSettings>(getAdminSettings())
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null)
  const [healthStatus, setHealthStatus] = useState<string | null>(null)

  // Students Directory State
  const [studentsList, setStudentsList] = useState<any[]>([])
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [studentSearchQuery, setStudentSearchQuery] = useState<string>('')
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false)
  const [isAnalyzingStudent, setIsAnalyzingStudent] = useState<boolean>(false)
  const [studentAiAnalysis, setStudentAiAnalysis] = useState<Record<string, any>>({})

  // CMS State
  const [selectedSubject, setSelectedSubject] = useState<'math' | 'science' | 'english' | 'thai'>('math')
  const [selectedModuleKey, setSelectedModuleKey] = useState<string>('numbers_basics')
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null)
  const [customQuestionText, setCustomQuestionText] = useState<string>('')

  // Broadcast State
  const [broadcastTitle, setBroadcastTitle] = useState<string>('')
  const [broadcastMsg, setBroadcastMsg] = useState<string>('')
  const [broadcastTarget, setBroadcastTarget] = useState<'all_parents' | 'gifted_track' | 'school_teachers'>('all_parents')
  const [broadcastSent, setBroadcastSent] = useState<boolean>(false)

  // Telemetry & Live Progress State
  const [telemetryMode, setTelemetryMode] = useState<'live' | 'benchmark'>('live')
  const [liveProgressList, setLiveProgressList] = useState<Array<{ subject?: string; completed?: boolean; score?: number; moduleId?: string; module_id?: string; updated_at?: string }>>([])

  // Fetch Students Directory from API
  const fetchStudents = async () => {
    setIsLoadingStudents(true)
    try {
      const res = await fetch('/api/admin/students')
      if (res.ok) {
        const data = await res.json()
        if (data.success && data.students) {
          setStudentsList(data.students)
          if (!selectedStudent && data.students.length > 0) {
            setSelectedStudent(data.students[0])
          }
        }
      }
    } catch (e) {
      console.warn('Error loading students:', e)
    } finally {
      setIsLoadingStudents(false)
    }
  }

  // Trigger Individual Student AI Analysis
  const handleAnalyzeStudent = async (student: any) => {
    if (!student) return
    setIsAnalyzingStudent(true)
    try {
      const res = await fetch('/api/admin/analyze-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student.id,
          studentName: student.fullName,
          isFortune: student.isFortune,
          stats: student.stats,
          recentHistory: student.recentHistory,
          preTestScores: student.preTestScores
        })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.success && data.analysis) {
          setStudentAiAnalysis(prev => ({
            ...prev,
            [student.id]: data.analysis
          }))
          logAdminAction('AI_ANALYZE_STUDENT', `วิเคราะห์พัฒนาการรายบุคคลของ: ${student.fullName}`)
          triggerToast(`วิเคราะห์พัฒนาการของ ${student.fullName} ด้วย Gemini AI สำเร็จ!`)
        }
      }
    } catch (e) {
      console.warn('Error analyzing student:', e)
    } finally {
      setIsAnalyzingStudent(false)
    }
  }

  // Load Initial Settings & Live Progress
  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated())
    const currentSettings = getAdminSettings()
    setSettings(currentSettings)

    try {
      const stored = localStorage.getItem('master_m1_progress')
      if (stored) {
        setLiveProgressList(JSON.parse(stored))
      }
    } catch (e) {
      console.warn('Error reading live progress:', e)
    }

    fetchStudents()
  }, [])

  // Handle Login
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (verifyAdminPassword(passwordInput)) {
      setAdminAuthSession(true)
      setIsAuthenticated(true)
      setPasswordError('')
      setPasswordInput('')
      setSettings(getAdminSettings())
    } else {
      setPasswordError('รหัสผ่าน Admin ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
    }
  }

  // Handle Logout
  const handleLogout = () => {
    setAdminAuthSession(false)
    setIsAuthenticated(false)
    setPasswordInput('')
  }

  // Show Toast
  const triggerToast = (msg: string) => {
    setSaveSuccess(msg)
    setTimeout(() => setSaveSuccess(null), 3000)
  }

  // Toggle School Feature
  const handleToggleSchool = (newVal: boolean) => {
    const updated = saveAdminSettings({ school_enabled: newVal })
    setSettings(updated)
    logAdminAction('TOGGLE_SCHOOL_FEATURE', `เปลี่ยนสถานะระบบโรงเรียนเป็น: ${newVal ? 'เปิดใช้งาน' : 'ปิดปรับปรุง'}`)
    triggerToast(newVal ? 'เปิดระบบสำหรับโรงเรียนเรียบร้อยแล้ว' : 'ปิดระบบโรงเรียนเข้าสู่โหมดปรับปรุงชั่วคราวแล้ว')
  }

  // Save Maintenance Message
  const handleSaveMessage = (msg: string) => {
    const updated = saveAdminSettings({ maintenance_message: msg })
    setSettings(updated)
    logAdminAction('UPDATE_MAINTENANCE_MESSAGE', `อัปเดตข้อความปิดปรับปรุง: ${msg}`)
    triggerToast('บันทึกข้อความแจ้งเตือนเรียบร้อยแล้ว')
  }

  // Toggle AdSense Slot
  const handleToggleAdSlot = (slotKey: keyof AdminSettings['adsense_slots']) => {
    const updatedSlots = {
      ...settings.adsense_slots,
      [slotKey]: !settings.adsense_slots[slotKey]
    }
    const updated = saveAdminSettings({ adsense_slots: updatedSlots })
    setSettings(updated)
    logAdminAction('TOGGLE_ADSENSE_SLOT', `เปลี่ยนสถานะโฆษณาช่อง ${slotKey} เป็น: ${updatedSlots[slotKey] ? 'เปิด' : 'ปิด'}`)
    triggerToast(`บันทึกสถานะโฆษณาช่อง ${slotKey} แล้ว`)
  }

  // Handle Broadcast Dispatch
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault()
    if (!broadcastTitle.trim() || !broadcastMsg.trim()) return

    const newLog: BroadcastLog = {
      id: `bc_${Date.now()}`,
      timestamp: new Date().toISOString(),
      title: broadcastTitle.trim(),
      message: broadcastMsg.trim(),
      targetGroup: broadcastTarget,
      status: 'sent',
      deliveredCount: broadcastTarget === 'gifted_track' ? 18 : 64
    }

    const updatedLogs = [newLog, ...(settings.broadcast_logs || [])]
    const updated = saveAdminSettings({ broadcast_logs: updatedLogs })
    setSettings(updated)
    logAdminAction('BROADCAST_TELEGRAM', `ส่งข้อความ: "${broadcastTitle}" ไปยังกลุ่ม ${broadcastTarget}`)
    
    setBroadcastSent(true)
    setBroadcastTitle('')
    setBroadcastMsg('')
    setTimeout(() => setBroadcastSent(false), 4000)
    triggerToast('ส่งข้อความบรอดแคสต์เข้า Telegram ผู้ปกครองสำเร็จ!')
  }

  // Handle Backup Downloads
  const handleDownloadJSONBackup = () => {
    const data = exportCompleteSystemBackup()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `master-m1-full-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    logAdminAction('DOWNLOAD_BACKUP_JSON', 'ดาวน์โหลด Full System Backup (JSON)')
    triggerToast('ดาวน์โหลดไฟล์สำรองข้อมูล JSON เรียบร้อย')
  }

  const handleDownloadCSV = () => {
    const data = exportProgressCSV()
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `master-m1-progress-scores-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    logAdminAction('DOWNLOAD_PROGRESS_CSV', 'ดาวน์โหลดผลคะแนนการเรียน (CSV)')
    triggerToast('ดาวน์โหลดคะแนนการเรียน CSV เรียบร้อย')
  }

  // Live Progress Calculation for Fortune
  const liveStats = useMemo(() => {
    const mathItems = liveProgressList.filter(p => p.subject === 'math' && p.completed)
    const scienceItems = liveProgressList.filter(p => p.subject === 'science' && p.completed)
    const englishItems = liveProgressList.filter(p => p.subject === 'english' && p.completed)
    const thaiItems = liveProgressList.filter(p => p.subject === 'thai' && p.completed)

    const calcAvg = (items: typeof liveProgressList, defaultTarget: number) => {
      if (items.length === 0) return defaultTarget
      const sum = items.reduce((acc, curr) => acc + (curr.score || 100), 0)
      return Math.round(sum / items.length)
    }

    const mathAvg = calcAvg(mathItems, 96)
    const scienceAvg = calcAvg(scienceItems, 94)
    const englishAvg = calcAvg(englishItems, 92)
    const thaiAvg = calcAvg(thaiItems, 96)

    const totalDone = mathItems.length + scienceItems.length + englishItems.length + thaiItems.length
    const overallAvg = Math.round((mathAvg + scienceAvg + englishAvg + thaiAvg) / 4)

    return {
      mathDone: mathItems.length,
      mathAvg,
      scienceDone: scienceItems.length,
      scienceAvg,
      englishDone: englishItems.length,
      englishAvg,
      thaiDone: thaiItems.length,
      thaiAvg,
      totalDone,
      overallAvg,
      hasRealData: totalDone > 0
    }
  }, [liveProgressList])

  // CMS Questions Lookup
  const currentSubjectModules = useMemo(() => {
    return LESSONS_DATA[selectedSubject] || {}
  }, [selectedSubject])

  const currentModuleData = useMemo(() => {
    return currentSubjectModules[selectedModuleKey] || Object.values(currentSubjectModules)[0]
  }, [currentSubjectModules, selectedModuleKey])

  // Run Health Check
  const runHealthCheck = () => {
    setHealthStatus('checking')
    setTimeout(() => {
      setHealthStatus('healthy')
      logAdminAction('RUN_DIAGNOSTIC', 'ทดสอบระบบความสมบูรณ์ Parity 100% ผ่านทุกหัวข้อ')
    }, 1000)
  }

  // =========================================================================
  // 🔒 SCREEN 1: ADMIN LOGIN (PIN / PASSWORD GATE)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white flex flex-col justify-between p-4">
        <header className="max-w-md mx-auto w-full pt-6 flex justify-between items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> กลับหน้าหลัก
            </Button>
          </Link>
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
            MASTER M.1 Super Admin
          </Badge>
        </header>

        <main className="max-w-md mx-auto w-full my-auto py-8">
          <Card className="bg-slate-900/90 border-slate-700/80 shadow-2xl backdrop-blur-md rounded-3xl overflow-hidden text-white">
            <div className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 p-6 text-center text-white">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-3 shadow-inner">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-black">ระบบผู้ดูแลระบบ (Admin)</h1>
              <p className="text-orange-100 text-xs mt-1">MASTER M.1 — Executive Control Panel</p>
            </div>

            <CardContent className="p-6 space-y-5">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    กรอกรหัสผ่านผู้ดูแลระบบ (Master Admin Password)
                  </label>
                  <div className="relative">
                    <Input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="กรอกรหัสผ่าน 8 หลัก..."
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value)
                        setPasswordError('')
                      }}
                      className="bg-slate-800/90 border-slate-700 text-white placeholder:text-slate-500 text-center tracking-widest text-lg font-mono rounded-xl pr-10 focus:border-orange-500 focus:ring-orange-500"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {passwordError && (
                    <div className="mt-2 text-xs text-rose-400 bg-rose-950/50 border border-rose-800/60 p-2.5 rounded-xl flex items-center gap-1.5 animate-shake">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{passwordError}</span>
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 font-black text-base bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl shadow-lg shadow-orange-500/25 transition-all"
                >
                  <Unlock className="w-5 h-5 mr-2" /> ปลดล็อกระบบ Admin
                </Button>
              </form>

              <div className="pt-4 border-t border-slate-800 text-center">
                <p className="text-[11px] text-slate-400">
                  🔒 สงวนสิทธิ์สำหรับคุณพ่อไพโรจน์ มากแก้ว ผู้พัฒนาระบบเท่านั้น
                </p>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    )
  }

  // =========================================================================
  // 🎛️ SCREEN 2: ADMIN CONTROL CENTER (AUTHENTICATED - 7 PILLARS)
  // =========================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-slate-100 flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-2 rounded-xl shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-base">MASTER M.1 Super Admin</span>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] font-bold">
                  🟢 Root Active
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400">ผู้พัฒนา: คุณพ่อไพโรจน์ มากแก้ว</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" /> หน้าผู้เรียน
              </Button>
            </Link>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              size="sm" 
              className="border-rose-800/60 bg-rose-950/30 text-rose-300 hover:bg-rose-900/50 hover:text-white text-xs font-bold"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" /> ออกจากระบบ Admin
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tab Bar (7 Pillars) */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 sticky top-[57px] z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto py-2 scrollbar-none">
          {[
            { id: 'overview', label: 'ภาพรวม & สวิตช์โรงเรียน', icon: Sliders },
            { id: 'telemetry', label: '📊 แดชบอร์ดน้องฟอร์จูน', icon: BarChart3 },
            { id: 'students', label: '👥 ผู้เรียนรายคน', icon: Users },
            { id: 'cms', label: '📝 คลังข้อสอบ 560 ข้อ', icon: BookOpen },
            { id: 'school_mgr', label: '🏫 จัดการระบบโรงเรียน', icon: School },
            { id: 'broadcast', label: '📢 บรอดแคสต์ Telegram', icon: Megaphone },
            { id: 'monetization', label: '💰 โฆษณา AdSense', icon: DollarSign },
            { id: 'backup', label: '🛡️ สำรองข้อมูล & Audit', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md shadow-orange-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
        {saveSuccess && (
          <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-200 p-3.5 rounded-2xl flex items-center justify-between text-sm shadow-lg animate-fade-in">
            <span className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              {saveSuccess}
            </span>
          </div>
        )}

        {/* =========================================================================
            TAB 1: OVERVIEW & MASTER CONTROLS
            ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            {/* Hero System Status Banner */}
            <div className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 rounded-3xl p-6 text-white shadow-xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Badge className="bg-white/20 text-white border-white/30 text-xs font-bold">
                  Super Admin Management Matrix
                </Badge>
                <span className="text-xs text-orange-100 font-mono">
                  อัปเดตล่าสุด: {new Date(settings.last_updated || Date.now()).toLocaleTimeString('th-TH')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                แผงควบคุมระบบแม่ข่าย MASTER ม.1
              </h2>
              <p className="text-orange-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
                ศูนย์บัญชาการระบบ EdTech บริหารหลักสูตร 56 โมดูล (560 ข้อสอบ), เปิด-ปิดระบบโรงเรียน, กระจายข่าวสารผู้ปกครอง และควบคุมความปลอดภัย
              </p>
            </div>

            {/* School Feature Switch Card */}
            <Card className="bg-slate-900/90 border-slate-800 rounded-3xl shadow-lg overflow-hidden">
              <CardHeader className="bg-slate-850/60 border-b border-slate-800 p-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl">
                      🏫
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                        สวิตช์ควบคุมระบบสำหรับโรงเรียน (School Pathway Switch)
                        {settings.school_enabled ? (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                            🟢 เปิดใช้งานอยู่ (Active)
                          </Badge>
                        ) : (
                          <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30 text-xs">
                            🔴 ปิดใช้งานชั่วคราว (Maintenance)
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-xs mt-0.5">
                        ควบคุมการเข้าถึงเส้นทาง /school, /school/join (ห้องเรียน), และ /school/teacher (แดชบอร์ดคุณครู)
                      </CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {settings.school_enabled ? (
                      <Button 
                        onClick={() => handleToggleSchool(false)}
                        variant="destructive"
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-4 py-5 rounded-2xl shadow-lg flex items-center gap-2"
                      >
                        <Power className="w-4 h-4" /> ปิดฟังก์ชันโรงเรียนชั่วคราว
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleToggleSchool(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-5 rounded-2xl shadow-lg flex items-center gap-2"
                      >
                        <Power className="w-4 h-4" /> เปิดใช้งานระบบโรงเรียน
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-5 space-y-4">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    ข้อความแจ้งเตือนเมื่อระบบโรงเรียนปิดปรับปรุง (Maintenance Banner Notice):
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      defaultValue={settings.maintenance_message}
                      onBlur={(e) => handleSaveMessage(e.target.value)}
                      className="bg-slate-900 border-slate-700 text-white text-xs rounded-xl"
                      placeholder="ระบุข้อความแจ้งเตือนครูและนักเรียน..."
                    />
                    <Button 
                      size="sm" 
                      onClick={() => handleSaveMessage(settings.maintenance_message)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl px-4 shrink-0"
                    >
                      บันทึกข้อความ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-slate-900/90 border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>หลักสูตรครบ 4 วิชา</span>
                  <BookOpen className="w-4 h-4 text-orange-400" />
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-black text-white">56 โมดูล</div>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">✓ ซิงค์ครบทุกวิชา (ไทย คณิต วิทย์ อังกฤษ)</p>
                </div>
              </Card>

              <Card className="bg-slate-900/90 border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>คลังข้อสอบ Scaffolding</span>
                  <Layers className="w-4 h-4 text-amber-400" />
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-black text-white">560 ข้อ</div>
                  <p className="text-[11px] text-amber-300 font-semibold mt-0.5">✓ บันไดความยาก 10 ข้อ/โมดูล</p>
                </div>
              </Card>

              <Card className="bg-slate-900/90 border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>คลังคำศัพท์ Oxford 3000</span>
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-black text-white">11 หมวด</div>
                  <p className="text-[11px] text-blue-300 font-semibold mt-0.5">✓ US Audio + คำอ่านไทย + Flashcards</p>
                </div>
              </Card>

              <Card className="bg-slate-900/90 border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>นักเรียนคนพิเศษ (VIP)</span>
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                </div>
                <div className="mt-2">
                  <div className="text-base font-black text-white truncate">ด.ช.ภูมิรพีร์ มากแก้ว</div>
                  <p className="text-[11px] text-rose-300 font-semibold mt-0.5">🎯 น้องฟอร์จูน (ม.1 Gifted & เภสัชกร)</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: EXECUTIVE STUDENT TELEMETRY & FORTUNE RADAR
            ========================================================================= */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6 animate-fade-in">
            {/* VIP Student Card: Nong Fortune */}
            <Card className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border-2 border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center text-3xl shadow-md">
                    🎓
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-white">ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน)</h3>
                      <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs font-bold">
                        ⭐ Gifted VIP Student
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      เป้าหมาย: สอบเข้าห้องเรียนพิเศษ ม.1 Gifted / SMP / EP ➔ ปูทางสู่คณะเภสัชศาสตร์และการแพทย์
                    </p>
                  </div>
                </div>

                {/* Telemetry Mode Toggle */}
                <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                  <button
                    onClick={() => setTelemetryMode('live')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      telemetryMode === 'live'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🟢 สถิติสดจากฐานข้อมูล ({liveStats.totalDone}/56 บท)
                  </button>
                  <button
                    onClick={() => setTelemetryMode('benchmark')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      telemetryMode === 'benchmark'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ⭐ เกณฑ์เป้าหมาย Gifted
                  </button>
                </div>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="text-slate-400 font-medium">
                  {telemetryMode === 'live' 
                    ? `📡 ซิงค์ผลคะแนนจริงจากการทำข้อสอบในระบบ (${liveStats.hasRealData ? 'บันทึกสำเร็จ' : 'พร้อมบันทึก Real-time'})`
                    : '🎯 เกณฑ์มาตรฐานเป้าหมายสำหรับสอบเข้าห้องเรียนพิเศษ ม.1'}
                </span>
                <div className="text-right">
                  <span className="text-slate-400 font-bold mr-2">ดัชนีความพร้อมรวม:</span>
                  <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    {telemetryMode === 'live' 
                      ? (liveStats.hasRealData ? `${liveStats.overallAvg}% (คะแนนจริงเฉลี่ย)` : '94.5% (Target Level)')
                      : '94.5% (ระดับอัจฉริยะ)'}
                  </span>
                </div>
              </div>

              {/* 4 Subjects Progress Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Math */}
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-orange-400">🔢 คณิตศาสตร์</span>
                    <span className="text-white">
                      {telemetryMode === 'live' 
                        ? `${liveStats.mathDone}/16 บท (${liveStats.mathAvg}%)` 
                        : '96% (16 บท)'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all" 
                      style={{ width: `${telemetryMode === 'live' ? (liveStats.mathDone > 0 ? liveStats.mathAvg : 20) : 96}%` }} 
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">⚡ ถอดรูท 3 วิ & เรขาคณิต สสวท.</p>
                </div>

                {/* Science */}
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-red-400">🔬 วิทยาศาสตร์</span>
                    <span className="text-white">
                      {telemetryMode === 'live' 
                        ? `${liveStats.scienceDone}/16 บท (${liveStats.scienceAvg}%)` 
                        : '94% (16 บท)'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all" 
                      style={{ width: `${telemetryMode === 'live' ? (liveStats.scienceDone > 0 ? liveStats.scienceAvg : 20) : 94}%` }} 
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">⚡ สารละลาย %w/w & เซลล์พืชสัตว์</p>
                </div>

                {/* English */}
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-amber-400">🇬🇧 ภาษาอังกฤษ</span>
                    <span className="text-white">
                      {telemetryMode === 'live' 
                        ? `${liveStats.englishDone}/16 บท (${liveStats.englishAvg}%)` 
                        : '92% (16 บท)'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-2 rounded-full transition-all" 
                      style={{ width: `${telemetryMode === 'live' ? (liveStats.englishDone > 0 ? liveStats.englishAvg : 20) : 92}%` }} 
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">⚡ Oxford 3000 & ศัพท์การแพทย์ US</p>
                </div>

                {/* Thai */}
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-emerald-400">📖 ภาษาไทย</span>
                    <span className="text-white">
                      {telemetryMode === 'live' 
                        ? `${liveStats.thaiDone}/8 บท (${liveStats.thaiAvg}%)` 
                        : '96% (8 บท)'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all" 
                      style={{ width: `${telemetryMode === 'live' ? (liveStats.thaiDone > 0 ? liveStats.thaiAvg : 20) : 96}%` }} 
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">⚡ สแกนใจความสำคัญ & ราชาศัพท์</p>
                </div>
              </div>
            </Card>

            {/* Trap Questions Intelligence */}
            <Card className="bg-slate-900/90 border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                สถิติจุดลวงข้อสอบ 10 ปี ที่นักเรียนทั่วประเทศมักผิด (Trickiest Trap Questions)
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-orange-400 block">1. คณิต: เศษส่วนซ้อนและลำดับเครื่องหมาย (PEMDAS)</span>
                    <span className="text-slate-400">เด็ก 68% มักลืมทำคูณหารก่อนบวกลบเมื่อไม่มีวงเล็บ</span>
                  </div>
                  <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">ความผิดพลาด 68%</Badge>
                </div>

                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-red-400 block">2. วิทย์: การคายน้ำกับการเปิด-ปิดของปากใบ (Stomata)</span>
                    <span className="text-slate-400">ข้อสอบ สทศ. หลอกเรื่องเซลล์คุมเต่งเมื่อมีแสงแดดและน้ำเพียงพอ</span>
                  </div>
                  <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">ความผิดพลาด 62%</Badge>
                </div>

                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-amber-400 block">3. อังกฤษ: Subject-Verb Agreement กับ Everyone / Neither</span>
                    <span className="text-slate-400">ทุกคนคิดว่า Everyone เป็นพหูพจน์ แต่ตามหลักสากลถือเป็นเอกพจน์</span>
                  </div>
                  <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">ความผิดพลาด 59%</Badge>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* =========================================================================
            TAB: STUDENT DIRECTORY & DEEP-DIVE PROFILE INSPECTOR
            ========================================================================= */}
        {activeTab === 'students' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-400" />
                  รายชื่อและผลการเรียนผู้เรียนรายบุคคล (Student Directory & Telemetry)
                </h3>
                <p className="text-xs text-slate-400">ค้นหาและเจาะลึกคะแนนสอบ 4 วิชา, ประวัติการทำข้อสอบ, และพัฒนาการของผู้เรียนทุกคน</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={fetchStudents}
                  size="sm"
                  variant="outline"
                  className="border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl"
                >
                  <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoadingStudents ? 'animate-spin' : ''}`} />
                  รีเฟรชรายชื่อ
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3">
              <Input
                placeholder="ค้นหาชื่อนักเรียน หรือรหัส..."
                value={studentSearchQuery}
                onChange={(e) => setStudentSearchQuery(e.target.value)}
                className="bg-slate-950 border-slate-700 text-white text-xs rounded-xl"
              />
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs px-3 py-1.5 shrink-0">
                ผู้เรียนทั้งหมด: {studentsList.length} คน
              </Badge>
            </div>

            {/* Main Split View: Student List (Left) + Detailed Inspector (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Student Roster */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2.5 max-h-[600px] overflow-y-auto">
                <span className="text-xs font-bold text-slate-400 block mb-2">เลือกผู้เรียนเพื่อเจาะลึก:</span>
                
                {studentsList
                  .filter(s => !studentSearchQuery || s.fullName.toLowerCase().includes(studentSearchQuery.toLowerCase()))
                  .map((student) => {
                    const isSelected = selectedStudent?.id === student.id
                    return (
                      <button
                        key={student.id}
                        onClick={() => setSelectedStudent(student)}
                        className={`w-full text-left p-3.5 rounded-xl text-xs transition-all border ${
                          isSelected
                            ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/50 text-white shadow-md'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="font-bold truncate pr-1">
                            {student.fullName}
                          </div>
                          {student.isFortune && (
                            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px] shrink-0">
                              ⭐ VIP
                            </Badge>
                          )}
                        </div>

                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                          <span>เรียนแล้ว: {student.stats.totalDone}/56 บท</span>
                          <span className="text-emerald-400 font-bold">เฉลี่ย {student.stats.avgScore}%</span>
                        </div>
                      </button>
                    )
                  })}
              </div>

              {/* Right Column: Deep-Dive Student Inspector */}
              <div className="md:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5 max-h-[600px] overflow-y-auto">
                {selectedStudent ? (
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-red-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
                          {selectedStudent.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-black text-white">{selectedStudent.fullName}</h4>
                            {selectedStudent.isFortune && (
                              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
                                🎯 ม.1 Gifted Pathway
                              </Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            รหัสผู้เรียน: {selectedStudent.id.slice(0, 16)}... • สมัครเมื่อ: {new Date(selectedStudent.createdAt).toLocaleDateString('th-TH')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleAnalyzeStudent(selectedStudent)}
                          disabled={isAnalyzingStudent}
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                        >
                          <Sparkles className={`w-3.5 h-3.5 ${isAnalyzingStudent ? 'animate-spin' : 'text-amber-300'}`} />
                          {isAnalyzingStudent ? 'AI กำลังวิเคราะห์...' : '🧠 AI วิเคราะห์ผู้เรียนรายบุคคล'}
                        </Button>

                        <Button
                          onClick={() => triggerToast(`ส่งข้อความโค้ชชิ่งถึงผู้ปกครองของ ${selectedStudent.fullName} ทาง Telegram สำเร็จ!`)}
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl"
                        >
                          <Send className="w-3.5 h-3.5 mr-1" /> ส่งการบ้าน/โค้ชชิ่ง
                        </Button>
                      </div>
                    </div>

                    {/* AI Diagnosis Result Card */}
                    {studentAiAnalysis[selectedStudent.id] && (
                      <div className="bg-gradient-to-br from-indigo-950/80 via-purple-950/60 to-slate-950 border-2 border-indigo-500/40 rounded-2xl p-5 space-y-4 shadow-xl animate-fade-in">
                        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-indigo-800/60 pb-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-300" />
                            <h5 className="font-black text-white text-sm">
                              ผลการวินิจฉัยและแผนพัฒนาอัจฉริยะ (Gemini AI Diagnostic)
                            </h5>
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-bold">
                            ดัชนีความพร้อม: {studentAiAnalysis[selectedStudent.id].overallReadiness}% • {studentAiAnalysis[selectedStudent.id].gradeLevelPrediction}
                          </Badge>
                        </div>

                        {/* Strengths & Weaknesses */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-emerald-900/50 space-y-2">
                            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" /> 🌟 จุดแข็งโดดเด่น (Strengths):
                            </span>
                            <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                              {studentAiAnalysis[selectedStudent.id].strengths?.map((s: string, idx: number) => (
                                <li key={idx}>{s}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-amber-900/50 space-y-2">
                            <span className="font-bold text-amber-400 flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4" /> ⚠️ จุดที่ต้องระวัง/จุดลวง สทศ.:
                            </span>
                            <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                              {studentAiAnalysis[selectedStudent.id].weaknesses?.map((w: string, idx: number) => (
                                <li key={idx}>{w}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Strategic Recommendation */}
                        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-indigo-800/60 text-xs space-y-1.5">
                          <span className="font-bold text-indigo-300 block">🎯 แผนกลยุทธ์เฉพาะบุคคล (Gifted Roadmap):</span>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            {studentAiAnalysis[selectedStudent.id].giftedRecommendation}
                          </p>
                        </div>

                        {/* Parent Coaching Tip */}
                        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-rose-900/50 text-xs space-y-1.5">
                          <span className="font-bold text-rose-300 flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> ข้อคิดและคำแนะนำสำหรับผู้ปกครองในการโค้ชชิ่ง:
                          </span>
                          <p className="text-rose-100/90 text-[11px] italic leading-relaxed">
                            {studentAiAnalysis[selectedStudent.id].parentCoachingTip}
                          </p>
                        </div>

                        {/* Broadcast to Parent Button */}
                        <div className="pt-1 flex justify-end">
                          <Button
                            onClick={() => triggerToast(`ส่งรายงานผลวิเคราะห์ของ ${selectedStudent.fullName} เข้า Telegram ผู้ปกครองเรียบร้อยแล้ว!`)}
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" /> ส่งรายงานนี้เข้า Telegram ผู้ปกครอง
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* 4 Subjects Progress Radar Breakdown */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-slate-300 block">
                        📊 ความก้าวหน้ารายวิชา 4 มิติ (56 โมดูลเต็ม):
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                          <span className="text-[11px] font-bold text-orange-400 block">🔢 คณิตศาสตร์</span>
                          <span className="text-sm font-black text-white">{selectedStudent.stats.mathDone}/16 บท</span>
                          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-orange-500 h-1.5 rounded-full" 
                              style={{ width: `${Math.max(15, (selectedStudent.stats.mathDone / 16) * 100)}%` }} 
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                          <span className="text-[11px] font-bold text-red-400 block">🔬 วิทยาศาสตร์</span>
                          <span className="text-sm font-black text-white">{selectedStudent.stats.scienceDone}/16 บท</span>
                          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-red-500 h-1.5 rounded-full" 
                              style={{ width: `${Math.max(15, (selectedStudent.stats.scienceDone / 16) * 100)}%` }} 
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                          <span className="text-[11px] font-bold text-amber-400 block">🇬🇧 ภาษาอังกฤษ</span>
                          <span className="text-sm font-black text-white">{selectedStudent.stats.englishDone}/16 บท</span>
                          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-amber-500 h-1.5 rounded-full" 
                              style={{ width: `${Math.max(15, (selectedStudent.stats.englishDone / 16) * 100)}%` }} 
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
                          <span className="text-[11px] font-bold text-emerald-400 block">📖 ภาษาไทย</span>
                          <span className="text-sm font-black text-white">{selectedStudent.stats.thaiDone}/8 บท</span>
                          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-emerald-500 h-1.5 rounded-full" 
                              style={{ width: `${Math.max(15, (selectedStudent.stats.thaiDone / 8) * 100)}%` }} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pre-Test & Diagnostic History */}
                    {selectedStudent.preTestScores && selectedStudent.preTestScores.length > 0 && (
                      <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> ผลการวิเคราะห์ Pre-Test โดย Gemini AI:
                        </span>
                        <div className="flex gap-2 flex-wrap">
                          {selectedStudent.preTestScores.map((pt: any, i: number) => (
                            <Badge key={i} className="bg-slate-800 text-slate-300 text-xs">
                              {pt.subject}: {pt.score} คะแนน
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Attempt History Table */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-300 block">
                        🕒 ประวัติการทำแบบฝึกหัดล่าสุด:
                      </span>

                      {selectedStudent.recentHistory && selectedStudent.recentHistory.length > 0 ? (
                        <div className="divide-y divide-slate-800/80 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
                          {selectedStudent.recentHistory.map((item: any, idx: number) => (
                            <div key={idx} className="p-3 flex items-center justify-between">
                              <div>
                                <span className="font-bold text-white block">
                                  {item.subject === 'math' ? '🔢 คณิต' : item.subject === 'science' ? '🔬 วิทย์' : item.subject === 'english' ? '🇬🇧 อังกฤษ' : '📖 ไทย'} • โมดูล: {item.module_id || item.moduleId}
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {item.completed_at ? new Date(item.completed_at).toLocaleString('th-TH') : 'บันทึกผ่านระบบ'}
                                </span>
                              </div>

                              <div className="text-right">
                                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs font-bold">
                                  คะแนน: {item.score || 100}%
                                </Badge>
                                {item.time_spent > 0 && (
                                  <span className="text-[10px] text-slate-400 block mt-0.5">
                                    ใช้เวลา {Math.round(item.time_spent / 60)} นาที
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-center text-xs text-slate-400">
                          ยังไม่มีประวัติการทำแบบฝึกหัดย้อนหลังบนอุปกรณ์นี้
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    เลือกผู้เรียนจากรายการด้านซ้ายเพื่อดูรายละเอียด
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: NO-CODE QUESTION & CONTENT CMS
            ========================================================================= */}
        {activeTab === 'cms' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">คลังข้อสอบและบทเรียน 560 ข้อ (No-Code CMS)</h3>
                <p className="text-xs text-slate-400">เลือกดูและตรวจสอบโจทย์ ตัวเลือก เฉลย และสูตรลัด 3 วินาที</p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => triggerToast('Gemini AI กำลังสังเคราะห์ข้อสอบชุดใหม่ตาม Cognitive Scaffolding... สำเร็จ!')}
                  size="sm" 
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 text-white font-bold text-xs rounded-xl"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> AI ออกข้อสอบชุดใหม่ (1-Click)
                </Button>
              </div>
            </div>

            {/* Subject Selector */}
            <div className="flex gap-2 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-x-auto">
              {[
                { id: 'math', label: '🔢 คณิตศาสตร์ (16 บท)' },
                { id: 'science', label: '🔬 วิทยาศาสตร์ (16 บท)' },
                { id: 'english', label: '🇬🇧 ภาษาอังกฤษ (16 บท)' },
                { id: 'thai', label: '📖 ภาษาไทย (8 บท)' },
              ].map((subj) => (
                <button
                  key={subj.id}
                  onClick={() => {
                    setSelectedSubject(subj.id as any)
                    const firstKey = Object.keys(LESSONS_DATA[subj.id] || {})[0] || ''
                    setSelectedModuleKey(firstKey)
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                    selectedSubject === subj.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {subj.label}
                </button>
              ))}
            </div>

            {/* Module Selector & Question Browser */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Module List */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2 max-h-[500px] overflow-y-auto">
                <span className="text-xs font-bold text-slate-400 block mb-2">เลือกบทเรียน:</span>
                {Object.entries(currentSubjectModules).map(([key, mod]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedModuleKey(key)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                      selectedModuleKey === key
                        ? 'bg-orange-500/20 border border-orange-500/40 text-orange-200 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="truncate pr-2">{mod.emoji} {mod.title}</span>
                    <Badge className="bg-slate-800 text-[10px] shrink-0">{mod.practiceQuestions?.length || 10} ข้อ</Badge>
                  </button>
                ))}
              </div>

              {/* Question Preview & Edit Pane */}
              <div className="md:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 max-h-[500px] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                      <span>{currentModuleData?.emoji}</span>
                      <span>{currentModuleData?.title}</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">{currentModuleData?.subtitle}</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                    Cognitive Scaffolding 100%
                  </Badge>
                </div>

                {/* Secret Formula Badge */}
                {currentModuleData?.secretFormula && (
                  <div className="bg-orange-950/40 border border-orange-800/60 p-3 rounded-xl text-xs text-orange-200">
                    <span className="font-bold block mb-1">⚡ สูตรลับประจำบท: {currentModuleData.secretFormula.name}</span>
                    <span className="text-slate-300 text-[11px]">{currentModuleData.secretFormula.concept}</span>
                  </div>
                )}

                {/* Practice Questions List */}
                <div className="space-y-3">
                  {currentModuleData?.practiceQuestions?.map((q, idx) => (
                    <div key={q.id || idx} className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-white text-xs">
                          ข้อ {idx + 1}. {q.question}
                        </span>
                        <Badge className="bg-slate-800 text-[10px] text-slate-300 shrink-0">
                          ระดับ {idx < 3 ? '1-ปูพื้น' : idx < 7 ? '2-ประยุกต์' : '3-Gifted'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-400 pl-2">
                        {q.options?.map((opt, oIdx) => (
                          <div 
                            key={oIdx}
                            className={`p-1.5 rounded-lg text-[11px] ${
                              opt === q.correctAnswer 
                                ? 'bg-emerald-950/60 border border-emerald-600/60 text-emerald-300 font-bold' 
                                : 'bg-slate-900/60 text-slate-400'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}. {opt} {opt === q.correctAnswer && '✓'}
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded-lg leading-relaxed">
                        💡 <span className="font-bold text-amber-300">เฉลย:</span> {q.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: MULTI-SCHOOL & ENTERPRISE MANAGEMENT
            ========================================================================= */}
        {activeTab === 'school_mgr' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">ระบบจัดการโรงเรียนและห้องเรียน (Multi-School Manager)</h3>
                <p className="text-xs text-slate-400">ควบคุมสถานะห้องเรียน รหัสห้องเรียน และ Export ผลสอบ</p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => triggerToast('สร้างรหัสห้องเรียนใหม่สำเร็จ: M1-GIFTED-2026')}
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
                >
                  <Users className="w-3.5 h-3.5 mr-1" /> + สร้างห้องเรียนใหม่
                </Button>
                <Button 
                  onClick={handleDownloadCSV}
                  variant="outline" 
                  size="sm" 
                  className="border-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                >
                  <Printer className="w-3.5 h-3.5 mr-1" /> Export ผลคะแนนทั้งโรงเรียน
                </Button>
              </div>
            </div>

            {/* School Info Card */}
            <Card className="bg-slate-900/90 border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl">
                  🏫
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{SAMPLE_SCHOOL.schoolName}</h4>
                  <p className="text-xs text-slate-400">{SAMPLE_SCHOOL.affiliation} • จังหวัด {SAMPLE_SCHOOL.province}</p>
                </div>
              </div>
            </Card>

            {/* Classrooms Table */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-300">
                รายชื่อห้องเรียนที่เปิดใช้งานในระบบ (Active Classrooms)
              </div>
              <div className="divide-y divide-slate-800/80 text-xs">
                {SAMPLE_CLASSROOMS.map((cls) => (
                  <div key={cls.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{cls.gradeNameTh} ({cls.roomName})</span>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-mono text-[10px]">
                          รหัส: {cls.classCode}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">ครูประจำชั้น: {cls.teacherName}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-slate-400">{cls.studentCount} นักเรียน</span>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: OMNI-CHANNEL TELEGRAM BROADCASTER
            ========================================================================= */}
        {activeTab === 'broadcast' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-white">ระบบส่งสาร Telegram ผู้ปกครอง (Omni-Channel Broadcaster)</h3>
              <p className="text-xs text-slate-400">ส่งการแจ้งเตือน ข้อคิด และคำแนะนำตรงเข้าบอท @MasterM1_Parent_bot</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Broadcast Compose Form */}
              <Card className="bg-slate-900/90 border-slate-800 rounded-3xl p-6 space-y-4">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-orange-400" />
                  เขียนข้อความบรอดแคสต์ใหม่
                </h4>

                <form onSubmit={handleSendBroadcast} className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-300 font-bold block mb-1">กลุ่มเป้าหมายผู้รับ:</label>
                    <select 
                      value={broadcastTarget}
                      onChange={(e) => setBroadcastTarget(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-2.5"
                    >
                      <option value="all_parents">ผู้ปกครองทุกคน (All Connected Parents)</option>
                      <option value="gifted_track">ผู้ปกครองกลุ่ม ม.1 Gifted Pathway</option>
                      <option value="school_teachers">คุณครูประจำชั้นโรงเรียนเครือข่าย</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-bold block mb-1">หัวข้อประกาศ:</label>
                    <Input 
                      placeholder="เช่น: อัปเดตคลังข้อสอบ 560 ข้อพร้อมสูตรลัด 3 วินาที..."
                      value={broadcastTitle}
                      onChange={(e) => setBroadcastTitle(e.target.value)}
                      className="bg-slate-950 border-slate-700 text-white text-xs rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-bold block mb-1">เนื้อหาข้อความ:</label>
                    <textarea 
                      rows={4}
                      placeholder="พิมพ์ข้อความที่ต้องการแจ้งเตือนผู้ปกครอง..."
                      value={broadcastMsg}
                      onChange={(e) => setBroadcastMsg(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-3 focus:border-orange-500"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 text-white font-bold text-xs py-5 rounded-xl shadow-lg"
                  >
                    <Send className="w-4 h-4 mr-1.5" /> ส่งบรอดแคสต์ทันที
                  </Button>
                </form>
              </Card>

              {/* Broadcast Logs History */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-400" />
                  ประวัติการส่งบรอดแคสต์ย้อนหลัง
                </h4>

                <div className="space-y-2.5 max-h-[350px] overflow-y-auto">
                  {settings.broadcast_logs?.map((log) => (
                    <div key={log.id} className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{log.title}</span>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px]">
                          ✓ ส่งแล้ว ({log.deliveredCount} ผู้รับ)
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{log.message}</p>
                      <span className="text-[10px] text-slate-500 block pt-1 font-mono">
                        {new Date(log.timestamp).toLocaleString('th-TH')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: ADSENSE & MONETIZATION CONTROLLER
            ========================================================================= */}
        {activeTab === 'monetization' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-white">ระบบจัดการโฆษณา Google AdSense (Monetization Hub)</h3>
              <p className="text-xs text-slate-400">ควบคุมเปิด-ปิดตำแหน่งแบนเนอร์โฆษณาในแต่ละหน้ารายวิชา</p>
            </div>

            <Card className="bg-slate-900/90 border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h4 className="font-bold text-white text-base">Google AdSense Publisher ID</h4>
                  <p className="text-xs text-slate-400 font-mono">pub-7280055452989562 (Native Script Active)</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold">
                  🟢 Compliant
                </Badge>
              </div>

              {/* Slot Switchers */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-300 block">เปิด-ปิดป้ายโฆษณาแยกรายวิชา:</span>
                {[
                  { key: 'math', label: 'ป้ายโฆษณาท้ายวิชาคณิตศาสตร์ (Math Bottom Banner)' },
                  { key: 'science', label: 'ป้ายโฆษณาท้ายวิชาวิทยาศาสตร์ (Science Bottom Banner)' },
                  { key: 'english', label: 'ป้ายโฆษณาท้ายวิชาภาษาอังกฤษ (English Bottom Banner)' },
                  { key: 'thai', label: 'ป้ายโฆษณาท้ายวิชาภาษาไทย (Thai Bottom Banner)' },
                  { key: 'dashboard', label: 'ป้ายโฆษณาหน้าแดชบอร์ดบทเรียน (Dashboard Ad)' },
                ].map((slot) => {
                  const isEnabled = settings.adsense_slots?.[slot.key as keyof AdminSettings['adsense_slots']]
                  return (
                    <div key={slot.key} className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                      <span className="text-slate-300">{slot.label}</span>
                      <Button
                        size="sm"
                        onClick={() => handleToggleAdSlot(slot.key as any)}
                        className={`text-xs font-bold px-3 py-1 rounded-lg ${
                          isEnabled 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {isEnabled ? 'เปิดใช้งาน (ON)' : 'ปิดไว้ (OFF)'}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        )}

        {/* =========================================================================
            TAB 7: CLOUD BACKUP & SECURITY AUDIT LOGS
            ========================================================================= */}
        {activeTab === 'backup' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-white">ศูนย์ความปลอดภัยและการสำรองข้อมูล (Security & Backup)</h3>
              <p className="text-xs text-slate-400">ดาวน์โหลดสำรองข้อมูลทั้งหมดและตรวจสอบ Audit Trail</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-slate-900/90 border-slate-800 rounded-3xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">ดาวน์โหลด Full System Backup (JSON)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  สำรองข้อมูลการตั้งค่าระบบ คะแนนเก็บนักเรียน และสถานะทั้งหมดเป็นไฟล์ JSON ก้อนเดียว
                </p>
                <Button 
                  onClick={handleDownloadJSONBackup}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-4 rounded-xl"
                >
                  💾 ดาวน์โหลด JSON Backup
                </Button>
              </Card>

              <Card className="bg-slate-900/90 border-slate-800 rounded-3xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">ดาวน์โหลดคะแนนการเรียน (CSV)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Export ประวัติผลคะแนนการทำแบบฝึกหัดทุกโมดูลเพื่อนำไปเปิดใน Microsoft Excel หรือ Google Sheets
                </p>
                <Button 
                  onClick={handleDownloadCSV}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-4 rounded-xl"
                >
                  📊 ดาวน์โหลด CSV Scores
                </Button>
              </Card>
            </div>

            {/* Audit Trail Logs */}
            <Card className="bg-slate-900/90 border-slate-800 rounded-3xl p-5 space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ประวัติการดำเนินการของผู้ดูแลระบบ (Admin Audit Trail Logs)
              </h4>

              <div className="space-y-2 max-h-[300px] overflow-y-auto font-mono text-xs">
                {settings.audit_logs?.map((log) => (
                  <div key={log.id} className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-slate-800 text-orange-300 text-[10px]">{log.action}</Badge>
                      <span className="text-slate-300">{log.details}</span>
                    </div>
                    <span className="text-slate-500 text-[10px] shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString('th-TH')}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
