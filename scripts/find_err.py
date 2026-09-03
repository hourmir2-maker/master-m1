# -*- coding: utf-8 -*-
with open("scripts/build_massive_vocab.py", "r", encoding="utf-8") as f:
    text = f.read()

import ast
tree = ast.parse(text)
for node in ast.walk(tree):
    if isinstance(node, ast.Assign):
        for target in node.targets:
            if getattr(target, 'id', '') == 'MASSIVE_VOCAB':
                for idx, elt in enumerate(node.value.elts):
                    if len(elt.elts) != 9:
                        print(f"Row {idx} has {len(elt.elts)} elements! Word: {elt.elts[0].value}")
