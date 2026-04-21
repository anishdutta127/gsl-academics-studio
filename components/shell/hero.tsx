"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

function timeOfDayGreeting(name: string): string {
  // Pass 1 of design review: specific warm copy per window. Reads client
  // clock in the user's Asia/Kolkata context by construction (internal team).
  const hour = new Date().getHours();
  if (hour < 12) {
    return `Good morning, ${name}. What are we making today?`;
  }
  if (hour < 17) {
    return `Good afternoon, ${name}. What are we working on?`;
  }
  return `Welcome back, ${name}. Let's pick up where we left off.`;
}

function fallbackGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning. What are we making today?";
  if (hour < 17) return "Good afternoon. What are we working on?";
  return "Welcome back. Let's pick up where we left off.";
}

export function HomeHero() {
  const [greeting, setGreeting] = useState<string>(fallbackGreeting());

  useEffect(() => {
    const name = window.localStorage.getItem("gsl-user-name");
    setGreeting(name ? timeOfDayGreeting(name) : fallbackGreeting());
  }, []);

  return (
    <section className="rounded-3xl bg-light-sky/50 px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center space-y-6">
        <h1 className="font-display text-azure-blue">{greeting}</h1>
        <div className="relative mx-auto max-w-xl">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            disabled
            placeholder="Search playbooks, skills, past outputs…"
            aria-label="Global search, coming soon"
            aria-disabled="true"
            className="h-14 w-full rounded-full border border-input bg-white pl-12 pr-4 text-base placeholder:text-muted-foreground/70 cursor-not-allowed"
          />
        </div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Search lands in week 4
        </p>
      </div>
    </section>
  );
}
