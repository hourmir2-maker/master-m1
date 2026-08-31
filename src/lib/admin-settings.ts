/**
 * MASTER ม.1 — Admin System Settings & Feature Flags
 * รหัสผ่านผู้ดูแลระบบ (Master Admin Password): 23235656
 * ผู้พัฒนา: คุณพ่อไพโรจน์ มากแก้ว
 */

export const ADMIN_MASTER_PASSWORD = '23235656'

export interface AdminSettings {
  school_enabled: boolean
  maintenance_message?: string
  last_updated?: string
}

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  school_enabled: false, // ปิดฟังชั่นสำหรับโรงเรียนชั่วคราวตามคำสั่ง Admin
  maintenance_message: 'ระบบสำหรับโรงเรียนกำลังอยู่ในช่วงเตรียมการและปรับปรุงระบบชั่วคราว',
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
      return { ...DEFAULT_ADMIN_SETTINGS, ...JSON.parse(saved) }
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
    } else {
      sessionStorage.removeItem('master_m1_admin_auth')
    }
  } catch (e) {
    console.warn('Error setting admin session:', e)
  }
}
