# -*- coding: utf-8 -*-
import asyncio
import json
import urllib.request
import websockets

async def clean_drafts():
    resp = urllib.request.urlopen('http://127.0.0.1:9222/json')
    tabs = json.loads(resp.read().decode('utf-8'))
    ws_url = [t['webSocketDebuggerUrl'] for t in tabs if 'studio.youtube.com' in t.get('url', '')][0]
    
    async with websockets.connect(ws_url, max_size=10*1024*1024) as ws:
        msg_id = 1
        async def call(method, params=None):
            nonlocal msg_id
            m = {"id": msg_id, "method": method, "params": params or {}}
            msg_id += 1
            await ws.send(json.dumps(m))
            while True:
                r = json.loads(await ws.recv())
                if r.get("id") == m["id"]:
                    return r.get("result", {})
                    
        async def click_at(x, y):
            await ws.send(json.dumps({'id': 999, 'method': 'Input.dispatchMouseEvent', 'params': {'type': 'mousePressed', 'x': x, 'y': y, 'button': 'left', 'clickCount': 1}}))
            await ws.recv()
            await ws.send(json.dumps({'id': 998, 'method': 'Input.dispatchMouseEvent', 'params': {'type': 'mouseReleased', 'x': x, 'y': y, 'button': 'left', 'clickCount': 1}}))
            await ws.recv()

        print("1. Checking table state...", flush=True)
        # Select checkboxes of all unscheduled rows
        select_drafts_js = """(() => {
            let count = 0;
            document.querySelectorAll('ytcp-video-row').forEach(r => {
                const text = r.innerText;
                if (!text.includes('กำหนดเวลา')) {
                    const cb = r.querySelector('ytcp-checkbox-lit, #checkbox');
                    if (cb && !cb.hasAttribute('checked') && cb.getAttribute('aria-checked') !== 'true') {
                        cb.click();
                        count++;
                    }
                }
            });
            return count;
        })()"""
        res = await call("Runtime.evaluate", {"expression": select_drafts_js, "returnByValue": True})
        print(f"Drafts selected: {res.get('result', {}).get('result', {}).get('value')}", flush=True)
        await asyncio.sleep(1.5)
        
        # Click 'การดำเนินการเพิ่มเติม'
        print("2. Clicking 'การดำเนินการเพิ่มเติม'...", flush=True)
        click_more_js = """(() => {
            const span = Array.from(document.querySelectorAll('span')).find(s => (s.innerText || '').trim() === 'การดำเนินการเพิ่มเติม');
            if (span) {
                span.click();
                const r = span.getBoundingClientRect();
                return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
            }
            return null;
        })()"""
        res = await call("Runtime.evaluate", {"expression": click_more_js, "returnByValue": True})
        more_pos = res.get("result", {}).get("result", {}).get("value")
        if more_pos:
            await click_at(more_pos['x'], more_pos['y'])
            print("Clicked more actions!", flush=True)
            await asyncio.sleep(1)
            
        # Click 'ลบทิ้งถาวร'
        print("3. Clicking 'ลบทิ้งถาวร' in menu...", flush=True)
        click_del_js = """(() => {
            const item = Array.from(document.querySelectorAll('tp-yt-paper-item, ytcp-menu-service-item-renderer')).find(el => (el.innerText || '').includes('ลบทิ้งถาวร'));
            if (item) {
                item.click();
                const r = item.getBoundingClientRect();
                return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
            }
            return null;
        })()"""
        res = await call("Runtime.evaluate", {"expression": click_del_js, "returnByValue": True})
        del_pos = res.get("result", {}).get("result", {}).get("value")
        if del_pos:
            await click_at(del_pos['x'], del_pos['y'])
            print("Clicked delete menu item!", flush=True)
            await asyncio.sleep(1.5)
            
        # Modal confirmation: click checkbox and confirm delete
        print("4. Confirming deletion in modal...", flush=True)
        modal_js = """(() => {
            const cb = document.querySelector('#confirm-checkbox');
            const btn = document.querySelector('#confirm-button');
            if (cb && btn) {
                const rCb = cb.getBoundingClientRect();
                const rBtn = btn.getBoundingClientRect();
                return {
                    cb: { x: rCb.x + rCb.width / 2, y: rCb.y + rCb.height / 2 },
                    btn: { x: rBtn.x + rBtn.width / 2, y: rBtn.y + rBtn.height / 2 }
                };
            }
            return null;
        })()"""
        res = await call("Runtime.evaluate", {"expression": modal_js, "returnByValue": True})
        modal_pos = res.get("result", {}).get("result", {}).get("value")
        if modal_pos:
            print("Clicking confirm checkbox...", flush=True)
            await click_at(modal_pos['cb']['x'], modal_pos['cb']['y'])
            await asyncio.sleep(1)
            print("Clicking final confirm button...", flush=True)
            await click_at(modal_pos['btn']['x'], modal_pos['btn']['y'])
            print("Delete submitted! Waiting 6s...", flush=True)
            await asyncio.sleep(6)
            
        # Final table check
        print("\n5. Checking final table contents...", flush=True)
        final_check = """(() => {
            const out = [];
            document.querySelectorAll('ytcp-video-row').forEach((r, idx) => {
                const title = (r.querySelector('#video-title') || {}).innerText || r.innerText.split('\\n')[0];
                const isScheduled = r.innerText.includes('กำหนดเวลา');
                out.push({ idx, isScheduled, title: title.trim() });
            });
            return out;
        })()"""
        res = await call("Runtime.evaluate", {"expression": final_check, "returnByValue": True})
        rows = res.get("result", {}).get("result", {}).get("value", [])
        print(f"Total remaining rows: {len(rows)}")
        for r in rows:
            status = "🕒 กำหนดเวลาไว้ (SCHEDULED)" if r['isScheduled'] else "⚠️ DRAFT"
            print(f"  [{r['idx']}] {status} | {r['title']}")

asyncio.run(clean_drafts())
