"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "cn"
import type { Shot } from "./data"

/**
 * Drag across the photo to move between the room before and after.
 * Built on a native range input, so it also works with the keyboard.
 */
export function BeforeAfter({
  before,
  after,
  title,
  sizes,
  className,
  preload = false,
}: {
  before: Shot
  after: Shot
  title: string
  sizes: string
  className?: string
  preload?: boolean
}) {
  const [cut, setCut] = useState(50)

  return (
    <div
      className={cn("mk-compare", className)}
      style={{ "--cut": `${cut}%` } as React.CSSProperties}
    >
      <Image
        src={before.image}
        alt={before.alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
      />
      <Image
        src={after.image}
        alt={after.alt}
        fill
        sizes={sizes}
        preload={preload}
        className="mk-compare__after object-cover"
      />
      <span className="mk-compare__handle" aria-hidden="true" />
      <span className="mk-tag left-3" aria-hidden="true">
        Before
      </span>
      <span className="mk-tag right-3" aria-hidden="true">
        After
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={cut}
        onChange={(event) => setCut(Number(event.target.value))}
        aria-label={`${title}: slide to compare before and after`}
        className="mk-compare__range"
      />
    </div>
  )
}
