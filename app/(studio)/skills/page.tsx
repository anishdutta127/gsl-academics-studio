import { SkillCard } from "@/components/skill/card";
import { getAllPlaybooks, getAllSkills } from "@/lib/content/loader";

/**
 * /skills, the list of every framework the playbooks reference.
 *
 * Published skills render as cards sorted alphabetically by title. Each card
 * shows a referenced-by count computed from the playbook frontmatter's
 * skills_referenced arrays, so the reader can see which skills are load-
 * bearing across the library at a glance.
 *
 * Draft skills are included (marked with a Draft badge) because the brand-
 * voice and ppt-patterns skills are drafts until week 3 and are still useful
 * stubs today.
 */
export default async function SkillsPage() {
  const [skills, playbooks] = await Promise.all([
    getAllSkills(),
    getAllPlaybooks()
  ]);

  const countBySlug = new Map<string, number>();
  for (const p of playbooks) {
    for (const ref of p.frontmatter.skills_referenced) {
      countBySlug.set(ref, (countBySlug.get(ref) ?? 0) + 1);
    }
  }

  return (
    <div className="space-y-10 pb-16">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
          The frameworks behind the playbooks
        </p>
        <h1 className="font-display text-azure-blue">Skills</h1>
        <p className="max-w-2xl text-muted-foreground">
          The pedagogy, brand, and programme standards the playbooks reference.
          Open any skill to read the full text; attach the relevant sections to
          your Claude Project when you are working inside a playbook.
        </p>
      </header>

      {skills.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-azure-blue/20 bg-light-sky/25 p-10 text-center space-y-2">
          <h2 className="font-display text-xl text-azure-blue">
            No skills yet.
          </h2>
          <p className="text-sm text-muted-foreground">
            Add a markdown file to <code className="font-mono">Acads/studio/skills/</code> in OneDrive, then run <code className="font-mono">pnpm sync-content</code>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8">
          {skills.map((skill) => (
            <SkillCard
              key={skill.frontmatter.slug}
              skill={skill.frontmatter}
              referencedByCount={countBySlug.get(skill.frontmatter.slug) ?? 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
