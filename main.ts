import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

// Bounty gate: the entry must be a single line of 1-200 characters.
// Length is measured on the trimmed entry so incidental whitespace
// does not eat into the 200-character budget.
const entry = text.trim();
if (entry.length === 0) throw new Error("entry.txt is empty");
if (entry.length > 200) throw new Error("entry exceeds 200 characters");
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text);
