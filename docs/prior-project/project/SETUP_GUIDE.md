# GSL AI Command Center — Setup Guide

## Prerequisites
- Node.js 18+ installed
- Claude Code installed (`npm install -g @anthropic-ai/claude-code`)
- gstack installed (`git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup`)

## Step 1: Create the project folder
```bash
mkdir gsl-ai-command-center
cd gsl-ai-command-center
```

## Step 2: Copy these files into the root
Place these files (from the starter zip) in the project root:
```
CLAUDE.md
ARCHITECTURE.md
DESIGN.md
TODOS.md
data/              (folder with all JSON files)
```

## Step 3: Open Claude Code
```bash
claude
```
If `claude` doesn't work in PowerShell, switch to Command Prompt:
```
cmd
claude
```

## Step 4: First session — Project setup
Paste this:

```
Read CLAUDE.md, ARCHITECTURE.md, and DESIGN.md. Then:

1. Init Next.js 14 app: npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-import-alias
2. Configure next.config.js for static export
3. Set up tailwind.config.ts with the full GSL design system from DESIGN.md
4. Install: npm install lucide-react
5. Create folder structure per CLAUDE.md
6. Copy data/ folder contents to src/data/
7. Create src/lib/types.ts with TypeScript interfaces matching the JSON schema
8. Create src/lib/utils.ts with slugify and copy-to-clipboard helpers
9. Set up globals.css with Montserrat + Open Sans from Google Fonts
10. Build the root layout with Navbar and Footer

Verify with npm run build. Then update TODOS.md.
```

## Step 5: Build page by page (one per session)

### Session 2 — Home page
```
Read CLAUDE.md and DESIGN.md. Build the home page:
- Hero section with tagline and illustration
- "How it works" 3-step infographic
- 5 VerticalCards linking to each vertical
- Stats bar (32 tasks, 5 verticals, 21 skill files)
Verify: npm run build. Run /review.
```

### Session 3 — Getting Started guide
```
Read CLAUDE.md and DESIGN.md. Build /guide:
- "What is Claude?" (3 sentences + illustration)
- "How to access Claude" (link + visual)
- "How to start a conversation" (illustration)
- "How to upload files" (step-by-step with visuals)
- "How to use prompts from this site" (numbered steps matching task detail page)
- "Tips for better results" (5 tips with icons)
All illustrations are inline SVG components. No stock images.
IKEA manual style — visual first, text second.
Verify: npm run build. Test on 375px viewport. Run /review.
```

### Session 4 — Vertical page
```
Read CLAUDE.md and DESIGN.md. Build /[vertical]:
- generateStaticParams from verticals.json
- Vertical header (name, icon, description, color)
- TaskCard grid (sorted by category, then difficulty)
- Each card: name, description, category tag, difficulty badge, audience pills, AI %
Verify: npm run build. Check all 5 verticals render. Run /review.
```

### Session 5 — Task detail page (THE BIG ONE)
```
Read CLAUDE.md and DESIGN.md. Build /[vertical]/[task]:
- generateStaticParams from all task JSON files
- TaskHeader (name, description, audiences, difficulty, output format)
- StepByStep component (6 numbered steps with visual connections)
- RoleBlock (orange tint, copy button, "paste this first" instruction)
- PromptBlock (monospace, highlighted [VARIABLES], copy button, scroll)
- SkillFileCards (download buttons, status badges)
- UserProvidesChecklist (what the user needs before starting)
- QualityChecklist (expandable, collapsed by default)
- "Time saved" estimate
- Breadcrumb navigation

This is the most important page. Take extra care with:
- Copy button UX (green flash, checkmark swap)
- [VARIABLE] highlighting in prompts (amber background)
- Mobile layout (everything stacks cleanly)
- The step-by-step must feel like a recipe, not a manual

Verify: npm run build. Test 3 different tasks. Test on mobile. Run /review. Run /qa on localhost.
```

### Session 6 — Skill files + FAQ + Suggest
```
Read CLAUDE.md and DESIGN.md. Build remaining pages:

/skill-files:
- Grid of skill file cards
- Filter by type (Universal / Programme / Vertical)
- Each card: name, type badge, used by, description, download/coming-soon
- Search/filter bar at top

/faq:
- Accordion-style FAQ
- 15-20 questions covering: what is this, how to use Claude, what are skill files, how to improve prompts, who to contact

/suggest:
- Simple form: name, vertical dropdown, suggestion type dropdown (new prompt / better example / new task / other), description textarea
- Submit via mailto: to Anish
- Success state

Verify: npm run build. Full site test. Run /qa on localhost.
```

### Session 7 — Polish and deploy
```
Run /design-review on the full site.
Run /qa on localhost — fix all issues.
Mobile responsiveness pass: test every page at 375px.
Lighthouse audit: target 95+ on all categories.
Run /ship to create PR.
Deploy to Vercel: npx vercel --prod
Update TODOS.md.
```

## OneDrive sync (after initial build)
Once the site is built, configure the OneDrive path:

```
The master Excel is at: C:\Users\Anish\OneDrive\GSL\AI Command Center\GSL_AI_Command_Center_Master.xlsx
Read it with openpyxl, extract all task data, and update src/data/*.json.
Then run npm run build to verify.
```
