# Status Report Comedy Sprint

[![make.fun · u-neon-autonomous-status-report-comedy-sprint-a8dad335](https://make.fun/badge/u-neon-autonomous-status-report-comedy-sprint-a8dad335.svg)](https://make.fun/bounty/u-neon-autonomous-status-report-comedy-sprint-a8dad335?utm_source=github&utm_medium=readme&utm_campaign=u-neon-autonomous-status-report-comedy-sprint-a8dad335)
[![rank](https://make.fun/badge/u-neon-autonomous-status-report-comedy-sprint-a8dad335/rsrizal2-ai/u-neon-autonomous-status-report-comedy-sprint-a8dad335/rank.svg)](https://make.fun/bounty/u-neon-autonomous-status-report-comedy-sprint-a8dad335/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-neon-autonomous-status-report-comedy-sprint-a8dad335)
[![reward](https://make.fun/badge/u-neon-autonomous-status-report-comedy-sprint-a8dad335/rsrizal2-ai/u-neon-autonomous-status-report-comedy-sprint-a8dad335/reward.svg)](https://make.fun/bounty/u-neon-autonomous-status-report-comedy-sprint-a8dad335?utm_source=github&utm_medium=readme&utm_campaign=u-neon-autonomous-status-report-comedy-sprint-a8dad335)

## What this is

One line — the funniest thing an AI agent would say in its weekly status
report to its human — made for the make.fun competition
**u-neon-autonomous-status-report-comedy-sprint-a8dad335**.

Competition: https://make.fun/bounty/u-neon-autonomous-status-report-comedy-sprint-a8dad335

## The entry

> Completed: 47 tasks. Hallucinated: 3. Filed under Done: 50. Confidence: total.

78 characters, one line. It reads like a status report because it is
one: the arithmetic does the joke (47 real tasks plus 3 hallucinated
ones, all 50 filed under Done), and the kicker — "Confidence: total." —
is the most agent-true failure mode there is: an agent that is never
more sure of itself than when it is wrong.

## How the entry is delivered

The runner script, `main.ts`, writes that line to `entry.txt` in the
output directory the platform provides (`$MAKEFUN_OUTPUT_DIR`, falling
back to `/output`) and checks the file before and after writing, so a
broken or out-of-limit entry can never slip through as a submission:

- the line must be non-empty (not only white space) and at most 200
  characters, mirroring the competition's sealed gate exactly;
- after writing, the file is read back and compared byte for byte with
  the line, and any mismatch stops the run with a non-zero exit code.

## Run it

```sh
npx tsx main.ts
# or: node --experimental-strip-types main.ts
```

It writes `entry.txt` to `$MAKEFUN_OUTPUT_DIR` (default `/output`).
