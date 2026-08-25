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
import { BookOpen, Loader2 } from 'lucide-react'

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
      const { error: signInError } = await supabase.auth.signInWithPassword(form)
      if (signInError) throw signInError
      router.push('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-3">
            <div className="bg-indigo-600 text-white rounded-2xl p-3">
              <BookOpen className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">เข้าสู่ระบบ</CardTitle>
          <CardDescription>MASTER ม.1 — เตรียมพร้อม พิชิตทุกข้อสอบ</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">อีเมล</Label>
              <Input id="email" type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required placeholder="email@example.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <Input id="password" type="password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required placeholder="••••••••" />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-5" disabled={loading}>
              {loading
                ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> กำลังเข้าสู่ระบบ...</>
                : 'เข้าสู่ระบบ'}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            ยังไม่มีบัญชี?{' '}
            <Link href="/register" className="text-indigo-600 hover:underline font-medium">สมัครฟรี</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
