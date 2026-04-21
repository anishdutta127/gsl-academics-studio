"use client";

import { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";
import { recordActivity } from "@/components/shell/efficiency-pill";
import { cn } from "@/lib/utils";

interface PromptBlockProps {
  /** Raw prompt body, preserved verbatim. May contain [VARIABLE] markers. */
  children: string;
  /** Invoked after a successful clipboard write. Used by step accordions to
   *  record a copy_event in localStorage for the Pick-up list. */
  onCopied?: () => void;
  /** Visual treatment: "prompt" is the cream-on-amber prompt block, "audit"
   *  is a slightly lighter Light Sky treatment for the Audit Stage. */
  tone?: "prompt" | "audit";
  /** Accessible label for the copy button. */
  copyLabel?: string;
}

const VARIABLE_RE = /(\[[A-Z0-9 _/-]+\])/g;

/**
 * Splits the prompt text into plain spans and highlighted [VARIABLE] spans so
 * the amber-bg highlight lands on the bracketed tokens the user has to fill in.
 */
function renderWithVariables(text: string): React.ReactNode {
  const parts = text.split(VARIABLE_RE);
  return parts.map((part, i) => {
    if (VARIABLE_RE.test(part)) {
      // reset stateful regex
      VARIABLE_RE.lastIndex = 0;
      return (
        <mark
          key={i}
          className="bg-amber-highlight text-azure-blue rounded px-1 py-0.5"
        >
          {part}
        </mark>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function PromptBlock({
  children,
  onCopied,
  tone = "prompt",
  copyLabel = "Copy the prompt"
}: PromptBlockProps) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children);
      setState("copied");
      recordActivity("prompt_copied");
      onCopied?.();
      setTimeout(() => setState("idle"), 1800);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2400);
    }
  }, [children, onCopied]);

  const containerTone =
    tone === "audit"
      ? "bg-light-sky/60 border-light-sky"
      : "bg-cream border-amber-highlight";

  return (
    <div
      className={cn(
        "relative rounded-xl border p-5 pr-16 font-mono text-sm leading-relaxed",
        containerTone
      )}
    >
      <pre className="whitespace-pre-wrap break-words m-0">
        {renderWithVariables(children)}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copyLabel}
        className={cn(
          "absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
          "bg-white border border-border hover:bg-light-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2",
          state === "copied" && "text-turquoise-sea border-turquoise-sea",
          state === "error" && "text-difficulty-advanced border-difficulty-advanced"
        )}
      >
        {state === "copied" ? (
          <>
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Copied
          </>
        ) : state === "error" ? (
          <>Copy failed</>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            Copy
          </>
        )}
      </button>
    </div>
  );
}
