export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-zinc-950 text-white overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/5 blur-3xl" />

      <div className="relative flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border-2 border-zinc-800" />
          <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-purple-500" />
        </div>

        <p className="text-sm font-medium text-zinc-500">
          Loading content...
        </p>
      </div>
    </main>
  );
}