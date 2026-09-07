/**
 * MASTER-GROW Coaching Engine
 * แพลตฟอร์มการเรียนรู้และเตรียมสอบ MASTER ม.1 (สพฐ. 2551 / 2560)
 * 
 * สถาปัตยกรรม 4 เสาหลัก:
 * 1. G - Goal Mastery (GRI 0-100% & Target Profiles)
 * 2. R - Real-time Cloud Telemetry (Score Leakage Detection 56 โมดูล)
 * 3. O - Optimized Micro-Pathway (สูตรลัด 3 วินาที & จุดลวง สทศ.)
 * 4. W - Win & Cognitive Reframing (ปรับจิตวิทยาชัยชนะ & Parent Coaching Telegram)
 * 
 * Co-designed with AiPASS (GPT-5.6 Terra) & Antigravity
 */

export type GoalType = 'gifted_m1' | 'onet_2570' | 'nt_p3' | 'rt_p1' | 'general'

export interface GoalProfile {
  id: string
  title: string
  targetCohort: string
  nearTermGoal: string
  longTermAspiration?: string
  targetGRI: number
  keySubjects: Array<'math' | 'science' | 'thai' | 'english'>
}

export const PRESET_GOALS: Record<string, GoalProfile> = {
  fortune_gifted: {
    id: 'fortune_gifted',
    title: 'ม.1 Gifted วิทย์-คณิต สู่ เภสัชกร 💊',
    targetCohort: 'ป.6 เตรียมสอบเข้า ม.1',
    nearTermGoal: 'สอบติด ม.1 ห้องเรียนพิเศษ Gifted วิทย์-คณิต',
    longTermAspiration: 'ศึกษาต่อระดับอุดมศึกษา สาขาเภสัชศาสตร์ (Doctor of Pharmacy)',
    targetGRI: 85,
    keySubjects: ['math', 'science', 'english', 'thai']
  },
  onet_2570: {
    id: 'onet_2570',
    title: 'พิชิต O-NET 2570 ระดับประเทศ',
    targetCohort: 'ป.6 ประเมินระดับชาติ',
    nearTermGoal: 'คะแนนเฉลี่ยรวม 4 วิชา สูงกว่า 80% ตามผัง สทศ.',
    targetGRI: 80,
    keySubjects: ['math', 'science', 'thai', 'english']
  },
  nt_p3: {
    id: 'nt_p3',
    title: 'ทดสอบความสามารถระดับชาติ (NT ป.3)',
    targetCohort: 'ป.3',
    nearTermGoal: 'สมรรถนะคณิตศาสตร์และภาษาไทยระดับดีเยี่ยม',
    targetGRI: 75,
    keySubjects: ['math', 'thai']
  }
}

export interface GoalReadinessResult {
  griScore: number // 0 - 100
  evidenceConfidence: number // 0 - 1 (0-100%)
  readinessLabel: 'กำลังเก็บข้อมูล' | 'เริ่มจากจุดคุ้มที่สุด' | 'กำลังสร้างฐาน' | 'ใกล้เป้าหมาย' | 'พร้อมท้าทาย'
  components: {
    mastery: number // 30%
    coverage: number // 20%
    retention: number // 15%
    examFit: number // 15%
    pacing: number // 10%
    calibration: number // 5%
    consistency: number // 5%
  }
  summaryText: string
}

export interface ScoreLeakage {
  moduleId: string
  subject: string
  title: string
  leakageType: 'concept_gap' | 'trap_vulnerability' | 'time_pressure' | 'retention_decay'
  severityScore: number // 0 - 100
  trapDescription?: string
  recommendedMove: string
}

export interface TrapCard {
  id: string
  subject: string
  moduleTitle: string
  trapQuestion: string
  redFlag: string
  escapeMove3Sec: string
  exampleCodeOrFormula: string
}

export const SAMPLE_TRAP_CARDS: TrapCard[] = [
  // =========================================================================
  // 🔢 1. MATHEMATICS TRAP CARDS (คณิตศาสตร์ - 6 การ์ดดักคะแนน สทศ./สสวท.)
  // =========================================================================
  {
    id: 'math-fraction-add',
    subject: 'math',
    moduleTitle: 'การบวกลบเศษส่วน',
    trapQuestion: 'เห็น 1/3 + 1/4 แล้วเผลอบวกเป็น (1+1)/(3+4) = 2/7 ใช่ไหม?',
    redFlag: 'ตัวส่วนไม่เท่ากัน ห้ามนำเศษบวกเศษ ส่วนบวกส่วนเด็ดขาด!',
    escapeMove3Sec: 'ทำส่วนให้เท่ากันด้วย ค.ร.น. (12) ➔ 4/12 + 3/12 = 7/12',
    exampleCodeOrFormula: 'a/b + c/d = (ad + bc) / bd'
  },
  {
    id: 'math-units-digit',
    subject: 'math',
    moduleTitle: 'วนรอบหลักหน่วยเลขยกกำลังสูง (Cyclicity)',
    trapQuestion: 'เจอ 7²⁵⁷⁰ หรือ 3²⁰²⁶ แล้วคิดว่าต้องคูณเลขจริงจนตาลาย?',
    redFlag: 'เลขโดดหลักหน่วยของ 2, 3, 7, 8 มีการวนรอบเป็นคาบละ 4 เสมอ!',
    escapeMove3Sec: 'นำเลขชี้กำลังหาร 4 ดูเศษ: 2570 ÷ 4 เหลือเศษ 2 ➔ 7² = 49 ตอบลงท้าย 9 ใน 3 วิ!',
    exampleCodeOrFormula: 'Exponent mod 4 ➔ Cycle Pattern: 7¹=7, 7²=9, 7³=3, 7⁴=1'
  },
  {
    id: 'math-percent-change',
    subject: 'math',
    moduleTitle: 'การเพิ่ม-ลดร้อยละไม่สมมาตร',
    trapQuestion: 'สินค้าลดราคา 20% แล้ววันต่อมาขึ้นราคา 20% คิดว่าราคากลับมาเท่าเดิม?',
    redFlag: 'ฐานในการคิดร้อยละเปลี่ยนไป! เมื่อลด 20% ฐานใหม่กลายเป็น 80%',
    escapeMove3Sec: 'คิดตัวคูณสุทธิ: 0.80 × 1.20 = 0.96 ➔ ราคาลดลงจากเดิม 4% เสมอ!',
    exampleCodeOrFormula: 'Net Multiplier = (1 - r1) × (1 + r2) = 0.80 × 1.20 = 0.96'
  },
  {
    id: 'math-circle-geometry',
    subject: 'math',
    moduleTitle: 'พื้นที่ vs ความยาวรอบรูปวงกลม',
    trapQuestion: 'สับสนระหว่าง 2πr กับ πr² และลืมว่าโจทย์ให้เส้นผ่านศูนย์กลาง (d) มา?',
    redFlag: 'โจทย์ให้ "เส้นผ่านศูนย์กลาง" ต้องนำมาหาร 2 เพื่อหารัศมี (r) ก่อนเสมอ!',
    escapeMove3Sec: 'จำหน่วย: ความยาวรอบรูป = ซม. (2πr) | พื้นที่ = ตร.ซม. ยกกำลังสอง (πr²)',
    exampleCodeOrFormula: 'Area = πr² | Perimeter = 2πr | r = d / 2'
  },
  {
    id: 'math-average-speed',
    subject: 'math',
    moduleTitle: 'ความเร็วเฉลี่ยไป-กลับ (Harmonic Mean)',
    trapQuestion: 'ขับรถไป 60 กม./ชม. ขากลับ 40 กม./ชม. แล้วเผลอตอบความเร็วเฉลี่ย 50 กม./ชม.?',
    redFlag: 'ความเร็วเฉลี่ยไม่ใช่ค่าเฉลี่ยเลขคณิต เพราะเวลาที่ใช้ในแต่ละขาไม่เท่ากัน!',
    escapeMove3Sec: 'ใช้สูตรลัดฮาร์มอนิก: 2v₁v₂ / (v₁ + v₂) = (2×60×40) / 100 = 48 กม./ชม. ทันที!',
    exampleCodeOrFormula: 'v_avg = 2 × v1 × v2 / (v1 + v2)'
  },
  {
    id: 'math-pythagoras-triples',
    subject: 'math',
    moduleTitle: 'ทฤษฎีบทพิทาโกรัส & สามเหลี่ยมมุมฉาก',
    trapQuestion: 'มัวแต่ตั้งคูณคำนวณ c² = a² + b² เสียเวลา 2 นาทีในห้องสอบ?',
    redFlag: 'ด้านตรงข้ามมุมฉากคือด้านที่ยาวที่สุดเสมอ',
    escapeMove3Sec: 'ท่องจำชุดตัวเลขพิทาโกรัสยอดนิยม: (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17) กาช้อยส์ได้ใน 3 วิ!',
    exampleCodeOrFormula: 'Pythagorean Triples: (3k, 4k, 5k), (5k, 12k, 13k)'
  },

  // =========================================================================
  // 🔬 2. SCIENCE TRAP CARDS (วิทยาศาสตร์ - 6 การ์ดดักคะแนน สทศ./สสวท.)
  // =========================================================================
  {
    id: 'science-series-parallel',
    subject: 'science',
    moduleTitle: 'วงจรไฟฟ้าอนุกรม vs ขนาน',
    trapQuestion: 'ถอดหลอดไฟ 1 หลอดในวงจรขนาน แล้วคิดว่าหลอดอื่นจะดับตาม?',
    redFlag: 'วงจรขนานกระแสไฟฟ้าแยกไหลคนละสาย มีทางเดินอิสระ!',
    escapeMove3Sec: 'ท่องจำ: อนุกรมสายเดียวขาดดับหมด | ขนานแยกสายขาดหลอดยังติด',
    exampleCodeOrFormula: 'Parallel: Independent branches | Series: Single loop'
  },
  {
    id: 'science-solution-dilution',
    subject: 'science',
    moduleTitle: 'การเจือจางสารละลาย (Dilution Law)',
    trapQuestion: 'คิดว่าเมื่อเติมน้ำลงไปในสารละลาย ปริมาณเนื้อสารจะลดลงไปด้วย?',
    redFlag: 'การเติมน้ำทำให้ความเข้มข้นลดลง แต่ "มวลเนื้อสารบริสุทธิ์เท่าเดิม"!',
    escapeMove3Sec: 'ใช้สูตรลัดเภสัช: C₁V₁ = C₂V₂ แทนค่าตัวเลขแล้วตัดศูนย์ได้คำตอบใน 5 วินาที',
    exampleCodeOrFormula: 'C1 × V1 = C2 × V2 (Concentration × Volume = Constant)'
  },
  {
    id: 'science-plant-respiration',
    subject: 'science',
    moduleTitle: 'การหายใจของพืช (Plant Respiration)',
    trapQuestion: 'คิดว่าพืชหายใจเอา CO₂ เข้าไป และหายใจเฉพาะเวลากลางคืนเท่านั้น?',
    redFlag: 'การสังเคราะห์ด้วยแสงเกิดเฉพาะตอนมีแสง แต่ "การหายใจของพืชเกิดตลอด 24 ชม."!',
    escapeMove3Sec: 'ท่องจำ: พืชเป็นสิ่งมีชีวิต หายใจเอา O₂ คาย CO₂ ตลอดเวลาเหมือนมนุษย์!',
    exampleCodeOrFormula: 'Respiration: Glucose + O2 ➔ CO2 + H2O + Energy (All 24 hrs)'
  },
  {
    id: 'science-pulmonary-vessels',
    subject: 'science',
    moduleTitle: 'ระบบหมุนเวียนโลหิต (Pulmonary Circulation)',
    trapQuestion: 'คิดว่าเส้นเลือดดำ (Vein) ทุกเส้นในร่างกายต้องมีเลือดดำ (ออกซิเจนต่ำ)?',
    redFlag: 'เส้นเลือดออกจากหัวใจ = Artery, เส้นเลือดเข้าหัวใจ = Vein',
    escapeMove3Sec: 'ข้อยกเว้นสำคัญของ สทศ.: Pulmonary Vein นำเลือดแดง (ออกซิเจนสูง) จากปอดเข้าหัวใจห้องบนซ้าย!',
    exampleCodeOrFormula: 'Lungs ➔ Pulmonary Vein (High O2) ➔ Left Atrium'
  },
  {
    id: 'science-newtons-first-law',
    subject: 'science',
    moduleTitle: 'กฎการเคลื่อนที่ข้อ 1 ของนิวตัน (Inertia)',
    trapQuestion: 'เห็นวัตถุเคลื่อนที่ด้วยความเร็วคงที่ แล้วคิดว่าต้องมีแรงลัพธ์กระทำในทิศทางนั้น?',
    redFlag: 'ความเร็วคงที่ แปลว่า ความเร่ง a = 0 แรงลัพธ์ ΣF = 0!',
    escapeMove3Sec: 'จำกฎข้อ 1: ความเร็วคงที่ = แรงลัพธ์เป็นศูนย์ (ไม่มีแรงลัพธ์มากระทำ วัตถุจะรักษาสภาพเดิม)',
    exampleCodeOrFormula: 'ΣF = 0 ⟺ v = constant (Zero Net Force)'
  },
  {
    id: 'science-acids-bases-metals',
    subject: 'science',
    moduleTitle: 'ปฏิกิริยากรด-เบสกับโลหะ',
    trapQuestion: 'สับสนระหว่างก๊าซที่ได้จากกรดทดสอบหินปูน กับกรดทำปฏิกิริยากับโลหะ?',
    redFlag: 'กรด + หินปูนได้ก๊าซ CO₂ | แต่ กรด + โลหะ (สังกะสี/แมกนีเซียม) ได้ก๊าซ H₂!',
    escapeMove3Sec: 'ท่องจำ: "กรด+โลหะได้ไฮโดรเจน (H₂) เสียงป๊อป | กรด+หินปูนได้คาร์บอนไดออกไซด์ (CO₂) น้ำปูนขุ่น"',
    exampleCodeOrFormula: 'Acid + Metal ➔ Salt + H2 ↑ | Acid + Carbonate ➔ Salt + H2O + CO2 ↑'
  },

  // =========================================================================
  // 🗣️ 3. ENGLISH TRAP CARDS (ภาษาอังกฤษ - 6 การ์ดดักคะแนน O-NET/Gifted)
  // =========================================================================
  {
    id: 'english-part-of-speech',
    subject: 'english',
    moduleTitle: 'Subject-Verb Agreement with Prep Phrase',
    trapQuestion: 'เห็นประโยค The quality of these apples (is/are) good แล้วเลือก are เพราะตามหลัง apples?',
    redFlag: 'คำนามหน้า of คือประธานแท้ (The quality เป็นเอกพจน์)!',
    escapeMove3Sec: 'มองข้าม [of preposition phrase] ➔ The quality [of apples] IS good',
    exampleCodeOrFormula: 'Singular Subject + [of phrase] + Singular Verb (is)'
  },
  {
    id: 'english-neither-nor-either-or',
    subject: 'english',
    moduleTitle: 'Neither... nor / Either... or Agreement',
    trapQuestion: 'เห็นประโยค Neither John nor his friends (is/are) ready แล้วคิดว่ามีหลายคนต้องตอบ are?',
    redFlag: 'Neither...nor กริยาต้องผันตาม "ประธานตัวหลังสุดที่อยู่ติดกับกริยา" (Proximity Rule)!',
    escapeMove3Sec: 'ดูตัวหลังสุด: Neither the teacher nor the students ARE | Neither the students nor the teacher IS',
    exampleCodeOrFormula: 'Neither A nor B + Verb (matches B)'
  },
  {
    id: 'english-past-vs-present-perfect',
    subject: 'english',
    moduleTitle: 'Past Simple vs Present Perfect',
    trapQuestion: 'ใช้ have/has + V.3 กับประโยคที่มีคำบอกเวลาในอดีตชัดเจน เช่น yesterday หรือ in 2021?',
    redFlag: 'เมื่อมี Time Markers อดีตเฉพาะเจาะจง (yesterday, ago, last night, in 2020)',
    escapeMove3Sec: 'กฎเหล็ก: ระบุเวลาอดีตชัดเจน บังคับใช้ Past Simple (V.2) เท่านั้น ห้ามใช้ Present Perfect เด็ดขาด!',
    exampleCodeOrFormula: 'Specific Past Time ➔ Past Simple (V.2) only'
  },
  {
    id: 'english-if-clause-types',
    subject: 'english',
    moduleTitle: 'If-Clause Type 1 vs Type 2',
    trapQuestion: 'สับสนระหว่างประโยคสมมติที่เป็นจริงได้ กับการสมมติตรงข้ามความจริงในปัจจุบัน?',
    redFlag: 'สังเกตรูปกริยาในประโยคเงื่อนไข If',
    escapeMove3Sec: 'ท่องจำ: Type 1: If + V.1, will + V.inf (จริงได้) | Type 2: If + V.2/were, would + V.inf (สมมติ)',
    exampleCodeOrFormula: 'Type 1: If + V.1, will + V.inf | Type 2: If + were/V.2, would + V.inf'
  },
  {
    id: 'english-passive-modals',
    subject: 'english',
    moduleTitle: 'Passive Voice with Modal Verbs',
    trapQuestion: 'แปลไม่ออกว่าประธานเป็นผู้กระทำหรือถูกกระทำในประโยค Passive?',
    redFlag: 'เมื่อประธานเป็นสิ่งของ (The homework, The letter, The car) สิ่งของทำตัวเองไม่ได้!',
    escapeMove3Sec: 'ท่องสูตรโครงสร้าง: Modal (can/must/should) + be + V.3 เช่น The task must be completed today',
    exampleCodeOrFormula: 'Modal + be + V.3 (Passive form)'
  },
  {
    id: 'english-word-formation-suffixes',
    subject: 'english',
    moduleTitle: 'Word Formation & Suffix Clues',
    trapQuestion: 'ไม่รู้ความหมายคำศัพท์ ทำให้ตอบชนิดของคำ (Part of Speech) ไม่ถูก?',
    redFlag: 'ไม่จำเป็นต้องรู้ความหมาย แค่ดูหางคำ (Suffix) ก็รู้ชนิดของคำทันที!',
    escapeMove3Sec: 'สแกนหางคำ: -tion, -ment, -ness = Noun | -ful, -able, -ous = Adj | -ly = Adverb',
    exampleCodeOrFormula: 'Suffix ➔ Part of Speech in 3 seconds'
  },

  // =========================================================================
  // 🇹🇭 4. THAI TRAP CARDS (ภาษาไทย - 6 การ์ดดักคะแนน สพฐ./สทศ.)
  // =========================================================================
  {
    id: 'thai-topic-sentence',
    subject: 'thai',
    moduleTitle: 'การอ่านจับใจความสำคัญ',
    trapQuestion: 'เลือกประโยคที่มีคำว่า "เช่น" หรือ "ได้แก่" เป็นใจความสำคัญ?',
    redFlag: 'คำว่า เช่น, ได้แก่, อาทิ คือ "พลความ" (ส่วนขยายประกอบตัวอย่าง)',
    escapeMove3Sec: 'ตัดส่วนยกตัวอย่างทิ้ง ➔ ใจความหลักมักอยู่ต้นหรือท้ายย่อหน้า',
    exampleCodeOrFormula: 'ใจความหลัก = ประโยคสรุปที่ไม่มีคำขยายตัวอย่าง'
  },
  {
    id: 'thai-samasa-sandhi',
    subject: 'thai',
    moduleTitle: 'คำสมาส vs คำสนธิ (บาลี-สันสกฤต)',
    trapQuestion: 'แยกไม่ออกว่าคำไหนเป็นสมาส หรือสนธิ?',
    redFlag: 'คำสองคำนำมาชนกัน หรือมีเสียงสระกลืนเชื่อมกัน?',
    escapeMove3Sec: 'ท่องจำ 3 วิ: "สมาสชน สนธิเชื่อม" ➔ ชนกันเฉยๆ = สมาส (พระโอวาท, วาตภัย) | เสียงสระกลืนเชื่อม = สนธิ (มหัศจรรย์, ชลาลัย)',
    exampleCodeOrFormula: 'สมาสชน (พระ+โอวาท=พระโอวาท) vs สนธิเชื่อม (มหา+อัศจรรย์=มหัศจรรย์)'
  },
  {
    id: 'thai-pali-sanskrit',
    subject: 'thai',
    moduleTitle: 'คำยืมภาษาบาลี vs สันสกฤต',
    trapQuestion: 'สับสนตัวสะกดพยัญชนะวรรคของบาลีและสันสกฤต?',
    redFlag: 'ตรวจสอบพยัญชนะพิเศษ 3 วินาที',
    escapeMove3Sec: 'ท่องจำตัดช้อยส์: เจอ ศ, ษ, ฤ, ฤๅ, ฦ, ฦๅ, รร (หัน), ไอ, เอา = สันสกฤตทันที! ถ้าพยัญชนะวรรคตรงแถวและ ฬ = บาลี',
    exampleCodeOrFormula: 'ศ ษ ฤ รร ควบกล้ำ = สันสกฤต | ฬ และพยัญชนะวรรค = บาลี'
  },
  {
    id: 'thai-sentence-structures',
    subject: 'thai',
    moduleTitle: 'ประโยคความเดียว ความรวม ความซ้อน',
    trapQuestion: 'เห็นประโยคยาวแล้วคิดว่าเป็นประโยคความซ้อนเสมอ?',
    redFlag: 'ดู "คำสันธานเชื่อม" อย่าดูแค่ความยาวประโยค!',
    escapeMove3Sec: 'ท่องจำ: สันธาน "และ, แต่, หรือ, เพราะ...จึง" = ความรวม | สันธาน "ที่, ซึ่ง, อัน, ผู้, ว่า, เพื่อ, ให้" = ความซ้อนแน่นอน!',
    exampleCodeOrFormula: 'ความรวม (และ/แต่/หรือ) vs ความซ้อน (ที่/ซึ่ง/อัน/ว่า/ให้)'
  },
  {
    id: 'thai-royal-words-rules',
    subject: 'thai',
    moduleTitle: 'กฎการใช้คำราชาศัพท์ "ทรง"',
    trapQuestion: 'นำคำว่า "ทรง" ไปวางหน้าคำกริยาราชาศัพท์ เช่น ใช้ "ทรงเสวย", "ทรงโปรด", "ทรงตรัส"?',
    redFlag: 'ข้อสอบ สทศ. หลอกเรื่องนี้อันดับ 1 ทุกปี!',
    escapeMove3Sec: 'กฎเหล็ก: "ทรง" นำหน้ากริยาสามัญเท่านั้น (ทรงม้า, ทรงยินดี) | ห้ามใช้ "ทรง" นำหน้ากริยาราชาศัพท์เด็ดขาด (ใช้ เสวย, โปรด, ตรัส ทันที!)',
    exampleCodeOrFormula: 'ทรง + กริยาสามัญ = ถูก | ทรง + กริยาราชาศัพท์ = ผิดทันที!'
  },
  {
    id: 'thai-figurative-language',
    subject: 'thai',
    moduleTitle: 'โวหารภาพพจน์วรรณศิลป์',
    trapQuestion: 'สับสนระหว่าง "อุปมา" (Simile) กับ "อุปลักษณ์" (Metaphor)?',
    redFlag: 'ดูคำเชื่อมเปรียบเทียบในบทประพันธ์',
    escapeMove3Sec: 'ท่องจำ: "อุปมา = เหมือน คล้าย ดุจ ประดุจ ปาน" | "อุปลักษณ์ = เป็น คือ (ครูคือเรือจ้าง)" | "บุคลาธิษฐาน = กริยาคนใส่สิ่งไม่มีชีวิต (คลื่นกระซิบ สายลมปลอบโยน)"',
    exampleCodeOrFormula: 'อุปมา (เหมือน) vs อุปลักษณ์ (เป็น/คือ) vs บุคลาธิษฐาน (คนกระทำ)'
  }
]

/**
 * 1. G — Calculate Goal Readiness Index (GRI)
 */
export function calculateGoalReadiness(
  progressList: Array<{ subject: string; module_id?: string; score?: number; completed: boolean }>,
  targetGoal: GoalProfile = PRESET_GOALS.fortune_gifted
): GoalReadinessResult {
  const totalModulesTarget = 56
  const completedModules = progressList.filter(p => p.completed)
  
  // 1. Mastery (30%) - Average score of completed modules
  const scores = completedModules.map(p => p.score || 0)
  const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length) / 100 : 0
  const mastery = Math.min(1, Math.max(0, avgScore))

  // 2. Coverage (20%) - Proportion of target modules completed with valid evidence
  const coverage = Math.min(1, completedModules.length / totalModulesTarget)

  // 3. Retention (15%) - Consistency of high scores
  const highScored = completedModules.filter(p => (p.score || 0) >= 80).length
  const retention = completedModules.length > 0 ? highScored / completedModules.length : 0

  // 4. ExamFit (15%) - Weight in critical subjects (Math & Science for Gifted)
  const mathSciCompleted = completedModules.filter(p => p.subject === 'math' || p.subject === 'science').length
  const examFit = Math.min(1, mathSciCompleted / 28)

  // 5. Pacing (10%)
  const pacing = Math.min(1, (completedModules.length * 1.2) / totalModulesTarget)

  // 6. Calibration (5%) & 7. Consistency (5%)
  const calibration = 0.85
  const consistency = completedModules.length >= 10 ? 0.95 : 0.60

  // GRI Composite Formula
  const griRaw = 100 * (
    0.30 * mastery +
    0.20 * coverage +
    0.15 * retention +
    0.15 * examFit +
    0.10 * pacing +
    0.05 * calibration +
    0.05 * consistency
  )
  const griScore = Math.round(Math.min(100, Math.max(0, griRaw)))

  // Evidence confidence (how much data we have)
  const evidenceConfidence = Math.min(1, completedModules.length / 20)

  let readinessLabel: GoalReadinessResult['readinessLabel'] = 'กำลังเก็บข้อมูล'
  if (evidenceConfidence < 0.25) {
    readinessLabel = 'กำลังเก็บข้อมูล'
  } else if (griScore >= 80) {
    readinessLabel = 'พร้อมท้าทาย'
  } else if (griScore >= 60) {
    readinessLabel = 'ใกล้เป้าหมาย'
  } else if (griScore >= 40) {
    readinessLabel = 'กำลังสร้างฐาน'
  } else {
    readinessLabel = 'เริ่มจากจุดคุ้มที่สุด'
  }

  const summaryText = `Goal Readiness Index (GRI): ${griScore}/100 [${readinessLabel}] (ความน่าเชื่อถือของข้อมูล ${Math.round(evidenceConfidence * 100)}%)`

  return {
    griScore,
    evidenceConfidence,
    readinessLabel,
    components: {
      mastery: Math.round(mastery * 100),
      coverage: Math.round(coverage * 100),
      retention: Math.round(retention * 100),
      examFit: Math.round(examFit * 100),
      pacing: Math.round(pacing * 100),
      calibration: Math.round(calibration * 100),
      consistency: Math.round(consistency * 100)
    },
    summaryText
  }
}

/**
 * 2. R — Detect Score Leakage from authentic attempts
 */
export function detectScoreLeakage(
  progressList: Array<{ subject: string; module_id?: string; score?: number; completed: boolean }>
): ScoreLeakage[] {
  const leakages: ScoreLeakage[] = []

  for (const p of progressList) {
    const score = p.score || 0
    if (score < 80) {
      let leakageType: ScoreLeakage['leakageType'] = 'trap_vulnerability'
      if (score < 50) leakageType = 'concept_gap'
      else if (score < 70) leakageType = 'time_pressure'

      const matchedTrap = SAMPLE_TRAP_CARDS.find(t => 
        (p.module_id && t.id.toLowerCase().includes(p.module_id.toLowerCase())) || 
        (p.module_id && t.moduleTitle.toLowerCase().includes(p.module_id.toLowerCase())) ||
        t.subject === p.subject
      )

      leakages.push({
        moduleId: p.module_id || p.subject,
        subject: p.subject,
        title: matchedTrap ? matchedTrap.moduleTitle : (p.module_id || p.subject),
        leakageType,
        severityScore: Math.round(100 - score),
        trapDescription: matchedTrap?.trapQuestion,
        recommendedMove: matchedTrap ? matchedTrap.escapeMove3Sec : 'ทบทวนสรุปสาระสำคัญและคลิกทำแบบฝึกหัดสปีดรัน 3 วินาที'
      })
    }
  }

  // Sort by severity descending
  return leakages.sort((a, b) => b.severityScore - a.severityScore).slice(0, 3)
}

/**
 * 4. W — Generate Cognitive Reframing Message for Student (Growth Mindset)
 */
export function getCognitiveReframingMessage(
  studentName: string,
  subject: string,
  moduleTitle: string,
  score: number
): { studentNotice: string; parentCoachingTip: string } {
  const isFortune = studentName.includes('ภูมิรพีร์') || studentName.includes('ฟอร์จูน')
  const nameDisplay = isFortune ? 'น้องฟอร์จูน' : studentName

  let studentNotice = ''
  let parentCoachingTip = ''

  if (subject.includes('math')) {
    studentNotice = `🌟 ${nameDisplay} ครับ ข้อนี้ไม่ใช่เพราะเราทำเลขไม่ได้นะ แต่โจทย์ข้อนี้แอบซ่อน "จุดลวง สทศ." เรื่อง ${moduleTitle} ไว้! จำกฎ 3 วินาทีนี้ไว้ให้แม่น ในห้องสอบจริงเราจะแซงหน้าคู่แข่งทันที +5 คะแนน!`
    parentCoachingTip = `💡 คำแนะนำสำหรับคุณพ่อ: น้องกำลังฝึกฝนเรื่อง ${moduleTitle} จุดนี้แก้ได้ง่ายมากเพียงชวนน้องทบทวน "สูตรลัด 3 วิ" สัก 2 นาที ไม่ต้องกดดันคะแนนครับ น้องทำได้ดีมากแล้ว`
  } else if (subject.includes('science')) {
    studentNotice = `🔬 ยอดเยี่ยมมาก ${nameDisplay}! การทดลองนี้ทำให้เราจับจุดสำคัญของ ${moduleTitle} ได้แล้ว สลับแนวคิดเพียงนิดเดียวก็จะได้คะแนนเต็ม 100% แล้วครับ!`
    parentCoachingTip = `💡 คำแนะนำสำหรับคุณพ่อ: น้องมีทักษะการสังเกตวิทยาศาสตร์ที่ดี เรื่อง ${moduleTitle} ชวนน้องดูคลิปสรุปสั้น 3 นาทีในระบบด้วยกันจะช่วยให้น้องจำติดตาขึ้นทันทีครับ`
  } else if (subject.includes('english')) {
    studentNotice = `🗣️ Good job ${nameDisplay}! ข้อนี้คำบอกใบ้อยู่หน้า-หลังช่องว่าง 2 คำ ครั้งต่อไปใช้เทคนิคตัดช้อยส์ 3 วินาที จะตอบได้แม่นยำแน่นอน!`
    parentCoachingTip = `💡 คำแนะนำสำหรับคุณพ่อ: น้องกำลังสั่งสมคลังคำศัพท์ภาษาอังกฤษ ชมน้องที่ตั้งใจทำสม่ำเสมอ และให้กำลังใจน้องลุยต่อครับ`
  } else {
    studentNotice = `🇹🇭 เก่งมาก ${nameDisplay}! ข้อนี้โจทย์ทดสอบการแยก "ใจความสำคัญ" ออกจากตัวอย่าง แค่ตัดคำว่า เช่น/ได้แก่ ออก ก็จะเห็นคำตอบที่แท้จริงทันที!`
    parentCoachingTip = `💡 คำแนะนำสำหรับคุณพ่อ: น้องอ่านจับใจความได้เร็ว เพียงสังเกตคำเชื่อมอีกนิดเดียวจะเก็บคะแนนเต็มได้แน่นอนครับ`
  }

  return { studentNotice, parentCoachingTip }
}
