import type { Metadata } from "next"
import { PlaceholderPage } from "@/components/layout/placeholder-page"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Placeholder services overview. Confirmed offerings have not been added.",
}

export default function ServicesPage() {
  return (
    <PlaceholderPage
      title="Services"
      description="Service pages will be added from one content list. No offerings are confirmed yet."
    />
  )
}
