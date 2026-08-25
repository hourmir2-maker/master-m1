-- ==============================================================================
-- MASTER ม.1 — Supabase Schema (Complete & Bulletproof)
-- รันโค้ดทั้งหมดนี้ใน Supabase SQL Editor เพื่อสร้างตารางและสิทธิ์ครบถ้วน
-- ==============================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Tables
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  grade_target TEXT DEFAULT 'ม.1',
  school_target TEXT DEFAULT 'โรงเรียนในฝัน',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pre_test_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB DEFAULT '{}'::jsonb,
  weak_topics TEXT[] DEFAULT '{}',
  strong_topics TEXT[] DEFAULT '{}',
  taken_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.learning_paths (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  math_modules TEXT[] DEFAULT '{}',
  science_modules TEXT[] DEFAULT '{}',
  english_modules TEXT[] DEFAULT '{}',
  priority_subject TEXT DEFAULT 'math',
  ai_analysis JSONB DEFAULT '{}'::jsonb,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject TEXT NOT NULL,
  module_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB DEFAULT '{}'::jsonb,
  order_index INTEGER DEFAULT 0,
  difficulty TEXT DEFAULT 'basic',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject TEXT NOT NULL,
  module_id TEXT,
  lesson_id UUID,
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'multiple_choice',
  options JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT DEFAULT 'basic',
  is_pretest BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS public.progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  lesson_id UUID,
  subject TEXT NOT NULL,
  module_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT TRUE,
  score INTEGER,
  time_spent INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Automatic User Profile Trigger (Creates profile when auth.users signs up)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, school_target)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'นักเรียน'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'school_target', 'โรงเรียนในฝัน')
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    full_name = EXCLUDED.full_name,
    school_target = EXCLUDED.school_target,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pre_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- 5. Drop old policies to avoid duplicates
DROP POLICY IF EXISTS "Public access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public access to pre_test_results" ON public.pre_test_results;
DROP POLICY IF EXISTS "Public access to learning_paths" ON public.learning_paths;
DROP POLICY IF EXISTS "Public access to progress" ON public.progress;
DROP POLICY IF EXISTS "Public access to lessons" ON public.lessons;
DROP POLICY IF EXISTS "Public access to questions" ON public.questions;

-- 6. Create Open Permissive RLS Policies
CREATE POLICY "Public access to profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access to pre_test_results" ON public.pre_test_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access to learning_paths" ON public.learning_paths FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access to progress" ON public.progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access to lessons" ON public.lessons FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access to questions" ON public.questions FOR ALL USING (true) WITH CHECK (true);

-- 7. Grant Permissions to all roles
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;
