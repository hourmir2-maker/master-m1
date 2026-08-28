import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const projectRoot = 'C:/Users/bkky9/master-m1';

function loadTsModule(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true
    }
  });

  const exports = {};
  const module = { exports };
  
  const customRequire = (importPath) => {
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      const resolved = path.resolve(path.dirname(filePath), importPath);
      for (const ext of ['.ts', '.js', '/index.ts', '/index.js']) {
        if (fs.existsSync(resolved + ext)) {
          return loadTsModule(resolved + ext);
        }
      }
    }
    return {};
  };

  const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', result.outputText);
  fn(exports, customRequire, module, filePath, path.dirname(filePath));
  return module.exports;
}

const thaiLessons = loadTsModule(path.join(projectRoot, 'src/lib/thai-lessons-data.ts'));
const quizPool = loadTsModule(path.join(projectRoot, 'src/lib/dynamic-quiz-pool.ts'));
const kb = loadTsModule(path.join(projectRoot, 'src/lib/curriculum-knowledge-base.ts'));

const thaiLessonsData = thaiLessons.THAI_LESSONS_DATA || {};
const thaiDynamicPool = quizPool.DYNAMIC_QUESTION_POOL?.thai || {};
const thaiKB = kb.CURRICULUM_KNOWLEDGE_BASE?.thai || {};

const auditReport = {
  setA: { moduleCount: 0, questionCount: 0, modules: {} },
  setB: { moduleCount: 0, questionCount: 0, modules: {} },
  kb: { moduleCount: 0, modules: {} },
  errors: [],
  warnings: []
};

const allQuestionIds = new Set();
const allQuestionTexts = new Set();

// 1. Audit Set A
console.log('Auditing Set A (THAI_LESSONS_DATA)...');
const setAModuleKeys = Object.keys(thaiLessonsData);
auditReport.setA.moduleCount = setAModuleKeys.length;

for (const modKey of setAModuleKeys) {
  const mod = thaiLessonsData[modKey];
  const qList = mod.practiceQuestions || [];
  auditReport.setA.modules[modKey] = {
    title: mod.title,
    questionCount: qList.length,
    secretFormulaSteps: mod.secretFormula?.steps?.length || 0,
    summaryPoints: mod.summaryPoints?.length || 0
  };
  auditReport.setA.questionCount += qList.length;

  if (qList.length !== 10) {
    auditReport.errors.push(`[Set A] Module ${modKey} has ${qList.length} questions (expected 10)`);
  }

  qList.forEach((q, idx) => {
    if (!q.id) auditReport.errors.push(`[Set A] Module ${modKey} Q${idx+1} missing id`);
    if (allQuestionIds.has(q.id)) auditReport.errors.push(`[Set A] Duplicate question ID: ${q.id}`);
    allQuestionIds.add(q.id);

    if (!q.question || q.question.trim().length < 10) {
      auditReport.errors.push(`[Set A] Module ${modKey} Q${idx+1} (${q.id}) question text too short`);
    }
    allQuestionTexts.add(q.question.trim());

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      auditReport.errors.push(`[Set A] Module ${modKey} Q${idx+1} (${q.id}) options count != 4`);
    } else {
      const distinctOpts = new Set(q.options);
      if (distinctOpts.size !== 4) {
        auditReport.errors.push(`[Set A] Module ${modKey} Q${idx+1} (${q.id}) has duplicate options`);
      }
      if (!q.options.includes(q.correctAnswer)) {
        auditReport.errors.push(`[Set A] Module ${modKey} Q${idx+1} (${q.id}) correctAnswer not in options`);
      }
    }

    if (!q.explanation || q.explanation.trim().length < 20) {
      auditReport.errors.push(`[Set A] Module ${modKey} Q${idx+1} (${q.id}) explanation missing or too short`);
    }
  });
}

// 2. Audit Set B
console.log('Auditing Set B (DYNAMIC_QUESTION_POOL.thai)...');
const setBModuleKeys = Object.keys(thaiDynamicPool);
auditReport.setB.moduleCount = setBModuleKeys.length;

for (const modKey of setBModuleKeys) {
  const sets = thaiDynamicPool[modKey] || [];
  const qList = (Array.isArray(sets[0])) ? sets[0] : sets;
  auditReport.setB.modules[modKey] = {
    questionCount: qList.length
  };
  auditReport.setB.questionCount += qList.length;

  if (qList.length !== 10) {
    auditReport.errors.push(`[Set B] Module ${modKey} has ${qList.length} questions (expected 10)`);
  }

  qList.forEach((q, idx) => {
    if (!q.id) auditReport.errors.push(`[Set B] Module ${modKey} Q${idx+1} missing id`);
    if (allQuestionIds.has(q.id)) auditReport.errors.push(`[Set B] Duplicate question ID across pool: ${q.id}`);
    allQuestionIds.add(q.id);

    if (!q.question || q.question.trim().length < 10) {
      auditReport.errors.push(`[Set B] Module ${modKey} Q${idx+1} (${q.id}) question text too short`);
    }

    if (allQuestionTexts.has(q.question.trim())) {
      auditReport.warnings.push(`[Set B] Module ${modKey} Q${idx+1} (${q.id}) has exact duplicate text with Set A!`);
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      auditReport.errors.push(`[Set B] Module ${modKey} Q${idx+1} (${q.id}) options count != 4`);
    } else {
      const distinctOpts = new Set(q.options);
      if (distinctOpts.size !== 4) {
        auditReport.errors.push(`[Set B] Module ${modKey} Q${idx+1} (${q.id}) has duplicate options`);
      }
      if (!q.options.includes(q.correctAnswer)) {
        auditReport.errors.push(`[Set B] Module ${modKey} Q${idx+1} (${q.id}) correctAnswer not in options`);
      }
    }

    if (!q.explanation || q.explanation.trim().length < 20) {
      auditReport.errors.push(`[Set B] Module ${modKey} Q${idx+1} (${q.id}) explanation missing or too short`);
    }
  });
}

// 3. Audit KB
console.log('Auditing CURRICULUM_KNOWLEDGE_BASE.thai...');
const kbModuleKeys = Object.keys(thaiKB);
auditReport.kb.moduleCount = kbModuleKeys.length;
for (const modKey of kbModuleKeys) {
  const item = thaiKB[modKey];
  auditReport.kb.modules[modKey] = {
    title: item.title,
    obecIndicator: item.obecIndicator,
    speedHacksCount: item.speedHacks?.length || 0,
    trapAlertsCount: item.commonTrapAlerts?.length || 0
  };
  if (!item.obecIndicator || item.obecIndicator.length < 5) {
    auditReport.errors.push(`[KB] Module ${modKey} missing valid obecIndicator`);
  }
}

// 4. Facade / Placeholder Check across raw files
console.log('Scanning for placeholder tokens...');
const rawFiles = [
  'src/lib/thai-lessons-data.ts',
  'src/lib/dynamic-quiz-pool.ts',
  'src/lib/curriculum-knowledge-base.ts',
  'src/app/subjects/thai/page.tsx',
  'src/app/api/telegram/webhook/route.ts'
];

const suspiciousTokens = ['TODO', 'FIXME', 'LOREM IPSUM', 'DUMMY_DATA', 'PLACEHOLDER_TEXT', 'MOCK_DATA'];
for (const rf of rawFiles) {
  const content = fs.readFileSync(path.join(projectRoot, rf), 'utf8');
  for (const token of suspiciousTokens) {
    if (content.toUpperCase().includes(token)) {
      auditReport.warnings.push(`File ${rf} contains token "${token}"`);
    }
  }
}

console.log('\n=== AUDIT SUMMARY ===');
console.log(`Set A: ${auditReport.setA.moduleCount} modules, ${auditReport.setA.questionCount} questions`);
console.log(`Set B: ${auditReport.setB.moduleCount} modules, ${auditReport.setB.questionCount} questions`);
console.log(`Total Thai Questions: ${auditReport.setA.questionCount + auditReport.setB.questionCount}`);
console.log(`KB Thai Modules: ${auditReport.kb.moduleCount} modules`);
console.log(`Total Unique Question IDs: ${allQuestionIds.size}`);
console.log(`Errors found: ${auditReport.errors.length}`);
console.log(`Warnings found: ${auditReport.warnings.length}`);

if (auditReport.errors.length > 0) {
  console.log('\nERRORS:');
  auditReport.errors.forEach(e => console.log('  ❌ ' + e));
}
if (auditReport.warnings.length > 0) {
  console.log('\nWARNINGS:');
  auditReport.warnings.forEach(w => console.log('  ⚠️ ' + w));
}

fs.writeFileSync(
  path.join(projectRoot, '.agents/auditor_victory_1/audit_results.json'),
  JSON.stringify(auditReport, null, 2),
  'utf8'
);
