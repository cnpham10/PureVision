"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import type { Shot } from "../data"

const distances = [
  { scale: 1, origin: "50% 50%" },
  { scale: 1.8, origin: "50% 30%" },
  { scale: 3, origin: "42% 92%" },
]

/** One photograph seen from three distances as the reader scrolls past. */
export function ThreeDistances({ shot, caption }: { shot: Shot; caption: string }) {
  // null until the observer reports, so every part shows when script has not run.
  const [stage, setStage] = useState<number | null>(null)
  const markers = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStage(Number((entry.target as HTMLElement).dataset.stage))
          }
        }
      },
      { threshold: 0.5 },
    )
    markers.current.forEach((marker) => marker && observer.observe(marker))
    return () => observer.disconnect()
  }, [])

  const { scale, origin } = distances[stage ?? 0]
  const shows = (step: number) => stage === null || stage >= step

  return (
    <section className="relative h-[240vh] bg-subtle" aria-labelledby="closer-heading">
      {distances.map((_, index) => (
        <div
          key={index}
          ref={(node) => {
            markers.current[index] = node
          }}
          data-stage={index}
          className="absolute inset-x-0 h-[80svh]"
          style={{ top: `${index * 80}vh` }}
          aria-hidden="true"
        />
      ))}

      <div className="sticky top-[var(--mk-header)] flex h-[calc(100svh-var(--mk-header))] flex-col items-center justify-center px-5">
        <h2 id="closer-heading" className="mk-display text-center">
          Look closer.<span className="sr-only"> It holds up.</span>
        </h2>

        <div className="relative mt-6 flex w-full max-w-6xl justify-center">
          <div className="relative aspect-[4/5] w-[70vw] overflow-hidden md:w-[min(38vw,calc((100svh-var(--mk-header))*0.46))]">
            <Image
              src={shot.image}
              alt={shot.alt}
              fill
              sizes="(min-width: 768px) 30vw, 70vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform: `scale(${scale})`, transformOrigin: origin }}
            />
          </div>

          <p
            className="mk-body absolute top-0 left-[calc(50%+min(19vw,calc((100svh-var(--mk-header))*0.23))+32px)] hidden max-w-[28ch] transition-opacity duration-500 md:block motion-reduce:transition-none"
            style={{ opacity: shows(2) ? 1 : 0 }}
          >
            {caption}
          </p>
        </div>

        <p
          aria-hidden="true"
          className="mk-display mt-4 text-center transition-opacity duration-500 motion-reduce:transition-none"
          style={{ opacity: shows(1) ? 1 : 0 }}
        >
          It holds up.
        </p>

        <p className="mk-body mt-4 max-w-[34ch] text-center md:hidden">{caption}</p>
      </div>
    </section>
  )
}
