"use client"

import { useState } from "react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { SelectionGrid } from "@/components/estimate/selection-grid"
import { cn } from "cn"
import type { Answers, EstimatorCategory } from "@/lib/estimator/types"
import {
  canContinue,
  sanitizeAnswers,
  selectedLabels,
  toggleOption,
  visibleQuestions,
} from "@/lib/estimator/flow"

export function Estimator({ category }: { category: EstimatorCategory }) {
  const [answers, setAnswers] = useState<Answers>({})
  const [stepIndex, setStepIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const cleanAnswers = sanitizeAnswers(category, answers)
  const questions = visibleQuestions(category, cleanAnswers)
  const safeIndex = Math.min(stepIndex, Math.max(questions.length - 1, 0))
  const question = questions[safeIndex]

  function select(optionId: string) {
    if (!question) {
      return
    }

    setAnswers((current) =>
      toggleOption(category, current, question.id, optionId),
    )
  }

  function back() {
    setShowResult(false)
    setStepIndex((current) => Math.max(current - 1, 0))
  }

  function next() {
    if (!question || !canContinue(question, cleanAnswers)) {
      return
    }

    if (safeIndex >= questions.length - 1) {
      setShowResult(true)
      return
    }

    setStepIndex(safeIndex + 1)
  }

  if (showResult || !question) {
    return (
      <Result
        category={category}
        answers={cleanAnswers}
        onRevise={() => {
          setShowResult(false)
          setStepIndex(Math.max(questions.length - 1, 0))
        }}
      />
    )
  }

  const ready = canContinue(question, cleanAnswers)
  const stepNumber = safeIndex + 1

  return (
    <div className="mx-auto w-full max-w-3xl">
      <p className="sr-only" aria-live="polite">
        Step {stepNumber} of {questions.length}. {question.title}
      </p>
      <div
        className="mb-8"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={questions.length}
        aria-valuenow={stepNumber}
        aria-valuetext={`Step ${stepNumber} of ${questions.length}`}
      >
        <p className="text-sm text-muted-foreground">
          Step {stepNumber} of {questions.length}
        </p>
        <div className="mt-3 h-px bg-border">
          <div
            className="h-px bg-foreground motion-reduce:transition-none"
            style={{ width: `${(stepNumber / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h1 id={`${question.id}-title`} className="text-4xl leading-tight md:text-5xl">
        {question.title}
      </h1>
      {question.description ? (
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {question.description}
        </p>
      ) : null}

      <div className={cn("mt-10", question.layout === "image" && "sm:max-w-none")}>
        <SelectionGrid
          question={question}
          selectedIds={cleanAnswers[question.id] ?? []}
          onSelect={select}
        />
      </div>

      {question.required && !ready ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Select {question.mode === "single" ? "an option" : "at least one option"} to continue.
        </p>
      ) : null}

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {safeIndex === 0 ? (
          <Link
            href="/estimate"
            className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
          >
            Back
          </Link>
        ) : (
          <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={back}>
            Back
          </Button>
        )}
        <Button
          type="button"
          className="w-full sm:w-auto"
          disabled={!ready}
          onClick={next}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

function Result({
  category,
  answers,
  onRevise,
}: {
  category: EstimatorCategory
  answers: Answers
  onRevise: () => void
}) {
  const questions = visibleQuestions(category, answers)

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-4xl leading-tight md:text-5xl">Your selections</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
        A preliminary price range will appear here after pricing rules are
        supplied. This is not a quote.
      </p>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {questions.map((question) => {
          const labels = selectedLabels(question, answers)
          return (
            <li key={question.id} className="grid gap-1 py-4 sm:grid-cols-2">
              <p className="text-sm text-muted-foreground">{question.title}</p>
              <p>{labels.length > 0 ? labels.join(", ") : "No selection"}</p>
            </li>
          )
        })}
      </ul>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/contact"
          className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
        >
          Request a detailed estimate
        </Link>
        <Button type="button" variant="outline" size="lg" onClick={onRevise}>
          Revise selections
        </Button>
      </div>
    </div>
  )
}
