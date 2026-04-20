# Decision 012: The Standards System

**Status:** ADOPTED
**Date:** 2026-04-22
**Related:** 010 (OneDrive pivot), 011 (share-URL pattern + filename convention), 007 (audit scope), 004 (audit validation)

## Context

A playbook tells a writer how to make something. It does not show what *great* looks like. Without a visible reference, "good" drifts toward "what Claude generated and the writer accepted." The same drift the Audit Stage exists to catch.

The pivot in decision 010 removed the in-app editor and database. We need a way for Ritu and the team to declare "this specific output is the bar" without rebuilding either.

## Decision

Each playbook has a **current standard**: one reference output the team agrees represents excellence right now. Standards live in OneDrive alongside playbooks. The Studio reads them and:

1. Renders a **"The Bar"** card on each playbook detail page (after the hero, before "Use this when").
2. Renders a dedicated **/standards** page showing all current bars at a glance.
3. Injects current-bar context into the **Audit Stage** prompt the writer copies into Claude.
4. Surfaces a **"Propose a new standard"** affordance on every playbook page.

Standards evolve via team proposals. Phase 1 promotion is manual: Ritu (or Anish) moves files between folders in OneDrive. Phase 2 may add an admin UI.

## OneDrive folder structure

For each of the seven Phase 2 playbook slugs:

```
Acads/studio/standards/
  teaching-ppt/
    current/      ← exactly one rationale.md + zero-or-one reference file
    proposals/    ← any number of {filename}.md + reference files awaiting review
    archive/      ← past current/ snapshots, dated subfolders
  lesson-plan/   (same shape)
  assessment/    (same shape)
  carousel/      (same shape; new playbook this week, see below)
  delivery-script/   (same shape)
  cbse-summary/  (same shape)
  product-note/  (same shape)
```

All folders start empty in week 2. The empty-state UI (component `the-bar-empty.tsx`) handles this gracefully and is the expected initial state.

## File schema

### `current/rationale.md`

YAML frontmatter + markdown body. Schema (Zod-validated by the loader):

```markdown
---
set_by: Ritu Sharma
set_on: 2026-04-22
topic: Building a simple chatbot
grade: Class 6
programme: STEM/IIT-G
reference_filename: reference.pptx
---

## Key qualities

- One idea per slide, never crowded
- Bloom's level visible on every content slide
- At least three Indian-context examples (Priya's chatbot, Pune's traffic helper, etc.)
- Non-example shown beside every core concept
- Constructive learning prompt every 4 slides

## Why this is the bar

A short paragraph from the person setting the standard. Why does this output represent the quality we want every future PPT from this playbook to match?

A second paragraph if needed, no more.
```

### `current/reference.<ext>`

The actual reference file (pptx, docx, pdf, md). Stays in OneDrive only, never committed to the repo (decision 010 risk 1: same git-bloat constraint as outputs). The Studio links to it via a share URL stored in `meta/output-links.json` under the path `standards/<playbook>/current/<reference_filename>`.

### `proposals/<contributor-slug>-<date>/`

Each proposal lives in its own subfolder so multiple proposals can sit alongside each other:

```
proposals/
  priya-2026-04-25/
    rationale.md     ← same schema as current/rationale.md
    candidate.pptx   ← the reference file the contributor proposes
```

When Ritu approves a proposal, she:

1. Moves `current/*` to `archive/<previous-set-on-date>/` in OneDrive.
2. Moves `proposals/<contributor>-<date>/*` to `current/`.
3. Renames `candidate.<ext>` to `reference.<ext>` to match the new `rationale.md`'s `reference_filename`.
4. Updates `meta/output-links.json` with the share URL for the new `current/reference.<ext>`.
5. Runs `pnpm sync-content` and pushes.

### `archive/<YYYY-MM-DD>/`

Each archived standard sits in a date-stamped subfolder. Same shape as `current/`. Read-only in the UI in Phase 1.

## Loader interface

`lib/content/standards.ts` exposes:

- `getCurrentStandard(playbookSlug): Promise<CurrentStandard | null>` — reads `standards/<playbook>/current/rationale.md`. Returns null when the folder is empty.
- `getStandardProposals(playbookSlug): Promise<StandardProposal[]>` — lists subfolders under `standards/<playbook>/proposals/`, parses each `rationale.md`. For Phase 1, the UI surfaces proposal counts in the admin /standards view (week 3 use); seeded now so the surface lands together.
- `getArchivedStandards(playbookSlug): Promise<ArchivedStandard[]>` — lists subfolders under `standards/<playbook>/archive/` sorted by date desc.

All wrapped in `cache()` like the rest of the loader.

## Sync script

`scripts/sync-content.ts` is extended to copy `standards/` into `./content-synced/`, but with a **file-type filter**: only `.md` and `.json` files are synced. Reference files (`.pptx`, `.docx`, `.pdf`, `.md` named `reference.*` and other non-rationale binaries) stay in OneDrive.

This is the same constraint decision 010 risk 1 enforced for outputs: text-shaped metadata is repo-friendly, large binaries are not.

The Studio links to the actual reference file via `meta/output-links.json`, keyed by the relative path under the studio root (e.g. `standards/teaching-ppt/current/reference.pptx`).

## UI integration

### "The Bar" card on playbook detail pages

Position: between the hero and "Use this when" sections.
Component: `components/standards/the-bar.tsx`.

When a current standard exists:

```
┌─ Orange Peel accent border ──────────────────────────────────┐
│                                                              │
│ THE BAR, set by Ritu Sharma · 3 days ago                     │
│                                                              │
│ Building a simple chatbot · Class 6 · STEM/IIT-G             │
│                                                              │
│ [chip] One idea per slide, never crowded                     │
│ [chip] Bloom's level visible on every content slide          │
│ [chip] At least three Indian-context examples                │
│ [chip] Non-example shown beside every core concept           │
│ [chip] Constructive learning prompt every 4 slides           │
│                                                              │
│ [ See the example → ]    [ Read the rationale → ]            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

When no current standard exists:

Component: `components/standards/the-bar-empty.tsx`. Warm copy:

```
┌──────────────────────────────────────────────────────────────┐
│ No bar yet.                                                  │
│ The first great output from this playbook becomes our        │
│ standard. Make something good, then propose it.              │
└──────────────────────────────────────────────────────────────┘
```

### "Propose a new standard" at the end of every playbook page

Component: `components/standards/propose-new-standard.tsx`. Button opens a shadcn `Dialog` with three steps:

1. Drop your candidate output into `Acads/studio/standards/<playbook>/proposals/<your-name>-<today>/`.
2. Add `rationale.md` next to it (template provided in the dialog, copyable).
3. WhatsApp Ritu when it's there.

No upload. No form post. Just instructions and the rationale template.

### /standards page

Grid of seven cards (one per playbook), each showing the current standard at a glance OR the empty state. Top copy: "The bar, right now. This is what good looks like." Sidebar nav adds "Standards" between Skills and Library.

## Audit prompt integration

The existing `audit_prompt_template` field on each playbook is split into:

```yaml
audit_prompt_template:
  prefix: |
    [Text that runs before the criteria, may reference the current standard]
  fallback: |
    [Text used when no current standard exists, falls back to skill-body
     references]
```

The `AuditStage` component composes the runtime prompt:

- If a current standard exists: the prompt opens with "Audit this output against GSL's current bar for [playbook], set by [name] on [date]. The key qualities of our current bar are: [list]. The full reference is at [share URL]. Your output should match or exceed these qualities. Identify specifically where it falls short and suggest fixes." Then continues with the playbook's `audit_prompt_template.prefix`.
- If no current standard exists: the prompt opens with `audit_prompt_template.fallback` (which references the relevant skill bodies and the surface conventions, the same way today's audit prompts do).

Schema break implication: the two already-migrated playbooks (`lesson-plan.md`, `assessment.md`) need their YAML updated atomically with the schema change. Done in commit 13.

## Phase 1 vs Phase 2 split

| Capability | Phase 1 | Phase 2 |
|---|---|---|
| Read current standard | Yes | Yes |
| "The Bar" card on playbook page | Yes | Yes |
| Standards index page | Yes | Yes |
| Audit prompt injects current standard | Yes | Yes |
| Propose-via-OneDrive instructions | Yes | Yes |
| Promote a proposal to current | Manual file move in OneDrive (Ritu) | UI button |
| Archive previous current | Manual (Ritu) | Automatic on promotion |
| Proposal review surface for Ritu | Read-only listing on /standards (week 3) | Full review UI |
| Diff between archived and current | None | Side-by-side compare view |

## Carousel: a 7th playbook this week

The standards system enumerates seven playbook slugs. The original Phase 1 plan named six (teaching-ppt, lesson-plan, assessment, delivery-script, cbse-summary, product-note). Week 2 adds `carousel` (Claude Carousel Generator) as the seventh per the week-2 brief. The week-2 commits 9 through 16 carry the 7-slug expansion through:

- Standards folder structure (this commit) for all 7
- Outputs folder for `carousel` (created when commit 15 ships the playbook)
- Library view filter chips will list 7 playbooks
- Sidebar nav still shows the 6 existing nav items; the playbook list page now lists 7 cards

Decision 010's "what we kept" bullet listed six playbooks; this is a documented expansion, not a contradiction.

## Revisit triggers

Move toward Phase 2 promotion UI when:

- Promotion happens more than twice per month (manual file shuffling becomes tedious).
- A proposal is accidentally lost during a manual move.
- The team grows past 6 active contributors (proposals queue gets crowded).

Replace OneDrive standards storage entirely if:

- Reference files routinely exceed 100MB (very unusual for slide decks, but possible for video standards in Phase 3).

## Consequences

- Sync script grows a `standards/` filter (`.md` and `.json` only).
- A new env-var-or-config concept is not introduced; standards live under the existing `GSL_ONEDRIVE_PATH`.
- `output-links.json` now also keys reference files under `standards/<playbook>/current/`. The semantics are identical: relative path to OneDrive share URL.
- The audit_prompt_template schema changes shape; both currently-migrated playbooks are updated in commit 13.
- "Standards" appears as a new sidebar nav item between Skills and Library.
