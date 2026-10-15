import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { estimators } from "../../src/content/estimators.ts"
import { estimatorIconNames } from "../../src/lib/estimator/icons.ts"

const allQuestions = estimators.flatMap((category) =>
  category.questions.map((question) => ({ category, question })),
)

describe("estimator content", () => {
  it("offers the bathroom and kitchen estimators only", () => {
    assert.deepEqual(
      estimators.map((category) => category.slug),
      ["bathroom", "kitchen"],
    )
  })

  it("starts every estimator with a required single-choice question", () => {
    for (const category of estimators) {
      const [first] = category.questions
      assert.ok(first, `${category.slug} has no questions`)
      assert.equal(first.mode, "single", `${category.slug} first question`)
      assert.equal(first.required, true, `${category.slug} first question`)
      assert.equal(first.showWhen, undefined, `${category.slug} first question`)
    }
  })

  it("keeps question ids unique within an estimator", () => {
    for (const category of estimators) {
      const ids = category.questions.map((question) => question.id)
      assert.equal(new Set(ids).size, ids.length, category.slug)
    }
  })

  it("keeps answer ids unique within a question", () => {
    for (const { category, question } of allQuestions) {
      const ids = question.options.map((option) => option.id)
      assert.equal(
        new Set(ids).size,
        ids.length,
        `${category.slug}/${question.id}`,
      )
    }
  })

  it("points every conditional question at an earlier question and real answers", () => {
    for (const category of estimators) {
      category.questions.forEach((question, index) => {
        if (!question.showWhen) {
          return
        }

        const where = `${category.slug}/${question.id}`
        const earlier = category.questions.slice(0, index)
        const source = earlier.find(
          (candidate) => candidate.id === question.showWhen?.questionId,
        )
        assert.ok(source, `${where} depends on a missing or later question`)

        for (const optionId of question.showWhen.optionIds) {
          assert.ok(
            source.options.some((option) => option.id === optionId),
            `${where} depends on unknown answer ${optionId}`,
          )
        }
      })
    }
  })

  it("contains no prices", () => {
    for (const category of estimators) {
      assert.doesNotMatch(
        `${category.title} ${category.description}`,
        /\$/,
        category.slug,
      )
    }

    for (const { category, question } of allQuestions) {
      assert.doesNotMatch(
        [question.title, question.description].filter(Boolean).join(" "),
        /\$/,
        `${category.slug}/${question.id}`,
      )

      for (const option of question.options) {
        const where = `${category.slug}/${question.id}/${option.id}`
        assert.equal(option.priceLabel, undefined, where)
        const text = [
          option.title,
          option.description,
          option.detail,
          option.secondaryLabel,
        ]
          .filter(Boolean)
          .join(" ")
        assert.doesNotMatch(text, /\$/, where)
      }
    }
  })

  it("uses only icons the estimator knows how to draw", () => {
    const known = new Set<string>(estimatorIconNames)

    for (const category of estimators) {
      assert.ok(category.icon, `${category.slug} has no icon`)
      assert.ok(known.has(category.icon), `${category.slug}: ${category.icon}`)
    }

    for (const { category, question } of allQuestions) {
      for (const option of question.options) {
        if (option.icon) {
          assert.ok(
            known.has(option.icon),
            `${category.slug}/${question.id}/${option.id}: ${option.icon}`,
          )
        }
      }
    }
  })
})
