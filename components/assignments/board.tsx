"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  School as SchoolIcon
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  AssignmentItem,
  AssignmentStatus,
  AssignmentSubRole,
  AssignmentWeek
} from "@/lib/content/types";

interface BoardProps {
  initialWeeks: AssignmentWeek[];
  playbookOptions: { slug: string; title: string; icon: string | null }[];
  schoolOptions: { slug: string; name: string }[];
}

const STATUSES: { id: AssignmentStatus; label: string; tone: string }[] = [
  { id: "todo", label: "To do", tone: "bg-light-sky/40 border-azure-blue/15" },
  {
    id: "in-progress",
    label: "In progress",
    tone: "bg-orange-peel/10 border-orange-peel/30"
  },
  {
    id: "in-review",
    label: "In review",
    tone: "bg-turquoise-sea/10 border-turquoise-sea/30"
  },
  { id: "done", label: "Done", tone: "bg-muted border-border" }
];

const LOCAL_STORAGE_KEY = "gsl-assignments-draft";

function isoDayOfWeek(date: Date): number {
  const d = date.getDay();
  return d === 0 ? 7 : d; // 1=Monday..7=Sunday
}

function mondayOf(date: Date): Date {
  const d = new Date(date);
  const delta = isoDayOfWeek(d) - 1;
  d.setDate(d.getDate() - delta);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function uid(): string {
  return `ASG-${Math.random().toString(36).slice(2, 10)}`;
}

export function AssignmentsBoard({
  initialWeeks,
  playbookOptions,
  schoolOptions
}: BoardProps) {
  const thisMonday = toIsoDate(mondayOf(new Date()));

  // Merge initialWeeks with localStorage mirror (localStorage wins if present).
  const [weeks, setWeeks] = useState<AssignmentWeek[]>(() => {
    return initialWeeks.length
      ? initialWeeks
      : [{ week_of: thisMonday, assignments: [] }];
  });
  const [activeWeek, setActiveWeek] = useState<string>(
    initialWeeks[0]?.week_of ?? thisMonday
  );
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as AssignmentWeek[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setWeeks(parsed);
        if (!parsed.some((w) => w.week_of === activeWeek)) {
          setActiveWeek(parsed[0].week_of);
        }
      }
    } catch {
      // swallow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persist(next: AssignmentWeek[]) {
    setWeeks(next);
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // swallow
    }
    setSaveState("saving");
    setSaveMessage(null);
    fetch("/api/assignments/save", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(next)
    })
      .then(async (res) => {
        const body = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
        };
        if (!res.ok || !body.ok) {
          setSaveState("error");
          setSaveMessage(
            body.error ??
              "Could not save to server; changes still live in this browser."
          );
        } else {
          setSaveState("saved");
          setSaveMessage(null);
          setTimeout(() => setSaveState("idle"), 1800);
        }
      })
      .catch((err) => {
        setSaveState("error");
        setSaveMessage(
          (err as Error).message ||
            "Could not reach the server; changes still live in this browser."
        );
      });
  }

  const activeWeekData = useMemo(
    () =>
      weeks.find((w) => w.week_of === activeWeek) ?? {
        week_of: activeWeek,
        assignments: []
      },
    [weeks, activeWeek]
  );

  function updateWeek(updater: (week: AssignmentWeek) => AssignmentWeek) {
    const next = weeks.map((w) =>
      w.week_of === activeWeek ? updater(w) : w
    );
    persist(next);
  }

  function moveStatus(itemId: string, delta: -1 | 1) {
    updateWeek((w) => ({
      ...w,
      assignments: w.assignments.map((a) => {
        if (a.id !== itemId) return a;
        const idx = STATUSES.findIndex((s) => s.id === a.status);
        const next = Math.min(
          STATUSES.length - 1,
          Math.max(0, idx + delta)
        );
        return { ...a, status: STATUSES[next].id };
      })
    }));
  }

  function deleteItem(itemId: string) {
    updateWeek((w) => ({
      ...w,
      assignments: w.assignments.filter((a) => a.id !== itemId)
    }));
  }

  function addAssignment(next: Omit<AssignmentItem, "id">) {
    const item: AssignmentItem = { ...next, id: uid() };
    const weekExists = weeks.some((w) => w.week_of === activeWeek);
    const updated = weekExists
      ? weeks.map((w) =>
          w.week_of === activeWeek
            ? { ...w, assignments: [...w.assignments, item] }
            : w
        )
      : [...weeks, { week_of: activeWeek, assignments: [item] }];
    persist(updated);
  }

  // Week navigation: prev/next week of Monday relative to active
  function navigateWeek(delta: -1 | 1) {
    const [y, m, d] = activeWeek.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + delta * 7);
    setActiveWeek(toIsoDate(date));
  }

  const columns = STATUSES.map((status) => ({
    ...status,
    items: activeWeekData.assignments.filter((a) => a.status === status.id)
  }));

  const playbookBySlug = new Map(
    playbookOptions.map((p) => [p.slug, p])
  );
  const schoolBySlug = new Map(schoolOptions.map((s) => [s.slug, s]));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateWeek(-1)}
            aria-label="Previous week"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Week of
            </p>
            <p className="font-display text-lg text-azure-blue">{activeWeek}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateWeek(1)}
            aria-label="Next week"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <SaveIndicator state={saveState} message={saveMessage} />
          <AddAssignmentDialog
            playbookOptions={playbookOptions}
            schoolOptions={schoolOptions}
            onAdd={addAssignment}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <section
            key={col.id}
            aria-labelledby={`col-${col.id}-heading`}
            className={cn("rounded-2xl border p-4 min-h-[260px] space-y-3", col.tone)}
          >
            <header className="flex items-center justify-between">
              <h2
                id={`col-${col.id}-heading`}
                className="text-xs font-semibold uppercase tracking-[0.15em] text-azure-blue"
              >
                {col.label}
              </h2>
              <span className="text-xs text-muted-foreground">
                {col.items.length}
              </span>
            </header>
            <ul className="space-y-3">
              {col.items.map((item) => {
                const playbook = playbookBySlug.get(item.playbook_slug);
                const school = item.school_slug
                  ? schoolBySlug.get(item.school_slug)
                  : undefined;
                const statusIdx = STATUSES.findIndex((s) => s.id === item.status);
                return (
                  <li
                    key={item.id}
                    className="rounded-xl border border-border bg-white p-3 space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display text-sm text-azure-blue truncate">
                        {item.assignee_name}
                      </p>
                      {item.sub_role ? (
                        <span className="rounded-full bg-light-sky px-2 py-0.5 text-[10px] uppercase tracking-wider text-azure-blue">
                          {item.sub_role}
                        </span>
                      ) : null}
                    </div>
                    {playbook ? (
                      <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                        {playbook.icon ? (
                          <span aria-hidden="true">{playbook.icon}</span>
                        ) : null}
                        <span className="truncate">{playbook.title}</span>
                      </p>
                    ) : null}
                    <p className="text-sm text-foreground line-clamp-2">
                      {item.topic}
                    </p>
                    {school ? (
                      <p className="inline-flex items-center gap-1 text-xs text-azure-blue">
                        <SchoolIcon className="h-3 w-3" aria-hidden="true" />
                        {school.name}
                      </p>
                    ) : null}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveStatus(item.id, -1)}
                          disabled={statusIdx === 0}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-white text-muted-foreground hover:bg-light-sky disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
                          aria-label="Move back one status"
                        >
                          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveStatus(item.id, 1)}
                          disabled={statusIdx === STATUSES.length - 1}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-white text-muted-foreground hover:bg-light-sky disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
                          aria-label="Move forward one status"
                        >
                          <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        className="text-xs text-muted-foreground hover:text-difficulty-advanced underline-offset-4 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
              {col.items.length === 0 ? (
                <li className="rounded-xl border border-dashed border-border/60 bg-white/60 p-3 text-xs text-muted-foreground text-center">
                  Nothing here
                </li>
              ) : null}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function SaveIndicator({
  state,
  message
}: {
  state: "idle" | "saving" | "saved" | "error";
  message: string | null;
}) {
  if (state === "idle") return null;
  if (state === "saving") {
    return (
      <span className="text-xs text-muted-foreground">Saving…</span>
    );
  }
  if (state === "saved") {
    return (
      <span className="text-xs text-turquoise-sea">Saved</span>
    );
  }
  return (
    <span
      title={message ?? "Save failed"}
      className="inline-flex items-center gap-1 text-xs text-difficulty-advanced"
    >
      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
      Local only
    </span>
  );
}

function AddAssignmentDialog({
  playbookOptions,
  schoolOptions,
  onAdd
}: {
  playbookOptions: BoardProps["playbookOptions"];
  schoolOptions: BoardProps["schoolOptions"];
  onAdd: (next: Omit<AssignmentItem, "id">) => void;
}) {
  const [open, setOpen] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const assigneeName = (form.get("assignee_name") as string).trim();
    const playbookSlug = form.get("playbook_slug") as string;
    const topic = (form.get("topic") as string).trim();
    const schoolSlug = (form.get("school_slug") as string) || "";
    const subRole = (form.get("sub_role") as AssignmentSubRole) || undefined;
    const assigneeRole = (form.get("assignee_role") as string).trim();

    if (!assigneeName || !playbookSlug || !topic) return;

    onAdd({
      assignee_name: assigneeName,
      assignee_role: assigneeRole || undefined,
      playbook_slug: playbookSlug,
      topic,
      school_slug: schoolSlug || undefined,
      status: "todo",
      sub_role: subRole
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          Add assignment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add an assignment</DialogTitle>
          <DialogDescription>
            Lands in the To-do column for the selected week.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-2">
          <Field label="Assignee name" htmlFor="assignee_name">
            <input
              id="assignee_name"
              name="assignee_name"
              type="text"
              required
              placeholder="Priya"
              className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
            />
          </Field>
          <Field label="Assignee role" htmlFor="assignee_role">
            <input
              id="assignee_role"
              name="assignee_role"
              type="text"
              placeholder="Content Writer"
              className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
            />
          </Field>
          <Field label="Playbook" htmlFor="playbook_slug">
            <select
              id="playbook_slug"
              name="playbook_slug"
              required
              className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
            >
              <option value="">Select a playbook</option>
              {playbookOptions.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Topic" htmlFor="topic">
            <input
              id="topic"
              name="topic"
              type="text"
              required
              placeholder="Building your first chatbot"
              className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="School (optional)" htmlFor="school_slug">
              <select
                id="school_slug"
                name="school_slug"
                className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
              >
                <option value="">None</option>
                {schoolOptions.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Sub-role" htmlFor="sub_role">
              <select
                id="sub_role"
                name="sub_role"
                className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
              >
                <option value="">None</option>
                <option value="writer">Writer</option>
                <option value="designer">Designer</option>
                <option value="reviewer">Reviewer</option>
              </select>
            </Field>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  htmlFor,
  children
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold uppercase tracking-wider text-azure-blue"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
