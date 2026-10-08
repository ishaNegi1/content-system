"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");

  async function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setIsError(false);
    setWebsiteUrl("");

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

      setMessage("Content published successfully!");
      setWebsiteUrl(process.env.NEXT_PUBLIC_WEBSITE_URL!);
      setTitle("");
      setDescription("");
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = title.trim() && description.trim() && !loading;

  return (
    <main className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12 sm:py-20">
        {/* Header */}
        <header className="animate-fade-in">
          <div className="mb-1 flex items-center gap-2.5">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              Publisher
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Create Content
          </h1>

          <p className="mt-2 text-base text-zinc-400">
            Write and publish content to the website instantly.
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handlePublish}
          className="animate-slide-up mt-10 flex flex-col gap-6"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Title field */}
          <div className="group">
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Give your content a title"
              required
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all duration-200 focus:border-purple-500/50 focus:bg-zinc-900 focus:ring-1 focus:ring-purple-500/25"
            />
          </div>

          {/* Description field */}
          <div className="group">
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Write your content here..."
              rows={7}
              required
              className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all duration-200 focus:border-purple-500/50 focus:bg-zinc-900 focus:ring-1 focus:ring-purple-500/25"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={!canSubmit}
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-200 hover:shadow-purple-500/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  Publish
                </>
              )}
            </button>

            {title.trim() || description.trim() ? (
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setMessage("");
                  setWebsiteUrl("");
                  setIsError(false);
                }}
                className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
              >
                Clear form
              </button>
            ) : null}
          </div>
        </form>

        {/* Success / Error feedback */}
        {message && (
          <div
            className={`animate-fade-in mt-8 rounded-xl border p-4 ${
              isError
                ? "border-red-500/30 bg-red-500/10"
                : "border-emerald-500/30 bg-emerald-500/10"
            }`}
          >
            <div className="flex items-start gap-3">
              {isError ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}

              <div className="flex-1">
                <p className={`text-sm font-medium ${isError ? "text-red-300" : "text-emerald-300"}`}>
                  {message}
                </p>

                {websiteUrl && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                  >
                    View on Content Website
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}