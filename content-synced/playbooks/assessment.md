---
slug: assessment
title: Assessment Builder
icon: "📝"
category: Assessment
what_youll_make: A tagged question bank, a rubric, or both, aligned to Bloom's taxonomy with grade-appropriate distribution, plausible distractors, and a usable marking scheme.
time_needed: 30 to 60 minutes
difficulty: gentle
skills_referenced:
  - pedagogy-foundations
  - brand-voice
related_playbooks:
  - lesson-plan
status: published
use_when: |
  You need to assess what students have learned. You have a subject and unit in mind, a grade, and you know whether you are producing:
  - a question bank (a set of 20 to 50 tagged questions a teacher can draw from for tests and quick checks),
  - a rubric (a structured evaluation grid for a project, presentation, or open-ended piece of work), or
  - both, if the output is a full assessment with objective items and an open-ended section.

  This is not for live quiz design (that is a Phase 2 playbook). This is for assembled assessment artefacts you ship to the teacher.
before_you_start:
  - Subject and unit or topic
  - Grade (e.g. Class 6)
  - Which output you want (question bank, rubric, or both)
  - Board alignment (CBSE, ICSE, state, or programme-internal)
  - Roughly how long the assessment should take students
  - The Pedagogy Foundations skill, attached or pasted as context
steps:
  - title: Frame the assessment and choose the mode
    instruction: |
      Step 1 sets the mode. Everything downstream depends on it. If you pick "both", the steps still run in order; question bank first, rubric second.
    tool: Claude, Projects feature is best
    prompt: |
      I am building an assessment for GSL, an Indian K-12 EdTech. Here is the brief.

      Subject: [SUBJECT]
      Unit or topic: [TOPIC]
      Grade: [GRADE]
      Mode: [QUESTION BANK / RUBRIC / BOTH]
      Board alignment: [CBSE / ICSE / STATE / PROGRAMME-INTERNAL]
      Expected student time to complete: [MINUTES or RANGE]
      Question count (if question bank): [NUMBER, usually 20 to 50]

      Confirm in one short paragraph that you understand:
      - British English throughout. No American spellings.
      - No em-dash anywhere.
      - Indian names, cities, and contexts in every example and scenario.
      - Bloom's taxonomy distribution per the Pedagogy Foundations grade guidelines.
      - For multiple-choice questions, distractors must be plausible, based on common misconceptions, similar in length and structure to the correct option, and mutually exclusive.

      Then stop and wait for my next message. Do not write questions yet.
    mid_flow_checks:
      - Claude has the Pedagogy Foundations skill in context
      - Claude confirmed British English, Indian context, and no em-dash
      - Mode is clear (question bank, rubric, or both)
    expected_output: |
      A short confirmation paragraph from Claude. No assessment content yet.
    next_action: |
      If Claude missed any constraint, correct it here before moving on. Otherwise proceed to Step 2.
  - title: Set the Bloom's distribution
    instruction: |
      Make the cognitive distribution explicit before any question is written. If the distribution is wrong, the whole bank reflects the wrong difficulty profile.

      Skip this step if you are only building a rubric. Go to Step 4.
    tool: Claude, same conversation
    prompt: |
      Based on the grade (Grade [GRADE]) and the Pedagogy Foundations Bloom's grade-calibrated section, propose the Bloom's distribution for this assessment as a table:

      | Level | Percentage | Question count (of [N]) |
      | Remember | | |
      | Understand | | |
      | Apply | | |
      | Analyse | | |
      | Evaluate | | |
      | Create | | |

      Use the Pedagogy Foundations recommended distribution as the starting point, then adjust up or down within ±10% if the subject or topic calls for it (e.g. Social Studies can skew higher on Analyse than Mathematics at the same grade). Explain any deviation in one line below the table.

      Do not write questions yet.
    mid_flow_checks:
      - Percentages sum to 100
      - Distribution matches the grade-calibrated guideline within ±10% per level
      - Any deviation is explained in one line
    expected_output: |
      A 6-row table with level, percentage, and question count, plus a short deviation note if any.
    next_action: |
      If the numbers do not add up or skew wrong for the grade, push back in the same conversation. Otherwise proceed to Step 3.
  - title: Draft the questions
    instruction: |
      Now Claude writes the actual questions. Ask for a mix of question types that matches the Bloom's distribution.

      Skip this step if you are only building a rubric.
    tool: Claude, same conversation
    prompt: |
      Write [N] questions that match the Bloom's distribution from Step 2. For each question provide:

      - Question number
      - Bloom's level
      - Question type (MCQ, short answer, match, fill-blank, scenario, extended response)
      - Marks
      - The question text, written for a Grade [GRADE] reader
      - Expected length of student answer (for open-ended: "in 2 to 3 sentences", "in one paragraph", etc.)

      Rules:
      - Every question has exactly one defensible answer (or, for open-ended, a clear rubric-able dimension).
      - No ambiguous questions, no double-barrelled questions.
      - Indian names, cities, scenarios in every example.
      - Language age-appropriate per Pedagogy Foundations for Grade [GRADE].
      - Do not write answers yet. Do not write distractors for MCQs yet. Those come next.
    mid_flow_checks:
      - Indian names and contexts appear in at least 60% of the scenario-based questions
      - Question types are mixed (not all MCQ)
      - Expected answer length is specified for every open-ended question
    expected_output: |
      A numbered list of [N] questions with Bloom's level, type, marks, and expected length annotated.
    next_action: |
      Scan for ambiguity or double-barrelled questions ("what is X and why does Y happen?"). Flag any to Claude to rewrite in the same conversation before moving on.
  - title: Write distractors, answers, and marking scheme
    instruction: |
      Now Claude produces answers and, for MCQs, distractors. This step is where most assessments quietly fail: distractors that are obviously wrong waste the item.

      If you are only building a rubric, this step writes the rubric instead.
    tool: Claude, same conversation
    prompt: |
      [For question-bank mode] Produce for every question from Step 3:

      - Correct answer (for MCQ, one of four options; for others, the exact text or key points).
      - For MCQ, three distractors. Each distractor must be:
        - plausible (based on a common misconception a Grade [GRADE] student actually makes)
        - similar in length and structure to the correct option
        - mutually exclusive (only one correct answer)
        - not "all of the above" or "none of the above"
      - Marking scheme for non-MCQ questions (what gets full marks, what gets partial, common errors that lose marks).
      - "Common misconception" flag for each question, in one line, so the teacher knows what confusion the item is testing.

      [For rubric mode or both] Produce a 4-point rubric with 4 to 6 criteria. For each criterion:

      - Criterion name, aligned to the stated learning outcomes
      - Weight (percentages summing to 100)
      - Descriptors for Exemplary (4), Proficient (3), Developing (2), Beginning (1), each specific and observable (not "good", "average", "poor")
      - One line of inter-rater reliability guidance: what to do when two markers disagree

      Return a holistic grade conversion (total points to letter grade or percentage band) at the end.
    mid_flow_checks:
      - Every MCQ distractor is tied to a named common misconception, not random
      - Rubric descriptors are observable and specific, not "good / average / poor"
      - Criteria weights sum to 100
    expected_output: |
      For question-bank mode, the full question bank with answers, distractors, marking scheme, and misconception notes. For rubric mode, a complete rubric with descriptors and grade conversion. For both, both artefacts one after the other.
    next_action: |
      Review distractors. If any distractor is obviously wrong ("The Sun is made of cheese"), ask Claude to rewrite it based on an actual misconception students hold at this grade.
  - title: Package for the teacher
    instruction: |
      Final step: the question bank or rubric gets bundled with a cover page and answer key so a teacher can pick it up and use it immediately.
    tool: Claude, same conversation
    prompt: |
      Now assemble the final deliverable. Produce:

      1. Cover page: Subject, Unit, Grade, Expected time, Total marks, Date.
      2. Bloom's distribution summary table (if question bank).
      3. Questions (if question bank) numbered clearly, with marks marked at the right.
      4. Answer key (if question bank) on a separate section so the teacher can print student sheets without it.
      5. Rubric (if rubric mode) as a printable grid.
      6. Marking scheme or rubric descriptors in full.
      7. "Before you give this to students" teacher notes: 3 common misconceptions to watch for, how to handle early finishers, how to handle students who struggle mid-assessment.

      Format as one continuous document I can paste into Word or a spreadsheet. British English. No em-dash. Indian names in any scenario-based question.
    mid_flow_checks:
      - Cover page has Subject, Unit, Grade, Time, Total marks, Date
      - Answer key is on its own section, not mixed into the question pages
      - Teacher notes list at least 3 misconceptions to watch for
    expected_output: |
      A complete assessment document, ready to paste into Word or Excel (for question banks) or Word (for rubrics).
    next_action: |
      Paste into the right tool. Save under the naming convention in the Audit Stage. Proceed to audit.
audit_prompt_template:
  prefix: |
    The standard above defines the bar. Now run a quick surface check on this assessment as well:

    A. British English throughout. Flag any occurrence of "organize", "color", "realize", "behavior", "analyze", "center", "favorite".
    B. No em-dash character anywhere in the document.
    C. Cover page includes Subject, Unit, Grade, Time, Total marks, and Date.
    D. Answer key is on its own section for question-bank assessments.
    E. No double-barrelled questions (asking two things at once).
    F. No "all of the above" or "none of the above" MCQ options except where justified.

    Return a table with columns: Criterion, Pass or Fail, Evidence (the specific question or section), Fix. Include both the bar-comparison findings and the surface checks. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
  fallback: |
    Audit the attached GSL assessment against these criteria. For each, return pass or fail, the specific question or section where it passes or fails, and a one-line suggested fix.

    Criteria referencing the Pedagogy Foundations skill (slug: pedagogy-foundations):

    1. Bloom's distribution is within ±10% of the grade-calibrated recommendation for Grade [GRADE].
    2. All six Bloom's levels are represented (for assessments of 20 or more questions).
    3. Age-appropriate language per Pedagogy Foundations Age Guidelines.
    4. Every MCQ distractor is plausible, tied to a common misconception, and similar in length to the correct option.
    5. No "all of the above" or "none of the above" options except where justified.
    6. No double-barrelled questions (asking two things at once).
    7. Indian names, places, and scenarios appear in the majority of scenario-based questions.

    Rubric-specific criteria (if the artefact includes a rubric):

    8. 4 to 6 criteria, each with a clear weight.
    9. Criterion weights sum to 100.
    10. Exemplary, Proficient, Developing, and Beginning descriptors are specific and observable, not "good / average / poor".
    11. Inter-rater reliability guidance is included.

    Surface conventions (inlined here until the Brand Voice and PPT Patterns skills have full bodies in week 3):

    12. British English throughout. Flag any occurrence of "organize", "color", "realize", "behavior", "analyze", "center", "favorite".
    13. No em-dash character anywhere in the document.
    14. Cover page includes Subject, Unit, Grade, Time, Total marks, and Date.
    15. Answer key is on its own section for question-bank assessments.

    Return a table with columns: Criterion, Pass or Fail, Evidence, Fix. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
common_pitfalls: |
  - **Distractors that are obviously wrong.** A distractor a student would never pick is a wasted option. Every distractor must come from a real misconception at the grade.
  - **All-Remember question banks.** Even a Class 3 bank should have some Understand and Apply. A Class 10 bank with 80% Remember fails NEP 2020.
  - **Rubric descriptors that are not observable.** "Good" vs "average" vs "poor" is useless. Descriptors must name specific evidence a marker can see.
  - **Double-barrelled questions.** "What is a chatbot and why might a small business build one?" is two questions. Split it: "What is a chatbot?" and "Give one reason a small business might build one."
  - **American defaults.** Claude writes "Sarah at a mall in Ohio" unless redirected. Redirect in Step 1.
---
