# Todos

## Current sprint: Foundation build

### Phase 1: Project setup
- [ ] Initialize Next.js 14 with TypeScript, Tailwind, App Router
- [ ] Configure static export (output: 'export')
- [ ] Set up Tailwind config with GSL brand tokens (colors, fonts, spacing)
- [ ] Install dependencies (lucide-react, @next/font)
- [ ] Copy data/*.json into src/data/
- [ ] Create TypeScript interfaces in src/lib/types.ts
- [ ] Create utility functions in src/lib/utils.ts (slugify, copy-to-clipboard)
- [ ] Set up globals.css with custom Tailwind layers

### Phase 2: Shared components
- [ ] Navbar (logo, nav links, mobile hamburger)
- [ ] Footer (GSL branding, links)
- [ ] CopyButton (clipboard + success animation)
- [ ] DifficultyBadge (Easy/Medium/Hard with colors)
- [ ] AudiencePill (small tag showing audience)
- [ ] VerticalCard (for home page)
- [ ] TaskCard (for vertical pages)

### Phase 3: Pages (build order)
- [ ] Home page (hero + vertical cards + how it works section)
- [ ] Getting Started guide (Claude beginner tutorial, illustrated)
- [ ] Vertical page template with generateStaticParams
- [ ] Task detail page (the hero page — steps, prompt, files, checklist)
- [ ] Skill files library page
- [ ] FAQ page
- [ ] Suggestion form page

### Phase 4: Content and polish
- [ ] SVG illustration components for Getting Started guide
- [ ] Create initial skill file .md files in public/skill-files/
- [ ] FAQ content (15-20 questions)
- [ ] Mobile responsiveness pass on all pages
- [ ] Lighthouse audit (target: 95+ all categories)
- [ ] Accessibility audit (keyboard nav, screen reader, contrast)

### Phase 5: Deploy
- [ ] Vercel project setup
- [ ] Custom domain (if available)
- [ ] Final build and deploy
- [ ] Test on team devices (phones, tablets, laptops)
- [ ] Share URL with CEO and team leads

## Future scope (not this sprint)
- [ ] Excel → JSON sync script (automated via Claude Code)
- [ ] Claude API integration (Phase 2 — replace copy-paste)
- [ ] Analytics (simple page view tracking)
- [ ] Dark mode
- [ ] Search across all tasks
- [ ] Day-to-day task tracker (separate from the recipe book)
