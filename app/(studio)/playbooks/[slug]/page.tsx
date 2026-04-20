import Link from "next/link";
import Markdown from "react-markdown";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { AuditStage } from "@/components/playbook/audit-stage";
import { RecentlyViewedUpdater } from "@/components/playbook/recently-viewed-updater";
import { StepsAccordion } from "@/components/playbook/step-accordion";
import { SuggestImprovement } from "@/components/playbook/suggest-improvement";
import { Badge } from "@/components/ui/badge";
import { getAllPlaybooks, getPlaybook } from "@/lib/content/loader";
import type { Difficulty } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const all = await getAllPlaybooks();
  return all.map((p) => ({ slug: p.frontmatter.slug }));
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

export default async function PlaybookReaderPage({
  params
}: {
  params: { slug: string };
}) {
  const playbook = await getPlaybook(params.slug);
  if (!playbook) notFound();
  const fm = playbook.frontmatter;

  return (
    <article className="space-y-12 pb-16">
      <RecentlyViewedUpdater slug={fm.slug} />

      <div>
        <Link
          href="/playbooks"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-azure-blue underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to playbooks
        </Link>
      </div>

      {/* Hero */}
      <header className="rounded-3xl bg-light-sky/50 p-6 md:p-10 space-y-6">
        <div className="flex items-start gap-4">
          <span className="text-4xl md:text-5xl" aria-hidden="true">
            {fm.icon ?? "•"}
          </span>
          <div className="flex-1 min-w-0 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {fm.category}
            </p>
            <h1 className="font-display text-azure-blue">{fm.title}</h1>
            <p className="text-lg text-foreground max-w-3xl">
              {fm.what_youll_make}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {fm.time_needed}
          </Badge>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
              DIFFICULTY_CLASS[fm.difficulty]
            )}
          >
            {DIFFICULTY_LABEL[fm.difficulty]}
          </span>
          {fm.programme ? <Badge variant="light">{fm.programme}</Badge> : null}
          {fm.status === "draft" ? (
            <Badge variant="amber">Draft</Badge>
          ) : null}
        </div>
      </header>

      {/* Use this when */}
      <section aria-labelledby="use-when-heading" className="space-y-4">
        <h2
          id="use-when-heading"
          className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
        >
          Use this when
        </h2>
        <div className="prose-gsl max-w-2xl">
          <Markdown>{fm.use_when}</Markdown>
        </div>
      </section>

      {/* Before you start */}
      {fm.before_you_start.length > 0 ? (
        <section aria-labelledby="before-heading" className="space-y-4">
          <h2
            id="before-heading"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
          >
            Before you start
          </h2>
          <ul className="max-w-2xl space-y-2">
            {fm.before_you_start.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-foreground"
              >
                <span
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-turquoise-sea"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Steps */}
      <section aria-labelledby="steps-heading" className="space-y-5">
        <h2
          id="steps-heading"
          className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
        >
          The steps
        </h2>
        <StepsAccordion playbookSlug={fm.slug} steps={fm.steps} />
      </section>

      {/* Audit Stage */}
      {fm.audit_prompt_template ? (
        <AuditStage
          playbookSlug={fm.slug}
          playbookTitle={fm.title}
          auditPrompt={fm.audit_prompt_template}
        />
      ) : null}

      {/* Common pitfalls */}
      {fm.common_pitfalls ? (
        <section aria-labelledby="pitfalls-heading" className="space-y-4">
          <h2
            id="pitfalls-heading"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
          >
            Common pitfalls
          </h2>
          <div className="prose-gsl max-w-2xl">
            <Markdown>{fm.common_pitfalls}</Markdown>
          </div>
        </section>
      ) : null}

      <SuggestImprovement
        playbookSlug={fm.slug}
        feedbackUrl={process.env.GSL_FEEDBACK_FORM_URL}
      />
    </article>
  );
}
