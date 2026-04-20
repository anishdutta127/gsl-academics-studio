# Decision 001: No Anthropic API calls from the Studio

**Status:** ADOPTED
**Date:** 2026-04-21
**Related:** 004, 007

## Context

The Studio is a layer between human content writers and the AI tools they use (Claude, ChatGPT, Midjourney). Every playbook step that involves AI contains a copyable prompt; the writer pastes it into their own Claude session, works there, brings the output back.

During office-hours we considered letting the Studio call Claude directly for mid-flow checks (a "does this match NEP + NCF + Bloom's?" assist). Rejected for Phase 1.

## Decision

The Studio does not call any AI model API in Phase 1. No Anthropic, no OpenAI, no Midjourney server-side calls. Playbooks contain copyable prompts; Audit Stage prompts are copied into the user's own Claude session.

## Rationale

- **Protects the craft model.** The value is the procedure, not the generation. Outsourcing the step the writer should own erodes that.
- **No API key management, no cost, no auth.** Every team member uses their own Claude Max subscription.
- **Keeps Phase 1 scope honest.** If we called Claude from the Studio, we would need rate limiting, cost monitoring, prompt versioning, and failure UX. None of that is in Phase 1.

## Consequences

- Every playbook step specifies the tool in plain English ("Tool: Claude, Projects feature is best") and contains a prompt block with a copy affordance.
- Audit Stage is a round-trip: user copies the audit prompt, runs it in their own Claude, reads the report, comes back to mark Pass or Fail.
- The round-trip friction is a real product risk. Addressed by 004's prototype-then-validate approach.

## Revisit when

- Phase 4, or earlier if a writer shows a clear quality gain that can only come from an auto-check.
- If the team ever wants the Studio to pre-flight its own content (for example, a mid-flow check that greys out "proceed" until the writer has addressed a pedagogy issue).
