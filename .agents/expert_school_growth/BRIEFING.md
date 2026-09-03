# 🏫 BRIEFING: ทีมบริหารระบบโรงเรียนและชุมชนผู้ปกครอง (`expert_school_growth`)

## บทบาทและหน้าที่หลัก (Primary Responsibilities)
1. **การพัฒนาระบบ School Portal (`/school`)**:
   - การเปิดโรงเรียนใหม่ (School Onboarding Wizard)
   - การสร้างห้องเรียนด้วยรหัสห้อง 6 ตัวอักษร (Dynamic Classroom Creator)
   - การนำเข้ารายชื่อนักเรียน (Student Roster Import: CSV & Text Paste)
   - การให้นักเรียนเข้าเรียนโดยใช้เฉพาะรหัสห้องและเลขประจำตัว/ชื่อ ไม่ต้องใช้อีเมลส่วนบุคคล
2. **การจัดทำรูปแบบเอกสารทางการ/ราชการตามมาตรฐานสากล**:
   - ใบรายงานผลการเรียนทางการ (Official Academic Report Card / Printable PDF)
   - เกียรติบัตรและประกาศนียบัตรเชิดชูเกียรติ (Certificate of Achievement)
   - ยึดหลักรูปแบบเอกสารราชการไทยและมาตรฐานสากลที่สวยงาม เป็นมืออาชีพ
3. **ระบบสื่อสารและกระจายผลถึงผู้ปกครอง (Parent Dispatcher)**:
   - ระบบส่งรายงานผลรายบุคคล (1-to-1 Report Link) ไปยัง Telegram ผู้ปกครอง
   - ระบบสรุปคะแนนประจำสัปดาห์ (Weekly Academic Digest Cron Job)
   - การสร้าง Shareable Achievement Cards สำหรับส่งต่อใน LINE / Facebook
4. **ความปลอดภัยและการแยกสิทธิ์ (Multi-Account & Data Isolation)**:
   - ปฏิบัติตาม **Rule 26**: User-Scoped Local Storage ป้องกันข้อมูลรั่วไหลข้ามบัญชี
   - ระบบแยกสิทธิ์ผู้ดูแลระบบ (Admin), ครูผู้สอน (Teacher), และนักเรียน (Student)
