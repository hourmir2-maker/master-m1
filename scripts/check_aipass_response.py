# -*- coding: utf-8 -*-
import urllib.request
import json
import asyncio
import websockets

async def get_aipass_text():
    resp = urllib.request.urlopen('http://127.0.0.1:9222/json')
    tabs = json.loads(resp.read().decode('utf-8'))
    ws_url = [t['webSocketDebuggerUrl'] for t in tabs if 'aipass' in t.get('url', '').lower()][0]
    
    async with websockets.connect(ws_url, max_size=20*1024*1024) as ws:
        msg = {
            "id": 1,
            "method": "Runtime.evaluate",
            "params": {
                "expression": """(() => {
                    // Try to find the assistant response container
                    const msgs = document.querySelectorAll('[class*="chat_message"], [class*="prose"], [class*="markdown"], .message-content, [data-message-author-role="assistant"]');
                    if (msgs.length > 0) {
                        return Array.from(msgs).map(m => m.innerText).join('\\n\\n===MSG===\\n\\n');
                    }
                    // Fallback to text inside main
                    const main = document.querySelector('main, #chat-container, [role="main"]');
                    return main ? main.innerText : document.body.innerText;
                })()""",
                "returnByValue": True
            }
        }
        await ws.send(json.dumps(msg))
        r = json.loads(await ws.recv())
        val = r.get("result", {}).get("result", {}).get("value", "")
        print(f"Length of extracted text: {len(val)}")
        
        # Save to file
        with open("C:/Users/bkky9/master-m1/docs/aipass_deep_insights.md", "w", encoding="utf-8") as f:
            f.write("# 🧠 ข้อมูลเชิงลึกจาก AiPASS (Deep Intelligence for MASTER ม.1)\n\n")
            f.write(val)
            
        print("Saved to C:/Users/bkky9/master-m1/docs/aipass_deep_insights.md")

if __name__ == '__main__':
    asyncio.run(get_aipass_text())
