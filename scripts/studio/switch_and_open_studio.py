# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def test_direct_studio():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        # Click on MASTER ม.1 in channel switcher first
        print("1. Going to channel switcher...")
        await page.goto("https://www.youtube.com/channel_switcher", wait_until="networkidle")
        await asyncio.sleep(2)
        
        master_btn = await page.query_selector("text='MASTER ม.1', :has-text('MASTER ม.1')")
        if master_btn:
            print("2. Clicking MASTER ม.1 channel item...")
            await master_btn.click()
            await asyncio.sleep(4)
            
        print("3. Navigating to https://studio.youtube.com/ ...")
        await page.goto("https://studio.youtube.com/", wait_until="networkidle")
        await asyncio.sleep(4)
        
        print("Current URL:", page.url)
        print("Page Title:", await page.title())
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/current_studio_dashboard.png")
        print("Saved current_studio_dashboard.png")
        
        # Check channel name in studio
        name_el = await page.query_selector("#entity-name, #channel-title, [aria-label*='ช่องของคุณ']")
        if name_el:
            print("Studio Channel Name:", await name_el.inner_text())
            
        await page.close()

asyncio.run(test_direct_studio())
