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

async def run():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("1. Navigating to YouTube Studio...", flush=True)
        await page.goto("https://studio.youtube.com/", wait_until="domcontentloaded")
        await asyncio.sleep(3)
        
        # Verify Channel Name
        name_el = await page.query_selector("#entity-name")
        ch_name = await name_el.inner_text() if name_el else "Unknown"
        print(f"Verified Channel: {ch_name}", flush=True)
        
        # Click Create
        print("2. Looking for Create button...", flush=True)
        create_btn = await page.query_selector("#create-icon, button#create-icon, [aria-label*='สร้าง']")
        if create_btn:
            print("Clicking Create button...", flush=True)
            await create_btn.click()
            await asyncio.sleep(1)
            
        # Click Upload Video
        print("3. Looking for Upload Video option...", flush=True)
        upload_opt = await page.query_selector("#text-item-0, ytcp-text-menu #text-item-0, :has-text('อัปโหลดวิดีโอ')")
        if upload_opt:
            print("Clicking Upload Video option...", flush=True)
            await upload_opt.click()
            await asyncio.sleep(2)
            
        # File input
        file_input = await page.query_selector("input[type='file']")
        if file_input:
            print(f"4. Setting input file: {VIDEO_PATH}", flush=True)
            await file_input.set_input_files(VIDEO_PATH)
            print("File chosen! Waiting 6s for wizard to load...", flush=True)
            await asyncio.sleep(6)
        else:
            print("❌ file input not found!", flush=True)
            await page.screenshot(path="C:/Users/bkky9/master_m1_media/yt_nofile_err.png")
            await page.close()
            return

        await page.screenshot(path="C:/Users/bkky9/master_m1_media/yt_step1_loaded.png")
        print("Saved yt_step1_loaded.png", flush=True)
        
        # Step 1 Details: Title
        title_box = await page.query_selector("#title-textarea #textbox")
        if title_box:
            await title_box.click()
            await page.keyboard.press("Control+A")
            await page.keyboard.press("Backspace")
            await page.keyboard.insert_text(TITLE)
            print("Title set successfully!", flush=True)
            
        # Description
        desc_box = await page.query_selector("#description-textarea #textbox")
        if desc_box:
            await desc_box.click()
            await page.keyboard.press("Control+A")
            await page.keyboard.press("Backspace")
            await page.keyboard.insert_text(DESCRIPTION)
            print("Description set successfully!", flush=True)
            
        # Audience
        not_kids = await page.query_selector("tp-yt-paper-radio-button[name='VIDEO_MADE_FOR_KIDS_NOT_MFK']")
        if not_kids:
            await not_kids.click()
            print("Audience: Not made for kids selected!", flush=True)
            
        # Click Next 3 times
        print("Advancing wizard...", flush=True)
        for s in range(3):
            next_btn = await page.query_selector("#next-button")
            if next_btn:
                await next_btn.click()
                print(f"Clicked Next ({s+1}/3)", flush=True)
                await asyncio.sleep(2)
                
        # On Visibility Step:
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/yt_step4_visibility.png")
        print("Saved yt_step4_visibility.png", flush=True)
        
        # Inspect radio buttons
        radios = await page.query_selector_all("tp-yt-paper-radio-button")
        for r in radios:
            name = await r.get_attribute("name")
            text = await r.inner_text()
            print(f"Radio name={name} text={text.strip()}", flush=True)
            
        await page.close()

asyncio.run(run())
