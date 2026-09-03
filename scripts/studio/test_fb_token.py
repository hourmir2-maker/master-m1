import urllib.request
import json
import os

token = ""
page_id = "645243598902533"

env_file = ".env.local"
if os.path.exists(env_file):
    with open(env_file, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith("FB_PAGE_TOKEN="):
                token = line.split("=", 1)[1].strip().strip('"').strip("'")
            if line.startswith("FB_PAGE_ID="):
                page_id = line.split("=", 1)[1].strip().strip('"').strip("'")

print(f"Loaded Page ID: {page_id}, Token len: {len(token)}")

url = f"https://graph.facebook.com/v21.0/{page_id}?fields=name,id&access_token={token}"
try:
    with urllib.request.urlopen(url) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        print("Page Info:", data)
except Exception as e:
    print("Error querying page:", e)
    if hasattr(e, "read"):
        print(e.read().decode("utf-8"))
