import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { extractKeyQualities } from "@/lib/content/standards-helpers";
import { relativeTimeFromIsoDate } from "@/lib/utils/relative-time";
import type { LoadedCurrentStandard } from "@/lib/content/types";

interface StandardSummaryCardProps {
  playbookSlug: string;
  playbookTitle: string;
  standard: LoadedCurrentStandard | null;
}

/**
 * Compact card used by the /standards index. Renders the at-a-glance
 * version of the bar (set-by, topic, first three quality chips) and links
 * through to the full TheBar treatment on the playbook detail page.
 *
 * When no standard is set, renders a warm empty card.
 */
export function StandardSummaryCard({
  playbookSlug,
  playbookTitle,
  standard
}: StandardSummaryCardProps) {
  if (!standard) {
    return (
      <Link
        href={`/playbooks/${playbookSlug}`}
        className="group block rounded-2xl border border-dashed border-border bg-white p-6 transition-colors hover:border-azure-blue/40 hover:bg-light-sky/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {playbookTitle}
        </p>
        <p className="mt-3 font-display text-lg text-azure-blue">
          No bar yet.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          The first great output sets it.
        </p>
        <p className="mt-4 inline-flex items-center gap-1 text-xs text-azure-blue group-hover:underline underline-offset-4">
          Open playbook
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </p>
      </Link>
    );
  }

  const qualities = extractKeyQualities(standard.bodyMarkdown).slice(0, 3);
  const setOnLabel = relativeTimeFromIsoDate(standard.rationale.set_on);

  return (
    <Link
      href={`/playbooks/${playbookSlug}`}
      className="group block rounded-2xl border border-orange-peel/40 bg-orange-peel/5 p-6 transition-all hover:border-orange-peel hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2"
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{playbookTitle}</span>
      </div>
      <p className="mt-3 font-display text-lg text-azure-blue">
        {standard.rationale.topic}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {standard.rationale.grade}
        {standard.rationale.programme ? (
          <> · {standard.rationale.programme}</>
        ) : null}
        <> · set by {standard.rationale.set_by}, {setOnLabel}</>
      </p>
      {qualities.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {qualities.map((q, i) => (
            <li
              key={i}
              className="rounded-full bg-white border border-orange-peel/30 px-2.5 py-1 text-[11px] text-azure-blue"
            >
              {q}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-4 inline-flex items-center gap-1 text-xs text-azure-blue group-hover:underline underline-offset-4">
        See the full bar
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </p>
    </Link>
  );
}
