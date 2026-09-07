/**
 * MASTER ม.1 — Edutainment Promotion & Media Production Studio Hub
 * โครงสร้างข้อมูลทีมงานผลิตสื่อ, เพลง, วิดีโอ 3D, คอนเทนต์โปรโมท 4 วิชาหลัก
 * ขับเคลื่อนด้วยสถาปัตยกรรม AiPASS TH (Lyria 3 Pro, Seedance 2.0, Claude Sonnet 5, Gemini Waveform)
 */

export interface PromotionTeamMember {
  id: string
  roleTh: string
  roleEn: string
  avatarIcon: string
  tagline: string
  aiEngine: string
  primaryTasks: string[]
  deliverables: string[]
  efficiencyNote: string
}

export interface ContentPipelineItem {
  id: string
  subject: 'math' | 'science' | 'english' | 'thai'
  subjectLabel: string
  badgeColor: string
  title: string
  moduleKey: string
  trapCardId?: string
  hook3Sec: string
  coreTechnique: string
  status: 'published' | 'ready_to_render' | 'in_production' | 'script_draft'
  statusLabel: string
  statusColor: string
  targetBpm: number
  genre: string
  viewsCount?: string
  retentionRate?: string
  lyriaMusicPrompt: string
  seedanceVideoPrompt: string
  shorts9x16Script: string
  youtubeUrl?: string
}

export interface OperationalPhase {
  phaseNumber: number
  title: string
  subtitle: string
  duration: string
  aiTools: string[]
  stepAction: string
  qualityStandard: string
}

export const PROMOTION_TEAM_MEMBERS: PromotionTeamMember[] = [
  {
    id: 'content_director',
    roleTh: 'ผู้อำนวยการคอนเทนต์ & สตอรี่บอร์ดไวรัล',
    roleEn: 'Lead Content Strategist & Virality Director',
    avatarIcon: '🎯',
    tagline: 'เปลี่ยนโจทย์ยาก & จุดลวง สทศ. ให้กลายเป็นคลิปสั้นที่เด็กดูซ้ำจนจำฝังใจ',
    aiEngine: 'Claude Sonnet 5 + DeepSeek R1 (AiPASS TH)',
    primaryTasks: [
      'วิเคราะห์สถิติจุดลวง สทศ./สพฐ. และข้อสอบ สสวท. ล่าสุด',
      'ออกแบบ Hook 3 วินาทีแรก (Stop-the-Scroll) หยุดนิ้วโป้งคนดู',
      'วางโครงสร้าง Looping Script ให้คลิปจบแล้ววนดูใหม่แบบไร้รอยต่อ (Retention > 100%)',
      'คุมธีมคอนเทนต์ 52 สัปดาห์ ครอบคลุม 4 วิชาหลัก 32 โมดูล'
    ],
    deliverables: ['สตอรี่บอร์ด 30-45 วิ', 'Hook Script', 'Call to Action (CTA) นำทางสู่แพลตฟอร์ม'],
    efficiencyNote: 'ใช้ DeepSeek R1 แกะโจทย์และ Claude Sonnet วางพล็อตแบบ Token-Free 100%'
  },
  {
    id: 'ai_lyricist',
    roleTh: 'นักแต่งเพลงจำสูตร & โปรดิวเซอร์ดนตรี AI',
    roleEn: 'Lyricist & Edutainment Music Producer',
    avatarIcon: '🎵',
    tagline: 'แปลงสูตรคณิต-วิทย์ และไวยากรณ์ภาษา ให้เป็นท่อนฮุกติดหู จังหวะโดนใจ',
    aiEngine: 'Lyria 3 Pro + Pathumma ThaiLLM (AiPASS TH) / Suno',
    primaryTasks: [
      'ประพันธ์คำกลอน/ท่อนแร็ปคล้องจองสูตรลัด เช่น Q = mcΔt, พีทาโกรัส 3-4-5, If-Clause',
      'กำหนดค่า BPM (110 - 128 BPM) เพื่อให้จังหวะกระตุ้นความจำสมองส่วนฮิปโปแคมปัส',
      'เจนไฟล์เสียงเพลงเต็มและท่อนฮุก 30 วิ สไตล์ Synth-Pop, Lo-Fi Chill, Modern T-Pop',
      'มิกซ์และมาสเตอร์ไฟล์เสียงคมชัดระดับ 320 kbps ปลอดลิขสิทธิ์ 100%'
    ],
    deliverables: ['ไฟล์เสียง Master (.mp3)', 'เนื้อเพลงท่อนฮุกสกัดสูตร', 'Music Prompt Spec'],
    efficiencyNote: 'ใช้ Lyria 3 Pro บน AiPASS สร้างเพลงเต็มความยาว 3 นาทีโดยไม่ต้องเสียค่าใช้จ่าย'
  },
  {
    id: 'motion_animator',
    roleTh: 'แอนิเมเตอร์ 3D & ผู้กำกับวิชวลเอฟเฟกต์',
    roleEn: '3D Visual & Motion Graphics Animator',
    avatarIcon: '🎬',
    tagline: 'เสกตัวการ์ตูน 3D น้องฟอร์จูน และภาพสมการเรืองแสงระดับภาพยนตร์',
    aiEngine: 'Seedance 2.0 Mini + Midjourney (AiPASS TH)',
    primaryTasks: [
      'เจนวิดีโอ 3D น้องฟอร์จูนในชุดนักเรียนตะลุยอวกาศและห้องแล็บวิทยาศาสตร์',
      'ทำ Motion Graphics กราฟิกคลี่รูปเรขาคณิต 3D และทิศทางกระแสไฟฟ้าในวงจร',
      'สร้างฉาก Seamless Loop สำหรับใช้เป็นแบ็กกราวด์วิดีโอทั้งแนวตั้งและแนวนอน',
      'ปรับจูน Color Grading ให้สว่างสดใส โทนสีน้ำเงิน-ส้ม-ทอง สไตล์ Pixar/Ghibli'
    ],
    deliverables: ['วิดีโอ 3D Seamless Loop (.mp4)', 'Assets ภาพกราฟิก 4K', 'Scene Composition'],
    efficiencyNote: 'เจนวิดีโอ 3D เคลื่อนไหวสมจริงผ่าน Seedance 2.0 Mini ในโควตาฟรีวันละ 10,000 เครดิต'
  },
  {
    id: 'hardsub_engineer',
    roleTh: 'วิศวกรเสียง & ถอดซับคาราโอเกะตรงจังหวะ',
    roleEn: 'Hardsub & Audio-Sync Sound Engineer',
    avatarIcon: '⚡',
    tagline: 'ถอดเวลาคลื่นเสียงจริงระดับมิลลิวินาที ตัวหนังสือวิ่งตรงจังหวะเป๊ะ 100%',
    aiEngine: 'Gemini Audio Waveform Engine (gemini-2.5-flash) + FFmpeg',
    primaryTasks: [
      'ส่งไฟล์เสียงเข้า Gemini Audio เพื่อตรวจจับจุดเริ่มต้นและจุดสิ้นสุดของแต่ละคำ (Rule 29)',
      'สร้างไฟล์คาราโอเกะ ASS v4.00+ ฟอนต์ Tahoma Bold ขอบดำหนา 4px ไฮไลต์สีทอง',
      'เรนเดอร์ Hardsub ฝังถาวรลงในเนื้อวิดีโอด้วย FFmpeg แบบ Ultra-fast 60fps (Rule 30)',
      'ปรับขนาดตัวหนังสือให้อ่านง่ายบนจอมือถือโดยไม่โดนปุ่ม UI ของ TikTok/Reels บัง'
    ],
    deliverables: ['ไฟล์ซับไตเติล .ass', 'วิดีโอ Hardsub ฝังถาวร (.mp4)', 'Timestamp Alignment JSON'],
    efficiencyNote: 'ห้ามคาดเดาเวลาด้วยสายตา — ใช้ AI ถอดคลื่นเสียงจริงตรงวินาที 100%'
  },
  {
    id: 'growth_distributor',
    roleTh: 'ผู้เชี่ยวชาญการตลาด & ยิงคลิปข้ามแพลตฟอร์ม',
    roleEn: 'Growth Hacker & Multi-Platform Distributor',
    avatarIcon: '🚀',
    tagline: 'กระจายคอนเทนต์อัตโนมัติ 4 ช่องทาง ดึงผู้เรียนใหม่และพาเข้าสู่ระบบ',
    aiEngine: 'Meta Graph API v21.0 + CDP YouTube Engine + Telegram Bot API',
    primaryTasks: [
      'แปลงคลิปเต็มเป็นสัดส่วน 9:16 (Shorts & Reels 30 วิ) พร้อม Dynamic Blur BG (Rule 34)',
      'ยิงคลิปขึ้น Facebook Reels เพจ Master ม.1 อัตโนมัติในทันทีที่เรนเดอร์เสร็จ',
      'อัปโหลด YouTube Shorts ด้วยระบบ Chrome DevTools Protocol (CDP) อัตโนมัติ',
      'ยิงการ์ดแจ้งเตือนและลิงก์คลิปความรู้เข้า Telegram ผู้ปกครองและกลุ่มนักเรียน',
      'ฝัง Shopee Affiliate Link อุปกรณ์การเรียนใต้คลิปเพื่อสร้าง Passive Income เสริม'
    ],
    deliverables: ['Shorts/Reels 9:16', 'ลิงก์ Facebook Reels', 'ลิงก์ YouTube Shorts', 'Push Notification'],
    efficiencyNote: 'ระบบ Vercel Cron และ Meta API โพสต์ให้เสร็จในไม่กี่วินาที ไม่ต้องคลิกมือ'
  }
]

export const OPERATIONAL_PHASES: OperationalPhase[] = [
  {
    phaseNumber: 1,
    title: 'Phase 1: สกัดจุดลวง & วาง Hook 3 วินาที',
    subtitle: 'Trap Extraction & High-Retention Scripting',
    duration: '10 นาที / คลิป',
    aiTools: ['DeepSeek R1 (AiPASS)', 'Claude Sonnet 5'],
    stepAction: 'ดึงข้อมูลจาก 24 O-NET Trap Cards และหลักสูตร สพฐ. 2560 นำมาเขียน Hook และ Script คำกลอนจำง่าย พร้อมจุดลวงที่เด็กมักตกม้าตาย',
    qualityStandard: 'Hook ต้องกระตุ้นความสงสัยทันทีภายใน 3 วินาทีแรก และ Script ต้องวน Loop จบที่ประโยคเดิมได้'
  },
  {
    phaseNumber: 2,
    title: 'Phase 2: ประพันธ์บทเพลง & เจนดนตรี AI',
    subtitle: 'Rhyme Writing & AI Audio Generation',
    duration: '5 นาที / เพลง',
    aiTools: ['Lyria 3 Pro (AiPASS)', 'Pathumma ThaiLLM', 'Suno v3.5'],
    stepAction: 'ส่งเนื้อร้องท่อนฮุกเข้า Lyria 3 Pro กำหนดสไตล์ T-Pop / Synth-Pop จังหวะ 118-124 BPM เพื่อสร้างเพลงช่วยจำสูตรคณิต-วิทย์',
    qualityStandard: 'สำเนียงภาษาไทยชัดเจน เสียงร้องสดใส คำศัพท์วิชาการตรงหลักสูตร 100%'
  },
  {
    phaseNumber: 3,
    title: 'Phase 3: เจนฉาก 3D & วิชวลเอฟเฟกต์',
    subtitle: '3D Character & Motion Asset Generation',
    duration: '8 นาที / ฉาก',
    aiTools: ['Seedance 2.0 Mini (AiPASS)', 'Stable Video'],
    stepAction: 'เจนคลิป 3D น้องฟอร์จูนและกราฟิกสมการเรืองแสงในอวกาศความยาว 10-15 วินาที แล้วนำมาทำ Seamless Loop เป็นแบ็กกราวด์',
    qualityStandard: 'ความละเอียด Full HD (1080p), สีสันสดใส คมชัด ไม่แตก ไม่เบลอ'
  },
  {
    phaseNumber: 4,
    title: 'Phase 4: ถอดเสียงคลื่นจริง & ฝังซับคาราโอเกะทองคำ',
    subtitle: 'Waveform Millisecond Sync & FFmpeg Hardsub',
    duration: '3 นาที / คลิป',
    aiTools: ['Gemini Audio Waveform Engine', 'FFmpeg v6.0'],
    stepAction: 'ส่งไฟล์ .mp3 ให้ Gemini ดึง Timestamp รายคำ จากนั้นสร้างไฟล์ ASS v4.00+ ไฮไลต์สูตรลัดด้วยสีทอง และเรนเดอร์ Hardsub ฝังถาวร',
    qualityStandard: 'คำบรรยายตรงกับเสียงร้องระดับเสี้ยววินาที ฟอนต์ตัวหนาชัดเจนบนมือถือ'
  },
  {
    phaseNumber: 5,
    title: 'Phase 5: ตัดต่อ 9:16 & เผยแพร่ข้ามแพลตฟอร์ม',
    subtitle: 'Multi-Channel Auto Distribution & Growth',
    duration: '2 นาที / ช่องทาง',
    aiTools: ['Meta Graph API v21.0', 'CDP YouTube Automation', 'Telegram Bot API'],
    stepAction: 'ตัดต่อเวอร์ชันแนวตั้ง 9:16 ใส่แถบ Hook บนและแถบ CTA ล่าง สั่งยิงขึ้น Facebook Reels, YouTube Shorts และ Telegram อัตโนมัติ',
    qualityStandard: 'เผยแพร่สมบูรณ์ทั้ง 4 แพลตฟอร์ม พร้อมติดแฮชแท็ก #MASTERม1 #สูตรลัด3วิ #ONET'
  }
]

export const CURRICULUM_PIPELINE_ITEMS: ContentPipelineItem[] = [
  // =========================================================================
  // 🔢 1. MATHEMATICS (คณิตศาสตร์ - 4 คอนเทนต์ไฮไลต์)
  // =========================================================================
  {
    id: 'pipe-math-01',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    badgeColor: 'bg-blue-600 text-white',
    title: 'เพลงสูตรลัด 3 วินาที (Speed Math Anthem)',
    moduleKey: 'numbers_basics',
    trapCardId: 'math-fraction-add',
    hook3Sec: 'อย่าเพิ่งเลื่อนผ่าน! ถ้ายังคิดเลขลงท้ายด้วย 5 กำลังสองแบบตั้งคูณยาว!',
    coreTechnique: 'n5² = [n × (n+1)]25 | สี่เหลี่ยมด้าน a ใบไม้แรเงา = (4/7)a²',
    status: 'published',
    statusLabel: 'เผยแพร่แล้ว 🎬',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    targetBpm: 120,
    genre: 'Upbeat Synth-Pop',
    viewsCount: '12,450 วิว',
    retentionRate: '108% (ดูซ้ำ)',
    youtubeUrl: 'https://youtu.be/SLumB462LQU',
    lyriaMusicPrompt: 'Upbeat energetic Thai educational synth-pop, 120 BPM, catchy rhythmic vocal cadence, bright synthesizers, punchy modern dance beat, enthusiastic Thai singing voice explaining speed math shortcuts.',
    seedanceVideoPrompt: 'Cute 3D animated Thai schoolboy solving glowing math equations in floating digital space, colorful neon numbers multiplying smoothly, Studio Ghibli meets Pixar futuristic high-tech classroom style, 4K resolution.',
    shorts9x16Script: '⚡ [Hook 0-3s]: 85 ยกกำลังสอง คิดในใจได้ใน 3 วินาที จริงเหรอ?\n💡 [Body 3-20s]: เอาตัวหน้าคูณตัวถัดไป: 8 × 9 = 72 แล้วแปะ 25 ทันที ตอบ 7,225!\n📌 [Rule 20-25s]: สูตรเทพ สี่เหลี่ยมด้าน a ใบไม้แรเงา เท่ากับ 4/7 ของ a²!\n🚀 [CTA 25-30s]: อยากได้สูตรลัด ม.1 ครบทุกวิชา เข้า master-m1.vercel.app ได้เลย!'
  },
  {
    id: 'pipe-math-02',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    badgeColor: 'bg-blue-600 text-white',
    title: 'วนรอบหลักหน่วยเลขยกกำลังสูง (Cyclicity mod 4)',
    moduleKey: 'powers_roots',
    trapCardId: 'math-units-digit',
    hook3Sec: 'เจอ 7 ยกกำลัง 2570 ถามหลักหน่วย อย่าเพิ่งเป็นลม! ดูวิธีนี้!',
    coreTechnique: 'เลขโดด 2, 3, 7, 8 วนรอบ 4 ตัว ➔ นำเลขชี้กำลัง mod 4',
    status: 'ready_to_render',
    statusLabel: 'พร้อมเรนเดอร์ 🚀',
    statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    targetBpm: 124,
    genre: 'Future Bass / Electronic Trap',
    viewsCount: 'คิวผลิต',
    retentionRate: 'คาดการณ์ 115%',
    lyriaMusicPrompt: 'Energetic Thai future bass, 124 BPM, rhythmic vocal rap explaining powers mod 4 cyclicity, pumping bass, crystal clear melodic synths, hyper-focused exam tutorial vibe.',
    seedanceVideoPrompt: 'A holographic spinning circle displaying numbers 7, 9, 3, 1 glowing in electric blue, cute 3D boy avatar pointing a laser wand at the wheel, cosmic futuristic background with floating formulas.',
    shorts9x16Script: '⚡ [Hook 0-3s]: 7²⁵⁷⁰ หลักหน่วยคือเลขอะไร? สทศ. ชอบออกหลอกทุกปี!\n💡 [Body 3-20s]: จำไว้ว่าเลข 7 วนรอบ 4 ตัว (7, 9, 3, 1) เอาเลขชี้กำลัง 2570 หาร 4 เศษ 2! เศษ 2 ก็คือตำแหน่งที่ 2 ตอบ 9 ใน 3 วิ!\n📌 [Rule 20-25s]: หาร 4 เศษ 1 ตอบ 7, เศษ 2 ตอบ 9, เศษ 3 ตอบ 3, ลงตัวตอบ 1!\n🚀 [CTA 25-30s]: แม่นสูตรแบบไม่ต้องท่องจำ ที่ MASTER ม.1!'
  },
  {
    id: 'pipe-math-03',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    badgeColor: 'bg-blue-600 text-white',
    title: 'ความเร็วเฉลี่ยไป-กลับ (Harmonic Mean Shortcut)',
    moduleKey: 'ratio_percent',
    trapCardId: 'math-average-speed',
    hook3Sec: 'ขาไป 60 ขากลับ 40 ตอบเฉลี่ย 50... ผิดทันที 0 คะแนน!',
    coreTechnique: 'v_avg = 2v₁v₂ / (v₁ + v₂) = (2 × 60 × 40) / 100 = 48 กม./ชม.',
    status: 'in_production',
    statusLabel: 'กำลังผลิต 🎵',
    statusColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    targetBpm: 115,
    genre: 'Lo-Fi Melodic Rap',
    viewsCount: 'กำลังแต่งเพลง',
    retentionRate: 'คาดการณ์ 105%',
    lyriaMusicPrompt: 'Chill melodic Thai hip-hop, 115 BPM, smooth Rhodes piano, gentle 808 beat, catchy storytelling rhythm about traveling speeds and harmonic mean formula.',
    seedanceVideoPrompt: 'Cute 3D red electric car zooming through a scenic mountain highway with floating speedometers and clock timers, Pixar style stylized scenery, golden hour lighting.',
    shorts9x16Script: '⚡ [Hook 0-3s]: ขับรถไป 60 ขากลับ 40 ทำไมความเร็วเฉลี่ยไม่ใช่ 50?\n💡 [Body 3-20s]: เพราะเวลาขาไปกับขากลับไม่เท่ากัน! ข้อนี้ต้องใช้สูตรลัดฮาร์มอนิก 2 คูณ v1 คูณ v2 หารด้วยผลบวก!\n📌 [Rule 20-25s]: 2 × 60 × 40 = 4800 หารด้วย 100 ตอบ 48 กม./ชม. เป๊ะปัง!\n🚀 [CTA 25-30s]: ตะลุยโจทย์หลอก สทศ. 560 ข้อ ฟรีที่ master-m1.vercel.app'
  },
  {
    id: 'pipe-math-04',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    badgeColor: 'bg-blue-600 text-white',
    title: 'การเพิ่ม-ลดร้อยละไม่สมมาตร (Net Multiplier Formula)',
    moduleKey: 'percentages',
    trapCardId: 'math-percent-change',
    hook3Sec: 'ลดราคา 20% แล้ววันถัดมาขึ้นราคา 20% กลับมาเท่าเดิมไหม? ทายดู!',
    coreTechnique: 'ฐานร้อยละเปลี่ยนไป ➔ ตัวคูณสุทธิ: 0.80 × 1.20 = 0.96 (ลดลง 4% เสมอ)',
    status: 'script_draft',
    statusLabel: 'สตอรี่บอร์ดเสร็จ 📝',
    statusColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    targetBpm: 118,
    genre: 'Funky Groovy Pop',
    viewsCount: 'เตรียมคิว',
    retentionRate: 'คาดการณ์ 107%',
    lyriaMusicPrompt: 'Funky Thai groove pop, 118 BPM, walking bass line, playful brass stabs, humorous Thai vocals explaining percentage traps in daily shopping.',
    seedanceVideoPrompt: 'Cute 3D animated mall storefront with floating discount tags -20% and +20% spinning around a price calculator, Pixar aesthetic, bright cheerful lighting.',
    shorts9x16Script: '⚡ [Hook 0-3s]: เสื้อลด 20% แล้วขึ้น 20% ราคาเท่าเดิมจริงเหรอ? 95% ทายผิด!\n💡 [Body 3-20s]: ไม่เท่าเดิมเด็ดขาด! เพราะฐานเปลี่ยน ตอนลด 20% เหลือ 0.80 พอบวก 20% จากฐานใหม่ เอา 0.80 × 1.20 = 0.96 ขาดทุน 4% เสมอ!\n📌 [Rule 20-25s]: Net Multiplier = (1 - 0.2) × (1 + 0.2) = 0.96!\n🚀 [CTA 25-30s]: เตรียมสอบเข้า ม.1 ห้องเรียนพิเศษ เข้าเลยที่ MASTER ม.1'
  },

  // =========================================================================
  // 🔬 2. SCIENCE (วิทยาศาสตร์ - 4 คอนเทนต์ไฮไลต์)
  // =========================================================================
  {
    id: 'pipe-sci-01',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    badgeColor: 'bg-emerald-600 text-white',
    title: 'เพลงพลังงานความร้อน Q = mcΔt & Q = mL',
    moduleKey: 'energy',
    trapCardId: 'sci-dilution-calc',
    hook3Sec: 'เมื่อไหร่ใช้ mcΔt? เมื่อไหร่ใช้ mL? ร้องท่อนนี้รอบเดียวจำได้ตลอดชีพ!',
    coreTechnique: 'อุณหภูมิเปลี่ยนใช้ mcΔt | สถานะเปลี่ยน (T คงที่) ใช้ mL',
    status: 'published',
    statusLabel: 'เผยแพร่แล้ว 🎬',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    targetBpm: 110,
    genre: 'Lo-Fi Chill Hop',
    viewsCount: '9,820 วิว',
    retentionRate: '102%',
    youtubeUrl: 'https://youtu.be/SLumB462LQU',
    lyriaMusicPrompt: 'Chill relaxing Thai educational lofi hip hop, 110 BPM, soft jazz guitar chords, warm vinyl crackle, gentle female Thai voice teaching heat physics formulas.',
    seedanceVideoPrompt: 'A cute 3D scientific laboratory with test tubes glowing warm orange and cool blue, an ice cube melting into liquid water under a microscope, cozy Studio Ghibli atmosphere.',
    shorts9x16Script: '⚡ [Hook 0-3s]: ข้อสอบฟิสิกส์ ม.1 เรื่องความร้อน ถ้าน้องจำ 2 สูตรนี้ไม่ได้ กาผิดแน่นอน!\n💡 [Body 3-20s]: จำทริกง่ายๆ ถ้า "อุณหภูมิเปลี่ยน" ร้อนขึ้นเย็นลง ให้ใช้ mcΔt แต่ถ้า "สถานะเปลี่ยน" อุณหภูมิคงที่ เช่น น้ำแข็งละลาย ให้ใช้ mL!\n📌 [Rule 20-25s]: นำความร้อนในของแข็ง พาความร้อนในของเหลว แผ่รังสีไม่ง้อตัวกลาง!\n🚀 [CTA 25-30s]: ทำแล็บเสมือนจริง Virtual Lab ได้ที่ MASTER ม.1!'
  },
  {
    id: 'pipe-sci-02',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    badgeColor: 'bg-emerald-600 text-white',
    title: 'วงจรไฟฟ้าอนุกรม vs ขนาน หลอดขาดแล้วเป็นยังไง?',
    moduleKey: 'forces_motion',
    trapCardId: 'sci-circuit-series-parallel',
    hook3Sec: 'ไฟต้นคริสต์มาสดวงหนึ่งขาด ทำไมดับทั้งสาย? ข้อสอบ สสวท. เฉลยแบบนี้!',
    coreTechnique: 'อนุกรม: กระแสเท่ากัน ทางเดินเดียว ขาดดวงหนึ่งดับหมด | ขนาน: โวลต์เท่ากัน ดับดวงเดียวยังติด',
    status: 'ready_to_render',
    statusLabel: 'พร้อมเรนเดอร์ 🚀',
    statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    targetBpm: 122,
    genre: 'Modern Pop / EDM',
    viewsCount: 'คิวผลิต',
    retentionRate: 'คาดการณ์ 110%',
    lyriaMusicPrompt: 'Bright playful Thai electro-pop, 122 BPM, bouncy synth lines, punchy claps, cheerful Thai singing explaining series and parallel circuits.',
    seedanceVideoPrompt: 'Glowing 3D animated circuit board with bright yellow energy pulses flowing through wires and light bulbs, split screen comparing series vs parallel loops, high-tech aesthetic.',
    shorts9x16Script: '⚡ [Hook 0-3s]: ไฟบ้านเราต่อแบบอนุกรมหรือขนาน? ถ้าต่อผิดไฟดับทั้งบ้านนะ!\n💡 [Body 3-20s]: อนุกรมคือกอดคอเดินแถวเดี่ยว หลอดหนึ่งขาด วงจรเปิด ดับทั้งบ้าน! แต่ไฟบ้านต่อแบบ "ขนาน" แยกทางใครทางมัน หลอดขาดดวงอื่นยังสว่างจ้า!\n📌 [Rule 20-25s]: อนุกรม I เท่ากัน, ขนาน V เท่ากัน!\n🚀 [CTA 25-30s]: ทดลองต่อวงจรใน Virtual Physics Lab ฟรีที่ MASTER ม.1!'
  },
  {
    id: 'pipe-sci-03',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    badgeColor: 'bg-emerald-600 text-white',
    title: 'เลือดดำ vs เลือดแดง ข้อยกเว้นหลอดเลือดปอดที่ สทศ. ชอบหลอก',
    moduleKey: 'human_body',
    trapCardId: 'sci-circulatory-system',
    hook3Sec: 'เส้นเลือด Artery มีแต่เลือดแดงจริงเหรอ? กาแบบนี้ตกม้าตายมานับหมื่น!',
    coreTechnique: 'Pulmonary Artery นำเลือดดำไปฟอกที่ปอด | Pulmonary Vein นำเลือดแดงกลับเข้าหัวใจ',
    status: 'in_production',
    statusLabel: 'กำลังผลิต 🎵',
    statusColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    targetBpm: 114,
    genre: 'Cinematic Pop',
    viewsCount: 'กำลังแต่งเพลง',
    retentionRate: 'คาดการณ์ 106%',
    lyriaMusicPrompt: 'Cinematic emotional Thai pop, 114 BPM, gentle strings with modern pulse beat, crystal clear Thai narration on the circulatory system and pulmonary exception.',
    seedanceVideoPrompt: 'A stylized glowing 3D human heart with blue deoxygenated blood and red oxygenated blood flowing through pulsating transparent vessels into lungs, medical Pixar style.',
    shorts9x16Script: '⚡ [Hook 0-3s]: Artery นำเลือดแดง Vein นำเลือดดำ... ท่องแบบนี้โดน สทศ. หลอก 0 คะแนน!\n💡 [Body 3-20s]: เพราะมีข้อยกเว้นระดับโลก! หลอดเลือด Pulmonary Artery ออกจากหัวใจห้องล่างขวา เป็น "เลือดดำ" ไปฟอกที่ปอด และ Pulmonary Vein นำ "เลือดแดง" เข้าหัวใจ!\n📌 [Rule 20-25s]: คำว่า Pulmonary เมื่อไหร่ สีเลือดจะกลับด้านทันที!\n🚀 [CTA 25-30s]: ติวระบบร่างกายมนุษย์ ม.1 ละเอียดยิบที่ MASTER ม.1'
  },
  {
    id: 'pipe-sci-04',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    badgeColor: 'bg-emerald-600 text-white',
    title: 'การหายใจของพืช 24 ชั่วโมง ความเข้าใจผิดยอดฮิต O-NET',
    moduleKey: 'plant_biology',
    trapCardId: 'sci-plant-respiration',
    hook3Sec: 'พืชหายใจเฉพาะตอนกลางคืนจริงเหรอ? วิทย์ ม.1 เฉลยความจริงสุดช็อก!',
    coreTechnique: 'พืชหายใจ (ใช้ออกซิเจน) ตลอด 24 ชม. | การสังเคราะห์ด้วยแสงเกิดเฉพาะเมื่อมีแสง',
    status: 'script_draft',
    statusLabel: 'สตอรี่บอร์ดเสร็จ 📝',
    statusColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    targetBpm: 112,
    genre: 'Acoustic Nature Pop',
    viewsCount: 'เตรียมคิว',
    retentionRate: 'คาดการณ์ 104%',
    lyriaMusicPrompt: 'Gentle acoustic Thai nature pop, 112 BPM, acoustic guitar and rain drop effects, sweet melodic vocals explaining plant cellular respiration and photosynthesis.',
    seedanceVideoPrompt: 'Cute 3D animated green plant leaf under day and night sky transition, showing glowing O2 entering at night and CO2 exchanging under sunlight, Disney-Pixar nature style.',
    shorts9x16Script: '⚡ [Hook 0-3s]: พืชสังเคราะห์แสงตอนกลางวัน หายใจตอนกลางคืน... คิดแบบนี้ผิดมหันต์!\n💡 [Body 3-20s]: สิ่งมีชีวิตทุกชนิดต้องหายใจตลอด 24 ชั่วโมง! พืชก็หายใจเอา O2 เข้าไปสร้างพลังงานทั้งวันทั้งคืน แต่กลางวันพืชสร้าง O2 จากการสังเคราะห์แสงมากกว่าที่ใช้ จึงปล่อย O2 ส่วนเกินออกมา!\n📌 [Rule 20-25s]: กลดแสงพืชหยุด แต่การหายใจไม่มีวันหยุด!\n🚀 [CTA 25-30s]: ติววิทย์ สสวท. ให้เห็นภาพจริงที่ master-m1.vercel.app'
  },

  // =========================================================================
  // 🇬🇧 3. ENGLISH (ภาษาอังกฤษ - 4 คอนเทนต์ไฮไลต์)
  // =========================================================================
  {
    id: 'pipe-eng-01',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'เพลง If-Clause มัดใจ & กริยา 3 ช่อง',
    moduleKey: 'grammar_tenses',
    trapCardId: 'eng-if-clauses',
    hook3Sec: 'If I was rich หรือ If I were rich? พูดผิดฝรั่งงง ข้อสอบตัดแต้ม!',
    coreTechnique: 'Type 1: If + V.1, will + V.inf | Type 2: If + V.2 (were), would + V.inf',
    status: 'published',
    statusLabel: 'เผยแพร่แล้ว 🎬',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    targetBpm: 125,
    genre: 'Acoustic Pop Dance',
    viewsCount: '15,300 วิว',
    retentionRate: '112%',
    youtubeUrl: 'https://youtu.be/SLumB462LQU',
    lyriaMusicPrompt: 'Upbeat energetic Thai-English bilingual pop acoustic dance, 125 BPM, bright acoustic strumming with modern electronic percussion, joyful vocal harmonies on grammar rules.',
    seedanceVideoPrompt: 'A cute 3D cartoon boy with a backpack stepping through a magical glowing doorway leading to Big Ben London and Oxford University, vibrant Disney-Pixar style.',
    shorts9x16Script: '⚡ [Hook 0-3s]: ถ้าฉันรวย ใช้ If I were หรือ If I was? 90% ของเด็กไทยตอบผิด!\n💡 [Body 3-20s]: ในภาษาอังกฤษ เงื่อนไขสมมุติที่ไม่เป็นจริงในปัจจุบัน (Type 2) ประธานทุกตัวไม่ว่า I, He, She ต้องใช้ "were" เสมอ! ห้ามใช้ was ในข้อสอบเด็ดขาด!\n📌 [Rule 20-25s]: If I were rich, I would travel around the world!\n🚀 [CTA 25-30s]: เช็กจุดลวงไวยากรณ์ภาษาอังกฤษครบทุกข้อที่ master-m1.vercel.app'
  },
  {
    id: 'pipe-eng-02',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Subject-Verb Agreement สกัดส่วนขยายหาประธานแท้',
    moduleKey: 'reading_vocab',
    trapCardId: 'eng-subject-verb-prep',
    hook3Sec: 'The box of chocolates is หรือ are? เห็น chocolates แล้วตอบ are ระวัง 0 คะแนน!',
    coreTechnique: 'ขีดฆ่า [of/with/in + Noun] ทิ้ง ➔ มองหาประธานตัวหน้าสุดเดี่ยวๆ',
    status: 'ready_to_render',
    statusLabel: 'พร้อมเรนเดอร์ 🚀',
    statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    targetBpm: 118,
    genre: 'R&B Groove / Pop',
    viewsCount: 'คิวผลิต',
    retentionRate: 'คาดการณ์ 109%',
    lyriaMusicPrompt: 'Catchy grooving Thai R&B pop, 118 BPM, funky slap bass, bright brass accents, fun lyrical dialogue explaining subject-verb traps.',
    seedanceVideoPrompt: 'Cute 3D animated detective magnifying glass highlighting subject nouns in floating glowing English sentences, crossing out prepositional brackets with cartoon pencil.',
    shorts9x16Script: '⚡ [Hook 0-3s]: The box of chocolates (is/are) sweet? ข้อนี้เด็ก ม.1 กาผิดเกินครึ่ง!\n💡 [Body 3-20s]: เทคนิคลับ 3 วินาที ให้ตัดคำว่า "of chocolates" ทิ้งไปเลย! เพราะมันเป็นแค่ส่วนขยาย ประธานตัวจริงคือ "The box" กล่องเดียวเอกพจน์ จึงต้องใช้ "is" เท่านั้น!\n📌 [Rule 20-25s]: เจอ Preposition ขีดฆ่าทิ้ง หาประธานแท้ตัวหน้าสุด!\n🚀 [CTA 25-30s]: ฝึกคลังคำศัพท์ Oxford 3000 คำและแกรมม่าร์ที่ MASTER ม.1!'
  },
  {
    id: 'pipe-eng-03',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Past Simple vs Present Perfect ดู Time Marker ชนะขาด',
    moduleKey: 'grammar_tenses',
    trapCardId: 'eng-past-vs-perfect',
    hook3Sec: 'I have seen him yesterday... ฝรั่งฟังแล้วสะดุ้ง! ผิดตรงไหนรู้ไหม?',
    coreTechnique: 'มีจุดเวลาอดีต (yesterday, ago, last year) ใช้ V.2 ห้ามใช้ have + V.3 เด็ดขาด!',
    status: 'in_production',
    statusLabel: 'กำลังผลิต 🎵',
    statusColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    targetBpm: 120,
    genre: 'Indie Dance Pop',
    viewsCount: 'กำลังแต่งเพลง',
    retentionRate: 'คาดการณ์ 108%',
    lyriaMusicPrompt: 'Upbeat indie dance pop in Thai-English, 120 BPM, groovy synth bass, vibrant guitar licks, sharp rhythmic contrast between past tense and present perfect.',
    seedanceVideoPrompt: 'A glowing 3D timeline clock ticking backwards with glowing signposts: "Yesterday = V.2" and "Since/For = Has/Have + V.3", retro-futuristic style.',
    shorts9x16Script: '⚡ [Hook 0-3s]: I have seen him yesterday... ประโยคนี้ผิดไวยากรณ์ระดับชาติ!\n💡 [Body 3-20s]: จำกฎเหล็กข้อสอบ O-NET: ถ้าเห็นคำบอกเวลาอดีตชัดเจน เช่น yesterday, last night, 2 days ago ต้องใช้ Past Simple (V.2) เท่านั้น! ห้ามมี have/has เด็ดขาด! พูดว่า "I saw him yesterday" ถึงจะถูกเป๊ะ!\n📌 [Rule 20-25s]: มีเวลาในอดีตชัดเจน กา V.2 ได้คะแนนเต็ม!\n🚀 [CTA 25-30s]: อัปเลเวลภาษาอังกฤษ ม.1 ที่ master-m1.vercel.app'
  },
  {
    id: 'pipe-eng-04',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    badgeColor: 'bg-indigo-600 text-white',
    title: 'Neither... nor ยึดประธานตัวใกล้ (Proximity Rule)',
    moduleKey: 'reading_vocab',
    trapCardId: 'eng-neither-nor-rule',
    hook3Sec: 'Neither the teacher nor the students (was/were) ready? กาอะไรดี?',
    coreTechnique: 'Either... or / Neither... nor ➔ ผันกริยาตามประธานตัวที่อยู่ "ติดกริยาที่สุด"',
    status: 'script_draft',
    statusLabel: 'สตอรี่บอร์ดเสร็จ 📝',
    statusColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    targetBpm: 116,
    genre: 'Acoustic Folk Pop',
    viewsCount: 'เตรียมคิว',
    retentionRate: 'คาดการณ์ 105%',
    lyriaMusicPrompt: 'Catchy acoustic folk pop in Thai, 116 BPM, rhythmic stomps and claps, playful dual-voice conversation about Neither...nor agreement rules.',
    seedanceVideoPrompt: 'Cute 3D classroom scene where an arrow points from students directly to a glowing whiteboard verb box, emphasizing proximity, vibrant Pixar animation.',
    shorts9x16Script: '⚡ [Hook 0-3s]: Neither my brother nor my parents (is/are) coming? ตอบผิดสอบตกนะ!\n💡 [Body 3-20s]: จำเทคนิค 3 วินาที "คนข้างๆ สำคัญสุด!" เมื่อเจอ Neither... nor หรือ Either... or ให้ตัดประธานตัวหน้าทิ้ง แล้วดูกริยาผันตามประธานตัวที่อยู่ใกล้กริยาที่สุด! parents เติม s พหูพจน์ จึงตอบ "are" ทันที!\n📌 [Rule 20-25s]: Proximity Rule ยึดตัวใกล้กริยาที่สุด!\n🚀 [CTA 25-30s]: รวมข้อสอบอังกฤษสอบเข้า ม.1 ห้องเรียนพิเศษ ฟรีที่ MASTER ม.1!'
  },

  // =========================================================================
  // 🇹🇭 4. THAI (ภาษาไทย - 4 คอนเทนต์ไฮไลต์)
  // =========================================================================
  {
    id: 'pipe-thai-01',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    badgeColor: 'bg-amber-700 text-white',
    title: 'เพลงคำสมาส-สนธิ ชนหรือเชื่อมจำง่ายนิดเดียว',
    moduleKey: 'thai_grammar',
    trapCardId: 'thai-samasa-sandhi',
    hook3Sec: 'สมาสหรือสนธิ? มีวิธีดูใน 3 วินาที ไม่ต้องเปิดพจนานุกรม!',
    coreTechnique: 'สมาสคือ "ชน" (อ่านต่อเสียงสระ) | สนธิคือ "เชื่อม" (กลืนเสียงสระ อะ/อา/โอ/อัง)',
    status: 'published',
    statusLabel: 'เผยแพร่แล้ว 🎬',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    targetBpm: 116,
    genre: 'Thai Fusion / Folk Pop',
    viewsCount: '11,100 วิว',
    retentionRate: '106%',
    youtubeUrl: 'https://youtu.be/SLumB462LQU',
    lyriaMusicPrompt: 'Modern Thai fusion folk-pop, 116 BPM, contemporary Ranat xylophone blended with modern synth bass, clear rhythmic Thai singing about Samasa and Sandhi word combination.',
    seedanceVideoPrompt: 'Beautiful 3D animation of ancient Thai golden scroll unrolling in a magical floating temple library, glowing Thai consonants floating together and merging seamlessly.',
    shorts9x16Script: '⚡ [Hook 0-3s]: สมาส กับ สนธิ จำสลับกันจนสอบตก? ฟังท่อนนี้จบ กาถูกตลอดกาล!\n💡 [Body 3-20s]: จำคีย์เวิร์ดสั้นๆ: "สมาสชน สนธิเชื่อม" สมาสเอาคำบาลี-สันสกฤตมาชนกัน เช่น ผล+ไม้ ไม่ใช่บาลีสันสกฤตทั้งคู่ แต่ "กาย+กรรม" = กายกรรม ส่วนสนธิเชื่อมเสียงกลืนสระ เช่น ราช+อธิราช = ราชาธิราช!\n📌 [Rule 20-25s]: สมาสชนอ่านออกเสียง อะ/อิ/อุ ตรงกลาง สนธิเชื่อมเปลี่ยนเสียงสระ!\n🚀 [CTA 25-30s]: ติวข้อสอบภาษาไทย O-NET 2570 ครบสูตรที่ master-m1.vercel.app'
  },
  {
    id: 'pipe-thai-02',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    badgeColor: 'bg-amber-700 text-white',
    title: 'ตัดคำว่า เช่น/ได้แก่ หาใจความสำคัญใน 5 วินาที',
    moduleKey: 'thai_reading',
    trapCardId: 'thai-main-idea-trick',
    hook3Sec: 'อ่านบทความยาวเป็นหน้า แล้วหาใจความสำคัญไม่เจอ? ใช้สูตรลับนี้!',
    coreTechnique: 'ตัดข้อความหลัง "เช่น, ได้แก่, อาทิ, อาทิเช่น" ทิ้งทันที เพราะเป็นเพียงส่วนขยาย',
    status: 'ready_to_render',
    statusLabel: 'พร้อมเรนเดอร์ 🚀',
    statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    targetBpm: 112,
    genre: 'Acoustic Chill / Storytelling',
    viewsCount: 'คิวผลิต',
    retentionRate: 'คาดการณ์ 108%',
    lyriaMusicPrompt: 'Warm acoustic guitar with gentle Thai pop vocal storytelling, 112 BPM, relaxed tempo, crystal clear Thai enunciation for reading comprehension techniques.',
    seedanceVideoPrompt: 'A 3D storybook opening with holographic Thai text paragraphs, glowing golden laser cutting out parenthetical phrases and examples, leaving the shining main sentence highlighted.',
    shorts9x16Script: '⚡ [Hook 0-3s]: ข้อสอบอ่านจับใจความ ให้บทความยาว 10 บรรทัด จะอ่านยังไงให้ทันเวลา?\n💡 [Body 3-20s]: เทคนิคลับ สทศ. กวาดสายตาตัดข้อความหลังคำว่า "เช่น", "ได้แก่", "อาทิเช่น" ทิ้งไปเลย! เพราะนั่นคือ "พลความ" หรือตัวอย่างขยายความ ใจความหลักจะอยู่ต้นหรือท้ายย่อหน้าเสมอ!\n📌 [Rule 20-25s]: ตัดตัวอย่างทิ้ง เหลือเฉพาะประโยคใจความสำคัญ ตอบได้ใน 5 วิ!\n🚀 [CTA 25-30s]: เตรียมสอบเข้า ม.1 ห้องเรียนพิเศษ ครบทุกวิชาที่ MASTER ม.1!'
  },
  {
    id: 'pipe-thai-03',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    badgeColor: 'bg-amber-700 text-white',
    title: 'คำราชาศัพท์และการใช้ "ทรง" ห้ามใช้กับคำแบบไหน?',
    moduleKey: 'thai_vocab',
    trapCardId: 'thai-royal-words-rule',
    hook3Sec: 'ทรงเสวย ทรงโปรด... พูดแบบนี้ผิดหลักภาษาไทยร้ายแรง!',
    coreTechnique: '"ทรง" นำหน้ากริยาสามัญเท่านั้น (ทรงวิ่ง, ทรงม้า) ห้ามนำหน้ากริยาราชาศัพท์ในตัวเด็ดขาด',
    status: 'in_production',
    statusLabel: 'กำลังผลิต 🎵',
    statusColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    targetBpm: 114,
    genre: 'Thai Traditional Contemporary',
    viewsCount: 'กำลังแต่งเพลง',
    retentionRate: 'คาดการณ์ 106%',
    lyriaMusicPrompt: 'Contemporary classical Thai fusion, 114 BPM, gentle Saw-U fiddle and acoustic piano, clear instructional singing on royal Thai vocabulary rules.',
    seedanceVideoPrompt: 'A golden ancient Thai palace classroom with floating glowing Thai calligraphy, highlighting red cross on "ทรงเสวย" and green checkmark on "เสวย", Pixar aesthetic.',
    shorts9x16Script: '⚡ [Hook 0-3s]: ทรงเสวย หรือ เสวย? 80% ของคนไทยใช้คำว่า "ทรง" ผิดทุกวัน!\n💡 [Body 3-20s]: จำกฎเหล็ก สพฐ.: คำว่า "ทรง" นำหน้ากริยาสามัญเพื่อแปลงเป็นราชาศัพท์ เช่น ทรงวิ่ง, ทรงม้า แต่ถ้าคำนั้นเป็นกริยาราชาศัพท์ในตัวอยู่แล้ว เช่น เสวย, โปรด, กริ้ว ห้ามใส่ทรงเด็ดขาด!\n📌 [Rule 20-25s]: กริยาราชาศัพท์แท้ ห้ามมี "ทรง" ซ้ำซ้อน!\n🚀 [CTA 25-30s]: ตะลุยโจทย์ราชาศัพท์ O-NET 2570 ครบชุดที่ MASTER ม.1'
  },
  {
    id: 'pipe-thai-04',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    badgeColor: 'bg-amber-700 text-white',
    title: 'โวหารภาพพจน์ อุปมา vs อุปลักษณ์ vs บุคลาธิษฐาน',
    moduleKey: 'thai_literature',
    trapCardId: 'thai-figures-of-speech',
    hook3Sec: 'ครูคือเรือจ้าง... อุปมา หรือ อุปลักษณ์? กาผิดกันทั้งห้องสอบ!',
    coreTechnique: 'อุปมา = ดุจ/เหมือน/ประดุจ | อุปลักษณ์ = เป็น/คือ | บุคลาธิษฐาน = ธรรมชาติมีกิริยาแบบมนุษย์',
    status: 'script_draft',
    statusLabel: 'สตอรี่บอร์ดเสร็จ 📝',
    statusColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    targetBpm: 110,
    genre: 'Melodic Ballad Pop',
    viewsCount: 'เตรียมคิว',
    retentionRate: 'คาดการณ์ 107%',
    lyriaMusicPrompt: 'Gentle poetic Thai ballad pop, 110 BPM, soft piano and acoustic cello, expressive female Thai singing on poetic figures of speech.',
    seedanceVideoPrompt: 'Cute 3D animated boat rowed under a golden moonlight river, transforming metaphorically into a classroom teacher guiding students, emotional Disney-Pixar style.',
    shorts9x16Script: '⚡ [Hook 0-3s]: ครูคือเรือจ้าง เป็น "อุปมา" หรือ "อุปลักษณ์"? ออกสอบทุกสถาบัน!\n💡 [Body 3-20s]: ทริกลัด 3 วินาที: อุปมาเปรียบเหมือน ต้องมีคำว่า "ดุจ, เหมือน, คล้าย, ราวกับ" ส่วนอุปลักษณ์เปรียบเป็น ต้องมีคำว่า "เป็น, คือ" เปรียบเทียบสิ่งหนึ่งเป็นอีกสิ่งหนึ่งโดยตรง ดังนั้น "ครูคือเรือจ้าง" เป็น อุปลักษณ์ แน่นอน!\n📌 [Rule 20-25s]: อุปมา = เหมือน | อุปลักษณ์ = เป็น/คือ | บุคลาธิษฐาน = ลมหายใจมีชีวิต!\n🚀 [CTA 25-30s]: ติววรรณคดีและโวหารภาพพจน์ ม.1 ฟรีที่ master-m1.vercel.app'
  }
]
