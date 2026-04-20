import { TheBar } from "@/components/standards/the-bar";
import { TheBarEmpty } from "@/components/standards/the-bar-empty";
import { ProposeNewStandard } from "@/components/standards/propose-new-standard";
import type { LoadedCurrentStandard } from "@/lib/content/types";

/**
 * /dev/standards: storybook-style isolated test route. Mounts each Standards
 * UI component with mock data so we can eyeball the populated and empty
 * states without first authoring real OneDrive standards content.
 *
 * Stays gated by the password middleware like every other studio route.
 * Safe to leave in production; useful for design QA.
 */

const MOCK_POPULATED: LoadedCurrentStandard = {
  rationale: {
    set_by: "Ritu Sharma",
    set_on: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    topic: "Building a simple chatbot",
    grade: "Class 6",
    programme: "STEM/IIT-G",
    reference_filename: "reference.pptx"
  },
  bodyMarkdown: `## Key qualities

- One idea per slide, never crowded
- Bloom's level visible on every content slide
- At least three Indian-context examples (Priya's chatbot, Pune's traffic helper, Ananya's homework assistant)
- Non-example shown beside every core concept
- Constructive learning prompt every 4 slides

## Why this is the bar

Priya's deck on chatbot basics is the cleanest example of the playbook
working as intended. The slide structure follows Gagné's events without
ever feeling forced; each Bloom's chip is honest (no "Apply" stuck on a
recall slide); the non-examples make the concept boundary crisp; and the
"Try this with your neighbour" prompts every four slides are real
constructive moments, not cosmetic.

The Pune traffic helper example, in particular, lands because it is a
specific Indian scenario kids can picture, not a generic "small business"
abstraction. Match this level of concreteness in every future deck.`,
  referencePath: "standards/teaching-ppt/current/reference.pptx",
  shareUrl:
    "https://maftechnologies-my.sharepoint.com/personal/example/_layouts/15/onedrive.aspx?id=mock"
};

const MOCK_NO_LINK: LoadedCurrentStandard = {
  ...MOCK_POPULATED,
  shareUrl: null
};

export default function DevStandardsPage() {
  return (
    <div className="space-y-12 pb-16">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Dev / preview
        </p>
        <h1 className="font-display text-azure-blue">Standards components</h1>
        <p className="text-muted-foreground max-w-2xl">
          Isolated previews of the Standards UI components against mock data.
          Used for design QA only. The real components mount on each
          playbook page once Ritu sets a current bar.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          TheBar, populated, with share URL
        </h2>
        <TheBar
          playbookSlug="teaching-ppt"
          playbookTitle="Teaching Material PPT Builder"
          standard={MOCK_POPULATED}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          TheBar, populated, no share URL recorded yet
        </h2>
        <TheBar
          playbookSlug="lesson-plan"
          playbookTitle="Lesson Plan Builder"
          standard={MOCK_NO_LINK}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          TheBarEmpty
        </h2>
        <TheBarEmpty
          playbookSlug="assessment"
          playbookTitle="Assessment Builder"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          ProposeNewStandard
        </h2>
        <ProposeNewStandard
          playbookSlug="teaching-ppt"
          playbookTitle="Teaching Material PPT Builder"
        />
      </section>
    </div>
  );
}
