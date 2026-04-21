import Link from "next/link";
import Markdown from "react-markdown";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { AuditStage } from "@/components/playbook/audit-stage";
import { RecentlyViewedUpdater } from "@/components/playbook/recently-viewed-updater";
import { StepsAccordion } from "@/components/playbook/step-accordion";
import { SuggestImprovement } from "@/components/playbook/suggest-improvement";
import { EditInOneDrive } from "@/components/shell/edit-in-onedrive";
import { ProposeNewStandard } from "@/components/standards/propose-new-standard";
import { TheBar } from "@/components/standards/the-bar";
import { TheBarEmpty } from "@/components/standards/the-bar-empty";
import { Badge } from "@/components/ui/badge";
import { getAllPlaybooks, getOutputsForPlaybook, getPlaybook, getSchools } from "@/lib/content/loader";
import { getCurrentStandard } from "@/lib/content/standards";
import { teamReach } from "@/lib/content/impact";
import { PLAYBOOK_SLUGS, type Difficulty, type PlaybookSlug } from "@/lib/content/types";
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

  // Standards System (decision 012). Render TheBar after the hero and
  // ProposeNewStandard at the end of the page. Only mount the bar surface
  // for the seven enumerated playbook slugs; other playbooks (none today)
  // skip the standards UI.
  const isStandardsPlaybook = (PLAYBOOK_SLUGS as readonly string[]).includes(
    fm.slug
  );
  const currentStandard = isStandardsPlaybook
    ? await getCurrentStandard(fm.slug as PlaybookSlug)
    : null;

  // Standards impact: count outputs produced against this playbook's current
  // bar (proxy: all outputs tagged to a programme or school for this
  // playbook slug, since Phase 1 does not track "produced-against-which-bar"
  // explicitly). Programme join is primary; direct school tags are an
  // optional override. Renders on TheBar only when at least one output
  // exists.
  let barImpact:
    | { outputs: number; programmes: number; schools: number; students: number }
    | undefined;
  if (currentStandard) {
    const [outputs, schools] = await Promise.all([
      getOutputsForPlaybook(fm.slug),
      getSchools()
    ]);
    const tagged = outputs.filter(
      (o) => o.programmes.length > 0 || o.schools.length > 0
    );
    const reach = teamReach(tagged, schools);
    barImpact = {
      outputs: tagged.length,
      programmes: reach.uniqueProgrammes,
      schools: reach.uniqueSchools,
      students: reach.studentsImpacted
    };
  }

  return (
    <article className="space-y-12 pb-16">
      <RecentlyViewedUpdater slug={fm.slug} />

      <div className="flex items-center justify-between gap-3">
        <Link
          href="/playbooks"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-azure-blue underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to playbooks
        </Link>
        <EditInOneDrive
          relativePath={`playbooks/${fm.slug}.md`}
          displayName={fm.title}
        />
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

      {/* The Bar (decision 012) */}
      {isStandardsPlaybook ? (
        currentStandard ? (
          <TheBar
            playbookSlug={fm.slug}
            playbookTitle={fm.title}
            standard={currentStandard}
            impact={barImpact}
          />
        ) : (
          <TheBarEmpty playbookSlug={fm.slug} playbookTitle={fm.title} />
        )
      ) : null}

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
          auditTemplate={fm.audit_prompt_template}
          currentStandard={currentStandard}
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

      {isStandardsPlaybook ? (
        <ProposeNewStandard
          playbookSlug={fm.slug}
          playbookTitle={fm.title}
        />
      ) : null}

      <SuggestImprovement
        playbookSlug={fm.slug}
        feedbackUrl={process.env.GSL_FEEDBACK_FORM_URL}
      />
    </article>
  );
}
