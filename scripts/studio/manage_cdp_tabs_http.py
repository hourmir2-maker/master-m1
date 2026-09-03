# -*- coding: utf-8 -*-
import urllib.request
import json

def main():
    resp = urllib.request.urlopen('http://127.0.0.1:9222/json')
    tabs = json.loads(resp.read().decode('utf-8'))
    print(f"Total targets: {len(tabs)}")
    pages = [t for t in tabs if t.get('type') == 'page']
    print(f"Total pages: {len(pages)}")
    
    studio_pages = [p for p in pages if 'studio.youtube.com' in p.get('url', '')]
    print(f"Total YouTube Studio pages: {len(studio_pages)}")
    
    # Close extra studio pages except the first one
    for p in studio_pages[1:]:
        tid = p.get('id')
        print(f"Closing extra tab: {tid} - {p.get('title')}")
        try:
            urllib.request.urlopen(f"http://127.0.0.1:9222/json/close/{tid}")
        except Exception as e:
            print("Error closing:", e)
            
    print("Done cleaning tabs!")

if __name__ == '__main__':
    main()
