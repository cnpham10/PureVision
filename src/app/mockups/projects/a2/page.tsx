import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"
import { buttonVariants } from "@/components/ui/button"
import { business, pairs } from "../data"
import { WorkGrid } from "./work-grid"

export const metadata: Metadata = {
  title: "Projects mockup A2",
}

const bySlug = (slug: string) => pairs.find((project) => project.slug === slug)!

const hero = bySlug("freestanding-tub-suite")
const closing = bySlug("open-white-kitchen")

/** Kitchen in the middle, so the one wide row holds the room that suits a wide frame. */
const ordered = [
  bySlug("navy-walk-in-shower"),
  bySlug("freestanding-tub-suite"),
  bySlug("open-white-kitchen"),
  bySlug("frameless-glass-shower"),
  bySlug("oak-vanity-and-glass-shower"),
]

export default function ProjectsMockupA2() {
  return (
    <div className="mk">
      {/* First screen, as in option A: one finished room, the headline under it like a film title. */}
      <section className="flex flex-col md:h-[calc(100svh-var(--mk-header))]">
        <div className="relative h-[46svh] overflow-hidden md:h-auto md:min-h-[300px] md:flex-[2.4]">
          <Image
            src={hero.after.image}
            alt={hero.after.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover object-[50%_58%]"
          />
        </div>
        <div className="flex flex-col justify-between gap-6 px-5 pt-6 pb-4 sm:px-8 md:flex-1">
          <div className="order-last flex flex-col gap-5 sm:order-none sm:flex-row sm:items-start sm:justify-between">
            <p className="mk-body max-w-[46ch]" data-enter style={{ "--i": 1 } as React.CSSProperties}>
              Bathrooms and kitchens {business.name} rebuilt. Each room holds still as it was;
              keep scrolling and it turns into the finished room.
            </p>
            <Link href="/estimate" className={cn(buttonVariants({ size: "lg" }), "mk-press self-start")} data-enter style={{ "--i": 2 } as React.CSSProperties}>
              Estimate your project
            </Link>
          </div>
          <h1 className="mk-display sm:whitespace-nowrap" data-enter>
            Rooms we rebuilt
          </h1>
        </div>
      </section>

      {/* The work: one grid, one rhythm, a filter by service. */}
      <section className="px-5 pt-[14vh] pb-[16vh] sm:px-8" aria-labelledby="work-heading">
        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-12">
          <h2 id="work-heading" className="mk-heading md:col-span-6" data-rise>
            The work
          </h2>
          <p className="mk-body mt-4 max-w-[46ch] md:col-span-6 md:mt-0 md:self-end" data-rise style={{ "--i": 1 } as React.CSSProperties}>
            {ordered.length} finished rooms so far, each shown in the same spot before and after. More
            jobs are added as they are photographed.
          </p>
        </div>
        <WorkGrid projects={ordered} />
      </section>

      {/* Close: the last photograph, the words in its right half. */}
      <section className="relative flex min-h-[90svh] items-end overflow-hidden" aria-labelledby="close-heading">
        <Image
          src={closing.after.image}
          alt={closing.after.alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_55%] brightness-[0.55]"
          data-drift
        />
        <div className="relative grid w-full grid-cols-1 px-5 pb-[12vh] text-background sm:px-8 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-5 md:col-start-8">
            <h2 id="close-heading" className="mk-heading" data-rise>
              Start with a price
            </h2>
            <p className="mk-body mt-5 max-w-[40ch]" data-rise style={{ "--i": 1 } as React.CSSProperties}>
              Answer a few questions about your room and see a first price range before anyone
              visits. We work in {business.area}. Hablamos español.
            </p>
            <Link
              href="/estimate"
              className="mk-press mt-8 inline-flex min-h-[52px] items-center bg-background px-6 text-foreground hover:bg-subtle"
            >
              Get an estimate
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
