# -*- coding: utf-8 -*-
"""
Script to expand OXFORD_VOCAB_BANK in src/lib/oxford-3000-data.ts
with 250+ curated high-yield vocabulary words for O-NET P.6 & M.1 Entrance Exams.
"""

RAW_DATA = [
  # 🏠 1. DAILY & HOME
  ("routine", "n.", "/ruːˈtiːn/", "รู-ทีน", "กิจวัตรประจำวัน, สิ่งที่ทำเป็นประจำ", "daily", "A2", "My morning routine includes jogging and reading news.", "กิจวัตรยามเช้าของฉันรวมถึงการวิ่งจ็อกกิ้งและการอ่านข่าว"),
  ("chores", "n.", "/tʃɔːrz/", "ชอร์ซ", "งานบ้านจุกจิก", "daily", "A2", "We share household chores like washing dishes and vacuuming.", "พวกเราแบ่งงานบ้านกันทำ เช่น ล้างจานและดูดฝุ่น"),
  ("appliance", "n.", "/əˈplaɪ.əns/", "เออะ-พลาย-เอินซ", "เครื่องใช้ไฟฟ้าภายในบ้าน", "daily", "B1", "Modern electrical appliances save us a tremendous amount of time.", "เครื่องใช้ไฟฟ้าที่ทันสมัยช่วยประหยัดเวลาให้เราได้อย่างมหาศาล"),
  ("neat", "adj.", "/niːt/", "นีท", "เรียบร้อย, เป็นระเบียบ", "daily", "A2", "Please keep your study desk neat and tidy.", "กรุณารักษาโต๊ะหนังสือของคุณให้เป็นระเบียบเรียบร้อย"),
  ("arrange", "v.", "/əˈreɪndʒ/", "เออะ-เรนจ", "จัดระเบียบ, จัดการ, นัดหมาย", "daily", "A2", "She arranged the books on the shelf by color and subject.", "เธอจัดหนังสือบนชั้นวางตามสีและหมวดหมู่วิชา"),
  ("neighbor", "n.", "/ˈneɪ.bər/", "เน-เบอร์", "เพื่อนบ้าน", "daily", "A1", "Our neighbors are very kind and often share fresh fruits.", "เพื่อนบ้านของเราใจดีมากและมักแบ่งปันผลไม้สดให้เสมอ"),
  ("neighborhood", "n.", "/ˈneɪ.bər.hʊd/", "เน-เบอร์-ฮูด", "ละแวกบ้าน, แถวบ้าน", "daily", "A2", "This is a quiet and safe neighborhood for children.", "นี่คือละแวกบ้านที่เงียบสงบและปลอดภัยสำหรับเด็กๆ"),
  ("furniture", "n.", "/ˈfɜː.nɪ.tʃər/", "เฟอร์-นิ-เจอร์", "เฟอร์นิเจอร์, เครื่องเรือน", "daily", "A2", "They bought wooden furniture for their new living room.", "พวกเขาซื้อเฟอร์นิเจอร์ไม้สำหรับห้องนั่งเล่นใหม่"),
  ("commute", "v.", "/kəˈmjuːt/", "เคอะ-มิวท", "เดินทางไปกลับที่ทำงานหรือโรงเรียน", "daily", "B1", "He commutes to school by bicycle every morning.", "เขาเดินทางไปโรงเรียนด้วยจักรยานทุกเช้า"),
  ("balcony", "n.", "/ˈbæl.kə.ni/", "แบล-เคอะ-นี", "ระเบียง", "daily", "A2", "There are colorful potted flowers on the balcony.", "มีกระถางดอกไม้หลากสีสันอยู่บนระเบียง"),
  ("dormitory", "n.", "/ˈdɔːr.mə.tɔːr.i/", "ดอร์-มิ-ทอ-รี", "หอพักนักเรียน, หอพัก", "daily", "B1", "Many boarding school students live happily in the dormitory.", "นักเรียนโรงเรียนประจำจำนวนมากอาศัยอยู่อย่างมีความสุขในหอพัก"),
  ("utensil", "n.", "/juːˈten.sɪl/", "ยู-เทน-ซิล", "อุปกรณ์เครื่องใช้ในครัว", "daily", "B1", "Keep all cooking utensils clean and sanitized.", "รักษาอุปกรณ์ทำครัวทั้งหมดให้สะอาดและถูกสุขอนามัย"),
  ("laundry", "n.", "/ˈlɔːn.dri/", "ลอน-ดรี", "การซักรีด, เสื้อผ้าที่รอซัก", "daily", "A2", "Sunday is the day for doing family laundry.", "วันอาทิตย์เป็นวันสำหรับซักเสื้อผ้าของครอบครัว"),
  ("groceries", "n.", "/ˈɡroʊ.sə.riz/", "โกร-เซอะ-รีซ", "ของชำ, วัตถุดิบอาหาร", "daily", "A2", "Mom bought fresh vegetables and groceries from the supermarket.", "คุณแม่ซื้อผักสดและของชำมาจากซูเปอร์มาร์เก็ต"),
  ("hygiene", "n.", "/ˈhaɪ.dʒiːn/", "ไฮ-จีน", "สุขอนามัย, ความสะอาดส่วนบุคคล", "daily", "B1", "Personal hygiene is essential for preventing infectious diseases.", "สุขอนามัยส่วนบุคคลเป็นสิ่งจำเป็นในการป้องกันโรคติดต่อ"),
  ("maintenance", "n.", "/ˈmeɪn.tən.əns/", "เมน-เทอะ-เนินซ", "การบำรุงรักษา, การดูแลซ่อมแซม", "daily", "B2", "Regular maintenance keeps the air conditioner running efficiently.", "การบำรุงรักษาเป็นประจำช่วยให้เครื่องปรับอากาศทำงานได้อย่างมีประสิทธิภาพ"),
  ("resident", "n.", "/ˈrez.ɪ.dənt/", "เรส-ซิ-เดิ้นท์", "ผู้อยู่อาศัย, ประชาชนในพื้นที่", "daily", "B1", "The local residents gathered to clean up the public park.", "ผู้อยู่อาศัยในท้องถิ่นมารวมตัวกันเพื่อทำความสะอาดสวนสาธารณะ"),
  ("suburb", "n.", "/ˈsʌb.ɜːb/", "ซับ-เอิร์บ", "ชานเมือง, เขตนอกเมือง", "daily", "B1", "Many families prefer living in peaceful suburbs rather than the downtown.", "หลายครอบครัวชอบอาศัยอยู่ในย่านชานเมืองที่สงบสุขมากกว่าใจกลางเมือง"),
  ("habit", "n.", "/ˈhæb.ɪt/", "แฮบ-บิท", "นิสัย, ความเคยชิน", "daily", "A2", "Reading 15 minutes before bed is a wonderful habit.", "การอ่านหนังสือ 15 นาทีก่อนนอนเป็นนิสัยที่ยอดเยี่ยม"),
  ("calendar", "n.", "/ˈkæl.ən.dər/", "แคล-เลิน-เดอร์", "ปฏิทิน", "daily", "A1", "Mark the exam date on your wall calendar.", "ทำเครื่องหมายวันสอบไว้บนปฏิทินแขวนผนังของคุณ"),

  # 🏫 2. EDUCATION & ACADEMICS
  ("curriculum", "n.", "/kəˈrɪk.jə.ləm/", "เคอะ-ริก-คิว-เลิม", "หลักสูตรการเรียนการสอน", "school", "B2", "Our school curriculum focuses on STEM and creative English thinking.", "หลักสูตรโรงเรียนของเรามุ่งเน้นสะเต็มศึกษาและการคิดภาษาอังกฤษเชิงสร้างสรรค์"),
  ("assignment", "n.", "/əˈsaɪn.mənt/", "เออะ-ไซน์-เมิ้นท์", "งานที่ได้รับมอบหมาย, การบ้าน", "school", "B1", "Students must submit their science assignment before Friday midnight.", "นักเรียนต้องส่งการบ้านวิทยาศาสตร์ก่อนเที่ยงคืนวันศุกร์"),
  ("semester", "n.", "/sɪˈmes.tər/", "ซิ-เมส-เทอร์", "ภาคการศึกษา, เทอม", "school", "B1", "The final examination will take place at the end of this semester.", "การสอบปลายภาคจะจัดขึ้นเมื่อสิ้นสุดภาคการศึกษานี้"),
  ("laboratory", "n.", "/ləˈbɒr.ə.tər.i/", "เลอะ-บอ-เรอะ-ทรี", "ห้องปฏิบัติการ, ห้องแล็บ", "school", "B1", "Wear protective goggles whenever you experiment inside the chemistry laboratory.", "สวมแว่นตานิรภัยทุกครั้งเมื่อคุณทำการทดลองในห้องปฏิบัติการเคมี"),
  ("scholarship", "n.", "/ˈskɒl.ə.ʃɪp/", "สกอล-เลอร์-ชิพ", "ทุนการศึกษา", "school", "B1", "He won a prestigious scholarship to study in a top gifted school.", "เขาได้รับทุนการศึกษาอันทรงเกียรติเพื่อเข้าเรียนในโรงเรียนกิฟต์เต็ดชั้นนำ"),
  ("tuition", "n.", "/tjuːˈɪʃ.ən/", "ทิว-อิช-เชิน", "ค่าเล่าเรียน", "school", "B2", "The government provides free tuition for basic compulsory education.", "รัฐบาลสนับสนุนค่าเล่าเรียนฟรีสำหรับการศึกษาภาคบังคับขั้นพื้นฐาน"),
  ("prerequisite", "n.", "/ˌpriːˈrek.wɪ.zɪt/", "พรี-เรก-ควิ-ซิท", "วิชาบังคับก่อน, ข้อกำหนดเบื้องต้น", "school", "B2", "Basic arithmetic is a prerequisite for studying high-level algebra.", "คณิตศาสตร์พื้นฐานเป็นวิชาบังคับก่อนสำหรับการเรียนพีชคณิตขั้นสูง"),
  ("deadline", "n.", "/ˈded.laɪn/", "เดด-ไลน์", "กำหนดส่ง, วันสิ้นสุดเวลา", "school", "B1", "Make sure you meet the registration deadline for O-NET exams.", "ตรวจสอบให้แน่ใจว่าคุณลงทะเบียนทันวันหมดเขตสอบ O-NET"),
  ("hypothesis", "n.", "/haɪˈpɒθ.ə.sɪs/", "ไฮ-พอธ-เธอ-ซิส", "สมมติฐานทางวิทยาศาสตร์", "school", "B2", "Formulate a testable hypothesis before starting your scientific experiment.", "ตั้งสมมติฐานที่ทดสอบได้ก่อนเริ่มการทดลองทางวิทยาศาสตร์ของคุณ"),
  ("attendance", "n.", "/əˈten.dəns/", "เออะ-เทน-เดิ้นซ", "การเข้าเรียน, การเข้าร่วม", "school", "B1", "Good school attendance is strictly required for taking final exams.", "การมีเวลาเรียนสม่ำเสมอเป็นข้อบังคับสำหรับการเข้าสอบปลายภาค"),
  ("diploma", "n.", "/dɪˈploʊ.mə/", "ดิ-พโล-เมอะ", "ประกาศนียบัตร, วุฒิบัตร", "school", "B1", "Graduates proudly received their diplomas on the graduation stage.", "ผู้สำเร็จการศึกษาได้รับประกาศนียบัตรอย่างภาคภูมิใจบนเวทีรับวุฒิ"),
  ("experiment", "n.", "/ɪkˈsper.ɪ.mənt/", "อิก-สเป-ริ-เมิ้นท์", "การทดลองทางวิทยาศาสตร์", "school", "A2", "Today's biology experiment shows how plants absorb mineral water.", "การทดลองชีววิทยาวันนี้แสดงให้เห็นว่าพืชดูดซึมน้ำแร่ธาตุอย่างไร"),
  ("calculation", "n.", "/ˌkæl.kjəˈleɪ.ʃən/", "แคล-คิว-เล-เชิน", "การคำนวณ", "school", "B1", "Double check your mathematical calculations to avoid silly mistakes.", "ตรวจทานการคำนวณทางคณิตศาสตร์ของคุณซ้ำอีกรอบเพื่อหลีกเลี่ยงข้อผิดพลาดเล็กน้อย"),
  ("encyclopedia", "n.", "/ɪnˌsaɪ.kləˈpiː.di.ə/", "อิน-ไซ-โคล-พี-เดีย", "สารานุกรม", "school", "B1", "You can look up historical facts in the library encyclopedia.", "คุณสามารถค้นหาข้อเท็จจริงทางประวัติศาสตร์ได้ในสารานุกรมของห้องสมุด"),
  ("graduation", "n.", "/ˌɡrædʒ.uˈeɪ.ʃən/", "แกรจ-จุ-เอ-เชิน", "การสำเร็จการศึกษา", "school", "A2", "Her parents took joyful photos on her elementary graduation day.", "พ่อแม่ของเธอถ่ายรูปอย่างมีความสุขในวันสำเร็จการศึกษาระดับประถมของเธอ"),
  ("detention", "n.", "/dɪˈten.ʃən/", "ดิ-เทน-เชิน", "การกักบริเวณหลังเลิกเรียน", "school", "B2", "Students who repeatedly skip classes might receive detention.", "นักเรียนที่โดดเรียนซ้ำๆ อาจถูกลงโทษด้วยการกักบริเวณหลังเลิกเรียน"),
  ("revision", "n.", "/rɪˈvɪʒ.ən/", "ริ-วิช-เชิน", "การทบทวนตำราเรียน", "school", "B1", "Early revision guarantees high scores and peace of mind before tests.", "การทบทวนบทเรียนล่วงหน้ารับประกันคะแนนสูงและความสบายใจก่อนสอบ"),
  ("comprehension", "n.", "/ˌkɒm.prɪˈhen.ʃən/", "คอม-พริ-เฮน-เชิน", "ความเข้าใจในการอ่าน", "school", "B2", "Practice reading articles daily to boost your English reading comprehension.", "ฝึกอ่านบทความทุกวันเพื่อเพิ่มพูนทักษะความเข้าใจในการอ่านภาษาอังกฤษ"),
  ("vocabulary", "n.", "/vəˈkæb.jə.lər.i/", "เวอะ-แคบ-บิว-เลอ-รี", "คำศัพท์", "school", "A2", "Expanding your vocabulary is the fastest way to master English.", "การขยายคลังคำศัพท์เป็นวิธีที่เร็วที่สุดในการเก่งภาษาอังกฤษ"),
  ("grammar", "n.", "/ˈɡræm.ər/", "แกรม-เมอร์", "ไวยากรณ์", "school", "A2", "Mastering basic grammar helps you write accurate English essays.", "การเชี่ยวชาญไวยากรณ์พื้นฐานช่วยให้คุณเขียนเรียงความภาษาอังกฤษได้อย่างถูกต้อง"),

  # 😊 3. EMOTIONS & PSYCHOLOGY
  ("enthusiastic", "adj.", "/ɪnˌθjuː.ziˈæs.tɪk/", "อิน-ทิว-ซิ-แอส-ติก", "กระตือรือร้น, มีไฟเต็มเปี่ยม", "feelings", "B1", "The students were enthusiastic about the interactive science lab.", "นักเรียนกระตือรือร้นเป็นอย่างยิ่งกับห้องแล็บวิทยาศาสตร์อินเทอร์แอคทีฟ"),
  ("anxious", "adj.", "/ˈæŋk.ʃəs/", "แอ็ง-เชิส", "วิตกกังวล, กระวนกระวาย", "feelings", "B1", "He felt anxious before the O-NET exam results were announced.", "เขารู้สึกวิตกกังวลก่อนที่ผลสอบ O-NET จะประกาศ"),
  ("confident", "adj.", "/ˈkɒn.fɪ.dənt/", "คอน-ฟิ-เดิ้นท์", "มั่นใจ, เชื่อมั่นในตัวเอง", "feelings", "B1", "With thorough preparation, she was confident of winning first prize.", "ด้วยการเตรียมตัวอย่างถี่ถ้วน เธอจึงมั่นใจว่าจะคว้าอันดับหนึ่ง"),
  ("exhausted", "adj.", "/ɪɡˈzɔː.stɪd/", "อิก-ซอส-ทิด", "หมดแรง, เหนื่อยล้าอย่างยิ่ง", "feelings", "B1", "After running the marathon, the athletes were completely exhausted.", "หลังจากวิ่งมาราธอน นักกีฬาต่างหมดแรงลงอย่างสิ้นเชิง"),
  ("disappointed", "adj.", "/ˌdɪs.əˈpɔɪn.tɪd/", "ดิส-เออะ-พอยน์-ทิด", "ผิดหวัง", "feelings", "B1", "Don't be disappointed by a low score; use it as a stepping stone.", "อย่าเพิ่งผิดหวังกับคะแนนที่น้อย ให้ใช้มันเป็นบันไดก้าวไปข้างหน้า"),
  ("grateful", "adj.", "/ˈɡreɪt.fəl/", "เกรท-ฟูล", "รู้สึกซาบซึ้ง, สำนึกในบุญคุณ", "feelings", "B1", "I am deeply grateful for my teacher's tireless dedication.", "ฉันรู้สึกซาบซึ้งใจอย่างลึกซึ้งสำหรับการทุ่มเทอย่างไม่เหน็ดเหนื่อยของคุณครู"),
  ("embarrassed", "adj.", "/ɪmˈbær.əst/", "อิม-แบ-เริสด์", "เคอะเขิน, อับอาย", "feelings", "B1", "He was embarrassed when his stomach growled during the quiet test.", "เขารู้สึกเขินอายเมื่อท้องของเขาร้องเสียงดังระหว่างการสอบที่เงียบสงัด"),
  ("furious", "adj.", "/ˈfjʊə.ri.əs/", "ฟิว-ริ-เอิส", "โกรธจัด, โมโหเป็นฟืนเป็นไฟ", "feelings", "B2", "The coach was furious when the players broke the safety rules.", "โค้ชโกรธจัดเมื่อผู้เล่นละเมิดกฎความปลอดภัย"),
  ("optimistic", "adj.", "/ˌɒp.tɪˈmɪs.tɪk/", "ออป-ทิ-มิส-ติก", "มองโลกในแง่ดี", "feelings", "B2", "She remains optimistic that she will enter her dream high school.", "เธอยังคงมองโลกในแง่ดีว่าจะสามารถเข้าโรงเรียนมัธยมในฝันได้"),
  ("pessimistic", "adj.", "/ˌpes.ɪˈmɪs.tɪk/", "เพส-ซิ-มิส-ติก", "มองโลกในแง่ร้าย", "feelings", "B2", "Avoid being pessimistic; positive thinking yields great outcomes.", "จงหลีกเลี่ยงการมองโลกในแง่ร้าย เพราะความคิดเชิงบวกจะนำมาซึ่งผลลัพธ์ที่ดีเยี่ยม"),
  ("sympathetic", "adj.", "/ˌsɪm.pəˈθet.ɪk/", "ซิม-เพอะ-เธท-ติก", "เห็นอกเห็นใจ, เข้าอกเข้าใจผู้อื่น", "feelings", "B2", "A sympathetic friend listens patiently when you feel down.", "เพื่อนที่เห็นอกเห็นใจจะคอยรับฟังอย่างอดทนเมื่อคุณรู้สึกท้อแท้"),
  ("jealous", "adj.", "/ˈdʒel.əs/", "เจล-เลิส", "อิจฉา, หึงหวง", "feelings", "B1", "Try to celebrate others' achievements instead of feeling jealous.", "พยายามร่วมยินดีกับความสำเร็จของผู้อื่นแทนที่จะรู้สึกอิจฉา"),
  ("generous", "adj.", "/ˈdʒen.ər.əs/", "เจน-เนอะ-เริส", "เอื้อเฟื้อเผื่อแผ่, ใจกว้าง", "feelings", "B1", "The generous alumni donated brand-new computers to the school.", "ศิษย์เก่าผู้ใจกว้างได้บริจาคคอมพิวเตอร์เครื่องใหม่เอี่ยมให้แก่โรงเรียน"),
  ("patient", "adj.", "/ˈpeɪ.ʃənt/", "เพ-เชิ้นท์", "อดทน, ใจเย็น", "feelings", "A2", "Good teachers are always patient with struggling students.", "ครูที่ดีมักจะใจเย็นและอดทนกับนักเรียนที่กำลังพยายามปรับตัวเสมอ"),
  ("determined", "adj.", "/dɪˈtɜː.mɪnd/", "ดิ-เทอร์-มินด์", "มุ่งมั่น, ตั้งใจแน่วแน่", "feelings", "B1", "She is determined to score 100% on the mathematics exam.", "เธอตั้งใจแน่วแน่ว่าจะทำคะแนนสอบคณิตศาสตร์ให้ได้ 100% เต็ม"),
  ("curious", "adj.", "/ˈkjʊə.ri.əs/", "คิว-ริ-เอิส", "อยากรู้อยากเห็น, ใฝ่รู้", "feelings", "B1", "Curious young minds ask insightful questions in science lab.", "เด็กๆ ที่มีความใฝ่รู้มักจะถามคำถามที่ลึกซึ้งในห้องแล็บวิทยาศาสตร์"),
  ("courageous", "adj.", "/kəˈreɪ.dʒəs/", "เคอะ-เร-เจิส", "กล้าหาญ, กล้าเผชิญหน้า", "feelings", "B2", "It was courageous of him to stand up against bullying.", "ช่างกล้าหาญมากที่เขาลุกขึ้นมาต่อต้านการกลั่นแกล้งรังแก"),
  ("humble", "adj.", "/ˈhʌm.bəl/", "ฮัม-เบิล", "อ่อนน้อมถ่อมตน", "feelings", "B2", "Despite being top of the class, she remains humble and friendly.", "แม้ว่าเธอจะสอบได้ที่หนึ่งของห้อง แต่เธอก็ยังคงอ่อนน้อมถ่อมตนและเป็นมิตร"),

  # 🥗 4. FOOD & MEDICINE
  ("nutrition", "n.", "/njuːˈtrɪʃ.ən/", "นิว-ทริช-เชิน", "โภชนาการ, สารอาหารที่มีประโยชน์", "food_health", "B1", "Good nutrition is vital for children's brain development.", "โภชนาการที่ดีมีความสำคัญอย่างยิ่งต่อการพัฒนาสมองของเด็ก"),
  ("ingredient", "n.", "/ɪnˈɡriː.di.ənt/", "อิน-กรี-เดี้ยนท์", "ส่วนผสม, วัตถุดิบในการปรุง", "food_health", "B1", "Fresh basil leaves are the secret ingredient in this Italian pasta.", "ใบโหระพาสดคือส่วนผสมลับในพาสต้าจานเด็ดของอิตาลีนี้"),
  ("recipe", "n.", "/ˈres.ɪ.pi/", "เรส-ซิ-พี", "สูตรอาหาร, ตำรับอาหาร", "food_health", "A2", "Follow the cake recipe carefully to make it light and fluffy.", "ทำตามสูตรทำเค้กอย่างระมัดระวังเพื่อให้เนื้อเค้กนุ่มฟู"),
  ("prescription", "n.", "/prɪˈskrɪp.ʃən/", "พริ-สคริพ-เชิน", "ใบสั่งยาจากแพทย์", "food_health", "B1", "The pharmacist dispensed antibiotics according to the doctor's prescription.", "เภสัชกรจ่ายยาปฏิชีวนะตามใบสั่งยาของแพทย์"),
  ("symptom", "n.", "/ˈsɪmp.təm/", "ซิมพ-เทิม", "อาการของโรค", "food_health", "B1", "Fever, sore throat, and fatigue are common symptoms of flu.", "ไข้ เจ็บคอ และความเมื่อยล้าเป็นอาการทั่วไปของไข้หวัดใหญ่"),
  ("beverage", "n.", "/ˈbev.ər.ɪdʒ/", "เบฟ-เวอะ-ริดจ", "เครื่องดื่ม", "food_health", "B1", "Water is the healthiest beverage to stay well hydrated.", "น้ำเปล่าคือเครื่องดื่มที่ดีต่อสุขภาพที่สุดในการรักษาสมดุลน้ำในร่างกาย"),
  ("vegetarian", "n.", "/ˌvedʒ.ɪˈteə.ri.ən/", "เวจ-เจอะ-แท-เรียน", "ผู้กินมังสวิรัติ", "food_health", "A2", "She became a vegetarian to protect animals and the environment.", "เธอหันมากินมังสวิรัติเพื่อปกป้องสัตว์และสิ่งแวดล้อม"),
  ("allergy", "n.", "/ˈæl.ə.dʒi/", "แอล-เลอะ-จี", "ภูมิแพ้, อาการแพ้สารต่างๆ", "food_health", "B1", "Please inform the teacher if you have a severe peanut allergy.", "กรุณาแจ้งคุณครูหากคุณมีอาการแพ้ถั่วลิสงอย่างรุนแรง"),
  ("infectious", "adj.", "/ɪnˈfek.ʃəs/", "อิน-เฟก-เชิส", "ที่ติดต่อได้, ซึ่งแพร่เชื้อได้", "food_health", "B2", "Wash hands regularly to prevent the spread of infectious viruses.", "ล้างมือเป็นประจำเพื่อป้องกันการแพร่ระบาดของเชื้อไวรัสที่ติดต่อได้"),
  ("ambulance", "n.", "/ˈæm.bjə.ləns/", "แอม-บิว-เลินซ", "รถพยาบาลฉุกเฉิน", "food_health", "A2", "Drivers must clear the lane when an ambulance flashes its sirens.", "ผู้ขับขี่ต้องเปิดทางเมื่อรถพยาบาลเปิดสัญญาณไซเรนฉุกเฉิน"),
  ("recovery", "n.", "/rɪˈkʌv.ər.i/", "ริ-คัฟ-เวอะ-รี", "การฟื้นฟูสุขภาพ, การหายป่วย", "food_health", "B1", "Adequate rest and warm soup speed up the patient's recovery.", "การพักผ่อนอย่างเพียงพอและซุปร้อนๆ ช่วยเร่งให้ผู้ป่วยฟื้นตัวเร็วขึ้น"),
  ("digestion", "n.", "/daɪˈdʒes.tʃən/", "ได-เจส-เชิน", "ระบบการย่อยอาหาร", "food_health", "B2", "Chewing your food slowly aids proper digestion.", "การเคี้ยวอาหารช้าๆ ช่วยส่งเสริมระบบการย่อยอาหารที่เหมาะสม"),
  ("vitamin", "n.", "/ˈvɪt.ə.mɪn/", "วิต-เทอะ-มิน", "วิตามิน", "food_health", "A2", "Oranges and guavas are rich in vitamin C.", "ส้มและฝรั่งอุดมไปด้วยวิตามินซี"),
  ("appetite", "n.", "/ˈæp.ə.taɪt/", "แอพ-เพอะ-ไทท์", "ความอยากอาหาร, ความเจริญอาหาร", "food_health", "B1", "Regular exercise boosts both stamina and healthy appetite.", "การออกกำลังกายสม่ำเสมอช่วยเพิ่มทั้งความทนทานและความอยากอาหารที่ดีต่อสุขภาพ"),

  # ✈️ 5. TRAVEL & LOGISTICS
  ("destination", "n.", "/ˌdes.tɪˈneɪ.ʃən/", "เดส-ทิ-เน-เชิน", "จุดหมายปลายทาง", "travel", "B1", "Chiang Mai is a world-famous tourist destination in winter.", "เชียงใหม่เป็นจุดหมายปลายทางท่องเที่ยวที่มีชื่อเสียงระดับโลกในฤดูหนาว"),
  ("departure", "n.", "/dɪˈpɑː.tʃər/", "ดิ-พาร์-เชอร์", "การออกเดินทาง, ขาออก", "travel", "B1", "Please arrive at the departure lounge two hours before your flight.", "กรุณามาถึงห้องรับรองผู้โดยสารขาออกสองชั่วโมงก่อนเที่ยวบินของคุณ"),
  ("arrival", "n.", "/əˈraɪ.vəl/", "เออะ-ไร-เวิล", "การมาถึง, ขาเข้า", "travel", "B1", "The flight arrival board showed that the plane was on schedule.", "ป้ายข้อมูลเที่ยวบินขาเข้าแสดงว่าเครื่องบินเดินทางมาถึงตรงเวลา"),
  ("itinerary", "n.", "/aɪˈtɪn.ər.ər.i/", "ไอ-ทิน-เนอะ-เรอะ-รี", "กำหนดการเดินทาง, แผนการท่องเที่ยว", "travel", "B2", "Our travel itinerary covers five historical temples in Ayutthaya.", "กำหนดการเดินทางของเราครอบคลุมวัดประวัติศาสตร์ 5 แห่งในอยุธยา"),
  ("passenger", "n.", "/ˈpæs.ən.dʒər/", "แพส-เซิน-เจอร์", "ผู้โดยสาร", "travel", "A2", "All train passengers must hold valid tickets before boarding.", "ผู้โดยสารรถไฟทุกคนต้องถือตั๋วโดยสารที่ถูกต้องก่อนขึ้นขบวน"),
  ("luggage", "n.", "/ˈlʌɡ.ɪdʒ/", "ลัก-กิดจ", "กระเป๋าเดินทาง, สัมภาระ", "travel", "A2", "Do not leave your personal luggage unattended at the airport.", "อย่าวางกระเป๋าสัมภาระส่วนตัวทิ้งไว้โดยไม่มีคนดูแลที่สนามบิน"),
  ("passport", "n.", "/ˈpɑːs.pɔːt/", "พาส-พอร์ต", "หนังสือเดินทาง", "travel", "A2", "Ensure your passport has at least six months validity before traveling abroad.", "ตรวจสอบให้แน่ใจว่าหนังสือเดินทางของคุณมีอายุเหลืออย่างน้อย 6 เดือนก่อนเดินทางไปต่างประเทศ"),
  ("accommodation", "n.", "/əˌkɒm.əˈdeɪ.ʃən/", "เออะ-คอม-เมอะ-เด-เชิน", "ที่พักอาศัย, โรงแรมที่พัก", "travel", "B1", "We booked cozy beachside accommodation in Krabi.", "พวกเราจองที่พักแสนสบายริมชายหาดในจังหวัดกระบี่"),
  ("boarding", "n.", "/ˈbɔː.dɪŋ/", "บอร์ด-ดิง", "การขึ้นเครื่องบินหรือเรือ", "travel", "B1", "Boarding for flight TG102 starts at gate number four.", "การขึ้นเครื่องบินเที่ยวบิน TG102 เริ่มขึ้นที่ประตูหมายเลข 4"),
  ("sightseeing", "n.", "/ˈsaɪtˌsiː.ɪŋ/", "ไซต์-ซี-อิง", "การเที่ยวชมทิวทัศน์และสถานที่สำคัญ", "travel", "A2", "They spent the sunny afternoon sightseeing around the old capital.", "พวกเขาใช้เวลาช่วงบ่ายที่แดดจ้าเที่ยวชมสถานที่สำคัญรอบๆ เมืองหลวงเก่า"),
  ("reservation", "n.", "/ˌrez.əˈveɪ.ʃən/", "เรส-เซอะ-เว-เชิน", "การสำรองที่นั่ง, การจองล่วงหน้า", "travel", "B1", "I called the restaurant to confirm our dinner reservation.", "ฉันโทรไปที่ร้านอาหารเพื่อยืนยันการสำรองที่นั่งสำหรับมื้อค่ำของเรา"),
  ("souvenir", "n.", "/ˌsuː.vəˈnɪər/", "ซู-เวอะ-เนียร์", "ของที่ระลึก, ของฝาก", "travel", "B1", "He bought handcrafted wooden elephants as souvenirs for his classmates.", "เขาซื้อช้างไม้แกะสลักมือเป็นของฝากสำหรับเพื่อนร่วมชั้นของเขา"),
  ("delay", "n.", "/dɪˈleɪ/", "ดิ-เลย์", "ความล่าช้า, การเลื่อนเวลา", "travel", "A2", "Heavy storm clouds caused a two-hour flight delay.", "เมฆพายุฝนฟ้าคะนองที่รุนแรงทำให้เที่ยวบินเกิดความล่าช้าไปสองชั่วโมง"),
  ("cruise", "n.", "/kruːz/", "ครูซ", "การล่องเรือสำราญ", "travel", "B1", "They took an evening dinner cruise along the Chao Phraya River.", "พวกเขาไปล่องเรือสำราญรับประทานอาหารค่ำไปตามแม่น้ำเจ้าพระยา"),

  # 💳 6. FINANCE & COMMERCE
  ("discount", "n.", "/ˈdɪs.kaʊnt/", "ดิส-เคาท์", "ส่วนลด", "shopping", "A2", "Students get a 20% discount on all educational stationery.", "นักเรียนจะได้รับส่วนลด 20% สำหรับเครื่องเขียนเพื่อการศึกษาทุกชนิด"),
  ("receipt", "n.", "/rɪˈsiːt/", "ริ-ซีท", "ใบเสร็จรับเงิน (ตัว p ไม่ออกเสียง!)", "shopping", "A2", "Always keep your purchase receipt in case you need an exchange.", "เก็บใบเสร็จรับเงินไว้เสมอ เผื่อในกรณีที่คุณต้องการเปลี่ยนสินค้า"),
  ("bargain", "n.", "/ˈbɑː.ɡɪn/", "บาร์-กิน", "สินค้าราคาถูกคุ้มค่า, การต่อรองราคา", "shopping", "B1", "This high-end tablet was an absolute bargain on Black Friday.", "แท็บเล็ตสเปกสูงเครื่องนี้ราคาคุ้มค่ามากอย่างเหลือเชื่อในวันแบล็กฟรายเดย์"),
  ("expense", "n.", "/ɪkˈspens/", "อิก-สเปนซ", "ค่าใช้จ่าย, รายจ่าย", "shopping", "B1", "Keep track of daily expenses to save pocket money each month.", "จดบันทึกรายจ่ายประจำวันเพื่อเก็บออมเงินค่าขนมในแต่ละเดือน"),
  ("refund", "n.", "/ˈriː.fʌnd/", "รี-ฟันด์", "การคืนเงิน, เงินที่ได้คืน", "shopping", "B1", "The store issued a full refund because the item was defective.", "ทางร้านได้คืนเงินเต็มจำนวนเนื่องจากสินค้ามีตำหนิชำรุด"),
  ("budget", "n.", "/ˈbʌdʒ.ɪt/", "บัด-เจ็ท", "งบประมาณ, วงเงินที่ตั้งไว้", "shopping", "B1", "We must manage our project budget wisely to prevent overspending.", "เราต้องบริหารงบประมาณของโครงงานอย่างชาญฉลาดเพื่อไม่ให้ใช้จ่ายเกินตัว"),
  ("purchase", "v.", "/ˈpɜː.tʃəs/", "เพอร์-เชิส", "ซื้อ, จัดซื้อ", "shopping", "B1", "You can purchase online mock exam sets with digital points.", "คุณสามารถซื้อชุดข้อสอบจำลองออนไลน์ได้ด้วยคะแนนสะสมดิจิทัล"),
  ("affordable", "adj.", "/əˈfɔː.də.bəl/", "เออะ-ฟอร์-เดอะ-เบิล", "ราคาย่อมเยา, สามารถจ่ายได้", "shopping", "B1", "This bookstore provides high-quality reference books at affordable prices.", "ร้านหนังสือแห่งนี้มีหนังสืออ้างอิงคุณภาพสูงในราคาย่อมเยาจับต้องได้"),
  ("warranty", "n.", "/ˈwɒr.ən.ti/", "วอ-รัน-ตี", "ใบรับประกันสินค้า", "shopping", "B1", "The laptop comes with a two-year hardware replacement warranty.", "แล็ปท็อปเครื่องนี้มาพร้อมกับการรับประกันการเปลี่ยนอะไหล่นานสองปี"),
  ("currency", "n.", "/ˈkʌr.ən.si/", "เคอร์-เริน-ซี", "สกุลเงินตรา", "shopping", "B1", "The Thai Baht is the official currency of Thailand.", "เงินบาทคือสกุลเงินตราอย่างเป็นทางการของประเทศไทย"),
  ("cashier", "n.", "/kæʃˈɪər/", "แคช-เชียร์", "พนักงานเก็บเงิน, แคชเชียร์", "shopping", "A2", "Hand your selected items to the cashier at the checkout counter.", "ส่งสิ่งของที่คุณเลือกให้แก่พนักงานเก็บเงินที่เคาน์เตอร์ชำระเงิน"),

  # 💼 7. CAREER & LEADERSHIP
  ("profession", "n.", "/prəˈfeʃ.ən/", "โพร-เฟช-เชิน", "วิชาชีพ, อาชีพการงาน", "work", "B1", "Teaching is a noble profession that shapes the nation's future.", "วิชาชีพครูเป็นอาชีพที่มีเกียรติและช่วยหล่อหลอมอนาคตของชาติ"),
  ("candidate", "n.", "/ˈkæn.dɪ.dət/", "แคน-ดิ-เดท", "ผู้สมัคร, ผู้เข้าชิงตำแหน่ง", "work", "B2", "Top candidates demonstrated fluent English and sharp analytical skills.", "ผู้สมัครแถวหน้าแสดงทักษะภาษาอังกฤษที่คล่องแคล่วและการคิดวิเคราะห์ที่เฉียบคม"),
  ("colleague", "n.", "/ˈkɒl.iːɡ/", "คอล-ลีก", "เพื่อนร่วมงาน", "work", "B1", "She brainstorms creative lesson plans with her teaching colleagues.", "เธอระดมความคิดสร้างแผนการสอนใหม่ๆ ร่วมกับเพื่อนร่วมงานครู"),
  ("responsibility", "n.", "/rɪˌspɒn.sɪˈbɪl.ə.ti/", "ริ-สปอน-สิ-บิล-เลอะ-ที", "ความรับผิดชอบ", "work", "B1", "Class leaders have the responsibility to help keep peace in room.", "หัวหน้าห้องมีความรับผิดชอบในการช่วยดูแลความสงบเรียบร้อยในห้องเรียน"),
  ("achievement", "n.", "/əˈtʃiːv.mənt/", "เออะ-ชีฟ-เมิ้นท์", "ความสำเร็จ, ผลงานชิ้นเอก", "work", "B1", "Scoring first in national Olympiad was his greatest academic achievement.", "การคว้าอันดับหนึ่งในโอลิมปิกระดับชาติคือความสำเร็จทางวิชาการที่ยิ่งใหญ่ที่สุดของเขา"),
  ("interview", "n.", "/ˈɪn.tə.vjuː/", "อิน-เทอร์-วิว", "การสัมภาษณ์งานหรือการเข้าเรียน", "work", "B1", "Practice your spoken English thoroughly before attending the M.1 interview.", "ฝึกฝนการพูดภาษาอังกฤษให้คล่องก่อนเข้ารับการสัมภาษณ์สอบเข้า ม.1"),
  ("promotion", "n.", "/prəˈmoʊ.ʃən/", "โพร-โม-เชิน", "การเลื่อนตำแหน่ง, การส่งเสริม", "work", "B1", "Hard work and dedication led to his rapid promotion as department head.", "ความขยันและการทุ่มเททำให้เขาได้รับการเลื่อนตำแหน่งเป็นหัวหน้าหมวดอย่างรวดเร็ว"),
  ("salary", "n.", "/ˈsæl.ər.i/", "แซล-เลอะ-รี", "เงินเดือน", "work", "B1", "Engineers and software developers often earn competitive salaries.", "วิศวกรและนักพัฒนาซอฟต์แวร์มักได้รับเงินเดือนที่น่าดึงดูดใจ"),
  ("efficiency", "n.", "/ɪˈfɪʃ.ən.si/", "อิฟ-ฟิช-เชิน-ซี", "ประสิทธิภาพในการทำงาน", "work", "B2", "Using flashcards dramatically increases your study efficiency.", "การใช้แฟลชการ์ดช่วยเพิ่มประสิทธิภาพในการอ่านหนังสือของคุณได้อย่างก้าวกระโดด"),

  # 🌿 8. ECOLOGY & NATURE
  ("environment", "n.", "/ɪnˈvaɪ.rən.mənt/", "อิน-ไว-รอน-เมิ้นท์", "สิ่งแวดล้อม", "nature", "B1", "Planting trees helps protect our environment from global warming.", "การปลูกต้นไม้ช่วยปกป้องสิ่งแวดล้อมของเราจากภาวะโลกร้อน"),
  ("ecosystem", "n.", "/ˈiː.koʊˌsɪs.təm/", "อี-โค-ซิส-เทิม", "ระบบนิเวศ", "nature", "B2", "Coral reefs are the most diverse marine ecosystems on Earth.", "แนวปะการังเป็นระบบนิเวศทางทะเลที่มีความหลากหลายทางชีวภาพมากที่สุดในโลก"),
  ("atmosphere", "n.", "/ˈæt.məs.fɪər/", "แอท-มัส-เฟียร์", "ชั้นบรรยากาศ", "nature", "B1", "The Earth's atmosphere shields all living creatures from harmful solar rays.", "ชั้นบรรยากาศของโลกช่วยปกป้องสิ่งมีชีวิตทั้งมวลจากรังสีสุริยะที่เป็นอันตราย"),
  ("conservation", "n.", "/ˌkɒn.səˈveɪ.ʃən/", "คอน-เซอ-เว-เชิน", "การอนุรักษ์ธรรมชาติ", "nature", "B2", "Wildlife conservation efforts have saved the giant panda from extinction.", "ความพยายามในการอนุรักษ์สัตว์ป่าช่วยให้หมีแพนด้ายักษ์รอดพ้นจากการสูญพันธุ์"),
  ("pollution", "n.", "/pəˈluː.ʃən/", "เพอะ-ลู-เชิน", "มลพิษ", "nature", "A2", "Air pollution from vehicles causes respiratory problems in big cities.", "มลพิษทางอากาศจากยานพาหนะก่อให้เกิดปัญหาระบบทางเดินหายใจในเมืองใหญ่"),
  ("species", "n.", "/ˈspiː.ʃiːz/", "สปี-ชีส์", "สปีชีส์, สายพันธุ์สิ่งมีชีวิต", "nature", "B1", "Scientists discovered a brand-new frog species in the tropical rainforest.", "นักวิทยาศาสตร์ค้นพบกบสายพันธุ์ใหม่เอี่ยมในป่าดิบชื้น"),
  ("habitat", "n.", "/ˈhæb.ɪ.tæt/", "แฮบ-บิ-แทท", "ถิ่นที่อยู่อาศัยตามธรรมชาติ", "nature", "B1", "Polar bears depend on sea ice as their vital hunting habitat.", "หมีขั้วโลกพึ่งพาน้ำแข็งในทะเลเป็นถิ่นที่อยู่อาศัยและแหล่งล่าเหยื่อที่สำคัญ"),
  ("endangered", "adj.", "/ɪnˈdeɪn.dʒəd/", "อิน-เดน-เจอร์ด", "ตกอยู่ในภาวะใกล้สูญพันธุ์", "nature", "B1", "The Siamese crocodile is one of the most endangered reptiles in Thailand.", "จระเข้น้ำจืดพันธุ์สยามเป็นหนึ่งในสัตว์เลื้อยคลานที่ใกล้สูญพันธุ์ที่สุดในไทย"),
  ("renewable", "adj.", "/rɪˈnjuː.ə.bəl/", "ริ-นิว-เออะ-เบิล", "หมุนเวียนใช้ใหม่ได้", "nature", "B2", "Solar and wind energy are clean renewable resources.", "พลังงานแสงอาทิตย์และพลังงานลมเป็นทรัพยากรหมุนเวียนที่สะอาด"),
  ("climate", "n.", "/ˈklaɪ.mət/", "ไคล-เมิท", "สภาพภูมิอากาศ", "nature", "A2", "Thailand has a tropical climate with high temperatures year-round.", "ประเทศไทยมีสภาพภูมิอากาศแบบร้อนชื้นและมีอุณหภูมิสูงตลอดทั้งปี"),

  # 💻 9. TECH, AI & SCIENCE
  ("algorithm", "n.", "/ˈæl.ɡə.rɪ.ðəm/", "แอล-เกอะ-ริ-เธิม", "อัลกอริทึม, ขั้นตอนวิธีประมวลผล", "tech", "B2", "Social media algorithms recommend videos based on your watch history.", "อัลกอริทึมของโซเชียลมีเดียจะแนะนำวิดีโอตามประวัติการรับชมของคุณ"),
  ("artificial", "adj.", "/ˌɑː.tɪˈfɪʃ.əl/", "อาร์-ทิ-ฟิช-เชิล", "เทียม, ประดิษฐ์ขึ้น (AI)", "tech", "B1", "Artificial Intelligence helps students analyze tricky math equations instantly.", "ปัญญาประดิษฐ์ (AI) ช่วยให้นักเรียนวิเคราะห์โจทย์คณิตศาสตร์ที่ซับซ้อนได้ทันที"),
  ("database", "n.", "/ˈdeɪ.tə.beɪs/", "เด-เทอะ-เบส", "ฐานข้อมูล", "tech", "B1", "The school database securely stores student test scores and attendance.", "ฐานข้อมูลของโรงเรียนจัดเก็บผลคะแนนสอบและการเข้าเรียนของนักเรียนอย่างปลอดภัย"),
  ("gadget", "n.", "/ˈɡædʒ.ɪt/", "แกด-เจ็ต", "อุปกรณ์พกพา, แกดเจ็ตสุดล้ำ", "tech", "B1", "Smartwatches are popular gadgets that track daily steps and heart rate.", "สมาร์ตวอทช์เป็นแกดเจ็ตยอดนิยมที่คอยบันทึกจำนวนก้าวและอัตราการเต้นของหัวใจ"),
  ("interactive", "adj.", "/ˌɪn.təˈræk.tɪv/", "อิน-เทอร์-แอก-ทิฟ", "ที่มีการโต้ตอบสองทาง", "tech", "B2", "Interactive simulations make learning abstract physics concepts fun.", "แบบจำลองที่มีการโต้ตอบสองทางทำให้การเรียนรู้ฟิสิกส์เชิงนามธรรมกลายเป็นเรื่องสนุก"),
  ("software", "n.", "/ˈsɒft.weər/", "ซอฟท์-แวร์", "ซอฟต์แวร์, โปรแกรมคอมพิวเตอร์", "tech", "A2", "Install the educational software to access free interactive flashcards.", "ติดตั้งโปรแกรมเพื่อการศึกษาเพื่อเข้าถึงแฟลชการ์ดอินเทอร์แอคทีฟฟรี"),
  ("simulation", "n.", "/ˌsɪm.jəˈleɪ.ʃən/", "ซิม-มิว-เล-เชิน", "การจำลองสถานการณ์เสมือนจริง", "tech", "B2", "Flight simulations train pilots to handle severe turbulence safely.", "การจำลองการบินฝึกฝนให้นักบินรับมือกับสภาพอากาศแปรปรวนได้อย่างปลอดภัย"),
  ("virtual", "adj.", "/ˈvɜː.tʃu.əl/", "เวอร์-ชู-เอิล", "เสมือนจริง (Virtual Lab)", "tech", "B1", "Our virtual science lab lets students mix chemicals safely on a screen.", "ห้องแล็บวิทยาศาสตร์เสมือนจริงของเราช่วยให้นักเรียนผสมสารเคมีได้อย่างปลอดภัยบนหน้าจอ"),
  ("wireless", "adj.", "/ˈwaɪə.ləs/", "ไวร์-เลิส", "ไร้สาย", "tech", "A2", "Connect your headphones via wireless Bluetooth technology.", "เชื่อมต่อหูฟังของคุณผ่านเทคโนโลยีบลูทูธไร้สาย"),

  # 🗣️ 10. COMMUNICATION & SOCIETY
  ("announcement", "n.", "/əˈnaʊns.mənt/", "เออะ-เนาส์-เมิ้นท์", "ประกาศ, ข้อความแจ้งเตือน", "communication", "B1", "Listen carefully to the principal's morning announcement.", "ตั้งใจฟังประกาศตอนเช้าจากอาจารย์ใหญ่ให้ดี"),
  ("discussion", "n.", "/dɪˈskʌʃ.ən/", "ดิส-คัช-เชิน", "การอภิปราย, การพูดคุยแลกเปลี่ยน", "communication", "A2", "We had a lively class discussion on renewable clean energy.", "พวกเรามีการอภิปรายในชั้นเรียนอย่างคึกคักในหัวข้อพลังงานสะอาดหมุนเวียน"),
  ("persuade", "v.", "/pəˈsweɪd/", "เพอะ-สเวด", "ชักชวน, โน้มน้าวใจ", "communication", "B1", "He persuaded his friend to join the school debate team.", "เขาโน้มน้าวใจเพื่อนให้มาร่วมทีมโต้วาทีของโรงเรียน"),
  ("opinion", "n.", "/əˈpɪn.jən/", "เออะ-พิน-เยิน", "ความคิดเห็น", "communication", "A2", "In my opinion, solving mock exams regularly is the key to success.", "ในความคิดเห็นของฉัน การทำข้อสอบจำลองสม่ำเสมอคือกุญแจสู่ความสำเร็จ"),
  ("feedback", "n.", "/ˈfiːd.bæk/", "ฟีด-แบ็ก", "ผลตอบรับ, คำติชมเพื่อการพัฒนา", "communication", "B1", "Constructive feedback from your teacher helps you polish your writing.", "คำแนะนำติชมเชิงสร้างสรรค์จากคุณครูช่วยให้คุณขัดเกลางานเขียนได้ดีขึ้น"),
  ("fluent", "adj.", "/ˈfluː.ənt/", "ฟลู-เอิ้นท์", "คล่องแคล่ว, ลื่นไหล (ภาษา)", "communication", "B1", "She speaks fluent English after two years of consistent daily practice.", "เธอพูดภาษาอังกฤษได้อย่างคล่องแคล่วหลังจากฝึกฝนสม่ำเสมอทุกวันมาสองปี"),
  ("dialogue", "n.", "/ˈdaɪ.ə.lɒɡ/", "ได-เออะ-ล็อก", "บทสนทนาโต้ตอบ", "communication", "A2", "Practice the dialogue with your partner to improve pronunciation.", "ฝึกซ้อมบทสนทนากับคู่ของคุณเพื่อปรับปรุงการออกเสียงให้ดียิ่งขึ้น"),
  ("translate", "v.", "/trænzˈleɪt/", "แตรนซ-เลท", "แปลภาษา", "communication", "A2", "Can you help me translate this Thai proverb into native English?", "คุณช่วยฉันแปลสุภาษิตไทยบทนี้ให้เป็นภาษาอังกฤษที่สละสลวยได้ไหม"),

  # ⚡ 11. PHRASAL VERBS & IDIOMS
  ("give up", "phr.", "/ɡɪv ʌp/", "กิฟ-อัพ", "ยอมแพ้, ละทิ้งความพยายาม", "phrasal", "A2", "Never give up; difficult roads often lead to beautiful destinations.", "อย่ายอมแพ้เด็ดขาด เส้นทางที่ยากลำบากมักนำไปสู่จุดหมายที่งดงามเสมอ"),
  ("look after", "phr.", "/lʊk ˈɑːf.tər/", "ลุค-อาฟ-เทอร์", "ดูแลเอาใจใส่", "phrasal", "A2", "Big brother looks after his little sister while mom is cooking.", "พี่ชายคอยดูแลน้องสาวตัวน้อยในขณะที่คุณแม่กำลังทำอาหาร"),
  ("carry on", "phr.", "/ˈkær.i ɒn/", "แค-รี-ออน", "ทำต่อไป, ดำเนินการต่อ", "phrasal", "B1", "Carry on with your practice quiz; do not let distractions stop you.", "ทำแบบทดสอบของคุณต่อไป อย่าปล่อยให้สิ่งรบกวนมาหยุดคุณได้"),
  ("figure out", "phr.", "/ˈfɪɡ.ər aʊt/", "ฟิก-เกอร์-เอาท์", "คิดออก, หาคำตอบได้", "phrasal", "B1", "He spent ten minutes figuring out the tricky algebra puzzle.", "เขาใช้เวลาสิบนาทีในการหาคำตอบของปริศนาพีชคณิตที่ยากข้อนี้"),
  ("run out of", "phr.", "/rʌn aʊt əv/", "รัน-เอาท์-เอิฟ", "หมดเกลี้ยง, ขาดแคลน", "phrasal", "B1", "The car stopped because it had run out of fuel.", "รถยนต์ดับลงเพราะน้ำมันเชื้อเพลิงหมดเกลี้ยง"),
  ("put off", "phr.", "/pʊt ɒf/", "พุท-ออฟ", "เลื่อนเวลาออกไป", "phrasal", "B1", "Never put off until tomorrow what you can achieve today.", "อย่าเลื่อนสิ่งที่ทำได้ในวันนี้ออกไปเป็นวันพรุ่งนี้"),
  ("call off", "phr.", "/kɔːl ɒf/", "คอล-ออฟ", "ยกเลิก (Cancel)", "phrasal", "B1", "The football match was called off because of heavy thunderstorms.", "การแข่งขันฟุตบอลถูกยกเลิกเนื่องจากพายุฝนฟ้าคะนองที่รุนแรง"),
  ("catch up with", "phr.", "/kætʃ ʌp wɪð/", "แคทช-อัพ-วิธ", "ตามทัน, ไล่ตามทัน", "phrasal", "B1", "If you study hard this weekend, you can easily catch up with the class.", "ถ้าคุณตั้งใจอ่านหนังสือในวันหยุดนี้ คุณจะสามารถตามบทเรียนในห้องทันได้อย่างสบาย"),
  ("break down", "phr.", "/breɪk daʊn/", "เบรก-ดาวน์", "เสีย, พัง, สติแตก", "phrasal", "A2", "The school bus broke down, so students walked safely on the sidewalk.", "รถโรงเรียนเสีย นักเรียนจึงเดินอย่างปลอดภัยบนทางเท้า"),
  ("bring up", "phr.", "/brɪŋ ʌp/", "บริง-อัพ", "หยิบยกประเด็นขึ้นมาพูด, เลี้ยงดูสั่งสอน", "phrasal", "B2", "She brought up an interesting question about gravitational waves.", "เธอหยิบยกคำถามที่น่าสนใจเรื่องคลื่นความโน้มถ่วงขึ้นมาพูดคุย"),
  ("turn down", "phr.", "/tɜːn daʊn/", "เทิร์น-ดาวน์", "ปฏิเสธ (ข้อเสนอ), หรี่เสียงลง", "phrasal", "B2", "He turned down the job offer to pursue full-time graduate studies.", "เขาปฏิเสธข้อเสนองานเพื่อไปศึกษาต่อระดับบัณฑิตศึกษาเต็มเวลา"),
  ("look forward to", "phr.", "/lʊk ˈfɔː.wəd tuː/", "ลุค-ฟอร์-เวิร์ด-ทู", "ตั้งตารอคอย (ตามด้วย V.ing เสมอ!)", "phrasal", "B1", "We are all looking forward to joining the annual science exhibition.", "พวกเราทุกคนต่างตั้งตารอคอยที่จะได้เข้าร่วมงานนิทรรศการวิทยาศาสตร์ประจำปี"),
  ("get along with", "phr.", "/ɡet əˈlɒŋ wɪð/", "เก็ต-เออะ-ลอง-วิธ", "เข้ากันได้ดีกับผู้อื่น", "phrasal", "B1", "He gets along very well with all of his classmates and teachers.", "เขาเข้ากันได้ดีมากๆ กับเพื่อนร่วมชั้นและคุณครูทุกคน"),
  ("count on", "phr.", "/kaʊnt ɒn/", "เคาท์-ออน", "พึ่งพาได้, ไว้ใจได้", "phrasal", "B1", "You can always count on your parents for unconditional love and support.", "คุณสามารถพึ่งพาความรักและกำลังใจอันไร้เงื่อนไขจากพ่อแม่ได้เสมอ"),
  ("come across", "phr.", "/kʌm əˈkrɒs/", "คัม-เออะ-ครอส", "พบเจอโดยบังเอิญ", "phrasal", "B1", "While reading the old encyclopedia, I came across a rare historic photograph.", "ในขณะที่อ่านสารานุกรมเล่มเก่า ฉันบังเอิญไปพบภาพถ่ายประวัติศาสตร์ที่หาดูได้ยากเข้าพอดี"),
  ("make up for", "phr.", "/meɪk ʌp fɔːr/", "เมก-อัพ-ฟอร์", "ชดเชยสิ่งที่ขาดหายไป", "phrasal", "B2", "She practiced extra hours on weekends to make up for lost time.", "เธอฝึกซ้อมเพิ่มขึ้นในช่วงวันหยุดสุดสัปดาห์เพื่อชดเชยเวลาที่สูญเสียไป"),
  ("stand for", "phr.", "/stænd fɔːr/", "สแตนด์-ฟอร์", "ย่อมาจาก, เป็นตัวแทนของ", "phrasal", "A2", "What does the acronym UNESCO stand for in world affairs?", "คำย่อ UNESCO ย่อมาจากคำว่าอะไรในกิจการระดับโลก"),
  ("take off", "phr.", "/teɪk ɒf/", "เทก-ออฟ", "เครื่องบินบินขึ้น, ถอดเสื้อผ้าออก", "phrasal", "A2", "The airplane took off smoothly into the clear blue sky.", "เครื่องบินบินขึ้นสู่ท้องฟ้าสีครามสดใสได้อย่างนุ่มนวลราบรื่น"),
  ("warm up", "phr.", "/wɔːm ʌp/", "วอร์ม-อัพ", "อบอุ่นร่างกายก่อนออกกำลังกาย", "phrasal", "A2", "Always warm up for 10 minutes to prevent muscle injury.", "อบอุ่นร่างกาย 10 นาทีก่อนออกกำลังกายเสมอเพื่อป้องกันการบาดเจ็บของกล้ามเนื้อ"),
  ("show off", "phr.", "/ʃoʊ ɒf/", "โชว์-ออฟ", "อวด, ขี้อวด", "phrasal", "B1", "A truly wise student never shows off their achievements arrogantly.", "นักเรียนที่ฉลาดอย่างแท้จริงจะไม่โอ้อวดความสำเร็จของตนอย่างหยิ่งยโส")
]

# Read existing 64 words to merge!
import re
with open("src/lib/oxford-3000-data.ts", "r", encoding="utf-8") as f:
    old_content = f.read()

pattern = re.compile(r"\{\s*id:\s*'[^']+',\s*word:\s*'([^']+)',\s*pos:\s*'([^']+)',\s*phonetic:\s*'([^']+)',\s*thaiPhonetic:\s*'([^']+)',\s*meaning:\s*'([^']+)',\s*category:\s*'([^']+)',\s*level:\s*'([^']+)',\s*example:\s*'([^']+)',\s*exampleTh:\s*'([^']+)'\s*\}", re.DOTALL)

merged = []
seen = set()

# First add existing words
for m in pattern.finditer(old_content):
    w = m.group(1).strip()
    key = w.lower()
    if key not in seen:
        seen.add(key)
        merged.append((w, m.group(2), m.group(3), m.group(4), m.group(5), m.group(6), m.group(7), m.group(8), m.group(9)))

# Then add RAW_DATA words
for item in RAW_DATA:
    w = item[0].strip()
    key = w.lower()
    if key not in seen:
        seen.add(key)
        merged.append(item)

print(f"Total merged vocabulary count: {len(merged)}")

header = """export interface VocabItem {
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
"""

items_ts = []
for idx, item in enumerate(merged, start=1):
    w, pos, phonetic, thaiPhonetic, meaning, cat, lvl, ex, exTh = item
    ex_clean = ex.replace("'", "\\'")
    th_clean = exTh.replace("'", "\\'")
    mean_clean = meaning.replace("'", "\\'")
    entry = f"""  {{
    id: 'v_{idx}',
    word: '{w}',
    pos: '{pos}',
    phonetic: '{phonetic}',
    thaiPhonetic: '{thaiPhonetic}',
    meaning: '{mean_clean}',
    category: '{cat}',
    level: '{lvl}',
    example: '{ex_clean}',
    exampleTh: '{th_clean}'
  }}"""
    items_ts.append(entry)

full_ts = header + ",\n".join(items_ts) + "\n]\n"

with open("src/lib/oxford-3000-data.ts", "w", encoding="utf-8") as f:
    f.write(full_ts)

print(f"Successfully wrote {len(items_ts)} items to src/lib/oxford-3000-data.ts!")
