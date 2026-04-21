---
slug: teaching-ppt
title: Teaching Material PPT Builder
icon: "🎨"
category: Presentations
what_youll_make: A GSL-branded teaching deck, roughly 12 to 18 slides, that a teacher can open in class and deliver with confidence. Each deck uses Gagné's 9 Events as its shape. Every content slide shows a Bloom's level so students can see how they are learning. Every core concept shows a worked example next to a "not this" non-example. Students turn to a neighbour every 3 to 4 slides. Each session has one fun activity students actually do. And every slide has teacher notes with three parts (SAY, ASK, WATCH FOR).
time_needed: 60 to 90 minutes
difficulty: standard
skills_referenced:
  - pedagogy-foundations
  - brand-voice
  - ppt-patterns
related_playbooks:
  - lesson-plan
  - assessment
  - carousel
  - train-the-trainer-ppt-builder
status: published
use_when: |
  You have a specific topic, a grade, and a session duration in mind, and the teacher needs a deck to teach from. This is the workhorse playbook for classroom decks across all seven GSL programmes.

  Use it for a chatbot module in STEM/IIT-G, a market-validation session in Young Pioneers, a scene-breakdown in VideoGenX, a problem-framing session in Solevit, a team-decision case in Harvard Manage Mentor, a discussion-starter in Talk & Learn, or a CBSE-aligned topic where the deck needs real pedagogical structure rather than plain bullet slides.

  This is NOT for trainer-facing decks (see the Train-the-Trainer PPT Builder playbook, coming in Phase 2), carousels (see the Claude Carousel Generator), sales decks, or product notes.
before_you_start:
  - Topic (e.g. "Building your first chatbot", "Pitching a startup idea", "Storyboarding a 30-second video", "Solving your city's water crisis", "Designing a sustainable app")
  - Grade (e.g. Class 6, Class 9, Class 11)
  - Duration the teacher will spend with this deck (usually 40 or 45 minutes for one session, 80 to 90 for a double period)
  - Programme (STEM/IIT-G, Young Pioneers (Cambridge), VideoGenX, Solevit, Harvard Manage Mentor, Talk & Learn, or CBSE general)
  - Two to four learning outcomes, written with measurable Bloom's verbs (explain, design, justify, compare, build, pitch)
  - What students already know coming in, in one or two lines
  - The Pedagogy Foundations skill, attached to your Claude Project or pasted as context
steps:
  - title: Frame the deck
    instruction: |
      Open a new Claude conversation (Projects is ideal, with Pedagogy Foundations attached). Paste the prompt below, fill in the bracketed variables, and let Claude confirm it understands all ten constraints before it writes a single slide.

      This step is the most important one in the playbook. Every default that slips past Step 1 (American context, lecture-heavy structure, vague Bloom's chips, missing non-examples) gets baked into 15 slides and becomes 15 slides of rework. Catching it here costs 60 seconds.
    tool: Claude, Projects feature is best
    prompt: |
      I am building a teaching material PPT for GSL, an Indian K-12 EdTech that designs future-skills education for children ages 6 to 18. Here is the brief.

      Topic: [TOPIC]
      Grade: [GRADE]
      Duration (teacher-in-class time): [MINUTES] minutes
      Programme: [STEM/IIT-G / Young Pioneers / VideoGenX / Solevit / Harvard Manage Mentor / Talk & Learn / CBSE general]
      Learning outcomes (2 to 4, Bloom's verbs): [LIST]
      Students already know: [WHAT THEY COME IN WITH]

      Before you do anything, confirm in one short paragraph that you understand these constraints. Be specific, name each one. Do not paraphrase loosely.

      1. British English throughout. "Organise", not "organize". "Behaviour", not "behavior". "Programme" (for the education programme), not "program". "Analyse", "centre", "favourite", "colour". No American spellings.
      2. No em-dash character anywhere in the output. Use commas, parentheses, or restructure.
      3. Indian context everywhere. Names varied (Priya, Arjun, Fatima, Harpreet, Ravi, Ananya, Kabir), cities varied (Pune, Kanpur, Bhopal, Kochi, Guwahati, Indore, not always Mumbai), scenarios varied (paani-puri stall, Diwali, Dussehra, Chennai family WhatsApp group, Goa beach cleanup, a Kanpur rooftop experiment). Currency in Rs, with lakh and crore where natural. Never Thanksgiving, never prom, never lemonade stand, never suburbs.
      4. Gagné's 9 Events of Instruction is the structural backbone of the deck. Every content slide maps to one of the nine events: (1) gain attention (hook), (2) inform learners of the objective, (3) stimulate recall of prior learning, (4) present the content, (5) provide learning guidance with worked examples AND non-examples, (6) elicit performance via a practice activity, (7) provide feedback including peer review, (8) assess performance via an exit ticket or mini-quiz, (9) enhance retention via an application to the student's own life AND a preview of the next session.
      5. Every content slide carries a Bloom's cognitive-level chip (Remember, Understand, Apply, Analyse, Evaluate, or Create). The chip is honest: if the slide asks "what is a chatbot", the chip is Remember, not Apply. This chip is visible to students as well as the teacher, so they develop metacognition about their own learning.
      6. For every core concept, a non-example is shown alongside the working example. Format: "X is [the concept]. X is not [a common confusion]." The non-example must name a real confusion a Grade [GRADE] student actually holds, not a cute-but-unlikely one. Example: "A chatbot is a program that holds a conversation using rules. A chatbot is NOT a search engine that says please." Not "A chatbot is not a washing machine."
      7. Every 3 to 4 content slides, a constructive learning prompt is woven in (turn to your neighbour, think-pair-share, compare with a partner, find one thing you disagree about). These are interleaved through the deck, not bunched at the end as a catch-all.
      8. At least one genuinely fun activity per session, landing roughly once every 10 slides. A thing students DO that the class will remember: build a paper chatbot and trade with a partner, role-play a city-council meeting on the water crisis, storyboard one scene of a video with emoji, pitch a 30-second startup to the person next to them. Not a joke, not "watch a video", not generic gamification.
      9. Topic defaults skew to GSL future-skills (building chatbots, first robot arms, stop-motion animation, startup pitches, community-problem solving, sustainable apps, video storytelling, team-project management) unless the programme is CBSE general with a traditional topic.
      10. Every content slide has teacher notes with three clearly labelled parts: SAY (the opening line the teacher actually speaks, one or two sentences of verbatim language), ASK (one real question that opens discussion for this grade), WATCH FOR (one or two signals in student responses the teacher uses to decide whether to move on or pause and reteach).

      Once you have confirmed all ten in your own words, stop and wait for my next message. Do not start the outline yet.
    mid_flow_checks:
      - Claude named all ten constraints in its own words, not a single generic summary sentence
      - Claude spelled out Gagné's 9 Events with the right names and order
      - Pedagogy Foundations is attached to the Claude Project or pasted into the context
    expected_output: |
      A confirmation paragraph from Claude, numbered 1 through 10, each constraint acknowledged specifically. No deck content yet.
    next_action: |
      Read the confirmation. If any constraint is paraphrased too loosely, or Gagné's events are skipped over with "yes I know Gagné", push back in the same conversation before Step 2. A weak Step 1 confirmation predicts a deck that drifts.
  - title: Outline the flow using Gagné's 9 Events
    instruction: |
      Ask Claude for the deck skeleton first, before any slide content. Making the structure visible up front catches lecture-heavy designs and missed events before they are hidden inside 15 slides of prose.
    tool: Claude, same conversation
    prompt: |
      Now produce the deck skeleton. Map slide ranges to Gagné's 9 Events of Instruction. For a [MINUTES]-minute session, aim for 12 to 18 slides total.

      For each event, give me:

      - Event number and name
      - Slide range that carries this event (e.g. "Slides 4 to 6")
      - One-line purpose for this specific topic (what does this event do for [TOPIC] at Grade [GRADE]?)
      - Proposed Bloom's level for the content slides in this event's range

      Rules:
      - All nine events must be present, none skipped, none merged into a single slide.
      - Events 4 and 5 combined (direct instruction and guidance) take no more than half the deck.
      - Events 6 and 7 combined (elicit performance and provide feedback) span at least 3 slides.
      - Event 8 is at minimum one clear check-for-understanding slide, with a specific question prompt or exit ticket.
      - Event 9 includes BOTH an application-to-your-own-life slide AND a preview-of-next-session slide.

      Return as a 9-row table:

      | Event | Name | Slides | One-line purpose for this topic | Bloom's level |

      Below the table, do three more things:

      1. Name the three or four constructive-prompt slides by number, and say what each prompt opens up (e.g. "Slide 7, turn to your neighbour: which of these two chatbot ideas would actually help a Pune traffic officer?").
      2. Name the one fun-activity slide by number with a one-line description of what students do, what they need, how long it takes, and what they produce (e.g. "Slide 12, 10 minutes: students draft five rules for a paani-puri-stall chatbot on an index card, swap with a partner, and test whether the partner's rules handle 'samosa, not puri').
      3. Name the exit-ticket or mini-quiz format for Slide [event 8], one specific question, not "some kind of quiz".

      Do not write slide bodies yet. Just the skeleton.
    mid_flow_checks:
      - All 9 events are listed, slide ranges cover slides 1 through N contiguously with no gaps
      - Events 4 and 5 combined are no more than half the deck
      - Constructive-prompt slides land every 3 to 4 content slides, not bunched at the end
      - One specific fun-activity slide is named with real materials and a real deliverable
    expected_output: |
      A 9-row Gagné table plus three short sections naming the constructive-prompt slides, the fun-activity slide, and the exit-ticket format.
    next_action: |
      Check the math. If events 4 and 5 combined exceed half the slides, push Claude to trim direct instruction and add a real elicit-performance moment. If the fun activity is vague ("some kind of game"), push for a real one.
  - title: Generate the slide content, with Bloom's chips, non-examples, and Indian context
    instruction: |
      Now Claude writes the actual slide content. Every content slide must carry the Bloom's chip, a non-example where a core concept is being taught, an Indian-context hook woven into the body, and teacher notes in the SAY / ASK / WATCH FOR shape. This is the longest step; give it room to breathe.
    tool: Claude, same conversation
    prompt: |
      Now fill in the content for every slide in the skeleton from Step 2. For each slide produce:

      - Slide number and title. Title is sentence case, short, never generic ("Introduction", "Conclusion", "Agenda" are not titles).
      - Gagné event (copy from Step 2).
      - Bloom's chip (one of: Remember, Understand, Apply, Analyse, Evaluate, Create). Honest: if the slide asks "what is X", the chip is Remember, not Apply. If the slide asks students to design a new X, the chip is Create.
      - Body. Maximum 5 bullets or one short paragraph, sized for a Grade [GRADE] reader. One big idea per slide. No slide has more than 40 words of body text.
      - For any slide that teaches a core concept, a non-example on the same slide or the very next slide. Format: "X is [concept]. X is NOT [confusion a real Grade [GRADE] student holds]."
      - Indian-context hook woven into the body of every content slide. A specific Indian name and a specific Indian city and a specific scenario, not "an Indian student". Vary the cities (Pune, Kanpur, Bhopal, Kochi, Guwahati, Indore, Lucknow, Bhubaneswar), not always Mumbai. Vary the names.
      - Constructive prompt, if this slide is one of the constructive-prompt slides from Step 2. Format the prompt as a full sentence the teacher could read aloud. Example: "Turn to the person next to you. In 90 seconds, agree on one way Priya's chatbot would fail if she launched it next Tuesday."
      - Fun activity, if this slide is the activity slide from Step 2. Spell out exactly: what students do, what materials they need (named specifically, not "supplies"), how long it takes, what they produce at the end, and what the teacher collects or grades.
      - Teacher notes, with three clearly labelled parts:
        - SAY: the opening line the teacher speaks when this slide lands, one or two sentences of verbatim spoken language, not a description of what the slide covers.
        - ASK: one real question the teacher asks to open discussion. A question a Grade [GRADE] student can actually answer.
        - WATCH FOR: one or two specific signals in student responses (a question, a facial expression, a wrong answer pattern) the teacher uses to decide whether to move on or pause and reteach.

      Return as a table, one slide per row:

      | # | Title | Event | Bloom's | Body | Non-example | Indian hook | Constructive or Fun | Teacher notes (SAY / ASK / WATCH FOR) |

      Non-negotiable rules, restated:

      - British English throughout.
      - No em-dash character anywhere.
      - No content slide without a Bloom's chip.
      - No core-concept slide without a non-example based on a real misconception.
      - No content slide without an Indian-context hook in the body.
      - No content slide without teacher notes in the SAY / ASK / WATCH FOR shape.
      - Age-appropriate language per the Pedagogy Foundations Age Guidelines for Grade [GRADE].
    mid_flow_checks:
      - Every content slide has a Bloom's chip, and the chip matches the cognitive task on the slide (no "Apply" stuck on a Remember question)
      - Every core-concept slide has a non-example that names a real Grade [GRADE] confusion, not a cute-but-unlikely one
      - Indian names and cities vary across the deck; no single name or city appears on more than three slides
      - Teacher notes on every slide have SAY / ASK / WATCH FOR clearly labelled, not blended into one paragraph
    expected_output: |
      A full deck-content table, 12 to 18 rows, one row per slide, every column filled.
    next_action: |
      Scan the Bloom's column. If more than 60% of the chips are Remember or Understand, the deck skews shallow for the grade; push Claude to lift two or three slides up to Apply or Analyse. Scan the non-example column: if any core-concept slide is missing one, or the non-example is cute-but-unreal, push Claude to rewrite with a confusion the teacher would actually see in the classroom.
  - title: Brief the visuals
    instruction: |
      Now turn each slide's implied visual into a Midjourney prompt, or a designer brief for slides that need a chart, diagram, or flowchart instead of an illustration.
    tool: Claude, same conversation; Midjourney separately for illustrations
    prompt: |
      For each slide from Step 3 that needs a custom illustration (not a chart, not a diagram, not a screenshot), generate a Midjourney v6 prompt.

      Style anchors (apply to every prompt):

      - Clean, editorial illustration. Not photorealistic.
      - Soft colour palette that works alongside GSL Turquoise Sea (#00D8B9), Azure Blue (#073393), and Orange Peel (#FFAD40). Avoid pure red, avoid muddy olive, avoid anything that clashes with the GSL duo.
      - Characters reflect Indian school students at Grade [GRADE]. Varied skin tones, varied hair, varied outfits (uniform or home clothes depending on scene). Age-appropriate proportions. No photorealistic faces of real people. No copyrighted characters or trademarked brands.
      - Aspect ratio 16:9 for standard content slides.
      - Aspect ratio 1:1 for the hook slide or any poster-style slides.
      - No text inside the image. Text lives in PowerPoint, not the illustration.

      For slides that need a chart, a diagram, or a flowchart rather than an illustration, skip Midjourney. Write a designer brief in one line: shape, data points or flow steps, target tool (PowerPoint SmartArt, native chart, a Figma stub a designer picks up).

      Return as a numbered list, one entry per slide that needs a visual:

      1. Slide [N], [illustration / chart / diagram]: [full Midjourney prompt OR one-line designer brief]
      2. ...

      Group Midjourney prompts and designer briefs separately at the end if that reads cleaner.
    mid_flow_checks:
      - Every slide that needs a visual has an entry in the list, either a Midjourney prompt or a designer brief
      - Characters in illustration prompts are described as Indian students with varied appearances, not "students" generically
      - Chart and diagram briefs name specific data points or flow steps, not "add a chart"
    expected_output: |
      A numbered list of Midjourney prompts and designer briefs, one per slide that needs a visual. Usually 8 to 14 entries for a 15-slide deck.
    next_action: |
      Generate the Midjourney images one prompt at a time. Pick the best variation, upscale, download. Save the files into one folder named after the deck, as slide-01.png, slide-02.png, etc. For charts and diagrams, plan to build them natively in PowerPoint in Step 5.
  - title: Package the deck spec, then assemble in PowerPoint
    instruction: |
      First, have Claude produce a single paste-ready deck specification document: everything from Steps 3 and 4, laid out slide by slide, so you can open PowerPoint and build without flipping between tabs. Then open the GSL Teaching Material Template v2 and assemble the deck.
    tool: Claude, same conversation (for the spec); PowerPoint (for the assembly)
    prompt: |
      Now produce the final deck specification document, ready for me to open PowerPoint and build slide by slide. For each slide in order, produce this block:

      ---

      **Slide [N]: [Title]**

      Gagné event: [event number and name]
      Bloom's: [chip]

      Body:
      - [bullet 1]
      - [bullet 2]
      - [up to 5 bullets, or one short paragraph]

      Not this: [non-example, if the slide teaches a core concept]

      Indian context: [the name, city, scenario woven into the body]

      Constructive prompt (if this slide has one): [the full prompt as the teacher reads it]

      Fun activity (if this slide is the activity): [what students do, materials named, time, deliverable]

      Visual: [Midjourney prompt N / Chart: ... / Diagram: ... / None]

      Teacher notes:
      - SAY: [verbatim opening line]
      - ASK: [the question]
      - WATCH FOR: [signals the teacher uses to decide]

      ---

      At the top of the document, a cover block:

      - Topic, Grade, Programme, Duration
      - The 2 to 4 learning outcomes from the brief
      - Total slide count and the Gagné event distribution in one line

      At the bottom, a "Materials and prep" one-pager:

      - Physical materials students need (named specifically: "A4 sheets, markers, a pair of scissors per pair of students"; never "supplies" or "handouts")
      - Technology the teacher needs (projector, speakers, one demo laptop, WiFi if needed)
      - Prior-day prep the teacher should do (print X copies of Y, load Z video on the demo laptop, preview the exit ticket)

      Format as one continuous document I can scroll through. Keep the three-hyphen separators between slides so they are easy to spot. British English. No em-dash. Indian context woven in, not bolted on.

      Once you have produced the spec, I will copy it into PowerPoint myself. Do not produce a second pass; one clean spec is what I need.
    mid_flow_checks:
      - Cover block lists Topic, Grade, Programme, Duration, all learning outcomes, and the Gagné distribution
      - Every slide block has SAY / ASK / WATCH FOR labelled, not blended
      - Materials list names specific items (A4 sheets, markers, an index card per student), not generic "supplies" or "handout"
    expected_output: |
      A paste-ready deck spec, one continuous document. Scroll through once end-to-end before opening PowerPoint.
    next_action: |
      Open the GSL Teaching Material Template v2 ("Drive > Academics > Templates > GSL Teaching Material Template v2.pptx"). It ships with the GSL palette, logo placement, Fraunces headings, Inter body, and title / section-divider / content / closing layouts. Copy each slide block from the spec into the matching layout. Titles in sentence case (not Title Case). Body text never smaller than 18pt. Maximum 5 bullets per slide. Bloom's chip in the top-right annotation. Non-example below the main body with a small "Not this" label. Teacher notes in the PowerPoint Notes pane with SAY / ASK / WATCH FOR as separate lines. Drop the Midjourney images in from Step 4. Build charts and diagrams natively (SmartArt or Insert Chart).
  - title: Review the deck against the quality rules
    instruction: |
      Before the audit stage, run a structured self-check. This catches the obvious slips (a Bloom's chip that drifted to "Apply" on a recall slide, a non-example that is cute but not a real misconception, an Indian context that has defaulted to Mumbai five times). Fix what the review flags, then move to the Audit Stage.
    tool: Claude, same conversation
    prompt: |
      Review the deck spec you just produced against the ten rules from Step 1. For each rule, return pass or fail, name the specific slide numbers where it fails, and give a one-line fix.

      1. British English throughout. Flag any "organize", "color", "realize", "behavior", "analyze", "center", "favorite", or "program" used for the education programme.
      2. No em-dash character anywhere.
      3. Indian context on every content slide, varied cities and names. Flag any content slide missing a hook, or any name / city that has been reused three or more times.
      4. Gagné's 9 Events all present and mapped. Flag any event that is skipped, merged, or given fewer slides than Step 2 promised.
      5. Bloom's chip on every content slide, and each chip is honest. Flag any slide where the chip is "Apply" but the task is Remember, or vice versa.
      6. Non-example on every core-concept slide, based on a real Grade [GRADE] misconception. Flag any core-concept slide missing a non-example, or any non-example that is cute rather than realistic.
      7. Constructive prompts every 3 to 4 content slides, interleaved not bunched. Flag any 5-slide stretch without one.
      8. At least one fun activity per session. Flag if missing or if the activity is passive ("watch a video", "listen to the teacher").
      9. Topic stays within GSL future-skills unless the brief was CBSE general. Flag any drift into traditional curriculum content the brief did not ask for.
      10. Teacher notes on every content slide, with SAY / ASK / WATCH FOR clearly labelled. Flag any slide where the notes are blended prose or where WATCH FOR is missing.

      Return a 10-row table:

      | # | Rule | Pass or Fail | Slides where it fails | One-line fix |

      Then one short paragraph: what is the single most-valuable fix the writer should make before running the Audit Stage? Pick the fix that would move the deck the furthest toward classroom-ready.
    mid_flow_checks:
      - All ten rules are checked, including the ones that pass (so no rule is silently skipped)
      - Failure rows name specific slide numbers, not vague phrases like "some slides"
      - The closing paragraph names one specific top fix, not a generic "review everything"
    expected_output: |
      A 10-row self-review table plus a one-paragraph top-fix recommendation.
    next_action: |
      Fix what the self-review flagged. Update the spec document (and the PowerPoint if you have already started assembling) with the fixes. When the self-review returns clean, or only with fixes you have consciously chosen not to make, proceed to the Audit Stage.
audit_prompt_template:
  prefix: |
    The standard above defines the bar. Now run a quick surface check on this teaching deck as well:

    A. British English throughout. Flag any occurrence of "organize", "color", "realize", "behavior", "analyze", "center", "favorite", or "program" used for the education programme.
    B. No em-dash character anywhere in the deck.
    C. Title slide has Topic, Grade, Programme, and Date.
    D. Closing slide has BOTH an application-to-your-life section AND a preview of the next session (Gagné event 9).
    E. Every content slide shows a Bloom's cognitive-level chip in the top-right annotation.
    F. Every core-concept slide has a non-example on the same slide or the very next slide.

    Return a table with columns: Criterion, Pass or Fail, Evidence (the specific slide number or section), Fix. Include both the bar-comparison findings and the surface checks. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
  fallback: |
    Audit the attached GSL teaching deck against these criteria. For each, return pass or fail, the specific slide number or section where it passes or fails, and a one-line suggested fix.

    Criteria referencing the Pedagogy Foundations skill (slug: pedagogy-foundations, which you should have as context; if you do not, say so and stop):

    1. All nine of Gagné's Events of Instruction are present and mapped to slide ranges.
    2. Events 4 and 5 combined (direct instruction plus guidance) are no more than half of the total slides.
    3. Events 6 and 7 combined (elicit performance plus feedback) span at least 3 slides.
    4. Event 8 (assess performance) has at least one clear check-for-understanding slide with a specific question or exit ticket.
    5. Event 9 (enhance retention) includes BOTH an application-to-your-life slide AND a preview-of-next-session slide.
    6. Every content slide shows a Bloom's chip in the top-right annotation, and each chip honestly reflects the cognitive task on that slide (a recall question is Remember, a design task is Create).
    7. For every core concept, a non-example is shown on the same slide or the very next slide, and the non-example names a real Grade [GRADE] student misconception (not a cute-but-unlikely confusion).
    8. Age-appropriate language per the Pedagogy Foundations Age Guidelines for the stated grade.

    Criteria on Indian context and GSL voice:

    9. Indian names, cities, and scenarios in the body of every content slide. Cities vary across the deck (not always Mumbai). Names vary (no single name used more than three times).
    10. British English throughout. Flag any occurrence of "organize", "color", "realize", "behavior", "analyze", "center", "favorite", or "program" used for the education programme.
    11. No em-dash character anywhere.

    Criteria on pedagogical texture:

    12. Constructive learning prompts (turn-to-your-neighbour, think-pair-share, compare-with-a-partner) land every 3 to 4 content slides, interleaved through the deck, not bunched at the end.
    13. At least one fun activity per session (roughly once per 10 slides). Something students actually DO, not "watch a video" or "listen". The activity names specific materials, a specific time, and a specific deliverable.
    14. Teacher notes on every content slide in the SAY / ASK / WATCH FOR shape. WATCH FOR specifies a signal the teacher uses to decide whether to move on or reteach; it is not a restatement of the slide topic.
    15. Topic and examples skew to GSL future-skills (chatbots, robotic arms, stop-motion, startup pitches, community-problem solving, sustainable apps, video storytelling, team-project management) unless the brief called for a CBSE general topic.

    Surface conventions (inlined here until the Brand Voice and PPT Patterns skills have full bodies in week 3):

    16. Title slide has Topic, Grade, Programme, and Date.
    17. Closing slide has both a recap and two or three discussion questions.
    18. No slide has more than 5 bullets or more than 40 words of body text.
    19. Every visual is custom (Midjourney, GSL asset library, native PowerPoint chart or diagram) or cited (external source attribution below the image).
    20. Titles are in sentence case, not Title Case.

    Return a table with columns: Criterion, Pass or Fail, Evidence, Fix. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
common_pitfalls: |
  - **Lecture-heavy decks.** If events 4 and 5 swallow more than half the slides, the teacher is talking AT the class, not teaching them. Rebalance by converting one explanatory slide into an elicit-performance slide where students produce something short.
  - **Cosmetic Bloom's chips.** A chip says "Apply" but the slide asks "what is a chatbot" (that is Remember). The chip is the metacognition surface for the student; if it lies, students learn to ignore it. Worse than not having one.
  - **Non-examples as jokes.** "A chatbot is not a washing machine" is cute but useless because no Grade 6 student thinks a chatbot is a washing machine. A non-example must name a real confusion: "A chatbot is not a search engine that says please before the answer."
  - **Indian defaults on autopilot.** Claude reaches for Mumbai and Arjun every time unless redirected. Vary cities (Pune, Kanpur, Bhopal, Kochi, Guwahati, Indore, Lucknow, Bhubaneswar) and vary names (Priya, Fatima, Harpreet, Ravi, Ananya, Kabir). Too much Mumbai starts to feel like a stock photo of India rather than actual India.
  - **Constructive prompts bunched at the end.** If every "turn to your neighbour" moment is in the last five slides, the prompts are a rescue attempt, not a rhythm. Interleave them every 3 to 4 content slides.
  - **Fun activity as decoration.** "Watch this 2-minute clip" is not a fun activity; it is content delivery. The class has to DO something the teacher will remember watching them do. Paper-chatbot trade, 30-second startup pitch, emoji storyboard, five-rule stall game.
  - **Teacher notes as summaries.** If the notes say "this slide is about chatbots", the teacher still has to improvise. SAY gives them an actual opening line. ASK gives them a real question. WATCH FOR gives them a decision signal. Summary-style notes are the single most common failure mode.
  - **Traditional curriculum drift.** Claude defaults to photosynthesis, the Industrial Revolution, fractions, and the water cycle unless the brief is CBSE general. If the programme is STEM/IIT-G or Young Pioneers or VideoGenX or any future-skills programme, the topic should feel native to that programme, not like a textbook chapter borrowed from an NCERT module.
---
