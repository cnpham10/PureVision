import type { Metadata } from "next"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Estimator",
  description:
    "Placeholder estimator. Pricing rules have not been supplied, so no price is calculated.",
}

export default function EstimatePage() {
  return (
    <PlaceholderPage
      title="Estimator"
      description="The estimator will collect project details and calculate a preliminary range after pricing rules are supplied. It does not produce a price yet."
    />
  )
}
