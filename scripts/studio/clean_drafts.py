# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def clean_drafts():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("Navigating to Shorts content page...", flush=True)
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        # Take initial screenshot
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/before_cleanup.png")
        
        # Look for rows where visibility or title is draft
        # Let's inspect rows
        rows = await page.query_selector_all("ytcp-video-row")
        print(f"Total rows found: {len(rows)}", flush=True)
        
        deleted_count = 0
        for i in range(len(rows)):
            # Refresh rows reference after any deletion
            current_rows = await page.query_selector_all("ytcp-video-row")
            draft_found = False
            for r in current_rows:
                text = await r.inner_text()
                # Check if it's a draft / incomplete upload
                if "yt upload temp" in text or "แบบร่าง" in text or ("01 Shorts คณิต" in text and "กำหนดเวลาไว้" not in text):
                    print(f"Found draft row to delete: {text.splitlines()[0]}", flush=True)
                    draft_found = True
                    # Hover over row to reveal action buttons
                    await r.hover()
                    await asyncio.sleep(1)
                    
                    # Look for 3-dots menu button inside row
                    menu_btn = await r.query_selector("#options-button, ytcp-icon-button[aria-label*='ตัวเลือก'], [aria-label*='การดำเนินการ']")
                    if menu_btn:
                        await menu_btn.click()
                        await asyncio.sleep(1)
                        
                        # Click "ลบทิ้งอย่างถาวร" (Delete forever)
                        del_opt = await page.query_selector("yt-formatted-string:has-text('ลบทิ้งอย่างถาวร'), [test-id='delete-forever'], ytcp-menu-service-item-renderer:has-text('ลบ')")
                        if del_opt:
                            await del_opt.click()
                            await asyncio.sleep(1.5)
                            
                            # Confirm dialog: check the confirmation checkbox
                            checkbox = await page.query_selector("tp-yt-paper-checkbox#confirm-checkbox, tp-yt-paper-checkbox")
                            if checkbox:
                                await checkbox.click()
                                await asyncio.sleep(0.5)
                                
                            # Click delete button in dialog
                            confirm_del = await page.query_selector("ytcp-button#confirm-button, [aria-label*='ลบทิ้งอย่างถาวร'], ytcp-button:has-text('ลบทิ้งอย่างถาวร')")
                            if confirm_del:
                                await confirm_del.click()
                                print("  • Confirmed delete! Waiting 3s...", flush=True)
                                await asyncio.sleep(3)
                                deleted_count += 1
                                break
                                
            if not draft_found:
                print("No more draft rows found.", flush=True)
                break
                
        print(f"Total drafts deleted: {deleted_count}", flush=True)
        await asyncio.sleep(2)
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/after_cleanup.png")
        print("Saved after_cleanup.png", flush=True)
        await page.close()

asyncio.run(clean_drafts())
