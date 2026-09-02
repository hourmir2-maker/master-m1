'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { KeyRound, Loader2, AlertCircle, CheckCircle2, ArrowLeft, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanEmail = email.trim()
    if (!cleanEmail) {
      setError('กรุณากรอกอีเมลที่ใช้สมัครสมาชิก')
      return
    }

    setLoading(true)
    setError('')
    try {
      // Determine origin for reset URL redirect
      const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://master-m1.vercel.app'
      const redirectUrl = `${siteUrl}/reset-password`

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: redirectUrl,
      })

      if (resetError) {
        if (resetError.message.includes('rate limit')) {
          throw new Error('กรุณารอซักครู่ก่อนส่งคำขอรีเซ็ตรหัสผ่านใหม่อีกครั้ง')
        }
        throw resetError
      }

      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการส่งลิงก์รีเซ็ตรหัสผ่าน')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-orange-100 bg-white/95 backdrop-blur-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-3">
            <div className="bg-gradient-to-tr from-orange-500 to-red-500 text-white rounded-2xl p-3 shadow-md shadow-orange-500/25">
              <KeyRound className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-black text-slate-800">ลืมรหัสผ่าน?</CardTitle>
          <CardDescription className="text-orange-900/60 font-medium">
            MASTER ม.1 — ระบบจะส่งลิงก์กู้คืนรหัสผ่านไปยังอีเมลของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-lg">ส่งลิงก์รีเซ็ตรหัสผ่านเรียบร้อย! 📧</h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                  ระบบได้ส่งคำแนะนำในการตั้งรหัสผ่านใหม่ไปยัง <b>{email}</b> แล้ว
                  กรุณาเช็กกล่องข้อความ (inbox) หรือโฟลเดอร์ขยะ (Spam/Junk) ในอีเมลของคุณ
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" /> กลับไปหน้าเข้าสู่ระบบ
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResetRequest} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-700 font-semibold text-xs flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-orange-500" /> อีเมลที่ใช้สมัครสมาชิก
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus-visible:ring-orange-500 border-orange-200/80 rounded-xl"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-5 rounded-xl shadow-lg shadow-orange-500/25 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> กำลังส่งลิงก์...
                  </>
                ) : (
                  'ส่งลิงก์รีเซ็ตรหัสผ่าน →'
                )}
              </Button>
            </form>
          )}

          {!success && (
            <div className="mt-6 text-center text-xs text-slate-500 border-t border-orange-100 pt-4">
              <Link href="/login" className="text-orange-600 font-bold hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> กลับไปหน้าเข้าสู่ระบบ
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
