"use client";

/**
 * Client-only helpers for the "Pick up where you left off" list.
 *
 * The list is stored in localStorage, not in a database. It is per-device,
 * per-browser, and ephemeral. A write happens on the playbook reader page
 * (commit 6). Home page reads the list to decide between the empty-state
 * featured grid and the populated workspace view.
 *
 * Shape:
 *   [{ slug: "lesson-plan", lastOpenedAt: 1745280000000 }, ...]
 *
 * Capped at 3 entries, newest first. Entries older than 7 days are pruned
 * on read (per decision 011-adjacent: Pass 7 of design review, scope = copy
 * events within last 7 days; this approximation without events uses the
 * viewer's own recent reader visits).
 */

const STORAGE_KEY = "gsl-recently-viewed";
const MAX_ENTRIES = 3;
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface RecentEntry {
  slug: string;
  lastOpenedAt: number;
}

export function readRecentlyViewed(): RecentEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    const cleaned = parsed
      .filter(
        (e): e is RecentEntry =>
          e != null &&
          typeof e.slug === "string" &&
          /^[a-z0-9-]+$/.test(e.slug) &&
          typeof e.lastOpenedAt === "number" &&
          now - e.lastOpenedAt <= TTL_MS
      )
      .sort((a, b) => b.lastOpenedAt - a.lastOpenedAt)
      .slice(0, MAX_ENTRIES);
    return cleaned;
  } catch {
    return [];
  }
}

export function rememberViewed(slug: string): void {
  if (typeof window === "undefined") return;
  const entries = readRecentlyViewed().filter((e) => e.slug !== slug);
  entries.unshift({ slug, lastOpenedAt: Date.now() });
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(entries.slice(0, MAX_ENTRIES))
  );
}
