import type { Metadata } from "next"
import Link from "next/link"
import { estimators } from "@/content/estimators"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
  title: "Estimate",
  description:
    "Answer a few placeholder questions. A preliminary price range is not available until pricing rules are supplied.",
}

export default function EstimatePage() {
  return (
    <Container className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl leading-[1.1] md:text-6xl">
          Get an estimate for your next project.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Answer a few questions to receive a preliminary cost range. These
          categories are placeholders, not confirmed services.
        </p>
      </div>

      <ul className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
        {estimators.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/estimate/${category.slug}`}
              className="flex h-full min-h-44 flex-col border border-border p-6 transition-colors duration-200 hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"
            >
              <span className="font-display text-3xl leading-tight">
                {category.title}
              </span>
              <span className="mt-3 text-base leading-relaxed text-muted-foreground">
                {category.description}
              </span>
              <span className="mt-8 text-base">Start estimate</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-12 max-w-3xl text-base">
        <Link
          href="/contact"
          className="underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          Request a custom estimate
        </Link>
      </p>
    </Container>
  )
}
