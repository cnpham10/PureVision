import type { Answers } from "./types"

/**
 * Bathroom pricing from the reference engine.
 * Additions are summed, then multipliers are applied.
 * The shown range is the midpoint times 0.875 and 1.125, rounded to $500.
 * Kitchen answers have no rules in that engine.
 */

type Job = "refresh" | "replace" | "rebuild" | "rebuild_move"
type Bath = "main" | "primary" | "half" | "basement"
type Size = "small" | "medium" | "big" | "unsure"
type Shower = "keep" | "new" | "tub2sh" | "walkin" | "none"
type Sink = "keep" | "one" | "two"
type Tile = "none" | "floor" | "shower" | "all"
type Move = "yes" | "no"
type Finish = "standard" | "premium" | "luxury"
type Materials = "self" | "incl"
type Tub = "keep" | "new" | "remove" | "none"
type Addon = "toilet" | "heat" | "elec" | "fan" | "access"

export type BathroomSelection = {
  job: Job
  bath: Bath
  size: Size
  shower: Shower
  sink: Sink
  tile: Tile
  move: Move
  finish: Finish
  materials: Materials
  tub: Tub
  addons: Addon[]
}

export type PriceRange = {
  low: number
  high: number
  midpoint: number
  weeks: string
}

const SPREAD = [0.875, 1.125] as const
const ROUND_TO = 500

const JOB_ADD: Record<Job, number> = {
  refresh: 800,
  replace: 2250,
  rebuild: 6000,
  rebuild_move: 6500,
}

const BATH_MUL: Record<Bath, number> = {
  main: 1,
  primary: 1.11,
  half: 0.45,
  basement: 1.15,
}

const SIZE_MUL: Record<Size, number> = {
  small: 0.85,
  medium: 1,
  big: 1.3,
  unsure: 1,
}

const SHOWER_ADD: Record<Shower, number> = {
  keep: 0,
  new: 2500,
  tub2sh: 2750,
  walkin: 4000,
  none: 0,
}

const SINK_ADD: Record<Sink, number> = {
  keep: 0,
  one: 1000,
  two: 2000,
}

const TILE_ADD: Record<Tile, number> = {
  none: 0,
  floor: 1250,
  shower: 2250,
  all: 3500,
}

const MOVE_ADD: Record<Move, number> = {
  yes: 1500,
  no: 0,
}

const FINISH_MUL: Record<Finish, number> = {
  standard: 1,
  premium: 1.3,
  luxury: 1.75,
}

const TUB_ADD: Record<Tub, number> = {
  keep: 0,
  new: 1500,
  remove: 500,
  none: 0,
}

const ADDON_ADD: Record<Addon, number> = {
  toilet: 450,
  heat: 900,
  elec: 1200,
  fan: 500,
  access: 1800,
}

const WEEKS: Record<Job, [number, number]> = {
  refresh: [1, 2],
  replace: [2, 3],
  rebuild: [3, 4],
  rebuild_move: [4, 6],
}

const SCOPE_TO_JOB: Record<string, Job> = {
  refresh: "refresh",
  update: "replace",
  remodel: "rebuild",
  reconfigure: "rebuild_move",
}

const ROOM_TO_BATH: Record<string, Bath> = {
  primary: "primary",
  guest: "main",
  half: "half",
  pool: "main",
}

const SIZE_TO_SIZE: Record<string, Size> = {
  small: "small",
  medium: "medium",
  large: "big",
  unsure: "unsure",
}

const FINISH_TO_FINISH: Record<string, Finish> = {
  essential: "standard",
  upgraded: "premium",
  premium: "luxury",
  undecided: "standard",
}

function roundToStep(value: number) {
  return Math.round(value / ROUND_TO) * ROUND_TO
}

function weeksLabel(selection: BathroomSelection) {
  let [low, high] = WEEKS[selection.job]
  if (selection.size === "big") {
    low += 1
    high += 1
  }
  if (selection.bath === "half") {
    low = Math.max(1, low - 1)
    high = Math.max(1, high - 1)
  }
  return low === high ? String(low) : `${low}–${high}`
}

/** Same arithmetic as the reference engine, for one fully specified bathroom. */
export function priceBathroomSelection(selection: BathroomSelection): PriceRange {
  const materialsFactor = selection.materials === "incl" ? 1.25 : 1
  const additions =
    JOB_ADD[selection.job] +
    SHOWER_ADD[selection.shower] +
    SINK_ADD[selection.sink] +
    TILE_ADD[selection.tile] +
    MOVE_ADD[selection.move] +
    TUB_ADD[selection.tub] +
    selection.addons.reduce((sum, addon) => sum + ADDON_ADD[addon], 0)
  const multiplier =
    BATH_MUL[selection.bath] *
    SIZE_MUL[selection.size] *
    FINISH_MUL[selection.finish] *
    materialsFactor
  const midpoint = additions * multiplier

  return {
    low: roundToStep(midpoint * SPREAD[0]),
    high: roundToStep(midpoint * SPREAD[1]),
    midpoint: Math.round(midpoint),
    weeks: weeksLabel(selection),
  }
}

function selected(answers: Answers, questionId: string) {
  return answers[questionId] ?? []
}

function tileChoice(include: string[]): Tile {
  const floor = include.includes("floor-tile")
  const wall = include.includes("wall-tile")
  if (floor && wall) return "all"
  if (wall) return "shower"
  if (floor) return "floor"
  return "none"
}

/**
 * Reads the bathroom cards we already ask.
 * A new layout uses the rebuild-and-move base. Materials stay in that base price.
 */
export function selectionFromAnswers(answers: Answers): BathroomSelection | null {
  const scope = selected(answers, "scope")[0]
  const job = scope ? SCOPE_TO_JOB[scope] : undefined
  if (!job) return null

  const room = selected(answers, "room")[0]
  const size = selected(answers, "size")[0]
  const finish = selected(answers, "finish")[0]
  const include = selected(answers, "include")
  const addons: Addon[] = []
  if (include.includes("toilet")) addons.push("toilet")
  if (include.includes("lighting")) addons.push("elec", "fan")
  if (include.includes("grab-bars")) addons.push("access")

  return {
    job,
    bath: (room && ROOM_TO_BATH[room]) || "main",
    size: (size && SIZE_TO_SIZE[size]) || "unsure",
    shower: include.includes("walk-in-shower") ? "walkin" : "none",
    sink: include.includes("vanity") ? "one" : "keep",
    tile: tileChoice(include),
    move: "no",
    finish: (finish && FINISH_TO_FINISH[finish]) || "standard",
    materials: "self",
    tub: include.includes("bathtub") ? "new" : "none",
    addons,
  }
}

export function priceBathroomAnswers(answers: Answers): PriceRange | null {
  const selection = selectionFromAnswers(answers)
  return selection ? priceBathroomSelection(selection) : null
}

export function formatDollars(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPriceRange(range: PriceRange) {
  if (range.low === range.high) return formatDollars(range.low)
  return `${formatDollars(range.low)} – ${formatDollars(range.high)}`
}
