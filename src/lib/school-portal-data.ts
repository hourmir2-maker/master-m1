/**
 * MASTER ม.1 — School Portal Data Engine
 * ระบบจัดการข้อมูลโรงเรียน ห้องเรียน งานมอบหมาย และการวิเคราะห์ตัวชี้วัด สพฐ.
 */

export interface SchoolInfo {
  id: string
  schoolCode: string
  schoolName: string
  province: string
  affiliation: string
  academicYear: string
}

export interface ClassroomInfo {
  id: string
  schoolId: string
  classCode: string
  gradeLevel: 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'm1'
  gradeNameTh: string
  roomName: string
  teacherName: string
  studentCount: number
}

export interface SchoolAssignment {
  id: string
  classroomId: string
  title: string
  subject: 'math' | 'science' | 'thai' | 'english'
  examType: 'RT' | 'NT' | 'ONET' | 'ENTRANCE_M1' | 'CUSTOM'
  totalQuestions: number
  durationMinutes: number
  dueDate: string
  isActive: boolean
}

export interface StudentSubmission {
  id: string
  assignmentId: string
  studentNumber: number
  studentName: string
  score: number
  maxScore: number
  percentage: number
  submittedAt: string
  indicatorStrengths: string[] // ตัวชี้วัดที่ทำได้ดี
  indicatorDeficiencies: string[] // ตัวชี้วัดที่ต้องเร่งซ่อมเสริม
}

// ข้อมูลเริ่มต้นจำลอง (Mock / Fallback) พร้อมใช้งาน
export const SAMPLE_SCHOOL: SchoolInfo = {
  id: 'school_demo_1',
  schoolCode: 'DEMO-SCHOOL',
  schoolName: 'โรงเรียนอนุบาลสาธิตศึกษา (สพฐ.)',
  province: 'กรุงเทพมหานคร',
  affiliation: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)',
  academicYear: '2569 - 2570'
}

export const SAMPLE_CLASSROOMS: ClassroomInfo[] = [
  {
    id: 'cls_p6_1',
    schoolId: 'school_demo_1',
    classCode: 'DEMO-P601',
    gradeLevel: 'p6',
    gradeNameTh: 'ประถมศึกษาปีที่ 6',
    roomName: 'ห้อง ป.6/1 (ห้องเตรียมสอบ O-NET)',
    teacherName: 'คุณครูวิชาการ ป.6',
    studentCount: 35
  },
  {
    id: 'cls_p6_2',
    schoolId: 'school_demo_1',
    classCode: 'DEMO-P602',
    gradeLevel: 'p6',
    gradeNameTh: 'ประถมศึกษาปีที่ 6',
    roomName: 'ห้อง ป.6/2',
    teacherName: 'คุณครูประจำชั้น ป.6/2',
    studentCount: 32
  },
  {
    id: 'cls_p3_1',
    schoolId: 'school_demo_1',
    classCode: 'DEMO-P301',
    gradeLevel: 'p3',
    gradeNameTh: 'ประถมศึกษาปีที่ 3',
    roomName: 'ห้อง ป.3/1 (ห้องเตรียมสอบ NT)',
    teacherName: 'คุณครูประจำชั้น ป.3',
    studentCount: 30
  },
  {
    id: 'cls_p1_1',
    schoolId: 'school_demo_1',
    classCode: 'DEMO-P101',
    gradeLevel: 'p1',
    gradeNameTh: 'ประถมศึกษาปีที่ 1',
    roomName: 'ห้อง ป.1/1 (ห้องเตรียมสอบ RT)',
    teacherName: 'คุณครูประจำชั้น ป.1',
    studentCount: 28
  }
]

export const SAMPLE_ASSIGNMENTS: SchoolAssignment[] = [
  {
    id: 'asg_1',
    classroomId: 'cls_p6_1',
    title: '🎯 สอบจำลอง O-NET 2570: วิชาคณิตศาสตร์ (15 ข้อ)',
    subject: 'math',
    examType: 'ONET',
    totalQuestions: 15,
    durationMinutes: 60,
    dueDate: '2026-09-15',
    isActive: true
  },
  {
    id: 'asg_2',
    classroomId: 'cls_p6_1',
    title: '🔬 สอบจำลอง O-NET 2570: วิชาวิทยาศาสตร์ (20 ข้อ)',
    subject: 'science',
    examType: 'ONET',
    totalQuestions: 20,
    durationMinutes: 60,
    dueDate: '2026-09-20',
    isActive: true
  },
  {
    id: 'asg_3',
    classroomId: 'cls_p6_1',
    title: '📖 สอบจำลอง O-NET 2570: วิชาภาษาไทย (22 ข้อ)',
    subject: 'thai',
    examType: 'ONET',
    totalQuestions: 22,
    durationMinutes: 90,
    dueDate: '2026-09-25',
    isActive: true
  }
]

export const SAMPLE_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub_1',
    assignmentId: 'asg_1',
    studentNumber: 1,
    studentName: 'เด็กชายกิตติศักดิ์ พรหมดี',
    score: 87.5,
    maxScore: 100,
    percentage: 88,
    submittedAt: '2026-08-26 14:30',
    indicatorStrengths: ['ค 1.1 ป.6/1 (เศษส่วน)', 'ค 2.1 ป.6/2 (พื้นที่คางหมู)'],
    indicatorDeficiencies: ['ค 1.1 ป.6/4 (ห.ร.ม./ค.ร.น.)']
  },
  {
    id: 'sub_2',
    assignmentId: 'asg_1',
    studentNumber: 2,
    studentName: 'เด็กหญิงชลธิชา สิทธิโชค',
    score: 94.0,
    maxScore: 100,
    percentage: 94,
    submittedAt: '2026-08-26 14:45',
    indicatorStrengths: ['ค 1.1 ป.6/12 (ร้อยละ)', 'ค 2.1 ป.6/3 (วงกลม)'],
    indicatorDeficiencies: []
  },
  {
    id: 'sub_3',
    assignmentId: 'asg_1',
    studentNumber: 3,
    studentName: 'เด็กชายนพรัตน์ วงศ์สุวรรณ',
    score: 58.5,
    maxScore: 100,
    percentage: 59,
    submittedAt: '2026-08-26 15:10',
    indicatorStrengths: ['ค 3.1 ป.6/1 (แผนภูมิ)'],
    indicatorDeficiencies: ['ค 1.1 ป.6/4 (ห.ร.ม./ค.ร.น.)', 'ค 2.1 ป.6/3 (วงกลม)']
  },
  {
    id: 'sub_4',
    assignmentId: 'asg_1',
    studentNumber: 4,
    studentName: 'เด็กหญิงปานรวี แก้วมณี',
    score: 76.0,
    maxScore: 100,
    percentage: 76,
    submittedAt: '2026-08-26 15:20',
    indicatorStrengths: ['ค 1.2 ป.6/1 (แบบรูป)'],
    indicatorDeficiencies: ['ค 2.1 ป.6/1 (ปริมาตร)']
  }
]
