import type { Metadata } from "next"
import { site } from "@/content/site"
import { SplitStage } from "./split-stage"

export const metadata: Metadata = {
  title: "Projects mockup C",
}

export default function ProjectsMockupC() {
  return (
    <div className="mk">
      <SplitStage siteName={site.name} />
    </div>
  )
}
