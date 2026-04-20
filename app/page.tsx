export default function HomePage() {
  // Replaced in commit 5 by the real home with hero, pick-up, and featured playbooks.
  return (
    <main className="min-h-screen flex items-center justify-center bg-light-sky/30 px-6">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="font-display text-azure-blue">GSL Academics Studio</h1>
        <p className="text-muted-foreground">
          A place for the work the Academics team does, set out as carefully as
          the work itself.
        </p>
        <p className="text-sm text-muted-foreground">
          Scaffold in place. Real home page lands in commit 5.
        </p>
      </div>
    </main>
  );
}
