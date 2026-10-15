import Link from "next/link"
import { site } from "@/content/site"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { cn } from "cn"

export default function Home() {
  return (
    <section className="border-b border-border">
      <Container className="grid items-end gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16 lg:py-36">
        <div className="lg:col-span-7">
          <h1 className="max-w-3xl text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
            The contractor promise belongs here.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            This sentence will introduce the contractor. It is placeholder copy
            and will be replaced before launch.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={site.primaryCta.href}
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              {site.primaryCta.label}
            </Link>
            <Link
              href={site.secondaryCta.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto",
              )}
            >
              {site.secondaryCta.label}
            </Link>
          </div>
        </div>

        <figure className="flex aspect-[4/3] items-end bg-subtle p-6 lg:col-span-5 lg:aspect-[4/5]">
          <figcaption className="text-sm leading-relaxed text-muted-foreground">
            Photograph placeholder. A project image will replace this frame.
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}
