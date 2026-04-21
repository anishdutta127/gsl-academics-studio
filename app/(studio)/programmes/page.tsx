import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroIllustration } from "@/components/imagery/hero-svg";
import {
  getAllOutputs,
  getProgrammes,
  getSchools
} from "@/lib/content/loader";
import { programmeImpact } from "@/lib/content/impact";

/**
 * /programmes, the GSL programme index.
 *
 * Six programme cards, each colour-coded per programmes.json, each showing
 * schools-enrolled / students-reached / outputs-produced computed from the
 * current schools.json + output-links.json.
 */

const COLOUR_CLASSES: Record<string, string> = {
  "turquoise-sea": "bg-turquoise-sea text-white border-turquoise-sea",
  "azure-blue": "bg-azure-blue text-white border-azure-blue",
  "orange-peel": "bg-orange-peel text-azure-blue border-orange-peel",
  "light-sky": "bg-light-sky text-azure-blue border-azure-blue/20",
  "fashion-fuchsia": "bg-fashion-fuchsia text-white border-fashion-fuchsia"
};

export default async function ProgrammesIndexPage() {
  const [programmes, schools, outputs] = await Promise.all([
    getProgrammes(),
    getSchools(),
    getAllOutputs()
  ]);

  const impacts = programmeImpact(
    programmes.map((p) => p.slug),
    outputs,
    schools
  );

  const rows = programmes.map((p) => {
    const impact = impacts.find((i) => i.slug === p.slug)!;
    return { ...p, impact };
  });
  rows.sort((a, b) => b.impact.studentCount - a.impact.studentCount);

  return (
    <div className="space-y-10 pb-16">
      <header className="relative rounded-3xl bg-light-sky/40 p-6 md:p-10 md:pr-56 lg:pr-60 overflow-hidden space-y-3">
        <HeroIllustration variant="programmes" />
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
          The six programmes
        </p>
        <h1 className="font-display text-azure-blue">Programmes</h1>
        <p className="max-w-2xl text-muted-foreground">
          What GSL runs. Each programme enrols a set of schools, and the
          team&apos;s outputs flow to every school in the programme by default.
          Click a programme to see its schools and the content made for it.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {rows.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/programmes/${p.slug}`}
              className={`group block rounded-2xl border p-6 min-h-[220px] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2 ${
                COLOUR_CLASSES[p.colour] ?? "bg-white text-azure-blue border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] opacity-80">
                    {p.partner ? `With ${p.partner}` : "GSL original"}
                  </p>
                  <p className="font-display text-xl">{p.name}</p>
                </div>
                <ArrowRight
                  className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-3 text-sm opacity-90 line-clamp-3">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-2">
                <div>
                  <p className="font-display text-3xl leading-none">
                    {p.impact.studentCount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs opacity-80">students</p>
                </div>
                <div>
                  <p className="font-display text-2xl leading-none">
                    {p.impact.schoolCount}
                  </p>
                  <p className="text-xs opacity-80">
                    school{p.impact.schoolCount === 1 ? "" : "s"}
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl leading-none">
                    {p.impact.outputCount}
                  </p>
                  <p className="text-xs opacity-80">
                    output{p.impact.outputCount === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
