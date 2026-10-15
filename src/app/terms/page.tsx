import type { Metadata } from "next"
import Link from "next/link"
import { site } from "@/content/site"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = {
  title: "Terms",
  description:
    "How to use the Purevision site, what an estimate request means, and what the online questions do not promise.",
}

export default function TermsPage() {
  return (
    <Container className="py-20 md:py-28">
      <PageHeader
        title="Terms"
        description="These terms cover use of this website. A remodeling job is agreed only in a separate written estimate."
      />

      <div className="mt-14 max-w-3xl space-y-10 text-base leading-relaxed">
        <p className="text-sm text-muted-foreground">Updated October 15, 2026</p>

        <section className="space-y-3">
          <h2 className="text-3xl leading-tight">Using the site</h2>
          <p>
            This site describes remodeling and installation work from {site.name} in{" "}
            {site.serviceArea}. You may browse it and send an estimate request. Do not misuse the
            form, send someone else’s personal information, or upload photos you do not have the
            right to share.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl leading-tight">Estimate requests</h2>
          <p>
            Sending the form asks us to follow up. It does not book a job, reserve a date, or
            create a contract. We may decline a request or tell you the work is outside what we
            take on.
          </p>
          <p>
            A price, scope, and schedule are set only in a written estimate that both sides
            accept. Nothing on this website is that estimate.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl leading-tight">Online questions</h2>
          <p>
            The bathroom and kitchen questions help us understand the project. They do not
            calculate a price, and the answers are a draft of the conversation, not a promise
            about materials, timing, or how the work will be done. Finish choices such as
            standard tile, stone, and fixtures describe a direction. The materials for a job are
            confirmed in the written estimate.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl leading-tight">Site content</h2>
          <p>
            The text and layout of this site belong to {site.name}. Project photographs we
            publish belong to us or are used with permission. You may not copy them for your own
            business.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl leading-tight">Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>{" "}
            or {site.phone}. How we handle the details you send is described in the{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              privacy page
            </Link>
            .
          </p>
        </section>
      </div>
    </Container>
  )
}
