/** The photo files the local-only media route may serve, from assets/photos. */
export const photoFiles = [
  "bathroom1-before_purevisioncontractors.jpeg",
  "bathroom2-after_purevisioncontractors.jpeg",
  "bathroom2-before_purevisioncontractors.jpeg",
  "bathroom3-after_purevisioncontractors.jpeg",
  "bathroom3-before_purevisioncontractors.jpeg",
  "bathroom4-after_purevisioncontractors.jpeg",
  "bathroom4-before_purevisioncontractors.jpeg",
  "bathroom5-after_purevisioncontractors.jpeg",
  "bathroom5-before_purevisioncontractors.jpeg",
  "bathroom6-after_purevisioncontractors.jpeg",
  "bathroom6-before_purevisioncontractors.jpeg",
  "kitchen1-after_purevisioncontractors.jpeg",
  "kitchen1-before_purevisioncontractors.jpeg",
]

const photo = (file: string) => `/mockups/media/${file}`

export type Shot = {
  /** Address of the photo, served by the local-only media route. */
  image: string
  alt: string
}

export type MockProject = {
  slug: string
  /** Sample title for the mockup. Confirm with the client. */
  title: string
  room: "Bathroom" | "Kitchen"
  /** What the photos show changed. Written from the photos, not from the client. */
  changed: string
  before: Shot
  after?: Shot
  /** Another angle of the same room, when there is one. */
  angle?: { before: Shot; after: Shot }
}

/**
 * The owner's answers of 2026-10-15. `site.ts` still says "Purevision";
 * the mockups use the agreed name without changing the shared file.
 */
export const business = {
  name: "Purevision Contractors",
  area: "Delray Beach, Florida, and about 20 miles around",
}

/** Facts the client has not supplied yet. Shown as labelled placeholders. */
export const unknown = {
  city: "City to come",
  time: "Time on site to come",
  budget: "Budget range to come",
}

export const projects: MockProject[] = [
  {
    slug: "navy-walk-in-shower",
    title: "Navy walk-in shower",
    room: "Bathroom",
    changed:
      "The tub and its sliding doors came out. In went a walk-in shower tiled in navy to the ceiling, a frameless glass panel and a marble-look floor.",
    before: {
      image: photo("bathroom6-before_purevisioncontractors.jpeg"),
      alt: "The bathroom before: a tub with sliding glass doors, a dark wood vanity and dark floor tile.",
    },
    after: {
      image: photo("bathroom6-after_purevisioncontractors.jpeg"),
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
      image: photo("bathroom3-before_purevisioncontractors.jpeg"),
      alt: "The bathroom before: a corner tub under glass-block windows, a white vanity and beige floor tile.",
    },
    after: {
      image: photo("bathroom3-after_purevisioncontractors.jpeg"),
      alt: "The bathroom after: a freestanding white tub, a floating wood vanity with a lit mirror and a pendant light under glass-block windows.",
    },
    angle: {
      before: {
        image: photo("bathroom4-before_purevisioncontractors.jpeg"),
        alt: "The same bathroom before, seen from the doorway: a corner tub and a white vanity.",
      },
      after: {
        image: photo("bathroom4-after_purevisioncontractors.jpeg"),
        alt: "The same bathroom after, seen from the doorway: the freestanding tub and the wood vanity.",
      },
    },
  },
  {
    slug: "frameless-glass-shower",
    title: "Frameless glass shower",
    room: "Bathroom",
    changed:
      "A framed shower door and almond tile were replaced by frameless glass, wood-look wall tile and a lit niche for bottles.",
    before: {
      image: photo("bathroom2-before_purevisioncontractors.jpeg"),
      alt: "The shower before: a framed sliding door and almond wall tile.",
    },
    after: {
      image: photo("bathroom2-after_purevisioncontractors.jpeg"),
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
      image: photo("bathroom5-before_purevisioncontractors.jpeg"),
      alt: "The bathroom before: a white vanity, a framed shower and beige floor tile.",
    },
    after: {
      image: photo("bathroom5-after_purevisioncontractors.jpeg"),
      alt: "The bathroom after: a wood vanity with a brass tap, a lit mirror and a frameless glass shower.",
    },
  },
  {
    slug: "open-white-kitchen",
    title: "Open white kitchen",
    room: "Kitchen",
    changed:
      "Dark cabinets, a rust-red wall and travertine floor were replaced by white shaker cabinets, a blue glass backsplash, white counters and a glossy white floor.",
    before: {
      image: photo("kitchen1-before_purevisioncontractors.jpeg"),
      alt: "The kitchen before: dark wood cabinets, a rust-red wall and a travertine floor.",
    },
    after: {
      image: photo("kitchen1-after_purevisioncontractors.jpeg"),
      alt: "The kitchen after: white shaker cabinets, a blue backsplash, white counters and a glossy white floor.",
    },
  },
  {
    slug: "bathroom-in-progress",
    title: "Bathroom in progress",
    room: "Bathroom",
    changed: "Only the before photo has come in so far.",
    before: {
      image: photo("bathroom1-before_purevisioncontractors.jpeg"),
      alt: "A bathroom during demolition: bare patched walls and old floor tile.",
    },
  },
]

/** Projects with both photos, for layouts that need a pair. */
export const pairs = projects.filter(
  (project): project is MockProject & { after: Shot } => Boolean(project.after),
)
