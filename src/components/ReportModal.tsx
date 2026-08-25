'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Flag, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Send,
  Loader2
} from 'lucide-react'

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  subject: string
  moduleId: string
  questionId?: string
  contextTitle?: string
  userId?: string | null
}

const REPORT_TYPES = [
  { id: 'answer_wrong', label: 'เฉลยคำตอบไม่ถูกต้อง / คำตอบไม่ตรง', icon: '❌' },
  { id: 'explanation_unclear', label: 'คำอธิบายเฉลยไม่เข้าใจ / ต้องการวิธีคิดเพิ่ม', icon: '💡' },
  { id: 'content_error', label: 'เนื้อหาหรือสูตรมีจุดผิดพลาด', icon: '📖' },
  { id: 'typo', label: 'คำสะกดผิด / ข้อความตกหล่น', icon: '✏️' },
  { id: 'other', label: 'ปัญหาการแสดงผล หรือปัญหาอื่นๆ', icon: '⚙️' }
]

export default function ReportModal({
  isOpen,
  onClose,
  subject,
  moduleId,
  questionId,
  contextTitle,
  userId
}: ReportModalProps) {
  const [selectedType, setSelectedType] = useState('answer_wrong')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId || null,
          subject,
          moduleId,
          questionId: questionId || null,
          reportType: selectedType,
          description: description.trim()
        })
      })
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setDescription('')
        onClose()
      }, 2500)
    } catch (err) {
      console.warn('Report submit error:', err)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        onClose()
      }, 2000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="bg-white/20 p-2 rounded-xl">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">รายงานข้อผิดพลาด</h3>
              <p className="text-orange-100 text-xs font-medium">ช่วยเราปรับปรุงบทเรียนและข้อสอบให้ถูกต้องแม่นยำ</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">ส่งรายงานเรียบร้อยแล้ว!</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                ขอบคุณที่ช่วยตรวจสอบและแจ้งข้อผิดพลาด ทีมวิชาการจะดำเนินการแก้ไขและตรวจสอบโดยเร็วที่สุดครับ
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {contextTitle && (
                <div className="bg-orange-50/70 p-3 rounded-xl border border-orange-100 text-xs text-orange-950 font-medium">
                  <span className="font-bold text-orange-700">อ้างอิง: </span> {contextTitle}
                </div>
              )}

              {/* Report Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  ประเภทข้อผิดพลาดที่พบ:
                </label>
                <div className="space-y-1.5">
                  {REPORT_TYPES.map(type => (
                    <label
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all text-xs font-medium ${
                        selectedType === type.id
                          ? 'border-orange-500 bg-orange-50/60 text-orange-950 font-bold'
                          : 'border-slate-200 hover:border-orange-200 text-slate-700'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="report_type" 
                        checked={selectedType === type.id} 
                        onChange={() => setSelectedType(type.id)}
                        className="text-orange-600 focus:ring-orange-500" 
                      />
                      <span>{type.icon} {type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  รายละเอียดเพิ่มเติม (คำอธิบายที่ถูกต้อง หรือข้อความที่พบผิด):
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="เช่น ข้อ 2 คิดว่าเฉลยควรตอบข้อ B เพราะ... หรือมีคำว่า... พิมพ์ผิด"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 justify-end pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-xs text-slate-600 hover:bg-slate-100"
                >
                  ยกเลิก
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={submitting}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs shadow-md shadow-orange-500/20"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> กำลังส่งข้อมูล...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 mr-1.5" /> ส่งรายงานข้อผิดพลาด
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  )
}
