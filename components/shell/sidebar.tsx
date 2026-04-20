"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Home,
  Layers,
  Library,
  School,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  comingSoon?: string;
}

const NAV: NavItem[] = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/playbooks", label: "Playbooks", Icon: BookOpen },
  { href: "/skills", label: "Skills", Icon: Layers, comingSoon: "week 3" },
  { href: "/library", label: "Library", Icon: Library, comingSoon: "week 2" },
  { href: "/schools", label: "Schools", Icon: School, comingSoon: "week 3" },
  {
    href: "/assignments",
    label: "Assignments",
    Icon: Users,
    comingSoon: "week 3"
  }
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-56 lg:w-64 shrink-0 flex-col border-r border-border bg-white">
      <div className="px-5 py-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-lg text-azure-blue"
          aria-label="GSL Academics Studio, home"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-turquoise-sea"
          >
            <span className="h-3 w-3 rounded-full bg-azure-blue" />
          </span>
          <span>Studio</span>
        </Link>
      </div>

      <nav aria-label="Primary" className="flex-1 px-3 pb-6 space-y-1">
        {NAV.map(({ href, label, Icon, comingSoon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative",
                active
                  ? "bg-turquoise-sea/15 text-azure-blue font-medium"
                  : "text-muted-foreground hover:bg-light-sky/40 hover:text-azure-blue"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  active ? "text-azure-blue" : "text-muted-foreground"
                )}
              />
              <span>{label}</span>
              {comingSoon ? (
                <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground/70">
                  {comingSoon}
                </span>
              ) : null}
              {active ? (
                <span
                  aria-hidden="true"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-fashion-fuchsia"
                />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
