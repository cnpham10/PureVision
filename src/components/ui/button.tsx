import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 border border-transparent font-sans text-base font-normal whitespace-nowrap transition-colors duration-200 outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:pointer-events-none motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-foreground/80 disabled:bg-subtle disabled:text-muted-foreground",
        outline:
          "border-foreground/25 bg-transparent text-foreground hover:border-foreground disabled:border-border disabled:text-muted-foreground",
        ghost:
          "bg-transparent text-foreground hover:bg-subtle disabled:text-muted-foreground",
      },
      size: {
        default: "min-h-11 px-5",
        lg: "min-h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
