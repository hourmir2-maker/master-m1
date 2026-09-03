# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def delete_one_draft():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("Navigating to Shorts page with networkidle...", flush=True)
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="networkidle")
        await asyncio.sleep(3)
        
        # Find all rows
        rows = await page.query_selector_all("ytcp-video-row")
        print(f"Total rows found: {len(rows)}", flush=True)
        
        target_row = None
        for idx, r in enumerate(rows):
            text = await r.inner_text()
            if 'กำหนดเวลา' not in text and ('yt upload temp' in text or '01 Shorts' in text or 'ฉบับร่าง' in text):
                print(f"Found draft row at index {idx}: {text.splitlines()[0]}", flush=True)
                target_row = r
                break
                
        if not target_row:
            print("No draft row found!", flush=True)
            await page.close()
            return
            
        print("Hovering over draft row...", flush=True)
        await target_row.hover()
        await asyncio.sleep(1.5)
        
        # Click 3-dots options button
        dots_btn = await target_row.query_selector("#options-button, ytcp-icon-button[aria-label*='ตัวเลือก']")
        if dots_btn:
            print("Clicking 3-dots button...", flush=True)
            await dots_btn.click()
            await asyncio.sleep(1.5)
            
            # Click "ลบทิ้งอย่างถาวร"
            del_item = await page.query_selector("ytcp-menu-service-item-renderer:has-text('ลบทิ้งอย่างถาวร'), [test-id='delete-forever'], :has-text('ลบทิ้งอย่างถาวร')")
            if del_item:
                print("Clicking 'ลบทิ้งอย่างถาวร' menu item...", flush=True)
                await del_item.click()
                await asyncio.sleep(1.5)
                
                # Check confirm checkbox
                cb = await page.query_selector("tp-yt-paper-checkbox#confirm-checkbox, tp-yt-paper-checkbox")
                if cb:
                    print("Checking confirmation checkbox...", flush=True)
                    await cb.click()
                    await asyncio.sleep(1)
                    
                # Click confirm delete
                btn = await page.query_selector("ytcp-button#confirm-button, [aria-label*='ลบทิ้งอย่างถาวร']")
                if btn:
                    print("Clicking final delete confirm button...", flush=True)
                    await btn.click()
                    await asyncio.sleep(5)
                    print("Deleted 1 draft successfully!", flush=True)
        else:
            print("❌ 3-dots button not found!", flush=True)
            
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/after_one_draft_del.png")
        print("Saved after_one_draft_del.png", flush=True)
        await page.close()

asyncio.run(delete_one_draft())
