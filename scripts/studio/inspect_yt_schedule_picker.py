# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

ASCII_PATH = "C:\\Users\\bkky9\\master_m1_media\\yt_upload_temp.mp4"

async def run():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        await page.goto("https://studio.youtube.com/", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        upload_btn = await page.query_selector("ytcp-icon-button[aria-label*='อัปโหลด'], #upload-button")
        if upload_btn:
            await upload_btn.click()
            await asyncio.sleep(2)
            
        cdp = await context.new_cdp_session(page)
        doc = await cdp.send("DOM.getDocument", {"depth": -1, "pierce": True})
        node = await cdp.send("DOM.querySelector", {"nodeId": doc["root"]["nodeId"], "selector": "input[type='file']"})
        await cdp.send("DOM.setFileInputFiles", {
            "files": [ASCII_PATH],
            "nodeId": node["nodeId"]
        })
        await asyncio.sleep(6)
        
        not_kids = await page.query_selector("tp-yt-paper-radio-button[name='VIDEO_MADE_FOR_KIDS_NOT_MFK']")
        if not_kids:
            await not_kids.click()
            
        for step in range(3):
            await asyncio.sleep(1.5)
            next_btn = await page.query_selector("#next-button")
            if next_btn:
                await next_btn.click()
                
        await asyncio.sleep(3)
        
        # Click on Public radio first to test
        pub_radio = await page.query_selector("tp-yt-paper-radio-button[name='PUBLIC']")
        print("Public radio found?", bool(pub_radio), flush=True)
        
        # Scroll to bottom of dialog
        await page.evaluate("""() => {
            const sc = document.querySelector('#scrollable-content');
            if (sc) sc.scrollTop = sc.scrollHeight;
        }""")
        await asyncio.sleep(1.5)
        
        # Find schedule expand button
        sched_btn = await page.query_selector("#second-container-expand-button, #schedule-expand-button, [aria-label*='ตั้งเวลา']")
        if sched_btn:
            print("Clicking schedule expand button...", flush=True)
            await sched_btn.click()
            await asyncio.sleep(2)
            await page.screenshot(path="C:/Users/bkky9/master_m1_media/sched_picker_visible.png")
            print("Saved sched_picker_visible.png", flush=True)
            
        await page.close()

asyncio.run(run())
