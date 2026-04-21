import { StandardSummaryCard } from "@/components/standards/standard-summary-card";
import { getAllPlaybooks } from "@/lib/content/loader";
import { getCurrentStandard } from "@/lib/content/standards";
import { PLAYBOOK_SLUGS, PLAYBOOK_TITLES } from "@/lib/content/types";

export default async function StandardsPage() {
  // Build a slug → title map: prefer the live playbook frontmatter title
  // when the file exists, fall back to PLAYBOOK_TITLES otherwise.
  const playbooks = await getAllPlaybooks();
  const titleBySlug = new Map<string, string>();
  for (const p of playbooks) titleBySlug.set(p.frontmatter.slug, p.frontmatter.title);

  // Resolve the current standard for each of the seven slugs in parallel.
  const standards = await Promise.all(
    PLAYBOOK_SLUGS.map(async (slug) => ({
      slug,
      title: titleBySlug.get(slug) ?? PLAYBOOK_TITLES[slug],
      standard: await getCurrentStandard(slug)
    }))
  );

  const setCount = standards.filter((s) => s.standard !== null).length;

  return (
    <div className="space-y-10 pb-16">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
          The bar, right now
        </p>
        <h1 className="font-display text-azure-blue">
          This is what good looks like.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Each playbook has a current standard, the reference output we have
          agreed represents excellence. The bar evolves as the team produces
          better work. Propose a new bar from any playbook page.
        </p>
        {setCount === 0 ? (
          <p className="text-sm text-muted-foreground">
            No bars set yet. The first great output from any playbook lands
            here.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {setCount} of {PLAYBOOK_SLUGS.length} bars set.
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8">
        {standards.map(({ slug, title, standard }) => (
          <StandardSummaryCard
            key={slug}
            playbookSlug={slug}
            playbookTitle={title}
            standard={standard}
          />
        ))}
      </div>
    </div>
  );
}
