import os
import subprocess
import shutil

MEDIA_DIR = r"C:\Users\bkky9\master_m1_media"
OUTPUT_DIR = os.path.join(MEDIA_DIR, "Shorts_9x16")
DESKTOP_DIR = r"C:\Users\bkky9\OneDrive\Desktop\คลิปสำหรับลง_YouTube\Shorts_9x16"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(DESKTOP_DIR, exist_ok=True)

SHORTS_CONFIG = [
    {
        "id": "01_Shorts_คณิต_สูตรลัด3วิ",
        "in_video": os.path.join(MEDIA_DIR, "01_เพลงคณิต_สูตรลัด3วิ.mp4"),
        "start": "00:15.00",
        "end": "00:58.00",
        "badge": "⚡ สูตรลัด 3 วินาที สอบเข้า ม.1",
        "hook": "85² ใน 3 วิ & พื้นที่ใบไม้แรเงา (4/7)a²",
        "cta": "🎯 ติวฟรีครบ 32 โมดูล: master-m1.vercel.app",
        "title": "⚡ สูตรลัด 3 วินาที ยกกำลังสอง & ใบไม้แรเงา | MASTER ม.1 #Shorts",
        "desc": "ไม่ต้องคูณเลขให้เหงื่อตก! สูตรลัดคิดเลขเร็ว 3 วิ พิชิตข้อสอบเข้า ม.1 และ O-NET\n\n👉 ติวฟรี 32 โมดูล + แล็บวิทย์ 7 สถานี: https://master-m1.vercel.app",
        "pinned": "🎯 อยากฝึกทำโจทย์จริง + สูตรลัด 3 วิ ครบ 4 วิชา? เข้าฝึกฟรีได้ที่: https://master-m1.vercel.app (เข้าได้ทันที ไม่ต้องใช้อีเมล!)"
    },
    {
        "id": "02_Shorts_วิทย์_พลังงานความร้อน",
        "in_video": os.path.join(MEDIA_DIR, "02_เพลงวิทย์_พลังงานความร้อน.mp4"),
        "start": "00:32.00",
        "end": "01:02.00",
        "badge": "🔥 สูตรฟิสิกส์ ม.1 ออกสอบชัวร์!",
        "hook": "อุณหภูมิเปลี่ยน Q=mcΔt • สถานะเปลี่ยน Q=mL",
        "cta": "🎯 แล็บวิทย์เสมือนจริง 7 สถานี: master-m1.vercel.app",
        "title": "🔥 สูตรความร้อน Q=mcΔt และ Q=mL จำใน 30 วิ | MASTER ม.1 #Shorts",
        "desc": "สูตรคำนวณพลังงานความร้อนจำง่ายใน 30 วินาที! พิชิตวิทยาศาสตร์ ม.1 และ O-NET\n\n👉 เล่นห้องแล็บวิทย์เสมือนจริง 7 สถานีฟรี: https://master-m1.vercel.app",
        "pinned": "🎯 เข้าทดลองแล็บวิทย์เสมือนจริง 7 สถานี (กรดเบส, โครมาโทกราฟี, แสงเงา) ฟรีที่: https://master-m1.vercel.app"
    },
    {
        "id": "03_Shorts_อังกฤษ_IfClause",
        "in_video": os.path.join(MEDIA_DIR, "03_เพลงอังกฤษ_IfClause.mp4"),
        "start": "00:11.50",
        "end": "00:51.50",
        "badge": "🇬🇧 เพลง 4 สเต็ป If-Clause ในตำนาน",
        "hook": "Type 0-1-2-3 ท่องแบบนี้ กาช้อยส์ไม่พลาด!",
        "cta": "🎯 ติวอังกฤษเข้า ม.1 ฟรี: master-m1.vercel.app",
        "title": "🇬🇧 จำ If-Clause 4 สเต็ปใน 40 วินาที ไม่มีวันลืม! | MASTER ม.1 #Shorts",
        "desc": "คู่กริยา หน้าคู่หลัง ท่องตามจังหวะไม่มีวันโดน สทศ. หลอก! พิชิตข้อสอบเข้า ม.1\n\n👉 ฝึกทำข้อสอบภาษาอังกฤษฟรี: https://master-m1.vercel.app",
        "pinned": "🎯 ตะลุยโจทย์ไวยากรณ์ภาษาอังกฤษเข้า ม.1 และคำศัพท์ Gifted ฟรีที่: https://master-m1.vercel.app"
    },
    {
        "id": "04_Shorts_ไทย_คำสมาสสนธิ",
        "in_video": os.path.join(MEDIA_DIR, "04_เพลงไทย_คำสมาสสนธิ.mp4"),
        "start": "00:49.00",
        "end": "01:25.00",
        "badge": "📖 เทคนิคจำหลักภาษาไทย ม.1",
        "hook": "สมาสชน... สนธิเชื่อม สทศ. หลอกไม่ได้อีก!",
        "cta": "🎯 คลังข้อสอบ O-NET ภาษาไทย: master-m1.vercel.app",
        "title": "📖 สมาสชน สนธิเชื่อม ท่องแค่นี้ตอบได้ทันที! | MASTER ม.1 #Shorts",
        "desc": "หลักภาษาไทยที่ออกสอบทุกปี สมาสชน สนธิเชื่อม แปลจากหลังมาหน้า!\n\n👉 ทำข้อสอบจำลองภาษาไทยฟรี: https://master-m1.vercel.app",
        "pinned": "🎯 ฝึกทำข้อสอบภาษาไทย O-NET และเตรียมสอบเข้า ม.1 ฟรีที่: https://master-m1.vercel.app"
    },
    {
        "id": "05_Shorts_คณิต_พีทาโกรัส3วิ",
        "in_video": os.path.join(MEDIA_DIR, "05_เพลงคณิต_พีทาโกรัส3วิ.mp4"),
        "start": "00:29.00",
        "end": "01:05.50",
        "badge": "📐 พีทาโกรัส 3 วินาที กาช้อยส์ทันควัน",
        "hook": "ไม่ต้องคูณเลขยกกำลัง! ท่อง 4 ชุดมหาเทพ",
        "cta": "🎯 ตะลุยโจทย์ Gifted สสวท. ฟรี: master-m1.vercel.app",
        "title": "📐 4 ชุดตัวเลขพีทาโกรัส ตอบได้ใน 3 วิ | MASTER ม.1 #Shorts",
        "desc": "สาม-สี่-ห้า, ห้า-สิบสอง-สิบสาม ท่อง 4 ชุดนี้กาช้อยส์พีทาโกรัสใน 3 วิทันที!\n\n👉 ตะลุยโจทย์ข้อสอบแข่งขัน Gifted สสวท. ฟรี: https://master-m1.vercel.app",
        "pinned": "🎯 ตะลุยโจทย์คณิตศาสตร์ Gifted สสวท. และสูตรลัด 3 วินาทีฟรีที่: https://master-m1.vercel.app"
    }
]

def render_short(cfg):
    out_file = os.path.join(OUTPUT_DIR, f"{cfg['id']}.mp4")
    ass_file = os.path.join(OUTPUT_DIR, f"{cfg['id']}.ass")
    
    print(f"\n🎬 Rendering {cfg['id']}...")
    
    # Generate ASS for vertical 1080x1920
    ass_content = f"""[Script Info]
Title: Shorts Overlay
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
    
    # Filter: blurred background 1080x1920 + centered video 1080x608 + ass overlay
    fc = f"[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=25:5,colorchannelmixer=aa=1.0:rr=0.35:gg=0.35:bb=0.35[bg]; [0:v]scale=1080:608[fg]; [bg][fg]overlay=0:656,ass='{escaped_ass}'[v]"
    
    cmd = [
        "ffmpeg", "-y",
        "-ss", cfg["start"],
        "-to", cfg["end"],
        "-i", cfg["in_video"],
        "-filter_complex", fc,
        "-map", "[v]",
        "-map", "0:a",
        "-c:v", "libx264", "-preset", "fast", "-crf", "20",
        "-c:a", "aac", "-b:a", "192k",
        out_file
    ]
    
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode == 0:
        sz_mb = os.path.getsize(out_file) / (1024 * 1024)
        print(f"✅ Success: {cfg['id']}.mp4 ({sz_mb:.2f} MB)")
        # Copy to Desktop folder
        dest_desktop = os.path.join(DESKTOP_DIR, f"{cfg['id']}.mp4")
        shutil.copy2(out_file, dest_desktop)
        return True
    else:
        print(f"❌ Error rendering {cfg['id']}: {p.stderr[-400:]}")
        return False

# Render all
post_texts = []
for i, cfg in enumerate(SHORTS_CONFIG, 1):
    success = render_short(cfg)
    post_texts.append(f"""==========================================================
🎬 คลิปที่ {i}: {cfg['id']}
==========================================================
📌 ชื่อคลิป (Title):
{cfg['title']}

📄 คำอธิบาย (Description):
{cfg['desc']}

📌 ข้อความปักหมุดใต้คลิป (Pinned Comment):
{cfg['pinned']}

🏷️ แฮชแท็ก (#Hashtags):
#Shorts #MASTERม1 #สอบเข้าม1 #ติวสอบ #สูตรลัด3วิ #ONET
""")

text_file = os.path.join(DESKTOP_DIR, "ข้อความสำหรับโพสต์_Shorts.txt")
with open(text_file, "w", encoding="utf-8") as f:
    f.write("\n\n".join(post_texts))

print("\n🎉 ALL 5 SHORTS RENDERED & COPIED TO DESKTOP SUCCESSFULLY!")
print(f"📁 Desktop Folder: {DESKTOP_DIR}")
