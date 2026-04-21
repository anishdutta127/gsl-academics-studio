"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/";

  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!password.trim() || pending) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/sign-in", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "Something is off. Try again in a minute.");
        setPending(false);
        return;
      }
      router.push(from.startsWith("/") ? from : "/");
      router.refresh();
    } catch {
      setError("Could not reach the Studio. Check your connection.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="space-y-2 text-left">
        <Label htmlFor="password" className="text-azure-blue">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "sign-in-error" : undefined}
          className="h-12 bg-white text-base"
        />
      </div>
      {error ? (
        <p
          id="sign-in-error"
          role="alert"
          className="text-sm text-difficulty-advanced"
        >
          {error}
        </p>
      ) : null}
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full font-display tracking-wide"
      >
        {pending ? "Signing you in…" : "Sign in"}
      </Button>
    </form>
  );
}

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-light-sky/30 px-6 py-16">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-3">
          <h1 className="font-display text-azure-blue">Welcome to the Studio.</h1>
          <p className="text-muted-foreground">
            The easy way to make great teaching materials. Welcome in.
          </p>
        </div>
        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </div>
    </main>
  );
}
