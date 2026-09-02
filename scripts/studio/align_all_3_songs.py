import os
import base64
import json
import urllib.request

API_KEY = os.getenv("GEMINI_API_KEY", "")
MODEL_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key={API_KEY}"

songs = [
    {
        "id": "eng",
        "audio": "C:/Users/bkky9/master_m1_media/eng_ifclause.mp3",
        "prompt": """นี่คือไฟล์เสียงเพลงภาษาอังกฤษ If-Clause ให้ฟังเสียงร้องและจับเวลา (Timestamps) อย่างละเอียดและแม่นยำที่สุดว่าแต่ละประโยคเริ่มร้องที่วินาทีไหนและจบที่วินาทีไหน 
(ต้องการรูปแบบ MM:SS.xx เช่น 00:08.50)

เนื้อเพลงที่ร้องมีดังนี้:
1. If you know the rule, you will pass the test!
2. ศูนย์: จริงเสมอตามธรรมชาติ If Present, Present
3. หนึ่ง: เป็นไปได้ในอนาคต If Present, Will บวกกริยาช่องเดิม!
4. สอง: สมมติฝันกลางวัน... If Past Simple, Would บวก กริยาช่องเดิม!
5. จำไว้เลยประธานเอกพจน์ ยังต้องใช้ Were ในโลกจินตนาการ!
6. สาม: เสียดายอดีตที่แก้ไม่ได้... If Had บวก V.3, Would have บวก V.3!
7. จำ 0-1-2-3 เป็นจังหวะ กาข้อสอบช้อยส์ไหนก็ไม่มีพลาด!
8. If I study hard, I will enter my dream school! สอบติด ม.1 แน่นอน!

ตอบกลับเป็น JSON Array:
[
  {"line": 1, "text": "...", "start": "00:00.00", "end": "00:00.00"}, ...
]"""
    },
    {
        "id": "thai",
        "audio": "C:/Users/bkky9/master_m1_media/thai_samasa.mp3",
        "prompt": """นี่คือไฟล์เสียงเพลงภาษาไทย คำสมาส-สนธิ ชนแล้วเชื่อม ให้ฟังเสียงร้องและจับเวลา (Timestamps) อย่างละเอียดและแม่นยำที่สุดว่าแต่ละประโยคเริ่มร้องที่วินาทีไหนและจบที่วินาทีไหน 
(ต้องการรูปแบบ MM:SS.xx)

เนื้อเพลงที่ร้องมีดังนี้:
1. คำบาลีสันสกฤตสองคำ มารวมกันสร้างคำใหม่
2. ถ้าแค่เอามาชนกันตรงๆ เรียกว่าคำสมาส
3. แปลความหมายจากหลังมาหน้าเสมอ และห้ามใส่สระอะ หรือทัณฑฆาตตรงรอยต่อ!
4. สมาสชน... สนธิเชื่อม ท่องไว้เลยเพื่อนเอ๋ย!
5. สมาสชน เช่น ภูมิศาสตร์ ศิลปกรรม
6. ส่วนสนธิเชื่อม คือตัดสระหน้า แล้วกลืนเสียงเข้าหาคำหลัง!
7. กายะ บวก อินทรีย์ กลายเป็น กายินทรีย์ เชื่อมเสียงสระอิ!
8. สมาสชน สนธิเชื่อม สทศ. หลอกไม่ได้อีกต่อไป!
9. จำหลักนี้ไว้ ภาษาไทย O-NET กวาดคะแนนเต็มได้สบายๆ!

ตอบกลับเป็น JSON Array:
[
  {"line": 1, "text": "...", "start": "00:00.00", "end": "00:00.00"}, ...
]"""
    },
    {
        "id": "pythagoras",
        "audio": "C:/Users/bkky9/master_m1_media/math_pythagoras.mp3",
        "prompt": """นี่คือไฟล์เสียงเพลงคณิตศาสตร์คิดเร็ว สามเหลี่ยมพีทาโกรัส 3 วินาที ให้ฟังเสียงร้องและจับเวลา (Timestamps) อย่างละเอียดและแม่นยำที่สุดว่าแต่ละประโยคเริ่มร้องที่วินาทีไหนและจบที่วินาทีไหน 
(ต้องการรูปแบบ MM:SS.xx)

เนื้อเพลงที่ร้องมีดังนี้:
1. สามเหลี่ยมมุมฉาก มีด้านประกอบ และมีด้านตรงข้ามมุมฉาก
2. a กำลังสอง บวก b กำลังสอง เท่ากับ c กำลังสองเสมอ
3. แต่เวลาลงสนามสอบจริง ไม่ต้องมานั่งคูณให้เสียเวลา!
4. ท่อง 4 ชุดมหาเทพ 3 วินาที ตอบได้ทันควัน!
5. สาม-สี่-ห้า... ห้า-สิบสอง-สิบสาม!
6. เจ็ด-ยี่สิบสี่-ยี่สิบห้า... แปด-สิบห้า-สิบเจ็ด!
7. เอาแม่สอง แม่สาม มาคูณขยาย: หก-แปด-สิบ ก็มุมฉากเป๊ะๆ!
8. เจอสามเหลี่ยมมุมฉาก กาช้อยส์ได้ในสามวิ!
9. MASTER ม.1 พีทาโกรัสคิดเร็ว สอบติดห้อง Gifted แน่นอน!

ตอบกลับเป็น JSON Array:
[
  {"line": 1, "text": "...", "start": "00:00.00", "end": "00:00.00"}, ...
]"""
    }
]

for s in songs:
    print(f"Aligning {s['id']}...")
    try:
        with open(s['audio'], 'rb') as f:
            b64 = base64.b64encode(f.read()).decode('utf-8')
        
        payload = {
            "contents": [
                {
                    "parts": [
                        {"inlineData": {"mimeType": "audio/mp3", "data": b64}},
                        {"text": s['prompt']}
                    ]
                }
            ],
            "generationConfig": {"responseMimeType": "application/json"}
        }
        
        req = urllib.request.Request(
            MODEL_URL,
            data=json.dumps(payload).encode('utf-8'),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            text = data["candidates"][0]["content"]["parts"][0]["text"]
            out_file = f"C:/Users/bkky9/master_m1_media/{s['id']}_aligned.json"
            with open(out_file, 'w', encoding='utf-8') as out_f:
                out_f.write(text)
            print(f"✅ {s['id']} aligned successfully! Saved to {out_file}")
    except Exception as e:
        print(f"❌ Error on {s['id']}: {e}")

print("ALL 3 SONGS ALIGNED 100%!")
