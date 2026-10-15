import type { EstimatorCategory } from "@/lib/estimator/types"

/**
 * Placeholder estimator copy. Replace titles, descriptions, and options
 * without changing the selection components. Do not add prices here.
 */
export const estimators: EstimatorCategory[] = [
  {
    slug: "category-a",
    title: "Placeholder category A",
    description: "Placeholder description. This is not a confirmed service.",
    questions: [
      {
        id: "choice",
        title: "Placeholder question",
        description: "Select one option to continue.",
        mode: "single",
        layout: "text",
        required: true,
        options: [
          { id: "a", title: "Option A" },
          { id: "b", title: "Option B" },
          { id: "c", title: "Option C" },
          { id: "d", title: "Option D", disabled: true },
        ],
      },
      {
        id: "follow-up",
        title: "Placeholder follow-up",
        description: "This step appears only after Option A.",
        mode: "single",
        layout: "descriptive",
        required: true,
        showWhen: { questionId: "choice", optionIds: ["a"] },
        options: [
          {
            id: "detail-1",
            title: "Placeholder title",
            description: "Placeholder description for a longer card.",
          },
          {
            id: "detail-2",
            title: "Placeholder title",
            description: "Another placeholder description.",
            detail: "Placeholder detail",
          },
        ],
      },
      {
        id: "size",
        title: "Placeholder short choices",
        description: "Choose one option.",
        mode: "single",
        layout: "compact",
        required: true,
        options: [
          { id: "one", title: "Choice 1" },
          { id: "two", title: "Choice 2" },
          { id: "three", title: "Choice 3" },
          { id: "four", title: "Choice 4" },
        ],
      },
      {
        id: "additions",
        title: "Placeholder additions",
        description: "Select any that apply. This step is optional.",
        mode: "multiple",
        layout: "image",
        required: false,
        options: [
          {
            id: "item-1",
            title: "Placeholder item",
            description: "Placeholder description.",
            image: { alt: "Image placeholder" },
          },
          {
            id: "item-2",
            title: "Placeholder item",
            description: "Placeholder description.",
            image: { alt: "Image placeholder" },
          },
        ],
      },
    ],
  },
  {
    slug: "category-b",
    title: "Placeholder category B",
    description: "Placeholder description. This is not a confirmed service.",
    questions: [
      {
        id: "path",
        title: "Placeholder question",
        description: "Select one option to continue.",
        mode: "single",
        layout: "descriptive",
        required: true,
        options: [
          {
            id: "path-1",
            title: "Placeholder title",
            description: "Placeholder description.",
          },
          {
            id: "path-2",
            title: "Placeholder title",
            description: "Placeholder description.",
          },
        ],
      },
      {
        id: "items",
        title: "Placeholder selections",
        description: "Select at least one option.",
        mode: "multiple",
        layout: "compact",
        required: true,
        options: [
          { id: "item-a", title: "Item A" },
          { id: "item-b", title: "Item B" },
          { id: "item-c", title: "Item C" },
        ],
      },
    ],
  },
]

export function getEstimator(slug: string) {
  return estimators.find((category) => category.slug === slug)
}
