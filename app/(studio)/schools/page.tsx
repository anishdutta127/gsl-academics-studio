import { SchoolsView } from "@/components/school/schools-view";
import { HeroIllustration } from "@/components/imagery/hero-svg";
import { getSchools } from "@/lib/content/loader";

/**
 * /schools, the directory imported from gsl-mou-system.
 *
 * Impact-framed: the top summary shows total students across the current
 * filter view. Cards lead with the student count, not the MOU count or any
 * money figure (those are intentionally not loaded per the import script).
 *
 * Client-side filters: programme chips, city dropdown, substring search.
 */
export default async function SchoolsPage() {
  const schools = await getSchools();

  return (
    <div className="space-y-10 pb-16">
      <header className="relative rounded-3xl bg-light-sky/40 p-6 md:p-10 md:pr-64 lg:pr-72 overflow-hidden space-y-3">
        <HeroIllustration variant="schools" />
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
          Partners across India
        </p>
        <h1 className="font-display text-azure-blue">Schools</h1>
        <p className="max-w-2xl text-muted-foreground">
          Every school running a GSL programme. Numbers show student impact,
          not revenue. Click a school to see the programmes it runs and the
          content the team has made for it.
        </p>
      </header>

      {schools.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-azure-blue/20 bg-light-sky/25 p-10 text-center space-y-2">
          <h2 className="font-display text-xl text-azure-blue">
            No schools loaded yet.
          </h2>
          <p className="text-sm text-muted-foreground">
            The schools list is imported from the MOU system via{" "}
            <code className="font-mono">
              pnpm exec node scripts/import-schools-from-mou-system.mjs
            </code>
            . Run it from the Studio repo root, then{" "}
            <code className="font-mono">pnpm sync-content</code>.
          </p>
        </div>
      ) : (
        <SchoolsView schools={schools} />
      )}
    </div>
  );
}
