import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "cn"
import { EstimatorIcon } from "@/components/estimate/estimator-icon"
import type { EstimatorIconName } from "@/lib/estimator/icons"
import { lengthLabel } from "@/lib/estimator/summary"
import type { EstimatorCategory } from "@/lib/estimator/types"

/** One row per estimator, then a way in for jobs no estimator covers. */
export function ServicePicker({ categories }: { categories: EstimatorCategory[] }) {
  return (
    <ul className="grid gap-5 sm:gap-3">
      {categories.map((category) => (
        <li key={category.slug}>
          <ServiceRow
            href={`/estimate/${category.slug}`}
            icon={category.icon ?? "mark"}
            title={category.title}
            description={category.description}
            meta={lengthLabel(category)}
          />
        </li>
      ))}
      <li>
        <ServiceRow
          href="/contact"
          icon="something-else"
          title="Something else"
          description="Another kind of project? Tell us what you have in mind."
          meta="Opens the contact form"
          quiet
        />
      </li>
    </ul>
  )
}

function ServiceRow({
  href,
  icon,
  title,
  description,
  meta,
  quiet = false,
}: {
  href: string
  icon: EstimatorIconName
  title: string
  description: string
  meta: string
  quiet?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-4 rounded-sm bg-subtle px-5 py-7 transition-colors duration-150 sm:grid-cols-[auto_1fr_auto] sm:px-7 sm:py-8 motion-reduce:transition-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
        quiet ? "hover:bg-brand/10" : "hover:bg-brand/20",
      )}
    >
      <span className="hidden size-14 items-center justify-center rounded-sm bg-background sm:flex">
        <EstimatorIcon name={icon} className="size-6" />
      </span>

      <span className="flex min-w-0 flex-col">
        <span className="font-display text-[1.75rem] leading-tight tracking-[-0.02em] sm:text-4xl">
          {title}
        </span>
        <span className="mt-2 max-w-xl text-base leading-relaxed text-foreground">
          {description}
        </span>
        <span className="mt-3 text-sm text-muted-foreground">{meta}</span>
      </span>

      <span
        className={cn(
          "flex size-12 items-center justify-center self-center rounded-sm transition-colors duration-150 sm:size-14 motion-reduce:transition-none",
          quiet
            ? "bg-background text-foreground group-hover:bg-subtle"
            : "bg-brand text-brand-foreground group-hover:bg-brand-hover",
        )}
      >
        <ArrowRight
          aria-hidden
          className="size-5 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          strokeWidth={1.75}
        />
      </span>
    </Link>
  )
}
