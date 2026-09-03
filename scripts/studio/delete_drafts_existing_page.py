# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        print("Connecting CDP...", flush=True)
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = None
        for pg in context.pages:
            if "studio.youtube.com" in pg.url:
                page = pg
                break
        if not page:
            page = await context.new_page()
            
        print(f"Using page: {page.url}", flush=True)
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        rows = await page.query_selector_all("ytcp-video-row")
        print(f"Total rows: {len(rows)}", flush=True)
        
        drafts_selected = 0
        for idx, r in enumerate(rows):
            text = await r.inner_text()
            if "กำหนดเวลา" not in text:
                print(f"Selecting draft [{idx}]: {text.splitlines()[0]}", flush=True)
                cb = await r.query_selector("ytcp-checkbox-lit, #checkbox")
                if cb:
                    await cb.click()
                    drafts_selected += 1
                    await asyncio.sleep(0.5)
            else:
                print(f"Keeping scheduled [{idx}]: {text.splitlines()[0]}", flush=True)
                
        print(f"Total drafts selected: {drafts_selected}", flush=True)
        if drafts_selected > 0:
            await asyncio.sleep(1)
            more_btn = await page.query_selector("#more-actions-button, [aria-label*='การดำเนินการอื่นๆ'], button:has-text('การดำเนินการอื่นๆ')")
            if more_btn:
                print("Clicking more actions...", flush=True)
                await more_btn.click()
                await asyncio.sleep(1)
                
                del_opt = await page.query_selector("ytcp-menu-service-item-renderer:has-text('ลบ'), :has-text('ลบทิ้งอย่างถาวร')")
                if del_opt:
                    print("Clicking delete in menu...", flush=True)
                    await del_opt.click()
                    await asyncio.sleep(1.5)
                    
                    chk = await page.query_selector("tp-yt-paper-checkbox#confirm-checkbox, tp-yt-paper-checkbox")
                    if chk:
                        print("Checking confirm box...", flush=True)
                        await chk.click()
                        await asyncio.sleep(0.5)
                        
                    btn = await page.query_selector("ytcp-button#confirm-button, [aria-label*='ลบทิ้งอย่างถาวร']")
                    if btn:
                        print("Clicking confirm delete button...", flush=True)
                        await btn.click()
                        await asyncio.sleep(5)
                        print("Deleted!", flush=True)
                        
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/studio_cleaned_final.png")
        print("Saved studio_cleaned_final.png", flush=True)

asyncio.run(run())
