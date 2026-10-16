import Image from "next/image"
import { cn } from "cn"
import type { ProjectPhoto } from "@/content/projects"

/**
 * A room before and after, stacked. How much of the after shows is the --wipe
 * custom property on the root (0% to 100%), set by whoever drives it, such as PinnedRow.
 * Without script both halves show.
 */
export function BeforeAfterFrame({
  ref,
  before,
  after,
  sizes,
  className,
}: {
  ref?: React.Ref<HTMLDivElement>
  before: ProjectPhoto
  after: ProjectPhoto
  sizes: string
  className?: string
}) {
  return (
    <div ref={ref} data-wipe className={cn("group/frame relative overflow-hidden bg-subtle [--wipe:50%]", className)}>
      <Image src={before.image} alt={before.alt} fill sizes={sizes} placeholder="blur" className="object-cover" />
      <span aria-hidden="true" className="absolute right-3 bottom-3 bg-background px-2.5 py-1 text-[15px] leading-[1.3]">
        Before
      </span>
      <div className="absolute inset-0 [clip-path:inset(0_calc(100%_-_var(--wipe))_0_0)]">
        {/*
          Eager: while the clip is shut, the browser treats a lazy image as off screen and
          would only fetch it once the sweep starts, so the sweep would show the blur.
        */}
        <Image
          src={after.image}
          alt={after.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          loading="eager"
          className="object-cover"
        />
        <span aria-hidden="true" className="absolute bottom-3 left-3 bg-background px-2.5 py-1 text-[15px] leading-[1.3]">
          After
        </span>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-(--wipe) w-[3px] -translate-x-1/2 bg-background group-data-[state=after]/frame:opacity-0 group-data-[state=before]/frame:opacity-0"
      />
    </div>
  )
}
