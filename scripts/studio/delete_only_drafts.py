# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("1. Opening YouTube Studio Shorts list...", flush=True)
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        rows = await page.query_selector_all("ytcp-video-row")
        print(f"Total video rows: {len(rows)}", flush=True)
        
        draft_count = 0
        for idx, r in enumerate(rows):
            text = await r.inner_text()
            # If NOT scheduled, it is a draft/test upload!
            if "กำหนดเวลา" not in text:
                print(f"Selecting draft row [{idx}]: {text.splitlines()[0]}", flush=True)
                cb = await r.query_selector("ytcp-checkbox-lit, #checkbox")
                if cb:
                    await cb.click()
                    draft_count += 1
                    await asyncio.sleep(0.5)
            else:
                print(f"Keeping scheduled row [{idx}]: {text.splitlines()[0]}", flush=True)
                
        print(f"\nTotal draft rows selected: {draft_count}", flush=True)
        await asyncio.sleep(1.5)
        
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/drafts_checked_correctly.png")
        print("Saved drafts_checked_correctly.png", flush=True)
        
        if draft_count > 0:
            print("2. Clicking 'การดำเนินการอื่นๆ'...", flush=True)
            more_btn = await page.query_selector("#more-actions-button, [aria-label*='การดำเนินการอื่นๆ'], button:has-text('การดำเนินการอื่นๆ')")
            if more_btn:
                await more_btn.click()
                await asyncio.sleep(1.5)
                
                print("3. Clicking 'ลบทิ้งอย่างถาวร'...", flush=True)
                del_opt = await page.query_selector("ytcp-menu-service-item-renderer:has-text('ลบ'), [test-id='delete-forever'], :has-text('ลบทิ้งอย่างถาวร')")
                if del_opt:
                    await del_opt.click()
                    await asyncio.sleep(1.5)
                    
                    print("4. Checking confirmation checkbox...", flush=True)
                    chk = await page.query_selector("tp-yt-paper-checkbox#confirm-checkbox, tp-yt-paper-checkbox")
                    if chk:
                        await chk.click()
                        await asyncio.sleep(1)
                        
                    print("5. Clicking final confirm delete button...", flush=True)
                    confirm_btn = await page.query_selector("ytcp-button#confirm-button, [aria-label*='ลบทิ้งอย่างถาวร']")
                    if confirm_btn:
                        await confirm_btn.click()
                        print("Confirm delete clicked! Waiting 6s for deletion to complete...", flush=True)
                        await asyncio.sleep(6)
                        
        print("6. Refreshing page to verify final state...", flush=True)
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/studio_only_official_scheduled.png")
        print("Saved studio_only_official_scheduled.png", flush=True)
        
        # Print final remaining titles
        final_rows = await page.query_selector_all("#video-title")
        print(f"\nFinal remaining videos ({len(final_rows)}):")
        for fr in final_rows:
            t = (await fr.inner_text()).strip()
            if t:
                print("  ✅", t)
                
        await page.close()

asyncio.run(run())
