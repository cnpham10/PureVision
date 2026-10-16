import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  priceBathroomAnswers,
  priceBathroomSelection,
  type BathroomSelection,
} from "../../src/lib/estimator/pricing.ts"

const base: BathroomSelection = {
  job: "rebuild",
  bath: "primary",
  size: "medium",
  shower: "new",
  sink: "one",
  tile: "all",
  move: "yes",
  finish: "standard",
  materials: "self",
  tub: "new",
  addons: [],
}

describe("bathroom pricing engine", () => {
  it("matches the bedroom-bath rebuild anchor", () => {
    const range = priceBathroomSelection(base)
    assert.deepEqual([range.low, range.high, range.weeks], [15500, 20000, "3–4"])
  })

  it("matches the main-bath rebuild anchor", () => {
    const range = priceBathroomSelection({ ...base, bath: "main" })
    assert.deepEqual([range.low, range.high, range.weeks], [14000, 18000, "3–4"])
  })

  it("matches the replace-parts anchor", () => {
    const range = priceBathroomSelection({
      ...base,
      job: "replace",
      bath: "main",
      shower: "tub2sh",
      tile: "shower",
      tub: "none",
    })
    assert.deepEqual([range.low, range.high, range.weeks], [8500, 11000, "2–3"])
  })

  it("prices the existing bathroom cards", () => {
    const range = priceBathroomAnswers({
      scope: ["remodel"],
      room: ["primary"],
      size: ["medium"],
      include: ["walk-in-shower", "vanity", "floor-tile", "wall-tile", "bathtub"],
      finish: ["essential"],
    })
    assert.ok(range)
    assert.equal(range.low <= range.high, true)
    assert.match(range.weeks, /3–4/)
  })

  it("treats a new layout as moving the fixtures", () => {
    const samePlaces = priceBathroomAnswers({ scope: ["remodel"], finish: ["essential"] })
    const moved = priceBathroomAnswers({ scope: ["reconfigure"], finish: ["essential"] })
    assert.ok(samePlaces && moved)
    assert.equal(moved.midpoint > samePlaces.midpoint, true)
  })

  it("raises the range for a luxury finish", () => {
    const standard = priceBathroomAnswers({ scope: ["refresh"], finish: ["essential"] })
    const luxury = priceBathroomAnswers({ scope: ["refresh"], finish: ["premium"] })
    assert.ok(standard && luxury)
    assert.equal(luxury.midpoint > standard.midpoint, true)
  })

  it("does not price a bathroom until a scope is chosen", () => {
    assert.equal(priceBathroomAnswers({}), null)
  })
})
