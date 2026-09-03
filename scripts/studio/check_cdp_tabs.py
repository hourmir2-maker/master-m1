# -*- coding: utf-8 -*-
import urllib.request
import json

try:
    with urllib.request.urlopen("http://127.0.0.1:9222/json") as r:
        tabs = json.loads(r.read().decode("utf-8"))
        print(f"Connected to CDP! Total open tabs: {len(tabs)}")
        for t in tabs:
            title = t.get("title", "")
            url = t.get("url", "")
            ttype = t.get("type", "")
            print(f"[{ttype}] {title} -> {url}")
except Exception as e:
    print("CDP Error:", e)
