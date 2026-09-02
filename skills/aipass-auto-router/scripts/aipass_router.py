#!/usr/bin/env python3
"""
AiPASS Auto-Router & Failover Engine via Chrome DevTools Protocol (CDP)
========================================================================
Features:
1. Task-Class Routing: Code, Math/Research, Thai Creative, General Fast.
2. Auto-Failover: 15-minute cooldown tracking for rate-limited / quota-exhausted models.
3. Local Processing: Extracts clean response markdown & optional Second Brain artifact export.
"""

import sys
import os
import re
import time
import json
import argparse
import asyncio
from datetime import datetime, timedelta

try:
    from playwright.async_api import async_playwright
except ImportError:
    print("[-] Error: 'playwright' is required. Run: pip install playwright")
    sys.exit(1)

# Default paths and settings
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
STATE_FILE = os.path.join(SCRIPT_DIR, "failover_state.json")
DEFAULT_CDP_URL = "http://localhost:9222"
COOLDOWN_MINUTES = 15

# Model Priority Maps per Task Class
ROUTING_CHAINS = {
    "code": [
        "Claude Sonnet 5",
        "DeepSeek V3.2",
        "Gemini 3.7 Flash",
        "Claude Opus 5",
        "Kimi K2.7 Code"
    ],
    "math_research": [
        "DeepSeek R1",
        "Sonar Reasoning Pro",
        "Claude Sonnet 5",
        "Gemini 3.1 Pro (Preview)",
        "Gemini 3.7 Flash"
    ],
    "thai_creative": [
        "Pathumma ThaiLLM 8B",
        "Pathumma ThaiLLM",
        "Typhoon-2",
        "Claude Sonnet 5",
        "Gemini 3.7 Flash"
    ],
    "english_vocab": [
        "Gemini 3.7 Flash",
        "Claude Sonnet 5",
        "Gemini 3.1 Flash Lite",
        "GPT-5.6 Sol"
    ],
    "general_fast": [
        "Gemini 3.1 Flash Lite",
        "Gemini 3.7 Flash",
        "DeepSeek V3.2",
        "Claude Sonnet 5"
    ]
}

# Quota error indicators in Thai & English
QUOTA_ERROR_PATTERNS = [
    r"โควต[้๊้า]+เต็ม",
    r"โควต[้๊้า]+ประจำวันหมด",
    r"ติดโควต[้๊้า]+",
    r"rate limit",
    r"quota exceeded",
    r"daily limit reached",
    r"too many requests",
    r"try again later",
    r"ลองใหม่อีกครั้งในภายหลัง"
]

def load_state():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"cooldowns": {}, "last_used_model": None, "history": []}

def save_state(state):
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump(state, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[!] Warning: Failed to save failover state: {e}")

def set_model_cooldown(model_name, minutes=COOLDOWN_MINUTES):
    state = load_state()
    expiry = (datetime.now() + timedelta(minutes=minutes)).isoformat()
    state["cooldowns"][model_name] = expiry
    print(f"[⚡ Failover Engine] Model '{model_name}' marked rate-limited. Cooldown until {expiry[:19]}")
    save_state(state)

def is_model_cooling_down(model_name):
    state = load_state()
    cooldowns = state.get("cooldowns", {})
    if model_name in cooldowns:
        try:
            expiry = datetime.fromisoformat(cooldowns[model_name])
            if datetime.now() < expiry:
                return True
            else:
                del cooldowns[model_name]
                save_state(state)
        except Exception:
            pass
    return False

def classify_task(prompt):
    prompt_lower = prompt.lower()
    
    # 1. Code Detection
    code_keywords = ["def ", "function", "class ", "import ", "const ", "let ", "var ", "return ", "bug", "refactor", "fix", "script", "html", "css", "sql", "typescript", "python", "javascript", "react", "next.js"]
    if any(kw in prompt_lower for kw in code_keywords) or "```" in prompt:
        return "code"

    # 2. Math & Deep Research Detection
    math_keywords = ["calculate", "math", "formula", "proof", "research", "analyze", "วิเคราะห์", "คำนวณ", "พิสูจน์", "สถิติ", "ทฤษฎี", "deep research", "r1", "คณิตศาสตร์", "ราคา", "bitcoin", "แนวโน้ม", "สูตรลัด"]
    if any(kw in prompt_lower for kw in math_keywords):
        return "math_research"

    # 3. English & Vocab Bank Detection
    english_keywords = ["english", "vocab", "vocabulary", "grammar", "reading comprehension", "ภาษาอังกฤษ", "คำศัพท์"]
    if any(kw in prompt_lower for kw in english_keywords):
        return "english_vocab"

    # 4. Thai Creative & Copywriting Detection
    is_thai = bool(re.search(r'[\u0E00-\u0E7F]', prompt))
    creative_keywords = ["แต่ง", "เขียนบทความ", "สำนวน", "ถอดความ", "เกลา", "เรียบเรียง", "แต่งกลอน", "ร่างจดหมาย", "บทพูด", "วรรณคดี", "หลักภาษา", "ภาษาไทย"]
    if is_thai and any(kw in prompt_lower for kw in creative_keywords):
        return "thai_creative"

    # 5. Default General Fast
    return "general_fast"

async def select_model_on_aipass(page, target_model):
    """Attempts to select target_model in AiPASS dropdown selector."""
    print(f"[+] Attempting to select model: '{target_model}' on AiPASS...")

    # Check if target_model is already active in header button
    try:
        header_btns = page.locator("header button, nav button, button")
        cnt = await header_btns.count()
        for i in range(cnt):
            btn = header_btns.nth(i)
            if await btn.is_visible():
                txt = await btn.inner_text()
                if target_model.lower() in txt.lower() and "เลือก" not in txt:
                    print(f"[+] Model '{target_model}' is ALREADY active in header button. Skipping modal.")
                    return True
    except Exception:
        pass

    # Try clicking model dropdown selector
    selectors = [
        "button:has-text('โมเดล')",
        "button:has-text('Model')",
        "[data-testid='model-selector']",
        "header button",
        "nav button"
    ]
    clicked = False
    for sel in selectors:
        try:
            elem = page.locator(sel).first
            if await elem.is_visible(timeout=1000):
                await elem.click()
                clicked = True
                await asyncio.sleep(0.5)
                break
        except Exception:
            continue

    if not clicked:
        # Fallback click anywhere near header dropdown
        try:
            headers = page.locator("header button, nav button")
            count = await headers.count()
            for i in range(count):
                btn = headers.nth(i)
                txt = await btn.inner_text()
                if any(m in txt for m in ["Claude", "DeepSeek", "Gemini", "Typhoon", "GPT", "Model", "โมเดล"]):
                    await btn.click()
                    await asyncio.sleep(0.5)
                    break
        except Exception:
            pass

    # Select target_model option from opened list
    option_found = False
    try:
        # Look for element with exact or partial model name
        options = page.locator(f"text=/{re.escape(target_model)}/i")
        if await options.count() > 0:
            await options.first.click()
            option_found = True
            print(f"[+] Selected model option: '{target_model}'")
            await asyncio.sleep(0.5)

            # Click 'ยืนยัน' (Confirm) button if modal requires it
            confirm_btn = page.locator("button:has-text('ยืนยัน'), button:has-text('Confirm')")
            if await confirm_btn.count() > 0:
                for i in range(await confirm_btn.count()):
                    btn = confirm_btn.nth(i)
                    if await btn.is_visible():
                        await btn.click()
                        print("[+] Clicked 'ยืนยัน' (Confirm) model button!")
                        await asyncio.sleep(1.0)
                        break

            # Press Escape to ensure modal overlay closes
            await page.keyboard.press("Escape")
            await asyncio.sleep(0.5)

    except Exception as e:
        print(f"[!] Note on model option click: {e}")

    return option_found

async def send_prompt_and_wait(page, prompt):
    """Pastes prompt into input area, submits, and waits for response completion."""
    print("[+] Injecting prompt into AiPASS chat input...")

    # Dismiss any active modal overlays
    try:
        await page.keyboard.press("Escape")
        await asyncio.sleep(0.3)
        await page.keyboard.press("Escape")
        await asyncio.sleep(0.3)
    except Exception:
        pass
    
    # Common chat input selectors
    input_selectors = [
        "textarea",
        "[contenteditable='true']",
        "input[type='text']",
        "#prompt-input",
        "#chat-input",
        "textarea[placeholder*='ถาม']",
        "textarea[placeholder*='Ask']"
    ]
    
    input_elem = page.locator("textarea[placeholder*='ถาม'], textarea").first
    await input_elem.click()
    await page.keyboard.press("Control+A")
    await page.keyboard.press("Backspace")
    await page.keyboard.insert_text(prompt)
    await asyncio.sleep(0.5)

    # Click Submit button via JS evaluation
    clicked = await page.evaluate("""() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const sendBtn = btns.find(b => b.innerText.includes('Send message') || (b.className && b.className.includes('bg-bg-brand-primary')));
        if (sendBtn) {
            sendBtn.click();
            return true;
        }
        return false;
    }""")

    if clicked:
        print("[+] Clicked Send button via JS DOM evaluation!")
    else:
        print("[+] Sending via Enter key...")
        await input_elem.press("Enter")

    # Wait for completion
    print("[+] Waiting for model response to complete...")
    start_time = time.time()
    max_wait = 180 # 3 minutes max for deep reasoning models

    while time.time() - start_time < max_wait:
        await asyncio.sleep(2.0)
        
        # Check for stop generation button (if present, still generating)
        try:
            stop_btn = page.locator("button:has-text('Stop'), button:has-text('หยุด'), .stop-generating")
            if await stop_btn.count() > 0 and await stop_btn.first.is_visible():
                continue # Still streaming
        except Exception:
            pass

        # Check if response text has settled
        # Wait extra 2 seconds after stream settles
        await asyncio.sleep(2.0)
        break

    # Extract last response message block
    print("[+] Extracting response content...")
    response_selectors = [
        ".markdown-body",
        ".prose",
        "[class*='markdown']",
        "[class*='chat-message']",
        "[class*='assistant']",
        "div[data-message-author-role='assistant']",
        ".message-content"
    ]

    last_text = ""
    for sel in response_selectors:
        try:
            elems = page.locator(sel)
            cnt = await elems.count()
            for i in range(cnt - 1, -1, -1):
                txt = await elems.nth(i).inner_text()
                # Ignore UI sidebar text
                if txt and len(txt.strip()) > 30 and "เลือกโมเดล" not in txt and "แชทใหม่" not in txt:
                    last_text = txt
                    break
            if last_text:
                break
        except Exception:
            continue

    if not last_text:
        # Fallback extract body text without UI nav
        raw_text = await page.evaluate("() => document.body.innerText")
        lines = [line for line in raw_text.split('\n') if "เลือกโมเดล" not in line and "แชทใหม่" not in line]
        last_text = "\n".join(lines)

    return last_text

def check_for_quota_error(text):
    for pattern in QUOTA_ERROR_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            return True
    return False

async def run_router(prompt, task_class=None, requested_model=None, cdp_url=DEFAULT_CDP_URL, output_file=None):
    # 1. Determine Task Class
    if not task_class or task_class == "auto":
        task_class = classify_task(prompt)
    
    print(f"\n[🎯 AiPASS Router] Task Class Identified: '{task_class.upper()}'")

    # 2. Build Model Priority Chain
    if requested_model:
        model_chain = [requested_model] + [m for m in ROUTING_CHAINS.get(task_class, []) if m.lower() != requested_model.lower()]
    else:
        model_chain = ROUTING_CHAINS.get(task_class, ROUTING_CHAINS["general_fast"])

    print(f"[📋 Model Chain]: {' -> '.join(model_chain)}")

    # 3. Connect to Browser via CDP
    print(f"[🔌 Connecting CDP]: {cdp_url} ...")
    async with async_playwright() as p:
        try:
            browser = await p.chromium.connect_over_cdp(cdp_url)
        except Exception as e:
            print(f"\n[-] Error connecting to browser at {cdp_url}: {e}")
            print("[💡 Tip] Make sure Brave or Chrome is running with flag: --remote-debugging-port=9222")
            print("      Or run script: python scripts/launch_browser_cdp.py")
            return None

        context = browser.contexts[0]
        
        # Find active AiPASS tab or use first tab
        page = None
        for p_item in context.pages:
            if "aipass" in p_item.url.lower():
                page = p_item
                break
        
        if not page:
            if len(context.pages) > 0:
                page = context.pages[0]
                await page.goto("https://aipass.go.th/")
            else:
                page = await context.new_page()
                await page.goto("https://aipass.go.th/")

        print(f"[🌐 Connected Page]: {page.url}")

        # 4. Loop through Model Chain with Auto-Failover
        final_response = None
        used_model = None

        for model in model_chain:
            if is_model_cooling_down(model):
                print(f"[⏭️ Cooldown Active]: Model '{model}' is currently in 15-min rate-limit cooldown. Skipping...")
                continue

            print(f"\n[🚀 Executing Attempt]: Using Model '{model}'...")
            try:
                # Select model on UI
                await select_model_on_aipass(page, model)
                
                # Send prompt & wait
                response_text = await send_prompt_and_wait(page, prompt)

                # Check if quota limit hit
                if check_for_quota_error(response_text):
                    print(f"[⚠️ Quota Limit Detected]: Model '{model}' reached rate limit!")
                    set_model_cooldown(model, COOLDOWN_MINUTES)
                    print("[🔄 Auto-Failover]: Switching to next model in fallback sequence...")
                    continue
                
                # Success!
                final_response = response_text
                used_model = model
                print(f"[✅ Success]: Response retrieved successfully from model '{model}'!")
                break

            except Exception as ex:
                print(f"[!] Exception with model '{model}': {ex}")
                set_model_cooldown(model, COOLDOWN_MINUTES)
                print("[🔄 Auto-Failover]: Retrying with fallback model...")
                continue

        if not final_response:
            print("\n[-] All models in priority chain failed or are rate limited.")
            return None

        # Update last used model state
        state = load_state()
        state["last_used_model"] = used_model
        state["history"].append({
            "timestamp": datetime.now().isoformat(),
            "task_class": task_class,
            "model": used_model,
            "prompt_length": len(prompt),
            "response_length": len(final_response)
        })
        save_state(state)

        # Output to file if specified
        if output_file:
            os.makedirs(os.path.dirname(os.path.abspath(output_file)), exist_ok=True)
            with open(output_file, "w", encoding="utf-8") as f:
                f.write(f"# AiPASS Response ({used_model})\n\n")
                f.write(f"**Task Class**: {task_class}\n")
                f.write(f"**Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
                f.write("---\n\n")
                f.write(final_response)
            print(f"[💾 Saved Output]: {output_file}")

        return {
            "model": used_model,
            "task_class": task_class,
            "response": final_response
        }

def main():
    parser = argparse.ArgumentParser(description="AiPASS Auto-Router & Failover Engine")
    parser.add_argument("--prompt", "-p", type=str, required=True, help="Prompt text to process")
    parser.add_argument("--task-class", "-t", type=str, choices=["code", "math_research", "thai_creative", "general_fast", "auto"], default="auto", help="Task classification")
    parser.add_argument("--model", "-m", type=str, default=None, help="Force specific model")
    parser.add_argument("--cdp-port", type=int, default=9222, help="Chrome DevTools Protocol port")
    parser.add_argument("--output", "-o", type=str, default=None, help="Save response to output file")

    args = parser.parse_args()
    cdp_url = f"http://localhost:{args.cdp_port}"

    result = asyncio.run(run_router(
        prompt=args.prompt,
        task_class=args.task_class,
        requested_model=args.model,
        cdp_url=cdp_url,
        output_file=args.output
    ))

    if result:
        print("\n" + "="*50)
        print(f"--- ANSWER FROM {result['model']} ({result['task_class']}) ---")
        print("="*50 + "\n")
        print(result["response"])

if __name__ == "__main__":
    main()
