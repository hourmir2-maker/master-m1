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
        
        # Evaluate each row
        rows_data = await page.evaluate("""() => {
            const out = [];
            document.querySelectorAll('ytcp-video-row').forEach((r, idx) => {
                const titleEl = r.querySelector('#video-title');
                const title = titleEl ? titleEl.innerText.trim() : '';
                const allText = r.innerText;
                const isScheduled = allText.includes('กำหนดเวลา');
                const isDraft = allText.includes('แบบร่าง') || title === 'yt upload temp' || title.includes('01 Shorts');
                out.push({ idx, title, isScheduled, isDraft, allText: allText.replace(/\\n+/g, ' | ') });
            });
            return out;
        }""")
        
        print("Rows breakdown:")
        for r in rows_data:
            print(f"Row {r['idx']}: Scheduled={r['isScheduled']}, Draft={r['isDraft']}")
            print(f"  Title: {r['title']}")
            print(f"  Text: {r['allText'][:120]}")
            print("-" * 50)
            
        await page.close()

asyncio.run(run())
