export function PageHeader({
  eyebrow = "Placeholder",
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description: string
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-sm text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-4 text-4xl leading-[1.1] md:text-5xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  )
}
