# DESIGN.md, GSL Academics Studio

This is the design system for the Studio. CLAUDE.md holds brand tokens; this holds the philosophy, the emotional goals, and the craft moments that make those tokens land.

## Philosophy

This is a creation centre, not a dashboard. The people using it are Indian content creators who make educational content for children aged 6 to 18. The outputs they make end up in classrooms across India. The tool should feel worthy of that work.

## Emotional goals, in priority order

1. **Respect the craft.** Every pedagogical framework (NEP 2020, NCF 2023, Bloom's taxonomy, ADDIE) is referenced with dignity, not as bureaucratic checklist items. Playbook content is set in typography that says "this is worth reading carefully."
2. **Inspire creation.** Opening a playbook should feel like opening a notebook at the start of a new project, not logging into a form system. Warmth, pacing, typographic confidence.
3. **Fun without condescension.** Micro-interactions, playful empty-state copy, moments of delight. Never cartoonish. Never talking down to adults who take their work seriously. The humour is craftspeople's humour, not consumer-app humour.
4. **Colourful, confidently.** The team wants bright. Use the full GSL palette with real commitment, not as a pale-grey-Linear-clone-with-a-dot-of-teal. This is an Indian tool. It is alive. Surfaces carry colour, not just icons and buttons.
5. **Easy because it's been thought about, not because it's been stripped.** Dense where density matters (playbook reader has real content). Breathable where breath matters (home, empty states, transitions). One primary action per screen.

## Anti-patterns, refuse if tempted

- **Linear/Notion corporate minimalism.** Cold, adults-only, "efficient middle managers" energy. Wrong audience.
- **Duolingo/Khan Academy cartoonification.** Mascots that apologise for existing. Infantilising illustrations.
- **Canva cluttered toolbox.** Too many entry points competing for attention.
- **Apple-style monochrome sterility.** Beautiful but soulless, doesn't reflect that this is Indian, colourful, alive.

## Reference vibes (mood, not literal copying)

- **are.na** for content-first craft
- **Figma marketing** for colourful-without-childish and type pairing
- **Posthog** for personality and self-aware copy in a technical tool
- **Readymag** or **Cargo** for creation-tool feel that makes you want to make something
- **Nicobar, Kulture Shop, The Ken** for contemporary Indian design that's confident and warm without being touristy

## Typography

| Role | Family | Fallback |
|------|--------|----------|
| Display (playbook titles, hero copy, empty-state headlines) | Fraunces | system serif |
| Body (paragraphs, UI labels, dense content) | Inter | system sans |
| Monospace (prompt blocks, code) | JetBrains Mono | Fira Code, ui-monospace |

### Scale

| Element | Font | Size | Weight | Line height |
|---------|------|------|--------|-------------|
| h1 display | Fraunces | 3rem (48px) | 500 | 1.15 |
| h2 display | Fraunces | 2rem (32px) | 500 | 1.2 |
| h3 | Inter | 1.25rem (20px) | 600 | 1.3 |
| body | Inter | 1rem (16px) | 400 | 1.6 |
| small | Inter | 0.875rem (14px) | 400 | 1.5 |
| prompt | JetBrains Mono | 0.875rem (14px) | 400 | 1.6 |

Body line-height is 1.6 always. Playbook step content max-width keeps lines at 60-75 characters.

## Colour roles — use confidently

The default posture is **colour-forward**. The Studio is a working creation tool for Indian content creators, not a desaturated enterprise dashboard. Surfaces carry colour. Don't reduce the palette to "white with one turquoise dot".

| Token | Hex | Role |
|-------|-----|------|
| Turquoise Sea | `#00D8B9` | **Signature colour, used generously.** Hero washes, primary buttons, active states, selected-card borders, top-nav underlines, key positive surfaces. Not a tint, a real presence. |
| Azure Blue | `#073393` | Primary headings, body text on light surfaces, secondary buttons. Pairs with Turquoise as the primary duo. |
| Orange Peel | `#FFAD40` | **Accent with weight, effectively a second primary.** Audit Pass celebration, "New" markers, Save/Publish confirmation buttons, "Advanced" difficulty pill fill. Warm, unmissable. |
| Light Sky | `#C3F8FF` | **Background colour, not reserved.** Hero section fills, card hover fills, section washes, subtle surfaces for nested content. Use freely. |
| Fashion Fuchsia | `#DE00A5` | **Three or four specific moments that should genuinely pop.** Audit Pass confirmation toast, Published! confirmation toast, home greeting underline accent, sidebar active-item indicator dot. Not decoration, but not rare. |
| Cream (prompt bg) | `#FEFCF3` | PromptBlock background, inherited from prior project |
| Amber highlight | `#FFF3DD` | [VARIABLE] highlighting inside prompts |

### Surface patterns (apply these, don't invent thinner versions)

- **Playbook card at rest:** soft Light Sky fill, Azure Blue text, Orange Peel difficulty badge. On hover: Turquoise Sea border + translateY(-2px).
- **Hero section:** Azure Blue text on a Light Sky wash OR a gentle Turquoise Sea gradient. Committed colour, not a 5% tint.
- **Buttons:**
  - Primary: Turquoise Sea fill, white text, Fraunces 16px
  - Secondary: Azure Blue border + text, white fill
  - Celebratory (Save after edit, Publish, Audit Pass library save): Orange Peel fill, Azure Blue text
  - Destructive (reserved for Phase 2+): muted coral fill
- **Sidebar active item:** Turquoise Sea background + white text + Fashion Fuchsia `●` indicator dot on the right edge.
- **Difficulty pills (full-colour fills, not pale-tinted):**
  - Gentle: Light Sky fill + Azure Blue text
  - Standard: Turquoise Sea fill + white text
  - Advanced: Orange Peel fill + Azure Blue text
- **Difficulty pill anti-pattern:** tiny coloured dot + grey text. Colour must carry the badge.

### Anti-patterns, refuse if tempted

- White card on white background with a single turquoise dot somewhere. Flat and timid.
- Black text on white with grey subtext as the default. Reads as corporate.
- Colour confined to icons and buttons while surfaces stay neutral.
- Fashion Fuchsia as general-purpose accent. Still a reserved colour for the 3-4 specific moments above.

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `difficulty-gentle` | `#27AE60` | Gentle difficulty badge (green) |
| `difficulty-standard` | `#FFAD40` | Standard difficulty badge (uses Orange Peel) |
| `difficulty-advanced` | `#DE6B4B` | Advanced difficulty badge (muted coral, NOT Fuchsia) |
| `text-primary` | `#1A1A1A` | Body text |
| `text-secondary` | `#5C5C5C` | Descriptions, meta |
| `text-muted` | `#8A8A8A` | Hints, placeholders |
| `border` | `#E8E8E8` | Card borders, dividers |

## Spacing and rhythm

Editorial, not dashboard-tight. Magazine margins, not admin-panel compression.

- Page padding (desktop): `py-20 px-12`
- Page padding (mobile): `py-12 px-5`
- Content max-width: `max-w-4xl` for prose, `max-w-6xl` for layouts
- Card gap: `gap-8` on desktop, `gap-6` on mobile
- Element gap within cards: `space-y-4`

## Specific craft moments (design these intentionally)

1. **The Audit Stage "Pass" celebration.** Understated but real. A moment. Not confetti. Something that says "you did good work" without shouting. Fashion Fuchsia can appear here, briefly.
2. **Empty states.** Each one has specific warm copy, never "No data." The empty content library says something like "Nothing here yet. The first thing you make lands here."
3. **The Copy Prompt interaction.** Tactile. The button briefly shows "Copied" with subtle colour change (Turquoise Sea), not an alert.
4. **Sign-in page.** Not a login form. A moment. One sentence of copy that says why this tool exists, a single input, a single button.
5. **Playbook cards on home.** Feel like objects, not rows. Slight hover lift. Icon, title, two lines of what-you'll-make, time badge, difficulty badge. No more.

## Hard constraints

- British English always. "Organise", "behaviour", "programme."
- No em-dash anywhere, including placeholder text.
- Indian names in illustrations and example text (Priya, Arjun, Fatima, Harpreet). Not John and Jane.
- shadcn/ui components as the base. Customise, don't replace.
- Tailwind utility classes. No separate CSS files beyond `app/globals.css`.

## Responsive breakpoints

- Mobile: 0-640px (single column, stacked)
- Tablet: 641-1024px (2-column where natural, editor full-width)
- Desktop: 1025px+ (3-column where natural, sidebar nav)

Each viewport gets intentional design, not "stacked on mobile".

## Accessibility

- Focus ring: `ring-2 ring-offset-2 ring-[#00D8B9]` on every interactive element
- Colour contrast ratio: 4.5:1 minimum for body text; 3:1 for large text
- Tab order: follows visual hierarchy, not DOM order where they diverge
- Touch targets: 44px minimum on mobile
- Screen reader: semantic HTML (`nav`, `main`, `article`, `section`), aria-labels on icon-only buttons
- Prefers-reduced-motion: respect it. All non-essential motion behind this query.

## Change log
- 2026-04-21, initial version, authored by Anish during /plan-design-review.
