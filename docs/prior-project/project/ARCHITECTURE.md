# Architecture

## System overview

GSL AI Command Center is a static website that serves as an interactive prompt library. There is no backend, no database, no authentication. All content is compiled at build time from JSON data files.

```
┌─────────────────────────────────────────────────────┐
│                   OneDrive (source of truth)         │
│                   Master Excel workbook              │
└──────────────────────┬──────────────────────────────┘
                       │ Claude Code reads locally
                       ▼
┌─────────────────────────────────────────────────────┐
│              src/data/*.json (build-time data)       │
│  verticals.json │ academics.json │ audiences.json   │
│  marketing.json │ sales.json    │ skill-files.json  │
│  product.json   │ hr-ops.json   │                   │
└──────────────────────┬──────────────────────────────┘
                       │ Next.js static generation
                       ▼
┌─────────────────────────────────────────────────────┐
│              /out (static HTML/CSS/JS)               │
│  index.html │ guide/ │ academics/ │ marketing/      │
│  sales/ │ product/ │ hr-ops/ │ skill-files/ │ faq/  │
└──────────────────────┬──────────────────────────────┘
                       │ Vercel serves static files
                       ▼
┌─────────────────────────────────────────────────────┐
│              User's browser                          │
│  Copy prompt → Paste into Claude → Upload files     │
└─────────────────────────────────────────────────────┘
```

## Data flow

1. Team leads update the master Excel on OneDrive
2. Claude Code reads the Excel, extracts data, writes JSON files
3. Next.js builds static pages from JSON at build time
4. Vercel serves the static site
5. User browses to their vertical → task → copies prompt → uses in Claude

There is no runtime data fetching. Every page is pre-rendered HTML.

## Routing

```
/                           → Home (static)
/guide                      → Getting Started (static)
/[vertical]                 → Vertical page (5 static pages via generateStaticParams)
/[vertical]/[task]          → Task detail (32 static pages via generateStaticParams)
/skill-files                → Library (static)
/suggest                    → Form (client-side, submits via mailto: or Google Form)
/faq                        → FAQ (static)
```

All routes use `generateStaticParams()` to pre-render at build time. No SSR, no ISR.

## Key design decisions

### Why static export, not SSR?
- No server cost (Vercel free tier)
- Instant page loads (pre-rendered HTML)
- No database to manage or secure
- Content changes are infrequent (prompt library, not real-time data)
- Teams update via Excel → Claude Code rebuilds → redeploy

### Why JSON files, not a CMS?
- The master Excel IS the CMS
- Team leads already know Excel — zero learning curve
- Claude Code can programmatically sync Excel → JSON
- No vendor lock-in, no CMS subscription cost
- JSON is version-controlled in git

### Why not a database for suggestions?
- Suggestion form uses mailto: link or embedded Google Form
- Anish (admin) reviews manually before updating Excel
- Volume is low (maybe 2-3 suggestions per week)
- No need for a backend just for this

### Why copy-paste workflow, not Claude API integration?
- Phase 1: copy-paste is zero infrastructure, works today
- Team members use their own Claude Team accounts
- No API keys to manage, no cost per request, no auth flow
- Phase 2 (future): could add API integration without changing data layer

## Component architecture

```
RootLayout
├── Navbar (client — mobile hamburger menu)
├── Page content (server by default)
│   ├── Home
│   │   ├── HeroSection
│   │   ├── VerticalCards (5 cards)
│   │   └── HowItWorks (3-step illustration)
│   ├── VerticalPage
│   │   ├── VerticalHeader
│   │   └── TaskCardGrid
│   │       └── TaskCard × N
│   ├── TaskDetailPage
│   │   ├── TaskHeader (name, description, badges)
│   │   ├── StepByStep (numbered visual steps)
│   │   ├── RoleBlock (copy button)
│   │   ├── PromptBlock (copy button, highlighted variables)
│   │   ├── SkillFileCards (download buttons)
│   │   ├── UserProvidesChecklist
│   │   ├── QualityChecklist (expandable)
│   │   └── ExampleOutput (if linked)
│   └── GettingStartedGuide
│       ├── WhatIsClaude
│       ├── HowToAccess
│       ├── HowToUploadFiles
│       └── TipsForBetterResults
└── Footer
```

Client components ('use client'):
- CopyButton (clipboard API)
- ExpandableSection (toggle state)
- MobileNav (hamburger state)
- SuggestionForm (form state)

Everything else is server components — zero client JS where possible.

## Performance targets
- First Contentful Paint: <1.5s
- Total page weight: <200KB per page (excluding fonts)
- Lighthouse score: 95+ across all categories
- Works on 3G connections (many Indian schools have slow internet)

## Security considerations
- No user data stored anywhere
- No authentication needed
- Suggestion form is mailto: or Google Form (no server processing)
- Static site — no injection vectors
- Skill files are static .md files — no executable content
