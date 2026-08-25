export interface PreTestQuestion {
  id: string
  subject: 'math' | 'science' | 'english'
  question: string
  options: string[]
  correctAnswer: string
  topic: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
}

export const PRE_TEST_QUESTIONS: PreTestQuestion[] = [
  // ── MATH (10 ข้อ) ──────────────────────────────────────────
  {
    id: 'm1', subject: 'math',
    question: '125 ÷ 5 + 3 × 4 = ?',
    options: ['37', '25', '100', '44'],
    correctAnswer: '37', topic: 'numbers_basics', difficulty: 'basic'
  },
  {
    id: 'm2', subject: 'math',
    question: 'เศษส่วน 3/4 คิดเป็นทศนิยมเท่าไหร่?',
    options: ['0.34', '0.75', '0.43', '0.25'],
    correctAnswer: '0.75', topic: 'fractions_decimals', difficulty: 'basic'
  },
  {
    id: 'm3', subject: 'math',
    question: 'ถ้า x + 5 = 12 แล้ว x มีค่าเท่าไหร่?',
    options: ['5', '7', '17', '60'],
    correctAnswer: '7', topic: 'algebra_intro', difficulty: 'basic'
  },
  {
    id: 'm4', subject: 'math',
    question: 'สี่เหลี่ยมผืนผ้ากว้าง 6 ซม. ยาว 9 ซม. มีพื้นที่เท่าไหร่?',
    options: ['30 ซม²', '54 ซม²', '15 ซม²', '45 ซม²'],
    correctAnswer: '54 ซม²', topic: 'geometry', difficulty: 'basic'
  },
  {
    id: 'm5', subject: 'math',
    question: 'ค่าเฉลี่ยของ 10, 20, 30, 40 คือเท่าไหร่?',
    options: ['20', '25', '30', '100'],
    correctAnswer: '25', topic: 'statistics', difficulty: 'basic'
  },
  {
    id: 'm6', subject: 'math',
    question: 'ห.ร.ม. ของ 12 และ 18 คือ?',
    options: ['2', '3', '6', '36'],
    correctAnswer: '6', topic: 'numbers_basics', difficulty: 'intermediate'
  },
  {
    id: 'm7', subject: 'math',
    question: '40% ของ 250 คือเท่าไหร่?',
    options: ['100', '80', '150', '40'],
    correctAnswer: '100', topic: 'fractions_decimals', difficulty: 'intermediate'
  },
  {
    id: 'm8', subject: 'math',
    question: 'วงกลมรัศมี 7 ซม. มีพื้นที่ประมาณเท่าไหร่? (π ≈ 3.14)',
    options: ['43.96 ซม²', '153.86 ซม²', '21.98 ซม²', '49 ซม²'],
    correctAnswer: '153.86 ซม²', topic: 'geometry', difficulty: 'intermediate'
  },
  {
    id: 'm9', subject: 'math',
    question: 'ถ้า 2x - 3 = 11 แล้ว x = ?',
    options: ['4', '7', '8', '5'],
    correctAnswer: '7', topic: 'algebra_intro', difficulty: 'intermediate'
  },
  {
    id: 'm10', subject: 'math',
    question: 'ค.ร.น. ของ 4, 6 และ 12 คือ?',
    options: ['24', '12', '2', '48'],
    correctAnswer: '12', topic: 'numbers_basics', difficulty: 'advanced'
  },

  // ── SCIENCE (10 ข้อ) ─────────────────────────────────────
  {
    id: 's1', subject: 'science',
    question: 'หน่วยที่เล็กที่สุดของสิ่งมีชีวิตคืออะไร?',
    options: ['เนื้อเยื่อ', 'เซลล์', 'อวัยวะ', 'ระบบ'],
    correctAnswer: 'เซลล์', topic: 'living_things', difficulty: 'basic'
  },
  {
    id: 's2', subject: 'science',
    question: 'น้ำที่กลายเป็นไอน้ำเกิดการเปลี่ยนแปลงแบบใด?',
    options: ['การเปลี่ยนแปลงทางเคมี', 'การเปลี่ยนแปลงทางกายภาพ', 'การสันดาป', 'การหมัก'],
    correctAnswer: 'การเปลี่ยนแปลงทางกายภาพ', topic: 'matter_properties', difficulty: 'basic'
  },
  {
    id: 's3', subject: 'science',
    question: 'แรงชนิดใดที่ทำให้วัตถุตกลงสู่พื้นโลก?',
    options: ['แรงเสียดทาน', 'แรงแม่เหล็ก', 'แรงโน้มถ่วง', 'แรงดัน'],
    correctAnswer: 'แรงโน้มถ่วง', topic: 'force_motion', difficulty: 'basic'
  },
  {
    id: 's4', subject: 'science',
    question: 'ดาวเคราะห์ดวงใดอยู่ใกล้ดวงอาทิตย์มากที่สุด?',
    options: ['โลก', 'ดาวศุกร์', 'ดาวพุธ', 'ดาวอังคาร'],
    correctAnswer: 'ดาวพุธ', topic: 'earth_space', difficulty: 'basic'
  },
  {
    id: 's5', subject: 'science',
    question: 'พลังงานแสงอาทิตย์เปลี่ยนเป็นพลังงานอะไรในพืช?',
    options: ['พลังงานไฟฟ้า', 'พลังงานเคมี', 'พลังงานความร้อน', 'พลังงานเสียง'],
    correctAnswer: 'พลังงานเคมี', topic: 'energy', difficulty: 'basic'
  },
  {
    id: 's6', subject: 'science',
    question: 'สารใดเป็นสารบริสุทธิ์?',
    options: ['น้ำทะเล', 'น้ำตาลละลายน้ำ', 'น้ำกลั่น', 'น้ำโซดา'],
    correctAnswer: 'น้ำกลั่น', topic: 'matter_properties', difficulty: 'intermediate'
  },
  {
    id: 's7', subject: 'science',
    question: 'ห่วงโซ่อาหาร: หญ้า → กระต่าย → เหยี่ยว ข้อใดถูก?',
    options: ['เหยี่ยวเป็นผู้ผลิต', 'กระต่ายเป็นผู้บริโภคอันดับ 2', 'หญ้าเป็นผู้บริโภค', 'กระต่ายเป็นผู้บริโภคอันดับ 1'],
    correctAnswer: 'กระต่ายเป็นผู้บริโภคอันดับ 1', topic: 'living_things', difficulty: 'intermediate'
  },
  {
    id: 's8', subject: 'science',
    question: 'วัตถุมวล 5 กก. ออกแรง 10 N จะมีความเร่งเท่าไหร่?',
    options: ['50 m/s²', '2 m/s²', '0.5 m/s²', '15 m/s²'],
    correctAnswer: '2 m/s²', topic: 'force_motion', difficulty: 'advanced'
  },
  {
    id: 's9', subject: 'science',
    question: 'ปรากฏการณ์ใดเกิดจากโลกหมุนรอบตัวเอง?',
    options: ['การเกิดฤดูกาล', 'กลางวัน-กลางคืน', 'สุริยุปราคา', 'จันทรุปราคา'],
    correctAnswer: 'กลางวัน-กลางคืน', topic: 'earth_space', difficulty: 'intermediate'
  },
  {
    id: 's10', subject: 'science',
    question: 'การถ่ายเทความร้อนผ่านตัวกลางแข็งเรียกว่า?',
    options: ['การพา', 'การนำ', 'การแผ่รังสี', 'การระเหย'],
    correctAnswer: 'การนำ', topic: 'energy', difficulty: 'intermediate'
  },

  // ── ENGLISH (10 ข้อ) ─────────────────────────────────────
  {
    id: 'e1', subject: 'english',
    question: 'Choose the correct verb: She ___ to school every day.',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 'goes', topic: 'grammar_basics', difficulty: 'basic'
  },
  {
    id: 'e2', subject: 'english',
    question: 'What is the opposite of "happy"?',
    options: ['joyful', 'excited', 'sad', 'glad'],
    correctAnswer: 'sad', topic: 'vocabulary', difficulty: 'basic'
  },
  {
    id: 'e3', subject: 'english',
    question: 'Choose the correct sentence:',
    options: ['I am go to school.', 'I going to school.', 'I am going to school.', 'I goes to school.'],
    correctAnswer: 'I am going to school.', topic: 'grammar_basics', difficulty: 'basic'
  },
  {
    id: 'e4', subject: 'english',
    question: 'What does "enormous" mean?',
    options: ['very small', 'very large', 'very fast', 'very quiet'],
    correctAnswer: 'very large', topic: 'vocabulary', difficulty: 'intermediate'
  },
  {
    id: 'e5', subject: 'english',
    question: 'Fill in: They ___ football yesterday.',
    options: ['play', 'plays', 'played', 'playing'],
    correctAnswer: 'played', topic: 'grammar_basics', difficulty: 'basic'
  },
  {
    id: 'e6', subject: 'english',
    question: 'Read: "The library opens at 8 AM and closes at 6 PM." When does it close?',
    options: ['8 AM', '12 PM', '6 PM', '10 PM'],
    correctAnswer: '6 PM', topic: 'reading', difficulty: 'basic'
  },
  {
    id: 'e7', subject: 'english',
    question: 'Which sentence is in the future tense?',
    options: ['She ate breakfast.', 'She eats breakfast.', 'She will eat breakfast.', 'She is eating breakfast.'],
    correctAnswer: 'She will eat breakfast.', topic: 'grammar_basics', difficulty: 'intermediate'
  },
  {
    id: 'e8', subject: 'english',
    question: 'Choose the word that means "to look at something carefully":',
    options: ['glance', 'stare', 'examine', 'peek'],
    correctAnswer: 'examine', topic: 'vocabulary', difficulty: 'intermediate'
  },
  {
    id: 'e9', subject: 'english',
    question: 'Read: "Although it was raining, we went for a walk." What happened?',
    options: ['We stayed home because of rain.', 'We walked despite the rain.', 'It stopped raining.', 'We ran in the rain.'],
    correctAnswer: 'We walked despite the rain.', topic: 'reading', difficulty: 'intermediate'
  },
  {
    id: 'e10', subject: 'english',
    question: 'The prefix "un-" in "unhappy" means:',
    options: ['very', 'not', 'before', 'again'],
    correctAnswer: 'not', topic: 'vocabulary', difficulty: 'advanced'
  },
]
