import { ComingSoon } from "@/components/shell/coming-soon";

// Replaced by the real list view in commit 6. Kept here so the sidebar link
// and the home "Or see all playbooks" affordance do not 404 between commits.

export default function PlaybooksPlaceholder() {
  return (
    <ComingSoon
      title="Playbooks list lands in commit 6."
      when="Next commit"
      blurb="A card grid of every playbook, filterable by category and difficulty. The reader page is also in commit 6."
    />
  );
}
