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
        
        # Check all rows where isScheduled == False
        await page.evaluate("""() => {
            document.querySelectorAll('ytcp-video-row').forEach(r => {
                const isScheduled = r.innerText.includes('กำหนดเวลา');
                if (!isScheduled) {
                    const cb = r.querySelector('ytcp-checkbox-lit, #checkbox');
                    if (cb) cb.click();
                }
            });
        }""")
        
        await asyncio.sleep(2)
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/only_drafts_checked.png")
        print("Saved only_drafts_checked.png", flush=True)
        
        # Inspect bulk action buttons
        actions = await page.evaluate("""() => {
            const res = [];
            document.querySelectorAll('#bulk-actions-container button, #bulk-actions-container ytcp-button, #bulk-actions-container ytcp-dropdown-trigger').forEach(b => {
                res.push({ id: b.id, text: (b.innerText || b.getAttribute('aria-label') || '').trim() });
            });
            return res;
        }""")
        print("Bulk actions found:", actions, flush=True)
        
        await page.close()

asyncio.run(run())
