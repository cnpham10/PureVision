/**
 * Icon names content can use. Components map each name to a drawing, so
 * this file stays free of JSX and can be imported by tests.
 */
export const estimatorIconNames = [
  "mark",
  "bathroom",
  "kitchen",
  "refresh",
  "update",
  "rebuild",
  "reconfigure",
  "something-else",
] as const

export type EstimatorIconName = (typeof estimatorIconNames)[number]
