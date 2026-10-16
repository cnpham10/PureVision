import type { Metadata } from "next"
import { site } from "@/content/site"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"

const values = ["Trust", "Loyalty", "Integrity", "Quality craftsmanship"]

export const metadata: Metadata = {
  title: "About",
  description:
    "Purevision Contractors remodels bathrooms and kitchens in Delray Beach. The craft has been passed down through generations and is guided by trust, loyalty, integrity, and quality craftsmanship.",
}

export default function AboutPage() {
  return (
    <Container className="py-20 md:py-28">
      <PageHeader
        title="About"
        description="The craft at Purevision Contractors has been passed from one generation to the next. We still measure every room by trust, loyalty, integrity, and the quality of the work."
      />

      <div className="mt-14 max-w-3xl space-y-12 text-base leading-relaxed">
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          We remodel bathrooms and kitchens in {site.serviceArea}. The standard
          does not change with the size of the job: the room should be built
          carefully, and it should be the room you asked for.
        </p>

        <section>
          <h2 className="text-3xl leading-tight">What we stand by</h2>
          <ul className="mt-6 max-w-xl divide-y divide-border border-y border-border">
            {values.map((value) => (
              <li key={value} className="py-4 text-lg">
                {value}
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-2xl space-y-4">
          <h2 className="text-3xl leading-tight">Call today</h2>
          <p className="text-muted-foreground">
            Tell us the room you have in mind. We will help turn that vision
            into a finished space.
          </p>
          <p>
            <a
              href="tel:+15614050305"
              className="text-lg underline underline-offset-4 hover:text-muted-foreground"
            >
              {site.phone}
            </a>
          </p>
        </section>
      </div>
    </Container>
  )
}
