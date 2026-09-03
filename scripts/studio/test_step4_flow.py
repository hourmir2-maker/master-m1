# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

ASCII_PATH = "C:\\Users\\bkky9\\master_m1_media\\yt_upload_temp.mp4"
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
        
        upload_btn = await page.query_selector("ytcp-icon-button[aria-label*='อัปโหลด'], #upload-button")
        if upload_btn:
            print("2. Clicking upload button...", flush=True)
            await upload_btn.click()
            await asyncio.sleep(2)
            
        print("3. Connecting CDP and sending file...", flush=True)
        cdp = await context.new_cdp_session(page)
        doc = await cdp.send("DOM.getDocument", {"depth": -1, "pierce": True})
        node = await cdp.send("DOM.querySelector", {"nodeId": doc["root"]["nodeId"], "selector": "input[type='file']"})
        await cdp.send("DOM.setFileInputFiles", {
            "files": [ASCII_PATH],
            "nodeId": node["nodeId"]
        })
        print("File sent! Waiting 6s for wizard...", flush=True)
        await asyncio.sleep(6)
        
        # Fill Title
        title_box = await page.query_selector("#title-textarea #textbox")
        if title_box:
            await title_box.click()
            await page.keyboard.press("Control+A")
            await page.keyboard.press("Backspace")
            await page.keyboard.insert_text(TITLE)
            print("Title filled!", flush=True)
            
        # Fill Description
        desc_box = await page.query_selector("#description-textarea #textbox")
        if desc_box:
            await desc_box.click()
            await page.keyboard.press("Control+A")
            await page.keyboard.press("Backspace")
            await page.keyboard.insert_text(DESCRIPTION)
            print("Desc filled!", flush=True)
            
        # Audience
        not_kids = await page.query_selector("tp-yt-paper-radio-button[name='VIDEO_MADE_FOR_KIDS_NOT_MFK']")
        if not_kids:
            await not_kids.click()
            print("Not kids selected!", flush=True)
            
        # Advance 3 times to step 4
        for step in range(3):
            await asyncio.sleep(2)
            next_btn = await page.query_selector("#next-button, button:has-text('ถัดไป')")
            if next_btn:
                await next_btn.click()
                print(f"Clicked Next ({step+1}/3)", flush=True)
                
        await asyncio.sleep(3)
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/step4_visibility.png")
        print("Saved step4_visibility.png", flush=True)
        
        # Check Schedule elements
        sched_radio = await page.query_selector("tp-yt-paper-radio-button[name='SCHEDULE'], #schedule-radio-button, [aria-label*='ตั้งเวลา']")
        print("Schedule element found?", bool(sched_radio), flush=True)
        if sched_radio:
            await sched_radio.click()
            await asyncio.sleep(2)
            await page.screenshot(path="C:/Users/bkky9/master_m1_media/step4_schedule_expanded.png")
            print("Saved step4_schedule_expanded.png", flush=True)
            
        await page.close()

asyncio.run(run())
