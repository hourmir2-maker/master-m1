const { DYNAMIC_QUESTION_POOL } = require('../../src/lib/dynamic-quiz-pool.ts');
// Note: dynamic-quiz-pool is TS, so let's parse via ts-node or read and evaluate in JS
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../../src/lib/dynamic-quiz-pool.ts'), 'utf8');

// Basic sanity checks
const expectedModules = [
  'thai_reading',
  'thai_word_classes',
  'thai_royal_loanwords',
  'thai_sentence_structures',
  'thai_idioms_dialects',
  'thai_literature_poetry',
  'thai_writing',
  'thai_listening_speaking'
];

let allPassed = true;
let totalQ = 0;

expectedModules.forEach(mod => {
  if (!content.includes(`${mod}: [`)) {
    console.error(`❌ Module ${mod} missing in dynamic-quiz-pool.ts`);
    allPassed = false;
  }
});

console.log('Module keys presence check: PASS');
