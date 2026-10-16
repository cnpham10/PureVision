import type { StaticImageData } from "next/image"
import bathroom2After from "../../assets/photos/bathroom2-after_purevisioncontractors.jpeg"
import bathroom2Before from "../../assets/photos/bathroom2-before_purevisioncontractors.jpeg"
import bathroom3After from "../../assets/photos/bathroom3-after_purevisioncontractors.jpeg"
import bathroom3Before from "../../assets/photos/bathroom3-before_purevisioncontractors.jpeg"
import bathroom5After from "../../assets/photos/bathroom5-after_purevisioncontractors.jpeg"
import bathroom5Before from "../../assets/photos/bathroom5-before_purevisioncontractors.jpeg"
import bathroom6After from "../../assets/photos/bathroom6-after_purevisioncontractors.jpeg"
import bathroom6Before from "../../assets/photos/bathroom6-before_purevisioncontractors.jpeg"
import kitchen1After from "../../assets/photos/kitchen1-after_purevisioncontractors.jpeg"
import kitchen1Before from "../../assets/photos/kitchen1-before_purevisioncontractors.jpeg"

export type ProjectPhoto = {
  image: StaticImageData
  alt: string
}

export type Project = {
  slug: string
  title: string
  room: "Bathroom" | "Kitchen"
  /** One sentence on what changed, as the photos show it. */
  changed: string
  before: ProjectPhoto
  after: ProjectPhoto
}

/**
 * Finished rooms, in the order the projects page shows them.
 * Titles and descriptions were written from the photos; confirm them with the client before launch.
 */
export const projects: Project[] = [
  {
    slug: "navy-walk-in-shower",
    title: "Navy walk-in shower",
    room: "Bathroom",
    changed:
      "The tub and its sliding doors came out. In went a walk-in shower tiled in navy to the ceiling, a frameless glass panel and a marble-look floor.",
    before: {
      image: bathroom6Before,
      alt: "The bathroom before: a tub with sliding glass doors, a dark wood vanity and dark floor tile.",
    },
    after: {
      image: bathroom6After,
      alt: "The bathroom after: a walk-in shower in navy tile behind a glass panel, a white vanity and a white marble-look floor.",
    },
  },
  {
    slug: "freestanding-tub-suite",
    title: "Freestanding tub suite",
    room: "Bathroom",
    changed:
      "A corner tub and beige tile gave way to a freestanding tub, a floating wood vanity, a lit mirror and grey stone-look walls. The glass-block windows stayed.",
    before: {
      image: bathroom3Before,
      alt: "The bathroom before: a corner tub under glass-block windows, a white vanity and beige floor tile.",
    },
    after: {
      image: bathroom3After,
      alt: "The bathroom after: a freestanding white tub, a floating wood vanity with a lit mirror and a pendant light under glass-block windows.",
    },
  },
  {
    slug: "open-white-kitchen",
    title: "Open white kitchen",
    room: "Kitchen",
    changed:
      "Dark wood cabinets, dark counters and a travertine floor were replaced by white shaker cabinets, a blue backsplash, white counters and a glossy white floor.",
    before: {
      image: kitchen1Before,
      alt: "The kitchen before: dark wood cabinets, dark counters and a travertine floor.",
    },
    after: {
      image: kitchen1After,
      alt: "The kitchen after: white shaker cabinets, a blue backsplash, white counters and a glossy white floor.",
    },
  },
  {
    slug: "frameless-glass-shower",
    title: "Frameless glass shower",
    room: "Bathroom",
    changed:
      "A framed shower door and almond tile were replaced by frameless glass, wood-look wall tile and a lit niche for bottles.",
    before: {
      image: bathroom2Before,
      alt: "The shower before: a framed sliding door and almond wall tile.",
    },
    after: {
      image: bathroom2After,
      alt: "The shower after: frameless glass, wood-look wall tile and a lit niche.",
    },
  },
  {
    slug: "oak-vanity-and-glass-shower",
    title: "Oak vanity and glass shower",
    room: "Bathroom",
    changed:
      "The plain white vanity and framed shower made way for a wood vanity with brass taps, a lit mirror and a glass shower.",
    before: {
      image: bathroom5Before,
      alt: "The bathroom before: a white vanity, a framed shower and beige floor tile.",
    },
    after: {
      image: bathroom5After,
      alt: "The bathroom after: a wood vanity with a brass tap, a lit mirror and a frameless glass shower.",
    },
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
