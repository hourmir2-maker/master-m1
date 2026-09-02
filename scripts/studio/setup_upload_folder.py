import os
import shutil

desktops = [
    r'C:\Users\bkky9\OneDrive\Desktop\คลิปสำหรับลง_YouTube',
    r'C:\Users\bkky9\Desktop\คลิปสำหรับลง_YouTube'
]

src_math = r'C:\Users\bkky9\master_m1_media\math_with_lyrics.mp4'
src_sci  = r'C:\Users\bkky9\master_m1_media\science_with_lyrics.mp4'

txt_content = """==========================================================
🎬 คลิปที่ 1: เพลงคณิตศาสตร์ สูตรลัด 3 วินาที (ไฟล์: 01_เพลงคณิต_สูตรลัด3วิ.mp4)
==========================================================
📌 ชื่อคลิป (Title):
🎵 เพลงสูตรลัด 3 วินาที พิชิตเลขยกกำลัง & ใบไม้แรเงา | MASTER ม.1 #Shorts

📄 คำอธิบายคลิป (Description):
จำสูตรเลขไม่อยากอีกต่อไป! ท่องตามเพลงสูตรลัด 3 วินาที พิชิตข้อสอบเข้า ม.1 และ O-NET 2570
⚡ สูตรลัดยกกำลังสองเลขลงท้าย 5 (85² = 7,225 ใน 3 วิ!)
🌟 สูตรลัดพื้นที่ใบไม้แรเงา (4/7)a² กาช้อยส์ฉลุย ไม่ต้องเสียเวลาลบพื้นที่!

🏆 เข้าทำข้อสอบจำลองและคลังสูตรลับฟรีได้ที่: https://master-m1.vercel.app

#Shorts #MASTERม1 #คณิตคิดเร็ว #สอบเข้าม1 #ONET #เตรียมสอบม1 #สูตรลัดคณิต


==========================================================
🎬 คลิปที่ 2: เพลงวิทยาศาสตร์ พลังงานความร้อน (ไฟล์: 02_เพลงวิทย์_พลังงานความร้อน.mp4)
==========================================================
📌 ชื่อคลิป (Title):
🔬 เพลงพลังงานความร้อน Q = mcΔt & Q = mL พิชิตฟิสิกส์ ม.1 | MASTER ม.1 #Shorts

📄 คำอธิบายคลิป (Description):
สูตรความร้อนจำง่ายในเพลงเดียว! ท่องตามเพลงพิชิตข้อสอบวิทยาศาสตร์ เข้า ม.1
🔥 อุณหภูมิเปลี่ยน... ให้เรียกหา Q = mcΔt (ไมค์ เดลต้า ที)!
❄️ สถานะเปลี่ยน... สลับมาใช้ Q = mL ความร้อนแฝงทันที!
⚡ แฝงหลอมเหลว 80 cal/g • แฝงกลายเป็นไอ 540 cal/g

🏆 เข้าทำข้อสอบจำลองและคลังสูตรลับฟรีได้ที่: https://master-m1.vercel.app

#Shorts #MASTERม1 #วิทยาศาสตร์ #ฟิสิกส์ #สอบเข้าม1 #ONET #สูตรความร้อน
"""

for d in desktops:
    try:
        os.makedirs(d, exist_ok=True)
        # Copy math video
        dst_math = os.path.join(d, '01_เพลงคณิต_สูตรลัด3วิ.mp4')
        shutil.copy2(src_math, dst_math)
        print(f"Copied math video to {dst_math}")
        
        # Copy science video
        dst_sci = os.path.join(d, '02_เพลงวิทย์_พลังงานความร้อน.mp4')
        shutil.copy2(src_sci, dst_sci)
        print(f"Copied sci video to {dst_sci}")
        
        # Write text file
        dst_txt = os.path.join(d, 'ข้อความสำหรับโพสต์_YouTube.txt')
        with open(dst_txt, 'w', encoding='utf-8') as f:
            f.write(txt_content)
        print(f"Wrote txt file to {dst_txt}")
    except Exception as e:
        print(f"Error on {d}: {e}")

print("ALL DESKTOP FOLDERS READY 100%!")
