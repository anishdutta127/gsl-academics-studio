# TODOS, GSL Academics Studio

Phase 1 scope-complete items get checked off in commit messages. This file
holds the items that deliberately missed the week 2 cut for reasons the
architecture decision records lay out. Each item carries the decision that
deferred it and the trigger that should bring it back.

## Week 3 inherited

- [ ] **Brand Voice and PPT Patterns skills get real bodies.** Decision 007.
  Currently stubs. Week 3 task: write full bodies, then refactor the five new
  playbooks' audit fallbacks (teaching-ppt, carousel, delivery-script,
  cbse-summary, product-note) to reference these skills by slug instead of
  inlining surface conventions. Lesson-plan and assessment already follow
  that pattern; the five new ones currently inline per decision 007.
- [ ] **Admin standards-review UI.** Decision 012 Phase 2 split. Today,
  promoting a proposal is a manual OneDrive folder move by Ritu. Trigger for
  Phase 2 UI: promotion happens more than twice per month, OR a proposal is
  accidentally lost during a manual move.
- [ ] **Skill-drift automated flagging.** When a skill body changes, which
  playbooks that reference it should be re-audited? Today: manual. Phase 2:
  surface a "skill updated on DATE, N playbooks reference this skill" banner
  on each playbook reader, and a "re-run audit" nudge on outputs produced
  before the change.
- [ ] **Filename-convention enforcement in sync.** Decision 011 B. The
  sync script currently accepts any filename in outputs/*. When Ritu has
  approved the convention as canonical, the sync should warn on (but not
  block) files that do not parse. Already flagged in the library UI itself
  with a "Naming convention not followed" note.
- [ ] **Phase 2 outputs orphan reaper.** If an output is dropped into
  outputs/playbook-slug/ but no meta/output-links.json entry is written,
  the library still lists it with "Ask Anish for the share link". Phase 2:
  sync script writes a orphan-report.json listing outputs without links,
  and the library shows a quiet badge.
- [ ] **Instrumented validation of the Audit Stage.** Decision 004 calls for
  a week 3 validation test: run a real writer through the Teaching PPT audit
  and see whether the audit catches intentional failures (American spelling,
  weak Bloom's chip, missing non-example). Week 3 task: pick one writer
  (Priya or one of Ritu's content team), instrument the session, write up.

## Phase 2 (deferred by architecture decisions)

- [ ] **Per-writer adoption analytics.** Decision 010 risk 4. No events
  recorded in Phase 1; adoption is qualitative (decision 006). Bring back
  when adoption metric shows 80%+ sustained use AND the team asks for per-
  playbook analytics.
- [ ] **In-app markdown editor.** Decision 002 (obsolete), decision 010.
  Ritu edits directly in OneDrive today. Bring back if Ritu asks for in-app
  editing as a top-two observed pain point.
- [ ] **Output upload UI.** Decision 005 (obsolete). Writers drop files into
  OneDrive. Bring back if OneDrive drops become a bottleneck, or if a non-
  OneDrive writer (an external partner) needs to contribute.
- [ ] **Role distinctions.** Decision 010 explicitly cut them. Bring back if
  team grows past 8-10 users OR Ritu needs to attribute specific edits.
- [ ] **Nightly cron for pnpm sync-content.** Decision 010 "what we give up".
  Today, Anish runs sync manually. Bring back if Ritu's edits regularly go
  stale in production for more than 3 days.
- [ ] **Train-the-Trainer PPT Builder playbook.** Forward-referenced in
  teaching-ppt.md's related_playbooks. Scope for Phase 2 or Phase 3 once
  the trainer-facing pipeline is more mature.

## Content refinement queued for Ritu

The five new playbooks shipped in week 2 carry audit prompts Anish wrote.
Ritu should review each for language, priorities, and any pedagogical
specifics that the playbook's own voice did not capture:

- [ ] teaching-ppt.md (commit 14). 20 fallback criteria; Ritu to confirm
  Bloom's honesty, non-example realism, and teacher-notes shape are what
  she wants the audit to check.
- [ ] carousel.md (commit 15). 19 fallback criteria; Ritu to validate
  audience voice tells (parents / educators / school leaders / students).
  This playbook is the only non-academics one on the list; confirm it
  belongs here rather than in a future Marketing surface.
- [ ] carousel-design-framework.md skill (commit 15). First-pass body by
  Anish. Ritu to validate platform specs (Meta and LinkedIn specs shift)
  and the four-audience language tells.
- [ ] delivery-script.md (commit 16). Session structure (5/5/15/10/5/5 for
  a 45-minute session) was Anish's synthesis from the prior-project Teacher
  Manual; Ritu to confirm it matches how trainers actually run GSL
  sessions.
- [ ] cbse-summary.md (commit 16). Four-section structure was a from-
  scratch draft; Ritu to validate whether Section 4 (Notes, caveats, open
  questions) earns its weight or should be merged into Section 3.
- [ ] product-note.md (commit 16). Five-audience voice tells were Anish's
  synthesis; Ritu and the Marketing / Sales leads should validate them.

## Current standards, all empty

All seven /standards/<playbook>/current/ folders are empty in OneDrive.
Until Ritu drops a rationale.md + reference.<ext> into at least one of
them, every playbook renders TheBarEmpty, and every Audit Stage uses the
fallback (not prefix). This is the expected state for week 2 per decision
012 and the handover.

First standards candidate: the Teaching Material PPT Builder is the
flagship playbook. As soon as Ritu has a deck she calls the bar, she can
drop it into
`Acads/studio/standards/teaching-ppt/current/reference.pptx` with a
rationale.md alongside, record the share URL in meta/output-links.json,
run pnpm sync-content, and the Studio will render TheBar without any
code change.

## Open questions for Ritu (accumulating)

- Actual Google Form URL for feedback (GSL_FEEDBACK_FORM_URL still
  placeholder).
- Domain decision (studio.getsetlearn.com still the assumed default).
- First standards candidate per playbook; Ritu to nominate.
- Whether the Carousel Generator belongs in Academics Studio or should
  move to a future Marketing Studio in Phase 3.
- Cross-session editing convention enforcement (Monday-morning window
  per CLAUDE.md); is this still the right cadence as the team grows?
