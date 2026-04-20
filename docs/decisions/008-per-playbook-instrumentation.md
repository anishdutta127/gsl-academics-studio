# Decision 008: Per-playbook instrumentation (OBSOLETE)

**Status:** OBSOLETE, superseded by [010](./010-onedrive-content-source-pivot.md)
**Date original:** 2026-04-21
**Date superseded:** 2026-04-22

## What this originally recorded

Under the Supabase-backed plan, Phase 1 was going to include per-playbook funnel instrumentation to answer "which playbooks are getting real use and which are not, and where do users drop off inside a playbook". Three append-only event tables:

- `copy_event` (user_id, playbook_id, step_id, timestamp), inserted on every prompt copy-button click.
- `playbook_view_event` (user_id, playbook_id, timestamp, session_id), inserted on every reader page render, deduped per session.
- `audit_event` (user_id, playbook_id, phase enum opened/passed/failed, timestamp), inserted at each Audit Stage transition.

An admin-only dashboard at `/studio/admin/usage` aggregated these into a funnel table per playbook. The instrumentation was must-ship; the dashboard itself was polish-ship (Anish could query Supabase directly if week 6 ran short).

## Why obsolete

The architecture pivot in 010 removes the database entirely. There is nowhere to insert events into. There is no user identity beyond a localStorage name prompt, so even if we wanted client-side event capture, we cannot tie events to individuals in any durable way.

The adoption signal is now qualitative (see [006](./006-adoption-metric.md)): Ritu's interview answer at each check-in.

## What we lose

- Per-playbook drop-off analysis (views → copies → audit-reached → audit-passed → library-saved).
- Ability to distinguish "no one opens this playbook" from "people open but do not copy past step 1".
- Objective data in conversations about which playbook to invest in next.

## Phase 2 path if we want this back

If adoption grows and the team wants funnel data:

- Option A: Plausible or Fathom for page-view funnels. Privacy-friendly, no PII. Gets view counts but not copy events or audit phases.
- Option B: Minimal serverless function (Next.js route handler) that accepts event POSTs and appends to a Google Sheet Ritu owns. Zero-DB solution, ~30 lines of code, gives full funnel.
- Option C: If we reintroduce a database for other reasons, re-spec this decision against that database.

## Where to read now

See [010](./010-onedrive-content-source-pivot.md).
