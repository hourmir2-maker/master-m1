แชทใหม่
ค้นหาแชท
พรีพรอมต์
ชุดคำสั่งที่บันทึกไว้
คลัง
เรียนรู้เกี่ยวกับ AI
ผู้ช่วยอัจฉริยะ
โฟลเดอร์
รายการแชท
ออกแบบสถาปัตยกรรม MASTER GROW Coaching Engine
ทักทายจากชบา
กลยุทธ์พัฒนาแพลตฟอร์มการเรียนรู้ MASTER
เทคนิคคิดเลขเร็วคณิตศาสตร์ สสวท มหนึ่ง
Animated student solving math equations
ทดสอบระบบ AiPASS
วิเคราะห์ระบบ MASTER สำหรับโรงเรียน
hour mir2
hourmir2@gmail.com
Toggle Sidebar
คำตอบ
ลิงก์
รูปภาพ
GPT-5.6 Terra

ในฐานะ Chief EdTech Architect & Pedagogy Specialist ร่วมออกแบบสถาปัตยกรรม "MASTER-GROW Coaching Engine" สำหรับแพลตฟอร์ม MASTER ม.1 (ป.1 - ม.1 อิงหลักสูตรแกนกลาง สพฐ. 2551 ปรับปรุง 2560 ครบ 4 วิชาหลัก 56 โมดูลจริงบน Supabase Cloud)

ขอให้ออกแบบ 4 องค์ประกอบสำคัญอย่างละเอียด:
1. [G - Goal Mastery]: โครงสร้างการตั้งเป้าหมายของนักเรียน (เช่น เตรียมสอบเข้า ม.1 Gifted วิทย์-คณิต สู่ เภสัชกร, O-NET 2570, NT ป.3) และสูตรคำนวณ Goal Readiness Index จาก 0-100%
2. [R - Real-time Cloud Telemetry]: เกณฑ์การวิเคราะห์จุดแข็งและจุดรั่วไหลของคะแนน (Score Leakage Detection) จากประวัติการทำข้อสอบ 56 โมดูล
3. [O - Optimized Micro-Pathway]: วิธีจัดลำดับคิวการเรียนรู้แบบ Do Less, Get More โดยเสิร์ฟเฉพาะ "สูตรลัด 3 วินาที" และ "จุดลวง สทศ." ที่ตรงกับจุดอ่อน
4. [W - Win & Cognitive Reframing]: ตัวอย่างเทมเพลตข้อความภาษาไทยปรับกรอบความคิด (Cognitive Reframing) เมื่อนักเรียนทำข้อสอบผิดใน 4 วิชาหลัก และรูปแบบข้อความแนะนำผู้ปกครอง (Parent Coaching Tip) สำหรับส่งผ่าน Telegram Bot

ขอคำตอบแบบโครงสร้างชัดเจน พร้อมสำหรับนำไปเขียนเป็น TypeScript Module ในระบบจริง

Bookmark
Edit
Copy message
MASTER-GROW Coaching Engine — สถาปัตยกรรมสำหรับ MASTER ม.1

ออกแบบให้เป็น closed-loop coaching system: ตั้งเป้าหมาย → เก็บหลักฐานการเรียนจริง → ตรวจจุดรั่วของคะแนน → เลือกไมโครพาธที่คุ้มเวลาที่สุด → ส่งแรงเสริมแก่เด็กและผู้ปกครอง

ฐานเนื้อหาทั้ง 56 โมดูลควร map ระดับ module → lesson → skill → ตัวชี้วัด/สาระ → ชั้นเรียน → ข้อสอบเป้าหมาย โดยอิงตัวชี้วัดหลักสูตรแกนกลาง 2551 (ปรับปรุง 2560) ที่ สพฐ. เผยแพร่ 
OBEC

สำหรับ O-NET ให้เก็บ Blueprint เป็นข้อมูลแบบ versioned ตามปีการศึกษา ไม่ hard-code เพราะ สทศ. เผยแพร่ผังสร้างข้อสอบตามรอบการสอบ และ O-NET ใช้กับระดับ ป.6 และ ม.3 
Niets

0. Domain Model กลางที่ทุกองค์ประกอบใช้ร่วมกัน
Taxonomy ที่ต้องมี

0. Domain Model กลางที่ทุกองค์ประกอบใช้ร่วมกัน

Code · TS

Open
หลักการสำคัญ
1 ข้อสอบต้องผูกได้หลาย skill แต่กำหนด coverageWeight เพื่อไม่ให้คะแนนข้อเดียวถูกนับเต็มซ้ำหลายจุด
ทุกคำตอบต้องเป็น event ไม่ใช่เก็บเพียงคะแนนรวม เพราะการวิเคราะห์ “ทำไมผิด” ต้องใช้เวลา, hint, การเปลี่ยนคำตอบ, confidence และ distractor
เก็บ Target Blueprint แบบมีเวอร์ชัน เช่น onet_2570_draft, gifted_school_x_2027, nt_p3_yyyy พร้อม effective_from, effective_to, source_url
เป้าหมาย “สอบเข้า Gifted เพื่อสู่เภสัชกร” ควรแยกเป็น 2 ชั้น: near-term admission goal และ long-term aspiration เพื่อไม่ใช้ความฝันระยะยาวเป็นแรงกดดันคะแนนรายวัน
1. G — Goal Mastery
1.1 โครงสร้าง Goal ของนักเรียน

Goal ต้องแปลงจากข้อความกว้าง ๆ เป็น Target Profile ที่คำนวณได้

1.1 โครงสร้าง Goal ของนักเรียน

Code · TS

Open
ตัวอย่าง Goal Profiles
Goal	Output ที่ต้องวัด	Skill emphasis	ข้อควรออกแบบ
เตรียมสอบเข้า ม.1 Gifted วิทย์-คณิต	คะแนน mock test ตามเกณฑ์โรงเรียน, ความเร็ว, ความแม่นยำ	คณิตศาสตร์, วิทยาศาสตร์, อ่านจับใจความ	เก็บเกณฑ์รับเข้าและรูปแบบข้อสอบรายโรงเรียนเป็น version
O-NET 2570	ความพร้อมตาม blueprint ที่ประกาศในปีนั้น	4 วิชาหลักตามน้ำหนักข้อสอบ	ใช้เป็นเป้าหมายระยะยาวสำหรับผู้เรียนที่ยังไม่ถึงชั้นสอบ ไม่แสดงเป็นคำทำนายคะแนน
NT ป.3	mastery ของสมรรถนะ/สาระตามกรอบที่ใช้จริง	ภาษาไทย, คณิตศาสตร์ และ skill ที่เกี่ยวข้อง	เปิดใช้เฉพาะ cohort ที่ตรงระดับชั้นและ specification
สู่เภสัชกร	habit, science curiosity, reading comprehension, math fluency	วิทย์, คณิต, อังกฤษ, การอ่าน	เป็น aspiration; ไม่ควรมี “pass/fail” หรือ readiness แบบตัดสินอนาคต
1.2 Goal Readiness Index (GRI) 0–100
องค์ประกอบคะแนน
Component	น้ำหนัก	นิยาม
mastery	30	ระดับความเข้าใจของ target skills จากหลักฐานล่าสุด
coverage	20	สัดส่วน target skills ที่มีหลักฐานเพียงพอ
retention	15	ความจำคงทนจากการทบทวนแบบเว้นระยะ
examFit	15	ความพร้อมต่อรูปแบบและน้ำหนักของข้อสอบเป้าหมาย
pacing	10	ความคืบหน้าต่อแผนจนถึงวันเป้าหมาย
calibration	5	ความแม่นยำในการประเมินตนเอง
consistency	5	ความสม่ำเสมอที่เหมาะสม ไม่ใช่จำนวนชั่วโมงมากที่สุด
𝐺
𝑅
𝐼
=
100
×
(
0.30
𝑀
+
0.20
𝐶
+
0.15
𝑅
+
0.15
𝐸
+
0.10
𝑃
+
0.05
𝐾
+
0.05
𝑆
)
GRI=100×(0.30M+0.20C+0.15R+0.15E+0.10P+0.05K+0.05S)

โดยทุกค่ามีช่วง 
0
…
1
0…1

สูตรย่อย

1.2 Goal Readiness Index (GRI) 0–100

Code · TS

Open

1) Mastery (
𝑀
M)

𝑀
=
∑
𝑠
∈
𝑇
𝑎
𝑟
𝑔
𝑒
𝑡
𝑆
𝑘
𝑖
𝑙
𝑙
𝑠
𝑤
𝑠
×
𝑝
𝑀
𝑎
𝑠
𝑡
𝑒
𝑟
𝑦
𝑠
∑
𝑤
𝑠
M=
∑w
s
	​

∑
s∈TargetSkills
	​

w
s
	​

×pMastery
s
	​

	​

pMastery_s คือ posterior mastery ของ skill นั้น เช่น 0.78
ใช้ weighted evidence โดยให้ข้อใหม่กว่า, ข้อระดับยากกว่า และข้อที่ไม่มี hint มีน้ำหนักมากกว่า
หากยังไม่มี IRT/BKT ที่พร้อมใช้ ให้เริ่มด้วย Decayed Weighted Accuracy แล้วค่อยย้ายเป็น Bayesian Knowledge Tracing

1.2 Goal Readiness Index (GRI) 0–100

Code · TS

Open

2) Coverage (
𝐶
C)

𝐶
=
∑
𝑤
𝑠
⋅
𝐼
(
𝑛
𝑠
≥
𝑚
𝑖
𝑛
𝐸
𝑣
𝑖
𝑑
𝑒
𝑛
𝑐
𝑒
)
∑
𝑤
𝑠
C=
∑w
s
	​

∑w
s
	​

⋅I(n
s
	​

≥minEvidence)
	​

กำหนด minEvidence = 4–6 ข้ออิสระต่อ skill ในช่วง 45 วันล่าสุด
ป้องกันกรณีเด็กทำถูก 1 ข้อแล้วระบบสรุปว่า “เก่งแล้ว”

3) Retention (
𝑅
R)

𝑅
=
∑
𝑤
𝑠
⋅
𝑑
𝑒
𝑙
𝑎
𝑦
𝑒
𝑑
𝑅
𝑒
𝑐
𝑎
𝑙
𝑙
𝑠
∑
𝑤
𝑠
R=
∑w
s
	​

∑w
s
	​

⋅delayedRecall
s
	​

	​

วัดจาก retrieval check หลังเรียนอย่างน้อย 3–14 วัน
ข้อทบทวนต้องเป็น “ข้อใหม่ที่วัด skill เดิม” ไม่ใช่ท่องเฉลยข้อเดิม

4) Exam Fit (
𝐸
E)

𝐸
=
∑
𝑠
𝑘
𝑖
𝑙
𝑙
𝑏
𝑙
𝑢
𝑒
𝑝
𝑟
𝑖
𝑛
𝑡
𝑊
𝑒
𝑖
𝑔
ℎ
𝑡
𝑠
×
𝑟
𝑒
𝑐
𝑒
𝑛
𝑡
𝐸
𝑥
𝑎
𝑚
𝑀
𝑜
𝑑
𝑒
𝑀
𝑎
𝑠
𝑡
𝑒
𝑟
𝑦
𝑠
∑
𝑏
𝑙
𝑢
𝑒
𝑝
𝑟
𝑖
𝑛
𝑡
𝑊
𝑒
𝑖
𝑔
ℎ
𝑡
𝑠
E=
∑blueprintWeight
s
	​

∑
skill
	​

blueprintWeight
s
	​

×recentExamModeMastery
s
	​

	​

ใช้เฉพาะข้อที่มี examBlueprintVersionId ตรงกับเป้าหมาย
ปรับลดคะแนนเมื่อยังไม่เคยเจอโจทย์ใน cognitive level ที่ข้อสอบเป้าหมายต้องการ

5) Pacing (
𝑃
P)

𝑃
=
𝑐
𝑙
𝑎
𝑚
𝑝
(
𝑎
𝑐
𝑡
𝑢
𝑎
𝑙
𝐶
𝑜
𝑚
𝑝
𝑙
𝑒
𝑡
𝑒
𝑑
𝑊
𝑒
𝑖
𝑔
ℎ
𝑡
𝑒
𝑑
𝑊
𝑜
𝑟
𝑘
𝑒
𝑥
𝑝
𝑒
𝑐
𝑡
𝑒
𝑑
𝐶
𝑜
𝑚
𝑝
𝑙
𝑒
𝑡
𝑒
𝑑
𝑊
𝑒
𝑖
𝑔
ℎ
𝑡
𝑒
𝑑
𝑊
𝑜
𝑟
𝑘
,
0
,
1
)
P=clamp(
expectedCompletedWeightedWork
actualCompletedWeightedWork
	​

,0,1)
ไม่ใช้ “เวลาออนไลน์” เป็นหลักฐานการเรียน
weightedWork ควรนับ mastery check, retrieval practice และ repair completion มากกว่าการเปิดวิดีโอ

6) Calibration (
𝐾
K)

ให้นักเรียนตอบก่อนเฉลยว่า “มั่นใจแค่ไหน 1–5”

𝐾
=
1
−
1
𝑁
∑
∣
𝑐
𝑜
𝑛
𝑓
𝑖
𝑑
𝑒
𝑛
𝑐
𝑒
𝑖
−
𝑐
𝑜
𝑟
𝑟
𝑒
𝑐
𝑡
𝑛
𝑒
𝑠
𝑠
𝑖
∣
K=1−
N
1
	​

∑∣confidence
i
	​

−correctness
i
	​

∣
เด็กที่ตอบผิดแต่มั่นใจมาก: ต้องเพิ่มการอ่านโจทย์และตรวจคำตอบ
เด็กที่ตอบถูกแต่ไม่มั่นใจ: ต้องเสริม self-efficacy และ retrieval
Evidence Confidence: ห้ามให้ GRI หลอกตา

แสดง GRI ควบคู่ evidenceConfidence เสมอ

ts
function readinessLabel(gri: number, evidence: number) {
  if (evidence < 0.45) return "กำลังเก็บข้อมูล";
  if (gri >= 80) return "พร้อมท้าทาย";
  if (gri >= 60) return "ใกล้เป้าหมาย";
  if (gri >= 40) return "กำลังสร้างฐาน";
  return "เริ่มจากจุดคุ้มที่สุด";
}

ตัวอย่างที่ถูกต้อง: “GRI 72/100, ความเชื่อมั่นของข้อมูล 81%”
ตัวอย่างที่ไม่ควรใช้: “มีโอกาสสอบติด 72%”

2. R — Real-time Cloud Telemetry และ Score Leakage Detection
2.1 Event ที่ต้องส่งเข้าระบบ

2.1 Event ที่ต้องส่งเข้าระบบ

Code · TS

Open
Supabase event flow
text
Client
  → attempt_events (append-only)
  → Database Trigger / Queue
  → Edge Function: aggregate_telemetry
  → skill_snapshots + leakage_signals + goal_readiness_snapshots
  → Realtime channel / Telegram notification queue
attempt_events เป็น immutable event log
ตาราง snapshot เก็บผลคำนวณล่าสุด เพื่อให้ dashboard เร็ว
งานคำนวณหนัก เช่น IRT, cohort anomaly, daily planning ให้ทำผ่าน scheduled Edge Function หรือ background worker
ใช้ student_id = auth.uid() ใน Row Level Security; ผู้ปกครองอ่านได้เฉพาะบัญชีเด็กที่ผูกสิทธิ์และผ่าน consent
2.2 นิยาม “Score Leakage”

Score Leakage คือ คะแนนที่หายไปซ้ำ ๆ จากรูปแบบที่แก้ได้ชัดเจน ไม่ใช่เพียง “บทที่เด็กทำผิด”

Leakage taxonomy
Leakage type	สัญญาณ	ตัวอย่าง action
concept_gap	ผิดข้ามหลายรูปแบบของ skill เดียวกัน, ใช้เวลานาน	ซ่อมแก่นความคิด 1 micro-lesson ก่อนใช้สูตรลัด
procedure_gap	เข้าใจโจทย์แต่ลำดับวิธีทำผิดซ้ำ	worked example + checklist 3 ขั้น
trap_vulnerability	เลือก distractor/tag เดิมซ้ำ	เสิร์ฟ “จุดลวง” เฉพาะ tag
time_pressure	ถูกเมื่อทำช้า แต่ผิดเมื่อจำกัดเวลา	speed drill แบบลดเวลาทีละระดับ
careless_execution	ผิดง่ายมาก, เวลาเร็วผิดปกติ, มั่นใจสูง	5-second verification routine
retention_decay	ทำได้ทันทีหลังเรียน แต่พลาดใน delayed recall	spaced retrieval schedule
prerequisite_break	skill ปลายทางต่ำและ skill ต้นทางต่ำ	ย้อนซ่อม prerequisite ที่มี centrality สูง
language_load	วิทย์/คณิตผิดเฉพาะโจทย์ข้อความยาว	ฝึกแยกข้อมูล-คำถาม-หน่วย
2.3 Leakage Severity Score

คำนวณต่อ student × skill × goal:

𝐿
𝑒
𝑎
𝑘
𝑎
𝑔
𝑒
𝑆
𝑒
𝑣
𝑒
𝑟
𝑖
𝑡
𝑦
𝑠
=
100
×
[
0.30
𝐺
𝑠
+
0.20
𝐹
𝑠
+
0.15
𝑄
𝑠
+
0.15
𝑇
𝑠
+
0.10
𝐷
𝑠
+
0.10
𝑊
𝑠
]
LeakageSeverity
s
	​

=100×[0.30G
s
	​

+0.20F
s
	​

+0.15Q
s
	​

+0.15T
s
	​

+0.10D
s
	​

+0.10W
s
	​

]
ตัวแปร	ความหมาย

𝐺
𝑠
G
s
	​

	mastery gap: 
1
−
𝑝
𝑀
𝑎
𝑠
𝑡
𝑒
𝑟
𝑦
𝑠
1−pMastery
s
	​



𝐹
𝑠
F
s
	​

	failure recurrence: อัตราผิดซ้ำแบบถ่วงน้ำหนัก

𝑄
𝑠
Q
s
	​

	quality loss: hint dependence, rapid guessing, confidence mismatch

𝑇
𝑠
T
s
	​

	time loss: ใช้เวลาเกิน baseline หรือผิดเมื่อเร่งเวลา

𝐷
𝑠
D
s
	​

	dependency impact: prerequisite centrality

𝑊
𝑠
W
s
	​

	goal weight: น้ำหนักตามเป้าหมาย/blueprint
เกณฑ์การตัดสิน
Severity	สถานะ	การทำงานของ Engine
0–29	Stable	ทบทวนตามรอบปกติ
30–49	Watch	แทรก retrieval 1 ข้อในคิวถัดไป
50–69	Repair	จัด micro-path 8–12 นาที
70–84	Priority Leak	ขึ้นอันดับแรกของคิวและแจ้งเหตุผลแบบไม่ตีตรา
85–100	Foundation Blocker	หยุดเร่งบทปลายทางชั่วคราว ย้อน prerequisite พร้อม diagnostic สั้น
กฎตรวจจับเฉพาะที่ควร implement

2.3 Leakage Severity Score

Code · TS

Open
Guardrails เพื่อไม่วิเคราะห์ผิด
ต้องมีอย่างน้อย minEvidence ก่อนติดป้าย leakage ระดับสูง
ไม่ใช้ข้อมูลจากข้อที่ถูก report ว่าคำถาม/เฉลยผิด
ถ้าผู้เรียนทั้ง cohort ทำผิด distractor เดียวกันสูงผิดปกติ ให้ส่ง content_quality_alert ให้ทีมวิชาการ แทนการโทษนักเรียน
แยก practice mode กับ mock exam mode เพราะพฤติกรรมใช้ hint และเวลาไม่เทียบกันโดยตรง
Dashboard เด็กควรใช้คำว่า “จุดที่คุ้มจะฝึกต่อ” แทนคำว่า “จุดอ่อน” หรือ “รอยรั่ว”
3. O — Optimized Micro-Pathway: Do Less, Get More
3.1 หลักการจัดคิว

ไม่เสิร์ฟตามลำดับโมดูล 1 → 56 แต่เลือกสิ่งที่สร้าง Expected Score Gain ต่อ 1 นาที สูงสุด

𝑃
𝑟
𝑖
𝑜
𝑟
𝑖
𝑡
𝑦
(
𝑎
𝑠
𝑠
𝑒
𝑡
)
=
𝐸
𝑥
𝑝
𝑒
𝑐
𝑡
𝑒
𝑑
𝐺
𝑎
𝑖
𝑛
×
𝐺
𝑜
𝑎
𝑙
𝑊
𝑒
𝑖
𝑔
ℎ
𝑡
×
𝑈
𝑟
𝑔
𝑒
𝑛
𝑐
𝑦
×
𝑃
𝑟
𝑒
𝑟
𝑒
𝑞
𝑢
𝑖
𝑠
𝑖
𝑡
𝑒
𝐼
𝑚
𝑝
𝑎
𝑐
𝑡
×
𝐶
𝑜
𝑛
𝑓
𝑖
𝑑
𝑒
𝑛
𝑐
𝑒
𝐸
𝑠
𝑡
𝑖
𝑚
𝑎
𝑡
𝑒
𝑑
𝑀
𝑖
𝑛
𝑢
𝑡
𝑒
𝑠
−
𝑅
𝑒
𝑝
𝑒
𝑡
𝑖
𝑡
𝑖
𝑜
𝑛
𝑃
𝑒
𝑛
𝑎
𝑙
𝑡
𝑦
Priority(asset)=
EstimatedMinutes
ExpectedGain×GoalWeight×Urgency×PrerequisiteImpact×Confidence
	​

−RepetitionPenalty
Factor	ความหมาย
ExpectedGain	คาดการณ์การยกระดับ mastery จาก intervention
GoalWeight	ความสำคัญต่อเป้าหมายที่ active
Urgency	ใกล้วันสอบ/กำหนดสอบย่อยมากแค่ไหน
PrerequisiteImpact	แก้ 1 skill แล้วปลดหลาย skill ต่อไปได้หรือไม่
Confidence	ความน่าเชื่อถือของข้อมูล
EstimatedMinutes	เวลาที่ใช้จริง ไม่ใช่ความยาววิดีโอ
RepetitionPenalty	ลดความสำคัญเมื่อเด็กเห็นรูปแบบเดิมมากเกินไป
3.2 รูปแบบ Micro-Path มาตรฐาน 8–12 นาที

ทุก path มี “หนึ่งเป้าหมายการซ่อม” เท่านั้น

3.2 รูปแบบ Micro-Path มาตรฐาน 8–12 นาที

Code · TS

Open
ลำดับมาตรฐาน
Check-in 2 ข้อ: ยืนยันว่า leakage ยังมีอยู่จริง
Repair 1 จุด: อธิบายแก่นความคิดหรือขั้นตอนที่หลุด
สูตรลัด 3 วินาที: ให้เป็น retrieval cue ที่นำไปใช้ได้จริง
จุดลวงข้อสอบ: เปรียบเทียบคำตอบลวงกับวิธีตรวจจับ
Apply 2–3 ข้อ: ข้อใหม่ ไม่ซ้ำกับตัวอย่าง
Recall นัดถัดไป: 3, 7 และ 14 วัน ตามผลการตอบ

“สูตรลัด 3 วินาที” ต้องไม่ถูกใช้แทนความเข้าใจพื้นฐาน หาก pMastery(prerequisite) < 0.60 ให้เริ่มด้วย concept_repair ก่อนเสมอ

3.3 Content Contract สำหรับ Shortcut และ Trap Card

3.3 Content Contract สำหรับ Shortcut และ Trap Card

Code · TS

Open
ตัวอย่าง: คณิตศาสตร์ — เศษส่วน
ts
const fractionTrap: TrapCard = {
  id: "trap-fraction-common-denominator",
  skillId: "math.fraction.addition",
  trapTag: "add-numerators-denominators",
  trapQuestion: "เห็น 1/3 + 1/4 แล้วบวกเป็น 2/7 หรือเปล่า?",
  redFlag: "ตัวส่วนต่างกัน",
  escapeMove: "ทำตัวส่วนให้เท่ากันก่อน แล้วจึงบวกเฉพาะตัวเศษ",
  miniExample: "1/3 + 1/4 = 4/12 + 3/12 = 7/12",
};
Algorithm สร้างคิวรายวัน

3.3 Content Contract สำหรับ Shortcut และ Trap Card

Code · TS

Open
Daily queue ที่แนะนำ
สภาพผู้เรียน	คิว 15–20 นาที
มี Foundation Blocker	ซ่อม prerequisite 1 จุด + ฝึก 2 ข้อ + นัดทบทวน
มี Trap Leakage	Trap card 1 ใบ + ข้อเปรียบเทียบ 3 ข้อ + verify routine
แม่นแต่ช้า	timed drill 5 นาที + วิเคราะห์วิธีลัด + ข้อจับเวลา
GRI ดีและหลักฐานพอ	mixed retrieval จาก 2–3 วิชา เพื่อคง retention
เหนื่อย/มี streak ผิด	“quick win” 1 skill ที่โอกาสสำเร็จสูง ก่อนเริ่ม repair
4. W — Win & Cognitive Reframing
4.1 กติกาการเขียนข้อความถึงนักเรียน

ข้อความต้องมี 4 ส่วนเสมอ:

Fact: บอกสิ่งที่เกิดขึ้นโดยไม่ตัดสินตัวตน
Meaning: แปลความผิดเป็นข้อมูลการเรียนรู้
Next move: ให้ action เดียวที่ทำได้ทันที
Agency: ย้ำว่าความก้าวหน้าเกิดจากการฝึก ไม่ใช่ “เก่ง/ไม่เก่ง”

4.1 กติกาการเขียนข้อความถึงนักเรียน

Code · TS

Open
4.2 Cognitive Reframing Templates: 4 วิชาหลัก
วิชา	Trigger	Template ถึงนักเรียน
ภาษาไทย	อ่านจับใจความผิด	“{studentName} ข้อนี้ยังไม่ใช่การอ่านไม่เก่งนะ แต่โจทย์กำลังทดสอบการแยก ‘ใจความหลัก’ ออกจากรายละเอียด ลองวงคำที่ถามก่อน แล้วหาประโยคที่ตอบคำถามนั้นได้ตรงที่สุด 1 ประโยค”
คณิตศาสตร์	ผิดจากขั้นตอน/เครื่องหมาย	“ข้อนี้คำตอบหลุดที่ขั้น ‘{skillName}’ ไม่ใช่เพราะหนูทำคณิตไม่ได้ ลองใช้กฎ 3 วินาที: เขียนหน่วยหรือเครื่องหมายกำกับทุกบรรทัด แล้วเช็กก่อนตอบ 1 รอบ”
วิทยาศาสตร์	เข้าใจแนวคิดคลาดเคลื่อน	“คำตอบนี้บอกว่าเรายังสลับความหมายของ ‘{skillName}’ อยู่ ซึ่งเป็นจุดที่แก้ได้เร็วมาก ลองเทียบตัวอย่าง 2 แบบ แล้วตอบใหม่ว่า ‘อะไรเปลี่ยน’ และ ‘อะไรคงเดิม’”
ภาษาอังกฤษ	vocabulary/grammar ผิด	“ผิดข้อนี้ไม่ได้แปลว่าภาษาอังกฤษไม่ดีนะ เราเจอคำใบ้ในประโยคไม่ครบ ลองมองคำก่อน-หลังช่องว่าง 2 คำ แล้วเลือกชนิดคำก่อนเลือกคำตอบ”
Templates ตามชนิด Leakage

4.2 Cognitive Reframing Templates: 4 วิชาหลัก

Code · TS

Open
ข้อความที่ระบบไม่ควรใช้
“ทำไมข้อนี้ยังผิด”
“ต้องขยันกว่านี้”
“ง่ายแค่นี้เอง”
“หนูอ่อนเรื่องนี้”
“ถ้าไม่ทำวันนี้จะสอบไม่ติด”
4.3 Parent Coaching Tip สำหรับ Telegram Bot
หลักการส่ง
ส่งเฉพาะ 1 insight + 1 วิธีช่วย + 1 สิ่งที่ไม่ควรทำ
ไม่ส่งคะแนนย่อยทุกครั้งที่เด็กผิด
แนะนำความถี่ สรุป 2–3 ครั้ง/สัปดาห์ และ alert เฉพาะ Foundation Blocker ที่มีหลักฐานเพียงพอ
ใช้ภาษาที่ชวนร่วมมือ ไม่ทำให้ผู้ปกครองกลายเป็นผู้คุมสอบ
ต้องมี opt-in, เวลา quiet hours และช่องทางปิดแจ้งเตือน
ts
interface ParentTelegramPayload {
  studentName: string;
  goalTitle: string;
  insight: string;
  evidence: string;
  homeAction: string;
  avoid: string;
  nextReview: string;
}
Template มาตรฐาน

4.3 Parent Coaching Tip สำหรับ Telegram Bot

Code · TEXT

Open
ตัวอย่างตามวิชา
วิชา	Parent Coaching Tip
ภาษาไทย	“น้องกำลังฝึกแยกใจความสำคัญจากรายละเอียด โดยทำได้ดีขึ้นเมื่ออ่านคำถามก่อน ช่วยได้ด้วยการชวนตอบว่า ‘โจทย์ถามหาอะไร’ ก่อนอ่านย่อหน้า ไม่จำเป็นต้องเฉลยแทนน้อง”
คณิตศาสตร์	“น้องเข้าใจวิธีคิด แต่คะแนนหายจากเครื่องหมายและหน่วย ช่วยได้ด้วยการถามหลังทำเสร็จว่า ‘หนูเช็กเครื่องหมายกับหน่วยหรือยัง’ แทนการถามว่า ‘ตอบอะไร’”
วิทยาศาสตร์	“น้องกำลังเชื่อมเหตุและผลของเรื่อง {skillName} ช่วยได้ด้วยการชวนเล่าว่า ‘อะไรเปลี่ยน เพราะอะไร’ จากสิ่งรอบตัว ไม่ต้องเพิ่มแบบฝึกหัดจำนวนมาก”
ภาษาอังกฤษ	“น้องกำลังฝึกดูคำใบ้รอบช่องว่าง ช่วยได้ด้วยการถามว่า ‘คำนี้ควรเป็นคน การกระทำ หรือคำบอกลักษณะ’ ก่อนเปิดเฉลย”
5. Supabase Schema ขั้นต่ำ

5. Supabase Schema ขั้นต่ำ

Code · SQL

Open
6. TypeScript Service Boundary ที่แนะนำ

6. TypeScript Service Boundary ที่แนะนำ

Code · TS

Open
Acceptance Criteria สำหรับ MVP
นักเรียนมี Active Goal ได้มากกว่า 1 เป้าหมาย แต่ Daily Queue เลือก primary goal เพียง 1 เป้าหมายต่อ session
ทุก attempt อัปเดต skill snapshot ภายใน 5–15 วินาที
GRI ทุกค่าแสดง evidence confidence เสมอ
Leakage ระดับ Repair+ ต้องอธิบายได้ว่าเกิดจากหลักฐานใด
Micro-path หนึ่งชุดใช้เวลาไม่เกิน 12 นาที และมี success check เสมอ
Parent message ห้ามมีภาษาตัดสินตัวตน, เปรียบเทียบเด็ก, หรือคำทำนายโอกาสสอบติด
ทีมวิชาการสามารถแก้ blueprint, skill mapping, trap card และ shortcut card ได้โดยไม่ต้อง deploy โค้ดใหม่

ข้อเสนอแนะ: เริ่ม MVP ด้วย 8–12 high-frequency skills ต่อวิชา พร้อม item metadata ที่สะอาดก่อน แล้วค่อยขยายให้ครบทุก skill ใน 56 โมดูล คุณต้องการให้ผมต่อด้วย TypeScript/Supabase RPC สำหรับคำนวณ GRI และ Leakage Score โดยตรงหรือไม่?

แหล่งข้อมูล (20)
Copy message
Like
Dislike
Refresh
Add attachment
GPT-5.6 Terra
Send message

AI อาจผิดพลาดได้ หลีกเลี่ยงการใส่ข้อมูลส่วนตัวหรือความลับ