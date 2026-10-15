"use client"

import { useSyncExternalStore } from "react"
import type { MockProject, Shot } from "../data"
import { PinnedRow } from "./pinned-row"

type Pair = MockProject & { after: Shot }

const wideQuery = "(min-width: 768px)"

/** True from tablet width up. The server renders the wide layout. */
function useWideScreen() {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(wideQuery)
      media.addEventListener("change", onChange)
      return () => media.removeEventListener("change", onChange)
    },
    () => window.matchMedia(wideQuery).matches,
    () => true,
  )
}

/**
 * Rooms in a steady rhythm: two side by side, then one wide, and again.
 * On a phone every room is its own row, since two stacked rooms cannot both fit on screen.
 */
function rows(items: Pair[], wideScreen: boolean) {
  if (!wideScreen) return items.map((item) => [item])
  const result: Pair[][] = []
  let index = 0
  while (index < items.length) {
    const size = result.length % 2 === 0 ? 2 : 1
    result.push(items.slice(index, index + size))
    index += size
  }
  return result
}

export function WorkGrid({ projects }: { projects: Pair[] }) {
  const wideScreen = useWideScreen()

  return (
    <>
      <div className="mt-14 flex flex-col gap-16 md:gap-24">
        {rows(projects, wideScreen).map((row, index) => (
          <PinnedRow
            key={row.map((item) => item.slug).join()}
            items={row}
            wide={wideScreen && row.length === 1 && index % 2 === 1}
          />
        ))}
      </div>
    </>
  )
}
