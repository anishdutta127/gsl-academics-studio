# CLAUDE.md, GSL Academics Studio

This is the context file Claude Code reads at the start of every session. Keep it up to date as the project evolves. When in doubt, this file overrides your defaults.

## What this project is
A web app for the GSL Academics team in Mumbai. Three layers:
1. **Playbooks** — step-by-step procedures for content creation tasks, with copyable prompts for Claude/Midjourney/etc.
2. **Skill Library** — frameworks the playbooks reference (NEP 2020, NCF 2023, ADDIE, Bloom's, brand voice, partner norms).
3. **Operations Dashboard** — school directory, task tracker, content library, feedback.

See `docs/seed/01-PRD.md` for the full brief.

## Who we build for
- **Ritu**, Head of Academics at GSL. Busy, non-technical, cares about craft. Reviews everything.
- **Content writers** (three or four on the team). Non-technical. Daily users. They'll live in the playbooks.
- **Curriculum leads.** Will edit playbooks occasionally, through the in-app editor, never through Git.
- **Trainers.** Consume delivery scripts and teaching materials. Read-only.

Design for the content writer first. If it isn't usable by a content writer who has never heard of Supabase or React, it isn't done.

## The philosophical point (don't forget this)
This is a **craft tool**, not a SaaS dashboard. The team is creative. They produce education content for children. Every interaction should feel like opening a favourite notebook, not signing into QuickBooks. Warm. Playful. Clear.

## Stack
- **Framework:** Next.js 14, App Router
- **Language:** TypeScript, strict mode
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (Postgres, Auth, Storage, Realtime)
- **Rich editor:** Tiptap with custom blocks for playbook-specific fields (step, prompt, checklist, skill-reference)
- **Deploy:** Vercel, static where possible, server actions for auth-gated writes
- **Testing:** Playwright for flows, Vitest for unit
- **Validation:** Zod everywhere that data crosses a boundary

No Zustand, Redux, or heavy state libraries. Use server components and server actions first. Use `useState` locally where needed. No client-side fetch for data; use server components.

## Domain model

### Playbook
A guided procedure for a content task. Fields:
- `id`, `slug`, `title`, `icon` (emoji or Lucide name), `category`
- `what_youll_make` — one-line output description
- `use_when` — trigger conditions, short paragraph
- `time_needed` — e.g. "30 to 60 minutes"
- `difficulty` — `gentle` | `standard` | `advanced`
- `before_you_start` — required inputs, reference files, context (markdown)
- `steps` — ordered array; each step has: `title`, `instruction`, `tool`, `prompt` (markdown), `expected_output`, `next_action`
- `quality_checklist` — array of check items (strings)
- `common_pitfalls` — markdown
- `skills_referenced` — array of skill IDs
- `related_playbooks` — array of playbook IDs
- `version`, `last_edited_by`, `last_edited_at`, `status` (`draft` | `published` | `archived`)

### Skill
A framework or standard. Fields:
- `id`, `slug`, `title`, `category`
- `summary` — one paragraph
- `body` — full markdown (the bulk)
- `use_cases` — where this skill applies (markdown)
- `references` — external links
- `version`, `last_edited_by`, `last_edited_at`, `status`

### Supporting types
- `content_library_item` — an output produced through a playbook; file + metadata + playbook reference
- `school` — name, city, programmes active, status, last touch date
- `feedback` — free-form or structured feedback on a playbook or output
- `task` — simple tracker item (Phase 2)
- `user` + `role`

## Style rules, non-negotiable
- **British English throughout.** "organise" not "organize", "behaviour" not "behavior", "programme" not "program" (for education programmes; "program" only when referring to computer code).
- **No emdash. Anywhere.** Use commas, parentheses, or restructure. Run a grep for em-dash character before every commit.
- **Indian context.** Rs or ₹ for rupees. Lakh and crore where natural. Indian names in examples (Priya, Arjun, Fatima, Harpreet). Indian cities. Indian scenarios (paani-puri stall, Diwali, not prom).
- **Warm, not corporate.** "Let's make a lesson plan" not "Create new lesson plan". Address the user as a colleague.

## GSL brand
- **Primary colours:** Turquoise Sea `#00D8B9`, Azure Blue `#073393`
- **Accents:** Orange Peel `#FFAD40`, Light Sky `#C3F8FF`
- **Use sparingly:** Fashion Fuchsia `#DE00A5`
- **Fonts:** Fraunces (or similar warm display serif) for headings. Inter for body. System sans fallback.
- **Icons:** Lucide first. Emoji second, especially on playbook cards to give a human feel.
- **Logo:** Three teal circles pattern + "GET SET LEARN" navy text. Use the official SVG; never recreate.

## Do
- Write for non-technical users first. Every UI label readable by a content writer on day one.
- Save everything. Any output produced through a playbook auto-saves to the content library unless the user ticks "don't save".
- Version every edit. Every playbook and skill save creates a history row.
- Error recover. If Supabase is down, show a friendly message, offer local draft save.
- Seed the DB with real content during development so screens are never empty.
- Mobile-responsive but not mobile-first. This is desktop work. Tablet support matters for Phase 3 (trainer review).
- Micro-interactions matter. "Copied" confirmations. Hover states. Step completion animations.

## Don't
- **Don't call the Anthropic API from within the Studio.** The Studio's job is to help humans use Claude/Midjourney directly. Playbooks have copyable prompts, not "Generate" buttons. If this changes in Phase 4, it's a separate design conversation.
- **Don't build Ops workflows.** No trainer allocation, no escalation matrix, no billing, no MOU tracking. School directory is reference only.
- **Don't invent playbook content.** Every new playbook is written by Ritu's team or by Anish in consultation with Ritu. Claude Code seeds, doesn't author.
- **Don't hard-code content.** Every word of playbook or skill lives in Supabase, editable through the UI. Markdown seeds in `content-seed/` are for first population only.
- **Don't use emdash.**
- **Don't use American English.**
- **Don't overbuild.** Every feature earns its place. When in doubt, cut.

## File organisation
```
app/
  (auth)/                  # sign-in, sign-out
  (studio)/                # authenticated app
    page.tsx               # home: recent, featured, search
    playbooks/
      page.tsx             # list view
      [slug]/page.tsx      # reader view
      [slug]/edit/page.tsx # editor (role-gated)
      new/page.tsx         # create (role-gated)
    skills/                # same shape as playbooks
    library/               # content library (outputs)
    schools/               # school directory
    tracker/               # task tracker (Phase 2)
    feedback/              # feedback (Phase 2)
    settings/              # user, roles
components/
  ui/                      # shadcn primitives
  playbook/                # playbook-specific (card, step, prompt-block, checklist)
  skill/                   # skill-specific
  editor/                  # Tiptap editor + custom blocks
  shell/                   # sidebar, topnav, mascot
lib/
  supabase/                # client, server, types
  schemas/                 # Zod schemas
  markdown/                # MDX rendering helpers
docs/
  seed/                    # the seed pack
  decisions/               # one file per significant architectural decision
supabase/
  migrations/              # SQL migrations
  seed/                    # seed script (JSON or MD to DB)
content-seed/              # markdown seeds for initial playbooks and skills
  playbooks/
  skills/
```

## Seed-to-DB flow
Initial playbooks and skills live as markdown in `content-seed/` with YAML frontmatter. On first deploy, `pnpm seed` reads these and populates Supabase. After that, all editing happens in-app. The markdown seeds stay in the repo for reference and re-seeding dev databases.

## Auth and roles
- Magic-link auth via Supabase.
- Three roles stored on `profiles.role`: `viewer`, `editor`, `admin`.
- RLS policies on every table. Viewers can read published content and write to `content_library_item` + `feedback` only. Editors can write to `playbook` and `skill`. Admins can write to everything including `school` and `user`.
- Row-level audit: every write to `playbook` and `skill` inserts a version row. Never hard-delete.

## Editor discipline
- Tiptap with schema-validated custom blocks (step, prompt, checklist, skill-reference).
- Every save: Zod-validate the entire playbook or skill against its schema before writing.
- Autosave every 10 seconds as a draft. Explicit "Publish" action to move draft → published and bump version.
- Version history side panel: see all prior versions, diff view, restore action.

## Testing discipline
- Every playbook CRUD flow: Playwright test.
- Every server action: Vitest unit test for input validation.
- Visual regression manual for now; revisit in Phase 3.

## Deployment
- `main` auto-deploys to production.
- `staging` for Ritu's review environment.
- Feature branches deploy to Vercel previews.

## Commit discipline
- Small commits. One concern per commit.
- Commit message format: `[area] what, why in one line`. e.g. `[editor] add skill-reference block, required for playbook Step 3`.
- Every PR references a task from the roadmap.

## When you (Claude Code) are uncertain
- If a requirement is missing, don't invent. Ask Anish.
- If a decision affects more than one file, write it down in `docs/decisions/NNN-title.md` first, then implement.
- If a feature feels like Ops work (trainer allocation, school workflow, MOU stuff), stop and ask. It probably doesn't belong here.

## Change log for this file
Every significant decision that shapes the project, note it at the bottom of this file with date.

- 2026-04-20, initial draft based on Ritu's questionnaire responses and Anish's direction.
