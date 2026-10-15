"use client"

import { useEffect, useRef } from "react"
import { cn } from "cn"
import type { MockProject, Shot } from "../data"
import { WipeFrame } from "../wipe-frame"

type Pair = MockProject & { after: Shot }

/** Tall enough to show the whole photo below the header, with 24px above and below. */
const fitScreen = "max-h-[calc(100svh-var(--mk-header)-48px)]"

/**
 * Where each room's sweep happens within the locked stretch of scrolling (0 to 1).
 * The start and end are held, so the before can be studied and the after is seen whole.
 * Two rooms go one after the other, left then right.
 */
const segments: Record<number, [number, number][]> = {
  1: [[0.15, 0.85]],
  2: [[0.1, 0.45], [0.55, 0.9]],
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))

function Caption({ project }: { project: Pair }) {
  return (
    <div className="mt-4">
      <h3 className="mk-statement font-display tracking-[-0.02em]">{project.title}</h3>
      <p className="mk-body mt-3 max-w-[52ch]">{project.changed}</p>
    </div>
  )
}

/**
 * A row of one or two rooms. It scrolls normally until the whole photo is on screen,
 * then stays locked in place while further scrolling sweeps each room from before to
 * after, and lets go once every room in it is after. Scrolling back reverses it.
 */
export function PinnedRow({ items, wide = false }: { items: Pair[]; wide?: boolean }) {
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const spacer = useRef<HTMLDivElement>(null)
  const frames = useRef<(HTMLDivElement | null)[]>([])
  const key = items.map((item) => item.slug).join()

  useEffect(() => {
    let pending = 0
    const parts = segments[items.length] ?? segments[1]

    const update = () => {
      pending = 0
      if (!track.current || !stage.current || !spacer.current) return
      const lockedAt = parseFloat(getComputedStyle(stage.current).top) || 0
      const distance = spacer.current.offsetHeight || 1
      const progress = clamp((lockedAt - track.current.getBoundingClientRect().top) / distance)

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
  }, [key, items.length])

  const frameFor = (project: Pair, index: number, className: string, sizes: string) => (
    <WipeFrame
      ref={(node) => {
        frames.current[index] = node
      }}
      before={project.before}
      after={project.after}
      title={project.title}
      sizes={sizes}
      className={cn("w-full", fitScreen, className)}
    />
  )

  return (
    <div ref={track} className="relative">
      <div ref={stage} className="sticky top-[calc(var(--mk-header)+24px)]">
        {wide ? (
          <article aria-label={items[0].title} className="grid grid-cols-1 gap-x-6 md:grid-cols-12 md:items-end">
            {frameFor(items[0], 0, "aspect-[4/5] md:col-span-8 md:aspect-[4/3]", "(min-width: 768px) 67vw, 100vw")}
            <div className="md:col-span-4">
              <Caption project={items[0]} />
            </div>
          </article>
        ) : (
          <div className={cn("grid grid-cols-1 gap-x-6", items.length === 2 && "md:grid-cols-2")}>
            {items.map((project, index) => (
              <article key={project.slug} aria-label={project.title}>
                {frameFor(project, index, "aspect-[4/5]", items.length === 2 ? "(min-width: 768px) 50vw, 100vw" : "100vw")}
                <Caption project={project} />
              </article>
            ))}
          </div>
        )}
      </div>
      {/* The locked stretch: while this scrolls past, the row above stays put. */}
      <div ref={spacer} aria-hidden="true" className={items.length === 2 ? "h-[150svh]" : "h-[90svh]"} />
    </div>
  )
}
