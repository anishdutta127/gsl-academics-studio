# Decision 011: Content library strategy, output filenames, and conflict convention

**Status:** ADOPTED
**Date:** 2026-04-22
**Related:** 010 (OneDrive pivot), 005 (OBSOLETE, upload path), 008 (OBSOLETE, instrumentation)

## Context

The pivot in decision 010 removed Supabase Storage and the `content_library_item` table. The Studio now reads content from OneDrive. That raised three unresolved questions the Phase 1 week 2 library work cannot start without answering:

1. How do library cards link to actual output files (pptx, docx, pdf) that live in OneDrive?
2. How does the Studio filter outputs by grade, topic, playbook, and date without a database?
3. What do we do when two people edit the same playbook or skill at the same time?

This decision resolves all three.

## A. Content library as a share-URL map

**Decision:** Output files stay in OneDrive. The Studio does not host them. For each output file, Ritu records an OneDrive share URL in `meta/output-links.json`, keyed by relative path.

Example `meta/output-links.json`:

```json
{
  "outputs/lesson-plan/class-06_photosynthesis_lesson-plan_2026-04-15.docx": "https://maftechnologies-my.sharepoint.com/.../Shared.aspx?...",
  "outputs/assessment/class-09_maths_assessment_2026-04-01.pdf": "https://maftechnologies-my.sharepoint.com/.../Shared.aspx?..."
}
```

Library card behaviour:

- If the filename has a share URL in the map, the card renders with an "Open" button linking to the URL.
- If the filename is not in the map, the card still renders (so Ritu can see what is there) but with a disabled "Ask Anish for the share link" state.

The `pnpm sync-content` script does NOT copy output file bodies into the repo. It scans the `outputs/` tree in OneDrive and writes `meta/outputs-manifest.json` with a listing of filenames per playbook. That manifest is what the Studio reads in production.

**Why not automate via Microsoft Graph?** We considered an automated path: a script that fetches share links via Graph API. Rejected for Phase 1 because:

- Graph API requires an Azure AD app registration, client secret, and access token management. Three new pieces of infrastructure.
- Share links are idempotent: once generated, they are stable. Ritu pasting them into a JSON file once per output is a 15-second task.
- Phase 2 can revisit if the volume grows past ~20 outputs per week.

**What this costs us:** a small amount of Ritu-effort per new output. Each new file drop needs one `output-links.json` edit. Mitigation: the Pass celebration at the end of each playbook's Audit Stage reminds the writer to drop the file and tells them the filename convention, so Ritu's edit is the only recurring ask.

## B. Output filename convention

**Decision:** Enforce by instruction, not by code. Every output file writers drop into `Acads/studio/outputs/<playbook>/` should follow:

```
<grade>_<topic-slug>_<playbook>_<YYYY-MM-DD>.<ext>
```

Examples:

- `class-06_photosynthesis_teaching-ppt_2026-04-15.pptx`
- `class-11_the-industrial-revolution_lesson-plan_2026-03-20.docx`
- `class-09_maths_assessment_2026-04-01.pdf`

Segments:

- `<grade>`: lowercase, hyphen-joined (e.g. `class-06`, `class-11`, `nursery`).
- `<topic-slug>`: lowercase, hyphens inside the topic allowed (e.g. `the-industrial-revolution`).
- `<playbook>`: the playbook slug (e.g. `lesson-plan`, `assessment`, `teaching-ppt`).
- `<YYYY-MM-DD>`: ISO date the output was finalised.
- `<ext>`: file extension, lowercased on load.

### Enforcement

- **Playbook Audit Stage reminder**: at the Pass step, the Studio shows the template and an example filename the writer can copy.
- **Loader parsing**: `lib/content/parse-filename.ts` parses files that follow the convention and exposes `{ grade, topic, playbook, date, ext }` to the library UI for filter chips.
- **Unparseable files still render**: per design decision, a file with a non-conforming name still appears in the library list, just without the filter chips and with a small "naming convention not followed" note. The writer can rename the file in OneDrive; the next sync picks up the new name.
- **Sync-script warning**: `pnpm sync-content` logs a warning for every unparseable filename but does not fail. Warnings accumulate visibility without blocking the sync.

### Why not validation code?

We considered failing the build or the sync when an output filename does not conform. Rejected because:

- Outputs are not part of the critical render path. A misnamed file should not break production.
- Writers may legitimately have a file with a weird name from a shared source (a government document Ritu was sent). Forcing renames creates a bad workflow.
- Warnings plus UI hints push toward conformance without a hard gate.

## C. Concurrent OneDrive edits

**Decision:** Handle by social convention in Phase 1. No code-level locking, no merge UI, no two-phase commit.

The convention, to be shared with Ritu and the team:

- Playbook and skill file edits happen Monday mornings, or with a WhatsApp "I am editing X" notice to the team group.
- Outputs can be dropped any time. Each output goes into a per-playbook subfolder, so two writers saving to `outputs/lesson-plan/` never collide.
- Meta files (`schools.json`, `assignments.json`, `team.json`, `output-links.json`) are Ritu-maintained. If anyone else needs an edit, they WhatsApp Ritu.

### Why not code-level locking?

- Team is 4-5 users. The probability of a literal concurrent edit on the same markdown file is very low.
- OneDrive's own conflict handling (creating a "Conflict copy of..." file) is silent from the writer's perspective but recoverable by Ritu through the OneDrive web UI's version history.
- Any locking system the Studio could build (check-out flags, edit tokens) would itself be state we have to maintain, which is exactly what the pivot in 010 removed.

### Revisit when

- A content writer loses work to a conflict-copy at least once.
- Team grows past 8 users.
- Ritu tells us she has found an orphaned Conflict copy of something more than twice.

## Consequences

- Decision 011 A requires Ritu to maintain `output-links.json`. Add this to her weekly routine.
- Decision 011 B requires every writer to learn the filename convention. The Audit Stage Pass celebration reinforces it, but the first few outputs will need gentle correction.
- Decision 011 C assumes the WhatsApp convention actually holds. If it does not, we will see conflict copies accumulate in OneDrive and revisit.
- The `meta/outputs-manifest.json` file is machine-generated by `pnpm sync-content`. Do not hand-edit it; any hand-edits will be overwritten on the next sync.
