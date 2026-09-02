import os
import urllib.request
import urllib.parse
import json

PAGE_ID = "645243598902533"
PAGE_TOKEN = os.getenv("FB_PAGE_TOKEN", "")

scheduled_posts = [
    {
        "name": "เพลงที่ 3: ภาษาอังกฤษ If-Clause",
        "time_str": "3 กันยายน 2026 เวลา 00:00 น. (คืนนี้เที่ยงคืน)",
        "timestamp": 1788368400,
        "link": "https://youtu.be/gtlfFyTnKi0",
        "message": """🇬🇧 รวมฮิตเพลงช่วยจำสูตรลัด ม.1: เพลง 4 สเต็ป If-Clause ในตำนาน! ⚡

จำคู่กริยา หน้าคู่หลัง ไม่มีวันโดน สทศ. หลอก! เพลง 4 สเต็ป If-Clause ท่องตามจังหวะ K-Pop สนุกๆ
⚡ Type 0: If Present, Present (ความจริงธรรมชาติ)
⚡ Type 1: If Present, will + V.inf (เป็นไปได้ในอนาคต)
⚡ Type 2: If Past Simple (were), would + V.inf (สมมติฝันกลางวัน)
⚡ Type 3: If had + V.3, would have + V.3 (เสียดายอดีต)

ชมคลิปเต็มพร้อมเพลงและซับคาราโอเกะได้ที่นี่เลยครับ 👇
https://youtu.be/gtlfFyTnKi0

🏆 ฝึกทำข้อสอบจำลองภาษาอังกฤษและคลังสูตรลับฟรีได้ที่:
👉 https://master-m1.vercel.app

#MASTERม1 #ภาษาอังกฤษ #IfClause #สอบเข้าม1 #ONET #เตรียมสอบม1 #ไวยากรณ์อังกฤษ #Edutainment"""
    },
    {
        "name": "เพลงที่ 4: ภาษาไทย คำสมาส-สนธิ ชนแล้วเชื่อม",
        "time_str": "4 กันยายน 2026 เวลา 00:00 น. (พรุ่งนี้เที่ยงคืน)",
        "timestamp": 1788454800,
        "link": "https://youtu.be/wWAGTkDTCD4",
        "message": """📖 รวมฮิตเพลงช่วยจำสูตรลัด ม.1: เพลงคำสมาส-สนธิ ชนแล้วเชื่อม! ✨

สมาสชน สนธิเชื่อม แปลจากหลังมาหน้า! เพลงช่วยจำหลักภาษาไทยสำหรับเตรียมสอบเข้า ม.1 และ O-NET 2570
✨ สมาสชน: นำคำบาลี-สันสกฤตมาชนกัน (ภูมิศาสตร์, ศิลปกรรม) ห้ามใส่สระอะหรือทัณฑฆาตตรงรอยต่อ!
🌟 สนธิเชื่อม: ตัดสระหน้า กลืนเสียงเข้าหาคำหลัง (กายะ + อินทรีย์ = กายินทรีย์)
🎯 ระวังจุดลวง: คำที่มีภาษาไทยปน เช่น "ผลไม้" เป็นคำประสม ไม่ใช่คำสมาส!

ชมคลิปเต็มพร้อมเพลงและซับคาราโอเกะได้ที่นี่เลยครับ 👇
https://youtu.be/wWAGTkDTCD4

🏆 ฝึกทำข้อสอบจำลองภาษาไทยและคลังสูตรลับฟรีได้ที่:
👉 https://master-m1.vercel.app

#MASTERม1 #ภาษาไทย #คำสมาส #คำสนธิ #สอบเข้าม1 #ONET #เตรียมสอบม1 #Edutainment"""
    },
    {
        "name": "เพลงที่ 5: คณิตศาสตร์ สามเหลี่ยมพีทาโกรัส 3 วินาที",
        "time_str": "5 กันยายน 2026 เวลา 00:00 น. (มะรืนนี้เที่ยงคืน)",
        "timestamp": 1788541200,
        "link": "https://youtu.be/M7WdGyXD_IM",
        "message": """📐 รวมฮิตเพลงช่วยจำสูตรลัด ม.1: เพลงสามเหลี่ยมพีทาโกรัส 3 วินาที! ⚡

เจอสามเหลี่ยมมุมฉาก กาช้อยส์ได้ใน 3 วินาที! ไม่ต้องเสียเวลานั่งคูณสูตร a² + b² = c²
⚡ 4 ชุดตัวเลขมหาเทพที่ออกสอบบ่อยที่สุด:
1️⃣ 3 - 4 - 5 (คูณสองเป็น 6 - 8 - 10)
2️⃣ 5 - 12 - 13
3️⃣ 7 - 24 - 25
4️⃣ 8 - 15 - 17

ชมคลิปเต็มพร้อมเพลงและซับคาราโอเกะได้ที่นี่เลยครับ 👇
https://youtu.be/M7WdGyXD_IM

🏆 เข้าฝึกทำข้อสอบจำลองคณิตศาสตร์และสูตรลัด 3 วิ ได้ที่:
👉 https://master-m1.vercel.app

#MASTERม1 #คณิตคิดเร็ว #พีทาโกรัส #สอบเข้าม1 #ONET #เตรียมสอบม1 #สูตรลัดคณิต #Edutainment"""
    }
]

url = f"https://graph.facebook.com/v21.0/{PAGE_ID}/feed"

for p in scheduled_posts:
    print(f"กำลังตั้งเวลาโพสต์: {p['name']} ({p['time_str']})...")
    payload = urllib.parse.urlencode({
        "published": "false",
        "scheduled_publish_time": str(p["timestamp"]),
        "link": p["link"],
        "message": p["message"],
        "access_token": PAGE_TOKEN
    }).encode("utf-8")
    
    req = urllib.request.Request(url, data=payload)
    try:
        with urllib.request.urlopen(req) as resp:
            res_data = json.loads(resp.read().decode("utf-8"))
            print(f"✅ ตั้งเวลาสำเร็จ! Scheduled Post ID: {res_data.get('id')}")
    except Exception as e:
        print(f"❌ Error: {e}")
        if hasattr(e, 'read'):
            print("Response body:", e.read().decode('utf-8'))

print("\nALL 3 POSTS ARE SCHEDULED TO PUBLISH AUTOMATICALLY ON FACEBOOK!")
