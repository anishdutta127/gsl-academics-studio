# GSL Academics Studio, Phased Roadmap

Four weeks per phase. Three phases. Twelve weeks to full scope.

Every function Ritu listed plus the dashboard, feedback, tracker, and library additions. Phasing is about shipping order, not scope cuts.

---

## Phase 1, weeks 1 to 4: Foundation

**Goal:** A working Studio with enough playbooks that Ritu's team starts using it daily in week 5.

### Shell and system
- Next.js repo scaffolded
- Supabase schema (playbook, skill, user, school, content_library, audit)
- Auth (magic link)
- Three roles (viewer, editor, admin) with RLS
- Home page: recently-used, featured, global search
- In-app Tiptap editor with playbook-specific custom blocks
- Version history on every edit, with diff and restore
- Content library (outputs uploaded after playbook completion)

### Playbooks (six)
1. **Teaching Material PPT Builder** (gold standard, already drafted)
2. **Lesson Plan Builder**
3. **Assessment Builder**
4. **CBSE Doc Summariser**
5. **Delivery Script Writer** (for trainers)
6. **Product Note Builder** (PPT + doc)

### Skills (three)
1. **GSL Pedagogy Foundations** (NEP, NCF, ADDIE, Bloom's, age-appropriateness, already drafted)
2. **GSL Brand Voice**
3. **GSL PPT Patterns** (slide structures, title conventions, citation rules)

### Operations (minimum viable)
- School directory (editable list: name, city, programmes, status, last touch)
- Content library browsing with search and filter

### Success criteria for Phase 1
- Ritu and her team make at least 10 real deliverables through the Studio in the first two weeks after launch.
- Zero developer-support calls for content edits. The team edits playbooks themselves through the in-app editor.
- Ritu gives a thumbs-up on the craft quality (the Studio feels like a GSL product, not a generic dashboard).

---

## Phase 2, weeks 5 to 8: Breadth and Depth

**Goal:** Cover more of the team's daily work, and make the dashboard actually useful.

### Playbooks (six more)
7. **Course Builder** (ADDIE-guided, long-form, multi-week courses)
8. **Document Comparison Tool** (old vs new version diffing with semantic change highlighting)
9. **Research Enabler** (finding examples for teaching support, a research assistant procedure)
10. **Report Generator** (events, research, proposals, awards; multiple templates)
11. **Sales PPT Builder**
12. **Train-the-Trainer PPT Builder**

### Skills (four more)
4. **GSL Assessment Standards** (Bloom's distributions, distractor quality, answer key conventions, age-appropriate difficulty)
5. **GSL Lesson Plan Structure** (hook, concept, practice, assessment, reflection; timing norms; differentiation)
6. **Partner Context** (Cambridge norms, Harvard case-method, Prismix alignment, VEX competition standards)
7. **GSL Report Conventions** (for proposals, award entries, event reports, research summaries)

### Operations additions
- **Task tracker** for the team's own work (simple kanban: To Do, In Progress, In Review, Done; assignable; playbook-linked)
- **Student scores dashboard** with Excel upload and per-school, per-student views; Ritu's Q17 wish list
- **Feedback collection** (forms to schools, teachers, students; responses visible in dashboard)

### Success criteria for Phase 2
- 80% of academic content produced in weeks 7-8 goes through a Studio playbook.
- The team uses the task tracker for at least two-thirds of their weekly work items.
- First feedback forms live with at least three schools having filled them.
- Student scores dashboard shows data for at least 10 schools.

---

## Phase 3, weeks 9 to 12: Craft and Completeness

**Goal:** Everything Ritu listed. Plus the polish that makes the Studio feel like a craft tool, not a box of forms.

### Playbooks (the hard ones)
13. **Textbook Builder** (NEP/NCF-mapped, chapter-by-chapter, with conventions for front matter, chapter structure, exercises, glossary, index)
14. **Image Brief for Midjourney** (with style guides per content type: classroom illustration, infographic, character design, poster art)
15. **Video Creation Guide** (planning, storyboard, shoot or screen-record workflow, editing procedure, export and caption rules)
16. **Forms Builder** (feedback forms, surveys, with direct deployment via Google Forms or Tally; question-type guidance)

### Skills (wrap-up)
8. **GSL Textbook Conventions** (front matter, chapter structure, exercise types, glossary, index, paper size and print specs)
9. **GSL Visual Style for Images and Video** (illustration style, character guidelines, motion/transition conventions)
10. **GSL Form Design Standards** (question flow, response types, anonymity rules, analysis conventions)

### Operations additions
- **Peer review workflow.** Content writer A finishes a lesson plan; writer B reviews before it ships. Review state, comments, approve/request-changes.
- **Usage analytics.** Which playbooks are used most, by whom, with what output ratings. Helps Ritu see what's working.
- **Custom playbook creator.** Ritu (admin) can create a new playbook through a structured form, no dev needed. This is the future-proofing move.

### Polish
- Studio mascot on empty states, loading, success confirmations (name it together with Ritu)
- Micro-interactions on copy-prompt, step-complete, checklist-tick, playbook-publish
- Empty states with charming copy and illustrations (not "No data")
- Onboarding tour for new team members (5 minutes, interactive)
- Tablet-responsive polish (trainer review on iPad)
- Dark mode (optional; team vote)

### Success criteria for Phase 3
- The Studio is the team's first stop for any content task. New hire productive in first week using only the Studio.
- 95% of academic content in weeks 11-12 goes through the Studio.
- Ritu creates her first custom playbook without Anish's help.
- At least three feedback suggestions from team members have been implemented as playbook or skill edits.

---

## What we're deliberately not building

Phase-honest list of what's out of scope for this system:

- Trainer allocation and scheduling (Ops system)
- School escalation matrix and SLA tracking (Ops system)
- Billing, partner contract tracking (Accounts system, already exists: MOU Management)
- LMS for student delivery (future separate product)
- Public-facing content site (marketing, not Academics)
- Integrations with school SIS systems (future)
- Parent-facing communication (future)
- Social media scheduling (not Academics scope)

These belong elsewhere. The Studio stays tightly focused on the Academics team's creation work.

---

## Phase 4 and beyond (speculative, after Phase 3 ships)

- Integration with Claude for Projects / Claude API (if the team wants deeper AI tooling, not just copyable prompts; this is a significant design conversation)
- Voice-based playbook walkthrough for trainers in the field (mobile-first mode)
- Regional language support: Hindi first, then regional
- Integration with VEX and IITG AI programme-specific tooling
- Partner-facing dashboards (Cambridge sees their schools' progress)
- Public playbook marketplace (other EdTech teams use GSL-authored playbooks)

These are bridges to cross after Phase 3 has been used in production for a real quarter.

---

## Mapping to Ritu's original 14 tasks

| Ritu's Q20 item | Where it lands |
|---|---|
| 1. Govt doc summariser (CBSE) | Phase 1, Playbook 4 |
| 2. Comparison tool (old vs new) | Phase 2, Playbook 8 |
| 3. Course builder (ADDIE) | Phase 2, Playbook 7 |
| 4. Lesson plan (with pedagogy) | Phase 1, Playbook 2 |
| 5. PPT builder (all types) | Phase 1 (Teaching) + Phase 2 (Sales, Train-the-Trainer) + Phase 1 (Product Note) |
| 6. Delivery script for trainers and sales | Phase 1, Playbook 5 (trainers) + Phase 2 sales variant |
| 7. Train-the-trainer PPT | Phase 2, Playbook 12 |
| 8. Images (Midjourney), video creation and editing | Phase 3, Playbooks 14 and 15 |
| 9. Research enabler | Phase 2, Playbook 9 |
| 10. Assessment creation | Phase 1, Playbook 3 |
| 11. Report generation | Phase 2, Playbook 10 |
| 12. Textbook creation | Phase 3, Playbook 13 |
| 13. Product note | Phase 1, Playbook 6 |
| 14. Forms | Phase 3, Playbook 16 |

Plus your additions: school directory (Phase 1), content library (Phase 1), task tracker (Phase 2), student scores dashboard (Phase 2), feedback collection (Phase 2), peer review (Phase 3), analytics (Phase 3), custom playbook creator (Phase 3).

Nothing Ritu asked for is cut. Every wish has a slot.
