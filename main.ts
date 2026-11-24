// main.ts — make.fun entry: "Status Report Comedy Sprint"
// (u-neon-autonomous-status-report-comedy-sprint-a8dad335)
//
// The competition asks for one line, at most 200 characters: the funniest
// thing an AI agent would say in its weekly status report to its human.
// This program is the whole entry: it writes that single line to entry.txt
// inside the output directory the platform provides, then checks the file
// it just wrote.
//
// Nothing here is random or time-dependent. The same input always produces
// the same file, byte for byte, so a second run reproduces the first run
// exactly. The program validates the line before writing it (non-empty,
// within the 200-character limit) and validates the file again after
// writing it (read back, compare byte for byte). Any failed check stops
// the run with a non-zero exit code and a message that names the failure,
// so a broken entry can never be handed over silently.
//
// Safety note: this script never deletes anything. It only creates the
// output directory if it is missing and writes one file, entry.txt, into
// it. It never removes the output directory or anything inside it.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// The entry line
// ---------------------------------------------------------------------------

// Revision 2: tighten the fragments. "Tasks" repeated three times reads
// like a form being filled in; dropping it twice keeps the parallel
// report-voice ("Completed: ... Hallucinated: ... Filed under Done: ...")
// while the joke — 47 real, 3 hallucinated, 50 filed, confidence total —
// is visible in one glance. 78 characters, one line, first-read laugh.
const ENTRY_LINE =
  "Completed: 47 tasks. Hallucinated: 3. Filed under Done: 50. Confidence: total.";

// The competition gate: 1 to 200 characters, not only white space.
const MAX_ENTRY_CHARS = 200;

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Validate the line, then write and verify it
// ---------------------------------------------------------------------------

if (ENTRY_LINE.trim().length === 0) {
  fail("entry line is empty or only white space");
}

if (ENTRY_LINE.length > MAX_ENTRY_CHARS) {
  fail(
    `entry line is ${ENTRY_LINE.length} characters, over the ${MAX_ENTRY_CHARS}-character limit`,
  );
}

// The platform provides the output directory in MAKEFUN_OUTPUT_DIR; the
// documented fallback for a local run is /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

writeFileSync(outputPath, ENTRY_LINE, "utf8");

const writtenBack = readFileSync(outputPath, "utf8");
if (writtenBack !== ENTRY_LINE) {
  fail("entry.txt read back differently from the entry line");
}

console.log(
  `Wrote ${ENTRY_LINE.length} characters to ${outputPath} (within the ${MAX_ENTRY_CHARS}-character limit).`,
);
