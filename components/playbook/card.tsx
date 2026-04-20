import Link from "next/link";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Difficulty, PlaybookFrontmatter } from "@/lib/content/types";

interface PlaybookCardProps {
  playbook: Pick<
    PlaybookFrontmatter,
    | "slug"
    | "title"
    | "icon"
    | "category"
    | "what_youll_make"
    | "time_needed"
    | "difficulty"
  >;
  /**
   * "compact" is the default: list-view + home Pick-up card. Shows icon, title,
   * time, difficulty, two-line what-you'll-make optional.
   * "featured" is taller, used on the home empty-state "Start with one of these"
   * grid. More breathing room, what-you'll-make always visible.
   */
  variant?: "compact" | "featured";
  /** Optional meta-line rendered under the title ("Opened 2d ago" etc). */
  meta?: string;
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  gentle: "Gentle",
  standard: "Standard",
  advanced: "Advanced"
};

const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  gentle: "bg-light-sky text-azure-blue",
  standard: "bg-turquoise-sea text-white",
  advanced: "bg-orange-peel text-azure-blue"
};

export function PlaybookCard({
  playbook,
  variant = "compact",
  meta
}: PlaybookCardProps) {
  const { slug, title, icon, what_youll_make, time_needed, difficulty } =
    playbook;

  return (
    <Link
      href={`/playbooks/${slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-light-sky/40 transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-turquoise-sea hover:bg-light-sky/60 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2",
        variant === "featured" ? "p-6 min-h-[200px]" : "p-5 min-h-[160px]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center rounded-xl bg-white/80 text-2xl",
            variant === "featured" ? "h-12 w-12" : "h-10 w-10"
          )}
        >
          {icon ?? "•"}
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            DIFFICULTY_CLASS[difficulty]
          )}
        >
          {DIFFICULTY_LABEL[difficulty]}
        </span>
      </div>

      <div className="mt-4 flex-1 space-y-2">
        <h3
          className={cn(
            "font-display text-azure-blue",
            variant === "featured" ? "text-xl" : "text-lg"
          )}
        >
          {title}
        </h3>
        {variant === "featured" || what_youll_make ? (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {what_youll_make}
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {time_needed}
        </span>
        {meta ? <span>{meta}</span> : null}
      </div>
    </Link>
  );
}
