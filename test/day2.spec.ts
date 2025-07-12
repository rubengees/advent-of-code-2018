import { expect, test } from "bun:test"
import endent from "endent"
import { part1, part2 } from "../src/day2"

test("part 1 example", () => {
  const input = endent`
    abcdef
    bababc
    abbcde
    abcccd
    aabcdd
    abcdee
    ababab
  `

  expect(part1(input)).toEqual("12")
})

test("part 2 example", () => {
  const input = endent`
    abcde
    fghij
    klmno
    pqrst
    fguij
    axcye
    wvxyz
  `

  expect(part2(input)).toEqual("fgij")
})
