---
slug: delivery-script
title: Delivery Script Writer
icon: "🎤"
category: Trainer Tools
what_youll_make: A session script a trainer can open the night before and deliver the next day without improvising. Six segments in a fixed shape (opener, hook, concept, guided practice, independent practice, close). Every segment tells the trainer what to SAY, what to ASK, and what to WATCH FOR in student responses. Plus notes for the three things that most often go wrong in a real classroom (early finishers, struggling students, and tech failing).
time_needed: 45 to 75 minutes
difficulty: standard
skills_referenced:
  - pedagogy-foundations
  - brand-voice
related_playbooks:
  - lesson-plan
  - teaching-ppt
  - assessment
status: published
use_when: |
  You have a specific session to script for a trainer (first-time or experienced). A trainer is anyone delivering a GSL session: a classroom teacher, an external facilitator, a GSL programme trainer visiting a school. They need a document they can read through the night before and carry into the room. The goal is not a lesson plan (see Lesson Plan Builder for that); the goal is the actual words a trainer says.

  Use this when: a trainer is delivering a session solo without Ritu or a curriculum lead in the room, a new trainer is running the session for the first time, or an existing session needs a script pass before it is handed to an external partner.

  This is NOT for the teacher-facing slide deck (see the Teaching Material PPT Builder), for a full programme facilitator guide (Phase 2 playbook), or for assessment design (see Assessment Builder).
before_you_start:
  - Programme (STEM/IIT-G, Young Pioneers (Cambridge), VideoGenX, Solevit, Harvard Manage Mentor, Talk & Learn, or CBSE general)
  - Session number and its position in the programme ("Session 3 of 8", or "Standalone")
  - Session duration (usually 45 or 90 minutes)
  - Session learning outcomes (2 to 3 measurable bullets)
  - What students did in the previous session, in one or two lines (so the opener can connect)
  - Trainer experience level (first-time / experienced)
  - Materials the trainer has access to, named specifically (projector, A4 sheets, specific handouts, a demo laptop, chart paper)
  - The Pedagogy Foundations skill, attached or pasted as context
steps:
  - title: Frame the script
    instruction: |
      Open a new Claude conversation (Projects is ideal, with Pedagogy Foundations attached). The script is trainer-facing language, not student-facing content; the tone is different from a lesson plan or a PPT. Lock it before writing.
    tool: Claude, Projects feature is best
    prompt: |
      I am writing a facilitator script for a GSL trainer delivering a session. Here is the brief.

      Programme: [STEM/IIT-G / Young Pioneers / VideoGenX / Solevit / Harvard Manage Mentor / Talk & Learn / CBSE general]
      Session: [e.g. "Session 3 of 8, Building your first chatbot"]
      Duration: [MINUTES] minutes
      Grade: [GRADE]
      Learning outcomes (2 to 3, Bloom's verbs): [LIST]
      What students did last session: [ONE OR TWO LINES]
      Trainer experience: [FIRST-TIME / EXPERIENCED]
      Materials available: [NAMED, e.g. "projector, speakers, 30 A4 sheets, pre-printed chatbot-rule cards, a demo laptop with WiFi"]

      Before you do anything, confirm in one short paragraph that you understand these constraints. Be specific.

      1. British English throughout. No American spellings. No em-dash anywhere.
      2. Indian context in every example the trainer speaks. Names (Priya, Arjun, Fatima, Harpreet, Ravi, Ananya, Kabir). Cities varied (Pune, Kanpur, Bhopal, Kochi, Guwahati, Indore, not always Mumbai). Scenarios (paani-puri stall, Diwali, Chennai WhatsApp group, Goa beach cleanup). Currency in Rs.
      3. The script is TRAINER-FACING. This means the document is written for the trainer to read, carry, and deliver. Every segment has three clearly labelled parts: SAY (the actual words the trainer speaks, in full sentences, not a summary), ASK (one or two specific questions the trainer asks to open discussion), WATCH FOR (one or two observable signals in student responses that tell the trainer whether to move on or pause and reteach).
      4. Session structure follows the GSL six-segment shape: Opener, Hook, Concept, Guided Practice, Independent Practice, Close. For a 45-minute session, time is roughly 5 / 5 / 15 / 10 / 5 / 5. For a 90-minute session, roughly 10 / 10 / 25 / 25 / 15 / 5. Every segment must be present.
      5. Direct instruction (the Concept segment) takes no more than one-third of the session. The bulk of the session is students doing something.
      6. Differentiation appears for three scenarios on every session: early finishers (what the fast students do next), struggling students (what extra scaffolding looks like), and absent prior knowledge (what to do if students did not complete the prior session).
      7. Troubleshooting appears for three failure modes on every session: tech failure (projector, laptop, WiFi fails), timing overrun (concept segment runs long), and disengaged class (students not responding in the Hook segment).
      8. The voice is respectful of the trainer. The trainer is a craftsperson; the script is their preparation, not a replacement for their judgement. Avoid condescending phrases ("remember to be enthusiastic"). Prefer concrete, usable prompts ("if the class is quiet after the hook, ask Priya's question first; her answer usually opens the room").
      9. Topic defaults skew to GSL future-skills (chatbots, robot arms, stop-motion, startup pitches, community problems, sustainable apps, video storytelling, team-project management) unless the programme is CBSE general.
      10. Materials named in the script must appear in the "Materials available" list above. If a segment calls for chart paper but chart paper is not in the list, flag that to me below the confirmation before we go further.

      Once you have confirmed all ten in your own words, stop and wait. Do not start writing the script yet.
    mid_flow_checks:
      - Claude named all ten constraints specifically
      - The materials list covers every physical resource any segment might use
      - Trainer experience level is clear; a first-time trainer needs more verbatim SAY, an experienced trainer can work with shorter prompts
    expected_output: |
      A confirmation paragraph from Claude, numbered 1 through 10. No script yet.
    next_action: |
      Read the confirmation. If Claude's SAY language in the example confirmation reads like a summary rather than actual spoken words ("the trainer introduces the topic"), push back in the same conversation. The whole point of this playbook is that the SAY is usable language.
  - title: Map the session to the six-segment structure
    instruction: |
      Get the segment-by-segment skeleton first, before any scripted language. This catches lecture-heavy sessions and timing mistakes before they hide inside scripted prose.
    tool: Claude, same conversation
    prompt: |
      Map this [MINUTES]-minute session to the GSL six-segment structure. Return a 6-row table:

      | Segment | Minutes | Purpose for THIS session (one line) | Student activity in this segment | Transition to next segment (one line) |

      Segments in order:
      1. Opener (rapport, brief prior-session connection, no content load)
      2. Hook (a question, a stat, a short story, a 60-second activity that makes the student want to know more)
      3. Concept (direct instruction of the core idea, tightly boxed)
      4. Guided Practice (students work through the concept with the trainer's active support)
      5. Independent Practice (students produce something on their own)
      6. Close (consolidation, one-sentence takeaway, preview of the next session, exit ticket)

      Rules:
      - Minutes sum exactly to [MINUTES].
      - Concept is no more than one-third of the total session.
      - Guided + Independent Practice combined is at least 40% of the total session.
      - Opener is never more than 10 minutes, even for a 90-minute session.
      - Close always includes both a takeaway and a next-session preview.

      Below the table, name the specific hook you will use in this session (question, stat, story, or 60-second activity), in one or two lines. And name the specific exit ticket or check-for-understanding format at the Close.

      Do not write scripted language yet. Just the skeleton.
    mid_flow_checks:
      - Minutes sum exactly to the session total, no rounding errors
      - Concept is one-third or less of the session
      - Guided + Independent Practice combined is at least 40% of the session
      - Hook is specific (not "a motivating question"), and exit ticket is specific (not "some kind of check")
    expected_output: |
      A 6-row segment table plus a one-line hook spec and a one-line exit-ticket spec.
    next_action: |
      If Concept runs past one-third, push Claude to trim and shift time to Guided or Independent Practice. If the Hook is vague, push for a specific one tied to the grade and the topic.
  - title: Write the SAY / ASK / WATCH FOR script for every segment
    instruction: |
      The meat. Every segment gets scripted in the three-part trainer-facing shape. Give this step room; this is the longest output.
    tool: Claude, same conversation
    prompt: |
      Now write the facilitator script for every segment in the map from Step 2. For each segment produce:

      - Segment name and minute range.
      - Student-facing purpose in one line (what the student experiences in this segment).

      Then the script itself, with three clearly labelled parts:

      - **SAY:** the words the trainer speaks, in full sentences, not a summary. Write it as if the trainer will read it verbatim (experienced trainers will paraphrase; first-time trainers will speak it word for word). For segments with multiple sub-moments, write SAY for each sub-moment with a short beat marker (e.g. "[beat: wait for answers]"). The SAY language is Grade [GRADE] appropriate, Indian context woven in, warm but not condescending.
      - **ASK:** the one or two specific questions the trainer asks to open discussion or check understanding. Real questions a Grade [GRADE] student can answer. For segments where a question does not apply (e.g. a short opener), write "Not applicable, this segment is trainer-led".
      - **WATCH FOR:** the one or two observable signals the trainer watches for (specific student behaviours, specific wrong answers, specific questions students raise). These are decision signals: they tell the trainer whether to move on, pause and reteach, or pivot to differentiation.

      Additional requirements per segment:

      - In the **Opener**, SAY should include a one-sentence connection back to the previous session.
      - In the **Hook**, SAY is the specific question or story or activity launch the trainer uses. Do not leave it generic.
      - In the **Concept**, SAY includes the core definition AND a non-example ("X is this. X is NOT this common confusion."). The non-example must be a real Grade [GRADE] misconception, not a cute-but-unlikely one.
      - In the **Guided Practice**, WATCH FOR names specific signs of struggle (a student copying a neighbour's work, a student stuck on a single step).
      - In the **Independent Practice**, SAY includes the exact instruction as the student will hear it, and the expected deliverable ("You have 8 minutes. At the end, I want one card with three rules your chatbot must follow.").
      - In the **Close**, SAY includes both a one-sentence takeaway AND a one-sentence preview of the next session. The exit ticket is fully spelled out (the question, the format, whether it is collected or discussed).

      Return as a 6-segment document with each segment in the SAY / ASK / WATCH FOR format. British English. No em-dash. Indian context throughout the SAY language.
    mid_flow_checks:
      - Every segment has SAY in real spoken language, not a summary
      - Concept segment includes the core definition AND a non-example based on a real Grade [GRADE] misconception
      - Guided Practice WATCH FOR names specific struggle signs (not "students are struggling")
      - Close includes both a takeaway and a next-session preview, and the exit ticket is fully spelled out
    expected_output: |
      The full six-segment script, each segment in SAY / ASK / WATCH FOR format, ready for a trainer to read through.
    next_action: |
      Read the script end-to-end. Where SAY drifts into summary prose ("the trainer explains the concept"), push Claude to rewrite as spoken words. Where ASK is vague ("ask the class what they think"), push for a specific question.
  - title: Add differentiation and troubleshooting notes
    instruction: |
      Every real session fails a little. This step adds the notes that tell the trainer what to do when a segment does not land as planned.
    tool: Claude, same conversation
    prompt: |
      Now add differentiation and troubleshooting notes for this session.

      ## Differentiation

      For three specific scenarios, write a short note telling the trainer what to do:

      1. **Early finishers (students who finish Independent Practice with 5+ minutes to spare).** Give them an extension task that is a real next-step challenge, not "more of the same". Name it specifically. Example: "Ask Priya and the other early finishers to try breaking their chatbot with a question it would not handle well, and note down what breaks. They will share with the class during the Close."
      2. **Struggling students (students who cannot keep up with the Guided Practice pace).** Give them a scaffolding move: a simpler worked example, a partner, a narrower slice of the task. Name it.
      3. **Absent prior knowledge (students who did not complete or remember the prior session).** Give the trainer a 90-second catch-up they can deliver during the Opener or the Hook.

      ## Troubleshooting

      For three specific failure modes, write a short note:

      1. **Tech failure (projector, laptop, or WiFi stops working during the session).** The specific backup the trainer runs: a no-slides version of the Concept segment, an analog version of the Independent Practice. Not "use chart paper"; name exactly what the trainer draws or writes.
      2. **Timing overrun (the Concept segment runs longer than planned).** The specific cut: which sub-point in Guided Practice the trainer can drop without breaking the session, and where Close gets compressed.
      3. **Disengaged class (the Hook does not land, the room stays quiet).** The specific pivot: a backup hook, a direct question to a student the trainer knows will answer (named role: "the student who always answers first"), or a hands-raise vote that gets the whole class participating in 30 seconds.

      Keep each note to 3 to 5 lines. Concrete beats long.
    mid_flow_checks:
      - Each differentiation note names a specific extension, scaffolding move, or catch-up (not "give them more practice")
      - Each troubleshooting note names the specific backup the trainer runs (not "improvise")
      - The tech-failure note has a genuine analog plan, not "use the whiteboard" as a single line
    expected_output: |
      Six short notes, three for differentiation and three for troubleshooting.
    next_action: |
      Read the notes through the lens of a first-time trainer. If any note still leaves the trainer guessing (e.g. "use the whiteboard" with no detail), push Claude for the specifics.
  - title: Package the trainer-ready document
    instruction: |
      Claude assembles everything into a single paste-ready document the trainer can print or open on a phone the night before the session.
    tool: Claude, same conversation
    prompt: |
      Now produce the final trainer-ready document. One continuous document, ready to paste into Word. Structure:

      **Cover block**

      - Programme, Session, Grade, Duration
      - Learning outcomes (2 to 3 bullets)
      - What students did last session
      - Materials needed (named specifically, in a checklist)
      - Trainer experience level and a one-line note on how to use this document ("read cover to cover the night before; mark the SAY lines you want to paraphrase; flag any materials you cannot source by tomorrow")

      **Segment-by-segment script** (from Step 3), in order, each segment clearly titled.

      **Differentiation notes** (from Step 4).

      **Troubleshooting notes** (from Step 4).

      **Close-out checklist** (what the trainer does AFTER the session, in 5 bullets):

      - Where to upload the exit-ticket artefacts (OneDrive folder path convention: Acads/studio/outputs/delivery-script/)
      - Who to WhatsApp if a segment flopped
      - What to flag to Ritu if a student struggled visibly
      - When to review this script for the next run
      - One reflection question for the trainer ("what would you change for next time?")

      Format as one continuous document. British English. No em-dash. Indian context throughout.
    mid_flow_checks:
      - Cover block includes programme, session, grade, duration, learning outcomes, materials checklist, and trainer-note line
      - The segment-by-segment script is carried forward cleanly from Step 3, not rewritten or summarised
      - Close-out checklist is 5 actionable items, not generic "reflect on the session"
    expected_output: |
      A complete trainer-ready document, ready to paste into Word.
    next_action: |
      Paste into Word. Apply the GSL document template (headings, GSL colours). Save under the filename convention in the Audit Stage (class-XX_topic-slug_delivery-script_YYYY-MM-DD.docx). Proceed to audit.
audit_prompt_template:
  prefix: |
    The standard above defines the bar. Now run a quick surface check on this delivery script as well:

    A. British English throughout. Flag any "organize", "color", "realize", "behavior", "analyze", "center", "favorite", or "program" used for the education programme.
    B. No em-dash character anywhere.
    C. Every segment has SAY, ASK, and WATCH FOR clearly labelled.
    D. The Concept segment includes a non-example.
    E. Differentiation covers early finishers, struggling students, and absent prior knowledge.
    F. Troubleshooting covers tech failure, timing overrun, and a disengaged class.

    Return a table with columns: Criterion, Pass or Fail, Evidence (the specific segment or section), Fix. Include both the bar-comparison findings and the surface checks. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
  fallback: |
    Audit the attached GSL delivery script against these criteria. For each, return pass or fail, the specific segment or section where it passes or fails, and a one-line suggested fix.

    Criteria referencing the Pedagogy Foundations skill (slug: pedagogy-foundations, which you should have as context; if you do not, say so and stop):

    1. All six segments present (Opener, Hook, Concept, Guided Practice, Independent Practice, Close).
    2. Minutes sum exactly to the stated session duration.
    3. Concept segment is no more than one-third of the session.
    4. Guided Practice + Independent Practice combined is at least 40% of the session.
    5. Concept segment includes a non-example based on a real Grade [GRADE] misconception (not cute-but-unlikely).
    6. Age-appropriate language per the Pedagogy Foundations Age Guidelines for Grade [GRADE].

    Criteria on trainer-facing voice:

    7. Every segment has SAY, ASK, and WATCH FOR clearly labelled.
    8. SAY language is real spoken sentences, not summaries of what the trainer will do.
    9. ASK is specific questions, not "ask the class what they think".
    10. WATCH FOR names observable signals (specific behaviours, specific wrong answers, specific questions), not "see if they get it".

    Criteria on differentiation and troubleshooting:

    11. Differentiation notes cover early finishers, struggling students, and absent prior knowledge. Each names a specific move, not a generic direction.
    12. Troubleshooting notes cover tech failure, timing overrun, and disengaged class. Each names the specific backup the trainer runs.

    Criteria on Indian context and voice:

    13. Indian names, cities, and scenarios in the SAY language. Cities varied, names varied.
    14. British English throughout.
    15. No em-dash.

    Criteria on packaging:

    16. Cover block includes Programme, Session, Grade, Duration, Learning Outcomes, Materials checklist.
    17. Close segment includes both a one-sentence takeaway and a preview of the next session.
    18. Exit ticket is fully spelled out (the question, the format, whether collected or discussed).
    19. Close-out checklist has five actionable items.

    Return a table with columns: Criterion, Pass or Fail, Evidence, Fix. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
common_pitfalls: |
  - **SAY written as summary.** "The trainer introduces the topic of chatbots" is not a script; it is a stage direction. SAY must be real spoken sentences. "Good morning, class. Today we are going to build something you have probably used on your phone without realising. Priya, have you ever asked Siri or Alexa a question they got wrong?"
  - **Vague ASK.** "Ask the class what they think" is not a question. A question has a subject and a specific answerable frame. "If you were designing a chatbot for a paani-puri stall in Kanpur, what is one kind of question it would struggle with?"
  - **Decorative WATCH FOR.** "See if students are getting it" gives the trainer no decision. Name the signal: a student re-asking the same question, three students writing the same wrong answer, a particular hand going up repeatedly.
  - **Missing non-example.** The Concept segment without a non-example is the most common misunderstanding: students memorise the definition without a boundary around it. Every Concept segment includes "X is this. X is NOT this common confusion."
  - **Concept that swallows the session.** If the Concept segment is 25 minutes of a 45-minute session, the trainer is lecturing, not teaching. Cap Concept at one-third.
  - **Differentiation as an afterthought.** "Extension: give them more practice" is not differentiation. Name the specific extension task. Name the specific scaffold. Name the specific catch-up script.
  - **Troubleshooting that is really wishful thinking.** "If tech fails, improvise." The script exists because first-time trainers do not improvise well. Name the specific analog backup the trainer runs.
  - **Generic Indian context.** "An Indian student named Arjun" five times in one script is lazy. Vary names and cities. A Pune rooftop experiment is different from a Kanpur paani-puri stall; use that difference.
  - **Overlong SAY for an experienced trainer.** If the trainer is marked experienced, SAY can be shorter beats with ellipses ("Good morning... brief recap of last session about rule-based systems... pivot to today's new idea"). A first-time trainer gets full sentences; an experienced trainer gets anchors.
---
