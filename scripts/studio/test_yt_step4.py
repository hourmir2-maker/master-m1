# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

VIDEO_PATH = r"C:\Users\bkky9\master_m1_media\Shorts_9x16\01_Shorts_คณิต_สูตรลัด3วิ.mp4"
TITLE = "⚡ สูตรลัด 3 วินาที ยกกำลังสอง & ใบไม้แรเงา | MASTER ม.1 #Shorts"
DESCRIPTION = """ไม่ต้องคูณเลขให้เหงื่อตก! สูตรลัดคิดเลขเร็ว 3 วิ พิชิตข้อสอบเข้า ม.1 และ O-NET 2570
⚡ สูตรลัดยกกำลังสองเลขลงท้าย 5 (85² = 7,225 ใน 3 วิ!)
📐 สูตรลัดพื้นที่ใบไม้แรเงา (4/7)a² กาช้อยส์ตอบได้ทันที!

👉 ติวฟรี 32 โมดูล + แล็บเสมือนจริง 15 สถานี: https://master-m1.vercel.app

#Shorts #MASTERม1 #คณิตคิดเร็ว #สอบเข้าม1 #ONET #เตรียมสอบม1 #สูตรลัดคณิต"""

async def run():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("1. Loading Studio...", flush=True)
        await page.goto("https://studio.youtube.com/", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        # Click upload button
        upload_btn = await page.query_selector("ytcp-icon-button#upload-icon, [aria-label*='อัปโหลดวิดีโอ']")
        if upload_btn:
            await upload_btn.click()
            await asyncio.sleep(2)
            
        file_input = await page.query_selector("input[type='file']")
        print("2. Setting file input...", flush=True)
        await file_input.set_input_files(VIDEO_PATH)
        print("Waiting 8s for upload form...", flush=True)
        await asyncio.sleep(8)
        
        # Set Title
        title_box = await page.query_selector("#title-textarea #textbox")
        if title_box:
            await title_box.click()
            await page.keyboard.press("Control+A")
            await page.keyboard.press("Backspace")
            await page.keyboard.insert_text(TITLE)
            print("Title filled!", flush=True)
            
        # Set Description
        desc_box = await page.query_selector("#description-textarea #textbox")
        if desc_box:
            await desc_box.click()
            await page.keyboard.press("Control+A")
            await page.keyboard.press("Backspace")
            await page.keyboard.insert_text(DESCRIPTION)
            print("Desc filled!", flush=True)
            
        # Select Not Made for Kids
        not_kids = await page.query_selector("tp-yt-paper-radio-button[name='VIDEO_MADE_FOR_KIDS_NOT_MFK']")
        if not_kids:
            await not_kids.click()
            print("Not made for kids clicked!", flush=True)
            
        # Click Next 3 times to get to Visibility step
        for i in range(3):
            await asyncio.sleep(2)
            next_btn = await page.query_selector("#next-button")
            if next_btn:
                await next_btn.click()
                print(f"Clicked Next ({i+1}/3)", flush=True)
                
        await asyncio.sleep(3)
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/visibility_dialog.png")
        print("Saved visibility_dialog.png", flush=True)
        
        # Inspect elements inside visibility dialog
        vis_elements = await page.evaluate("""() => {
            const res = [];
            document.querySelectorAll('tp-yt-paper-radio-button, ytcp-button, #schedule-section, [aria-label*=\"ตั้งเวลา\"]').forEach(el => {
                res.push({ id: el.id, name: el.getAttribute('name'), text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 30) });
            });
            return res;
        }""")
        print("Visibility elements found:", vis_elements, flush=True)
        
        await page.close()

asyncio.run(run())
