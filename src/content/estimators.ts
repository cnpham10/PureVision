import type {
  EstimatorCategory,
  EstimatorQuestion,
} from "@/lib/estimator/types"

/**
 * Draft estimator questions, written for a remodeler around Delray Beach,
 * Florida. They follow the order of a proven online estimator (what you are
 * planning, the room, the details, the finish, then the home and timing) in
 * our own words. Every service, question and answer is a draft to confirm
 * with the client. Do not add prices here, and do not describe how the
 * client works (visits, measuring, samples) until the client confirms it.
 */

const propertyQuestion: EstimatorQuestion = {
  id: "home",
  title: "What type of property is it?",
  mode: "single",
  layout: "compact",
  required: true,
  options: [
    { id: "house", title: "Single-family house" },
    { id: "townhouse", title: "Townhouse" },
    {
      id: "condo",
      title: "Condo or villa",
      description: "The association may need to approve the work",
    },
    { id: "rental", title: "Rental property" },
  ],
}

const timingQuestion: EstimatorQuestion = {
  id: "timing",
  title: "When would you like to start?",
  mode: "single",
  layout: "compact",
  required: true,
  options: [
    { id: "soon", title: "As soon as possible" },
    { id: "months-1-3", title: "In 1 to 3 months" },
    { id: "months-3-6", title: "In 3 to 6 months" },
    { id: "planning", title: "Just planning for now" },
  ],
}

export const estimators: EstimatorCategory[] = [
  {
    slug: "bathroom",
    title: "Bathroom remodel",
    description:
      "Showers, tubs, vanities and tile, from a few new pieces to a full rebuild.",
    icon: "bathroom",
    questions: [
      {
        id: "scope",
        title: "What are you planning?",
        description: "Pick the closest match. You can change it later.",
        mode: "single",
        layout: "text",
        required: true,
        options: [
          {
            id: "refresh",
            title: "Freshen it up",
            description:
              "Paint, a new vanity, faucets, mirror and lights. The tile stays.",
            icon: "refresh",
          },
          {
            id: "update",
            title: "Update the main pieces",
            description:
              "A new shower or tub, tile and fixtures. The plumbing stays where it is.",
            icon: "update",
          },
          {
            id: "remodel",
            title: "Full remodel",
            description: "Down to the studs and rebuilt on the same floor plan.",
            icon: "rebuild",
          },
          {
            id: "reconfigure",
            title: "Remodel with a new layout",
            description:
              "Down to the studs, with the shower, toilet or vanity in a new place.",
            icon: "reconfigure",
          },
        ],
      },
      {
        id: "room",
        title: "Which bathroom is this for?",
        mode: "single",
        layout: "compact",
        required: true,
        options: [
          {
            id: "primary",
            title: "Primary bath",
            description: "Part of the primary suite",
          },
          { id: "guest", title: "Guest or hall bath" },
          {
            id: "half",
            title: "Powder room",
            description: "No shower or tub",
          },
          {
            id: "pool",
            title: "Pool bath",
            description: "Opens to the patio or pool",
          },
        ],
      },
      {
        id: "size",
        title: "Roughly what size is the room?",
        description: "A rough guess is fine.",
        mode: "single",
        layout: "compact",
        required: true,
        options: [
          { id: "small", title: "Small", description: "Up to about 45 sq ft" },
          { id: "medium", title: "Medium", description: "45 to 75 sq ft" },
          { id: "large", title: "Large", description: "Over 75 sq ft" },
          { id: "unsure", title: "Not sure" },
        ],
      },
      {
        id: "include",
        title: "What should the work include?",
        description: "Select everything that applies.",
        mode: "multiple",
        layout: "compact",
        required: false,
        showWhen: {
          questionId: "scope",
          optionIds: ["update", "remodel", "reconfigure"],
        },
        options: [
          { id: "walk-in-shower", title: "Walk-in shower" },
          { id: "bathtub", title: "New bathtub" },
          { id: "vanity", title: "Vanity and top" },
          { id: "wall-tile", title: "Wall tile" },
          { id: "floor-tile", title: "Floor tile" },
          { id: "toilet", title: "New toilet" },
          { id: "lighting", title: "Lighting and fan" },
          { id: "grab-bars", title: "Grab bars and a seat" },
        ],
      },
      {
        id: "finish",
        title: "Which finish suits you?",
        mode: "single",
        layout: "descriptive",
        required: true,
        options: [
          {
            id: "essential",
            title: "Essential",
            description:
              "Ceramic or standard porcelain tile on the floor and shower walls, a stock vanity, and everyday fixtures.",
          },
          {
            id: "upgraded",
            title: "Upgraded",
            description:
              "Porcelain tile, a quartz or granite vanity top, a glass shower enclosure, and better fixtures.",
          },
          {
            id: "premium",
            title: "Premium",
            description:
              "Large-format porcelain or natural stone on the floors and walls, a custom vanity, and designer fixtures.",
          },
          { id: "undecided", title: "Not sure yet" },
        ],
      },
      propertyQuestion,
      timingQuestion,
    ],
  },
  {
    slug: "kitchen",
    title: "Kitchen remodel",
    description:
      "Cabinets, countertops, appliances and layout, from new surfaces to a full rebuild.",
    icon: "kitchen",
    questions: [
      {
        id: "scope",
        title: "What are you planning?",
        description: "Pick the closest match. You can change it later.",
        mode: "single",
        layout: "text",
        required: true,
        options: [
          {
            id: "refresh",
            title: "Refresh what is there",
            description:
              "Paint or reface the cabinets, with new hardware, faucet and lights.",
            icon: "refresh",
          },
          {
            id: "update",
            title: "Replace the surfaces",
            description:
              "New countertops, backsplash, sink and some appliances. The cabinets stay.",
            icon: "update",
          },
          {
            id: "remodel",
            title: "Full remodel",
            description:
              "New cabinets, countertops and finishes on the same floor plan.",
            icon: "rebuild",
          },
          {
            id: "reconfigure",
            title: "Remodel with a new layout",
            description:
              "Move the sink or range, add an island or open up a wall.",
            icon: "reconfigure",
          },
        ],
      },
      {
        id: "size",
        title: "Roughly what size is your kitchen?",
        description: "A rough guess is fine.",
        mode: "single",
        layout: "compact",
        required: true,
        options: [
          {
            id: "small",
            title: "Small",
            description: "Galley or under 100 sq ft",
          },
          { id: "medium", title: "Medium", description: "100 to 200 sq ft" },
          {
            id: "large",
            title: "Large",
            description: "Over 200 sq ft or open plan",
          },
          { id: "unsure", title: "Not sure" },
        ],
      },
      {
        id: "cabinets",
        title: "What kind of cabinets?",
        mode: "single",
        layout: "descriptive",
        required: true,
        showWhen: { questionId: "scope", optionIds: ["remodel", "reconfigure"] },
        options: [
          {
            id: "stock",
            title: "Stock",
            description: "Standard sizes and colors, and the shortest wait.",
          },
          {
            id: "semi-custom",
            title: "Semi-custom",
            description: "More sizes, finishes and storage inside.",
          },
          {
            id: "custom",
            title: "Custom-built",
            description: "Made to measure for this kitchen.",
          },
          { id: "undecided", title: "Not sure yet" },
        ],
      },
      {
        id: "countertops",
        title: "Which countertops?",
        mode: "single",
        layout: "compact",
        required: true,
        showWhen: {
          questionId: "scope",
          optionIds: ["update", "remodel", "reconfigure"],
        },
        options: [
          { id: "quartz", title: "Quartz" },
          { id: "granite", title: "Granite" },
          { id: "quartzite", title: "Quartzite or marble" },
          { id: "undecided", title: "Not sure yet" },
        ],
      },
      {
        id: "extras",
        title: "What should the work include?",
        description: "Select everything that applies.",
        mode: "multiple",
        layout: "compact",
        required: false,
        options: [
          { id: "island", title: "Kitchen island" },
          { id: "appliances", title: "New appliances" },
          { id: "backsplash", title: "Tile backsplash" },
          { id: "sink", title: "Sink and faucet" },
          { id: "lighting", title: "New lighting" },
          { id: "flooring", title: "New flooring" },
          { id: "pantry", title: "Pantry storage" },
          { id: "bar", title: "Coffee or wet bar" },
        ],
      },
      {
        id: "finish",
        title: "Which finish suits you?",
        mode: "single",
        layout: "descriptive",
        required: true,
        options: [
          {
            id: "essential",
            title: "Essential",
            description:
              "Laminate or basic quartz counters, a ceramic or standard tile backsplash, and stock cabinet finishes.",
          },
          {
            id: "upgraded",
            title: "Upgraded",
            description:
              "Quartz or granite counters, a porcelain tile backsplash, soft-close drawers, and better cabinet hardware.",
          },
          {
            id: "premium",
            title: "Premium",
            description:
              "Quartzite, marble, or another statement stone, large-format or handmade tile, and custom cabinet materials.",
          },
          { id: "undecided", title: "Not sure yet" },
        ],
      },
      propertyQuestion,
      timingQuestion,
    ],
  },
]

export function getEstimator(slug: string) {
  return estimators.find((category) => category.slug === slug)
}
