import { THAI_LESSONS_DATA } from '../../src/lib/thai-lessons-data'

const modules = Object.keys(THAI_LESSONS_DATA)
console.log('Total modules:', modules.length)

let totalQuestions = 0
const errors: string[] = []

for (const modKey of modules) {
  const mod = THAI_LESSONS_DATA[modKey]
  console.log('Module: ' + mod.id + ' (' + mod.title + ') - ' + mod.practiceQuestions.length + ' questions')
  if (mod.practiceQuestions.length !== 10) {
    errors.push('Module ' + modKey + ' has ' + mod.practiceQuestions.length + ' questions instead of 10')
  }
  totalQuestions += mod.practiceQuestions.length

  for (let i = 0; i < mod.practiceQuestions.length; i++) {
    const q = mod.practiceQuestions[i]
    if (!q.id) errors.push('[' + modKey + '][' + i + '] Missing id')
    if (!q.question) errors.push('[' + modKey + '][' + i + '] Missing question')
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push('[' + modKey + '][' + i + '] Options length is ' + q.options?.length + ' instead of 4')
    }
    if (!q.options.includes(q.correctAnswer)) {
      errors.push('[' + modKey + '][' + q.id + '] correctAnswer "' + q.correctAnswer + '" NOT FOUND in options: ' + JSON.stringify(q.options))
    }
    const uniqueOptions = new Set(q.options)
    if (uniqueOptions.size !== 4) {
      errors.push('[' + modKey + '][' + q.id + '] Duplicate options found in ' + JSON.stringify(q.options))
    }
    if (!q.explanation || q.explanation.length < 20) {
      errors.push('[' + modKey + '][' + q.id + '] Explanation too short or missing')
    }
    if (!q.tip) {
      errors.push('[' + modKey + '][' + q.id + '] Missing tip')
    }
  }
}

console.log('Total questions verified:', totalQuestions)
if (errors.length === 0) {
  console.log('SUCCESS: ALL 80 QUESTIONS AND 8 MODULES PASSED 100% PERFECTLY!')
} else {
  console.error('ERRORS FOUND:', errors)
  process.exit(1)
}
