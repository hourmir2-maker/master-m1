/**
 * MASTER ม.1 — Comprehensive English Lessons & Genius Speed English Dataset
 * ออกแบบและจัดทำเป็นพิเศษเพื่อ: ด.ช.ภูมิรพีร์ มากแก้ว (น้องฟอร์จูน) สู่ห้องเรียนพิเศษ ม.1 EP / Gifted / SMP
 * พัฒนาโดย: คุณพ่อไพโรจน์ มากแก้ว ร่วมกับ Gemini AI และทีมผู้เชี่ยวชาญภาษาอังกฤษสากล CEFR / Oxford Pedagogy
 * ตรงตามหลักสูตร สพฐ. 2551 (ปรับปรุง 2560) และมาตรฐาน CEFR A2-B1 ครบ 16 โมดูลเต็ม (ป.6 ติวสอบเข้า ม.1 + ม.1 Advance)
 * ครบ 160 ข้อสอบ (ชุดละ 10 ข้อตามกฎ Rule 16 Cognitive Scaffolding + สูตรลัด 3 วินาที + ตรวจสอบถูกต้อง 10000000%)
 */

import { LessonData } from './lessons-data'

export const ENGLISH_LESSONS_DATA: Record<string, LessonData> = {
  // =========================================================================
  // 🎯 TRACK 1: ติวสอบเข้า ม.1 & O-NET ป.6 (8 โมดูลหลัก สพฐ. + Oxford 3000)
  // =========================================================================

  // -------------------------------------------------------------------------
  // ☕ โมดูล 1: คำศัพท์ชีวิตประจำวัน & กลุ่มคำใช้บ่อย (Daily Life & Collocations)
  // -------------------------------------------------------------------------
  m1_daily_vocab_collocations: {
    id: 'm1_daily_vocab_collocations',
    subject: 'english',
    title: 'คำศัพท์ชีวิตประจำวัน & กลุ่มคำใช้บ่อย (Daily Vocab & Collocations)',
    subtitle: 'Oxford 3000 คำศัพท์ประจำวัน, การเลือกใช้ Make vs Do, กริยาวลี Phrasal Verbs และสำนวนบอกทาง/ช้อปปิ้ง',
    emoji: '☕',
    secretFormula: {
      name: 'สูตรลับ "Make vs Do & Phrasal Verbs 3 วินาที"',
      concept: 'Make = สร้างขึ้นใหม่/ประดิษฐ์ | Do = ทำงาน/หน้าที่/กิจกรรม',
      steps: [
        '⚡ Make (สร้างขึ้นใหม่ / เกิดผลลัพธ์ใหม่): make a decision, make a mistake, make noise, make money, make friends, make an appointment, make coffee',
        '⚡ Do (หน้าที่ / กิจกรรม / งานประจำ): do homework, do housework, do the dishes, do laundry, do business, do your best, do someone a favor',
        '⚡ สำนวนบอกทิศทาง: Turn left/right, Go straight on, Cross the street, It is on your left/opposite the hospital',
        '⚡ สำนวนซื้อของ: How much is it? / Can I try this on? / Do you have a smaller size? / Keep the change'
      ]
    },
    summaryPoints: [
      'Collocations คือกลุ่มคำที่เจ้าของภาษานิยมใช้คู่กันเสมอ เช่น heavy rain (ไม่ใช่ strong rain), fast food (ไม่ใช่ quick food)',
      'Look forward to + V.ing (ตั้งตารอคอย) ต้องตามด้วย Gerund เสมอ เช่น I look forward to meeting you.',
      'Take care of = ดูแล | Take part in = เข้าร่วม | Take place = เกิดขึ้น',
      '🌟 ข้อคิดกำลังใจจากคุณพ่อไพโรจน์ถึงน้องฟอร์จูน: "ภาษาอังกฤษคือหน้าต่างเปิดสู่ความรู้ระดับโลก ฝึกวันละนิดแล้วฟอร์จูนจะสื่อสารได้อย่างมั่นใจเต็มร้อย!"'
    ],
    practiceQuestions: [
      {
        id: 'eng_dl_q1',
        question: 'Fortune always __________ his homework before having dinner.',
        options: ['does', 'makes', 'takes', 'has'],
        correctAnswer: 'does',
        explanation: '【สูตร Make vs Do】\nการทำการบ้านหรือหน้าที่ใช้ "do homework" ประธาน Fortune เป็นเอกพจน์บุรุษที่ 3 ใน Present Simple Tense กริยาจึงเปลี่ยนรูปเป็น "does"',
        tip: '💡 do homework / do housework'
      },
      {
        id: 'eng_dl_q2',
        question: 'Don\'t worry about making mistakes; everyone can __________ a mistake when learning something new.',
        options: ['make', 'do', 'create', 'build'],
        correctAnswer: 'make',
        explanation: '【Collocation จำเป็น】\nการทำผิดพลาดใช้คู่กับกริยา "make a mistake" เสมอ ไม่ใช้ do a mistake',
        tip: '💡 make a mistake (ทำผิด)'
      },
      {
        id: 'eng_dl_q3',
        question: 'I am really looking forward to __________ you at the national science fair next week.',
        options: ['seeing', 'see', 'saw', 'seen'],
        correctAnswer: 'seeing',
        explanation: '【จุดลวงยอดฮิต Look forward to】\nโครงสร้าง "look forward to + V.ing / Noun" คำว่า to ในที่นี้เป็น Preposition จึงต้องตามด้วย Gerund (seeing)',
        tip: '💡 look forward to + V.ing เสมอ!'
      },
      {
        id: 'eng_dl_q4',
        question: 'Could you please __________ me a favor and carry this box to the pharmacy lab?',
        options: ['do', 'make', 'give', 'take'],
        correctAnswer: 'do',
        explanation: '【สำนวนขอความช่วยเหลือ】\nสำนวน "do someone a favor" แปลว่า ช่วยเหลือใครสักคน เช่น Do me a favor (ช่วยฉันหน่อยได้ไหม)',
        tip: '💡 do me a favor = ช่วยเหลือฉัน'
      },
      {
        id: 'eng_dl_q5',
        question: 'Customer: "How much is this microscope?"\nShopkeeper: "It\'s 1,200 baht, and it comes with a 1-year warranty."\nCustomer: "Here is 1,500 baht. __________"',
        options: ['Keep the change.', 'Never mind.', 'You are welcome.', 'Take your time.'],
        correctAnswer: 'Keep the change.',
        explanation: '【บทสนทนาซื้อของ】\nลูกค้าจ่ายเงิน 1,500 บาทสำหรับของราคา 1,200 บาท สำนวน "Keep the change." แปลว่า "ไม่ต้องทอนเงิน / เก็บเงินทอนไว้ได้เลย"',
        tip: '💡 Keep the change = ไม่ต้องทอนเงิน'
      },
      {
        id: 'eng_dl_q6',
        question: 'Stranger: "Excuse me, could you tell me the way to the hospital?"\nFortune: "Sure. Go straight for two blocks and __________ on your right."',
        options: ['it is', 'there has', 'it was', 'you are'],
        correctAnswer: 'it is',
        explanation: '【สำนวนบอกทาง】\n"It is on your right / left" แปลว่า "มันตั้งอยู่ทางขวามือ / ซ้ายมือของคุณ"',
        tip: '💡 It is on your right/left'
      },
      {
        id: 'eng_dl_q7',
        question: 'The medical seminar will __________ at the convention center tomorrow morning.',
        options: ['take place', 'take part', 'take care', 'take off'],
        correctAnswer: 'take place',
        explanation: '【Phrasal Verb ความหมายเฉพาะ】\n• take place = เกิดขึ้น / จัดขึ้น (happen / occur)\n• take part in = เข้าร่วม\n• take care of = ดูแล\n• take off = เครื่องบินขึ้น / ถอดเสื้อผ้า',
        tip: '💡 take place = จัดขึ้น / เกิดขึ้น'
      },
      {
        id: 'eng_dl_q8',
        question: 'It was raining so __________ that the outdoor football match had to be cancelled.',
        options: ['heavily', 'strongly', 'hardly', 'thickly'],
        correctAnswer: 'heavily',
        explanation: '【Collocation ฝนตกหนัก】\nภาษาอังกฤษใช้ "rain heavily" หรือ "heavy rain" ไม่ใช้ strongly หรือ thickly (ส่วน hardly แปลว่า แทบจะไม่)',
        tip: '💡 rain heavily (ฝนตกหนัก)'
      },
      {
        id: 'eng_dl_q9',
        question: 'The doctor advised the patient to __________ smoking immediately for better lung health.',
        options: ['give up', 'give in', 'give away', 'give out'],
        correctAnswer: 'give up',
        explanation: '【Phrasal Verb การแพทย์เพื่อฟอร์จูน】\n• give up (+ V.ing) = เลิก / หยุดทำสิ่งที่เป็นนิสัย (quit/stop)\n• give in = ยอมแพ้\n• give away = แจกฟรี / เผยความลับ\n• give out = แจกจ่าย',
        tip: '💡 give up smoking = เลิกสูบบุหรี่'
      },
      {
        id: 'eng_dl_q10',
        question: 'Before entering the cleanroom laboratory, all scientists must __________ their muddy shoes.',
        options: ['take off', 'put on', 'turn off', 'get on'],
        correctAnswer: 'take off',
        explanation: '【Phrasal Verb ในห้องแล็บ】\n• take off = ถอด (รองเท้า/เสื้อผ้า)\n• put on = สวมใส่\n• turn off = ปิดสวิตช์\n• get on = ขึ้นรถ',
        tip: '💡 take off shoes = ถอดรองเท้า'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // ✍️ โมดูล 2: Tenses พื้นฐาน, S-V Agreement & Pronouns
  // -------------------------------------------------------------------------
  grammar_basics: {
    id: 'grammar_basics',
    subject: 'english',
    title: 'Tenses พื้นฐาน, S-V Agreement & Pronouns',
    subtitle: 'กฎ Present Simple กริยาเติม s/es, ประธานเอกพจน์/พหูพจน์, Everyone/Nobody เป็นเอกพจน์, และ Subject/Object Pronouns',
    emoji: '✍️',
    secretFormula: {
      name: 'สูตรลับ "Subject-Verb Agreement & Indefinite Pronouns"',
      concept: 'ประธานเอกพจน์ กริยาเติม s/es | Everyone/Nobody = เอกพจน์เสมอ',
      steps: [
        '⚡ Present Simple: Subject (He/She/It/เอกพจน์) + V.1 (เติม s/es) | Subject (I/You/We/They/พหูพจน์) + V.1 (รูปเดิม)',
        '⚡ กฎ Indefinite Pronouns: Everyone, Everybody, Someone, Somebody, Anyone, Nobody, Each, Every + กริยาเอกพจน์ (เติม s/es / is / has / was) เสมอ!',
        '⚡ Pronouns Chart: Subject (I, He, She, They) ➔ Object (me, him, her, them) ➔ Possessive Adj (my, his, her, their + Noun) ➔ Possessive Pronoun (mine, his, hers, theirs)',
        '⚡ Reflexive Pronouns: myself, himself, herself, themselves (ประธานทำกริยานั้นต่อตัวเอง)'
      ]
    },
    summaryPoints: [
      'Adverbs of Frequency (always, usually, often, sometimes, never) วาง "หน้ากริยาแท้" แต่ "หลัง Verb to be"',
      'ประธานเชื่อมด้วย either...or / neither...nor ให้ผันกริยาตาม "ประธานตัวที่อยู่ใกล้กริยาที่สุด"',
      'Together with, along with, as well as ให้ผันกริยาตาม "ประธานตัวแรกข้างหน้า"',
      '🌟 เทคนิคน้องฟอร์จูน: เจอกลุ่ม Every-, Some-, Any-, No-, Each ➔ กา Choice ที่เป็น "กริยาเอกพจน์ (เติม s / is / has)" ใน 2 วินาที!'
    ],
    practiceQuestions: [
      {
        id: 'eng_gb_q1',
        question: 'Everyone in the science club __________ excited about the upcoming robotics competition.',
        options: ['is', 'are', 'were', 'have been'],
        correctAnswer: 'is',
        explanation: '【กฎ Indefinite Pronoun】\nคำว่า "Everyone" ถือเป็นประธานรูปเอกพจน์เสมอ จึงต้องใช้ Verb to be เอกพจน์คือ "is" (ไม่ใช่ are)',
        tip: '💡 Everyone / Somebody = ประธานเอกพจน์ (is/has/Vs)'
      },
      {
        id: 'eng_gb_q2',
        question: 'Neither the teacher nor the students __________ aware of the schedule change.',
        options: ['were', 'was', 'is', 'has been'],
        correctAnswer: 'were',
        explanation: '【กฎ Neither...nor】\nเมื่อประธานเชื่อมด้วย neither...nor กริยาจะผันตามประธานตัวหลังสุดที่อยู่ติดกับกริยา ในที่นี้คือ "the students" (พหูพจน์) จึงใช้ "were"',
        tip: '💡 neither...nor ผันตามประธานตัวหลัง'
      },
      {
        id: 'eng_gb_q3',
        question: 'The professor, along with his assistants, __________ currently conducting research in the laboratory.',
        options: ['is', 'are', 'were', 'have'],
        correctAnswer: 'is',
        explanation: '【กฎ Along with / Together with】\nวลี "along with his assistants" เป็นส่วนขยาย ประธานแท้คือ "The professor" (เอกพจน์) กริยาจึงต้องเป็นเอกพจน์คือ "is"',
        tip: '💡 as well as / along with ผันตามประธานตัวหน้า'
      },
      {
        id: 'eng_gb_q4',
        question: 'Fortune and __________ solved the complex chemistry equation together.',
        options: ['I', 'me', 'my', 'myself'],
        correctAnswer: 'I',
        explanation: '【Subject Pronoun】\nตำแหน่งนี้อยู่หน้ากริยาหลัก (solved) ทำหน้าที่เป็นประธานของประโยค จึงต้องใช้รูปประธานบุรุษที่ 1 คือ "I" (Fortune and I)',
        tip: '💡 หน้ากริยาเป็นประธาน ใช้ "I" (ไม่ใช่ me)'
      },
      {
        id: 'eng_gb_q5',
        question: 'This tablet belongs to Sarah, but that laptop over there is __________.',
        options: ['mine', 'my', 'me', 'myself'],
        correctAnswer: 'mine',
        explanation: '【Possessive Pronoun】\nคำว่า "mine" เป็นสรรพนามแสดงความเป็นเจ้าของโดยไม่ต้องมีคำนามตามหลัง (mine = my laptop)',
        tip: '💡 แสดงความเป็นเจ้าของท้ายประโยคใช้ mine / yours / hers'
      },
      {
        id: 'eng_gb_q6',
        question: 'The students taught __________ how to program the microcomputer.',
        options: ['themselves', 'theirselves', 'them', 'theirs'],
        correctAnswer: 'themselves',
        explanation: '【Reflexive Pronoun】\nเมื่อประธานและกรรมเป็นบุคคลกลุ่มเดียวกัน (The students สอน ตัวพวกเขาเอง) ต้องใช้ "themselves" (คำว่า theirselves ไม่มีในภาษาอังกฤษ)',
        tip: '💡 พวกเขาทำด้วยตัวเอง = themselves'
      },
      {
        id: 'eng_gb_q7',
        question: 'The Sun __________ in the east and sets in the west.',
        options: ['rises', 'rose', 'is rising', 'has risen'],
        correctAnswer: 'rises',
        explanation: '【Present Simple ความจริงทางวิทยาศาสตร์】\nข้อเท็จจริงตามธรรมชาติ (General Truth / Scientific Fact) ใช้ Present Simple Tense: The Sun (เอกพจน์) + rises (เติม s)',
        tip: '💡 ความจริงทางธรรมชาติ = Present Simple (V.1)'
      },
      {
        id: 'eng_gb_q8',
        question: 'Water __________ at 100 degrees Celsius under standard atmospheric pressure.',
        options: ['boils', 'boiled', 'is boiling', 'will boil'],
        correctAnswer: 'boils',
        explanation: '【Scientific Fact】\nจุดเดือดของน้ำเป็นกฎทางวิทยาศาสตร์ ใช้ Present Simple: Water (นับไม่ได้/เอกพจน์) + boils (เติม s)',
        tip: '💡 กฎวิทยาศาสตร์ = V.1 เติม s/es'
      },
      {
        id: 'eng_gb_q9',
        question: 'Each of the participants __________ given a certificate of achievement after completing the test.',
        options: ['was', 'were', 'are', 'have been'],
        correctAnswer: 'was',
        explanation: '【กฎของ Each of】\nโครงสร้าง "Each of + นามพหูพจน์" ถือเป็นประธานเอกพจน์เสมอ (หมายถึง แต่ละคน) กริยาจึงต้องเป็นเอกพจน์คือ "was"',
        tip: '💡 Each of + นามพหูพจน์ ➔ กริยาเอกพจน์ (was/is/has)'
      },
      {
        id: 'eng_gb_q10',
        question: 'Ten kilometers __________ a long distance to walk in thirty minutes.',
        options: ['is', 'are', 'were', 'have been'],
        correctAnswer: 'is',
        explanation: '【ระยะทาง เวลา และเงินตรา】\nระยะทาง (Ten kilometers), เวลา (Two hours), จำนวนเงิน (One million baht) แม้จะมีรูปพหูพจน์ แต่เมื่อมองเป็นหน่วยก้อนรวมก้อนเดียว จะถือเป็น "ประธานเอกพจน์" จึงใช้ "is"',
        tip: '💡 ระยะทาง/เวลา/เงิน = กริยาเอกพจน์ (is)'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 📖 โมดูล 3: คำศัพท์ หมวดหมู่ Synonyms & Antonyms
  // -------------------------------------------------------------------------
  vocabulary: {
    id: 'vocabulary',
    subject: 'english',
    title: 'คำศัพท์ หมวดหมู่ Synonyms & Antonyms',
    subtitle: 'เทคนิคตัดรากศัพท์ Prefix (un-, dis-, im- = ไม่) / Suffix (-tion, -ment = คำนาม) และศัพท์ความหมายเหมือน/ตรงข้าม',
    emoji: '📖',
    secretFormula: {
      name: 'สูตรลับ "Prefix Suffix แกะศัพท์ 3 วินาที"',
      concept: 'Prefix บอกความหมาย | Suffix บอกชนิดของคำ (Part of Speech)',
      steps: [
        '⚡ Negative Prefixes (แปลว่า ไม่/ตรงข้าม): un-, in-, im-, il-, ir-, dis-, mis- (เช่น impossible = เป็นไปไม่ได้, disagree = ไม่เห็นด้วย, misread = อ่านผิด)',
        '⚡ Noun Suffixes (ลงท้ายเป็นคำนาม): -tion, -sion, -ment, -ness, -ity, -ship, -er, -or, -ist (เช่น pharmacist = เภสัชกร, treatment = การรักษา)',
        '⚡ Adjective Suffixes (ลงท้ายเป็นคุณศัพท์): -ful, -less, -able, -ible, -ic, -ous, -al (เช่น useful = มีประโยชน์, harmless = ไม่เป็นอันตราย)',
        '⚡ Verb Suffixes: -ize, -en, -ify (เช่น widen = ขยายกว้าง, purify = ทำความสะอาดบริสุทธิ์)'
      ]
    },
    summaryPoints: [
      'Synonyms (คำความหมายเหมือน): accurate = precise (แม่นยำ), huge = enormous (ใหญ่โต), essential = vital (จำเป็น)',
      'Antonyms (คำความหมายตรงข้าม): ancient ≠ modern (โบราณ≠ทันสมัย), temporary ≠ permanent (ชั่วคราว≠ถาวร)',
      'รากศัพท์ Bio (ชีวิต), Geo (โลก), Tele (ไกล), Micro (เล็ก), Scope (มองดู)',
      '🌟 เทคนิคน้องฟอร์จูน: คำที่ลงท้ายด้วย -less แปลว่า "ปราศจาก/ไม่มี" เช่น painless = ไม่เจ็บปวด, harmless = ไร้พิษภัย!'
    ],
    practiceQuestions: [
      {
        id: 'eng_voc_q1',
        question: 'Which word has the closest meaning (synonym) to "essential"?',
        options: ['vital', 'optional', 'useless', 'minor'],
        correctAnswer: 'vital',
        explanation: '【Synonym Vocabulary】\nคำว่า "essential" แปลว่า จำเป็นอย่างยิ่ง มีความหมายเหมือนกับ "vital" หรือ "necessary"\n• optional = เป็นทางเลือก / ไม่บังคับ\n• useless = ไร้ประโยชน์\n• minor = เล็กน้อย',
        tip: '💡 essential = vital = necessary (จำเป็นอย่างยิ่ง)'
      },
      {
        id: 'eng_voc_q2',
        question: 'Which word is the opposite (antonym) of "permanent"?',
        options: ['temporary', 'constant', 'lasting', 'forever'],
        correctAnswer: 'temporary',
        explanation: '【Antonym Vocabulary】\nคำว่า "permanent" แปลว่า ถาวร / คงทน ตรงข้ามกับ "temporary" ซึ่งแปลว่า ชั่วคราว',
        tip: '💡 permanent (ถาวร) ≠ temporary (ชั่วคราว)'
      },
      {
        id: 'eng_voc_q3',
        question: 'The prefix "un-" in words like "uncertain" and "unbelievable" means __________.',
        options: ['not', 'again', 'before', 'too much'],
        correctAnswer: 'not',
        explanation: '【ความหมายของ Prefix】\nPrefix "un-" เป็น Negative prefix แปลว่า "ไม่ (not)" เช่น uncertain = ไม่แน่นอน, unbelievable = เหลือเชื่อ/ไม่น่าเชื่อ',
        tip: '💡 un-, in-, im-, dis- = NOT (ไม่)'
      },
      {
        id: 'eng_voc_q4',
        question: 'Which of the following words is a "Noun" (คำนาม)?',
        options: ['discovery', 'discover', 'discoverable', 'discoverably'],
        correctAnswer: 'discovery',
        explanation: '【Suffix วิเคราะห์ Part of Speech】\n• discover = กริยา (ค้นพบ)\n• discovery (-y) = คำนาม (การค้นพบ)\n• discoverable (-able) = คุณศัพท์ (สามารถค้นพบได้)\n• discoverably (-ly) = กริยาวิเศษณ์',
        tip: '💡 discovery = คำนาม'
      },
      {
        id: 'eng_voc_q5',
        question: 'A person who prepares and dispenses medicines in a hospital or pharmacy is called a __________.',
        options: ['pharmacist', 'surgeon', 'physicist', 'biologist'],
        correctAnswer: 'pharmacist',
        explanation: '【คำศัพท์อาชีพทางการแพทย์เพื่อฟอร์จูน】\n• pharmacist = เภสัชกร (ผู้เชี่ยวชาญการปรุงและจ่ายยา)\n• surgeon = ศัลยแพทย์ (หมอผ่าตัด)\n• physicist = นักฟิสิกส์\n• biologist = นักชีววิทยา',
        tip: '💡 pharmacist = เภสัชกร'
      },
      {
        id: 'eng_voc_q6',
        question: 'The new experimental medicine proved to be completely __________; it caused no side effects at all.',
        options: ['harmless', 'harmful', 'toxic', 'dangerous'],
        correctAnswer: 'harmless',
        explanation: '【Suffix -less แปลว่า ไร้/ไม่】\nบริบทกล่าวว่ายาไม่ก่อผลข้างเคียงใดๆ จึงเป็นยาที่ "ไร้พิษภัย / ไม่เป็นอันตราย" คือ "harmless" (harm = อันตราย + less = ปราศจาก)',
        tip: '💡 harmless = ไร้อันตราย | harmful = เป็นอันตราย'
      },
      {
        id: 'eng_voc_q7',
        question: 'The scientist made a very __________ measurement, with an error of less than 0.01 millimeter.',
        options: ['precise', 'careless', 'rough', 'vague'],
        correctAnswer: 'precise',
        explanation: '【Context Clues】\nบริบทระบุว่ามีความคลาดเคลื่อนน้อยกว่า 0.01 มม. แสดงว่าเป็นการวัดที่ "แม่นยำ / เที่ยงตรงอย่างยิ่ง" คือ "precise" หรือ "accurate"',
        tip: '💡 precise = accurate = แม่นยำ'
      },
      {
        id: 'eng_voc_q8',
        question: 'The root word "bio" in "biology" and "biodiversity" means __________.',
        options: ['life', 'earth', 'water', 'light'],
        correctAnswer: 'life',
        explanation: '【รากศัพท์ภาษากรีก】\nรากศัพท์ "bio" แปลว่า ชีวิต (life) เช่น biology (ชีววิทยา = การศึกษาสิ่งมีชีวิต), biography (ชีวประวัติ), biodiversity (ความหลากหลายทางชีวภาพ)',
        tip: '💡 bio = life (ชีวิต)'
      },
      {
        id: 'eng_voc_q9',
        question: 'The air pollution in this industrial area is __________; thousands of residents have developed breathing problems.',
        options: ['severe', 'mild', 'negligible', 'pleasant'],
        correctAnswer: 'severe',
        explanation: '【ความหมายของคำศัพท์ขั้นสูง】\nบริบทบอกว่าชาวบ้านหลายพันคนเกิดปัญหาทางเดินหายใจ แสดงว่ามลพิษทางอากาศมีระดับ "รุนแรงมาก" คือ "severe"\n• mild = เล็กน้อย / เบาบาง\n• negligible = เล็กน้อยจนมองข้ามได้',
        tip: '💡 severe = รุนแรง / สาหัส'
      },
      {
        id: 'eng_voc_q10',
        question: 'Choose the word that does NOT belong to the group:',
        options: ['hazard', 'safety', 'danger', 'peril'],
        correctAnswer: 'safety',
        explanation: '【Odd One Out Vocabulary】\n• hazard, danger, peril ล้วนเป็นคำพ้อง (Synonyms) แปลว่า "อันตราย / ภัยพิบัติ"\n• ส่วน "safety" แปลว่า "ความปลอดภัย" ซึ่งตรงข้ามกับกลุ่มคำอื่น',
        tip: '💡 safety = ปลอดภัย (ต่างจากข้ออื่น)'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 🔍 โมดูล 4: การอ่านจับใจความ Main Idea & Inference
  // -------------------------------------------------------------------------
  reading: {
    id: 'reading',
    subject: 'english',
    title: 'การอ่านจับใจความ Main Idea & Inference',
    subtitle: 'เทคนิค 3S Method: Skim (อ่านเร็ว) + Scan (หา Keyword) + Structure (โครงสร้างประโยค) และวิธีจับ Main Idea ใน 30 วิ',
    emoji: '🔍',
    secretFormula: {
      name: 'สูตรลับ "3S Reading Method จับใจความ 30 วิ"',
      concept: 'Main Idea มักอยู่ประโยคแรกหรือประโยคสุดท้ายของย่อหน้า',
      steps: [
        '⚡ Step 1 - Skim: กวาดสายตาอ่านเร็วๆ ที่ 1–2 บรรทัดแรก (Topic Sentence) และบรรทัดสุดท้าย (Conclusion) เพื่อจับภาพรวม',
        '⚡ Step 2 - Scan: ดูโจทย์ว่าถามหาตัวเลข, ชื่อเฉพาะ, ปี ค.ศ., หรือคำศัพท์ใด แล้วกวาดสายตาหา Keyword นั้นในเนื้อเรื่องทันที',
        '⚡ Step 3 - Structure & Transitions: สังเกตคำเชื่อมเปลี่ยนทิศทางความคิด เช่น However, But, In contrast, On the other hand ➔ ใจความสำคัญจริงมักอยู่ "หลังคำเหล่านี้!"',
        '⚡ Inference (การอนุมาน): สิ่งที่ผู้เขียนไม่ได้บอกตรงๆ แต่สามารถสรุปได้จากหลักฐานในบทความ'
      ]
    },
    summaryPoints: [
      'Topic Sentence (ประโยคใจความสำคัญ) = Topic (หัวข้อ) + Controlling Idea (ประเด็นหลัก)',
      'ถ้าช้อยส์ระบุ "แคบเกินไป (Too specific)" หรือ "กว้างเกินไป (Too broad)" ให้ตัดทิ้งทันที',
      'คำบอกทิศทาง: In conclusion, Therefore, As a result มักนำหน้าบทสรุป',
      '🌟 เทคนิคน้องฟอร์จูน: คำว่า "According to the passage" ➔ คำตอบอยู่ในเนื้อเรื่อง 100% ห้ามคิดเอาเอง ให้หาคำที่ตรงหรือเปลี่ยนคำ (Paraphrase)!'
    ],
    practiceQuestions: [
      {
        id: 'eng_rd_q1',
        question: 'Read the short passage:\n"Penicillin, discovered by Alexander Fleming in 1928, was the world\'s first effective antibiotic. It revolutionized modern medicine by allowing doctors to treat previously fatal bacterial infections, saving millions of lives worldwide."\n\nWhat is the MAIN IDEA of this passage?',
        options: [
          'Penicillin was a revolutionary discovery that transformed medical treatment and saved millions of lives.',
          'Alexander Fleming was born in 1928.',
          'Antibiotics can cure all diseases including viral infections.',
          'Doctors in 1928 did not know how to treat patients.'
        ],
        correctAnswer: 'Penicillin was a revolutionary discovery that transformed medical treatment and saved millions of lives.',
        explanation: '【จับ Main Idea】\nประโยคแรกและประโยคที่สองเน้นย้ำว่า การค้นพบเพนิซิลลินได้ปฏิวัติการแพทย์สมัยใหม่และช่วยชีวิตผู้คนนับล้าน ซึ่งตรงกับตัวเลือกที่ 1\n• ตัวเลือกอื่นระบุข้อมูลผิดหรือไม่ครอบคลุม',
        tip: '💡 Main Idea ครอบคลุมสาระสำคัญทั้งหมดของย่อหน้า'
      },
      {
        id: 'eng_rd_q2',
        question: 'From the passage in Question 1, when was Penicillin discovered?',
        options: ['In 1928', 'In 1938', 'In 1828', 'In 2028'],
        correctAnswer: 'In 1928',
        explanation: '【Scanning หาตัวเลข Keyword】\nสแกนหาปี ค.ศ. ในบรรทัดแรก: "...discovered by Alexander Fleming in 1928..." ➔ ตอบ 1928 ทันทีใน 2 วินาที',
        tip: '💡 สแกนหาตัวเลข ค.ศ. ในบทความ'
      },
      {
        id: 'eng_rd_q3',
        question: 'According to the passage, Penicillin is used to treat which type of infections?',
        options: ['Bacterial infections', 'Viral infections', 'Fungal infections only', 'Genetic disorders'],
        correctAnswer: 'Bacterial infections',
        explanation: '【Detail Scanning】\nในบทความระบุชัดเจนว่า "...allowing doctors to treat previously fatal bacterial infections..." ➔ โรคติดเชื้อจากแบคทีเรีย',
        tip: '💡 ตอบตรงตามที่บทความระบุ (bacterial infections)'
      },
      {
        id: 'eng_rd_q4',
        question: 'Read the passage:\n"Honey never spoils. Archaeologists excavating ancient Egyptian tombs have found pots of honey that are over 3,000 years old and still perfectly edible. Honey\'s low moisture content and natural acidity create an inhospitable environment for bacteria to survive."\n\nWhat can be inferred about honey from this text?',
        options: [
          'Honey has unique natural preservation properties that prevent bacterial growth.',
          'Ancient Egyptians only ate honey.',
          'Honey spoils quickly if kept in a dark place.',
          'Bacteria love to grow in honey.'
        ],
        correctAnswer: 'Honey has unique natural preservation properties that prevent bacterial growth.',
        explanation: '【Inference การอนุมาน】\nจากข้อมูลที่น้ำผึ้งอายุ 3,000 ปียังกินได้เพราะความชื้นต่ำและมีความเป็นกรด ทำให้แบคทีเรียอยู่ไม่ได้ จึงอนุมานได้ว่า น้ำผึ้งมีคุณสมบัติการถนอมอาหารตามธรรมชาติที่ป้องกันการเติบโตของแบคทีเรีย',
        tip: '💡 อนุมานจากหลักฐาน: น้ำผึ้งไม่บูดเพราะต้านแบคทีเรีย'
      },
      {
        id: 'eng_rd_q5',
        question: 'In the sentence "create an inhospitable environment for bacteria", what does "inhospitable" mean?',
        options: ['Unfavorable and difficult to survive in', 'Very comfortable', 'Warm and welcoming', 'Full of nutrients'],
        correctAnswer: 'Unfavorable and difficult to survive in',
        explanation: '【Vocabulary in Context】\nPrefix in- (ไม่) + hospitable (เอื้อเฟื้อ/ต้อนรับ) ➔ inhospitable แปลว่า "ไม่เอื้ออำนวย / สภาพแวดล้อมที่ไม่เหมาะสมต่อการมีชีวิตอยู่"',
        tip: '💡 in- (ไม่) + hospitable ➔ ไม่เอื้ออำนวย'
      },
      {
        id: 'eng_rd_q6',
        question: 'Read the sentence:\n"Although solar energy is clean and renewable, the initial cost of installing solar panels remains relatively high for many families."\n\nWhat is the function of the word "Although"?',
        options: [
          'To show a contrast between benefits and limitations',
          'To provide an example of solar energy',
          'To give a reason for high installation cost',
          'To show chronological order'
        ],
        correctAnswer: 'To show a contrast between benefits and limitations',
        explanation: '【วิเคราะห์ Transition Words】\n"Although" เป็นคำเชื่อมแสดงความขัดแย้ง (Contrast) ระหว่างข้อดี (พลังงานสะอาด) กับข้อจำกัด (ต้นทุนติดตั้งเริ่มต้นยังสูง)',
        tip: '💡 Although / However = แสดงความขัดแย้ง'
      },
      {
        id: 'eng_rd_q7',
        question: 'Read the sign:\n"CAUTION: WET FLOOR. PLEASE WATCH YOUR STEP."\nWhere would you most likely see this sign?',
        options: [
          'In a newly mopped hallway or near a swimming pool',
          'On a bookshelf in the library',
          'Inside an operating room during surgery',
          'On a dry desert road'
        ],
        correctAnswer: 'In a newly mopped hallway or near a swimming pool',
        explanation: '【ป้ายเตือนในชีวิตประจำวัน】\nป้ายเตือนพื้นเปียกลื่น (Wet floor / Watch your step) จะพบได้ตามทางเดินที่เพิ่งถูพื้นเสร็จ หรือบริเวณสระว่ายน้ำเพื่อเตือนให้ระวังการลื่นหกล้ม',
        tip: '💡 Wet Floor = พื้นเปียก ระวังลื่น'
      },
      {
        id: 'eng_rd_q8',
        question: 'Read the recipe note:\n"Store the reconstituted antibiotic suspension in a refrigerator (2°C - 8°C) and discard any unused portion after 14 days."\n\nWhat should be done with the medicine after two weeks?',
        options: [
          'Throw it away safely.',
          'Freeze it to make it last longer.',
          'Double the dosage.',
          'Heat it before taking.'
        ],
        correctAnswer: 'Throw it away safely.',
        explanation: '【ฉลากยาเพื่อฟอร์จูน】\nคำว่า "discard any unused portion after 14 days" (14 วัน = 2 สัปดาห์) คำว่า discard แปลว่า "ทิ้ง / กำจัดทิ้ง (Throw away)"',
        tip: '💡 discard = throw away (ทิ้ง)'
      },
      {
        id: 'eng_rd_q9',
        question: 'What is the tone of a scientific research paper presenting experimental data?',
        options: ['Objective and factual', 'Humorous and sarcastic', 'Angry and emotional', 'Fictional and dramatic'],
        correctAnswer: 'Objective and factual',
        explanation: '【น้ำเสียงของบทความ Tone of Passage】\nบทความวิจัยทางวิทยาศาสตร์มีน้ำเสียงที่เป็นกลาง ไม่ลำเอียง ยึดตามหลักฐานและข้อเท็จจริงจริง เรียกว่า "Objective and factual"',
        tip: '💡 บทความวิทย์ = เป็นกลางและอิงความจริง (Objective & factual)'
      },
      {
        id: 'eng_rd_q10',
        question: 'Which of the following would be the BEST title for an article discussing the life cycle, habitat, and conservation of sea turtles?',
        options: [
          'Sea Turtles: Life Cycle, Threats, and Conservation Efforts',
          'How to Catch a Fish in the Ocean',
          'Why the Moon Causes Tides',
          'The Fastest Animals on Land'
        ],
        correctAnswer: 'Sea Turtles: Life Cycle, Threats, and Conservation Efforts',
        explanation: '【การตั้งชื่อเรื่อง Best Title】\nชื่อเรื่องที่ดีต้องครอบคลุมเนื้อหาหลักทั้งหมดอย่างกระชับและตรงประเด็น (ชีวิตเต่าทะเล ถิ่นที่อยู่ และการอนุรักษ์)',
        tip: '💡 ชื่อเรื่องต้องครอบคลุมสาระสำคัญทั้งหมด'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 🗣️ โมดูล 5: สำนวน บทสนทนาในชีวิตประจำวัน & Question Tags
  // -------------------------------------------------------------------------
  listening_speaking: {
    id: 'listening_speaking',
    subject: 'english',
    title: 'สำนวน บทสนทนา & Question Tags',
    subtitle: 'สำนวนสอบบ่อย (Piece of cake, Break a leg), กฎ Question Tag "หน้าบอกเล่า หลังปฏิเสธ", และการสื่อสารสุภาพ',
    emoji: '🗣️',
    secretFormula: {
      name: 'สูตรลับ "Question Tag & สำนวนยอดฮิต"',
      concept: 'หน้าบอกเล่า ➔ หลังปฏิเสธ | หน้าปฏิเสธ ➔ หลังบอกเล่า',
      steps: [
        '⚡ กฎ Question Tag:\n1) ประโยคหน้า "บอกเล่า (+)" ➔ แท็กท้าย "ปฏิเสธ (-)" เช่น You are smart, aren\'t you?\n2) ประโยคหน้า "ปฏิเสธ (-)" ➔ แท็กท้าย "บอกเล่า (+)" เช่น He doesn\'t know, does he?\n3) มี Verb ช่วย (is, am, are, can, will) ➔ ดึง Verb ช่วยมาใช้\n4) ไม่มี Verb ช่วย ➔ ใช้ do, does, did เข้ามาช่วย\n5) ประโยคขึ้นต้น I am... ➔ แท็กคือ aren\'t I?\n6) ประโยคคำสั่ง/ชักชวน Let\'s... ➔ แท็กคือ shall we? | คำสั่ง Don\'t... ➔ will you?',
        '⚡ สำนวนสอบบ่อย:\n• A piece of cake = ง่ายมากๆ (very easy)\n• Break a leg! = ขอให้โชคดี (good luck - ใช้ก่อนสอบหรือขึ้นแสดง)\n• Once in a blue moon = นานๆ ครั้ง / แทบจะไม่เคยเกิดขึ้น\n• Hit the books = เริ่มอ่านหนังสืออย่างจริงจัง'
      ]
    },
    summaryPoints: [
      'สำนวนปฏิเสธอย่างสุภาพ: I\'m afraid I can\'t (เกรงว่าจะทำไม่ได้), I wish I could, but...',
      'การตอบรับคำขอบคุณ: You\'re welcome, Don\'t mention it, My pleasure, Any time',
      'สำนวนเห็นด้วย: I couldn\'t agree more (เห็นด้วยอย่างยิ่ง), Exactly, You can say that again',
      '🌟 เทคนิคน้องฟอร์จูน: เจอกฎ Question Tag: "Let\'s... ➔ shall we?" และ "I am... ➔ aren\'t I?" ท่องให้แม่น!'
    ],
    practiceQuestions: [
      {
        id: 'eng_ls_q1',
        question: 'Fortune is studying hard for the M.1 Gifted entrance exam, __________?',
        options: ['isn\'t he', 'is he', 'doesn\'t he', 'does he'],
        correctAnswer: 'isn\'t he',
        explanation: '【สูตร Question Tag】\n1. ประโยคหน้าเป็น "บอกเล่า (+)" มี Verb ช่วยคือ "is"\n2. แท็กท้ายต้องเป็น "ปฏิเสธ (-)" ➔ isn\'t\n3. สรรพนามแทน Fortune คือ "he"\n➔ รวมเป็น "isn\'t he?"',
        tip: '💡 หน้าบอกเล่า (is) ➔ หลังปฏิเสธ (isn\'t he?)'
      },
      {
        id: 'eng_ls_q2',
        question: 'You didn\'t forget to lock the chemistry laboratory door, __________?',
        options: ['did you', 'didn\'t you', 'do you', 'don\'t you'],
        correctAnswer: 'did you',
        explanation: '【สูตร Question Tag ประโยคปฏิเสธ】\nประโยคหน้าเป็น "ปฏิเสธ (-)" คือ didn\'t ➔ แท็กท้ายต้องเป็น "บอกเล่า (+)" คือ "did you?"',
        tip: '💡 หน้าปฏิเสธ (didn\'t) ➔ หลังบอกเล่า (did you?)'
      },
      {
        id: 'eng_ls_q3',
        question: 'Let\'s review our mathematics shortcuts together, __________?',
        options: ['shall we', 'will you', 'don\'t we', 'aren\'t we'],
        correctAnswer: 'shall we',
        explanation: '【ข้อยกเว้น Question Tag】\nประโยคชักชวนที่ขึ้นต้นด้วย "Let\'s..." Question Tag จะต้องเป็น "shall we?" เสมอ',
        tip: '💡 Let\'s... ➔ shall we?'
      },
      {
        id: 'eng_ls_q4',
        question: 'I am ready for the science quiz, __________?',
        options: ['aren\'t I', 'am not I', 'isn\'t I', 'don\'t I'],
        correctAnswer: 'aren\'t I',
        explanation: '【ข้อยกเว้น Question Tag ของ I am】\nประโยคขึ้นต้นด้วย "I am..." รูปปฏิเสธของแท็กภาษาอังกฤษมาตรฐานคือ "aren\'t I?" (ไม่มี am not I)',
        tip: '💡 I am... ➔ aren\'t I?'
      },
      {
        id: 'eng_ls_q5',
        question: 'Father: "I know you have studied hard, Fortune. Go into that exam room and break a leg!"\nWhat does the idiom "break a leg" mean?',
        options: ['Good luck!', 'Be careful not to hurt yourself.', 'Run as fast as you can.', 'Break the table.'],
        correctAnswer: 'Good luck!',
        explanation: '【สำนวนยอดนิยม Idiom】\nสำนวน "Break a leg!" เป็นสำนวนอวยพร แปลว่า "ขอให้โชคดี! / ทำผลงานให้เต็มที่!" นิยมใช้ก่อนขึ้นเวทีหรือก่อนสอบแข่งขัน',
        tip: '💡 Break a leg = Good luck (ขอให้โชคดี)'
      },
      {
        id: 'eng_ls_q6',
        question: 'Tom: "How was the math exam this morning?"\nFortune: "It was a piece of cake! I finished ten minutes early."\nWhat does "a piece of cake" mean?',
        options: ['Very easy', 'Very delicious', 'Very difficult', 'Too long'],
        correctAnswer: 'Very easy',
        explanation: '【สำนวน A piece of cake】\n"A piece of cake" แปลว่า "ง่ายมากๆ / กล้วยๆ (very easy)"',
        tip: '💡 A piece of cake = Very easy (ง่ายมาก)'
      },
      {
        id: 'eng_ls_q7',
        question: 'Alex: "Thank you so much for explaining this physics equation to me."\nFortune: "__________"',
        options: ['My pleasure.', 'I don\'t care.', 'It doesn\'t matter.', 'Never mind.'],
        correctAnswer: 'My pleasure.',
        explanation: '【การตอบรับคำขอบคุณอย่างสุภาพ】\nเมื่อมีคนกล่าวขอบคุณ ตอบรับอย่างสุภาพด้วย "My pleasure." (ด้วยความยินดีอย่างยิ่ง) หรือ "You\'re welcome."',
        tip: '💡 ขอบคุณ ➔ My pleasure / You\'re welcome'
      },
      {
        id: 'eng_ls_q8',
        question: 'Sarah: "Practicing 3-second speed formulas really saves a lot of test time."\nFortune: "__________! It helped me complete the entire math paper."',
        options: ['I couldn\'t agree more', 'I totally disagree', 'I am afraid not', 'Not at all'],
        correctAnswer: 'I couldn\'t agree more',
        explanation: '【สำนวนแสดงความเห็นด้วย 100%】\n"I couldn\'t agree more." แปลว่า "ฉันเห็นด้วยกับคุณอย่างยิ่ง (ไม่สามารถเห็นด้วยไปมากกว่านี้ได้แล้ว)"',
        tip: '💡 I couldn\'t agree more = เห็นด้วยอย่างยิ่ง'
      },
      {
        id: 'eng_ls_q9',
        question: 'Peter only visits the astronomy planetarium "once in a blue moon." How often does he go?',
        options: ['Very rarely', 'Every weekend', 'Every full moon', 'Twice a week'],
        correctAnswer: 'Very rarely',
        explanation: '【สำนวน Once in a blue moon】\n"Once in a blue moon" แปลว่า นานๆ ครั้งมากๆ / แทบจะไม่เกิดขึ้นเลย (Very rarely)',
        tip: '💡 once in a blue moon = very rarely (นานๆ ที)'
      },
      {
        id: 'eng_ls_q10',
        question: 'Don\'t talk during the examination, __________?',
        options: ['will you', 'shall we', 'don\'t you', 'do you'],
        correctAnswer: 'will you',
        explanation: '【Question Tag ประโยคคำสั่ง/ห้าม】\nประโยคคำสั่งหรือประโยคห้าม (ขึ้นต้นด้วย Don\'t...) Question Tag ท้ายประโยคจะใช้ "will you?" เสมอ',
        tip: '💡 Don\'t + V.inf... ➔ will you?'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 📝 โมดูล 6: โครงสร้างประโยค Conjunctions & Error Identification
  // -------------------------------------------------------------------------
  writing: {
    id: 'writing',
    subject: 'english',
    title: 'โครงสร้างประโยค Conjunctions & Error ID',
    subtitle: 'เทคนิคจำ FANBOYS (เชื่อมประโยค), Because vs Although, และสูตรสแกนหาจุดผิดไวยากรณ์ (Error Detection)',
    emoji: '📝',
    secretFormula: {
      name: 'สูตรลับ "FANBOYS & สแกน Error ไวยากรณ์ 3 วิ"',
      concept: 'FANBOYS เชื่อมประโยคเท่ากัน | สแกน 3 จุด: ประธาน-กริยา, Tense, และคำเชื่อม',
      steps: [
        '⚡ FANBOYS (Coordinating Conjunctions): For, And, Nor, But, Or, Yet, So (เชื่อมคำหรือประโยคอิสระระดับเดียวกัน)',
        '⚡ Reason vs Contrast:\n• Because / Since / As + Subject + Verb (บอกเหตุผล)\n• Because of / Due to + Noun / V.ing\n• Although / Even though + Subject + Verb (บอกความขัดแย้ง)\n• In spite of / Despite + Noun / V.ing',
        '⚡ 3 สเต็ปสแกน Error Identification:\n1. ตรวจสอบ Subject & Verb Agreement (ประธานเอกพจน์ กริยาเติม s/es หรือไม่?)\n2. ตรวจสอบ Tense Consistency (ประโยคเล่าอดีต กริยาทุกตัวเป็น V.2 หรือไม่?)\n3. ตรวจสอบ Part of Speech (หน้า/หลัง Preposition เป็น Noun/V.ing หรือไม่? Adjective ขยาย Noun หรือไม่?)'
      ]
    },
    summaryPoints: [
      'Not only... but also... (ไม่เพียงแต่... แต่ยัง...) กริยาผันตามประธานตัวหลัง',
      'Both... and... (ทั้ง...และ...) กริยาเป็น "พหูพจน์เสมอ"',
      'Despite และ In spite of ห้ามตามด้วยประโยค (ห้ามมี Subject + Verb) ต้องตามด้วย Noun หรือ V.ing เท่านั้น',
      '🌟 เทคนิคน้องฟอร์จูน: คำว่า "Despite of" ไม่มีในโลก! ถ้าเจอ Despite of ในข้อสอบ Error ให้กาข้อนั้นผิดทันที!'
    ],
    practiceQuestions: [
      {
        id: 'eng_wr_q1',
        question: '__________ the heavy rain, the students arrived at the examination hall on time.',
        options: ['Despite', 'Although', 'Even though', 'Because'],
        correctAnswer: 'Despite',
        explanation: '【Conjunction vs Preposition】\n"the heavy rain" เป็นกลุ่มคำนาม (Noun Phrase) ไม่มีกริยาแท้ จึงต้องใช้ Preposition แสดงความขัดแย้งคือ "Despite" หรือ "In spite of"\n(Although / Even though ต้องตามด้วยประโยคที่มี Subject + Verb)',
        tip: '💡 Despite + Noun Phrase | Although + ประโยค'
      },
      {
        id: 'eng_wr_q2',
        question: 'The flight was delayed __________ the severe thunderstorm.',
        options: ['because of', 'because', 'although', 'since'],
        correctAnswer: 'because of',
        explanation: '【Because vs Because of】\n"the severe thunderstorm" เป็นคำนาม จึงต้องใช้ "because of" หรือ "due to" (ส่วน because และ since ต้องตามด้วยประโยค)',
        tip: '💡 because of + Noun | because + ประโยค'
      },
      {
        id: 'eng_wr_q3',
        question: 'Find the ERROR in the sentence:\n"(A) Each of the (B) scientists (C) are working (D) diligently in the laboratory."',
        options: ['(C) are working', '(A) Each of', '(B) scientists', '(D) diligently'],
        correctAnswer: '(C) are working',
        explanation: '【Error Identification - S-V Agreement】\nประธานคือ "Each of the scientists" คำว่า "Each" เป็นเอกพจน์ กริยาจึงต้องแก้จาก "are working" เป็น "is working"',
        tip: '💡 Each of... กริยาต้องเป็นเอกพจน์ (is working)'
      },
      {
        id: 'eng_wr_q4',
        question: 'Find the ERROR in the sentence:\n"Yesterday, Fortune (A) finished his homework, (B) packed his bag, and (C) goes to bed (D) early."',
        options: ['(C) goes to bed', '(A) finished', '(B) packed', '(D) early'],
        correctAnswer: '(C) goes to bed',
        explanation: '【Error Identification - Parallel Structure & Tense】\nประโยคบอกเหตุการณ์ในอดีต (Yesterday) กริยาทุกตัวที่เชื่อมด้วย and ต้องเป็น Past Simple (V.2) ในโครงสร้างคู่ขนาน: finished, packed, and ➔ ต้องแก้ "goes" เป็น "went"',
        tip: '💡 โครงสร้างคู่ขนาน Tense อดีต: V.2, V.2, and V.2'
      },
      {
        id: 'eng_wr_q5',
        question: 'Both Fortune __________ his classmate received full marks on the physics quiz.',
        options: ['and', 'or', 'nor', 'but'],
        correctAnswer: 'and',
        explanation: '【Correlative Conjunctions】\nโครงสร้างคู่คำเชื่อม: "Both... and..." (ทั้ง...และ...) ใช้คู่กันเสมอ',
        tip: '💡 Both คู่กับ and เสมอ'
      },
      {
        id: 'eng_wr_q6',
        question: 'Fortune was very tired after the soccer match, __________ he still completed all his science exercises.',
        options: ['yet', 'so', 'because', 'since'],
        correctAnswer: 'yet',
        explanation: '【FANBOYS แสดงความขัดแย้ง】\n"yet" ในกลุ่ม FANBOYS ทำหน้าที่เหมือน "but" แปลว่า "แต่ / ถึงกระนั้น" ใช้เชื่อมประโยคแสดงความขัดแย้ง (เหนื่อยมาก แต่ก็ยังทำการบ้านเสร็จ)',
        tip: '💡 yet = but (แต่/ถึงกระนั้น)'
      },
      {
        id: 'eng_wr_q7',
        question: 'Find the ERROR in the sentence:\n"The doctor explained the treatment (A) clear so that (B) the patient (C) could understand (D) easily."',
        options: ['(A) clear', '(B) the patient', '(C) could understand', '(D) easily'],
        correctAnswer: '(A) clear',
        explanation: '【Error Identification - Adjective vs Adverb】\nคำว่า "explained" เป็นกริยา การขยายกริยาต้องใช้ "Adverb (กริยาวิเศษณ์)" จึงต้องแก้จาก "clear" เป็น "clearly"',
        tip: '💡 ขยายกริยาต้องใช้ Adverb (clearly)'
      },
      {
        id: 'eng_wr_q8',
        question: 'Not only the teacher but also the students __________ excited about the upcoming field trip.',
        options: ['are', 'is', 'was', 'has been'],
        correctAnswer: 'are',
        explanation: '【กฎ Not only... but also...】\nกริยาจะผันตามประธานตัวหลังที่อยู่ติดกับกริยา (the students เป็นพหูพจน์) จึงใช้ "are"',
        tip: '💡 not only... but also... ผันตามประธานตัวหลัง'
      },
      {
        id: 'eng_wr_q9',
        question: 'Find the ERROR in the sentence:\n"In spite of (A) the weather was stormy, (B) the rescue team (C) succeeded in (D) saving the lost hikers."',
        options: ['(A) the weather was stormy', '(B) the rescue team', '(C) succeeded in', '(D) saving'],
        correctAnswer: '(A) the weather was stormy',
        explanation: '【Error Identification - In spite of】\n"the weather was stormy" เป็นประโยคสมบูรณ์ (S+V) ห้ามใช้ In spite of ต้องแก้เป็น "Although the weather was stormy" หรือ "In spite of the stormy weather"',
        tip: '💡 In spite of ห้ามตามด้วยประโยค S+V'
      },
      {
        id: 'eng_wr_q10',
        question: 'Fortune studied every day, __________ he passed the entrance examination with the highest score.',
        options: ['so', 'for', 'but', 'nor'],
        correctAnswer: 'so',
        explanation: '【FANBOYS แสดงผลลัพธ์】\n"so" เชื่อมประโยคบอกผลลัพธ์ (เหตุ: ขยันอ่านหนังสือทุกวัน ➔ ผล: ดังนั้นจึงสอบได้คะแนนสูงสุด)',
        tip: '💡 so = ดังนั้น (บอกผลลัพธ์)'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 🛡️ โมดูล 7: Passive Voice & กริยาช่วย (Modal Verbs)
  // -------------------------------------------------------------------------
  passive_modals: {
    id: 'passive_modals',
    subject: 'english',
    title: 'Passive Voice & กริยาช่วย (Modal Verbs)',
    subtitle: 'โครงสร้าง Subject + be + V.3 (ประธานถูกกระทำ), การใช้ Can/Could, Must/Should, และ May/Might',
    emoji: '🛡️',
    secretFormula: {
      name: 'สูตรลับ "Passive Voice (be + V.3) & Modal Verbs"',
      concept: 'ประธานเป็นสิ่งของ/ถูกกระทำ ➔ ต้องใช้ Verb to be + V.3 เสมอ',
      steps: [
        '⚡ โครงสร้าง Passive Voice พื้นฐาน:\n• Present Simple: S + is/am/are + V.3 (เช่น Medicine is produced in this lab.)\n• Past Simple: S + was/were + V.3 (เช่น The telescope was invented by Galileo.)\n• Future Simple: S + will be + V.3\n• Modal Verbs: S + modal (can/must/should) + be + V.3',
        '⚡ ความหมาย Modal Verbs:\n• Must = ต้องทำ (กฎ/จำเป็น 100%)\n• Should = ควรจะทำ (ให้คำแนะนำ)\n• Can / Could = สามารถทำได้ / ขอร้องสุภาพ\n• May / Might = อาจจะ (ความเป็นไปได้ 50%)'
      ]
    },
    summaryPoints: [
      'Modal Verbs ทุกตัว (can, could, may, might, must, should, will, would) ต้องตามด้วย "V.infinitive (กริยาไม่ผัน ไม่เติม s/es/ing/ed)" เสมอ',
      'กริยา 3 ช่องยอดฮิต: write-wrote-written, break-broke-broken, discover-discovered-discovered, build-built-built',
      'By + ผู้กระทำ มักวางไว้ท้ายประโยค Passive Voice (หากไม่สำคัญสามารถละได้)',
      '🌟 เทคนิคน้องฟอร์จูน: เมื่อเห็นประธานเป็น "สิ่งของหรือวัตถุ" เช่น book, medicine, car ➔ กริยาต้องอยู่ในรูป be + V.3 เสมอ!'
    ],
    practiceQuestions: [
      {
        id: 'eng_pm_q1',
        question: 'The new laboratory equipment __________ by the school yesterday.',
        options: ['was delivered', 'delivered', 'is delivered', 'was delivering'],
        correctAnswer: 'was delivered',
        explanation: '【Past Passive Voice】\n1. ประธานคือ "equipment" (อุปกรณ์ เป็นสิ่งของ ถูกส่ง)\n2. มีตัวบอกเวลาอดีตคือ "yesterday"\n➔ ต้องใช้ Past Passive Voice: was + V.3 (was delivered)',
        tip: '💡 สิ่งของถูกกระทำในอดีต = was/were + V.3'
      },
      {
        id: 'eng_pm_q2',
        question: 'All students __________ wear protective goggles before starting the chemical experiment. (It is a strict safety rule)',
        options: ['must', 'might', 'could', 'may'],
        correctAnswer: 'must',
        explanation: '【Modal Verbs - กฎข้อบังคับ】\n"must" ใช้กับกฎระเบียบ ความจำเป็น 100% หรือข้อบังคับด้านความปลอดภัยในห้องแล็บ',
        tip: '💡 กฎความปลอดภัย / ข้อบังคับ = must (ต้องทำ)'
      },
      {
        id: 'eng_pm_q3',
        question: 'This famous science fiction novel __________ by Jules Verne in 1870.',
        options: ['was written', 'wrote', 'is written', 'has written'],
        correctAnswer: 'was written',
        explanation: '【Passive Voice ในอดีต】\nหนังสือนิยายถูกเขียนขึ้นในอดีต (in 1870) โดย Jules Verne: was + V.3 (was written)',
        tip: '💡 was written by... (ถูกเขียนโดย)'
      },
      {
        id: 'eng_pm_q4',
        question: 'You have a high fever; you __________ see a doctor immediately.',
        options: ['should', 'may', 'might', 'would'],
        correctAnswer: 'should',
        explanation: '【Modal Verbs - คำแนะนำ】\n"should" แปลว่า "ควรจะ" ใช้ในการให้คำแนะนำที่ถูกต้องและเหมาะสมต่อสุขภาพ',
        tip: '💡 ให้คำแนะนำ = should'
      },
      {
        id: 'eng_pm_q5',
        question: 'Vaccines __________ stored at very low temperatures to maintain their efficacy.',
        options: ['must be', 'must', 'must been', 'must being'],
        correctAnswer: 'must be',
        explanation: '【Modal Passive Voice เพื่อฟอร์จูน】\nโครงสร้าง Modal ในรูปถูกกระทำ: Modal + be + V.3 (Vaccines must be stored)',
        tip: '💡 must + be + V.3 (ต้องถูกเก็บรักษา)'
      },
      {
        id: 'eng_pm_q6',
        question: 'English __________ as a global language in more than one hundred countries today.',
        options: ['is spoken', 'speaks', 'was spoken', 'is speaking'],
        correctAnswer: 'is spoken',
        explanation: '【Present Passive Voice】\nภาษาอังกฤษ (English) ถูกพูดโดยผู้คนทั่วโลกในปัจจุบัน (today): is + V.3 (is spoken)',
        tip: '💡 is spoken (ถูกพูด)'
      },
      {
        id: 'eng_pm_q7',
        question: 'Take an umbrella with you; it __________ rain later this evening.',
        options: ['might', 'must', 'should', 'shall'],
        correctAnswer: 'might',
        explanation: '【Modal Verbs - ความเป็นไปได้】\n"might" หรือ "may" ใช้แสดงความเป็นไปได้ที่อาจจะเกิดขึ้นในอนาคต (อาจจะฝนตก)',
        tip: '💡 อาจจะเกิด = might / may'
      },
      {
        id: 'eng_pm_q8',
        question: 'Thousands of endangered sea turtles __________ by marine biologists every year.',
        options: ['are protected', 'protected', 'is protected', 'are protecting'],
        correctAnswer: 'are protected',
        explanation: '【Present Simple Passive】\nประธานคือ "Thousands of endangered sea turtles" (พหูพจน์) เกิดขึ้นเป็นประจำทุกปี (every year): are + V.3 (are protected)',
        tip: '💡 are protected (ได้รับการคุ้มครอง)'
      },
      {
        id: 'eng_pm_q9',
        question: 'The lost microchip could not __________ anywhere in the computer room.',
        options: ['be found', 'find', 'found', 'been found'],
        correctAnswer: 'be found',
        explanation: '【Modal Passive Voice】\nโครงสร้าง: could not + be + V.3 (be found = ถูกค้นพบ)',
        tip: '💡 could not be found (ไม่สามารถถูกพบได้)'
      },
      {
        id: 'eng_pm_q10',
        question: 'Which of the following sentences is in the "Passive Voice"?',
        options: [
          'The Nobel Prize in Chemistry was awarded to the scientist.',
          'The scientist received the Nobel Prize in Chemistry.',
          'The committee is announcing the winners today.',
          'Fortune solved the biology puzzle quickly.'
        ],
        correctAnswer: 'The Nobel Prize in Chemistry was awarded to the scientist.',
        explanation: '【วิเคราะห์รูป Passive Voice】\nประโยค "was awarded" มีโครงสร้าง Verb to be + V.3 (รางวัลโนเบลถูกมอบให้แก่นักวิทยาศาสตร์) จึงเป็น Passive Voice ที่ถูกต้อง',
        tip: '💡 be + V.3 = Passive Voice'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // ⚖️ โมดูล 8: การเปรียบเทียบ (Comparisons) & If-Clause Type 1
  // -------------------------------------------------------------------------
  comparison_conjunctions: {
    id: 'comparison_conjunctions',
    subject: 'english',
    title: 'การเปรียบเทียบ & If-Clause Type 1',
    subtitle: 'ขั้นกว่า (-er/more) vs ขั้นสุด (the -est/most), ข้อยกเว้น good-better-best, และโครงสร้าง If + V.1, will + V.inf',
    emoji: '⚖️',
    secretFormula: {
      name: 'สูตรลับ "ขั้นกว่าขั้นสุด & If-Clause Type 1"',
      concept: 'ขั้นกว่ามี than | ขั้นสุดมี the | If + V.1 คู่กับ will + V.inf',
      steps: [
        '⚡ การเปรียบเทียบ 3 ระดับ:\n1) ขั้นเท่ากัน: as + Adjective + as (เช่น as smart as)\n2) ขั้นกว่า: Adjective-er than / more + Adjective + than (เช่น faster than, more expensive than)\n3) ขั้นสุด: the + Adjective-est / the most + Adjective (เช่น the fastest, the most intelligent)',
        '⚡ กริยาคุณศัพท์เปลี่ยนรูปพิเศษ:\n• good ➔ better ➔ the best\n• bad ➔ worse ➔ the worst\n• far ➔ farther/further ➔ the farthest/furthest\n• many/much ➔ more ➔ the most\n• little ➔ less ➔ the least',
        '⚡ If-Clause Type 1 (เป็นไปได้จริงในปัจจุบัน/อนาคต):\nIf + Subject + V.1 (Present Simple), Subject + will / can + V.infinitive'
      ]
    },
    summaryPoints: [
      'Double Comparatives: The more you practice, the better you become. (ยิ่ง...ก็ยิ่ง...)',
      'Unless = If... not (ถ้าไม่... เช่น Unless you study, you will fail = If you don\'t study, you will fail)',
      'ห้ามใช้ more ซ้อนกับ -er (ห้ามเขียน more faster เด็ดขาด!)',
      '🌟 เทคนิคน้องฟอร์จูน: ท่องโครงสร้าง If Type 1: "If เจอ V.1 ➔ กา will + V.inf ใน 2 วินาที!"'
    ],
    practiceQuestions: [
      {
        id: 'eng_cc_q1',
        question: 'Mercury is __________ planet to the Sun in our solar system.',
        options: ['the closest', 'closest', 'closer than', 'more close'],
        correctAnswer: 'the closest',
        explanation: '【Superlative ขั้นสุด】\nการเปรียบเทียบดาวเคราะห์ที่อยู่ใกล้ดวงอาทิตย์ที่สุดในระบบสุริยะ ใช้ขั้นสุด: "the closest" (the + adj-est)',
        tip: '💡 ขั้นสุดต้องมี the นำหน้าเสมอ (the closest)'
      },
      {
        id: 'eng_cc_q2',
        question: 'Light travels much __________ sound in the air.',
        options: ['faster than', 'fastest', 'more fast than', 'as fast as'],
        correctAnswer: 'faster than',
        explanation: '【Comparative ขั้นกว่า】\nเปรียบเทียบความเร็วของแสงกับเสียงในอากาศ (2 สิ่ง) มีคำว่า than ➔ ใช้ขั้นกว่า "faster than"',
        tip: '💡 ขั้นกว่าคู่กับ than (faster than)'
      },
      {
        id: 'eng_cc_q3',
        question: 'If Fortune __________ hard every day, he will pass the Gifted school entrance exam.',
        options: ['practices', 'practiced', 'will practice', 'is practicing'],
        correctAnswer: 'practices',
        explanation: '【If-Clause Type 1】\nโครงสร้าง: If + Present Simple (V.1), will + V.inf\nFortune เป็นประธานเอกพจน์ กริยาใน If-clause จึงเป็น "practices" (เติม s)',
        tip: '💡 If + V.1, will + V.inf'
      },
      {
        id: 'eng_cc_q4',
        question: 'Water is __________ liquid on Earth for supporting human life.',
        options: ['the most important', 'more important', 'important than', 'as important'],
        correctAnswer: 'the most important',
        explanation: '【Superlative คำ 3 พยางค์】\nคำคุณศัพท์ 3 พยางค์ (im-por-tant) ในขั้นสุด ใช้ "the most important"',
        tip: '💡 the most + คำ 3 พยางค์ขึ้นไป'
      },
      {
        id: 'eng_cc_q5',
        question: 'This newly developed microscope provides __________ resolution than the old model.',
        options: ['better', 'good', 'best', 'more good'],
        correctAnswer: 'better',
        explanation: '【คุณศัพท์เปลี่ยนรูปพิเศษ】\nคำว่า "good" เมื่อเปลี่ยนเป็นขั้นกว่า (มี than) จะเปลี่ยนรูปเป็น "better" (ไม่มี more good)',
        tip: '💡 good ➔ better than ➔ the best'
      },
      {
        id: 'eng_cc_q6',
        question: 'If you heat ice above 0 degrees Celsius, it __________ into liquid water.',
        options: ['melts', 'melted', 'will melted', 'is melting'],
        correctAnswer: 'melts',
        explanation: '【Zero Conditional กฎวิทยาศาสตร์ 100%】\nความจริงทางวิทยาศาสตร์ที่แน่นอน 100% ใช้ Zero Conditional: If + V.1, V.1 (If you heat ice, it melts.)',
        tip: '💡 กฎวิทยาศาสตร์แน่นอน 100% ใช้ If + V.1, V.1'
      },
      {
        id: 'eng_cc_q7',
        question: 'The more formulas Fortune reviews, __________ he becomes at solving complex problems.',
        options: ['the better', 'better', 'the best', 'more better'],
        correctAnswer: 'the better',
        explanation: '【Double Comparative โครงสร้างยิ่ง...ก็ยิ่ง...】\nโครงสร้าง: The + comparative..., the + comparative...\n"The more formulas..., the better he becomes."',
        tip: '💡 The more..., the better...'
      },
      {
        id: 'eng_cc_q8',
        question: 'Unless you __________ safety goggles in the lab, you will not be allowed to perform the experiment.',
        options: ['wear', 'don\'t wear', 'wore', 'will wear'],
        correctAnswer: 'wear',
        explanation: '【Unless = If not】\n"Unless" มีความหมายเชิงปฏิเสธในตัวเองอยู่แล้ว (Unless = If you do not...) กริยาตามหลังจึงต้องเป็นรูปบอกเล่าคือ "wear"',
        tip: '💡 หลัง Unless ต้องเป็นประโยคบอกเล่า'
      },
      {
        id: 'eng_cc_q9',
        question: 'Jupiter is by far __________ planet in our entire solar system.',
        options: ['the largest', 'larger than', 'large', 'most largest'],
        correctAnswer: 'the largest',
        explanation: '【Superlative ขั้นสุด】\nดาวพฤหัสบดีเป็นดาวเคราะห์ที่ใหญ่ที่สุดในระบบสุริยะ ใช้ "the largest"',
        tip: '💡 the largest (ใหญ่ที่สุด)'
      },
      {
        id: 'eng_cc_q10',
        question: 'If we __________ the botanical garden tomorrow, we will take many plant photos.',
        options: ['visit', 'visited', 'will visit', 'are visiting'],
        correctAnswer: 'visit',
        explanation: '【If-Clause Type 1】\nโครงสร้าง: If + Subject + V.1, Subject + will + V.inf\nประธานคือ "we" กริยาใช้รูปเดิมคือ "visit"',
        tip: '💡 ใน If-clause ห้ามใส่ will ให้ใช้ V.1'
      }
    ]
  },

  // =========================================================================
  // 🚀 TRACK 2: ม.1 ADVANCE (EP / GIFTED ENGLISH) (8 โมดูลหลัก สสวท. & CEFR B1)
  // =========================================================================

  // -------------------------------------------------------------------------
  // ⏳ โมดูล 9: Present Perfect vs Past Simple & Continuous Forms
  // -------------------------------------------------------------------------
  m1_adv_tenses: {
    id: 'm1_adv_tenses',
    subject: 'english',
    title: 'Advanced Tenses & Aspect Mastery',
    subtitle: 'Present Perfect (have/has + V.3) vs Past Simple (V.2), Past Continuous คู่ขนาน (While/When) และ Future Forms',
    emoji: '⏳',
    secretFormula: {
      name: 'สูตรลับ "Present Perfect vs Past Simple 3 วินาที"',
      concept: 'มีจุดเวลาอดีตชัดเจนใช้ V.2 | บอกประสบการณ์/ต่อเนื่องถึงปัจจุบันใช้ have/has + V.3',
      steps: [
        '⚡ Past Simple (V.2): เจอกลุ่มเวลาอดีตระบุชัด ➔ yesterday, last week, ago, in 1999, just now',
        '⚡ Present Perfect (have/has + V.3): เจอกลุ่มคำบอกความต่อเนื่อง/ประสบการณ์ ➔ since (ตั้งแต่จุดเวลา), for (เป็นเวลา...), already, just, yet, ever, never, so far',
        '⚡ Past Continuous คู่ Past Simple:\n• การกระทำกำลังเกิดขึ้นอยู่ (Past Con: was/were + V.ing) ➔ มีเหตุการณ์สั้นแทรกเข้ามา (Past Sim: V.2)\n• ตัวเชื่อม: While / As + was/were + V.ing | When + V.2'
      ]
    },
    summaryPoints: [
      'Since + จุดเริ่มต้นเวลาในอดีต (since 2020, since 8 AM, since I was young)',
      'For + ระยะเวลา (for 5 years, for two hours, for a long time)',
      'Yet ใช้ในประโยคปฏิเสธและคำถาม วางท้ายประโยคเสมอ (Have you finished yet? / I haven\'t eaten yet.)',
      '🌟 เทคนิคน้องฟอร์จูน: ท่องจำ: "While ตามด้วย was/were + V.ing | When ตามด้วย V.2"!'
    ],
    practiceQuestions: [
      {
        id: 'm1_at_q1',
        question: 'Fortune __________ English every single day since he was seven years old.',
        options: ['has practiced', 'practiced', 'is practicing', 'was practicing'],
        correctAnswer: 'has practiced',
        explanation: '【Present Perfect Tense】\nมีคำว่า "since he was seven years old" บอกการกระทำที่เริ่มตั้งแต่อดีตและทำต่อเนื่องมาจนถึงปัจจุบัน โครงสร้างคือ has + V.3 (has practiced)',
        tip: '💡 since / for ➔ have/has + V.3'
      },
      {
        id: 'm1_at_q2',
        question: 'Alexander Fleming __________ penicillin by accident in 1928.',
        options: ['discovered', 'has discovered', 'is discovering', 'was discovered'],
        correctAnswer: 'discovered',
        explanation: '【Past Simple Tense】\nมีจุดระบุเวลาในอดีตชัดเจนคือ "in 1928" เหตุการณ์จบลงแล้วในอดีต ต้องใช้ Past Simple (V.2) คือ "discovered"',
        tip: '💡 in + ปี ค.ศ. ในอดีต ➔ ใช้ V.2'
      },
      {
        id: 'm1_at_q3',
        question: 'While Fortune __________ an experiment in the chemistry lab, the fire alarm rang.',
        options: ['was conducting', 'conducted', 'is conducting', 'has conducted'],
        correctAnswer: 'was conducting',
        explanation: '【Past Continuous คู่ Past Simple】\nเหตุการณ์ที่กำลังดำเนินอยู่ยาวนานในอดีต (กำลังทำการทดลอง) ใช้ While + was/were + V.ing (was conducting) และมีเหตุการณ์สั้นแทรกเข้ามา (the fire alarm rang: V.2)',
        tip: '💡 While + was/were + V.ing (เหตุการณ์กำลังทำ)'
      },
      {
        id: 'm1_at_q4',
        question: 'Have you __________ visited the National Science Museum in Bangkok?',
        options: ['ever', 'never', 'already', 'yet'],
        correctAnswer: 'ever',
        explanation: '【Present Perfect ในประโยคคำถามถามประสบการณ์】\nในการถามประสบการณ์ว่า "เคย...หรือไม่" ใช้คำว่า "ever" ในประโยคคำถาม (Have you ever + V.3?)',
        tip: '💡 Have you ever + V.3? (เคย...ไหม)'
      },
      {
        id: 'm1_at_q5',
        question: 'The medical team has not published their clinical trial results __________.',
        options: ['yet', 'already', 'just', 'since'],
        correctAnswer: 'yet',
        explanation: '【การใช้ Yet】\nคำว่า "yet" แปลว่า "ยัง (ยังไม่ได้ทำ)" ใช้ในประโยคปฏิเสธ (has not published) หรือคำถาม และวางอยู่ท้ายประโยคเสมอ',
        tip: '💡 not... yet (ยังไม่...)'
      },
      {
        id: 'm1_at_q6',
        question: 'When the teacher entered the classroom, the students __________ animatedly about the science project.',
        options: ['were discussing', 'discussed', 'have discussed', 'are discussing'],
        correctAnswer: 'were discussing',
        explanation: '【Past Continuous เมื่อมีเหตุการณ์แทรก】\nเมื่อครูเดินเข้ามา (When the teacher entered: V.2) นักเรียนกำลังพูดคุยกันอยู่ก่อนแล้ว (were discussing: was/were + V.ing)',
        tip: '💡 กำลังคุยกันอยู่ตอนที่ครูเข้ามา = were discussing'
      },
      {
        id: 'm1_at_q7',
        question: 'The researchers __________ this new vaccine for three years, and they are almost ready for clinical approval.',
        options: ['have been testing', 'tested', 'test', 'were testing'],
        correctAnswer: 'have been testing',
        explanation: '【Present Perfect Continuous เพื่อฟอร์จูน】\nการกระทำที่เน้นย้ำความต่อเนื่องอย่างไม่หยุดหย่อนตั้งแต่อดีตจนถึงปัจจุบัน (for three years) และยังทำต่อไป ใช้ have/has been + V.ing (have been testing)',
        tip: '💡 have been + V.ing (ทำต่อเนื่องมาตลอด)'
      },
      {
        id: 'm1_at_q8',
        question: 'By the time the fire truck arrived, the neighbors __________ the fire.',
        options: ['had already extinguished', 'already extinguished', 'have already extinguished', 'will extinguish'],
        correctAnswer: 'had already extinguished',
        explanation: '【Past Perfect Tense】\nเหตุการณ์ในอดีต 2 เหตุการณ์: เหตุการณ์ที่เกิดและจบลงก่อน (ดับไฟเสร็จก่อน) ใช้ Past Perfect (had + V.3) ก่อนที่รถดับเพลิงจะมาถึง (arrived: V.2)',
        tip: '💡 เกิดก่อนในอดีตใช้ had + V.3 | เกิดตามหลังใช้ V.2'
      },
      {
        id: 'm1_at_q9',
        question: 'Fortune __________ three difficult mathematics modules so far this week.',
        options: ['has completed', 'completed', 'is completing', 'completes'],
        correctAnswer: 'has completed',
        explanation: '【คำระบุเวลา So far】\nคำว่า "so far" (จนถึงตอนนี้) บ่งบอกผลรวมของการกระทำจนถึงปัจจุบัน ต้องใช้ Present Perfect (has completed)',
        tip: '💡 so far ➔ have/has + V.3'
      },
      {
        id: 'm1_at_q10',
        question: 'Look at those dark clouds! It __________ rain in a few minutes.',
        options: ['is going to', 'will be', 'has to', 'would'],
        correctAnswer: 'is going to',
        explanation: '【Future with Evidence - be going to】\nการทำนายอนาคตที่มี "หลักฐานเชิงประจักษ์ชัดเจนในปัจจุบัน" (เมฆดำทะมึน) ต้องใช้ "be going to + V.inf" (is going to rain)',
        tip: '💡 มีหลักฐานชัดเจนตรงหน้า ใช้ be going to'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 🛡️ โมดูล 10: Advanced Passive Voice & Impersonal Passive
  // -------------------------------------------------------------------------
  m1_adv_passive_voice: {
    id: 'm1_adv_passive_voice',
    subject: 'english',
    title: 'Advanced Passive Voice & Impersonal Passive',
    subtitle: 'Passive Voice ในทุก Tense, โครงสร้าง Impersonal Passive (It is said that...) และ Have/Get something done',
    emoji: '🛡️',
    secretFormula: {
      name: 'สูตรลับ "Impersonal Passive & Causative Form"',
      concept: 'It is said/believed that... | have/get + สิ่งของ + V.3 (จ้างวานให้ผู้อื่นทำ)',
      steps: [
        '⚡ Impersonal Passive (การรายงานข่าว/ข้อเท็จจริงทางวิชาการ):\n• It is believed that... (เชื่อกันว่า...)\n• It is reported that... (มีรายงานว่า...)\n• It is estimated that... (คาดประมาณกันว่า...)',
        '⚡ Causative Verbs (have/get something done):\n• Subject + have / get + สิ่งของ (Object) + V.3\n• ตัวอย่าง: I had my computer repaired. (ฉันให้ช่างซ่อมคอมพิวเตอร์ให้)',
        '⚡ Passive with Prepositions other than "by":\n• covered with (ปกคลุมด้วย)\n• interested in (สนใจใน)\n• surprised at (ประหลาดใจกับ)\n• crowded with (แน่นขนัดไปด้วย)'
      ]
    },
    summaryPoints: [
      'Continuous Passive: S + is/am/are/was/were + being + V.3 (เช่น The bridge is being repaired.)',
      'Perfect Passive: S + have/has/had + been + V.3 (เช่น The problem has been solved.)',
      'กริยา Intransitive Verbs (กริยาที่ไม่ต้องการกรรม เช่น happen, occur, die, arrive) "ห้ามทำเป็น Passive Voice เด็ดขาด"',
      '🌟 เทคนิคน้องฟอร์จูน: คำว่า happen / occur ห้ามเขียน was happened เด็ดขาด เพราะเป็นกริยาไม่มีกรรม!'
    ],
    practiceQuestions: [
      {
        id: 'm1_apv_q1',
        question: 'It is widely __________ that regular physical exercise improves cognitive brain function.',
        options: ['believed', 'believing', 'believe', 'believes'],
        correctAnswer: 'believed',
        explanation: '【Impersonal Passive Voice】\nโครงสร้าง Impersonal Passive: It is + V.3 (believed/reported/known) + that...',
        tip: '💡 It is believed that... (เชื่อกันว่า)'
      },
      {
        id: 'eng_apv_q2',
        question: 'The new hospital wing __________ right now and will open next month.',
        options: ['is being built', 'is building', 'was built', 'has built'],
        correctAnswer: 'is being built',
        explanation: '【Present Continuous Passive】\nมีคำว่า "right now" กำลังดำเนินอยู่ และประธานคืออาคารโรงพยาบาล (ถูกสร้าง) โครงสร้างคือ is/am/are + being + V.3 (is being built)',
        tip: '💡 กำลังถูกสร้างตอนนี้ = is being built'
      },
      {
        id: 'eng_apv_q3',
        question: 'Fortune had his broken microscope __________ by a professional technician.',
        options: ['repaired', 'repair', 'repairing', 'to repair'],
        correctAnswer: 'repaired',
        explanation: '【Causative Form (have something done)】\nโครงสร้าง: have + สิ่งของ (microscope) + V.3 (repaired) แปลว่า จ้างวานให้ช่างซ่อมกล้องให้',
        tip: '💡 have + สิ่งของ + V.3'
      },
      {
        id: 'eng_apv_q4',
        question: 'The summit of Mount Everest is permanently covered __________ thick snow and ice.',
        options: ['with', 'by', 'of', 'from'],
        correctAnswer: 'with',
        explanation: '【Passive with Preposition】\nสำนวน "covered with" แปลว่า ปกคลุมไปด้วย (หิมะและน้ำแข็ง)',
        tip: '💡 covered with (ปกคลุมด้วย)'
      },
      {
        id: 'eng_apv_q5',
        question: 'Which of the following verbs CANNOT be used in the passive voice?',
        options: ['happen', 'discover', 'build', 'create'],
        correctAnswer: 'happen',
        explanation: '【Intransitive Verb ข้อยกเว้น Passive】\nคำว่า "happen" (เกิดขึ้น) เป็น Intransitive Verb (กริยาที่ไม่ต้องการกรรม) จึงไม่สามารถนำมาเขียนในรูป Passive Voice ได้ (ห้ามใช้ was happened)',
        tip: '💡 happen / occur ห้ามทำเป็น Passive Voice'
      },
      {
        id: 'eng_apv_q6',
        question: 'All the conference tickets have already __________ by enthusiastic science students.',
        options: ['been bought', 'being bought', 'bought', 'be bought'],
        correctAnswer: 'been bought',
        explanation: '【Present Perfect Passive】\nโครงสร้าง: have/has + been + V.3 (have already been bought)',
        tip: '💡 have been + V.3'
      },
      {
        id: 'eng_apv_q7',
        question: 'The mysterious ancient ruins are thought __________ by a lost civilization.',
        options: ['to have been built', 'to build', 'building', 'having built'],
        correctAnswer: 'to have been built',
        explanation: '【Advanced Passive with Infinitive】\nโครงสร้าง: Subject + is/are thought + to have been + V.3 (เชื่อกันว่าได้ถูกสร้างขึ้นในอดีต)',
        tip: '💡 are thought to have been built'
      },
      {
        id: 'eng_apv_q8',
        question: 'The results of the medical study will __________ in an international scientific journal next week.',
        options: ['be published', 'publish', 'published', 'been published'],
        correctAnswer: 'be published',
        explanation: '【Future Simple Passive】\nโครงสร้าง: will + be + V.3 (will be published)',
        tip: '💡 will be + V.3'
      },
      {
        id: 'eng_apv_q9',
        question: 'The scientist was very pleased __________ the positive outcome of the clinical trials.',
        options: ['with', 'for', 'to', 'on'],
        correctAnswer: 'with',
        explanation: '【Preposition หลัง Adjective/Passive】\nสำนวน "pleased with" หรือ "satisfied with" แปลว่า พอใจกับผลลัพธ์ที่ได้',
        tip: '💡 pleased with / satisfied with'
      },
      {
        id: 'eng_apv_q10',
        question: 'When the lab assistants arrived, the chemical spill __________ completely cleaned up.',
        options: ['had already been', 'has already been', 'is already being', 'was already being'],
        correctAnswer: 'had already been',
        explanation: '【Past Perfect Passive】\nสารเคมีที่หกได้ถูกทำความสะอาดเสร็จสิ้นก่อน (had been + V.3) ที่ผู้ช่วยแล็บจะมาถึง (arrived: V.2)',
        tip: '💡 had been + V.3 (ถูกกระทำเสร็จสิ้นก่อนในอดีต)'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 🔗 โมดูล 11: Relative Pronouns & Defining vs Non-defining Clauses
  // -------------------------------------------------------------------------
  m1_adv_relative_clauses: {
    id: 'm1_adv_relative_clauses',
    subject: 'english',
    title: 'Relative Clauses & Complex Sentences',
    subtitle: 'Who, Whom, Whose, Which, That, Where, When และความแตกต่าง Defining vs Non-defining (เครื่องหมายจุลภาค Comma)',
    emoji: '🔗',
    secretFormula: {
      name: 'สูตรลับ "เลือก Relative Pronoun 3 วินาที"',
      concept: 'ดูคำข้างหน้า + ดูโครงสร้างข้างหลัง',
      steps: [
        '⚡ Who (คน + กริยา): The doctor WHO treated the patient was very kind.',
        '⚡ Whom (คน + ประธาน+กริยา): The scientist WHOM we interviewed won the award.',
        '⚡ Whose (คน/สิ่งของ + คำนามแสดงความเป็นเจ้าของ): The boy WHOSE father is an engineer is smart.',
        '⚡ Which (สัตว์/สิ่งของ): The medicine WHICH was developed in Thailand is effective.',
        '⚡ That (คน/สัตว์/สิ่งของ ใน Defining Clause - "ห้ามอยู่หลัง Comma , เด็ดขาด!")',
        '⚡ Where (สถานที่) / When (เวลา)'
      ]
    },
    summaryPoints: [
      'Non-defining Relative Clause (มีเครื่องหมายจุลภาค , ... ,) ให้ข้อมูลเสริม "ห้ามใช้ THAT เด็ดขาด!" ต้องใช้ Who หรือ Which เท่านั้น',
      'Whose + คำนามเสมอ (เช่น whose car, whose research, whose parents)',
      'Omission of Relative Pronouns: สามารถละ who/which/that ได้เมื่อทำหน้าที่เป็น "กรรมของประโยคย่อย"',
      '🌟 เทคนิคน้องฟอร์จูน: เจอกฎเหล็ก: "หลังเครื่องหมาย Comma (,) ห้ามกา THAT เด็ดขาด!" ให้เลือก Who หรือ Which เท่านั้น!'
    ],
    practiceQuestions: [
      {
        id: 'm1_rc_q1',
        question: 'The doctor __________ discovered the new vaccine was awarded the prestigious international prize.',
        options: ['who', 'which', 'whose', 'whom'],
        correctAnswer: 'who',
        explanation: '【การเลือก Relative Pronoun】\n1. คำข้างหน้าคือ "The doctor" (คน)\n2. คำข้างหลังคือ "discovered" (กริยา ทำหน้าที่เป็นประธานของอนุประโยค)\n➔ ต้องใช้ "who"',
        tip: '💡 คน + กริยา ➔ ใช้ who'
      },
      {
        id: 'm1_rc_q2',
        question: 'The student __________ science project won first prize is named Fortune.',
        options: ['whose', 'who', 'which', 'whom'],
        correctAnswer: 'whose',
        explanation: '【Whose แสดงความเป็นเจ้าของ】\n"whose science project" (โครงงานวิทยาศาสตร์ ของ นักเรียนคนนั้น) คำว่า whose เชื่อมระหว่างเจ้าของกับคำนามที่เป็นของเขา',
        tip: '💡 คน + คำนาม ➔ ใช้ whose'
      },
      {
        id: 'm1_rc_q3',
        question: 'Sir Isaac Newton, __________ formulated the laws of universal gravitation, was an English physicist and mathematician.',
        options: ['who', 'that', 'which', 'whom'],
        correctAnswer: 'who',
        explanation: '【Non-defining Clause ห้ามใช้ that】\nประโยคนี้มีเครื่องหมายจุลภาค (Comma , ) เป็นส่วนขยายเสริม และพูดถึงบุคคล (Sir Isaac Newton) ➔ ห้ามใช้ that เด็ดขาด ต้องใช้ "who"',
        tip: '💡 หลังเครื่องหมาย Comma (,) ห้ามใช้ that!'
      },
      {
        id: 'm1_rc_q4',
        question: 'The high-tech microscope __________ we purchased last month has a magnification of 2000X.',
        options: ['which', 'who', 'whose', 'where'],
        correctAnswer: 'which',
        explanation: '【สัตว์/สิ่งของ】\n"The high-tech microscope" เป็นสิ่งของ Relative Pronoun ที่ใช้แทนสิ่งของคือ "which" หรือ "that"',
        tip: '💡 สิ่งของ ➔ ใช้ which หรือ that'
      },
      {
        id: 'm1_rc_q5',
        question: 'This is the advanced hospital laboratory __________ novel pharmaceuticals are developed and tested.',
        options: ['where', 'which', 'who', 'when'],
        correctAnswer: 'where',
        explanation: '【Relative Adverb แทนสถานที่】\n"the advanced hospital laboratory" เป็นสถานที่ และประโยคข้างหลังบอกว่า "มีการพัฒนายาขึ้น ณ ที่แห่งนั้น" จึงใช้ "where"',
        tip: '💡 สถานที่ที่เกิดการกระทำ ➔ ใช้ where'
      },
      {
        id: 'm1_rc_q6',
        question: 'The researcher __________ the university sent to the international symposium presented outstanding data.',
        options: ['whom', 'which', 'whose', 'where'],
        correctAnswer: 'whom',
        explanation: '【Whom ทำหน้าที่เป็นกรรม】\n"The researcher" เป็นคน และทำหน้าที่เป็นกรรมของกริยา sent (มหาวิทยาลัยส่งนักวิจัยคนนี้ไป) ➔ ใช้ "whom"',
        tip: '💡 คน + ประธาน+กริยา ➔ ใช้ whom'
      },
      {
        id: 'm1_rc_q7',
        question: '2020 was the year __________ the global community faced unprecedented pandemic challenges.',
        options: ['when', 'where', 'which', 'who'],
        correctAnswer: 'when',
        explanation: '【Relative Adverb แทนเวลา】\n"2020 was the year" บ่งบอกเวลา จึงเชื่อมด้วย "when"',
        tip: '💡 เวลา ➔ ใช้ when'
      },
      {
        id: 'm1_rc_q8',
        question: 'The plant extract, __________ contains powerful natural antioxidants, is being studied for new therapies.',
        options: ['which', 'that', 'who', 'what'],
        correctAnswer: 'which',
        explanation: '【Non-defining Clause สิ่งของ】\nมีเครื่องหมาย Comma (,) และประธานเป็นสิ่งของ (The plant extract) ➔ ใช้ "which" (ห้ามใช้ that หลัง comma)',
        tip: '💡 สิ่งของหลัง Comma ➔ ใช้ which'
      },
      {
        id: 'm1_rc_q9',
        question: 'In which of the following sentences can the relative pronoun be OMITTED (ละได้)?',
        options: [
          'The book (which) Fortune read yesterday was fascinating.',
          'The doctor who treated the patient was experienced.',
          'The car which was parked outside is blue.',
          'The boy who won the race is my cousin.'
        ],
        correctAnswer: 'The book (which) Fortune read yesterday was fascinating.',
        explanation: '【การละ Relative Pronoun】\nสามารถละ who/which/that ได้เฉพาะเมื่อทำหน้าที่เป็น "กรรม" (The book which Fortune read = Fortune อ่านหนังสือนั้น) ส่วนตัวเลือกอื่นทำหน้าที่เป็นประธาน ละไม่ได้',
        tip: '💡 ละ Relative Pronoun ได้เมื่อทำหน้าที่เป็นกรรม'
      },
      {
        id: 'm1_rc_q10',
        question: 'The chemistry formula __________ is written on the whiteboard represents photosynthesis.',
        options: ['that', 'who', 'whom', 'where'],
        correctAnswer: 'that',
        explanation: '【Defining Clause สิ่งของ】\n"The chemistry formula" เป็นสิ่งของ ใน Defining Clause (ไม่มี comma) สามารถใช้ "that" หรือ "which" ได้',
        tip: '💡 สิ่งของไม่มี comma ➔ ใช้ that หรือ which'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 🔮 โมดูล 12: Conditionals Type 0, 1, 2, 3 & Mixed Conditionals (Unless)
  // -------------------------------------------------------------------------
  m1_adv_conditionals: {
    id: 'm1_adv_conditionals',
    subject: 'english',
    title: 'Complete Conditionals Mastery (Type 0–3)',
    subtitle: 'If-Clause ครบทั้ง 4 แบบ (Type 0, 1, 2, 3), สมมุติอดีตตรงข้ามความจริง และคำเชื่อม Unless, Provided that',
    emoji: '🔮',
    secretFormula: {
      name: 'ตาราง 4 โครงสร้าง If-Clause พิชิตทุกข้อสอบ',
      concept: 'ท่องคู่ Tense ให้แม่นยำ: V.1 คู่ will | V.2 คู่ would | had V.3 คู่ would have V.3',
      steps: [
        '⚡ Type 0 (ความจริง 100% / วิทยาศาสตร์): If + V.1, V.1 (เช่น If you heat water to 100°C, it boils.)',
        '⚡ Type 1 (เป็นไปได้จริงในอนาคต): If + V.1, will + V.inf (เช่น If Fortune studies, he will pass.)',
        '⚡ Type 2 (สมมุติตรงข้ามความจริงในปัจจุบัน/เพ้อฝัน): If + V.2 (were), would + V.inf (เช่น If I were you, I would study medicine.)',
        '⚡ Type 3 (เสียดายอดีตที่ผ่านไปแล้ว ตรงข้ามความจริงในอดีต): If + had + V.3, would have + V.3 (เช่น If I had known, I would have helped.)'
      ]
    },
    summaryPoints: [
      'ใน Type 2 กริยา Verb to be จะใช้ "were" กับประธานทุกตัว (If I were..., If he were...)',
      'Provided that / As long as = if (ตราบเท่าที่ / ถ้าหากว่า)',
      'Had I known... = If I had known... (Inversion การสลับโครงสร้างละ if)',
      '🌟 เทคนิคน้องฟอร์จูน: เจอกฎคู่แท้: "If had + V.3 ➔ กา would have + V.3 ทันทีใน 2 วินาที!"'
    ],
    practiceQuestions: [
      {
        id: 'm1_cond_q1',
        question: 'If I __________ you, I would enroll in the advanced biomedical science course.',
        options: ['were', 'was', 'am', 'have been'],
        correctAnswer: 'were',
        explanation: '【If-Clause Type 2 สมมุติในปัจจุบัน】\nโครงสร้างสมมุติว่า "ถ้าฉันเป็นเธอ" (If I were you) ในภาษาอังกฤษเชิงวิชาการจะใช้ "were" กับประธานทุกบุรุษ',
        tip: '💡 If I were you, I would... (ถ้าฉันเป็นคุณ)'
      },
      {
        id: 'm1_cond_q2',
        question: 'If the researchers __________ the vaccine earlier, thousands of lives would have been saved.',
        options: ['had developed', 'developed', 'develop', 'have developed'],
        correctAnswer: 'had developed',
        explanation: '【If-Clause Type 3 สมมุติตรงข้ามอดีต】\nประโยคหลักเป็น "would have been saved" (would have + V.3) ➔ ใน If-clause ต้องเป็น Past Perfect: "had developed" (had + V.3)',
        tip: '💡 If had + V.3, would have + V.3'
      },
      {
        id: 'm1_cond_q3',
        question: 'If you mix blue and yellow paint together, you __________ green.',
        options: ['get', 'will got', 'would get', 'got'],
        correctAnswer: 'get',
        explanation: '【Zero Conditional ความจริง 100%】\nการผสมสีน้ำเงินกับสีเหลืองได้สีเขียวเป็นข้อเท็จจริงแน่นอน 100% ใช้ Type 0: If + V.1, V.1 (If you mix..., you get...)',
        tip: '💡 ความจริง 100% ใช้ If + V.1, V.1'
      },
      {
        id: 'm1_cond_q4',
        question: 'If Fortune had more free time, he __________ more science documentary films.',
        options: ['would watch', 'will watch', 'watched', 'would have watched'],
        correctAnswer: 'would watch',
        explanation: '【If-Clause Type 2】\nใน If-clause ใช้ "had" (V.2) สมมุติตรงข้ามปัจจุบัน ➔ ประโยคหลักต้องใช้ "would + V.inf" (would watch)',
        tip: '💡 If + V.2, would + V.inf'
      },
      {
        id: 'm1_cond_q5',
        question: 'If the spaceship had not malfunctioned, the astronauts __________ on Mars successfully.',
        options: ['would have landed', 'will land', 'landed', 'would land'],
        correctAnswer: 'would have landed',
        explanation: '【If-Clause Type 3】\nIf-clause ใช้ "had not malfunctioned" (had + V.3) ➔ ประโยคหลักต้องเป็น "would have landed" (would have + V.3)',
        tip: '💡 had + V.3 คู่กับ would have + V.3'
      },
      {
        id: 'm1_cond_q6',
        question: 'You can borrow the advanced chemistry kit __________ you promise to handle the glassware carefully.',
        options: ['provided that', 'unless', 'despite', 'in case of'],
        correctAnswer: 'provided that',
        explanation: '【คำเชื่อมเงื่อนไข Provided that】\n"Provided that" หรือ "As long as" แปลว่า "ถ้าหากว่า / ภายใต้เงื่อนไขว่า" ทำหน้าที่เหมือน If',
        tip: '💡 provided that = if (ภายใต้เงื่อนไขว่า)'
      },
      {
        id: 'm1_cond_q7',
        question: '__________ you wear sterile gloves, you are not allowed to touch the petri dishes in the culture lab.',
        options: ['Unless', 'If', 'Provided that', 'Because'],
        correctAnswer: 'Unless',
        explanation: '【Unless = If not】\n"Unless you wear sterile gloves" แปลว่า "ถ้าเธอไม่สวมถุงมือปลอดเชื้อ เธอจะไม่ได้รับอนุญาตให้จับจานเพาะเชื้อ"',
        tip: '💡 Unless = ถ้าไม่'
      },
      {
        id: 'm1_cond_q8',
        question: 'Had Fortune known about the astronomy club meeting, he __________ it yesterday.',
        options: ['would have attended', 'would attend', 'will attend', 'attended'],
        correctAnswer: 'would have attended',
        explanation: '【Inversion Type 3 (Had + S + V.3)】\n"Had Fortune known..." คือรูปละ if ของ "If Fortune had known..." (Type 3) ➔ ประโยคหลักต้องเป็น "would have attended"',
        tip: '💡 Had + S + V.3... ➔ would have + V.3'
      },
      {
        id: 'm1_cond_q9',
        question: 'If the Earth stopped rotating, what __________ to the oceans and atmosphere?',
        options: ['would happen', 'will happen', 'happened', 'would have happened'],
        correctAnswer: 'would happen',
        explanation: '【If-Clause Type 2 สมมุติสิ่งที่ไม่น่าเป็นจริง】\nIf-clause เป็น "stopped" (V.2) ➔ ประโยคหลักต้องใช้ "would + V.inf" (would happen)',
        tip: '💡 If + V.2 ➔ would + V.inf'
      },
      {
        id: 'm1_cond_q10',
        question: 'If plants do not receive sunlight, they __________ photosynthesis.',
        options: ['cannot perform', 'could not have performed', 'would not perform', 'did not perform'],
        correctAnswer: 'cannot perform',
        explanation: '【Zero Conditional วิทยาศาสตร์】\nข้อเท็จจริงทางชีววิทยา: ถ้าพืชไม่ได้รับแสง พืชจะไม่สามารถสังเคราะห์ด้วยแสงได้ (cannot perform / do not perform)',
        tip: '💡 กฎวิทยาศาสตร์ ➔ Present Simple (cannot perform)'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 💬 โมดูล 13: Direct to Indirect Reported Speech & Tense Shifts
  // -------------------------------------------------------------------------
  m1_adv_reported_speech: {
    id: 'm1_adv_reported_speech',
    subject: 'english',
    title: 'Reported Speech & Indirect Statements',
    subtitle: 'กฎการถอย Tense 1 สเต็ป (Backshift), การเปลี่ยนคำบอกเวลา/สถานที่, และการเปลี่ยนประโยคคำถามเป็นประโยคบอกเล่า',
    emoji: '💬',
    secretFormula: {
      name: 'สูตรลับ "ถอย Tense 1 สเต็ป & ปรับคำบอกเวลา"',
      concept: 'เมื่อกริยานำเป็นอดีต (said/told) ➔ ถอย Tense ไปอดีต 1 ขั้นเสมอ',
      steps: [
        '⚡ กฎการถอย Tense (Tense Backshift):\n• Present Simple (V.1) ➔ Past Simple (V.2)\n• Present Continuous (is/am/are + V.ing) ➔ Past Continuous (was/were + V.ing)\n• Present Perfect / Past Simple (have + V.3 / V.2) ➔ Past Perfect (had + V.3)\n• will ➔ would | can ➔ could | may ➔ might | must ➔ had to',
        '⚡ การเปลี่ยนคำบอกเวลาและสถานที่:\n• now ➔ then | today ➔ that day | tomorrow ➔ the next day / the following day | yesterday ➔ the day before / the previous day | here ➔ there | this ➔ that | these ➔ those',
        '⚡ Reported Questions:\n• คำถาม Yes/No: ใช้ if หรือ whether + Subject + Verb\n• คำถาม Wh-words: ใช้ Wh-word + Subject + Verb (เรียงแบบประโยคบอกเล่า ห้ามใช้กริยาช่วย do/does/did นำหน้าประธาน!)'
      ]
    },
    summaryPoints: [
      'Said to + บุคคล ➔ เปลี่ยนเป็น Told + บุคคล (เช่น He told me that...)',
      'ข้อยกเว้น: หากสิ่งที่พูดเป็น "ความจริงทางวิทยาศาสตร์ตลอดกาล (General/Scientific Truth)" ➔ "ไม่ต้องถอย Tense" (คงรูป Present Simple ไว้)',
      'Reported Orders/Requests: tell/ask + someone + to + V.inf (เช่น The doctor told him to take the medicine.)',
      '🌟 เทคนิคน้องฟอร์จูน: คำถามใน Reported Speech จะ "เรียงแบบบอกเล่า (Subject + Verb เสมอ)" ไม่มีเครื่องหมาย ? ท้ายประโยค!'
    ],
    practiceQuestions: [
      {
        id: 'm1_rs_q1',
        question: 'Direct: "I am conducting a botanical experiment," Fortune said.\nIndirect: Fortune said that he __________ a botanical experiment.',
        options: ['was conducting', 'is conducting', 'has conducted', 'will conduct'],
        correctAnswer: 'was conducting',
        explanation: '【Tense Backshift】\nPresent Continuous (am conducting) เมื่อเปลี่ยนเป็น Reported Speech โดยมีกริยานำเป็นอดีต (said) จะต้องถอย Tense เป็น Past Continuous (was conducting)',
        tip: '💡 is/am/are + V.ing ➔ was/were + V.ing'
      },
      {
        id: 'm1_rs_q2',
        question: 'Direct: "The Earth revolves around the Sun," the science teacher explained.\nIndirect: The teacher explained that the Earth __________ around the Sun.',
        options: ['revolves', 'revolved', 'had revolved', 'was revolving'],
        correctAnswer: 'revolves',
        explanation: '【ข้อยกเว้นความจริงทางวิทยาศาสตร์】\nข้อเท็จจริงทางวิทยาศาสตร์ที่เป็นจริงตลอดกาล (โลกโคจรรอบดวงอาทิตย์) "ไม่ต้องถอย Tense" ให้คงรูป Present Simple (revolves) เสมอ',
        tip: '💡 กฎวิทยาศาสตร์อมตะ ➔ ไม่ต้องถอย Tense (ใช้ V.1 เหมือนเดิม)'
      },
      {
        id: 'm1_rs_q3',
        question: 'Direct: "Do you understand the speed math formula?" the teacher asked Fortune.\nIndirect: The teacher asked Fortune __________ the speed math formula.',
        options: ['if he understood', 'did he understand', 'if did he understand', 'that he understood'],
        correctAnswer: 'if he understood',
        explanation: '【Reported Yes/No Question】\nคำถาม Yes/No เมื่อเปลี่ยนเป็น Reported Speech:\n1. ใช้คำเชื่อม "if" หรือ "whether"\n2. เรียงประโยคแบบบอกเล่า: Subject (he) + Verb ช่อง 2 (understood)\n➔ "if he understood"',
        tip: '💡 คำถาม Yes/No ➔ if + Subject + V.2'
      },
      {
        id: 'm1_rs_q4',
        question: 'Direct: "Where did you buy this microscope?" Sarah asked me.\nIndirect: Sarah asked me where __________ that microscope.',
        options: ['I had bought', 'did I buy', 'had I bought', 'I bought'],
        correctAnswer: 'I had bought',
        explanation: '【Reported Wh-Question】\n1. ใช้คำเชื่อม Wh-word คือ "where"\n2. เรียงแบบบอกเล่า (Subject นำหน้า Verb)\n3. ถอย Tense จาก Past Simple (did buy: V.2) เป็น Past Perfect (had bought)\n➔ "where I had bought that microscope"',
        tip: '💡 Wh-word + Subject + had + V.3'
      },
      {
        id: 'm1_rs_q5',
        question: 'Direct: "Take this medicine twice a day after meals," the pharmacist told the patient.\nIndirect: The pharmacist told the patient __________ that medicine twice a day after meals.',
        options: ['to take', 'taking', 'took', 'must take'],
        correctAnswer: 'to take',
        explanation: '【Reported Imperative / คำแนะนำทางการแพทย์เพื่อฟอร์จูน】\nประโยคคำสั่งหรือคำแนะนำ: tell + someone + to + V.infinitive (told the patient to take...)',
        tip: '💡 told someone + to + V.inf'
      },
      {
        id: 'm1_rs_q6',
        question: 'Direct: "I will finish the chemistry project tomorrow," Alex said.\nIndirect: Alex said that he __________ the chemistry project __________.',
        options: [
          'would finish / the following day',
          'will finish / tomorrow',
          'would finish / yesterday',
          'finished / the day before'
        ],
        correctAnswer: 'would finish / the following day',
        explanation: '【การเปลี่ยน will และคำบอกเวลา】\n1. will ➔ เปลี่ยนเป็น "would"\n2. tomorrow ➔ เปลี่ยนเป็น "the next day" หรือ "the following day"',
        tip: '💡 will ➔ would | tomorrow ➔ the following day'
      },
      {
        id: 'm1_rs_q7',
        question: 'Direct: "Don\'t touch the corrosive acid without gloves," the lab instructor warned us.\nIndirect: The lab instructor warned us __________ the corrosive acid without gloves.',
        options: ['not to touch', 'don\'t touch', 'to not touch', 'not touching'],
        correctAnswer: 'not to touch',
        explanation: '【Reported Negative Command】\nประโยคห้าม (Don\'t...): warn/tell + someone + "not to + V.infinitive" (warned us not to touch)',
        tip: '💡 ห้ามทำอะไร ➔ not to + V.inf'
      },
      {
        id: 'm1_rs_q8',
        question: 'Direct: "I have lived in Songkhla for ten years," Dr. Phairot said.\nIndirect: Dr. Phairot said that he __________ in Songkhla for ten years.',
        options: ['had lived', 'has lived', 'lived', 'was living'],
        correctAnswer: 'had lived',
        explanation: '【Tense Backshift Present Perfect ➔ Past Perfect】\n"have lived" (Present Perfect) ถอย Tense 1 สเต็ปเป็น "had lived" (Past Perfect)',
        tip: '💡 have/has + V.3 ➔ had + V.3'
      },
      {
        id: 'm1_rs_q9',
        question: 'Direct: "Can you help me calibrate the spectrometer?" the researcher asked.\nIndirect: The researcher asked if I __________ help calibrate the spectrometer.',
        options: ['could', 'can', 'would can', 'am able to'],
        correctAnswer: 'could',
        explanation: '【การเปลี่ยน Modal Verb】\n"can" ถอย Tense เป็น "could" ใน Reported Speech',
        tip: '💡 can ➔ could'
      },
      {
        id: 'm1_rs_q10',
        question: 'Direct: "We saw an eclipse here yesterday," the children shouted.\nIndirect: The children shouted that they __________ an eclipse __________.',
        options: [
          'had seen / there the day before',
          'saw / here yesterday',
          'have seen / there tomorrow',
          'had seen / here the next day'
        ],
        correctAnswer: 'had seen / there the day before',
        explanation: '【การเปลี่ยนครบทั้ง 3 จุด Gifted】\n1. saw (V.2) ➔ had seen (had + V.3)\n2. here ➔ there\n3. yesterday ➔ the day before',
        tip: '💡 V.2 ➔ had + V.3 | here ➔ there | yesterday ➔ the day before'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 🎯 โมดูล 14: Advanced Phrasal Verbs & Prepositional Idioms
  // -------------------------------------------------------------------------
  m1_adv_phrasal_verbs: {
    id: 'm1_adv_phrasal_verbs',
    subject: 'english',
    title: 'Advanced Phrasal Verbs & Idiomatic Expressions',
    subtitle: 'กริยาวลีขั้นสูงและสำนวนข้อสอบ Gifted/EP (Call off, Carry out, Put up with, Turn down, Figure out)',
    emoji: '🎯',
    secretFormula: {
      name: 'สูตรจำ Phrasal Verbs ยอดฮิตพิชิต Gifted',
      concept: 'กริยาเดิม + บุพบท = ความหมายใหม่ที่ต้องจำ',
      steps: [
        '⚡ Call off = ยกเลิก (cancel) vs Call on = เยี่ยมเยียน',
        '⚡ Carry out = ดำเนินการ/ทำการทดลอง (conduct/execute)',
        '⚡ Turn down = ปฏิเสธ (reject/refuse) หรือ หรี่เสียง/ลดระดับ',
        '⚡ Put off = เลื่อนเวลาออกไป (postpone/delay)',
        '⚡ Put up with = อดทนอดกลั้น (tolerate/endure)',
        '⚡ Figure out = คิดหาคำตอบได้/เข้าใจ (understand/solve)'
      ]
    },
    summaryPoints: [
      'Look into = ตรวจสอบสืบสวน (investigate) | Look up to = เคารพนับถือ (respect/admire)',
      'Run out of = หมด (exhaust supply เช่น run out of time/money/fuel)',
      'Break through = ค้นพบความก้าวหน้าครั้งสำคัญ (make a major discovery)',
      '🌟 เทคนิคน้องฟอร์จูน: Call off = ยกเลิก (cancel) | Put off = เลื่อนออกไป (postpone) อย่าจำสับสนกันเด็ดขาด!'
    ],
    practiceQuestions: [
      {
        id: 'm1_pv_q1',
        question: 'Due to the severe typhoon warning, the committee decided to __________ the international science summit.',
        options: ['call off', 'call on', 'put on', 'carry on'],
        correctAnswer: 'call off',
        explanation: '【Phrasal Verb - ยกเลิก】\n"call off" แปลว่า ยกเลิก (cancel) ซึ่งตรงกับบริบทที่มีพายุไต้ฝุ่นเข้าจึงต้องยกเลิกการประชุม',
        tip: '💡 call off = cancel (ยกเลิก)'
      },
      {
        id: 'm1_pv_q2',
        question: 'The research team is preparing to __________ a groundbreaking clinical trial next month.',
        options: ['carry out', 'carry on', 'carry away', 'carry over'],
        correctAnswer: 'carry out',
        explanation: '【Phrasal Verb - ทำการทดลองเพื่อฟอร์จูน】\n"carry out" แปลว่า ดำเนินการ / ปฏิบัติการทดลอง (conduct / perform an experiment)',
        tip: '💡 carry out an experiment = ทำการทดลอง'
      },
      {
        id: 'm1_pv_q3',
        question: 'Fortune spent hours reviewing the complex algebra problem and finally managed to __________ the answer.',
        options: ['figure out', 'turn down', 'give up', 'call off'],
        correctAnswer: 'figure out',
        explanation: '【Phrasal Verb - คิดหาคำตอบได้】\n"figure out" แปลว่า คิดคำนวณออก / ทำความเข้าใจคำตอบได้ (solve / understand)',
        tip: '💡 figure out = solve (คิดหาคำตอบได้)'
      },
      {
        id: 'm1_pv_q4',
        question: 'The meeting has been __________ until next Friday because the principal is unwell.',
        options: ['put off', 'put on', 'put out', 'put up'],
        correctAnswer: 'put off',
        explanation: '【Phrasal Verb - เลื่อนเวลา】\n"put off" แปลว่า เลื่อนกำหนดการออกไป (postpone / delay)',
        tip: '💡 put off = postpone (เลื่อนเวลาออกไป)'
      },
      {
        id: 'm1_pv_q5',
        question: 'The young scientist had to __________ the job offer abroad to stay and care for his family.',
        options: ['turn down', 'turn off', 'turn on', 'turn up'],
        correctAnswer: 'turn down',
        explanation: '【Phrasal Verb - ปฏิเสธ】\n"turn down" แปลว่า ปฏิเสธข้อเสนอ (reject / refuse a job offer)',
        tip: '💡 turn down = reject (ปฏิเสธข้อเสนอ)'
      },
      {
        id: 'm1_pv_q6',
        question: 'We must hurry up; we are about to __________ time before the test submission deadline.',
        options: ['run out of', 'run into', 'run over', 'run away'],
        correctAnswer: 'run out of',
        explanation: '【Phrasal Verb - หมด】\n"run out of time" แปลว่า เวลาหมด / สิ่งของหมด',
        tip: '💡 run out of = หมด'
      },
      {
        id: 'm1_pv_q7',
        question: 'The police and forensic investigators are looking __________ the cause of the laboratory explosion.',
        options: ['into', 'after', 'for', 'up to'],
        correctAnswer: 'into',
        explanation: '【Phrasal Verb - ตรวจสอบ】\n"look into" แปลว่า ตรวจสอบ สืบสวนหาสาเหตุ (investigate)',
        tip: '💡 look into = investigate (สืบสวน/ตรวจสอบ)'
      },
      {
        id: 'm1_pv_q8',
        question: 'Young students always look __________ the inspiring chemistry professor for guidance.',
        options: ['up to', 'down on', 'out for', 'forward to'],
        correctAnswer: 'up to',
        explanation: '【Phrasal Verb - เคารพนับถือ】\n"look up to" แปลว่า เคารพ ชื่นชม และยึดถือเป็นแบบอย่าง (respect / admire)',
        tip: '💡 look up to = respect (เคารพนับถือ)'
      },
      {
        id: 'm1_pv_q9',
        question: 'Firefighters worked tirelessly for five hours to __________ the raging forest fire.',
        options: ['put out', 'put off', 'put on', 'put away'],
        correctAnswer: 'put out',
        explanation: '【Phrasal Verb - ดับไฟ】\n"put out" แปลว่า ดับไฟ / ดับเพลิง (extinguish a fire)',
        tip: '💡 put out a fire = ดับไฟ'
      },
      {
        id: 'm1_pv_q10',
        question: 'The laboratory team made a tremendous __________ in cancer gene therapy research.',
        options: ['breakthrough', 'breakdown', 'breakout', 'breakup'],
        correctAnswer: 'breakthrough',
        explanation: '【Noun from Phrasal Verb เพื่อฟอร์จูน】\n"breakthrough" (คำนาม) แปลว่า การค้นพบหรือความก้าวหน้าครั้งสำคัญทางวิทยาศาสตร์และการแพทย์',
        tip: '💡 breakthrough = ความก้าวหน้าครั้งสำคัญ'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 📰 โมดูล 15: Academic & Scientific Reading Comprehension (Medical Texts)
  // -------------------------------------------------------------------------
  m1_adv_academic_reading: {
    id: 'm1_adv_academic_reading',
    subject: 'english',
    title: 'Academic & Scientific Reading (Medical & Science)',
    subtitle: 'การอ่านบทความเชิงวิชาการ การแพทย์ และวิทยาศาสตร์, การวิเคราะห์แผนภาพตาราง และการจับใจความระดับสูง',
    emoji: '📰',
    secretFormula: {
      name: 'สูตรแกะบทความวิชาการ & ศัพท์วิทยาศาสตร์การแพทย์',
      concept: 'สแกน Topic Sentence ➔ จับความสัมพันธ์เหตุและผล (Cause & Effect)',
      steps: [
        '⚡ คำศัพท์วิชาการพบบ่อย:\n• hypothesis (สมมติฐาน), methodology (ระเบียบวิธีวิจัย), empirical data (ข้อมูลเชิงประจักษ์), conclusion (ข้อสรุป)\n• clinical trial (การทดลองทางคลินิก), efficacy (ประสิทธิภาพยา), dosage (ขนาดยา), adverse reaction (ผลข้างเคียงไม่พึงประสงค์)',
        '⚡ สัญญาณบอกเหตุและผล (Cause & Effect):\n• Cause: because of, due to, as a consequence of, result from\n• Effect: consequently, as a result, lead to, contribute to'
      ]
    },
    summaryPoints: [
      'บทความวิชาการมักมีโครงสร้าง IMRAD: Introduction ➔ Methods ➔ Results ➔ And ➔ Discussion',
      'Fact (ข้อเท็จจริงตรวจสอบได้) vs Opinion (ความคิดเห็น/ความรู้สึกส่วนตัว)',
      'การอ่านกราฟและตารางข้อมูล: ดูชื่อหัวตารางและหน่วยวัดก่อนอ่านค่าข้อมูล',
      '🌟 เทคนิคน้องฟอร์จูน: คำว่า "efficacy" ในบทความยาและการแพทย์ แปลว่า "ประสิทธิภาพของยาในการรักษาโรค"!'
    ],
    practiceQuestions: [
      {
        id: 'm1_ar_q1',
        question: 'Read the text:\n"CRISPR-Cas9 is a groundbreaking gene-editing technology derived from bacterial immune systems. It functions like molecular scissors, allowing geneticists to precisely cut and modify DNA sequences to eliminate hereditary diseases."\n\nWhat is the primary function of CRISPR-Cas9 described in the text?',
        options: [
          'To cut and edit specific DNA sequences to treat genetic disorders.',
          'To produce bacterial infections in humans.',
          'To manufacture paper scissors for laboratory use.',
          'To destroy the human immune system.'
        ],
        correctAnswer: 'To cut and edit specific DNA sequences to treat genetic disorders.',
        explanation: '【จับใจความบทความพันธุศาสตร์】\nในบทความระบุชัดเจนว่า CRISPR-Cas9 ทำหน้าที่เป็นกรรไกรระดับโมเลกุลที่ช่วยตัดและแก้ไขลำดับ DNA อย่างแม่นยำเพื่อขจัดโรคทางพันธุกรรม',
        tip: '💡 ตอบตรงตามบทความ: ตัดและแก้ไขลำดับ DNA'
      },
      {
        id: 'm1_ar_q2',
        question: 'In the passage in Question 1, the phrase "molecular scissors" is used as a __________.',
        options: ['metaphor (การเปรียบเทียบเชิงอุปมา)', 'literal cutting tool', 'scientific name of bacteria', 'chemical element'],
        correctAnswer: 'metaphor (การเปรียบเทียบเชิงอุปมา)',
        explanation: '【Literary Device ในบทความวิทย์】\n"molecular scissors" เป็นการเปรียบเทียบเชิงอุปมา (Metaphor) เพื่อให้ผู้อ่านเห็นภาพว่าเอนไซม์ทำหน้าที่ตัดสาย DNA ได้เหมือนกรรไกร',
        tip: '💡 molecular scissors = การเปรียบเทียบเชิงอุปมา'
      },
      {
        id: 'm1_ar_q3',
        question: 'Read the medical excerpt:\n"During Phase III clinical trials, the new antiviral drug demonstrated a 92% efficacy rate in preventing severe illness, with negligible adverse reactions reported among the 10,000 volunteers."\n\nWhat does "efficacy" mean in this medical context?',
        options: [
          'Effectiveness in producing the desired therapeutic result',
          'Total cost of production',
          'Taste and flavor of the liquid medicine',
          'Color of the chemical solution'
        ],
        correctAnswer: 'Effectiveness in producing the desired therapeutic result',
        explanation: '【ศัพท์การแพทย์และเภสัชกรรมเพื่อฟอร์จูน】\n"efficacy" ในทางการแพทย์และเภสัชศาสตร์ หมายถึง "ประสิทธิภาพของยาในการให้ผลการรักษาโรคตามที่ต้องการ"',
        tip: '💡 efficacy = ประสิทธิภาพในการรักษาโรค'
      },
      {
        id: 'm1_ar_q4',
        question: 'From the text in Question 3, what were the side effects reported?',
        options: [
          'Almost none (negligible)',
          'Extremely severe and life-threatening',
          'Affecting 92% of the patients',
          'Uncontrollable fever'
        ],
        correctAnswer: 'Almost none (negligible)',
        explanation: '【Detail Comprehension】\nในบทความระบุว่า "...with negligible adverse reactions..." คำว่า negligible แปลว่า เล็กน้อยมากจนแทบไม่มีผลกระทบ (almost none)',
        tip: '💡 negligible = เล็กน้อยมากจนแทบไม่มี'
      },
      {
        id: 'm1_ar_q5',
        question: 'Which of the following statements represents a "FACT" rather than an opinion?',
        options: [
          'Water molecules consist of two hydrogen atoms and one oxygen atom.',
          'Chemistry is the most interesting subject in school.',
          'Robotics competitions are more exciting than sports.',
          'Everyone should become a medical doctor.'
        ],
        correctAnswer: 'Water molecules consist of two hydrogen atoms and one oxygen atom.',
        explanation: '【Fact vs Opinion】\n• Fact (ข้อเท็จจริง): โครงสร้างโมเลกุลของน้ำประกอบด้วย H 2 ตัวและ O 1 ตัว (H₂O) เป็นข้อเท็จจริงทางวิทยาศาสตร์ที่พิสูจน์ได้\n• ตัวเลือกอื่นเป็นความคิดเห็นและความรู้สึกส่วนบุคคล (Opinion)',
        tip: '💡 Fact = ข้อเท็จจริงที่พิสูจน์ได้ตามหลักวิทยาศาสตร์'
      },
      {
        id: 'm1_ar_q6',
        question: 'Read the excerpt:\n"Antibiotic resistance occurs when bacteria evolve mechanisms to survive the drugs designed to kill them. Overuse and misuse of antibiotics in humans and livestock are accelerating this global healthcare crisis."\n\nWhat is the main cause accelerating antibiotic resistance?',
        options: [
          'Overuse and misuse of antibiotics in humans and animals',
          'Drinking too much clean water',
          'Lack of regular physical exercise',
          'The discovery of new vaccines'
        ],
        correctAnswer: 'Overuse and misuse of antibiotics in humans and animals',
        explanation: '【Cause and Effect Analysis】\nบทความระบุชัดเจนว่า สาเหตุที่เร่งวิกฤตเชื้อดื้อยาคือ "การใช้ยาปฏิชีวนะเกินความจำเป็นและใช้อย่างไม่ถูกต้องในมนุษย์และสัตว์"',
        tip: '💡 เชื้อดื้อยาเกิดจาก: การใช้ยาพร่ำเพรื่อและไม่ถูกวิธี'
      },
      {
        id: 'm1_ar_q7',
        question: 'In academic writing, what is the primary purpose of the "Abstract" section at the beginning of a research paper?',
        options: [
          'To provide a concise summary of the entire research study including objectives, methods, and key results.',
          'To list all personal acknowledgments and thank-you notes.',
          'To advertise commercial laboratory products.',
          'To present detailed raw mathematical formulas only.'
        ],
        correctAnswer: 'To provide a concise summary of the entire research study including objectives, methods, and key results.',
        explanation: '【โครงสร้างบทความวิจัย Academic Structure】\n"Abstract (บทคัดย่อ)" คือการสรุปย่อภาพรวมทั้งหมดของงานวิจัย ทั้งวัตถุประสงค์ วิธีการทดลอง ผลลัพธ์ และข้อสรุปสำคัญ',
        tip: '💡 Abstract = บทคัดย่อสรุปงานวิจัย'
      },
      {
        id: 'm1_ar_q8',
        question: 'Read the climate science note:\n"Rising global temperatures have accelerated the melting of polar ice caps. Consequently, global sea levels have risen by approximately 20 centimeters over the past century, threatening coastal ecosystems."\n\nWhat is the meaning of the transition word "Consequently"?',
        options: ['As a result (ส่งผลให้ / ดังนั้น)', 'In contrast (ในทางตรงข้าม)', 'Simultaneously (ในเวลาเดียวกัน)', 'Previously (ก่อนหน้านี้)'],
        correctAnswer: 'As a result (ส่งผลให้ / ดังนั้น)',
        explanation: '【Transition Words】\n"Consequently" แปลว่า "ส่งผลให้ / ดังนั้น (As a result)" ใช้บอกผลลัพธ์ที่ตามมาจากสาเหตุที่เกิดขึ้นก่อนหน้า',
        tip: '💡 Consequently = As a result (ส่งผลให้)'
      },
      {
        id: 'm1_ar_q9',
        question: 'A study shows a "strong positive correlation" between daily study hours and exam scores. This means that __________.',
        options: [
          'Students who study more hours generally achieve higher scores.',
          'Studying more hours causes students to fail.',
          'Study hours have no relationship with exam scores.',
          'Exam scores decrease as study time increases.'
        ],
        correctAnswer: 'Students who study more hours generally achieve higher scores.',
        explanation: '【การแปลผลความสัมพันธ์ทางสถิติ】\n"Positive correlation (สหสัมพันธ์เชิงบวก)" หมายถึง ตัวแปรทั้งสองแปรผันตามกัน เมื่อชั่วโมงอ่านหนังสือเพิ่มขึ้น คะแนนสอบก็จะเพิ่มสูงขึ้นตาม',
        tip: '💡 Positive correlation = ตัวแปรเพิ่มไปด้วยกัน'
      },
      {
        id: 'm1_ar_q10',
        question: 'What conclusion can be drawn if an experiment is described as "reproducible" by independent scientists?',
        options: [
          'The findings are reliable because other scientists obtained the same results using the same methodology.',
          'The experiment failed and cannot be trusted.',
          'The study was done only once.',
          'The scientists copied data illegally.'
        ],
        correctAnswer: 'The findings are reliable because other scientists obtained the same results using the same methodology.',
        explanation: '【มาตรฐานวิทยาศาสตร์สากล Reproducibility】\n"Reproducible (ทำซ้ำแล้วได้ผลตรงกัน)" เป็นเสาหลักของวิทยาศาสตร์ แสดงว่าผลการทดลองนั้นน่าเชื่อถือ ถูกต้อง และได้รับการพิสูจน์ยืนยันจากนักวิทยาศาสตร์ท่านอื่น',
        tip: '💡 reproducible = ทำซ้ำได้ผลเหมือนเดิม น่าเชื่อถือ'
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 🎯 โมดูล 16: Advanced Grammar Error Identification & Sentence Correction
  // -------------------------------------------------------------------------
  m1_adv_error_identification: {
    id: 'm1_adv_error_identification',
    subject: 'english',
    title: 'Advanced Grammar Error Identification & Correction',
    subtitle: 'เทคนิคสแกนข้อสอบ Error 4 สเต็ป ดักจุดลวงข้อสอบคัดเลือกห้อง Gifted/EP และทุนการศึกษา',
    emoji: '🎯',
    secretFormula: {
      name: 'สูตรลับ "4 สเต็ปสแกนดัก Error ข้อสอบ Gifted"',
      concept: 'สแกน: 1. Subject-Verb 2. Tense/Voice 3. Parallelism 4. Word Form',
      steps: [
        '⚡ Step 1 - Subject-Verb Agreement: ประธานเอกพจน์ (รวมทั้งกลุ่ม Every-, Each-, นามนับไม่ได้) กริยาต้องเติม s/es หรือ is/has/was',
        '⚡ Step 2 - Active vs Passive Voice: ประธานเป็นสิ่งของ เช่น The discovery (made ➔ was made) ต้องเป็นรูปถูกกระทำ',
        '⚡ Step 3 - Parallel Structure (โครงสร้างคู่ขนาน): คำที่เชื่อมด้วย and, or, but ต้องมีรูปไวยากรณ์เดียวกัน (เช่น swimming, running, and cycling)',
        '⚡ Step 4 - Word Form & Part of Speech: Adjective ขยาย Noun | Adverb ขยาย Verb/Adjective (สังเกต -ly)'
      ]
    },
    summaryPoints: [
      'Hard (adv. หนัก/ขยัน) vs Hardly (adv. แทบจะไม่)',
      'Look forward to, be used to, object to ➔ ต้องตามด้วย V.ing เสมอ',
      'No sooner... than... / Scarcely... when... (ทันทีที่...ก็...)',
      '🌟 เทคนิคน้องฟอร์จูน: คำว่า "One of the + นามพหูพจน์ + กริยาเอกพจน์ (is/has)" ออกสอบ Error ทุกปี ท่องจำให้ขึ้นใจ!'
    ],
    practiceQuestions: [
      {
        id: 'm1_err_q1',
        question: 'Identify the ERROR:\n"One of the most (A) famous (B) landmarks in Thailand (C) are (D) Wat Phra Kaew."',
        options: ['(C) are', '(A) famous', '(B) landmarks', '(D) Wat Phra Kaew'],
        correctAnswer: '(C) are',
        explanation: '【Error - One of the + Noun Plural】\nประธานแท้ของประโยคคือ "One" (หนึ่งเดียว/เอกพจน์) ของกลุ่มสถานที่สำคัญ กริยาจึงต้องแก้จาก "are" เป็น "is"',
        tip: '💡 One of the + นามพหูพจน์ ➔ กริยาเอกพจน์ (is)'
      },
      {
        id: 'm1_err_q2',
        question: 'Identify the ERROR:\n"The professor was (A) extremely (B) satisfying with (C) the students\' performance on the (D) final exam."',
        options: ['(B) satisfying with', '(A) extremely', '(C) the students\' performance', '(D) final exam'],
        correctAnswer: '(B) satisfying with',
        explanation: '【Error - Adjective -ed vs -ing】\nเมื่อประธานเป็น "คน" รู้สึกพึงพอใจ ต้องใช้รูป -ed คือ "satisfied with" (ส่วน satisfying แปลว่า น่าพึงพอใจ ใช้กับสิ่งของ/เหตุการณ์)',
        tip: '💡 คนรู้สึกพอใจ = satisfied with (-ed)'
      },
      {
        id: 'm1_err_q3',
        question: 'Identify the ERROR:\n"Fortune enjoys (A) reading science fiction, (B) playing basketball, and (C) to conduct (D) chemistry experiments."',
        options: ['(C) to conduct', '(A) reading', '(B) playing', '(D) chemistry experiments'],
        correctAnswer: '(C) to conduct',
        explanation: '【Error - Parallel Structure โครงสร้างคู่ขนาน】\nกริยาในรายการที่เชื่อมด้วย and ต้องเป็นรูป Gerund (V.ing) เหมือนกันทั้งหมด: reading, playing, and ➔ ต้องแก้ "to conduct" เป็น "conducting"',
        tip: '💡 โครงสร้างคู่ขนาน: V.ing, V.ing, and V.ing'
      },
      {
        id: 'm1_err_q4',
        question: 'Identify the ERROR:\n"Although (A) the laboratory was (B) equipped with modern tools, but the researchers (C) could not solve (D) the chemical mystery."',
        options: ['(B) equipped with modern tools, but', '(A) Although', '(C) could not solve', '(D) the chemical mystery'],
        correctAnswer: '(B) equipped with modern tools, but',
        explanation: '【Error - Double Conjunctions】\nในภาษาอังกฤษ ห้ามใช้ "Although" คู่กับ "but" ในประโยคเดียวกัน (เลือกใช้อย่างใดอย่างหนึ่งเท่านั้น) ➔ ต้องตัดคำว่า "but" ออก',
        tip: '💡 มี Although แล้ว ห้ามใส่ but เด็ดขาด'
      },
      {
        id: 'm1_err_q5',
        question: 'Identify the ERROR:\n"The new drug (A) has proven to be (B) high (C) effective in treating (D) respiratory infections."',
        options: ['(B) high', '(A) has proven', '(C) effective in', '(D) respiratory infections'],
        correctAnswer: '(B) high',
        explanation: '【Error - Adjective vs Adverb】\nคำว่า "effective" เป็น Adjective คำที่มาขยาย Adjective ต้องเป็น "Adverb" จึงต้องแก้จาก "high" เป็น "highly" (highly effective = มีประสิทธิภาพอย่างยิ่ง)',
        tip: '💡 ขยาย Adjective ต้องใช้ Adverb (highly effective)'
      },
      {
        id: 'm1_err_q6',
        question: 'Identify the ERROR:\n"Neither the head pharmacist (A) nor his assistants (B) was (C) available to answer questions (D) yesterday."',
        options: ['(B) was', '(A) nor', '(C) available', '(D) yesterday'],
        correctAnswer: '(B) was',
        explanation: '【Error - Neither...nor Agreement】\nเมื่อเชื่อมด้วย neither...nor กริยาจะผันตามประธานตัวหลังคือ "his assistants" (พหูพจน์) ➔ ต้องแก้จาก "was" เป็น "were"',
        tip: '💡 neither...nor ผันตามประธานตัวหลัง (were)'
      },
      {
        id: 'm1_err_q7',
        question: 'Identify the ERROR:\n"The students (A) are looking forward to (B) visit the National Botanical Garden (C) during their (D) school break."',
        options: ['(B) visit', '(A) are looking forward to', '(C) during their', '(D) school break'],
        correctAnswer: '(B) visit',
        explanation: '【Error - Look forward to + V.ing】\nโครงสร้าง "look forward to" ต้องตามด้วย Gerund (V.ing) ➔ ต้องแก้จาก "visit" เป็น "visiting"',
        tip: '💡 look forward to + visiting (V.ing)'
      },
      {
        id: 'm1_err_q8',
        question: 'Identify the ERROR:\n"The telescope (A) who was (B) invented by Galileo (C) revolutionized human understanding of (D) the cosmos."',
        options: ['(A) who was', '(B) invented by', '(C) revolutionized', '(D) the cosmos'],
        correctAnswer: '(A) who was',
        explanation: '【Error - Relative Pronoun Misuse】\n"The telescope" เป็นสิ่งของ (กล้องโทรทรรศน์) ห้ามใช้ who ต้องแก้เป็น "which was" หรือ "that was"',
        tip: '💡 สิ่งของต้องใช้ which หรือ that (ห้ามใช้ who)'
      },
      {
        id: 'm1_err_q9',
        question: 'Identify the ERROR:\n"Fortune (A) works hardly every day (B) because he (C) wants to become (D) a leading pharmacist."',
        options: ['(A) works hardly', '(B) because he', '(C) wants to become', '(D) a leading pharmacist'],
        correctAnswer: '(A) works hardly',
        explanation: '【Error - Hard vs Hardly】\nคำว่า "hardly" แปลว่า "แทบจะไม่" แต่บริบทต้องการสื่อว่า ทำงาน/เรียนอย่างหนัก (ขยันขันแข็ง) ต้องใช้คำว่า "works hard" (hard เป็น adverb แปลว่า อย่างหนัก)',
        tip: '💡 ทำงานหนัก = work hard (hardly แปลว่า แทบจะไม่)'
      },
      {
        id: 'm1_err_q10',
        question: 'Identify the ERROR:\n"Despite (A) of the severe storm, (B) the rescue helicopter (C) managed to reach (D) the stranded climbers."',
        options: ['(A) of the severe storm', '(B) the rescue helicopter', '(C) managed to reach', '(D) the stranded climbers'],
        correctAnswer: '(A) of the severe storm',
        explanation: '【Error - Despite vs In spite of】\nคำว่า "Despite" ห้ามมี of ตามหลัง (ใช้ "Despite the storm" หรือ "In spite of the storm") ➔ ต้องตัดคำว่า "of" ทิ้ง',
        tip: '💡 Despite ไม่มี of | In spite of มี of'
      }
    ]
  }
}
