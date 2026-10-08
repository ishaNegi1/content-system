import { getContent } from "@/lib/content";

export default async function Home() {
  const content = await getContent();

  if (!content) {
    return (
      <main className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white overflow-hidden">
        {/* Background gradient */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-800/30 blur-3xl" />

        <div className="relative animate-fade-in text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            No published content yet
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-base text-zinc-500">
            Content published from the publisher app will appear here automatically.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-60 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-purple-600/8 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* Top badge */}
        <div className="animate-fade-in mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Published
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-slide-up text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {content.title}
        </h1>

        {/* Divider */}
        <div className="animate-fade-in my-8 h-px bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" style={{ animationDelay: "0.2s" }} />

        {/* Description */}
        <div
          className="animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          <p className="text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9 whitespace-pre-wrap">
            {content.description}
          </p>
        </div>

        {/* Footer meta */}
        <div
          className="animate-fade-in mt-12 flex items-center gap-3 text-sm text-zinc-600"
          style={{ animationDelay: "0.3s" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Published {new Date(content._createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </main>
  );
}