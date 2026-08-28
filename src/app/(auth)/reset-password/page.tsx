'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { KeyRound, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('รหัสผ่านทั้งสองช่องไม่ตรงกัน')
      return
    }
    if (password.length < 6) {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
      return
    }

    setLoading(true)
    setError('')
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      })
      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการตั้งรหัสผ่านใหม่')
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
          <CardTitle className="text-2xl font-black text-slate-800">ตั้งรหัสผ่านใหม่</CardTitle>
          <CardDescription className="text-orange-900/60 font-medium">MASTER ม.1 — กำหนดรหัสผ่านใหม่สำหรับเข้าใช้งาน</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="font-bold text-slate-800 text-base">เปลี่ยนรหัสผ่านสำเร็จเรียบร้อย!</h4>
              <p className="text-xs text-slate-500">กำลังนำท่านเข้าสู่ระบบอัตโนมัติ...</p>
            </div>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="password">รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-slate-200 focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">ยืนยันรหัสผ่านใหม่</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-xl border-slate-200 focus:border-orange-500"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-5 rounded-xl shadow-lg shadow-orange-500/25 transition-all"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'บันทึกรหัสผ่านใหม่ →'}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-slate-500">
            <Link href="/login" className="text-orange-600 font-bold hover:underline">
              ← กลับไปหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
