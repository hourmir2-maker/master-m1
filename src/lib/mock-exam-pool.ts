/**
 * MASTER ม.1 — 45-Minute Mock Exam Question Pool & Analysis Engine
 */

export interface MockExamQuestion {
  id: string
  subject: 'math' | 'science' | 'english'
  topic: string
  standardCode: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options: string[]
  correctAnswer: string
  explanation: {
    principle: string
    steps: string
    shortcut: string
    trapWarning?: string
  }
}

export const MOCK_EXAM_QUESTIONS: MockExamQuestion[] = [
  // ==========================================
  // 🔢 1. คณิตศาสตร์ (10 ข้อ)
  // ==========================================
  {
    id: 'mock_m_1',
    subject: 'math',
    topic: 'ห.ร.ม. และ ค.ร.น.',
    standardCode: 'ค 1.1 ป.6/4',
    difficulty: 'medium',
    question: 'มีระฆัง 3 ใบ ใบแรกตีทุก 15 นาที ใบที่สองตีทุก 20 นาที และใบที่สามตีทุก 30 นาที ถ้าเริ่มตีพร้อมกันเวลา 08:00 น. ระฆังทั้งสามใบจะตีพร้อมกันอีกครั้งในเวลาใด?',
    options: ['08:45 น.', '09:00 น.', '09:30 น.', '10:00 น.'],
    correctAnswer: '09:00 น.',
    explanation: {
      principle: 'โจทย์เหตุการณ์ที่จะเกิดขึ้นพร้อมกันอีกครั้ง ให้ใช้การหา ค.ร.น.',
      steps: '1. หา ค.ร.น. ของ 15, 20, 30:\n- 15 = 3 × 5\n- 20 = 2² × 5\n- 30 = 2 × 3 × 5\nค.ร.น. = 2² × 3 × 5 = 60 นาที (1 ชั่วโมง)\n2. เวลาเริ่มต้น 08:00 น. + 1 ชั่วโมง = 09:00 น.',
      shortcut: '⚡ ค.ร.น. ของ 15, 20, 30 คือ 60 นาที = 1 ชั่วโมงพอดี'
    }
  },
  {
    id: 'mock_m_2',
    subject: 'math',
    topic: 'การคำนวณระคน & ลำดับการคำนวณ (PEMDAS)',
    standardCode: 'ค 1.1 ป.6/7',
    difficulty: 'easy',
    question: 'ค่าของ 250 - 50 × 3 + 120 ÷ (8 - 2) × 4 เท่ากับเท่าใด?',
    options: ['180', '160', '220', '140'],
    correctAnswer: '180',
    explanation: {
      principle: 'ลำดับสากล: วงเล็บ ➔ คูณหารจากซ้ายไปขวา ➔ บวกลบ',
      steps: '1. ในวงเล็บ: (8 - 2) = 6\n2. ทำคูณและหาร:\n- 50 × 3 = 150\n- 120 ÷ 6 × 4 = 20 × 4 = 80\n3. รวมบวกลบ: 250 - 150 + 80 = 100 + 80 = 180',
      shortcut: '⚡ ทำทีละก้อน: 250 - 150 + 80 = 180 ทันที'
    }
  },
  {
    id: 'mock_m_3',
    subject: 'math',
    topic: 'ร้อยละและกำไร-ขาดทุน',
    standardCode: 'ค 1.1 ป.6/12',
    difficulty: 'medium',
    question: 'พ่อค้าติดป้ายขายเสื้อตัวหนึ่งไว้ 1,200 บาท ซึ่งเป็นราคาที่คิดกำไรไว้แล้ว 20% จากนั้นลดราคาให้ผู้ซื้อ 10% จากป้าย พ่อค้ายังคงได้กำไรกี่บาท?',
    options: ['80 บาท', '100 บาท', '120 บาท', '150 บาท'],
    correctAnswer: '80 บาท',
    explanation: {
      principle: 'หาราคาทุนก่อน แล้วคำนวณราคาขายจริงเพื่อหากำไรสุทธิ',
      steps: '1. ติดป้าย 1,200 บ. กำไร 20% ➔ ทุน = (1,200 × 100) / 120 = 1,000 บาท\n2. ลด 10% จากป้าย ➔ ขายจริง = 1,200 × 0.9 = 1,080 บาท\n3. กำไรจริง = 1,080 - 1,000 = 80 บาท',
      shortcut: '⚡ ทุน = 1,000 บ. ขายจริง 1,080 บ. กำไร 80 บ. ชัดเจน',
      trapWarning: '⚠️ ห้ามนำ 20% - 10% = 10% ของ 1,200 เด็ดขาด เพราะฐานคิดเปอร์เซ็นต์ต่างกัน!'
    }
  },
  {
    id: 'mock_m_4',
    subject: 'math',
    topic: 'สมการเชิงเส้นตัวแปรเดียว',
    standardCode: 'ค 1.3 ป.6/1',
    difficulty: 'medium',
    question: 'ถ้า 3(x + 4) - 2(x - 1) = 24 แล้ว ค่าของ 2x - 5 คือเท่าใด?',
    options: ['15', '18', '21', '25'],
    correctAnswer: '15',
    explanation: {
      principle: 'กระจายวงเล็บ ยุบพจน์ที่คล้ายกัน แล้วแก้สมการหา x',
      steps: '1. 3x + 12 - 2x + 2 = 24\n2. x + 14 = 24 ➔ x = 10\n3. คำนวณ 2x - 5 = 2(10) - 5 = 20 - 5 = 15',
      shortcut: '⚡ ระวังเครื่องหมายลบกระจายเข้า (-2 × -1 = +2)'
    }
  },
  {
    id: 'mock_m_5',
    subject: 'math',
    topic: 'เรขาคณิตและพื้นที่แรเงา',
    standardCode: 'ค 2.1 ป.6/2',
    difficulty: 'hard',
    question: 'สี่เหลี่ยมจัตุรัสรูปหนึ่งมีความยาวด้านละ 14 เซนติเมตร ถ้าสร้างรูปใบไม้แรเงาด้านใน พื้นที่ส่วนที่แรเงาจะเท่ากับกี่ตารางเซนติเมตร? (กำหนด π ≈ 22/7)',
    options: ['98 ตร.ซม.', '112 ตร.ซม.', '126 ตร.ซม.', '144 ตร.ซม.'],
    correctAnswer: '112 ตร.ซม.',
    explanation: {
      principle: 'สูตรลัดพื้นที่ใบไม้แรเงาในจัตุรัสด้าน a = (4/7) × a²',
      steps: '1. a = 14\n2. พื้นที่ใบไม้ = (4/7) × 14 × 14 = 4 × 2 × 14 = 112 ตร.ซม.',
      shortcut: '⚡ ใช้สูตรลัด (4/7)a² แทนการคำนวณควอเดรนท์ยาวๆ'
    }
  },
  {
    id: 'mock_m_6',
    subject: 'math',
    topic: 'อัตราส่วนและมาตราส่วน',
    standardCode: 'ค 1.1 ป.6/11',
    difficulty: 'medium',
    question: 'อัตราส่วนเงินของ ก : ข = 3 : 4 และ ข : ค = 2 : 5 ถ้าทั้งสามคนมีเงินรวมกัน 1,700 บาท ค มีเงินมากกว่า ก กี่บาท?',
    options: ['500 บาท', '600 บาท', '700 บาท', '800 บาท'],
    correctAnswer: '700 บาท',
    explanation: {
      principle: 'ทำตัวเชื่อม (ข) ให้เท่ากันเพื่อสร้างอัตราส่วนต่อเนื่อง ก : ข : ค',
      steps: '1. ข : ค = 2 : 5 ➔ คูณ 2 ทั้งคู่ = 4 : 10\n2. ดังนั้น ก : ข : ค = 3 : 4 : 10\n3. รวมส่วน = 3 + 4 + 10 = 17 ส่วน\n4. 1 ส่วน = 1,700 / 17 = 100 บาท\n5. ค มากกว่า ก = 10 - 3 = 7 ส่วน = 7 × 100 = 700 บาท',
      shortcut: '⚡ หาผลต่างของส่วนทันที (10 - 3 = 7) แล้วคูณ 100 = 700 บาท'
    }
  },
  {
    id: 'mock_m_7',
    subject: 'math',
    topic: 'ปริมาตรและความจุรูปเรขาคณิต 3 มิติ',
    standardCode: 'ค 2.1 ป.6/3',
    difficulty: 'easy',
    question: 'ถังน้ำทรงสี่เหลี่ยมมุมฉากกว้าง 50 ซม. ยาว 80 ซม. สูง 40 ซม. ถ้ามีน้ำอยู่ครึ่งถัง จะต้องเติมน้ำอีกกี่ลิตรจึงจะเต็มถังพอดี?',
    options: ['60 ลิตร', '80 ลิตร', '100 ลิตร', '160 ลิตร'],
    correctAnswer: '80 ลิตร',
    explanation: {
      principle: 'ปริมาตรทรงสี่เหลี่ยมมุมฉาก = กว้าง × ยาว × สูง | 1 ลิตร = 1,000 ลูกบาศก์เซนติเมตร',
      steps: '1. ปริมาตรเต็มถัง = 50 × 80 × 40 = 160,000 ลบ.ซม.\n2. น้ำครึ่งถังที่ต้องเติม = 160,000 ÷ 2 = 80,000 ลบ.ซม.\n3. แปลงเป็นลิตร = 80,000 ÷ 1,000 = 80 ลิตร',
      shortcut: '⚡ 1 ลิตร = 1,000 ลบ.ซม. เสมอ'
    }
  },
  {
    id: 'mock_m_8',
    subject: 'math',
    topic: 'สถิติและแผนภูมิวงกลม',
    standardCode: 'ค 3.1 ป.6/1',
    difficulty: 'easy',
    question: 'นักเรียนกลุ่มหนึ่งชอบเล่นกีฬาชนิดต่างๆ แสดงด้วยแผนภูมิวงกลม ถ้ามีนักเรียนชอบว่ายน้ำ 35% มุมที่จุดศูนย์กลางของส่วนที่ชอบว่ายน้ำจะกางกี่องศา?',
    options: ['120°', '126°', '135°', '140°'],
    correctAnswer: '126°',
    explanation: {
      principle: 'สูตรลัดแปลง % เป็นมุมองศา: มุม = เปอร์เซ็นต์ × 3.6°',
      steps: '1. มุม = 35 × 3.6 = 126°',
      shortcut: '⚡ 35 × 3.6 = 35 × 3 + 35 × 0.6 = 105 + 21 = 126°'
    }
  },
  {
    id: 'mock_m_9',
    subject: 'math',
    topic: 'จำนวนเฉพาะและการแยกตัวประกอบ',
    standardCode: 'ค 1.1 ป.6/3',
    difficulty: 'medium',
    question: 'ข้อใดต่อไปนี้ถูกต้องเกี่ยวกับจำนวนเฉพาะ?',
    options: [
      'จำนวนคี่ทุกจำนวนเป็นจำนวนเฉพาะ',
      '2 เป็นจำนวนเฉพาะคู่เพียงจำนวนเดียว',
      '1 เป็นจำนวนเฉพาะที่น้อยที่สุด',
      'จำนวนเฉพาะทุกจำนวนต้องลงท้ายด้วย 1, 3, 7 หรือ 9 เสมอ'
    ],
    correctAnswer: '2 เป็นจำนวนเฉพาะคู่เพียงจำนวนเดียว',
    explanation: {
      principle: 'นิยามจำนวนเฉพาะคือจำนวนนับที่มากกว่า 1 และมีตัวประกอบเพียง 2 ตัวคือ 1 และตัวมันเอง',
      steps: '2 เป็นจำนวนเฉพาะคู่เพียงตัวเดียว ส่วน 1 ไม่ใช่จำนวนเฉพาะ และ 5 ลงท้ายด้วย 5 แต่เป็นจำนวนเฉพาะ',
      shortcut: '⚡ ข้อสอบชอบหลอกเรื่องเลข 1 และเลข 2'
    }
  },
  {
    id: 'mock_m_10',
    subject: 'math',
    topic: 'เทคนิคถอดรูทและยกกำลัง',
    standardCode: 'ค 1.2 ป.6/1',
    difficulty: 'medium',
    question: 'ค่าของ √5,625 + 75² เท่ากับเท่าใด?',
    options: ['5,675', '5,700', '5,750', '6,225'],
    correctAnswer: '5,700',
    explanation: {
      principle: 'ใช้สูตรลัดถอดรูท 3 วิ และสูตรยกกำลังสองเลขลงท้าย 5',
      steps: '1. √5,625 ➔ ตัด 25 เหลือ 56 (7²=49) ลงท้าย 5 ➔ ได้ 75\n2. 75² = (7×8)25 = 5,625\n3. รวม = 75 + 5,625 = 5,700',
      shortcut: '⚡ 75² = 5,625 ดังนั้น √5,625 ก็คือ 75 ➔ 75 + 5,625 = 5,700'
    }
  },
  {
    id: 'mock_m_11',
    subject: 'math',
    topic: 'เรขาคณิตและพื้นที่แรเงาใบไม้ (สูตรลัด 3 วินาที)',
    standardCode: 'ค 2.1 ป.6/2',
    difficulty: 'hard',
    question: 'รูปสี่เหลี่ยมจัตุรัสรูปหนึ่งมีความยาวด้านละ 14 เซนติเมตร แนบรูปใบไม้แรเงาที่เกิดจากส่วนโค้งของวงกลม 2 วง พื้นที่ส่วนที่แรเงามีค่ากี่ตารางเซนติเมตร? (กำหนดให้ π ≈ 22/7)',
    options: ['112 ตารางเซนติเมตร', '124 ตารางเซนติเมตร', '98 ตารางเซนติเมตร', '154 ตารางเซนติเมตร'],
    correctAnswer: '112 ตารางเซนติเมตร',
    explanation: {
      principle: 'พื้นที่ใบไม้แรเงาที่เกิดจากส่วนโค้ง 1/4 ของวงกลม 2 วงตัดกันในสี่เหลี่ยมจัตุรัสด้าน a มีสูตรลัดคือ (4/7)a²',
      steps: '1. สูตรลัดใบไม้แรเงา: พื้นที่ = (4/7) × a²\n2. แทนค่าด้าน a = 14: พื้นที่ = (4/7) × (14 × 14) = 4 × 2 × 14 = 112 ตารางเซนติเมตร',
      shortcut: '⚡ สูตรลัดใบไม้: (4/7) × 14² = 4 × 28 = 112 ตร.ซม. จบใน 3 วิ!',
      trapWarning: '⚠️ ห้ามเสียเวลาคำนวณพื้นที่พัดลบพื้นที่สามเหลี่ยมทีละข้างในห้องสอบ เพราะจะเสียเวลาเกิน 3 นาที!'
    }
  },
  {
    id: 'mock_m_12',
    subject: 'math',
    topic: 'สมการเชิงเส้นและการประยุกต์อายุ',
    standardCode: 'ค 1.3 ป.6/1',
    difficulty: 'hard',
    question: 'ปัจจุบันคุณพ่อมีอายุเป็น 4 เท่าของอายุลูกชาย แต่เมื่อ 6 ปีที่แล้ว คุณพ่อมีอายุเป็น 7 เท่าของลูกชาย ปัจจุบันลูกชายมีอายุกี่ปี?',
    options: ['12 ปี', '10 ปี', '14 ปี', '16 ปี'],
    correctAnswer: '12 ปี',
    explanation: {
      principle: 'ตั้งสมการโดยให้ x คืออายุปัจจุบันของลูกชาย และเขียนความสัมพันธ์ในอดีต (6 ปีที่แล้ว)',
      steps: '1. ปัจจุบัน: ลูกชาย = x ปี, พ่อ = 4x ปี\n2. เมื่อ 6 ปีที่แล้ว: ลูกชาย = x - 6, พ่อ = 4x - 6\n3. ตั้งสมการ: 4x - 6 = 7(x - 6)\n4. 4x - 6 = 7x - 42 ➔ 3x = 36 ➔ x = 12 ปี',
      shortcut: '⚡ แทนช้อยส์: ถ้าลูก 12 ➔ พ่อ 48, ย้อนไป 6 ปีก่อน: ลูก 6 พ่อ 42 ซึ่ง 42 = 7 × 6 พอดี ตอบ 12 ปี!'
    }
  },

  // ==========================================
  // 🔬 2. วิทยาศาสตร์ (10 ข้อ)
  // ==========================================
  {
    id: 'mock_s_1',
    subject: 'science',
    topic: 'เซลล์และโครงสร้างสิ่งมีชีวิต',
    standardCode: 'ว 1.2 ป.6/1',
    difficulty: 'easy',
    question: 'ออร์แกเนลล์ใดพบเฉพาะในเซลล์พืช แต่ไม่พบในเซลล์สัตว์?',
    options: ['นิวเคลียส และ ไซโทพลาซึม', 'ผนังเซลล์ และ คลอโรพลาสต์', 'ไมโทคอนเดรีย และ เยื่อหุ้มเซลล์', 'ไรโบโซม และ แวคิวโอล'],
    correctAnswer: 'ผนังเซลล์ และ คลอโรพลาสต์',
    explanation: {
      principle: 'ผนังเซลล์ (Cell wall) ให้ความแข็งแรง และคลอโรพลาสต์ (Chloroplast) มีคลอโรฟิลล์สำหรับสังเคราะห์แสง พบเฉพาะในเซลล์พืช',
      steps: 'เซลล์สัตว์ไม่มีผนังเซลล์ทำให้มีรูปร่างยืดหยุ่น และไม่มีคลอโรพลาสต์จึงสร้างอาหารเองไม่ได้',
      shortcut: '⚡ ท่องจำ: พืชมี "ผนัง + คลอโรพลาสต์"'
    }
  },
  {
    id: 'mock_s_2',
    subject: 'science',
    topic: 'การสืบพันธุ์ของพืชดอก',
    standardCode: 'ว 1.2 ป.6/2',
    difficulty: 'medium',
    question: 'หลังจากการปฏิสนธิของพืชดอก โครงสร้างของ "ออวุล (Ovule)" และ "รังไข่ (Ovary)" จะเจริญไปเป็นสิ่งใดตามลำดับ?',
    options: ['เมล็ด และ ผล', 'ผล และ เมล็ด', 'ต้นอ่อน และ ผล', 'เมล็ด และ เปลือกผล'],
    correctAnswer: 'เมล็ด และ ผล',
    explanation: {
      principle: 'การเปลี่ยนแปลงหลังปฏิสนธิ: ออวุล ➔ เมล็ด, รังไข่ ➔ ผลไม้',
      steps: 'ผนังรังไข่เจริญเป็นเปลือกและเนื้อผลไม้ ส่วนออวุลด้านในเจริญเป็นเมล็ด',
      shortcut: '⚡ ท่อง: ออวุล-เมล็ด, รังไข่-ผล'
    }
  },
  {
    id: 'mock_s_3',
    subject: 'science',
    topic: 'สารและสมบัติของสาร & เทคนิคการแยกสาร',
    standardCode: 'ว 2.1 ป.6/1',
    difficulty: 'medium',
    question: 'หากมีของผสมระหว่าง "ผงเหล็ก, ผงถ่าน และ เกลือแกง" ควรใช้วิธีการใดแยกสารทั้งสามชนิดออกจากกันได้อย่างถูกต้องและมีประสิทธิภาพที่สุด?',
    options: [
      'ใช้แม่เหล็กดูด ➔ ละลายน้ำแล้วกรอง ➔ นำสารละลายไประเหยแห้ง',
      'ละลายน้ำแล้วกรอง ➔ ตกผลึก ➔ ใช้แม่เหล็กดูด',
      'หยิบออก ➔ ร่อนด้วยตะแกรง ➔ ใช้กรวยแยก',
      'ระเหิด ➔ ใช้แม่เหล็กดูด ➔ กรองด้วยกระดาษกรอง'
    ],
    correctAnswer: 'ใช้แม่เหล็กดูด ➔ ละลายน้ำแล้วกรอง ➔ นำสารละลายไประเหยแห้ง',
    explanation: {
      principle: 'แยกตามสมบัติทางกายภาพ: สารแม่เหล็ก, การละลายน้ำ, และจุดเดือด',
      steps: '1. ใช้แม่เหล็กดูดผงเหล็กออก\n2. เติมน้ำ: เกลือละลายน้ำ ผงถ่านไม่ละลาย\n3. กรองผงถ่านออกด้วยกระดาษกรอง\n4. นำน้ำเกลือไประเหยแห้ง จะได้ผลึกเกลือแกงกลับคืนมา',
      shortcut: '⚡ แม่เหล็ก ➔ ละลาย/กรอง ➔ ระเหยแห้ง ครบกระบวนการ'
    }
  },
  {
    id: 'mock_s_4',
    subject: 'science',
    topic: 'การเปลี่ยนแปลงทางกายภาพและเคมี',
    standardCode: 'ว 2.1 ป.6/2',
    difficulty: 'easy',
    question: 'ข้อใดต่อไปนี้เป็นการเปลี่ยนแปลงทางเคมี (Chemical Change)?',
    options: ['การหลอมเหลวของเทียนไข', 'การเกิดสนิมบนตะปูเหล็ก', 'การระเหยของแอลกอฮอล์', 'การละลายของน้ำตาลในน้ำ'],
    correctAnswer: 'การเกิดสนิมบนตะปูเหล็ก',
    explanation: {
      principle: 'การเปลี่ยนแปลงทางเคมีต้องเกิดสารใหม่ที่มีสมบัติต่างจากเดิม และกลับคืนสภาพเดิมได้ยาก',
      steps: 'สนิมเหล็ก (Fe₂O₃·nH₂O) เป็นสารใหม่ที่เกิดจากปฏิกิริยาระหว่างเหล็ก น้ำ และออกซิเจน ส่วนข้ออื่นเป็นการเปลี่ยนสถานะ/การละลายซึ่งเป็นกายภาพ',
      shortcut: '⚡ สารใหม่ กลิ่นเปลี่ยน สีเปลี่ยน เกิดฟองแก๊ส = เคมี'
    }
  },
  {
    id: 'mock_s_5',
    subject: 'science',
    topic: 'แรง การเคลื่อนที่ และแรงลอยตัว',
    standardCode: 'ว 2.2 ป.6/1',
    difficulty: 'medium',
    question: 'วัตถุ A มีมวล 100 กรัม ปริมาตร 120 ลูกบาศก์เซนติเมตร เมื่อนำไปหย่อนลงในน้ำที่มีความหนาแน่น 1.0 g/cm³ วัตถุนี้จะมีลักษณะอย่างไร?',
    options: [
      'จมลงสู่ก้นภาชนะสนิท',
      'ลอยน้ำโดยมีบางส่วนโผล่พ้นผิวน้ำ',
      'ลอยปริ่มน้ำพอดี',
      'ละลายรวมกับน้ำทันที'
    ],
    correctAnswer: 'ลอยน้ำโดยมีบางส่วนโผล่พ้นผิวน้ำ',
    explanation: {
      principle: 'ความหนาแน่น (D) = มวล (M) / ปริมาตร (V)',
      steps: '1. ความหนาแน่นของวัตถุ A = 100 / 120 ≈ 0.83 g/cm³\n2. เนื่องจาก 0.83 < 1.0 (ความหนาแน่นน้ำ) วัตถุจึงลอยน้ำโดยมีส่วนที่พ้นน้ำประมาณ 17%',
      shortcut: '⚡ ความหนาแน่นน้อยกว่าน้ำ = ลอยแน่นอน'
    }
  },
  {
    id: 'mock_s_6',
    subject: 'science',
    topic: 'แสง เลนส์ และการมองเห็น',
    standardCode: 'ว 2.3 ป.6/1',
    difficulty: 'easy',
    question: 'เด็กชายวินิจมองเห็นกระดานหน้าห้องไม่ชัด แต่มองเห็นหนังสือในมือชัดเจน เขาควรไปพบจักษุแพทย์เพื่อตัดแว่นตาที่ทำจากเลนส์ชนิดใด?',
    options: ['เลนส์นูน', 'เลนส์เว้า', 'กระจกเงาราบ', 'กระจกนูน'],
    correctAnswer: 'เลนส์เว้า',
    explanation: {
      principle: 'มองไกลไม่ชัด = สายตาสั้น ➔ แก้ด้วยเลนส์เว้า',
      steps: 'สายตาสั้นเกิดจากกระบอกตายาว แสงโฟกัสก่อนถึงเรตินา เลนส์เว้าจะช่วยกระจายแสงให้ไปตกพอดีที่เรตินา',
      shortcut: '⚡ สั้น-เว้า / ยาว-นูน'
    }
  },
  {
    id: 'mock_s_7',
    subject: 'science',
    topic: 'วงจรไฟฟ้าและการต่อเซลล์',
    standardCode: 'ว 2.3 ป.6/3',
    difficulty: 'medium',
    question: 'ข้อดีของการต่อหลอดไฟฟ้าแบบ "ขนาน" ในอาคารบ้านเรือนคือข้อใด?',
    options: [
      'ใช้สายไฟน้อยกว่าแบบอนุกรม',
      'เมื่อหลอดไฟหลอดใดหลอดหนึ่งขาด หลอดที่เหลือยังคงสว่างได้ตามปกติ',
      'กระแสไฟฟ้าไหลผ่านทุกหลอดเท่ากันหมดเสมอ',
      'ทำให้ความต้านทานรวมของวงจรเพิ่มขึ้นอย่างมาก'
    ],
    correctAnswer: 'เมื่อหลอดไฟหลอดใดหลอดหนึ่งขาด หลอดที่เหลือยังคงสว่างได้ตามปกติ',
    explanation: {
      principle: 'วงจรขนานแยกสายการไหลของกระแสอิสระและความต่างศักย์เท่ากันทุกจุด',
      steps: 'ถ้าต่อแบบอนุกรม หลอดหนึ่งขาดจะทำให้วงจรเปิด ไฟดับหมดทั้งบ้าน',
      shortcut: '⚡ ขนาน = อิสระ หลอดหนึ่งดับ ดวงอื่นยังติด'
    }
  },
  {
    id: 'mock_s_8',
    subject: 'science',
    topic: 'หิน วัฏจักรหิน และซากดึกดำบรรพ์',
    standardCode: 'ว 3.2 ป.6/1',
    difficulty: 'medium',
    question: 'หินชนิดใดมักพบ "ซากดึกดำบรรพ์ (Fossils)" ฝังอยู่มากที่สุด?',
    options: ['หินอัคนี (Igneous Rock)', 'หินตะกอนหรือหินชั้น (Sedimentary Rock)', 'หินแปร (Metamorphic Rock)', 'หินออบซิเดียน (Obsidian)'],
    correctAnswer: 'หินตะกอนหรือหินชั้น (Sedimentary Rock)',
    explanation: {
      principle: 'หินตะกอนเกิดจากการทับถมของซากพืช ซากสัตว์ และโคลนตะกอนในสภาวะอุณหภูมิปกติ',
      steps: 'หินอัคนีเกิดจากลาวา/แมกมาความร้อนสูง ซากสิ่งมีชีวิตจะถูกเผาทำลายหมด ส่วนหินแปรผ่านความร้อนและความดันสูงจนโครงสร้างบิดเบี้ยว',
      shortcut: '⚡ ฟอสซิล = หินตะกอน / หินชั้น เสมอ'
    }
  },
  {
    id: 'mock_s_9',
    subject: 'science',
    topic: 'ระบบหมุนเวียนเลือดและร่างกายมนุษย์',
    standardCode: 'ว 1.2 ป.6/4',
    difficulty: 'medium',
    question: 'หัวใจห้องใดมีหน้าที่สูบฉีดเลือดที่มีออกซิเจนสูง (เลือดแดง) ไปเลี้ยงส่วนต่างๆ ของร่างกาย และมีผนังกล้ามเนื้อหนาที่สุด?',
    options: ['ห้องบนขวา (Right Atrium)', 'ห้องล่างขวา (Right Ventricle)', 'ห้องบนซ้าย (Left Atrium)', 'ห้องล่างซ้าย (Left Ventricle)'],
    correctAnswer: 'ห้องล่างซ้าย (Left Ventricle)',
    explanation: {
      principle: 'ห้องล่างซ้ายรับเลือดดีจากปอด แล้วต้องใช้แรงบีบตัวมหาศาลส่งเลือดไปทั่วร่างกาย',
      steps: 'ผนังห้องล่างซ้ายจึงมีความหนาและแข็งแรงที่สุดเพื่อสร้างความดันโลหิต',
      shortcut: '⚡ ล่างซ้าย = ส่งทั่วร่างกาย กล้ามเนื้อหนาสุด'
    }
  },
  {
    id: 'mock_s_10',
    subject: 'science',
    topic: 'ทักษะกระบวนการและการกำหนดตัวแปร',
    standardCode: 'ว 8.1 ป.6/1',
    difficulty: 'hard',
    question: 'ในการทดลอง "ศึกษาว่าปริมาณปุ๋ยมีผลต่อความสูงของต้นถั่วเขียวหรือไม่" ข้อใดคือ "ตัวแปรต้น (Independent Variable)" และ "ตัวแปรตาม (Dependent Variable)" ตามลำดับ?',
    options: [
      'ปริมาณปุ๋ย และ ความสูงของต้นถั่วเขียว',
      'ความสูงของต้นถั่วเขียว และ ปริมาณปุ๋ย',
      'ปริมาณน้ำที่รด และ ปริมาณแสงแดด',
      'ชนิดของดิน และ ปริมาณปุ๋ย'
    ],
    correctAnswer: 'ปริมาณปุ๋ย และ ความสูงของต้นถั่วเขียว',
    explanation: {
      principle: 'ตัวแปรต้น = สิ่งที่จัดให้ต่างกัน / สิ่งที่ต้องการศึกษา | ตัวแปรตาม = ผลลัพธ์ที่ตามมาจากการทดลอง',
      steps: 'ในการทดลองนี้ เราปรับเปลี่ยน "ปริมาณปุ๋ย" (ตัวแปรต้น) เพื่อดูผลต่อ "ความสูงของต้นถั่ว" (ตัวแปรตาม)',
      shortcut: '⚡ ตัวแปรต้น = สิ่งที่เรากำหนด | ตัวแปรตาม = ผลลัพธ์ที่วัดได้'
    }
  },
  {
    id: 'mock_s_11',
    subject: 'science',
    topic: 'พลังงานความร้อนและการเปลี่ยนสถานะ (Q = mcΔt & Q = mL)',
    standardCode: 'ว 2.3 ป.6/1',
    difficulty: 'hard',
    question: 'ต้องการต้มน้ำมวล 200 กรัม อุณหภูมิ 25 °C ให้เดือดกลายเป็นน้ำร้อนอุณหภูมิ 100 °C ต้องใช้พลังงานความร้อนกี่แคลอรี? (กำหนดความจุความร้อนจำเพาะของน้ำ c = 1 cal/g·°C)',
    options: ['15,000 แคลอรี', '20,000 แคลอรี', '18,500 แคลอรี', '12,000 แคลอรี'],
    correctAnswer: '15,000 แคลอรี',
    explanation: {
      principle: 'การเปลี่ยนอุณหภูมิโดยไม่เปลี่ยนสถานะ ใช้สูตร Q = mcΔt',
      steps: '1. มวล m = 200 g, c = 1 cal/g·°C\n2. อุณหภูมิเปลี่ยน Δt = 100 - 25 = 75 °C\n3. Q = 200 × 1 × 75 = 15,000 cal',
      shortcut: '⚡ Q = mcΔt ➔ 200 × 1 × 75 = 15,000 แคลอรีตรงๆ',
      trapWarning: '⚠️ ถ้าโจทย์ถามให้เปลี่ยนเป็นไอน้ำเดือดทั้งหมด ต้องบวก Q = mL เข้าไปด้วย แต่นี่ถามแค่ร้อนถึง 100 °C!'
    }
  },
  {
    id: 'mock_s_12',
    subject: 'science',
    topic: 'กล้องจุลทรรศน์และภาพเสมือน',
    standardCode: 'ว 1.2 ป.6/2',
    difficulty: 'hard',
    question: 'เมื่อส่องดูตัวอักษรภาษาอังกฤษ "e" ภายใต้กล้องจุลทรรศน์ชนิดใช้แสง เลนส์ใกล้ตา 10x และเลนส์ใกล้วัตถุ 40x ภาพที่ผู้สังเกตเห็นจะเป็นอย่างไร และมีกำลังขยายรวมกี่เท่า?',
    options: [
      'ตัวอักษร e กลับหัวและกลับซ้ายเป็นขวา (หัวกลับ 180°), กำลังขยาย 400 เท่า',
      'ตัวอักษร e เหมือนเดิมทุกประการเพียงแค่ขยายใหญ่ขึ้น, กำลังขยาย 50 เท่า',
      'ตัวอักษร e กลับซ้ายเป็นขวาอย่างเดียว, กำลังขยาย 400 เท่า',
      'ตัวอักษร e ตะแคงขวา 90°, กำลังขยาย 50 เท่า'
    ],
    correctAnswer: 'ตัวอักษร e กลับหัวและกลับซ้ายเป็นขวา (หัวกลับ 180°), กำลังขยาย 400 เท่า',
    explanation: {
      principle: 'กล้องจุลทรรศน์ชนิดใช้แสงแบบเชิงประกอบให้ภาพเสมือนหัวกลับ (Inverted Image) ทั้งบน-ล่าง และซ้าย-ขวา',
      steps: '1. กำลังขยายรวม = กำลังขยายเลนส์ใกล้ตา × กำลังขยายเลนส์ใกล้วัตถุ = 10 × 40 = 400 เท่า\n2. ภาพที่เกิดขึ้นจะกลับหัวและกลับซ้ายเป็นขวาเสมอ',
      shortcut: '⚡ กำลังขยาย = ตา × วัตถุ (10 × 40 = 400x) ภาพ = หัวกลับซ้ายขวา!'
    }
  },

  // ==========================================
  // 🗣️ 3. ภาษาอังกฤษ (10 ข้อ)
  // ==========================================
  {
    id: 'mock_e_1',
    subject: 'english',
    topic: 'Subject-Verb Agreement',
    standardCode: 'ต 1.2 ป.6/1',
    difficulty: 'medium',
    question: 'Neither the teacher nor the students ______ in the science laboratory right now.',
    options: ['is', 'are', 'was', 'were'],
    correctAnswer: 'are',
    explanation: {
      principle: 'โครงสร้าง Neither... nor... หรือ Either... or... กริยาจะผันตาม "ประธานตัวที่อยู่ใกล้กริยาที่สุด"',
      steps: 'ประธานตัวหลังคือ "the students" ซึ่งเป็นพหูพจน์ และมีคีย์เวิร์ด "right now" (Present) จึงต้องใช้ "are"',
      shortcut: '⚡ Neither A nor B ➔ กริยาผันตาม B เสมอ'
    }
  },
  {
    id: 'mock_e_2',
    subject: 'english',
    topic: 'Tenses (Present Perfect vs Past Simple)',
    standardCode: 'ต 1.2 ป.6/2',
    difficulty: 'medium',
    question: 'Nicha ______ English for five years, and she is still studying it today.',
    options: ['studied', 'has studied', 'had studied', 'studies'],
    correctAnswer: 'has studied',
    explanation: {
      principle: 'Present Perfect (has/have + V.3) ใช้กับเหตุการณ์ที่เริ่มในอดีต ต่อเนื่องมาจนถึงปัจจุบัน และยังมีแนวโน้มดำเนินต่อไป',
      steps: 'มีคีย์เวิร์ด "for five years" + "is still studying" บ่งบอกความต่อเนื่อง ➔ ใช้ has studied',
      shortcut: '⚡ for / since + ยังทำอยู่ = Present Perfect (has/have + V.3)'
    }
  },
  {
    id: 'mock_e_3',
    subject: 'english',
    topic: 'Conditional Sentences (If-Clause Type 1)',
    standardCode: 'ต 1.1 ป.6/4',
    difficulty: 'easy',
    question: 'If you ______ hard for the entrance exam, you will pass with flying colors.',
    options: ['study', 'studies', 'will study', 'studied'],
    correctAnswer: 'study',
    explanation: {
      principle: 'If-Clause Type 1: If + Present Simple (V.1), Future Simple (will + V.inf)',
      steps: 'ประธานคือ you ใน If-clause ต้องใช้กริยาช่อง 1 รูปพหูพจน์คือ "study"',
      shortcut: '⚡ ท่อง: If + V.1, will + V.inf (ห้ามใส่ will หลัง If)',
      trapWarning: '⚠️ ห้ามใส่ will ในประโยคย่อย If เด็ดขาด!'
    }
  },
  {
    id: 'mock_e_4',
    subject: 'english',
    topic: 'Question Tags',
    standardCode: 'ต 1.2 ป.6/3',
    difficulty: 'easy',
    question: 'Your brother rarely eats spicy food, ______?',
    options: ["doesn't he", 'does he', "isn't he", 'is he'],
    correctAnswer: 'does he',
    explanation: {
      principle: 'คำว่า "rarely, seldom, hardly, never" มีความหมายเชิงปฏิเสธ (Negative) ในตัวเอง ➔ Tag ด้านหลังจึงต้องเป็น "บอกเล่า"',
      steps: 'ประโยคหลักใช้กริยา eats (Present Simple ปฏิเสธแฝง) ➔ กริยาช่วยคือ does ➔ Tag คือ "does he?"',
      shortcut: '⚡ Rarely / Never = ปฏิเสธแฝง ➔ Tag ด้านหลังต้องเป็นบวก'
    }
  },
  {
    id: 'mock_e_5',
    subject: 'english',
    topic: 'Passive Voice',
    standardCode: 'ต 1.3 ป.6/1',
    difficulty: 'medium',
    question: 'The new school library ______ by the principal last Monday.',
    options: ['opened', 'was opened', 'is opened', 'has opened'],
    correctAnswer: 'was opened',
    explanation: {
      principle: 'Passive Voice (ประธานถูกกระทำ): S + Verb to be + V.3',
      steps: 'ห้องสมุดถูกเปิด (ประธานไม่มีชีวิต) + คีย์เวิร์ด "last Monday" (Past Simple) ➔ was opened',
      shortcut: '⚡ สิ่งของถูกกระทำในอดีต = was/were + V.3'
    }
  },
  {
    id: 'mock_e_6',
    subject: 'english',
    topic: 'Vocabulary in Context & Synonyms',
    standardCode: 'ต 1.1 ป.6/3',
    difficulty: 'medium',
    question: 'The teacher praised Thanaphat because he was very "diligent" in doing his homework. What is the closest meaning of "diligent"?',
    options: ['lazy', 'hard-working', 'careless', 'naughty'],
    correctAnswer: 'hard-working',
    explanation: {
      principle: 'diligent (adj.) แปลว่า ขยันหมั่นเพียร',
      steps: 'hard-working = ขยัน, lazy = ขี้เกียจ, careless = ประมาท, naughty = ซุกซน',
      shortcut: '⚡ diligent = hard-working = industrious'
    }
  },
  {
    id: 'mock_e_7',
    subject: 'english',
    topic: 'Modal Verbs (Must / Should / Ought to)',
    standardCode: 'ต 1.2 ป.6/4',
    difficulty: 'easy',
    question: 'You ______ wear a helmet when riding a bicycle to stay safe.',
    options: ['should', 'might', 'could', 'would'],
    correctAnswer: 'should',
    explanation: {
      principle: 'should แปลว่า "ควรจะ" ใช้ในการให้คำแนะนำหรือข้อพึงปฏิบัติที่ดี',
      steps: 'การสวมหมวกกันน็อกเป็นคำแนะนำเพื่อความปลอดภัย ➔ ใช้ should',
      shortcut: '⚡ คำแนะนำ = should / ought to'
    }
  },
  {
    id: 'mock_e_8',
    subject: 'english',
    topic: 'Reading Comprehension (Skim & Scan)',
    standardCode: 'ต 1.1 ป.6/4',
    difficulty: 'medium',
    question: 'Read the short notice:\n"Attention Students: The science lab will be closed for maintenance from August 28 to August 30. All biology classes will temporarily meet in Room 402."\nWhere will biology classes be held during this period?',
    options: ['In the Science Lab', 'In Room 402', 'In the Library', 'In the Main Auditorium'],
    correctAnswer: 'In Room 402',
    explanation: {
      principle: 'ใช้เทคนิค Scanning หาคีย์เวิร์ด "biology classes" และ "Room"',
      steps: 'ในข้อความระบุชัดเจนว่า "All biology classes will temporarily meet in Room 402."',
      shortcut: '⚡ สแกนหาตัวเลขห้อง 402 ในข้อความได้คำตอบทันที'
    }
  },
  {
    id: 'mock_e_9',
    subject: 'english',
    topic: 'Everyday Expressions & Conversation',
    standardCode: 'ต 1.2 ป.6/1',
    difficulty: 'easy',
    question: 'Ploy: "I won first place in the speech contest!"\nKrit: "______! I am so proud of you."',
    options: ["Never mind", "Congratulations", "You're welcome", "I'm sorry to hear that"],
    correctAnswer: 'Congratulations',
    explanation: {
      principle: 'เมื่อเพื่อนบอกข่าวดีหรือประสบความสำเร็จ สำนวนที่ถูกต้องคือ "Congratulations!" (ขอแสดงความยินดีด้วย)',
      steps: 'Never mind = ช่างมันเถอะ, You\'re welcome = ด้วยความยินดี (ตอบรับขอบคุณ), I\'m sorry = เสียใจด้วย',
      shortcut: '⚡ ข่าวดี ชนะการประกวด ➔ Congratulations!'
    }
  },
  {
    id: 'mock_e_10',
    subject: 'english',
    topic: 'Error Identification',
    standardCode: 'ต 1.3 ป.6/2',
    difficulty: 'hard',
    question: 'Find the mistake in this sentence:\n"She [A: don\'t] [B: like] to drink coffee [C: because] it makes her heart [D: beat] fast."',
    options: ["don't (A)", 'like (B)', 'because (C)', 'beat (D)'],
    correctAnswer: "don't (A)",
    explanation: {
      principle: 'ประธานเอกพจน์บุรุษที่ 3 (She) ใน Present Simple Tense เมื่อทำเป็นรูปปฏิเสธต้องใช้ "doesn\'t"',
      steps: '"She don\'t" ผิดไวยากรณ์ ต้องแก้เป็น "She doesn\'t"',
      shortcut: '⚡ He / She / It ➔ doesn\'t + V.inf'
    }
  },
  {
    id: 'mock_e_11',
    subject: 'english',
    topic: 'Conditional Sentences (If-Clause Type 2)',
    standardCode: 'ต 1.1 ป.6/4',
    difficulty: 'hard',
    question: 'Choose the correct form to complete the sentence:\n"If I ______ a superhero, I would help all people around the world."',
    options: ['am', 'was', 'were', 'will be'],
    correctAnswer: 'were',
    explanation: {
      principle: 'If-Clause Type 2 (สมมติในสิ่งที่เป็นไปไม่ได้ในปัจจุบัน) กริยาใน if-clause ต้องใช้ Past Simple โดยประธานทุกตัว (รวมถึง I, He, She, It) ในภาษาอังกฤษมาตรฐานทางการจะใช้ "were"',
      steps: '"If I were a superhero..." ตามด้วย would + V.inf',
      shortcut: '⚡ ท่องจำ: If-Clause Type 2 สมมติตรงข้ามความจริง ใช้ "were" เสมอ!',
      trapWarning: '⚠️ ข้อสอบ สทศ. และโรงเรียนดัง มักมีตัวเลือก "was" มาหลอก ห้ามเลือก was ในข้อสอบทางการ!'
    }
  },
  {
    id: 'mock_e_12',
    subject: 'english',
    topic: 'Subject-Verb Agreement กับวลีขยายพหูพจน์ลวงตา',
    standardCode: 'ต 1.2 ป.6/1',
    difficulty: 'hard',
    question: 'Choose the correct verb:\n"The principal, together with thirty new students, ______ inspecting the campus library right now."',
    options: ['is', 'are', 'were', 'have been'],
    correctAnswer: 'is',
    explanation: {
      principle: 'เมื่อประธานเชื่อมด้วยวลีเช่น "together with", "as well as", "along with", "including" กริยาแท้ต้องผันตามประธานตัวหน้าสุด (The principal = เอกพจน์)',
      steps: '1. ประธานหลัก: The principal (เอกพจน์คนเดียว)\n2. วลีขยาย: together with thirty new students (เป็นเพียงส่วนขยาย)\n3. right now บ่งบอก Present Continuous ➔ ใช้ "is"',
      shortcut: '⚡ ตัดวลี "together with..." ทิ้ง ➔ The principal [is] inspecting...'
    }
  }
]

export interface MockExamResult {
  score: number
  total: number
  percentage: number
  grade: string
  mathScore: number
  scienceScore: number
  englishScore: number
  targetReadiness: string
  weakTopics: string[]
  strongTopics: string[]
  completedAt: string
}

export function evaluateMockExam(answers: Record<string, string>): MockExamResult {
  let mathScore = 0
  let scienceScore = 0
  let englishScore = 0
  const weakTopics: string[] = []
  const strongTopics: string[] = []

  MOCK_EXAM_QUESTIONS.forEach(q => {
    const isCorrect = answers[q.id] === q.correctAnswer
    if (q.subject === 'math' && isCorrect) mathScore++
    if (q.subject === 'science' && isCorrect) scienceScore++
    if (q.subject === 'english' && isCorrect) englishScore++

    if (isCorrect) {
      if (!strongTopics.includes(q.topic)) strongTopics.push(q.topic)
    } else {
      if (!weakTopics.includes(q.topic)) weakTopics.push(q.topic)
    }
  })

  const total = MOCK_EXAM_QUESTIONS.length
  const score = mathScore + scienceScore + englishScore
  const percentage = Math.round((score / total) * 100)

  let grade = 'D'
  let targetReadiness = 'ต้องเร่งปูพื้นฐานเพิ่มเติมในบทเรียนหลัก'
  if (percentage >= 85) {
    grade = 'A+'
    targetReadiness = '🎉 ระดับพร้อมสอบ 100%! มีโอกาสสูงมากในการสอบติดห้องเรียนพิเศษ (Gifted/EP)'
  } else if (percentage >= 75) {
    grade = 'A'
    targetReadiness = '✨ ระดับพร้อมสอบเข้า ม.1 ห้องเรียนทั่วไป และมีลุ้นสูงในห้องพิเศษ'
  } else if (percentage >= 60) {
    grade = 'B'
    targetReadiness = '👍 พื้นฐานดี ผ่านเกณฑ์มาตรฐาน แนะนำทบทวนสูตรลัดและทำซ้ำในข้อที่ผิด'
  } else if (percentage >= 50) {
    grade = 'C'
    targetReadiness = '⚠️ พอใช้ได้ ควรเน้นทบทวนเรื่องที่มีจุดอ่อนผ่าน Flashcards และบทเรียน'
  }

  return {
    score,
    total,
    percentage,
    grade,
    mathScore,
    scienceScore,
    englishScore,
    targetReadiness,
    weakTopics: weakTopics.slice(0, 5),
    strongTopics: strongTopics.slice(0, 5),
    completedAt: new Date().toISOString()
  }
}
