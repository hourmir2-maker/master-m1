/**
 * MASTER ม.1 — O-NET 2570 Test Blueprint Data Engine
 * สถาปัตยกรรมข้อมูลผังสร้างข้อสอบ O-NET ชั้นประถมศึกษาปีที่ 6 ปีการศึกษา 2569 (จัดสอบ กุมภาพันธ์ 2570)
 * อ้างอิงมาตรฐาน สทศ. (สถาบันทดสอบทางการศึกษาแห่งชาติ) และหลักสูตรแกนกลางฯ 2551 (ฉบับปรับปรุง 2560)
 */

export type ONetSubject = 'math' | 'science' | 'thai' | 'english'

export type ONetQuestionType = 
  | 'mcq'            // ปรนัย 4 ตัวเลือก 1 คำตอบ
  | 'grid_numeric'   // ระบายตัวเลขที่เป็นคำตอบ (ฝนตัวเลข / Grid-in)
  | 'complex_mcq'    // เลือกตอบเชิงซ้อน (พิจารณาข้อความย่อย ก/ข/ค ว่า ใช่ หรือ ไม่ใช่)
  | 'ordering'       // เลือกตอบแบบเรียงลำดับขั้นตอน/เหตุการณ์
  | 'written'        // อัตนัยเขียนตอบ (เขียนเรื่องตามจินตนาการ / เขียนสื่อสาร)

export interface ONetSubjectMeta {
  subject: ONetSubject
  nameTh: string
  nameEn: string
  icon: string
  color: string
  gradient: string
  totalQuestions: number
  durationMinutes: number
  totalScore: number
  formatBreakdown: {
    type: ONetQuestionType
    typeNameTh: string
    count: number
    scorePerItem: number
    totalScore: number
  }[]
  strands: {
    id: string
    name: string
    standards: string[]
    weightPercent: number
  }[]
}

export const ONET_SUBJECTS_CONFIG: Record<ONetSubject, ONetSubjectMeta> = {
  // ==========================================
  // 📐 1. คณิตศาสตร์ (Mathematics)
  // ==========================================
  math: {
    subject: 'math',
    nameTh: 'คณิตศาสตร์',
    nameEn: 'Mathematics',
    icon: '📐',
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    totalQuestions: 15,
    durationMinutes: 60,
    totalScore: 100,
    formatBreakdown: [
      {
        type: 'mcq',
        typeNameTh: 'ปรนัย 4 ตัวเลือก (1 คำตอบ)',
        count: 11,
        scorePerItem: 6.5,
        totalScore: 71.5
      },
      {
        type: 'grid_numeric',
        typeNameTh: 'ระบายตัวเลขที่เป็นคำตอบ (อัตนัยฝนตัวเลข)',
        count: 4,
        scorePerItem: 7.125,
        totalScore: 28.5
      }
    ],
    strands: [
      {
        id: 'math_s1',
        name: 'สาระที่ 1 จำนวนและพีชคณิต',
        standards: ['ค 1.1 (จำนวนนับ เศษส่วน ทศนิยม ร้อยละ อัตราส่วน)', 'ค 1.2 (แบบรูปและความสัมพันธ์)'],
        weightPercent: 50
      },
      {
        id: 'math_s2',
        name: 'สาระที่ 2 การวัดและเรขาคณิต',
        standards: ['ค 2.1 (ความยาว พื้นที่ ปริมาตร มุม วงกลม)', 'ค 2.2 (สมบัติรูปเรขาคณิตสองมิติและสามมิติ)'],
        weightPercent: 35
      },
      {
        id: 'math_s3',
        name: 'สาระที่ 3 สถิติและความน่าจะเป็น',
        standards: ['ค 3.1 (การอ่านและวิเคราะห์แผนภูมิรูปวงกลมและกราฟเส้น)'],
        weightPercent: 15
      }
    ]
  },

  // ==========================================
  // 🔬 2. วิทยาศาสตร์ (Science)
  // ==========================================
  science: {
    subject: 'science',
    nameTh: 'วิทยาศาสตร์',
    nameEn: 'Science',
    icon: '🔬',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    totalQuestions: 20,
    durationMinutes: 60,
    totalScore: 100,
    formatBreakdown: [
      {
        type: 'mcq',
        typeNameTh: 'ปรนัย 4 ตัวเลือก (1 คำตอบ)',
        count: 18,
        scorePerItem: 5.0,
        totalScore: 90.0
      },
      {
        type: 'complex_mcq',
        typeNameTh: 'เลือกตอบเชิงซ้อน (ใช่ / ไม่ใช่ 3 ข้อย่อย)',
        count: 2,
        scorePerItem: 5.0,
        totalScore: 10.0
      }
    ],
    strands: [
      {
        id: 'sci_s1',
        name: 'สาระที่ 1 วิทยาศาสตร์ชีวภาพ',
        standards: ['ว 1.1 (ระบบนิเวศ โซ่อาหาร)', 'ว 1.2 (ระบบร่างกาย พืช-สัตว์)', 'ว 1.3 (พันธุกรรม การจำแนกสิ่งมีชีวิต)'],
        weightPercent: 30
      },
      {
        id: 'sci_s2',
        name: 'สาระที่ 2 วิทยาศาสตร์กายภาพ',
        standards: ['ว 2.1 (สมบัติสาร การแยกสาร)', 'ว 2.2 (แรงโน้มถ่วง แรงลัพธ์ แรงเสียดทาน)', 'ว 2.3 (แสง เสียง วงจรไฟฟ้า)'],
        weightPercent: 35
      },
      {
        id: 'sci_s3',
        name: 'สาระที่ 3 วิทยาศาสตร์โลกและอวกาศ',
        standards: ['ว 3.1 (ดาราศาสตร์ สุริยุปราคา เทคโนโลยีอวกาศ)', 'ว 3.2 (หิน ลมบก-ลมทะเล ลมมรสุม ภัยธรรมชาติ ปรากฏการณ์เรือนกระจก)'],
        weightPercent: 25
      },
      {
        id: 'sci_s4',
        name: 'สาระที่ 4 เทคโนโลยี (วิทยาการคำนวณ)',
        standards: ['ว 4.2 (ตรรกะ ผังงาน Debugging การใช้อินเทอร์เน็ตปลอดภัย)'],
        weightPercent: 10
      }
    ]
  },

  // ==========================================
  // 📖 3. ภาษาไทย (Thai Language)
  // ==========================================
  thai: {
    subject: 'thai',
    nameTh: 'ภาษาไทย',
    nameEn: 'Thai Language',
    icon: '📖',
    color: 'blue',
    gradient: 'from-blue-600 to-indigo-600',
    totalQuestions: 22,
    durationMinutes: 90,
    totalScore: 100,
    formatBreakdown: [
      {
        type: 'mcq',
        typeNameTh: 'ปรนัย 4 ตัวเลือก (1 คำตอบ)',
        count: 20,
        scorePerItem: 4.0,
        totalScore: 80.0
      },
      {
        type: 'ordering',
        typeNameTh: 'เลือกตอบแบบเรียงลำดับข้อความ',
        count: 1,
        scorePerItem: 5.0,
        totalScore: 5.0
      },
      {
        type: 'written',
        typeNameTh: 'อัตนัยเขียนตอบ (เขียนเรื่องตามจินตนาการ / เขียนสื่อสาร)',
        count: 1,
        scorePerItem: 15.0,
        totalScore: 15.0
      }
    ],
    strands: [
      {
        id: 'thai_s1',
        name: 'สาระที่ 1 การอ่าน',
        standards: ['ท 1.1 (จับใจความ ความหมายโดยตรง/โดยนัย ข้อเท็จจริง vs ข้อคิดเห็น)'],
        weightPercent: 30
      },
      {
        id: 'thai_s2',
        name: 'สาระที่ 2 การเขียน',
        standards: ['ท 2.1 (เขียนสื่อสาร ย่อความ เขียนเรื่องตามจินตนาการ)'],
        weightPercent: 25
      },
      {
        id: 'thai_s3',
        name: 'สาระที่ 3 การฟัง การดู และการพูด',
        standards: ['ท 3.1 (วิเคราะห์ความน่าเชื่อถือ ตั้งคำถาม-ตอบคำถามเชิงเหตุผล)'],
        weightPercent: 10
      },
      {
        id: 'thai_s4',
        name: 'สาระที่ 4 หลักการใช้ภาษาไทย',
        standards: ['ท 4.1 (ชนิดของคำ คำยืม คำราชาศัพท์ ประโยค กลอนสุภาพ สำนวน ภาษาถิ่น)'],
        weightPercent: 25
      },
      {
        id: 'thai_s5',
        name: 'สาระที่ 5 วรรณคดีและวรรณกรรม',
        standards: ['ท 5.1 (คุณค่าและข้อคิดจากวรรณคดีและนิทานพื้นบ้าน)'],
        weightPercent: 10
      }
    ]
  },

  // ==========================================
  // 🇬🇧 4. ภาษาอังกฤษ (English)
  // ==========================================
  english: {
    subject: 'english',
    nameTh: 'ภาษาอังกฤษ',
    nameEn: 'English',
    icon: '🇬🇧',
    color: 'purple',
    gradient: 'from-purple-600 to-pink-600',
    totalQuestions: 32,
    durationMinutes: 60,
    totalScore: 100,
    formatBreakdown: [
      {
        type: 'mcq',
        typeNameTh: 'ปรนัย 4 ตัวเลือก (1 คำตอบ)',
        count: 32,
        scorePerItem: 3.125,
        totalScore: 100.0
      }
    ],
    strands: [
      {
        id: 'eng_s1',
        name: 'สาระที่ 1 ภาษาเพื่อการสื่อสาร',
        standards: ['ต 1.1 (ป้าย สัญลักษณ์ นิทานสั้น จับใจความ)', 'ต 1.2 (บทสนทนาประจำวัน การถามตอบ)', 'ต 1.3 (การนำเสนอข้อมูล)'],
        weightPercent: 65
      },
      {
        id: 'eng_s2',
        name: 'สาระที่ 2 ภาษาและวัฒนธรรม',
        standards: ['ต 2.1 (เทศกาล คริสต์มาส ฮาโลวีน มารยาทสังคม)', 'ต 2.2 (ไวยากรณ์ Tenses, Pronouns, Prepositions)'],
        weightPercent: 25
      },
      {
        id: 'eng_s4',
        name: 'สาระที่ 4 ภาษากับความสัมพันธ์กับชุมชนและโลก',
        standards: ['ต 4.1 (การใช้ภาษาอังกฤษในห้องเรียนและชีวิตจริง)'],
        weightPercent: 10
      }
    ]
  }
}
