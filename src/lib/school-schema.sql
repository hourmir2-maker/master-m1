-- =========================================================================
-- MASTER ม.1 — School Portal & Classroom Multi-Tenant SQL Schema
-- สำหรับระบบบริหารจัดการโรงเรียน, ห้องเรียน, การมอบหมายงาน และสถิติตัวชี้วัด สพฐ.
-- =========================================================================

-- 1. ตาราง schools (ข้อมูลโรงเรียน)
CREATE TABLE IF NOT EXISTS public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_code VARCHAR(20) UNIQUE NOT NULL,
  school_name VARCHAR(255) NOT NULL,
  province VARCHAR(100) NOT NULL,
  affiliation VARCHAR(255) DEFAULT 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)',
  academic_year VARCHAR(50) DEFAULT '2569 - 2570',
  created_by_teacher_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ตาราง classrooms (ข้อมูลห้องเรียน & รหัส Class Code 6 หลัก)
CREATE TABLE IF NOT EXISTS public.classrooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  class_code VARCHAR(12) UNIQUE NOT NULL,
  grade_level VARCHAR(10) NOT NULL, -- 'p1','p2','p3','p4','p5','p6','m1'
  grade_name_th VARCHAR(50) NOT NULL,
  room_name VARCHAR(100) NOT NULL,
  teacher_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  teacher_name VARCHAR(150) NOT NULL,
  student_count INT DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ตาราง school_assignments (งานมอบหมาย / ชุดข้อสอบของห้องเรียน)
CREATE TABLE IF NOT EXISTS public.school_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(50) NOT NULL, -- 'math', 'science', 'thai', 'english'
  exam_type VARCHAR(50) DEFAULT 'ONET', -- 'RT', 'NT', 'ONET', 'ENTRANCE_M1'
  total_questions INT DEFAULT 15,
  duration_minutes INT DEFAULT 60,
  due_date DATE DEFAULT (CURRENT_DATE + INTERVAL '7 days'),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ตาราง school_submissions (ผลการสอบนักเรียนในห้องเรียน - ไม่ต้องใช้อีเมล)
CREATE TABLE IF NOT EXISTS public.school_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES public.school_assignments(id) ON DELETE CASCADE,
  classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE,
  student_number INT NOT NULL,
  student_name VARCHAR(150) NOT NULL,
  score NUMERIC(5, 2) NOT NULL,
  max_score NUMERIC(5, 2) DEFAULT 100,
  percentage NUMERIC(5, 2) NOT NULL,
  indicator_strengths TEXT[] DEFAULT '{}',
  indicator_deficiencies TEXT[] DEFAULT '{}',
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning-fast queries
CREATE INDEX IF NOT EXISTS idx_classrooms_code ON public.classrooms(class_code);
CREATE INDEX IF NOT EXISTS idx_classrooms_teacher ON public.classrooms(teacher_id);
CREATE INDEX IF NOT EXISTS idx_assignments_classroom ON public.school_assignments(classroom_id);
CREATE INDEX IF NOT EXISTS idx_submissions_classroom ON public.school_submissions(classroom_id);
CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON public.school_submissions(assignment_id);

-- Row Level Security (RLS)
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_submissions ENABLE ROW LEVEL SECURITY;

-- Allow Public Read for Classrooms by Code (for zero-email student join)
CREATE POLICY "Allow public read classrooms by code" ON public.classrooms
  FOR SELECT USING (true);

-- Allow Public Read for Active Assignments
CREATE POLICY "Allow public read active assignments" ON public.school_assignments
  FOR SELECT USING (is_active = true);

-- Allow Public Insert for Student Submissions
CREATE POLICY "Allow public insert student submissions" ON public.school_submissions
  FOR INSERT WITH CHECK (true);

-- Allow Teachers to Manage their Schools and Classrooms
CREATE POLICY "Allow authenticated teachers to manage schools" ON public.schools
  FOR ALL USING (auth.uid() = created_by_teacher_id);

CREATE POLICY "Allow authenticated teachers to manage classrooms" ON public.classrooms
  FOR ALL USING (auth.uid() = teacher_id);

CREATE POLICY "Allow authenticated teachers to manage assignments" ON public.school_assignments
  FOR ALL USING (
    classroom_id IN (SELECT id FROM public.classrooms WHERE teacher_id = auth.uid())
  );
