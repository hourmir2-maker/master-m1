'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  PenTool, 
  Eraser, 
  RotateCcw, 
  Trash2, 
  X, 
  Maximize2, 
  Minimize2,
  Highlighter,
  Palette
} from 'lucide-react'

export default function DigitalScratchpad() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [color, setColor] = useState('#2563eb') // blue-600 default
  const [lineWidth, setLineWidth] = useState(3)
  const [isHighlighter, setIsHighlighter] = useState(false)
  const [isEraser, setIsEraser] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const historyRef = useRef<ImageData[]>([])

  // Setup canvas size
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    // Save current drawing
    const ctx = canvas.getContext('2d')
    const imgData = ctx ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null

    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio

    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      if (imgData) {
        ctx.putImageData(imgData, 0, 0)
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(resizeCanvas, 100)
      window.addEventListener('resize', resizeCanvas)
      return () => window.removeEventListener('resize', resizeCanvas)
    }
  }, [isOpen, isMinimized, resizeCanvas])

  const saveHistory = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
      historyRef.current.push(data)
      if (historyRef.current.length > 10) historyRef.current.shift()
    }
  }

  const handleUndo = () => {
    const canvas = canvasRef.current
    if (!canvas || historyRef.current.length === 0) return
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const prev = historyRef.current.pop()
      if (prev) {
        ctx.putImageData(prev, 0, 0)
      }
    }
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) {
      saveHistory()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      const touch = e.touches[0]
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      }
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    saveHistory()
    setIsDrawing(true)

    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = 20
    } else if (isHighlighter) {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = '#fef08a' // yellow highlight
      ctx.globalAlpha = 0.45
      ctx.lineWidth = 14
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1.0
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
    }
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x, y } = getCoordinates(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  return (
    <>
      {/* Floating Launcher Trigger */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true)
            setIsMinimized(false)
          }}
          className="fixed bottom-20 right-4 sm:right-6 z-40 bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center gap-2 group border-2 border-white/80"
          title="เปิดกระดานทดเลขดิจิทัล"
        >
          <PenTool className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-black hidden sm:inline-block pr-1">กระดานทดเลข</span>
        </button>
      )}

      {/* Scratchpad Window */}
      {isOpen && (
        <div className={`fixed z-50 transition-all duration-300 ${
          isMinimized 
            ? 'bottom-20 right-4 sm:right-6 w-72' 
            : 'bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:w-[460px] md:w-[540px]'
        }`}>
          <Card className="border-2 border-orange-300 shadow-2xl bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden flex flex-col">
            {/* Header Toolbar */}
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-4 py-2.5 flex items-center justify-between text-white select-none">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                <span className="font-black text-xs sm:text-sm">กระดานทดเลขดิจิทัล (Scratchpad)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  title={isMinimized ? 'ขยาย' : 'ย่อหน้าต่าง'}
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  title="ปิดกระดาน"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Canvas Body (when not minimized) */}
            {!isMinimized && (
              <>
                {/* Secondary Tools Bar */}
                <div className="px-3 py-2 bg-orange-50/70 border-b border-orange-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                  {/* Colors & Pen Types */}
                  <div className="flex items-center gap-1.5">
                    {[
                      { hex: '#2563eb', label: 'น้ำเงิน' },
                      { hex: '#dc2626', label: 'แดง' },
                      { hex: '#16a34a', label: 'เขียว' },
                      { hex: '#1e293b', label: 'ดำ' }
                    ].map(c => (
                      <button
                        key={c.hex}
                        onClick={() => {
                          setColor(c.hex)
                          setIsEraser(false)
                          setIsHighlighter(false)
                        }}
                        style={{ backgroundColor: c.hex }}
                        className={`w-5 h-5 rounded-full border-2 transition-transform ${
                          !isEraser && !isHighlighter && color === c.hex 
                            ? 'scale-125 border-orange-600 ring-2 ring-orange-400' 
                            : 'border-white'
                        }`}
                        title={c.label}
                      />
                    ))}

                    <div className="h-4 w-px bg-slate-300 mx-1" />

                    <button
                      onClick={() => {
                        setIsHighlighter(true)
                        setIsEraser(false)
                      }}
                      className={`p-1.5 rounded-lg font-bold flex items-center gap-1 text-[11px] ${
                        isHighlighter ? 'bg-amber-300 text-amber-950 font-black' : 'text-slate-600 hover:bg-orange-100'
                      }`}
                      title="ปากกาเน้นข้อความสีเหลือง"
                    >
                      <Highlighter className="w-3.5 h-3.5" /> ไฮไลท์
                    </button>

                    <button
                      onClick={() => {
                        setIsEraser(true)
                        setIsHighlighter(false)
                      }}
                      className={`p-1.5 rounded-lg font-bold flex items-center gap-1 text-[11px] ${
                        isEraser ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-orange-100'
                      }`}
                      title="ยางลบ"
                    >
                      <Eraser className="w-3.5 h-3.5" /> ยางลบ
                    </button>
                  </div>

                  {/* Actions (Undo & Clear) */}
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleUndo}
                      className="h-7 px-2 text-slate-600 hover:text-orange-700 text-xs"
                      title="ย้อนกลับ (Undo)"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" /> ย้อนกลับ
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleClear}
                      className="h-7 px-2 text-red-600 hover:bg-red-50 text-xs font-bold"
                      title="ล้างกระดานทั้งหมด"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> ล้าง
                    </Button>
                  </div>
                </div>

                {/* Drawing Surface with Math Grid Paper Effect */}
                <div className="relative w-full h-[240px] sm:h-[280px] bg-white cursor-crosshair overflow-hidden"
                  style={{
                    backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)',
                    backgroundSize: '16px 16px'
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-full touch-none"
                  />
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
