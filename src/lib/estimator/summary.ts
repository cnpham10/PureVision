import type { EstimatorCategory } from "./types"

/** A rough pace for tapping through one question, used only for the hint. */
const SECONDS_PER_QUESTION = 15

/**
 * "7 questions · about 2 minutes" for the service picker. Questions that
 * depend on an earlier answer widen the count to a range.
 */
export function lengthLabel(category: EstimatorCategory): string {
  const most = category.questions.length
  const fewest = category.questions.filter((question) => !question.showWhen).length
  const minutes = Math.max(1, Math.ceil((most * SECONDS_PER_QUESTION) / 60))

  const count = fewest === most ? `${most}` : `${fewest} to ${most}`
  const questions = most === 1 ? "question" : "questions"
  const time = minutes === 1 ? "about 1 minute" : `about ${minutes} minutes`

  return `${count} ${questions} · ${time}`
}
