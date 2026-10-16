import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "cn"
import { getProject, projects } from "@/content/projects"
import { site } from "@/content/site"
import { buttonVariants } from "@/components/ui/button"
import { ProjectGrid } from "@/components/projects/project-grid"

export const metadata: Metadata = {
  title: "Projects",
  description: `Bathrooms and a kitchen ${site.name} rebuilt, each shown before and after.`,
}

const opening = getProject("freestanding-tub-suite")!
const closing = getProject("open-white-kitchen")!

/**
 * On-load entrance for the first screen; skipped for people who ask for reduced motion.
 * Stagger with --tw-animation-delay, not delay-*, which would also delay hover transitions.
 */
const enter =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:animation-duration-700 motion-safe:fill-mode-both motion-safe:ease-out"

export default function ProjectsPage() {
  return (
    <>
      {/* First screen: one finished room, the headline under it like a film title. */}
      <section className="flex flex-col md:h-[calc(100svh-4rem)] md:min-h-fit">
        <div className="relative h-[46svh] overflow-hidden md:h-auto md:min-h-[300px] md:flex-[2.4]">
          <Image
            src={opening.after.image}
            alt={opening.after.alt}
            fill
            preload
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[50%_58%]"
          />
        </div>
        <div className="flex flex-col justify-between gap-6 px-5 pt-6 pb-4 sm:px-8 md:flex-1">
          <h1
            className={cn(
              "text-[clamp(56px,10vw,168px)] leading-[0.88] tracking-[-0.04em] sm:order-last sm:whitespace-nowrap",
              enter,
            )}
          >
            Rooms we rebuilt
          </h1>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <Link
              href="/estimate"
              className={cn(buttonVariants({ size: "lg" }), "self-start motion-safe:[--tw-animation-delay:180ms]", enter)}
            >
              Estimate your project
            </Link>
          </div>
        </div>
      </section>

      {/* The work: one grid, one rhythm. */}
      <section className="px-5 pt-[14vh] pb-[16vh] sm:px-8" aria-labelledby="work-heading">
        <h2 id="work-heading" className="text-[clamp(32px,3.4vw,48px)] leading-[1.02] tracking-[-0.03em]">
          The work
        </h2>
        <ProjectGrid projects={projects} />
      </section>

      {/* Close: the last photograph, the words in its right half. */}
      <section className="relative flex min-h-[90svh] items-end overflow-hidden" aria-labelledby="close-heading">
        {/* Darker where the words sit on lighter parts of the photo (phones and portrait screens). */}
        <Image
          src={closing.after.image}
          alt={closing.after.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[50%_55%] brightness-[0.45] lg:landscape:brightness-[0.55]"
        />
        <div className="relative grid w-full grid-cols-1 px-5 pb-[12vh] text-background sm:px-8 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-5 md:col-start-8">
            <h2 id="close-heading" className="text-[clamp(32px,3.4vw,48px)] leading-[1.02] tracking-[-0.03em]">
              Start an estimate
            </h2>
            <p className="mt-5 max-w-[40ch] text-[17px] leading-[1.55]">
              Answer a few questions about your room to start an estimate. We work in{" "}
              {site.serviceArea} and about 20 miles around. <span lang="es">Hablamos español.</span>
            </p>
            <Link
              href="/estimate"
              className="mt-8 inline-flex min-h-[52px] items-center bg-background px-6 text-foreground transition-colors hover:bg-subtle motion-reduce:transition-none"
            >
              Get an estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
