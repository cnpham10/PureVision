import { Label } from "@/components/ui/label"

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? (
        <p id={`${htmlFor}-hint`} className="text-sm leading-relaxed text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
