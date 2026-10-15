import type { Metadata } from "next"
import Link from "next/link"
import { services } from "@/content/services"
import { site } from "@/content/site"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bathroom and kitchen remodeling, flooring, tile, showers, vanities, and tub-to-shower conversions.",
}

export default function ServicesPage() {
  return (
    <Container className="py-20 md:py-28">
      <PageHeader
        title="Services"
        description="Bathroom and kitchen remodeling, plus the flooring, tile, and fixtures that go with them. If the work is not listed, describe it when you request an estimate."
      />

      <ul className="mt-14 max-w-3xl divide-y divide-border border-y border-border">
        {services.map((service) => (
          <li key={service.slug} className="py-8">
            <h2 className="text-3xl leading-tight">{service.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Link
          href={site.primaryCta.href}
          className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
        >
          {site.primaryCta.label}
        </Link>
      </div>
    </Container>
  )
}
