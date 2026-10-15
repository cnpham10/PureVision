import { Check } from "lucide-react"
import { cn } from "cn"
import { EstimatorIcon } from "@/components/estimate/estimator-icon"
import type { CardLayout, SelectionOption } from "@/lib/estimator/types"

const layouts: Record<CardLayout, string> = {
  text: "min-h-16 items-center gap-4 px-4 py-4 text-left sm:px-5",
  descriptive: "min-h-32 flex-col items-start px-5 py-5 pr-12 text-left",
  image: "min-h-full flex-col items-stretch p-0 text-left",
  compact: "min-h-16 flex-col items-start justify-start px-4 py-3.5 pr-10 text-left",
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
  const leadingIcon =
    layout === "text" && option.icon && option.icon !== "mark" ? option.icon : null
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
      aria-labelledby={`${option.id}-label`}
      aria-describedby={describedBy || undefined}
      onClick={onSelect}
      className={cn(
        "group/choice relative flex w-full overflow-hidden rounded-sm border font-sans text-base text-foreground transition-[border-color,background-color,translate] duration-150 motion-reduce:transition-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
        option.disabled
          ? "cursor-not-allowed border-border bg-subtle text-muted-foreground"
          : selected
            ? "border-foreground bg-brand/20 shadow-[inset_0_0_0_1px_var(--color-foreground)]"
            : "border-border bg-card hover:border-foreground/40 hover:bg-subtle active:translate-y-px motion-reduce:active:translate-y-0",
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
          ) : null}
        </span>
      ) : null}

      {leadingIcon ? (
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-sm transition-colors duration-150 motion-reduce:transition-none",
            selected ? "bg-brand" : "bg-subtle group-hover/choice:bg-background",
          )}
        >
          <EstimatorIcon name={leadingIcon} />
        </span>
      ) : null}

      <span
        className={cn(
          "flex w-full gap-3",
          layout === "image" && "flex-col px-5 py-5 pr-12",
          layout === "descriptive" && "flex-col",
          layout === "compact" && "flex-col gap-1",
          layout === "text" && "min-w-0 flex-1 items-center justify-between",
        )}
      >
        <span className={cn("flex flex-col", layout === "compact" ? "gap-1" : "gap-1.5")}>
          <span
            id={`${option.id}-label`}
            className={cn(
              "text-foreground",
              layout === "descriptive" ? "text-lg leading-snug" : "text-base leading-snug",
            )}
          >
            {option.title}
          </span>
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
        {option.secondaryLabel || option.priceLabel || option.icon === "mark" ? (
          <span className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {option.icon === "mark" ? <EstimatorIcon name="mark" /> : null}
            {option.secondaryLabel ? <span>{option.secondaryLabel}</span> : null}
            {option.priceLabel ? <span>{option.priceLabel}</span> : null}
          </span>
        ) : null}
      </span>

      <Marker
        control={control}
        selected={selected}
        disabled={option.disabled}
        className={layout === "text" ? "shrink-0" : "absolute top-3 right-3"}
      />
    </button>
  )
}

/** A circle for "pick one", a square for "pick any". */
function Marker({
  control,
  selected,
  disabled,
  className,
}: {
  control: "radio" | "toggle"
  selected: boolean
  disabled?: boolean
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-5 items-center justify-center border-[1.5px] bg-background transition-colors duration-150 motion-reduce:transition-none",
        control === "radio" ? "rounded-full" : "rounded-sm",
        disabled
          ? "border-border"
          : selected
            ? "border-foreground"
            : "border-foreground/55 group-hover/choice:border-foreground",
        selected && control === "toggle" && "bg-foreground text-background",
        className,
      )}
    >
      {selected && control === "radio" ? (
        <span className="size-2.5 rounded-full bg-foreground forced-colors:bg-[CanvasText]" />
      ) : null}
      {selected && control === "toggle" ? (
        <Check className="size-3.5" strokeWidth={2.5} />
      ) : null}
    </span>
  )
}
