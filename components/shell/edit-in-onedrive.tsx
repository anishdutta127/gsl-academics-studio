"use client";

import { useState } from "react";
import { Check, Copy, Pencil } from "lucide-react";
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

interface EditInOneDriveProps {
  /** Relative path within the OneDrive studio folder, e.g.
   *  "playbooks/teaching-ppt.md" or "skills/pedagogy-foundations.md".
   *  Leading slash optional; normalised internally. */
  relativePath: string;
  /** Human-friendly label for the dialog heading, e.g. the skill title. */
  displayName: string;
  /** Visual variant for the trigger. "subtle" keeps the button small and
   *  secondary-feeling on content pages. */
  variant?: "subtle" | "default";
}

/**
 * Small "Edit in OneDrive" affordance used on content detail pages.
 *
 * We intentionally do not try to open a file:// URL: browsers block it when
 * the page is served over http(s), and success is unreliable across Windows
 * installs. Instead, the button opens a warm dialog with the full OneDrive
 * path rendered as copy-clickable text. The team member pastes it into
 * Windows File Explorer (or navigates to the same file in OneDrive web) and
 * edits there. OneDrive's own sync handles the rest; Anish promotes to
 * production on the weekly pass.
 */
export function EditInOneDrive({
  relativePath,
  displayName,
  variant = "subtle"
}: EditInOneDriveProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const clean = relativePath.replace(/^\/+/, "");
  const windowsPath = `OneDrive - MAF TECHNOLOGIES PRIVATE LIMITED\\Acads\\studio\\${clean.replace(/\//g, "\\")}`;
  const webPath = `OneDrive > Acads > studio > ${clean.split("/").join(" > ")}`;

  async function copyPath() {
    try {
      await navigator.clipboard.writeText(windowsPath);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* swallow */
    }
  }

  const trigger =
    variant === "subtle" ? (
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full border border-azure-blue/20 bg-white px-3 py-1.5 text-xs font-medium text-azure-blue hover:bg-light-sky transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2"
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
        Edit in OneDrive
      </button>
    ) : (
      <Button variant="outline">
        <Pencil className="h-4 w-4 mr-2" aria-hidden="true" />
        Edit in OneDrive
      </Button>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {displayName} in OneDrive</DialogTitle>
          <DialogDescription>
            Open the file in OneDrive (desktop sync or OneDrive web). Changes
            sync automatically. Ping Anish on WhatsApp when you are happy and
            he will publish.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-azure-blue">
              Windows path
            </p>
            <div className="relative">
              <pre className="rounded-md border border-border bg-cream p-3 pr-14 text-xs font-mono whitespace-pre-wrap break-all">
                {windowsPath}
              </pre>
              <button
                type="button"
                onClick={copyPath}
                aria-label="Copy the path"
                className={cn(
                  "absolute top-2 right-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-2.5 py-1 text-xs font-medium hover:bg-light-sky transition-colors",
                  copied && "text-turquoise-sea border-turquoise-sea"
                )}
              >
                {copied ? (
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
            <p className="text-xs text-muted-foreground">
              Paste this into the Windows File Explorer address bar, press
              Enter, then open the file in your editor of choice.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-azure-blue">
              OneDrive web path
            </p>
            <pre className="rounded-md border border-border bg-cream p-3 text-xs font-mono whitespace-pre-wrap break-words">
              {webPath}
            </pre>
            <p className="text-xs text-muted-foreground">
              Or navigate to it in OneDrive web at{" "}
              <a
                href="https://onedrive.live.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-azure-blue underline underline-offset-4"
              >
                onedrive.live.com
              </a>
              .
            </p>
          </div>

          <div className="rounded-md border border-orange-peel/30 bg-orange-peel/10 p-3 text-sm text-azure-blue">
            Your edits sync automatically. When you are happy, ping Anish on
            WhatsApp and he will publish them.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
