import { LessonData } from './lessons-data'

/**
 * MASTER ม.1 — Comprehensive M.1 Advanced Curriculum Knowledge & Lessons Dataset
 * มาตรฐานหลักสูตรแกนกลาง สพฐ. (ฉบับปรับปรุง 2560) & สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (สสวท.)
 * สำหรับนักเรียนห้องเรียนพิเศษ (Gifted / EP / SMP) และการเรียนรู้ล่วงหน้าแบบไร้รอยต่อ
 */

export const M1_ADVANCED_LESSONS_DATA: Record<string, Record<string, LessonData>> = {
  // =========================================================================
  // 🔢 1. MATHEMATICS M.1 ADVANCED (คณิตศาสตร์ ม.1 ครบทั้ง 8 โมดูลหลัก สพฐ./สสวท.)
  // =========================================================================
  math: {
    m1_integers: {
      id: 'm1_integers',
      subject: 'math',
      title: 'จำนวนเต็มและการดำเนินการ (Integers Mastery)',
      subtitle: 'จำนวนเต็มบวก/ลบ/ศูนย์, กฎเครื่องหมายลบคูณลบเป็นบวก, เส้นจำนวน และสมบัติพีชคณิต',
      emoji: '➕➖',
      secretFormula: {
        name: 'กฎเหล็กเครื่องหมายจำนวนเต็ม (Signs Rule)',
        concept: 'การบวกลบคูณหารจำนวนเต็ม: เครื่องหมายเหมือนกันคูณ/หารได้บวก (+) เครื่องหมายต่างกันคูณ/หารได้ลบ (-)',
        steps: [
          '⚡ การบวกจำนวนเต็ม: เครื่องหมายเหมือนกัน ➔ นำตัวเลขบวกกันใส่เครื่องหมายเดิม เช่น (-5) + (-3) = -8',
          '⚡ การบวกเครื่องหมายต่างกัน: ➔ นำตัวเลขลบกันใส่เครื่องหมายตามตัวที่ค่าสัมบูรณ์มากกว่า เช่น 8 + (-12) = -4',
          '⚡ การลบจำนวนเต็ม: ตัวตั้ง - ตัวลบ = ตัวตั้ง + (จำนวนตรงข้ามของตัวลบ) เช่น 7 - (-5) = 7 + 5 = 12',
          '⚡ การคูณ/หาร: (+) × (+) = (+), (-) × (-) = (+), (+) × (-) = (-), (-) × (+) = (-)'
        ]
      },
      summaryPoints: [
        'ค่าสัมบูรณ์ |a| คือระยะห่างจาก 0 บนเส้นจำนวน มีค่าเป็นบวกหรือศูนย์เสมอ เช่น |-7| = 7, |7| = 7',
        'สมบัติการสลับที่: a + b = b + a และ a × b = b × a (การลบและการหารไม่มีสมบัติการสลับที่)',
        'สมบัติการแจกแจง: a × (b + c) = (a × b) + (a × c)'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_int_1',
          question: 'จงหาค่าของ [(-15) + (-25)] - [(-40) - 10]',
          options: ['10', '-10', '90', '-90'],
          correctAnswer: '10',
          explanation: '1. คิดวงเล็บแรก: (-15) + (-25) = -40\n2. คิดวงเล็บหลัง: (-40) - 10 = (-40) + (-10) = -50\n3. นำมาลบกัน: (-40) - (-50) = (-40) + 50 = 10',
          tip: '💡 ลบซ้อนลบกลายเป็นบวก: -(-50) = +50'
        }
      ]
    },

    m1_exponents: {
      id: 'm1_exponents',
      subject: 'math',
      title: 'เลขยกกำลังและสัญกรณ์วิทยาศาสตร์ (Exponents & Scientific Notation)',
      subtitle: 'สมบัติเลขยกกำลังฐานเดียวกัน, กำลังศูนย์, กำลังติดลบ และสัญกรณ์วิทย์ A × 10ⁿ',
      emoji: '🔟',
      secretFormula: {
        name: 'กฎ 5 ข้อของเลขยกกำลัง (Exponents Laws)',
        concept: 'ฐานเหมือนกันคูณกันเอากำลังบวก | หารกันเอากำลังลบ | ซ้อนกันเอากำลังคูณ',
        steps: [
          '⚡ aᵐ × aⁿ = aᵐ⁺ⁿ (เช่น 2³ × 2⁴ = 2⁷)',
          '⚡ aᵐ ÷ aⁿ = aᵐ⁻ⁿ (เมื่อ a ≠ 0)',
          '⚡ (aᵐ)ⁿ = aᵐⁿ และ (ab)ⁿ = aⁿbⁿ',
          '⚡ a⁰ = 1 (เมื่อ a ≠ 0) เช่น 9,999⁰ = 1',
          '⚡ a⁻ⁿ = 1 / aⁿ (เช่น 2⁻³ = 1/2³ = 1/8)'
        ]
      },
      summaryPoints: [
        'สัญกรณ์วิทยาศาสตร์: เขียนในรูป A × 10ⁿ โดยที่ 1 ≤ A < 10 และ n เป็นจำนวนเต็ม',
        'ตัวเลขมาก: เลื่อนจุดไปทางซ้าย n ครั้ง ➔ n เป็นบวก เช่น 45,000,000 = 4.5 × 10⁷',
        'ตัวเลขน้อย: เลื่อนจุดไปทางขวา n ครั้ง ➔ n เป็นลบ เช่น 0.00038 = 3.8 × 10⁻⁴'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_exp_1',
          question: 'จงหาค่าของ (2³ × 2⁵) ÷ 2⁶ ในรูปเลขยกกำลังอย่างง่าย',
          options: ['2²', '2⁴', '2⁸', '2¹⁴'],
          correctAnswer: '2²',
          explanation: '1. ด้านบน: 2³ × 2⁵ = 2³⁺⁵ = 2⁸\n2. นำมาหาร: 2⁸ ÷ 2⁶ = 2⁸⁻⁶ = 2² = 4',
          tip: '💡 คูณกันกำลังบวก หารกันกำลังลบ'
        }
      ]
    },

    m1_linear_equations: {
      id: 'm1_linear_equations',
      subject: 'math',
      title: 'สมการเชิงเส้นตัวแปรเดียว & การแก้โจทย์ปัญหา',
      subtitle: 'การย้ายข้างสมการ, กำจัดตัวส่วนด้วย ค.ร.น., และตั้งสมการโจทย์ปัญหาอายุ/เงิน/ระยะทาง',
      emoji: '⚖️',
      secretFormula: {
        name: 'สูตรย้ายข้างสมการ 3 ขั้นตอน (Linear Equation Solver)',
        concept: 'จัดตัวแปรไว้ฝั่งหนึ่ง ตัวเลขไว้ฝั่งหนึ่ง โดยเปลี่ยนเครื่องหมายเป็นตรงข้าม',
        steps: [
          '⚡ ขั้นที่ 1: กระจายวงเล็บ และกำจัดเศษส่วนโดยคูณ ค.ร.น. ของตัวส่วนตลอดทั้งสมการ',
          '⚡ ขั้นที่ 2: รวมพจน์ตัวแปรไว้ฝั่งซ้าย รวมตัวเลขไว้ฝั่งขวา (บวกย้ายไปลบ, ลบย้ายไปบวก)',
          '⚡ ขั้นที่ 3: คูณย้ายไปหาร, หารย้ายไปคูณ เพื่อหาค่าตัวแปร x 1 ตัว'
        ]
      },
      summaryPoints: [
        'สมการที่มีคำตอบเดียว: เช่น 2x + 4 = 10 ➔ x = 3',
        'สมการที่มีคำตอบมากมายนับไม่ถ้วน: เช่น 2(x + 1) = 2x + 2 (สมการเอกลักษณ์)',
        'สมการที่ไม่มีคำตอบ: เช่น x + 3 = x + 5 (0 = 2 ซึ่งเป็นเท็จ)'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_eq_1',
          question: 'จงแก้สมการ: (3x - 5) / 4 = (x + 3) / 2',
          options: ['x = 11', 'x = 7', 'x = 5', 'x = -11'],
          correctAnswer: 'x = 11',
          explanation: '1. คูณไขว้: 3x - 5 = 2(x + 3) ➔ 3x - 5 = 2x + 6\n2. ย้ายข้าง: 3x - 2x = 6 + 5 ➔ x = 11',
          tip: '💡 คูณไขว้ประหยัดเวลาที่สุด'
        }
      ]
    },

    m1_ratios_proportions: {
      id: 'm1_ratios_proportions',
      subject: 'math',
      title: 'อัตราส่วน สัดส่วน และร้อยละ ม.1 (Proportions Mastery)',
      subtitle: 'สัดส่วนตรง vs สัดส่วนผกผัน, อัตราส่วนต่อเนื่อง 3 จำนวน และการคำนวณร้อยละประยุกต์',
      emoji: '📊',
      secretFormula: {
        name: 'ทฤษฎีสัดส่วนตรง vs สัดส่วนผกผัน (Direct & Inverse Proportion)',
        concept: 'สัดส่วนตรงคูณไขว้เท่ากัน (a/b = c/d) | สัดส่วนผกผันผลคูณคงที่ (x₁y₁ = x₂y₂)',
        steps: [
          '⚡ สัดส่วนตรง (แปรผันตรง): ปริมาณหนึ่งเพิ่ม อีกปริมาณเพิ่มตาม ➔ ใช้สูตร a₁/b₁ = a₂/b₂ (เช่น ซื้อของมาก จ่ายเงินมาก)',
          '⚡ สัดส่วนผกผัน (แปรผกผัน): ปริมาณหนึ่งเพิ่ม อีกปริมาณลดลง ➔ ใช้สูตร a₁ × b₁ = a₂ × b₂ (เช่น คนงานมาก วันทำงานน้อยลง)',
          '⚡ อัตราส่วน 3 จำนวน: ให้ทำตัวแปรตัวกลางให้เท่ากันด้วย ค.ร.น.'
        ]
      },
      summaryPoints: [
        'โจทย์คนงานทำงาน: จำนวนคน × จำนวนวัน = งานทั้งหมด (คงที่)',
        'การคำนวณร้อยละย้อนกลับ: ทุน = (ราคาขาย × 100) / (100 + %กำไร)',
        'อัตราส่วนไม่มีหน่วยเมื่อเปรียบเทียบปริมาณชนิดเดียวกัน'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_prop_1',
          question: 'คนงาน 6 คน สร้างกำแพงเสร็จใน 12 วัน ถ้าต้องการสร้างกำแพงขนาดเท่าเดิมให้เสร็จใน 4 วัน จะต้องใช้คนงานทั้งหมดกี่คน?',
          options: ['18 คน', '12 คน', '8 คน', '24 คน'],
          correctAnswer: '18 คน',
          explanation: 'โจทย์คนทำงานเป็น "สัดส่วนผกผัน" (คนเพิ่ม วันลด):\nสูตร: คน₁ × วัน₁ = คน₂ × วัน₂\n6 × 12 = คน₂ × 4\n72 = คน₂ × 4 ➔ คน₂ = 72 ÷ 4 = 18 คน',
          tip: '💡 สัดส่วนผกผัน: ผลคูณเท่ากันเสมอ (6 × 12 = 18 × 4 = 72)'
        }
      ]
    },

    m1_linear_graphs: {
      id: 'm1_linear_graphs',
      subject: 'math',
      title: 'กราฟและความสัมพันธ์เชิงเส้น (Linear Graphs & Coordinate Planes)',
      subtitle: 'คู่อันดับ (x,y), จตุภาค 1-4 (Quadrants), ความชันของเส้นตรง และการอ่านกราฟ',
      emoji: '📈',
      secretFormula: {
        name: 'สมการเส้นตรงมาตรฐาน (Slope-Intercept Form)',
        concept: 'y = mx + c โดย m คือความชัน (Slope) และ c คือจุดตัดแกน Y',
        steps: [
          '⚡ จตุภาคทั้ง 4: Q1 (+,+), Q2 (-,+), Q3 (-,-), Q4 (+,-)',
          '⚡ ความชัน m = (y₂ - y₁) / (x₂ - x₁)',
          '⚡ m เป็นบวก ➔ กราฟเอียงขวาขึ้น / m เป็นลบ ➔ กราฟเอียงซ้ายลง / m = 0 ➔ เส้นนอนขนานแกน X'
        ]
      },
      summaryPoints: [
        'จุดตัดแกน X ให้แทน y = 0 | จุดตัดแกน Y ให้แทน x = 0',
        'เส้นตรงสองเส้นขนานกันเมื่อมีความชันเท่ากัน (m₁ = m₂)',
        'เส้นตรงสองเส้นตั้งฉากกันเมื่อผลคูณความชันเท่ากับ -1 (m₁ × m₂ = -1)'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_gr_1',
          question: 'จุด A(-3, 5) อยู่ในจตุภาค (Quadrant) ใดบนระนาบพิกัดฉาก?',
          options: ['จตุภาคที่ 2 (Q2)', 'จตุภาคที่ 1 (Q1)', 'จตุภาคที่ 3 (Q3)', 'จตุภาคที่ 4 (Q4)'],
          correctAnswer: 'จตุภาคที่ 2 (Q2)',
          explanation: 'พิกัด x เป็นลบ (-3) และ y เป็นบวก (5) ➔ ตรงกับ จตุภาคที่ 2 (-, +)',
          tip: '💡 ท่องทวนเข็มนาฬิกา: Q1(+,+), Q2(-,+), Q3(-,-), Q4(+,-)'
        }
      ]
    },

    m1_statistics: {
      id: 'm1_statistics',
      subject: 'math',
      title: 'สถิติและการนำเสนอข้อมูล ม.1 (Statistics & Data Analysis)',
      subtitle: 'ค่ากลางของข้อมูล (Mean, Median, Mode), ฮิสโทแกรม, แผนภาพต้น-ใบ (Stem-and-Leaf)',
      emoji: '📉',
      secretFormula: {
        name: 'การหาค่ากลาง 3 ชนิด (Measures of Central Tendency)',
        concept: 'Mean = ค่าเฉลี่ย | Median = มัธยฐาน (ตัวกลางหลังเรียง) | Mode = ฐานนิยม (ซ้ำมากสุด)',
        steps: [
          '⚡ ค่าเฉลี่ยเลขคณิต (Mean): ผลรวมข้อมูลทั้งหมด ÷ จำนวนข้อมูล (x̄ = Σx / N)',
          '⚡ มัธยฐาน (Median): ต้องเรียงข้อมูลจากน้อยไปมากก่อนเสมอ ตำแหน่งตรงกลาง = (N + 1) / 2',
          '⚡ ฐานนิยม (Mode): ข้อมูลที่มีความถี่สูงสุด (ซ้ำมากที่สุด)'
        ]
      },
      summaryPoints: [
        'แผนภาพต้น-ใบ (Stem-and-Leaf): ลำต้นคือหลักสิบ/ร้อย ใบคือหลักหน่วย',
        'หากข้อมูลมีค่าผิดปกติ (Outlier) มาก เช่น 2, 3, 3, 4, 100 ➔ ควรใช้ "มัธยฐาน" แทนค่าเฉลี่ย',
        'ฐานนิยมอาจมีได้มากกว่า 1 ค่า หรืออาจไม่มีเลยถ้าทุกตัวมีความถี่เท่ากัน'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_stat_1',
          question: 'ข้อมูลชุดหนึ่งประกอบด้วย 4, 8, 3, 9, 8, 6, 8 จงหามัธยฐาน (Median) ของข้อมูลชุดนี้',
          options: ['8', '6', '7', '9'],
          correctAnswer: '8',
          explanation: '1. เรียงข้อมูลจากน้อยไปมาก: 3, 4, 6, [8], 8, 8, 9 (มีทั้งหมด 7 ตัว)\n2. ตำแหน่งมัธยฐานคือตัวที่ (7 + 1) / 2 = ตัวที่ 4\n3. ตัวที่ 4 คือ 8 ดังนั้นมัธยฐาน = 8',
          tip: '💡 อย่าลืมเรียงลำดับข้อมูลจากน้อยไปมากก่อนหามัธยฐานเสมอ'
        }
      ]
    },

    m1_geometric_transformations: {
      id: 'm1_geometric_transformations',
      subject: 'math',
      title: 'การแปลงทางเรขาคณิต (Geometric Transformations)',
      subtitle: 'การเลื่อนขนาน (Translation), การสะท้อน (Reflection), และการหมุน (Rotation)',
      emoji: '🔄',
      secretFormula: {
        name: 'กฎ 3 ระบบของการแปลงเรขาคณิต (Transformation Laws)',
        concept: 'รูปต้นแบบและภาพที่ได้จากการแปลงจะ "เท่ากันทุกประการ (Congruent)" เสมอ',
        steps: [
          '⚡ การเลื่อนขนาน (Translation): เลื่อนตามเวกเตอร์ (x + a, y + b) ทิศทางและขนาดคงที่',
          '⚡ การสะท้อน (Reflection): พลิกข้ามเส้นสะท้อน ระยะห่างจากเส้นสะท้อนต้องเท่ากัน',
          '⚡ การหมุน (Rotation): หมุนรอบจุดหมุนตามมุมที่กำหนด (ทวนเข็มหรือตามเข็มนาฬิกา)'
        ]
      },
      summaryPoints: [
        'สะท้อนข้ามแกน X: พิกัด (x, y) กลายเป็น (x, -y)',
        'สะท้อนข้ามแกน Y: พิกัด (x, y) กลายเป็น (-x, y)',
        'หมุน 180° รอบจุดกำเนิด (0,0): พิกัด (x, y) กลายเป็น (-x, -y)'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_trans_1',
          question: 'จุด P(2, -5) เมื่อสะท้อนข้ามแกน X จะได้พิกัดภาพ P\' ตรงกับข้อใด?',
          options: ['(2, 5)', '(-2, -5)', '(-2, 5)', '(5, -2)'],
          correctAnswer: '(2, 5)',
          explanation: 'การสะท้อนข้ามแกน X: พิกัด x เท่าเดิม พิกัด y เปลี่ยนเครื่องหมายตรงข้าม (x, -y)\n(2, -5) ➔ (2, -(-5)) = (2, 5)',
          tip: '💡 สะท้อนแกน X เปลี่ยนค่า Y | สะท้อนแกน Y เปลี่ยนค่า X'
        }
      ]
    },

    m1_constructions: {
      id: 'm1_constructions',
      subject: 'math',
      title: 'การสร้างพื้นฐานทางเรขาคณิตด้วยวงเวียนและสันตรง',
      subtitle: 'การแบ่งครึ่งส่วนของเส้นตรง, แบ่งครึ่งมุม, และการสร้างมุมมาตรฐาน 60°, 90°, 75°',
      emoji: '📐',
      secretFormula: {
        name: 'เทคนิคการสร้างมุมด้วยวงเวียน (Compass Angles)',
        concept: 'สร้างจากมุมฐาน 60° (สามเหลี่ยมด้านเท่า) และ 90° (เส้นตั้งฉาก)',
        steps: [
          '⚡ มุม 60°: กางวงเวียนเท่ารัศมีเดิมตัดส่วนโค้ง 1 ครั้ง',
          '⚡ มุม 30°: แบ่งครึ่งมุม 60°',
          '⚡ มุม 90°: สร้างเส้นตั้งฉากแบ่งครึ่งมุมตรง 180°',
          '⚡ มุม 75°: แบ่งครึ่งมุมระหว่าง 60° กับ 90° (60 + 15 = 75°)'
        ]
      },
      summaryPoints: [
        'สันตรง (Straightedge) ใช้สำหรับลากเส้นตรงเท่านั้น ห้ามใช้วัดความยาว',
        'วงเวียน (Compass) ใช้สำหรับวาดส่วนโค้งและถ่ายขนาดความยาว',
        'การแบ่งส่วนของเส้นตรงออกเป็น n ส่วนเท่าๆ กัน อาศัยทฤษฎีเส้นขนานและสามเหลี่ยมคล้าย'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_const_1',
          question: 'การสร้างมุมขนาด 75° ด้วยวงเวียนและสันตรง สามารถทำได้โดยวิธีใด?',
          options: [
            'แบ่งครึ่งมุมระหว่างมุม 60° และ 90°',
            'แบ่งครึ่งมุม 150°',
            'สร้างมุม 60° แล้วสร้างมุม 15° ต่อออกไป',
            'ถูกทุกข้อ'
          ],
          correctAnswer: 'ถูกทุกข้อ',
          explanation: 'มุม 75° สามารถสร้างได้หลายวิธี: 1) แบ่งครึ่งช่วง 60° ถึง 90° (กว้าง 30° แบ่งครึ่งได้ 15° ➔ 60+15=75°) 2) แบ่งครึ่งมุม 150° (150/2 = 75°) หรือ 3) สร้าง 60° + 15° ดังนั้น ถูกทุกข้อ',
          tip: '💡 ทุกวิธีให้ผลลัพธ์มุม 75° เท่ากัน'
        }
      ]
    }
  },

  // =========================================================================
  // 🔬 2. SCIENCE M.1 ADVANCED (วิทยาศาสตร์ ม.1 ครบทั้ง 8 โมดูลหลัก สพฐ./สสวท.)
  // =========================================================================
  science: {
    m1_microscope_cells: {
      id: 'm1_microscope_cells',
      subject: 'science',
      title: 'กล้องจุลทรรศน์ & เซลล์พืชสัตว์เชิงลึก',
      subtitle: 'การคำนวณกำลังขยาย, ภาพเสมือนหัวกลับ, เยื่อหุ้มเซลล์ ไมโทคอนเดรีย และไซโทพลาซึม',
      emoji: '🔬',
      secretFormula: {
        name: 'สูตรกำลังขยายกล้องจุลทรรศน์ (Microscope Magnification)',
        concept: 'กำลังขยายรวม = กำลังขยายเลนส์ใกล้ตา × กำลังขยายเลนส์ใกล้วัตถุ',
        steps: [
          '⚡ ตัวอย่าง: เลนส์ใกล้ตา 10x เลนส์ใกล้วัตถุ 40x ➔ กำลังขยาย = 10 × 40 = 400 เท่า',
          '⚡ ภาพที่เห็น: เป็น "ภาพเสมือนหัวกลับและกลับซ้ายขวา" (Inverted Virtual Image)',
          '⚡ เลื่อนวัตถุ: ถ้าภาพอยู่มุมบนขวา ให้เลื่อนสไลด์ไปทาง "บนขวา" เพื่อให้ภาพกลับมาตรงกลาง'
        ]
      },
      summaryPoints: [
        'ไมโทคอนเดรีย (Mitochondria): แหล่งสร้างพลังงาน ATP ของเซลล์ (Powerhouse of cell)',
        'คลอโรพลาสต์ (Chloroplast): มีคลอโรฟิลล์ สังเคราะห์แสง พบเฉพาะในเซลล์พืชและสาหร่าย',
        'เยื่อหุ้มเซลล์ (Cell Membrane): เยื่อเลือกผ่าน (Semi-permeable membrane) ควบคุมสารเข้าออก'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_mic_1',
          question: 'เมื่อมองตัวอักษร "d" ผ่านกล้องจุลทรรศน์แบบใช้แสงเชิงประกอบ จะเห็นภาพเป็นตัวอักษรใด?',
          options: ['p', 'b', 'q', 'd'],
          correctAnswer: 'p',
          explanation: 'กล้องจุลทรรศน์ให้ภาพเสมือน "หัวกลับและกลับซ้ายขวา" (หมุน 180°):\nตัว "d" เมื่อกลับหัวและกลับซ้ายขวาจะกลายเป็นตัว "p"',
          tip: '💡 หมุนตัวอักษร 180° จะได้ภาพที่ปรากฏในกล้อง'
        }
      ]
    },

    m1_cellular_transport: {
      id: 'm1_cellular_transport',
      subject: 'science',
      title: 'การลำเลียงสารเข้า-ออกจากเซลล์ (Cellular Transport)',
      subtitle: 'การแพร่ (Diffusion), ออสโมซิส (Osmosis: เต่ง/เหี่ยว) และการลำเลียงแบบใช้พลังงาน',
      emoji: '💧',
      secretFormula: {
        name: 'กฎการเคลื่อนที่ของสารผ่านเยื่อหุ้มเซลล์',
        concept: 'การแพร่ = สารเคลื่อนที่จากความเข้มข้นมากไปน้อย | ออสโมซิส = "น้ำ" เคลื่อนที่จากน้ำมากไปน้ำน้อย',
        steps: [
          '⚡ สารละลายไฮโปทอนิก (Hypotonic - น้ำรอบนอกมาก): น้ำออสโมซิสเข้าเซลล์ ➔ เซลล์สัตว์แตก, เซลล์พืช "เต่ง" (Turgid)',
          '⚡ สารละลายไฮเพอร์ทอนิก (Hypertonic - น้ำรอบนอกน้อย/เข้มข้นจัด): น้ำออสโมซิสออกจากเซลล์ ➔ เซลล์ "เหี่ยว/พลาสโมไลซิส" (Plasmolysis)',
          '⚡ สารละลายไอโซทอนิก (Isotonic - สมดุล): น้ำเข้า-ออกเท่ากัน เซลล์คงรูป'
        ]
      },
      summaryPoints: [
        'การแพร่แบบธรรมดา (Simple Diffusion): ไม่อาศัยพลังงานและไม่อาศัยโปรตีนตัวพา เช่น การแพร่ของ O₂ และ CO₂',
        'การแพร่แบบฟาซิลิเทต (Facilitated Diffusion): ผ่านโปรตีนตัวพา แต่ไม่อาศัยพลังงาน ATP',
        'Active Transport: ลำเลียงจากความเข้มข้นน้อยไปมาก อาศัยโปรตีนตัวพาและใช้พลังงาน ATP'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_transp_1',
          question: 'เมื่อนำเซลล์เม็ดเลือดแดงของคนไปแช่ในน้ำกลั่นบริสุทธิ์ จะเกิดการเปลี่ยนแปลงอย่างไรกับเซลล์?',
          options: ['เซลล์เต่งแล้วแตกออก', 'เซลล์เหี่ยวลีบ', 'เซลล์คงรูปเดิม', 'เซลล์แบ่งตัวเพิ่มจำนวน'],
          correctAnswer: 'เซลล์เต่งแล้วแตกออก',
          explanation: 'น้ำกลั่นเป็นสารละลายไฮโปทอนิก (น้ำมาก สารละลายเจือจาง) น้ำจึงออสโมซิสเข้าสู่เซลล์เม็ดเลือดแดง และเนื่องจากเซลล์สัตว์ไม่มีผนังเซลล์ จึงทำให้เซลล์เต่งจนแตกออก (Hemolysis)',
          tip: '💡 เซลล์สัตว์ไม่มีผนังเซลล์ เมื่อแช่น้ำกลั่นจะแตก'
        }
      ]
    },

    m1_plant_transport_photosynthesis: {
      id: 'm1_plant_transport_photosynthesis',
      subject: 'science',
      title: 'การสังเคราะห์ด้วยแสง & การลำเลียงของพืช',
      subtitle: 'สมการสังเคราะห์ด้วยแสง, ท่อลำเลียงไซเลม (น้ำ) vs โฟลเอ็ม (อาหาร), และการคายน้ำ',
      emoji: '🌿',
      secretFormula: {
        name: 'สมการสังเคราะห์ด้วยแสงสากล (Photosynthesis Formula)',
        concept: '6CO₂ + 6H₂O + แสง/คลอโรฟิลล์ ➔ C₆H₁₂O₆ (กลูโคส) + 6O₂',
        steps: [
          '⚡ ไซเลม (Xylem): ลำเลียง "น้ำและแร่ธาตุ" จากรากขึ้นสู่ยอด (ทิศทางเดียว ล่างขึ้นบน)',
          '⚡ โฟลเอ็ม (Phloem): ลำเลียง "น้ำตาล/อาหาร" จากใบไปส่วนต่างๆ (สองทิศทาง ขึ้นและลง)',
          '⚡ ปากใบ (Stomata): เซลล์คุม (Guard cells) เต่ง ➔ ปากใบเปิด (คายน้ำ) | เซลล์คุมเหี่ยว ➔ ปากใบปิด'
        ]
      },
      summaryPoints: [
        'แป้งทดสอบด้วย "สารละลายไอโอดีน" เปลี่ยนจากสีน้ำตาลเป็น "สีน้ำเงินเข้ม/ม่วงเข้ม"',
        'ปัจจัยที่ควบคุมการสังเคราะห์ด้วยแสง: ความเข้มแสง, ความเข้มข้นของ CO₂, อุณหภูมิ และน้ำ',
        'แรงดึงจากการคายน้ำ (Transpiration Pull) เป็นแรงหลักที่ใช้ดึงน้ำขึ้นสู่ยอดไม้สูง'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_photo_1',
          question: 'สารละลายไอโอดีนใช้สำหรับทดสอบสารอาหารประเภทใด และจะเปลี่ยนเป็นสีอะไรเมื่อผลเป็นบวก?',
          options: ['แป้ง — สีน้ำเงินเข้ม', 'น้ำตาลกลูโคส — สีส้มอิฐ', 'โปรตีน — สีม่วง', 'ไขมัน — สารละลายโปร่งแสง'],
          correctAnswer: 'แป้ง — สีน้ำเงินเข้ม',
          explanation: 'สารละลายไอโอดีนใช้ทดสอบแป้ง โดยจะเปลี่ยนสีจากสีน้ำตาลอมเหลืองเป็น "สีน้ำเงินเข้มหรือม่วงเข้ม"',
          tip: '💡 ไอโอดีน = แป้ง (สีน้ำเงิน) | เบเนดิกต์ = น้ำตาลโมเลกุลเดี่ยว (สีแดงอิฐ)'
        }
      ]
    },

    m1_plant_reproduction: {
      id: 'm1_plant_reproduction',
      subject: 'science',
      title: 'การสืบพันธุ์และการขยายพันธุ์ของพืชดอก',
      subtitle: 'การถ่ายละอองเรณู, การปฏิสนธิซ้อน (Double Fertilization), และการเพาะเลี้ยงเนื้อเยื่อ',
      emoji: '🌸',
      secretFormula: {
        name: 'การปฏิสนธิซ้อนของพืชดอก (Double Fertilization)',
        concept: 'อสุจิตัวที่ 1 + เซลล์ไข่ = ไซโกต (2n) | อสุจิตัวที่ 2 + โพลาร์นิวคลีไอ = เอนโดสเปิร์ม (3n)',
        steps: [
          '⚡ สเปิร์มตัวที่ 1 (n) + ไข่ (n) ➔ ไซโกต (2n) เจริญเป็น "ต้นอ่อน (Embryo)"',
          '⚡ สเปิร์มตัวที่ 2 (n) + โพลาร์นิวเคลียส (2n) ➔ เอนโดสเปิร์ม (3n) ทำหน้าที่เป็น "อาหารเลี้ยงต้นอ่อน"',
          '⚡ รังไข่ ➔ ผล | ออวุล ➔ เมล็ด | ผนังรังไข่ ➔ เปลือกและเนื้อผลไม้'
        ]
      },
      summaryPoints: [
        'การขยายพันธุ์แบบไม่อาศัยเพศ: ปักชำ ทาบกิ่ง ตอนกิ่ง เพาะเลี้ยงเนื้อเยื่อ (พันธุกรรมเหมือนต้นแม่ 100%)',
        'การเพาะเลี้ยงเนื้อเยื่อ (Tissue Culture): ใช้ส่วนที่เป็นเนื้อเยื่อเจริญ เพิ่มจำนวนได้รวดเร็ว ปลอดโรค',
        'ดอกสมบูรณ์เพศ (Perfect Flower): มีทั้งเกสรเพศผู้และเกสรเพศเมียในดอกเดียวกัน'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_repro_1',
          question: 'เอนโดสเปิร์ม (Endosperm) ในเมล็ดพืชดอกเกิดขึ้นจากการรวมตัวของเซลล์คู่ใด?',
          options: [
            'สเปิร์มนิวเคลียส + โพลาร์นิวคลีไอ',
            'สเปิร์มนิวเคลียส + เซลล์ไข่',
            'ละอองเรณู + ยอดเกสรเพศเมีย',
            'เซลล์ไข่ + โพลาร์นิวคลีไอ'
          ],
          correctAnswer: 'สเปิร์มนิวเคลียส + โพลาร์นิวคลีไอ',
          explanation: 'การปฏิสนธิซ้อน: สเปิร์มตัวที่ 2 รวมกับโพลาร์นิวคลีไอ ได้เป็นเอนโดสเปิร์ม (3n) ซึ่งทำหน้าที่สะสมอาหารสำหรับเลี้ยงต้นอ่อนในเมล็ด',
          tip: '💡 สเปิร์ม + ไข่ = ต้นอ่อน | สเปิร์ม + โพลาร์ = เอนโดสเปิร์ม'
        }
      ]
    },

    m1_thermal_physics: {
      id: 'm1_thermal_physics',
      subject: 'science',
      title: 'ความร้อนและการเปลี่ยนแปลงของสาร (Q = mcΔt & Q = mL)',
      subtitle: 'ความจุความร้อนจำเพาะ, ความร้อนแฝงของการหลอมเหลว/กลายเป็นไอ และสมดุลความร้อน',
      emoji: '🔥',
      secretFormula: {
        name: 'สูตรคำนวณพลังงานความร้อน (Heat Equations)',
        concept: 'เปลี่ยนอุณหภูมิใช้ Q = mcΔt | เปลี่ยนสถานะใช้ Q = mL',
        steps: [
          '⚡ Q = mcΔt ➔ ใช้เมื่ออุณหภูมิเปลี่ยน แต่สถานะคงเดิม (cคือน้ำ = 1 cal/g·°C)',
          '⚡ Q = mL ➔ ใช้เมื่อเปลี่ยนสถานะ แต่อุณหภูมิคงที่ (Lหลอมเหลว = 80 cal/g, Lกลายเป็นไอ = 540 cal/g)',
          '⚡ สมดุลความร้อน: Qสูญเสีย = Qได้รับ'
        ]
      },
      summaryPoints: [
        'จุดเดือดของน้ำบริสุทธิ์ที่ความดัน 1 บรรยากาศคือ 100°C จุดเยือกแข็งคือ 0°C',
        'บนยอดเขาสูง ความกดอากาศต่ำกว่าระดับน้ำทะเล ทำให้น้ำเดือดที่อุณหภูมิต่ำกว่า 100°C',
        'การขยายตัวของสารเมื่อได้รับความร้อน: แก๊สขยายตัวได้มากที่สุด > ของเหลว > ของแข็ง'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_th_1',
          question: 'ต้องใช้พลังงานความร้อนกี่แคลอรีเพื่อทำให้น้ำแข็งมวล 50 กรัม อุณหภูมิ 0°C หลอมเหลวเป็นน้ำ 0°C ทั้งหมด? (กำหนด Lหลอมเหลว = 80 cal/g)',
          options: ['4,000 แคลอรี', '800 แคลอรี', '27,000 แคลอรี', '500 แคลอรี'],
          correctAnswer: '4,000 แคลอรี',
          explanation: 'เนื่องจากเป็นการเปลี่ยนสถานะที่อุณหภูมิคงที่ (0°C ➔ 0°C) จึงใช้สูตร:\nQ = mL\nQ = 50 g × 80 cal/g = 4,000 cal',
          tip: '💡 อุณหภูมิไม่เปลี่ยน ใช้ Q = mL เสมอ'
        }
      ]
    },

    m1_substances_separation: {
      id: 'm1_substances_separation',
      subject: 'science',
      title: 'สารบริสุทธิ์ สารผสม & การแยกสารขั้นสูง',
      subtitle: 'การกลั่นลำดับส่วน, การสกัดด้วยตัวทำละลาย, โครมาโทกราฟี และคำนวณค่า Rf',
      emoji: '🧪',
      secretFormula: {
        name: 'สูตรคำนวณค่า Rf (Retention Factor)',
        concept: 'Rf = ระยะทางที่สารเคลื่อนที่ ÷ ระยะทางที่ตัวทำละลายเคลื่อนที่ (0 ≤ Rf ≤ 1)',
        steps: [
          '⚡ สารที่ดูดซับได้ดี (ชอบกระดาษ) ➔ เคลื่อนที่ได้ช้า ➔ Rf ต่ำ',
          '⚡ สารที่ละลายได้ดี (ชอบตัวทำละลาย) ➔ เคลื่อนที่ได้เร็ว ➔ Rf สูง',
          '⚡ การกลั่นลำดับส่วน: ใช้แยกของเหลวที่มีจุดเดือดใกล้เคียงกัน (ต่างกันน้อยกว่า 20-30°C)'
        ]
      },
      summaryPoints: [
        'ธาตุ (Element): สารบริสุทธิ์ที่ไม่สามารถแยกย่อยทางเคมีได้ เช่น Fe, Au, O₂',
        'สารประกอบ (Compound): สารบริสุทธิ์ที่เกิดจากธาตุตั้งแต่ 2 ชนิดขึ้นไปรวมตัวกันทางเคมี เช่น H₂O, NaCl, CO₂',
        'การสกัดน้ำมันหอมระเหย: นิยมใช้ "การกลั่นด้วยไอน้ำ" เพื่อป้องกันสารสลายตัวจากความร้อนสูง'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_sep_1',
          question: 'ในการทำโครมาโทกราฟี ตัวทำละลายเคลื่อนที่ได้ 10 ซม. สาร A เคลื่อนที่ได้ 6 ซม. ค่า Rf ของสาร A มีค่าเท่าใด?',
          options: ['0.6', '1.67', '60', '0.06'],
          correctAnswer: '0.6',
          explanation: 'สูตร: Rf = ระยะทางที่สารเคลื่อนที่ ÷ ระยะทางที่ตัวทำละลาย\nRf = 6 cm ÷ 10 cm = 0.6',
          tip: '💡 ค่า Rf ต้องอยู่ระหว่าง 0 ถึง 1 เสมอ'
        }
      ]
    },

    m1_atmosphere_weather: {
      id: 'm1_atmosphere_weather',
      subject: 'science',
      title: 'ชั้นบรรยากาศ ความกดอากาศ และความชื้น',
      subtitle: '5 ชั้นบรรยากาศ, บารอมิเตอร์, ไฮโกรมิเตอร์กระเปาะเปียก-แห้ง และการเกิดเมฆฝน',
      emoji: '☁️',
      secretFormula: {
        name: 'คุณสมบัติของ 5 ชั้นบรรยากาศ (Atmospheric Layers)',
        concept: 'โทรโพสเฟียร์ ➔ สตราโทสเฟียร์ ➔ มีโซสเฟียร์ ➔ เทอร์โมสเฟียร์ ➔ เอกโซสเฟียร์',
        steps: [
          '⚡ โทรโพสเฟียร์ (Troposphere): ชั้นล่างสุด เกิดปรากฏการณ์ลมฟ้าอากาศทั้งหมด ยิ่งสูงอุณหภูมิยิ่งลดลง',
          '⚡ สตราโทสเฟียร์ (Stratosphere): มี "ชั้นโอโซน (O₃)" ดูดกลืนรังสี UV เครื่องบินไอพ่นบินในชั้นนี้',
          '⚡ มีโซสเฟียร์ (Mesosphere): ชั้นที่ "ดาวตก/อุกกาบาตเผาไหม้"',
          '⚡ เทอร์โมสเฟียร์ (Thermosphere): มีอนุภาคประจุไอออน (Ionosphere) สะท้อนคลื่นวิทยุ AM และเกิดแสงเหนือ-แสงใต้ (Aurora)'
        ]
      },
      summaryPoints: [
        'ความกดอากาศ: ยิ่งสูง ความกดอากาศยิ่งลดลง (ทุกๆ ความสูง 11 เมตร ปรอทลดลง 1 มม.)',
        'ความชื้นสัมพัทธ์ (Relative Humidity): สัดส่วนไอน้ำที่มีอยู่จริงเทียบกับไอน้ำอิ่มตัวที่อุณหภูมินั้น',
        'เครื่องมือวัดความชื้น: ไซครอมิเตอร์ (Psychrometer - เทียบผลต่างอุณหภูมิตุ้มเปียกและตุ้มแห้ง)'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_atm_1',
          question: 'ชั้นบรรยากาศใดที่มีชั้นโอโซน (Ozone layer) ช่วยดูดกลืนรังสีอัลตราไวโอเลต (UV) จากดวงอาทิตย์?',
          options: ['สตราโทสเฟียร์ (Stratosphere)', 'โทรโพสเฟียร์ (Troposphere)', 'มีโซสเฟียร์ (Mesosphere)', 'เทอร์โมสเฟียร์ (Thermosphere)'],
          correctAnswer: 'สตราโทสเฟียร์ (Stratosphere)',
          explanation: 'ชั้นสตราโทสเฟียร์มีก๊าซโอโซน (O₃) หนาแน่น ช่วยดูดกลืนรังสี UV จากดวงอาทิตย์ไม่ให้ส่องลงมาทำอันตรายต่อสิ่งมีชีวิตบนโลก',
          tip: '💡 โอโซน + เครื่องบินไอพ่น = สตราโทสเฟียร์'
        }
      ]
    },

    m1_climate_change: {
      id: 'm1_climate_change',
      subject: 'science',
      title: 'ลมฟ้าอากาศ พายุ & การเปลี่ยนแปลงภูมิอากาศ',
      subtitle: 'ลมมรสุมในไทย, พายุหมุนเขตร้อน (ดีเปรสชัน/โซนร้อน/ไต้ฝุ่น), และเอลนีโญ-ลานีญา',
      emoji: '🌪️',
      secretFormula: {
        name: 'การจำแนกความเร็วพายุหมุนเขตร้อน (Tropical Cyclones)',
        concept: 'ดีเปรสชัน (< 63 km/h) ➔ โซนร้อน (63-117 km/h) ➔ ไต้ฝุ่น/เฮอริเคน (≥ 118 km/h)',
        steps: [
          '⚡ พายุดีเปรสชัน: ความเร็วลมใกล้ศูนย์กลาง ไม่เกิน 62 km/h (ฝนตกหนักต่อเนื่อง)',
          '⚡ พายุโซนร้อน: ความเร็วลม 63 - 117 km/h',
          '⚡ พายุไต้ฝุ่น (Typhoon): ความเร็วลม 118 km/h ขึ้นไป (รุนแรงที่สุด มีตาพายุชัดเจน)',
          '⚡ มรสุมไทย: มรสุมตะวันตกเฉียงใต้ (ฤดูฝน นำความชื้นจากทะเลอันดามัน) vs มรสุมตะวันออกเฉียงเหนือ (ฤดูหนาว นำความหนาวเย็นจากจีน)'
        ]
      },
      summaryPoints: [
        'เอลนีโญ (El Niño): ฝนตกทางอเมริกาใต้แล้งทางเอเชียตะวันออกเฉียงใต้ (ไทยแล้ง ฝนน้อย)',
        'ลานีญา (La Niña): ไทยและเอเชียมีฝนตกชุกมากกว่าปกติ น้ำท่วม',
        'แก๊สเรือนกระจกหลัก: คาร์บอนไดออกไซด์ (CO₂), มีเทน (CH₄), ไนตรัสออกไซด์ (N₂O), CFCs'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_clim_1',
          question: 'พายุหมุนเขตร้อนที่มีความเร็วลมใกล้ศูนย์กลาง 120 กิโลเมตรต่อชั่วโมง จัดเป็นพายุประเภทใด?',
          options: ['พายุไต้ฝุ่น', 'พายุโซนร้อน', 'พายุดีเปรสชัน', 'พายุทอร์นาโด'],
          correctAnswer: 'พายุไต้ฝุ่น',
          explanation: 'พายุหมุนเขตร้อนที่มีความเร็วลมตั้งแต่ 118 km/h ขึ้นไป จัดเป็น "พายุไต้ฝุ่น" (หากเกิดในมหาสมุทรแปซิฟิกตะวันตก)',
          tip: '💡 ≥ 118 km/h = ไต้ฝุ่น | 63-117 = โซนร้อน | < 63 = ดีเปรสชัน'
        }
      ]
    }
  },

  // =========================================================================
  // 🗣️ 3. ENGLISH M.1 ADVANCED (ภาษาอังกฤษ ม.1 ครบทั้ง 8 โมดูลหลัก CEFR A2/B1)
  // =========================================================================
  english: {
    m1_past_tenses: {
      id: 'm1_past_tenses',
      subject: 'english',
      title: 'Past Simple vs Past Continuous',
      subtitle: 'การเล่าเรื่องอดีต, เหตุการณ์แทรกซ้อน (When vs While) และกริยา 3 ช่อง',
      emoji: '⏳',
      secretFormula: {
        name: 'สูตรเชื่อมเหตุการณ์ในอดีต (When vs While Rules)',
        concept: 'เหตุการณ์กำลังเกิดอยู่ใช้ Past Cont (was/were + V.ing) | เหตุการณ์ที่เข้ามาแทรกใช้ Past Simple (V.2)',
        steps: [
          '⚡ While / As + Past Continuous (was/were + V.ing), Past Simple (V.2)',
          '⚡ When + Past Simple (V.2), Past Continuous (was/were + V.ing)',
          '⚡ ตัวอย่าง: While I was studying, the phone rang.'
        ]
      },
      summaryPoints: [
        'I / He / She / It ใช้ was | You / We / They ใช้ were',
        'Stative Verbs (know, like, love, understand) ไม่นิยมเติม -ing',
        'Time markers ของ Past Simple: yesterday, last night, 2 years ago, in 2020'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_pt_1',
          question: 'Jane [ ? ] dinner when someone knocked on the door.',
          options: ['was cooking', 'cooked', 'is cooking', 'cooks'],
          correctAnswer: 'was cooking',
          explanation: 'เหตุการณ์กำลังดำเนินอยู่ (was cooking) ถูกแทรกด้วยคนเคาะประตู (knocked)',
          tip: '💡 กำลังเกิดใช้ was/were + V.ing | เข้ามาแทรกใช้ V.2'
        }
      ]
    },

    m1_present_perfect: {
      id: 'm1_present_perfect',
      subject: 'english',
      title: 'Present Perfect Tense (Experience & Result)',
      subtitle: 'โครงสร้าง S + have/has + V.3, การใช้ Since/For, Already, Yet, Just และ Ever/Never',
      emoji: '🎯',
      secretFormula: {
        name: 'กุญแจสำคัญของ Present Perfect (Have/Has + V.3)',
        concept: 'บอกการกระทำที่เกิดในอดีตแต่ส่งผลถึงปัจจุบัน หรือบอกประสบการณ์ตั้งแต่ในอดีตจนถึงตอนนี้',
        steps: [
          '⚡ Since + จุดเริ่มต้นของเวลา (เช่น since 2018, since Monday)',
          '⚡ For + ช่วงระยะเวลา (เช่น for 3 hours, for 5 years)',
          '⚡ Already / Just ➔ วางไว้ตรงกลาง: Subject + have/has + already/just + V.3',
          '⚡ Yet ➔ ใช้ในประโยคปฏิเสธ/คำถาม วางไว้ท้ายประโยค'
        ]
      },
      summaryPoints: [
        'have been to = เคยไปแล้วกลับมาแล้ว | have gone to = ไปแล้วยังไม่กลับมา',
        'Have + I / You / We / They | Has + He / She / It',
        'ห้ามใช้คำระบุเวลาอดีตเจาะจง (yesterday, ago) กับ Present Perfect'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_pp_1',
          question: 'We have lived in Bangkok [ ? ] ten years.',
          options: ['for', 'since', 'during', 'ago'],
          correctAnswer: 'for',
          explanation: '"ten years" เป็นระยะเวลา (Duration) จึงต้องใช้คู่กับ "for"',
          tip: '💡 for + จำนวนเวลา | since + จุดเริ่มเวลา'
        }
      ]
    },

    m1_comparatives_superlatives: {
      id: 'm1_comparatives_superlatives',
      subject: 'english',
      title: 'Comparatives & Superlatives (การเปรียบเทียบขั้นกว่า-ขั้นสุด)',
      subtitle: 'การเปลี่ยนรูปคำคุณศัพท์และกริยาวิเศษณ์, โครงสร้าง as...as, และคำเปลี่ยนรูปพิเศษ',
      emoji: '⚖️',
      secretFormula: {
        name: 'กฎการเปรียบเทียบคำคุณศัพท์ (Degrees of Comparison)',
        concept: 'ขั้นเท่า (as...as) | ขั้นกว่า (-er / more...than) | ขั้นสุด (the -est / the most...)',
        steps: [
          '⚡ คำ 1 พยางค์: เติม -er / the -est (เช่น tall ➔ taller ➔ the tallest)',
          '⚡ คำลงท้าย y: เปลี่ยน y เป็น i แล้วเติม -er / the -est (เช่น happy ➔ happier ➔ the happiest)',
          '⚡ คำ 2-3 พยางค์ขึ้นไป: ใช้ more...than / the most... (เช่น beautiful ➔ more beautiful ➔ the most beautiful)',
          '⚡ คำเปลี่ยนรูปพิเศษ: good ➔ better ➔ the best | bad ➔ worse ➔ the worst | far ➔ farther/further ➔ the farthest'
        ]
      },
      summaryPoints: [
        'ขั้นเท่า: as + Adjective/Adverb รูปเดิม + as (เช่น as tall as)',
        'ขั้นสุดต้องมี "the" นำหน้าเสมอ',
        'โครงสร้าง The more..., the more... (ยิ่ง...ก็ยิ่ง...)'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_comp_1',
          question: 'This movie is [ ? ] than the one we watched last week.',
          options: ['more exciting', 'most exciting', 'excitinger', 'as exciting'],
          correctAnswer: 'more exciting',
          explanation: 'exciting เป็นคำ 3 พยางค์ และมีคำว่า "than" แสดงขั้นกว่า จึงต้องใช้ "more exciting"',
          tip: '💡 มี than ➔ ใช้ more หรือคำลงท้าย -er'
        }
      ]
    },

    m1_modal_verbs: {
      id: 'm1_modal_verbs',
      subject: 'english',
      title: 'Modal Auxiliaries (กริยาช่วยบอกความสามารถและข้อบังคับ)',
      subtitle: 'Can/Could, May/Might, Must/Have to, Should/Ought to และกฎตามด้วย V.inf',
      emoji: '🔑',
      secretFormula: {
        name: 'กฎทองของ Modal Verbs',
        concept: 'Modal Verb ทุกตัวต้องตามด้วย กริยาช่องเดิมไม่ผัน (V.infinitive without to) เสมอ!',
        steps: [
          '⚡ ความสามารถ: can (ปัจจุบัน), could (อดีต)',
          '⚡ ความเป็นไปได้/ขออนุญาต: may (สุภาพ), might (เป็นไปได้น้อย)',
          '⚡ ข้อบังคับ/จำเป็น: must (ต้องทำ/กฎเหล็ก), have to (จำเป็นต้องทำ)',
          '⚡ คำแนะนำ: should / ought to (ควรจะทำ)'
        ]
      },
      summaryPoints: [
        'ห้ามเติม -s, -ed, -ing ที่ตัว Modal Verb และตัวกริยาตามหลังเด็ดขาด เช่น She can swims (ผิด ❌) ➔ She can swim (ถูก ✔️)',
        'Must not (ห้ามทำเด็ดขาด) vs Don\'t have to (ไม่ต้องทำก็ได้ ไม่ได้บังคับ)',
        'Could you please... ใช้ขอร้องอย่างสุภาพ'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_mod_1',
          question: 'You [ ? ] stop when the traffic light turns red. It is the law.',
          options: ['must', 'might', 'should', 'could'],
          correctAnswer: 'must',
          explanation: 'กฎหมายหรือข้อบังคับที่ต้องปฏิบัติตามอย่างเคร่งครัด ใช้ "must"',
          tip: '💡 กฎหมาย/ข้อบังคับเคร่งครัด = must'
        }
      ]
    },

    m1_relative_clauses: {
      id: 'm1_relative_clauses',
      subject: 'english',
      title: 'Relative Pronouns & Clauses (ประธานเชื่อมประโยค)',
      subtitle: 'การใช้ Who (คน-ประธาน), Whom (คน-กรรม), Whose (แสดงเจ้าของ), Which/That (สิ่งของ) และ Where (สถานที่)',
      emoji: '🔗',
      secretFormula: {
        name: 'ตารางเลือก Relative Pronouns ภายใน 2 วินาที',
        concept: 'ดูสิ่งที่อยู่ข้างหน้า และหน้าที่ในประโยคย่อย',
        steps: [
          '⚡ คน + [Who] + กริยา (เช่น The boy who is running)',
          '⚡ คน + [Whom] + ประธาน + กริยา (เช่น The man whom I met)',
          '⚡ คน/สัตว์ + [Whose] + คำนาม (แสดงความเป็นเจ้าของ เช่น The girl whose bag was stolen)',
          '⚡ สิ่งของ/สัตว์ + [Which / That] + ประโยค (เช่น The book which I bought)',
          '⚡ สถานที่ + [Where] + ประโยคสมบูรณ์ (เช่น The school where I study)'
        ]
      },
      summaryPoints: [
        'That ใช้แทน Who หรือ Which ได้ใน Defining Relative Clause ทั่วไป',
        'หลังเครื่องหมายจุลภาค (Comma , ) ห้ามใช้ That เด็ดขาด (ต้องใช้ which หรือ who)',
        'Whose ต้องตามด้วยคำนามเสมอ (Whose + Noun)'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_rel_1',
          question: 'The teacher [ ? ] taught us mathematics last year has moved to another school.',
          options: ['who', 'whom', 'which', 'whose'],
          correctAnswer: 'who',
          explanation: 'ข้างหน้าเป็นคน (The teacher) และทำหน้าที่เป็นประธานของกริยา taught จึงใช้ "who"',
          tip: '💡 คน + กริยา ➔ ใช้ who'
        }
      ]
    },

    m1_advanced_passive: {
      id: 'm1_advanced_passive',
      subject: 'english',
      title: 'Passive Voice across Multiple Tenses (ประโยคถูกกระทำ)',
      subtitle: 'โครงสร้าง Subject + Verb to be + V.3 ใน Present, Past, Future และ Modals',
      emoji: '🛡️',
      secretFormula: {
        name: 'สูตรแปลงประโยค Active เป็น Passive Voice',
        concept: 'เอากรรมมาเป็นประธาน + ผัน Verb to be ตาม Tense + กริยาช่อง 3 (V.3) + by ผู้กระทำ',
        steps: [
          '⚡ Present Simple Passive: S + is/am/are + V.3 (เช่น English is spoken worldwide.)',
          '⚡ Past Simple Passive: S + was/were + V.3 (เช่น The telephone was invented by Bell.)',
          '⚡ Future Passive: S + will be + V.3 (เช่น The bridge will be built next year.)',
          '⚡ Modals Passive: S + can/must/should + be + V.3 (เช่น Rules must be followed.)'
        ]
      },
      summaryPoints: [
        'เน้น "ผู้ถูกกระทำ" หรือเมื่อไม่ทราบแน่ชัดว่าใครเป็นผู้กระทำ',
        'ถ้าประธานเดิมเป็น Pronoun เมื่ออยู่หลัง by ต้องเปลี่ยนเป็น Object Pronoun (by him, by them)',
        'Intransitive verbs (กริยาที่ไม่ต้องการกรรม เช่น sleep, die, happen, arrive) ทำเป็น Passive ไม่ได้'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_pass_1',
          question: 'The famous novel Harry Potter [ ? ] by J.K. Rowling in 1997.',
          options: ['was written', 'wrote', 'is written', 'has written'],
          correctAnswer: 'was written',
          explanation: 'ประธานเป็นหนังสือ (Harry Potter) ซึ่งถูกเขียนในอดีต (in 1997) โครงสร้าง Past Simple Passive คือ was/were + V.3 ➔ was written',
          tip: '💡 ประธานเป็นสิ่งของถูกกระทำในอดีต ➔ was/were + V.3'
        }
      ]
    },

    m1_conditionals_type1_2: {
      id: 'm1_conditionals_type1_2',
      subject: 'english',
      title: 'Second Conditional Sentences (สมมติในปัจจุบัน)',
      subtitle: 'โครงสร้าง If + V.2, would + V.inf และการใช้ Were กับทุกประธาน',
      emoji: '🔮',
      secretFormula: {
        name: 'สูตรประโยคสมมติขั้นที่ 2 (Unreal Present)',
        concept: 'สมมติเรื่องที่ไม่จริงในปัจจุบัน หรือเป็นไปได้ยากมาก',
        steps: [
          '⚡ โครงสร้าง: If + Subject + V.2 (Past Simple), Subject + would / could + V.inf',
          '⚡ กฎพิเศษ: ในภาษาอังกฤษมาตรฐาน นิยมใช้ were กับประธานทุกตัวในช่อง If เช่น If I were you, If he were rich'
        ]
      },
      summaryPoints: [
        'Type 1 (จริงในอนาคต): If + V.1, will + V.inf (เช่น If it rains, I will stay home.)',
        'Type 2 (สมมติไม่จริงในปัจจุบัน): If + V.2, would + V.inf (เช่น If I won the lottery, I would buy a house.)'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_c2_1',
          question: 'If I [ ? ] a bird, I would fly around the world.',
          options: ['were', 'am', 'was', 'have been'],
          correctAnswer: 'were',
          explanation: 'ประโยคนี้เป็น Second Conditional (สมมติเรื่องที่ไม่เป็นจริง) ในภาษาอังกฤษมาตรฐานส่วน If clause ใช้ "were" กับประธานทุกตัว (If I were...)',
          tip: '💡 สมมติสิ่งที่เป็นไปไม่ได้ในปัจจุบัน ใช้ If + were เสมอ'
        }
      ]
    },

    m1_context_clues_reading: {
      id: 'm1_context_clues_reading',
      subject: 'english',
      title: 'Context Clues & Academic Reading Comprehension',
      subtitle: 'เทคนิคเดาความหมายศัพท์จากบริบท 4 ชนิด, Main Idea และ Inference',
      emoji: '📖',
      secretFormula: {
        name: '4 สัญญาณเดาศัพท์จากบริบท (Context Clue Detectors)',
        concept: 'Definition, Synonym, Contrast/Antonym, และ Cause-Effect',
        steps: [
          '⚡ สัญญาณนิยาม (Definition): is, means, refers to, that is (เช่น Carnivores, that is, meat-eating animals...)',
          '⚡ สัญญาณความหมายเหมือน (Synonym): or, also known as, similarly',
          '⚡ สัญญาณตรงข้าม (Contrast): but, however, although, while, unlike (ช่วยให้รู้ว่าคำนี้ตรงข้ามกับคำที่เรารู้จัก)',
          '⚡ สัญญาณเหตุผล (Cause & Effect): because, since, therefore, so that'
        ]
      },
      summaryPoints: [
        'Main Idea (ใจความสำคัญ): มักอยู่ที่ประโยคแรก (Topic Sentence) หรือประโยคสรุปสุดท้ายของย่อหน้า',
        'Inference (การอนุมาน): การสรุปความจริงที่ผู้เขียนไม่ได้บอกตรงๆ แต่อาศัยหลักฐานในเนื้อเรื่อง',
        'Pronoun Reference: ถามว่า it, they, this หมายถึงคำนามตัวใด ให้ย้อนดูคำนามที่กล่าวก่อนหน้า'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_read_1',
          question: 'Read the sentence: "Unlike his gregarious brother who loves meeting new people, Mark is quiet and shy." What does "gregarious" mean?',
          options: ['Outgoing and sociable', 'Angry and rude', 'Lazy and sleepy', 'Sad and lonely'],
          correctAnswer: 'Outgoing and sociable',
          explanation: 'คำว่า "Unlike" (ไม่เหมือนกับ) บอกสัญญาณตรงข้าม Mark เป็นคนเงียบและขี้อาย (quiet and shy) ดังนั้นพี่ชายที่เป็นคน "gregarious" จึงต้องตรงข้ามกัน คือเป็นคนชอบเข้าสังคม (Outgoing and sociable)',
          tip: '💡 คำว่า "Unlike" บอกว่าคำข้างหน้าตรงข้ามกับคำข้างหลัง'
        }
      ]
    },

    m1_daily_vocab_collocations: {
      id: 'm1_daily_vocab_collocations',
      subject: 'english',
      title: 'คำศัพท์ชีวิตประจำวัน & กลุ่มคำใช้บ่อย (Daily Life & Collocations)',
      subtitle: 'Oxford 3000 คำศัพท์กิจวัตรประจำวัน, การเลือกใช้ Make vs Do, กริยาวลี (Phrasal Verbs) และสำนวนพูด',
      emoji: '☕',
      secretFormula: {
        name: 'กฎการเลือกใช้ Make vs Do และ Daily Collocations',
        concept: 'Make = สร้างสรรค์/ประดิษฐ์ขึ้นมาใหม่ (Create) | Do = การกระทำ/งาน/หน้าที่ (Action & Duty)',
        steps: [
          '⚡ DO + งาน/หน้าที่/กิจกรรม: do homework (ทำการบ้าน), do housework (ทำงานบ้าน), do dishes (ล้างจาน), do the laundry (ซักผ้า), do business (ทำธุรกิจ)',
          '⚡ MAKE + การผลิต/สร้างสิ่งใหม่: make a cake (ทำเค้ก), make a decision (ตัดสินใจ), make a mistake (ทำผิด), make a phone call (โทรศัพท์), make money (หาเงิน), make friends (ผูกมิตร)',
          '⚡ กริยาวลีในชีวิตประจำวัน (Daily Phrasal Verbs): wake up (ตื่นตา), get up (ลุกจากเตียง), look after (ดูแล), take off (ถอดเสื้อ/เครื่องบินขึ้น), put off (เลื่อนเวลา), give up (ยอมแพ้)'
        ]
      },
      summaryPoints: [
        'หมวดการเดินทางและบอกทาง: go straight (ตรงไป), turn left/right (เลี้ยวซ้าย/ขวา), opposite (ตรงข้าม), pedestrian crossing (ทางม้าลาย)',
        'หมวดสุขภาพและความเจ็บป่วย: have a headache (ปวดหัว), have a sore throat (เจ็บคอ), catch a cold (เป็นหวัด), feel dizzy (เวียนหัว)',
        'หมวดช้อปปิ้งและร้านอาหาร: How much does it cost? (ราคาเท่าไร), Can I have the bill/check? (เก็บเงิน), keep the change (ไม่ต้องทอน)'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_daily_1',
          question: 'Every morning before leaving for school, I always [ ? ] my bed and [ ? ] my homework check.',
          options: ['make / do', 'do / make', 'make / make', 'do / do'],
          correctAnswer: 'make / do',
          explanation: 'การเก็บที่นอนเป็นสำนวนคู่กับ make (make the bed) ส่วนการทำการบ้านเป็นหน้าที่ใช้ do (do homework) ดังนั้นจึงเป็น "make / do"',
          tip: '💡 จำคู่คำ: make the bed (เก็บที่นอน) & do homework (ทำการบ้าน)'
        },
        {
          id: 'q_m1_daily_2',
          question: 'The flight to London was delayed because of the storm, so they had to [ ? ] the meeting until tomorrow.',
          options: ['put off', 'look after', 'take off', 'give up'],
          correctAnswer: 'put off',
          explanation: '"put off" แปลว่า เลื่อนเวลาออกไป (postpone), "look after" = ดูแล, "take off" = เครื่องบินขึ้น/ถอดเสื้อ, "give up" = ยอมแพ้',
          tip: '💡 put off = postpone = เลื่อนเวลา'
        }
      ]
    }
  },

  // =========================================================================
  // 🇹🇭 4. THAI M.1 ADVANCED (ภาษาไทย ม.1 Advance สพฐ. 2560)
  // =========================================================================
  thai: {
    m1_nirat_phukhaothong: {
      id: 'm1_nirat_phukhaothong',
      subject: 'thai',
      title: 'วรรณคดี ม.1: นิราศภูเขาทอง (สุนทรภู่)',
      subtitle: 'ถอดคำประพันธ์บทเด่น, โวหารภาพพจน์, คติธรรมเรื่องการพูด (คำพูดสะท้อนตัวตน) และประวัติวรรณคดี',
      emoji: '📜',
      secretFormula: {
        name: 'ถอดรหัสบทกลอนอมตะสุนทรภู่',
        concept: '"ถึงบางพูดพูดดีเป็นศรีศักดิ์ มีคนรักรสถ้อยอร่อยจิต แม้นพูดชั่วตัวตายทำลายมิตร จะชอบผิดในมนุษย์เพราะพูดจา"',
        steps: [
          '⚡ นิราศ = บทประพันธ์ที่แต่งขึ้นระหว่างการเดินทางเพื่อรำพึงรำพันถึงนางอันเป็นที่รัก หรือแสดงความอาลัย',
          '⚡ แต่งด้วย "กลอนนิราศ" (ขึ้นต้นด้วยวรรครับ และจบลงด้วยคำว่า "เอย")',
          '⚡ จุดเด่น: ใช้สัมผัสในแพรวพราว สะท้อนวิถีชีวิตริมแม่น้ำเจ้าพระยาสมัยรัชกาลที่ 3'
        ]
      },
      summaryPoints: [
        'สุนทรภู่เดินทางไปนมัสการเจดีย์ภูเขาทองที่จังหวัดพระนครศรีอยุธยา โดยมีหนูพัด (บุตรชาย) ร่วมเดินทางไปด้วย',
        'คติธรรมสำคัญ: ความไม่เที่ยงแท้ของชีวิต และการระมัดระวังคำพูด (พูดดีมีคนรัก พูดชั่วทำลายตน)',
        'เจดีย์ภูเขาทองสร้างขึ้นในสมัยสมเด็จพระราเมศวร และพระเจ้าหงสาวดีบุเรงนองทรงสร้างเจดีย์แบบมอญครอบไว้'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_nirat_1',
          question: '"ถึงบางพูดพูดดีเป็นศรีศักดิ์ มีคนรักรสถ้อยอร่อยจิต แม้นพูดชั่วตัวตายทำลายมิตร จะชอบผิดในมนุษย์เพราะพูดจา" บทกลอนนี้ให้คติเตือนใจในเรื่องใด?',
          options: ['การระมัดระวังในการพูดจา', 'การเลือกถิ่นที่อยู่อาศัย', 'การเดินทางทางเรือ', 'การคบค้าสมาคมกับคนแปลกหน้า'],
          correctAnswer: 'การระมัดระวังในการพูดจา',
          explanation: 'บทกลอนนี้สอนเรื่อง "การใช้คำพูด" ว่าการพูดดีจะนำเกียรติยศและความรักมาให้ ส่วนการพูดชั่วจะทำลายมิตรภาพและนำภัยมาสู่ตน',
          tip: '💡 เน้นย้ำเรื่อง: พูดดีเป็นศรีศักดิ์'
        }
      ]
    },

    m1_kapyani11_metrics: {
      id: 'm1_kapyani11_metrics',
      subject: 'thai',
      title: 'ฉันทลักษณ์กาพย์ยานี ๑๑ & สุภาษิตพระร่วง',
      subtitle: 'ผังกาพย์ยานี 11 (หน้า 5 หลัง 6), สัมผัสระหว่างวรรค/บท และการถอดความสุภาษิตพระร่วง',
      emoji: '✍️',
      secretFormula: {
        name: 'กฎเหล็กผังกาพย์ยานี ๑๑ (หน้า 5 หลัง 6 รวมเป็น 11 คำ)',
        concept: 'วรรคหน้า ๕ คำ วรรคหลัง ๖ คำ | คำสุดท้ายวรรคหน้า สัมผัสคำที่ ๓ ของวรรคหลัง',
        steps: [
          '⚡ ๑ บทมี ๒ บาท (บาทเอก และ บาทโท) รวมมี ๔ วรรค (วรรคละ ๕ และ ๖ คำ)',
          '⚡ สัมผัสบังคับ: คำสุดท้ายของวรรคที่ ๑ สัมผัสกับ คำที่ ๓ (หรือ ๑-๒) ของวรรคที่ ๒',
          '⚡ คำสุดท้ายของวรรคที่ ๒ สัมผัสกับ คำสุดท้ายของวรรคที่ ๓',
          '⚡ สัมผัสระหว่างบท: คำสุดท้ายของวรรคที่ ๔ (บทแรก) สัมผัสกับ คำสุดท้ายของวรรคที่ ๒ (บทถัดไป)'
        ]
      },
      summaryPoints: [
        'สุภาษิตพระร่วง เป็นวรรณคดีคำสอนโบราณสมัยสุโขทัย แต่งด้วยร่ายสุภาพ',
        'คำสอนเด่น: "เมื่อน้อยให้เรียนวิชา ให้หาสินเมื่อใหญ่", "คนล้มอย่าข้าม", "เพื่อนกินหาง่าย เพื่อนตายหายาก"',
        'กาพย์ยานี 11 นิยมใช้แต่งบรรยายเรื่องราว เช่น กาพย์เห่เรือ กาพย์พระไชยสุริยา'
      ],
      practiceQuestions: [
        {
          id: 'q_m1_kap_1',
          question: 'กาพย์ยานี ๑๑ ใน ๑ บาท มีจำนวนคำรวมกันทั้งหมดกี่คำ?',
          options: ['๑๑ คำ (หน้า ๕ หลัง ๖)', '๒๒ คำ (หน้า ๑๑ หลัง ๑๑)', '๑๖ คำ (หน้า ๘ หลัง ๘)', '๑๒ คำ (หน้า ๖ หลัง ๖)'],
          correctAnswer: '๑๑ คำ (หน้า ๕ หลัง ๖)',
          explanation: 'กาพย์ยานี ๑๑ ใน ๑ บาท ประกอบด้วย ๒ วรรค (วรรคหน้า ๕ คำ + วรรคหลัง ๖ คำ) รวมเป็น ๑๑ คำพอดี',
          tip: '💡 ท่องจำ: กาพย์ยานี 11 = หน้า 5 หลัง 6 รวม 11 คำต่อบาท'
        }
      ]
    }
  }
}
