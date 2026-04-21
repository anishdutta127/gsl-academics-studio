---
slug: product-note
title: Product Note Builder
icon: "📝"
category: Internal Briefs
what_youll_make: A one-page internal product note for a non-Academics audience (Sales, Marketing, Leadership, Principals, Parents). Opens with a positioning line, carries three key points each backed by specific evidence, briefs one visual the note needs, ends with exactly one CTA. Built for the audience to read in under three minutes and walk away with one clear action.
time_needed: 30 to 45 minutes
difficulty: gentle
skills_referenced:
  - brand-voice
  - pedagogy-foundations
related_playbooks:
  - cbse-summary
  - carousel
status: published
use_when: |
  You need to explain a GSL programme, a new feature, a pilot result, or a curriculum decision to an audience outside Academics. The audience does not need (and will not read) a 10-page deck. They need one page: what it is, why it matters, three things that are true about it, and one thing to do next.

  Use this for: introducing a new programme to the Sales team, summarising a pilot result for Leadership, writing a principal-facing note for school meetings, a one-pager Marketing can pair with a campaign brief.

  This is NOT for: external Marketing content (use the Carousel Generator), teacher-facing content (use the Lesson Plan or Teaching Material playbooks), or operational how-to notes (those live in OneDrive as team docs, not in the Studio).
before_you_start:
  - The programme, product, pilot, or initiative (specific, not "our approach to AI")
  - The audience, exactly one (Sales / Marketing / Leadership / Principals / Parents)
  - The strategic goal (the decision or action you want from this audience after they read the note)
  - Evidence you already have (data points, named schools, student outcomes, pilot results, quotes). List what exists; Claude will not invent evidence.
  - The one CTA, as a verb phrase ("Approve the Q2 rollout to 8 more schools", "Add this programme to the Summer campaign", "Agree to pilot this with Class 9 next term")
  - Any external constraints (word limit stricter than one page, legal review requirements, partner co-branding)
  - The Pedagogy Foundations skill attached or pasted, if the note references pedagogical framing
steps:
  - title: Frame the note
    instruction: |
      Open a new Claude conversation. Step 1 locks the audience, the goal, and the positioning before a single sentence is written. The most common product-note failure is voice drift: a note written for Leadership that reads like a parent pamphlet, or a principal note that drifts into Sales pitch. Step 1 fixes that.
    tool: Claude, Projects feature is best
    prompt: |
      I am writing an internal GSL product note for a non-Academics audience. Here is the brief.

      Subject of the note: [PROGRAMME, PRODUCT, PILOT, OR INITIATIVE]
      Audience (exactly one): [SALES / MARKETING / LEADERSHIP / PRINCIPALS / PARENTS]
      Strategic goal (what do you want them to do or decide): [ONE SENTENCE]
      Evidence available: [LIST THE DATA POINTS, NAMED SCHOOLS, OUTCOMES, QUOTES YOU ALREADY HAVE]
      One CTA (verb phrase, exact wording): [WHAT THEY DO NEXT]
      Word limit if stricter than one page: [WORD COUNT, or "One page, no stricter limit"]

      Before you produce anything, confirm in one short paragraph that you understand these constraints. Be specific.

      1. British English throughout. No em-dash anywhere. No American spellings.
      2. Indian context everywhere. Names (Priya, Arjun, Fatima, Harpreet, Ravi, Ananya, Kabir). Cities varied (Pune, Kanpur, Bhopal, Kochi, Guwahati, Indore, not always Mumbai). Scenarios concrete (a Pune parent, a Kanpur Class 6 teacher). Currency in Rs.
      3. The note is ONE PAGE. Aim for 350 to 500 words of body text. More than one page defeats the format.
      4. Structure in five blocks: (a) Positioning line (one sentence), (b) Why it matters now (one short paragraph), (c) Three key points, each with specific evidence, (d) Visual brief (one visual named specifically), (e) One CTA.
      5. Voice matches the audience. Sales gets results-forward language (X schools, Y student wins, Z revenue signal). Marketing gets hook-forward language (what makes this stand out, what angle works). Leadership gets strategic language (what this does for the company's next 12 months, risks, dependencies). Principals get outcome-forward language (student results, NEP alignment, fit with their school's direction). Parents get child-forward language (what it does for the child, how the parent knows it is working).
      6. Every key point carries specific evidence. Not "our students do well" but "14 of 20 Class 9 Young Pioneers students reached Launchpad semi-finals this year" or "80% of principals who piloted VideoGenX renewed for a second cohort". If the evidence is not in the brief above, Claude asks for it rather than inventing.
      7. The CTA is exactly one verb phrase, matching the brief. Not three options. Not "learn more and consider".
      8. No corporate boilerplate. "Founded in 2015", "India's leading...", "empowering the next generation" never appear.
      9. No em-dashes. Use commas, parentheses, or restructure.
      10. The note should be shareable with the audience as-is after one round of edits, not five rounds. This is the bar.

      Once you have confirmed all ten in your own words, stop and wait. Do not start writing the note.
    mid_flow_checks:
      - Claude named all ten constraints specifically
      - The audience is exactly one, not "Sales and Marketing"; a single audience is the commitment that makes the voice specific
      - The CTA is a verb phrase, not a vague intention
    expected_output: |
      A confirmation paragraph from Claude, numbered 1 through 10. No note content yet.
    next_action: |
      If Claude's confirmation of the voice anchor for your audience (point 5) is generic ("I will write in a professional tone"), push for the specific language tells before Step 2. A weak Step 1 predicts a note that reads like marketing copy regardless of audience.
  - title: Write the positioning and the "why now"
    instruction: |
      The first two blocks of the note. Positioning is one sentence that tells the audience what this is. "Why it matters now" is one paragraph that tells them why they should care this week.
    tool: Claude, same conversation
    prompt: |
      Write two blocks.

      **Block A: Positioning line (one sentence, 25 words maximum)**

      Format: "[Subject] is [what it is] for [who it is for], [the one specific thing that makes it different]."

      Example (educator audience): "Young Pioneers is a 24-week entrepreneurship programme for Class 8 to 12 students, built on the Cambridge Global Perspectives framework and run end-to-end by the same teachers who deliver the rest of the school's curriculum."

      Not this: "Young Pioneers is an innovative programme that empowers students to become future leaders." That is a marketing sentence, not a positioning line.

      **Block B: Why it matters now (one paragraph, 60 to 90 words)**

      What has changed in the last 6 to 12 months that makes this subject matter to this audience right now? Cite a specific recent event where you can (NEP 2020 implementation date, a state policy change, parent demand trend, a competitor move, a pilot result). One concrete "now" anchor is worth more than three abstract ones.

      Do not start the three key points yet. Stop after Block B.
    mid_flow_checks:
      - Positioning is 25 words or fewer, in the stated format
      - Positioning names the one specific thing that makes the subject different, not a marketing phrase
      - The Why-now block has at least one specific recent anchor (a date, a policy, a number, a concrete trend)
      - The Why-now block is 60 to 90 words, not a full page of context
    expected_output: |
      Two blocks: a one-sentence positioning line and a 60-to-90 word "why it matters now" paragraph.
    next_action: |
      Read the positioning aloud. If you cannot read it in one breath, it is too long. If it sounds like any EdTech company could have written it, it is too generic. Push for the specific thing that makes THIS programme different.
  - title: Draft three key points, each with specific evidence
    instruction: |
      The body of the note. Three points, no more. Each point is one idea with one specific piece of evidence.
    tool: Claude, same conversation
    prompt: |
      Draft three key points. For each point produce:

      - **Point (one sentence, 15 to 20 words):** what is true about the subject that the audience should know?
      - **Why this matters to [audience]:** one sentence tying the point to the audience's interest. For Sales: sales signal, revenue implication, competitive positioning. For Marketing: angle, campaign hook, audience resonance. For Leadership: strategic fit, risk, runway, dependency. For Principals: student outcomes, NEP alignment, parent response. For Parents: the child's experience and visible progress.
      - **Evidence (one sentence, from the brief's evidence list):** the specific data point, named school, named student, pilot result, or quote that backs the point. No invented evidence. If the brief's evidence list does not support a point, rewrite the point.
      - **Indian context hook:** a specific name, city, or scenario woven into either the point or the evidence (not both; do not force it).

      Return as a table:

      | # | Point (one sentence) | Why this matters to [audience] | Evidence (one sentence) | Indian hook |

      Rules:

      - Exactly three points, not two, not four. Discipline.
      - The three points together should cover the audience's three biggest objections or questions for this subject. If all three cover the same dimension (all three about cost, for example), restructure.
      - Points ordered by how load-bearing they are for the CTA. Point 1 is the one the CTA rests on most.
      - No "Point 1: What it is. Point 2: Why it matters. Point 3: How it works." That is a summary of the note, not three key points. Each point is a different substantive claim.
    mid_flow_checks:
      - Exactly three points, no more, no less
      - Every point has one piece of specific evidence from the brief (not invented)
      - Points cover three different dimensions, not the same dimension three times
      - Point 1 is the most load-bearing for the final CTA
    expected_output: |
      A 3-row key-points table.
    next_action: |
      Read Point 1 and the CTA side by side. Does Point 1 naturally lead to the CTA? If not, Point 1 is the wrong lead. Push Claude to reorder.
  - title: Brief the visual
    instruction: |
      A product note has one visual. Chart, diagram, photo treatment, or a single bold quote card. Brief it specifically.
    tool: Claude, same conversation
    prompt: |
      The note carries exactly one visual. Pick the type that works best for the audience and the subject, then brief it specifically.

      Options:

      - **Chart.** A simple bar, line, or stacked column. Use when the evidence is numeric and comparison is the point (e.g. "% of principals who renewed after pilot, by programme").
      - **Diagram.** A flow, a cycle, or a 3-to-5-step progression. Use when the evidence is structural and showing the shape teaches the point.
      - **Photo or illustration with caption.** Use when the evidence is a named student or school outcome and seeing the person or work adds weight.
      - **Quote card.** A single line from a principal, parent, or student, formatted as a pull-quote. Use sparingly, when the quote is genuinely specific ("We added Young Pioneers to Class 9 this year. Three of our students made it to the Launchpad semis, including Ananya who had never spoken in front of the class before."). Not "this programme is great".

      Brief the chosen visual in 3 to 5 lines:

      - Type (chart, diagram, photo/illustration, quote card)
      - Data, shape, or content (specific: "bar chart, % pilot-to-renewal by programme, 4 programmes compared; source: internal 2025 renewal data")
      - Caption (one line, the visual's takeaway spelled out so the audience does not have to interpret it)
      - Placement in the note (usually between Point 2 and Point 3, so it breaks up the prose and lands before the CTA)
      - Design note (GSL palette; Orange Peel for the highlight bar or the quote card background; Fraunces for the caption headline)

      Do not include more than one visual. A one-page note with three visuals is a dashboard, not a note.
    mid_flow_checks:
      - Exactly one visual, not two
      - The visual type matches the evidence shape (numeric → chart; structural → diagram; named outcome → photo or quote)
      - The caption spells out the takeaway; the audience does not have to interpret the visual
      - Placement is specified
    expected_output: |
      A 3-to-5 line visual brief.
    next_action: |
      If the chosen visual is a chart but the underlying data is a single number, the visual is weaker than a strong quote card or a named student photo. Reconsider the type.
  - title: Package the one-page note
    instruction: |
      Claude assembles the blocks into the final one-page note, ready to paste into Word or the internal team template.
    tool: Claude, same conversation
    prompt: |
      Now produce the final one-page note. Format:

      **Header block**

      - Title (a short line, NOT the positioning sentence): e.g. "Young Pioneers, for the Sales team"
      - Author and date: [YOUR NAME], [TODAY'S DATE]
      - Audience tag: [AUDIENCE]
      - One-line purpose: "Read this before [specific decision or action]"

      **Positioning line** (from Step 2, Block A)

      **Why it matters now** (from Step 2, Block B)

      **Three key points** (from Step 3, rendered as a short prose section with a bold leading sentence per point, followed by the "why this matters" sentence and the evidence sentence. Not a table; a table is for reference, a note is prose.)

      **Visual** (from Step 4, placed between Point 2 and Point 3 with the caption spelled out underneath)

      **One CTA** (from the brief, rendered as a full-width call-to-action block at the bottom: the verb phrase in Fraunces at 18pt, one line of supporting context if useful, and whatever contact or next-step link belongs with it)

      **Footer**

      - Related documents (if any): linked OneDrive paths to source data, prior notes, relevant playbook outputs
      - Feedback line: "Something off or missing? WhatsApp [your name] or flag in the team group."

      Body text length: 350 to 500 words (positioning + why-now + three points). Header, visual, CTA, and footer do not count toward that.

      British English, no em-dash, Indian context in examples, no corporate boilerplate.
    mid_flow_checks:
      - The note fits on one page when printed (header + 350-500 word body + visual + CTA + footer)
      - The three key points are rendered as prose, not as the table from Step 3
      - The CTA is a single verb phrase matching the brief, nothing else competing for attention
      - The footer names the author and at least one link or contact for follow-up
    expected_output: |
      A complete one-page note, ready to paste into Word or the internal template.
    next_action: |
      Paste into Word. Apply the GSL document template. Save under the filename convention in the Audit Stage. Proceed to audit.
audit_prompt_template:
  prefix: |
    The standard above defines the bar. Now run a quick surface check on this product note as well:

    A. British English throughout. No "organize", "color", "realize", "behavior", "analyze", "center", "favorite", or "program" used for the education programme.
    B. No em-dash character anywhere.
    C. Body length is 350 to 500 words (positioning + why-now + three points).
    D. The note fits on one printed page.
    E. Exactly one CTA, one verb phrase, matching the brief.
    F. Exactly one visual, with a specified caption.

    Return a table with columns: Criterion, Pass or Fail, Evidence, Fix. Include both the bar-comparison findings and the surface checks. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
  fallback: |
    Audit the attached GSL product note against these criteria. For each, return pass or fail, the specific section or line where it passes or fails, and a one-line suggested fix.

    Criteria on structure:

    1. Positioning line is present, one sentence, 25 words or fewer.
    2. "Why it matters now" is present, 60 to 90 words, with at least one specific recent anchor (a date, a policy, a number, a concrete trend).
    3. Exactly three key points, no more, no less.
    4. Every key point has a specific piece of evidence (a data point, a named school, a named student, a pilot result, a quote).
    5. No invented evidence. Every evidence item should be traceable to the brief's evidence list.
    6. Exactly one visual, with a specified type, content, caption, and placement.
    7. Exactly one CTA, one verb phrase, at the bottom of the note.
    8. Total body length (positioning + why-now + three points) is 350 to 500 words.
    9. The note fits on one printed page.

    Criteria on voice:

    10. Voice matches the stated audience (Sales, Marketing, Leadership, Principals, or Parents) consistently, with no drift into generic marketing language.
    11. No corporate boilerplate ("founded in", "leading provider of", "empowering the next generation", or similar).
    12. The positioning line names the specific thing that makes the subject different. A positioning that could be rewritten to describe any EdTech product is a fail.

    Criteria on Indian context and surface:

    13. Indian context in examples (names, cities, scenarios). Varied, not all Mumbai, not all Arjun.
    14. British English throughout.
    15. No em-dash character anywhere.
    16. Currency in Rs, lakh, or crore where relevant, not dollars.

    Criteria on packaging:

    17. Header block includes Title, Author, Date, Audience tag, and one-line purpose.
    18. The three key points are rendered as prose, not as a reference table.
    19. Footer names the author and provides a contact or link for follow-up.

    Return a table with columns: Criterion, Pass or Fail, Evidence, Fix. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
common_pitfalls: |
  - **Positioning that could describe any EdTech product.** "An innovative future-skills programme that empowers students" fits 500 companies. A positioning line names the one specific thing that makes this different. If in doubt, read it and ask "which company wrote this?" If you cannot tell, rewrite.
  - **Three points that are actually one point three ways.** Point 1 is about student outcomes, Point 2 is about "impact on students", Point 3 is about "the learning journey". That is the same point. Each of the three points covers a different substantive claim.
  - **Invented evidence.** Claude will write "X schools saw Y% improvement" when the brief does not support it. Every evidence item comes from the brief's evidence list; if the brief does not have the evidence, the point gets rewritten or dropped.
  - **Voice drift across the five audiences.** A Leadership note with parent voice, a Parent note with sales voice. Lock the audience in Step 1 and re-read for voice in the self-review before audit.
  - **Three CTAs pretending to be one.** "Book a demo, or reply with questions, or visit our page." The reader does none. One verb, one action.
  - **Two visuals or none.** One visual, chosen deliberately to match the evidence shape. A one-pager with no visual reads flat; with two, it reads like a dashboard.
  - **Page two creep.** 600 words, 700 words, a second small visual, a footnote section. The format is one page. Cut to the bone.
  - **Corporate boilerplate in the footer.** "GSL Academics, founded in 2015..." never appears in a product note. The audience already knows who GSL is, and the boilerplate erodes trust.
---
