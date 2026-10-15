import type { EstimatorIconName } from "./icons"

export type CardLayout = "text" | "descriptive" | "image" | "compact"

export type SelectionMode = "single" | "multiple"

export type SelectionIcon = EstimatorIconName

export type SelectionOption = {
  id: string
  title: string
  description?: string
  image?: {
    src?: string
    alt: string
  }
  icon?: SelectionIcon
  secondaryLabel?: string
  /** Display text only. Do not put a calculated price here. */
  priceLabel?: string
  detail?: string
  disabled?: boolean
}

export type ShowWhen = {
  questionId: string
  optionIds: string[]
}

export type EstimatorQuestion = {
  id: string
  title: string
  description?: string
  mode: SelectionMode
  layout: CardLayout
  required: boolean
  options: SelectionOption[]
  /** Shown only when one of optionIds is selected on questionId. */
  showWhen?: ShowWhen
}

export type EstimatorCategory = {
  slug: string
  title: string
  description: string
  /** Drawn on the service picker. */
  icon?: EstimatorIconName
  questions: EstimatorQuestion[]
}

export type Answers = Record<string, string[]>
