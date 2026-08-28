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

console.log('=== 1. VERIFYING 8 THAI MODULES STRUCTURE & CONTENT ===');
let allModulesValid = true;
for (const key of moduleKeys) {
  const mod = thaiData[key];
  if (!mod) {
    console.error('MISSING MODULE:', key);
    allModulesValid = false;
    continue;
  }
  const hasFormula = mod.secretFormula && mod.secretFormula.name && mod.secretFormula.concept && mod.secretFormula.steps && mod.secretFormula.steps.length > 0;
  const hasSummary = Array.isArray(mod.summaryPoints) && mod.summaryPoints.length >= 3;
  const qCount = mod.practiceQuestions ? mod.practiceQuestions.length : 0;
  console.log('Module:', mod.id, '(' + mod.emoji + ' ' + mod.title + ')');
  console.log('  - Subtitle length:', mod.subtitle ? mod.subtitle.length : 0);
  console.log('  - Secret Formula:', hasFormula ? mod.secretFormula.name : 'INVALID');
  console.log('  - Summary Sections:', hasSummary ? mod.summaryPoints.length : 'INVALID');
  console.log('  - Practice Questions (Set A):', qCount);
  if (!hasFormula || !hasSummary || qCount !== 10) allModulesValid = false;
}
console.log('All 8 Modules Valid:', allModulesValid);

console.log('\n=== 2. VERIFYING SET A (80 QUESTIONS) ===');
let setAIssues = [];
let setATotal = 0;
for (const key of moduleKeys) {
  const mod = thaiData[key];
  if (!mod || !mod.practiceQuestions) continue;
  mod.practiceQuestions.forEach((q, idx) => {
    setATotal++;
    const qNum = idx + 1;
    const errs = [];
    if (!q.id) errs.push('missing id');
    if (!q.question || q.question.trim().length < 5) errs.push('empty/short question');
    if (!Array.isArray(q.options) || q.options.length !== 4) errs.push('options length != 4');
    if (!q.options || !q.options.includes(q.correctAnswer)) errs.push('correctAnswer [' + q.correctAnswer + '] NOT in options!');
    if (!q.explanation || q.explanation.length < 20) errs.push('short explanation');
    if (!q.tip || q.tip.length < 5) errs.push('short tip');
    
    // Check diagnostic explanation
    const exp = q.explanation || '';
    const hasDiag = exp.includes('ผิดเพราะ') || exp.includes('ตัวเลือก') || exp.includes('Diagnostic');
    if (!hasDiag) errs.push('explanation lacks diagnostic breakdown of wrong choices');

    if (errs.length > 0) {
      setAIssues.push({ module: key, qIndex: qNum, id: q.id, errors: errs });
    }
  });
}
console.log('Set A Total Questions:', setATotal, '(Expected: 80)');
console.log('Set A Issues Count:', setAIssues.length);
if (setAIssues.length > 0) console.log(JSON.stringify(setAIssues, null, 2));

console.log('\n=== 3. VERIFYING SET B (80 QUESTIONS IN DYNAMIC POOL) ===');
let setBIssues = [];
let setBTotal = 0;
const thaiB = dynamicQuiz.thai || {};
for (const key of moduleKeys) {
  const sets = thaiB[key];
  if (!sets || !Array.isArray(sets) || sets.length === 0) {
    setBIssues.push({ module: key, error: 'missing question sets in dynamic pool' });
    continue;
  }
  const qList = sets[0];
  if (!Array.isArray(qList)) {
    setBIssues.push({ module: key, error: 'set 0 is not an array' });
    continue;
  }
  qList.forEach((q, idx) => {
    setBTotal++;
    const qNum = idx + 1;
    const errs = [];
    if (!q.id) errs.push('missing id');
    if (!q.question || q.question.trim().length < 5) errs.push('empty/short question');
    if (!Array.isArray(q.options) || q.options.length !== 4) errs.push('options length != 4');
    if (!q.options || !q.options.includes(q.correctAnswer)) errs.push('correctAnswer [' + q.correctAnswer + '] NOT in options!');
    if (!q.explanation || q.explanation.length < 20) errs.push('short explanation');
    if (!q.tip || q.tip.length < 5) errs.push('short tip');
    
    // Check diagnostic explanation
    const exp = q.explanation || '';
    const hasDiag = exp.includes('ผิดเพราะ') || exp.includes('ตัวเลือก') || exp.includes('Diagnostic');
    if (!hasDiag) errs.push('explanation lacks diagnostic breakdown of wrong choices');

    if (errs.length > 0) {
      setBIssues.push({ module: key, qIndex: qNum, id: q.id, errors: errs });
    }
  });
}
console.log('Set B Total Questions:', setBTotal, '(Expected: 80)');
console.log('Set B Issues Count:', setBIssues.length);
if (setBIssues.length > 0) console.log(JSON.stringify(setBIssues, null, 2));
