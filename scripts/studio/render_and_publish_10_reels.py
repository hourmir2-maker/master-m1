# -*- coding: utf-8 -*-
"""
Automation script to render 10 additional short-form 9:16 vertical Reels
and publish them immediately to Meta Graph API to complete Facebook Professional Mission:
"สร้างคลิป Reels สาธารณะใหม่ 15 รายการ (15/15 Completed)"
"""
import os
import subprocess
import urllib.request
import urllib.parse
import json
import time

MEDIA_DIR = r"C:\Users\bkky9\master_m1_media"
OUTPUT_DIR = os.path.join(MEDIA_DIR, "Shorts_9x16")
DESKTOP_DIR = r"C:\Users\bkky9\OneDrive\Desktop\คลิปสำหรับลง_YouTube\Shorts_9x16"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(DESKTOP_DIR, exist_ok=True)

# Load Meta Graph API token
token = ""
page_id = "645243598902533"

with open(".env.local", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if line.startswith("FB_PAGE_TOKEN="):
            token = line.split("=", 1)[1].strip().strip('"').strip("'")
        if line.startswith("FB_PAGE_ID="):
            page_id = line.split("=", 1)[1].strip().strip('"').strip("'")

# 10 Additional Reels (06 to 15)
REELS_CONFIG = [
    {
        "id": "06_Shorts_คณิต_คิดเลขเร็วเปิดเพลง",
        "in_video": os.path.join(MEDIA_DIR, "01_เพลงคณิต_สูตรลัด3วิ.mp4"),
        "start": "00:00.00",
        "end": "00:28.00",
        "badge": "⚡ เทคนิคคิดเลขเร็ว 3 วิ สอบเข้า ม.1",
        "hook": "ยินดีต้อนรับสู่แดนคณิต เลขชี้กำลัง & พื้นที่",
        "cta": "🎯 ติวฟรีครบ 32 โมดูล: master-m1.vercel.app",
        "title": "⚡ คิดเลขเร็วมหาเทพ ยกกำลังสองลงท้ายด้วย 5 ใน 3 วิ! | MASTER ม.1 #Reels",
        "caption": """⚡ เทคนิคคิดเลขเร็ว 3 วิ สอบเข้า ม.1 และ O-NET 2570! 🔢✨

ท่องคาถาคิดเลขเร็ว ยกกำลังสองลงท้ายด้วย 5 ใน 3 วินาที ไม่ต้องทดเลขยาวให้เหนื่อย!
🎯 ติวฟรีครบ 32 โมดูล + แล็บเสมือนจริง 15 สถานี:
👉 https://master-m1.vercel.app (เข้าได้ทันที ไม่ต้องใช้อีเมล!)

#Reels #MASTERม1 #คณิตศาสตร์ #คิดเลขเร็ว #สอบเข้าม1 #ONET #เตรียมสอบม1 #Edutainment"""
    },
    {
        "id": "07_Shorts_คณิต_สูตรใบไม้และสามเหลี่ยม",
        "in_video": os.path.join(MEDIA_DIR, "01_เพลงคณิต_สูตรลัด3วิ.mp4"),
        "start": "01:00.00",
        "end": "01:35.00",
        "badge": "📐 พื้นที่ใบไม้แรเงา (4/7)a² ใน 3 วินาที",
        "hook": "ข้อสอบเรขาคณิตออกทุกปี จำสูตรนี้กาคะแนนเต็ม!",
        "cta": "🎯 ตะลุยโจทย์จริงฟรี: master-m1.vercel.app",
        "title": "📐 สูตรลัดพื้นที่ใบไม้แรเงา (4/7)a² กาใน 3 วิ! | MASTER ม.1 #Reels",
        "caption": """📐 สูตรลัดหาพื้นที่ใบไม้แรเงา (4/7)a² เจอในข้อสอบเข้า ม.1 ทุกปี! ⚡

ไม่ต้องเสียเวลาหาพื้นที่สี่เหลี่ยมลบเซกเตอร์วงกลมให้ปวดหัว จำสูตรลัด (4/7)a² กาช้อยส์ตอบได้ใน 3 วิทันที!
🎯 ฝึกทำข้อสอบคณิตศาสตร์เสมือนจริงฟรี:
👉 https://master-m1.vercel.app

#Reels #MASTERม1 #คณิตศาสตร์ #สูตรลัด #สอบเข้าม1 #ONET #สสวท #Gifted"""
    },
    {
        "id": "08_Shorts_วิทย์_ความร้อนเปลี่ยนสถานะ",
        "in_video": os.path.join(MEDIA_DIR, "02_เพลงวิทย์_พลังงานความร้อน.mp4"),
        "start": "00:00.00",
        "end": "00:30.00",
        "badge": "🔬 วิทยาศาสตร์ ม.1 การถ่ายโอนความร้อน",
        "hook": "พลังงานความร้อนไหลจากอุณหภูมิสูงไปต่ำเสมอ",
        "cta": "🎯 แล็บวิทย์เสมือนจริง: master-m1.vercel.app",
        "title": "🔬 การถ่ายโอนความร้อน & กราฟเปลี่ยนสถานะ | MASTER ม.1 #Reels",
        "caption": """🔬 กฎการถ่ายโอนความร้อนและกราฟอุณหภูมิ วิทยาศาสตร์ ม.1 & O-NET ❄️🔥

พลังงานความร้อนไหลจากอุณหภูมิสูงไปสู่อุณหภูมิต่ำเสมอจนเข้าสู่ 'สมดุลความร้อน'!
🎯 ทดลองในห้องแล็บเสมือนจริง 15 สถานีฟรี:
👉 https://master-m1.vercel.app

#Reels #MASTERม1 #วิทยาศาสตร์ #ความร้อน #สอบเข้าม1 #ONET #Edutainment"""
    },
    {
        "id": "09_Shorts_วิทย์_สมดุลความร้อนตัดคะแนน",
        "in_video": os.path.join(MEDIA_DIR, "02_เพลงวิทย์_พลังงานความร้อน.mp4"),
        "start": "01:05.00",
        "end": "01:42.00",
        "badge": "💎 สูตรลัดสมดุลความร้อน Q_loss = Q_gain",
        "hook": "มวลน้ำเท่ากัน อุณหภูมิผสมคือค่าเฉลี่ยทันที!",
        "cta": "🎯 เล่นแล็บสมดุลความร้อนฟรี: master-m1.vercel.app",
        "title": "💎 เทคนิค 3 วิ สมดุลความร้อน ห้อง Gifted สสวท. | MASTER ม.1 #Reels",
        "caption": """💎 สูตรลัด 3 วินาที สมดุลความร้อน ข้อสอบแข่งขันห้อง Gifted สสวท. 🔥❄️

Q_loss = Q_gain! หากมวลน้ำเท่ากัน (m1 = m2) อุณหภูมิผสมสุดท้ายจะเป็นค่าเฉลี่ยเลขคณิตทันที T = (T1 + T2)/2!
🎯 ทดลองปรับมวลและอุณหภูมิน้ำในแล็บเสมือนจริง:
👉 https://master-m1.vercel.app/virtual-lab

#Reels #MASTERม1 #ฟิสิกส์ #วิทยาศาสตร์ #สมดุลความร้อน #Gifted #สสวท"""
    },
    {
        "id": "10_Shorts_อังกฤษ_IfClause_Type0_1",
        "in_video": os.path.join(MEDIA_DIR, "03_เพลงอังกฤษ_IfClause.mp4"),
        "start": "00:00.00",
        "end": "00:30.00",
        "badge": "🇬🇧 If-Clause Type 0 และ Type 1 ใน 30 วิ",
        "hook": "ศูนย์จริงเสมอ หนึ่งเป็นไปได้ในอนาคต!",
        "cta": "🎯 ติวอังกฤษเข้า ม.1 ฟรี: master-m1.vercel.app",
        "title": "🇬🇧 If-Clause Type 0 & 1 ท่องตามจังหวะจำได้แม่น! | MASTER ม.1 #Reels",
        "caption": """🇬🇧 ท่อง If-Clause Type 0 และ Type 1 ใน 30 วินาที! ⚡

Type 0: If Present, Present (ความจริงธรรมชาติ)
Type 1: If Present, will + V.inf (เป็นไปได้ในอนาคต)
🎯 ตะลุยโจทย์ไวยากรณ์ภาษาอังกฤษเข้า ม.1 ฟรี:
👉 https://master-m1.vercel.app

#Reels #MASTERม1 #ภาษาอังกฤษ #IfClause #Grammar #สอบเข้าม1 #ONET"""
    },
    {
        "id": "11_Shorts_อังกฤษ_IfClause_Type2_3",
        "in_video": os.path.join(MEDIA_DIR, "03_เพลงอังกฤษ_IfClause.mp4"),
        "start": "00:55.00",
        "end": "01:32.00",
        "badge": "🚨 จุดลวง สทศ. อันดับ 1: If I were you",
        "hook": "Type 2 ประธานทุกคนใช้ WERE! Type 3 had+V.3",
        "cta": "🎯 คลังข้อสอบภาษาอังกฤษ: master-m1.vercel.app",
        "title": "🚨 จุดลวง สทศ. If-Clause Type 2 & 3 ทำไมต้องใช้ WERE? | MASTER ม.1 #Reels",
        "caption": """🚨 จุดลวง สทศ. อันดับ 1 ที่เด็ก ม.1 พลาดบ่อยที่สุด: If I were you! 🇬🇧✨

ในโลกสมมติตรงข้ามความจริง (Type 2) ประธานทุกคนต้องใช้ WERE เท่านั้น ห้ามใช้ was เด็ดขาด!
🎯 ฝึกทำข้อสอบภาษาอังกฤษและคำศัพท์ Oxford 3000 ฟรี:
👉 https://master-m1.vercel.app

#Reels #MASTERม1 #ภาษาอังกฤษ #IfClause #จุดลวงสทศ #สอบเข้าม1 #ONET"""
    },
    {
        "id": "12_Shorts_ไทย_สมาสชน_บทนำ",
        "in_video": os.path.join(MEDIA_DIR, "04_เพลงไทย_คำสมาสสนธิ.mp4"),
        "start": "00:00.00",
        "end": "00:32.00",
        "badge": "📖 คาถาสมาสชน หลักภาษาไทย ม.1",
        "hook": "คำบาลีสันสกฤต นำมาชนกัน แปลหลังมาหน้า",
        "cta": "🎯 ตะลุยโจทย์ไทย O-NET: master-m1.vercel.app",
        "title": "📖 คาถาสมาสชน หลักภาษาไทยออกสอบทุกปี | MASTER ม.1 #Reels",
        "caption": """📖 คาถาสมาสชน หลักภาษาไทย ม.1 ออกสอบ O-NET ทุกปี! 🇹🇭✨

สมาสชน คือการนำคำบาลี-สันสกฤตมาชนกัน แปลความหมายจากหลังมาหน้า เช่น ภูมิศาสตร์, ราชการ
🎯 เล่นแท่นหลอมคำสมาส-สนธิใน Virtual Lab ฟรี:
👉 https://master-m1.vercel.app/virtual-lab

#Reels #MASTERม1 #ภาษาไทย #คำสมาส #สอบเข้าม1 #ONET #เตรียมสอบม1"""
    },
    {
        "id": "13_Shorts_ไทย_สนธิเชื่อมเสียงสระ",
        "in_video": os.path.join(MEDIA_DIR, "04_เพลงไทย_คำสมาสสนธิ.mp4"),
        "start": "01:28.00",
        "end": "02:02.00",
        "badge": "💥 สนธิเชื่อมเสียง ตัดสระหน้า กลืนเสียงหลัง",
        "hook": "กายะ + อินทรีย์ = กายินทรีย์ เชื่อมเสียงกลมกลืน",
        "cta": "🎯 เล่นแท่นหลอมคำฟรี: master-m1.vercel.app",
        "title": "💥 สนธิเชื่อมเสียง กลืนคำกลมกลืน สทศ. หลอกไม่ได้! | MASTER ม.1 #Reels",
        "caption": """💥 สนธิเชื่อมเสียง ตัดสระหน้า กลืนเข้าสระหลัง! หลักภาษาไทย ม.1 📖🇹🇭

เคล็ดลับแยกคำสนธิ: สมาสชน สนธิเชื่อม! เสียงจะเชื่อมกลืนกัน เช่น มหา + อรรณพ = มหรรณพ
🎯 ฝึกทำข้อสอบภาษาไทย 32 โมดูลฟรี:
👉 https://master-m1.vercel.app

#Reels #MASTERม1 #ภาษาไทย #คำสนธิ #สอบเข้าม1 #ONET #เตรียมสอบม1"""
    },
    {
        "id": "14_Shorts_คณิต_พีทาโกรัสเปิดเพลง",
        "in_video": os.path.join(MEDIA_DIR, "05_เพลงคณิต_พีทาโกรัส3วิ.mp4"),
        "start": "00:00.00",
        "end": "00:28.00",
        "badge": "📐 สามเหลี่ยมมุมฉาก พีทาโกรัส ม.1",
        "hook": "a² + b² = c² ด้านตรงข้ามมุมฉากยาวที่สุดเสมอ",
        "cta": "🎯 ตะลุยโจทย์เรขาคณิต: master-m1.vercel.app",
        "title": "📐 พีทาโกรัสสามเหลี่ยมมุมฉาก a² + b² = c² | MASTER ม.1 #Reels",
        "caption": """📐 ทฤษฎีบทพีทาโกรัส สามเหลี่ยมมุมฉากใน 30 วินาที! 🔢⚡

a² + b² = c² ด้านตรงข้ามมุมฉาก (c) ต้องยาวที่สุดเสมอ!
🎯 ติวฟรีคณิตศาสตร์เตรียมสอบเข้า ม.1 โรงเรียนดัง:
👉 https://master-m1.vercel.app

#Reels #MASTERม1 #คณิตศาสตร์ #พีทาโกรัส #สอบเข้าม1 #ONET #เตรียมสอบม1"""
    },
    {
        "id": "15_Shorts_คณิต_พีทาโกรัสฮุกสอง",
        "in_video": os.path.join(MEDIA_DIR, "05_เพลงคณิต_พีทาโกรัส3วิ.mp4"),
        "start": "01:08.00",
        "end": "01:42.00",
        "badge": "⚡ 4 ชุดตัวเลขพีทาโกรัส ท่องจำกาช้อยส์ 3 วิ",
        "hook": "3-4-5 • 5-12-13 • 7-24-25 • 8-15-17",
        "cta": "🎯 คลังสูตรลัด 3 วิ: master-m1.vercel.app",
        "title": "⚡ 4 ชุดตัวเลขพีทาโกรัสยอดฮิต ท่องจบกาตอบได้ใน 3 วิ! | MASTER ม.1 #Reels",
        "caption": """⚡ 4 ชุดตัวเลขพีทาโกรัสยอดฮิต ท่องจบกาตอบได้ใน 3 วินาที! 📐🏆

สาม-สี่-ห้า • ห้า-สิบสอง-สิบสาม • เจ็ด-ยี่สิบสี่-ยี่สิบห้า • แปด-สิบห้า-สิบเจ็ด
ไม่ต้องเสียเวลาถอดสแควร์รูท กาช้อยส์ได้เร็วกว่าเพื่อน 10 เท่า!
🎯 ตะลุยโจทย์ข้อสอบแข่งขันห้อง Gifted สสวท. ฟรี:
👉 https://master-m1.vercel.app

#Reels #MASTERม1 #คณิตศาสตร์ #พีทาโกรัส #สูตรลัด3วิ #สอบเข้าม1 #Gifted"""
    }
]

def render_short(cfg):
    out_file = os.path.join(OUTPUT_DIR, f"{cfg['id']}.mp4")
    ass_file = os.path.join(OUTPUT_DIR, f"{cfg['id']}.ass")
    
    print(f"\n🎬 Rendering {cfg['id']}...", flush=True)
    
    # ASS Subtitle for Banner Header & CTA Footer
    ass_content = f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: TopBadge,Tahoma,44,&H0000FFFF,&H00000000,&H00000000,&H80000000,-1,0,0,0,100,100,1,0,1,5,2,8,40,40,240,1
Style: SubHook,Tahoma,34,&H00FFFFFF,&H00000000,&H00000000,&H80000000,-1,0,0,0,100,100,1,0,1,4,2,8,40,40,320,1
Style: BottomCTA,Tahoma,32,&H002BF7FF,&H00000000,&H00000000,&H80000000,-1,0,0,0,100,100,1,0,1,4,2,2,40,40,240,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:02:00.00,TopBadge,,0,0,0,,{cfg['badge']}
Dialogue: 0,0:00:00.00,0:02:00.00,SubHook,,0,0,0,,{cfg['hook']}
Dialogue: 0,0:00:00.00,0:02:00.00,BottomCTA,,0,0,0,,{cfg['cta']}
"""
    with open(ass_file, "w", encoding="utf-8") as f:
        f.write(ass_content)

    escaped_ass = ass_file.replace("\\", "/").replace(":", "\\:")

    fc = f"[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=25:5,colorchannelmixer=aa=1.0:rr=0.35:gg=0.35:bb=0.35[bg]; [0:v]scale=1080:608[fg]; [bg][fg]overlay=0:656,ass='{escaped_ass}'[v]"

    cmd = [
        "ffmpeg", "-y",
        "-ss", cfg['start'],
        "-to", cfg['end'],
        "-i", cfg['in_video'],
        "-filter_complex", fc,
        "-map", "[v]",
        "-map", "0:a",
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "20",
        "-c:a", "aac",
        "-b:a", "192k",
        out_file
    ]

    res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")
    if res.returncode == 0:
        print(f"✅ Rendered successfully: {out_file} ({os.path.getsize(out_file):,} bytes)", flush=True)
        dest = os.path.join(DESKTOP_DIR, f"{cfg['id']}.mp4")
        shutil_dest(out_file, dest)
        return out_file
    else:
        print(f"❌ Error rendering {cfg['id']}: {res.stderr[-300:]}", flush=True)
        return None

def shutil_dest(src, dst):
    import shutil
    try:
        shutil.copy2(src, dst)
    except Exception as e:
        pass

def publish_reel(file_path, title, caption):
    file_size = os.path.getsize(file_path)
    print(f"\n🚀 [Phase 1/3] Initializing Reel session on Page {page_id}...", flush=True)
    
    url_init = f"https://graph.facebook.com/v21.0/{page_id}/video_reels"
    payload_init = urllib.parse.urlencode({
        "upload_phase": "start",
        "access_token": token
    }).encode("utf-8")
    
    req_init = urllib.request.Request(url_init, data=payload_init, method="POST")
    with urllib.request.urlopen(req_init) as resp:
        res_init = json.loads(resp.read().decode("utf-8"))
    
    video_id = res_init.get("video_id")
    upload_url = res_init.get("upload_url")
    print(f"   Video ID: {video_id}", flush=True)
    
    # Phase 2: Binary Upload
    print(f"📤 [Phase 2/3] Uploading binary payload ({file_size:,} bytes)...", flush=True)
    with open(file_path, "rb") as f:
        video_bytes = f.read()
        
    req_up = urllib.request.Request(upload_url, data=video_bytes, method="POST")
    req_up.add_header("Authorization", f"OAuth {token}")
    req_up.add_header("offset", "0")
    req_up.add_header("file_size", str(file_size))
    
    with urllib.request.urlopen(req_up) as resp:
        res_up = json.loads(resp.read().decode("utf-8"))
    print(f"   Upload result: {res_up}", flush=True)
    
    # Phase 3: Publish
    print(f"📢 [Phase 3/3] Finalizing & Publishing Reel...", flush=True)
    url_finish = f"https://graph.facebook.com/v21.0/{page_id}/video_reels"
    payload_finish = urllib.parse.urlencode({
        "upload_phase": "finish",
        "access_token": token,
        "video_id": video_id,
        "video_state": "PUBLISHED",
        "description": caption
    }).encode("utf-8")
    
    req_finish = urllib.request.Request(url_finish, data=payload_finish, method="POST")
    with urllib.request.urlopen(req_finish) as resp:
        res_finish = json.loads(resp.read().decode("utf-8"))
    
    print(f"🎉 Reel published successfully! Post ID: {res_finish.get('post_id', video_id)}", flush=True)
    return res_finish.get('post_id', video_id)

print(f"🔥 Starting Render & Publish Pipeline for 10 Additional Reels (06 to 15)...", flush=True)
published_ids = []

for i, cfg in enumerate(REELS_CONFIG, start=6):
    print(f"\n=======================================================", flush=True)
    print(f"[{i}/15] Processing Reel #{i}: {cfg['title']}", flush=True)
    print(f"=======================================================", flush=True)
    out_mp4 = render_short(cfg)
    if out_mp4 and os.path.exists(out_mp4):
        try:
            pid = publish_reel(out_mp4, cfg['title'], cfg['caption'])
            published_ids.append((cfg['id'], pid))
            time.sleep(2) # Short pause between uploads
        except Exception as e:
            print(f"❌ Error publishing {cfg['id']}: {e}", flush=True)
    else:
        print(f"⚠️ Skipping publishing for {cfg['id']} due to render error.", flush=True)

print(f"\n🏆 Completed! Successfully rendered and published {len(published_ids)} Reels!", flush=True)
for cid, pid in published_ids:
    print(f"  • {cid} ➔ Post ID: {pid}", flush=True)
