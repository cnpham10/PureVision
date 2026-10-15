import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"
import { site } from "@/content/site"
import { buttonVariants } from "@/components/ui/button"
import { BeforeAfter } from "../before-after"
import { pairs, unknown } from "../data"
import { ThreeDistances } from "./three-distances"

export const metadata: Metadata = {
  title: "Projects mockup A",
}

const hero = pairs.find((project) => project.slug === "freestanding-tub-suite")!
const closer = pairs.find((project) => project.slug === "navy-walk-in-shower")!
const closing = pairs.find((project) => project.slug === "open-white-kitchen")!

/** Three placements that repeat down the page: wide left, narrow right, inset landscape. */
const placements = [
  { frame: "md:col-span-7 md:col-start-1 aspect-[4/5] md:aspect-[5/4]", text: "md:col-span-7 md:col-start-1", sizes: "(min-width: 768px) 58vw, 100vw" },
  { frame: "md:col-span-5 md:col-start-8 aspect-[4/5]", text: "md:col-span-5 md:col-start-8", sizes: "(min-width: 768px) 42vw, 68vw" },
  { frame: "md:col-span-8 md:col-start-3 aspect-[4/3]", text: "md:col-span-8 md:col-start-3", sizes: "(min-width: 768px) 67vw, 82vw" },
]

const phoneWidths = ["w-full", "ml-auto w-[68%]", "w-[82%]"]

export default function ProjectsMockupA() {
  return (
    <div className="mk">
      {/* First screen: one finished room, the headline under it like a film title. */}
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
          <div className="order-last mt-5 flex flex-col gap-5 sm:order-none sm:mt-0 sm:flex-row sm:items-start sm:justify-between">
            <p className="mk-body max-w-[46ch]">
              Bathrooms and kitchens {site.name} rebuilt, each shown before and after. Drag
              across any room below to see what was there.
            </p>
            <Link href="/estimate" className={cn(buttonVariants({ size: "lg" }), "mk-press self-start")}>
              Estimate your project
            </Link>
          </div>
          <h1 className="mk-display sm:mt-6 sm:whitespace-nowrap">
            Rooms we rebuilt
          </h1>
        </div>
      </section>

      <ThreeDistances
        shot={closer.after}
        caption="Navy tile to the ceiling, glass with no frame, and a floor that reads as marble."
      />

      {/* The work: one room at a time, at its own size and side, with pauses between. */}
      <section className="px-5 pt-[12vh] pb-[20vh] sm:px-8" aria-labelledby="work-heading">
        <h2 id="work-heading" className="mk-heading" data-rise>
          The work
        </h2>

        <ol className="mt-16">
          {pairs.map((project, index) => {
            const place = placements[index % placements.length]
            return (
              <li
                key={project.slug}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-12 md:gap-x-6",
                  index > 0 && (index % 3 === 1 ? "mt-[72px] md:-mt-[30vh]" : "mt-[72px] md:mt-[6vh]"),
                )}
              >
                <p className={cn("mk-small text-muted-foreground", place.text, phoneWidths[index % 3])} data-rise>
                  {project.title}
                </p>
                <BeforeAfter
                  before={project.before}
                  after={project.after}
                  title={project.title}
                  sizes={place.sizes}
                  className={cn("mt-2", place.frame, phoneWidths[index % 3], "md:w-auto md:ml-0")}
                />
                <p
                  className={cn("mk-body mt-3 max-w-[56ch]", place.text, phoneWidths[index % 3])}
                  data-rise
                  style={{ "--i": 1 } as React.CSSProperties}
                >
                  {project.changed}
                </p>
                {index === 1 ? (
                  <p className="mk-statement mt-10 md:col-span-5 md:col-start-2 md:row-start-2 md:mt-0 md:self-center">
                    Same rooms, same windows. Everything else is new.
                  </p>
                ) : null}
              </li>
            )
          })}
        </ol>
      </section>

      {/* Every room in one table, pushed right. */}
      <section className="bg-subtle px-5 py-[16vh] sm:px-8" aria-labelledby="list-heading">
        <h2
          id="list-heading"
          className="mk-heading max-w-[16ch] md:indent-[3vw]"
          data-rise
        >
          Every room so far, at a glance
        </h2>

        <div className="mt-24 grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-6">
          <div className="relative hidden aspect-[4/5] self-end md:col-span-4 md:block">
            <Image
              src={pairs[3].after.image}
              alt={pairs[3].after.alt}
              fill
              sizes="30vw"
              className="object-cover"
            />
          </div>
          <p className="mk-small hidden text-muted-foreground md:col-span-1 md:col-start-7 md:block">Rooms</p>
          <table className="mk-body w-full md:col-span-5 md:col-start-8">
            <caption className="sr-only">Every project with its room and city</caption>
            <tbody>
              {pairs.map((project, index) => (
                <tr key={project.slug} className={cn(index === 4 && "[&>td]:pt-11")}>
                  <td className="py-[13px] pr-4 text-muted-foreground">{project.room}</td>
                  <td className="py-[13px] pr-4">{project.title}</td>
                  <td className="py-[13px] text-right text-muted-foreground">{unknown.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              visits.
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
