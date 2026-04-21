"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import { ExternalLink, FileText, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProposeNewStandard } from "@/components/standards/propose-new-standard";
import { extractKeyQualities } from "@/lib/content/standards-helpers";
import { relativeTimeFromIsoDate } from "@/lib/utils/relative-time";
import type { LoadedCurrentStandard } from "@/lib/content/types";

interface TheBarProps {
  playbookSlug: string;
  playbookTitle: string;
  standard: LoadedCurrentStandard;
  /** Pre-computed impact numbers for the current bar, passed from the
   *  server. Optional; when all zero the impact line does not render. */
  impact?: {
    outputs: number;
    schools: number;
    students: number;
  };
}

export function TheBar({ playbookSlug, playbookTitle, standard, impact }: TheBarProps) {
  const [rationaleOpen, setRationaleOpen] = useState(false);
  const qualities = extractKeyQualities(standard.bodyMarkdown);
  const setOnLabel = relativeTimeFromIsoDate(standard.rationale.set_on);
  const showImpact = !!impact && impact.outputs > 0;

  return (
    <section
      aria-labelledby={`bar-${playbookSlug}-heading`}
      className="rounded-2xl border border-orange-peel/50 bg-orange-peel/5 p-6 md:p-8 space-y-5"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>The bar, set by {standard.rationale.set_by}</span>
          <span className="text-muted-foreground/70 font-normal normal-case tracking-normal">
            · {setOnLabel}
          </span>
        </div>
        <ProposeNewStandard
          playbookSlug={playbookSlug}
          playbookTitle={playbookTitle}
          triggerOnly
          triggerVariant="subtle"
        />
      </header>

      <div className="space-y-2">
        <h2
          id={`bar-${playbookSlug}-heading`}
          className="font-display text-2xl text-azure-blue"
        >
          {standard.rationale.topic}
        </h2>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-white border border-border px-2.5 py-1">
            {standard.rationale.grade}
          </span>
          {standard.rationale.programme ? (
            <span className="rounded-full bg-light-sky text-azure-blue px-2.5 py-1">
              {standard.rationale.programme}
            </span>
          ) : null}
        </div>
      </div>

      {qualities.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {qualities.map((q, i) => (
            <li
              key={i}
              className="rounded-full bg-white border border-orange-peel/30 px-3 py-1.5 text-xs text-azure-blue"
            >
              {q}
            </li>
          ))}
        </ul>
      ) : null}

      {showImpact ? (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-azure-blue">
            This standard helped {impact!.outputs} output
            {impact!.outputs === 1 ? "" : "s"}
          </span>
          {impact!.schools > 0
            ? `, reaching ${impact!.schools} school${impact!.schools === 1 ? "" : "s"} and ${impact!.students.toLocaleString("en-IN")} students.`
            : "."}
        </p>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        {standard.shareUrl ? (
          <Button asChild variant="outline" className="flex-1">
            <a
              href={standard.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
              See the example
            </a>
          </Button>
        ) : (
          <div className="flex-1 inline-flex items-center justify-center rounded-md border border-border bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
            Ask Anish for the share link
          </div>
        )}

        <Dialog open={rationaleOpen} onOpenChange={setRationaleOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" aria-hidden="true" />
              Read the rationale
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Why this is the bar for {playbookTitle}</DialogTitle>
              <DialogDescription>
                {standard.rationale.set_by} · {setOnLabel}
              </DialogDescription>
            </DialogHeader>
            <div className="prose-gsl text-base">
              <Markdown>{standard.bodyMarkdown}</Markdown>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
