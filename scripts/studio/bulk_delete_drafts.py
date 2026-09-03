# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        # Get details of all rows
        rows_data = await page.evaluate("""() => {
            const out = [];
            const rows = document.querySelectorAll('ytcp-video-row');
            rows.forEach((r, idx) => {
                const title = (r.querySelector('#video-title') || {}).innerText || '';
                const vis = (r.querySelector('[aria-label*=\"ระดับการแชร์\"], #visibility-cell') || {}).innerText || '';
                const isScheduled = vis.includes('กำหนดเวลา') || vis.includes('Scheduled');
                const isDraft = title.includes('yt upload temp') || title.includes('01 Shorts') || !isScheduled;
                out.push({ idx, title: title.trim().slice(0, 40), vis: vis.trim(), isScheduled, isDraft });
            });
            return out;
        }""")
        
        print("Rows analysis:")
        for r in rows_data:
            print(f"  [{r['idx']}] isScheduled={r['isScheduled']} isDraft={r['isDraft']} | Title: {r['title']}")
            
        # Select checkboxes of draft rows
        draft_indices = [r['idx'] for r in rows_data if r['isDraft']]
        print(f"\nDraft indices to select: {draft_indices}", flush=True)
        
        for idx in draft_indices:
            # Click checkbox of row idx
            cb = await page.query_selector(f"ytcp-video-row:nth-of-type({idx+1}) ytcp-checkbox-lit")
            if not cb:
                cb = await page.query_selector(f"ytcp-video-row:nth-of-type({idx+1}) #checkbox")
            if cb:
                await cb.click()
                print(f"Checked row {idx}", flush=True)
                await asyncio.sleep(0.5)
                
        await asyncio.sleep(1)
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/drafts_selected.png")
        print("Saved drafts_selected.png", flush=True)
        
        # Look for bulk action bar: "การดำเนินการอื่นๆ"
        more_actions = await page.query_selector("#more-actions-button, [aria-label*='การดำเนินการอื่นๆ'], button:has-text('การดำเนินการอื่นๆ'), #bulk-actions-container ytcp-button")
        if more_actions:
            print("Clicking more actions...", flush=True)
            await more_actions.click()
            await asyncio.sleep(1)
            
            # Click "ลบทิ้งอย่างถาวร"
            del_btn = await page.query_selector("ytcp-menu-service-item-renderer:has-text('ลบ'), [test-id='delete-forever'], ytcp-button:has-text('ลบทิ้งอย่างถาวร')")
            if del_btn:
                print("Clicking delete forever in menu...", flush=True)
                await del_btn.click()
                await asyncio.sleep(1.5)
                
                # Check confirm checkbox
                chk = await page.query_selector("tp-yt-paper-checkbox#confirm-checkbox, tp-yt-paper-checkbox")
                if chk:
                    await chk.click()
                    await asyncio.sleep(0.5)
                    
                # Click final confirm button
                final_del = await page.query_selector("ytcp-button#confirm-button, [aria-label*='ลบทิ้งอย่างถาวร']")
                if final_del:
                    print("Clicking final delete button...", flush=True)
                    await final_del.click()
                    await asyncio.sleep(5)
                    print("Deleted drafts!", flush=True)
                    
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/final_content_cleaned.png")
        print("Saved final_content_cleaned.png", flush=True)
        await page.close()

asyncio.run(run())
