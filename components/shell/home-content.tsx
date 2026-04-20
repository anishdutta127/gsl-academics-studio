"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { PlaybookCard } from "@/components/playbook/card";
import { HomeHero } from "@/components/shell/hero";
import { readRecentlyViewed, type RecentEntry } from "@/components/shell/recently-viewed";
import type {
  DiscoveredOutput,
  PlaybookFrontmatter
} from "@/lib/content/types";

export interface RecentOutputWithContext extends DiscoveredOutput {
  playbookSlug: string;
  playbookTitle: string;
}

interface HomeContentProps {
  playbooks: PlaybookFrontmatter[];
  recentOutputs: RecentOutputWithContext[];
}

function relativeDaysAgo(ms: number): string {
  const diff = Date.now() - ms;
  const day = 24 * 60 * 60 * 1000;
  if (diff < day) return "today";
  if (diff < 2 * day) return "1 day ago";
  const days = Math.floor(diff / day);
  return `${days} days ago`;
}

export function HomeContent({ playbooks, recentOutputs }: HomeContentProps) {
  const [mounted, setMounted] = useState(false);
  const [recent, setRecent] = useState<RecentEntry[]>([]);

  useEffect(() => {
    setRecent(readRecentlyViewed());
    setMounted(true);
  }, []);

  const playbookBySlug = useMemo(() => {
    const m = new Map<string, PlaybookFrontmatter>();
    for (const p of playbooks) m.set(p.slug, p);
    return m;
  }, [playbooks]);

  const pickUp = recent
    .map((entry) => {
      const p = playbookBySlug.get(entry.slug);
      if (!p) return null;
      return { entry, playbook: p };
    })
    .filter((x): x is { entry: RecentEntry; playbook: PlaybookFrontmatter } => x !== null);

  // Decision from design review Pass 1: show the editorial featured grid only
  // when both pick-up AND recent outputs are empty. Otherwise render the
  // workspace layout (pick-up + recent outputs).
  //
  // We do not render the featured grid before hydration because it would
  // flash for users who DO have a pick-up list. Render nothing for that
  // section until mounted.
  const showFeatured = mounted && pickUp.length === 0 && recentOutputs.length === 0;
  const showPickUp = mounted && pickUp.length > 0;
  const showRecent = recentOutputs.length > 0;

  return (
    <div className="space-y-12 pb-16">
      <HomeHero />

      {showPickUp ? (
        <section aria-labelledby="pick-up-heading" className="space-y-5">
          <h2
            id="pick-up-heading"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
          >
            Pick up where you left off
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pickUp.map(({ entry, playbook }) => (
              <PlaybookCard
                key={playbook.slug}
                playbook={playbook}
                meta={`Last worked ${relativeDaysAgo(entry.lastOpenedAt)}`}
              />
            ))}
          </div>
        </section>
      ) : null}

      {showFeatured ? (
        <section aria-labelledby="featured-heading" className="space-y-5">
          <div className="space-y-1">
            <h2
              id="featured-heading"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
            >
              Start with one of these
            </h2>
            <p className="text-sm text-muted-foreground">
              Every playbook is a guided procedure. Open any one and follow the steps.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {playbooks.map((playbook) => (
              <PlaybookCard key={playbook.slug} playbook={playbook} variant="featured" />
            ))}
          </div>
          {playbooks.length > 0 ? (
            <Link
              href="/playbooks"
              className="inline-block text-sm text-azure-blue underline-offset-4 hover:underline"
            >
              Or see all playbooks →
            </Link>
          ) : (
            <p className="text-sm text-muted-foreground">
              No playbooks yet. Run <code className="font-mono">pnpm sync-content</code> to pull them in.
            </p>
          )}
        </section>
      ) : null}

      {showRecent ? (
        <section aria-labelledby="recent-heading" className="space-y-5">
          <h2
            id="recent-heading"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
          >
            Recent outputs
          </h2>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-white">
            {recentOutputs.map((output) => (
              <li key={output.relativePath} className="flex items-center gap-4 px-5 py-4">
                <FileText className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-azure-blue truncate">
                    {output.parsed?.topic ?? output.filename}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    From {output.playbookTitle}
                    {output.parsed?.date ? ` · ${output.parsed.date}` : null}
                  </p>
                </div>
                {output.shareUrl ? (
                  <a
                    href={output.shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-azure-blue underline-offset-4 hover:underline"
                  >
                    Open
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">Ask Anish for the link</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {!mounted && !showRecent && playbooks.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-border bg-white p-8 text-center space-y-2">
          <h2 className="font-display text-xl text-azure-blue">
            Nothing here yet.
          </h2>
          <p className="text-sm text-muted-foreground">
            Seed some playbooks into OneDrive and run{" "}
            <code className="font-mono">pnpm sync-content</code>.
          </p>
        </section>
      ) : null}
    </div>
  );
}
