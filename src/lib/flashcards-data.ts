/**
 * MASTER ม.1 — Flashcards Data & Spaced Repetition Engine
 * บรรจุเคล็ดลับและจุดเน้นมาตรฐานสากล (Singapore Math, AMC 8, Cambridge Lower Secondary, Oxford Grammar)
 */

export interface Flashcard {
  id: string
  subject: 'math' | 'science' | 'english' | 'mistakes'
  topic: string
  front: {
    title: string
    subtitle?: string
    formulaOrQuestion: string
    hint?: string
  }
  back: {
    answer: string
    explanation: string
    shortcutTrick?: string
    commonTrap?: string
  }
  difficulty: 'easy' | 'medium' | 'hard'
  mastered?: boolean
}

export const CORE_FLASHCARDS: Flashcard[] = [
  // ==========================================
  // 🔢 1. FLASHCARDS คณิตศาสตร์ (Math & Singapore Modeling)
  // ==========================================
  {
    id: 'fc_m_1',
    subject: 'math',
    topic: 'การถอดรูทเร็วใน 3 วินาที',
    front: {
      title: 'ถอดสแควรูท √7,225',
      subtitle: 'เทคนิคตัด 2 ตัวท้าย',
      formulaOrQuestion: '√7,225 = ?',
      hint: 'ตัด 25 ทิ้ง ดู 72 หาหลักสิบ แล้วดูเลขลงท้าย 5'
    },
    back: {
      answer: '85',
      explanation: '1. ตัด 2 ตัวท้าย (25) เหลือ 72\n2. ตัวเลขที่ยกกำลังสองไม่เกิน 72 คือ 8 (8² = 64)\n3. เลขท้าย 5 ถอดรูทได้ 5 เสมอ\n4. ได้คำตอบ = 85 ทันที!',
      shortcutTrick: '⚡ 85² = (8×9)25 = 7,225 ตรวจคำตอบได้ใน 1 วินาที'
    },
    difficulty: 'medium'
  },
  {
    id: 'fc_m_2',
    subject: 'math',
    topic: 'ยกกำลังสองเลขลงท้าย 5',
    front: {
      title: 'ยกกำลังสองเลขลงท้าย 5',
      subtitle: 'สูตรลัดประจำตัว',
      formulaOrQuestion: '65² = ?',
      hint: 'หน้า × (หน้า + 1) แล้วตามด้วย 25'
    },
    back: {
      answer: '4,225',
      explanation: '1. เลขหน้าคือ 6 ➔ นำ 6 × (6 + 1) = 6 × 7 = 42\n2. ต่อท้ายด้วย 25 เสมอ\n3. รวมเป็น 4,225',
      shortcutTrick: '⚡ ใช้ได้กับทุกจำนวนที่ลงท้ายด้วย 5 เช่น 35² = (3×4)25 = 1,225'
    },
    difficulty: 'easy'
  },
  {
    id: 'fc_m_3',
    subject: 'math',
    topic: 'พื้นที่ใบไม้แรเงาในสี่เหลี่ยมจัตุรัส',
    front: {
      title: 'พื้นที่รูปใบไม้แรเงา',
      subtitle: 'จัตุรัสยาวด้านละ a',
      formulaOrQuestion: 'พื้นที่ใบไม้แรเงา = ?',
      hint: 'สูตรลัดจำง่าย ใช้เศษส่วน'
    },
    back: {
      answer: '4/7 × a²',
      explanation: 'พื้นที่ใบไม้เกิดจาก (พื้นที่ควอเดรนท์ 2 รูป) - พื้นที่สี่เหลี่ยมจัตุรัส\nเมื่อแทนค่า π ≈ 22/7 จะได้สูตรสำเร็จรูปคือ (4/7) × a²',
      shortcutTrick: '⚡ เช่น จัตุรัสยาว 14 ซม. ➔ พื้นที่ใบไม้ = (4/7) × 14 × 14 = 112 ตร.ซม.',
      commonTrap: '⚠️ อย่าลืมว่าด้านของสี่เหลี่ยมต้องเท่ากัน (จัตุรัสเท่านั้น)'
    },
    difficulty: 'hard'
  },
  {
    id: 'fc_m_4',
    subject: 'math',
    topic: 'หามุมระหว่างเข็มนาฬิกา (Clock Angle Hack)',
    front: {
      title: 'มุมระหว่างเข็มสั้นและเข็มยาว',
      subtitle: 'สูตรลัดสากล AMC 8 / ห้อง Gifted',
      formulaOrQuestion: 'เวลา 03:40 น. เข็มสั้นและเข็มยาวทำมุมกันกี่องศา?',
      hint: 'สูตร |30H - 5.5M| โดย H คือชั่วโมง M คือนาที'
    },
    back: {
      answer: '130 องศา (°)',
      explanation: 'สูตร: มุม = |30(H) - 5.5(M)|\n1. แทนค่า H = 3, M = 40\n2. มุม = |30(3) - 5.5(40)| = |90 - 220| = |-130| = 130°',
      shortcutTrick: '⚡ สูตร |30H - 5.5M| ใช้ได้กับทุกเวลาในโลกโดยไม่ต้องวาดหน้าปัด'
    },
    difficulty: 'hard'
  },
  {
    id: 'fc_m_5',
    subject: 'math',
    topic: 'Singapore Bar Model (โจทย์ของส่วนที่เหลือ)',
    front: {
      title: 'โมเดลแท่งแก้โจทย์เศษส่วน 2 ขยัก',
      subtitle: 'Singapore Math Bar Model',
      formulaOrQuestion: 'มีเงินก้อนหนึ่ง ใช้ไป 1/3 ของทั้งหมด แล้วใช้ไปอีก 1/4 ของ "ส่วนที่เหลือ" เหลือเงิน 600 บาท เดิมมีเงินกี่บาท?',
      hint: 'หาค่าของ 1 กล่อง (1 Unit) จากส่วนที่เหลือ'
    },
    back: {
      answer: '1,200 บาท',
      explanation: '1. วาดแท่ง 3 ช่อง: ใช้ไป 1 ช่อง ➔ เหลือ 2 ช่อง\n2. แบ่ง 2 ช่องที่เหลือเป็น 4 ส่วนย่อย: ใช้ไป 1 ส่วนย่อย เหลือ 3 ส่วนย่อย = 600 บ.\n3. 1 ส่วนย่อย = 600 ÷ 3 = 200 บ. ➔ ส่วนที่เหลือ 4 ส่วน = 800 บ.\n4. เดิมมี 3 ช่องใหญ่ = 800 × (3/2) = 1,200 บาท',
      shortcutTrick: '⚡ หาค่า 1 Unit เสมอ: 3 ส่วนที่เหลือ = 600 ➔ 1 ส่วน = 200 ➔ เงินทั้งหมด = 1,200 บ.'
    },
    difficulty: 'hard'
  },
  {
    id: 'fc_m_6',
    subject: 'math',
    topic: 'เทคนิคหาเลขเรียงกัน (Consecutive Integers)',
    front: {
      title: 'ผลรวมเลขเรียงกัน 5 จำนวน',
      subtitle: 'เทคนิคตัวตรงกลาง',
      formulaOrQuestion: 'เลข 5 จำนวนเรียงติดกัน รวมกันได้ 245 จงหาจำนวนที่มากที่สุด?',
      hint: 'ตัวตรงกลาง = ผลรวม ÷ จำนวนตัว'
    },
    back: {
      answer: '51',
      explanation: '1. หาตัวตรงกลาง (ตัวที่ 3): 245 ÷ 5 = 49\n2. เลข 5 จำนวนคือ: 47, 48, [49], 50, 51\n3. จำนวนที่มากที่สุดคือ 51',
      shortcutTrick: '⚡ ตัวตรงกลาง = 245/5 = 49 ➔ นับไปข้างหน้า 2 ตัว = 51 ทันทีใน 3 วิ!'
    },
    difficulty: 'easy'
  },
  {
    id: 'fc_m_7',
    subject: 'math',
    topic: 'กฎการหารลงตัวเร็ว (Divisibility Rules)',
    front: {
      title: 'เช็คการหารลงตัว 3, 4, 9, 11',
      subtitle: 'MIT Quick Computation Rules',
      formulaOrQuestion: 'จำนวน 7,458 หารด้วย 3 และ 9 ลงตัวหรือไม่?',
      hint: 'นำเลขโดดทุกหลักมาบวกกัน'
    },
    back: {
      answer: 'หาร 3 ลงตัว แต่หาร 9 ไม่ลงตัว',
      explanation: '1. ผลบวกเลขโดด: 7 + 4 + 5 + 8 = 24\n2. 24 หารด้วย 3 ลงตัว (24÷3=8) ➔ 7,458 จึงหารด้วย 3 ลงตัว\n3. 24 หารด้วย 9 ไม่ลงตัว (24÷9=2.66) ➔ 7,458 จึงหารด้วย 9 ไม่ลงตัว',
      shortcutTrick: '⚡ หาร 3 & 9 ➔ บวกเลขโดด | หาร 4 ➔ ดูแค่ 2 ตัวท้าย'
    },
    difficulty: 'medium'
  },
  {
    id: 'fc_m_8',
    subject: 'math',
    topic: 'แปลง % เป็นองศาบนแผนภูมิวงกลม',
    front: {
      title: 'องศาบนแผนภูมิวงกลม',
      subtitle: 'แปลง % เป็นมุมที่จุดศูนย์กลาง',
      formulaOrQuestion: 'สินค้ามียอดขาย 35% คิดเป็นมุมที่จุดศูนย์กลางกี่องศา?',
      hint: 'มุม = เปอร์เซ็นต์ × 3.6°'
    },
    back: {
      answer: '126 องศา (°)',
      explanation: 'มุมองศา = 35 × 3.6 = 126° (คิดในใจ: 35×3 = 105, 35×0.6 = 21 ➔ 105+21 = 126°)',
      shortcutTrick: '⚡ 1% = 3.6° เสมอ'
    },
    difficulty: 'easy'
  },
  {
    id: 'fc_m_9',
    subject: 'math',
    topic: 'สูตรทำงานพร้อมกัน 2 คน (Work Problem)',
    front: {
      title: 'ทำงานร่วมกันเสร็จในกี่วัน',
      subtitle: 'สูตรผลคูณส่วนผลบวก',
      formulaOrQuestion: 'ก ทำงานคนเดียวเสร็จใน 6 วัน ข ทำเสร็จใน 12 วัน ถ้าช่วยกันทำจะเสร็จในกี่วัน?',
      hint: 'เวลาเสร็จ = (A × B) / (A + B)'
    },
    back: {
      answer: '4 วัน',
      explanation: 'สูตร: เวลาพร้อมกัน = (A × B) / (A + B)\n= (6 × 12) / (6 + 12) = 72 / 18 = 4 วัน',
      shortcutTrick: '⚡ คูณกันหารด้วยบวกกัน: (6 × 12) / 18 = 4 วัน ทันที'
    },
    difficulty: 'medium'
  },
  {
    id: 'fc_m_10',
    subject: 'math',
    topic: 'ความเร็วสัมพัทธ์ (Relative Speed)',
    front: {
      title: 'รถวิ่งเข้าหากัน (สวนทาง)',
      subtitle: 'เวลาที่ใช้ในการพบกัน',
      formulaOrQuestion: 'รถ 2 คันอยู่ห่างกัน 300 กม. คันแรกวิ่ง 60 km/h คันที่สองวิ่ง 40 km/h วิ่งเข้าหากัน จะเจอกันในอีกกี่ชั่วโมง?',
      hint: 'วิ่งสวนทาง ➔ เอาความเร็วมา "บวก" กัน'
    },
    back: {
      answer: '3 ชั่วโมง',
      explanation: '1. ความเร็วรวม (สวนทาง) = 60 + 40 = 100 km/h\n2. เวลา = ระยะทาง ÷ ความเร็ว = 300 ÷ 100 = 3 ชั่วโมง',
      shortcutTrick: '⚡ สวนทาง = ความเร็วบวกกัน | ตามกัน = ความเร็วลบกัน'
    },
    difficulty: 'medium'
  },

  // ==========================================
  // 🔬 2. FLASHCARDS วิทยาศาสตร์ (Cambridge & NGSS)
  // ==========================================
  {
    id: 'fc_s_1',
    subject: 'science',
    topic: 'สายตากับเลนส์แว่นตา',
    front: {
      title: 'สายตาสั้น vs สายตายาว',
      subtitle: 'ใช้เลนส์อะไรแก้ไข?',
      formulaOrQuestion: 'สายตาสั้นใช้เลนส์อะไร? สายตายาวใช้เลนส์อะไร?',
      hint: 'ท่องสูตร: สั้น-เว้า, ยาว-นูน'
    },
    back: {
      answer: 'สายตาสั้น = เลนส์เว้า | สายตายาว = เลนส์นูน',
      explanation: '• สายตาสั้น: แสงตกก่อนถึงเรตินา ต้องใช้ "เลนส์เว้า" เพื่อกระจายแสง\n• สายตายาว: แสงตกหลังเรตินา ต้องใช้ "เลนส์นูน" เพื่อรวมแสง',
      shortcutTrick: '⚡ ท่องคำคล้องจอง: "สั้นเว้า ยาวนูน กระจายรวม"'
    },
    difficulty: 'easy'
  },
  {
    id: 'fc_s_2',
    subject: 'science',
    topic: 'หลักแบร์นูลลีและความดันอากาศ (Bernoulli)',
    front: {
      title: 'หลักการยกตัวของปีกเครื่องบิน',
      subtitle: 'Bernoulli\'s Principle',
      formulaOrQuestion: 'อากาศเหนือปีกไหลเร็วกว่าใต้ปีก ความดันอากาศด้านบนจะเป็นอย่างไรเมื่อเทียบกับด้านล่าง?',
      hint: 'ความเร็วลมสูง ➔ ความดันจะต่ำ'
    },
    back: {
      answer: 'ความดันด้านบน "ต่ำกว่า" ด้านล่าง ➔ เกิดแรงยก (Lift)',
      explanation: 'ตามหลักแบร์นูลลี:\n1. อากาศด้านบนปีกโค้ง ไหลเร็วกว่า ➔ ความดันต่ำ\n2. อากาศใต้ปีกตรง ไหลช้ากว่า ➔ ความดันสูงกว่า ดันปีกขึ้นข้างบน',
      shortcutTrick: '⚡ ลมแรง = ความดันต่ำ ➔ ดันจากความดันสูงไปหาความดันต่ำเสมอ'
    },
    difficulty: 'medium'
  },
  {
    id: 'fc_s_3',
    subject: 'science',
    topic: 'การสืบพันธุ์ของพืชดอก',
    front: {
      title: 'หลังปฏิสนธิ อะไรเปลี่ยนเป็นอะไร?',
      subtitle: 'รังไข่ และ ออวุล',
      formulaOrQuestion: 'รังไข่ เจริญเป็น ? | ออวุล เจริญเป็น ?',
      hint: 'ท่อง: รังไข่-ผล, ออวุล-เมล็ด'
    },
    back: {
      answer: 'รังไข่ ➔ ผล (Fruit) | ออวุล ➔ เมล็ด (Seed)',
      explanation: '• รังไข่ (Ovary) เจริญเป็น ผลไม้\n• ออวุล (Ovule) เจริญเป็น เมล็ด\n• ไข่ (Egg) เจริญเป็น ต้นอ่อน (Embryo)',
      commonTrap: '⚠️ ข้อสอบชอบหลอกว่าออวุลกลายเป็นผลไม้ จำไว้ว่า รังไข่อยู่ข้างนอกจึงเป็นเนื้อผล'
    },
    difficulty: 'medium'
  },
  {
    id: 'fc_s_4',
    subject: 'science',
    topic: 'การถ่ายโอนความร้อน 3 รูปแบบ (Heat Transfer)',
    front: {
      title: 'การนำ vs การพา vs การแผ่รังสี',
      subtitle: 'Thermal Physics',
      formulaOrQuestion: 'ความร้อนจากดวงอาทิตย์ส่งมาถึงโลกผ่านอวกาศด้วยกระบวนการใด?',
      hint: 'อวกาศเป็นสุญญากาศ ไม่มีตัวกลาง'
    },
    back: {
      answer: 'การแผ่รังสีความร้อน (Radiation)',
      explanation: '1. การนำ (Conduction): อนุภาคของแข็งสั่นส่งต่อ\n2. การพา (Convection): ของไหล (น้ำ/อากาศ) พาความร้อนลอยตัว\n3. การแผ่รังสี (Radiation): เป็นคลื่นแม่เหล็กไฟฟ้า ไม่ง้อตัวกลาง เดินทางผ่านสุญญากาศได้',
      shortcutTrick: '⚡ ของแข็ง=นำ, ของไหล=พา, สุญญากาศ=แผ่รังสี'
    },
    difficulty: 'medium'
  },
  {
    id: 'fc_s_5',
    subject: 'science',
    topic: 'กฎ 10% การถ่ายทอดพลังงานในระบบนิเวศ',
    front: {
      title: 'Lindeman\'s 10% Energy Law',
      subtitle: 'Trophic Levels & Food Pyramid',
      formulaOrQuestion: 'ถ้าผู้ผลิต (พืช) มีพลังงาน 10,000 แคลอรี ผู้บริโภคลำดับที่ 2 (สัตว์กินเนื้อ) จะได้รับพลังงานเหลือกี่แคลอรี?',
      hint: 'ลดลงทีละ 10% ในแต่ละขั้น (หาร 10)'
    },
    back: {
      answer: '100 แคลอรี',
      explanation: '1. พืช (ผู้ผลิต) = 10,000 kcal\n2. ผู้บริโภคลำดับ 1 (กินพืช) = 10,000 × 10% = 1,000 kcal\n3. ผู้บริโภคลำดับ 2 (กินเนื้อ) = 1,000 × 10% = 100 kcal\n(อีก 90% สูญเสียไปในการหายใจ การเคลื่อนไหว และขับถ่าย)',
      shortcutTrick: '⚡ ขยับขึ้น 1 ขั้น ➔ ตัดศูนย์ออก 1 ตัวเสมอ!'
    },
    difficulty: 'hard'
  },
  {
    id: 'fc_s_6',
    subject: 'science',
    topic: 'การเกิดสนิมเหล็ก (Rusting)',
    front: {
      title: 'ปัจจัยที่ทำให้เกิดสนิมเหล็ก',
      subtitle: 'ต้องมีครบ 2 อย่างคืออะไร?',
      formulaOrQuestion: 'เหล็ก + ปัจจัย A + ปัจจัย B = สนิม (Fe₂O₃·nH₂O)',
      hint: 'ขาดอย่างใดอย่างหนึ่งจะไม่เกิดสนิม'
    },
    back: {
      answer: 'น้ำ (ความชื้น) + แก๊สออกซิเจน (O₂)',
      explanation: 'การเกิดสนิมเหล็กเป็นปฏิกิริยาเคมีที่ต้องการทั้ง "น้ำ" และ "ออกซิเจน" พร้อมกัน การทาสีหรือเคลือบน้ำมันช่วยป้องกันไม่ให้เหล็กสัมผัสน้ำและอากาศ',
      commonTrap: '⚠️ แก๊สไนโตรเจน หรือ คาร์บอนไดออกไซด์ ไม่ได้เป็นตัวการทำให้เกิดสนิม'
    },
    difficulty: 'easy'
  },
  {
    id: 'fc_s_7',
    subject: 'science',
    topic: 'การต่อหลอดไฟฟ้า อนุกรม vs ขนาน',
    front: {
      title: 'การต่อวงจรไฟฟ้าในบ้าน',
      subtitle: 'อนุกรม หรือ ขนาน เพราะเหตุใด?',
      formulaOrQuestion: 'วงจรไฟฟ้าในบ้านต่อแบบใด? และถ้าดวงหนึ่งดับ ดวงอื่นจะเป็นอย่างไร?',
      hint: 'ดวงหนึ่งดับ ดวงอื่นต้องยังติดอยู่'
    },
    back: {
      answer: 'ต่อแบบ "ขนาน" (Parallel) — ถ้าหลอดหนึ่งขาด หลอดอื่นยังสว่างตามปกติ',
      explanation: 'วงจรแบบขนานมีความต่างศักย์ (โวลต์) เท่ากันทุกสาย และแยกกระแสอิสระ หากหลอดใดหลอดหนึ่งขาด วงจรสายอื่นยังคงครบวงจรทำงานได้',
      shortcutTrick: '⚡ อนุกรม = หลอดหนึ่งดับ ดับหมดทั้งสาย | ขนาน = ดับเฉพาะดวงที่ขาด'
    },
    difficulty: 'medium'
  },

  // ==========================================
  // 🗣️ 3. FLASHCARDS ภาษาอังกฤษ (Oxford & Cambridge CEFR)
  // ==========================================
  {
    id: 'fc_e_1',
    subject: 'english',
    topic: 'Order of Adjectives (OSASCOMP กฎทอง)',
    front: {
      title: 'การเรียงลำดับคำคุณศัพท์ (Adjectives Order)',
      subtitle: 'สูตรลับสากล OSASCOMP ออกสอบ Gifted ทุกปี',
      formulaOrQuestion: 'เรียงคำ: table / wooden / round / beautiful / small',
      hint: 'Opinion ➔ Size ➔ Shape ➔ Material'
    },
    back: {
      answer: 'a beautiful small round wooden table',
      explanation: 'ลำดับ OSASCOMP:\n1. O (Opinion): beautiful\n2. S (Size): small\n3. A (Age): -\n4. S (Shape): round\n5. C (Color): -\n6. O (Origin): -\n7. M (Material): wooden\n8. P (Purpose): table',
      shortcutTrick: '⚡ ท่องรหัสลับ: "โอ-แซส-คอมพ์ (OSASCOMP)"'
    },
    difficulty: 'hard'
  },
  {
    id: 'fc_e_2',
    subject: 'english',
    topic: 'Conditional Sentence (If-Clause Type 1)',
    front: {
      title: 'If-Clause Type 1 (เหตุการณ์จริงในอนาคต)',
      subtitle: 'โครงสร้างประโยค',
      formulaOrQuestion: 'If + Subject + [ ? ] , Subject + will + V.inf',
      hint: 'Tense ใน If-clause ต้องเป็นปัจจุบัน'
    },
    back: {
      answer: 'V.1 (Present Simple Tense)',
      explanation: 'โครงสร้าง: If + Present Simple (V.1/V.s,es) , Future Simple (will + V.inf)\nตัวอย่าง: If it rains tomorrow, we will stay at home.',
      commonTrap: '⚠️ ห้ามใส่ will ในช่อง If เด็ดขาด! เช่น If it will rain (ผิด ❌)'
    },
    difficulty: 'medium'
  },
  {
    id: 'fc_e_3',
    subject: 'english',
    topic: 'คำนามนับไม่ได้ยอดฮิต (Uncountable Nouns Trap)',
    front: {
      title: 'Advice, Information, Furniture, Bread, Homework',
      subtitle: 'นับได้หรือนับไม่ได้?',
      formulaOrQuestion: 'I need [ a / some / an ] information for my project.',
      hint: 'คำเหล่านี้ในภาษาอังกฤษถือเป็นนามนับไม่ได้'
    },
    back: {
      answer: 'some (หรือ a piece of information)',
      explanation: 'คำนามนับไม่ได้ (Uncountable Noun) ห้ามใช้ a/an และห้ามเติม -s เด็ดขาด!\n• Advice (คำแนะนำ)\n• Information (ข้อมูล)\n• Furniture (เฟอร์นิเจอร์)\n• Baggage/Luggage (สัมภาระ)\n• Bread (ขนมปัง)\n• Homework (การบ้าน)',
      shortcutTrick: '⚡ เจอนามพวกนี้ในข้อสอบ ห้ามเติม -s และห้ามใส่ a/an'
    },
    difficulty: 'medium'
  },
  {
    id: 'fc_e_4',
    subject: 'english',
    topic: 'Used to vs Be used to (เคยทำ vs ชินแล้ว)',
    front: {
      title: 'Used to vs Be used to',
      subtitle: 'ความหมายและโครงสร้างต่างกันอย่างไร?',
      formulaOrQuestion: 'He is used to [ wake / waking ] up early.',
      hint: 'be used to ตามด้วย V.ing แปลว่าเคยชิน'
    },
    back: {
      answer: 'waking (V.ing)',
      explanation: '1. used to + V.inf = "เคยทำในอดีต" (ตอนนี้เลิกแล้ว) เช่น I used to swim.\n2. be/get used to + V.ing / Noun = "เคยชินกับสิ่งนั้น" เช่น He is used to waking up early.',
      shortcutTrick: '⚡ มี Verb to be อยู่ข้างหน้า used to ➔ กริยาต้องเติม -ing เสมอ'
    },
    difficulty: 'hard'
  },
  {
    id: 'fc_e_5',
    subject: 'english',
    topic: 'Question Tags กฎทอง',
    front: {
      title: 'กฎหลักของ Question Tags',
      subtitle: 'หน้าบอกเล่า หลังปฏิเสธ',
      formulaOrQuestion: 'She rarely eats fast food, [ ? ]?',
      hint: 'rarely แปลว่าแทบจะไม่ (ปฏิเสธแฝง) ➔ Tag หลังต้องเป็นบอกเล่า'
    },
    back: {
      answer: 'does she?',
      explanation: 'คำบอกปฏิเสธแฝง (rarely, seldom, barely, never, hardly) ➔ ประโยคหลักถือเป็นปฏิเสธแล้ว ดังนั้น Question Tag ด้านหลังต้องเป็น "บอกเล่า (does she?)"',
      shortcutTrick: '⚡ หน้าลบ หลังบวก / Rarely, Never ➔ Tag เป็นบวกเสมอ'
    },
    difficulty: 'medium'
  },
  {
    id: 'fc_e_6',
    subject: 'english',
    topic: 'Suffix แปลงหน้าที่ของคำ (Part of Speech Suffixes)',
    front: {
      title: 'Suffix ท้ายคำบอกชนิดของคำ',
      subtitle: 'Harvard Morphological Decoder',
      formulaOrQuestion: 'คำที่ลงท้ายด้วย -tion, -ment, -ness และ -ful, -less เป็นคำชนิดใด?',
      hint: '-tion/-ment/-ness เป็นคำนาม | -ful/-less เป็นคุณศัพท์'
    },
    back: {
      answer: '-tion, -ment, -ness = Noun (คำนาม) | -ful, -less = Adjective (คุณศัพท์)',
      explanation: '• Noun Suffixes: Education (การศึกษา), Movement (การเคลื่อนไหว), Happiness (ความสุข)\n• Adjective Suffixes: Helpful (มีประโยชน์), Careless (ประมาท), Dangerous (อันตราย)\n• Adverb Suffixes: Quickly (อย่างรวดเร็ว — Adj + ly = Adv)',
      shortcutTrick: '⚡ ดูแค่หางคำ (Suffix) ก็รู้หน้าที่ของคำทันทีโดยไม่ต้องแปลความหมาย'
    },
    difficulty: 'easy'
  },
  {
    id: 'fc_e_7',
    subject: 'english',
    topic: 'การเลือกใช้ Make vs Do ในชีวิตประจำวัน',
    front: {
      title: 'Make vs Do Collocations',
      subtitle: 'Oxford Essential Collocations',
      formulaOrQuestion: 'จงจับคู่: [ ? ] the bed / [ ? ] homework / [ ? ] a mistake / [ ? ] the dishes',
      hint: 'DO = หน้าที่/งาน | MAKE = ประดิษฐ์/สร้างสิ่งใหม่'
    },
    back: {
      answer: 'make the bed | do homework | make a mistake | do the dishes',
      explanation: '• DO (การกระทำ/หน้าที่): do homework (ทำการบ้าน), do housework (ทำงานบ้าน), do the dishes (ล้างจาน), do laundry (ซักผ้า)\n• MAKE (สร้าง/ก่อให้เกิด): make the bed (เก็บที่นอน), make a mistake (ทำผิด), make a decision (ตัดสินใจ), make friends (ผูกมิตร)',
      shortcutTrick: '⚡ หน้าที่/งานใช้ DO | ผลิต/สร้าง/ก่อขึ้นมาใหม่ใช้ MAKE'
    },
    difficulty: 'medium'
  },
  {
    id: 'fc_e_8',
    subject: 'english',
    topic: 'Phrasal Verbs ในชีวิตประจำวัน & การสื่อสาร',
    front: {
      title: 'กริยาวลีที่ใช้บ่อยในชีวิตจริง',
      subtitle: 'Daily Life Phrasal Verbs',
      formulaOrQuestion: 'put off, look after, give up, take off แปลว่าอะไร?',
      hint: 'put off = เลื่อน | look after = ดูแล | give up = ยอมแพ้ | take off = เครื่องบินขึ้น/ถอดเสื้อ'
    },
    back: {
      answer: 'put off = เลื่อนเวลา | look after = ดูแล | give up = ยอมแพ้ | take off = เครื่องบินขึ้น/ถอดเสื้อ',
      explanation: '• put off: We had to put off the picnic. (เลื่อนปิกนิกออกไป)\n• look after: She looks after her baby sister. (เธอดูแลน้องสาว)\n• give up: Never give up on your dreams! (อย่ายอมแพ้ต่อความฝัน)\n• take off: The plane will take off soon. (เครื่องบินกำลังจะขึ้นบิน)',
      shortcutTrick: '⚡ ข้อสอบเข้า ม.1 ชอบออก put off (= postpone) บ่อยที่สุด!'
    },
    difficulty: 'easy'
  }
]

export function getMistakeFlashcards(): Flashcard[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('master_m1_mistakes')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.map((m: { id?: string; topic?: string; subject?: string; question: string; tip?: string; correctAnswer: string; explanation?: string }, idx: number) => ({
      id: `mistake_${idx}_${m.id || Date.now()}`,
      subject: 'mistakes' as const,
      topic: `ทบทวนข้อผิดพลาด: ${m.topic || 'แบบฝึกหัด'}`,
      front: {
        title: 'ข้อที่เคยตอบผิด',
        subtitle: m.subject === 'math' ? 'คณิตศาสตร์' : m.subject === 'science' ? 'วิทยาศาสตร์' : 'ภาษาอังกฤษ',
        formulaOrQuestion: m.question,
        hint: m.tip || 'ลองคิดวิเคราะห์อีกรอบอย่างใจเย็น'
      },
      back: {
        answer: m.correctAnswer,
        explanation: m.explanation || 'ทบทวนหลักการและวิธีคิดที่ถูกต้อง',
        shortcutTrick: m.tip
      },
      difficulty: 'hard' as const
    }))
  } catch {
    return []
  }
}

export function saveMistakeQuestion(item: { subject: string; question: string; correctAnswer: string; explanation: string; tip?: string; topic?: string }) {
  if (typeof window === 'undefined') return
  try {
    const existing = getMistakeFlashcards()
    const isDup = existing.some(e => e.front.formulaOrQuestion === item.question)
    if (isDup) return

    const raw = localStorage.getItem('master_m1_mistakes')
    const list = raw ? JSON.parse(raw) : []
    list.unshift(item)
    // Keep max 50 mistakes
    const trimmed = list.slice(0, 50)
    localStorage.setItem('master_m1_mistakes', JSON.stringify(trimmed))
  } catch (err) {
    console.warn('Failed to save mistake:', err)
  }
}
