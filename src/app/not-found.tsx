import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { cn } from "cn"

export const metadata: Metadata = {
  title: "Page not found",
  description: "This address is not part of the site.",
}

export default function NotFound() {
  return (
    <Container className="py-20 md:py-28">
      <PageHeader
        eyebrow="404"
        title="Page not found"
        description="This address is not part of the site."
      />
      <Link href="/" className={cn(buttonVariants(), "mt-10 inline-flex")}>
        Back to home
      </Link>
    </Container>
  )
}
