import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string | false
  title: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <Container className="py-20 md:py-28">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      {children}
    </Container>
  )
}
