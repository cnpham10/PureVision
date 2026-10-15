import Link from "next/link"
import { notFound } from "next/navigation"
import { Container } from "@/components/layout/container"
import "./mockups.css"

/**
 * Design mockups for review on a local machine only.
 * A production build answers every /mockups address with the 404 page,
 * so the company photos used here never go live.
 */
export default function MockupsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.NODE_ENV === "production") {
    notFound()
  }

  return (
    <>
      {/*
        The site's shared font link asks Fontshare for Switzer and Boska together, and Fontshare
        answers with Switzer only, so headings fall back to Georgia. Loading Boska on its own here
        lets the mockups show the intended headings. The shared link needs the same fix.
      */}
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f%5B%5D=boska@500&display=swap"
        precedence="default"
      />
      {children}
      <div className="bg-subtle">
        <Container className="flex flex-wrap items-center gap-x-6 gap-y-1 py-3 text-[15px]">
          <span className="text-muted-foreground">Projects page mockups, local only:</span>
          <Link href="/mockups/projects/a2" className="hover:text-muted-foreground">
            A2. Rooms in order (new)
          </Link>
          <Link href="/mockups/projects/a" className="hover:text-muted-foreground">
            A. The place carries it
          </Link>
          <Link href="/mockups/projects/c" className="hover:text-muted-foreground">
            C. The split stage
          </Link>
        </Container>
      </div>
    </>
  )
}
