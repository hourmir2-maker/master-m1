# -*- coding: utf-8 -*-
import asyncio
from playwright.async_api import async_playwright

ASCII_PATH = "C:\\Users\\bkky9\\master_m1_media\\yt_upload_temp.mp4"

async def run():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp('http://127.0.0.1:9222')
        context = b.contexts[0]
        page = await context.new_page()
        
        print("1. Loading Studio...", flush=True)
        await page.goto("https://studio.youtube.com/", wait_until="domcontentloaded")
        await asyncio.sleep(4)
        
        upload_btn = await page.query_selector("ytcp-icon-button[aria-label*='อัปโหลด'], #upload-button")
        if upload_btn:
            print("2. Clicking upload button...", flush=True)
            await upload_btn.click()
            await asyncio.sleep(2)
            
        print("3. Connecting raw CDP session...", flush=True)
        cdp = await context.new_cdp_session(page)
        
        doc = await cdp.send("DOM.getDocument", {"depth": -1, "pierce": True})
        node = await cdp.send("DOM.querySelector", {"nodeId": doc["root"]["nodeId"], "selector": "input[type='file']"})
        node_id = node.get("nodeId")
        print(f"Found input node ID: {node_id}", flush=True)
        
        if node_id:
            print("4. Sending DOM.setFileInputFiles via CDP...", flush=True)
            await cdp.send("DOM.setFileInputFiles", {
                "files": [ASCII_PATH],
                "nodeId": node_id
            })
            print("CDP setFileInputFiles returned! Waiting 8s for wizard...", flush=True)
            await asyncio.sleep(8)
            
            await page.screenshot(path="C:/Users/bkky9/master_m1_media/wizard_cdp_success.png")
            print("Saved wizard_cdp_success.png", flush=True)
            
        await page.close()

asyncio.run(run())
