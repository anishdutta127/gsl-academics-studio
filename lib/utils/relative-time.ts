/**
 * Warm relative-time strings for UI use. Not internationalised; the team is
 * one timezone and one English variant.
 */

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export function relativeTimeFromMs(ms: number): string {
  const diff = Date.now() - ms;
  if (diff < 0) return "just now";
  if (diff < MINUTE) return "just now";
  if (diff < HOUR) {
    const m = Math.floor(diff / MINUTE);
    return `${m} minute${m === 1 ? "" : "s"} ago`;
  }
  if (diff < DAY) {
    const h = Math.floor(diff / HOUR);
    return `${h} hour${h === 1 ? "" : "s"} ago`;
  }
  if (diff < 2 * DAY) return "yesterday";
  if (diff < WEEK) {
    const d = Math.floor(diff / DAY);
    return `${d} days ago`;
  }
  if (diff < 4 * WEEK) {
    const w = Math.floor(diff / WEEK);
    return `${w} week${w === 1 ? "" : "s"} ago`;
  }
  // Older than a month: show the date.
  const date = new Date(ms);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

/**
 * Convert an ISO date "YYYY-MM-DD" (no timezone) into a relative-time string.
 * The date is interpreted as midnight local time.
 */
export function relativeTimeFromIsoDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const [_, y, mo, d] = m;
  const date = new Date(Number(y), Number(mo) - 1, Number(d));
  return relativeTimeFromMs(date.getTime());
}
