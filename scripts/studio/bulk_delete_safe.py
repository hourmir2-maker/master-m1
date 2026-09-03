# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def clean():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        
        # 1. Close redundant Studio tabs
        studio_pages = [pg for pg in context.pages if "studio.youtube.com" in pg.url]
        print(f"Total studio tabs open: {len(studio_pages)}")
        for pg in studio_pages[1:]:
            try:
                await pg.close()
            except:
                pass
                
        # Use the remaining or new page
        page = context.pages[0] if context.pages else await context.new_page()
        print("Navigating to Shorts list...", flush=True)
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        # 2. Click header checkbox to select all
        print("Clicking select-all header checkbox...", flush=True)
        # Find header checkbox
        await page.evaluate("""() => {
            const hcb = document.querySelector('thead ytcp-checkbox-lit, #header-checkbox, thead #checkbox');
            if (hcb) hcb.click();
        }""")
        await asyncio.sleep(2)
        
        # 3. Uncheck only the 5 scheduled rows
        print("Unchecking scheduled rows...", flush=True)
        uncheck_result = await page.evaluate("""() => {
            let unchecked = 0;
            document.querySelectorAll('ytcp-video-row').forEach(r => {
                const text = r.innerText;
                if (text.includes('กำหนดเวลา')) {
                    const cb = r.querySelector('ytcp-checkbox-lit, #checkbox');
                    if (cb) {
                        cb.click();
                        unchecked++;
                    }
                }
            });
            return unchecked;
        }""")
        print(f"Unchecked {uncheck_result} scheduled rows!", flush=True)
        await asyncio.sleep(2)
        
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/only_drafts_selected_bulk.png")
        print("Saved only_drafts_selected_bulk.png", flush=True)
        
        # 4. Click 'การดำเนินการอื่นๆ'
        print("Looking for More Actions...", flush=True)
        more_btn = await page.query_selector("#more-actions-button, ytcp-button:has-text('การดำเนินการอื่นๆ'), [aria-label*='การดำเนินการอื่นๆ']")
        if more_btn:
            print("Clicking More Actions button...", flush=True)
            await more_btn.click()
            await asyncio.sleep(1.5)
            
            # Click 'ลบทิ้งอย่างถาวร'
            del_item = await page.query_selector("ytcp-menu-service-item-renderer:has-text('ลบทิ้งอย่างถาวร'), :has-text('ลบทิ้งอย่างถาวร')")
            if del_item:
                print("Clicking 'ลบทิ้งอย่างถาวร'...", flush=True)
                await del_item.click()
                await asyncio.sleep(2)
                
                # Check confirm checkbox
                chk = await page.query_selector("tp-yt-paper-checkbox#confirm-checkbox, tp-yt-paper-checkbox")
                if chk:
                    print("Checking confirm checkbox...", flush=True)
                    await chk.click()
                    await asyncio.sleep(1)
                    
                # Click final confirm delete button
                final_btn = await page.query_selector("ytcp-button#confirm-button, [aria-label*='ลบทิ้งอย่างถาวร']")
                if final_btn:
                    print("Clicking final confirm button to delete all drafts...", flush=True)
                    await final_btn.click()
                    await asyncio.sleep(6)
                    print("🎉 Drafts deleted successfully!", flush=True)
                    
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/studio_final_clean.png")
        print("Saved studio_final_clean.png", flush=True)

asyncio.run(clean())
