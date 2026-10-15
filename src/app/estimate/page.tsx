import type { Metadata } from "next"
import { estimators } from "@/content/estimators"
import { Container } from "@/components/layout/container"
import { ServicePicker } from "@/components/estimate/service-picker"

export const metadata: Metadata = {
  title: "Estimate",
  description:
    "Answer a few questions about a bathroom or kitchen remodel. Draft estimator: price ranges are not available until pricing rules are supplied.",
}

export default function EstimatePage() {
  return (
    <Container className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl leading-[1.1] md:text-6xl">
          Get an estimate for your next project.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground">
          Choose the room and answer a few quick questions.
        </p>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Draft: the services and questions are still to be confirmed, and price
          ranges will appear once pricing rules are supplied.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl md:mt-14">
        <ServicePicker categories={estimators} />
      </div>
    </Container>
  )
}
