import { Sparkles } from "lucide-react";
import { ProposeNewStandard } from "@/components/standards/propose-new-standard";

interface TheBarEmptyProps {
  /** Used only for aria-labelling so multiple empty bars on /standards
   *  do not collide. */
  playbookSlug: string;
  playbookTitle: string;
}

export function TheBarEmpty({ playbookSlug, playbookTitle }: TheBarEmptyProps) {
  return (
    <section
      aria-labelledby={`bar-${playbookSlug}-empty-heading`}
      className="rounded-2xl border border-dashed border-azure-blue/20 bg-light-sky/30 p-6 md:p-8 space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>The bar, not yet set</span>
        </div>
        <ProposeNewStandard
          playbookSlug={playbookSlug}
          playbookTitle={playbookTitle}
          triggerOnly
          triggerVariant="subtle"
        />
      </div>
      <h2
        id={`bar-${playbookSlug}-empty-heading`}
        className="font-display text-xl text-azure-blue"
      >
        No bar yet for {playbookTitle}.
      </h2>
      <p className="text-sm text-muted-foreground max-w-prose">
        The first great output from this playbook becomes our standard. Make
        something good, then upload it with a rationale. Anish and Ritu
        review weekly and promote the ones that raise the bar.
      </p>
    </section>
  );
}
