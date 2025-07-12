export function part1(input: string): string {
  const split = input.split("\n")
  const modifiers = split.map((it) => Number.parseInt(it))

  return modifiers.reduce((acc, curr) => acc + curr, 0).toString()
}

export function part2(input: string): string {
  const split = input.split("\n")
  const modifiers = split.map((it) => Number.parseInt(it))

  const seen = new Set<number>([0])
  let current = 0

  for (let i = 0; i < 1_000_000; i++) {
    for (const modifier of modifiers) {
      current += modifier

      if (seen.has(current)) {
        return current.toString()
      }

      seen.add(current)
    }
  }

  return ""
}
