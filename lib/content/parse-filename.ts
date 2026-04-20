/**
 * Output filename convention (decision 011 B):
 *
 *     <grade>_<topic-slug>_<playbook>_<YYYY-MM-DD>.<ext>
 *
 * Examples that parse:
 *     class-06_photosynthesis_teaching-ppt_2026-04-15.pptx
 *     class-11_the-industrial-revolution_lesson-plan_2026-03-20.docx
 *     class-09_maths_assessment_2026-04-01.pdf
 *
 * Hyphens are allowed inside each of the first three segments. Segments are
 * separated by underscores. The date must be real (01-12 month, 01-31 day,
 * 1900-2199 year to guard against typos).
 *
 * Unparseable filenames are not rejected by the UI; they render with a small
 * "naming convention not followed" note and no chips (decision 011 B).
 */

export interface ParsedOutputFilename {
  grade: string;
  topic: string;
  playbook: string;
  date: string; // ISO "YYYY-MM-DD", raw string as parsed
  ext: string;
}

const SEGMENT = /[a-z0-9]+(?:-[a-z0-9]+)*/i.source;
const DATE = /\d{4}-\d{2}-\d{2}/.source;
const EXT = /[a-z0-9]+/i.source;
const FILENAME_REGEX = new RegExp(
  `^(${SEGMENT})_(${SEGMENT})_(${SEGMENT})_(${DATE})\\.(${EXT})$`,
  "i"
);

export function parseOutputFilename(name: string): ParsedOutputFilename | null {
  const match = FILENAME_REGEX.exec(name);
  if (!match) return null;
  const [, grade, topic, playbook, date, ext] = match;

  // Date sanity beyond the regex: real calendar ranges only.
  const [yearStr, monthStr, dayStr] = date.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (
    year < 1900 ||
    year > 2199 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  return {
    grade: grade.toLowerCase(),
    topic: topic.toLowerCase(),
    playbook: playbook.toLowerCase(),
    date,
    ext: ext.toLowerCase()
  };
}
