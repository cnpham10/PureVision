"use client"

import { useEffect, useRef } from "react"
import { cn } from "cn"
import type { Project } from "@/content/projects"
import { BeforeAfterFrame } from "@/components/projects/before-after-frame"

/** Tall enough to show the whole photo below the 4rem header, with 24px above and below. */
const fitScreen = "max-h-[calc(100svh-4rem-48px)]"

/**
 * Where each room's sweep happens within the locked stretch of scrolling (0 to 1).
 * The start and end are held, so the before can be studied and the after is seen whole.
 * Two rooms go one after the other, left then right.
 */
export const segments: Record<number, [number, number][]> = {
  1: [[0.15, 0.85]],
  2: [[0.1, 0.45], [0.55, 0.9]],
}

export const clamp = (value: number) => Math.min(1, Math.max(0, value))

function Caption({ project }: { project: Project }) {
  return (
    <div className="mt-4">
      <h3 className="text-[clamp(22px,2vw,28px)] leading-[1.25]">{project.title}</h3>
      <p className="mt-3 max-w-[52ch] text-[17px] leading-[1.55]">{project.changed}</p>
    </div>
  )
}

/**
 * A row of one or two rooms. It scrolls normally until the whole photo is on screen,
 * then stays locked in place while further scrolling sweeps each room from before to
 * after, and lets go once every room in it is after. Scrolling back reverses it.
 *
 * The row's unclamped progress is kept in data-progress, so ProjectGrid can find the
 * reader's place again when the layout regroups (for example when a phone is turned).
 */
export function PinnedRow({ items, wide = false }: { items: Project[]; wide?: boolean }) {
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const spacer = useRef<HTMLDivElement>(null)
  const frames = useRef<(HTMLDivElement | null)[]>([])
  const key = items.map((item) => item.slug).join()
  const pair = items.length === 2

  useEffect(() => {
    let pending = 0
    const parts = segments[items.length] ?? segments[1]

    const update = () => {
      pending = 0
      if (!track.current || !stage.current || !spacer.current) return
      const lockedAt = parseFloat(getComputedStyle(stage.current).top) || 0
      const distance = spacer.current.offsetHeight || 1
      const raw = (lockedAt - track.current.getBoundingClientRect().top) / distance
      track.current.dataset.progress = String(raw)
      const progress = clamp(raw)

      frames.current.forEach((frame, index) => {
        if (!frame || !parts[index]) return
        const [start, end] = parts[index]
        const wipe = clamp((progress - start) / (end - start))
        frame.style.setProperty("--wipe", `${(wipe * 100).toFixed(2)}%`)
        frame.dataset.state = wipe === 0 ? "before" : wipe === 1 ? "after" : "moving"
      })
    }
    const schedule = () => {
      if (!pending) pending = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(pending)
    }
  }, [key, items.length, wide])

  const frameFor = (project: Project, index: number, className: string, sizes: string) => (
    <BeforeAfterFrame
      ref={(node) => {
        frames.current[index] = node
      }}
      before={project.before}
      after={project.after}
      sizes={sizes}
      className={cn("w-full", fitScreen, className)}
    />
  )

  return (
    <div ref={track} data-track className="relative">
      {/*
        Without script, a phone shows a pair as two stacked rooms; they scroll past
        normally instead of locking a stage taller than the screen.
      */}
      <div ref={stage} className={cn("sticky top-[calc(4rem+24px)]", pair && "max-md:noscript:static")}>
        {wide ? (
          <article data-slug={items[0].slug} aria-label={items[0].title} className="grid grid-cols-1 gap-x-6 md:grid-cols-12 md:items-end">
            {frameFor(items[0], 0, "aspect-[4/5] md:col-span-8 md:aspect-[4/3]", "(min-width: 768px) 67vw, 100vw")}
            <div className="md:col-span-4">
              <Caption project={items[0]} />
            </div>
          </article>
        ) : (
          <div className={cn("grid grid-cols-1 gap-x-6", pair && "gap-y-16 md:grid-cols-2")}>
            {items.map((project, index) => (
              <article key={project.slug} data-slug={project.slug} aria-label={project.title}>
                {frameFor(project, index, "aspect-[4/5]", pair ? "(min-width: 768px) 50vw, 100vw" : "100vw")}
                <Caption project={project} />
              </article>
            ))}
          </div>
        )}
      </div>
      {/* The locked stretch: while this scrolls past, the row above stays put. */}
      <div ref={spacer} aria-hidden="true" className={pair ? "h-[150svh] max-md:noscript:hidden" : "h-[90svh]"} />
    </div>
  )
}
