import urllib.request
import json
import asyncio
import websockets

class AiPassCDP:
    def __init__(self):
        self.ws = None
        self.msg_id = 0

    async def connect(self):
        with urllib.request.urlopen('http://127.0.0.1:9222/json') as resp:
            tabs = json.loads(resp.read().decode('utf-8'))
        # Prefer the active chat tab
        tab = next((t for t in tabs if 'de.aipass.net/chat' in t.get('url', '')), None)
        if not tab:
            tab = next(t for t in tabs if 'aipass.net' in t.get('url', ''))
        
        ws_url = tab['webSocketDebuggerUrl']
        print(f"Connecting to CDP Tab: {tab['title']} ({ws_url})")
        self.ws = await websockets.connect(ws_url, max_size=20*1024*1024)
        return tab

    async def send_cmd(self, method, params=None):
        self.msg_id += 1
        payload = {"id": self.msg_id, "method": method, "params": params or {}}
        await self.ws.send(json.dumps(payload))
        while True:
            resp = json.loads(await self.ws.recv())
            if resp.get("id") == self.msg_id:
                return resp.get("result", {})

    async def evaluate(self, expression):
        res = await self.send_cmd("Runtime.evaluate", {
            "expression": expression,
            "awaitPromise": True,
            "returnByValue": True
        })
        if "result" in res and "value" in res["result"]:
            return res["result"]["value"]
        return res

    async def close(self):
        if self.ws:
            await self.ws.close()

# Quick test
async def test():
    cdp = AiPassCDP()
    tab = await cdp.connect()
    title = await cdp.evaluate("document.title")
    url = await cdp.evaluate("window.location.href")
    print("Page Title:", title)
    print("Page URL:", url)
    await cdp.close()

if __name__ == '__main__':
    asyncio.run(test())
