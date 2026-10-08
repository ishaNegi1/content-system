"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage("Content published successfully.");

      setTimeout(() => {
        window.open(
  process.env.NEXT_PUBLIC_WEBSITE_URL!,
  "_blank",
  "noopener,noreferrer"
);
      }, 700);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold">
          Content Publisher
        </h1>

        <p className="mt-2 text-zinc-400">
          Create and publish content.
        </p>

        <form
          onSubmit={handlePublish}
          className="mt-10 space-y-6"
        >
          <div>
            <label className="mb-2 block text-sm">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Enter title"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-zinc-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Enter description"
              rows={6}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-zinc-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>

          {message && (
            <p className="text-sm text-zinc-300">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}