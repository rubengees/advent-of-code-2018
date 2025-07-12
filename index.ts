import endent from "endent"

const [command, dayArg] = process.argv.slice(2)
const isLegacyMode = !dayArg

const helpMessage = endent`
  Usage: 
    bun start <command> [options]
    
  Commands:
    run <day>    Run the solution for the specified day
    new <day>    Create a new solution template for the specified day
    help         Show this help message

  Example:
    bun start run 1     Run solution for day 1
    bun start new 2     Create solution template for day 2
`

async function main() {
  if (!command || command === "help") {
    console.log(helpMessage)
    process.exit(0)
  }

  if (isLegacyMode) {
    return handleRun(command)
  }

  switch (command) {
    case "run":
      return handleRun(dayArg)
    case "new":
      return handleNew(dayArg)
    default:
      console.log(helpMessage)
      process.exit(1)
  }
}

async function handleRun(dayArg: string) {
  const day = validateDay(dayArg)

  const input = await readInput()
  const dayScript = await loadDay(day)

  if (!dayScript) {
    console.log("Not implemented")
    process.exit(0)
  }

  if (typeof dayScript.part1 === "function") {
    const startTime = performance.now()
    const result = dayScript.part1(input) || "<empty>"
    const duration = Math.round(performance.now() - startTime)

    console.log(`Part 1: ${result} (${duration}ms)`)
  } else {
    console.log("Part 1: Not implemented")
  }

  if (typeof dayScript.part2 === "function") {
    const startTime = performance.now()
    const result = dayScript.part2(input) || "<empty>"
    const duration = Math.round(performance.now() - startTime)

    console.log(`Part 2: ${result} (${duration}ms)`)
  } else {
    console.log("Part 2: Not implemented")
  }
}

async function handleNew(dayArg: string) {
  const day = validateDay(dayArg)

  const srcFile = Bun.file(`${import.meta.dir}/src/day${day}.ts`)
  const testFile = Bun.file(`${import.meta.dir}/test/day${day}.spec.ts`)

  const [srcExists, testExists] = await Promise.all([srcFile.exists(), testFile.exists()])

  if (srcExists || testExists) {
    console.error(`Files for day ${day} already exist`)
    process.exit(1)
  }

  const srcTemplate = endent`
    export function part1(input: string): string {
      return ""
    }

    export function part2(input: string): string {
      return ""
    }
  `

  const testTemplate = endent`
    import { expect, test } from "bun:test"
    import endent from "endent"
    import { part1, part2 } from "../src/day${day}"
 
    test("part 1 example", () => {
      const input = endent\`
        TODO
      \`

      expect(part1(input)).toEqual("TODO")
    })
 
    test("part 2 example", () => {
      const input = endent\`
        TODO
      \`

      expect(part2(input)).toEqual("TODO")
    })
  `

  await Promise.all([Bun.write(srcFile, srcTemplate), Bun.write(testFile, testTemplate)])

  console.log(`Created files for day ${day}`)
}

type DayScript = {
  part1(input: string): string
  part2(input: string): string
}

function validateDay(dayArg: string) {
  const day = Number(dayArg)

  if (Number.isNaN(day) || day < 1 || day > 25) {
    console.error("Please provide a day number between 1 and 25.")
    process.exit(1)
  }

  return day
}

async function readInput() {
  const file = Bun.file(`${import.meta.dir}/input.txt`)

  if (!(await file.exists())) {
    console.error("input.txt file is missing")
    process.exit(1)
  }

  try {
    const result = await file.text()
    const trimmed = result.trim()

    if (trimmed.length === 0) {
      console.error("input.txt is empty")
      process.exit(1)
    }

    return trimmed
  } catch (err) {
    console.error(`Could not read input.txt: ${err}`)
    process.exit(1)
  }
}

async function loadDay(day: number): Promise<DayScript | null> {
  const filePath = `${import.meta.dir}/src/day${day}.ts`
  const file = Bun.file(filePath)

  if (!(await file.exists())) return null

  try {
    return await import(filePath)
  } catch (err) {
    console.error(`Could not import day ${day} script: ${err}`)
    process.exit(1)
  }
}

main().catch(console.error)
