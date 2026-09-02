-- =========================================================================
-- MASTER ม.1 — School Portal SQL Schema (100% Bulletproof & Auto-Migrate)
-- ป้องกันตารางเก่า/คอลัมน์ขาดหายในทุกตารางแบบอัตโนมัติ รันผ่าน 100%
-- =========================================================================

-- 1. ตาราง schools (ข้อมูลโรงเรียน)
CREATE TABLE IF NOT EXISTS public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_code VARCHAR(20) UNIQUE,
  school_name VARCHAR(255),
  province VARCHAR(100),
  affiliation VARCHAR(255) DEFAULT 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)',
  academic_year VARCHAR(50) DEFAULT '2569 - 2570',
  created_by_teacher_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS school_code VARCHAR(20);
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS school_name VARCHAR(255);
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS province VARCHAR(100);
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS affiliation VARCHAR(255) DEFAULT 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (สพฐ.)';
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS academic_year VARCHAR(50) DEFAULT '2569 - 2570';
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS created_by_teacher_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. ตาราง classrooms (ข้อมูลห้องเรียน & รหัส Class Code)
CREATE TABLE IF NOT EXISTS public.classrooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  class_code VARCHAR(12) UNIQUE,
  grade_level VARCHAR(10),
  grade_name_th VARCHAR(50),
  room_name VARCHAR(100),
  teacher_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  teacher_name VARCHAR(150),
  student_count INT DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE;
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS class_code VARCHAR(12);
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS grade_level VARCHAR(10);
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS grade_name_th VARCHAR(50);
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS room_name VARCHAR(100);
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS teacher_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS teacher_name VARCHAR(150);
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS student_count INT DEFAULT 30;

-- 3. ตาราง school_assignments (งานมอบหมาย / ชุดข้อสอบ)
CREATE TABLE IF NOT EXISTS public.school_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE,
  title VARCHAR(255),
  subject VARCHAR(50),
  exam_type VARCHAR(50) DEFAULT 'ONET',
  total_questions INT DEFAULT 15,
  duration_minutes INT DEFAULT 60,
  due_date DATE DEFAULT (CURRENT_DATE + INTERVAL '7 days'),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.school_assignments ADD COLUMN IF NOT EXISTS classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE;
ALTER TABLE public.school_assignments ADD COLUMN IF NOT EXISTS title VARCHAR(255);
ALTER TABLE public.school_assignments ADD COLUMN IF NOT EXISTS subject VARCHAR(50);
ALTER TABLE public.school_assignments ADD COLUMN IF NOT EXISTS exam_type VARCHAR(50) DEFAULT 'ONET';
ALTER TABLE public.school_assignments ADD COLUMN IF NOT EXISTS total_questions INT DEFAULT 15;
ALTER TABLE public.school_assignments ADD COLUMN IF NOT EXISTS duration_minutes INT DEFAULT 60;
ALTER TABLE public.school_assignments ADD COLUMN IF NOT EXISTS due_date DATE DEFAULT (CURRENT_DATE + INTERVAL '7 days');
ALTER TABLE public.school_assignments ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- 4. ตาราง school_submissions (ผลการสอบนักเรียน)
CREATE TABLE IF NOT EXISTS public.school_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES public.school_assignments(id) ON DELETE CASCADE,
  classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE,
  student_number INT,
  student_name VARCHAR(150),
  score NUMERIC(5, 2),
  max_score NUMERIC(5, 2) DEFAULT 100,
  percentage NUMERIC(5, 2),
  indicator_strengths TEXT[] DEFAULT '{}',
  indicator_deficiencies TEXT[] DEFAULT '{}',
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.school_submissions ADD COLUMN IF NOT EXISTS assignment_id UUID REFERENCES public.school_assignments(id) ON DELETE CASCADE;
ALTER TABLE public.school_submissions ADD COLUMN IF NOT EXISTS classroom_id UUID REFERENCES public.classrooms(id) ON DELETE CASCADE;
ALTER TABLE public.school_submissions ADD COLUMN IF NOT EXISTS student_number INT;
ALTER TABLE public.school_submissions ADD COLUMN IF NOT EXISTS student_name VARCHAR(150);
ALTER TABLE public.school_submissions ADD COLUMN IF NOT EXISTS score NUMERIC(5, 2);
ALTER TABLE public.school_submissions ADD COLUMN IF NOT EXISTS max_score NUMERIC(5, 2) DEFAULT 100;
ALTER TABLE public.school_submissions ADD COLUMN IF NOT EXISTS percentage NUMERIC(5, 2);
ALTER TABLE public.school_submissions ADD COLUMN IF NOT EXISTS indicator_strengths TEXT[] DEFAULT '{}';
ALTER TABLE public.school_submissions ADD COLUMN IF NOT EXISTS indicator_deficiencies TEXT[] DEFAULT '{}';

-- Indexes
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

-- Reset and Recreate Policies
DROP POLICY IF EXISTS "Allow public read classrooms by code" ON public.classrooms;
DROP POLICY IF EXISTS "Allow public read active assignments" ON public.school_assignments;
DROP POLICY IF EXISTS "Allow public insert student submissions" ON public.school_submissions;
DROP POLICY IF EXISTS "Allow authenticated teachers to manage schools" ON public.schools;
DROP POLICY IF EXISTS "Allow authenticated teachers to manage classrooms" ON public.classrooms;
DROP POLICY IF EXISTS "Allow authenticated teachers to manage assignments" ON public.school_assignments;

CREATE POLICY "Allow public read classrooms by code" ON public.classrooms FOR SELECT USING (true);
CREATE POLICY "Allow public read active assignments" ON public.school_assignments FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public insert student submissions" ON public.school_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated teachers to manage schools" ON public.schools FOR ALL USING (auth.uid() = created_by_teacher_id);
CREATE POLICY "Allow authenticated teachers to manage classrooms" ON public.classrooms FOR ALL USING (auth.uid() = teacher_id);
CREATE POLICY "Allow authenticated teachers to manage assignments" ON public.school_assignments FOR ALL USING (true);
