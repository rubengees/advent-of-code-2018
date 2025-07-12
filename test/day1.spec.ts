import { expect, test } from "bun:test"
import endent from "endent"
import { part1, part2 } from "../src/day1"

test("part 1 example", () => {
  const input = endent`
    +1
    -2
    +3
    +1
  `

  expect(part1(input)).toEqual("3")
})

test("part 2 example 1", () => {
  const input = endent`
    +1
    -1
  `

  expect(part2(input)).toEqual("0")
})

test("part 2 example 2", () => {
  const input = endent`
    +3,
    +3,
    +4,
    -2,
    -4
  `

  expect(part2(input)).toEqual("10")
})

test("part 2 example 3", () => {
  const input = endent`
    -6,
    +3,
    +8,
    +5,
    -6
  `

  expect(part2(input)).toEqual("5")
})

test("part 2 example 4", () => {
  const input = endent`
    +7,
    +7,
    -2,
    -7,
    -4
  `

  expect(part2(input)).toEqual("14")
})
