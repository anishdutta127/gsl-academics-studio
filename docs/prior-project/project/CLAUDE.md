# GSL AI Command Center

## What this is
Internal website for Get Set Learn (GSL) — an AI recipe book where any team member picks their vertical, picks their task, follows the steps, and gets a professional output using Claude. No prompt engineering needed.

## gstack
Use /browse from gstack for all web browsing. Never use mcp__claude-in-chrome__* tools.
Available skills: /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review,
/design-consultation, /design-shotgun, /design-html, /review, /ship, /land-and-deploy,
/canary, /benchmark, /browse, /open-gstack-browser, /qa, /qa-only, /design-review,
/setup-browser-cookies, /setup-deploy, /retro, /investigate, /document-release, /codex,
/cso, /autoplan, /pair-agent, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade, /learn.

## Tech stack
- Next.js 14 (App Router, static export via `output: 'export'` in next.config)
- TypeScript (strict mode)
- Tailwind CSS v3
- Lucide React for icons
- Google Fonts: Montserrat (headings) + Open Sans (body)
- Deployment: Vercel (static)
- Data: JSON files in src/data/ (sourced from master Excel)
- No database, no auth, no backend

## Master data source
The master Excel lives on OneDrive. Claude Code reads it directly from the local OneDrive sync path.

**Sync command:** When told to "sync from master" or "update data from Excel":
1. Read the Excel at the configured OneDrive path
2. Extract all task types, audiences, skill files using openpyxl
3. Write updated JSON to src/data/
4. Run `npm run build` to verify nothing breaks

The Excel has 8 tabs: How This Works, Academics, Marketing, Sales, Product, HR & Ops, Skill Files Index, Audiences.

Each vertical tab has 20 columns per row:
- A: Task Category
- B: Task Type (the name)
- C: What It Produces
- D: Target Audiences
- E: Key Variables
- F: Claude's Role (the expert persona)
- G: Master Prompt Template (copy-paste ready with [VARIABLES])
- H: Required Skill Files
- I: User Must Provide
- J: Example Output Link (OneDrive)
- K: Gold Standard Link (OneDrive)
- L: Quality Checklist
- M: AI %
- N: Reliability (HIGH/MED/LOW)
- O: Version
- P: Last Updated By
- Q: Notes
- R: Output Format
- S: Difficulty for User
- T: Who Reviews

## Architecture
See ARCHITECTURE.md for full details. Key decisions:
- Static site (no server, no API calls, no database)
- JSON-driven (all content from src/data/*.json)
- Page-per-vertical with dynamic task detail pages
- One-click copy for roles and prompts
- Downloadable .md skill files from /public/skill-files/

## Design system
See DESIGN.md for full details. Key rules:
- GSL brand: Teal #00D8B9 + Navy #073393 on white
- Typography: Montserrat headings, Open Sans body
- Mobile-first (team uses phones)
- Breathable layouts — generous padding, max-w-4xl for content
- Users are "zero in AI" — explain like they're five
- No jargon. Every technical term gets an inline explanation
- Every page answers: "What do I do next?"
- Friendly illustrations via SVG components, not stock images
- Difficulty badges: green (Easy), amber (Medium), red (Hard)
- Audience pills: small coloured tags showing who a task is for

## File structure
```
gsl-ai-command-center/
├── CLAUDE.md                    # This file
├── ARCHITECTURE.md              # System architecture
├── DESIGN.md                    # Design system and components
├── TODOS.md                     # Current sprint tasks
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── public/
│   ├── skill-files/             # Downloadable .md files
│   └── images/                  # SVG illustrations
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (fonts, nav, footer)
│   │   ├── page.tsx             # Home page
│   │   ├── guide/page.tsx       # Getting Started with Claude
│   │   ├── skill-files/page.tsx # Skill files library
│   │   ├── suggest/page.tsx     # Suggestion form
│   │   ├── faq/page.tsx         # FAQ
│   │   └── [vertical]/
│   │       ├── page.tsx         # Vertical page (task cards)
│   │       └── [task]/page.tsx  # Task detail page
│   ├── components/
│   │   ├── layout/              # Navbar, Footer, Sidebar
│   │   ├── home/                # HeroSection, VerticalCard, StatsBar
│   │   ├── task/                # TaskCard, TaskDetail, PromptBlock, StepByStep
│   │   ├── shared/              # CopyButton, DifficultyBadge, AudiencePill
│   │   └── guide/               # GettingStarted illustrations
│   ├── data/
│   │   ├── verticals.json
│   │   ├── academics.json
│   │   ├── marketing.json
│   │   ├── sales.json
│   │   ├── product.json
│   │   ├── hr-ops.json
│   │   ├── audiences.json
│   │   └── skill-files.json
│   ├── lib/
│   │   ├── types.ts             # TypeScript interfaces
│   │   └── utils.ts             # Helpers (slugify, copy-to-clipboard)
│   └── styles/
│       └── globals.css          # Tailwind base + custom GSL tokens
```

## Key conventions
- All components are React Server Components by default. Use 'use client' only when needed (copy buttons, expandable sections, mobile nav).
- Page params use generateStaticParams() for static export.
- No `useEffect` for data fetching — all data is imported from JSON at build time.
- Every interactive element needs an aria-label.
- Test on mobile viewport (375px) after every page.
- No inline styles — Tailwind only.
- Commit messages: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`.

## Verticals and task counts
- Academics: 11 tasks (curriculum, content, programmes, assessment, training)
- Marketing: 7 tasks (strategy, ads, content, collateral) — note: 6 in current JSON, 1 more to add
- Sales: 5 tasks (outreach, pitch materials)
- Product: 4 tasks (docs, research, investor)
- HR & Ops: 5 tasks (recruitment, onboarding, policy)

Total: 32 task types across 5 verticals

## Audiences (full K-12)
Students Grade 3-5, Students Grade 6-8, Students Grade 9-10, Students Grade 11-12, Parents, School Principals, Teachers/Coordinators, Government Officials, Investors/Board, Partners (Cambridge/IIT-G/Prismix), Internal Team

## Skill files (21 total)
7 Universal: GSL Brand Guide, NEP 2020, UN SDGs, Bloom's Taxonomy, Gagné's 9 Events, Age-Appropriateness, PPT Standards
6 Programme: Young Pioneers, VideoGenX, Solevit, Talk & Learn, STEM/IIT-G, Harvard MM
8 Vertical: Ad Copy, Carousel Framework, Marketing Frameworks, Consumer Behaviour, Sales Playbook, GSL Culture, Government Templates, Indian Context Bank

## Build and deploy
```bash
npm install
npm run dev          # Local development
npm run build        # Static export to /out
npm run lint         # ESLint check
npx vercel           # Deploy to Vercel
```

## Sprint process (gstack-aligned)
1. /office-hours or /plan-ceo-review for feature planning
2. /plan-eng-review for architecture decisions
3. /plan-design-review for UI/UX decisions
4. Build the feature
5. /review on the branch
6. /qa on localhost
7. /ship to create PR
8. /document-release to update docs
