# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

VIDEO_PATH = r"C:\Users\bkky9\master_m1_media\Shorts_9x16\01_Shorts_คณิต_สูตรลัด3วิ.mp4"

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
            
        print("3. Calling page.set_input_files直接...", flush=True)
        # Using page.set_input_files directly on the selector
        await page.set_input_files("input[type='file']", VIDEO_PATH)
        print("File set! Waiting 8s for wizard...", flush=True)
        await asyncio.sleep(8)
        
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/wizard_direct_set.png")
        print("Saved wizard_direct_set.png", flush=True)
        
        await page.close()

asyncio.run(run())
