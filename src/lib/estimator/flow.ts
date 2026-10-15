import type {
  Answers,
  EstimatorCategory,
  EstimatorQuestion,
} from "./types"

/**
 * Answers live in component state for the current visit.
 * They are not written to browser storage, and this module does not calculate prices.
 */

export function isQuestionVisible(
  question: EstimatorQuestion,
  answers: Answers,
): boolean {
  if (!question.showWhen) {
    return true
  }

  const selected = answers[question.showWhen.questionId] ?? []
  return question.showWhen.optionIds.some((optionId) =>
    selected.includes(optionId),
  )
}

export function sanitizeAnswers(
  category: EstimatorCategory,
  answers: Answers,
): Answers {
  const next: Answers = {}

  for (const question of category.questions) {
    if (!isQuestionVisible(question, next)) {
      continue
    }

    const allowed = new Set(
      question.options.filter((option) => !option.disabled).map((option) => option.id),
    )
    const selected = (answers[question.id] ?? []).filter((optionId) =>
      allowed.has(optionId),
    )

    if (selected.length === 0) {
      continue
    }

    next[question.id] =
      question.mode === "single" ? [selected[0]] : selected
  }

  return next
}

export function visibleQuestions(
  category: EstimatorCategory,
  answers: Answers,
): EstimatorQuestion[] {
  const clean = sanitizeAnswers(category, answers)
  return category.questions.filter((question) =>
    isQuestionVisible(question, clean),
  )
}

export function toggleOption(
  category: EstimatorCategory,
  answers: Answers,
  questionId: string,
  optionId: string,
): Answers {
  const clean = sanitizeAnswers(category, answers)
  const question = category.questions.find((item) => item.id === questionId)

  if (!question || !isQuestionVisible(question, clean)) {
    return clean
  }

  const option = question.options.find((item) => item.id === optionId)
  if (!option || option.disabled) {
    return clean
  }

  const current = clean[questionId] ?? []
  const nextSelected =
    question.mode === "single"
      ? [optionId]
      : current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]

  return sanitizeAnswers(category, {
    ...clean,
    [questionId]: nextSelected,
  })
}

export function canContinue(
  question: EstimatorQuestion,
  answers: Answers,
): boolean {
  if (!question.required) {
    return true
  }

  return (answers[question.id] ?? []).length > 0
}

export function selectedLabels(
  question: EstimatorQuestion,
  answers: Answers,
): string[] {
  const selected = new Set(answers[question.id] ?? [])
  return question.options
    .filter((option) => selected.has(option.id))
    .map((option) => option.title)
}
