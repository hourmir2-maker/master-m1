export interface LessonData {
  id: string
  subject: 'math' | 'science' | 'english'
  title: string
  subtitle: string
  emoji: string
  secretFormula: {
    name: string
    concept: string
    steps: string[]
  }
  summaryPoints: string[]
  practiceQuestions: {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }[]
}

export const LESSONS_DATA: Record<string, Record<string, LessonData>> = {
  math: {
    numbers_basics: {
      id: 'numbers_basics',
      subject: 'math',
      title: 'ตัวเลขและการดำเนินการ & ห.ร.ม./ค.ร.น.',
      subtitle: 'เทคนิคหา ห.ร.ม. ค.ร.น. ไวใน 15 วินาที และการแก้โจทย์ปัญหาระฆัง/จัดของ',
      emoji: '🔢',
      secretFormula: {
        name: 'สูตรลับ "ตั้งหารสั้นแบบขนาน & ผลคูณสองจำนวน"',
        concept: 'สำหรับจำนวนนับ 2 จำนวน a และ b: a × b = ห.ร.ม.(a,b) × ค.ร.น.(a,b)',
        steps: [
          'หา ห.ร.ม. : ต้องหารลงตัว "ทุกจำนวนพร้อมกัน" เท่านั้น แล้วนำตัวหารด้านหน้ามาคูณกัน',
          'หา ค.ร.น. : หารลงตัวอย่างน้อย 2 จำนวน แล้วนำตัวหารด้านหน้า "คูณกับเศษที่เหลือทั้งหมดรูปตัว L"',
          'โจทย์ "จัดของใส่ถุงให้ได้มากที่สุดโดยไม่ปนกัน" = ใช้ ห.ร.ม.',
          'โจทย์ "ระฆังดังพร้อมกัน / วิ่งรอบสนามมาเจอกันอีกครั้ง" = ใช้ ค.ร.น.'
        ]
      },
      summaryPoints: [
        'ลำดับการคิดคำนวณ (Order of Operations): วงเล็บ → ยกกำลัง → คูณ/หาร (จากซ้ายไปขวา) → บวก/ลบ (จากซ้ายไปขวา)',
        'จำนวนเฉพาะ 1-50 ที่ออกสอบบ่อย: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 (มี 15 ตัว)',
        'เลข 2 เป็นจำนวนเฉพาะที่เป็นเลขคู่เพียงตัวเดียว'
      ],
      practiceQuestions: [
        {
          id: 'm_nb_1',
          question: 'ระฆัง 3 ใบ ตีทุกๆ 12 นาที, 18 นาที และ 24 นาที ถ้าเริ่มตีพร้อมกันเวลา 08:00 น. ระฆังจะตีพร้อมกันอีกครั้งในเวลาใด?',
          options: ['08:48 น.', '09:12 น.', '09:20 น.', '09:30 น.'],
          correctAnswer: '09:12 น.',
          explanation: 'หา ค.ร.น. ของ 12, 18, 24 = 72 นาที (1 ชั่วโมง 12 นาที) นำไปบวกกับ 08:00 น. จะได้ 09:12 น.'
        },
        {
          id: 'm_nb_2',
          question: 'ผลคูณของสองจำนวนเป็น 720 ถ้า ห.ร.ม. ของสองจำนวนนี้คือ 6 แล้ว ค.ร.น. ของสองจำนวนนี้มีค่าเท่าใด?',
          options: ['60', '120', '180', '240'],
          correctAnswer: '120',
          explanation: 'ใช้สูตร a × b = ห.ร.ม. × ค.ร.น. จะได้ 720 = 6 × ค.ร.น. ดังนั้น ค.ร.น. = 720 ÷ 6 = 120'
        }
      ]
    },
    fractions_decimals: {
      id: 'fractions_decimals',
      subject: 'math',
      title: 'เศษส่วน ทศนิยม และร้อยละ',
      subtitle: 'คิดเลขเร็วเรื่องกำไร-ขาดทุน และการแปลงเศษส่วนซ้อน',
      emoji: '½',
      secretFormula: {
        name: 'สูตรลับ "บัญญัติไตรยางศ์ร้อยละ 1 บรรทัด"',
        concept: 'เทียบสิ่งที่โจทย์ต้องการกับ 100% เสมอ',
        steps: [
          'กำไร 20% หมายถึง ทุน 100 ขาย 120 (ราคาขาย = ทุน × 1.20)',
          'ลดราคา 15% หมายถึง ติดป้าย 100 ขาย 85 (ราคาขาย = ป้าย × 0.85)',
          'การหารเศษส่วน: เปลี่ยนหารเป็นคูณ แล้วกลับเศษเป็นส่วนตัวหลังเสมอ'
        ]
      },
      summaryPoints: [
        'เศษส่วนที่ควรจำ: 1/4 = 0.25 (25%), 1/2 = 0.5 (50%), 3/4 = 0.75 (75%), 1/5 = 0.2 (20%), 1/8 = 0.125 (12.5%)',
        'การบวกลบเศษส่วนต้องทำส่วนให้เท่ากันโดยใช้ ค.ร.น.'
      ],
      practiceQuestions: [
        {
          id: 'm_fd_1',
          question: 'ซื้อเสื้อมา 400 บาท ติดป้ายขายเอากำไร 30% แต่ต่อมาลดราคาให้ผู้ซื้อ 10% จากป้าย จะขายเสื้อได้ในราคากี่บาท?',
          options: ['468 บาท', '480 บาท', '500 บาท', '520 บาท'],
          correctAnswer: '468 บาท',
          explanation: 'ติดป้าย = 400 × 1.30 = 520 บาท จากนั้นลด 10% = 520 × 0.90 = 468 บาท'
        }
      ]
    },
    algebra_intro: {
      id: 'algebra_intro',
      subject: 'math',
      title: 'พีชคณิตและสมการตัวแปรเดียว',
      subtitle: 'เทคนิคตราชั่ง ย้ายข้างเปลี่ยนเครื่องหมาย และโจทย์ปัญหาอายุ',
      emoji: '✏️',
      secretFormula: {
        name: 'สูตรลับ "ตารางอายุ 3 ยุค (อดีต-ปัจจุบัน-อนาคต)"',
        concept: 'ความต่างของอายุคนสองคนจะ "เท่ากันเสมอ" ไม่ว่าจะผ่านไปกี่ปี',
        steps: [
          'กำหนดตัวแปร x ให้กับสิ่งที่โจทย์ถามหรือคนที่อายุน้อยกว่า',
          'สร้างตาราง: อดีต (-n ปี) | ปัจจุบัน (x) | อนาคต (+m ปี)',
          'ตั้งสมการตามเงื่อนไขที่โจทย์บอกแล้วย้ายข้างหาค่า x'
        ]
      },
      summaryPoints: [
        'ย้ายข้างสมการ: จากบวกย้ายไปลบ, จากลบย้ายไปบวก, จากคูณย้ายไปหาร, จากหารย้ายไปคูณ',
        'กระจายเครื่องหมายลบหน้าวงเล็บ ต้องเปลี่ยนเครื่องหมายทุกพจน์ในวงเล็บ'
      ],
      practiceQuestions: [
        {
          id: 'm_alg_1',
          question: 'ปัจจุบันพ่อมีอายุเป็น 3 เท่าของลูก อีก 10 ปีข้างหน้า พ่อจะมีอายุเป็น 2 เท่าของลูก ปัจจุบันลูกมีอายุกี่ปี?',
          options: ['10 ปี', '12 ปี', '15 ปี', '20 ปี'],
          correctAnswer: '10 ปี',
          explanation: 'ให้ลูกปัจจุบัน = x ปี, พ่อ = 3x ปี อีก 10 ปี: (3x + 10) = 2(x + 10) → 3x + 10 = 2x + 20 → x = 10 ปี'
        }
      ]
    },
    geometry: {
      id: 'geometry',
      subject: 'math',
      title: 'เรขาคณิต พื้นที่ และปริมาตร',
      subtitle: 'ตัดแปะหาพื้นที่แรเงา และสูตรมุมภายในรูปหลายเหลี่ยม',
      emoji: '📐',
      secretFormula: {
        name: 'สูตรลับ "มุมภายใน (n - 2) × 180° & เทคนิคตัดแปะรูป"',
        concept: 'ผลรวมมุมภายในของรูป n เหลี่ยม = (n - 2) × 180 องศา',
        steps: [
          'รูปสามเหลี่ยม = 180°, รูปสี่เหลี่ยม = 360°, รูปห้าเหลี่ยม = 540°',
          'พื้นที่ใบไม้ในสี่เหลี่ยมจัตุรัสยาว a = 4/7 × a²',
          'พื้นที่วงกลม = πr², เส้นรอบวง = 2πr (ใช้ π ≈ 22/7 หรือ 3.14)'
        ]
      },
      summaryPoints: [
        'พื้นที่สามเหลี่ยม = 1/2 × ฐาน × สูง',
        'พื้นที่สี่เหลี่ยมคางหมู = 1/2 × ผลบวกด้านคู่ขนาน × สูง',
        'ปริมาตรทรงสี่เหลี่ยมมุมฉาก = กว้าง × ยาว × สูง'
      ],
      practiceQuestions: [
        {
          id: 'm_geo_1',
          question: 'รูปหกเหลี่ยมด้านเท่ามุมเท่า มีขนาดของแต่ละมุมภายในกี่องศา?',
          options: ['108°', '120°', '135°', '140°'],
          correctAnswer: '120°',
          explanation: 'ผลรวมมุมภายใน = (6 - 2) × 180° = 720° หาร 6 มุม จะได้มุมละ 720° ÷ 6 = 120°'
        }
      ]
    },
    statistics: {
      id: 'statistics',
      subject: 'math',
      title: 'สถิติ แผนภูมิ และความน่าจะเป็น',
      subtitle: 'การอ่านแผนภูมิวงกลมและหาความน่าจะเป็น',
      emoji: '📊',
      secretFormula: {
        name: 'สูตรลับ "360 องศา = 100% ในแผนภูมิวงกลม"',
        concept: '1% คิดเป็น 3.6 องศา เสมอ',
        steps: [
          'แปลง % เป็นองศา: นำ % คูณด้วย 3.6',
          'แปลงองศาเป็น %: นำ องศา หารด้วย 3.6',
          'ความน่าจะเป็น P(E) = จำนวนเหตุการณ์ที่สนใจ n(E) ÷ จำนวนเหตุการณ์ทั้งหมด n(S)'
        ]
      },
      summaryPoints: [
        'ค่าเฉลี่ยเลขคณิต = ผลรวมของข้อมูลทั้งหมด ÷ จำนวนข้อมูล',
        'มัธยฐาน = ค่าที่อยู่ตรงกลางเมื่อเรียงข้อมูลจากน้อยไปมาก'
      ],
      practiceQuestions: [
        {
          id: 'm_stat_1',
          question: 'ทอดลูกเต๋า 1 ลูก 1 ครั้ง ความน่าจะเป็นที่จะได้แต้มที่เป็นจำนวนเฉพาะคือเท่าใด?',
          options: ['1/6', '1/3', '1/2', '2/3'],
          correctAnswer: '1/2',
          explanation: 'แต้มที่เป็นจำนวนเฉพาะคือ 2, 3, 5 (3 จำนวน) จากแต้มทั้งหมด 1, 2, 3, 4, 5, 6 (6 จำนวน) ดังนั้น P = 3/6 = 1/2'
        }
      ]
    }
  },
  science: {
    living_things: {
      id: 'living_things',
      subject: 'science',
      title: 'สิ่งมีชีวิต พืช สัตว์ และระบบนิเวศ',
      subtitle: 'เซลล์พืช vs เซลล์สัตว์, การสังเคราะห์ด้วยแสง และพีระมิดพลังงาน',
      emoji: '🌱',
      secretFormula: {
        name: 'สูตรลับ "กฎ 10% พลังงาน & เช็คลิสต์ออร์แกเนลล์"',
        concept: 'พลังงานจะถ่ายทอดไปสู่ผู้บริโภคลำดับถัดไปเพียง 10% เท่านั้น ส่วนอีก 90% สูญเสียไปในรูปความร้อน',
        steps: [
          'เซลล์พืชมี: ผนังเซลล์ (Cell Wall) + คลอโรพลาสต์ (Chloroplast) ที่เซลล์สัตว์ไม่มี',
          'สมการสังเคราะห์ด้วยแสง: น้ำ + คาร์บอนไดออกไซด์ + แสง + คลอโรฟิลล์ → น้ำตาลกลูโคส + ออกซิเจน + น้ำ',
          'สารชีวโมเลกุลสะสมในพืชจะเก็บในรูป "แป้ง" (ทดสอบด้วยสารละลายไอโอดีน ได้สีน้ำเงินเข้ม)'
        ]
      },
      summaryPoints: [
        'ปากใบ (Stomata) ทำหน้าที่คายน้ำและแลกเปลี่ยนก๊าซ อยู่บริเวณท้องใบมากที่สุด',
        'ผู้ผลิต (Producer) เป็นจุดเริ่มต้นของห่วงโซ่อาหารเสมอ'
      ],
      practiceQuestions: [
        {
          id: 's_lt_1',
          question: 'หากนำพืชไปทดสอบแป้งด้วยสารละลายไอโอดีน ใบพืชที่ได้รับแสงแดดจะเปลี่ยนเป็นสีใด?',
          options: ['สีส้มอิฐ', 'สีม่วงน้ำเงินเข้ม', 'สีแดงสด', 'ไม่มีการเปลี่ยนสี'],
          correctAnswer: 'สีม่วงน้ำเงินเข้ม',
          explanation: 'แป้งทำปฏิกิริยากับสารละลายไอโอดีนเปลี่ยนจากสีน้ำตาลเหลืองเป็นสีม่วงน้ำเงินเข้ม'
        }
      ]
    },
    matter_properties: {
      id: 'matter_properties',
      subject: 'science',
      title: 'สารบริสุทธิ์ สารผสม และการแยกสาร',
      subtitle: 'วิธีเลือกเทคนิคแยกสารให้ถูกโจทย์ และการทดสอบกรด-เบส',
      emoji: '⚗️',
      secretFormula: {
        name: 'สูตรลับ "Flowchart การเลือกวิธีแยกสาร"',
        concept: 'เลือกวิธีแยกสารจาก "สมบัติทางกายภาพที่แตกต่างกัน"',
        steps: [
          'ของแข็งไม่ละลายในของเหลว → ใช้ "การกรอง"',
          'ของแข็งละลายในของเหลว → ใช้ "การระเหยแห้ง" หรือ "การตกผลึก"',
          'ของเหลวผสมของเหลว จุดเดือดต่างกันมาก → ใช้ "การกลั่นอย่างง่าย"',
          'สารสีผสมกันหลายชนิด → ใช้ "โครมาโทกราฟี" (สารที่ละลายดีและถูกดูดซับน้อยจะเคลื่อนที่ได้ไกลที่สุด)'
        ]
      },
      summaryPoints: [
        'กรด (pH < 7): เปลี่ยนลิตมัสจาก น้ำเงิน → แดง, กัดกร่อนโลหะได้ก๊าซไฮโดรเจน',
        'เบส (pH > 7): เปลี่ยนลิตมัสจาก แดง → น้ำเงิน, ลื่นมือ ทำปฏิกิริยากับไขมันได้สบู่'
      ],
      practiceQuestions: [
        {
          id: 's_mp_1',
          question: 'หากต้องการแยกสารสกัดสีจากใบไม้เพื่อตรวจดูว่ามีสารสีใดผสมอยู่บ้าง ควรใช้วิธีใดเหมาะสมที่สุด?',
          options: ['การกลั่นลำดับส่วน', 'การตกผลึก', 'โครมาโทกราฟี', 'การกรองด้วยกระดาษกรอง'],
          correctAnswer: 'โครมาโทกราฟี',
          explanation: 'โครมาโทกราฟีเหมาะที่สุดสำหรับการแยกสารสีที่มีปริมาณน้อยและมีจุดเดือดหรือการละลายต่างกันเล็กน้อย'
        }
      ]
    },
    force_motion: {
      id: 'force_motion',
      subject: 'science',
      title: 'แรง การเคลื่อนที่ และความดัน',
      subtitle: 'สามเหลี่ยม F=ma, แรงพยุงของเหลว และโมเมนต์ของแรง',
      emoji: '⚡',
      secretFormula: {
        name: 'สูตรลับ "โมเมนต์ตาม = โมเมนต์ทวน & แรงลอยตัว"',
        concept: 'คานสมดุลเมื่อ ผลรวมโมเมนต์ตามเข็ม = ผลรวมโมเมนต์ทวนเข็ม (M = F × L)',
        steps: [
          'แรงลอยตัว (แรงพยุง) = น้ำหนักของของเหลวที่ถูกวัตถุแทนที่',
          'วัตถุลอยน้ำเมื่อ ความหนาแน่นของวัตถุ < ความหนาแน่นของน้ำ (1 g/cm³)',
          'แรงเสียดทานมีทิศทาง "ตรงข้ามกับการเคลื่อนที่ของวัตถุเสมอ"'
        ]
      },
      summaryPoints: [
        'ความเร็ว = ระยะทาง ÷ เวลา (v = s/t)',
        'ความดันของเหลวขึ้นอยู่กับ ความลึก และ ความหนาแน่นของของเหลว (ยิ่งลึกยิ่งดันมาก)'
      ],
      practiceQuestions: [
        {
          id: 's_fm_1',
          question: 'วัตถุชิ้นหนึ่งมีมวล 200 กรัม ปริมาตร 250 ลูกบาศก์เซนติเมตร เมื่อนำไปหย่อนลงในน้ำบริสุทธิ์ วัตถุนี้จะมีลักษณะอย่างไร?',
          options: ['จมมิดลงสู่ก้นภาชนะ', 'ลอยน้ำโดยมีบางส่วนโผล่เหนือน้ำ', 'ลอยปริ่มน้ำพอดี', 'ละลายรวมกับน้ำ'],
          correctAnswer: 'ลอยน้ำโดยมีบางส่วนโผล่เหนือน้ำ',
          explanation: 'ความหนาแน่นวัตถุ = มวล/ปริมาตร = 200/250 = 0.8 g/cm³ ซึ่งน้อยกว่าน้ำ (1.0 g/cm³) วัตถุจึงลอยน้ำ'
        }
      ]
    },
    energy: {
      id: 'energy',
      subject: 'science',
      title: 'พลังงาน ความร้อน แสง เสียง และไฟฟ้า',
      subtitle: 'การต่อวงจรไฟฟ้าอนุกรม-ขนาน และการเคลื่อนที่ของแสงผ่านเลนส์',
      emoji: '💡',
      secretFormula: {
        name: 'สูตรลับ "เปรียบเทียบวงจรไฟฟ้า อนุกรม vs ขนาน"',
        concept: 'วงจรอนุกรม กระแสเท่ากัน / วงจรขนาน ความต่างศักย์เท่ากัน',
        steps: [
          'วงจรอนุกรม: หลอดใดหลอดหนึ่งดับ หลอดที่เหลือจะดับหมด',
          'วงจรขนาน: หลอดใดหลอดหนึ่งดับ หลอดที่เหลือยังคงสว่าง (เป็นวงจรที่ใช้ตามบ้านเรือน)',
          'การถ่ายโอนความร้อน: การนำ (ของแข็ง) → การพา (ของเหลว/ก๊าซ) → การแผ่รังสี (ไม่ต้องอาศัยตัวกลาง เช่น แสงอาทิตย์)'
        ]
      },
      summaryPoints: [
        'กระจกนูน / เลนส์เว้า: กระจายแสง ได้ภาพเสมือนขนาดเล็กกว่าวัตถุเสมอ',
        'กระจกเว้า / เลนส์นูน: รวมแสง รวมภาพ'
      ],
      practiceQuestions: [
        {
          id: 's_en_1',
          question: 'การต่อหลอดไฟฟ้าในบ้านเรือน นิยมต่อแบบใด เพราะเหตุใด?',
          options: [
            'แบบอนุกรม เพราะประหยัดสายไฟ',
            'แบบขนาน เพราะเมื่อหลอดหนึ่งขาด หลอดอื่นยังคงทำงานได้',
            'แบบอนุกรม เพราะให้แสงสว่างมากกว่า',
            'แบบผสม เพื่อควบคุมแรงดันไฟฟ้า'
          ],
          correctAnswer: 'แบบขนาน เพราะเมื่อหลอดหนึ่งขาด หลอดอื่นยังคงทำงานได้',
          explanation: 'วงจรขนานให้กระแสแยกไหล หากหลอดใดหลอดหนึ่งชำรุด วงจรอื่นยังคงครบวงจรและใช้งานได้ปกติ'
        }
      ]
    },
    earth_space: {
      id: 'earth_space',
      subject: 'science',
      title: 'โลก ธรณีวิทยา ดาราศาสตร์ และอวกาศ',
      subtitle: 'การเกิดฤดูกาล ข้างขึ้น-ข้างแรม และลมบก-ลมทะเล',
      emoji: '🌍',
      secretFormula: {
        name: 'สูตรลับ "ท่องจำลมบก-ลมทะเล & ข้างขึ้น-ข้างแรม"',
        concept: 'ลมพัดจากบริเวณอุณหภูมิต่ำ (ความกดอากาศสูง) ไปหา อุณหภูมิสูง (ความกดอากาศต่ำ)',
        steps: [
          'ลมทะเล: เกิดตอนกลางวัน (พัดจากทะเลเข้าหาฝั่ง)',
          'ลมบก: เกิดตอนกลางคืน (พัดจากฝั่งออกสู่ทะเล)',
          'ฤดูกาลเกิดจาก: แกนโลกเอียง 23.5 องศา ขณะโคจรรอบดวงอาทิตย์',
          'กลางวัน-กลางคืนเกิดจาก: โลกหมุนรอบตัวเอง 1 รอบ (24 ชั่วโมง)'
        ]
      },
      summaryPoints: [
        'สุริยุปราคา: ดวงอาทิตย์ - ดวงจันทร์ - โลก (เกิดตอนกลางวัน วันแรม 15 ค่ำ/ขึ้น 1 ค่ำ)',
        'จันทรุปราคา: ดวงอาทิตย์ - โลก - ดวงจันทร์ (เกิดตอนกลางคืน วันขึ้น 15 ค่ำ)'
      ],
      practiceQuestions: [
        {
          id: 's_es_1',
          question: 'สาเหตุสำคัญที่สุดที่ทำให้โลกเกิดฤดูกาลต่างๆ คือข้อใด?',
          options: [
            'ระยะห่างระหว่างโลกกับดวงอาทิตย์ไม่เท่ากันในแต่ละช่วงปี',
            'แกนโลกเอียงทำมุม 23.5 องศากับแนวตั้งฉากระนาบวงโคจรขณะโคจรรอบดวงอาทิตย์',
            'การหมุนรอบตัวเองของโลกด้วยความเร็วไม่สม่ำเสมอ',
            'การเกิดจุดดับบนดวงอาทิตย์'
          ],
          correctAnswer: 'แกนโลกเอียงทำมุม 23.5 องศากับแนวตั้งฉากระนาบวงโคจรขณะโคจรรอบดวงอาทิตย์',
          explanation: 'แกนโลกเอียงทำให้แต่ละซีกโลกได้รับรังสีความร้อนจากดวงอาทิตย์ในมุมและความเข้มต่างกันในแต่ละช่วงของปี จึงเกิดฤดูกาล'
        }
      ]
    }
  },
  english: {
    grammar_basics: {
      id: 'grammar_basics',
      subject: 'english',
      title: 'Grammar Essentials & Key Tenses',
      subtitle: 'Present Simple vs Continuous vs Past และ Subject-Verb Agreement',
      emoji: '📝',
      secretFormula: {
        name: 'สูตรลับ "Tense Timeline & SV Agreement"',
        concept: 'ประธานเอกพจน์ กริยาเติม s/es | ประธานพหูพจน์ กริยารูปเดิม',
        steps: [
          'Present Simple: เหตุการณ์จริง/กิจวัตรประจำวัน (every day, always, usually) → S + V.1 (s/es)',
          'Past Simple: เกิดและจบในอดีต (yesterday, last week, ago, in 2020) → S + V.2',
          'Present Continuous: กำลังเกิดขึ้นตอนนี้ (now, right now, at the moment, Listen!) → S + is/am/are + V.ing'
        ]
      },
      summaryPoints: [
        'Everybody, Everyone, Somebody, Nobody ถือเป็น "เอกพจน์" ใช้กริยาเอกพจน์เสมอ เช่น Everyone is here.',
        'Neither...nor / Either...or กริยาผันตามประธานตัวที่อยู่ "ใกล้กริยาที่สุด"'
      ],
      practiceQuestions: [
        {
          id: 'e_gb_1',
          question: 'Look! The students __________ basketball in the school gym right now.',
          options: ['play', 'plays', 'are playing', 'played'],
          correctAnswer: 'are playing',
          explanation: 'มีคำบอกเวลา "Look!" และ "right now" เป็น Present Continuous Tense ใช้ S (The students พหูพจน์) + are + V.ing'
        }
      ]
    },
    vocabulary: {
      id: 'vocabulary',
      subject: 'english',
      title: 'Vocabulary Power & Root Words',
      subtitle: 'เดาความหมายศัพท์จาก Prefix/Suffix และกลุ่มคำพบบ่อยในข้อสอบ',
      emoji: '📚',
      secretFormula: {
        name: 'สูตรลับ "Prefix เปลี่ยนความหมาย Suffix เปลี่ยนหน้าที่"',
        concept: 'รู้รากศัพท์ 1 คำ ขยายความรู้ได้ 10 คำ',
        steps: [
          'Prefix บอกความหมายเชิงลบ/ตรงข้าม: un-, in-, im-, dis-, non-, mis- (เช่น unhappy, impossible, disagree)',
          'Prefix บอกจำนวน/ก่อน-หลัง: re- (ทำซ้ำ), pre- (ก่อน), bi- (สอง), tri- (สาม)',
          'Suffix บอกคำนาม: -tion, -ment, -ness, -er/or (เช่น education, kindness, teacher)',
          'Suffix บอกคำคุณศัพท์: -ful, -less, -able, -ous (เช่น careful, careless, comfortable)'
        ]
      },
      summaryPoints: [
        'Synonyms (คำเหมือน) ที่ออกสอบบ่อย: enormous = huge = gigantic (ใหญ่โต), famous = well-known (มีชื่อเสียง)',
        'Antonyms (คำตรงข้าม): difficult vs easy, ancient vs modern, safe vs dangerous'
      ],
      practiceQuestions: [
        {
          id: 'e_voc_1',
          question: 'The word "careless" in "He made a careless mistake" means:',
          options: ['very careful', 'not showing enough attention', 'full of care', 'without mistake'],
          correctAnswer: 'not showing enough attention',
          explanation: 'Suffix "-less" หมายถึง "ปราศจาก/ไม่มี" ดังนั้น careless หมายถึง ไม่ระมัดระวังหรือไม่ใส่ใจ'
        }
      ]
    },
    reading: {
      id: 'reading',
      subject: 'english',
      title: 'Reading Comprehension (Skim & Scan)',
      subtitle: 'เทคนิคอ่านเร็ว 30 วินาที ตอบโจทย์ป้ายประกาศและบทความสั้น',
      emoji: '👁️',
      secretFormula: {
        name: 'สูตรลับ "3S Reading Strategy"',
        concept: 'อย่าเพิ่งแปลทีละคำ ให้จับโครงสร้างคำถามก่อน',
        steps: [
          '1. อ่านคำถามและตัวเลือกก่อน เพื่อรู้ว่าโจทย์มองหาอะไร (ตัวเลข, เวลา, สถานที่, หรือใจความหลัก)',
          '2. SKIM: กวาดตาดูหัวข้อเรื่อง บรรทัดแรกและบรรทัดสุดท้ายของแต่ละย่อหน้า',
          '3. SCAN: วิ่งสายตาหาคำสำคัญ (Keywords เช่น ชื่อเฉพาะ ตัวเลข) เพื่อหาบรรทัดที่มีคำตอบ'
        ]
      },
      summaryPoints: [
        'Main Idea มักอยู่ประโยคแรก หรือประโยคสุดท้ายของย่อหน้า',
        'ถ้าโจทย์ถาม "Which of the following is TRUE?" ให้ตรวจทีละช้อยส์เทียบกับข้อความในบทความ'
      ],
      practiceQuestions: [
        {
          id: 'e_rd_1',
          question: 'Sign: "NO SWIMMING - STRONG CURRENTS TODAY". What does this sign warn people about?',
          options: [
            'The water is clean for swimming.',
            'It is dangerous to swim due to fast-moving water.',
            'Swimming lessons are available today.',
            'The pool is closed for cleaning.'
          ],
          correctAnswer: 'It is dangerous to swim due to fast-moving water.',
          explanation: '"strong currents" หมายถึง กระแสน้ำไหลเชี่ยว ป้ายจึงเตือนว่าอันตราย ห้ามลงเล่นน้ำ'
        }
      ]
    },
    listening_speaking: {
      id: 'listening_speaking',
      subject: 'english',
      title: 'Everyday Communication & Expressions',
      subtitle: 'สำนวนสนทนาในชีวิตประจำวัน และการตอบรับอย่างสุภาพ',
      emoji: '🎙️',
      secretFormula: {
        name: 'สูตรลับ "คู่สำนวนถาม-ตอบยอดฮิต"',
        concept: 'ข้อสอบสนทนาวัดมารยาทและการสื่อสารที่ถูกต้องตามบริบท',
        steps: [
          'ขอบคุณ: Thank you very much. → You are welcome. / Don\'t mention it. / My pleasure.',
          'ขอโทษ: I am sorry. → That\'s all right. / Never mind. / Don\'t worry about it.',
          'ขอความช่วยเหลือ: Could you please...? / Would you mind + V.ing...?',
          'ถามความคิดเห็น: What do you think about...? / How do you feel about...?'
        ]
      },
      summaryPoints: [
        'How do you do? เป็นคำทักทายเมื่อเจอกันครั้งแรกอย่างเป็นทางการ ต้องตอบกลับว่า "How do you do?"',
        'Would you like some tea? ตอบรับ: "Yes, please." / ปฏิเสธ: "No, thank you."'
      ],
      practiceQuestions: [
        {
          id: 'e_ls_1',
          question: 'Situation: Lisa accidentally steps on Tom\'s foot. Lisa: "Oh, I am terribly sorry!" Tom: "__________"',
          options: ['You are welcome.', 'That\'s all right.', 'Congratulations!', 'Excuse me.'],
          correctAnswer: 'That\'s all right.',
          explanation: 'เมื่อมีคนกล่าวขอโทษ (I am sorry) มารยาทในการตอบรับคือ "That\'s all right." หรือ "Never mind."'
        }
      ]
    },
    writing: {
      id: 'writing',
      subject: 'english',
      title: 'Error Identification & Sentence Structure',
      subtitle: 'เทคนิคจับผิดไวยากรณ์และเรียงลำดับประโยคให้ถูกต้อง',
      emoji: '✍️',
      secretFormula: {
        name: 'สูตรลับ "สูตรสแกน Error 3 จุด"',
        concept: 'เช็คโครงสร้างประโยค S + V + O',
        steps: [
          'จุดที่ 1: ประธานกับกริยาสอดคล้องกันหรือไม่ (Subject-Verb Agreement)',
          'จุดที่ 2: Tense สอดคล้องกับคำบอกเวลาหรือไม่ (Time Markers)',
          'จุดที่ 3: ชนิดของคำ (Parts of Speech) วางถูกตำแหน่งหรือไม่ เช่น Adjective วางหน้า Noun'
        ]
      },
      summaryPoints: [
        'โครงสร้างประโยคพื้นฐาน: Subject + Verb + Object + Place + Time (SVOPT)',
        'คำเชื่อมที่ขัดแย้ง: although, but, however | คำเชื่อมที่เป็นเหตุผล: because, since, so'
      ],
      practiceQuestions: [
        {
          id: 'e_wr_1',
          question: 'Find the mistake: "She (A) walk (B) to school (C) with her friends (D) every morning."',
          options: ['(A) walk', '(B) to', '(C) with', '(D) every morning'],
          correctAnswer: '(A) walk',
          explanation: 'ประธานคือ "She" (เอกพจน์) และมีคำว่า "every morning" (Present Simple) กริยาต้องเติม -s แก้เป็น "walks"'
        }
      ]
    }
  }
}
