"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { site } from "@/content/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { LogoMark } from "@/components/layout/logo-mark"
import { cn } from "cn"

const navEnter =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:[animation-duration:1.4s] motion-safe:fill-mode-both motion-safe:ease-in-out"

const navDelay = [
  "",
  "motion-safe:[--tw-animation-delay:120ms]",
  "motion-safe:[--tw-animation-delay:240ms]",
  "motion-safe:[--tw-animation-delay:360ms]",
]

/** Focus ring for links and buttons on the charcoal header. */
const onDarkFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background"

function isCurrent(pathname: string | null, href: string) {
  if (!pathname) {
    return false
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

function HeaderContents({ pathname }: { pathname: string | null }) {
  const menuKey = pathname ?? "pending"
  const [openKey, setOpenKey] = useState<string | null>(null)
  const open = openKey === menuKey

  useEffect(() => {
    if (!open) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenKey(null)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-40 bg-foreground text-background">
      <Container className="flex h-16 items-center justify-between gap-4 overflow-hidden min-[360px]:gap-6">
        <Link
          href="/"
          className={cn("inline-flex min-w-0 items-center gap-2.5", onDarkFocus)}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <LogoMark className="h-9 sm:h-10" />
          <span className="truncate font-display text-base leading-none tracking-[-0.02em] min-[360px]:text-[19px] sm:text-[22px]">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {site.navigation.map((item, index) => {
            const current = isCurrent(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center text-base transition-colors hover:text-background motion-reduce:transition-none",
                  navEnter,
                  navDelay[index],
                  onDarkFocus,
                  current
                    ? "text-background underline decoration-brand decoration-2 underline-offset-8"
                    : "text-background/70",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Link
          href={site.primaryCta.href}
          className={cn(
            buttonVariants(),
            "hidden focus-visible:outline-background active:scale-[0.98] lg:inline-flex",
          )}
        >
          {site.primaryCta.label}
        </Link>

        <Button
          type="button"
          variant="outline"
          className="border-background/45 text-background hover:border-background focus-visible:outline-background lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpenKey(open ? null : menuKey)}
        >
          {open ? "Close" : "Menu"}
        </Button>
      </Container>

      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="bg-[color-mix(in_oklab,var(--foreground)_90%,var(--background))] lg:hidden"
        >
          <Container className="flex flex-col py-3">
            {site.navigation.map((item) => {
              const current = isCurrent(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-12 items-center text-lg",
                    onDarkFocus,
                    current ? "text-background" : "text-background/70",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href={site.primaryCta.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-3 w-full focus-visible:outline-background",
              )}
            >
              {site.primaryCta.label}
            </Link>
          </Container>
        </nav>
      ) : null}
    </header>
  )
}

export function SiteHeader() {
  return <HeaderContents pathname={usePathname()} />
}

export function SiteHeaderFallback() {
  return <HeaderContents pathname={null} />
}
