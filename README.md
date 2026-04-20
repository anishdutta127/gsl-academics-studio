# GSL Academics Studio

Internal creation centre for the GSL Academics team. Playbooks, skills, a content library view, and weekly assignments. OneDrive is the CMS; the Studio reads from there.

See `CLAUDE.md` for project conventions, `DESIGN.md` for the design system, and `docs/decisions/` for architecture decisions (esp. [010](./docs/decisions/010-onedrive-content-source-pivot.md)).

## Quickstart

```bash
pnpm install
cp .env.local.example .env.local
# edit .env.local, at minimum set GSL_STUDIO_PASSWORD
pnpm dev
```

Open `http://localhost:3000`, enter the password, pick a name, browse playbooks.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Next.js dev server with hot reload. Reads live OneDrive content. |
| `pnpm build` | Production build. Reads from `./content-synced/`. |
| `pnpm start` | Production server after build. |
| `pnpm lint` | `next lint`. |
| `pnpm typecheck` | `tsc --noEmit`. |
| `pnpm sync-content` | (commit 3) Copies OneDrive studio folder into `./content-synced/` and writes the outputs manifest. Run manually when OneDrive edits should hit production. |

## Content source

Dev reads `GSL_ONEDRIVE_PATH` directly. Prod reads `./content-synced/` committed to git. The sync script moves content from one to the other. See CLAUDE.md > Content pipeline for the full diagram and fallback behaviour.

## Access control

Single shared password in team WhatsApp, checked in middleware against `GSL_STUDIO_PASSWORD`. A signed cookie persists the session. Not authentication. See `docs/decisions/010` for why.

## Environment

- Node 20+ (tested on 24).
- pnpm 10+.
- Windows, macOS, or Linux. OneDrive sync client on the developer's machine when running dev in OneDrive mode.

## Phase 1 timeline

4 weeks, see `docs/decisions/010` weeks 1-4 section.
