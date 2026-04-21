import { AssignmentsBoard } from "@/components/assignments/board";
import {
  getAllPlaybooks,
  getAssignments,
  getSchools
} from "@/lib/content/loader";

/**
 * /assignments, the weekly kanban.
 *
 * Current implementation: loads the current assignments.json from OneDrive
 * (or content-synced in prod) as the seed, then the client component
 * mirrors into localStorage on every mutation and POSTs a copy to
 * /api/assignments/save which stages it in Vercel Blob. Anish promotes to
 * OneDrive manually per the session-3 pattern.
 *
 * Next step (Phase 2): the page reads the latest staged Blob if present,
 * so the kanban reflects intra-week mutations without a manual OneDrive
 * promotion.
 */
export default async function AssignmentsPage() {
  const [weeks, playbooks, schools] = await Promise.all([
    getAssignments(),
    getAllPlaybooks(),
    getSchools()
  ]);

  const playbookOptions = playbooks
    .filter((p) => p.frontmatter.status === "published")
    .map((p) => ({
      slug: p.frontmatter.slug,
      title: p.frontmatter.title,
      icon: p.frontmatter.icon ?? null
    }));

  const schoolOptions = schools.map((s) => ({
    slug: s.slug,
    name: s.name
  }));

  return (
    <div className="space-y-10 pb-16">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
          Who is making what this week
        </p>
        <h1 className="font-display text-azure-blue">Assignments</h1>
        <p className="max-w-2xl text-muted-foreground">
          Weekly kanban. Move cards between columns as work progresses. Add a
          new assignment with the button on the right; changes save to
          staging and sync to OneDrive on Anish&apos;s weekly pass.
        </p>
      </header>

      <AssignmentsBoard
        initialWeeks={weeks}
        playbookOptions={playbookOptions}
        schoolOptions={schoolOptions}
      />
    </div>
  );
}
