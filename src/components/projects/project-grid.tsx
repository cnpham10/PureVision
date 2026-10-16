"use client"

import { useLayoutEffect, useSyncExternalStore } from "react"
import type { Project } from "@/content/projects"
import { PinnedRow, clamp, segments } from "@/components/projects/pinned-row"

/** Matches Tailwind's md breakpoint, so script and styles agree on the layout. */
const wideQuery = "(min-width: 48rem)"

/** The room the reader was on, and how far its sweep had gone, before the layout regroups. */
let carry: { slug: string; wipe: number } | null = null

/** Note the room nearest its lock, from the progress each row keeps in data-progress. */
function remember() {
  let best: { track: HTMLElement; progress: number; distance: number } | null = null
  for (const track of document.querySelectorAll<HTMLElement>("[data-progress]")) {
    const raw = parseFloat(track.dataset.progress ?? "")
    if (Number.isNaN(raw)) continue
    const distance = raw < 0 ? -raw : raw > 1 ? raw - 1 : 0
    if (!best || distance < best.distance) best = { track, progress: clamp(raw), distance }
  }
  if (!best) return
  const rooms = [...best.track.querySelectorAll<HTMLElement>("[data-slug]")]
  const parts = segments[rooms.length]
  if (!parts) return
  const index = rooms.length === 2 && best.progress >= 0.5 ? 1 : 0
  const [start, end] = parts[index]
  carry = { slug: rooms[index].dataset.slug ?? "", wipe: clamp((best.progress - start) / (end - start)) }
}

/** True from tablet width up. The server renders the wide layout. */
function useWideScreen() {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(wideQuery)
      const handler = () => {
        remember()
        onChange()
      }
      media.addEventListener("change", handler)
      return () => media.removeEventListener("change", handler)
    },
    () => window.matchMedia(wideQuery).matches,
    () => true,
  )
}

/**
 * Rooms in a steady rhythm: two side by side, then one wide, and again.
 * On a phone every room is its own row, since two stacked rooms cannot both fit on screen.
 */
function rows(items: Project[], wideScreen: boolean) {
  if (!wideScreen) return items.map((item) => [item])
  const result: Project[][] = []
  let index = 0
  while (index < items.length) {
    const size = result.length % 2 === 0 ? 2 : 1
    result.push(items.slice(index, index + size))
    index += size
  }
  return result
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const wideScreen = useWideScreen()

  // After the rows regroup, scroll back to the same room at the same point of its sweep.
  useLayoutEffect(() => {
    const place = carry
    carry = null
    if (!place) return
    const room = document.querySelector<HTMLElement>(`[data-slug="${place.slug}"]`)
    const track = room?.closest<HTMLElement>("[data-track]")
    const stage = track?.firstElementChild as HTMLElement | null
    const spacer = stage?.nextElementSibling as HTMLElement | null
    if (!room || !track || !stage || !spacer) return
    const rooms = [...track.querySelectorAll<HTMLElement>("[data-slug]")]
    const parts = segments[rooms.length]
    if (!parts) return
    const [start, end] = parts[rooms.indexOf(room)]
    const lockedAt = parseFloat(getComputedStyle(stage).top) || 0
    const progress = start + place.wipe * (end - start)
    window.scrollTo(0, track.getBoundingClientRect().top + window.scrollY - lockedAt + progress * spacer.offsetHeight)
  }, [wideScreen])

  return (
    <div className="mt-14 flex flex-col gap-16 md:gap-24">
      {rows(projects, wideScreen).map((row, index) => (
        <PinnedRow
          key={row.map((item) => item.slug).join()}
          items={row}
          wide={wideScreen && row.length === 1 && index % 2 === 1}
        />
      ))}
    </div>
  )
}
