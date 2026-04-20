# Decision 004: Audit Stage validation (PLACEHOLDER)

**Status:** PLACEHOLDER, to be filled in week 3
**Date:** 2026-04-21 (created)
**Related:** 001, 007, 010

## Context

Audit Stage is the product's core bet for quality-drift prevention. Per office-hours observation, content writers drift off brand and off pedagogy mid-flow and do not notice until very late in a deck, when sunk-cost kicks in and they rationalise past the issue.

The Audit Stage asks the writer, after finishing, to copy an audit prompt into a fresh Claude session, paste their output file, read the audit report, and come back to mark Pass or Fail.

That round-trip is high-friction by design. The hypothesis (writers will do it because the quality return is worth it) is unproven until we run it with a real writer.

## The decision to make (in week 3)

Prototype the Audit Stage on one playbook first: Teaching Material PPT Builder. Run the full round-trip with one real writer and one real PPT. Measure:

- Did they complete the audit, or stop partway?
- If stopped, at which step and why (copy the prompt, open Claude, paste, wait for report, read it, return, mark decision)?
- If completed, what did the audit catch that the writer had missed?

## Decision gate, end of week 3

- **If validated:** replicate audit prompts across the remaining five playbooks. Content work (writing each playbook-specific audit prompt), not engineering. Roughly 1-2 hours per playbook.
- **If not validated:** redesign based on observed friction. Possible redesigns depending on what broke:
  - The tool-switching itself is the blocker: try a compressed variant (textarea + "open Claude.ai in a new tab with my output in clipboard" single-click).
  - The audit report feels like extra work: simplify the report format the audit prompt requests.
  - The writer does not want Claude to see their draft before Ritu does: this is a policy question, not a UX one. Escalate to Ritu.
  - Time pressure: make the audit skippable explicitly with "defer audit" affordance, log who skips and follow up.

Log the observation, the decision, and the specific friction mode in this file when the test runs.

## Validation test script (draft, week 3 Anish to run)

1. Pick one content writer (ideally Priya or whoever has the most natural task coming up).
2. Give them a real topic, grade, and programme brief. Do not brief them on the audit stage; let them discover it.
3. Sit behind them. Bite tongue.
4. At the Audit Stage, watch what they do. Time each sub-step. Note hesitations.
5. After: ask "what would make this easier?" and "would you skip this if we didn't know?"
6. Write answers in this file with date.

## Revisit when

The validation test runs (target week 3). This file is not complete until that happens.
