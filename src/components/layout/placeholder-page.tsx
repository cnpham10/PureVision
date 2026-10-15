import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"

export function PlaceholderPage({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <Container className="py-20 md:py-28">
      <PageHeader title={title} description={description} />
      {children}
    </Container>
  )
}
