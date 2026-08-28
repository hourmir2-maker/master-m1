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

console.log('=== SCAFFOLDING & DIVERSITY DEEP AUDIT ===\n');

for (const modKey of moduleKeys) {
  const modA = thaiData[modKey];
  const setA = modA.practiceQuestions;
  const setB = dynamicQuiz.thai[modKey][0];

  console.log('================================================================');
  console.log(`MODULE: ${modKey} (${modA.emoji} ${modA.title})`);
  console.log('================================================================');

  console.log('\n--- Set A Scaffolding (10 Questions) ---');
  setA.forEach((q, idx) => {
    const tier = idx < 3 ? 'Q1-3 [พื้นฐาน/Confidence]' : (idx < 7 ? 'Q4-7 [ประยุกต์/3s Tip]' : 'Q8-10 [Gifted/O-NET Trap]');
    console.log(`  [${tier}] #${idx+1} (${q.id}): ${q.question.slice(0, 60)}...`);
    console.log(`     Correct: ${q.correctAnswer.slice(0, 40)}...`);
    console.log(`     Tip: ${q.tip.slice(0, 60)}...`);
  });

  console.log('\n--- Set B Scaffolding (10 Questions) ---');
  setB.forEach((q, idx) => {
    const tier = idx < 3 ? 'Q1-3 [พื้นฐาน/Confidence]' : (idx < 7 ? 'Q4-7 [ประยุกต์/3s Tip]' : 'Q8-10 [Gifted/O-NET Trap]');
    console.log(`  [${tier}] #${idx+1} (${q.id}): ${q.question.slice(0, 60)}...`);
    console.log(`     Correct: ${q.correctAnswer.slice(0, 40)}...`);
    console.log(`     Tip: ${q.tip.slice(0, 60)}...`);
  });

  // Check question similarity / duplicate detection between Set A and Set B
  let exactMatchCount = 0;
  for (let i = 0; i < setA.length; i++) {
    for (let j = 0; j < setB.length; j++) {
      if (setA[i].question.trim() === setB[j].question.trim()) {
        console.warn(`⚠️ Exact question text duplicate found: Set A #${i+1} and Set B #${j+1}`);
        exactMatchCount++;
      }
    }
  }
  console.log(`\nExact Duplicate Questions between Set A and Set B: ${exactMatchCount}`);
}
