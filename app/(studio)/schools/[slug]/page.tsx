import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Users } from "lucide-react";
import { getSchools } from "@/lib/content/loader";
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

export default async function SchoolDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const schools = await getSchools();
  const school: School | undefined = schools.find((s) => s.slug === params.slug);
  if (!school) notFound();

  const withUs = relativeYears(school.earliest_start_date ?? null);

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
              {school.programmes.join(", ") || "None active"}
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
        className="rounded-2xl border border-border bg-white p-6 md:p-8 space-y-3"
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
            Content made for this school
          </p>
          <h2
            id="school-content-heading"
            className="font-display text-xl text-azure-blue"
          >
            Nothing tagged to this school yet.
          </h2>
          <p className="text-sm text-muted-foreground max-w-prose">
            When an output passes its audit and a writer tags it to this
            school in <code className="font-mono">meta/output-links.json</code>,
            it will appear here with the playbook badge and date. The tagging
            UI ships alongside the library in a later commit.
          </p>
        </div>
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
