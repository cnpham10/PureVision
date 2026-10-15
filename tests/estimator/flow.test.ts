import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  canContinue,
  sanitizeAnswers,
  toggleOption,
  visibleQuestions,
} from "../../src/lib/estimator/flow.ts"
import type { EstimatorCategory } from "../../src/lib/estimator/types.ts"

const category: EstimatorCategory = {
  slug: "fixture",
  title: "Fixture",
  description: "Fixture",
  questions: [
    {
      id: "choice",
      title: "Choice",
      mode: "single",
      layout: "text",
      required: true,
      options: [
        { id: "a", title: "Option A" },
        { id: "b", title: "Option B" },
        { id: "off", title: "Off", disabled: true },
      ],
    },
    {
      id: "follow-up",
      title: "Follow-up",
      mode: "single",
      layout: "descriptive",
      required: true,
      showWhen: { questionId: "choice", optionIds: ["a"] },
      options: [{ id: "detail", title: "Detail" }],
    },
    {
      id: "extras",
      title: "Extras",
      mode: "multiple",
      layout: "compact",
      required: false,
      options: [
        { id: "one", title: "One" },
        { id: "two", title: "Two" },
      ],
    },
  ],
}

describe("estimator flow", () => {
  it("replaces a single selection", () => {
    const first = toggleOption(category, {}, "choice", "a")
    const second = toggleOption(category, first, "choice", "b")
    assert.deepEqual(second.choice, ["b"])
  })

  it("toggles multi-select options independently", () => {
    const first = toggleOption(category, {}, "extras", "one")
    const both = toggleOption(category, first, "extras", "two")
    const remaining = toggleOption(category, both, "extras", "one")
    assert.deepEqual(both.extras, ["one", "two"])
    assert.deepEqual(remaining.extras, ["two"])
  })

  it("requires a selection only when the question says so", () => {
    const choice = category.questions[0]
    const extras = category.questions[2]
    assert.equal(canContinue(choice, {}), false)
    assert.equal(canContinue(choice, { choice: ["a"] }), true)
    assert.equal(canContinue(extras, {}), true)
  })

  it("hides the follow-up unless option A is selected", () => {
    const withA = toggleOption(category, {}, "choice", "a")
    const withB = toggleOption(category, withA, "choice", "b")
    assert.deepEqual(
      visibleQuestions(category, withA).map((question) => question.id),
      ["choice", "follow-up", "extras"],
    )
    assert.deepEqual(
      visibleQuestions(category, withB).map((question) => question.id),
      ["choice", "extras"],
    )
  })

  it("drops a follow-up answer that no longer applies", () => {
    const withFollowUp = toggleOption(
      category,
      toggleOption(category, {}, "choice", "a"),
      "follow-up",
      "detail",
    )
    const changed = toggleOption(category, withFollowUp, "choice", "b")
    assert.equal(changed["follow-up"], undefined)
    assert.deepEqual(sanitizeAnswers(category, withFollowUp)["follow-up"], [
      "detail",
    ])
  })

  it("ignores a disabled option and unknown ids", () => {
    assert.deepEqual(toggleOption(category, {}, "choice", "off"), {})
    assert.deepEqual(sanitizeAnswers(category, { choice: ["missing", "a"] }).choice, [
      "a",
    ])
  })
})
