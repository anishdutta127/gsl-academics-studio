# Decision 006: Adoption metric

**Status:** ADOPTED
**Date:** 2026-04-21
**Related:** 008 (OBSOLETE), 010

## Context

The office-hours plan's original success metric was "at least 10 deliverables made through the Studio in the first two weeks." Eng review flagged this as weak (denominator is self-selecting; writers who bypass simply do not upload). Replaced with a Ritu-interview-based signal. The OneDrive pivot (010) further removes the `content_library_item` table and the `via_playbook_id` FK that would have made an automated ratio possible anyway.

## Decision

Adoption is measured by a short question Ritu answers at each weekly check-in:

> "Of all the PPTs your team made in the last 2 weeks, roughly how many came through Studio?"

Ranges are fine ("maybe 5 of 8"). Precision she does not have is not precision we should demand.

**Targets:**
- **Below 40%:** clear miss. Investigate why. Interview the writers she names as non-users.
- **40 to 60%:** mixed. Interview at least one non-user.
- **60% and above:** working.

## Rationale

- **Fixes the selection bias** that an event-table ratio would have had. Ritu sees what her team ships whether it hits the Studio or not; she is the only honest denominator.
- **Costs almost nothing to run.** Ten minutes in a check-in call we are already having.
- **Matches the Phase 1 team size.** With four writers, any automated funnel is statistically meaningless anyway. A single human with line-of-sight is the right instrument.

## Consequences

- No event tables in Phase 1 (per 008 obsolescence and 010's removal of database entirely).
- Ritu's role includes the adoption read. Flag this as part of the walkthrough conversation so she expects the question at each check-in.
- Log each answer and the date in this file so we can see the trend over weeks.

## Log (updated at each check-in)

| Date | Ratio answered | Notes |
|---|---|---|
| (pending first check-in) | | |

## Revisit when

- Team grows past 8 or 10 users (one person's line of sight stops being sufficient).
- Adoption crosses 80% sustained, and we want event-level analytics to understand usage patterns per playbook.
- Ritu leaves the role. Then the metric needs to attach to whoever replaces her, or switch to lightweight analytics (Plausible or a Google Sheet fed by a minimal endpoint).
