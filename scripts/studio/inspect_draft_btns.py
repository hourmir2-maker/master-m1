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
        
        btn_info = await page.evaluate("""() => {
            const results = [];
            document.querySelectorAll('ytcp-video-row').forEach((r, idx) => {
                const text = r.innerText;
                if (!text.includes('กำหนดเวลา')) {
                    const rowButtons = [];
                    r.querySelectorAll('button, a, ytcp-button, ytcp-icon-button').forEach(b => {
                        rowButtons.push({
                            id: b.id,
                            tag: b.tagName,
                            aria: b.getAttribute('aria-label'),
                            text: (b.innerText || '').trim()
                        });
                    });
                    results.push({ idx, rowButtons });
                }
            });
            return results;
        }""")
        
        print("Draft rows buttons:")
        for r in btn_info:
            print(f"Row {r['idx']}: {r['rowButtons']}")
            
        await page.close()

asyncio.run(run())
