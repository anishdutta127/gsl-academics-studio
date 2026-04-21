"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ExternalLink, FileText, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DiscoveredOutput } from "@/lib/content/types";

export interface LibraryOutput extends DiscoveredOutput {
  playbookSlug: string;
  playbookTitle: string;
  playbookIcon: string | null;
}

interface LibraryViewProps {
  outputs: LibraryOutput[];
  /** Every published playbook, even if it has zero outputs today. Used for
   *  the filter-chip row so the reader can see all seven buckets. */
  playbookOptions: { slug: string; title: string; icon: string | null }[];
}

const ALL = "__all__";

export function LibraryView({ outputs, playbookOptions }: LibraryViewProps) {
  const [playbookFilter, setPlaybookFilter] = useState<string>(ALL);
  const [gradeFilter, setGradeFilter] = useState<string>(ALL);
  const [query, setQuery] = useState<string>("");

  const gradeOptions = useMemo(() => {
    const set = new Set<string>();
    for (const o of outputs) {
      if (o.parsed?.grade) set.add(o.parsed.grade);
    }
    return [...set].sort();
  }, [outputs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return outputs.filter((o) => {
      if (playbookFilter !== ALL && o.playbookSlug !== playbookFilter) return false;
      if (gradeFilter !== ALL && o.parsed?.grade !== gradeFilter) return false;
      if (q) {
        const haystack = [
          o.filename.toLowerCase(),
          o.parsed?.topic ?? "",
          o.parsed?.grade ?? "",
          o.playbookTitle.toLowerCase()
        ].join(" ");
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [outputs, playbookFilter, gradeFilter, query]);

  const totalLabel =
    outputs.length === filtered.length
      ? `${outputs.length} output${outputs.length === 1 ? "" : "s"}`
      : `${filtered.length} of ${outputs.length} output${outputs.length === 1 ? "" : "s"}`;

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        <div
          role="search"
          aria-label="Search outputs by topic or filename"
          className="relative max-w-xl"
        >
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic, grade, or filename"
            className="h-11 w-full rounded-full border border-input bg-white pl-10 pr-4 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
            aria-label="Search outputs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            label="All playbooks"
            active={playbookFilter === ALL}
            onClick={() => setPlaybookFilter(ALL)}
          />
          {playbookOptions.map((p) => (
            <FilterChip
              key={p.slug}
              label={
                <span className="inline-flex items-center gap-1.5">
                  {p.icon ? <span aria-hidden="true">{p.icon}</span> : null}
                  <span>{p.title}</span>
                </span>
              }
              active={playbookFilter === p.slug}
              onClick={() => setPlaybookFilter(p.slug)}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label
            htmlFor="library-grade-filter"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Grade
          </label>
          <select
            id="library-grade-filter"
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
          >
            <option value={ALL}>All grades</option>
            {gradeOptions.map((g) => (
              <option key={g} value={g}>
                {formatGrade(g)}
              </option>
            ))}
          </select>
          <span className="ml-auto text-xs text-muted-foreground">
            {totalLabel}
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        outputs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="rounded-2xl border border-dashed border-azure-blue/20 bg-light-sky/25 p-10 text-center space-y-2">
            <h2 className="font-display text-lg text-azure-blue">
              Nothing matches those filters.
            </h2>
            <p className="text-sm text-muted-foreground">
              Try widening the playbook or grade filter, or clear the search.
            </p>
            <button
              type="button"
              onClick={() => {
                setPlaybookFilter(ALL);
                setGradeFilter(ALL);
                setQuery("");
              }}
              className="mt-2 inline-block text-sm text-azure-blue underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((o) => (
            <OutputCard key={`${o.playbookSlug}-${o.filename}`} output={o} />
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick
}: {
  label: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-turquoise-sea bg-turquoise-sea text-white"
          : "border-border bg-white text-azure-blue hover:bg-light-sky/60"
      )}
    >
      {label}
    </button>
  );
}

function OutputCard({ output }: { output: LibraryOutput }) {
  const { filename, parsed, shareUrl, playbookSlug, playbookTitle, playbookIcon } = output;
  const topic = parsed?.topic ? formatTopic(parsed.topic) : filename;
  const grade = parsed?.grade ? formatGrade(parsed.grade) : null;

  const content = (
    <>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        <FileText className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="truncate">{parsed?.ext?.toUpperCase() ?? "FILE"}</span>
      </div>
      <h3 className="mt-3 font-display text-base text-azure-blue line-clamp-2">
        {topic}
      </h3>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {grade ? <Badge variant="light">{grade}</Badge> : null}
        {parsed?.date ? (
          <span className="text-xs text-muted-foreground">{parsed.date}</span>
        ) : null}
      </div>
      <p className="mt-3 text-xs text-muted-foreground inline-flex items-center gap-1.5">
        {playbookIcon ? <span aria-hidden="true">{playbookIcon}</span> : null}
        From {playbookTitle}
      </p>
      {!parsed ? (
        <p className="mt-2 text-[11px] text-muted-foreground italic">
          Naming convention not followed: {filename}
        </p>
      ) : null}
    </>
  );

  return (
    <li className="rounded-2xl border border-border bg-white p-5 flex flex-col min-h-[180px]">
      <div className="flex-1">{content}</div>
      <div className="mt-4 pt-3 border-t border-border">
        {shareUrl ? (
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-azure-blue hover:underline underline-offset-4"
          >
            Open in OneDrive
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : (
          <span className="text-xs text-muted-foreground">
            Ask Anish for the share link
          </span>
        )}
        <Link
          href={`/playbooks/${playbookSlug}`}
          className="ml-4 text-xs text-muted-foreground hover:text-azure-blue underline-offset-4 hover:underline"
        >
          Open playbook
        </Link>
      </div>
    </li>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-azure-blue/20 bg-light-sky/25 p-10 text-center space-y-3">
      <h2 className="font-display text-xl text-azure-blue">
        Nothing here yet.
      </h2>
      <p className="mx-auto max-w-xl text-sm text-muted-foreground">
        The first output the team ships through any playbook lands here. Drop
        your file into{" "}
        <code className="font-mono">Acads/studio/outputs/&lt;playbook&gt;/</code>{" "}
        on OneDrive, named in the convention from the Audit Stage (e.g.{" "}
        <code className="font-mono">
          class-06_building-a-simple-chatbot_teaching-ppt_2026-04-15.pptx
        </code>
        ), then run <code className="font-mono">pnpm sync-content</code>.
      </p>
    </div>
  );
}

function formatGrade(raw: string): string {
  // Convention is class-06, class-08, class-11, etc. Render as "Class 6".
  const m = /^class-(\d+)$/.exec(raw);
  if (m) return `Class ${Number(m[1])}`;
  return raw.replace(/-/g, " ");
}

function formatTopic(raw: string): string {
  // "building-a-simple-chatbot" → "Building a simple chatbot"
  const spaced = raw.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
