import Link from "next/link"
import { site } from "@/content/site"
import { Container } from "@/components/layout/container"
import { cn } from "cn"

const footerLinks = [
  ...site.navigation,
  { label: "Contact", href: site.primaryCta.href },
] as const

/** Focus ring for links on the charcoal footer. */
const onDarkFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background"

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <Container className="pt-20 md:pt-28">
        {/* The name returns at full size as the close of every page. */}
        <p className="font-display text-[clamp(56px,13vw,176px)] leading-[0.9] tracking-[-0.04em]">
          {site.name}
        </p>

        <div className="mt-14 grid gap-12 pb-16 md:mt-20 md:grid-cols-12 md:pb-20">
          <p className="max-w-md text-base leading-relaxed text-background/80 md:col-span-5">
            {site.description}
          </p>

          <nav aria-label="Footer" className="md:col-span-2 md:col-start-7">
            <p className="text-sm text-background/60">Navigate</p>
            <ul className="mt-4 flex flex-col gap-1">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex min-h-11 items-center text-base hover:text-background/70",
                      onDarkFocus,
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-sm text-background/60">Contact</p>
            <ul className="mt-4 space-y-3 text-base">
              <li>
                <a
                  href="tel:+15614050305"
                  className={cn("hover:text-background/70", onDarkFocus)}
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className={cn("break-all hover:text-background/70", onDarkFocus)}
                >
                  {site.email}
                </a>
              </li>
              <li>{site.serviceArea}</li>
            </ul>
          </div>
        </div>
      </Container>

      {/* A raised step of the charcoal for the last row. */}
      <div className="bg-[color-mix(in_oklab,var(--foreground)_90%,var(--background))]">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-background/70">
            © {site.copyrightYear} {site.legalName}
          </p>
          <ul className="flex gap-6">
            {site.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex min-h-11 items-center text-sm text-background/70 hover:text-background",
                    onDarkFocus,
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  )
}
