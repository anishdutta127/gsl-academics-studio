"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Lightbulb, Upload } from "lucide-react";
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
  /** When true, renders only the trigger button (no card). Used by TheBar's
   *  top-right "Upload a new standard" affordance. */
  triggerOnly?: boolean;
  /** Visual variant for the trigger button when triggerOnly is true. */
  triggerVariant?: "default" | "subtle";
}

type SubmitState =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "success" }
  | { phase: "error"; message: string };

export function ProposeNewStandard({
  playbookSlug,
  playbookTitle,
  triggerOnly,
  triggerVariant = "default"
}: ProposeNewStandardProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<SubmitState>({ phase: "idle" });
  const [proposerName, setProposerName] = useState("");

  // Pre-fill proposer name from the who-are-you localStorage entry if it
  // has been set. The user can still overwrite.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("gsl-user-name");
    if (stored && !proposerName) setProposerName(stored);
  }, [proposerName]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.phase === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("playbookSlug", playbookSlug);

    const file = data.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setState({ phase: "error", message: "Pick a file to attach." });
      return;
    }

    setState({ phase: "submitting" });
    try {
      const res = await fetch("/api/standards/upload", {
        method: "POST",
        body: data
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !body.ok) {
        setState({
          phase: "error",
          message:
            body.error ??
            "Upload failed. Check your connection and try again."
        });
        return;
      }
      setState({ phase: "success" });
      form.reset();
    } catch (err) {
      setState({
        phase: "error",
        message: (err as Error).message || "Could not reach the server."
      });
    }
  }

  function resetAndClose() {
    setOpen(false);
    setTimeout(() => setState({ phase: "idle" }), 300);
  }

  const trigger =
    triggerVariant === "subtle" ? (
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full border border-orange-peel/40 bg-white px-3 py-1.5 text-xs font-medium text-azure-blue hover:border-orange-peel hover:bg-orange-peel/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2"
      >
        <Upload className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Upload a new standard</span>
      </button>
    ) : (
      <Button variant="outline">
        <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
        Propose a new standard
      </Button>
    );

  const dialog = (
    <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : resetAndClose())}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Propose a new bar for {playbookTitle}</DialogTitle>
          <DialogDescription>
            Upload a reference file and tell us why it raises the bar. Anish
            and Ritu review weekly and promote the ones that do.
          </DialogDescription>
        </DialogHeader>

        {state.phase === "success" ? (
          <div className="space-y-5 py-4">
            <div className="flex items-start gap-3 rounded-xl border border-turquoise-sea/40 bg-turquoise-sea/5 p-4">
              <CheckCircle2
                className="h-5 w-5 shrink-0 text-turquoise-sea mt-0.5"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <p className="font-display text-base text-azure-blue">
                  Thanks, we have your candidate.
                </p>
                <p className="text-sm text-muted-foreground">
                  Anish and Ritu will review and promote it to the active
                  standard if it raises the bar. You can propose another or
                  close this.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setState({ phase: "idle" })}
              >
                Propose another
              </Button>
              <Button type="button" onClick={resetAndClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5 py-2">
            <FieldRow label="Your name" htmlFor="propose-name">
              <input
                id="propose-name"
                name="proposerName"
                type="text"
                required
                value={proposerName}
                onChange={(e) => setProposerName(e.target.value)}
                placeholder="Priya Sharma"
                className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
              />
            </FieldRow>

            <FieldRow label="Topic" htmlFor="propose-topic">
              <input
                id="propose-topic"
                name="topic"
                type="text"
                required
                placeholder="Building a simple chatbot"
                className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
              />
            </FieldRow>

            <div className="grid grid-cols-2 gap-4">
              <FieldRow label="Grade" htmlFor="propose-grade">
                <input
                  id="propose-grade"
                  name="grade"
                  type="text"
                  required
                  placeholder="Class 6"
                  className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
                />
              </FieldRow>
              <FieldRow label="Programme" htmlFor="propose-programme">
                <select
                  id="propose-programme"
                  name="programme"
                  defaultValue=""
                  className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
                >
                  <option value="">Select a programme</option>
                  <option value="STEM/IIT-G">STEM / IIT-G</option>
                  <option value="Young Pioneers">Young Pioneers (Cambridge)</option>
                  <option value="VideoGenX">VideoGenX</option>
                  <option value="Solevit">Solevit</option>
                  <option value="Harvard Manage Mentor">Harvard Manage Mentor</option>
                  <option value="Talk & Learn">Talk &amp; Learn</option>
                  <option value="CBSE general">CBSE general</option>
                </select>
              </FieldRow>
            </div>

            <FieldRow
              label="Key qualities"
              htmlFor="propose-qualities"
              hint="Three to five short bullets, one per line. What is true about this output that should be true of every future one?"
            >
              <textarea
                id="propose-qualities"
                name="keyQualities"
                rows={5}
                required
                placeholder={"One idea per slide, never crowded\nBloom's level visible on every slide\nAt least three Indian-context examples"}
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
              />
            </FieldRow>

            <FieldRow
              label="Why this is the bar"
              htmlFor="propose-why"
              hint="One short paragraph."
            >
              <textarea
                id="propose-why"
                name="whyThisIsTheBar"
                rows={3}
                required
                placeholder="What makes this output the one we want every future one to match?"
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
              />
            </FieldRow>

            <FieldRow
              label="Reference file"
              htmlFor="propose-file"
              hint="Up to 25 MB. PPTX, DOCX, PDF, MD, TXT, PNG, JPG accepted."
            >
              <input
                id="propose-file"
                name="file"
                type="file"
                required
                accept=".pptx,.docx,.pdf,.md,.txt,.png,.jpg,.jpeg"
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-light-sky file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-azure-blue hover:file:bg-light-sky/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
              />
            </FieldRow>

            {state.phase === "error" ? (
              <div className="flex items-start gap-2 rounded-md border border-difficulty-advanced/30 bg-difficulty-advanced/10 p-3">
                <AlertCircle
                  className="h-4 w-4 shrink-0 text-difficulty-advanced mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-sm text-difficulty-advanced">
                  {state.message}
                </p>
              </div>
            ) : null}

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={resetAndClose}
                disabled={state.phase === "submitting"}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={state.phase === "submitting"}
                className={cn(
                  state.phase === "submitting" && "opacity-80"
                )}
              >
                {state.phase === "submitting" ? "Uploading…" : "Submit for review"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );

  if (triggerOnly) return dialog;

  return (
    <aside className="rounded-2xl border border-border bg-white p-6 space-y-3">
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
      {dialog}
    </aside>
  );
}

function FieldRow({
  label,
  htmlFor,
  hint,
  children
}: {
  label: string;
  htmlFor: string;
  hint?: string;
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
      {hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
