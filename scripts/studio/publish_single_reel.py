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

def upload_facebook_reel(video_path, caption):
    file_size = os.path.getsize(video_path)
    print(f"\n[1/3] เริ่มสร้าง Session สำหรับ Facebook Reel: {os.path.basename(video_path)} ({file_size / (1024*1024):.2f} MB)...")
    
    # Phase 1: Start
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
    print(f"✅ ได้รับ Video ID: {video_id}")
    
    # Phase 2: Binary Upload
    print("[2/3] กำลังอัปโหลดไฟล์วิดีโอเข้า Meta Servers...")
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
    print("✅ อัปโหลดไฟล์วิดีโอสำเร็จ:", upload_res)
    
    # Wait a few seconds for Meta transcode processing
    time.sleep(3)
    
    # Phase 3: Finish & Publish
    print("[3/3] กำลังสั่งเผยแพร่เป็น Facebook Reel...")
    finish_url = f"https://graph.facebook.com/v21.0/{page_id}/video_reels"
    finish_data = urllib.parse.urlencode({
        "upload_phase": "finish",
        "access_token": token,
        "video_id": video_id,
        "video_state": "PUBLISHED",
        "description": caption
    }).encode("utf-8")
    
    finish_req = urllib.request.Request(finish_url, data=finish_data)
    with urllib.request.urlopen(finish_req) as resp:
        finish_res = json.loads(resp.read().decode("utf-8"))
    print("🎉 เผยแพร่ Facebook Reel สำเร็จ 100%:", finish_res)
    return finish_res

if __name__ == "__main__":
    test_video = r"C:\Users\bkky9\OneDrive\Desktop\คลิปสำหรับลง_YouTube\Shorts_9x16\01_Shorts_คณิต_สูตรลัด3วิ.mp4"
    test_caption = """⚡ สูตรลัด 3 วินาที ยกกำลังสอง & ใบไม้แรเงา | MASTER ม.1 

ไม่ต้องคูณเลขให้เหงื่อตก! สูตรลัดคิดเลขเร็ว 3 วิ พิชิตข้อสอบเข้า ม.1 และ O-NET
⚡ 85² = 7,225 ใน 3 วิ
🌟 พื้นที่ใบไม้แรเงา (4/7)a² กาช้อยส์ฉลุย ไม่ต้องเสียเวลาลบพื้นที่!

🎯 ฝึกทำโจทย์จริง + แล็บวิทย์เสมือนจริง 7 สถานี ฟรี 100%:
👉 https://master-m1.vercel.app (เข้าได้ทันที ไม่ต้องใช้อีเมล!)

#Reels #MASTERม1 #สอบเข้าม1 #ติวสอบ #คณิตคิดเร็ว #สูตรลัด3วิ #ONET"""
    
    upload_facebook_reel(test_video, test_caption)
