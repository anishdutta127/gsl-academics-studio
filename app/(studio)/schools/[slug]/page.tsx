import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAllOutputs, getProgrammes, getSchools } from "@/lib/content/loader";
import { outputsReachingSchool } from "@/lib/content/impact";
import type { School } from "@/lib/content/types";

export async function generateStaticParams() {
  const schools = await getSchools();
  return schools.map((s) => ({ slug: s.slug }));
}

function formatImpactNumber(n: number): string {
  if (n >= 100000) {
    const lakhs = n / 100000;
    return `${lakhs.toFixed(lakhs >= 10 ? 0 : 1)}L`;
  }
  return n.toLocaleString("en-IN");
}

function relativeYears(startDate: string | null | undefined): string | null {
  if (!startDate) return null;
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return null;
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  if (months < 1) return "Just joined";
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"}`;
}

function formatTopic(raw: string): string {
  const spaced = raw.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function formatGrade(raw: string): string {
  const m = /^class-(\d+)$/.exec(raw);
  if (m) return `Class ${Number(m[1])}`;
  return raw.replace(/-/g, " ");
}

export default async function SchoolDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const [schools, allOutputs, programmes] = await Promise.all([
    getSchools(),
    getAllOutputs(),
    getProgrammes()
  ]);
  const school: School | undefined = schools.find((s) => s.slug === params.slug);
  if (!school) notFound();

  const withUs = relativeYears(school.earliest_start_date ?? null);

  // Outputs reaching this school: either tagged to a programme this school
  // is enrolled in, or directly tagged to this school.
  const taggedOutputs = outputsReachingSchool(school, allOutputs);
  const programmesBySlug = new Map(programmes.map((p) => [p.slug, p]));

  return (
    <article className="space-y-10 pb-16">
      <div>
        <Link
          href="/schools"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-azure-blue underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All schools
        </Link>
      </div>

      <header className="rounded-3xl bg-light-sky/50 p-6 md:p-10 space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {school.city ?? "City unknown"}
            {school.state ? `, ${school.state}` : ""}
          </p>
          <h1 className="font-display text-azure-blue">{school.name}</h1>
        </div>

        <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Student impact
            </p>
            <p className="mt-1 font-display text-4xl text-azure-blue inline-flex items-baseline gap-2">
              <Users className="h-6 w-6 text-orange-peel" aria-hidden="true" />
              {school.students > 0 ? formatImpactNumber(school.students) : "—"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Across active MOUs
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Programmes
            </p>
            <p className="mt-1 font-display text-2xl text-azure-blue">
              {school.programmes.length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {school.programmes
                .map((slug) => programmesBySlug.get(slug)?.name ?? slug)
                .join(", ") || "None active"}
            </p>
          </div>

          {withUs ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                With us for
              </p>
              <p className="mt-1 font-display text-2xl text-azure-blue">
                {withUs}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Since {school.earliest_start_date}
              </p>
            </div>
          ) : null}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Status
            </p>
            <p className="mt-1 font-display text-2xl text-azure-blue">
              {school.status ?? "—"}
            </p>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="school-content-heading"
        className="rounded-2xl border border-border bg-white p-6 md:p-8 space-y-5"
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
            Content made for this school
          </p>
          <h2
            id="school-content-heading"
            className="font-display text-xl text-azure-blue"
          >
            {taggedOutputs.length === 0
              ? "Nothing tagged to this school yet."
              : `${taggedOutputs.length} output${taggedOutputs.length === 1 ? "" : "s"} tagged to this school.`}
          </h2>
          {taggedOutputs.length === 0 ? (
            <p className="text-sm text-muted-foreground max-w-prose">
              When an output passes its audit and a writer tags it to this
              school in <code className="font-mono">meta/output-links.json</code>,
              it will appear here with the playbook badge and date.
            </p>
          ) : null}
        </div>

        {taggedOutputs.length > 0 ? (
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {taggedOutputs.map((o) => {
              const topic = o.parsed?.topic ? formatTopic(o.parsed.topic) : o.filename;
              const grade = o.parsed?.grade ? formatGrade(o.parsed.grade) : null;
              return (
                <li
                  key={o.relativePath}
                  className="rounded-xl border border-border bg-white p-4 space-y-2"
                >
                  <div className="flex items-start gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{o.parsed?.ext?.toUpperCase() ?? "FILE"}</span>
                  </div>
                  <p className="font-display text-sm text-azure-blue line-clamp-2">
                    {topic}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {grade ? <Badge variant="light">{grade}</Badge> : null}
                    {o.parsed?.date ? (
                      <span className="text-xs text-muted-foreground">
                        {o.parsed.date}
                      </span>
                    ) : null}
                  </div>
                  {o.shareUrl ? (
                    <a
                      href={o.shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-azure-blue hover:underline underline-offset-4"
                    >
                      Open
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Share link not recorded
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>

      <section
        aria-labelledby="school-team-heading"
        className="rounded-2xl border border-border bg-white p-6 md:p-8 space-y-3"
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
            People on this school
          </p>
          <h2
            id="school-team-heading"
            className="font-display text-xl text-azure-blue"
          >
            Coming with the Assignments dashboard.
          </h2>
          <p className="text-sm text-muted-foreground max-w-prose">
            Once writers, designers, and reviewers are tagged against
            assignments in <code className="font-mono">meta/assignments.json</code>,
            this block lists who has worked on materials for this school.
          </p>
        </div>
      </section>
    </article>
  );
}
