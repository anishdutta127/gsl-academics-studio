# Decision 003: Admin bootstrap via seed script (OBSOLETE)

**Status:** OBSOLETE, superseded by [010](./010-onedrive-content-source-pivot.md)
**Date original:** 2026-04-21
**Date superseded:** 2026-04-22

## What this originally recorded

Under the Supabase-backed plan with three roles (viewer, editor, admin) enforced by RLS, the first admin had a chicken-and-egg problem: no `user_profile` row existed yet, so no one could use the editor UI to promote anyone. Solution: `scripts/seed.ts` reads `GSL_INITIAL_ADMIN_EMAIL` from env, inserts (or promotes) that row to `role='admin'`. Idempotent. Runs on every `pnpm seed`. Throws clearly if the env var is missing.

## Why obsolete

The architecture pivot in 010 removes authentication and role distinctions entirely. Access control is a single shared password (`GSL_STUDIO_PASSWORD`) checked in Next.js middleware. Everyone inside the password gate is equal. There is no admin role, so no bootstrap problem.

## Where to read now

See [010](./010-onedrive-content-source-pivot.md).
