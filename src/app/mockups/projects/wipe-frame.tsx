import Image from "next/image"
import { cn } from "cn"
import type { Shot } from "./data"

/**
 * A room before and after, stacked. How far the after covers the before is the
 * --wipe custom property on the root, set by whoever drives it (see PinnedRow).
 * Without script both halves show.
 */
export function WipeFrame({
  ref,
  before,
  after,
  title,
  sizes,
  className,
}: {
  ref?: React.Ref<HTMLDivElement>
  before: Shot
  after: Shot
  title: string
  sizes: string
  className?: string
}) {
  return (
    <div ref={ref} className={cn("mk-wipe", className)}>
      <span className="sr-only">{title}: the room before, then after, as the page scrolls.</span>
      <Image src={before.image} alt={before.alt} fill sizes={sizes} className="object-cover" />
      <span className="mk-tag right-3" aria-hidden="true">
        Before
      </span>
      <div className="mk-wipe__after">
        <Image src={after.image} alt={after.alt} fill sizes={sizes} className="object-cover" />
        <span className="mk-tag left-3" aria-hidden="true">
          After
        </span>
      </div>
      <span className="mk-wipe__edge" aria-hidden="true" />
    </div>
  )
}
