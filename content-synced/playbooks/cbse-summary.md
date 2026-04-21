---
slug: cbse-summary
title: CBSE Doc Summariser
icon: "📑"
category: Board Alignment
what_youll_make: A one-page summary of a CBSE circular, NCF update, or board notification. Four sections: what changed, where it hits GSL, what GSL does next, and who owns what by when. Every claim points to a specific section or page in the source, so the reader can verify. Every action has a named owner and a deadline.
time_needed: 20 to 40 minutes
difficulty: gentle
skills_referenced:
  - pedagogy-foundations
  - brand-voice
related_playbooks:
  - product-note
  - lesson-plan
status: published
use_when: |
  The CBSE board, NCERT, the Ministry of Education, or a state board has published a document that might affect a GSL programme, a school partnership, or an ongoing piece of content. The team needs a short, trustworthy read that tells them what changed and what to do about it, without reading the 40-page original.

  Use this for: CBSE circulars (new exam pattern rules, assessment reforms, compliance requirements), NCF 2023 updates, NEP 2020 operational guidelines, ICSE or state-board announcements, Ministry of Education programme notifications.

  This is NOT for GSL-internal documents (use the Product Note Builder), for teacher-facing summaries (those go into a Lesson Plan or Teaching PPT), or for marketing content.
before_you_start:
  - The source document (PDF, Word, or pasted full text). If the source is a link, you need the full text, not just the URL.
  - The document title, issuing body, and publication date (for traceability)
  - Which GSL programmes might be affected (or "unclear, help me decide")
  - Any deadline the document imposes (effective date, compliance deadline)
  - Stakeholder groups potentially impacted (schools, teachers, students, parents, GSL internal)
  - Any prior related CBSE / NCF / NEP documents you want Claude to connect this one to
  - The Pedagogy Foundations skill, attached or pasted, for the NEP 2020 and NCF 2023 context
steps:
  - title: Frame the summary
    instruction: |
      Open a new Claude conversation. Paste the source document into the context (or attach the PDF if using Claude Projects). Then paste the framing prompt. Step 1 makes Claude commit to a neutral, accurate, claims-traceable posture before summarising; this catches speculative summaries before they go out.
    tool: Claude, Projects feature is best for long source docs
    prompt: |
      I am summarising a CBSE / board / policy document for the GSL Academics team. Here is the brief.

      Document title: [TITLE]
      Issuing body: [CBSE / NCERT / MOE / ICSE / STATE BOARD]
      Publication date: [YYYY-MM-DD]
      Effective date or compliance deadline: [YYYY-MM-DD or "Not specified"]
      GSL programmes potentially affected: [LIST, or "Unclear, help me decide"]
      Stakeholder groups potentially impacted: [SCHOOLS / TEACHERS / STUDENTS / PARENTS / GSL INTERNAL]

      Before you read the document or produce anything, confirm these constraints in one short paragraph. Be specific.

      1. British English throughout. No em-dash anywhere. No American spellings.
      2. Every factual claim in the summary must be traceable to a specific section, clause, or page number of the source document. Where the source does not explicitly say something, you will say "Not stated in the source" rather than inferring.
      3. Opinions, speculation, and marketing-language are excluded. If a sentence begins "This is a great opportunity for GSL", that is opinion and it does not appear in the summary.
      4. The summary is one page. Aim for 400 to 600 words of body text. More than one page means it has stopped being a summary.
      5. The summary has four sections in order: (a) What changed, (b) Where it hits GSL, (c) What GSL does next, (d) Who owns each next step by when. Every section is present.
      6. Every "What GSL does next" item has an owner (a role, not a person name unless you know the name) and a deadline (a date or a relative phrase like "before the next curriculum review in July 2026").
      7. Indian context is already implicit (this is a CBSE document) but still: use British English and GSL voice. No corporate boilerplate.
      8. If the source document references prior CBSE, NCF, or NEP documents, you will name those documents so the reader can chase the chain if they want. You will not silently paraphrase them.
      9. If the source is ambiguous or you are uncertain, you will say so in the summary ("The circular does not specify whether this applies to affiliated schools only or all CBSE-examining schools"). An honest uncertainty is worth more than a confident guess.
      10. The summary is trustworthy enough that Ritu could share it with a principal without re-reading the source. This is the bar.

      Once you have confirmed all ten in your own words, stop and wait. Do not begin the summary until I confirm.
    mid_flow_checks:
      - Claude named all ten constraints specifically
      - The source document is fully in context (either pasted or attached; if Claude says "I do not have access", paste the full text now)
      - You have the document title, issuing body, and publication date ready for the cover block
    expected_output: |
      A confirmation paragraph from Claude, numbered 1 through 10. No summary content yet.
    next_action: |
      If Claude sounds eager to editorialise in the confirmation ("this is an exciting change for the sector"), push back in the same conversation. The summary posture is neutral and accurate, not enthusiastic.
  - title: Extract what changed
    instruction: |
      Get the delta from the prior state. This is the hardest part of summarising a policy document; Claude will want to paraphrase the whole thing. Make it commit to a tight diff first.
    tool: Claude, same conversation
    prompt: |
      From the source document, extract what has changed. Return a table:

      | # | The change (one sentence) | Before (prior state, if the source says it) | After (new state per this document) | Source reference (section, clause, or page) |

      Rules:

      - Each change is one sentence, not a paragraph. If you need a paragraph, split into multiple rows.
      - The "Before" column cites what the prior state was. If the source does not explicitly state the prior state, write "Not stated in the source" rather than inferring. You can only write the prior state if the source tells you.
      - The "After" column is what this document establishes.
      - The "Source reference" column is a specific pointer (e.g. "Section 3.2", "Clause 4(a)", "Page 7 paragraph 2"). A reference like "In the document" is not acceptable.
      - Order changes by how load-bearing they are for GSL, not by document order. The most important change is row 1.

      Aim for 5 to 10 rows, depending on the document. If the document changes only one thing, that is fine; one row.

      Do not move to GSL impact yet. Just the delta.
    mid_flow_checks:
      - Every row has a specific source reference (section, clause, or page), not "in the document"
      - The "Before" column either cites prior state or says "Not stated in the source"; no inferred prior states
      - Rows are ordered by load-bearing for GSL, not by source order
    expected_output: |
      A change table, 5 to 10 rows, with specific source references.
    next_action: |
      Scan the source references. If any row points to a section you cannot find in the source, flag it to Claude and push for a corrected reference or a deletion. A summary with untraceable claims is worse than no summary.
  - title: Identify where it hits GSL
    instruction: |
      Now map each change to specific GSL surfaces. This is where the summary earns its keep; it is the translation from policy language to programme implications.
    tool: Claude, same conversation
    prompt: |
      For each change from Step 2, identify where it hits GSL. Return a table:

      | Change # (from Step 2) | GSL surface impacted | Type of impact | Specificity of the impact |

      - "GSL surface" is one of: a specific programme (STEM/IIT-G, Young Pioneers, VideoGenX, Solevit, Harvard Manage Mentor, Talk & Learn, CBSE general), the Assessment pipeline, the Lesson Plan library, teacher training, parent communications, school partnerships, ops or compliance.
      - "Type of impact" is one of: content update (a playbook or deck needs rewriting), assessment update (a rubric or question bank needs adjustment), compliance (GSL or partner schools need to do something new), opportunity (a new programme or partnership opening), information only (nothing for GSL to do, but the team should know).
      - "Specificity" is a one-line description of exactly what is affected ("The Class 9 assessment question bank needs 4 to 6 competency-based items added per subject, per Section 3.2 of the circular", not "assessments are affected").

      If a change has no GSL impact, say "No GSL impact, informational only" rather than stretching to find one.

      Order rows by "Type of impact" priority: compliance first, then content update, then assessment update, then opportunity, then information only.
    mid_flow_checks:
      - Every row has a specific GSL surface named (not "content")
      - The Specificity column reads as a concrete one-line description, not "this affects our programmes"
      - No forced "opportunity" for changes that are really information-only
    expected_output: |
      An impact table, one row per change from Step 2.
    next_action: |
      Read the "Specificity" column. Any row that still reads "this affects our programmes" is a draft, not a summary. Push for the specific surface and the specific artefact.
  - title: Draft the action list, with owners and deadlines
    instruction: |
      Every impact that requires action becomes an entry on the action list. This is the section the team actually acts on; make it concrete.
    tool: Claude, same conversation
    prompt: |
      For every row in the Step 3 impact table that is NOT "information only", produce an action item. Return a table:

      | Action (one sentence, starting with a verb) | Owner (role or named person) | Deadline | Dependencies (if any) |

      - "Action" starts with a verb: "Rewrite", "Add", "Update", "Audit", "Schedule", "Contact", "Flag". Not "Consider" or "Explore".
      - "Owner" is a role (e.g. "Assessment lead", "Young Pioneers programme lead", "Sales ops", "Ritu") or a named person if the brief gave you one. If ownership is unclear, write "Ritu to assign" rather than guessing.
      - "Deadline" is either a date (YYYY-MM-DD) derived from the source document's effective or compliance date, or a relative phrase tied to a GSL operating cadence ("before the next curriculum review in July 2026", "by end of the current cohort").
      - "Dependencies" names any prior action the team must complete before this one, or any external input needed (a principal decision, an NCERT follow-up circular, a vendor timeline).

      Order actions by deadline, earliest first. Group any "no deadline specified in source, recommend by [DATE]" actions at the end with a note explaining the recommendation.

      If the action list is more than 8 rows, the summary is getting too operational. Combine related items or flag to me so we can scope cuts.
    mid_flow_checks:
      - Every action starts with a specific verb, not "Consider" or "Explore"
      - Every action has an owner role or "Ritu to assign"; no blank owners
      - Deadlines are traceable either to the source document or to a specific GSL cadence
      - Rows are ordered by deadline earliest-first
    expected_output: |
      An action-list table, typically 3 to 8 rows.
    next_action: |
      Review the deadlines. If a compliance deadline is less than 6 weeks away and the owner is ambiguous, flag this explicitly before running the audit; this summary becomes a risk document, not just an information document.
  - title: Package the one-page summary
    instruction: |
      Claude assembles everything into the final one-page summary. This is the document Ritu or Anish will share internally, and that a principal could read in 5 minutes.
    tool: Claude, same conversation
    prompt: |
      Now produce the final one-page summary. Format:

      **Header block**

      - Document title, issuing body, publication date
      - Effective date or compliance deadline (or "Not specified in the source")
      - GSL programmes affected (from Step 3)
      - Summary author: [YOUR NAME], date: [TODAY'S DATE]

      **Section 1: What changed** (150 to 200 words)

      A prose summary of the changes from Step 2, in priority order. Every claim carries its source reference in parentheses ("(Section 3.2)", "(Clause 4(a))"). This section reads as flowing prose, not as a bullet list; the table from Step 2 is the reference, not the presentation.

      **Section 2: Where it hits GSL** (100 to 150 words)

      A prose paragraph of the impacts from Step 3, grouped by "Type of impact" (compliance first). Each impact is one or two sentences.

      **Section 3: What GSL does next** (the action list from Step 4, as a table)

      The table from Step 4 rendered as-is.

      **Section 4: Notes, caveats, and open questions** (50 to 100 words)

      - Anything in the source document that is ambiguous and a follow-up reading may be needed for
      - Any action where the owner or deadline is a best estimate rather than directly from the source
      - Any related prior documents the reader should also read to fully understand this one

      Total length aim: 400 to 600 words of body text, plus the header and the action table. One page when printed.

      British English, no em-dash, neutral and accurate posture throughout.
    mid_flow_checks:
      - The final document fits on one printed page (400 to 600 words body + header + action table)
      - Every claim in Sections 1 and 2 carries a source reference in parentheses
      - Section 4 names at least one open question or caveat (a summary that has none is usually over-confident)
    expected_output: |
      A complete one-page summary, ready to share.
    next_action: |
      Paste into Word. Apply the GSL document template. Save under the filename convention in the Audit Stage (class-XX_topic-slug_cbse-summary_YYYY-MM-DD.pdf). Proceed to audit.
audit_prompt_template:
  prefix: |
    The standard above defines the bar. Now run a quick surface check on this CBSE summary as well:

    A. British English throughout. No "organize", "color", "realize", "behavior", "analyze", "center", "favorite", or "program" used for the education programme.
    B. No em-dash character anywhere.
    C. Total body length is 400 to 600 words (one printed page with the header and action table).
    D. Every factual claim in Sections 1 and 2 carries a source reference (section, clause, or page).
    E. Every action in the Section 3 table has an owner and a deadline.
    F. Section 4 (Notes, caveats, open questions) is present and names at least one caveat.

    Return a table with columns: Criterion, Pass or Fail, Evidence, Fix. Include both the bar-comparison findings and the surface checks. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
  fallback: |
    Audit the attached GSL CBSE / board / policy summary against these criteria. For each, return pass or fail, the specific section or line where it passes or fails, and a one-line suggested fix.

    Criteria on brevity:

    1. Total body length is 400 to 600 words; header and action table do not count toward this.
    2. Section 1 (What changed) is 150 to 200 words.
    3. Section 2 (Where it hits GSL) is 100 to 150 words.
    4. Section 4 (Notes, caveats, open questions) is 50 to 100 words.
    5. The summary fits on one printed page.

    Criteria on accuracy:

    6. Every factual claim in Sections 1 and 2 carries a source reference in parentheses (section, clause, or page number).
    7. No opinion or speculation. If the summary says "this is a great opportunity", that is a fail.
    8. Prior states (the "Before" column from Step 2) are either cited from the source or marked "Not stated in the source"; no inferred priors.
    9. Ambiguity in the source is surfaced in Section 4 as a caveat or open question. A summary that has zero caveats usually means accuracy was traded for confidence.

    Criteria on actionability:

    10. Section 3 is a table with columns: Action, Owner, Deadline, Dependencies.
    11. Every action starts with a specific verb (Rewrite, Add, Update, Audit, Schedule, Contact, Flag), not "Consider" or "Explore".
    12. Every action has an owner (a role or a named person), not a blank.
    13. Every action has a deadline (a date or a relative phrase tied to a GSL cadence).
    14. Actions are ordered by deadline, earliest first.

    Criteria on voice and surface:

    15. British English throughout.
    16. No em-dash character anywhere.
    17. Neutral tone, no marketing language ("leading", "world-class", "empowering").
    18. Header block includes Document title, Issuing body, Publication date, Effective date, Programmes affected, Summary author, Date.

    Return a table with columns: Criterion, Pass or Fail, Evidence, Fix. End with an overall pass or fail verdict. If the overall verdict is fail, list the top three fixes in priority order.
common_pitfalls: |
  - **Paraphrasing the full document.** A summary is not a shorter version of the whole doc; it is a different artefact. If Section 1 is a reworded table of contents, it has missed the point. Section 1 names the changes, ranked by what GSL has to do about them.
  - **Untraceable claims.** "The circular introduces new assessment requirements" is useless without "(Section 3.2)". Every claim in Sections 1 and 2 needs a source reference in parentheses.
  - **Inferred priors.** Claude will fill in "the previous assessment was purely MCQ-based" if the source does not say so. Ask Claude where the prior state came from; if the source does not state it, the Before column reads "Not stated in the source" and the Action list adjusts accordingly.
  - **Optimism disguised as summary.** "This aligns well with GSL's direction" is an opinion. Summaries are neutral. If alignment or misalignment is load-bearing, it becomes an action ("Audit whether our current Class 9 assessments meet the new requirement in Section 3.2, by 15 June 2026").
  - **Vague actions.** "Explore new assessment options" is not an action; it is a prompt for an action. "Audit the Class 9 Young Pioneers rubric against the new competency criteria in Section 3.2" is.
  - **Blank owners.** "Someone should look at this" is not an owner. If ownership is unclear, write "Ritu to assign" so the next step is specific.
  - **No caveats.** A policy document is rarely perfectly clear. A summary with zero caveats in Section 4 is usually over-confident. Claude will default to confident-summary mode; push for honest uncertainty.
---
