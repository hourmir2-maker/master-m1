# -*- coding: utf-8 -*-
import json
import re

# Read existing words from src/lib/oxford-3000-data.ts
with open("src/lib/oxford-3000-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Parse existing items
# Pattern to match object properties
raw_items = []
pattern = re.compile(r"\{\s*id:\s*'([^']+)',\s*word:\s*'([^']+)',\s*pos:\s*'([^']+)',\s*phonetic:\s*'([^']+)',\s*thaiPhonetic:\s*'([^']+)',\s*meaning:\s*'([^']+)',\s*category:\s*'([^']+)',\s*level:\s*'([^']+)',\s*example:\s*'([^']+)',\s*exampleTh:\s*'([^']+)'\s*\}", re.DOTALL)

for m in pattern.finditer(content):
    raw_items.append({
        'id': m.group(1),
        'word': m.group(2),
        'pos': m.group(3),
        'phonetic': m.group(4),
        'thaiPhonetic': m.group(5),
        'meaning': m.group(6),
        'category': m.group(7),
        'level': m.group(8),
        'example': m.group(9),
        'exampleTh': m.group(10)
    })

print(f"Loaded {len(raw_items)} existing words.")
