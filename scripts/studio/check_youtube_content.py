# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def inspect_uploaded_videos():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("Navigating to YouTube Studio Content page...")
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="networkidle")
        await asyncio.sleep(4)
        
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/studio_content_list.png")
        print("Saved studio_content_list.png")
        
        rows = await page.query_selector_all("#video-title, yt-formatted-string#video-title")
        print(f"Total videos listed: {len(rows)}")
        for r in rows:
            t = await r.inner_text()
            if t.strip():
                print("  •", t.strip())
                
        await page.close()

asyncio.run(inspect_uploaded_videos())
