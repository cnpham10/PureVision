"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { cn } from "cn"
import { buttonVariants } from "@/components/ui/button"
import { pairs, unknown } from "../data"

/**
 * Half the screen holds the finished room and never scrolls; the other half reads like a job file.
 * The fixed photo follows the project being read, and pressing and holding shows the room before.
 */
export function SplitStage({ siteName }: { siteName: string }) {
  const [active, setActive] = useState(0)
  const [holding, setHolding] = useState(false)
  const chapters = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index))
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    chapters.current.forEach((chapter) => chapter && observer.observe(chapter))
    return () => observer.disconnect()
  }, [])

  const project = pairs[active]
  const hold = {
    onPointerDown: () => setHolding(true),
    onPointerUp: () => setHolding(false),
    onPointerLeave: () => setHolding(false),
    onPointerCancel: () => setHolding(false),
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault()
        setHolding(true)
      }
    },
    onKeyUp: () => setHolding(false),
    onBlur: () => setHolding(false),
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* The fixed half. */}
      <div className="sticky top-[var(--mk-header)] z-0 h-[42svh] md:order-last md:h-[calc(100svh-var(--mk-header))]">
        <div className="relative h-full overflow-hidden bg-subtle">
          {pairs.map((item, index) => (
            <div key={item.slug} aria-hidden={index !== active}>
              {(["after", "before"] as const).map((side) => (
                <Image
                  key={side}
                  src={item[side].image}
                  alt={item[side].alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  preload={index === 0 && side === "after"}
                  className="object-cover transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none"
                  style={{
                    opacity: index === active && (side === "before") === holding ? 1 : 0,
                    transitionDuration: side === "before" ? "200ms" : undefined,
                  }}
                />
              ))}
            </div>
          ))}

          <button
            type="button"
            {...hold}
            aria-pressed={holding}
            className="mk-press absolute bottom-[68px] left-3 min-h-11 bg-foreground px-4 text-[15px] text-background select-none [-webkit-touch-callout:none] hover:bg-foreground/85"
          >
            {holding ? "Showing before" : "Hold to see before"}
          </button>

          <p className="mk-small absolute inset-x-0 bottom-0 flex h-14 items-center justify-between bg-background px-4">
            <span>
              {project.title}, {holding ? "before" : "after"}
            </span>
            <span className="text-muted-foreground">{unknown.city}</span>
          </p>
        </div>
      </div>

      {/* The reading half. */}
      <div className="relative z-10 bg-background px-5 sm:px-8 md:px-16">
        <section className="flex flex-col items-center py-8 text-center md:min-h-[calc(100svh-var(--mk-header))] md:justify-center md:py-16">
          <h1 className="max-w-[16ch] text-[clamp(40px,3.8vw,60px)] leading-[1.02] tracking-[-0.03em]">
            See the work, room by room
          </h1>
          <p className="mk-body mt-5 max-w-[40ch]">
            Each job {siteName} finished, with what changed in the room. Press and hold the photo
            to see the room as it was.
          </p>
          <Link href="/estimate" className={cn(buttonVariants({ size: "lg" }), "mk-press mt-8")}>
            Estimate your project
          </Link>
        </section>

        {pairs.map((item, index) => (
          <article
            key={item.slug}
            ref={(node) => {
              chapters.current[index] = node
            }}
            data-index={index}
            className="flex min-h-[80svh] max-w-[46ch] flex-col justify-center py-16"
            aria-labelledby={`${item.slug}-title`}
          >
            <h2 id={`${item.slug}-title`} className="mk-heading" data-rise>
              {item.title}
            </h2>
            <p className="mk-body mt-5" data-rise style={{ "--i": 1 } as React.CSSProperties}>
              {item.changed}
            </p>
            <dl className="mk-body mt-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-2" data-rise style={{ "--i": 2 } as React.CSSProperties}>
              <dt className="text-muted-foreground">Room</dt>
              <dd>{item.room}</dd>
              <dt className="text-muted-foreground">City</dt>
              <dd>{unknown.city}</dd>
              <dt className="text-muted-foreground">Time on site</dt>
              <dd>{unknown.time}</dd>
              <dt className="text-muted-foreground">Budget</dt>
              <dd>{unknown.budget}</dd>
            </dl>
            <Link
              href="/estimate"
              className="mk-body mt-8 self-start underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              Estimate a {item.room.toLowerCase()} like this
            </Link>
          </article>
        ))}

        <section className="py-[14vh]" aria-labelledby="ledger-heading">
          <h2 id="ledger-heading" className="text-[28px] leading-[1.1]" data-rise>
            All projects
          </h2>
          <ul className="mt-8 max-w-[560px]">
            {pairs.map((item, index) => (
              <li key={item.slug}>
                <a
                  href={`#${item.slug}-title`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={cn(
                    "mk-body grid min-h-13 grid-cols-[1fr_auto] items-center gap-x-4 md:min-h-11 md:grid-cols-[1.2fr_1fr_auto]",
                    index === active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="text-foreground">{item.title}</span>
                  <span className="hidden text-[15px] md:block">{item.room}</span>
                  <span className="text-[15px] tabular-nums">{unknown.city}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="pb-[16vh]" aria-labelledby="close-heading-c">
          <h2 id="close-heading-c" className="mk-heading" data-rise>
            Start with a price
          </h2>
          <p className="mk-body mt-5 max-w-[40ch]" data-rise style={{ "--i": 1 } as React.CSSProperties}>
            Answer a few questions about your room and see a first price range before anyone
            visits.
          </p>
          <Link href="/estimate" className={cn(buttonVariants({ size: "lg" }), "mk-press mt-8")}>
            Get an estimate
          </Link>
        </section>
      </div>
    </div>
  )
}
