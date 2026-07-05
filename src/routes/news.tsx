import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/lib/articles";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Detailing Journal — Top Coat Auto Detailers" },
      { name: "description", content: "Guides on ceramic coating, paint correction, interior deep cleaning, and Lahore-climate paint care from Top Coat Auto Detailers." },
      { property: "og:title", content: "Detailing Journal — Top Coat Auto Detailers" },
      { property: "og:description", content: "Ceramic coating, paint correction, and Lahore-climate paint care guides." },
    ],
  }),
  component: News,
});

function News() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Detailing Journal" title="Guides & Tips" subtitle="In-depth articles from Top Coat's detailers on ceramic protection, correction, and interior care." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="group overflow-hidden rounded-2xl border border-border bg-white transition hover:border-ink/40 hover:shadow-md">
              <img src={a.cover} alt={a.title} className="aspect-[16/10] w-full object-cover transition group-hover:scale-105" loading="lazy" />
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{a.category} · {a.readMinutes ?? 6} min read</p>
                <h3 className="mt-2 text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.excerpt}</p>
                <p className="mt-4 text-xs text-muted-foreground">{a.date} · {a.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
