/**
 * Pure helpers for the Standards System. No React, no fs, no env. Lives in
 * a separate module so it's testable in isolation under vitest. The
 * production loader at lib/content/standards.ts re-exports these.
 */

/**
 * Extracts the bullet list from the "## Key qualities" section of a
 * rationale.md body. Returns an empty array if no Key qualities heading
 * exists, so the UI can render the bar even when the contributor forgot.
 */
export function extractKeyQualities(bodyMarkdown: string): string[] {
  const lines = bodyMarkdown.split(/\r?\n/);
  const qualities: string[] = [];
  let inSection = false;
  for (const line of lines) {
    const headingMatch = /^##\s+(.+)$/.exec(line);
    if (headingMatch) {
      inSection = /key\s*qualities?/i.test(headingMatch[1]);
      continue;
    }
    if (!inSection) continue;
    const bulletMatch = /^[-*]\s+(.+)$/.exec(line.trim());
    if (bulletMatch) {
      qualities.push(bulletMatch[1].trim());
    }
  }
  return qualities;
}
