import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
  title: "Projects page mockups",
}

const options = [
  {
    href: "/mockups/projects/a2",
    name: "A2. Rooms in order",
    idea: "Option A reworked: the same opening photo, then every room on a steady grid, filtered by service. Each room changes from before to after by itself as you scroll.",
  },
  {
    href: "/mockups/projects/a",
    name: "A. The place carries it",
    idea: "One finished room fills the screen. Each room after it gets its own size and side, and you drag across it to see what was there.",
  },
  {
    href: "/mockups/projects/c",
    name: "C. The split stage",
    idea: "The finished room stays fixed on one half while the other half reads like a job file. Press and hold the photo to see the room before.",
  },
]

export default function ProjectsMockups() {
  return (
    <Container className="mk py-20 md:py-28">
      <h1 className="mk-heading max-w-[20ch]">Ideas for the projects page</h1>
      <p className="mk-body mt-5 max-w-[56ch]">
        Mockups for review on this machine only. They use the company photos, so a production build
        hides them. Captions describe what the photos show; city, time and budget are placeholders.
      </p>
      <ul className="mt-14 flex flex-col gap-10">
        {options.map((option) => (
          <li key={option.href} className="max-w-[60ch]">
            <Link href={option.href} className="mk-statement underline decoration-border underline-offset-4 hover:decoration-foreground">
              {option.name}
            </Link>
            <p className="mk-body mt-2">{option.idea}</p>
          </li>
        ))}
      </ul>
    </Container>
  )
}
