import { Check } from "lucide-react"
import { cn } from "cn"
import type { CardLayout, SelectionOption } from "@/lib/estimator/types"

const layouts: Record<CardLayout, string> = {
  text: "min-h-14 items-center px-4 py-3 pr-12 text-left",
  descriptive: "min-h-32 flex-col items-start px-5 py-5 pr-12 text-left",
  image: "min-h-full flex-col items-stretch p-0 text-left",
  compact: "min-h-16 items-center justify-center px-3 py-3 pr-8 text-center",
}

export function SelectionCard({
  option,
  layout,
  selected,
  control,
  onSelect,
}: {
  option: SelectionOption
  layout: CardLayout
  selected: boolean
  control: "radio" | "toggle"
  onSelect: () => void
}) {
  const image = option.image
  const describedBy = [
    option.description ? `${option.id}-description` : null,
    option.detail ? `${option.id}-detail` : null,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      disabled={option.disabled}
      role={control === "radio" ? "radio" : undefined}
      aria-checked={control === "radio" ? selected : undefined}
      aria-pressed={control === "toggle" ? selected : undefined}
      aria-describedby={describedBy || undefined}
      onClick={onSelect}
      className={cn(
        "relative flex w-full overflow-hidden rounded-[1rem] border bg-background font-sans text-base text-foreground transition-[border-color,background-color,box-shadow] duration-200 motion-reduce:transition-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
        option.disabled
          ? "cursor-not-allowed border-border bg-subtle text-muted-foreground shadow-none"
          : selected
            ? "border-foreground bg-subtle shadow-[0_1px_2px_oklch(0.22_0.008_75/0.06),0_16px_32px_-12px_oklch(0.22_0.008_75/0.34)] hover:shadow-[0_2px_8px_oklch(0.22_0.008_75/0.08),0_20px_36px_-12px_oklch(0.22_0.008_75/0.38)]"
            : "border-border shadow-[0_1px_2px_oklch(0.22_0.008_75/0.05),0_12px_28px_-16px_oklch(0.22_0.008_75/0.28)] hover:border-foreground/40 hover:shadow-[0_2px_6px_oklch(0.22_0.008_75/0.06),0_18px_36px_-14px_oklch(0.22_0.008_75/0.32)]",
        layouts[layout],
      )}
    >
      {layout === "image" ? (
        <span className="relative flex aspect-[4/3] items-end overflow-hidden bg-subtle p-4">
          {image?.src ? (
            // Real project images can replace this src without changing the frame.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-muted-foreground">
              {image?.alt ?? "Image placeholder"}
            </span>
          )}
        </span>
      ) : null}

      <span
        className={cn(
          "flex w-full gap-3",
          layout === "image" && "flex-col px-5 py-5 pr-12",
          layout === "descriptive" && "flex-col",
          layout === "compact" && "flex-col items-center",
          layout === "text" && "items-center justify-between",
        )}
      >
        <span className="flex flex-col gap-2">
          <span className="text-base text-foreground">{option.title}</span>
          {option.description ? (
            <span
              id={`${option.id}-description`}
              className="text-sm leading-relaxed text-muted-foreground"
            >
              {option.description}
            </span>
          ) : null}
          {option.detail ? (
            <span id={`${option.id}-detail`} className="text-sm text-foreground">
              {option.detail}
            </span>
          ) : null}
        </span>
        {option.secondaryLabel || option.priceLabel || option.icon ? (
          <span className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {option.icon === "mark" ? (
              <span
                aria-hidden
                className="inline-block size-2 bg-foreground"
              />
            ) : null}
            {option.secondaryLabel ? <span>{option.secondaryLabel}</span> : null}
            {option.priceLabel ? <span>{option.priceLabel}</span> : null}
          </span>
        ) : null}
      </span>

      <span
        aria-hidden
        className={cn(
          "absolute top-3 right-3 flex size-5 items-center justify-center rounded-full border",
          selected
            ? "border-foreground bg-foreground text-background"
            : "border-border bg-background",
        )}
      >
        {selected ? <Check className="size-3" strokeWidth={2} /> : null}
      </span>
    </button>
  )
}
