import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn("field-control min-h-32 resize-y py-3", className)}
      {...props}
    />
  )
}

export { Textarea }
