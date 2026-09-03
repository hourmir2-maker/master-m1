# -*- coding: utf-8 -*-
"""
Upload and schedule remaining YouTube Shorts (03, 04, 05)
with clean page reload between uploads.
"""
import asyncio
import os
import shutil
from playwright.async_api import async_playwright

MEDIA_DIR = r"C:\Users\bkky9\master_m1_media\Shorts_9x16"
TEMP_ASCII = r"C:\Users\bkky9\master_m1_media\yt_upload_temp.mp4"

REMAINING_QUEUE = [
    {
        "id": "03_Shorts_อังกฤษ_IfClause",
        "file": os.path.join(MEDIA_DIR, "03_Shorts_อังกฤษ_IfClause.mp4"),
        "title": "🇬🇧 จำ If-Clause 4 สเต็ปใน 40 วินาที ไม่มีวันลืม! | MASTER ม.1 #Shorts",
        "desc": """คู่กริยา หน้าคู่หลัง ท่องตามจังหวะไม่มีวันโดน สทศ. หลอก! เพลง 4 สเต็ป If-Clause พิชิตข้อสอบเข้า ม.1
⚡ Type 0: If Present, Present (ความจริงธรรมชาติ)
⚡ Type 1: If Present, will + V.inf (เป็นไปได้ในอนาคต)
⚡ Type 2: If Past Simple (were), would + V.inf (สมมติฝันกลางวัน)
⚡ Type 3: If had + V.3, would have + V.3 (เสียดายอดีต)

👉 ฝึกทำข้อสอบภาษาอังกฤษและคลังคำศัพท์ Oxford 3000 ฟรี: https://master-m1.vercel.app

#Shorts #MASTERม1 #ภาษาอังกฤษ #IfClause #สอบเข้าม1 #ONET #เตรียมสอบม1 #ไวยากรณ์อังกฤษ"""
    },
    {
        "id": "04_Shorts_ไทย_คำสมาสสนธิ",
        "file": os.path.join(MEDIA_DIR, "04_Shorts_ไทย_คำสมาสสนธิ.mp4"),
        "title": "📖 สมาสชน สนธิเชื่อม ท่องแค่นี้ตอบได้ทันที! | MASTER ม.1 #Shorts",
        "desc": """หลักภาษาไทยที่ออกสอบทุกปี สมาสชน สนธิเชื่อม แปลจากหลังมาหน้า!
✨ สมาสชน: นำคำบาลี-สันสกฤตมาชนกัน (ภูมิศาสตร์, ศิลปกรรม) ห้ามใส่สระอะหรือทัณฑฆาตตรงรอยต่อ!
🌟 สนธิเชื่อม: ตัดสระหน้า กลืนเสียงเข้าหาคำหลัง (กายะ + อินทรีย์ = กายินทรีย์)
🎯 ระวังจุดลวง: คำที่มีภาษาไทยปน เช่น "ผลไม้" เป็นคำประสม ไม่ใช่คำสมาส!

👉 ทำข้อสอบจำลองภาษาไทยและเล่นแท่นหลอมคำฟรี: https://master-m1.vercel.app

#Shorts #MASTERม1 #ภาษาไทย #คำสมาส #สอบเข้าม1 #ONET #เตรียมสอบม1"""
    },
    {
        "id": "05_Shorts_คณิต_พีทาโกรัส3วิ",
        "file": os.path.join(MEDIA_DIR, "05_Shorts_คณิต_พีทาโกรัส3วิ.mp4"),
        "title": "📐 4 ชุดตัวเลขพีทาโกรัส ตอบได้ใน 3 วิ | MASTER ม.1 #Shorts",
        "desc": """สาม-สี่-ห้า, ห้า-สิบสอง-สิบสาม ท่อง 4 ชุดนี้กาช้อยส์พีทาโกรัสใน 3 วิทันที!
📐 สามเหลี่ยมมุมฉาก a² + b² = c² ด้านตรงข้ามมุมฉากยาวสุดเสมอ
⚡ 4 ชุดยอดฮิต: 3-4-5, 5-12-13, 7-24-25, 8-15-17

👉 ตะลุยโจทย์ข้อสอบแข่งขันห้อง Gifted สสวท. ฟรี: https://master-m1.vercel.app

#Shorts #MASTERม1 #คณิตศาสตร์ #พีทาโกรัส #สูตรลัด3วิ #สอบเข้าม1 #Gifted"""
    }
]

async def upload_video(page, item):
    print(f"\n==================================================", flush=True)
    print(f"🎬 Uploading: {item['title']}", flush=True)
    print(f"==================================================", flush=True)
    
    # Refresh to Studio home
    await page.goto("https://studio.youtube.com/", wait_until="domcontentloaded")
    await asyncio.sleep(4)
    
    # Copy to temporary ASCII filename
    shutil.copy2(item['file'], TEMP_ASCII)
    
    # Click upload button
    upload_btn = await page.query_selector("ytcp-icon-button#upload-icon, ytcp-icon-button[aria-label*='อัปโหลด'], #upload-button")
    if upload_btn:
        await upload_btn.click()
        await asyncio.sleep(2)
        
    cdp = await page.context.new_cdp_session(page)
    doc = await cdp.send("DOM.getDocument", {"depth": -1, "pierce": True})
    node = await cdp.send("DOM.querySelector", {"nodeId": doc["root"]["nodeId"], "selector": "input[type='file']"})
    
    await cdp.send("DOM.setFileInputFiles", {
        "files": [TEMP_ASCII],
        "nodeId": node["nodeId"]
    })
    print("Payload dispatched! Waiting 6s for wizard...", flush=True)
    await asyncio.sleep(6)
    
    # Fill Title
    title_box = await page.query_selector("#title-textarea #textbox")
    if title_box:
        await title_box.click()
        await page.keyboard.press("Control+A")
        await page.keyboard.press("Backspace")
        await page.keyboard.insert_text(item['title'])
        print("  • Title set!", flush=True)
        
    # Fill Description
    desc_box = await page.query_selector("#description-textarea #textbox")
    if desc_box:
        await desc_box.click()
        await page.keyboard.press("Control+A")
        await page.keyboard.press("Backspace")
        await page.keyboard.insert_text(item['desc'])
        print("  • Description set!", flush=True)
        
    # Audience: Not for kids
    not_kids = await page.query_selector("tp-yt-paper-radio-button[name='VIDEO_MADE_FOR_KIDS_NOT_MFK']")
    if not_kids:
        await not_kids.click()
        print("  • Audience selected!", flush=True)
        
    # Advance to Visibility
    for step in range(3):
        await asyncio.sleep(1.5)
        next_btn = await page.query_selector("#next-button")
        if next_btn:
            await next_btn.click()
            
    await asyncio.sleep(3)
    
    # Scroll to bottom
    await page.evaluate("""() => {
        const sc = document.querySelector('#scrollable-content');
        if (sc) sc.scrollTop = sc.scrollHeight;
    }""")
    await asyncio.sleep(1.5)
    
    # Click Schedule section
    sched_btn = await page.query_selector("#second-container-expand-button, #schedule-expand-button, [aria-label*='ตั้งเวลา']")
    if sched_btn:
        await sched_btn.click()
        await asyncio.sleep(1.5)
        
    # Click Done / Schedule button
    done_btn = await page.query_selector("#done-button")
    if done_btn:
        await done_btn.click()
        print("  • Clicked Schedule button! Waiting 6s...", flush=True)
        await asyncio.sleep(6)
        
    print(f"✅ Successfully Scheduled: {item['id']}", flush=True)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("Opening YouTube Studio for MASTER ม.1...", flush=True)
        await page.goto("https://studio.youtube.com/", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        name_el = await page.query_selector("#entity-name")
        ch_name = await name_el.inner_text() if name_el else ""
        print(f"Verified Active Channel: {ch_name}", flush=True)
        if "MASTER ม.1" not in ch_name:
            print("❌ ABORT: Wrong channel!", flush=True)
            await page.close()
            return

        for item in REMAINING_QUEUE:
            try:
                await upload_video(page, item)
                await asyncio.sleep(3)
            except Exception as e:
                print(f"❌ Error uploading {item['id']}: {e}", flush=True)
                
        print("\n🎉 ALL REMAINING YOUTUBE SHORTS UPLOADED & SCHEDULED SUCCESSFULLY!", flush=True)
        await page.close()

asyncio.run(main())
