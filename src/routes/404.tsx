import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [
      { title: "404 — Aurexo" },
      { name: "description", content: "The page you're looking for doesn't exist." },
    ],
  }),
  component: NotFound,
});

function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-[10rem] leading-none font-extrabold text-ink">404</p>
      <h1 className="-mt-4 text-2xl font-bold text-ink">This page took a wrong turn.</h1>
      <p className="mt-2 text-sm text-muted-foreground">The URL you followed isn't on the map. Let's get you back to safer roads.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Go home</Link>
        <Link to="/buy" className="rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-ink">Browse cars</Link>
      </div>
    </main>
  );
}
