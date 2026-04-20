# GSL Academics Studio, Claude Code Execution Plan

Step-by-step from empty directory to deployed Phase 1. Roughly four weeks of focused work if you're putting 2 hours a day into it.

## Prerequisites
- **Claude Code** installed and authenticated. (Your Claude Max subscription includes it.)
- **Node 20+** and **pnpm**.
- A **Supabase** account and a new project created (free tier for dev, Pro for production later).
- A **Vercel** account.
- Your **gstack** slash commands available in Claude Code.
- 15 minutes of Ritu's time to approve the seed pack before you build.

## Step 0, prep the seed pack
The seed pack is in `/mnt/user-data/outputs/gsl-academics-studio-seed/`. Download it. Keep it accessible.

Read the files in order: 00-README, 01-PRD, 05-roadmap-phases, then 02-CLAUDE, then the gold-standard examples in 03 and 04. This is your own briefing.

---

## Step 1, check in with Ritu
Before you build anything, run the seed pack past Ritu on WhatsApp:

> Hi Ritu ma'am, based on your questionnaire I've drafted the plan for the Academics Studio. Everything you listed is in there, phased across three months. Mind taking 15 minutes to look at the roadmap and one sample playbook? Just want to make sure I'm on the right track before I start building.

Send her `01-PRD.md` and `05-roadmap-phases.md` and `03-playbook-ppt-teaching-material.md`. Not all six files, three is plenty.

Wait for her reaction. If she says "go", proceed. If she has edits, update the seed pack and proceed.

---

## Step 2, create the repo
In your terminal:

```bash
mkdir gsl-academics-studio
cd gsl-academics-studio
git init
mkdir -p docs/seed
# copy all six seed files into docs/seed/
# copy 02-CLAUDE.md to repo root as CLAUDE.md
cp docs/seed/02-CLAUDE.md ./CLAUDE.md
```

The duplicate of CLAUDE.md is intentional. `docs/seed/02-CLAUDE.md` is the frozen seed. `CLAUDE.md` at root is the living context file Claude Code reads and updates.

Create the initial commit:
```bash
git add .
git commit -m "[seed] initial seed pack from PRD"
```

---

## Step 3, open Claude Code, start the session
Open Claude Code in the repo root:

```bash
claude
```

First message to Claude:

> New project, GSL Academics Studio. Read everything in `docs/seed/` and the root `CLAUDE.md` before responding. These files define the brief, the tech decisions, the style rules, and the gold-standard examples for playbooks and skills.
>
> Once you've read all of them, confirm you understand by listing: (a) the three layers of the product, (b) the stack, (c) the three style rules that are non-negotiable, (d) the five things on the "don't" list. Don't write any code yet.

**Expected response:** Claude confirms the brief and lists the items. If it gets anything wrong, correct it and ask again.

---

## Step 4, run /office-hours
Use your gstack `/office-hours` command to produce the initial execution plan. Paste the PRD as input.

```
/office-hours

<paste contents of 01-PRD.md>
```

**Expected output:** A phased execution plan. Should match Phase 1 of the roadmap closely. If Claude proposes scope cuts you don't agree with, push back.

---

## Step 5, /plan-ceo-review
Focus questions:
- Is Phase 1 scope shippable in 4 weeks by one developer (Claude Code) plus a product (you)?
- Is the moat clear? (The skill library as shared, evolving IP.)
- What's the biggest risk?

**Expected output:** A critique with concrete concerns. Common issue to watch for: Claude suggesting we cut Phase 1 to "just playbooks". Don't let it. The in-app editor is what makes this a platform, not a brochure.

---

## Step 6, /plan-eng-review
Technical stress-test:
- Supabase schema (playbook, skill, library, user, role, audit, school, version tables)
- Auth and role gating with RLS policies
- Rich editor choice (Tiptap with custom blocks, not raw Markdown textarea)
- Version history implementation (Postgres trigger inserting into `playbook_versions` on every write)
- File storage (Supabase Storage)
- Seeding strategy (markdown files with YAML frontmatter, parsed by `pnpm seed` script)
- Search (Postgres full-text for playbooks and skills)

**Expected output:** SQL migrations, type definitions, and a concrete list of first five PRs.

---

## Step 7, /plan-design-review
Claude sketches:
- Wireframes for five screens: home, playbook list, playbook detail (reader mode), playbook editor, content library
- A component system consistent with GSL brand (spacing scale, type scale, colour tokens)
- The mascot concept (or argues against it)
- Empty states and micro-interaction ideas

**Expected output:** Markdown wireframes (ASCII or simple descriptions) plus a `design-tokens.ts` file with the GSL palette and type system.

---

## Step 8, build, scaffold the repo
Once all three plan reviews are approved:

> Execute Phase 1, Task 1: scaffold the repo. Next.js 14 with App Router, TypeScript strict, Tailwind, shadcn/ui, Supabase client setup. Folder structure per CLAUDE.md. Make the home page shell with top nav and sidebar. Leave content areas as placeholders. Commit when done.

**Expected output:** A clean scaffold. Verify locally. Commit.

---

## Step 9, build, database and auth
> Phase 1, Task 2: Supabase schema and auth. Write the SQL migrations for all tables (playbook, skill, playbook_version, skill_version, user_profile, school, content_library_item, feedback). Set up magic-link auth. Set up RLS policies for the three roles.
>
> Write a seed script at `scripts/seed.ts` that reads markdown files from `content-seed/` with YAML frontmatter and inserts them into the DB.
>
> Don't seed data yet. Just the infrastructure.

**Verify:** Migrations apply cleanly to a fresh Supabase project. Auth works (magic link email arrives). RLS blocks unauthorised writes.

---

## Step 10, build, playbook list and detail pages (reader mode)
> Phase 1, Task 3: playbook list and detail views, read-only. Copy the gold-standard playbook from `docs/seed/03-playbook-ppt-teaching-material.md` into `content-seed/playbooks/` and run the seed script. Verify the playbook is in Supabase.
>
> Then build the list view (card grid with icon, title, category, time, difficulty) and the detail view. The detail view should render every field beautifully:
> - Hero: icon, title, "what you'll make", time, difficulty badges
> - "Use this when" as a warm callout box
> - "Before you start" as a checklist
> - Steps as numbered accordions, each with a copyable prompt block (monospace, "Copy" button with "Copied" confirmation), expected output, next action
> - Quality checklist as interactive checkboxes, state saved per user
> - Common pitfalls as a warm warning box
> - Examples gallery placeholder
> - "Improve this playbook" button
>
> This is the heart of the product. Spend time on it.

**Verify:** Open the PPT Builder playbook. Read it end-to-end. Copy every prompt. Tick every checklist item. Is it pleasant? If not, iterate until it is.

---

## Step 11, build, skill list and detail pages (reader mode)
> Phase 1, Task 4: skill list and detail views, read-only. Seed the gold-standard skill from `docs/seed/04-skill-gsl-pedagogy-foundations.md`.
>
> Skills are simpler to render than playbooks: a long-form markdown document with a summary, body, and use cases. Plus: show which playbooks reference this skill (two-way link).

---

## Step 12, build, the in-app editor
> Phase 1, Task 5: in-app editor for playbooks and skills. Role-gated (editor and admin only). Tiptap-based with custom blocks for:
> - **Step block:** title, instruction, tool (select), prompt (code), expected output, next action
> - **Prompt block:** a code block with "Copy" affordance
> - **Checklist block:** array of checkable items
> - **Skill-reference block:** link to another skill by slug
>
> Autosave as draft every 10 seconds. Explicit "Publish" action bumps version and sets status to published. Version history side panel shows all prior versions with diff view and restore action.
>
> This is the hardest part of Phase 1. Iterate with Claude Code across multiple sessions if needed.

**Verify:** Edit the PPT Builder's Step 2 prompt. Save. See version history. Restore an old version. All should feel instant and safe.

---

## Step 13, build, content library
> Phase 1, Task 6: content library. Users upload outputs they made through a playbook (.pptx, .docx, .pdf). Metadata: playbook used, topic, grade, programme, date, author, notes.
>
> Search (full-text across metadata) and filter (by playbook, programme, grade, author).
> Preview: image thumbnails for images, icon for documents.
> Download: direct link from Supabase Storage.

---

## Step 14, seed the remaining five Phase 1 playbooks
For each of the remaining Phase 1 playbooks, draft the markdown in the same format as the gold standard, then seed. Use Claude Code to help draft.

Prompt to use for each:

> I need to draft the [PLAYBOOK NAME] playbook in the same format as `docs/seed/03-playbook-ppt-teaching-material.md`. The output should be an academic deliverable [describe]. Steps should walk the user through using Claude and any other tools in the right order. Reference the GSL Pedagogy Foundations skill where relevant. Keep British English, Indian context, no emdash.

Remaining playbooks:
1. Lesson Plan Builder
2. Assessment Builder
3. CBSE Doc Summariser
4. Delivery Script Writer (trainers)
5. Product Note Builder

Draft each, review carefully, send drafts to Ritu for feedback, refine, seed.

---

## Step 15, build, school directory and supporting skills
> Phase 1, Task 7: school directory. Simple list view (name, city, programmes active, status, last touch date). Editable by admin through a form (not Tiptap; plain structured form). Search and filter by city and programme.
>
> Also seed the two remaining Phase 1 skills: `gsl-brand-voice.md` and `gsl-ppt-patterns.md`. Draft them first if they don't exist yet. Follow the gold-standard structure.

---

## Step 16, /review
Run your gstack `/review` command. Claude walks through the built app and flags issues.

---

## Step 17, /qa
Phase 1 acceptance checklist:
- [ ] A viewer can log in, open PPT Builder, read every step, copy every prompt, complete the checklist, upload the final output to the library.
- [ ] An editor can modify PPT Builder's Step 2 prompt, save, see version history, restore an old version.
- [ ] An admin can add a new school to the directory.
- [ ] Every page works on a 13-inch laptop screen and scales sensibly to 27-inch.
- [ ] British English everywhere. Run `grep -riE "organize|color|realize|behavior|program[^m]"` across the repo, fix any hits.
- [ ] No emdashes. Grep for `—` character. Fix any hits.
- [ ] All six Phase 1 playbooks seeded and readable.
- [ ] All three Phase 1 skills seeded and readable.
- [ ] Version history works on both playbooks and skills.
- [ ] Content library accepts .pptx, .docx, .pdf uploads.
- [ ] Mobile-responsive (not mobile-first; just doesn't break).

---

## Step 18, /ship
Deploy to Vercel staging. Get the URL. Share with Ritu along with a 5-minute Loom walkthrough you record.

If Ritu says yes, push `main` to production. If she wants changes, make them, ship again.

---

## Phase 2 kickoff (weeks 5-8)
Same rhythm. See `05-roadmap-phases.md` for Phase 2 scope. Start with `/office-hours` + Phase 2 scope as input.

## Phase 3 kickoff (weeks 9-12)
Same rhythm again. Polish and the hardest playbooks.

---

## Rhythm tips
- **Daily** Claude Code session, 2 hours max, focused on one task.
- After every session, **commit**. Write a one-line note in the commit message on what you learned.
- **Once a week**, update `CLAUDE.md` with any new convention or decision. Future-you and future-Claude will thank you.
- **Once a week**, update `05-roadmap-phases.md` with what actually shipped vs what was planned. Ritu gets a progress email every Monday.

## When Claude Code gets stuck
- Paste the error into a new message. Ask Claude to re-read the relevant files before proposing a fix.
- If Claude goes in circles: stop, summarise the state in plain English, give it back as a fresh message.
- If a task is bigger than expected, split into two. Never let one task grow for three days without a commit.

## When you're stuck (product, not engineering)
- WhatsApp voice note to yourself explaining what you're trying to do. Listen back. Often the answer is audible.
- If stuck on product decisions, not engineering: open a fresh Claude.ai chat (not Claude Code) and think out loud. Come back to Code with the decision made.

## When Ritu pushes back on something
- Thank her. She's the user, her pushback is the gold signal.
- Update the PRD and roadmap to reflect her feedback.
- Re-prioritise if needed. Don't fight over scope.

## Done means shipped, used, loved
Phase 1 is done when the team uses it daily for two weeks without complaint. Not when we deploy. Not when Ritu says "thanks". When the team can't imagine not having it.

That's the bar. Go make it.
