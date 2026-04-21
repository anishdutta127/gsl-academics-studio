"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { School } from "@/lib/content/types";

interface SchoolsViewProps {
  schools: School[];
}

const ALL = "__all__";

function withUsLabel(startDate: string | null | undefined): string | null {
  if (!startDate) return null;
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return null;
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  if (months < 1) return "Just joined";
  if (months < 12) return `With us for ${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  const remainder = months - years * 12;
  if (remainder === 0) {
    return `With us for ${years} year${years === 1 ? "" : "s"}`;
  }
  return `With us for ${years} year${years === 1 ? "" : "s"}`;
}

function formatImpactNumber(n: number): string {
  // Indian-friendly: lakh threshold, else comma-separated integer.
  if (n >= 100000) {
    const lakhs = n / 100000;
    return `${lakhs.toFixed(lakhs >= 10 ? 0 : 1)}L`;
  }
  return n.toLocaleString("en-IN");
}

export function SchoolsView({ schools }: SchoolsViewProps) {
  const [programmeFilter, setProgrammeFilter] = useState<string>(ALL);
  const [cityFilter, setCityFilter] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const programmes = useMemo(() => {
    const set = new Set<string>();
    for (const s of schools) for (const p of s.programmes) set.add(p);
    return [...set].sort();
  }, [schools]);

  const cities = useMemo(() => {
    const set = new Set<string>();
    for (const s of schools) if (s.city) set.add(s.city);
    return [...set].sort();
  }, [schools]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return schools.filter((s) => {
      if (programmeFilter !== ALL && !s.programmes.includes(programmeFilter))
        return false;
      if (cityFilter !== ALL && s.city !== cityFilter) return false;
      if (q) {
        const haystack = [s.name, s.city ?? "", s.state ?? "", ...s.programmes]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [schools, programmeFilter, cityFilter, query]);

  const totalStudents = filtered.reduce((sum, s) => sum + s.students, 0);

  return (
    <div className="space-y-8">
      {/* Top summary */}
      <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-orange-peel/40 bg-orange-peel/5 p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-peel">
            {filtered.length === schools.length
              ? "All schools"
              : `${filtered.length} of ${schools.length} schools`}
          </p>
          <p className="mt-2 font-display text-3xl text-azure-blue">
            {formatImpactNumber(totalStudents)} students reached
          </p>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm">
          Counts students enrolled in active MOUs for the schools in view. Use
          the filters below to narrow by programme or city.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div
          role="search"
          aria-label="Search schools by name, city, state, or programme"
          className="relative max-w-xl"
        >
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, city, state, or programme"
            className="h-11 w-full rounded-full border border-input bg-white pl-10 pr-4 text-sm placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Chip
            label="All programmes"
            active={programmeFilter === ALL}
            onClick={() => setProgrammeFilter(ALL)}
          />
          {programmes.map((p) => (
            <Chip
              key={p}
              label={p}
              active={programmeFilter === p}
              onClick={() => setProgrammeFilter(p)}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label
            htmlFor="school-city-filter"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            City
          </label>
          <select
            id="school-city-filter"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea"
          >
            <option value={ALL}>All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-azure-blue/20 bg-light-sky/25 p-10 text-center space-y-2">
          <h2 className="font-display text-lg text-azure-blue">
            No schools match those filters.
          </h2>
          <button
            type="button"
            onClick={() => {
              setProgrammeFilter(ALL);
              setCityFilter(ALL);
              setQuery("");
            }}
            className="text-sm text-azure-blue underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
          {filtered.map((s) => (
            <SchoolCard key={s.slug} school={s} />
          ))}
        </ul>
      )}
    </div>
  );
}

function SchoolCard({ school }: { school: School }) {
  const withUs = withUsLabel(school.earliest_start_date ?? null);

  return (
    <li>
      <Link
        href={`/schools/${school.slug}`}
        className={cn(
          "group block rounded-2xl border border-border bg-white p-5 transition-all duration-200 ease-out min-h-[190px]",
          "hover:-translate-y-0.5 hover:border-turquoise-sea hover:bg-light-sky/30 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-sea focus-visible:ring-offset-2"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-base text-azure-blue line-clamp-2">
              {school.name}
            </h3>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {school.city ?? "City unknown"}
              {school.state ? `, ${school.state}` : ""}
            </p>
          </div>
          {school.status === "Active" ? (
            <span className="inline-flex items-center rounded-full bg-turquoise-sea/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-azure-blue">
              Active
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Pending
            </span>
          )}
        </div>

        <div className="mt-4 space-y-1">
          <p className="inline-flex items-end gap-1.5">
            <Users
              className="h-4 w-4 text-orange-peel mb-1"
              aria-hidden="true"
            />
            <span className="font-display text-2xl text-azure-blue">
              {school.students > 0 ? formatImpactNumber(school.students) : "—"}
            </span>
            <span className="text-xs text-muted-foreground mb-1">students</span>
          </p>
        </div>

        {school.programmes.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {school.programmes.map((p) => (
              <li
                key={p}
                className="rounded-full bg-light-sky border border-azure-blue/10 px-2.5 py-0.5 text-[11px] text-azure-blue"
              >
                {p}
              </li>
            ))}
          </ul>
        ) : null}

        {withUs ? (
          <p className="mt-4 text-xs text-muted-foreground">{withUs}</p>
        ) : null}
      </Link>
    </li>
  );
}

function Chip({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-turquoise-sea bg-turquoise-sea text-white"
          : "border-border bg-white text-azure-blue hover:bg-light-sky/60"
      )}
    >
      {label}
    </button>
  );
}
