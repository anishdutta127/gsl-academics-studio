# Architecture decisions

Each file records a decision that shapes the Studio. We write one when a decision affects more than one file, when a reviewer (ourselves, the user, a skill, another session) will want the rationale later, or when we supersede a prior decision.

Format: short. Context, decision, rationale, consequences, revisit trigger. No prose for its own sake.

Numbers are stable. If a decision is superseded, mark it OBSOLETE and point to the superseding record; never reuse the number.

## Index

| # | Title | Status |
|---|---|---|
| 001 | No Anthropic API calls from the Studio | ADOPTED |
| 002 | In-app editor deferral | OBSOLETE, superseded by 010 |
| 003 | Admin bootstrap via seed script | OBSOLETE, superseded by 010 |
| 004 | Audit Stage validation (placeholder, week 3) | PLACEHOLDER |
| 005 | Direct-to-Storage upload path | OBSOLETE, superseded by 010 |
| 006 | Adoption metric | ADOPTED |
| 007 | Audit scope for week 3 prototype | ADOPTED |
| 008 | Per-playbook instrumentation | OBSOLETE, superseded by 010 |
| 010 | OneDrive-sourced content pivot | ADOPTED (supersedes 002, 003, 005, 008) |
| 011 | Content library, output filenames, conflict convention | ADOPTED |
