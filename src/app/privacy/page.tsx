import type { Metadata } from "next"
import Link from "next/link"
import { site } from "@/content/site"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Purevision collects and uses estimate requests, contact details, and project photos.",
}

export default function PrivacyPage() {
  return (
    <Container className="py-20 md:py-28">
      <PageHeader
        title="Privacy"
        description="This page explains what Purevision collects when you use the site, and how to reach us about that information."
      />

      <div className="mt-14 max-w-3xl space-y-10 text-base leading-relaxed">
        <p className="text-sm text-muted-foreground">Updated October 15, 2026</p>

        <section className="space-y-3">
          <h2 className="text-3xl leading-tight">Who we are</h2>
          <p>
            {site.name} remodels bathrooms and kitchens and installs related finishes in{" "}
            {site.serviceArea}. You can reach us at{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>{" "}
            or {site.phone}.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl leading-tight">What we collect</h2>
          <p>
            The estimate form asks for your name, email, phone number, the service you are
            interested in, and a description of the project. You can also add up to four photos.
            Those photos are stored with the request.
          </p>
          <p>
            The estimator on this site keeps your answers in the browser while you move through
            the questions. Those answers are not sent to us unless you later describe the project
            on the estimate form.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl leading-tight">How we use it</h2>
          <p>
            We use the form to reply about the work you described, to prepare for a conversation
            about the project, and to keep a record of the request. We do not sell your name,
            contact details, or photos.
          </p>
          <p>
            Form submissions, including photos, are received through Netlify, which hosts this
            site. Netlify stores the submission so we can read it. The host may also keep
            ordinary server logs, such as the address of the device that loaded a page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl leading-tight">How long we keep it</h2>
          <p>
            We keep an estimate request for as long as we need it to respond and to keep a record
            of the inquiry. Email {site.email} if you want us to delete a request you sent,
            including any photos that came with it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl leading-tight">Your choices</h2>
          <p>
            You can use the site without sending the form. If you do send it, include only photos
            you are allowed to share. The site is meant for adults requesting work on a property.
          </p>
          <p>
            Questions about this page can be sent to {site.email}. The{" "}
            <Link href="/terms" className="underline underline-offset-4">
              terms
            </Link>{" "}
            explain how estimate requests and the online questions should be read.
          </p>
        </section>
      </div>
    </Container>
  )
}
