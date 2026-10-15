import {
  Bath,
  CookingPot,
  Hammer,
  MessageSquare,
  Move,
  PaintRoller,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"
import type { EstimatorIconName } from "@/lib/estimator/icons"

const drawings: Record<Exclude<EstimatorIconName, "mark">, LucideIcon> = {
  bathroom: Bath,
  kitchen: CookingPot,
  refresh: PaintRoller,
  update: Wrench,
  rebuild: Hammer,
  reconfigure: Move,
  "something-else": MessageSquare,
}

/** Line icon for an estimator name. "mark" stays a small filled square. */
export function EstimatorIcon({
  name,
  className,
}: {
  name: EstimatorIconName
  className?: string
}) {
  if (name === "mark") {
    return (
      <span aria-hidden className={cn("inline-block size-2 bg-foreground", className)} />
    )
  }

  const Drawing = drawings[name]
  return <Drawing aria-hidden className={cn("size-5", className)} strokeWidth={1.5} />
}
