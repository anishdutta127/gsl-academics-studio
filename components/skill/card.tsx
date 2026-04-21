import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SkillFrontmatter } from "@/lib/content/types";

interface SkillCardProps {
  skill: Pick<SkillFrontmatter, "slug" | "title" | "category" | "summary" | "status">;
  /**
   * Number of playbooks that reference this skill. Optional. When provided,
   * renders a small meta line so the reader can scan the reach of each skill
   * at a glance.
   */
  referencedByCount?: number;
}

export function SkillCard({ skill, referencedByCount }: SkillCardProps) {
  const { slug, title, category, summary, status } = skill;

  return (
    <Link
      href={`/skills/${slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-white p-6 min-h-[200px] transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-turquoise-sea hover:bg-light-sky/30 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-light-sky text-azure-blue"
        >
          <Layers className="h-5 w-5" />
        </span>
        {status === "draft" ? (
          <Badge variant="amber">Draft</Badge>
        ) : null}
      </div>

      <div className="mt-4 flex-1 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {category}
        </p>
        <h3 className="font-display text-lg text-azure-blue">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{summary}</p>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
        {typeof referencedByCount === "number" && referencedByCount > 0 ? (
          <span>
            Used by {referencedByCount} playbook{referencedByCount === 1 ? "" : "s"}
          </span>
        ) : (
          <span>Reference skill</span>
        )}
        <span className="inline-flex items-center gap-1 text-azure-blue group-hover:underline underline-offset-4">
          Open
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
