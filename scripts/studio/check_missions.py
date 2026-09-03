# -*- coding: utf-8 -*-
import os
import urllib.request
import json

token = ""
with open(".env.local", "r", encoding="utf-8") as f:
    for line in f:
        if line.startswith("FB_PAGE_TOKEN="):
            token = line.split("=", 1)[1].strip()

page_id = "645243598902533"

# Check page feed
url = f"https://graph.facebook.com/v21.0/{page_id}/feed?fields=id,message,comments{{id,message,from}}&access_token={token}"
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())
    posts = data.get("data", [])
    print(f"Total feed posts fetched: {len(posts)}")
    found_comment = None
    for p in posts:
        comments = p.get("comments", {}).get("data", [])
        if comments:
            print(f"Found post with comments! Post ID: {p['id']}, Comments count: {len(comments)}")
            for c in comments:
                print(f"  Comment ID: {c['id']}, Msg: {c.get('message')}, From: {c.get('from', {}).get('name')}")
                found_comment = (p['id'], c['id'])
                break
            if found_comment:
                break

    if not found_comment and posts:
        first_post_id = posts[0]['id']
        print(f"No comments found. We can post a comment to Post {first_post_id} and reply to it!")
