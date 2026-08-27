/**
 * MASTER ม.1 — 52-Article Long-Term Educational Content Roadmap
 * ครอบคลุม 4 วิชาหลัก สพฐ. 32 โมดูล + สนามสอบระดับชาติ + เทคนิคสูตรลัด 1 ปีเต็ม
 */

export interface ArticleTopic {
  id: string
  title: string
  subject: string
  category: 'core' | 'exam' | 'speed_hack'
  keywords: string[]
  examUrl: string
  summaryConcept: string
}

export const ARTICLES_ROADMAP: ArticleTopic[] = [
  // === กลุ่มที่ 1: สนามสอบระดับชาติ & ผังข้อสอบ (National Exam Blueprints) ===
  {
    id: 'onet_2570_blueprint',
    title: 'เจาะลึกผังข้อสอบ O-NET ป.6 ปี 2570 ครบ 4 วิชา พร้อมสูตรลัดและแนวข้อสอบ',
    subject: 'ทุกวิชา สพฐ.',
    category: 'exam',
    keywords: ['O-NET 2570', 'ผังข้อสอบ สทศ', 'สอบเข้า ม.1', 'แนวข้อสอบ ป.6'],
    examUrl: 'https://master-m1.vercel.app/onet-exam',
    summaryConcept: 'วิเคราะห์โครงสร้างข้อสอบ O-NET 2570 จำนวนข้อ คะแนน เกณฑ์อัตนัย 15 คะแนน และจุดลวงที่เด็กต้องระวัง'
  },
  {
    id: 'nt_p3_exam_blueprint',
    title: 'สรุปแนวข้อสอบ NT ป.3 (คณิตศาสตร์ & ภาษาไทย) ปูพื้นฐานสู่ความเป็นเลิศ',
    subject: 'คณิตศาสตร์ & ภาษาไทย',
    category: 'exam',
    keywords: ['NT ป.3', 'ข้อสอบ NT', 'ประเมินคุณภาพผู้เรียน', 'สพฐ.'],
    examUrl: 'https://master-m1.vercel.app/school',
    summaryConcept: 'เจาะลึกการประเมิน NT ป.3 ด้านการคำนวณและภาษาไทย พร้อมเทคนิคทำคะแนนระดับดีเยี่ยม'
  },
  {
    id: 'rt_p1_reading_exam',
    title: 'คู่มือเตรียมสอบ RT ป.1 (การอ่านออกเสียง & อ่านรู้เรื่อง) ฉบับคุณครูและผู้ปกครอง',
    subject: 'ภาษาไทย',
    category: 'exam',
    keywords: ['RT ป.1', 'ประเมินการอ่าน ป.1', 'อ่านออกเขียนได้', 'สพฐ.'],
    examUrl: 'https://master-m1.vercel.app/school',
    summaryConcept: 'เกณฑ์การประเมิน RT ป.1 การแจกลูกสะกดคำ และแบบฝึกประเมินความสามารถการอ่าน สพฐ.'
  },
  {
    id: 'm1_gifted_entrance_math_sci',
    title: 'เจาะลึกข้อสอบคัดเลือกเข้า ม.1 ห้องเรียนพิเศษ (Gifted / สสวท.) คณิต-วิทย์',
    subject: 'คณิตศาสตร์ & วิทยาศาสตร์',
    category: 'exam',
    keywords: ['สอบเข้า ม.1 Gifted', 'ห้องเรียนพิเศษ', 'ข้อสอบ สสวท', 'โรงเรียนดัง'],
    examUrl: 'https://master-m1.vercel.app/mock-exam',
    summaryConcept: 'แนวข้อสอบแข่งขันระดับสูง พีชคณิตซับซ้อน กลศาสตร์ และการทดลองวิเคราะห์'
  },

  // === กลุ่มที่ 2: คณิตศาสตร์ สพฐ. & สูตรลัด 3 วินาที (Math Speed Hacks) ===
  {
    id: 'math_speed_root_power5',
    title: 'สูตรลัดคณิตศาสตร์ ป.6: ถอดรูท (√) ใน 3 วิ & ยกกำลังสองเลขลงท้าย 5',
    subject: 'คณิตศาสตร์',
    category: 'speed_hack',
    keywords: ['ถอดรูท', 'คิดเลขเร็ว', 'สูตรลัดคณิต', 'O-NET คณิต'],
    examUrl: 'https://master-m1.vercel.app/subjects/math',
    summaryConcept: 'เทคนิคตัด 2 ตัวท้ายหาหลักสิบ-หน่วย และสูตรลัดคูณตัวถัดไปต่อท้าย 25'
  },
  {
    id: 'math_fractions_cross_mult',
    title: 'เทคนิคคูณไขว้เปรียบเทียบเศษส่วนใน 2 วินาที & โจทย์เศษส่วนซ้อน ป.6',
    subject: 'คณิตศาสตร์',
    category: 'core',
    keywords: ['เศษส่วน ป.6', 'คูณไขว้', 'เศษส่วนซ้อน', 'บวกลบคูณหารเศษส่วน'],
    examUrl: 'https://master-m1.vercel.app/subjects/math',
    summaryConcept: 'ไม่ต้องหา ค.ร.น. ให้เสียเวลา ใช้คูณไขว้รู้คำตอบทันที พร้อมวิธีคิดโจทย์ตัดเชือก'
  },
  {
    id: 'math_percentages_profit_formula',
    title: 'สรุปร้อยละ กำไร-ขาดทุน & สูตรลัดตัวคูณรวดเดียว 1 บรรทัดจบ',
    subject: 'คณิตศาสตร์',
    category: 'core',
    keywords: ['ร้อยละ', 'กำไรขาดทุน', 'ดอกเบี้ย', 'คณิตศาสตร์ ป.6'],
    examUrl: 'https://master-m1.vercel.app/subjects/math',
    summaryConcept: 'สูตรคิดราคาสุทธิรวดเดียว เช่น ลด 20% คูณ 0.80 ทันที และการหาย้อนกลับหาต้นทุน'
  },
  {
    id: 'math_geometry_leaf_area_formula',
    title: 'สูตรลัดเรขาคณิต: พื้นที่ใบไม้แรเงา (4/7)a² & มุมแย้งเส้นขนานรูปตัว Z',
    subject: 'คณิตศาสตร์',
    category: 'speed_hack',
    keywords: ['พื้นที่แรเงา', 'สูตรลัดพื้นที่ใบไม้', 'เส้นขนาน', 'เรขาคณิต ป.6'],
    examUrl: 'https://master-m1.vercel.app/cheat-sheets',
    summaryConcept: 'สูตรลัด (4/7)a² สำหรับพื้นที่ใบไม้ และเทคนิคสังเกตมุมตัว Z, U, C ของเส้นขนาน'
  },
  {
    id: 'math_working_together_algebra',
    title: 'สูตรลัดคนทำงานพร้อมกัน (AxB)/(A+B) & เทคนิคสมมติขาเป็ด-ขาหมู',
    subject: 'คณิตศาสตร์',
    category: 'speed_hack',
    keywords: ['โจทย์ทำงานพร้อมกัน', 'ขาเป็ดขาหมู', 'สมการเชิงเส้น', 'คณิตประยุกต์'],
    examUrl: 'https://master-m1.vercel.app/subjects/math',
    summaryConcept: 'สูตรผลคูณหารด้วยผลบวกสำหรับอัตราการทำงาน และการตั้งตารางสัตว์-ขา'
  },

  // === กลุ่มที่ 3: วิทยาศาสตร์ สพฐ. & จุดลวง (Science Traps & Mastery) ===
  {
    id: 'sci_digestion_enzyme_traps',
    title: 'จุดลวงวิทยาศาสตร์: ระบบย่อยอาหาร ร่างกายมนุษย์ & สารอาหาร สพฐ.',
    subject: 'วิทยาศาสตร์',
    category: 'core',
    keywords: ['ระบบย่อยอาหาร', 'เอนไซม์', 'จุดลวงวิทย์', 'วิทยาศาสตร์ ป.6'],
    examUrl: 'https://master-m1.vercel.app/subjects/science',
    summaryConcept: 'กระเพาะย่อยเฉพาะโปรตีน และน้ำดีสร้างจากตับเพื่อช่วยให้ไขมันแตกตัว ไม่ใช่เอนไซม์'
  },
  {
    id: 'sci_circuits_series_parallel',
    title: 'สรุปวงจรไฟฟ้า ป.6: อนุกรม vs ขนาน ท่องสูตรเดียวจำได้ตลอดชีพ',
    subject: 'วิทยาศาสตร์',
    category: 'core',
    keywords: ['วงจรไฟฟ้า', 'อนุกรม ขนาน', 'กระแสไฟฟ้า', 'O-NET วิทย์'],
    examUrl: 'https://master-m1.vercel.app/subjects/science',
    summaryConcept: 'อนุกรมกระแสเท่า ดับดับหมด | ขนานแรงดันเท่า ดับหนึ่งอันอื่นยังติด'
  },
  {
    id: 'sci_rocks_fossils_classification',
    title: 'การจำแนกหิน 3 ประเภท & ทำไมฟอสซิลถึงพบในหินตะกอนเท่านั้น',
    subject: 'วิทยาศาสตร์',
    category: 'core',
    keywords: ['วัฏจักรหิน', 'หินอัคนี หินตะกอน หินแปร', 'ซากดึกดำบรรพ์', 'ธรณีวิทยา'],
    examUrl: 'https://master-m1.vercel.app/subjects/science',
    summaryConcept: 'หินอัคนีจากลาวา, หินตะกอนทับถมพบฟอสซิล, หินแปรจากความร้อนและแรงกดดัน'
  },
  {
    id: 'sci_astronomy_moon_phases',
    title: 'ดาราศาสตร์ ป.6: ข้างขึ้น-ข้างแรม สุริยุปราคา และจันทรุปราคา สรุปใน 1 หน้า',
    subject: 'วิทยาศาสตร์',
    category: 'core',
    keywords: ['ข้างขึ้นข้างแรม', 'สุริยุปราคา', 'จันทรุปราคา', 'ดาราศาสตร์ สพฐ.'],
    examUrl: 'https://master-m1.vercel.app/subjects/science',
    summaryConcept: 'สว่างทิศตะวันตก = ข้างขึ้น | โลกบังดวงจันทร์ = จันทรุปราคา | ดวงจันทร์บังดวงอาทิตย์ = สุริยุปราคา'
  },

  // === กลุ่มที่ 4: ภาษาไทย สพฐ. & เกณฑ์อัตนัย สทศ. (Thai Language & Essay) ===
  {
    id: 'thai_royal_words_song_rules',
    title: 'กฎเหล็กของ "ทรง" ในคำราชาศัพท์ & ข้อห้ามที่ข้อสอบชอบหลอก',
    subject: 'ภาษาไทย',
    category: 'speed_hack',
    keywords: ['คำราชาศัพท์', 'การใช้ทรง', 'ข้อสอบภาษาไทย', 'O-NET ไทย'],
    examUrl: 'https://master-m1.vercel.app/subjects/thai',
    summaryConcept: 'ห้ามใช้ทรงนำหน้า เสวย, โปรด, กริ้ว, บรรทม และคำสุภาพในชีวิตประจำวัน'
  },
  {
    id: 'thai_essay_writing_15_points',
    title: 'เทคนิคเขียนอัตนัย 15 คะแนนเต็ม สทศ. (O-NET ภาษาไทย ป.6) ฉบับสมบูรณ์',
    subject: 'ภาษาไทย',
    category: 'exam',
    keywords: ['ข้อสอบอัตนัย ป.6', 'เขียนเรื่องตามจินตนาการ', 'เกณฑ์ สทศ', 'ภาษาไทย ป.6'],
    examUrl: 'https://master-m1.vercel.app/subjects/thai',
    summaryConcept: 'โครงสร้าง 3 ท่อนทองคำ ความยาว 4-7 บรรทัด และกฎเหล็กห้ามใช้คำย่อเด็ดขาด'
  },
  {
    id: 'thai_sentence_compound_complex',
    title: 'สแกนประโยคความรวม vs ประโยคความซ้อน ใน 3 วินาที (ท 4.1 ป.6/3)',
    subject: 'ภาษาไทย',
    category: 'core',
    keywords: ['ประโยคความเดียว', 'ประโยคความรวม', 'ประโยคความซ้อน', 'หลักภาษาไทย'],
    examUrl: 'https://master-m1.vercel.app/subjects/thai',
    summaryConcept: 'เชื่อมด้วย และ/แต่/หรือ = ความรวม | เชื่อมด้วย ผู้/ที่/ซึ่ง/อัน = ความซ้อน'
  },
  {
    id: 'thai_literature_mai_yarap_p6',
    title: 'สรุปวรรณคดี ป.6: รามเกียรติ์ ตอนศึกไมยราพ & คุณค่าข้อคิดที่ออกสอบ',
    subject: 'ภาษาไทย',
    category: 'core',
    keywords: ['ศึกไมยราพ', 'วรรณคดี ป.6', 'รามเกียรติ์', 'ข้อสอบวรรณคดี'],
    examUrl: 'https://master-m1.vercel.app/subjects/thai',
    summaryConcept: 'กล้องยาสะกดทัพ หนุมานแปลงกายเป็นสะพาน และการบี้แมลงภู่ที่เขาไกรลาส'
  },

  // === กลุ่มที่ 5: ภาษาอังกฤษ CEFR A1-A2 & เทคนิค 3S Reading (English Mastery) ===
  {
    id: 'eng_3s_reading_technique',
    title: 'เทคนิค 3S Reading พิชิต Passage ภาษาอังกฤษยาวๆ ตอบถูกใน 1 นาที',
    subject: 'ภาษาอังกฤษ',
    category: 'speed_hack',
    keywords: ['Reading Comprehension', '3S Reading', 'O-NET ภาษาอังกฤษ', 'CEFR ป.6'],
    examUrl: 'https://master-m1.vercel.app/subjects/english',
    summaryConcept: 'Skim อ่านกวาดหา Topic, Scan สแกนหาตัวเลข/ชื่อเฉพาะ, Select ตัดช้อยส์'
  },
  {
    id: 'eng_tenses_mastery_since_for',
    title: 'สรุป 3 Tenses หลักที่ออกสอบเข้า ม.1 ทุกสนาม & สูตรแยก Since vs For',
    subject: 'ภาษาอังกฤษ',
    category: 'core',
    keywords: ['English Tenses', 'Present Perfect', 'Since vs For', 'Grammar ม.1'],
    examUrl: 'https://master-m1.vercel.app/subjects/english',
    summaryConcept: 'Present Simple vs Past Simple vs Present Perfect และ Since + จุดเวลา vs For + ช่วงเวลา'
  },
  {
    id: 'eng_relative_pronouns_who_whose',
    title: 'สูตรจำ Relative Pronouns (Who, Whom, Whose, Which) ตัดช้อยส์ใน 5 วินาที',
    subject: 'ภาษาอังกฤษ',
    category: 'speed_hack',
    keywords: ['Relative Pronouns', 'Who vs Whom', 'Whose', 'English Grammar Hacks'],
    examUrl: 'https://master-m1.vercel.app/subjects/english',
    summaryConcept: 'คน + who + Verb | คน + whom + S+V | คน + whose + คำนามแสดงความเป็นเจ้าของ'
  },
  {
    id: 'eng_cefr_top50_vocab_p6',
    title: '50 คำศัพท์ภาษาอังกฤษ CEFR ป.6 ที่ต้องรู้ก่อนลงสนามสอบ O-NET & ม.1',
    subject: 'ภาษาอังกฤษ',
    category: 'core',
    keywords: ['คำศัพท์ ป.6', 'CEFR Vocab', 'คำศัพท์ O-NET', 'คำศัพท์ภาษาอังกฤษ'],
    examUrl: 'https://master-m1.vercel.app/vocab-bank',
    summaryConcept: 'รวบรวม 50 คำศัพท์ออกสอบบ่อยที่สุดพร้อมตัวอย่างประโยคและความหมายภาษาไทย'
  }
]
