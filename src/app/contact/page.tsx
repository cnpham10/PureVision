import type { Metadata } from "next"
import { FormControlPreview } from "@/components/forms/form-control-preview"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Placeholder contact page. The estimate request form is not connected yet.",
}

export default function ContactPage() {
  return (
    <PlaceholderPage
      title="Request an estimate"
      description="The lead form will live here. The fields below are a visual preview and do not submit anything."
    >
      <FormControlPreview />
    </PlaceholderPage>
  )
}
