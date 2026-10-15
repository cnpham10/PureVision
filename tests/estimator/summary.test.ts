import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { lengthLabel } from "../../src/lib/estimator/summary.ts"
import type {
  EstimatorCategory,
  EstimatorQuestion,
} from "../../src/lib/estimator/types.ts"

function question(
  id: string,
  showWhen?: EstimatorQuestion["showWhen"],
): EstimatorQuestion {
  return {
    id,
    title: id,
    mode: "single",
    layout: "compact",
    required: true,
    options: [{ id: "yes", title: "Yes" }],
    showWhen,
  }
}

function category(questions: EstimatorQuestion[]): EstimatorCategory {
  return {
    slug: "fixture",
    title: "Fixture",
    description: "Fixture",
    icon: "bathroom",
    questions,
  }
}

describe("estimator length label", () => {
  it("counts the questions and rounds the time up to whole minutes", () => {
    const seven = category(
      ["a", "b", "c", "d", "e", "f", "g"].map((id) => question(id)),
    )
    assert.equal(lengthLabel(seven), "7 questions · about 2 minutes")
  })

  it("gives a range when some questions depend on an answer", () => {
    const withFollowUp = category([
      question("a"),
      question("b"),
      question("c"),
      question("d", { questionId: "a", optionIds: ["yes"] }),
    ])
    assert.equal(lengthLabel(withFollowUp), "3 to 4 questions · about 1 minute")
  })

  it("never promises less than a minute", () => {
    assert.equal(
      lengthLabel(category([question("a")])),
      "1 question · about 1 minute",
    )
  })
})
