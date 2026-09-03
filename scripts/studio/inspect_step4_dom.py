# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def inspect_step4():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        # Get active pages
        pages = context.pages
        print(f"Total pages: {len(pages)}")
        for pg in pages:
            if "studio.youtube.com" in pg.url:
                print("Found Studio page:", pg.url)
                # Inspect radio buttons and sections
                els = await pg.evaluate("""() => {
                    const out = [];
                    document.querySelectorAll('tp-yt-paper-radio-button, [role=\"radio\"], ytcp-button, ytcp-dropdown-trigger, [id*=\"schedule\"], [id*=\"publish\"], [name*=\"PUBLIC\"]').forEach(e => {
                        out.push({
                            id: e.id,
                            tag: e.tagName,
                            name: e.getAttribute('name'),
                            role: e.getAttribute('role'),
                            aria: e.getAttribute('aria-label'),
                            text: (e.innerText || '').trim().slice(0, 40)
                        });
                    });
                    return out;
                }""")
                for item in els:
                    print("  Item:", item)
                    
                # Take screenshot
                await pg.screenshot(path="C:/Users/bkky9/master_m1_media/step4_open_dialog.png")
                print("Saved step4_open_dialog.png")

asyncio.run(inspect_step4())
