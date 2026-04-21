import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  MapPin,
  School as SchoolIcon,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  getAllOutputs,
  getAllPlaybooks,
  getProgrammes,
  getSchools
} from "@/lib/content/loader";

export async function generateStaticParams() {
  const programmes = await getProgrammes();
  return programmes.map((p) => ({ slug: p.slug }));
}

function formatIndianNumber(n: number): string {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)} crore`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)} lakh`;
  return n.toLocaleString("en-IN");
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

const HERO_TONE: Record<string, string> = {
  "turquoise-sea": "bg-turquoise-sea text-white",
  "azure-blue": "bg-azure-blue text-white",
  "orange-peel": "bg-orange-peel text-azure-blue",
  "light-sky": "bg-light-sky text-azure-blue",
  "fashion-fuchsia": "bg-fashion-fuchsia text-white"
};

export default async function ProgrammeDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const [programmes, schools, outputs, playbooks] = await Promise.all([
    getProgrammes(),
    getSchools(),
    getAllOutputs(),
    getAllPlaybooks()
  ]);

  const programme = programmes.find((p) => p.slug === params.slug);
  if (!programme) notFound();

  const programmeSchools = schools.filter((s) =>
    s.programmes.includes(programme.slug)
  );
  const programmeOutputs = outputs.filter((o) =>
    o.programmes.includes(programme.slug)
  );
  const studentsReached = programmeSchools.reduce(
    (sum, s) => sum + s.students,
    0
  );
  const playbooksBySlug = new Map(
    playbooks.map((p) => [p.frontmatter.slug, p.frontmatter])
  );

  return (
    <article className="space-y-10 pb-16">
      <div>
        <Link
          href="/programmes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-azure-blue underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All programmes
        </Link>
      </div>

      <header
        className={`rounded-3xl p-6 md:p-10 space-y-6 ${
          HERO_TONE[programme.colour] ?? "bg-light-sky text-azure-blue"
        }`}
      >
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] opacity-85">
            {programme.partner ? `With ${programme.partner}` : "GSL original"}
          </p>
          <h1 className="font-display">{programme.name}</h1>
          <p className="text-lg max-w-3xl opacity-95">{programme.description}</p>
        </div>

        <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
          <Stat
            label="Students reached"
            big={formatIndianNumber(studentsReached)}
            note="Across Active MOUs"
          />
          <Stat
            label="Schools enrolled"
            big={programmeSchools.length.toString()}
            note={programmeSchools.length === 1 ? "school" : "schools"}
          />
          <Stat
            label="Outputs produced"
            big={programmeOutputs.length.toString()}
            note="Through GSL playbooks"
          />
        </div>
      </header>

      <section
        aria-labelledby="programme-schools-heading"
        className="space-y-5"
      >
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
            Schools in this programme
          </p>
          <h2
            id="programme-schools-heading"
            className="font-display text-xl text-azure-blue"
          >
            {programmeSchools.length === 0
              ? "No schools enrolled yet."
              : `${programmeSchools.length} school${programmeSchools.length === 1 ? "" : "s"}`}
          </h2>
        </div>

        {programmeSchools.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programmeSchools.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/schools/${s.slug}`}
                  className="group block rounded-2xl border border-border bg-white p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-turquoise-sea hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2"
                >
                  <h3 className="font-display text-base text-azure-blue line-clamp-2">
                    {s.name}
                  </h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {s.city ?? "City unknown"}
                    {s.state ? `, ${s.state}` : ""}
                  </p>
                  <p className="mt-3 inline-flex items-end gap-1.5">
                    <Users
                      className="h-4 w-4 text-orange-peel mb-1"
                      aria-hidden="true"
                    />
                    <span className="font-display text-2xl text-azure-blue">
                      {s.students > 0 ? s.students.toLocaleString("en-IN") : "0"}
                    </span>
                    <span className="text-xs text-muted-foreground mb-1">
                      students
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section
        aria-labelledby="programme-outputs-heading"
        className="rounded-2xl border border-border bg-white p-6 md:p-8 space-y-5"
      >
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
            Outputs for {programme.name}
          </p>
          <h2
            id="programme-outputs-heading"
            className="font-display text-xl text-azure-blue"
          >
            {programmeOutputs.length === 0
              ? "Nothing tagged to this programme yet."
              : `${programmeOutputs.length} output${programmeOutputs.length === 1 ? "" : "s"}`}
          </h2>
          {programmeOutputs.length === 0 ? (
            <p className="text-sm text-muted-foreground max-w-prose">
              When a writer passes the Audit Stage and tags the output to this
              programme in <code className="font-mono">meta/output-links.json</code>,
              it lands here. Every output tagged to this programme reaches all{" "}
              {programmeSchools.length} school
              {programmeSchools.length === 1 ? "" : "s"} above.
            </p>
          ) : null}
        </div>

        {programmeOutputs.length > 0 ? (
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {programmeOutputs.map((o) => {
              const topic = o.parsed?.topic
                ? formatTopic(o.parsed.topic)
                : o.filename;
              const grade = o.parsed?.grade ? formatGrade(o.parsed.grade) : null;
              const playbook = playbooksBySlug.get((o as { playbookSlug?: string }).playbookSlug ?? "");
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
                    {playbook ? (
                      <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        {playbook.icon ? (
                          <span aria-hidden="true">{playbook.icon}</span>
                        ) : null}
                        {playbook.title}
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
    </article>
  );
}

function Stat({
  label,
  big,
  note
}: {
  label: string;
  big: string;
  note: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl leading-none">{big}</p>
      <p className="mt-1 text-xs opacity-80">{note}</p>
    </div>
  );
}
