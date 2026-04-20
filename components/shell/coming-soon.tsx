import Link from "next/link";

interface ComingSoonProps {
  title: string;
  when: string;
  blurb: string;
}

export function ComingSoon({ title, when, blurb }: ComingSoonProps) {
  return (
    <main className="py-10">
      <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {when}
        </p>
        <h1 className="font-display text-azure-blue">{title}</h1>
        <p className="mx-auto max-w-lg text-muted-foreground">{blurb}</p>
        <div>
          <Link
            href="/"
            className="inline-block text-sm text-azure-blue underline-offset-4 hover:underline"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
