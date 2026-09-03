# -*- coding: utf-8 -*-
import asyncio
import json
import urllib.request
import websockets

async def delete_all_drafts():
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
                    
        # Loop until no unscheduled draft rows exist
        for attempt in range(15):
            print(f"\n--- Attempt {attempt+1} ---", flush=True)
            
            # Find first draft row index
            find_js = """(() => {
                const rows = document.querySelectorAll('ytcp-video-row');
                for (let i = 0; i < rows.length; i++) {
                    const text = rows[i].innerText;
                    if (!text.includes('กำหนดเวลา')) {
                        return { found: true, idx: i, title: text.split('\\n')[0] };
                    }
                }
                return { found: false };
            })()"""
            
            res = await call("Runtime.evaluate", {"expression": find_js, "returnByValue": True})
            info = res.get("result", {}).get("value", {})
            if not info.get("found"):
                print("🎉 All draft rows deleted! Only scheduled videos remain!", flush=True)
                break
                
            idx = info["idx"]
            title = info["title"]
            print(f"Targeting draft row [{idx}]: {title}", flush=True)
            
            # Click options button on that row
            click_opt_js = f"""(() => {{
                const r = document.querySelectorAll('ytcp-video-row')[{idx}];
                if (!r) return false;
                
                // First try clicking direct delete button if present
                const directDel = Array.from(r.querySelectorAll('button, a, ytcp-button')).find(b => (b.innerText || '').includes('ลบวิดีโอ'));
                if (directDel) {{
                    directDel.click();
                    return 'direct_clicked';
                }}
                
                const optBtn = r.querySelector('[aria-label*="ตัวเลือก"], ytcp-icon-button#options-button');
                if (optBtn) {{
                    optBtn.click();
                    return 'opt_clicked';
                }}
                return false;
            }})()"""
            
            res = await call("Runtime.evaluate", {"expression": click_opt_js, "returnByValue": True})
            status = res.get("result", {}).get("value")
            print(f"Row click status: {status}", flush=True)
            await asyncio.sleep(1)
            
            if status == 'opt_clicked':
                # Click 'ลบทิ้งอย่างถาวร'
                click_menu_js = """(() => {
                    const items = document.querySelectorAll('ytcp-menu-service-item-renderer, tp-yt-paper-item, ytcp-button');
                    for (const it of items) {
                        if ((it.innerText || '').includes('ลบ')) {
                            it.click();
                            return true;
                        }
                    }
                    return false;
                })()"""
                res = await call("Runtime.evaluate", {"expression": click_menu_js, "returnByValue": True})
                print("Menu click:", res.get("result", {}).get("value"), flush=True)
                await asyncio.sleep(1)
                
            # Confirm modal: check checkbox & click delete
            confirm_js = """(() => {
                const cb = document.querySelector('tp-yt-paper-checkbox#confirm-checkbox, tp-yt-paper-checkbox');
                if (cb) cb.click();
                
                setTimeout(() => {
                    const btn = document.querySelector('ytcp-button#confirm-button, [aria-label*="ลบทิ้งอย่างถาวร"]');
                    if (btn) btn.click();
                }, 400);
                return true;
            })()"""
            await call("Runtime.evaluate", {"expression": confirm_js, "returnByValue": True})
            print("Confirm deletion submitted, waiting 4s...", flush=True)
            await asyncio.sleep(4)

        # Print final table
        print("\n=== Final Table State ===", flush=True)
        eval_final = """(() => {
            const out = [];
            document.querySelectorAll('ytcp-video-row').forEach((r, idx) => {
                out.push({ idx, text: r.innerText.replace(/\\n+/g, ' | ').slice(0, 100) });
            });
            return out;
        })()"""
        res = await call("Runtime.evaluate", {"expression": eval_final, "returnByValue": True})
        final_list = res.get("result", {}).get("value", [])
        for f in final_list:
            print(f"  [{f['idx']}] {f['text']}")

asyncio.run(delete_all_drafts())
