---
slug: carousel
title: Claude Carousel Generator
icon: "🎠"
category: Social Content
what_youll_make: A 6 to 10 card carousel for Instagram or LinkedIn, written in the GSL voice, built on the hook-problem-solution-proof-CTA arc. Per-card copy within the 8-word headline and 20-word body limits, visual brief for each card, one clear CTA at the end.
time_needed: 30 to 45 minutes
difficulty: gentle
skills_referenced:
  - carousel-design-framework
  - brand-voice
related_playbooks:
  - teaching-ppt
  - product-note
status: published
use_when: |
  You have an insight, a programme update, a student story, or a parent-education moment that deserves a social post longer than a single image but shorter than a blog. One clear audience (parents, educators, school leaders, or students and alumni), one platform (Instagram or LinkedIn), one specific action the reader should take at the end.

  Use this for: programme announcements, parent-facing explainers (what is Young Pioneers, why does Class 6 need to learn a robot arm), educator-facing teaching tips, student or alumni wins, event invites, cohort openings.

  This is NOT for: single-image posts (use Canva), blog posts (use the Product Note playbook and adapt), trainer-facing content (use the Delivery Script playbook), or internal decks (use the Teaching Material PPT Builder).
before_you_start:
  - Platform (Instagram or LinkedIn)
  - Audience, exactly one (Parents / Educators / School leaders / Students and alumni)
  - Goal of the carousel in one sentence ("Get 20 Class-6 parents to book a STEM programme walkthrough", "Get Young Pioneers educators to share the Launchpad registration link with their schools")
  - The insight, update, or story at the centre (one short paragraph, not a marketing brief)
  - The one CTA the carousel ends on (exactly one verb)
  - The Carousel Design Framework skill (slug, carousel-design-framework), attached or pasted
steps:
  - title: Frame the carousel
    instruction: |
      Open a new Claude conversation (Projects is ideal, with the Carousel Design Framework attached). Paste the prompt below, fill in the bracketed variables, and let Claude confirm the constraints before any cards are written.

      The most common carousel failure is tone mismatch: a parent carousel that reads like a school leader carousel, or a LinkedIn carousel in Instagram voice. Step 1 locks the tone before content lands.
    tool: Claude, Projects feature is best
    prompt: |
      I am building a carousel for GSL Academics, an Indian K-12 EdTech. Here is the brief.

      Platform: [INSTAGRAM / LINKEDIN]
      Audience (exactly one): [PARENTS / EDUCATORS / SCHOOL LEADERS / STUDENTS AND ALUMNI]
      Goal (one sentence): [WHAT MUST THE READER DO, AND WHY DOES THAT MATTER]
      Insight or story at the centre: [ONE SHORT PARAGRAPH]
      Final CTA (one verb, exact wording): [WHAT THEY DO AT THE END]
      Card count target: [6 / 7 / 8 / 9 / 10]

      Before you do anything, confirm in one short paragraph that you understand these constraints. Name each one, do not paraphrase loosely.

      1. British English throughout. No em-dash anywhere.
      2. Indian context everywhere. Names (Priya, Arjun, Fatima, Harpreet, Ravi, Ananya, Kabir), cities varied (Pune, Kanpur, Bhopal, Kochi, Guwahati, Indore, Lucknow, Bhubaneswar, not always Mumbai), scenarios (paani-puri stall, Diwali, Chennai WhatsApp group, Goa beach cleanup, Kanpur rooftop experiment). Currency in Rs, lakh and crore where natural.
      3. Structure follows the GSL carousel arc, five acts: hook (1 to 2 cards), problem (1 to 2), solution (2 to 3), proof (1 to 2), CTA (1). All five acts must be present regardless of card count.
      4. Every card earns the next swipe through one of four mechanisms: cliffhanger, pattern, surprise, or clear payoff. No orphan cards.
      5. Copy limits are physical, not aesthetic. Headlines 8 words maximum. Body 20 words maximum per card. One idea per card.
      6. Voice matches the audience. Parents get warm and reassuring language. Educators get respectful and technically honest language. School leaders get strategic and outcomes-focused language. Students and alumni get peer-level, confident, never condescending language.
      7. The final card has exactly one CTA, exactly one verb. No "learn more or contact us or follow our page". The CTA is the verb I specified in the brief.
      8. GSL palette and typographic pairing. Turquoise Sea and Azure Blue as the duo on every card. Orange Peel for one specific attention moment (often the proof or the CTA). Fraunces for display, Inter for body.
      9. Platform-specific rules. On Instagram, 1080 x 1350 portrait, up to 10 cards, a 1/N progress indicator bottom-right, a first-125-character caption that reads as a standalone hook. On LinkedIn, 1200 x 1200 square (or 1200 x 1500 portrait), PDF carousel format, data-forward tone, first-200-character caption leads with substance, 3 to 5 specific hashtags.
      10. No marketing boilerplate. "Founded in 2015, we are India's leading future-skills learning partner" and similar sentences never appear. Show, do not declare.

      Once you have confirmed all ten in your own words, stop and wait. Do not start the arc yet.
    mid_flow_checks:
      - Claude named all ten constraints specifically, not a generic summary
      - Carousel Design Framework is attached or pasted
      - The platform, audience, goal, and final CTA are all clear in your brief; if any of them drifted, correct it now
    expected_output: |
      A confirmation paragraph from Claude, numbered 1 through 10, each constraint acknowledged in its own words. No carousel content yet.
    next_action: |
      Read the confirmation. If the voice anchor for your chosen audience (point 6) feels generic, push Claude to name the specific language tells before you move on. A weak Step 1 predicts cards that drift into neutral marketing voice.
  - title: Design the story arc
    instruction: |
      Ask Claude for the five-act arc first, before any card copy. Making the structure visible up front catches flat narratives and missing acts before they hide inside 8 cards of copy.
    tool: Claude, same conversation
    prompt: |
      Now design the story arc for this carousel, card by card, in the five-act shape. Produce a table:

      | Card # | Act | Role in the arc | One-line card purpose | Swipe mechanism |

      Rules:

      - All five acts present (hook, problem, solution, proof, CTA). Card counts per act can flex within the targets (hook 1 to 2, problem 1 to 2, solution 2 to 3, proof 1 to 2, CTA 1), but no act can be skipped.
      - The CTA card is always the last card, always exactly one. No exceptions.
      - "Swipe mechanism" must be one of: cliffhanger, pattern, surprise, clear payoff. Name it, do not describe. The final card (CTA) does not need a swipe mechanism.
      - The proof act uses specific evidence, not generic "our students do well". Name a school, a student, a number, a programme outcome. If the insight in the brief does not come with specific proof, flag it to me in one line below the table so I can add it before we write copy.

      Below the table, write a one-paragraph positioning note: what is the emotional arc the reader feels from card 1 to the last card? One sentence on the opening emotion, one sentence on the turn, one sentence on the landing.
    mid_flow_checks:
      - All five acts are present with the right card-count ranges
      - Every non-final card has a named swipe mechanism (cliffhanger, pattern, surprise, or clear payoff)
      - Proof act points at specific evidence, not generic claims
      - Emotional arc paragraph names three distinct feelings, not the same feeling three times
    expected_output: |
      A card-by-card arc table + a short emotional-arc paragraph.
    next_action: |
      Check the proof row. If Claude has flagged missing specific evidence, gather it before moving to Step 3 (a real named school, a specific student outcome, a numeric result). Do not let the proof card be generic; a generic proof card breaks the carousel.
  - title: Write the per-card copy
    instruction: |
      Now Claude writes the actual copy for every card, within the 8-word headline and 20-word body limits, in the voice anchor set in Step 1.
    tool: Claude, same conversation
    prompt: |
      Now write the copy for every card in the arc from Step 2. For each card produce:

      - Card number and role in the arc (from Step 2)
      - Headline, maximum 8 words
      - Body, maximum 20 words
      - Swipe mechanism used (cliffhanger / pattern / surprise / clear payoff), carried from Step 2
      - Indian-context hook (a specific name, city, or scenario woven into the body where natural, not forced)

      Return as a table:

      | # | Role | Headline (≤8 words) | Body (≤20 words) | Swipe mechanism | Indian hook |

      Rules (non-negotiable, restated):

      - British English throughout.
      - No em-dash.
      - One idea per card.
      - Voice matches the audience from Step 1.
      - The final card's body is the one CTA and nothing else. No "learn more or ...". Exactly one verb, the one specified in the brief.
      - No corporate boilerplate. No "founded in 2015" or "leading provider of". No generic "empowering the next generation".
      - The hook card body is strong enough to stand alone in the Instagram first-125-character caption or the LinkedIn first-200-character line.
      - Use numbers where they exist (Rs, lakh, crore, exact student counts). Do not hand-wave with "thousands" if you know the number.

      After the table, add a short "caption draft" section:

      - For Instagram: a 2-to-3 sentence caption. First sentence is a standalone hook (≤125 characters). Then 5 to 10 hashtags, mixing broad and specific.
      - For LinkedIn: a 3-to-4 sentence caption, data-forward. First sentence leads with substance (≤200 characters). Then 3 to 5 specific hashtags.

      British English, Indian context, final CTA line at the end of the caption where natural.
    mid_flow_checks:
      - Every headline is 8 words or fewer. If any is longer, flag and rewrite
      - Every body is 20 words or fewer. If any is longer, split into two cards or cut
      - The final card is exactly one CTA verb, not three
      - The hook card body reads as a standalone opener for the caption
    expected_output: |
      A card-by-card copy table with the swipe mechanism and Indian hook columns filled, plus a caption draft for the chosen platform.
    next_action: |
      Read through card by card, pretending to be the audience from Step 1. At the end of each card ask yourself "would I swipe now?". If not, push Claude to rework that card's mechanism or cut it. If a card crosses the word limits, it MUST be rewritten before Step 4.
  - title: Brief the visuals
    instruction: |
      Turn each card's implied visual into a Midjourney v6 prompt or a designer brief. Carousels live or die on visual consistency; every card must feel like it belongs in the same set.
    tool: Claude, same conversation; Midjourney separately for illustrations
    prompt: |
      For each card from Step 3, generate a visual brief. Use one format per card:

      - Option A, Midjourney v6 prompt. Use when the card needs a custom illustration.
      - Option B, designer brief (one or two lines). Use when the card needs a chart, a number-forward graphic, a photographic treatment of a named student's work, or a pure-type card with no image.

      For every Midjourney prompt, include these style anchors:

      - Clean, editorial illustration. Not photorealistic.
      - Soft colour palette that works with GSL Turquoise Sea (#00D8B9), Azure Blue (#073393), and Orange Peel (#FFAD40). No clashing red, no muddy olive.
      - Characters reflect Indian students or adults appropriate to the card (educators, parents, students). Varied skin tones, varied ages, varied settings. No photorealistic faces of real people, no copyrighted characters, no trademarked brand elements.
      - Aspect ratio 4:5 for Instagram (1080 x 1350) or 1:1 for LinkedIn (1200 x 1200). Specify the ratio in every prompt.
      - No text inside the image. Text lives in the card layout, not the illustration.

      For designer briefs, name the exact shape: "simple 3-step horizontal flow with turquoise circles and azure connectors", "stacked number + one-line caption, Fraunces display at 96pt over light-sky wash", "a photo-style frame of a Class 9 student's Launchpad pitch with a thin azure border". Specific, not "make it look nice".

      Consistency rules across the carousel:

      - Same typographic pairing on every card (Fraunces display, Inter body).
      - Same colour palette on every card; do not rotate through all five GSL brand colours.
      - Same margin and safe-zone system on every card.
      - Logo placement in the same spot on every card (usually lower-left, small).
      - A 1/N progress indicator bottom-right on Instagram carousels.

      Return as a numbered list:

      1. Card 1, [illustration / chart / pure type / photo treatment]: [Midjourney prompt OR designer brief]
      2. Card 2, ...
    mid_flow_checks:
      - Every card has a visual brief, either a Midjourney prompt or a designer brief
      - Every Midjourney prompt names Indian characters with varied appearances, not "students" generically
      - The aspect ratio is specified per prompt and matches the chosen platform
      - Consistency rules (typography, palette, margins, logo) are restated in a short closing paragraph
    expected_output: |
      A numbered list of visual briefs, one per card, plus a short consistency note.
    next_action: |
      Generate the Midjourney images one prompt at a time. Upscale and download. For designer-brief cards, plan to build them in Figma or Canva using the GSL template. Save all assets into one folder named after the carousel, as card-01.png, card-02.png, etc.
  - title: Package the carousel spec
    instruction: |
      Claude assembles everything from Steps 2 through 4 into one paste-ready spec so the designer (or you, in Figma or Canva) can build the carousel without flipping between earlier messages.
    tool: Claude, same conversation
    prompt: |
      Produce the final carousel specification document, ready for Figma or Canva assembly. For each card in order, produce this block:

      ---

      **Card [N]: [Role in the arc]**

      Headline: [≤8 words]
      Body: [≤20 words]

      Swipe mechanism: [cliffhanger / pattern / surprise / clear payoff / final CTA]

      Indian hook: [the specific name, city, or scenario]

      Visual: [Midjourney prompt N / Chart: ... / Pure type / Photo of ...]

      Layout notes: [where the headline sits, where the body sits, any specific card-only element]

      ---

      At the top, a cover block:

      - Platform, Audience, Goal
      - Card count and arc breakdown (e.g. "7 cards: hook 1 + problem 1 + solution 3 + proof 1 + CTA 1")
      - The one final CTA in full

      At the bottom:

      - Caption draft (Instagram or LinkedIn format, per Step 3)
      - Hashtag set
      - Asset file-naming convention (card-01.png, card-02.png, etc.)
      - Publish-ready checklist: "Post caption, attach the cards in order, add hashtags in first comment (Instagram) or inline (LinkedIn), schedule for [day and time to be confirmed with the team]"

      British English, no em-dash, Indian context throughout.
    mid_flow_checks:
      - Cover block lists Platform, Audience, Goal, Card count + arc breakdown, and the one final CTA
      - Every card block has headline, body, swipe mechanism, Indian hook, visual, and layout notes filled in
      - Caption draft matches the chosen platform conventions
    expected_output: |
      A complete, paste-ready carousel spec document.
    next_action: |
      Open Figma or Canva with the GSL Carousel Template. Build card by card from the spec. Import the Midjourney images or designer-brief assets from Step 4. Export the cards as a PDF (for LinkedIn) or as separate 1080 x 1350 PNGs (for Instagram).
  - title: Review the carousel against the quality rules
    instruction: |
      Before the audit stage, run a structured self-check. This catches the common carousel failure modes (a card that does not earn the next swipe, a body over 20 words, a final card with multiple CTAs) before the audit.
    tool: Claude, same conversation
    prompt: |
      Review the carousel spec you just produced against these rules. For each rule, return pass or fail, the specific card numbers where it fails, and a one-line fix.

      1. British English throughout. Flag any "organize", "color", "realize", "behavior", "analyze", "center", "favorite", "program" used for the education programme.
      2. No em-dash character anywhere.
      3. All five acts present (hook, problem, solution, proof, CTA) with card counts within the target ranges.
      4. The final card has exactly one CTA, exactly one verb, matching the CTA in the brief.
      5. Every non-final card names a swipe mechanism (cliffhanger, pattern, surprise, or clear payoff), and reading from card [N-1] to card [N] the mechanism actually works (the reader would swipe).
      6. Headlines are 8 words or fewer on every card.
      7. Bodies are 20 words or fewer on every card.
      8. Voice matches the audience set in Step 1 on every card, with no drift into neutral marketing voice.
      9. Indian context lands on every card (name, city, or scenario) where the card supports it. Hook and CTA cards are allowed to be voice-driven rather than hook-heavy; problem, solution, and proof cards must carry specific Indian context.
      10. No corporate boilerplate. Flag any sentence like "founded in 2015", "leading provider of", "empowering the next generation", or similar.
      11. Proof card names specific evidence (a school, a student, a number, a programme outcome). Flag if generic.
      12. Caption first 125 characters (Instagram) or first 200 characters (LinkedIn) stand alone as a hook.

      Return a 12-row table:

      | # | Rule | Pass or Fail | Cards where it fails | One-line fix |

      Then a one-paragraph closing: what is the single most-valuable fix to apply before running the Audit Stage?
    mid_flow_checks:
      - All twelve rules checked, including the ones that pass
      - Failure rows name specific card numbers, not "some cards"
      - The closing paragraph names one specific top fix
    expected_output: |
      A 12-row self-review table + a one-paragraph top-fix recommendation.
    next_action: |
      Fix what the review flagged. Update the spec (and the Figma or Canva file if you have already started assembling). When the review comes back clean, move to the Audit Stage.
audit_prompt_template:
  prefix: |
    The standard above defines the bar. Now run a quick surface check on this carousel as well:

    A. British English throughout. Flag any "organize", "color", "realize", "behavior", "analyze", "center", "favorite", or "program" used for the education programme.
    B. No em-dash character anywhere.
    C. Every headline is 8 words or fewer. Every body is 20 words or fewer.
    D. The final card has exactly one CTA, exactly one verb.
    E. The hook card body stands alone as a social-caption opener (≤125 chars on Instagram, ≤200 chars on LinkedIn).
    F. Caption, hashtags, and platform-specific spec (aspect ratio, card count, progress indicator) match the brief.

    Return a table with columns: Criterion, Pass or Fail, Evidence (the specific card number or section), Fix. Include both the bar-comparison findings and the surface checks. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
  fallback: |
    Audit the attached GSL carousel against these criteria. For each, return pass or fail, the specific card number or section where it passes or fails, and a one-line suggested fix.

    Criteria referencing the Carousel Design Framework skill (slug: carousel-design-framework, which you should have as context; if you do not, say so and stop):

    1. All five acts present (hook, problem, solution, proof, CTA) with card counts within the targets: hook 1 to 2, problem 1 to 2, solution 2 to 3, proof 1 to 2, CTA exactly 1.
    2. The CTA card is the last card, with exactly one CTA verb, matching the brief.
    3. Every non-final card earns the next swipe through one of the four mechanisms (cliffhanger, pattern, surprise, clear payoff). Read card-by-card in order and flag any card where the swipe would not happen.
    4. Voice matches the chosen audience (parents, educators, school leaders, or students and alumni) consistently across the carousel.
    5. Proof card names specific evidence (a school, a student, a number, a programme outcome).
    6. No orphan cards. Every card either advances the arc or earns the next swipe.

    Criteria on copy limits:

    7. Every headline is 8 words or fewer.
    8. Every body is 20 words or fewer.
    9. One idea per card.

    Criteria on Indian context and GSL voice:

    10. Indian names, cities, and scenarios across the carousel. Cities vary (not always Mumbai). Names vary (no single name used more than twice).
    11. British English throughout. No "organize", "color", "realize", "behavior", "analyze", "center", "favorite", or "program" for the education programme.
    12. No em-dash character anywhere.
    13. No corporate boilerplate ("founded in", "leading provider of", "empowering the next generation", or similar).

    Criteria on visual and platform match:

    14. GSL palette used consistently across cards (Turquoise Sea and Azure Blue as the duo; Orange Peel at one specific moment; no rotating through all five brand colours).
    15. Same typographic pairing on every card (Fraunces display, Inter body).
    16. Aspect ratio and card count match the chosen platform (Instagram: 1080 x 1350 portrait, up to 10; LinkedIn: 1200 x 1200 or 1200 x 1500, up to 10).
    17. Progress indicator (1/N) appears bottom-right on Instagram carousels.
    18. Caption first 125 characters (Instagram) or first 200 characters (LinkedIn) stand alone as a hook.
    19. Hashtags match the platform (5 to 10 mixed broad-and-specific on Instagram; 3 to 5 specific on LinkedIn).

    Return a table with columns: Criterion, Pass or Fail, Evidence, Fix. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
common_pitfalls: |
  - **The deck-in-squares trap.** 8 cards, each with a heading and four bullets, no swipe mechanisms between them. This is a deck, not a carousel. Rebuild with one idea per card and a named swipe mechanism at the end of each.
  - **The triple CTA.** "Learn more, follow us, book a demo." The reader does none of them. Cut to one.
  - **Generic proof.** "Our students do well" or "We have helped thousands". The proof card needs a named school, a specific student outcome, a real number. Without specificity, the card has no weight.
  - **Voice drift.** The hook is in peer-level student voice, the solution is in principal voice, the CTA is in parent voice. Lock the audience in Step 1 and hold it.
  - **Over-length headlines.** "Why Class 6 students in Pune are learning how to build chatbots." That is 11 words and it is unreadable on a 1080px card. Cut to 8 or fewer: "Class 6 students in Pune are building chatbots."
  - **Over-length bodies.** Anything over 20 words on a carousel card becomes a paragraph no one reads. Split into two cards or cut.
  - **Indian context forced onto hook and CTA cards.** The hook is allowed to be a standalone insight. The CTA is allowed to be a clean verb. Indian context lands naturally on problem, solution, and proof cards. Do not force it where it does not help.
  - **Rotating through the full brand palette.** Turquoise and Azure are the duo. Orange Peel is one moment. Fuchsia is for celebration only. A carousel using all five colours feels like a design system explaining itself, not a carousel telling a story.
  - **No progress indicator on Instagram.** The platform rewards swipes that complete the carousel. A small 1/8 indicator bottom-right helps the reader track progress and finish the arc.
---
