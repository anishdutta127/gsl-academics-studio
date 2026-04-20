# Design System

## Philosophy
This site is for people who have never used AI. Every design decision optimises for **clarity over cleverness**. Think IKEA instruction manual: numbered steps, simple illustrations, obvious next actions.

**Three rules:**
1. If someone has to think about what to do next, the design failed.
2. If someone needs to read more than 2 sentences to understand a section, the copy is too long.
3. If it doesn't work on a phone over a slow connection, it doesn't work.

## Colors

### Primary
| Token | Hex | Usage |
|-------|-----|-------|
| `teal` | `#00D8B9` | Primary accent, CTAs, success states, Academics |
| `navy` | `#073393` | Secondary accent, headings, navigation |
| `white` | `#FFFFFF` | Page background |
| `light-gray` | `#F5F5F5` | Section backgrounds, card hover |

### Vertical colors
| Vertical | Color | Light | Usage |
|----------|-------|-------|-------|
| Academics | `#073393` | `#E8ECF7` | Cards, badges, headers |
| Marketing | `#00D8B9` | `#E0F7F1` | Cards, badges, headers |
| Sales | `#F5A623` | `#FFF8EB` | Cards, badges, headers |
| Product | `#7B61FF` | `#F0ECFF` | Cards, badges, headers |
| HR & Ops | `#FF6B6B` | `#FFE8E8` | Cards, badges, headers |

### Semantic
| Token | Hex | Usage |
|-------|-----|-------|
| `easy` | `#27AE60` | Easy difficulty badge |
| `medium` | `#F5A623` | Medium difficulty badge |
| `hard` | `#FF6B6B` | Hard difficulty badge |
| `text-primary` | `#212121` | Body text |
| `text-secondary` | `#666666` | Descriptions, meta |
| `text-muted` | `#999999` | Hints, placeholders |
| `border` | `#E5E5E5` | Card borders, dividers |

## Typography

### Font stack
```css
--font-heading: 'Montserrat', system-ui, sans-serif;
--font-body: 'Open Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Scale
| Element | Font | Size | Weight | Line height |
|---------|------|------|--------|-------------|
| h1 | Montserrat | 2.25rem (36px) | 600 | 1.2 |
| h2 | Montserrat | 1.75rem (28px) | 600 | 1.3 |
| h3 | Montserrat | 1.25rem (20px) | 500 | 1.4 |
| h4 | Montserrat | 1.1rem (17.6px) | 500 | 1.4 |
| body | Open Sans | 1rem (16px) | 400 | 1.6 |
| small | Open Sans | 0.875rem (14px) | 400 | 1.5 |
| caption | Open Sans | 0.75rem (12px) | 400 | 1.5 |
| prompt | JetBrains Mono | 0.875rem (14px) | 400 | 1.6 |

### Rules
- Never use font weight above 600
- Body text is always `text-primary` (#212121)
- Headings can use `navy` for emphasis
- Prompt text always uses monospace with a light background

## Spacing
- Section padding: `py-16 px-4` (mobile) / `py-20 px-8` (desktop)
- Card padding: `p-6` (mobile) / `p-8` (desktop)
- Content max-width: `max-w-6xl mx-auto`
- Card gap: `gap-6`
- Element gap within cards: `space-y-4`

## Components

### VerticalCard
- White background, 1px border, rounded-2xl
- Vertical colour as left border accent (4px)
- Icon (Lucide) in vertical colour, 40px
- Name, description, task count badge
- Hover: lift shadow + light vertical colour background
- Click: navigate to /[vertical]

### TaskCard
- White background, 1px border, rounded-xl
- Category tag (small pill, vertical light colour)
- Task name (h3, bold)
- One-line description
- Bottom row: difficulty badge + audience pills + AI share
- Hover: lift shadow
- Click: navigate to /[vertical]/[task]

### DifficultyBadge
- Pill shape, rounded-full
- Easy: green bg, green text, "Easy" label
- Medium: amber bg, amber text, "Medium" label
- Hard: red bg, red text, "Hard" label
- Always includes the note (e.g., "Easy — fill topic, grade, duration")

### AudiencePill
- Small rounded-full pill
- Light gray background, dark text
- Max 3 shown, then "+N more" overflow

### PromptBlock (the hero component)
- Monospace font on light cream/warm background (#FEFCF3)
- 1px border, rounded-xl
- [VARIABLES] highlighted in amber background (#FFF3DD) with amber text
- Copy button (top-right, fixed position within block)
- Line numbers optional but helpful
- Scroll for long prompts, max-height with fade at bottom

### RoleBlock
- Distinct from prompt — warm orange-tinted background
- Expert persona in bold
- One-click copy button
- "Paste this first, before the prompt" instruction

### StepByStep
- Numbered steps (1-5), large circular number badges
- Each step: number, title, one-line description, action (copy/download/fill)
- Visual connection between steps (vertical line or arrows)
- Current step highlighted (when interactive)
- Steps:
  1. Open Claude and start a new conversation
  2. Copy and paste Claude's role (with copy button)
  3. Upload the required skill files (with download buttons)
  4. Copy and paste the prompt (with copy button)
  5. Fill in the [VARIABLES] and send
  6. Review the output using the quality checklist

### SkillFileCard
- Small card with file icon, name, description
- Download button (downloads .md file)
- Status badge (Ready / Coming Soon)
- "Coming Soon" files are grayed out, no download button

### CopyButton
- Icon button (clipboard icon from Lucide)
- On click: copy text to clipboard, icon changes to checkmark for 2s
- Green flash animation on success
- Accessible: aria-label="Copy to clipboard"

### QualityChecklist
- Expandable section (collapsed by default)
- Checkbox-style list (visual only, not interactive)
- Each item is a quality criterion
- Header: "Quality checklist — verify your output"

### SuggestionForm
- Simple form: name, vertical (dropdown), what you're suggesting (textarea), attachment (file input or link)
- Submit creates a mailto: link to Anish or opens embedded Google Form
- Success message: "Thanks! Anish will review and add to the command center."

## Illustrations

No stock images. All illustrations are:
- Simple SVG components built in code
- GSL brand colours (teal, navy, with accent colours)
- Flat design, no gradients, no shadows on illustrations
- Used for: Getting Started guide steps, empty states, hero section

Illustration subjects:
- Person at laptop (getting started)
- Clipboard with checkmark (copy prompt)
- Files floating into a box (upload skill files)
- Sparkles/magic wand (AI generating output)
- Magnifying glass over document (review output)

## Responsive breakpoints
- Mobile: 0-640px (single column, stacked cards)
- Tablet: 641-1024px (2-column grid for cards)
- Desktop: 1025px+ (3-column grid for cards, sidebar on task detail)

## Animations
- Page transitions: none (static site, instant navigation)
- Card hover: `transition-all duration-200 ease-out` — translateY(-2px) + shadow
- Copy button: green flash, icon swap with 200ms transition
- Expandable sections: height transition 300ms

## Accessibility
- All interactive elements have focus rings (ring-2 ring-teal)
- All images/icons have alt text or aria-label
- Colour contrast ratio: 4.5:1 minimum for all text
- Keyboard navigable: tab through all interactive elements
- Screen reader: semantic HTML (nav, main, article, section)
