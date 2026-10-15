import Link from "next/link"
import { site } from "@/content/site"
import { Container } from "@/components/layout/container"

const footerLinks = [
  ...site.navigation,
  { label: "Contact", href: site.primaryCta.href },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="font-display text-3xl leading-none">{site.name}</p>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
            {site.description}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="text-sm text-muted-foreground">Navigate</p>
          <ul className="mt-4 flex flex-col gap-1">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-base hover:text-muted-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="text-sm text-muted-foreground">Contact</p>
          <ul className="mt-4 space-y-3 text-base">
            <li>{site.phone}</li>
            <li>{site.email}</li>
            <li>{site.serviceArea}</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Placeholder contact details. Not a working phone number or email address.
          </p>
        </div>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {site.copyrightYear} {site.name}
        </p>
        <ul className="flex gap-6">
          {site.legal.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}
