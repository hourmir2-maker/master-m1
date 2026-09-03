# -*- coding: utf-8 -*-
import re

ADDITIONAL_WORDS = [
  # 🏠 DAILY & HOME
  ("refrigerator", "n.", "/rɪˈfrɪdʒ.ə.reɪ.tər/", "ริ-ฟริด-เจอะ-เร-เทอร์", "ตู้เย็น", "daily", "A1", "Store fresh milk and cheese in the refrigerator.", "เก็บนมสดและชีสไว้ในตู้เย็น"),
  ("microwave", "n.", "/ˈmaɪ.krə.weɪv/", "ไม-โคร-เวฟ", "เตาไมโครเวฟ", "daily", "A2", "He heated the soup in the microwave for two minutes.", "เขาอุ่นซุปในเตาไมโครเวฟเป็นเวลาสองนาที"),
  ("scissors", "n.", "/ˈsɪz.əz/", "ซิส-เซอร์ซ", "กรรไกร (เป็นพหูพจน์เสมอ มี s)", "daily", "A1", "Use safety scissors to cut the craft paper neatly.", "ใช้กรรไกรนิรภัยตัดกระดาษประดิษฐ์ให้เรียบร้อย"),
  ("envelope", "n.", "/ˈen.və.loʊp/", "เอน-เวอะ-โลพ", "ซองจดหมาย", "daily", "A2", "Seal the handwritten letter inside a stamped envelope.", "ปิดผนึกจดหมายที่เขียนด้วยมือลงในซองจดหมายที่ติดแสตมป์"),
  ("umbrella", "n.", "/ʌmˈbrel.ə/", "อัม-เบรล-เลอะ", "ร่มกันฝน", "daily", "A1", "Take an umbrella because the sky looks overcast.", "พกร่มไปด้วยเพราะท้องฟ้าดูมืดครึ้ม"),
  ("thermometer", "n.", "/θəˈmɒm.ɪ.tər/", "เธอ-มอม-มิ-เทอร์", "เทอร์โมมิเตอร์, ปรอทวัดอุณหภูมิ", "daily", "A2", "The digital thermometer showed a body temperature of 37°C.", "เทอร์โมมิเตอร์ดิจิทัลแสดงอุณหภูมิร่างกาย 37 องศาเซลเซียส"),
  ("flashlight", "n.", "/ˈflæʃ.laɪt/", "แฟลช-ไลท์", "ไฟฉาย", "daily", "A2", "We used a bright LED flashlight during the power outage.", "เราใช้ไฟฉายแอลอีดีสว่างจ้าในระหว่างที่ไฟฟ้าดับ"),
  ("battery", "n.", "/ˈbæt.ər.i/", "แบต-เตอะ-รี", "แบตเตอรี่, ถ่านไฟฉาย", "daily", "A2", "Replace the dead batteries in the wall clock.", "เปลี่ยนถ่านที่หมดแล้วในนาฬิกาแขวนผนัง"),
  ("briefcase", "n.", "/ˈbriːf.keɪs/", "บรีฟ-เคส", "กระเป๋าใส่เอกสาร", "daily", "B1", "The lawyer opened his leather briefcase to review the contract.", "ทนายความเปิดกระเป๋าหนังใส่เอกสารเพื่อตรวจดูสัญญา"),
  ("wardrobe", "n.", "/ˈwɔː.droʊb/", "วอร์ด-โรบ", "ตู้เสื้อผ้า", "daily", "A2", "Hang your ironed school uniforms neatly in the wardrobe.", "แขวนชุดนักเรียนที่รีดแล้วให้เรียบร้อยในตู้เสื้อผ้า"),

  # 🏫 EDUCATION & ACADEMICS
  ("geography", "n.", "/dʒiˈɒɡ.rə.fi/", "จิ-ออก-เกรอะ-ฟี", "วิชาภูมิศาสตร์", "school", "A2", "We learned about world continents and oceans in geography class.", "พวกเราได้เรียนรู้เกี่ยวกับทวีปและมหาสมุทรของโลกในวิชาภูมิศาสตร์"),
  ("history", "n.", "/ˈhɪs.tər.i/", "ฮิส-เทอะ-รี", "วิชาประวัติศาสตร์", "school", "A2", "History teaches us how human societies evolved over centuries.", "ประวัติศาสตร์สอนให้เรารู้ว่าสังคมมนุษย์มีวิวัฒนาการอย่างไรตลอดหลายศตวรรษ"),
  ("mathematics", "n.", "/ˌmæθˈmæt.ɪks/", "แมธ-เธอะ-แมท-ติกส์", "วิชาคณิตศาสตร์", "school", "A2", "Mathematics trains your logical deduction and problem-solving skills.", "คณิตศาสตร์ฝึกฝนการคิดหาเหตุผลและการแก้ปัญหาของคุณ"),
  ("literature", "n.", "/ˈlɪt.rə.tʃər/", "ลิต-เทรอะ-เชอร์", "วรรณคดี, วรรณกรรม", "school", "B1", "Shakespeare wrote classic literature that is still read today.", "เชกสเปียร์เขียนวรรณกรรมคลาสสิกที่ยังคงมีผู้อ่านมาจนถึงทุกวันนี้"),
  ("physics", "n.", "/ˈfɪz.ɪks/", "ฟิส-ซิกส์", "วิชาฟิสิกส์", "school", "B1", "Physics explains the laws of motion, gravity, and electricity.", "ฟิสิกส์อธิบายกฎแห่งการเคลื่อนที่ แรงโน้มถ่วง และไฟฟ้า"),
  ("chemistry", "n.", "/ˈkem.ɪ.stri/", "เคม-มิ-สตรี", "วิชาเคมี", "school", "B1", "In chemistry lab, we observed the reaction between acid and base.", "ในห้องแล็บเคมี เราสังเกตปฏิกิริยาระหว่างกรดและเบส"),
  ("biology", "n.", "/baɪˈɒl.ə.dʒi/", "ไบ-ออล-เลอะ-จี", "วิชาชีววิทยา", "school", "B1", "Biology explores living organisms, animal cells, and plant tissues.", "ชีววิทยาสำรวจสิ่งมีชีวิต เซลล์สัตว์ และเนื้อเยื่อพืช"),
  ("geometry", "n.", "/dʒiˈɒm.ə.tri/", "จิ-ออม-เมอะ-ตรี", "เรขาคณิต", "school", "B1", "Geometry deals with angles, triangles, circles, and 3D shapes.", "เรขาคณิตเกี่ยวข้องกับมุม รูปสามเหลี่ยม วงกลม และรูปทรงสามมิติ"),
  ("telescope", "n.", "/ˈtel.ɪ.skoʊp/", "เทล-ลิ-สโคพ", "กล้องโทรทรรศน์", "school", "A2", "Astronomers look through giant telescopes to observe distant galaxies.", "นักดาราศาสตร์มองผ่านกล้องโทรทรรศน์ขนาดยักษ์เพื่อสังเกตดาราจักรที่อยู่ห่างไกล"),
  ("microscope", "n.", "/ˈmaɪ.krə.skoʊp/", "ไม-โคร-สโคพ", "กล้องจุลทรรศน์", "school", "A2", "Place the thin onion cell slide under the optical microscope.", "วางแผ่นสไลด์เซลล์หัวหอมบางๆ ใต้กล้องจุลทรรศน์แบบใช้แสง"),

  # 😊 EMOTIONS & PSYCHOLOGY
  ("polite", "adj.", "/pəˈlaɪt/", "เพอะ-ไลท์", "สุภาพ, มีมารยาท", "feelings", "A1", "It is always good manners to be polite to elders.", "การมีมารยาทสุภาพต่อผู้อาวุโสถือเป็นสิ่งที่ดีงามเสมอ"),
  ("rude", "adj.", "/ruːd/", "รูด", "หยาบคาย, ไร้มารยาท", "feelings", "A2", "Interrupting someone while they are speaking is considered rude.", "การขัดจังหวะผู้อื่นขณะที่พวกเขากำลังพูดถือเป็นการเสียมารยาท"),
  ("clumsy", "adj.", "/ˈklʌm.zi/", "คลัม-ซี", "ซุ่มซ่าม, เงอะงะ", "feelings", "B1", "He felt clumsy when he accidentally dropped his pencil case.", "เขารู้สึกซุ่มซ่ามเมื่อทำกล่องดินสอตกโดยไม่ได้ตั้งใจ"),
  ("cautious", "adj.", "/ˈkɔː.ʃəs/", "คอ-เชิส", "รอบคอบ, ระมัดระวัง", "feelings", "B1", "Be cautious when crossing the busy multi-lane highway.", "จงระมัดระวังรอบคอบเมื่อข้ามถนนทางหลวงหลายเลนที่พลุกพล่าน"),
  ("arrogant", "adj.", "/ˈær.ə.ɡənt/", "แอ-เรอะ-เกิ้นท์", "หยิ่งยะโส, หลงตัวเอง", "feelings", "B2", "Nobody likes an arrogant winner who mocks others' efforts.", "ไม่มีใครชอบผู้ชนะที่หยิ่งยะโสและเยาะเย้ยความพยายามของผู้อื่น"),
  ("sensible", "adj.", "/ˈsen.sə.bəl/", "เซน-ซิ-เบิล", "มีเหตุผล, ฉลาดคิด", "feelings", "B1", "It is sensible to save a portion of your pocket money each week.", "เป็นความคิดที่มีเหตุผลที่จะเก็บออมเงินค่าขนมส่วนหนึ่งไว้ทุกสัปดาห์"),
  ("stubborn", "adj.", "/ˈstʌb.ən/", "สตับ-เบิร์น", "ดื้อรั้น, หัวแข็ง", "feelings", "B1", "He was too stubborn to accept helpful advice from his tutor.", "เขาดื้อรั้นเกินกว่าจะยอมรับคำแนะนำที่เป็นประโยชน์จากติวเตอร์"),
  ("obedient", "adj.", "/oʊˈbiː.di.ənt/", "โอ-บี-เดี้ยนท์", "เชื่อฟัง, ว่านอนสอนง่าย", "feelings", "B1", "The well-trained guide dog is completely obedient to its blind owner.", "สุนัขนำทางที่ฝึกมาเป็นอย่างดีเชื่อฟังเจ้าของที่พิการทางสายตาอย่างเคร่งครัด"),
  ("cheerful", "adj.", "/ˈtʃɪə.fəl/", "เชียร์-ฟูล", "ร่าเริง, แจ่มใส", "feelings", "A2", "Her cheerful smile brightens up the whole classroom.", "รอยยิ้มที่สดใสของเธอทำให้ห้องเรียนทั้งห้องสว่างไสวขึ้นมา"),
  ("miserable", "adj.", "/ˈmɪz.ər.ə.bəl/", "มิส-เซอะ-เรอะ-เบิล", "ทุกข์ทรมาน, อมทุกข์", "feelings", "B1", "Catching the cold on a rainy day made him feel miserable.", "การเป็นหวัดในวันที่ฝนตกทำให้เขารู้สึกทุกข์ทรมานมาก"),

  # 🥗 FOOD & MEDICINE
  ("carbohydrate", "n.", "/ˌkɑː.boʊˈhaɪ.dreɪt/", "คาร์-โบ-ไฮ-เดรท", "คาร์โบไฮเดรต (แป้งและน้ำตาล)", "food_health", "B1", "Rice, noodles, and bread are rich sources of carbohydrates.", "ข้าว ก๋วยเตี๋ยว และขนมปังเป็นแหล่งคาร์โบไฮเดรตที่อุดมสมบูรณ์"),
  ("protein", "n.", "/ˈproʊ.tiːn/", "โปร-ทีน", "โปรตีน (สร้างกล้ามเนื้อและซ่อมแซม)", "food_health", "A2", "Eggs, fish, and tofu contain high-quality protein for growth.", "ไข่ ปลา และเต้าหู้มีโปรตีนคุณภาพสูงสำหรับการเจริญเติบโต"),
  ("mineral", "n.", "/ˈmɪn.ər.əl/", "มิน-เนอะ-เริล", "เกลือแร่, แร่ธาตุ", "food_health", "B1", "Milk provides essential calcium and vital minerals for strong bones.", "นมให้แคลเซียมและเกลือแร่ที่จำเป็นสำหรับกระดูกที่แข็งแรง"),
  ("delicious", "adj.", "/dɪˈlɪʃ.əs/", "ดิ-ลิช-เชิส", "อร่อยมาก", "food_health", "A1", "Mom cooked a delicious bowl of chicken noodle soup.", "คุณแม่ทำก๋วยเตี๋ยวไก่ชามที่อร่อยมากๆ"),
  ("bitter", "adj.", "/ˈbɪt.ər/", "บิท-เทอร์", "ขม (รสชาติ)", "food_health", "A2", "Dark chocolate and black coffee have a naturally bitter taste.", "ดาร์กช็อกโกแลตและกาแฟดำมีรสขมตามธรรมชาติ"),
  ("sour", "adj.", "/saʊər/", "ซาว-เออร์", "เปรี้ยว", "food_health", "A2", "Fresh lime juice tastes extremely sour but refreshes the throat.", "น้ำมะนาวสดมีรสเปรี้ยวจี๊ดแต่ช่วยให้ชุ่มคอสดชื่น"),
  ("spicy", "adj.", "/ˈspaɪ.si/", "สไป-ซี", "เผ็ดร้อน, รสจัด", "food_health", "A1", "Tom Yum Goong is a world-famous spicy and sour Thai soup.", "ต้มยำกุ้งเป็นต้มยำรสเผ็ดเปรี้ยวที่มีชื่อเสียงระดับโลกของไทย"),
  ("crispy", "adj.", "/ˈkrɪs.pi/", "คริส-ปี", "กรอบ (อาหาร)", "food_health", "A2", "The fried chicken skin was delightfully golden and crispy.", "หนังไก่ทอดมีสีเหลืองทองและกรอบอร่อยน่ารับประทาน"),
  ("bandage", "n.", "/ˈbæn.dɪdʒ/", "แบน-ดิดจ", "ผ้าพันแผล", "food_health", "A2", "The school nurse wrapped a sterile bandage around his scraped knee.", "พยาบาลประจำโรงเรียนพันผ้าพันแผลปลอดเชื้อรอบหัวเข่าที่ถลอกของเขา"),
  ("skeleton", "n.", "/ˈskel.ə.tən/", "สเกล-เลอะ-เทิน", "โครงกระดูก", "food_health", "B1", "The human skeleton consists of 206 individual bones.", "โครงกระดูกของมนุษย์ประกอบด้วยกระดูกทั้งหมด 206 ชิ้น"),

  # ✈️ TRAVEL & LOGISTICS
  ("roundabout", "n.", "/ˈraʊnd.ə.baʊt/", "ราวนด์-เออะ-เบาท์", "วงเวียนการจราจร", "travel", "B1", "Take the second exit when driving through the traffic roundabout.", "ใช้ทางออกที่สองเมื่อขับรถผ่านวงเวียนจราจร"),
  ("intersection", "n.", "/ˌɪn.təˈsek.ʃən/", "อิน-เทอร์-เซก-เชิน", "สี่แยก, จุดตัดของถนน", "travel", "B1", "Vehicles must stop behind the white line at the busy intersection.", "ยานพาหนะต้องหยุดหลังเส้นสีขาวตรงสี่แยกที่มีการจราจรคับคั่ง"),
  ("skyscraper", "n.", "/ˈskaɪˌskreɪ.pər/", "สกาย-สเคร-เปอร์", "ตึกระฟ้า, อาคารสูงเสียดฟ้า", "travel", "B1", "Bangkok is filled with breathtaking modern skyscrapers.", "กรุงเทพมหานครเต็มไปด้วยตึกระฟ้าที่ทันสมัยและสวยงามตระการตา"),
  ("pedestrian", "n.", "/pəˈdes.tri.ən/", "เพอะ-เดส-เทรียน", "คนเดินเท้า (Pedestrian Crossing = ทางม้าลาย)", "travel", "B1", "Motorists must yield to pedestrians at the zebra crossing.", "ผู้ขับขี่ต้องหยุดให้คนเดินเท้าข้ามทางม้าลายเสมอ"),
  ("vehicle", "n.", "/ˈviː.ɪ.kəl/", "วี-อิ-เคิล", "ยานพาหนะ", "travel", "B1", "Electric vehicles help reduce greenhouse gas emissions in cities.", "ยานพาหนะไฟฟ้าช่วยลดการปล่อยก๊าซเรือนกระจกในเมือง"),
  ("monument", "n.", "/ˈmɒn.jə.mənt/", "มอน-ยู-เมิ้นท์", "อนุสาวรีย์", "travel", "B1", "Victory Monument is a major transit hub in central Bangkok.", "อนุสาวรีย์ชัยสมรภูมิเป็นศูนย์กลางการคมนาคมที่สำคัญใจกลางกรุงเทพฯ"),
  ("museum", "n.", "/mjuːˈziː.əm/", "มิว-ซี-เอิม", "พิพิธภัณฑ์", "travel", "A1", "Students visited the national science museum on their annual field trip.", "นักเรียนไปเยี่ยมชมพิพิธภัณฑ์วิทยาศาสตร์แห่งชาติในทัศนศึกษาประจำปี"),
  ("landmark", "n.", "/ˈlænd.mɑːk/", "แลนด์-มาร์ก", "จุดสังเกตเด่น, สถานที่สำคัญที่เป็นสัญลักษณ์", "travel", "B1", "The Grand Palace is Thailand's most revered cultural landmark.", "พระบรมมหาราชวังเป็นสถานที่สำคัญทางวัฒนธรรมที่ได้รับการเคารพสูงสุดของไทย"),
  ("commuter", "n.", "/kəˈmjuː.tər/", "เคอะ-มิว-เทอร์", "ผู้เดินทางไปกลับทำงานทุกวัน", "travel", "B2", "Thousands of daily commuters ride the sky train every morning.", "ผู้เดินทางหลายพันคนโดยสารรถไฟฟ้าบีทีเอสทุกเช้า"),
  ("navigator", "n.", "/ˈnæv.ɪ.ɡeɪ.tər/", "แนฟ-วิ-เก-เทอร์", "ผู้นำทาง, ระบบนำทาง GPS", "travel", "B1", "GPS navigators calculate the fastest route to avoid traffic jams.", "ระบบนำทางจีพีเอสช่วยคำนวณเส้นทางที่เร็วที่สุดเพื่อหลีกเลี่ยงรถติด"),

  # 💼 CAREER & LEADERSHIP
  ("architect", "n.", "/ˈɑː.kɪ.tekt/", "อาร์-คิ-เทกท์", "สถาปนิก (ผู้ออกแบบอาคาร)", "work", "B1", "The architect drew innovative 3D blueprints for the smart school.", "สถาปนิกวาดพิมพ์เขียวสามมิติสุดล้ำสำหรับโรงเรียนอัจฉริยะ"),
  ("journalist", "n.", "/ˈdʒɜː.nə.lɪst/", "เจอร์-เนอะ-ลิสท์", "นักข่าว, ผู้สื่อข่าว", "work", "B1", "The investigative journalist interviewed eyewitnesses at the scene.", "นักข่าวเชิงสืบสวนได้สัมภาษณ์พยานผู้เห็นเหตุการณ์ในที่เกิดเหตุ"),
  ("veterinarian", "n.", "/ˌvet.ər.ɪˈneə.ri.ən/", "เวท-เทริน-แน-เรียน", "สัตวแพทย์ (มักย่อว่า Vet)", "work", "B1", "Take your injured puppy to the veterinarian for emergency treatment.", "พาลูกสุนัขที่ได้รับบาดเจ็บไปพบสัตวแพทย์เพื่อรับการรักษาฉุกเฉิน"),
  ("astronaut", "n.", "/ˈæs.trə.nɔːt/", "แอส-โทร-นอท", "นักบินอวกาศ", "work", "A2", "Astronauts conduct biological experiments aboard the International Space Station.", "นักบินอวกาศทำการทดลองทางชีววิทยาบนสถานีอวกาศนานาชาติ"),
  ("paramedic", "n.", "/ˌpær.əˈmed.ɪk/", "แพ-เรอะ-เมด-ดิก", "เจ้าหน้าที่กู้ชีพฉุกเฉิน", "work", "B2", "Paramedics administered first aid to the passengers before the ambulance arrived.", "เจ้าหน้าที่กู้ชีพได้ปฐมพยาบาลผู้โดยสารก่อนที่รถพยาบาลจะมาถึง"),
  ("technician", "n.", "/tekˈnɪʃ.ən/", "เทก-นิช-เชิน", "ช่างเทคนิค", "work", "B1", "A certified technician inspected the school computer lab network.", "ช่างเทคนิคผู้เชี่ยวชาญได้ตรวจสอบระบบเครือข่ายของห้องคอมพิวเตอร์โรงเรียน"),
  ("detective", "n.", "/dɪˈtek.tɪv/", "ดิ-เทก-ทิฟ", "นักสืบ", "work", "A2", "The clever detective analyzed subtle fingerprints left on the glass window.", "นักสืบผู้ชาญฉลาดวิเคราะห์รอยนิ้วมือบางๆ ที่ทิ้งไว้บนหน้าต่างกระจก"),
  ("accountant", "n.", "/əˈkaʊn.tənt/", "เออะ-เคาท์-เทิ้นท์", "นักบัญชี", "work", "B1", "The accountant verified every single financial transaction in the ledger.", "นักบัญชีตรวจสอบทุกธุรกรรมทางการเงินในสมุดบัญชีอย่างละเอียด"),
  ("librarian", "n.", "/laɪˈbreə.ri.ən/", "ไล-แบร-เรียน", "บรรณารักษ์ห้องสมุด", "work", "A2", "The kind librarian recommended a fantastic science fiction book to me.", "บรรณารักษ์ใจดีแนะนำหนังสือนวนิยายวิทยาศาสตร์ที่ยอดเยี่ยมเล่มหนึ่งให้ฉัน"),
  ("manager", "n.", "/ˈmæn.ɪ.dʒər/", "แมน-นิด-เจอร์", "ผู้จัดการ", "work", "A2", "The project manager led the team to complete the task before deadline.", "ผู้จัดการโครงการนำทีมทำงานจนสำเร็จลุล่วงก่อนกำหนดส่ง"),

  # 🌿 ECOLOGY & NATURE
  ("mammal", "n.", "/ˈmæm.əl/", "แมม-เมิล", "สัตว์เลี้ยงลูกด้วยนม", "nature", "B1", "Whales and dolphins are warm-blooded mammals that breathe with lungs.", "วาฬและโลมาเป็นสัตว์เลี้ยงลูกด้วยนมเลือดอุ่นที่หายใจด้วยปอด"),
  ("reptile", "n.", "/ˈrep.taɪl/", "เรพ-ไทล์", "สัตว์เลื้อยคลาน", "nature", "B1", "Snakes, turtles, and lizards are cold-blooded reptiles with scaly skin.", "งู เต่า และกิ้งก่าเป็นสัตว์เลื้อยคลานเลือดเย็นที่มีผิวหนังเป็นเกล็ด"),
  ("amphibian", "n.", "/æmˈfɪb.i.ən/", "แอม-ฟิบ-เบียน", "สัตว์สะเทินน้ำสะเทินบก", "nature", "B2", "Frogs and toads are amphibians that live both in water and on land.", "กบและคางคกเป็นสัตว์สะเทินน้ำสะเทินบกที่อาศัยอยู่ได้ทั้งในน้ำและบนบก"),
  ("predator", "n.", "/ˈpred.ə.tər/", "เพรด-เดอะ-เทอร์", "ผู้ล่าในห่วงโซ่อาหาร", "nature", "B1", "Eagles are apex aerial predators that hunt small rodents from above.", "นกอินทรีเป็นผู้ล่าเวหาชั้นยอดที่ล่าสัตว์ฟันแทะขนาดเล็กจากเบื้องบน"),
  ("herbivore", "n.", "/ˈhɜː.bɪ.vɔːr/", "เฮอร์-บิ-วอร์", "สัตว์กินพืช", "nature", "B2", "Elephants, giraffes, and deer are giant herbivores.", "ช้าง ยีราฟ และกวางเป็นสัตว์กินพืชขนาดใหญ่"),
  ("camouflage", "n.", "/ˈkæm.ə.flɑːʒ/", "แค-เมอะ-ฟลาฌ", "การพรางตัวตามธรรมชาติ", "nature", "B2", "The chameleon changes skin colors as an ingenious camouflage mechanism.", "กิ้งก่าคาเมเลียนเปลี่ยนสีผิวเพื่อเป็นกลไกการพรางตัวอันชาญฉลาด"),
  ("migration", "n.", "/maɪˈɡreɪ.ʃən/", "ไม-เกร-เชิน", "การอพยพย้ายถิ่นฐานตามฤดูกาล", "nature", "B2", "Seasonal bird migration covers thousands of kilometers across continents.", "การอพยพตามฤดูกาลของนกครอบคลุมระยะทางหลายพันกิโลเมตรข้ามทวีป"),
  ("hibernate", "v.", "/ˈhaɪ.bə.neɪt/", "ไฮ-เบอร์-เนท", "จำศีลในฤดูหนาว", "nature", "B2", "Grizzly bears hibernate inside cozy mountain caves during freezing winters.", "หมีกริซลีจำศีลอยู่ในถ้ำบนภูเขาอันอบอุ่นในช่วงฤดูหนาวที่เยือกแข็ง"),
  ("photosynthesis", "n.", "/ˌfoʊ.toʊˈsɪn.θə.sɪs/", "โฟ-โต-ซิน-เธอ-ซิส", "การสังเคราะห์ด้วยแสงของพืช", "nature", "B1", "Green chlorophyll captures sunlight to fuel the process of photosynthesis.", "คลอโรฟิลล์สีเขียวดูดกลืนแสงแดดเพื่อขับเคลื่อนกระบวนการสังเคราะห์ด้วยแสง"),
  ("earthquake", "n.", "/ˈɜːθ.kweɪk/", "เอิร์ธ-เควก", "แผ่นดินไหว", "nature", "A2", "Modern tall buildings are engineered to withstand powerful earthquakes.", "อาคารสูงสมัยใหม่ได้รับการออกแบบทางวิศวกรรมให้ต้านทานแผ่นดินไหวที่รุนแรงได้")
]

# Read src/lib/oxford-3000-data.ts
with open("src/lib/oxford-3000-data.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Match all existing items
pattern = re.compile(r"\{\s*id:\s*'[^']+',\s*word:\s*'([^']+)',\s*pos:\s*'([^']+)',\s*phonetic:\s*'([^']+)',\s*thaiPhonetic:\s*'([^']+)',\s*meaning:\s*'([^']+)',\s*category:\s*'([^']+)',\s*level:\s*'([^']+)',\s*example:\s*'([^']+)',\s*exampleTh:\s*'([^']+)'\s*\}", re.DOTALL)

all_items = []
seen = set()

for m in pattern.finditer(text):
    w = m.group(1).strip()
    key = w.lower()
    if key not in seen:
        seen.add(key)
        all_items.append((w, m.group(2), m.group(3), m.group(4), m.group(5), m.group(6), m.group(7), m.group(8), m.group(9)))

added = 0
for item in ADDITIONAL_WORDS:
    w = item[0].strip()
    key = w.lower()
    if key not in seen:
        seen.add(key)
        all_items.append(item)
        added += 1

print(f"Added {added} new words. Total now: {len(all_items)}")

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
for idx, item in enumerate(all_items, start=1):
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

print(f"Successfully generated {len(items_ts)} total vocabulary words in src/lib/oxford-3000-data.ts!")
