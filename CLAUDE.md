# CLAUDE.md, GSL Academics Studio

This is the context file Claude Code reads at the start of every session. Keep it up to date as the project evolves. When in doubt, this file overrides your defaults.

See `DESIGN.md` at repo root for the design system (colour roles, typography, spacing, craft moments, anti-patterns). See `docs/decisions/` for architecture decisions that affect more than one file.

## What this project is
A web app for the GSL Academics team in Mumbai. Three layers:
1. **Playbooks**, step-by-step procedures for content creation tasks, with copyable prompts for Claude / Midjourney / etc.
2. **Skill Library**, frameworks the playbooks reference (NEP 2020, NCF 2023, ADDIE, Bloom's, brand voice, partner norms).
3. **Workspace surfaces**, weekly assignments dashboard, content library view (OneDrive-backed), schools directory.

See `docs/seed/01-PRD.md` for the full brief, and `docs/decisions/010-onedrive-content-source-pivot.md` for the current architecture.

## Who we build for
- **Ritu**, Head of Academics at GSL. Busy, non-technical, cares about craft. Reviews everything. Edits content directly in OneDrive.
- **Content writers** (three or four on the team). Non-technical. Daily users. They live in the playbooks.
- **Curriculum leads.** Consume playbooks and skills, rare editors. If they edit, they do it in OneDrive alongside Ritu.
- **Trainers.** Consume delivery scripts and teaching materials. Read-only.

Design for the content writer first. If it is not usable by a content writer who has never heard of React, it is not done.

## The philosophical point (don't forget this)
This is a **craft tool**, not a SaaS dashboard. The team is creative. They produce education content for children. Every interaction should feel like opening a favourite notebook, not signing into QuickBooks. Warm. Playful. Clear.

## Stack
- **Framework:** Next.js 14, App Router
- **Language:** TypeScript, strict mode
- **Styling:** Tailwind CSS + shadcn/ui
- **Content source:** OneDrive folder, synced to local disk (dev), copied into `./content-synced/` and committed to git (prod). No database.
- **Access control:** single shared password via middleware (`GSL_STUDIO_PASSWORD`) + signed cookie. Not authentication.
- **Client-side identity:** localStorage prompt on first visit, key `gsl-user-name`. Used for attribution only; not verified.
- **Feedback:** Google Form, URL in `GSL_FEEDBACK_FORM_URL` env var, opened in a new tab with playbook slug pre-filled.
- **Deploy:** Vercel. Static where possible, server components for content reads, route handlers only for the password-gate middleware and the sync trigger.
- **Testing:** Playwright for flows, Vitest for unit.
- **Validation:** Zod on content frontmatter as it is loaded from OneDrive or `./content-synced/`.

No Zustand, Redux, or heavy state libraries. Use server components and server actions first. Use `useState` locally where needed. No client-side fetch for content; load in server components at request time.

No Supabase, no Postgres, no auth provider, no RLS, no role distinctions. See `docs/decisions/010` for why.

## Content pipeline

```
┌────────────────────────────────────────────────────────────────┐
│  OneDrive: Acads/                                              │
│    playbooks/*.md   skills/*.md   outputs/<playbook>/*         │
│    meta/schools.json  meta/assignments.json  meta/team.json    │
└────────────────────┬───────────────────────────────────────────┘
                     │
           Ritu edits directly in OneDrive
                     │
┌────────────────────┴───────────────────────────────────────────┐
│  Dev: Studio reads from GSL_ONEDRIVE_PATH via fs APIs.         │
│  Prod: Studio reads from ./content-synced/ committed to git.   │
└────────────────────┬───────────────────────────────────────────┘
                     │
            pnpm sync-content (manual, Anish)
         copies OneDrive → ./content-synced/ and commits
                     │
┌────────────────────┴───────────────────────────────────────────┐
│  Vercel auto-deploys on push to main. Static-generated where   │
│  possible; server-rendered where the cookie or name are read.  │
└────────────────────────────────────────────────────────────────┘
```

**Dev fallback:** if `GSL_ONEDRIVE_PATH` is unset, missing, or unreadable, the content loader reads `./content-synced/` instead. Dev can run off the committed prod content when OneDrive is down.

**Sync does not include `outputs/*`.** Those files are too large to commit (PPTX regularly 20-50MB; Vercel deploy cap is 100MB on hobby, 1GB on Pro). The sync script emits an `outputs-manifest.json` listing each output with its OneDrive shared-folder URL; the content library view renders that manifest and links out. See `docs/decisions/010` for the full rationale.

**Concurrent-edit convention.** OneDrive resolves simultaneous edits with "Conflict copy of..." files; silent to the writer. By convention, playbook and skill edits happen in a designated window (Monday mornings) or with a WhatsApp "I am editing X" notice to avoid collisions. Small team, low probability, social mitigation.

## Domain model

All content is markdown (playbooks, skills) or JSON (schools, assignments, team) on disk. No database. Zod schemas validate on load.

### Playbook
A guided procedure for a content task. YAML frontmatter + markdown body. Fields on frontmatter:
- `slug`, `title`, `icon` (emoji or Lucide name), `category`
- `what_youll_make`, `use_when`, `time_needed`, `difficulty` (`gentle` | `standard` | `advanced`)
- `programme` (optional; STEAM, Cambridge YP, Harvard HBPE, IITG AI, CBSE, general)
- `skills_referenced` (array of skill slugs)
- `related_playbooks` (array of playbook slugs)
- `status` (`draft` | `published`)
- `audit_prompt_template` (string, the prompt users copy into their own Claude at the Audit Stage)

Playbook body (markdown):
- `## Before you start` section
- `## Steps` section with numbered step headers; each step has:
  - Instruction paragraph
  - Tool line ("Tool: Claude, Projects feature is best")
  - A prompt code block (triple-backtick) that renders as the copyable PromptBlock
  - `**Mid-flow checks**` list (2-3 short lines rendered as checkbox rows under the prompt; advisory, not gating)
  - `**Expected output**` line
  - `**Next action**` line
- `## Audit your output` final step
- `## Common pitfalls` section

### Skill
A framework or standard. YAML frontmatter + markdown body. Fields:
- `slug`, `title`, `category`, `summary`, `status` (`draft` | `published`)
- `last_edited_by` (optional, Ritu's name or a contributor)
- `last_edited_at` (optional ISO date)

Body is long-form markdown with references section at the end.

### Supporting JSON data in `meta/`
- `schools.json`, array of school records (`name`, `city`, `programmes`, `status`, `last_touch_date`).
- `assignments.json`, `{ week_of, assignments: [{ name, playbook, topic }] }` for the weekly dashboard.
- `team.json`, array of team members (`name`, `email` optional, `avatar_url` optional). Used for attribution and for the team page.

### Outputs
Files dropped by writers into `Acads/outputs/<playbook-slug>/`. Any format, not parsed by the Studio. Listed via `outputs-manifest.json` generated by the sync script.

### Feedback
Not stored by the Studio. "Suggest improvement" button opens `GSL_FEEDBACK_FORM_URL` with `?entry.xxx=<playbook-slug>` in a new tab.

## Style rules, non-negotiable
- **British English throughout.** "Organise", not "organize". "Behaviour", not "behavior". "Programme", not "program" (for education programmes; "program" only for computer code).
- **No em-dash.** Use commas, parentheses, or restructure. Grep for the character before every commit.
- **Indian context.** Rs or ₹ for rupees. Lakh and crore where natural. Indian names in examples (Priya, Arjun, Fatima, Harpreet). Indian cities. Indian scenarios (paani-puri stall, Diwali, not prom).
- **Warm, not corporate.** "Let us make a lesson plan," not "Create new lesson plan." Address the user as a colleague.

## GSL brand
See `DESIGN.md` for the full colour-roles spec. Summary:
- **Turquoise Sea `#00D8B9`**, signature colour, used generously. Hero washes, primary buttons, active states.
- **Azure Blue `#073393`**, primary text, headings, secondary buttons.
- **Orange Peel `#FFAD40`**, accent with weight. Celebratory buttons, "New" markers, Advanced difficulty pill.
- **Light Sky `#C3F8FF`**, background colour, used freely.
- **Fashion Fuchsia `#DE00A5`**, three or four specific moments that pop (Audit Pass, Published confirmation, home greeting accent, sidebar active dot).
- **Fonts:** Fraunces (display serif) for headlines. Inter for body. JetBrains Mono for PromptBlock. System fallbacks.
- **Icons:** Lucide first. Emoji on playbook cards for warmth.
- **Logo:** three teal circles + "GET SET LEARN" navy text. Use the official SVG; never recreate.

## Do
- Write for non-technical users first. Every UI label readable by a content writer on day one.
- Load every field through Zod before rendering. Content from disk is untrusted like any external input.
- Mobile-responsive but not mobile-first. Desktop primary. Tablet matters for curriculum leads editing outputs.
- Micro-interactions matter. "Copied" confirmations. Hover states. Step completion animations.
- Fall back gracefully when content is missing (ENOENT from OneDrive, malformed frontmatter). Show a warm error, not a stack trace.

## Don't
- **Don't call the Anthropic API from within the Studio.** The Studio's job is to help humans use Claude / Midjourney directly. Playbooks have copyable prompts, not "Generate" buttons. See `docs/decisions/001`.
- **Don't reintroduce a database** without first superseding `docs/decisions/010`. The OneDrive-as-CMS decision is explicit; flipping it back needs its own record.
- **Don't commit `outputs/*` into `./content-synced/`.** Risk 1 in decision 010. The sync script writes an `outputs-manifest.json` listing OneDrive URLs; the files themselves stay in OneDrive.
- **Don't invent playbook or skill content.** Every new playbook is written by Ritu's team or by Anish in consultation with Ritu. Claude Code seeds, does not author.
- **Don't hard-code content.** Every word of every playbook and skill lives in OneDrive, editable through OneDrive. Markdown files in `docs/seed/` are the reference starting points, not authoritative content.
- **Don't use em-dash.**
- **Don't use American English.**
- **Don't overbuild.** Every feature earns its place. When in doubt, cut.

## File organisation
```
app/
  (gated)/                   # everything behind the password gate
    page.tsx                 # home: hero, pick-up, recent, featured
    playbooks/
      page.tsx               # list view
      [slug]/page.tsx        # reader view
    skills/                  # same shape
    library/page.tsx         # outputs manifest, grouped by playbook
    schools/page.tsx         # schools list
    assignments/page.tsx     # weekly assignments dashboard
  gate/
    page.tsx                 # password entry form
  api/
    gate/route.ts            # password check, sets signed cookie
components/
  ui/                        # shadcn primitives
  playbook/                  # PlaybookCard, StepAccordion, PromptBlock, MidFlowCheck, AuditStage
  skill/
  shell/                     # TopNav, Sidebar, WhoAreYouPrompt
lib/
  content/                   # loader (OneDrive dev, content-synced prod), Zod schemas
  gate/                      # password + cookie helpers
  markdown/                  # MDX rendering + frontmatter parsing
content-synced/              # committed prod content (git-tracked)
  playbooks/
  skills/
  meta/
    schools.json
    assignments.json
    team.json
  outputs-manifest.json
scripts/
  sync-content.ts            # pnpm sync-content entrypoint
docs/
  seed/                      # the seed pack (reference starting points)
  decisions/                 # one file per significant architectural decision
middleware.ts                # password gate
DESIGN.md                    # design system
CLAUDE.md                    # this file
```

## Content editing workflow
- Ritu edits `Acads/playbooks/*.md` and `Acads/skills/*.md` directly in OneDrive using any text editor.
- OneDrive versions each edit automatically; point-in-time restore is right-click in the OneDrive web UI.
- Writers drop output files into `Acads/outputs/<playbook-slug>/`.
- Ritu or Anish runs `pnpm sync-content` when edits should hit production. The script copies the non-output content into `./content-synced/`, writes `outputs-manifest.json`, commits with a message, pushes. Vercel auto-deploys.
- Concurrent-edit convention: playbook and skill file edits happen Monday morning or with a WhatsApp notice. Outputs can be dropped any time (different folder, no conflict risk).

## Testing discipline
- Content loader: Vitest unit tests for valid frontmatter, invalid frontmatter (Zod failure), missing file (ENOENT fallback), OneDrive vs content-synced path selection.
- Password gate: Vitest unit tests for correct password, wrong password, expired cookie, missing cookie.
- Playwright flows: sign-in through gate, open playbook, copy prompt, open feedback link (mock new-tab), submit feedback (mocked Google Form).
- Visual regression manual for now; revisit in Phase 3.
- Pre-commit hook: grep for em-dash character and common American spellings in staged files; fail if any.

## Deployment
- `main` auto-deploys to Vercel production.
- `staging` auto-deploys to Vercel staging for Ritu's review environment.
- Feature branches deploy to Vercel previews.
- `pnpm sync-content` is run manually on Anish's laptop, commits to the current branch, pushes. No cron in Phase 1.

## Commit discipline
- Small commits. One concern per commit.
- Commit message format: `[area] what, why in one line`. Example: `[playbook-reader] render mid_flow_checks as inline checkbox rows, advisory not gating`.
- Every PR references a task from the roadmap or a decision doc.
- Never commit secrets. `.env.local` is gitignored; `.env.example` is committed as the template.

## When you (Claude Code) are uncertain
- If a requirement is missing, do not invent. Ask Anish.
- If a decision affects more than one file, write it down in `docs/decisions/NNN-title.md` first, then implement. Use the next available number.
- If a feature feels like Ops work (trainer allocation, school workflow, MOU tracking), stop and ask. It probably does not belong here.
- If OneDrive is giving an ENOENT error in dev, fall back to `./content-synced/` (the committed prod content) and flag to Anish. Do not block work on OneDrive sync reliability.

## Change log for this file
- 2026-04-20, initial draft based on Ritu's questionnaire and Anish's direction (Supabase-backed plan).
- 2026-04-22, architecture pivot to OneDrive-sourced content. Removed Supabase, auth, roles, in-app editor, Storage uploads, event instrumentation, admin dashboard, DNS setup. Added OneDrive content pipeline, password gate, sync script. See `docs/decisions/010`.
