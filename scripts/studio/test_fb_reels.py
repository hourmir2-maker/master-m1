import urllib.request
import urllib.parse
import json
import os

token = ""
page_id = "645243598902533"

with open(".env.local", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if line.startswith("FB_PAGE_TOKEN="):
            token = line.split("=", 1)[1].strip().strip('"').strip("'")
        if line.startswith("FB_PAGE_ID="):
            page_id = line.split("=", 1)[1].strip().strip('"').strip("'")

# Test initialize video_reels session
url = f"https://graph.facebook.com/v21.0/{page_id}/video_reels"
payload = urllib.parse.urlencode({
    "upload_phase": "start",
    "access_token": token
}).encode("utf-8")

req = urllib.request.Request(url, data=payload)
try:
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print("Reels Init Success:", res)
except Exception as e:
    print("Reels Init Error:", e)
    if hasattr(e, "read"):
        print(e.read().decode("utf-8"))
