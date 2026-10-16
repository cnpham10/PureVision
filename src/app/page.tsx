import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"
import { getProject } from "@/content/projects"
import { site } from "@/content/site"
import { buttonVariants } from "@/components/ui/button"

const room = getProject("oak-vanity-and-glass-shower")!

/**
 * On-load entrances, as on the projects page; skipped for people who ask for reduced motion.
 * The headline rises, then the paragraphs fade in. Delay with --tw-animation-delay, not delay-*,
 * which would also delay hover transitions.
 */
const rise =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:[animation-duration:1.4s] motion-safe:fill-mode-both motion-safe:ease-in-out"
const fadeIn =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:[animation-duration:1.6s] motion-safe:fill-mode-both motion-safe:ease-in-out motion-safe:[--tw-animation-delay:420ms]"

export default function Home() {
  return (
    /* A finished room fills the right half edge to edge; the words sit on the paper beside it. */
    <section className="grid grid-cols-1 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-2">
      <figure className="relative h-[44svh] overflow-hidden md:h-[52svh] lg:order-last lg:h-auto">
        <Image
          src={room.after.image}
          alt={room.after.alt}
          fill
          preload
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover object-[50%_45%] motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-105 motion-safe:animation-duration-1800 motion-safe:ease-out"
        />
      </figure>

      <div className="flex flex-col justify-between gap-12 px-5 pt-10 pb-12 sm:px-[6vw] md:py-14 lg:py-[10vh] lg:pr-[4vw]">
        <h1
          className={cn(
            "text-[36px] leading-[1.0] tracking-[-0.03em] min-[360px]:text-[clamp(40px,10.4vw,56px)] md:text-[clamp(52px,7.2vw,72px)] lg:text-[clamp(52px,5.4vw,92px)]",
            rise,
          )}
        >
          Purely Your Vision.
          <span className="block">Our Craftsmanship.</span>
        </h1>

        <div>
          <div className={cn("max-w-[46ch] space-y-5 text-[18px] leading-[1.6]", fadeIn)}>
            <p>
              Purevision Contractors remodels bathrooms and kitchens in Delray Beach. You
              describe the room you want. We build it, from the first layout to the last
              finish.
            </p>
            <p>
              That includes showers, tubs, vanities, flooring, tile, stone, and kitchen
              counters, planned together so the materials match the room.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={site.primaryCta.href}
              className={cn(buttonVariants({ size: "lg" }), "w-full active:scale-[0.98] sm:w-auto")}
            >
              {site.primaryCta.label}
            </Link>
            <Link
              href={site.secondaryCta.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full active:scale-[0.98] sm:w-auto",
              )}
            >
              {site.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
