"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * One-time localStorage prompt asking the user what to call them. Used for
 * attribution on assignment cards and for pre-filling the feedback form.
 * Not authentication, just a friendly handle that stays on this device.
 *
 * Skipped on the sign-in page. Mounted once in the root layout.
 */

export function WhoAreYouPrompt() {
  // Two-step mount so the dialog never flashes during the first render while
  // localStorage is being read.
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname === "/sign-in") {
      setMounted(true);
      return;
    }
    const existing = window.localStorage.getItem("gsl-user-name");
    if (!existing) setIsOpen(true);
    setMounted(true);
  }, []);

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    window.localStorage.setItem("gsl-user-name", trimmed);
    setIsOpen(false);
  }

  if (!mounted || !isOpen) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="who-are-you-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-azure-blue/25 backdrop-blur-sm p-4"
    >
      <form
        onSubmit={save}
        className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="space-y-2">
          <h2
            id="who-are-you-title"
            className="font-display text-2xl text-azure-blue"
          >
            What shall we call you?
          </h2>
          <p className="text-sm text-muted-foreground">
            Just a name so the Studio knows who you are. Stays on this device.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="user-name" className="sr-only">
            Your name
          </Label>
          <Input
            id="user-name"
            autoFocus
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Priya"
            className="h-11 text-base"
          />
        </div>
        <Button type="submit" disabled={!name.trim()} className="w-full h-11">
          Okay
        </Button>
      </form>
    </div>
  );
}
