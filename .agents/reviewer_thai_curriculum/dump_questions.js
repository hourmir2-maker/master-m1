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

for (const modKey of moduleKeys) {
  const modA = thaiData[modKey];
  const setA = modA.practiceQuestions;
  const setB = dynamicQuiz.thai[modKey][0];
  
  console.log(`\n========================================================================`);
  console.log(`MODULE: ${modKey} - ${modA.title}`);
  console.log(`========================================================================`);
  console.log(`SECRET FORMULA: ${modA.secretFormula.name}`);
  console.log(`SUMMARY HEADINGS: ${modA.summaryPoints.map(s => s.title).join(' | ')}`);
  
  console.log(`\n--- SET A QUESTIONS & ANSWERS (10 Qs) ---`);
  setA.forEach((q, i) => {
    console.log(`[Set A - Q${i+1}] ${q.question}`);
    console.log(`   Options:`);
    q.options.forEach((opt, oi) => {
      const marker = opt === q.correctAnswer ? '  [CORRECT] ' : '            ';
      console.log(`     ${marker}(${oi+1}) ${opt}`);
    });
    console.log(`   Tip: ${q.tip}`);
  });

  console.log(`\n--- SET B QUESTIONS & ANSWERS (10 Qs) ---`);
  setB.forEach((q, i) => {
    console.log(`[Set B - Q${i+1}] ${q.question}`);
    console.log(`   Options:`);
    q.options.forEach((opt, oi) => {
      const marker = opt === q.correctAnswer ? '  [CORRECT] ' : '            ';
      console.log(`     ${marker}(${oi+1}) ${opt}`);
    });
    console.log(`   Tip: ${q.tip}`);
  });
}
