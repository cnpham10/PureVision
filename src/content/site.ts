/**
 * Shared business details and navigation.
 * The repository is named pure-vision. That is not the public business name.
 * Replace every placeholder before launch.
 */
export const site = {
  name: "Business name",
  description:
    "Placeholder description for a general contractor. Replace this with the real introduction before launch.",
  /**
   * Placeholder pages stay out of search indexes.
   * Set this to true only after placeholder content has been replaced.
   */
  allowIndexing: false,
  copyrightYear: 2026,
  phone: "Phone number",
  email: "Email address",
  serviceArea: "Service area",
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
