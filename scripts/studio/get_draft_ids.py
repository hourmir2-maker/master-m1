# -*- coding: utf-8 -*-
import asyncio
import json
import urllib.request
import websockets

async def get_draft_ids():
    resp = urllib.request.urlopen('http://127.0.0.1:9222/json')
    tabs = json.loads(resp.read().decode('utf-8'))
    ws_url = [t['webSocketDebuggerUrl'] for t in tabs if 'studio.youtube.com' in t.get('url', '')][0]
    
    async with websockets.connect(ws_url) as ws:
        msg = {
            "id": 1,
            "method": "Runtime.evaluate",
            "params": {
                "expression": """(() => {
                    const drafts = [];
                    document.querySelectorAll('ytcp-video-row').forEach((r, idx) => {
                        const text = r.innerText;
                        if (!text.includes('กำหนดเวลา')) {
                            const a = r.querySelector('a#video-title, a[href*="/video/"]');
                            drafts.push({ idx, text: text.split('\\n')[0], href: a ? a.getAttribute('href') : null });
                        }
                    });
                    return drafts;
                })()""",
                "returnByValue": True
            }
        }
        await ws.send(json.dumps(msg))
        r = json.loads(await ws.recv())
        drafts = r.get("result", {}).get("result", {}).get("value", [])
        print(f"Found {len(drafts)} drafts:")
        for d in drafts:
            print(" ", d)

asyncio.run(get_draft_ids())
