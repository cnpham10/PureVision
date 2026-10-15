import { cn } from "cn"
import { SelectionCard } from "@/components/estimate/selection-card"
import type { EstimatorQuestion } from "@/lib/estimator/types"

const grids: Record<EstimatorQuestion["layout"], string> = {
  text: "grid-cols-1",
  descriptive: "grid-cols-1 sm:grid-cols-2",
  image: "grid-cols-1 sm:grid-cols-2",
  compact: "grid-cols-2 md:grid-cols-4",
}

export function SelectionGrid({
  question,
  selectedIds,
  onSelect,
}: {
  question: EstimatorQuestion
  selectedIds: string[]
  onSelect: (optionId: string) => void
}) {
  return (
    <div
      role={question.mode === "single" ? "radiogroup" : "group"}
      aria-labelledby={`${question.id}-title`}
      className={cn("grid gap-3", grids[question.layout])}
    >
      {question.options.map((option) => (
        <SelectionCard
          key={option.id}
          option={option}
          layout={question.layout}
          selected={selectedIds.includes(option.id)}
          control={question.mode === "single" ? "radio" : "toggle"}
          onSelect={() => onSelect(option.id)}
        />
      ))}
    </div>
  )
}
