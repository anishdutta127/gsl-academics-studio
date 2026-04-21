"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface BentoProps {
  reach: {
    students: number;
    schools: number;
  };
  craft: {
    publishedPlaybooks: number;
  };
  thisWeek: {
    inFlight: number;
    weekOf: string | null;
  };
}

function formatIndianNumber(n: number): string {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)} crore`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)} lakh`;
  return n.toLocaleString("en-IN");
}

export function Bento({ reach, craft, thisWeek }: BentoProps) {
  return (
    <section
      aria-labelledby="bento-heading"
      className="space-y-3"
    >
      <h2
        id="bento-heading"
        className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground"
      >
        The team, at a glance
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 md:[grid-template-rows:auto_auto] lg:grid-cols-3 lg:gap-6">
        {/* Reach, large, spans two columns on desktop */}
        <ReachCard reach={reach} />

        {/* Craft */}
        <CraftCard publishedPlaybooks={craft.publishedPlaybooks} />

        {/* This week */}
        <ThisWeekCard inFlight={thisWeek.inFlight} weekOf={thisWeek.weekOf} />

        {/* Your activity, client-only localStorage mirror */}
        <YourActivityCard />
      </div>
    </section>
  );
}

function ReachCard({ reach }: { reach: BentoProps["reach"] }) {
  return (
    <Link
      href="/impact"
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl p-6 md:p-7 lg:p-8 md:col-span-2 min-h-[200px]",
        "bg-turquoise-sea text-white",
        "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white">
            <Users className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/85">
            Our reach
          </p>
        </div>
        <ArrowUpRight
          className="h-4 w-4 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>

      <div className="space-y-1">
        <p className="font-display text-5xl md:text-6xl leading-none">
          {formatIndianNumber(reach.students)}
        </p>
        <p className="text-sm md:text-base text-white/85">
          students across {reach.schools} school{reach.schools === 1 ? "" : "s"}
        </p>
      </div>
    </Link>
  );
}

function CraftCard({ publishedPlaybooks }: { publishedPlaybooks: number }) {
  return (
    <Link
      href="/playbooks"
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl p-6 min-h-[200px]",
        "bg-light-sky text-azure-blue",
        "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 text-azure-blue">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-azure-blue/80">
            Our craft
          </p>
        </div>
        <ArrowUpRight
          className="h-4 w-4 text-azure-blue/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-1">
        <p className="font-display text-4xl md:text-5xl leading-none">
          {publishedPlaybooks}
        </p>
        <p className="text-sm text-azure-blue/80">
          playbook{publishedPlaybooks === 1 ? "" : "s"} ready to use
        </p>
      </div>
    </Link>
  );
}

function ThisWeekCard({
  inFlight,
  weekOf
}: {
  inFlight: number;
  weekOf: string | null;
}) {
  return (
    <Link
      href="/assignments"
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl p-6 min-h-[200px]",
        "bg-orange-peel text-azure-blue",
        "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/60 text-azure-blue">
            <Calendar className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-azure-blue/80">
            This week
          </p>
        </div>
        <ArrowUpRight
          className="h-4 w-4 text-azure-blue/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-1">
        <p className="font-display text-4xl md:text-5xl leading-none">{inFlight}</p>
        <p className="text-sm text-azure-blue/80">
          task{inFlight === 1 ? "" : "s"} in flight
          {weekOf ? ` · week of ${weekOf}` : ""}
        </p>
      </div>
    </Link>
  );
}

function readCount(key: string): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(key);
  if (!raw) return 0;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

function YourActivityCard() {
  const [stats, setStats] = useState({ tasks: 0, prompts: 0, audits: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const read = () =>
      setStats({
        tasks: readCount("gsl-tasks-started"),
        prompts: readCount("gsl-prompts-copied"),
        audits: readCount("gsl-audits-passed")
      });
    read();
    setMounted(true);
    const onStorage = () => read();
    const onLocal = () => read();
    window.addEventListener("storage", onStorage);
    window.addEventListener("gsl-activity", onLocal);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("gsl-activity", onLocal);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-2xl p-6 min-h-[200px]",
        "bg-fashion-fuchsia/8 border border-fashion-fuchsia/25 text-azure-blue"
      )}
      title="Your Studio activity. Resets if you clear browser data."
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 text-fashion-fuchsia">
            <Activity className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-azure-blue/80">
            Your activity
          </p>
        </div>
      </div>
      <dl className="grid grid-cols-3 gap-3">
        <ActivityStat label="started" value={mounted ? stats.tasks : 0} />
        <ActivityStat label="copied" value={mounted ? stats.prompts : 0} />
        <ActivityStat label="passed" value={mounted ? stats.audits : 0} />
      </dl>
    </div>
  );
}

function ActivityStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-0.5">
      <dt className="text-[10px] uppercase tracking-wider text-azure-blue/60">
        {label}
      </dt>
      <dd className="font-display text-3xl md:text-4xl leading-none text-azure-blue">
        {value}
      </dd>
    </div>
  );
}
