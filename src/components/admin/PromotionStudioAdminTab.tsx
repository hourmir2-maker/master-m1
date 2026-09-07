'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  PROMOTION_TEAM_MEMBERS, 
  OPERATIONAL_PHASES, 
  CURRICULUM_PIPELINE_ITEMS,
  ContentPipelineItem,
  PromotionTeamMember 
} from '@/lib/promotion-team-data'
import { 
  Sparkles, 
  Video, 
  Music, 
  Film, 
  Copy, 
  CheckCircle2, 
  Zap, 
  Share2, 
  Send, 
  ExternalLink, 
  Play, 
  Layers, 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp,
  Cpu,
  Tv
} from 'lucide-react'

interface PromotionStudioAdminTabProps {
  onTriggerToast: (msg: string) => void
}

export default function PromotionStudioAdminTab({ onTriggerToast }: PromotionStudioAdminTabProps) {
  const [subView, setSubView] = useState<'roster' | 'workflow' | 'pipeline' | 'prompts'>('pipeline')
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'math' | 'science' | 'english' | 'thai'>('all')
  const [expandedItemId, setExpandedItemId] = useState<string | null>('pipe-math-01')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    onTriggerToast(`คัดลอก ${label} เรียบร้อยแล้ว! พร้อมนำไปวางใน AiPASS`)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  const filteredPipeline = selectedSubject === 'all' 
    ? CURRICULUM_PIPELINE_ITEMS 
    : CURRICULUM_PIPELINE_ITEMS.filter(item => item.subject === selectedSubject)

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 rounded-3xl p-6 text-white shadow-xl border border-purple-500/30 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-400 text-amber-950 font-black px-3 py-1 text-xs">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Edutainment Promotion & Production Studio
            </Badge>
            <Badge variant="outline" className="border-purple-300 text-purple-200 text-xs">
              AiPASS Multi-Model Engine (10,000 Token-Free Credits/Day)
            </Badge>
          </div>
          <span className="text-xs text-purple-200 font-mono">
            สพฐ. 2551 (60) • 4 วิชา • 32 โมดูล • 24 Trap Cards
          </span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
            🎬 ศูนย์บัญชาการทีมโปรโมท & สตูดิโอผลิตสื่อ AI ครบวงจร
          </h2>
          <p className="text-purple-100 text-xs sm:text-sm max-w-3xl mt-1.5 leading-relaxed">
            บริหารทีมงาน AI 5 บทบาทเฉพาะทาง: คิดสตอรี่บอร์ด Hook 3 วินาที, ประพันธ์เพลงจำสูตรด้วย Lyria 3 Pro, เรนเดอร์วิดีโอ 3D ด้วย Seedance 2.0, ถอดซับคาราโอเกะทองคำด้วย Gemini Audio และยิงเผยแพร่ข้ามแพลตฟอร์มอัตโนมัติ (Facebook Reels, YouTube Shorts, Telegram)
          </p>
        </div>

        {/* Sub-Navigation Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-purple-800/60">
          {[
            { id: 'pipeline', label: '🚀 คลังคอนเทนต์ & คิวผลิตคลิป (4 วิชา)', icon: Video },
            { id: 'roster', label: '👥 โครงสร้าง 5 เสาหลักทีมงาน AI', icon: Users },
            { id: 'workflow', label: '📋 แผนงาน SOP 5 ขั้นตอน (From Trap to Reel)', icon: Calendar },
            { id: 'prompts', label: '⚡ ห้องทดลอง Prompt เพลง & วิดีโอ 3D', icon: Cpu },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = subView === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setSubView(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-400 text-amber-950 shadow-md shadow-amber-400/20 scale-102'
                    : 'bg-purple-950/60 text-purple-200 hover:bg-purple-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: CONTENT PIPELINE (4 SUBJECTS)
          ========================================================================= */}
      {subView === 'pipeline' && (
        <div className="space-y-4">
          {/* Subject Filter & Quick Stats */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'ทุกวิชา (8 โปรเจกต์)', icon: '🌟' },
                { id: 'math', label: 'คณิตศาสตร์ (3)', icon: '📐' },
                { id: 'science', label: 'วิทยาศาสตร์ (2)', icon: '🔬' },
                { id: 'english', label: 'ภาษาอังกฤษ (2)', icon: '🇬🇧' },
                { id: 'thai', label: 'ภาษาไทย (2)', icon: '🇹🇭' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedSubject === sub.id
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {sub.icon} {sub.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => onTriggerToast('🚀 เริ่มต้นกระบวนการเรนเดอร์คลิป 9:16 ด้วย FFmpeg และส่งขึ้นคิว AiPASS...')}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl"
              >
                <Zap className="w-3.5 h-3.5 mr-1 text-amber-300" /> เรนเดอร์คิวอัตโนมัติ
              </Button>
            </div>
          </div>

          {/* Pipeline Cards Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredPipeline.map((item) => {
              const isExpanded = expandedItemId === item.id
              return (
                <Card 
                  key={item.id} 
                  className="bg-slate-900/95 border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all shadow-md"
                >
                  <CardHeader className="p-4 sm:p-5 pb-3 border-b border-slate-800/80 bg-slate-950/40">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-xl shrink-0">
                          {item.subject === 'math' ? '📐' : item.subject === 'science' ? '🔬' : item.subject === 'english' ? '🇬🇧' : '🇹🇭'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={item.badgeColor}>{item.subjectLabel}</Badge>
                            <Badge variant="outline" className={`text-[10px] ${item.statusColor}`}>
                              {item.statusLabel}
                            </Badge>
                            <span className="text-[10px] text-slate-400 font-mono">
                              จังหวะ: {item.targetBpm} BPM • แนว: {item.genre}
                            </span>
                          </div>
                          <CardTitle className="text-base font-bold text-white mt-1">
                            {item.title}
                          </CardTitle>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {item.viewsCount && (
                          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" /> {item.viewsCount}
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                          className="text-xs text-amber-400 hover:text-amber-300 hover:bg-slate-800"
                        >
                          {isExpanded ? 'ย่อรายละเอียด ▲' : 'ดู Prompt & สคริปต์ 9:16 ▼'}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 sm:p-5 space-y-3">
                    {/* Core Hook & Trick preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-rose-950/30 border border-rose-900/40 p-3 rounded-xl space-y-1">
                        <div className="text-xs font-bold text-rose-300 flex items-center gap-1">
                          <span>⚡ Hook 3 วินาทีแรก (Stop-the-Scroll):</span>
                        </div>
                        <p className="text-xs text-rose-100 font-medium italic">
                          "{item.hook3Sec}"
                        </p>
                      </div>

                      <div className="bg-emerald-950/30 border border-emerald-900/40 p-3 rounded-xl space-y-1">
                        <div className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                          <span>🎯 เทคนิคสูตรลัด / จุดลวง สทศ.:</span>
                        </div>
                        <p className="text-xs text-emerald-100 font-mono">
                          {item.coreTechnique}
                        </p>
                      </div>
                    </div>

                    {/* Expandable Prompts & 9:16 Script Accordion */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-800 space-y-4 animate-fade-in">
                        {/* 9:16 Short Script */}
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                              📱 สคริปต์วิดีโอแนวตั้ง 9:16 (Shorts, Reels, TikTok - 30 วินาที):
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopy(item.shorts9x16Script, `script-${item.id}`, 'สคริปต์ 9:16')}
                              className="h-7 text-[10px] border-amber-500/40 text-amber-300 hover:bg-amber-950/40"
                            >
                              {copiedKey === `script-${item.id}` ? <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" /> : <Copy className="w-3 h-3 mr-1" />}
                              คัดลอกสคริปต์
                            </Button>
                          </div>
                          <pre className="text-[11px] text-slate-300 bg-slate-900/80 p-3 rounded-lg whitespace-pre-wrap font-sans leading-relaxed border border-slate-800">
                            {item.shorts9x16Script}
                          </pre>
                        </div>

                        {/* Lyria 3 Pro Music Prompt */}
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
                              <Music className="w-3.5 h-3.5" /> Prompt แต่งเพลง Lyria 3 Pro (AiPASS):
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopy(item.lyriaMusicPrompt, `lyria-${item.id}`, 'Prompt เพลง Lyria 3 Pro')}
                              className="h-7 text-[10px] border-purple-500/40 text-purple-300 hover:bg-purple-950/40"
                            >
                              {copiedKey === `lyria-${item.id}` ? <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" /> : <Copy className="w-3 h-3 mr-1" />}
                              คัดลอก Prompt เพลง
                            </Button>
                          </div>
                          <div className="text-[11px] text-purple-200/90 font-mono bg-purple-950/20 p-2.5 rounded-lg border border-purple-900/30">
                            {item.lyriaMusicPrompt}
                          </div>
                        </div>

                        {/* Seedance 2.0 Mini Video 3D Prompt */}
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-300 flex items-center gap-1">
                              <Film className="w-3.5 h-3.5" /> Prompt สร้างคลิป 3D Seedance 2.0 (AiPASS):
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopy(item.seedanceVideoPrompt, `seedance-${item.id}`, 'Prompt วิดีโอ 3D Seedance 2.0')}
                              className="h-7 text-[10px] border-blue-500/40 text-blue-300 hover:bg-blue-950/40"
                            >
                              {copiedKey === `seedance-${item.id}` ? <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" /> : <Copy className="w-3 h-3 mr-1" />}
                              คัดลอก Prompt วิดีโอ 3D
                            </Button>
                          </div>
                          <div className="text-[11px] text-blue-200/90 font-mono bg-blue-950/20 p-2.5 rounded-lg border border-blue-900/30">
                            {item.seedanceVideoPrompt}
                          </div>
                        </div>

                        {/* Direct Action Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                          <div className="flex items-center gap-2">
                            {item.youtubeUrl && (
                              <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline" className="text-xs border-red-500/40 text-red-400 hover:bg-red-950/30">
                                  <Play className="w-3 h-3 mr-1" /> เปิดดูบน YouTube
                                </Button>
                              </a>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onTriggerToast(`ยิงโพสต์ Facebook Reels คลิป "${item.title}" เข้าเพจ Master ม.1 สำเร็จ!`)}
                              className="text-xs border-blue-500/40 text-blue-400 hover:bg-blue-950/30"
                            >
                              <Share2 className="w-3 h-3 mr-1" /> ซิงก์ Facebook Reels (Meta API)
                            </Button>
                          </div>

                          <Button
                            size="sm"
                            onClick={() => onTriggerToast(`ส่งคลิปความรู้และสูตรลัด "${item.title}" เข้า Telegram ผู้ปกครองและกลุ่มนักเรียนแล้ว!`)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                          >
                            <Send className="w-3 h-3 mr-1" /> บรอดแคสต์เข้า Telegram
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: 5 EXPERT ROLES ROSTER
          ========================================================================= */}
      {subView === 'roster' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" /> สมาพันธ์ 5 เสาหลักทีมงานผลิตสื่อ & คอนเทนต์ไวรัล
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              ทีมงานปัญญาประดิษฐ์อัตโนมัติ 5 ตำแหน่ง ทำงานร่วมกันอย่างไร้รอยต่อแบบส่งไม้ต่อ (Autonomous Hand-off)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROMOTION_TEAM_MEMBERS.map((member) => (
              <Card 
                key={member.id} 
                className="bg-slate-900/90 border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-purple-500/50 transition-all shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                      {member.avatarIcon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {member.roleTh}
                      </h4>
                      <span className="text-[10px] text-purple-300 font-mono block">
                        {member.roleEn}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-amber-300 font-medium bg-amber-950/20 border border-amber-900/30 p-2 rounded-lg">
                    ✨ "{member.tagline}"
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-300 block">🤖 โมเดลหลักใน AiPASS:</span>
                    <Badge variant="outline" className="border-purple-400 text-purple-300 text-[10px]">
                      {member.aiEngine}
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-300 block">🎯 ภารกิจหลัก:</span>
                    <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                      {member.primaryTasks.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="text-[10px] text-emerald-400 font-medium">
                    ⚡ {member.efficiencyNote}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.deliverables.map((del, di) => (
                      <Badge key={di} className="bg-slate-800 text-slate-300 text-[9px]">
                        {del}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: 5-PHASE OPERATIONAL SOP
          ========================================================================= */}
      {subView === 'workflow' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" /> แผนการปฏิบัติงานมาตรฐาน 5 ขั้นตอน (Standard Operating Procedure - SOP)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              วงจรการผลิตคลิปไวรัล 1 ชิ้น ใช้เวลารวมไม่เกิน 28 นาที ตั้งแต่วิเคราะห์จุดลวง สทศ. จนถึงยิงคลิปขึ้น Reels & Shorts อัตโนมัติ
            </p>
          </div>

          <div className="space-y-3">
            {OPERATIONAL_PHASES.map((phase) => (
              <div 
                key={phase.phaseNumber}
                className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all shadow-md"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 font-black flex items-center justify-center text-sm shrink-0">
                      {phase.phaseNumber}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        {phase.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {phase.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-900/60 text-purple-200 border-purple-700 text-xs">
                      ⏱️ {phase.duration}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {phase.stepAction}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-purple-300 font-bold block mb-1">🛠️ เครื่องมือ AI:</span>
                    <div className="flex flex-wrap gap-1">
                      {phase.aiTools.map((tool, idx) => (
                        <Badge key={idx} variant="outline" className="text-[10px] border-slate-700 text-slate-300">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-emerald-300 font-bold block mb-1">✅ เกณฑ์มาตรฐานคุณภาพ:</span>
                    <span className="text-slate-300 text-[11px] leading-tight block">
                      {phase.qualityStandard}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: INTERACTIVE PROMPT LAB
          ========================================================================= */}
      {subView === 'prompts' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" /> ห้องทดลอง Prompt เพลง & วิดีโอ 3D สำหรับ AiPASS
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              คัดลอก Prompt สำเร็จรูปที่ผ่านการจูนสไตล์และโครงสร้างดนตรี เพื่อนำไปสร้างเพลงใน Lyria 3 Pro หรือวิดีโอ 3D ใน Seedance 2.0 ได้ทันที
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lyria 3 Pro Card */}
            <Card className="bg-slate-900/90 border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Lyria 3 Pro Music Prompt</h4>
                    <span className="text-[10px] text-purple-300">สร้างเพลงเต็ม 3 นาที บน AiPASS</span>
                  </div>
                </div>
                <Badge className="bg-purple-600 text-white text-xs">Token-Free</Badge>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300">เทมเพลต Prompt เพลงสูตรลัด 4 วิชา:</span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-purple-200 leading-relaxed">
                  "Upbeat energetic Thai educational synth-pop, 120 BPM, catchy rhythmic vocal cadence, bright synthesizers, punchy modern dance beat, enthusiastic Thai singing voice explaining [SUBJECT_SHORTCUT], crystal clear Thai enunciation, commercial grade master."
                </div>
              </div>

              <Button
                onClick={() => handleCopy("Upbeat energetic Thai educational synth-pop, 120 BPM, catchy rhythmic vocal cadence, bright synthesizers, punchy modern dance beat, enthusiastic Thai singing voice explaining speed math shortcuts, crystal clear Thai enunciation, commercial grade master.", 'master-lyria', 'Master Lyria Prompt')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl"
              >
                <Copy className="w-3.5 h-3.5 mr-1" /> คัดลอก Master Prompt สำหรับ Lyria 3 Pro
              </Button>
            </Card>

            {/* Seedance 2.0 Mini Card */}
            <Card className="bg-slate-900/90 border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Seedance 2.0 3D Video Prompt</h4>
                    <span className="text-[10px] text-blue-300">สร้างคลิปแอนิเมชัน 3D บน AiPASS</span>
                  </div>
                </div>
                <Badge className="bg-blue-600 text-white text-xs">Token-Free</Badge>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300">เทมเพลต Prompt คลิป 3D น้องฟอร์จูน:</span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-blue-200 leading-relaxed">
                  "Cute 3D animated Thai schoolboy solving glowing [SUBJECT_CONCEPT] equations in floating digital space, colorful neon formulas multiplying smoothly, Studio Ghibli meets Pixar futuristic high-tech classroom style, vibrant cinematic lighting, seamless 10-second loop, 4K."
                </div>
              </div>

              <Button
                onClick={() => handleCopy("Cute 3D animated Thai schoolboy solving glowing math equations in floating digital space, colorful neon formulas multiplying smoothly, Studio Ghibli meets Pixar futuristic high-tech classroom style, vibrant cinematic lighting, seamless 10-second loop, 4K.", 'master-seedance', 'Master Seedance Prompt')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
              >
                <Copy className="w-3.5 h-3.5 mr-1" /> คัดลอก Master Prompt สำหรับ Seedance 2.0
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
