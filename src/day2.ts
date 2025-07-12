export function part1(input: string): string {
  const lines = input.split("\n")

  let twoCount = 0
  let threeCount = 0

  for (const line of lines) {
    const counts = new Map<string, number>()

    for (const char of line) {
      counts.set(char, (counts.get(char) ?? 0) + 1)
    }

    if (Array.from(counts.values()).includes(2)) twoCount++
    if (Array.from(counts.values()).includes(3)) threeCount++
  }

  return String(twoCount * threeCount)
}

export function part2(input: string): string {
  const lines = input.split("\n")

  for (let i = 0; i < lines.length; i++) {
    const line1 = lines[i] ?? ""

    for (let j = i + 1; j < lines.length; j++) {
      const line2 = lines[j] ?? ""
      let diffCount = 0

      for (let k = 0; k < line1.length && k < line2.length; k++) {
        if (line1[k] !== line2[k]) {
          diffCount++
        }
      }

      if (diffCount === 1) {
        let result = ""

        for (let k = 0; k < line1.length && k < line2.length; k++) {
          if (line1[k] === line2[k]) {
            result += line1[k]
          }
        }

        return result
      }
    }
  }

  return ""
}
