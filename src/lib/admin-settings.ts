/**
 * MASTER ม.1 — Admin System Settings & Feature Flags (Enterprise Edition)
 * รหัสผ่านผู้ดูแลระบบ (Master Admin Password): 23235656
 * ผู้พัฒนา: คุณพ่อไพโรจน์ มากแก้ว
 */

export const ADMIN_MASTER_PASSWORD = '23235656'

export interface BroadcastLog {
  id: string
  timestamp: string
  title: string
  message: string
  targetGroup: 'all_parents' | 'gifted_track' | 'school_teachers'
  status: 'sent' | 'scheduled'
  deliveredCount: number
}

export interface AuditLog {
  id: string
  timestamp: string
  action: string
  details: string
}

export interface AdminSettings {
  school_enabled: boolean
  maintenance_message: string
  adsense_enabled: boolean
  adsense_slots: {
    math: boolean
    science: boolean
    english: boolean
    thai: boolean
    dashboard: boolean
  }
  broadcast_logs: BroadcastLog[]
  audit_logs: AuditLog[]
  last_updated: string
}

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  school_enabled: false, // ปิดฟังชั่นสำหรับโรงเรียนชั่วคราวตามคำสั่ง Admin
  maintenance_message: 'ระบบสำหรับโรงเรียนกำลังอยู่ในช่วงเตรียมการและปรับปรุงระบบชั่วคราว',
  adsense_enabled: true,
  adsense_slots: {
    math: true,
    science: true,
    english: true,
    thai: true,
    dashboard: true
  },
  broadcast_logs: [
    {
      id: 'bc_1',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      title: 'อัปเดตหลักสูตรครบ 4 วิชา 56 โมดูล',
      message: 'แจ้งผู้ปกครอง: ขณะนี้ระบบ MASTER ม.1 ได้เปิดคลังบทเรียนครบ 56 โมดูล พร้อมโจทย์ 560 ข้อ และสูตรลัด 3 วินาทีแล้วครับ',
      targetGroup: 'all_parents',
      status: 'sent',
      deliveredCount: 42
    }
  ],
  audit_logs: [
    {
      id: 'audit_init',
      timestamp: new Date().toISOString(),
      action: 'ADMIN_INITIALIZE',
      details: 'เข้าสู่ระบบด้วยรหัสผ่าน 23235656 โดยคุณพ่อไพโรจน์ มากแก้ว'
    }
  ],
  last_updated: new Date().toISOString()
}

/**
 * ดึงสถานะการตั้งค่าระบบจาก LocalStorage / Default
 */
export function getAdminSettings(): AdminSettings {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_SETTINGS
  try {
    const saved = localStorage.getItem('master_m1_admin_settings')
    if (saved) {
      const parsed = JSON.parse(saved)
      return { 
        ...DEFAULT_ADMIN_SETTINGS, 
        ...parsed,
        adsense_slots: { ...DEFAULT_ADMIN_SETTINGS.adsense_slots, ...(parsed.adsense_slots || {}) }
      }
    }
  } catch (e) {
    console.warn('Error reading admin settings:', e)
  }
  return DEFAULT_ADMIN_SETTINGS
}

/**
 * บันทึกการตั้งค่าระบบ
 */
export function saveAdminSettings(settings: Partial<AdminSettings>): AdminSettings {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_SETTINGS
  try {
    const current = getAdminSettings()
    const updated = { ...current, ...settings, last_updated: new Date().toISOString() }
    localStorage.setItem('master_m1_admin_settings', JSON.stringify(updated))
    window.dispatchEvent(new Event('admin_settings_changed'))
    return updated
  } catch (e) {
    console.warn('Error saving admin settings:', e)
    return DEFAULT_ADMIN_SETTINGS
  }
}

/**
 * บันทึก Audit Log
 */
export function logAdminAction(action: string, details: string): void {
  try {
    const current = getAdminSettings()
    const newLog: AuditLog = {
      id: `audit_${Date.now()}`,
      timestamp: new Date().toISOString(),
      action,
      details
    }
    const updatedLogs = [newLog, ...(current.audit_logs || [])].slice(0, 50)
    saveAdminSettings({ audit_logs: updatedLogs })
  } catch (e) {
    console.warn('Failed to log admin action:', e)
  }
}

/**
 * ตรวจสอบความถูกต้องของรหัสผ่าน Admin (23235656)
 */
export function verifyAdminPassword(inputPassword: string): boolean {
  return inputPassword.trim() === ADMIN_MASTER_PASSWORD
}

/**
 * ตรวจสอบสถานะการเข้าสู่ระบบของ Admin ใน Session ปัจจุบัน
 */
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return sessionStorage.getItem('master_m1_admin_auth') === 'true'
  } catch {
    return false
  }
}

/**
 * บันทึกการ Login สำเร็จของ Admin
 */
export function setAdminAuthSession(isAuth: boolean): void {
  if (typeof window === 'undefined') return
  try {
    if (isAuth) {
      sessionStorage.setItem('master_m1_admin_auth', 'true')
      logAdminAction('LOGIN_SUCCESS', 'ปลดล็อกรหัสผ่าน Master Admin (23235656) สำเร็จ')
    } else {
      sessionStorage.removeItem('master_m1_admin_auth')
      logAdminAction('LOGOUT', 'ออกจากระบบ Admin')
    }
  } catch (e) {
    console.warn('Error setting admin session:', e)
  }
}

/**
 * Export ฐานข้อมูลทั้งหมดเป็น JSON Backup
 */
export function exportCompleteSystemBackup(): string {
  if (typeof window === 'undefined') return '{}'
  const backup = {
    exportDate: new Date().toISOString(),
    system: 'MASTER ม.1 (https://master-m1.vercel.app)',
    developer: 'Phairot Makkaew',
    adminSettings: getAdminSettings(),
    userProgress: JSON.parse(localStorage.getItem('master_m1_progress') || '[]'),
    userName: localStorage.getItem('master_m1_user_name') || 'ด.ช.ภูมิรพีร์ มากแก้ว',
    version: '2.0.0-enterprise'
  }
  return JSON.stringify(backup, null, 2)
}

/**
 * Export ผลคะแนนและประวัติการเรียนเป็น CSV
 */
export function exportProgressCSV(): string {
  if (typeof window === 'undefined') return ''
  try {
    const list = JSON.parse(localStorage.getItem('master_m1_progress') || '[]')
    let csv = 'Module ID,Subject,Score (%),Completed,Updated At\n'
    list.forEach((item: { moduleId?: string; module_id?: string; subject?: string; score?: number; completed?: boolean; updated_at?: string }) => {
      const id = item.moduleId || item.module_id || 'unknown'
      const subj = item.subject || 'general'
      const score = item.score || 0
      const comp = item.completed ? 'YES' : 'NO'
      const date = item.updated_at || new Date().toLocaleDateString('th-TH')
      csv += `"${id}","${subj}",${score},"${comp}","${date}"\n`
    })
    return csv
  } catch {
    return 'Module ID,Subject,Score (%),Completed,Updated At\n'
  }
}
