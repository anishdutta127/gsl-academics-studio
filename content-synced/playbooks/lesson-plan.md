---
slug: lesson-plan
title: Lesson Plan Builder
icon: "📚"
category: Content Creation
what_youll_make: A minute-by-minute lesson plan structured around Gagné's 9 Events of Instruction, ready for any facilitator to pick up and deliver.
time_needed: 30 to 60 minutes
difficulty: gentle
skills_referenced:
  - pedagogy-foundations
  - brand-voice
related_playbooks:
  - assessment
status: published
use_when: |
  You have a specific session to plan. One session, one grade, one topic, known duration (usually 40 or 90 minutes). You need a plan detailed enough that another teacher could walk in and deliver it.

  This is not for whole-course planning (that is the Course Builder in Phase 2) and not for assessments (see the Assessment Builder).
before_you_start:
  - Topic you are teaching (e.g. "Photosynthesis", "Fractions and Decimals")
  - Grade (e.g. Class 6)
  - Duration (40 minutes, 45 minutes, 90 minutes)
  - Programme context (STEAM, Cambridge Young Pioneers, Harvard HBPE, IITG AI, or general CBSE)
  - Prior knowledge the students are expected to have
  - The Pedagogy Foundations skill, either attached to your Claude Project or pasted as context
steps:
  - title: Frame the lesson
    instruction: |
      Open a new Claude conversation (Projects is ideal, with Pedagogy Foundations attached). Paste the prompt below, fill in the bracketed variables, and let Claude confirm it understands the constraints before it writes anything.

      This step exists to catch defaults (American context, em-dashes, lecture-heavy structure) before they get baked into the output.
    tool: Claude, Projects feature is best
    prompt: |
      I am planning a lesson for GSL, an Indian K-12 EdTech. Here is the brief.

      Topic: [TOPIC]
      Grade: [GRADE]
      Duration: [DURATION] minutes
      Programme: [STEAM / Cambridge YP / Harvard HBPE / IITG AI / general CBSE]
      Prior knowledge: [WHAT STUDENTS ARE EXPECTED TO ALREADY KNOW]

      Before you do anything, confirm in one short paragraph that you understand these constraints:
      - British English throughout. No American spellings.
      - No em-dash anywhere.
      - Indian names, cities, and contexts (Priya, Arjun, Kanpur, paani-puri stall, Diwali). Not John, Jane, New York, prom.
      - NEP 2020 and NCF 2023 principles (see the Pedagogy Foundations skill).
      - Session structure follows Gagné's 9 Events of Instruction.
      - Age-appropriate language and cognitive load for [GRADE].

      Once you have confirmed, stop and wait for my next message. Do not write the lesson plan yet.
    mid_flow_checks:
      - Claude confirmed British English, Indian context, and no em-dash in writing
      - Claude named Gagné's 9 Events as the session structure
      - Pedagogy Foundations is attached to the Project or pasted into the context
    expected_output: |
      A short confirmation paragraph from Claude listing the constraints it will follow. No lesson content yet.
    next_action: |
      Read the confirmation. If anything is missing or reinterpreted loosely, correct it in the same conversation before moving on. Otherwise, proceed to Step 2.
  - title: Outline the flow using Gagné's 9 Events
    instruction: |
      Ask Claude for the session skeleton first, before any prose content. Making the structure visible up front catches lecture-heavy designs and timing mistakes before they are hidden inside paragraphs.
    tool: Claude, same conversation
    prompt: |
      Now produce the session outline using Gagné's 9 Events of Instruction. Map events 1 through 9 to minute ranges that sum to [DURATION] minutes exactly. For each event, give me:

      - Event number and name
      - Minutes allocated (start-end)
      - One-line purpose for this specific topic

      Rules:
      - The nine events must all be present.
      - Direct instruction (events 4 and 5) together take no more than 15 minutes.
      - Events 6 and 7 (elicit performance, provide feedback) together take at least 10 minutes.
      - Do not write the body yet. Just the skeleton.
    mid_flow_checks:
      - Minutes sum exactly to the total session duration
      - All nine events are listed, none skipped or merged
      - Direct instruction (events 4 and 5 combined) is no more than 15 minutes
    expected_output: |
      A numbered outline, event-by-event, with minute ranges and one-line purpose for each. Roughly 9 lines.
    next_action: |
      Check that minutes add up. If the skeleton is lecture-heavy or skips events 6-7, push Claude in the same conversation to rebalance before you move on.
  - title: Write the body
    instruction: |
      Now fill in what actually happens in the room. Ask Claude for each event's teacher moves, student moves, and materials.
    tool: Claude, same conversation
    prompt: |
      Now fill in the body of the lesson. For each event in your outline, produce:

      - What the teacher does (1 to 2 sentences)
      - What the teacher says (verbatim lines where that helps a new facilitator; 2 to 3 lines of actual spoken text per event where a script helps)
      - What students do (active verb: "solve", "build", "discuss", "present")
      - Materials needed for this event (specific, not "handout")

      Age-appropriate language per Pedagogy Foundations for Grade [GRADE].

      At least two events must include an Indian-context example (Indian name, Indian city or setting, Indian scenario). Keep this real: not forced, not touristy.

      Return as a table with columns: Event | Minutes | Teacher does | Teacher says | Students do | Materials.
    mid_flow_checks:
      - At least two events reference an Indian name, place, or scenario
      - Students do something active (not just listen) in events 1, 3, 6, and 9
      - Every material is specific (a named handout, a named tool, a named visual)
    expected_output: |
      A 9-row table with every event filled in, plus a short paragraph of materials summary at the bottom.
    next_action: |
      Scan the "Students do" column. If it reads "listen" for more than three events, the plan is lecture-heavy. Push Claude to redesign those events as active.
  - title: Design the practice and the formative check
    instruction: |
      Events 6 and 8 in Gagné's are where learning actually happens and where you find out if it landed. Give these more design time than the content delivery.
    tool: Claude, same conversation
    prompt: |
      Zoom in on events 6 and 8.

      For event 6 (Elicit Performance), design the student practice activity in detail:
      - What students are asked to do, in one sentence
      - Exact instructions as the student will read them (write for a Grade [GRADE] reader)
      - Materials needed, named specifically
      - Expected time
      - Differentiation notes: one line for what advanced finishers do next, one line for what struggling students get extra

      For event 8 (Assess Performance), design the formative check:
      - A quick check that takes under 3 minutes
      - What the teacher is watching or collecting
      - The signal the teacher uses to decide whether to move on or reteach

      Keep both student-facing and teacher-facing language distinct. Students read student-facing. Teacher reads teacher-facing.
    mid_flow_checks:
      - Materials are specific (named handouts, named tools), not generic
      - Differentiation covers both advanced and struggling students
      - Formative check takes under 3 minutes and gives the teacher a clear decision signal
    expected_output: |
      A detailed spec for event 6 (the practice activity) and event 8 (the formative check), each ready to paste into the teacher's deliverable.
    next_action: |
      Read the differentiation notes. If they only cover "slow finishers can do extra practice", push Claude to design a real extension task for advanced learners.
  - title: Package and hand off
    instruction: |
      Final step: ask Claude to assemble the outline, the body, and the practice into a document a new facilitator could pick up and deliver.
    tool: Claude, same conversation
    prompt: |
      Now produce the final packaged lesson plan as a Word-ready document. Include:

      1. Title block at the top: Topic, Grade, Duration, Date.
      2. Learning outcomes (2 to 4 bullets, measurable verbs per Bloom's).
      3. Materials checklist (everything from the body table, plus anything for the practice).
      4. Gagné table (Time | Event | What happens | Teacher | Students | Materials).
      5. Student-facing activity sheet (event 6, instructions as students read them).
      6. Teacher notes: three likely student questions with answers, one common misconception to watch for.
      7. Emergency backup activity (what the teacher does if tech fails or the activity finishes early).
      8. "If you are facilitating this for the first time" note, 2 to 3 sentences.

      Format as one continuous document I can paste into Word. British English. No em-dash. Indian names in any example or question.
    mid_flow_checks:
      - Title block has Topic, Grade, Duration, and Date
      - Three likely student questions are listed with answers
      - Emergency backup activity is included
    expected_output: |
      A complete lesson plan document, ready to copy into Word, named something like "Photosynthesis, Class 6, 40-minute lesson.docx" once you save it.
    next_action: |
      Paste into Word. Apply the GSL document template (headings, GSL colours). Save under the naming convention in the Audit Stage below. Proceed to audit.
audit_prompt_template: |
  Audit the attached GSL lesson plan against these criteria. For each, return pass or fail, the specific line or section where it passes or fails, and a one-line suggested fix.

  Criteria that reference the Pedagogy Foundations skill (slug: pedagogy-foundations, which you should have as context; if you do not, say so and stop):

  1. All nine of Gagné's events are present and timed.
  2. Minutes in the event table sum to the stated session duration.
  3. Direct instruction (events 4 and 5 combined) is 15 minutes or fewer.
  4. Students are active (not just listening) in at least four events.
  5. Differentiation covers both advanced learners and struggling learners.
  6. Age-appropriate language per the Pedagogy Foundations Age Guidelines for the stated grade.
  7. At least two events use an Indian-context example (Indian name, place, scenario).

  Surface conventions (inlined here until the Brand Voice and PPT Patterns skills have full bodies in week 3):

  8. British English throughout. Flag any occurrence of "organize", "color", "realize", "behavior", "analyze", "center", "favorite".
  9. No em-dash character anywhere in the document.
  10. Materials list is specific (named handouts, named tools), not generic like "worksheet" alone.
  11. Title block at the top includes Topic, Grade, Duration, and Date.
  12. Three likely student questions are listed with answers.
  13. Emergency backup activity is included.

  Return a table with columns: Criterion, Pass or Fail, Evidence, Fix. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
common_pitfalls: |
  - **Lecture-heavy lessons.** If a 40-minute lesson plan has the teacher talking for 40 minutes, it is wrong. Maximum 15 minutes of direct instruction. The rest is activity, discussion, practice.
  - **Vague materials.** "Handout" and "worksheet" are not materials. "A4 sheet with four word problems about sharing mangoes at a family function" is a material.
  - **Differentiation only for slow finishers.** Advanced learners need real extensions, not busywork.
  - **American defaults slipping through.** Claude defaults to John, New York, and prom if you do not redirect. Redirect in Step 1 before content, not in Step 5 after.
---
