# -*- coding: utf-8 -*-
import asyncio
import os
from playwright.async_api import async_playwright

VIDEO_PATH = r"C:\Users\bkky9\master_m1_media\Shorts_9x16\01_Shorts_คณิต_สูตรลัด3วิ.mp4"
TITLE = "⚡ สูตรลัด 3 วินาที ยกกำลังสอง & ใบไม้แรเงา | MASTER ม.1 #Shorts"
DESCRIPTION = """ไม่ต้องคูณเลขให้เหงื่อตก! สูตรลัดคิดเลขเร็ว 3 วิ พิชิตข้อสอบเข้า ม.1 และ O-NET 2570
⚡ สูตรลัดยกกำลังสองเลขลงท้าย 5 (85² = 7,225 ใน 3 วิ!)
📐 สูตรลัดพื้นที่ใบไม้แรเงา (4/7)a² กาช้อยส์ตอบได้ทันที!

👉 ติวฟรี 32 โมดูล + แล็บเสมือนจริง 15 สถานี: https://master-m1.vercel.app

#Shorts #MASTERม1 #คณิตคิดเร็ว #สอบเข้าม1 #ONET #เตรียมสอบม1 #สูตรลัดคณิต"""

async def test_upload():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("1. Opening YouTube Studio for MASTER ม.1...")
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg", wait_until="networkidle")
        await asyncio.sleep(4)
        
        # Verify channel name
        name_el = await page.query_selector("#entity-name")
        ch_name = await name_el.inner_text() if name_el else "Unknown"
        print(f"Verified Active Channel: {ch_name}")
        if "MASTER ม.1" not in ch_name:
            print("❌ ABORTING: Active channel is not MASTER ม.1!")
            await page.close()
            return
            
        # Click Create button
        create_btn = await page.query_selector('#create-icon, button:has-text("สร้าง"), [aria-label*="สร้าง"]')
        if create_btn:
            print("2. Clicking Create button...")
            await create_btn.click()
            await asyncio.sleep(1)
            
        upload_btn = await page.query_selector('yt-formatted-string:has-text("อัปโหลดวิดีโอ"), [test-id="upload"]')
        if upload_btn:
            print("3. Clicking Upload Video option...")
            await upload_btn.click()
            await asyncio.sleep(2)
            
        # Find file input
        file_input = await page.query_selector('input[type="file"]')
        if not file_input:
            print("❌ file input not found")
            await page.close()
            return
            
        print("4. Selecting file:", VIDEO_PATH)
        await file_input.set_input_files(VIDEO_PATH)
        print("File selected! Waiting 6s for metadata wizard...")
        await asyncio.sleep(6)
        
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/yt_upload_dialog_1.png")
        print("Saved yt_upload_dialog_1.png")
        
        # Fill Title
        title_box = await page.query_selector('#title-textarea #textbox, [aria-label*="ชื่อ"]')
        if title_box:
            await title_box.click()
            await page.keyboard.press("Control+A")
            await page.keyboard.press("Backspace")
            await page.keyboard.insert_text(TITLE)
            print("Title inserted successfully!")
            
        # Fill Description
        desc_box = await page.query_selector('#description-textarea #textbox, [aria-label*="คำอธิบาย"]')
        if desc_box:
            await desc_box.click()
            await page.keyboard.press("Control+A")
            await page.keyboard.press("Backspace")
            await page.keyboard.insert_text(DESCRIPTION)
            print("Description inserted successfully!")
            
        # Audience: Not Made for Kids
        not_kids = await page.query_selector('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"], [name="NOT_MADE_FOR_KIDS"]')
        if not_kids:
            await not_kids.click()
            print("Selected: Not made for kids (General)")
            
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/yt_upload_details_filled.png")
        print("Saved yt_upload_details_filled.png")
        
        # Advance through Next buttons
        for step in range(3):
            next_btn = await page.query_selector('#next-button, button:has-text("ถัดไป")')
            if next_btn:
                await next_btn.click()
                print(f"Clicked Next (Step {step+1})")
                await asyncio.sleep(2)
                
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/yt_upload_visibility_step.png")
        print("Saved yt_upload_visibility_step.png")
        
        # Inspect visibility options available on page
        radios = await page.query_selector_all("tp-yt-paper-radio-button, [role='radio']")
        print(f"Found {len(radios)} radio elements on Visibility page:")
        for r in radios:
            t = await r.inner_text()
            name = await r.get_attribute("name")
            print(f"  • Name: {name} | Text: {t.strip()}")
            
        await page.close()

asyncio.run(test_upload())
