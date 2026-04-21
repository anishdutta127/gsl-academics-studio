"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, HeartHandshake, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ContributeToSkillProps {
  skillSlug: string;
  skillTitle: string;
  /** When true, frames the prompt around helping WRITE a stub skill. When
   *  false (default), frames it around CONTRIBUTING to a published skill. */
  isStub?: boolean;
}

type SubmitState =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "success" }
  | { phase: "error"; message: string };

export function ContributeToSkill({
  skillSlug,
  skillTitle,
  isStub
}: ContributeToSkillProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<SubmitState>({ phase: "idle" });
  const [proposerName, setProposerName] = useState("");

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
    data.set("skillSlug", skillSlug);

    const file = data.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setState({ phase: "error", message: "Pick a file to attach." });
      return;
    }

    setState({ phase: "submitting" });
    try {
      const res = await fetch("/api/skills/upload", {
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

  const asideTone = isStub
    ? "border-orange-peel/40 bg-orange-peel/10"
    : "border-border bg-white";

  const heading = isStub
    ? `Help us write ${skillTitle}`
    : `Contribute to ${skillTitle}`;
  const blurb = isStub
    ? "This skill is a stub today. If you have a draft, a few rules you use, or a reference doc we can build from, upload it here."
    : "Have a draft, a revision, or a reference doc that would improve this skill? Upload it here. Anish will merge accepted contributions into the canonical skill.";
  const triggerLabel = isStub ? "Contribute a draft" : "Contribute a file";

  return (
    <aside className={`rounded-2xl border p-6 space-y-3 ${asideTone}`}>
      <div className="flex items-center gap-2">
        <HeartHandshake
          className="h-4 w-4 text-orange-peel"
          aria-hidden="true"
        />
        <p className="text-xs font-semibold uppercase tracking-wider text-azure-blue">
          {isStub ? "Help wanted" : "Make it better"}
        </p>
      </div>
      <h3 className="font-display text-lg text-azure-blue">{heading}</h3>
      <p className="text-sm text-muted-foreground">{blurb}</p>

      <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : resetAndClose())}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
            {triggerLabel}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
            <DialogDescription>
              Upload a file (markdown, PDF, txt, or docx) and tell us what it
              adds. Anish reviews and merges.
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
                    Thanks, we have your contribution.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Anish will review and merge the useful bits into the
                    canonical skill. You can contribute another or close this.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setState({ phase: "idle" })}
                >
                  Contribute another
                </Button>
                <Button type="button" onClick={resetAndClose}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5 py-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="contrib-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-azure-blue"
                >
                  Your name
                </label>
                <input
                  id="contrib-name"
                  name="proposerName"
                  type="text"
                  required
                  value={proposerName}
                  onChange={(e) => setProposerName(e.target.value)}
                  placeholder="Priya Sharma"
                  className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contrib-purpose"
                  className="block text-xs font-semibold uppercase tracking-wider text-azure-blue"
                >
                  What this adds
                </label>
                <textarea
                  id="contrib-purpose"
                  name="purpose"
                  rows={3}
                  required
                  placeholder={
                    isStub
                      ? "I have the brand-voice notes Ritu wrote last quarter, covering tone and the British-English quick-reference."
                      : "A new section on 5E lesson design the team started using."
                  }
                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
                />
                <p className="text-xs text-muted-foreground">
                  One to two sentences. What does this contribute to the skill?
                </p>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contrib-file"
                  className="block text-xs font-semibold uppercase tracking-wider text-azure-blue"
                >
                  File
                </label>
                <input
                  id="contrib-file"
                  name="file"
                  type="file"
                  required
                  accept=".md,.txt,.pdf,.docx"
                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-light-sky file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-azure-blue hover:file:bg-light-sky/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
                />
                <p className="text-xs text-muted-foreground">
                  Up to 10 MB. Markdown, text, PDF, or DOCX.
                </p>
              </div>

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
                >
                  {state.phase === "submitting" ? "Uploading…" : "Submit"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </aside>
  );
}
