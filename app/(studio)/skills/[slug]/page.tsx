import Link from "next/link";
import Markdown from "react-markdown";
import { notFound } from "next/navigation";
import { ArrowLeft, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContributeToSkill } from "@/components/skill/contribute-to-skill";
import { getAllPlaybooks, getAllSkills, getSkill } from "@/lib/content/loader";

export async function generateStaticParams() {
  const all = await getAllSkills();
  return all.map((s) => ({ slug: s.frontmatter.slug }));
}

/**
 * /skills/[slug], full body of one framework.
 *
 * Hero carries title + category + summary. Body renders the markdown with
 * prose-gsl typography. A "Referenced by" block at the bottom lists every
 * playbook whose frontmatter cites this skill, so the reader can jump to the
 * playbook where the framework is applied in practice.
 */
export default async function SkillDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const skill = await getSkill(params.slug);
  if (!skill) notFound();

  const allPlaybooks = await getAllPlaybooks();
  const referencedBy = allPlaybooks.filter((p) =>
    p.frontmatter.skills_referenced.includes(skill.frontmatter.slug)
  );

  const fm = skill.frontmatter;

  return (
    <article className="space-y-12 pb-16">
      <div>
        <Link
          href="/skills"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-azure-blue underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to skills
        </Link>
      </div>

      <header className="rounded-3xl bg-light-sky/50 p-6 md:p-10 space-y-6">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-azure-blue"
          >
            <Layers className="h-6 w-6" />
          </span>
          <div className="flex-1 min-w-0 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {fm.category}
            </p>
            <h1 className="font-display text-azure-blue">{fm.title}</h1>
            <p className="text-lg text-foreground max-w-3xl">{fm.summary}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {fm.status === "draft" ? <Badge variant="amber">Draft</Badge> : null}
          {fm.last_edited_by ? (
            <Badge variant="outline">
              Last edited by {fm.last_edited_by}
              {fm.last_edited_at ? ` · ${fm.last_edited_at}` : ""}
            </Badge>
          ) : null}
        </div>
      </header>

      <section className="prose-gsl max-w-3xl">
        <Markdown>{skill.body}</Markdown>
      </section>

      <ContributeToSkill
        skillSlug={fm.slug}
        skillTitle={fm.title}
        isStub={fm.status === "draft"}
      />

      <section
        aria-labelledby="referenced-by-heading"
        className="rounded-2xl border border-border bg-white p-6 md:p-8 space-y-5"
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
            Referenced by
          </p>
          <h2
            id="referenced-by-heading"
            className="font-display text-xl text-azure-blue"
          >
            {referencedBy.length === 0
              ? "No playbook cites this skill yet."
              : `${referencedBy.length} playbook${referencedBy.length === 1 ? "" : "s"} cite${referencedBy.length === 1 ? "s" : ""} this skill.`}
          </h2>
        </div>

        {referencedBy.length > 0 ? (
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {referencedBy.map((p) => (
              <li key={p.frontmatter.slug}>
                <Link
                  href={`/playbooks/${p.frontmatter.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-white p-4 transition-colors hover:border-turquoise-sea hover:bg-light-sky/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
                >
                  <span className="text-xl" aria-hidden="true">
                    {p.frontmatter.icon ?? "•"}
                  </span>
                  <span className="flex-1 min-w-0 space-y-0.5">
                    <span className="block text-sm font-medium text-azure-blue group-hover:underline underline-offset-4">
                      {p.frontmatter.title}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {p.frontmatter.category}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            A playbook cites a skill via its <code className="font-mono">skills_referenced</code> frontmatter array. When a playbook is authored that references this skill, it will appear here.
          </p>
        )}
      </section>
    </article>
  );
}
