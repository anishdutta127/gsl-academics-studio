# Week 2, session 2 closeout

Written 2026-04-21 after commits 14 through 18. Read this after the session
1 handover (`week2-session1-to-session2.md`) and before session 3 opens.

## Status: green

`pnpm typecheck` clean, `pnpm test` 25/25, `pnpm build` generates 20 static
pages (was 16 entering this session). Head of `master` is the closeout
commit itself. No remote push yet. `pnpm sync-content` runs clean with zero
warnings.

## What shipped this session

Six commits, in order:

```
f6d517a [ui]      /skills list + /skills/[slug] detail + /library with filters
50d0a26 [content] three playbooks, Delivery Script + CBSE Summariser + Product Note
44280c0 [content] Claude Carousel Generator playbook + Carousel Design Framework skill
e87cc9a [content] Teaching Material PPT Builder playbook, the flagship
e9ead03 [ui]      visual polish pass before commit 14, colour-forward + breathable
```

(Plus the closeout commit that ships this report.)

### Pre-commit-14 polish pass (commit e9ead03)

Nine DESIGN.md fidelity fixes against surfaces built in session 1:

- Sidebar active row moved from `bg-turquoise-sea/15 text-azure-blue` (15% tint)
  to full Turquoise Sea + white text with an 8px Fuchsia dot and a white halo.
  Matches DESIGN.md spec verbatim.
- `/standards` grid gap lifted from `gap-5` to `gap-6 md:gap-7 lg:gap-8`,
  matching the magazine rhythm called out in DESIGN.md.
- StandardSummaryCard empty state left the `border-dashed + bg-white` anti-
  pattern for a Light Sky wash with Azure-tinted dashed border and a hover
  lift. The populated card already had lift; this gives the empty card
  surface presence so 7 empty cards in a grid do not read as flat.
- StandardSummaryCard chip font lifted from `text-[11px]` to `text-xs`.
- TheBarEmpty `space-y-3` -> `space-y-4`.
- ProposeNewStandard + SuggestImprovement `p-5` -> `p-6` for consistency
  with TheBar / TheBarEmpty.
- Sidebar coming-soon label hides on active rows so it cannot collide with
  the Fuchsia dot.

### Teaching Material PPT Builder (commit e87cc9a, the flagship)

Six explicit steps + Audit Stage. The seven pedagogical rules from the
session brief are stated explicitly in every relevant prompt (not inferred
from skill attachment): Gagné's 9 Events, Bloom's chip per slide, non-example
per core concept, Indian context with varied names/cities, constructive
prompts every 3-4 slides, one fun activity per session, future-skills topic
defaults. Plus the SAY / ASK / WATCH FOR teacher-notes shape and British
English / no em-dash surface rules. Audit Stage is the `{ prefix, fallback }`
shape with 20 fallback criteria.

Step 1 (frame) is a ten-constraint confirmation Claude must acknowledge
before writing; Step 2 maps slides to Gagné events with explicit budgets
(direct instruction <= half deck, elicit performance >= 3 slides, event 9
contains both application-to-life and preview-of-next-session); Step 3 is
the content-table step; Steps 4-5 handle visuals and assembly; Step 6 is a
10-row self-review against the ten rules from Step 1.

### Claude Carousel Generator + Carousel Design Framework skill (commit 44280c0)

Skill body is full (not a stub) and covers five-act arc, four swipe
mechanisms, copy limits, visual hierarchy, Instagram / LinkedIn specs, GSL
palette in carousel form, four audiences with language tells, anti-patterns,
and a Phase 2 measurement note.

Playbook has six steps + Audit Stage. Audit fallback covers 19 criteria
across arc / swipe mechanisms / copy limits / voice-per-audience / Indian
context / visual and platform match.

### Delivery Script + CBSE Summariser + Product Note (commit 50d0a26)

Three playbooks in one commit. Each moderately sized, each following the
Step-1 constraint-confirmation pattern lesson-plan and teaching-ppt
established.

- **Delivery Script Writer.** Six-segment session shape (opener / hook /
  concept / guided / independent / close) in SAY / ASK / WATCH FOR trainer-
  facing language, with differentiation (early finishers, struggling
  students, absent prior knowledge) and troubleshooting (tech failure,
  timing overrun, disengaged class).
- **CBSE Doc Summariser.** One-page, four-section summary (what changed,
  where it hits GSL, what GSL does next, who owns what). Every factual claim
  traceable to source reference. Every action has owner and deadline.
- **Product Note Builder.** One-page internal note for non-Academics
  audiences with five voice tells (Sales, Marketing, Leadership, Principals,
  Parents), positioning line, three key points with evidence, one visual,
  one CTA.

YAML gotchas caught during build verification and fixed: unquoted colons
inside `what_youll_make` / `before_you_start` item values (YAML reads
`"sections: what"` as a nested mapping) and double-quoted openers inside
`mid_flow_checks` items (`- "Why now" has at least...` ends the YAML string
at the closing quote). Restructured the three values to stay on safe YAML
ground without losing meaning. Lesson learnt: prefer phrasing that keeps
`:`-space and leading-double-quote out of unquoted YAML list items.

### Skill + Library UIs (commit f6d517a)

- `/skills` list page. Grid of skill cards, each showing category, title,
  summary, Draft badge if applicable, and a referenced-by count computed
  from every playbook's `skills_referenced` array.
- `/skills/[slug]` detail page. Hero with category / title / summary /
  edited-by meta. Prose-gsl markdown body. "Referenced by" block at the
  bottom listing every playbook whose frontmatter cites the skill.
- `/library` page. Server loads all outputs across 7 playbook subfolders,
  enriches with playbook title + icon, sorts by parsed-date-desc. Client
  component handles filters: playbook chips (All + 7), grade dropdown,
  topic/filename search. Warm empty state for the zero-outputs case (the
  expected week 2 state).
- Sidebar coming-soon labels removed from Skills and Library; Schools and
  Assignments still carry their `week 3` labels.

New components: `components/skill/card.tsx`,
`components/library/library-view.tsx`.

## Seven Phase 1 playbooks, now all authored

All seven slugs have playbook content:

```
teaching-ppt       (commit 14 this session)
lesson-plan        (week 1, still clean)
assessment         (week 1, still clean)
carousel           (commit 15 this session)
delivery-script    (commit 16 this session)
cbse-summary       (commit 16 this session)
product-note       (commit 16 this session)
```

`/standards` renders all 7 cards (all empty state) and `/playbooks` renders
all 7 playbook cards. Every playbook reader route prerenders.

## Skills: 4 on disk, 2 published, 2 draft

```
pedagogy-foundations        published   (week 1, full body from seed 04)
brand-voice                 draft       (week 1, stub; body in week 3)
ppt-patterns                draft       (week 1, stub; body in week 3)
carousel-design-framework   published   (commit 15 this session, full body)
```

`/skills` lists all 4 (sorted by title). Draft badge is visible on the two
stubs. Referenced-by counts are computed correctly: pedagogy-foundations is
cited by lesson-plan, assessment, teaching-ppt, delivery-script, cbse-
summary; brand-voice by all seven; ppt-patterns by teaching-ppt only;
carousel-design-framework by carousel only.

## Standards: still all empty

All seven `standards/<playbook>/current/` folders are empty in OneDrive.
Every playbook reader shows TheBarEmpty and every Audit Stage uses the
`fallback` branch (not `prefix`). This is the expected state. First
candidate: Ritu drops a reference deck into
`Acads/studio/standards/teaching-ppt/current/reference.pptx` with a
`rationale.md` alongside, records the share URL in
`meta/output-links.json`, runs `pnpm sync-content`, and the Studio
renders TheBar without any code change.

## Audit prompts: every new one is placeholder, needs Ritu's eyes

The five new playbooks shipped this session carry audit fallback prompts
Anish drafted from the handover guidance. They pass schema and compile, but
their specific criteria (20 for teaching-ppt, 19 for carousel, 19 for
delivery-script, 18 for cbse-summary, 19 for product-note) are Anish's
synthesis, not Ritu's. Ritu should review each for priority, phrasing, and
any pedagogical specifics that her direct classroom experience would put on
the list. See `TODOS.md > Content refinement queued for Ritu` for the
per-playbook checklist.

Pattern to keep: when Ritu updates an audit prompt, the `prefix` shape stays
short (surface checks only, because the current standard carries the quality
bar); the `fallback` shape stays comprehensive (full criteria list, because
there may not yet be a standard set).

## Generic content to flag for Ritu

A one-pass read through the five new playbooks surfaces areas where the
writing is Anish's best approximation and would benefit from Ritu's sharper
pass:

- **Teaching PPT, Step 3 teacher notes.** The SAY / ASK / WATCH FOR shape is
  clear, but the example WATCH FOR signals ("a student re-asking the same
  question", "three students writing the same wrong answer") are generic.
  Ritu likely has more specific tells from her classroom observations.
- **Carousel, audience-voice tells.** The language-tells for
  Parents / Educators / School Leaders / Students-and-Alumni (skill section
  7, playbook Step 1 rule 6) are Anish's framing. Ritu and the Marketing
  lead should validate, especially the Principals voice which leans on
  strategic / outcomes-focused framing that may or may not match how GSL
  principals actually talk.
- **Delivery Script, session structure.** The 5/5/15/10/5/5 split for 45
  minutes and 10/10/25/25/15/5 for 90 minutes is synthesised from the
  prior-project Teacher Manual but has not been validated against how GSL
  trainers actually run sessions today.
- **CBSE Summariser, "Why it matters now" expectation.** The playbook asks
  for Section 4 (Notes, caveats, open questions) to always have at least
  one caveat. This is Anish's opinion about good-summary hygiene; Ritu may
  disagree.
- **Product Note, voice-per-audience.** Five voice tells are Anish's
  synthesis. Marketing / Sales leads should validate Sales and Marketing
  tells; Leadership tells should be validated by Anish directly since he is
  the audience there.

Flag in `TODOS.md` for Ritu's week 3 content-pass.

## Time, rough

- Pre-commit-14 visual QA + polish pass: ~20 minutes (4 components + the
  page + the sidebar; code-review-based rather than running the live
  browser against the auth-gated site).
- Commit 14 (teaching-ppt flagship): ~45 minutes of prompt-engineering and
  structural work. This is the single highest-leverage commit of the
  session; did not speed-run per the handover direction.
- Commit 15 (carousel + skill): ~35 minutes. Full skill body was the
  longer piece; the playbook borrows structure from teaching-ppt.
- Commit 16 (three playbooks): ~45 minutes total, with ~10 of that in
  YAML-debugging the three parse errors caught by `pnpm build`.
- Commit 17 (skill + library UIs): ~35 minutes. Library's client-side
  filtering was the longer piece; skill surfaces were fast thanks to the
  existing playbook-card pattern to borrow from.
- Commit 18 (this report + TODOS + closeout verify): ~15 minutes.

Total session: roughly 3 to 3.5 hours, matches the 3-4 hour estimate from
the session 1 handover.

## What session 3 picks up

Per `TODOS.md > Week 3 inherited`, the headline week-3 items are:

1. Real bodies for Brand Voice and PPT Patterns skills (decision 007).
   After that, refactor the five new playbook audit fallbacks to reference
   these skills by slug instead of inlining surface conventions.
2. Ritu content-review pass across the five new playbooks (TODOS
   "Content refinement queued for Ritu").
3. Validation test on one real writer using the Teaching PPT audit
   (decision 004, deferred from week 3 original plan).
4. Skills + Assignments + Schools UIs if the week 3 backlog has room
   (schools and assignments still show `week 3` in the sidebar).

Nothing in this session's output blocks week 3. The YAML gotcha from
commit 16 is worth a note in the week 3 author's mental model when
drafting new playbook frontmatter: keep `:`-space and leading
double-quotes out of unquoted YAML list items, or use `|` block scalar
for long values.

## Environment refresher

- Node 24.14.1, pnpm 10.33.0, Windows.
- OneDrive source: `C:/Users/anish/OneDrive - MAF TECHNOLOGIES PRIVATE LIMITED/Acads/studio`.
- Sync (inline env, since `.env.local` is still unset):
  `GSL_ONEDRIVE_PATH="...studio" pnpm exec tsx scripts/sync-content.ts`
- Build in prod mode (reads content-synced/):
  `GSL_CONTENT_SOURCE=synced GSL_STUDIO_PASSWORD=test GSL_SESSION_SECRET=... pnpm build`
- Tests: `pnpm test`.
