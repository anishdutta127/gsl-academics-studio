"use client";

import { useEffect, useState } from "react";

/**
 * Three-segment efficiency pill that lives in the top nav.
 * Reads three localStorage counters:
 *   - gsl-tasks-started (incremented on playbook detail mount, deduped per
 *     playbook slug per session via sessionStorage)
 *   - gsl-prompts-copied (incremented inside PromptBlock's copy handler)
 *   - gsl-audits-passed (incremented on AuditStage Pass click)
 *
 * Counters are per-browser; clearing site data resets them. Tooltip on
 * hover says exactly that so nobody is surprised.
 *
 * On < md (mobile) the pill collapses to a single "N copied" segment and
 * expands the full three on desktop. Keeps the top nav clean on phones.
 */

const KEYS = {
  tasks: "gsl-tasks-started",
  prompts: "gsl-prompts-copied",
  audits: "gsl-audits-passed"
} as const;

function readCount(key: string): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(key);
  if (!raw) return 0;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

export function EfficiencyPill() {
  const [tasks, setTasks] = useState(0);
  const [prompts, setPrompts] = useState(0);
  const [audits, setAudits] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const read = () => {
      setTasks(readCount(KEYS.tasks));
      setPrompts(readCount(KEYS.prompts));
      setAudits(readCount(KEYS.audits));
    };
    read();
    setMounted(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key && (Object.values(KEYS) as string[]).includes(e.key)) read();
    };
    // Listen for same-tab custom events (the helper below dispatches these).
    const onLocal = () => read();
    window.addEventListener("storage", onStorage);
    window.addEventListener("gsl-activity", onLocal);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("gsl-activity", onLocal);
    };
  }, []);

  if (!mounted) {
    // Render a 0-state placeholder so layout does not jump.
    return (
      <div
        aria-hidden="true"
        className="hidden sm:inline-flex h-9 items-center rounded-full bg-light-sky/60 px-3 text-xs text-azure-blue/70"
      >
        <span className="opacity-0">0 started · 0 copied · 0 passed</span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex h-9 items-center rounded-full bg-light-sky px-3 text-azure-blue"
      title="Your Studio activity. Resets if you clear browser data."
    >
      <Segment value={tasks} label="started" />
      <Divider />
      <Segment value={prompts} label="copied" />
      <span className="hidden md:contents">
        <Divider />
        <Segment value={audits} label="passed" />
      </span>
    </div>
  );
}

function Segment({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="font-display text-sm leading-none">{value}</span>
      <span className="text-[10px] uppercase tracking-wider">{label}</span>
    </span>
  );
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="mx-2 h-3 w-px bg-azure-blue/20"
    />
  );
}

/**
 * Increment one of the three counters and write an entry to the activity
 * log. Capped at 50 entries. Dispatches a gsl-activity event so the pill
 * updates in the same tab without waiting for a storage event.
 */
export function recordActivity(
  type: "task_started" | "prompt_copied" | "audit_passed",
  context?: { playbook?: string }
): void {
  if (typeof window === "undefined") return;
  const keyByType = {
    task_started: KEYS.tasks,
    prompt_copied: KEYS.prompts,
    audit_passed: KEYS.audits
  } as const;
  const countKey = keyByType[type];
  try {
    const current = readCount(countKey);
    window.localStorage.setItem(countKey, String(current + 1));
  } catch {
    // swallow
  }
  try {
    const logKey = "gsl-activity-log";
    const raw = window.localStorage.getItem(logKey);
    const arr = raw ? (JSON.parse(raw) as unknown[]) : [];
    if (!Array.isArray(arr)) return;
    arr.unshift({
      at: Date.now(),
      type,
      playbook: context?.playbook ?? null
    });
    window.localStorage.setItem(logKey, JSON.stringify(arr.slice(0, 50)));
  } catch {
    // swallow
  }
  window.dispatchEvent(new CustomEvent("gsl-activity"));
}

/**
 * Mount-once helper for the playbook detail page. Dedupes via
 * sessionStorage so reloading the page does not inflate the counter.
 */
export function recordTaskStartedOnce(playbookSlug: string): void {
  if (typeof window === "undefined") return;
  const dedupeKey = `gsl-task-started-seen:${playbookSlug}`;
  try {
    if (window.sessionStorage.getItem(dedupeKey)) return;
    window.sessionStorage.setItem(dedupeKey, "1");
  } catch {
    return;
  }
  recordActivity("task_started", { playbook: playbookSlug });
}
