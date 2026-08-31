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
    
    const totalDone = stats?.totalDone || 0
    const mathDone = stats?.mathDone || 0
    const mathAvg = stats?.mathAvg ?? stats?.avgScore ?? 0
    const scienceDone = stats?.scienceDone || 0
    const englishDone = stats?.englishDone || 0
    const thaiDone = stats?.thaiDone || 0

    // Compute honest baseline readiness
    let baselineReadiness = 10
    if (totalDone > 0) {
      baselineReadiness = Math.min(100, Math.round(((totalDone / 56) * 40) + ((stats?.avgScore || 0) * 0.6)))
    }

    let defaultStrengths = [
      totalDone > 0 
        ? `เริ่มต้นก้าวแรกในการทำแบบฝึกหัดวิชาคณิตศาสตร์เรื่องเศษส่วนและทศนิยม`
        : 'มีความพร้อมในการเริ่มต้นเรียนรู้ตามแผนการเรียนอัจฉริยะ 4 วิชา',
      'มีเป้าหมายที่ชัดเจนในการสอบเข้า ม.1 ห้องเรียนพิเศษ Gifted / SMP / EP'
    ]

    let defaultWeaknesses = [
      mathAvg < 70 
        ? `ทบทวนความแม่นยำในวิชาคณิตศาสตร์เรื่องเศษส่วน (คะแนนปัจจุบัน ${mathAvg}%) โดยเฉพาะการตัดทอนและเปรียบเทียบค่า`
        : 'ฝึกฝนทำข้อสอบอย่างสม่ำเสมอเพื่อรักษามาตรฐานความเร็ว',
      totalDone < 10 
        ? `ยังมีบทเรียนคงเหลืออีก ${56 - totalDone} บทที่ยังไม่ได้เริ่มเรียน (วิทยาศาสตร์, ภาษาอังกฤษ, ภาษาไทย)`
        : 'ฝึกทำข้อสอบจับเวลาชุดสมบูรณ์'
    ]

    let analysisResult = {
      studentName,
      isFortune: isVipFortune,
      overallReadiness: baselineReadiness,
      gradeLevelPrediction: totalDone > 20 ? 'ม.1 ห้องเรียนพิเศษ (Gifted & SMP)' : 'กำลังปูพื้นฐานสู่ ม.1 Gifted',
      strengths: defaultStrengths,
      weaknesses: defaultWeaknesses,
      giftedRecommendation: isVipFortune 
        ? 'เน้นเก็บสะสมบทเรียนคณิตศาสตร์และวิทยาศาสตร์วันละ 1-2 บทอย่างสม่ำเสมอ เพื่อสร้างฐานคะแนน 80%+ และปูทางสู่สายวิชาชีพเภสัชศาสตร์ในอนาคต'
        : 'แนะนำให้เริ่มทำแบบฝึกหัดอย่างเป็นระบบทีละวิชา สัปดาห์ละ 3-4 วัน',
      parentCoachingTip: isVipFortune
        ? '“คุณพ่อสามารถชื่นชมในความตั้งใจเริ่มต้นของน้องฟอร์จูน และให้กำลังใจให้น้องลองทำแบบฝึกหัดเศษส่วนซ้ำอีกครั้ง พ่อเชื่อมั่นในศักยภาพลูก 100%”'
        : '“ผู้ปกครองควรให้กำลังใจเชิงบวก ชื่นชมความพยายาม และกระตุ้นให้น้องฝึกฝนวันละนิดอย่างสม่ำเสมอ”',
      generatedAt: new Date().toISOString()
    }

    // If Gemini API is available, generate dynamic customized diagnosis based on REAL data
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' })
        const prompt = [
          'คุณคือหัวหน้านักจิตวิทยาการศึกษาและผู้อำนวยการฝ่ายวิชาการของ MASTER ม.1',
          `กรุณาวิเคราะห์จุดแข็ง-จุดอ่อนและจัดทำแผนการเรียนเฉพาะบุคคลของนักเรียน โดยอ้างอิงจาก "ข้อมูลจริงที่บันทึกในระบบเท่านั้น (ห้ามสมมุติข้อมูลที่ไม่มีจริง)":`,
          `- ชื่อนักเรียน: ${studentName} (${isVipFortune ? 'ด.ช.ภูมิรพีร์ มากแก้ว / น้องฟอร์จูน เป้าหมาย: สอบเข้า ม.1 Gifted สู่ เภสัชกร' : 'นักเรียนทั่วไป'})`,
          `- ข้อมูลการเรียนจริง: ทำแล้ว ${totalDone}/56 บท (คณิต ${mathDone}/16 ได้ ${mathAvg}%, วิทย์ ${scienceDone}/16, อังกฤษ ${englishDone}/16, ไทย ${thaiDone}/8)`,
          `- ประวัติการทำล่าสุด: ${JSON.stringify(recentHistory?.slice(0, 3) || [])}`,
          '',
          'กติกาสำคัญ: หากนักเรียนเพิ่งทำไป 1 บทหรือยังไม่เริ่มวิชาใด ให้สะท้อนความเป็นจริงอย่างตรงไปตรงมา และแนะนำขั้นตอนก้าวแรกที่ถูกต้อง ไม่ยกยอเกินจริง',
          'ตอบกลับเป็นรูปแบบ JSON ภาษาไทยเท่านั้น:',
          '{',
          '  "overallReadiness": 35,',
          '  "gradeLevelPrediction": "ระดับความพร้อมสอบเข้า ม.1",',
          '  "strengths": ["จุดเริ่มต้น/จุดแข็งจริง 1", "จุดแข็งจริง 2"],',
          '  "weaknesses": ["จุดที่ต้องเสริมด่วน 1", "จุดที่ต้องเริ่มเรียน 2"],',
          '  "giftedRecommendation": "คำแนะนำกลยุทธ์ตามสถานะจริง",',
          '  "parentCoachingTip": "คำแนะนำสำหรับผู้ปกครองในการโค้ชชิ่งน้องตามสถานการณ์จริง"',
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
