"use client";

import { useEffect } from "react";
import { rememberViewed } from "@/components/shell/recently-viewed";

/**
 * Marks this playbook as recently viewed. Mount once on the reader page.
 * The home Pick-up-where-you-left-off list reads from the same localStorage key.
 */
export function RecentlyViewedUpdater({ slug }: { slug: string }) {
  useEffect(() => {
    rememberViewed(slug);
  }, [slug]);
  return null;
}
