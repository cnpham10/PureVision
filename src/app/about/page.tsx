import type { Metadata } from "next"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "About",
  description:
    "Placeholder about page. Company history and credentials have not been added.",
}

export default function AboutPage() {
  return (
    <PlaceholderPage
      title="About"
      description="The company introduction, qualifications, and service area will be added when they are supplied."
    />
  )
}
