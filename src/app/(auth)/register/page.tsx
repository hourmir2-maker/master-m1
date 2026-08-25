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

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ fullName: '', email: '', password: '', schoolTarget: '' })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const email = form.email.trim()
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password: form.password,
        options: { 
          data: { 
            full_name: form.fullName,
            school_target: form.schoolTarget || ''
          } 
        }
      })
      
      if (signUpError) throw signUpError

      if (data.user) {
        // Insert into public.profiles
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: form.fullName,
          email: email,
          school_target: form.schoolTarget || 'ไม่ระบุ',
          grade_target: 'ม.1',
          updated_at: new Date().toISOString()
        })

        if (profileError) {
          console.warn('Profile table insert warning (check if schema.sql was run in Supabase):', profileError.message)
        }

        // Check if session was created automatically
        if (data.session) {
          router.push('/pre-test')
          router.refresh()
        } else {
          // Attempt immediate login if auto-confirm is enabled
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password: form.password
          })
          if (!loginError) {
            router.push('/pre-test')
            router.refresh()
          } else {
            // Confirmation email might be required
            router.push('/login')
          }
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการสมัครสมาชิก')
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
          <CardTitle className="text-2xl font-black text-slate-800">สมัครเรียนฟรี 🎯</CardTitle>
          <CardDescription className="text-orange-900/60 font-medium">MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-slate-700 font-semibold text-xs">ชื่อ-นามสกุล นักเรียน</Label>
              <Input 
                id="fullName" 
                value={form.fullName}
                onChange={e => setForm({ ...form, fullName: e.target.value })}
                required 
                placeholder="เช่น ด.ช. ภูมิใจ ใฝ่เรียนรู้" 
                className="focus-visible:ring-orange-500 border-orange-200/80"
              />
            </div>
            
            <div className="space-y-1">
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
            
            <div className="space-y-1">
              <Label htmlFor="password" className="text-slate-700 font-semibold text-xs">รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)</Label>
              <Input 
                id="password" 
                type="password" 
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required 
                placeholder="••••••••" 
                minLength={6}
                className="focus-visible:ring-orange-500 border-orange-200/80"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="schoolTarget" className="text-slate-700 font-semibold text-xs">โรงเรียนเป้าหมายที่ต้องการสอบเข้า (ไม่บังคับ)</Label>
              <Input 
                id="schoolTarget" 
                value={form.schoolTarget}
                onChange={e => setForm({ ...form, schoolTarget: e.target.value })}
                placeholder="เช่น โรงเรียนสาธิตฯ / สวนกุหลาบ / สตรีวิทยา" 
                className="focus-visible:ring-orange-500 border-orange-200/80"
              />
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p className="font-semibold leading-relaxed">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-5 shadow-lg shadow-orange-500/25 transition-all mt-2" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> กำลังสร้างบัญชีและเตรียมข้อสอบ...
                </>
              ) : (
                '🚀 สมัครสมาชิกและเริ่มทำ Pre-Test'
              )}
            </Button>
          </form>

          <div className="mt-5 text-center border-t border-orange-100 pt-4">
            <p className="text-sm text-slate-500">
              มีบัญชีอยู่แล้ว?{' '}
              <Link href="/login" className="text-orange-600 hover:text-orange-700 font-bold hover:underline">
                เข้าสู่ระบบที่นี่
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
