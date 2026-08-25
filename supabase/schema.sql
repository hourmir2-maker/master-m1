-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profile table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  grade_target TEXT DEFAULT 'ม.1',
  school_target TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pre-test results
CREATE TABLE public.pre_test_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL CHECK (subject IN ('math', 'science', 'english')),
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL,
  weak_topics TEXT[] DEFAULT '{}',
  strong_topics TEXT[] DEFAULT '{}',
  taken_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI-generated learning paths
CREATE TABLE public.learning_paths (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  math_modules TEXT[] DEFAULT '{}',
  science_modules TEXT[] DEFAULT '{}',
  english_modules TEXT[] DEFAULT '{}',
  priority_subject TEXT,
  ai_analysis TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons
CREATE TABLE public.lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject TEXT NOT NULL CHECK (subject IN ('math', 'science', 'english')),
  module_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL,
  order_index INTEGER DEFAULT 0,
  difficulty TEXT CHECK (difficulty IN ('basic', 'intermediate', 'advanced')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz questions
CREATE TABLE public.questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject TEXT NOT NULL,
  module_id TEXT,
  lesson_id UUID REFERENCES public.lessons(id),
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'multiple_choice',
  options JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT CHECK (difficulty IN ('basic', 'intermediate', 'advanced')),
  is_pretest BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}'
);

-- Student progress
CREATE TABLE public.progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id),
  subject TEXT NOT NULL,
  module_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,
  time_spent INTEGER,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pre_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can manage own pre-test" ON public.pre_test_results FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own learning path" ON public.learning_paths FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress" ON public.progress FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Lessons are public" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Questions are public" ON public.questions FOR SELECT USING (true);
