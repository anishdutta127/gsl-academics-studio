# Week 2, session 1 → session 2 handover

Wrote 2026-04-22 after commits 8-13. Read this at the start of session 2.

## Status: green

`pnpm typecheck` clean, `pnpm test` 25/25, `pnpm build` clean. Last commit:
`45eac8d` on `master`. No remote push yet; commit `pnpm sync-content` against
the current OneDrive path works and reports zero warnings.

## Shipped this session (commits 8-13)

```
45eac8d [content] audit prompt becomes { prefix, fallback }, integrates current standard
dc7341b [ui] standards pages + sidebar nav + playbook reader integration
573d7e5 [ui] standards UI components + dev preview route
fc5e6e3 [content] standards loader + Zod schemas + pure helpers + tests
788119f [docs] decision 012: the Standards System + folder structure
4ddd3e2 [content] GSL future-skills topic alignment sweep
```

**Commit 8** swept every authored file for traditional-curriculum defaults
(photosynthesis, industrial revolution, fractions, water cycle, generic maths)
and replaced with GSL future-skills topics (chatbot, robotic arm, stop-motion,
startup pitch, water-crisis problem-solving, sustainable app, team-project
management, video story). `docs/seed/` and `docs/prior-project/` are frozen
per the seed README and were not touched.

**Commits 9-13** built the Standards System end to end per decision 012:

- OneDrive folder structure for all 7 playbook slugs under
  `Acads/studio/standards/<slug>/{current,proposals,archive}/` with .gitkeeps.
- Sync script filters binaries out of the `standards/` tree (only .md / .json /
  .gitkeep sync; reference files stay in OneDrive per decision 010 risk 1).
- Loader at `lib/content/standards.ts`, pure helpers at
  `lib/content/standards-helpers.ts`, Zod schemas in `lib/content/types.ts`,
  9 new unit tests (extractKeyQualities + StandardRationaleSchema).
- UI components: `TheBar`, `TheBarEmpty`, `ProposeNewStandard`,
  `StandardSummaryCard`, plus a shadcn `Dialog` primitive and a
  `relativeTimeFromIsoDate` helper.
- `/standards` index page with 7-card grid (all currently empty state).
- Sidebar has **Standards** between Skills and Library.
- `/dev/standards` storybook-style route mounts all four Standards component
  states with mock data.
- Playbook reader mounts `TheBar` / `TheBarEmpty` between hero and
  "Use this when", and `ProposeNewStandard` after Audit Stage.
- Audit prompt schema changed from `string` to `{ prefix, fallback }`. Both
  existing playbooks (lesson-plan, assessment) updated atomically. AuditStage
  composes the runtime prompt: standard preamble + key-quality bullets +
  share URL + prefix when a standard exists, or the fallback verbatim when
  not.

## What's left in week 2 (commits 14-18)

### Commit 14 — Teaching Material PPT Builder (the heavy one)

**This commit is the point of the session.** The prompt quality in this
playbook IS the product. Do not speed-run it.

File: `C:/Users/anish/OneDrive - MAF TECHNOLOGIES PRIVATE LIMITED/Acads/studio/playbooks/teaching-ppt.md`

Starting material: `docs/seed/03-playbook-ppt-teaching-material.md` (the
gold-standard seed from week 0; good structural reference). Enhance heavily.

**Pedagogical rules that MUST appear in the Claude prompt text, not just as
skill references:**

- **Gagné's 9 Events of Instruction as the structural backbone.** Step 1's
  outline prompt tells Claude to map slide content to events 1-9. Writer
  should see "slide 3 aligns to Gagné event 3, Stimulate Recall" in the
  output, not just a generic slide order.
- **Per-slide Bloom's chip as explicit instruction in Step 2.** Every content
  slide's spec includes a Bloom's level ("Remember", "Apply", "Analyse", etc.)
  so the teacher and the writer can see the cognitive mix at a glance. Prompt
  tells Claude to include the chip as a top-right annotation on each slide's
  spec.
- **Non-examples mandatory for every core concept.** If the slide teaches
  "what a chatbot is", the next slide or a callout on the same slide shows
  "what a chatbot is NOT" (e.g. "a chatbot is not a search engine with
  manners"). Prompt tells Claude: "for every core concept, include a
  non-example that makes the concept boundary crisp."
- **100% Indian context.** Names (Priya, Arjun, Fatima, Harpreet, Ravi,
  Ananya, Kabir). Cities (Kanpur, Pune, Bhopal, not Mumbai default; vary).
  Scenarios (paani-puri stall, Diwali, Dussehra, a Chennai family WhatsApp
  group, a Goa beach cleanup, not Thanksgiving, not suburbs, not prom).
  Currency in Rs. Prompt tells Claude EXPLICITLY at the top of every content
  step, not just in audit.
- **Constructive learning prompts every 3-4 slides.** Peer discussion,
  "compare with your neighbour", "think-pair-share", group challenge. Not at
  the end as a catch-all; interleaved through the deck. Prompt tells Claude:
  "every 3 to 4 content slides, add a Try-this-with-your-neighbour prompt
  or a class-discussion card. These are real constructive moments, not
  cosmetic."
- **At least one genuinely fun activity per 10 slides.** Not trivia. Not a
  quiz. Something the class will remember. Prompt tells Claude: "every 10
  content slides include one fun activity that the writer would be excited
  to watch the class do. Examples: students build a simple rule-based
  chatbot on paper and trade with a partner; students role-play a
  city-council meeting about the water crisis; students storyboard one
  scene of a video with emoji; students pitch a fake startup in 30
  seconds to the person next to them. No generic gamification."
- **Future-skills topics dominant, CBSE-adjacent only when the topic
  requires it.** Every example and scenario the prompt generates should
  assume the subject is a GSL programme topic (STEM/IIT-G chatbots,
  robotics, AI; Young Pioneers startup concepts; VideoGenX video craft;
  Solevit city problems; Harvard Manage Mentor team decisions; Talk & Learn
  communication practice). If the user submits a traditional CBSE topic,
  fine, but defaults skew future-skills.

**Other commit-14 requirements:**

- Five to seven steps total (roughly: outline, slide content, visual briefs,
  brand pass, place visuals, quality review, audit).
- Mid-flow checks per step (2 to 3 each, per the pattern in lesson-plan.md
  and assessment.md).
- Audit Stage uses the new `{ prefix, fallback }` shape. Prefix is the
  short surface-check + return-format directive (the standard defines the
  bar). Fallback is the complete criteria-enumerated audit including all
  six pedagogical rules above. See lesson-plan.md audit_prompt_template
  for the pattern.
- `skills_referenced: [pedagogy-foundations, brand-voice, ppt-patterns]`.
- `related_playbooks: [lesson-plan, assessment, carousel]`.
- Programme examples span STEM/IIT-G, Young Pioneers, VideoGenX, Solevit,
  Harvard Manage Mentor, Talk & Learn. Do not anchor on one programme.
- No em-dash. British English. Grep-verified before commit.

### Commit 15 — Claude Carousel Generator (+ skill)

- Migrate the "Carousel Design Framework" skill file description from
  `docs/prior-project/data/skill-files.json` into
  `Acads/studio/skills/carousel-design-framework.md`. Write a real body,
  not a stub. Card flow logic, visual hierarchy, copy limits, storytelling
  arc (hook → problem → solution → proof → CTA), Instagram / LinkedIn
  platform rules, GSL brand in carousel form.
- New playbook at `Acads/studio/playbooks/carousel.md`. Platform selector
  at step 1 (Instagram, LinkedIn), audience (parents, educators, students,
  alumni), 6-10 slide arc, per-slide copy, visual brief for each slide for
  Midjourney or designer handoff. Audit with the new { prefix, fallback }.
- Content library doesn't exist yet at this commit; outputs go into
  `Acads/studio/outputs/carousel/` (folder already created in commit 9).

### Commit 16 — Delivery Script + CBSE Summariser + Product Note

Three new playbooks in one commit (each moderately sized, none as heavy
as teaching-ppt):

- **Delivery Script Writer** (trainers): adapt from prior-project
  Teacher Manual. Session-script shape: opener 5 min, hook 5 min,
  concept 15 min, guided 10 min, independent 5 min, close 5 min.
  Teacher-facing language: what to SAY, what to ASK, what to WATCH FOR.
- **CBSE Doc Summariser**: from scratch. Extract what changed, what GSL
  needs to do, who owns follow-up, what timeline. Audit against brevity
  + accuracy + actionability.
- **Product Note Builder**: from scratch. Internal one-pager for
  non-Academics audiences. Positioning, three key points with evidence,
  visual brief, CTA.

### Commit 17 — Skill UI + Library UI

- `/skills` list page with card grid of all published skills.
- `/skills/[slug]` detail page rendering the markdown body with prose-gsl
  typography. Shows "Referenced by" footer listing playbooks that cite
  the skill.
- `/library` page reading all outputs across all 7 playbook subfolders.
  Grid sorted by date desc. Filter chips by playbook + grade dropdown.
  Client-side search by topic / filename substring.
- Remove the "coming soon" chips from Skills and Library in sidebar.

### Commit 18 — closeout

- Local verification end-to-end (dev server, sign-in, each page renders).
- Update TODOS.md (if one exists; create it if not) with week 3 inherited
  items: Admin standards-review UI, skill-drift automated flagging,
  filename-convention enforcement in sync, Phase 2 orphan reaper, etc.
- Closeout report flagging: which playbooks have placeholder audit prompts
  (all new ones will need Ritu's refinement), any existing content that
  feels generic (mark for Ritu review), time spent vs budget.

## Time estimate for session 2

3-4 hours focused if fresh, spread across commits 14-18. Commit 14 alone
is ~60-90 minutes if the pedagogical prompt engineering is done well.
15 and 16 are ~30-45 each. 17 is ~45-60. 18 is ~20-30.

**Do not speed-run commit 14.** If the session is running short, drop
commits 16-17 to a session 3 rather than shipping a Teaching PPT playbook
whose prompt is pedagogically thin. Prompt quality in that playbook is
the product.

## Pre-flight for session 2

Before writing code in session 2, spend 5 minutes on visual QA:

1. Start dev: `pnpm dev`. Password login works.
2. Hit `/standards`, confirm the 7-card grid renders with 7 empty-state cards.
3. Hit `/dev/standards`, confirm TheBar (populated, with share URL),
   TheBar (populated, no share URL), TheBarEmpty, and
   ProposeNewStandard all render. Open both dialogs (Read the rationale,
   Propose a new standard) and copy the rationale template, verify copy
   works.
4. Hit `/playbooks/lesson-plan` and `/playbooks/assessment`. Confirm
   TheBarEmpty renders between the hero and "Use this when" on both.
   Confirm ProposeNewStandard renders after Audit Stage and before the
   Suggest-improvement aside. Open Audit Stage accordion, copy the audit
   prompt, confirm the fallback text lands (standard is not set, so the
   long criteria list should be in the clipboard).
5. Click sidebar "Standards", confirm the Fuchsia indicator dot lands on
   the active row.

If anything looks off visually before code starts, fix it in a small first
commit of session 2 before moving to commit 14. It's easier to notice
structural issues with fresh eyes.

## Environment refresher

- Node 24.14.1, pnpm 10.33.0, Windows.
- OneDrive source: `C:/Users/anish/OneDrive - MAF TECHNOLOGIES PRIVATE LIMITED/Acads/studio`
- Sync (from shell with env inline, or via `pnpm sync-content` once
  `.env.local` is set):
  `GSL_ONEDRIVE_PATH="...studio" pnpm exec tsx scripts/sync-content.ts`
- Build in prod mode (reads content-synced/):
  `GSL_CONTENT_SOURCE=synced pnpm build`
- Test: `pnpm test`

## Reference playbooks for commit 14's shape

Read these before drafting teaching-ppt.md:

- `Acads/studio/playbooks/lesson-plan.md` for step structure, mid_flow_checks
  pattern, and `audit_prompt_template: { prefix, fallback }` shape.
- `Acads/studio/playbooks/assessment.md` for the mode-selection step 1
  pattern (Teaching PPT doesn't need mode selection but the pattern of
  "confirm constraints before producing content" is useful).
- `docs/seed/03-playbook-ppt-teaching-material.md` for the original
  structural outline (frame, generate, brief visuals, apply brand, place,
  review). Do not use its topic examples (photosynthesis, Mughal Empire);
  substitute GSL future-skills topics.

## Open questions for Ritu (accumulating, not blocking session 2)

- Actual Google Form URL for feedback (`GSL_FEEDBACK_FORM_URL` still
  placeholder).
- Domain decision (`studio.getsetlearn.com` still the assumed default).
- Whether we want the Phase 2 per-writer usage dashboard (decision 008 is
  obsolete but the underlying question remains open long-term).
- First standards candidates: as soon as she's ready, she can drop one
  real reference deck or lesson plan into OneDrive's current/ folder
  with a rationale.md, and the Studio will render it without any code
  change.
