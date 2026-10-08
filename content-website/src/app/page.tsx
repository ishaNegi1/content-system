import { getContent } from "@/lib/content";

export default async function Home() {
  const content = await getContent();

  if (!content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            No published content
          </h1>

          <p className="mt-3 text-zinc-400">
            Publish some content to display it here.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <article className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm uppercase tracking-widest text-zinc-500">
          Published Content
        </p>

        <h1 className="text-5xl font-bold">
          {content.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-300">
          {content.description}
        </p>
      </article>
    </main>
  );
}