"use client";

import { useState } from "react";
import { Check, Sparkles, X } from "lucide-react";
import { PromptBlock } from "@/components/playbook/prompt-block";
import { Button } from "@/components/ui/button";
import { extractKeyQualities } from "@/lib/content/standards-helpers";
import type {
  AuditPromptTemplate,
  LoadedCurrentStandard
} from "@/lib/content/types";
import { cn } from "@/lib/utils";

interface AuditStageProps {
  playbookSlug: string;
  playbookTitle: string;
  /** Two-shape template: prefix (used after the standard preamble) +
   *  fallback (full standalone prompt when no standard is set). */
  auditTemplate: AuditPromptTemplate;
  /** Current bar for this playbook, injected into the prompt when set. */
  currentStandard: LoadedCurrentStandard | null;
}

function composeAuditPrompt(
  playbookTitle: string,
  template: AuditPromptTemplate,
  currentStandard: LoadedCurrentStandard | null
): string {
  if (!currentStandard) {
    return template.fallback;
  }
  const qualities = extractKeyQualities(currentStandard.bodyMarkdown);
  const qualitiesBlock =
    qualities.length > 0
      ? `\n\nThe key qualities of our current bar are:\n${qualities
          .map((q) => `- ${q}`)
          .join("\n")}`
      : "";
  const referenceLine = currentStandard.shareUrl
    ? `\n\nThe full reference: ${currentStandard.shareUrl}`
    : "\n\n(The reference file is in OneDrive; ask Anish if the link is not yet shared.)";

  const preamble = `Audit this output against GSL's current bar for ${playbookTitle}, set by ${currentStandard.rationale.set_by} on ${currentStandard.rationale.set_on}.${qualitiesBlock}${referenceLine}\n\nYour output should match or exceed these qualities. Identify specifically where it falls short and suggest fixes. Then apply the audit body below.`;

  return `${preamble}\n\n${template.prefix}`;
}

type Decision = "pending" | "pass" | "fail";

const FILENAME_TEMPLATE = "<grade>_<topic-slug>_<playbook>_<YYYY-MM-DD>.<ext>";

export function AuditStage({
  playbookSlug,
  playbookTitle,
  auditTemplate,
  currentStandard
}: AuditStageProps) {
  const [decision, setDecision] = useState<Decision>("pending");
  const [filenameCopied, setFilenameCopied] = useState(false);
  const auditPrompt = composeAuditPrompt(
    playbookTitle,
    auditTemplate,
    currentStandard
  );

  // Per-playbook example so the suggested filename feels native to the
  // output the writer just made. GSL future-skills topics, varied so no
  // single example dominates the UX.
  const EXAMPLE_BY_PLAYBOOK: Record<string, { grade: string; topic: string; ext: string }> = {
    "teaching-ppt": { grade: "class-06", topic: "building-a-simple-chatbot", ext: "pptx" },
    "lesson-plan": { grade: "class-08", topic: "solving-your-citys-water-crisis", ext: "docx" },
    "assessment": { grade: "class-09", topic: "pitching-your-startup-idea", ext: "pdf" },
    "delivery-script": { grade: "class-11", topic: "managing-a-team-project", ext: "docx" },
    "cbse-summary": { grade: "class-10", topic: "designing-a-sustainable-app", ext: "pdf" },
    "product-note": { grade: "class-09", topic: "young-pioneers-programme-launch", ext: "pdf" },
    "carousel": { grade: "class-09", topic: "telling-stories-with-video", ext: "pdf" }
  };
  const ex = EXAMPLE_BY_PLAYBOOK[playbookSlug] ?? {
    grade: "class-08",
    topic: "your-topic",
    ext: "pptx"
  };
  const today = new Date().toISOString().slice(0, 10);
  const filenameExample = `${ex.grade}_${ex.topic}_${playbookSlug}_${today}.${ex.ext}`;

  function markPass() {
    setDecision("pass");
    // localStorage audit-pass entry, used by the Phase 2 library view to show
    // "this output came from an audited run".
    try {
      const key = "gsl-audit-pass";
      const raw = window.localStorage.getItem(key);
      const arr = raw ? (JSON.parse(raw) as unknown[]) : [];
      const entry = {
        slug: playbookSlug,
        at: Date.now()
      };
      if (Array.isArray(arr)) {
        arr.unshift(entry);
        window.localStorage.setItem(key, JSON.stringify(arr.slice(0, 20)));
      }
    } catch {
      // non-fatal
    }
  }

  function markFail() {
    setDecision("fail");
  }

  async function copyFilenameTemplate() {
    try {
      await navigator.clipboard.writeText(FILENAME_TEMPLATE);
      setFilenameCopied(true);
      setTimeout(() => setFilenameCopied(false), 1800);
    } catch {
      /* swallow */
    }
  }

  return (
    <section
      aria-labelledby="audit-stage-heading"
      className="rounded-3xl border border-light-sky bg-light-sky/40 p-6 md:p-10 space-y-6"
    >
      <header className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-peel text-azure-blue"
        >
          <Sparkles className="h-5 w-5" />
        </span>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
            The last step
          </p>
          <h2
            id="audit-stage-heading"
            className="font-display text-2xl text-azure-blue"
          >
            Audit your output
          </h2>
          <p className="text-muted-foreground">
            Before this lands in the library, run it past the standards one
            more time. Copy the audit prompt, paste it into a fresh Claude
            chat, attach your {playbookTitle.toLowerCase()} output, read the
            report. Fix what fails. When everything passes, come back and
            mark it.
          </p>
        </div>
      </header>

      <PromptBlock
        tone="audit"
        copyLabel={`Copy the audit prompt for ${playbookTitle}`}
      >
        {auditPrompt}
      </PromptBlock>

      {decision === "pending" ? (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="accent"
            size="lg"
            onClick={markPass}
            className="flex-1"
          >
            <Check className="h-4 w-4 mr-2" aria-hidden="true" />
            Pass, save to library
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={markFail}
            className="flex-1"
          >
            <X className="h-4 w-4 mr-2" aria-hidden="true" />
            Fail, go back
          </Button>
        </div>
      ) : null}

      {decision === "pass" ? (
        <div className="space-y-4 rounded-2xl bg-white border border-orange-peel/40 p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-fashion-fuchsia" aria-hidden="true" />
            <h3 className="font-display text-lg text-fashion-fuchsia">
              Audit passed.
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Nice work. Drop your file into{" "}
            <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
              Acads/studio/outputs/{playbookSlug}/
            </code>{" "}
            on OneDrive. Use this filename shape so the library can group it
            properly:
          </p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={copyFilenameTemplate}
              className={cn(
                "w-full text-left rounded-md border border-border bg-cream p-3 font-mono text-xs transition-colors",
                "hover:border-turquoise-sea focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
              )}
              aria-label="Copy the filename template"
            >
              {filenameCopied ? "Copied" : FILENAME_TEMPLATE}
            </button>
            <p className="text-xs text-muted-foreground">
              Example: <code className="font-mono">{filenameExample}</code>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDecision("pending")}
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            Undo
          </button>
        </div>
      ) : null}

      {decision === "fail" ? (
        <div className="rounded-2xl bg-white border border-border p-5 space-y-3">
          <h3 className="font-display text-lg text-azure-blue">
            Back to the drawing board.
          </h3>
          <p className="text-sm text-muted-foreground">
            Revisit the earlier steps and fix what the audit flagged. When you
            are ready, re-run the audit above.
          </p>
          <button
            type="button"
            onClick={() => setDecision("pending")}
            className="text-sm text-azure-blue underline-offset-4 hover:underline"
          >
            Clear this note
          </button>
        </div>
      ) : null}
    </section>
  );
}
