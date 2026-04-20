import { HomeContent, type RecentOutputWithContext } from "@/components/shell/home-content";
import { getAllPlaybooks, getOutputsForPlaybook } from "@/lib/content/loader";

export default async function HomePage() {
  const playbooks = await getAllPlaybooks();
  const published = playbooks.filter(
    (p) => p.frontmatter.status === "published"
  );

  // Cross-playbook recent outputs, top 3 by parsed date desc. Runs server-side
  // and serialises cleanly to the client component.
  const outputLists = await Promise.all(
    published.map(async (p) => {
      const outputs = await getOutputsForPlaybook(p.frontmatter.slug);
      return outputs.map(
        (o): RecentOutputWithContext => ({
          ...o,
          playbookSlug: p.frontmatter.slug,
          playbookTitle: p.frontmatter.title
        })
      );
    })
  );
  const recentOutputs = outputLists
    .flat()
    .sort((a, b) => {
      const da = a.parsed?.date ?? "";
      const db = b.parsed?.date ?? "";
      return db.localeCompare(da);
    })
    .slice(0, 3);

  return (
    <HomeContent
      playbooks={published.map((p) => p.frontmatter)}
      recentOutputs={recentOutputs}
    />
  );
}
