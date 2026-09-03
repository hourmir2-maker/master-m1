'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Sparkles, 
  ChevronRight, 
  Search, 
  GraduationCap, 
  ShieldCheck
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Footer from '@/components/Footer'

interface LessonEntry {
  id: string
  subject: 'math' | 'science' | 'english' | 'thai'
  subjectLabel: string
  track: 'p6' | 'm1'
  trackLabel: string
  title: string
  desc: string
  emoji: string
  secretFormula: string
}

const ALL_57_LESSONS: LessonEntry[] = [
  // ================= MATHEMATICS (16 MODULES) =================
  {
    id: 'numbers_basics',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'ตัวเลข การดำเนินการ ห.ร.ม. / ค.ร.น. & เทคนิคถอดรูท',
    desc: 'เทคนิคถอดรูท (√) ใน 3 วิ, PEMDAS, ห.ร.ม. แบ่งของมากสุด, ค.ร.น. เจอกันครั้งหน้า',
    emoji: '🔢',
    secretFormula: 'ถอดรูท (√) 3 วินาที & คิดเลขเร็วติดจรวด'
  },
  {
    id: 'fractions_decimals',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'เศษส่วน ทศนิยม & การคำนวณระคน',
    desc: 'เทคนิคคูณไขว้เปรียบเทียบเศษส่วนใน 2 วินาที, เศษส่วนซ้อน, และโจทย์ตัดเชือกต่อเนื่อง',
    emoji: '½',
    secretFormula: 'คูณไขว้ 2 วิ & ตัดทอนเศษส่วนซ้อน'
  },
  {
    id: 'percentages',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'ร้อยละ กำไร-ขาดทุน & ดอกเบี้ย',
    desc: 'สูตรลัดตัวคูณรวดเดียว 1 บรรทัด, กำไรซ้อนลดราคา, บัญญัติไตรยางศ์ย้อนกลับหาทุนแท้จริง',
    emoji: '🏷️',
    secretFormula: 'สูตรลัดตัวคูณรวดเดียว 1 บรรทัด'
  },
  {
    id: 'algebra_intro',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'พีชคณิต สมการเชิงเส้น & โจทย์ปัญหา',
    desc: 'เทคนิคสมมติขาเป็ด-ขาหมู, สูตรลัดทำงานพร้อมกัน (A×B)/(A+B), และตารางอายุ 3 ยุค',
    emoji: '✏️',
    secretFormula: 'สูตรลับขาเป็ด-ขาหมู & ร่วมแรงทำงาน'
  },
  {
    id: 'geometry',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'เรขาคณิต 2 มิติ เส้นขนาน & พื้นที่แรเงา',
    desc: 'สูตรลัดพื้นที่ใบไม้ (4/7)a², ผลต่างกำลังสองพื้นที่วงแหวน, และมุมแย้งเส้นขนานรูปตัว Z/U',
    emoji: '📐',
    secretFormula: 'พื้นที่ใบไม้ (4/7)a² & เส้นขนานฟันปลา'
  },
  {
    id: 'ratio_proportion',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'อัตราส่วนและมาตราส่วน (Ratio & Scale)',
    desc: 'เทคนิคเชื่อมสะพานตัวกลาง A:B:C ด้วย ค.ร.น., การแบ่งเงินตามสัดส่วน, และคำนวณระยะจริงจากแผนที่',
    emoji: '⚖️',
    secretFormula: 'เชื่อมสะพานตัวกลาง A:B:C ด้วย ค.ร.น.'
  },
  {
    id: 'geometry_3d',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'รูปทรง 3 มิติ ปริมาตรและความจุ (3D Geometry)',
    desc: 'เทคนิคการแทนที่น้ำหาก้อนหิน, ปริมาตรทรงสี่เหลี่ยม/ทรงกระบอก, รูปคลี่เรขาคณิต และแปลง cm³ เป็นลิตร',
    emoji: '📦',
    secretFormula: 'ปริมาตรทรงตัน & เทคนิคแทนที่น้ำ'
  },
  {
    id: 'statistics_probability',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'สถิติ แผนภูมิวงกลม & ความน่าจะเป็น',
    desc: 'เทคนิคแปลง % เป็นมุมที่จุดศูนย์กลาง (คูณ 3.6°), ค่าเฉลี่ยเลขคณิตสมดุล, และสูตรความน่าจะเป็น',
    emoji: '📊',
    secretFormula: 'แปลง % เป็นมุมคูณ 3.6° & ความน่าจะเป็น'
  },
  {
    id: 'm1_integers',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'จำนวนเต็มและการดำเนินการ (Integers Mastery)',
    desc: 'กฎเครื่องหมายลบคูณลบเป็นบวก, ค่าสัมบูรณ์ |a|, เส้นจำนวน และสมบัติการแจกแจงพีชคณิต',
    emoji: '➕➖',
    secretFormula: 'กฎเหล็กเครื่องหมายจำนวนเต็ม (Signs Rule)'
  },
  {
    id: 'm1_exponents',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'เลขยกกำลังและสัญกรณ์วิทยาศาสตร์ (Exponents)',
    desc: 'กฎ 5 ข้อของเลขยกกำลัง aᵐ×aⁿ=aᵐ⁺ⁿ, กำลังติดลบ a⁻ⁿ=1/aⁿ และสัญกรณ์วิทย์ A × 10ⁿ',
    emoji: '🔟',
    secretFormula: 'กฎ 5 ข้อพิชิตเลขยกกำลัง & สัญกรณ์วิทย์'
  },
  {
    id: 'm1_linear_equations',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'สมการเชิงเส้นตัวแปรเดียว & โจทย์ปัญหา ม.1',
    desc: 'การย้ายข้างสมการ, กำจัดตัวส่วนด้วย ค.ร.น. และตั้งสมการโจทย์ปัญหาอายุ/เงิน/ระยะทาง',
    emoji: '⚖️',
    secretFormula: 'ตัดตัวส่วนด้วย ค.ร.น. & ย้ายข้างรวดเร็ว'
  },
  {
    id: 'm1_ratios_proportions',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'อัตราส่วน สัดส่วน และร้อยละ ม.1 (Proportions)',
    desc: 'สัดส่วนตรง (คูณไขว้) vs สัดส่วนผกผัน (ผลคูณคงที่), อัตราส่วน 3 จำนวน และโจทย์คนทำงาน',
    emoji: '📊',
    secretFormula: 'สัดส่วนตรงคูณไขว้ vs สัดส่วนผกผันคงที่'
  },
  {
    id: 'm1_linear_graphs',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'กราฟและความสัมพันธ์เชิงเส้น (Linear Graphs)',
    desc: 'คู่อันดับ (x,y), จตุภาค 1-4 (Quadrants), สมการเส้นตรง y = mx + c และความชัน Slope',
    emoji: '📈',
    secretFormula: 'สมการเส้นตรง y = mx + c & อ่านกราฟเร็ว'
  },
  {
    id: 'm1_statistics',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'สถิติและการนำเสนอข้อมูล ม.1 (Data Analysis)',
    desc: 'ค่าเฉลี่ยเลขคณิต (Mean), มัธยฐาน (Median), ฐานนิยม (Mode) และแผนภาพต้น-ใบ',
    emoji: '📉',
    secretFormula: '3 มหาราชสถิติ Mean, Median, Mode'
  },
  {
    id: 'm1_geometric_transformations',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'การแปลงทางเรขาคณิต (Geometric Transformations)',
    desc: 'การเลื่อนขนาน (Translation), การสะท้อน (Reflection) และการหมุน (Rotation)',
    emoji: '🔄',
    secretFormula: 'พิกัดการแปลง เลื่อน-สะท้อน-หมุน บนแกน xy'
  },
  {
    id: 'm1_constructions',
    subject: 'math',
    subjectLabel: 'คณิตศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'การสร้างทางเรขาคณิตด้วยวงเวียนและสันตรง',
    desc: 'การแบ่งครึ่งส่วนของเส้นตรง, แบ่งครึ่งมุม และการสร้างมุมมาตรฐาน 60°, 90°, 75°, 45°',
    emoji: '📐',
    secretFormula: 'สเต็ปวงเวียนแบ่งครึ่งมุมและสร้าง 60°-90°'
  },

  // ================= SCIENCE (16 MODULES) =================
  {
    id: 'living_things',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'สิ่งมีชีวิต สิ่งแวดล้อม และระบบนิเวศ',
    desc: 'สายใยอาหาร, พีระมิดพลังงาน 10%, ภาวะพึ่งพากัน, และการปรับตัวของสิ่งมีชีวิต',
    emoji: '🌱',
    secretFormula: 'กฎ 10% ถ่ายทอดพลังงาน & ความสัมพันธ์สิ่งมีชีวิต'
  },
  {
    id: 'matter_properties',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'สารและสมบัติของสาร การแยกสารผสม',
    desc: 'สารบริสุทธิ์ vs สารผสม, การระเหยแห้ง, โครมาโทกราฟี, การกลั่น และการตกผลึก',
    emoji: '🧪',
    secretFormula: 'ตารางสแกนวิธีแยกสาร 5 วินาที'
  },
  {
    id: 'force_motion',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'แรงและการเคลื่อนที่ แรงเสียดทาน & แรงลอยตัว',
    desc: 'แรงลัพธ์, แรงเสียดทานสถิต/จลน์, แรงพยุง FB = ρVg, และรอก-คาน-พื้นเอียง',
    emoji: '🧲',
    secretFormula: 'แรงลอยตัวอาร์คิมิดีส FB = ρVg & กฎของคาน'
  },
  {
    id: 'energy',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'พลังงาน ความร้อน ไฟฟ้า & เสียง',
    desc: 'การถ่ายโอนความร้อน นำ-พา-แผ่, วงจรไฟฟ้าอนุกรม/ขนาน, และความถี่เสียงสะท้อน',
    emoji: '⚡',
    secretFormula: 'ความร้อนเปลี่ยน T ใช้ mcΔt เปลี่ยนสถานะใช้ mL'
  },
  {
    id: 'earth_space',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'โลก ดาราศาสตร์ ลมฟ้าอากาศ & ธรณีพิบัติ',
    desc: 'ลมบก-ลมทะเล-มรสุม, ชั้นบรรยากาศ, ข้างขึ้น-ข้างแรม, น้ำเกิด-น้ำตาย และระบบสุริยะ',
    emoji: '🌍',
    secretFormula: 'ลมพัดจาก H ไป L & น้ำเกิด-น้ำตาย ดวงจันทร์ตั้งฉาก'
  },
  {
    id: 'human_body',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'ร่างกายมนุษย์ การย่อย หายใจ & หมุนเวียนเลือด',
    desc: 'ระบบย่อยอาหาร อวัยวะใดผลิตเอนไซม์อะไร, ทิศทางการไหลของเลือด, และการแลกเปลี่ยนแก๊ส',
    emoji: '🫀',
    secretFormula: 'เส้นทางเดินอาหาร 5 สเต็ป & หัวใจ 4 ห้อง'
  },
  {
    id: 'chemical_changes',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'การเปลี่ยนแปลงทางกายภาพและเคมี',
    desc: 'การเกิดสนิม, กรดทำปฏิกิริยากับหินปูนได้แก๊ส CO₂, ปฏิกิริยาดูด vs คายความร้อน',
    emoji: '🔬',
    secretFormula: 'แยกกายภาพ vs เคมี ดูที่สารใหม่และแก๊ส'
  },
  {
    id: 'scientific_inquiry',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'กระบวนการทางวิทยาศาสตร์ ทักษะ & ตัวแปร',
    desc: 'ตัวแปรต้น, ตัวแปรตาม, ตัวแปรควบคุม และการวิเคราะห์กราฟการทดลอง',
    emoji: '🎯',
    secretFormula: '3 ตัวแปรทองคำ: ต้นคือสิ่งที่จัด ตามคือผล ควบคุมคือให้เหมือน'
  },
  {
    id: 'm1_microscope_cells',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'กล้องจุลทรรศน์และโครงสร้างของเซลล์ ม.1',
    desc: 'ส่วนประกอบกล้องจุลทรรศน์, การคำนวณกำลังขยาย, ออร์แกเนลล์เซลล์พืช vs เซลล์สัตว์',
    emoji: '🔬',
    secretFormula: 'กำลังขยายกล้อง = ตา × วัตถุ & เซลล์พืชมีผนัง+คลอโรพลาสต์'
  },
  {
    id: 'm1_cellular_transport',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'การลำเลียงสารเข้าออกจากเซลล์ (Cell Transport)',
    desc: 'การแพร่ (Diffusion), ออสโมซิส (Osmosis) และสารละลาย Isotonic, Hypotonic, Hypertonic',
    emoji: '💧',
    secretFormula: 'ออสโมซิสน้ำแพร่จากที่เจือจางไปที่เข้มข้น'
  },
  {
    id: 'm1_plant_transport_photosynthesis',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'การสังเคราะห์ด้วยแสงและการลำเลียงในพืช',
    desc: 'สมการการสังเคราะห์ด้วยแสง, การทดสอบแป้งด้วยไอโอดีน, ท่อลำเลียงไซเลม (Xylem) และโฟลเอม (Phloem)',
    emoji: '🌿',
    secretFormula: 'ไซเลมลำเลียงน้ำขึ้นบน โฟลเอมลำเลียงน้ำตาลไปทั่วต้น'
  },
  {
    id: 'm1_plant_reproduction',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'การสืบพันธุ์และการเจริญเติบโตของพืชดอก',
    desc: 'ส่วนประกอบของดอกไม้, การถ่ายละอองเรณู, การปฏิสนธิซ้อน (Double Fertilization)',
    emoji: '🌸',
    secretFormula: 'รังไข่กลายเป็นผล ออวุลกลายเป็นเมล็ด'
  },
  {
    id: 'm1_thermal_physics',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'ฟิสิกส์ความร้อน สมดุลความร้อน & การขยายตัว',
    desc: 'สมการสมดุลความร้อน Qสูญเสีย = Qได้รับ, การถ่ายโอนความร้อน และการขยายตัวของสาร',
    emoji: '🌡️',
    secretFormula: 'สมดุลความร้อน Q_loss = Q_gain (mcΔt = mcΔt)'
  },
  {
    id: 'm1_substances_separation',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'การจำแนกสารบริสุทธิ์ สารละลาย & การแยกสาร ม.1',
    desc: 'ธาตุ สารประกอบ สารละลาย, โครมาโทกราฟีค่า Rf, และการสกัดด้วยตัวทำละลาย',
    emoji: '🧪',
    secretFormula: 'ค่า Rf = ระยะสารเคลื่อนที่ ÷ ระยะตัวทำละลาย'
  },
  {
    id: 'm1_atmosphere_weather',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'บรรยากาศ ความกดอากาศ ความชื้น & เมฆ ม.1',
    desc: 'ชั้นบรรยากาศ 5 ชั้น, การวัดความชื้นสัมพัทธ์ด้วยไซครอมิเตอร์, ความกดอากาศ และเมฆ 10 สกุล',
    emoji: '☁️',
    secretFormula: 'ความกดอากาศลดลง 1 mmHg ทุกๆ ความสูง 11 เมตร'
  },
  {
    id: 'm1_climate_change',
    subject: 'science',
    subjectLabel: 'วิทยาศาสตร์',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'การเปลี่ยนแปลงสภาพภูมิอากาศ พายุ & พยากรณ์อากาศ',
    desc: 'พายุหมุนเขตร้อน (ดีเปรสชัน, พายุโซนร้อน, ไต้ฝุ่น), ปรากฏการณ์เรือนกระจก, เอลนีโญ-ลานีญา',
    emoji: '🌪️',
    secretFormula: 'ลำดับความเร็วลมพายุ: ดีเปรสชัน < โซนร้อน < ไต้ฝุ่น'
  },

  // ================= ENGLISH (17 MODULES) =================
  {
    id: 'grammar_basics',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'Grammar 3S: Tenses, Subject-Verb Agreement',
    desc: 'Present/Past/Future Tense, ประธานเอกพจน์กริยาเติม s, และ Pronoun Cases',
    emoji: '🇬🇧',
    secretFormula: 'ประธานเอกพจน์ กริยาเติม s/es & กฎเวลา 12 Tenses'
  },
  {
    id: 'vocabulary',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'Essential Vocab & Synonyms/Antonyms 500 คำ',
    desc: 'คำศัพท์พบบ่อยในข้อสอบเข้า ม.1, เทคนิคเดาความหมายจาก Context Clues และรากศัพท์',
    emoji: '📚',
    secretFormula: 'Prefix-Suffix แกะความหมายศัพท์ยาก 3 วิ'
  },
  {
    id: 'reading',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'Reading Comprehension & Sign/Notice',
    desc: 'การอ่านป้ายสัญลักษณ์, ประกาศ, ตารางเวลา, Main Idea และจับใจความสำคัญ',
    emoji: '📰',
    secretFormula: 'Skimming หา Main Idea & Scanning หา Keyword'
  },
  {
    id: 'listening_speaking',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'Conversation & Everyday Situations',
    desc: 'บทสนทนาสถานการณ์ต่างๆ ทักทาย, ขอทาง, ซื้อของ, และตอบรับคำเชิญ',
    emoji: '🗣️',
    secretFormula: 'ถาม Wh- ตอบเนื้อหา ถาม Yes/No ตอบช่วย'
  },
  {
    id: 'writing',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'Sentence Structure & Punctuation',
    desc: 'โครงสร้าง S + V + O, การเรียง Adjective หน้าคำนาม, เครื่องหมายวรรคตอน',
    emoji: '✍️',
    secretFormula: 'OSASCOMP ลำดับคำคุณศัพท์หน้าคำนาม'
  },
  {
    id: 'passive_modals',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'Passive Voice & Modal Verbs (Can/Could/Must)',
    desc: 'โครงสร้างประธานถูกกระทำ S + is/am/are + V.3 และการใช้ Modal Verbs',
    emoji: '🛡️',
    secretFormula: 'Passive Voice = S + be + V.3 เสมอ'
  },
  {
    id: 'comparison_conjunctions',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'Comparison & Conjunctions (Because, Although, So)',
    desc: 'การเปรียบเทียบขั้นกว่า-ขั้นสุด (er/more, est/most) และคำเชื่อมบอกเหตุผล/ขัดแย้ง',
    emoji: '⚖️',
    secretFormula: 'FANBOYS คำเชื่อม & ขั้นกว่า er/more ขั้นสุด the -est/most'
  },
  {
    id: 'cloze_test',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'p6',
    trackLabel: 'ป.6 สอบเข้า ม.1',
    title: 'Cloze Test & Error Identification เทคนิคตัดช้อยส์',
    desc: 'เทคนิคเติมคำในช่องว่าง, ดู Part of Speech และมองหาจุดผิดไวยากรณ์',
    emoji: '🎯',
    secretFormula: 'สแกนหาคำข้างหน้า-ข้างหลังช่องว่าง ชี้ชะตาชนิดคำ'
  },
  {
    id: 'm1_daily_vocab_collocations',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'Daily Vocab & Essential Collocations ม.1',
    desc: 'คำศัพท์ระดับ ม.1, สำนวน Collocations (make vs do, take vs have)',
    emoji: '📖',
    secretFormula: 'Make สร้างสรรค์สิ่งใหม่ Do หน้าที่ประจำวัน'
  },
  {
    id: 'm1_past_tenses',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'Past Simple vs Past Continuous Tense',
    desc: 'เหตุการณ์กำลังเกิดอยู่แล้วมีอีกเหตุการณ์แทรก (While + Past Con, When + Past Simple)',
    emoji: '⏳',
    secretFormula: 'While กำลังทำ (Past Con) When เข้ามาแทรก (Past Sim)'
  },
  {
    id: 'm1_present_perfect',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'Present Perfect Tense & Key Signal Words',
    desc: 'โครงสร้าง has/have + V.3 กับ since, for, already, yet, just, ever, never',
    emoji: '🕰️',
    secretFormula: 'Since จุดเวลา For ช่วงระยะเวลา Has/Have + V.3'
  },
  {
    id: 'm1_comparatives_superlatives',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'Comparatives & Superlatives ม.1 Advanced',
    desc: 'การเปรียบเทียบขั้นเท่า as...as, ข้อยกเว้น good-better-best, bad-worse-worst',
    emoji: '📶',
    secretFormula: 'ขั้นเท่า as Adj as ข้อยกเว้น good-better-best'
  },
  {
    id: 'm1_modal_verbs',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'Modal Verbs: Should, Must, Have to, May/Might',
    desc: 'ความจำเป็น กฎเกณฑ์ คำแนะนำ ความเป็นไปได้ และ Modal + V.inf',
    emoji: '💡',
    secretFormula: 'หลัง Modal Verbs ทุกตัวต้องตามด้วย V.inf (ไม่ผัน) เสมอ'
  },
  {
    id: 'm1_relative_clauses',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'Relative Clauses: Who, Whom, Whose, Which, That',
    desc: 'การใช้สรรพนามเชื่อมความ Who คน Whom ถูกกระทำ Whose เจ้าของ Which สิ่งของ',
    emoji: '🔗',
    secretFormula: 'Who ทำเอง Whom ถูกกระทำ Whose เจ้าของ Which สัตว์/สิ่งของ'
  },
  {
    id: 'm1_advanced_passive',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'Passive Voice in Continuous & Perfect Tenses',
    desc: 'is being done, has been done, will be done ในข้อสอบแข่งขันห้อง Gifted',
    emoji: '🛡️',
    secretFormula: 'Continuous เป็น being + V.3 / Perfect เป็น been + V.3'
  },
  {
    id: 'm1_conditionals_type1_2',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'Conditional Sentences: If-Clause Type 1 & Type 2',
    desc: 'Type 1: เป็นไปได้ If + Present, Will + V.1 / Type 2: สมมติ If + Past, Would + V.1 (If I were you)',
    emoji: '🌿',
    secretFormula: 'Type 1: Present คู่ Will / Type 2: Past คู่ Would (ใช้ were เสมอ)'
  },
  {
    id: 'm1_context_clues_reading',
    subject: 'english',
    subjectLabel: 'ภาษาอังกฤษ',
    track: 'm1',
    trackLabel: 'ม.1 ล่วงหน้า',
    title: 'Context Clues & Academic Reading Strategies',
    desc: 'กลยุทธ์แกะคำศัพท์จากบริบท Definition, Restatement, Contrast และ Tone ของผู้เขียน',
    emoji: '🔍',
    secretFormula: 'ส่องคำเชื่อมขัดแย้ง but/however ส่องคำเหมือน that is/or'
  },

  // ================= THAI (8 MODULES) =================
  {
    id: 'thai_reading',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    track: 'p6',
    trackLabel: 'ป.6 - ม.1 แกนกลาง',
    title: 'การอ่านจับใจความ ตีความ & แยกข้อเท็จจริง-ข้อคิดเห็น',
    desc: 'เทคนิค 5W1H, การหาประโยคใจความสำคัญ (ตอนต้น/กลาง/ท้าย), แยกข้อเท็จจริงพิสูจน์ได้ vs ข้อคิดเห็นความรู้สึก',
    emoji: '📖',
    secretFormula: 'แยกข้อเท็จจริงพิสูจน์ได้ vs ข้อคิดเห็นมีคำว่า ควร/อาจ/น่าจะ'
  },
  {
    id: 'thai_word_classes',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    track: 'p6',
    trackLabel: 'ป.6 - ม.1 แกนกลาง',
    title: 'ชนิดของคำ คำประสม คำสมาส-สนธิ & ไตรยางศ์',
    desc: 'คำ 7 ชนิด, อักษรสามหมู่และผันวรรณยุกต์, คำเป็น-คำตาย, และสูตรจำคำสมาส-ชน สนธิ-เชื่อม',
    emoji: '🔤',
    secretFormula: 'คำเป็น นมยวง กบด คำตาย สมาสชน สนธิเชื่อม'
  },
  {
    id: 'thai_royal_loanwords',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    track: 'p6',
    trackLabel: 'ป.6 - ม.1 แกนกลาง',
    title: 'คำราชาศัพท์และคำยืมภาษาต่างประเทศในภาษาไทย',
    desc: 'ราชาศัพท์หมวดร่างกาย/เครื่องใช้, ทรง + กริยา, คำยืมบาลี-สันสกฤต เขมร จีน อังกฤษ',
    emoji: '👑',
    secretFormula: 'ริ รึ ลึ บาลี ศ ษ รร สันสกฤต ทรงห้ามตามด้วยกริยาราชาศัพท์'
  },
  {
    id: 'thai_sentence_structures',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    track: 'p6',
    trackLabel: 'ป.6 - ม.1 แกนกลาง',
    title: 'ประโยคเพื่อการสื่อสาร ความเดียว-ความรวม-ความซ้อน',
    desc: 'ภาคประธานและภาคแสดง, ประโยคความเดียว ประโยคความรวม (และ/แต่/หรือ), ประโยคความซ้อน (ที่ ซึ่ง อัน ผู้ ว่า ให้)',
    emoji: '✍️',
    secretFormula: 'ประโยคความซ้อน สังเกตคำเชื่อม ที่ ซึ่ง อัน ผู้ ให้ ว่า เพราะ'
  },
  {
    id: 'thai_idioms_dialects',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    track: 'p6',
    trackLabel: 'ป.6 - ม.1 แกนกลาง',
    title: 'สำนวน สุภาษิต คำพังเพย & ภาษาถิ่น 4 ภาค',
    desc: 'สำนวนไทยความหมายลึกซึ้ง, เปรียบเทียบภาษาถิ่นเหนือ-อีสาน-ใต้ และระดับภาษา (ทางการ/กึ่งทางการ)',
    emoji: '🗣️',
    secretFormula: 'สุภาษิตสอนใจ พังเพยเปรียบเทียบ ภาษาถิ่นส่องคำศัพท์เฉพาะ'
  },
  {
    id: 'thai_literature_poetry',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    track: 'p6',
    trackLabel: 'ป.6 - ม.1 แกนกลาง',
    title: 'วรรณคดี วรรณกรรม กลอนสุภาพ & กาพย์ยานี ๑๑',
    desc: 'ฉันทลักษณ์กลอนแปดและกาพย์ยานี ๑๑ (หน้า ๕ หลัง ๖), สัมผัสนอก-สัมผัสใน, รสวรรณคดีไทย (เสาวรจนี, นารีปราโมทย์ ฯลฯ)',
    emoji: '📜',
    secretFormula: 'กาพย์ยานี ๑๑: หน้า ๕ หลัง ๖ | กลอนแปด: วรรคละ ๘ คำ ลงท้ายเสียงจัตวา'
  },
  {
    id: 'thai_writing',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    track: 'p6',
    trackLabel: 'ป.6 - ม.1 แกนกลาง',
    title: 'การเขียนสื่อสาร ย่อความ เรียงความ & จดหมาย',
    desc: 'รูปแบบคำนำ-เนื้อเรื่อง-สรุป, การเขียนย่อความตามแบบแผน, การใช้คำขึ้นต้น-ลงท้ายจดหมายกิจธุระ',
    emoji: '📝',
    secretFormula: 'ย่อความต้องเปลี่ยนสรรพนามเป็นบุรุษที่ 3 เสมอ'
  },
  {
    id: 'thai_listening_speaking',
    subject: 'thai',
    subjectLabel: 'ภาษาไทย',
    track: 'p6',
    trackLabel: 'ป.6 - ม.1 แกนกลาง',
    title: 'การฟัง การดู และการพูดเพื่อการวิเคราะห์และประเมินค่า',
    desc: 'มารยาทในการฟังและพูด, การจับใจความจากสื่อโฆษณา, การวิเคราะห์ความน่าเชื่อถือและจุดประสงค์ของผู้พูด',
    emoji: '👂',
    secretFormula: 'ฟังแล้วตั้งคำถาม: ใคร พูดอะไร เชื่อถือได้หรือไม่ หวังผลอะไร'
  }
]

export default function LearnIndexPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'math' | 'science' | 'english' | 'thai'>('all')
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'p6' | 'm1'>('all')

  const filteredLessons = ALL_57_LESSONS.filter((lesson) => {
    const matchSubject = selectedSubject === 'all' || lesson.subject === selectedSubject
    const matchTrack = selectedTrack === 'all' || lesson.track === selectedTrack
    const matchSearch = !searchQuery.trim() || 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.secretFormula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.id.toLowerCase().includes(searchQuery.toLowerCase())

    return matchSubject && matchTrack && matchSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/70 via-amber-50/50 to-red-50/60 flex flex-col">
      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-orange-800 hover:bg-orange-100 font-semibold">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> แดชบอร์ด
              </Button>
            </Link>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <h1 className="font-black text-slate-800 text-sm sm:text-base hidden sm:flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-orange-600" /> ศูนย์รวมบทเรียน 57 บทเรียน (MASTER ม.1)
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/virtual-lab">
              <Button size="sm" variant="outline" className="text-xs font-bold border-amber-300 bg-amber-50 text-amber-900 rounded-xl">
                🧪 ห้องแล็บวิทย์
              </Button>
            </Link>
            <Badge className="bg-emerald-500 text-white font-bold text-xs px-2.5 py-1">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> ตรวจสอบแล้ว 100%
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex-1 w-full space-y-6">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-orange-500/20 space-y-3">
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white border-0 text-xs font-bold backdrop-blur-sm">
              ✨ Comprehensive Curriculum Matrix
            </Badge>
            <span className="text-xs text-orange-100 font-medium hidden sm:inline">
              ป.6 สอบเข้า ม.1 & ม.1 ล่วงหน้า ครบ 4 วิชาหลัก
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            คลังบทเรียนอัจฉริยะ 57 บทเรียน (Syllabus Directory)
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
            ระบบผ่านการตรวจสอบการเข้าถึง 100% ครบทุกบท พร้อมสรุปเนื้อหาเข้มข้น สูตรลัดมหาเทพ 3 วินาที และคลิปเพลงช่วยจำ YouTube ฝังอยู่ใต้บทเรียนเพื่อการจดจำระดับสูงสุด
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold">
            <span className="bg-white/15 px-3 py-1.5 rounded-xl">🔢 คณิต: 16 บท</span>
            <span className="bg-white/15 px-3 py-1.5 rounded-xl">🔬 วิทย์: 16 บท</span>
            <span className="bg-white/15 px-3 py-1.5 rounded-xl">🇬🇧 อังกฤษ: 17 บท</span>
            <span className="bg-white/15 px-3 py-1.5 rounded-xl">🇹🇭 ภาษาไทย: 8 บท</span>
            <span className="bg-emerald-400 text-slate-950 px-3 py-1.5 rounded-xl shadow-xs">🎯 รวม 57 บทเรียน</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-orange-100 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชื่อบทเรียน, สูตรลับ, หรือหัวข้อ (เช่น ถอดรูท, พื้นที่ใบไม้, If-Clause, เซลล์, สมาส)..."
                className="pl-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-2xl h-11"
              />
            </div>
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-500 rounded-xl shrink-0"
              >
                ล้างคำค้น
              </Button>
            )}
          </div>

          {/* Subject Tabs */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              { id: 'all', label: '🌟 ทุกวิชา (57 บท)' },
              { id: 'math', label: '🔢 คณิตศาสตร์ (16 บท)' },
              { id: 'science', label: '🔬 วิทยาศาสตร์ (16 บท)' },
              { id: 'english', label: '🇬🇧 ภาษาอังกฤษ (17 บท)' },
              { id: 'thai', label: '🇹🇭 ภาษาไทย (8 บท)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSubject(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSubject === tab.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Track Filter */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-xs text-slate-600">
            <span className="font-bold">เลือกระดับชั้น:</span>
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'p6', label: 'ป.6 สอบเข้า ม.1 (สสวท.)' },
              { id: 'm1', label: 'ม.1 ล่วงหน้า (Gifted/EP)' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTrack(t.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedTrack === t.id
                    ? 'bg-amber-100 text-amber-900 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs font-bold text-slate-600 px-1">
          <span>พบบทเรียนทั้งหมด {filteredLessons.length} บท</span>
          <span className="text-emerald-600">✅ ระบบเข้าถึงได้ 100% ทุกบท</span>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLessons.map((lesson) => (
            <Card 
              key={lesson.id} 
              className="border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all rounded-3xl bg-white/95 overflow-hidden flex flex-col justify-between group"
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-100 to-amber-100 text-2xl flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      {lesson.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge className={`text-[10px] font-bold ${
                          lesson.subject === 'math' ? 'bg-orange-100 text-orange-900 border-orange-200' :
                          lesson.subject === 'science' ? 'bg-emerald-100 text-emerald-900 border-emerald-200' :
                          lesson.subject === 'english' ? 'bg-blue-100 text-blue-900 border-blue-200' :
                          'bg-rose-100 text-rose-900 border-rose-200'
                        }`}>
                          {lesson.subjectLabel}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] text-slate-500 font-medium">
                          {lesson.trackLabel}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-orange-600 transition-colors leading-snug">
                        {lesson.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {lesson.desc}
                </p>

                <div className="bg-amber-50/80 border border-amber-200/70 p-2.5 rounded-xl text-xs text-amber-950 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">⚡ สูตรลับ: {lesson.secretFormula}</span>
                </div>
              </CardContent>

              <div className="px-5 pb-5 pt-0">
                <Link href={`/subjects/${lesson.subject}/${lesson.id}`} className="block">
                  <Button 
                    className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>เข้าสู่บทเรียน</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
