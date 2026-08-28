import { THAI_LESSONS_DATA } from '../../../src/lib/thai-lessons-data';
import { DYNAMIC_QUESTION_POOL } from '../../../src/lib/dynamic-quiz-pool';
import * as fs from 'fs';

const out: any = {
  summary: {},
  modulesA: [],
  modulesB: [],
  allQuestionsA: [],
  allQuestionsB: []
};

const modKeys = Object.keys(THAI_LESSONS_DATA);
out.summary.moduleCountA = modKeys.length;
out.summary.moduleKeysA = modKeys;

for (const key of modKeys) {
  const m = (THAI_LESSONS_DATA as any)[key];
  const pQuestions = m.practiceQuestions || m.quiz || [];
  out.modulesA.push({
    key,
    id: m.id,
    title: m.title,
    subtitle: m.subtitle,
    secretFormula: m.secretFormula,
    summaryPoints: m.summaryPoints,
    quizCount: pQuestions.length
  });

  pQuestions.forEach((q: any, idx: number) => {
    out.allQuestionsA.push({
      moduleKey: key,
      moduleId: m.id,
      index: idx + 1,
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      tip: q.tip
    });
  });
}

const thaiPool = DYNAMIC_QUESTION_POOL.thai || {};
const poolKeys = Object.keys(thaiPool);
out.summary.moduleCountB = poolKeys.length;
out.summary.moduleKeysB = poolKeys;

for (const key of poolKeys) {
  const qSets = thaiPool[key];
  const qList = (qSets && qSets[0]) ? qSets[0] : (Array.isArray(qSets) ? qSets : []);
  out.modulesB.push({
    key,
    quizCount: qList.length
  });

  qList.forEach((q: any, idx: number) => {
    out.allQuestionsB.push({
      moduleKey: key,
      index: idx + 1,
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      tip: q.tip
    });
  });
}

fs.writeFileSync('.agents/challenger_thai_academic/extracted_thai_data.json', JSON.stringify(out, null, 2), 'utf8');
console.log('Successfully extracted Thai data:');
console.log('Set A Total Questions:', out.allQuestionsA.length);
console.log('Set B Total Questions:', out.allQuestionsB.length);
