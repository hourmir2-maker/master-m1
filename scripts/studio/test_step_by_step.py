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
        else:
            print("❌ upload_btn not found!", flush=True)
            await page.close()
            return

        file_input = await page.query_selector("input[type='file']")
        if file_input:
            print("3. Setting input files...", flush=True)
            await file_input.set_input_files(VIDEO_PATH)
            print("File set! Waiting 6s for wizard...", flush=True)
            await asyncio.sleep(6)
            
            await page.screenshot(path="C:/Users/bkky9/master_m1_media/wizard_step1.png")
            print("Saved wizard_step1.png", flush=True)
        else:
            print("❌ file_input not found!", flush=True)

        await page.close()

asyncio.run(run())
