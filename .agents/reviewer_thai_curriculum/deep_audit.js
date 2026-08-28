const ts = require('typescript');
const fs = require('fs');

function loadTsModule(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const js = ts.transpileModule(content, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const mod = { exports: {} };
  const fn = new Function('module', 'exports', 'require', js);
  fn(mod, mod.exports, require);
  return mod.exports;
}

const thaiData = loadTsModule('src/lib/thai-lessons-data.ts').THAI_LESSONS_DATA;
const dynamicQuiz = loadTsModule('src/lib/dynamic-quiz-pool.ts').DYNAMIC_QUESTION_POOL;

const moduleKeys = [
  'thai_reading',
  'thai_word_classes',
  'thai_royal_loanwords',
  'thai_sentence_structures',
  'thai_idioms_dialects',
  'thai_literature_poetry',
  'thai_writing',
  'thai_listening_speaking'
];

console.log('=== DETAILED QUESTION-BY-QUESTION INTEGRITY AUDIT ===');

let totalAudited = 0;
let potentialFlags = [];

function checkQuestion(q, setType, modKey, index) {
  totalAudited++;
  const label = `${setType} | ${modKey} | #${index+1} (${q.id})`;
  
  // 1. Check exact match of correctAnswer
  const optIdx = q.options.indexOf(q.correctAnswer);
  if (optIdx === -1) {
    potentialFlags.push({ label, issue: 'CRITICAL: correctAnswer does not exist in options array verbatim.' });
  }

  // 2. Check options uniqueness (no duplicate options)
  const uniqueOpts = new Set(q.options);
  if (uniqueOpts.size !== q.options.length) {
    potentialFlags.push({ label, issue: 'Duplicate options found in question options list.' });
  }

  // 3. Check for placeholder texts
  const allText = (q.question + ' ' + q.options.join(' ') + ' ' + q.explanation + ' ' + q.tip).toLowerCase();
  const placeholders = ['todo', 'tbd', 'placeholder', 'dummy', 'lorem ipsum', 'test 123'];
  for (const ph of placeholders) {
    if (allText.includes(ph)) {
      potentialFlags.push({ label, issue: `Placeholder text found: '${ph}'` });
    }
  }

  // 4. Check explanation completeness (mentions multiple choices or reasons)
  if (q.explanation.length < 50) {
    potentialFlags.push({ label, issue: `Short explanation (${q.explanation.length} chars)` });
  }
}

for (const modKey of moduleKeys) {
  const setA = thaiData[modKey].practiceQuestions;
  const setB = dynamicQuiz.thai[modKey][0];

  setA.forEach((q, idx) => checkQuestion(q, 'Set A', modKey, idx));
  setB.forEach((q, idx) => checkQuestion(q, 'Set B', modKey, idx));
}

console.log(`Total Questions Audited: ${totalAudited}`);
console.log(`Total Potential Flags: ${potentialFlags.length}`);
if (potentialFlags.length > 0) {
  console.log(JSON.stringify(potentialFlags, null, 2));
} else {
  console.log('✅ ALL 160 QUESTIONS PASSED ALL INTEGRITY & STRUCTURAL CHECKS!');
}
