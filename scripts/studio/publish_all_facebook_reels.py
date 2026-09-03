import urllib.request
import urllib.parse
import json
import os
import time

token = ""
page_id = "645243598902533"

with open(".env.local", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if line.startswith("FB_PAGE_TOKEN="):
            token = line.split("=", 1)[1].strip().strip('"').strip("'")
        if line.startswith("FB_PAGE_ID="):
            page_id = line.split("=", 1)[1].strip().strip('"').strip("'")

MEDIA_DIR = r"C:\Users\bkky9\master_m1_media\Shorts_9x16"

REELS_QUEUE = [
    {
        "file": "02_Shorts_วิทย์_พลังงานความร้อน.mp4",
        "title": "🔥 สูตรความร้อน Q=mcΔt และ Q=mL จำใน 30 วิ",
        "caption": """🔥 สรุปสูตรฟิสิกส์ ม.1 ออกสอบชัวร์: Q = mcΔt & Q = mL ❄️⚡

สูตรคำนวณความร้อนจำง่ายใน 30 วินาที! พิชิตวิทยาศาสตร์ ม.1 และ O-NET 2570
🔥 อุณหภูมิเปลี่ยน... ให้เรียกหา Q = mcΔt (ไมค์ เดลต้า ที)!
❄️ สถานะเปลี่ยน (อุณหภูมิคงที่)... สลับมาใช้ Q = mL ความร้อนแฝงทันที!
⚡ แฝงหลอมเหลว 80 cal/g • แฝงกลายเป็นไอ 540 cal/g แม่นยำ 100%

🎯 เข้าเล่นห้องแล็บวิทย์เสมือนจริง 7 สถานีฟรี:
👉 https://master-m1.vercel.app (เข้าเรียนได้ทันที ไม่ต้องใช้อีเมล!)

#Reels #MASTERม1 #วิทยาศาสตร์ #ฟิสิกส์ #สอบเข้าม1 #ONET #เตรียมสอบม1 #สูตรความร้อน #Edutainment"""
    },
    {
        "file": "03_Shorts_อังกฤษ_IfClause.mp4",
        "title": "🇬🇧 จำ If-Clause 4 สเต็ปใน 40 วินาที ไม่มีวันลืม!",
        "caption": """🇬🇧 เพลง 4 สเต็ป If-Clause ในตำนาน พิชิตข้อสอบเข้า ม.1 ⚡

จำคู่กริยา หน้าคู่หลัง ไม่มีวันโดน สทศ. หลอก! เพลง 4 สเต็ป If-Clause ท่องตามจังหวะ K-Pop สนุกๆ
⚡ Type 0: If Present, Present (ความจริงธรรมชาติ)
⚡ Type 1: If Present, will + V.inf (เป็นไปได้ในอนาคต)
⚡ Type 2: If Past Simple (were), would + V.inf (สมมติฝันกลางวัน)
⚡ Type 3: If had + V.3, would have + V.3 (เสียดายอดีต)

🎯 ติวข้อสอบภาษาอังกฤษเข้า ม.1 และคลังคำศัพท์ฟรี:
👉 https://master-m1.vercel.app (เข้าได้ทันที ไม่ต้องใช้อีเมล!)

#Reels #MASTERม1 #ภาษาอังกฤษ #IfClause #สอบเข้าม1 #ONET #เตรียมสอบม1 #ไวยากรณ์อังกฤษ #Edutainment"""
    },
    {
        "file": "04_Shorts_ไทย_คำสมาสสนธิ.mp4",
        "title": "📖 สมาสชน สนธิเชื่อม ท่องแค่นี้ตอบได้ทันที!",
        "caption": """📖 เทคนิคจำหลักภาษาไทย ม.1: สมาสชน... สนธิเชื่อม! ✨

สมาสชน สนธิเชื่อม แปลจากหลังมาหน้า! หลักภาษาไทยที่ออกสอบทุกปี
✨ สมาสชน: นำคำบาลี-สันสกฤตมาชนกัน (ภูมิศาสตร์, ศิลปกรรม) ห้ามใส่สระอะหรือทัณฑฆาตตรงรอยต่อ!
🌟 สนธิเชื่อม: ตัดสระหน้า กลืนเสียงเข้าหาคำหลัง (กายะ + อินทรีย์ = กายินทรีย์)
🎯 ระวังจุดลวง: คำที่มีภาษาไทยปน เช่น "ผลไม้" เป็นคำประสม ไม่ใช่คำสมาส!

🎯 ฝึกทำข้อสอบภาษาไทย O-NET ฟรี:
👉 https://master-m1.vercel.app (เข้าได้ทันที ไม่ต้องใช้อีเมล!)

#Reels #MASTERม1 #ภาษาไทย #คำสมาส #คำสนธิ #สอบเข้าม1 #ONET #เตรียมสอบม1 #Edutainment"""
    },
    {
        "file": "05_Shorts_คณิต_พีทาโกรัส3วิ.mp4",
        "title": "📐 4 ชุดตัวเลขพีทาโกรัส ตอบได้ใน 3 วิ",
        "caption": """📐 พีทาโกรัส 3 วินาที กาช้อยส์ทันควัน ไม่ต้องคูณเลขยกกำลัง! ⚡

เจอสามเหลี่ยมมุมฉาก กาช้อยส์ได้ใน 3 วินาที! ท่อง 4 ชุดตัวเลขมหาเทพที่ออกสอบบ่อยที่สุด:
1️⃣ 3 - 4 - 5 (คูณสองเป็น 6 - 8 - 10)
2️⃣ 5 - 12 - 13
3️⃣ 7 - 24 - 25
4️⃣ 8 - 15 - 17

🎯 ตะลุยโจทย์ Gifted สสวท. และสูตรลัดคณิตคิดเร็วฟรี:
👉 https://master-m1.vercel.app (เข้าได้ทันที ไม่ต้องใช้อีเมล!)

#Reels #MASTERม1 #คณิตคิดเร็ว #พีทาโกรัส #สอบเข้าม1 #ONET #เตรียมสอบม1 #สูตรลัดคณิต #Edutainment"""
    }
]

def upload_single_reel(item):
    video_path = os.path.join(MEDIA_DIR, item["file"])
    if not os.path.exists(video_path):
        print(f"❌ ไม่พบไฟล์: {video_path}")
        return False
        
    file_size = os.path.getsize(video_path)
    print(f"\n=======================================================")
    print(f"🎬 กำลังนำขึ้น Facebook Reel: {item['title']} ({file_size / (1024*1024):.2f} MB)...")
    
    # 1. Start session
    init_url = f"https://graph.facebook.com/v21.0/{page_id}/video_reels"
    init_data = urllib.parse.urlencode({
        "upload_phase": "start",
        "access_token": token
    }).encode("utf-8")
    
    req = urllib.request.Request(init_url, data=init_data)
    with urllib.request.urlopen(req) as resp:
        init_res = json.loads(resp.read().decode("utf-8"))
        
    video_id = init_res.get("video_id")
    upload_url = init_res.get("upload_url")
    print(f"✅ [Phase 1] ได้รับ Video ID: {video_id}")
    
    # 2. Binary upload
    print(f"⏳ [Phase 2] กำลังอัปโหลดไฟล์วิดีโอเข้า Meta...")
    with open(video_path, "rb") as f:
        video_bytes = f.read()
        
    upload_headers = {
        "Authorization": f"OAuth {token}",
        "offset": "0",
        "file_size": str(file_size),
        "Content-Type": "application/octet-stream"
    }
    
    upload_req = urllib.request.Request(upload_url, data=video_bytes, headers=upload_headers)
    with urllib.request.urlopen(upload_req) as resp:
        upload_res = json.loads(resp.read().decode("utf-8"))
    print(f"✅ [Phase 2] อัปโหลดไบนารีสำเร็จ")
    
    time.sleep(3)
    
    # 3. Finish and publish
    print(f"🚀 [Phase 3] สั่งเผยแพร่สู่ Facebook Reels...")
    finish_url = f"https://graph.facebook.com/v21.0/{page_id}/video_reels"
    finish_data = urllib.parse.urlencode({
        "upload_phase": "finish",
        "access_token": token,
        "video_id": video_id,
        "video_state": "PUBLISHED",
        "description": item["caption"]
    }).encode("utf-8")
    
    finish_req = urllib.request.Request(finish_url, data=finish_data)
    with urllib.request.urlopen(finish_req) as resp:
        finish_res = json.loads(resp.read().decode("utf-8"))
    print(f"🎉 เผยแพร่สำเร็จ! Post ID: {finish_res.get('post_id')}")
    return True

if __name__ == "__main__":
    print("เริ่มนำส่งคลิปสั้นที่เหลือขึ้นสู่ Facebook Reels...")
    for item in REELS_QUEUE:
        upload_single_reel(item)
        time.sleep(2)
    print("\n🎉 นำขึ้น Facebook Reels ครบทั้งหมด 100% เรียบร้อยแล้ว!")
