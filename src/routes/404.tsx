import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [
      { title: "Page not found — Top Coat Auto Detailers" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFound,
});

function NotFound() {
  return (
    <main className="overflow-x-hidden">
      <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <p className="text-6xl font-extrabold text-ink">404</p>
        <h1 className="mt-4 text-2xl font-bold text-ink">This page couldn't be detailed</h1>
        <p className="mt-3 text-sm text-muted-foreground">The page you're looking for doesn't exist or was moved. Head back home and we'll take it from there.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full bg-brand px-5 py-3 text-sm font-bold text-ink">Go home</Link>
          <Link to="/services" className="rounded-full border border-ink px-5 py-3 text-sm font-semibold text-ink">Browse services</Link>
        </div>
      </section>
    </main>
  );
}
