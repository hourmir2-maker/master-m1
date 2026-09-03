# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

ASCII_PATH = "C:\\Users\\bkky9\\master_m1_media\\yt_upload_temp.mp4"

async def run():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("1. Opening Studio...", flush=True)
        await page.goto("https://studio.youtube.com/", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        # Click upload button
        upload_btn = await page.query_selector("ytcp-icon-button[aria-label*='อัปโหลด'], #upload-button")
        if upload_btn:
            await upload_btn.click()
            await asyncio.sleep(2)
            
        print("2. Sending file via CDP...", flush=True)
        cdp = await context.new_cdp_session(page)
        doc = await cdp.send("DOM.getDocument", {"depth": -1, "pierce": True})
        node = await cdp.send("DOM.querySelector", {"nodeId": doc["root"]["nodeId"], "selector": "input[type='file']"})
        await cdp.send("DOM.setFileInputFiles", {
            "files": [ASCII_PATH],
            "nodeId": node["nodeId"]
        })
        print("File sent! Waiting 6s for wizard...", flush=True)
        await asyncio.sleep(6)
        
        # Audience
        not_kids = await page.query_selector("tp-yt-paper-radio-button[name='VIDEO_MADE_FOR_KIDS_NOT_MFK']")
        if not_kids:
            await not_kids.click()
            
        # Click Next 3 times
        for step in range(3):
            await asyncio.sleep(2)
            next_btn = await page.query_selector("#next-button")
            if next_btn:
                await next_btn.click()
                print(f"Clicked Next ({step+1}/3)", flush=True)
                
        await asyncio.sleep(3)
        
        # Scroll down in the visibility dialog
        print("3. Scrolling visibility dialog...", flush=True)
        await page.evaluate("""() => {
            const scrollable = document.querySelector('#scrollable-content, #dialog #scrollable');
            if (scrollable) {
                scrollable.scrollTop = scrollable.scrollHeight;
            } else {
                window.scrollTo(0, document.body.scrollHeight);
            }
        }""")
        await asyncio.sleep(2)
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/step4_scrolled.png")
        print("Saved step4_scrolled.png", flush=True)
        
        # Look for Schedule button or section
        sched_btn = await page.query_selector("#schedule-section, [aria-label*='ตั้งเวลา'], #second-container-expand-button, :has-text('ตั้งเวลา')")
        if sched_btn:
            print("Found schedule button, clicking...", flush=True)
            await sched_btn.click()
            await asyncio.sleep(2)
            await page.screenshot(path="C:/Users/bkky9/master_m1_media/step4_sched_opened.png")
            print("Saved step4_sched_opened.png", flush=True)

        await page.close()

asyncio.run(run())
