# -*- coding: utf-8 -*-
import os
import urllib.request
import urllib.parse
import json
import time
import datetime

token = ""
page_id = "645243598902533"

with open(".env.local", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if line.startswith("FB_PAGE_TOKEN="):
            token = line.split("=", 1)[1].strip().strip('"').strip("'")
        if line.startswith("FB_PAGE_ID="):
            page_id = line.split("=", 1)[1].strip().strip('"').strip("'")

# Schedule for today at 17:30 Thai time (10:30 UTC)
sched_dt = datetime.datetime(2026, 9, 3, 10, 30, 0, tzinfo=datetime.timezone.utc)
sched_timestamp = int(sched_dt.timestamp())
now_timestamp = int(time.time())

print(f"Current UTC: {datetime.datetime.now(datetime.timezone.utc)}")
print(f"Scheduled Thai time: 2026-09-03 17:30:00 (UTC {sched_dt})")
print(f"Scheduled timestamp: {sched_timestamp} (diff: {(sched_timestamp - now_timestamp)/3600:.2f} hours)")

# Test session start
url_init = f"https://graph.facebook.com/v21.0/{page_id}/video_reels"
payload_init = urllib.parse.urlencode({
    "upload_phase": "start",
    "access_token": token
}).encode("utf-8")

req_init = urllib.request.Request(url_init, data=payload_init, method="POST")
with urllib.request.urlopen(req_init) as resp:
    res_init = json.loads(resp.read().decode("utf-8"))

video_id = res_init.get("video_id")
upload_url = res_init.get("upload_url")
print(f"Video ID: {video_id}")

# Let's test with a small video file
test_file = r"C:\Users\bkky9\master_m1_media\Shorts_9x16\02_Shorts_วิทย์_พลังงานความร้อน.mp4"
file_size = os.path.getsize(test_file)

# Phase 2: Binary upload
req_up = urllib.request.Request(upload_url, data=open(test_file, "rb").read(), method="POST")
req_up.add_header("Authorization", f"OAuth {token}")
req_up.add_header("offset", "0")
req_up.add_header("file_size", str(file_size))

with urllib.request.urlopen(req_up) as resp:
    res_up = json.loads(resp.read().decode("utf-8"))
print(f"Upload result: {res_up}")

# Phase 3: Test SCHEDULED finish
url_finish = f"https://graph.facebook.com/v21.0/{page_id}/video_reels"
payload_finish = urllib.parse.urlencode({
    "upload_phase": "finish",
    "access_token": token,
    "video_id": video_id,
    "video_state": "SCHEDULED",
    "scheduled_publish_time": str(sched_timestamp),
    "description": "🧪 ทดสอบตั้งเวลาเผยแพร่ Reel อัตโนมัติ #Reels"
}).encode("utf-8")

req_finish = urllib.request.Request(url_finish, data=payload_finish, method="POST")
try:
    with urllib.request.urlopen(req_finish) as resp:
        res_finish = json.loads(resp.read().decode("utf-8"))
        print(f"🎉 Schedule success: {res_finish}")
except urllib.error.HTTPError as e:
    err_body = e.read().decode("utf-8")
    print(f"❌ Error HTTP {e.code}: {err_body}")
