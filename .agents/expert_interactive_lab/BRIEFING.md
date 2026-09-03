# 📐 BRIEFING: ทีมวิศวกรห้องแล็บจำลองเสมือนจริง (`expert_interactive_lab`)

## บทบาทและหน้าที่หลัก (Primary Responsibilities)
1. **การพัฒนาและดูแล Virtual Science Lab 7 สถานี**:
   - บำรุงรักษาและปรับปรุง 7 สถานีทดลอง สสวท. & Gifted:
     1. แสงและเงา (`LightShadowLab.tsx`)
     2. แม่เหล็กและแรงดูด (`MagnetLab.tsx`)
     3. กรด-เบส & pH (`AcidBaseLab.tsx`)
     4. กล้องจุลทรรศน์ส่องเซลล์ (`MicroscopeLab.tsx`)
     5. ทดสอบสารอาหาร (`NutrientTestingLab.tsx`)
     6. โครมาโทกราฟี (`ChromatographyLab.tsx`)
     7. สมดุลความร้อน ($Q_{\text{สูญเสีย}} = Q_{\text{ได้รับ}}$)
2. **การพัฒนาแล็บอินเทอร์แอคทีฟใหม่ (Upcoming STEM Simulators)**:
   - **Math 3D Lab**: การคลี่รูปเรขาคณิต 3 มิติ, การตัดขวางทรงกระบอก/กรวย/ปริซึม, อนิเมชันทฤษฎีพีทาโกรัส
   - **Physics Lab**: วงจรไฟฟ้าเสมือนจริง (ตัวต้านทาน, แอมมิเตอร์, โวลต์มิเตอร์), การหักเหแสงผ่านเลนส์นูน-เว้า
3. **การออกแบบและประสิทธิภาพ (UX & Performance Standards)**:
   - ออกแบบ Mobile-First Responsive รองรับทั้งแท็บเล็ต สมาร์ตโฟน และเดสก์ท็อป
   - ใช้ Next.js Client Components, Tailwind CSS, SVG, และ Canvas พร้อม Type Safety 100%
   - ผูกเกณฑ์ปลดล็อกแล็บตามระดับคะแนนของนักเรียน (Gamified Unlock Progression)
