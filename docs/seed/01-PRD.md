# GSL Academics Studio, Product Brief

**Version:** 0.1 (working draft, 20 April 2026)
**Owner:** Anish Dutta, Product, GSL
**Stakeholder:** Ritu, Head of Academics, GSL

## One line
A creation centre where the GSL Academics team makes everything they make, with AI as a co-worker.

## The problem
The Academics team ships content every week: teaching PPTs, lesson plans, assessments, reports, teacher briefs, product notes, textbook chapters, CBSE circular summaries. Quality varies across people because:

1. Everyone starts from a blank page. No shared prompts, no shared procedure.
2. The frameworks that make GSL content good, NEP 2020, NCF 2023, Bloom's taxonomy, CBSE conventions, brand voice, partner norms, live in people's heads. They get applied inconsistently.
3. Tools are scattered: Claude, ChatGPT, Midjourney, PowerPoint, Word, Excel, Drive. The team knows the tools. What they're missing is the procedure that strings them together.
4. Good past outputs disappear. The PPT Ritu made in November is not discoverable by the content writer making a similar one in April.

## What the Studio is
A single web app with three layers.

**Playbooks.** Step-by-step guided workflows for every creation task. Each playbook is a structured procedure: what you'll make, what you need, numbered steps with the exact prompts to copy into Claude or Midjourney, quality checks, examples of past outputs. The team never asks "how do I make X?" again. They open the playbook.

**Skill Library.** The frameworks and standards behind the playbooks, documented once, referenced everywhere. NEP 2020 summary. NCF 2023. CBSE conventions. ADDIE instructional design. Bloom's taxonomy with grade-appropriate distributions. GSL brand voice. Partner norms (Cambridge, Harvard, Prismix, VEX). Every playbook links to the skills it uses. If a skill updates, the linked playbooks reflect it.

**Operations Dashboard.** Lightweight, honest, useful. School directory with programme status. Task tracker for the team's own work. Content library with everything the team has ever made, searchable. Feedback collection from teachers, schools, and students.

## Users and access
- **Viewers** (entire Academics team + trainers): browse playbooks, use them, submit outputs to the content library, rate and suggest improvements to playbooks.
- **Editors** (Ritu's direct reports): edit existing playbooks and skills, create new ones.
- **Admin** (Ritu + Anish): manage users, review edits, approve structural changes, manage the school directory.

## Phase 1, four weeks
Ship the shell plus six playbooks plus the core skill file plus a minimum dashboard.

**Six playbooks:** Teaching Material PPT Builder, Lesson Plan Builder, Assessment Builder, CBSE Doc Summariser, Delivery Script Writer (trainers), Product Note Builder.

**One skill:** GSL Pedagogy Foundations (NEP, NCF, ADDIE, Bloom's, age-appropriateness).

**Minimum dashboard:** School directory (editable list) and Content Library (outputs from playbooks, searchable).

**Editor experience:** In-app rich editor for playbooks and skills, version history on every edit, no developer needed to update content.

## Phase 2, four weeks
Six more playbooks: Course Builder, Document Comparison Tool, Research Enabler, Report Generator, Sales PPT Builder, Train-the-Trainer PPT Builder. Four more skills. Task tracker, student scores dashboard with Excel upload, feedback collection.

## Phase 3, four weeks
The hard playbooks: Textbook Builder, Image Brief for Midjourney, Video Creation Guide, Forms Builder. Three more skills. Peer review workflow, usage analytics, custom playbook creator (Ritu can add new playbooks via a form, no dev). Polish: mascot, micro-interactions, onboarding tour, tablet responsiveness.

See `05-roadmap-phases.md` for full phase detail.

## Non-goals
- Not building a model. The team uses Claude, ChatGPT, Midjourney directly. The Studio is the layer between them and those tools.
- Not replacing content creation with generation. Every output is reviewed, edited, and shipped by a human.
- Not an LMS. We do not deliver content to students. We help the team make content.
- Not an Ops dashboard. Trainer allocation, escalation, billing belong to Ops. School directory is reference-only in the Studio.
- Not public-facing. This is internal tooling for the Academics team.

## Success criteria
- **Phase 1:** Ritu's team uses the PPT Builder playbook at least 10 times in the first two weeks after launch, without asking Anish for help.
- **Phase 2:** 80% of new academic content made by the team in a given month goes through a Studio playbook.
- **Phase 3:** The Studio is the first stop for any content task. A new hire is productive in their first week using only the Studio. Ritu creates her first custom playbook without Anish's help.

## Brand and tone
Warm, playful, craft-oriented. Not corporate SaaS. GSL colours primary (Turquoise Sea, Azure Blue, Orange Peel, Fashion Fuchsia, Light Sky). Illustrations over stock photos. Warm serif display font (Fraunces or similar) paired with clean sans-serif body (Inter). British English, Indian context, always. No emdash, anywhere.

## Open questions for Anish to resolve before build starts
1. **Auth.** Magic link or email/password? Default is magic link for friction.
2. **Domain.** `studio.getsetlearn.com`, `academics.getsetlearn.com`, or a sub-path on the main site?
3. **Midjourney.** Does the team share one account, or individual accounts? Affects how the image-brief playbook is structured.
4. **Claude access.** Is the team on Claude Max individually, or Claude Teams? Affects whether playbooks recommend Claude Projects (which needs Teams or Max).
5. **Showing Ritu.** Show her the wireframes after Design Review, or just show her a working Phase 1? Default: working Phase 1 beats slides.
