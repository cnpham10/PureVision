export function PageHeader({
  eyebrow = false,
  title,
  description,
}: {
  eyebrow?: string | false
  title: string
  description: string
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? <p className="text-sm text-muted-foreground">{eyebrow}</p> : null}
      <h1 className={`text-4xl leading-[1.1] md:text-5xl${eyebrow ? " mt-4" : ""}`}>{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  )
}
