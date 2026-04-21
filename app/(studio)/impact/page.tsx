import Link from "next/link";
import { Users, FileText, School as SchoolIcon, ArrowRight } from "lucide-react";
import {
  getAllOutputs,
  getAllPlaybooks,
  getAssignments,
  getSchools
} from "@/lib/content/loader";

/**
 * /impact, the team dashboard.
 *
 * Three headline numbers (outputs produced, schools reached, students
 * impacted) + top 5 playbooks by usage + top 5 schools by outputs.
 *
 * Numbers compute from:
 *   outputs produced   = getAllOutputs().length
 *   schools reached    = unique school slugs across all output.schools[]
 *   students impacted  = sum of students for those unique schools
 *
 * When no outputs are tagged (the state entering tomorrow's walkthrough),
 * the three big numbers read from the schools.json reach data instead, so
 * there is still a meaningful figure to show. Clearly labelled as "from the
 * MOU system" rather than misrepresenting the team's own output tagging.
 */
function formatIndianNumber(n: number): string {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)} crore`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)} lakh`;
  return n.toLocaleString("en-IN");
}

export default async function ImpactPage() {
  const [outputs, schools, playbooks, weeks] = await Promise.all([
    getAllOutputs(),
    getSchools(),
    getAllPlaybooks(),
    getAssignments()
  ]);

  const published = playbooks.filter(
    (p) => p.frontmatter.status === "published"
  );

  // Unique schools tagged across all outputs.
  const taggedSchoolSlugs = new Set<string>();
  for (const o of outputs) for (const s of o.schools) taggedSchoolSlugs.add(s);

  const schoolsBySlug = new Map(schools.map((s) => [s.slug, s]));

  const taggedStudentsTotal = [...taggedSchoolSlugs].reduce((sum, slug) => {
    const s = schoolsBySlug.get(slug);
    return sum + (s?.students ?? 0);
  }, 0);

  // Fall back to the MOU-system schools reach when no outputs are tagged yet.
  const mouStudentsTotal = schools.reduce((sum, s) => sum + s.students, 0);
  const mouSchoolsCount = schools.filter((s) => s.status === "Active").length;

  const outputsProduced = outputs.length;
  const schoolsReached =
    taggedSchoolSlugs.size > 0 ? taggedSchoolSlugs.size : mouSchoolsCount;
  const studentsImpacted =
    taggedStudentsTotal > 0 ? taggedStudentsTotal : mouStudentsTotal;
  const isSchoolsReachFallback = taggedSchoolSlugs.size === 0;

  // Top playbooks by output count.
  const countsByPlaybook = new Map<string, number>();
  for (const o of outputs) {
    countsByPlaybook.set(
      o.playbookSlug ?? "",
      (countsByPlaybook.get(o.playbookSlug ?? "") ?? 0) + 1
    );
  }
  const topPlaybooks = published
    .map((p) => ({
      slug: p.frontmatter.slug,
      title: p.frontmatter.title,
      icon: p.frontmatter.icon ?? null,
      count: countsByPlaybook.get(p.frontmatter.slug) ?? 0
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Top schools by output count.
  const countsBySchool = new Map<string, number>();
  for (const o of outputs) {
    for (const s of o.schools) {
      countsBySchool.set(s, (countsBySchool.get(s) ?? 0) + 1);
    }
  }
  const topSchools = [...countsBySchool.entries()]
    .map(([slug, count]) => {
      const school = schoolsBySlug.get(slug);
      if (!school) return null;
      return { slug, name: school.name, students: school.students, count };
    })
    .filter((x): x is { slug: string; name: string; students: number; count: number } => x !== null)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Assignments this week: count done items in the most recent week.
  const latestWeek = weeks[0] ?? null;
  const assignmentsDoneThisWeek =
    latestWeek?.assignments.filter((a) => a.status === "done").length ?? 0;
  const assignmentsInFlightThisWeek =
    latestWeek?.assignments.filter((a) => a.status !== "done").length ?? 0;

  return (
    <div className="space-y-12 pb-16">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
          Impact
        </p>
        <h1 className="font-display text-azure-blue">
          What the team is moving.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Team-wide numbers drawn from schools, outputs, and assignments.
          Student reach comes from Active MOUs in the partner data; output
          counts come from the content library.
        </p>
      </header>

      {/* Three headline numbers */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <HeadlineCard
          label="Outputs produced"
          value={outputsProduced.toString()}
          icon={<FileText className="h-5 w-5 text-orange-peel" aria-hidden="true" />}
          note={
            outputsProduced === 0
              ? "The first one lands as soon as a writer drops it into OneDrive"
              : "All outputs across every playbook"
          }
          tone="bg-orange-peel/5 border-orange-peel/40"
        />
        <HeadlineCard
          label={
            isSchoolsReachFallback ? "Schools with Active MOUs" : "Schools reached"
          }
          value={schoolsReached.toString()}
          icon={<SchoolIcon className="h-5 w-5 text-azure-blue" aria-hidden="true" />}
          note={
            isSchoolsReachFallback
              ? "From the MOU system; the tagged-output path starts next"
              : "Unique schools tagged on at least one output"
          }
          tone="bg-turquoise-sea/10 border-turquoise-sea/40"
        />
        <HeadlineCard
          label="Students impacted"
          value={formatIndianNumber(studentsImpacted)}
          icon={<Users className="h-5 w-5 text-fashion-fuchsia" aria-hidden="true" />}
          note={
            isSchoolsReachFallback
              ? "Total students in Active MOUs across all partner schools"
              : "Students in schools the team's outputs have reached"
          }
          tone="bg-light-sky/60 border-azure-blue/20"
        />
      </section>

      {/* Top playbooks / schools */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TopList
          title="Top playbooks by usage"
          empty="No outputs yet. As the team ships, the most-used playbooks rise to the top."
          rows={topPlaybooks.map((p) => ({
            href: `/playbooks/${p.slug}`,
            primary: p.title,
            icon: p.icon,
            count: p.count,
            unitLabel: p.count === 1 ? "output" : "outputs"
          }))}
        />
        <TopList
          title="Top schools by outputs"
          empty="No outputs tagged to schools yet. As writers tag their outputs, this leaderboard populates."
          rows={topSchools.map((s) => ({
            href: `/schools/${s.slug}`,
            primary: s.name,
            secondary: `${formatIndianNumber(s.students)} students`,
            count: s.count,
            unitLabel: s.count === 1 ? "output" : "outputs"
          }))}
        />
      </div>

      {/* This week */}
      <section
        aria-labelledby="this-week-heading"
        className="rounded-2xl border border-border bg-white p-6 md:p-8 space-y-4"
      >
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
            This week
          </p>
          <h2
            id="this-week-heading"
            className="font-display text-xl text-azure-blue"
          >
            {latestWeek ? `Week of ${latestWeek.week_of}` : "No active week"}
          </h2>
        </div>
        {latestWeek ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatBlock label="Assignments done" value={assignmentsDoneThisWeek.toString()} />
            <StatBlock
              label="Assignments in flight"
              value={assignmentsInFlightThisWeek.toString()}
            />
            <StatBlock label="Outputs shipped" value={outputsProduced.toString()} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Add assignments on the{" "}
            <Link
              href="/assignments"
              className="text-azure-blue underline underline-offset-4 hover:decoration-azure-blue"
            >
              Assignments page
            </Link>{" "}
            to start tracking a week.
          </p>
        )}
      </section>
    </div>
  );
}

function HeadlineCard({
  label,
  value,
  icon,
  note,
  tone
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  note: string;
  tone: string;
}) {
  return (
    <div className={`rounded-2xl border ${tone} p-6 space-y-3`}>
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-azure-blue">
          {label}
        </p>
      </div>
      <p className="font-display text-4xl md:text-5xl text-azure-blue">{value}</p>
      <p className="text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

interface TopRow {
  href: string;
  primary: string;
  secondary?: string;
  icon?: string | null;
  count: number;
  unitLabel: string;
}

function TopList({
  title,
  empty,
  rows
}: {
  title: string;
  empty: string;
  rows: TopRow[];
}) {
  return (
    <section className="rounded-2xl border border-border bg-white p-6 md:p-8 space-y-4">
      <h2 className="font-display text-xl text-azure-blue">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ol className="space-y-2">
          {rows.map((r, i) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="group flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 transition-colors hover:border-turquoise-sea hover:bg-light-sky/40"
              >
                <span className="font-display text-sm text-muted-foreground w-5">
                  {i + 1}
                </span>
                {r.icon ? (
                  <span aria-hidden="true" className="text-lg">
                    {r.icon}
                  </span>
                ) : null}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-azure-blue truncate group-hover:underline underline-offset-4">
                    {r.primary}
                  </p>
                  {r.secondary ? (
                    <p className="text-xs text-muted-foreground">
                      {r.secondary}
                    </p>
                  ) : null}
                </div>
                <p className="inline-flex items-baseline gap-1">
                  <span className="font-display text-lg text-azure-blue">
                    {r.count}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {r.unitLabel}
                  </span>
                </p>
                <ArrowRight
                  className="h-3.5 w-3.5 text-muted-foreground group-hover:text-azure-blue"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-light-sky/30 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl text-azure-blue">{value}</p>
    </div>
  );
}
