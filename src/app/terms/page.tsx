import type { Metadata } from "next"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Terms",
  description: "Placeholder terms page. This is not a legal agreement.",
}

export default function TermsPage() {
  return (
    <PlaceholderPage
      title="Terms"
      description="Terms will be added before launch if the business requires them. This page is not a legal agreement."
    />
  )
}
