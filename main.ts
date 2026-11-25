import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Monday Morning Punchlines — one joke about Monday mornings, at most 200 chars.
// The turn: coffee is the only reason I'm vertical — and it's decaf.
const ENTRY =
  "I woke up Monday and told my coffee, 'You're the only reason I'm vertical.' It said, 'I'm decaf.'";

// Accept either a file path or a directory (then write entry.txt inside it).
function resolveTarget(arg: string | undefined): string {
  const raw = arg ?? "/output/entry.txt";
  try {
    if (statSync(raw).isDirectory()) return join(raw, "entry.txt");
  } catch {
    // Path does not exist yet: treat it as the file to create.
  }
  return raw;
}

function main(): void {
  // Gate: 1 to 200 characters, not only white space, one single line.
  if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
    throw new Error(`entry is ${ENTRY.length} characters; gate requires 1-200`);
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const target = resolveTarget(process.argv[2]);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, ENTRY, "utf8");
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
