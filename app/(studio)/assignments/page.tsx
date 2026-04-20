import { ComingSoon } from "@/components/shell/coming-soon";

export default function AssignmentsPage() {
  return (
    <ComingSoon
      title="Weekly assignments land in week 3."
      when="Week 3"
      blurb="Who is making what this week. Ritu edits meta/assignments.json in OneDrive on Monday, the dashboard picks it up after pnpm sync-content."
    />
  );
}
