"use client";

import { useEffect } from "react";
import { rememberViewed } from "@/components/shell/recently-viewed";
import { recordTaskStartedOnce } from "@/components/shell/efficiency-pill";

/**
 * Marks this playbook as recently viewed AND increments the efficiency-pill
 * "tasks started" counter (deduped per slug per session so reloads do not
 * inflate the number). Mount once on the reader page.
 */
export function RecentlyViewedUpdater({ slug }: { slug: string }) {
  useEffect(() => {
    rememberViewed(slug);
    recordTaskStartedOnce(slug);
  }, [slug]);
  return null;
}
