"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function TopNav() {
  const [initials, setInitials] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const read = () => {
      const name = window.localStorage.getItem("gsl-user-name");
      setInitials(name ? initialsFrom(name) : null);
    };
    read();
    // Listen for updates from the WhoAreYouPrompt, so the avatar appears
    // immediately after the user saves their name.
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-4 md:px-6">
      <div className="flex-1 max-w-md">
        <div
          className="relative"
          role="search"
          aria-label="Global search (coming soon)"
        >
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            disabled
            placeholder="Search playbooks, skills, past outputs…"
            className="h-10 w-full rounded-md border border-input bg-muted/50 pl-9 pr-3 text-sm placeholder:text-muted-foreground/70 cursor-not-allowed"
            aria-disabled="true"
          />
        </div>
      </div>

      <div
        aria-hidden={initials ? undefined : true}
        className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-light-sky text-azure-blue font-display text-sm"
        title={initials ? "You" : undefined}
      >
        {initials ?? ""}
      </div>
    </header>
  );
}
