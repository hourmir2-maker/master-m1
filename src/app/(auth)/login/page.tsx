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
import { BookOpen, Loader2, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email.trim(),
        password: form.password,
      })
      
      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง หรือยังไม่ได้สมัครสมาชิก')
        } else if (signInError.message.includes('Email not confirmed')) {
          throw new Error('กรุณายืนยันอีเมลในกล่องข้อความก่อนเข้าใช้งาน หรือปิด Confirm Email ใน Supabase')
        }
        throw signInError
      }
      
      if (data.session) {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
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
              <BookOpen className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-black text-slate-800">เข้าสู่ระบบ</CardTitle>
          <CardDescription className="text-orange-900/60 font-medium">MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-700 font-semibold text-xs">อีเมล</Label>
              <Input 
                id="email" 
                type="email" 
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required 
                placeholder="student@example.com" 
                className="focus-visible:ring-orange-500 border-orange-200/80"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-slate-700 font-semibold text-xs">รหัสผ่าน</Label>
                <Link href="/forgot-password" className="text-xs text-orange-600 hover:text-orange-700 font-semibold hover:underline">
                  ลืมรหัสผ่าน?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required 
                placeholder="••••••••" 
                className="focus-visible:ring-orange-500 border-orange-200/80"
              />
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <p className="font-semibold">{error}</p>
                  {error.includes('ยังไม่ได้สมัครสมาชิก') && (
                    <Link href="/register" className="underline font-bold text-red-800 hover:text-red-900 block mt-1">
                      คลิกที่นี่เพื่อสมัครสมาชิกใหม่ →
                    </Link>
                  )}
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-5 shadow-lg shadow-orange-500/25 transition-all" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> กำลังเข้าสู่ระบบ...
                </>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center border-t border-orange-100 pt-4">
            <p className="text-sm text-slate-500">
              ยังไม่มีบัญชีนักเรียน?{' '}
              <Link href="/register" className="text-orange-600 hover:text-orange-700 font-bold hover:underline">
                สมัครเรียนฟรีที่นี่
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
