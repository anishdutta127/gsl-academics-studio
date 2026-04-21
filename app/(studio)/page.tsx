import { HomeContent, type RecentOutputWithContext } from "@/components/shell/home-content";
import type { BentoProps } from "@/components/shell/bento";
import {
  getAllPlaybooks,
  getAssignments,
  getOutputsForPlaybook,
  getSchools
} from "@/lib/content/loader";

export default async function HomePage() {
  const [playbooks, schools, assignmentWeeks] = await Promise.all([
    getAllPlaybooks(),
    getSchools(),
    getAssignments()
  ]);
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

  // Bento stats, computed server-side and passed down so the Fraunces numbers
  // land without a client-render flash.
  const latestWeek = assignmentWeeks[0] ?? null;
  const bento: BentoProps = {
    reach: {
      students: schools.reduce((sum, s) => sum + s.students, 0),
      schools: schools.filter((s) => s.status === "Active").length
    },
    craft: {
      publishedPlaybooks: published.length
    },
    thisWeek: {
      inFlight:
        latestWeek?.assignments.filter((a) => a.status !== "done").length ?? 0,
      weekOf: latestWeek?.week_of ?? null
    }
  };

  return (
    <HomeContent
      playbooks={published.map((p) => p.frontmatter)}
      recentOutputs={recentOutputs}
      bento={bento}
    />
  );
}
