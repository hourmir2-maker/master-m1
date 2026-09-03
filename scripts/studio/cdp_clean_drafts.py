# -*- coding: utf-8 -*-
import asyncio
import json
import urllib.request
import websockets

async def main():
    resp = urllib.request.urlopen('http://127.0.0.1:9222/json')
    data = json.loads(resp.read().decode('utf-8'))
    
    studio_tab = None
    for d in data:
        if 'studio.youtube.com' in d.get('url', '') and d.get('type') == 'page':
            studio_tab = d
            break
            
    if not studio_tab:
        print("YouTube Studio tab not found!")
        return
        
    ws_url = studio_tab['webSocketDebuggerUrl']
    print(f"Connecting to YouTube Studio page WebSocket: {ws_url}", flush=True)
    
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
                    
        # 1. Inspect rows
        print("1. Querying rows status...", flush=True)
        eval_script = """(() => {
            const rows = document.querySelectorAll('ytcp-video-row');
            const summary = [];
            rows.forEach((r, idx) => {
                const text = r.innerText;
                const isScheduled = text.includes('กำหนดเวลา');
                summary.push({ idx, isScheduled, title: text.split('\\n')[0] });
            });
            return summary;
        })()"""
        
        res = await call("Runtime.evaluate", {"expression": eval_script, "returnByValue": True})
        rows_info = res.get("result", {}).get("value", [])
        print(f"Found {len(rows_info)} total rows:")
        for r in rows_info:
            print(f"  [{r['idx']}] isScheduled={r['isScheduled']} | {r['title']}")
            
        # 2. Click checkboxes on draft rows only
        print("\n2. Checking checkboxes of unscheduled draft rows...", flush=True)
        check_script = """(() => {
            let checked = 0;
            document.querySelectorAll('ytcp-video-row').forEach(r => {
                const text = r.innerText;
                if (!text.includes('กำหนดเวลา')) {
                    const cb = r.querySelector('ytcp-checkbox-lit, #checkbox');
                    if (cb) {
                        cb.click();
                        checked++;
                    }
                }
            });
            return checked;
        })()"""
        res = await call("Runtime.evaluate", {"expression": check_script, "returnByValue": True})
        checked_count = res.get("result", {}).get("value", 0)
        print(f"Checked {checked_count} draft rows!", flush=True)
        
        if checked_count == 0:
            print("No drafts to delete!")
            return
            
        await asyncio.sleep(2)
        
        # 3. Click More Actions button
        print("3. Clicking 'การดำเนินการอื่นๆ'...", flush=True)
        click_more = """(() => {
            const btn = document.querySelector('#more-actions-button, [aria-label*="การดำเนินการอื่นๆ"], #bulk-actions-container ytcp-button:last-child');
            if (btn) {
                btn.click();
                return true;
            }
            return false;
        })()"""
        res = await call("Runtime.evaluate", {"expression": click_more, "returnByValue": True})
        print("More actions clicked:", res.get("result", {}).get("value"))
        await asyncio.sleep(1.5)
        
        # 4. Click 'ลบทิ้งอย่างถาวร'
        print("4. Clicking 'ลบทิ้งอย่างถาวร'...", flush=True)
        click_del = """(() => {
            const items = document.querySelectorAll('ytcp-menu-service-item-renderer, tp-yt-paper-item, #text-item-0');
            for (const it of items) {
                if ((it.innerText || '').includes('ลบ')) {
                    it.click();
                    return true;
                }
            }
            return false;
        })()"""
        res = await call("Runtime.evaluate", {"expression": click_del, "returnByValue": True})
        print("Delete item clicked:", res.get("result", {}).get("value"))
        await asyncio.sleep(1.5)
        
        # 5. Check confirmation checkbox & confirm
        print("5. Confirming permanent deletion...", flush=True)
        confirm_del = """(() => {
            const chk = document.querySelector('tp-yt-paper-checkbox#confirm-checkbox, tp-yt-paper-checkbox');
            if (chk) chk.click();
            
            setTimeout(() => {
                const btn = document.querySelector('ytcp-button#confirm-button, [aria-label*="ลบทิ้งอย่างถาวร"]');
                if (btn) btn.click();
            }, 500);
            return true;
        })()"""
        res = await call("Runtime.evaluate", {"expression": confirm_del, "returnByValue": True})
        print("Confirm script executed:", res.get("result", {}).get("value"))
        
        print("Waiting 6s for deletion to process...", flush=True)
        await asyncio.sleep(6)
        
        # 6. Check final status
        print("\n6. Checking final status...", flush=True)
        res = await call("Runtime.evaluate", {"expression": eval_script, "returnByValue": True})
        final_rows = res.get("result", {}).get("value", [])
        print(f"Final remaining rows ({len(final_rows)}):")
        for r in final_rows:
            print(f"  ✅ [{r['idx']}] isScheduled={r['isScheduled']} | {r['title']}")
            
        print("\n🎉 Draft cleanup complete!", flush=True)

if __name__ == '__main__':
    asyncio.run(main())
