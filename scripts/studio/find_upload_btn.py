# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        await page.goto("https://studio.youtube.com/", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        btns = await page.evaluate("""() => {
            const res = [];
            document.querySelectorAll('ytcp-button, ytcp-icon-button, button, a').forEach(el => {
                const text = el.innerText || el.getAttribute('aria-label') || el.id;
                if (text && (text.includes('อัปโหลด') || text.includes('สร้าง') || el.id.includes('upload'))) {
                    res.push({ id: el.id, tag: el.tagName, aria: el.getAttribute('aria-label'), text: text.trim().slice(0, 30) });
                }
            });
            return res;
        }""")
        print("Buttons found:", btns)
        
        # Click the first upload button found
        upload_btn = await page.query_selector("ytcp-icon-button[aria-label*='อัปโหลด'], #upload-button, [test-id='upload']")
        if upload_btn:
            print("Clicking upload_btn...")
            await upload_btn.click()
            await asyncio.sleep(3)
            await page.screenshot(path="C:/Users/bkky9/master_m1_media/after_upload_click.png")
            print("Saved after_upload_click.png")
            
            fi = await page.query_selector("input[type='file']")
            print("File input present?", bool(fi))
            
        await page.close()

asyncio.run(run())
