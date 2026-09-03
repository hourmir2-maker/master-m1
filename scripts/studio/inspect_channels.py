# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def inspect_channels():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        # Navigate to channel switcher
        await page.goto("https://www.youtube.com/channel_switcher", wait_until="networkidle")
        await asyncio.sleep(3)
        print("URL:", page.url)
        print("Title:", await page.title())
        
        # Take screenshot of channel switcher
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/channels_available.png")
        print("Saved screenshot channels_available.png")
        
        # Query channels listed
        channels = await page.query_selector_all("#channel-title, yt-formatted-string.ytd-account-item-renderer")
        for ch in channels:
            text = await ch.inner_text()
            if text.strip():
                print("Found channel:", text.strip())
                
        await page.close()

asyncio.run(inspect_channels())
