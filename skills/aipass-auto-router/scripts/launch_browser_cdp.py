#!/usr/bin/env python3
"""
Browser Launcher for CDP Debugging Mode
Antigravity Custom Skill - aipass-auto-router
"""

import sys
import os
import subprocess
import socket

DEFAULT_PORT = 9222

COMMON_BROWSER_PATHS = [
    r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe",
    r"C:\Program Files (x86)\BraveSoftware\Brave-Browser\Application\brave.exe",
    os.path.expanduser(r"~\AppData\Local\BraveSoftware\Brave-Browser\Application\brave.exe"),
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    os.path.expanduser(r"~\AppData\Local\Google\Chrome\Application\chrome.exe"),
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
]

def is_port_open(port=DEFAULT_PORT, host="127.0.0.1"):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(1.0)
        return s.connect_ex((host, port)) == 0

def find_browser():
    for path in COMMON_BROWSER_PATHS:
        if os.path.exists(path):
            return path
    return None

def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    if is_port_open(port):
        print(f"[+] CDP Port {port} is ALREADY OPEN and ready for connection.")
        return

    browser_path = find_browser()
    if not browser_path:
        print("[-] Error: Could not automatically locate Brave, Chrome, or Edge executable.")
        print("    Please launch your browser manually with: --remote-debugging-port=9222")
        sys.exit(1)

    print(f"[+] Launching Browser: {browser_path}")
    print(f"[+] Debugging Port: {port}")
    
    cmd = [
        browser_path,
        f"--remote-debugging-port={port}",
        "https://aipass.go.th/"
    ]
    
    subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"[+] Browser launched successfully on port {port}!")

if __name__ == "__main__":
    main()
