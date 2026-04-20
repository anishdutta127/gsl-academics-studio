import { PlaybookCard } from "@/components/playbook/card";
import { getAllPlaybooks } from "@/lib/content/loader";

export default async function PlaybooksListPage() {
  const playbooks = await getAllPlaybooks();
  const published = playbooks.filter(
    (p) => p.frontmatter.status === "published"
  );

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-display text-azure-blue">Playbooks</h1>
        <p className="max-w-2xl text-muted-foreground">
          Guided procedures for every content task. Pick one, follow the
          steps, come out the other side.
        </p>
      </header>

      {published.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center space-y-2">
          <h2 className="font-display text-xl text-azure-blue">
            Nothing to show yet.
          </h2>
          <p className="text-sm text-muted-foreground">
            Seed some playbooks into OneDrive and run{" "}
            <code className="font-mono">pnpm sync-content</code>, then come back.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {published.map((p) => (
            <PlaybookCard key={p.frontmatter.slug} playbook={p.frontmatter} />
          ))}
        </div>
      )}
    </div>
  );
}
