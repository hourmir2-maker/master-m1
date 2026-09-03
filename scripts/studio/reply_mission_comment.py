# -*- coding: utf-8 -*-
import os
import urllib.request
import urllib.parse
import json

token = ""
with open(".env.local", "r", encoding="utf-8") as f:
    for line in f:
        if line.startswith("FB_PAGE_TOKEN="):
            token = line.split("=", 1)[1].strip()

comment_id = "1019287754410832_2423482168060039"
url = f"https://graph.facebook.com/v21.0/{comment_id}/comments"
reply_text = "ขอบคุณสำหรับการติดตามเพจ Master ม.1 ครับ! น้องๆ สามารถเข้าฝึกทำข้อสอบจำลองและทดลองในห้องแล็บเสมือนจริง 15 สถานีได้ฟรีที่ https://master-m1.vercel.app ได้ตลอด 24 ชม. เลยนะครับ 🎯✨"

data = urllib.parse.urlencode({
    "message": reply_text,
    "access_token": token
}).encode("utf-8")

req = urllib.request.Request(url, data=data, method="POST")
try:
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print("Reply successfully posted! ID:", res.get("id"))
except Exception as e:
    print("Error replying:", e)
