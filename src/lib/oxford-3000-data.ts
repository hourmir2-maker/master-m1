export interface VocabItem {
  id: string
  word: string
  pos: 'n.' | 'v.' | 'adj.' | 'adv.' | 'prep.' | 'conj.' | 'phr.'
  phonetic: string
  thaiPhonetic: string
  meaning: string
  category: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  example: string
  exampleTh: string
}

export const VOCAB_CATEGORIES = [
  { id: 'all', label: 'ทั้งหมด (All Words)', icon: '📚' },
  { id: 'daily', label: 'ชีวิตประจำวัน & ในบ้าน (Daily & Home)', icon: '🏠' },
  { id: 'school', label: 'การศึกษา & วิชาการ (Education & Academics)', icon: '🏫' },
  { id: 'feelings', label: 'อารมณ์ & บุคลิกภาพ (Emotions & Psychology)', icon: '😊' },
  { id: 'food_health', label: 'อาหาร สุขภาพ & การแพทย์ (Food & Medicine)', icon: '🥗' },
  { id: 'travel', label: 'การเดินทาง & คมนาคม (Travel & Logistics)', icon: '✈️' },
  { id: 'shopping', label: 'การเงิน ธุรกิจ & การค้า (Finance & Commerce)', icon: '💳' },
  { id: 'work', label: 'การทำงาน & ภาวะผู้นำ (Career & Leadership)', icon: '💼' },
  { id: 'nature', label: 'ธรรมชาติ & นิเวศวิทยา (Ecology & Nature)', icon: '🌿' },
  { id: 'tech', label: 'เทคโนโลยี AI & ดิจิทัล (Tech, AI & Science)', icon: '💻' },
  { id: 'communication', label: 'การสื่อสาร & สังคม (Communication & Society)', icon: '🗣️' },
  { id: 'phrasal', label: 'กริยาวลี & สำนวนชีวิตจริง (Phrasal Verbs & Idioms)', icon: '⚡' }
] as const

export const OXFORD_VOCAB_BANK: VocabItem[] = [
  // ==========================================
  // 🏠 1. DAILY & HOME (ชีวิตประจำวัน & ในบ้าน)
  // ==========================================
  {
    id: 'v_1',
    word: 'routine',
    pos: 'n.',
    phonetic: '/ruːˈtiːn/',
    thaiPhonetic: 'รู-ทีน',
    meaning: 'กิจวัตรประจำวัน, สิ่งที่ทำเป็นประจำ',
    category: 'daily',
    level: 'A2',
    example: 'My morning routine includes jogging and reading news.',
    exampleTh: 'กิจวัตรยามเช้าของฉันรวมถึงการวิ่งจ็อกกิ้งและการอ่านข่าว'
  },
  {
    id: 'v_2',
    word: 'chores',
    pos: 'n.',
    phonetic: '/tʃɔːrz/',
    thaiPhonetic: 'ชอร์ซ',
    meaning: 'งานบ้านจุกจิก',
    category: 'daily',
    level: 'A2',
    example: 'We share household chores like washing dishes and vacuuming.',
    exampleTh: 'พวกเราแบ่งงานบ้านกันทำ เช่น ล้างจานและดูดฝุ่น'
  },
  {
    id: 'v_3',
    word: 'appliance',
    pos: 'n.',
    phonetic: '/əˈplaɪ.əns/',
    thaiPhonetic: 'เออะ-พลาย-เอินซ',
    meaning: 'เครื่องใช้ไฟฟ้าภายในบ้าน',
    category: 'daily',
    level: 'B1',
    example: 'Modern electrical appliances save us a tremendous amount of time.',
    exampleTh: 'เครื่องใช้ไฟฟ้าที่ทันสมัยช่วยประหยัดเวลาให้เราได้อย่างมหาศาล'
  },
  {
    id: 'v_4',
    word: 'neat',
    pos: 'adj.',
    phonetic: '/niːt/',
    thaiPhonetic: 'นีท',
    meaning: 'เรียบร้อย, เป็นระเบียบ',
    category: 'daily',
    level: 'A2',
    example: 'Please keep your study desk neat and tidy.',
    exampleTh: 'กรุณารักษาโต๊ะหนังสือของคุณให้เป็นระเบียบเรียบร้อย'
  },
  {
    id: 'v_5',
    word: 'arrange',
    pos: 'v.',
    phonetic: '/əˈreɪndʒ/',
    thaiPhonetic: 'เออะ-เรนจ',
    meaning: 'จัดระเบียบ, จัดการ, นัดหมาย',
    category: 'daily',
    level: 'A2',
    example: 'She arranged the books on the shelf by color and subject.',
    exampleTh: 'เธอจัดหนังสือบนชั้นวางตามสีและหมวดหมู่วิชา'
  },
  {
    id: 'v_6',
    word: 'neighbor',
    pos: 'n.',
    phonetic: '/ˈneɪ.bər/',
    thaiPhonetic: 'เน-เบอร์',
    meaning: 'เพื่อนบ้าน',
    category: 'daily',
    level: 'A1',
    example: 'Our neighbors are extremely hospitable and helpful.',
    exampleTh: 'เพื่อนบ้านของเรามีอัธยาศัยดีและชอบช่วยเหลือมาก'
  },
  {
    id: 'v_7',
    word: 'residence',
    pos: 'n.',
    phonetic: '/ˈrez.ɪ.dəns/',
    thaiPhonetic: 'เรส-ซิ-เดินซ',
    meaning: 'ที่พักอาศัย, คฤหาสน์, ถิ่นที่อยู่',
    category: 'daily',
    level: 'B2',
    example: 'The Prime Minister took up residence at the official estate.',
    exampleTh: 'นายกรัฐมนตรีได้ย้ายเข้าพำนักที่บ้านพักรับรองประจำตำแหน่ง'
  },
  {
    id: 'v_8',
    word: 'spacious',
    pos: 'adj.',
    phonetic: '/ˈspeɪ.ʃəs/',
    thaiPhonetic: 'สเปย์-เชิส',
    meaning: 'กว้างขวาง, มีพื้นที่โอ่โถง',
    category: 'daily',
    level: 'B1',
    example: 'The new apartment has a spacious living room with lots of sunlight.',
    exampleTh: 'อพาร์ตเมนต์ใหม่มีห้องนั่งเล่นที่กว้างขวางและได้รับแสงแดดเต็มที่'
  },
  {
    id: 'v_9',
    word: 'domestic',
    pos: 'adj.',
    phonetic: '/dəˈmes.tɪk/',
    thaiPhonetic: 'เดอะ-เมส-ทิค',
    meaning: 'ภายในบ้าน, ภายในประเทศ',
    category: 'daily',
    level: 'B2',
    example: 'Domestic life requires balancing work and family responsibilities.',
    exampleTh: 'ชีวิตครอบครัวจำเป็นต้องรักษาสมดุลระหว่างงานและความรับผิดชอบต่อครอบครัว'
  },

  // ==========================================
  // 🏫 2. EDUCATION & ACADEMICS (การศึกษา & วิชาการ)
  // ==========================================
  {
    id: 'v_10',
    word: 'assignment',
    pos: 'n.',
    phonetic: '/əˈsaɪn.mənt/',
    thaiPhonetic: 'เออะ-ไซน-เมินท',
    meaning: 'งานที่ได้รับมอบหมาย, การบ้าน',
    category: 'school',
    level: 'A2',
    example: 'The science assignment is due next Monday morning.',
    exampleTh: 'งานวิชาวิทยาศาสตร์มีกำหนดส่งเช้าวันจันทร์หน้า'
  },
  {
    id: 'v_11',
    word: 'participate',
    pos: 'v.',
    phonetic: '/pɑːˈtɪs.ɪ.peɪt/',
    thaiPhonetic: 'พาร์-ทิส-ซิ-เพท',
    meaning: 'มีส่วนร่วม, เข้าร่วม',
    category: 'school',
    level: 'B1',
    example: 'Students are actively encouraged to participate in discussions.',
    exampleTh: 'นักเรียนได้รับการสนับสนุนอย่างเต็มที่ให้มีส่วนร่วมในการอภิปราย'
  },
  {
    id: 'v_12',
    word: 'curriculum',
    pos: 'n.',
    phonetic: '/kəˈrɪk.jə.ləm/',
    thaiPhonetic: 'เคอะ-ริค-คิว-เลิม',
    meaning: 'หลักสูตรการเรียนการสอน',
    category: 'school',
    level: 'B1',
    example: 'The national curriculum is updated to meet modern world standards.',
    exampleTh: 'หลักสูตรแห่งชาติได้รับการปรับปรุงให้ตรงกับมาตรฐานโลกยุคใหม่'
  },
  {
    id: 'v_13',
    word: 'concentrate',
    pos: 'v.',
    phonetic: '/ˈkɒn.sən.treɪt/',
    thaiPhonetic: 'คอน-เซิน-เทรท',
    meaning: 'มีสมาธิจดจ่อ, ตั้งใจแน่วแน่',
    category: 'school',
    level: 'B1',
    example: 'Listening to classical music helps me concentrate on my studies.',
    exampleTh: 'การฟังเพลงคลาสสิกช่วยให้ฉันมีสมาธิจดจ่อกับการเรียน'
  },
  {
    id: 'v_14',
    word: 'evaluate',
    pos: 'v.',
    phonetic: '/ɪˈvæl.ju.eɪt/',
    thaiPhonetic: 'อิ-แวล-ยู-เอท',
    meaning: 'ประเมินผล, ตรวจสอบคุณค่า',
    category: 'school',
    level: 'B2',
    example: 'The professors will evaluate the research project carefully.',
    exampleTh: 'บรรดาศาสตราจารย์จะประเมินผลโครงงานวิจัยอย่างละเอียดถี่ถ้วน'
  },
  {
    id: 'v_15',
    word: 'comprehend',
    pos: 'v.',
    phonetic: '/ˌkɒm.prɪˈhend/',
    thaiPhonetic: 'คอม-พริ-เฮนด์',
    meaning: 'เข้าใจอย่างถ่องแท้, ซาบซึ้ง',
    category: 'school',
    level: 'B2',
    example: 'It took several readings to fully comprehend the philosophical text.',
    exampleTh: 'ต้องอ่านอยู่หลายรอบกว่าจะเข้าใจเนื้อหาทางปรัชญานี้ได้อย่างลึกซึ้ง'
  },
  {
    id: 'v_16',
    word: 'hypothesis',
    pos: 'n.',
    phonetic: '/haɪˈpɒθ.ə.sɪs/',
    thaiPhonetic: 'ไฮ-พอท-เธอะ-ซิส',
    meaning: 'สมมติฐานทางวิทยาศาสตร์',
    category: 'school',
    level: 'B2',
    example: 'Our experiment aims to test the validity of this scientific hypothesis.',
    exampleTh: 'การทดลองของเรามีเป้าหมายเพื่อทดสอบความถูกต้องของสมมติฐานทางวิทยาศาสตร์นี้'
  },
  {
    id: 'v_17',
    word: 'sophisticated',
    pos: 'adj.',
    phonetic: '/səˈfɪs.tɪ.keɪ.tɪd/',
    thaiPhonetic: 'เซอะ-ฟิส-ทิ-เค-ทิด',
    meaning: 'ซับซ้อนแยบคาย, มีความรู้ลึกซึ้ง, ปราณีต',
    category: 'school',
    level: 'C1',
    example: 'She presented a sophisticated argument supporting quantum theory.',
    exampleTh: 'เธอนำเสนอข้อโต้แย้งที่แยบคายและซับซ้อนเพื่อสนับสนุนทฤษฎีควอนตัม'
  },
  {
    id: 'v_18',
    word: 'perseverance',
    pos: 'n.',
    phonetic: '/ˌpɜː.sɪˈvɪə.rəns/',
    thaiPhonetic: 'เพอร์-ซิ-เวีย-เรินซ',
    meaning: 'ความพากเพียรไม่ย่อท้อ',
    category: 'school',
    level: 'C1',
    example: 'Through hard work and perseverance, she earned a full scholarship.',
    exampleTh: 'ด้วยการทำงานหนักและความเพียรพยายามไม่ย่อท้อ เธอจึงได้รับทุนการศึกษาเต็มจำนวน'
  },

  // ==========================================
  // 😊 3. EMOTIONS & PSYCHOLOGY (อารมณ์ & จิตวิทยา)
  // ==========================================
  {
    id: 'v_19',
    word: 'anxious',
    pos: 'adj.',
    phonetic: '/ˈæŋk.ʃəs/',
    thaiPhonetic: 'แองค-เชิส',
    meaning: 'วิตกกังวล, กระวนกระวาย',
    category: 'feelings',
    level: 'B1',
    example: 'He felt anxious before stepping onto the stage.',
    exampleTh: 'เขารู้สึกวิตกกังวลก่อนที่จะก้าวขึ้นสู่เวที'
  },
  {
    id: 'v_20',
    word: 'confident',
    pos: 'adj.',
    phonetic: '/ˈkɒn.fɪ.dənt/',
    thaiPhonetic: 'คอน-ฟิ-เดินท',
    meaning: 'มั่นใจ, เปี่ยมความเชื่อมั่น',
    category: 'feelings',
    level: 'A2',
    example: 'Preparation makes students feel confident in exams.',
    exampleTh: 'การเตรียมตัวที่ดีทำให้นักเรียนรู้สึกมั่นใจในการสอบ'
  },
  {
    id: 'v_21',
    word: 'generous',
    pos: 'adj.',
    phonetic: '/ˈdʒen.ər.əs/',
    thaiPhonetic: 'เจน-เนอะ-เรัส',
    meaning: 'ใจกว้าง, เอื้อเฟื้อเผื่อแผ่',
    category: 'feelings',
    level: 'B1',
    example: 'He made a generous donation to the children\'s hospital.',
    exampleTh: 'เขาได้บริจาคเงินก้อนโตอย่างใจกว้างให้แก่โรงพยาบาลเด็ก'
  },
  {
    id: 'v_22',
    word: 'stubborn',
    pos: 'adj.',
    phonetic: '/ˈstʌb.ən/',
    thaiPhonetic: 'สลับ-เบิร์น',
    meaning: 'ดื้อรั้น, ไม่ยอมคน',
    category: 'feelings',
    level: 'B1',
    example: 'He was too stubborn to ask for directions when lost.',
    exampleTh: 'เขาดื้อเกินกว่าจะยอมถามทางตอนที่หลงทาง'
  },
  {
    id: 'v_23',
    word: 'empathy',
    pos: 'n.',
    phonetic: '/ˈem.pə.θi/',
    thaiPhonetic: 'เอ็ม-เพอะ-ธี',
    meaning: 'ความเข้าอกเข้าใจผู้อื่นอย่างลึกซึ้ง',
    category: 'feelings',
    level: 'B2',
    example: 'Great leaders listen with genuine empathy and compassion.',
    exampleTh: 'ผู้นำที่ยิ่งใหญ่จะรับฟังด้วยความเข้าอกเข้าใจและเมตตากรุณาอย่างแท้จริง'
  },
  {
    id: 'v_24',
    word: 'resilient',
    pos: 'adj.',
    phonetic: '/rɪˈzɪl.jənt/',
    thaiPhonetic: 'ริ-ซิล-เยินท',
    meaning: 'ยืดหยุ่น, ล้มแล้วลุกเร็ว, ฟื้นตัวไว',
    category: 'feelings',
    level: 'B2',
    example: 'Resilient people adapt quickly to unexpected life challenges.',
    exampleTh: 'คนที่มีความยืดหยุ่นทางใจจะปรับตัวต่ออุปสรรคที่ไม่คาดฝันได้อย่างรวดเร็ว'
  },
  {
    id: 'v_25',
    word: 'enthusiastic',
    pos: 'adj.',
    phonetic: '/ɪnˌθjuː.ziˈæs.tɪk/',
    thaiPhonetic: 'อิน-ทิว-ซิ-แอส-ทิค',
    meaning: 'กระตือรือร้น, มีใจจดจ่อเต็มเปี่ยม',
    category: 'feelings',
    level: 'B1',
    example: 'The children were enthusiastic about the upcoming science fair.',
    exampleTh: 'เด็กๆ รู้สึกกระตือรือร้นตื่นเต้นกับงานสัปดาห์วิทยาศาสตร์ที่กำลังจะมาถึง'
  },

  // ==========================================
  // 🥗 4. FOOD, HEALTH & MEDICINE (อาหาร สุขภาพ & การแพทย์)
  // ==========================================
  {
    id: 'v_26',
    word: 'nutrition',
    pos: 'n.',
    phonetic: '/njuːˈtrɪʃ.ən/',
    thaiPhonetic: 'นิว-ทริช-เชิน',
    meaning: 'โภชนาการ, คุณค่าทางอาหาร',
    category: 'food_health',
    level: 'B1',
    example: 'Proper nutrition strengthens the immune system naturally.',
    exampleTh: 'โภชนาการที่เหมาะสมช่วยเสริมสร้างระบบภูมิคุ้มกันตามธรรมชาติ'
  },
  {
    id: 'v_27',
    word: 'ingredient',
    pos: 'n.',
    phonetic: '/ɪnˈɡriː.di.ənt/',
    thaiPhonetic: 'อิน-กรี-เดียนท',
    meaning: 'ส่วนผสม, วัตถุดิบ',
    category: 'food_health',
    level: 'A2',
    example: 'Fresh organic herbs are the secret ingredients of this dish.',
    exampleTh: 'สมุนไพรออร์แกนิกสดเป็นวัตถุดิบลับของอาหารจานนี้'
  },
  {
    id: 'v_28',
    word: 'symptom',
    pos: 'n.',
    phonetic: '/ˈsɪmp.təm/',
    thaiPhonetic: 'ซิมพ-เทิม',
    meaning: 'อาการของโรค',
    category: 'food_health',
    level: 'B1',
    example: 'Fever, cough, and fatigue are symptoms of respiratory infection.',
    exampleTh: 'ไข้ ไอ และความอ่อนเพลียเป็นอาการของการติดเชื้อในระบบทางเดินหายใจ'
  },
  {
    id: 'v_29',
    word: 'prescribe',
    pos: 'v.',
    phonetic: '/prɪˈskraɪb/',
    thaiPhonetic: 'พริ-สไครบ',
    meaning: 'สั่งยา, สั่งการรักษา',
    category: 'food_health',
    level: 'B2',
    example: 'The doctor prescribed antibiotics to cure the throat infection.',
    exampleTh: 'แพทย์สั่งจ่ายยาปฏิชีวนะเพื่อรักษาการติดเชื้อที่ลำคอ'
  },
  {
    id: 'v_30',
    word: 'hygiene',
    pos: 'n.',
    phonetic: '/ˈhaɪ.dʒiːn/',
    thaiPhonetic: 'ไฮ-ยีน',
    meaning: 'สุขอนามัย, ความสะอาดปลอดภัย',
    category: 'food_health',
    level: 'B1',
    example: 'Washing hands regularly is fundamental to good personal hygiene.',
    exampleTh: 'การล้างมือเป็นประจำคือหัวใจสำคัญของสุขอนามัยส่วนบุคคลที่ดี'
  },
  {
    id: 'v_31',
    word: 'chronic',
    pos: 'adj.',
    phonetic: '/ˈkrɒn.ɪk/',
    thaiPhonetic: 'ครอน-นิค',
    meaning: 'เรื้อรัง, เป็นมาเนิ่นนาน (ตรงข้ามกับ acute ฉับพลัน)',
    category: 'food_health',
    level: 'C1',
    example: 'Regular exercise can prevent chronic diseases like hypertension.',
    exampleTh: 'การออกกำลังกายสม่ำเสมอสามารถป้องกันโรคเรื้อรัง เช่น โรคความดันโลหิตสูงได้'
  },

  // ==========================================
  // ✈️ 5. TRAVEL & LOGISTICS (การเดินทาง & คมนาคม)
  // ==========================================
  {
    id: 'v_32',
    word: 'destination',
    pos: 'n.',
    phonetic: '/ˌdes.tɪˈneɪ.ʃən/',
    thaiPhonetic: 'เดส-ทิ-เน-เชิน',
    meaning: 'จุดหมายปลายทาง',
    category: 'travel',
    level: 'B1',
    example: 'Paris is one of the world\'s most visited tourist destinations.',
    exampleTh: 'ปารีสเป็นหนึ่งในจุดหมายปลายทางของนักท่องเที่ยวที่มีผู้มาเยือนมากที่สุดในโลก'
  },
  {
    id: 'v_33',
    word: 'itinerary',
    pos: 'n.',
    phonetic: '/aɪˈtɪn.ər.ər.i/',
    thaiPhonetic: 'ไอ-ทิน-เนอะ-เรอะ-รี',
    meaning: 'กำหนดการเดินทาง, แผนการท่องเที่ยว',
    category: 'travel',
    level: 'B2',
    example: 'Our travel itinerary includes visits to ancient historical temples.',
    exampleTh: 'กำหนดการเดินทางของเราประกอบด้วยการเยี่ยมชมวัดโบราณทางประวัติศาสตร์'
  },
  {
    id: 'v_34',
    word: 'pedestrian',
    pos: 'n.',
    phonetic: '/pəˈdes.tri.ən/',
    thaiPhonetic: 'เพอะ-เดส-เทรียน',
    meaning: 'คนเดินเท้า',
    category: 'travel',
    level: 'B1',
    example: 'Pedestrian zones in downtown make shopping safe and pleasant.',
    exampleTh: 'เขตทางเดินเท้าในย่านใจกลางเมืองทำให้การเดินซื้อของปลอดภัยและเพลิดเพลิน'
  },
  {
    id: 'v_35',
    word: 'congestion',
    pos: 'n.',
    phonetic: '/kənˈdʒes.tʃən/',
    thaiPhonetic: 'เคิน-เจส-เชิน',
    meaning: 'ความแออัด, การจราจรติดขัด',
    category: 'travel',
    level: 'B2',
    example: 'Traffic congestion is heavy during morning rush hours.',
    exampleTh: 'การจราจรติดขัดหนาแน่นมากในช่วงชั่วโมงเร่งด่วนตอนเช้า'
  },
  {
    id: 'v_36',
    word: 'accommodation',
    pos: 'n.',
    phonetic: '/əˌkɒm.əˈdeɪ.ʃən/',
    thaiPhonetic: 'เออะ-คอม-เมอะ-เด-เชิน',
    meaning: 'ที่พักแรม, โรงแรมที่พัก',
    category: 'travel',
    level: 'B1',
    example: 'We booked luxury hotel accommodation near the beach.',
    exampleTh: 'พวกเราได้จองที่พักโรงแรมหรูริมชายหาด'
  },

  // ==========================================
  // 💳 6. FINANCE & COMMERCE (การเงิน & การค้า)
  // ==========================================
  {
    id: 'v_37',
    word: 'affordable',
    pos: 'adj.',
    phonetic: '/əˈfɔː.də.bəl/',
    thaiPhonetic: 'เออะ-ฟอร์-เดอะ-เบิล',
    meaning: 'ราคาย่อมเยา, ซื้อหาได้',
    category: 'shopping',
    level: 'B1',
    example: 'Quality education should be affordable for all families.',
    exampleTh: 'การศึกษาที่มีคุณภาพควรมีราคาที่ทุกครอบครัวสามารถจ่ายได้'
  },
  {
    id: 'v_38',
    word: 'investment',
    pos: 'n.',
    phonetic: '/ɪnˈvest.mənt/',
    thaiPhonetic: 'อิน-เวสต์-เมินท',
    meaning: 'การลงทุน, ทรัพย์สินที่ลงทุน',
    category: 'shopping',
    level: 'B1',
    example: 'Reading books is the greatest investment in your own future.',
    exampleTh: 'การอ่านหนังสือคือการลงทุนที่ยิ่งใหญ่ที่สุดสำหรับอนาคตของตนเอง'
  },
  {
    id: 'v_39',
    word: 'inflation',
    pos: 'n.',
    phonetic: '/ɪnˈfleɪ.ʃən/',
    thaiPhonetic: 'อิน-เฟล-เชิน',
    meaning: 'ภาวะเงินเฟ้อ, การเพิ่มขึ้นของระดับราคา',
    category: 'shopping',
    level: 'B2',
    example: 'Rising inflation reduces the purchasing power of consumers.',
    exampleTh: 'ภาวะเงินเฟ้อที่สูงขึ้นทำให้กำลังซื้อของผู้บริโภคลดลง'
  },
  {
    id: 'v_40',
    word: 'lucrative',
    pos: 'adj.',
    phonetic: '/ˈluː.krə.tɪv/',
    thaiPhonetic: 'ลู-คระ-ทิฟ',
    meaning: 'ทำกำไรได้อย่างงาม, ได้ผลตอบแทนสูง',
    category: 'shopping',
    level: 'C1',
    example: 'Software engineering is currently one of the most lucrative careers.',
    exampleTh: 'วิศวกรรมซอฟต์แวร์เป็นหนึ่งในสายอาชีพที่ทำรายได้อย่างงามที่สุดในปัจจุบัน'
  },
  {
    id: 'v_41',
    word: 'transaction',
    pos: 'n.',
    phonetic: '/trænˈzæk.ʃən/',
    thaiPhonetic: 'แตรน-แซค-เชิน',
    meaning: 'ธุรกรรมทางการเงิน, การซื้อขาย',
    category: 'shopping',
    level: 'B2',
    example: 'Mobile banking allows users to complete secure transactions instantly.',
    exampleTh: 'โมบายแบงก์กิ้งช่วยให้ผู้ใช้งานทำธุรกรรมที่ปลอดภัยได้ในทันที'
  },

  // ==========================================
  // 💼 7. CAREER & LEADERSHIP (อาชีพ & ภาวะผู้นำ)
  // ==========================================
  {
    id: 'v_42',
    word: 'colleague',
    pos: 'n.',
    phonetic: '/ˈkɒl.iːɡ/',
    thaiPhonetic: 'คอล-ลีค',
    meaning: 'เพื่อนร่วมงาน',
    category: 'work',
    level: 'B1',
    example: 'Collaboration among colleagues produces the best creative results.',
    exampleTh: 'การร่วมมือกันในหมู่เพื่อนร่วมงานทำให้เกิดผลงานสร้างสรรค์ที่ดีที่สุด'
  },
  {
    id: 'v_43',
    word: 'initiative',
    pos: 'n.',
    phonetic: '/ɪˈnɪʃ.ə.tɪv/',
    thaiPhonetic: 'อิ-นิช-เชอะ-ทิฟ',
    meaning: 'ความคิดริเริ่ม, ความเป็นฝ่ายเริ่มลงมือทำก่อน',
    category: 'work',
    level: 'B2',
    example: 'He took the initiative to design a new automated filing system.',
    exampleTh: 'เขาเป็นฝ่ายริเริ่มออกแบบระบบจัดเก็บเอกสารอัตโนมัติขึ้นมาใหม่'
  },
  {
    id: 'v_44',
    word: 'delegate',
    pos: 'v.',
    phonetic: '/ˈdel.ɪ.ɡeɪt/',
    thaiPhonetic: 'เดล-ลิ-เกท',
    meaning: 'มอบหมายงาน, กระจายอำนาจหน้าที่',
    category: 'work',
    level: 'B2',
    example: 'An effective manager knows how to delegate tasks efficiently.',
    exampleTh: 'ผู้จัดการที่มีประสิทธิภาพย่อมรู้วิธีมอบหมายงานได้อย่างมีประสิทธิผล'
  },
  {
    id: 'v_45',
    word: 'integrity',
    pos: 'n.',
    phonetic: '/ɪnˈteɡ.rə.ti/',
    thaiPhonetic: 'อิน-เทก-เกรอะ-ที',
    meaning: 'ความซื่อสัตย์สุจริต, ความยึดมั่นในคุณธรรม',
    category: 'work',
    level: 'C1',
    example: 'Professional integrity is the cornerstone of trust in any business.',
    exampleTh: 'ความซื่อสัตย์ในวิชาชีพคือศิลาฤกษ์แห่งความไว้วางใจในทุกธุรกิจ'
  },
  {
    id: 'v_46',
    word: 'productive',
    pos: 'adj.',
    phonetic: '/prəˈdʌk.tɪv/',
    thaiPhonetic: 'เพรอะ-ดัค-ทิฟ',
    meaning: 'สร้างผลงานได้มาก, มีประสิทธิภาพสูง',
    category: 'work',
    level: 'B1',
    example: 'We had a very productive meeting and resolved all pending issues.',
    exampleTh: 'พวกเรามีการประชุมที่เกิดประสิทธิผลสูงและคลี่คลายปัญหาคั่งค้างได้ทั้งหมด'
  },

  // ==========================================
  // 🌿 8. ECOLOGY & NATURE (นิเวศวิทยา & ธรรมชาติ)
  // ==========================================
  {
    id: 'v_47',
    word: 'ecosystem',
    pos: 'n.',
    phonetic: '/ˈiː.kəʊˌsɪs.təm/',
    thaiPhonetic: 'อี-โค-ซิส-เทิม',
    meaning: 'ระบบนิเวศ',
    category: 'nature',
    level: 'B1',
    example: 'Coral reefs are vital ecosystems supporting thousands of marine species.',
    exampleTh: 'แนวปะการังเป็นระบบนิเวศสำคัญยิ่งที่หล่อเลี้ยงสิ่งมีชีวิตใต้ทะเลนับพันชนิด'
  },
  {
    id: 'v_48',
    word: 'biodiversity',
    pos: 'n.',
    phonetic: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/',
    thaiPhonetic: 'ไบ-โอ-ได-เวอร์-เซอะ-ที',
    meaning: 'ความหลากหลายทางชีวภาพ',
    category: 'nature',
    level: 'B2',
    example: 'Tropical rainforests boast the richest biodiversity on Earth.',
    exampleTh: 'ป่าฝนเขตร้อนมีความหลากหลายทางชีวภาพที่อุดมสมบูรณ์ที่สุดบนโลก'
  },
  {
    id: 'v_49',
    word: 'renewable',
    pos: 'adj.',
    phonetic: '/rɪˈnjuː.ə.bəl/',
    thaiPhonetic: 'ริ-นิว-เออะ-เบิล',
    meaning: 'พลังงานหมุนเวียน, นำกลับมาใช้ใหม่ได้',
    category: 'nature',
    level: 'B1',
    example: 'Solar and wind power are sustainable forms of renewable energy.',
    exampleTh: 'พลังงานแสงอาทิตย์และพลังงานลมเป็นรูปแบบพลังงานหมุนเวียนที่ยั่งยืน'
  },
  {
    id: 'v_50',
    word: 'endangered',
    pos: 'adj.',
    phonetic: '/ɪnˈdeɪn.dʒəd/',
    thaiPhonetic: 'อิน-เดน-เจอร์ด',
    meaning: 'ตกอยู่ในภาวะใกล้สูญพันธุ์',
    category: 'nature',
    level: 'B1',
    example: 'Giant pandas were once critically endangered animals.',
    exampleTh: 'แพนด้ายักษ์เคยเป็นสัตว์ที่ตกอยู่ในภาวะวิกฤตใกล้สูญพันธุ์'
  },
  {
    id: 'v_51',
    word: 'sustainability',
    pos: 'n.',
    phonetic: '/səˌsteɪ.nəˈbɪl.ə.ti/',
    thaiPhonetic: 'เซอะ-สเต-เนอะ-บิล-เลอะ-ที',
    meaning: 'ความยั่งยืน, การอนุรักษ์ระยะยาว',
    category: 'nature',
    level: 'B2',
    example: 'Environmental sustainability requires collective global effort.',
    exampleTh: 'ความยั่งยืนทางสิ่งแวดล้อมจำเป็นต้องอาศัยความร่วมมือร่วมใจจากทั่วโลก'
  },

  // ==========================================
  // 💻 9. TECH, AI & DIGITAL (เทคโนโลยี AI & ดิจิทัล)
  // ==========================================
  {
    id: 'v_52',
    word: 'algorithm',
    pos: 'n.',
    phonetic: '/ˈæl.ɡə.rɪ.ðəm/',
    thaiPhonetic: 'แอล-เกอะ-ริ-เธิม',
    meaning: 'ขั้นตอนวิธี, อัลกอริทึมการคำนวณ',
    category: 'tech',
    level: 'B2',
    example: 'Search engines use complex algorithms to rank web pages.',
    exampleTh: 'เครื่องมือค้นหาใช้อัลกอริทึมที่ซับซ้อนในการจัดอันดับหน้าเว็บ'
  },
  {
    id: 'v_53',
    word: 'artificial',
    pos: 'adj.',
    phonetic: '/ˌɑː.tɪˈfɪʃ.əl/',
    thaiPhonetic: 'อาร์-ทิ-ฟิช-เชิล',
    meaning: 'ประดิษฐ์ขึ้น, เทียม (Artificial Intelligence = AI)',
    category: 'tech',
    level: 'B1',
    example: 'Artificial intelligence empowers students with personalized tutoring.',
    exampleTh: 'ปัญญาประดิษฐ์ช่วยเสริมศักยภาพนักเรียนด้วยการติวแบบเฉพาะบุคคล'
  },
  {
    id: 'v_54',
    word: 'cybersecurity',
    pos: 'n.',
    phonetic: '/ˈsaɪ.bə.sɪˌkjʊə.rə.ti/',
    thaiPhonetic: 'ไซ-เบอร์-ซิ-เคียว-เรอะ-ที',
    meaning: 'ความปลอดภัยทางไซเบอร์',
    category: 'tech',
    level: 'B2',
    example: 'Strong passwords are the first line of defense in cybersecurity.',
    exampleTh: 'รหัสผ่านที่รัดกุมคือแนวป้องกันด่านแรกในระบบความปลอดภัยทางไซเบอร์'
  },
  {
    id: 'v_55',
    word: 'innovation',
    pos: 'n.',
    phonetic: '/ˌɪn.əˈveɪ.ʃən/',
    thaiPhonetic: 'อิน-เนอะ-เว-เชิน',
    meaning: 'นวัตกรรม, สิ่งประดิษฐ์แปลกใหม่',
    category: 'tech',
    level: 'B2',
    example: 'Technological innovation drives rapid economic growth worldwide.',
    exampleTh: 'นวัตกรรมทางเทคโนโลยีช่วยขับเคลื่อนการเติบโตทางเศรษฐกิจอย่างรวดเร็วทั่วโลก'
  },
  {
    id: 'v_56',
    word: 'breakthrough',
    pos: 'n.',
    phonetic: '/ˈbreɪk.θruː/',
    thaiPhonetic: 'เบรค-ธรู',
    meaning: 'การค้นพบครั้งยิ่งใหญ่, ความก้าวหน้าครั้งสำคัญ',
    category: 'tech',
    level: 'C1',
    example: 'Scientists made a major breakthrough in cancer research.',
    exampleTh: 'คณะนักวิทยาศาสตร์ได้สร้างการค้นพบครั้งยิ่งใหญ่ในงานวิจัยโรคมะเร็ง'
  },

  // ==========================================
  // 🗣️ 10. COMMUNICATION & SOCIETY (การสื่อสาร & สังคม)
  // ==========================================
  {
    id: 'v_57',
    word: 'persuade',
    pos: 'v.',
    phonetic: '/pəˈsweɪd/',
    thaiPhonetic: 'เพอะ-สเวด',
    meaning: 'โน้มน้าวใจ, ชักจูง',
    category: 'communication',
    level: 'B1',
    example: 'She managed to persuade her parents to let her study abroad.',
    exampleTh: 'เธอสามารถโน้มน้าวใจพ่อแม่ให้ยินยอมให้เธอไปเรียนต่อต่างประเทศได้'
  },
  {
    id: 'v_58',
    word: 'negotiate',
    pos: 'v.',
    phonetic: '/nəˈɡəʊ.ʃi.eɪt/',
    thaiPhonetic: 'เนอะ-โก-ชิ-เอท',
    meaning: 'เจรจาต่อรอง, หาข้อตกลงร่วม',
    category: 'communication',
    level: 'B2',
    example: 'Diplomats met to negotiate a peaceful resolution to the conflict.',
    exampleTh: 'เหล่านักการทูตได้พบปะกันเพื่อเจรจาต่อรองหาทางออกอย่างสันติสำหรับข้อขัดแย้ง'
  },
  {
    id: 'v_59',
    word: 'eloquent',
    pos: 'adj.',
    phonetic: '/ˈel.ə.kwənt/',
    thaiPhonetic: 'เอล-เลอะ-เควินท',
    meaning: 'พูดจาคมคาย, สละสลวยกินใจ',
    category: 'communication',
    level: 'C1',
    example: 'His eloquent speech inspired millions of listeners around the world.',
    exampleTh: 'สุนทรพจน์อันคมคายและสละสลวยของเขาได้สร้างแรงบันดาลใจให้แก่ผู้ฟังนับล้านคนทั่วโลก'
  },
  {
    id: 'v_60',
    word: 'controversy',
    pos: 'n.',
    phonetic: '/ˈkɒn.trə.vɜː.si/',
    thaiPhonetic: 'คอน-เทรอ-เวอร์-ซี',
    meaning: 'ข้อถกเถียง, ความขัดแย้งทางความคิดในสังคม',
    category: 'communication',
    level: 'B2',
    example: 'The new environmental policy sparked widespread controversy.',
    exampleTh: 'นโยบายสิ่งแวดล้อมใหม่ได้ก่อให้เกิดข้อถกเถียงในวงกว้าง'
  },

  // ==========================================
  // ⚡ 11. PHRASAL VERBS & IDIOMS (กริยาวลี & สำนวน)
  // ==========================================
  {
    id: 'v_61',
    word: 'put off',
    pos: 'phr.',
    phonetic: '/pʊt ɒf/',
    thaiPhonetic: 'พุท-ออฟ',
    meaning: 'เลื่อนเวลาออกไป (= postpone)',
    category: 'phrasal',
    level: 'B1',
    example: 'Never put off until tomorrow what you can accomplish today.',
    exampleTh: 'อย่าผลัดวันประกันพรุ่งในสิ่งที่คุณสามารถทำให้สำเร็จได้ในวันนี้'
  },
  {
    id: 'v_62',
    word: 'look after',
    pos: 'phr.',
    phonetic: '/lʊk ˈɑːf.tər/',
    thaiPhonetic: 'ลุค-อาฟ-เทอร์',
    meaning: 'ดูแลเอาใจใส่ (= take care of)',
    category: 'phrasal',
    level: 'A2',
    example: 'She volunteered to look after stray animals at the shelter.',
    exampleTh: 'เธออาสาไปดูแลสัตว์จรจัดที่สถานสงเคราะห์'
  },
  {
    id: 'v_63',
    word: 'figure out',
    pos: 'phr.',
    phonetic: '/ˈfɪɡ.ər aʊt/',
    thaiPhonetic: 'ฟิก-เกอร์-เอาท',
    meaning: 'คิดหาคำตอบได้, ไขปริศนาสำเร็จ',
    category: 'phrasal',
    level: 'B1',
    example: 'It took him hours to figure out the solution to the math puzzle.',
    exampleTh: 'เขาใช้เวลาหลายชั่วโมงในการคิดหาคำตอบของปริศนาคณิตศาสตร์'
  },
  {
    id: 'v_64',
    word: 'come across',
    pos: 'phr.',
    phonetic: '/kʌm əˈkrɒs/',
    thaiPhonetic: 'คัม-เออะ-ครอส',
    meaning: 'พบเจอโดยบังเอิญ (= encounter accidentally)',
    category: 'phrasal',
    level: 'B1',
    example: 'I came across a rare antique coin while cleaning the attic.',
    exampleTh: 'ฉันบังเอิญเจอเหรียญโบราณหายากขณะกำลังทำความสะอาดห้องใต้หลังคา'
  },
  {
    id: 'v_65',
    word: 'hit the books',
    pos: 'phr.',
    phonetic: '/hɪt ðə bʊks/',
    thaiPhonetic: 'ฮิท-เดอะ-บุ๊คส์',
    meaning: 'ตั้งหน้าตั้งตาอ่านหนังสืออย่างหนัก',
    category: 'phrasal',
    level: 'B1',
    example: 'Exam week is starting, so it\'s time to hit the books!',
    exampleTh: 'สัปดาห์สอบกำลังเริ่มขึ้นแล้ว ถึงเวลาต้องตั้งหน้าตั้งตาอ่านหนังสือหนักแล้ว!'
  },
  {
    id: 'v_66',
    word: 'burn the midnight oil',
    pos: 'phr.',
    phonetic: '/bɜːn ðə ˈmɪd.naɪt ɔɪl/',
    thaiPhonetic: 'เบิร์น-เดอะ-มิด-ไนท์-ออยล์',
    meaning: 'ทำงานหรืออ่านหนังสือจนดึกดื่นค่อนคืน',
    category: 'phrasal',
    level: 'B2',
    example: 'Medical students often burn the midnight oil before final exams.',
    exampleTh: 'นักศึกษาแพทย์มักจะอ่านหนังสือจนดึกดื่นค่อนคืนก่อนการสอบไฟนอล'
  },
  {
    id: 'v_67',
    word: 'once in a blue moon',
    pos: 'phr.',
    phonetic: '/wʌns ɪn ə bluː muːn/',
    thaiPhonetic: 'วันซ-อิน-เออะ-บลู-มูน',
    meaning: 'นานๆ ทีจะเกิดขึ้น, นานทีปีหน (rarely)',
    category: 'phrasal',
    level: 'B1',
    example: 'He lives in Australia, so we only see him once in a blue moon.',
    exampleTh: 'เขาอาศัยอยู่ในออสเตรเลีย พวกเราจึงได้เจอเขานานทีปีหนเท่านั้น'
  }
]
