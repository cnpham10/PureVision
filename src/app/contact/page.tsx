import type { Metadata } from "next"
import { FormControlPreview } from "@/components/forms/form-control-preview"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a detailed estimate. Share the project details and photos, and the request is saved as a lead.",
}

export default function ContactPage() {
  return (
    <PlaceholderPage
      eyebrow={false}
      title="Request a detailed estimate"
      description="Share the project details and any photos. Submitting this form creates an estimate request."
    >
      <FormControlPreview />
    </PlaceholderPage>
  )
}
