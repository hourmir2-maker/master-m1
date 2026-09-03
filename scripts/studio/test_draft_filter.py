# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

DRAFT_FILTER_URL = "https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short?filter=%5B%7B%22name%22%3A%22VISIBILITY%22%2C%22value%22%3A%5B%22DRAFT%22%5D%7D%5D"

async def test_filter():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("Navigating to Draft filter URL...", flush=True)
        await page.goto(DRAFT_FILTER_URL, wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/draft_filter_page.png")
        print("Saved draft_filter_page.png", flush=True)
        
        rows = await page.query_selector_all("ytcp-video-row")
        print(f"Total draft rows displayed: {len(rows)}", flush=True)
        for r in rows:
            t = await r.inner_text()
            print("  •", t.splitlines()[0] if t else "")
            
        await page.close()

asyncio.run(test_filter())
