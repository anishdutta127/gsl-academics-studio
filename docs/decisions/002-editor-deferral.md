# Decision 002: In-app editor deferral (OBSOLETE)

**Status:** OBSOLETE, superseded by [010](./010-onedrive-content-source-pivot.md)
**Date original:** 2026-04-21
**Date superseded:** 2026-04-22

## What this originally recorded

Under the Supabase-backed plan, Phase 1 was going to ship with an admin-only markdown editor using CodeMirror 6 with a live preview pane. Tiptap with custom blocks, autosave every 10 seconds, diff UI, and restore UI were all deferred to Phase 2.

This decision existed to document the deferral against CLAUDE.md's original editor-discipline mandate, so future Claude Code sessions would not read the mandate, notice the gap, and try to "fix" it.

## Why obsolete

The architecture pivot in 010 removes in-app editing entirely. Ritu edits markdown files directly in the OneDrive folder. Version history is OneDrive's built-in file history. There is no editor to defer; there is no editor, period.

## Where to read now

See [010](./010-onedrive-content-source-pivot.md). Revisit in Phase 2 only if writers ask for in-app editing as an observed pain point.
