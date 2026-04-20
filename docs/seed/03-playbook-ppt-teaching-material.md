---
slug: ppt-teaching-material
title: Teaching Material PPT Builder
icon: 🎨
category: Presentations
what_youll_make: A GSL-branded slide deck that a teacher can open in class and use as a lesson visual.
use_when: You need to turn a curriculum topic into classroom-ready slides. Works for any grade, any subject, any GSL programme.
time_needed: 45 to 90 minutes
difficulty: gentle
skills_referenced:
  - gsl-pedagogy-foundations
  - gsl-brand-voice
  - gsl-ppt-patterns
related_playbooks:
  - lesson-plan-builder
  - assessment-builder
  - train-the-trainer-ppt-builder
version: 1
status: published
---

## What you'll make
A 10 to 15 slide deck, GSL-branded, that a teacher can open in class and use as a lesson visual. Covers the topic with the right pedagogy, age-appropriate language, and at least one Indian-context example per section.

## Use this when
You have a topic, a grade, and a learning outcome in mind, and the teacher needs slides that walk through the concept, show examples, and prompt class discussion.

This is **not** for sales decks, product notes, or train-the-trainer decks. For those, see the respective playbooks.

## Before you start
Have these ready:
- **Topic** (e.g. "Photosynthesis", "The Mughal Empire", "Fractions and Decimals")
- **Grade** (e.g. Class 6)
- **Learning outcomes** (2 to 4 bullet points, what the student should know or do by the end)
- **Duration** (how long the class is, usually 40 or 45 minutes)
- **Programme context** (STEAM / Cambridge YP / Harvard HBPE / IITG AI / general CBSE)
- Optional but helpful: textbook chapter reference, any visuals the teacher wants included

## Steps

### Step 1, frame the deck
**Tool:** Claude (Projects feature is best; regular Claude.ai works too)

**What to do:** Open a new conversation. If you're using Claude Projects, make sure the GSL Pedagogy Foundations skill is attached to the project. If not, paste the key sections into the prompt.

**Prompt to copy:**
```
I need to make a teaching material PPT for a GSL class. Here's the brief:

Topic: [TOPIC]
Grade: [GRADE]
Learning outcomes: [LIST]
Duration: [MINUTES]
Programme: [STEAM / Cambridge YP / Harvard HBPE / IITG AI / CBSE]

Context for you:
- This is for GSL, an Indian K-12 EdTech. Use British English, Indian examples always (Indian cities, Indian names, rupees). No emdashes.
- Follow NEP 2020 and NCF 2023 pedagogical principles: conceptual clarity, experiential learning, critical thinking.
- Age-appropriate language and cognitive load for the grade.
- Every section must have at least one concrete Indian example.

First, give me a slide-by-slide outline (just titles and one-line purpose per slide). Don't write the slides yet. Aim for 10 to 15 slides including hook, concept, examples, practice, recap.
```

**Expected output:** A numbered outline of 10 to 15 slides with titles and one-line purposes.

**Next action:** Read the outline. Does it cover all the learning outcomes? Is the pedagogical flow right (hook → concept → example → practice → recap)? If yes, continue. If no, respond to Claude with edits and iterate until the outline is solid.

### Step 2, generate slide content
**Tool:** Claude, same conversation

**What to do:** Ask Claude to write the actual content now that the outline is approved.

**Prompt to copy:**
```
Good, that outline works. Now write the full content for each slide. For each slide give me:

- Slide title (short, punchy, not generic)
- Body content (bullet points or short paragraph, age-appropriate for [GRADE])
- Teacher notes (2 to 3 lines, what the teacher should say or ask when showing this slide)
- Suggested visual (what image, diagram, or chart belongs on this slide; describe it so I can later brief Midjourney or source a visual)

Remember: British English, Indian examples, no emdash, warm voice. Don't cram too much on one slide, max 5 bullets or one short paragraph.
```

**Expected output:** Full content for every slide, following the outline.

**Next action:** Read through carefully. Check three things:
1. Every learning outcome is addressed somewhere.
2. At least one Indian example per section.
3. No slide is overcrowded.

If edits needed, respond in the same conversation. Iterate until you're happy.

### Step 3, brief the visuals
**Tool:** Claude (same conversation) + Midjourney (separately) or existing GSL asset library

**What to do:** For each slide that needs a custom image, turn the "suggested visual" into a Midjourney prompt.

**Prompt to copy:**
```
For the slides that need custom images, turn each "suggested visual" into a Midjourney v6 prompt. Use these style anchors:
- Clean, educational illustration style
- Soft colour palette that works alongside GSL turquoise and blue
- Characters reflect Indian school students (varied, age-appropriate for [GRADE])
- No photorealistic faces of real people, no copyrighted characters
- Aspect ratio 16:9 for slides

Give me the Midjourney prompts as a numbered list, one per slide that needs a visual.
```

**Expected output:** A list of Midjourney prompts, one per visual needed.

**Next action:** Generate each visual in Midjourney. Pick the best variation. Upscale. Download. Name the files `slide-01.png`, `slide-02.png`, etc., in a single folder.

For slides that need charts, diagrams, or simple graphics rather than illustrations, skip Midjourney and build them natively in PowerPoint in Step 5.

### Step 4, apply the GSL brand
**Tool:** PowerPoint (or Google Slides)

**What to do:** Start from the GSL Teaching Material template (Drive → Academics → Templates → "GSL Teaching Material Template v2.pptx"). It's pre-loaded with:
- GSL colour scheme (Turquoise Sea, Azure Blue, Orange Peel accents, Light Sky backgrounds)
- Logo placement
- Fonts (Proxima Nova headings, Roboto body; Calibri fallback)
- Title, section divider, content, and closing slide layouts

Copy Claude's Step 2 output into the respective slide layouts. Use section dividers if your deck has clear sections.

**Rules from the brand voice skill:**
- Titles sentence case, not Title Case
- Body text never smaller than 18pt
- Maximum 5 bullets per slide, 8 words per bullet where possible
- One big idea per slide

### Step 5, place the visuals
**Tool:** PowerPoint

**What to do:** Insert the Midjourney images or build the charts/diagrams. For charts, use PowerPoint's native chart tool (not screenshots). For diagrams, use SmartArt or shapes.

Keep visuals to one per slide in most cases. Add attribution if using external source (e.g. "Source: NCERT Class 6 Science textbook").

### Step 6, review against the quality checklist
**Tool:** You, with the deck open

**What to do:** Run the checklist below. Fix anything that fails.

### Step 7, save to the content library
**Tool:** The Studio, this app

**What to do:** Come back to the Studio. Open this playbook. Click "Save output to library" at the bottom. Upload the final .pptx. Tag with topic, grade, programme. Write a one-line note on what worked and what didn't.

This is how the team builds a gallery of real past outputs, searchable for whoever comes next.

## Quality checklist
Before you consider the deck done:

- [ ] Every learning outcome from the brief is addressed somewhere in the deck
- [ ] Every section has at least one Indian-context example (Indian names, places, scenarios)
- [ ] British English throughout (no "color", "organize", "realize")
- [ ] No emdash, anywhere
- [ ] Title slide has topic, grade, GSL branding
- [ ] Closing slide has a recap and at least two discussion questions
- [ ] No slide has more than 5 bullets or more than 40 words
- [ ] All visuals are custom Midjourney, GSL library, or cited external
- [ ] Teacher notes filled in for every content slide
- [ ] Age-appropriate language (no jargon beyond grade level, no patronising tone)
- [ ] Bloom's coverage: the deck touches at least three of remember / understand / apply / analyse / evaluate / create

## Common pitfalls
- **Overcrowded slides.** If you can't read it from the back of the room, it's too dense. Split into two slides.
- **Generic examples.** "Ram and Shyam" is fine, but "Ram from Kanpur runs a paani-puri stall" is better. Concrete beats abstract.
- **Missing teacher notes.** Teachers rely on these. Never leave them blank.
- **Western defaults.** Claude often defaults to American or British examples (pizza, cricket bats priced in dollars). Always redirect to Indian context.
- **Copy-paste without editing.** Claude gives you a draft. You ship the final. Read every line.
- **Ignoring the learning outcomes.** At Step 7, re-read the original outcomes. If one isn't addressed, add a slide.

## Examples gallery
Once you ship outputs through this playbook, they appear here, tagged and searchable.

## Improve this playbook
Something not working? Prompt not getting good output? Step confusing? Use "Suggest improvement" in the side panel. Ritu reviews suggestions weekly and updates the playbook for everyone.
