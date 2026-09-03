# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

async def get_draft_links():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="networkidle")
        await asyncio.sleep(3)
        
        titles = await page.query_selector_all("#video-title")
        print(f"Total title elements: {len(titles)}")
        
        draft_edit_urls = []
        for t in titles:
            text = (await t.inner_text()).strip()
            href = await t.get_attribute("href")
            # Only target drafts
            if "yt upload temp" in text or "01 Shorts" in text:
                print(f"Draft found: '{text}' -> href: {href}")
                if href:
                    draft_edit_urls.append((text, f"https://studio.youtube.com{href}"))
                    
        print("\nAll draft edit URLs:", draft_edit_urls)
        
        # Now visit each draft edit URL and delete it!
        for title, url in draft_edit_urls:
            print(f"\n🗑️ Deleting draft: {title} ({url})...")
            await page.goto(url, wait_until="networkidle")
            await asyncio.sleep(3)
            
            # Click 3 dots menu
            dots = await page.query_selector("#options-button, [aria-label*='ตัวเลือกเพิ่มเติม'], [aria-label*='ตัวเลือก']")
            if dots:
                await dots.click()
                await asyncio.sleep(1)
                
                del_btn = await page.query_selector("ytcp-menu-service-item-renderer:has-text('ลบ'), :has-text('ลบทิ้งอย่างถาวร')")
                if del_btn:
                    await del_btn.click()
                    await asyncio.sleep(1.5)
                    
                    cb = await page.query_selector("tp-yt-paper-checkbox#confirm-checkbox, tp-yt-paper-checkbox")
                    if cb:
                        await cb.click()
                        await asyncio.sleep(0.5)
                        
                    confirm = await page.query_selector("ytcp-button#confirm-button, [aria-label*='ลบทิ้งอย่างถาวร']")
                    if confirm:
                        await confirm.click()
                        print(f"Deleted draft: {title}!")
                        await asyncio.sleep(4)
                        
        print("\nCleanup finished!")
        await page.goto("https://studio.youtube.com/channel/UCL_9roKIZ7-5oL3-I_Sj6eg/videos/short", wait_until="networkidle")
        await asyncio.sleep(3)
        await page.screenshot(path="C:/Users/bkky9/master_m1_media/studio_cleaned_final.png")
        print("Saved studio_cleaned_final.png")
        await page.close()

asyncio.run(get_draft_links())
