import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { estimators, getEstimator } from "@/content/estimators"
import { Container } from "@/components/layout/container"
import { Estimator } from "@/components/estimate/estimator"

type EstimateServicePageProps = {
  params: Promise<{ service: string }>
}

export function generateStaticParams() {
  return estimators.map((category) => ({ service: category.slug }))
}

export async function generateMetadata({
  params,
}: EstimateServicePageProps): Promise<Metadata> {
  const { service } = await params
  const category = getEstimator(service)

  return {
    title: category?.title ?? "Estimate",
    description:
      category?.description ??
      "Placeholder estimator. Pricing rules have not been supplied.",
  }
}

export default async function EstimateServicePage({
  params,
}: EstimateServicePageProps) {
  const { service } = await params
  const category = getEstimator(service)

  if (!category) {
    notFound()
  }

  return (
    <Container className="py-16 md:py-24">
      <Estimator category={category} />
    </Container>
  )
}
