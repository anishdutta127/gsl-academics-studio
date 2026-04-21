import { LibraryView, type LibraryOutput, type SchoolLookup } from "@/components/library/library-view";
import { getAllPlaybooks, getOutputsForPlaybook, getSchools } from "@/lib/content/loader";

/**
 * /library, the content library.
 *
 * Lists every output file the team has shipped through any playbook, across
 * all seven playbook subfolders. Reads either from OneDrive (dev) or from the
 * outputs-manifest.json synced into ./content-synced/ (prod); the loader
 * abstracts both paths.
 *
 * The UI is client-side from here on: filter chips per playbook, a grade
 * dropdown, and a topic/filename substring search. Files themselves live in
 * OneDrive and open via share URLs recorded in meta/output-links.json;
 * outputs without a recorded share URL render the warm "Ask Anish" fallback.
 */
export default async function LibraryPage() {
  const playbooks = await getAllPlaybooks();
  const published = playbooks.filter(
    (p) => p.frontmatter.status === "published"
  );

  // Collect outputs across every published playbook in parallel. Each output
  // is enriched with its playbook title + icon so the client UI can render
  // rich filter chips without re-querying.
  const perPlaybook = await Promise.all(
    published.map(async (p) => {
      const outs = await getOutputsForPlaybook(p.frontmatter.slug);
      return outs.map<LibraryOutput>((o) => ({
        ...o,
        playbookSlug: p.frontmatter.slug,
        playbookTitle: p.frontmatter.title,
        playbookIcon: p.frontmatter.icon ?? null
      }));
    })
  );

  // Sort combined outputs: parseable-by-date-desc first, unparseable last.
  const outputs = perPlaybook.flat().sort((a, b) => {
    if (a.parsed?.date && b.parsed?.date) {
      return b.parsed.date.localeCompare(a.parsed.date);
    }
    if (a.parsed && !b.parsed) return -1;
    if (!a.parsed && b.parsed) return 1;
    return a.filename.localeCompare(b.filename);
  });

  const playbookOptions = published.map((p) => ({
    slug: p.frontmatter.slug,
    title: p.frontmatter.title,
    icon: p.frontmatter.icon ?? null
  }));

  // Pre-resolve school slug -> (name, students) so library cards can render
  // "Used by 3 schools, 340 students" without additional client-side work.
  const schools = await getSchools();
  const schoolsBySlug: Record<string, SchoolLookup> = {};
  for (const s of schools) {
    schoolsBySlug[s.slug] = {
      slug: s.slug,
      name: s.name,
      students: s.students
    };
  }

  return (
    <div className="space-y-10 pb-16">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
          Everything the team has shipped
        </p>
        <h1 className="font-display text-azure-blue">Library</h1>
        <p className="max-w-2xl text-muted-foreground">
          Outputs produced through the playbooks, grouped by playbook and
          filterable by grade. Files live in OneDrive; links open straight
          into the shared folder.
        </p>
      </header>

      <LibraryView
        outputs={outputs}
        playbookOptions={playbookOptions}
        schoolsBySlug={schoolsBySlug}
      />
    </div>
  );
}
