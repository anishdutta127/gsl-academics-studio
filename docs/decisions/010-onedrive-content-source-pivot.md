# Decision 010: OneDrive-sourced content, pivot away from Supabase

**Status:** ADOPTED
**Date:** 2026-04-22
**Supersedes:** 002 (editor deferral), 003 (admin bootstrap), 005 (upload path), 008 (per-playbook instrumentation)
**Related:** 001 (no API calls, unchanged), 004 (audit validation, unchanged), 006 (adoption metric, unchanged), 007 (audit scope week 3, unchanged)

## Context

Phase 1 went through three reviews before any code was written:
- **Office-hours** produced the design doc, the problem statement, the six-playbook / three-skill scope, the Audit Stage as a first-class ritual, and the six-week timeline at 3 hrs per day.
- **Plan-eng-review** locked in Approach B: Supabase from day 1, magic-link auth, three RLS-enforced roles (viewer, editor, admin), markdown editor with CodeMirror 6 + live preview, version snapshots, direct-to-Storage uploads with signed URLs, a schools admin CRUD, per-playbook event instrumentation with an admin usage dashboard. Seven decisions captured in 001 through 008.
- **Plan-design-review** produced `DESIGN.md` at repo root, ASCII wireframes for every Phase 1 screen, and ten design decisions including the home empty-vs-populated state machine, the colour-forward direction, editor-on-tablet behaviour, the first-time-writer journey, and the Pick-up-where-you-left-off scope.

On 2026-04-22, after a conversation with Ritu, the architecture changed. The UI patterns, copy, brand decisions, playbook scope, and Audit Stage concept survived. The database, auth, and upload infrastructure did not.

## Decision

**Content source is OneDrive, not a database.**

A shared OneDrive folder, synced to Anish's laptop at `C:\Users\anish\OneDrive - MAF TECHNOLOGIES PRIVATE LIMITED\Acads`, is the canonical source of truth for playbooks, skills, schools, assignments, and team data. Path configured in dev via `GSL_ONEDRIVE_PATH` env var.

Structure inside `Acads/`:

```
Acads/
  playbooks/                 # markdown, one per playbook, YAML frontmatter
  skills/                    # markdown, one per skill
  outputs/                   # content library, grouped by playbook subfolder
    teaching-ppt/
    lesson-plan/
    assessment/
    cbse-summary/
    delivery-script/
    product-note/
  meta/
    schools.json             # list of schools, Ritu edits directly
    assignments.json         # weekly assignments, Ritu edits directly
    team.json                # team members (name, email, optional avatar URL)
```

**Studio reads content through a two-path loader:**

- **Dev:** reads directly from `GSL_ONEDRIVE_PATH` via Node `fs` APIs.
- **Prod:** reads from `./content-synced/` inside the repo, committed to git.

**Sync script (`pnpm sync-content`)** copies the OneDrive folder into `./content-synced/` and commits the result. Vercel auto-deploys on push. Ritu edits in OneDrive; Anish runs the sync script when changes should hit production.

**Access control** is a single shared password in team WhatsApp, checked in Next.js middleware against `GSL_STUDIO_PASSWORD` env var. A signed cookie persists the session. Not authentication; a door lock so the URL is not publicly crawlable.

**Client-side identity** is a localStorage prompt on first visit ("what should we call you?"). Stored under `gsl-user-name`. Used for attribution on assignment cards and to pre-fill feedback forms. Not verified.

**Feedback** is a Google Form URL (via `GSL_FEEDBACK_FORM_URL` env var) opened in a new tab with the playbook slug pre-filled as a query param. Ritu owns the form and the response sheet.

**No database. No auth. No Studio-hosted uploads. No events. No roles. No admin dashboard. No DNS setup for a magic-link sender.**

## What we kept from the prior reviews

Everything except the infrastructure layer.

### From the design doc (office-hours)
- Problem statement, status quo, target user, and narrowest wedge (six playbooks readable by end of week 2, now compressed into weeks 1-2 under the 4-week timeline).
- Audit Stage as a first-class ritual on every playbook.
- Mid-flow checkpoint convention on every step.
- The six Phase 1 playbooks: Teaching Material PPT Builder, Lesson Plan Builder, Assessment Builder, Delivery Script Writer (trainers), CBSE Doc Summariser, Product Note Builder.
- The three Phase 1 skills: Pedagogy Foundations (full body migrated from seed 04), Brand Voice (body written week 3), PPT Patterns (body written week 3).

### From plan-eng-review
- 001 (no Anthropic API calls): unchanged.
- 004 (audit validation): unchanged; week 3 validation test still runs.
- 006 (adoption metric): unchanged; Ritu interview, not an automated ratio.
- 007 (audit scope week 3): unchanged; Pedagogy Foundations by slug + inlined surface conventions.
- British English, no em-dash, Indian context, warm tone: unchanged.

### From plan-design-review
- `DESIGN.md` at repo root: unchanged (colour roles, typography, spacing, craft moments, anti-patterns, responsive breakpoints, a11y checklist).
- Wireframe artifact at `~/.gstack/projects/gsl-academics-studio/anish-master-design-wireframes-20260421.md`: unchanged (home two-mode state machine, time-of-day greeting copy, playbook reader layout, Audit Stage visual weight, library upload form, schools list, sign-in as a moment, error-state designs, state tables, responsive specs, a11y checklist, shadcn mapping for every component).
- Colour-forward direction: unchanged (Turquoise used generously, Orange Peel as second primary on celebratory states, Fashion Fuchsia at three or four specific moments, Light Sky as a real background colour, not a reserved tint).
- PromptBlock on cream #FEFCF3 with amber-highlighted variables: unchanged.
- DifficultyBadge pattern, StepByStep numbered badges, CopyButton with green-flash feedback: unchanged.

## What we cut

- **Supabase entirely.** No Postgres schema, no migrations, no RLS policies, no Auth, no Storage, no client config. Delete any scaffolding-that-was-going-to-be if it lands in the repo before it ships.
- **Magic-link authentication.** No email-based sign-in. No sender domain. No DNS SPF/DKIM setup. No `app/(auth)/sign-in/page.tsx` SSR route that calls Supabase.
- **Role distinctions.** No `user_profile.role` column. No viewer/editor/admin. No RLS policies that check role. Everyone inside the password gate is equal.
- **In-app markdown editor.** No CodeMirror 6, no preview pane, no save-snapshot action, no stale-version collision dialog. Ritu edits `.md` files in OneDrive directly in VSCode or any text editor she prefers. OneDrive versions her edits automatically.
- **File upload UI.** No Studio-side uploads. No signed URLs, no XHR progress bars, no two-server-action createUploadSession + finaliseUpload flow, no Storage orphan reaper. Writers drop their files into `Acads/outputs/<playbook>/` in OneDrive.
- **Database-resident version history.** No `playbook_version` or `skill_version` table. OneDrive's built-in file history is the replacement.
- **Per-playbook event instrumentation.** No `copy_event`, `playbook_view_event`, `audit_event` tables. Instrumentation is out of Phase 1.
- **Admin usage dashboard.** Nothing to aggregate.
- **Schools admin CRUD.** Schools is a static view reading `meta/schools.json`. Ritu edits the JSON.
- **`via_playbook_id` FK.** No database means no foreign keys. The social-proof counts on playbook detail pages (a secondary use case the FK was kept for) move to Phase 2.

## What we gain

- **Faster Phase 1: 4 weeks, not 6.** Roughly 35% scope removal on infrastructure.
- **Zero database to configure, secure, or pay for.** Vercel hobby tier handles the whole thing.
- **Ritu edits in the tool she already knows.** OneDrive is inside her daily workflow; a new editor UI is not.
- **OneDrive versioning is free.** Point-in-time restore is a right-click in the OneDrive web UI.
- **No email flow to configure.** No DNS, no SPF, no DKIM, no deliverability debugging.
- **The Studio becomes inspectable.** Every markdown file is readable in any text editor by anyone with OneDrive access. No "open the admin panel" or "query the DB" step to see what the playbook actually says.

## What we give up

- **No audit trail.** There is no record of who opened what, who copied which prompt, or who saved which output. Adoption becomes qualitative (decision 006).
- **Content updates require a manual sync step.** `pnpm sync-content` is a human-run command. If Ritu edits on Monday and Anish does not sync until Thursday, production is three days stale. Mitigation: run sync nightly via a cron or GitHub Action (Phase 2 if needed), or Ritu can WhatsApp Anish when she has pushed edits worth deploying.
- **Shared password instead of per-user auth.** Cannot say "Ritu published this edit." Cannot gate a page by role. Cannot revoke one user's access without rotating the password.
- **Concurrent OneDrive edits can silently conflict.** If Ritu and a writer edit the same playbook file at the same moment, OneDrive resolves with a "Conflict copy of..." file. The writer sees the Studio render the canonical version; their edit is orphaned in the conflict file until someone notices. Probability is low (4-5 users, infrequent playbook edits, mostly Ritu on Monday mornings), but not zero. Mitigation is social convention: document in `CLAUDE.md` that playbook and skill file edits happen in a designated window (Monday morning) or with a WhatsApp "I'm editing X" notice.
- **No in-product adoption analytics.** Per 008 obsolescence.

## Flagged risks (MUST RESOLVE BEFORE WEEK 2 CONTENT LIBRARY WORK)

### Risk 1: git repo bloat if outputs are synced

The pivot spec says "sync script copies the folder into `./content-synced/` in the repo, commits, pushes." If that includes `Acads/outputs/*`, the repo grows rapidly:

- A PowerPoint deck with embedded images regularly exceeds 20MB, and often hits 40-50MB for a full branded teaching deck.
- Six playbooks × two or three outputs per week × ~25MB average = ~375MB per month.
- Vercel deploy size limits: approximately 100MB on hobby, approximately 1GB on Pro. We would exhaust hobby in the first month.
- Git itself does not like large binary files; clone times balloon, and bandwidth on GitHub free tier has caps.

**Recommended resolution:** the sync script copies only `playbooks/`, `skills/`, and `meta/` into `./content-synced/`. It does NOT copy `outputs/*`. The Studio's content library view renders a list of files for each playbook by reading a manifest file (e.g. `outputs-manifest.json` generated by the sync script as a listing of filenames with OneDrive shared folder URLs), and each row links out to the file's OneDrive web URL. Writers and teachers click through to OneDrive to view or download.

This keeps the repo tight (markdown + JSON only, which is measured in kilobytes) and keeps the content library functional. The cost is a dependency on OneDrive's shared-folder URL format staying stable, which is fine for a corporate Microsoft 365 tenant.

**Decision to confirm in the Ritu walkthrough or before week 2 library work:** do we want the Studio to host the files (current spec, costs us the git bloat), or link to OneDrive web URLs (recommended, shifts access to OneDrive permissioning)?

### Risk 2: concurrent OneDrive edit conflicts

See "What we give up" above. Mitigation is social convention. Document in `CLAUDE.md` and mention in the Ritu walkthrough.

### Risk 3: dev fragility via OneDrive sync

If Anish's local OneDrive sync breaks (Microsoft account issue, disk full, sync stuck), the dev server reading from `GSL_ONEDRIVE_PATH` breaks. Prod is unaffected because it reads `./content-synced/`.

**Mitigation:** the content loader falls back to `./content-synced/` if `GSL_ONEDRIVE_PATH` is unset, missing, or returns ENOENT. Dev can work off the committed content when OneDrive is down. Document the fallback in `CLAUDE.md`.

### Risk 4: no audit trail whatsoever

For a four-user internal tool, this is acceptable Phase 1 per the office-hours framing. Flagging for completeness:

- No record of who read which playbook.
- No record of who copied which prompt.
- No record of who dropped which output.
- No record of when playbooks were edited by whom (OneDrive has last-modified-by, but that attribution lives in OneDrive, not the Studio).

**Phase 2 path:** add lightweight client-side analytics (Plausible or Fathom) for page-view funnels, and optionally a minimal `/api/event` route that writes to a Google Sheet Ritu owns.

### Risk 5: content library filtering without a database

Without a database, filtering outputs by grade/topic/programme requires parsing filename conventions, or reading a per-output YAML sidecar.

**Recommended resolution:** standardise file naming in the Ritu walkthrough:

```
<grade>_<topic-slug>_<author-initials>_<yyyy-mm-dd>.pptx
```

Example: `class-06_building-a-simple-chatbot_pm_2026-04-15.pptx`.

The Studio parses the filename client-side and offers filter chips per field. If Ritu prefers freeform filenames, we skip filter chips in Phase 1 and rely on the user's browser Ctrl-F.

## Revisit triggers

Pivot back toward a database-backed architecture when any of:

- Team grows past 8-10 users. Shared password stops scaling.
- Ritu or writers ask for in-app editing as a top-two observed pain point.
- Adoption metric shows 80%+ sustained use and the team wants event-level analytics to understand usage patterns per playbook.
- Output volume exceeds what OneDrive shared-folder web URLs can present cleanly in the library view.
- A content writer loses work to a OneDrive concurrent-edit conflict more than once.
- A Phase 2 feature (peer review workflow, task tracker, student scores, trainer assignments) requires write surfaces the Studio cannot fulfil against OneDrive alone.

## Migration from superseded decisions

- **002 (editor deferral):** moot, no editor at all.
- **003 (admin bootstrap):** moot, no admin role.
- **005 (upload path):** moot, no Studio uploads.
- **008 (per-playbook instrumentation):** moot, no events. Decision 006 is the adoption signal.

## What the 4-week revised timeline looks like

**Week 1: scaffold + OneDrive content pipeline**
- Next.js 14 App Router + Tailwind + shadcn/ui per `DESIGN.md`.
- Content loader (dev reads `GSL_ONEDRIVE_PATH`, prod reads `./content-synced/`).
- Sync script `pnpm sync-content`.
- Password-gate middleware on `GSL_STUDIO_PASSWORD` with signed cookie.
- LocalStorage "what should we call you?" prompt on first visit.
- Home page (empty state hero, time-of-day greeting, "Start with one of these" featured playbook grid fallback).
- Playbook list page.
- Playbook reader page rendering every field per wireframes (hero, use-when, before-you-start, numbered step accordions with copy-affordance on prompt blocks, mid-flow checks, Audit Stage block, Suggest Improvement Google Form link).
- Migrate Lesson Plan Builder and Assessment Builder (Question Bank + Rubric merged) from `docs/prior-project/data/academics.json` into `Acads/playbooks/` as markdown with the new `audit_prompt_template` and `mid_flow_checks` fields.
- Migrate Pedagogy Foundations skill full body from `docs/seed/04` into `Acads/skills/`.
- Stub `brand-voice.md` and `ppt-patterns.md` (title + slug only) in `Acads/skills/`.

**Week 2: all six playbooks readable + Audit Stage prototype**
- Migrate or draft the four remaining Phase 1 playbooks: Teaching Material PPT Builder (adapted from seed 03), Delivery Script Writer (adapted from prior Teacher Manual), CBSE Doc Summariser (from scratch), Product Note Builder (from scratch).
- All six playbooks rendered in the reader.
- Audit Stage UI fully working on Teaching Material PPT Builder (the prototype).
- Run the validation test with one real writer (per decision 004).
- Ritu's team gets the URL and password; they start reading and trying playbooks.
- Content library view (lists files from `Acads/outputs/<playbook>/` via the outputs manifest, with links out to OneDrive web URLs; see Risk 1 resolution).

**Week 3: skills + assignments + schools + audit replication**
- Skill list + detail pages.
- Draft `brand-voice.md` and `ppt-patterns.md` bodies (terse but real).
- Weekly assignments dashboard reading `meta/assignments.json`.
- Schools directory view reading `meta/schools.json`.
- Replicate Audit Stage pattern to the remaining five playbooks if week 2's validation test passed.
- Mid-flow checkpoint interaction polish.

**Week 4: brand pass + polish + ship**
- Apply the colour-forward direction throughout: Turquoise generously, Orange Peel on celebratory states, Fashion Fuchsia at Audit Pass moment.
- Micro-interactions (copy confirmation, step completion tick, Audit Pass celebration).
- Empty states with warm copy everywhere.
- Time-of-day hero greetings.
- Mobile-responsive pass (not mobile-first; just works).
- QA: grep for em-dash, grep for American spellings, run through acceptance checklist from wireframe artifact.
- Staging deploy to Vercel.
- Ritu review session.
- Production deploy.
