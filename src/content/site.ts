/**
 * Shared business details and navigation.
 * Replace every remaining placeholder before launch.
 */
export const site = {
  name: "Purevision Contractors",
  /** The registered company, for the copyright line. */
  legalName: "Purevision Contractors, LLC",
  description:
    "Purevision Contractors remodels bathrooms and kitchens, and installs flooring, tile, showers, vanities, and countertops. A tub can become a shower, or a shower can become a tub. Describe the project and add photos when you request an estimate.",
  /**
   * Placeholder pages stay out of search indexes.
   * Set this to true only after placeholder content has been replaced.
   */
  allowIndexing: false,
  copyrightYear: 2026,
  phone: "(561) 405-0305",
  email: "purevisioncontractors@gmail.com",
  serviceArea: "Delray Beach",
  primaryCta: {
    label: "Get a Free Estimate",
    href: "/contact",
  },
  secondaryCta: {
    label: "Explore Our Work",
    href: "/projects",
  },
  navigation: [
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Estimator", href: "/estimate" },
    { label: "About", href: "/about" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const

export type SiteHref =
  | (typeof site.navigation)[number]["href"]
  | (typeof site.legal)[number]["href"]
  | typeof site.primaryCta.href
  | "/"
