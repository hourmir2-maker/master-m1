# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("1. Loading Shorts page...", flush=True)
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        rows = await page.query_selector_all("ytcp-video-row")
        print(f"Found {len(rows)} rows", flush=True)
        
        # Test clicking checkbox on row 5 (draft row)
        draft_row = rows[5]
        print("Clicking checkbox on row 5...")
        # In Playwright, locator or query_selector
        cb = await draft_row.query_selector("ytcp-checkbox-lit")
        if cb:
            await cb.click()
            print("Clicked ytcp-checkbox-lit on row 5!", flush=True)
            await asyncio.sleep(2)
            
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/row5_cb_clicked.png")
        print("Saved row5_cb_clicked.png", flush=True)
        
        await page.close()

asyncio.run(run())
