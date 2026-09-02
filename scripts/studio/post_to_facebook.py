import os
import urllib.request
import urllib.parse
import json

PAGE_ID = "645243598902533"
PAGE_TOKEN = os.getenv("FB_PAGE_TOKEN", "")

posts = [
    {
        "title": "🎵 เพลงสูตรลัด 3 วินาที พิชิตเลขยกกำลัง & ใบไม้แรเงา | MASTER ม.1",
        "link": "https://youtu.be/SLumB462LQU",
        "message": """🎵 รวมฮิตเพลงช่วยจำสูตรลัด ม.1: เพลงสูตรลัด 3 วินาที (Speed Math Anthem)! ⚡

จำสูตรเลขไม่อยากอีกต่อไป! ท่องตามเพลงสูตรลัด 3 วินาที พิชิตข้อสอบเข้า ม.1 และ O-NET 2570
✨ สูตรลัดยกกำลังสองเลขลงท้าย 5 (85² = 7,225 ใน 3 วิ!)
🌟 สูตรลัดพื้นที่ใบไม้แรเงา (4/7)a² กาช้อยส์ฉลุย ไม่ต้องเสียเวลาลบพื้นที่!
🎯 แผนภูมิวงกลม แปลงเปอร์เซ็นต์เป็นมุมองศา (% × 3.6°) เป๊ะทันใจ!

ชมคลิปเต็มพร้อมเพลงและซับไตเติลคาราโอเกะได้ที่นี่เลยครับ 👇
https://youtu.be/SLumB462LQU

🏆 ฝึกทำข้อสอบจำลองและคลังสูตรลับมหาเทพฟรีได้ที่:
👉 https://master-m1.vercel.app

#MASTERม1 #สูตรลัดคณิต #คณิตคิดเร็ว #สอบเข้าม1 #ONET #เตรียมสอบม1 #ติวฟรี #Edutainment"""
    },
    {
        "title": "🔬 เพลงพลังงานความร้อน Q = mcΔt & Q = mL พิชิตฟิสิกส์ ม.1 | MASTER ม.1",
        "link": "https://youtu.be/SR3oNJOThVo",
        "message": """🔬 รวมฮิตเพลงช่วยจำสูตรลัด ม.1: เพลงพลังงานความร้อน Q = mcΔt & Q = mL ❄️🔥

สูตรคำนวณความร้อนจำง่ายในเพลงเดียว! ท่องตามเพลงพิชิตข้อสอบวิทยาศาสตร์ เข้า ม.1
🔥 อุณหภูมิเปลี่ยน... ให้เรียกหา Q = mcΔt (ไมค์ เดลต้า ที)!
❄️ สถานะเปลี่ยน (อุณหภูมิคงที่)... สลับมาใช้ Q = mL ความร้อนแฝงทันที!
⚡ แฝงหลอมเหลว 80 cal/g • แฝงกลายเป็นไอ 540 cal/g แม่นยำ 100%

ชมคลิปเต็มพร้อมแอนิเมชัน 3D น้ำแข็งละลายได้ที่นี่เลยครับ 👇
https://youtu.be/SR3oNJOThVo

🏆 ฝึกทำข้อสอบจำลองและคลังสูตรลับมหาเทพฟรีได้ที่:
👉 https://master-m1.vercel.app

#MASTERม1 #วิทยาศาสตร์ #ฟิสิกส์ม1 #สอบเข้าม1 #ONET #เตรียมสอบม1 #สูตรความร้อน #Edutainment"""
    }
]

url = f"https://graph.facebook.com/v21.0/{PAGE_ID}/feed"

for idx, p in enumerate(posts, 1):
    print(f"\n[Post {idx}] กำลังโพสต์: {p['title']}...")
    payload = urllib.parse.urlencode({
        "message": p["message"],
        "link": p["link"],
        "access_token": PAGE_TOKEN
    }).encode("utf-8")
    
    req = urllib.request.Request(url, data=payload)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            post_id = data.get("id")
            print(f"✅ โพสต์สำเร็จ! Post ID: {post_id}")
            print(f"🔗 ลิงก์โพสต์: https://facebook.com/{post_id}")
    except Exception as e:
        print(f"❌ โพสต์ไม่สำเร็จ: {e}")
        if hasattr(e, 'read'):
            print("Error body:", e.read().decode('utf-8'))
