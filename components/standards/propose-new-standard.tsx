"use client";

import { useState } from "react";
import { Check, Copy, Lightbulb } from "lucide-react";
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

interface ProposeNewStandardProps {
  playbookSlug: string;
  playbookTitle: string;
}

function rationaleTemplate(playbookSlug: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `---
set_by: <Your name>
set_on: ${today}
topic: <The topic of this output, e.g. "Building a simple chatbot">
grade: <Class 6 or whatever fits>
programme: <STEM/IIT-G | Young Pioneers | VideoGenX | Solevit | Harvard Manage Mentor | Talk & Learn | general>
reference_filename: <the file you dropped next to this rationale, e.g. reference.pptx>
---

## Key qualities

- <One specific quality, e.g. "One idea per slide, never crowded">
- <Another, e.g. "Bloom's level visible on every content slide">
- <Three to five total, each observable in the reference file>

## Why this is the bar

<One short paragraph: what is true about this output that should be true of every future output from the ${playbookSlug} playbook?>

<Optional second paragraph if the first is not enough.>
`;
}

export function ProposeNewStandard({
  playbookSlug,
  playbookTitle
}: ProposeNewStandardProps) {
  const [open, setOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const template = rationaleTemplate(playbookSlug);
  const today = new Date().toISOString().slice(0, 10);
  const proposalFolderHint = `Acads/studio/standards/${playbookSlug}/proposals/<your-name>-${today}/`;

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(template);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      /* swallow */
    }
  }

  return (
    <aside className="rounded-2xl border border-border bg-white p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb
          className="h-4 w-4 text-orange-peel"
          aria-hidden="true"
        />
        <p className="text-xs font-semibold uppercase tracking-wider text-azure-blue">
          Got something better?
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        If you just made an output that should be the new bar for{" "}
        {playbookTitle}, propose it. Ritu reviews; if she agrees, the new
        bar shows up here next week.
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Propose a new standard</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Propose a new bar for {playbookTitle}</DialogTitle>
            <DialogDescription>
              Three steps. No upload, just three OneDrive moves.
            </DialogDescription>
          </DialogHeader>

          <ol className="space-y-5 list-none pl-0">
            <li className="space-y-2">
              <p className="text-sm font-semibold text-azure-blue">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-turquoise-sea text-white text-xs mr-2">
                  1
                </span>
                Drop your candidate output into a new folder
              </p>
              <code className="block rounded-md bg-muted px-3 py-2 text-xs font-mono break-all">
                {proposalFolderHint}
              </code>
              <p className="text-xs text-muted-foreground">
                Replace <code className="font-mono">&lt;your-name&gt;</code>{" "}
                with your first name in lowercase, e.g.{" "}
                <code className="font-mono">priya-{today}</code>.
              </p>
            </li>

            <li className="space-y-2">
              <p className="text-sm font-semibold text-azure-blue">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-turquoise-sea text-white text-xs mr-2">
                  2
                </span>
                Add a <code className="font-mono">rationale.md</code> next to it
              </p>
              <p className="text-xs text-muted-foreground">
                Copy this template, fill it in, save as{" "}
                <code className="font-mono">rationale.md</code> in the same
                folder as your candidate file.
              </p>
              <div className="relative">
                <pre className="rounded-md border border-border bg-cream p-3 pr-16 text-xs font-mono whitespace-pre-wrap break-words max-h-72 overflow-y-auto">
                  {template}
                </pre>
                <button
                  type="button"
                  onClick={copyTemplate}
                  aria-label="Copy the rationale template"
                  className={cn(
                    "absolute top-2 right-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-2.5 py-1 text-xs font-medium hover:bg-light-sky transition-colors",
                    copyState === "copied" &&
                      "text-turquoise-sea border-turquoise-sea"
                  )}
                >
                  {copyState === "copied" ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </li>

            <li className="space-y-2">
              <p className="text-sm font-semibold text-azure-blue">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-turquoise-sea text-white text-xs mr-2">
                  3
                </span>
                WhatsApp Ritu when it is there
              </p>
              <p className="text-xs text-muted-foreground">
                One line is enough. She will review and either promote it,
                ask you to revise, or explain why the current bar still
                holds.
              </p>
            </li>
          </ol>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
