"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { site } from "@/content/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { cn } from "cn"

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
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="inline-flex min-w-0 items-center gap-2.5 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <img
            src="/logo.png"
            alt=""
            width={31}
            height={40}
            className="h-10 w-auto shrink-0"
          />
          <span className="truncate">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {site.navigation.map((item) => {
            const current = isCurrent(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center text-base transition-colors hover:text-foreground motion-reduce:transition-none",
                  current ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Link
          href={site.primaryCta.href}
          className={cn(buttonVariants(), "hidden lg:inline-flex")}
        >
          {site.primaryCta.label}
        </Link>

        <Button
          type="button"
          variant="outline"
          className="lg:hidden"
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
          className="border-t border-border lg:hidden"
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
                    current ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href={site.primaryCta.href}
              className={cn(buttonVariants({ size: "lg" }), "mt-3 w-full")}
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
