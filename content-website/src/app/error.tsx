"use client";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">
      <h1 className="text-2xl font-bold">
        Unable to load content
      </h1>

      <p className="mt-2 text-zinc-400">
        Something went wrong while loading the page.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-white px-5 py-2 text-black"
      >
        Try again
      </button>
    </main>
  );
}