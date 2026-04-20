# Decision 007: Audit scope for week 3 prototype

**Status:** ADOPTED
**Date:** 2026-04-21
**Related:** 001, 004, 010

## Context

The Audit Stage on the first playbook (Teaching Material PPT Builder) lands in week 2-3 of the revised 4-week Phase 1. Its audit prompt needs to reference the pedagogical and brand standards the audit checks against.

Three skills are in scope for Phase 1:
- Pedagogy Foundations (full body exists in seed 04, migrates to OneDrive in week 1).
- Brand Voice (stub in week 1, body written in week 3).
- PPT Patterns (stub in week 1, body written in week 3).

The audit prompt needs something to reference, but two of its three reference targets are stubs when the prototype runs.

## Decision

The Teaching Material PPT Builder's audit prompt at the week 2-3 prototype stage:

1. **References Pedagogy Foundations by slug.** That skill exists in full on day 1. The audit prompt instructs Claude: "Open the linked Pedagogy Foundations skill and audit the attached deck against it."
2. **Inlines surface conventions as literal text** inside the audit prompt. Because Brand Voice and PPT Patterns are stubs, the audit cannot reference them usefully. Inline the specific rules the audit needs to check:
   - British English throughout
   - No em-dash anywhere
   - Indian context in every section (names, cities, examples)
   - One idea per slide, maximum 5 bullets
   - 18pt minimum body text
   - Sentence case titles, not Title Case
   - Teacher notes filled in for every content slide
   - At least one visual per content slide
3. **Decision log here** records that the audit prompt is in this "hybrid" state and needs refactoring once the two skill bodies are written in week 3.

## Week 3 refactor

After Brand Voice and PPT Patterns bodies are written:

- Move the inlined surface conventions out of the Teaching PPT audit prompt.
- Rewrite those conventions into Brand Voice (British English, voice rules) and PPT Patterns (slide density, title case, 18pt minimum, teacher-notes requirement) as the skill bodies.
- Update Teaching PPT's audit prompt to reference Brand Voice and PPT Patterns by slug, alongside Pedagogy Foundations.
- Now the pattern is clean for the other five playbooks: each playbook's audit prompt references the skills it needs by slug, no inline duplication.

## Rationale

- **Prototype validity.** The audit prototype needs to check real conventions to catch real drift. If the inlined conventions were missing, the week 3 validation test (decision 004) would run against an artificially weak audit and give misleading signal.
- **Honest sequencing.** The alternative (write terse v0 bodies for Brand Voice and PPT Patterns in week 1) has a known failure mode: terse v0 content tends to become load-bearing permanently because no one rewrites what already exists. Inlined conventions inside an audit prompt are more obviously temporary and more obviously extractable.

## Consequences

- The week 2-3 Teaching PPT audit prompt is a hybrid artifact: one skill reference + an inlined conventions block. Document this in the audit prompt's YAML frontmatter so future maintainers know the inlined block is planned extraction material.
- Week 3 refactor is scheduled content work (see Phase 1 week plan in `CLAUDE.md`).

## Revisit when

Week 3 refactor is done. Then close this decision with "COMPLETED" and a link to the final audit prompt and skill bodies.
