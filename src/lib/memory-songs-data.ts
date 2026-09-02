/**
 * MASTER ม.1 — Interactive Memory Songs & Formula Rhymes (คลังเพลงจำสูตรลัด ม.1)
 * รวบรวมเพลงและกลอนท่องจำสูตรลัด 4 วิชาหลัก พร้อม Audio/Video Prompts สำหรับ AiPASS AI Generator
 */

export interface MemorySong {
  id: string
  title: string
  subject: 'math' | 'science' | 'english' | 'thai'
  subjectLabel: string
  badgeColor: string
  icon: string
  bpm: number
  genre: string
  formulaTopic: string
  catchphrase: string
  lyrics: {
    section: 'Intro' | 'Verse 1' | 'Chorus (สูตรลัด)' | 'Verse 2' | 'Outro'
    lines: string[]
  }[]
  speedTechnique: string
  trapToAvoid: string
  aipassMusicPrompt: string
  aipassVideoPrompt: string
}

export const MEMORY_SONGS_DATA: MemorySong[] = [
  {
    id: 'song_math_speed',
    title: 'เพลงสูตรลัด 3 วินาที (Speed Math Anthem)',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    badgeColor: 'bg-orange-500 text-white',
    icon: '⚡',
    bpm: 120,
    genre: 'Upbeat Synth-Pop / Energetic EDM',
    formulaTopic: 'ยกกำลังสองเลขลงท้าย 5 & พื้นที่ใบไม้แรเงา',
    catchphrase: 'ตัดสองตัวท้าย ส่องหลักหน่วย ตอบได้ใน 3 วิ!',
    lyrics: [
      {
        section: 'Verse 1',
        lines: [
          'เจอเลขลงท้ายด้วยห้า อยากยกกำลังสอง ไม่ต้องไปนั่งคูณให้เหงื่อตก',
          'มองตัวข้างหน้าคูณตัวถัดไป แล้วแปะยี่สิบห้าไว้ข้างหลังทันที!'
        ]
      },
      {
        section: 'Chorus (สูตรลัด)',
        lines: [
          'แปดสิบห้ากำลังสอง... แปดคูณเก้าได้เจ็ดสิบสอง!',
          'ต่อท้ายด้วยยี่สิบห้า กลายเป็น 7,225 ในสามวิ!',
          'สี่เหลี่ยมด้าน a อยากหาใบไม้แรเงา...',
          'จำสูตรมหาเทพไว้ เศษสี่ส่วนเจ็ด a ยกกำลังสอง!',
          '4/7 a กำลังสอง กาช้อยส์ฉลุย ไม่ต้องเสียเวลาลบพื้นที่!'
        ]
      },
      {
        section: 'Verse 2',
        lines: [
          'แผนภูมิวงกลม แปลงเปอร์เซ็นต์เป็นมุมองศา',
          'เอาเปอร์เซ็นต์ตั้ง คูณ 3.6 องศา ได้มุมวงกลมเป๊ะๆ ทันใจ!'
        ]
      },
      {
        section: 'Outro',
        lines: [
          'MASTER ม.1 เลขคิดเร็ว ไม่ใช่เรื่องยาก แค่รู้สูตรลัดก็พร้อมสอบติด!'
        ]
      }
    ],
    speedTechnique: 'เลขลงท้าย 5: n5² = [n × (n+1)]25 | ใบไม้แรเงา = (4/7)a² | แปลงมุมวงกลม = % × 3.6°',
    trapToAvoid: 'อย่าลืมว่าสูตรใบไม้ (4/7)a² ใช้ได้เฉพาะเมื่อใบไม้แนบในสี่เหลี่ยมจัตุรัสด้านยาวเท่ากันเท่านั้น!',
    aipassMusicPrompt: 'Upbeat energetic Thai educational synth-pop, 120 BPM, catchy rhythmic vocal cadence, bright synthesizers, punchy modern dance beat, enthusiastic and clear Thai singing voice explaining speed math shortcuts.',
    aipassVideoPrompt: 'Cute 3D animated schoolboy solving glowing math equations in floating digital space, colorful neon numbers multiplying smoothly, dynamic camera zoom, Studio Ghibli meets Pixar futuristic high-tech classroom style, 4K resolution.'
  },
  {
    id: 'song_sci_heat',
    title: 'เพลงพลังงานความร้อน Q = mcΔt',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    badgeColor: 'bg-emerald-600 text-white',
    icon: '🔥',
    bpm: 110,
    genre: 'Lo-Fi Chill Hop / Melodic Pop',
    formulaTopic: 'การคำนวณความร้อนเปลี่ยนอุณหภูมิและเปลี่ยนสถานะ',
    catchphrase: 'อุณหภูมิเปลี่ยนใช้ mcΔt สถานะเปลี่ยนใช้ mL!',
    lyrics: [
      {
        section: 'Verse 1',
        lines: [
          'ความร้อนไหลเวียน ถ่ายโอนจากที่ร้อนไปสู่ที่เย็น',
          'นำความร้อนในของแข็ง พาความร้อนในของเหลวและแก๊ส',
          'แผ่รังสีเป็นคลื่นแม่เหล็ก ไม่ต้องง้อตัวกลางใดๆ เลย'
        ]
      },
      {
        section: 'Chorus (สูตรลัด)',
        lines: [
          'อุณหภูมิเปลี่ยน... ให้เรียกหา Q เท่ากับ mcΔt (ไมค์ เดลต้า ที)!',
          'มวลคูณความจุความร้อน จำเพาะคูณอุณหภูมิที่เปลี่ยนไป',
          'แต่ถ้าสถานะเปลี่ยน แต่อุณหภูมิไม่เปลี่ยนเลยหนา...',
          'สลับมาใช้ Q เท่ากับ mL ความร้อนแฝงทันที!',
          'แฝงหลอมเหลว 80 แคลอรี่ แฝงกลายเป็นไอ 540 แคลอรี่ต่อกรัม!'
        ]
      },
      {
        section: 'Verse 2',
        lines: [
          'น้ำแข็งศูนย์องศา กลายเป็นน้ำศูนย์องศา ใช้ mL',
          'น้ำศูนย์องศา ร้อนขึ้นเป็นร้อย ใช้ mcΔt ชัวร์ปึ้ก!'
        ]
      },
      {
        section: 'Outro',
        lines: [
          'จำสองสูตรนี้ได้ ข้อสอบฟิสิกส์ ม.1 เต็มร้อยแน่นอน!'
        ]
      }
    ],
    speedTechnique: 'ΔT เปลี่ยน ➔ Q = mcΔt | สถานะเปลี่ยน (T คงที่) ➔ Q = mL (หลอมเหลว L=80, กลายเป็นไอ L=540)',
    trapToAvoid: 'ระวังหน่วยมวล m กับความจุความร้อน c ถ้าโจทย์ให้หน่วยกิโลกรัม (kg) ต้องแปลงเป็นกรัม (g) ให้ตรงกันก่อนคูณ!',
    aipassMusicPrompt: 'Catchy melodic Lo-Fi chillhop with warm guitar and smooth acoustic drums, 110 BPM, gentle friendly tutor voice singing in Thai, rhythmic educational melody about heat formulas Q=mcΔt and Q=mL.',
    aipassVideoPrompt: 'An ice cube melting into clear glowing water drops then turning into sparkling steam under a friendly microscope lens, vibrant 3D infographic animations showing heat energy molecules bouncing, Disney Pixar style.'
  },
  {
    id: 'song_eng_ifclause',
    title: 'เพลง 4 สเต็ป If-Clause ในตำนาน',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    badgeColor: 'bg-blue-600 text-white',
    icon: '🇬🇧',
    bpm: 124,
    genre: 'Catchy Bubblegum Pop / K-Pop Beat',
    formulaTopic: 'Conditional Sentences (Type 0, 1, 2, 3)',
    catchphrase: 'จำคู่กริยา หน้าคู่หลัง ไม่มีวันโดน สทศ. หลอก!',
    lyrics: [
      {
        section: 'Intro',
        lines: [
          'If you know the rule, you will pass the test!'
        ]
      },
      {
        section: 'Verse 1',
        lines: [
          'ศูนย์: จริงเสมอตามธรรมชาติ If Present, Present',
          'หนึ่ง: เป็นไปได้ในอนาคต If Present, Will บวก V.inf'
        ]
      },
      {
        section: 'Chorus (สูตรลัด)',
        lines: [
          'สอง: สมมติฝันกลางวัน... If Past Simple (V.2), Would บวก กริยาช่องเดิม!',
          'จำไว้เลยประธานเอกพจน์ ยังต้องใช้ Were ในโลกจินตนาการ!',
          'สาม: เสียดายอดีตที่แก้ไม่ได้... If Had บวก V.3, Would have บวก V.3!',
          'จำ 0-1-2-3 เป็นจังหวะ กาข้อสอบช้อยส์ไหนก็ไม่มีพลาด!'
        ]
      },
      {
        section: 'Outro',
        lines: [
          'If I study hard, I will enter my dream school! สอบติด ม.1 แน่นอน!'
        ]
      }
    ],
    speedTechnique: 'Type 0 (V.1 ➔ V.1) | Type 1 (V.1 ➔ will + V.inf) | Type 2 (V.2 [were] ➔ would + V.inf) | Type 3 (had V.3 ➔ would have V.3)',
    trapToAvoid: 'Type 2 ในข้อสอบทางการ แม้ประธานจะเป็น He/She/I ก็ต้องใช้ were เช่น "If I were you..." ห้ามเผลอตอบ was เด็ดขาด!',
    aipassMusicPrompt: 'Upbeat K-Pop inspired bubblegum pop, energetic female & male vocal harmonies in Thai and English, bouncy bassline, clapping drums, 124 BPM, fun educational song explaining If-Clause types 0, 1, 2, 3 clearly.',
    aipassVideoPrompt: 'Animated cheerful teenagers singing in a futuristic bright English classroom, comic book pop-art graphics popping up with grammar formulas (If + Present -> Will + V1), vibrant pastel aesthetic.'
  },
  {
    id: 'song_thai_samasa',
    title: 'เพลงคำสมาส-สนธิ ชนแล้วเชื่อม',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    badgeColor: 'bg-rose-600 text-white',
    icon: '📖',
    bpm: 115,
    genre: 'Thai Acoustic Folk Pop',
    formulaTopic: 'หลักการสังเกตคำสมาสและคำสนธิ',
    catchphrase: 'สมาสชน สนธิเชื่อม แปลจากหลังมาหน้า!',
    lyrics: [
      {
        section: 'Verse 1',
        lines: [
          'คำบาลีสันสกฤตสองคำ มารวมกันสร้างคำใหม่',
          'ถ้าแค่เอามาชนกันตรงๆ เรียกว่าคำสมาส',
          'แปลความหมายจากหลังมาหน้าเสมอ และห้ามใส่สระอะ หรือทัณฑฆาตตรงรอยต่อ!'
        ]
      },
      {
        section: 'Chorus (สูตรลัด)',
        lines: [
          'สมาสชน... สนธิเชื่อม ท่องไว้เลยเพื่อนเอ๋ย!',
          'สมาสชน เช่น ภูมิศาสตร์ (ภูมิ + ศาสตร์), ศิลปกรรม (ศิลปะ + กรรม)',
          'ส่วนสนธิเชื่อม คือตัดสระหน้า แล้วกลืนเสียงเข้าหาคำหลัง!',
          'กายะ บวก อินทรีย์ กลายเป็น กายินทรีย์ เชื่อมเสียงสระอิ!',
          'สมาสชน สนธิเชื่อม สทศ. หลอกไม่ได้อีกต่อไป!'
        ]
      },
      {
        section: 'Outro',
        lines: [
          'จำหลักนี้ไว้ ภาษาไทย O-NET กวาดคะแนนเต็มได้สบายๆ!'
        ]
      }
    ],
    speedTechnique: 'สมาส = นำคำบาลี-สันสกฤตมาชนกัน (แปลหลังมาหน้า) | สนธิ = มีการเชื่อมเสียง กลืนสระ/พยัญชนะ/นฤคหิต เป็นคำใหม่',
    trapToAvoid: 'คำที่มีภาษาไทยปน เช่น "ผลไม้" (ผล = บาลี, ไม้ = ไทย) เป็นคำประสม ไม่ใช่คำสมาสเด็ดขาด!',
    aipassMusicPrompt: 'Pleasant Thai acoustic pop with gentle acoustic guitar, traditional Thai flute accent, melodious cheerful vocals, 115 BPM, clear pronunciation of Thai language grammar rules.',
    aipassVideoPrompt: 'Hand-drawn watercolor Thai calligraphy blending into glowing 3D letters, animated ancient palm-leaf scriptures transforming into modern golden books, soft warm lighting, Thai cultural elegance.'
  }
]
