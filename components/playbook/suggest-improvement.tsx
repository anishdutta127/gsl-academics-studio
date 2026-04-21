"use client";

import { Lightbulb } from "lucide-react";

interface SuggestImprovementProps {
  playbookSlug: string;
  feedbackUrl: string | undefined;
}

/**
 * "Suggest improvement" opens Ritu's Google Form in a new tab with the
 * playbook slug appended as a query param so responses are tagged.
 *
 * Query-param name: `playbook`. Configure the Google Form to read a
 * short-answer question bound to this param (Google Forms pre-fill URLs use
 * entry.NNNNNNNN; if Ritu has the real entry ID, update this component to
 * use it instead). For Phase 1, `playbook=<slug>` is enough: respondents
 * can also copy the slug from the form title once configured.
 */
export function SuggestImprovement({
  playbookSlug,
  feedbackUrl
}: SuggestImprovementProps) {
  if (!feedbackUrl) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white p-5 text-sm text-muted-foreground">
        Feedback form not configured yet. Ask Anish to set{" "}
        <code className="font-mono">GSL_FEEDBACK_FORM_URL</code>.
      </div>
    );
  }

  const url = new URL(feedbackUrl);
  url.searchParams.set("playbook", playbookSlug);

  return (
    <aside className="rounded-2xl border border-orange-peel/40 bg-orange-peel/10 p-6 space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb
          className="h-4 w-4 text-orange-peel"
          aria-hidden="true"
        />
        <p className="text-xs font-semibold uppercase tracking-wider text-azure-blue">
          Something off?
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Prompt not working, step confusing, copy you would change. Tell Ritu
        through the team form.
      </p>
      <a
        href={url.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md border border-azure-blue/20 bg-white px-3 py-2 text-sm font-medium text-azure-blue hover:bg-light-sky/60 transition-colors"
      >
        Suggest an improvement
      </a>
    </aside>
  );
}
