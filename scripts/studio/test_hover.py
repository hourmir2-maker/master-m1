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
        
        rows = await page.query_selector_all("ytcp-video-row")
        print(f"Total rows: {len(rows)}")
        
        # Look at row 5 (first draft)
        r5 = rows[5]
        print("Hovering over row 5...")
        await r5.hover()
        await asyncio.sleep(2)
        
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/row5_hover.png")
        print("Saved row5_hover.png")
        
        hover_items = await r5.evaluate("""(row) => {
            const res = [];
            row.querySelectorAll('ytcp-icon-button, button, a, [role=\"button\"]').forEach(b => {
                res.push({ id: b.id, aria: b.getAttribute('aria-label'), text: (b.innerText || '').trim() });
            });
            return res;
        }""")
        print("Hover items in row 5:", hover_items)
        
        await page.close()

asyncio.run(run())
