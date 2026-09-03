# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def test_master_m1():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        print('Opening MASTER ม.1 YouTube Studio...')
        await page.goto('https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg', wait_until='networkidle')
        await asyncio.sleep(4)
        print('Current URL:', page.url)
        print('Page Title:', await page.title())
        
        # Check channel name displayed in sidebar/header
        name_el = await page.query_selector('#entity-name')
        if name_el:
            print('Channel Name on page:', await name_el.inner_text())
            
        await page.screenshot(path='C:/Users/bkky9/master_m1_media/master_m1_studio_verified.png')
        print('Screenshot saved!')
        await page.close()

asyncio.run(test_master_m1())
