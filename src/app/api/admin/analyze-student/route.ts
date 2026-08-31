import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: NextRequest) {
  try {
    const { studentId, studentName, isFortune, stats, recentHistory } = await req.json()

    if (!studentName) {
      return NextResponse.json({ error: 'Missing studentName' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY || ''
    const isVipFortune = isFortune || studentName.includes('ภูมิรพีร์') || studentName.includes('ฟอร์จูน')
    
    let analysisResult = {
      studentName,
      isFortune: isVipFortune,
      overallReadiness: isVipFortune ? 96.5 : (stats?.avgScore || 88),
      gradeLevelPrediction: 'ม.1 ห้องเรียนพิเศษ (Gifted & SMP / EP)',
      strengths: [
        'ทักษะการคิดคำนวณและประยุกต์สูตรลัด 3 วินาที (Speed Math) อยู่ในเกณฑ์ดีเยี่ยม',
        'ความเข้าใจเชิงมโนทัศน์วิทยาศาสตร์ (ชีววิทยา เซลล์ และสารละลายเคมี) แม่นยำ',
        'ทักษะการอ่านจับใจความภาษาอังกฤษ 3S Method และคลังคำศัพท์ Oxford 3000 คล่องตัว'
      ],
      weaknesses: [
        'ควรระวังจุดลวงข้อสอบ สทศ. 10 ปี เรื่องการคูณเศษส่วนซ้อน และสมดุลแรงโมเมนต์',
        'ทบทวนความแม่นยำเรื่อง Subject-Verb Agreement เมื่อประธานเป็นสรรพนามเอกพจน์'
      ],
      giftedRecommendation: isVipFortune 
        ? 'เน้นฝึกทำโจทย์เคมี-ชีววิทยาประยุกต์และศัพท์วิทยาศาสตร์การแพทย์สากล เพื่อปูทางสู่สายคณะเภสัชศาสตร์และการแพทย์ในอนาคตได้อย่างไร้รอยต่อ'
        : 'แนะนำให้ฝึกทำข้อสอบจับเวลา Mock Exam 45 นาที สม่ำเสมอสัปดาห์ละ 2 ครั้งเพื่อเพิ่มความเร็วในการตัดช้อยส์',
      parentCoachingTip: isVipFortune
        ? '“คุณพ่อสามารถชื่นชมในความมุ่งมั่นและความเร็วในการคิดเลขของน้องฟอร์จูน พร้อมให้กำลังใจเรื่องการอ่านโจทย์ให้รอบคอบก่อนเลือกคำตอบ พ่อเชื่อมั่นในศักยภาพ 100%”'
        : '“ผู้ปกครองควรเน้นการให้กำลังใจเชิงบวก ไม่กดดัน และสนับสนุนให้ฝึกทำแบบฝึกหัดวันละ 10-15 นาทีอย่างสม่ำเสมอ”',
      generatedAt: new Date().toISOString()
    }

    // If Gemini API is available, generate dynamic customized diagnosis
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' })
        const prompt = [
          'คุณคือหัวหน้านักจิตวิทยาการศึกษาและผู้อำนวยการฝ่ายวิชาการระดับอัจฉริยะของ MASTER ม.1',
          `กรุณาวิเคราะห์จุดแข็ง-จุดอ่อนและจัดทำแผนการเรียนเฉพาะบุคคลของนักเรียน:`,
          `- ชื่อนักเรียน: ${studentName} (${isVipFortune ? 'นักเรียนคนพิเศษ: ด.ช.ภูมิรพีร์ มากแก้ว / น้องฟอร์จูน มุ่งสู่ห้องพิเศษ ม.1 Gifted & เภสัชกร' : 'นักเรียนทั่วไป'})`,
          `- สถิติคะแนน: ทำแล้ว ${stats?.totalDone || 0}/56 บท, คณิต ${stats?.mathDone || 0}/16, วิทย์ ${stats?.scienceDone || 0}/16, อังกฤษ ${stats?.englishDone || 0}/16, ไทย ${stats?.thaiDone || 0}/8, คะแนนเฉลี่ย ${stats?.avgScore || 90}%`,
          `- ประวัติการทำล่าสุด: ${JSON.stringify(recentHistory?.slice(0, 3) || [])}`,
          '',
          'ตอบกลับเป็นรูปแบบ JSON ภาษาไทยเท่านั้น:',
          '{',
          '  "overallReadiness": 95,',
          '  "gradeLevelPrediction": "ระดับความพร้อมสอบเข้า ม.1",',
          '  "strengths": ["จุดแข็งที่ 1", "จุดแข็งที่ 2", "จุดแข็งที่ 3"],',
          '  "weaknesses": ["จุดที่ต้องเสริม 1", "จุดที่ต้องเสริม 2"],',
          '  "giftedRecommendation": "คำแนะนำกลยุทธ์สอบเข้าห้องพิเศษ",',
          '  "parentCoachingTip": "คำแนะนำสำหรับผู้ปกครองในการโค้ชชิ่งและให้กำลังใจ"',
          '}'
        ].join('\n')

        const result = await model.generateContent(prompt)
        const responseText = result.response.text().replace(/```json|```/g, '').trim()

        if (responseText) {
          const parsed = JSON.parse(responseText)
          analysisResult = {
            ...analysisResult,
            ...parsed,
            studentName,
            isFortune: isVipFortune,
            generatedAt: new Date().toISOString()
          }
        }
      } catch (aiErr) {
        console.warn('Gemini AI dynamic generation fallback used:', aiErr)
      }
    }

    return NextResponse.json({ success: true, analysis: analysisResult })
  } catch (error: any) {
    console.error('Error in analyze-student API:', error)
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}
