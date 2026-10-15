import type { Metadata } from "next"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Placeholder project gallery. No completed projects are shown yet.",
}

export default function ProjectsPage() {
  return (
    <PlaceholderPage
      title="Projects"
      description="Project photography and descriptions will be added here. No completed projects are shown yet."
    />
  )
}
