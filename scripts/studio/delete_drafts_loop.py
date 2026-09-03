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
                    
        async def click_at(x, y):
            await ws.send(json.dumps({'id': 999, 'method': 'Input.dispatchMouseEvent', 'params': {'type': 'mousePressed', 'x': x, 'y': y, 'button': 'left', 'clickCount': 1}}))
            await ws.recv()
            await ws.send(json.dumps({'id': 998, 'method': 'Input.dispatchMouseEvent', 'params': {'type': 'mouseReleased', 'x': x, 'y': y, 'button': 'left', 'clickCount': 1}}))
            await ws.recv()
            
        for loop_count in range(10):
            print(f"\n--- Round {loop_count+1} ---", flush=True)
            
            # Find first draft row
            res = await call("Runtime.evaluate", {
                "expression": """(() => {
                    const rows = document.querySelectorAll('ytcp-video-row');
                    for (let i = 0; i < rows.length; i++) {
                        const text = rows[i].innerText;
                        if (!text.includes('กำหนดเวลา')) {
                            const rect = rows[i].getBoundingClientRect();
                            return { found: true, idx: i, title: text.split('\\n')[0], x: rect.x + 300, y: rect.y + 20 };
                        }
                    }
                    return { found: false };
                })()""",
                "returnByValue": True
            })
            info = res.get("result", {}).get("value", {})
            if not info.get("found"):
                print("🎉 ALL DRAFTS DELETED! Only 5 official scheduled shorts remain!", flush=True)
                break
                
            idx = info["idx"]
            title = info["title"]
            print(f"Targeting draft [{idx}]: {title}", flush=True)
            
            # Move mouse over row to trigger hover
            await ws.send(json.dumps({'id': 888, 'method': 'Input.dispatchMouseEvent', 'params': {'type': 'mouseMoved', 'x': info['x'], 'y': info['y']}}))
            await ws.recv()
            await asyncio.sleep(0.5)
            
            # Check if direct delete button or options button
            res_btn = await call("Runtime.evaluate", {
                "expression": f"""(() => {{
                    const r = document.querySelectorAll('ytcp-video-row')[{idx}];
                    if (!r) return null;
                    
                    // Direct delete button
                    const direct = Array.from(r.querySelectorAll('button, a, ytcp-button')).find(b => (b.innerText || '').includes('ลบวิดีโอ'));
                    if (direct) {{
                        const rect = direct.getBoundingClientRect();
                        return {{ type: 'direct', x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }};
                    }}
                    
                    // Options button
                    const opt = r.querySelector('[aria-label*="ตัวเลือก"], ytcp-icon-button#options-button');
                    if (opt) {{
                        const rect = opt.getBoundingClientRect();
                        return {{ type: 'opt', x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }};
                    }}
                    return null;
                }})()""",
                "returnByValue": True
            })
            btn_info = res_btn.get("result", {}).get("value")
            if not btn_info:
                print("Could not find button on row!")
                continue
                
            print(f"Clicking row button: {btn_info['type']} at ({btn_info['x']}, {btn_info['y']})", flush=True)
            await click_at(btn_info['x'], btn_info['y'])
            await asyncio.sleep(1)
            
            if btn_info['type'] == 'opt':
                # Click 'ลบทิ้งอย่างถาวร' menu item
                res_menu = await call("Runtime.evaluate", {
                    "expression": """(() => {
                        const items = document.querySelectorAll('ytcp-menu-service-item-renderer, tp-yt-paper-item');
                        for (const it of items) {
                            if ((it.innerText || '').includes('ลบ')) {
                                const rect = it.getBoundingClientRect();
                                return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
                            }
                        }
                        return null;
                    })()""",
                    "returnByValue": True
                })
                m_pos = res_menu.get("result", {}).get("value")
                if m_pos:
                    print(f"Clicking menu delete at ({m_pos['x']}, {m_pos['y']})", flush=True)
                    await click_at(m_pos['x'], m_pos['y'])
                    await asyncio.sleep(1)
                    
            # In confirmation modal: click checkbox, then click confirm button
            res_modal = await call("Runtime.evaluate", {
                "expression": """(() => {
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
                })()""",
                "returnByValue": True
            })
            modal_pos = res_modal.get("result", {}).get("value")
            if modal_pos:
                print("Clicking modal checkbox...", flush=True)
                await click_at(modal_pos['cb']['x'], modal_pos['cb']['y'])
                await asyncio.sleep(0.5)
                print("Clicking modal confirm button...", flush=True)
                await click_at(modal_pos['btn']['x'], modal_pos['btn']['y'])
                await asyncio.sleep(3)
                print("Deleted draft!", flush=True)

        print("\nAll done!")

asyncio.run(delete_all_drafts())
