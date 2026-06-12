import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { articles } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Blog — Aurexo" },
      { name: "description", content: "Buying guides, EV news, financing advice and reviews from the Aurexo editorial team." },
      { property: "og:title", content: "News & Blog — Aurexo" },
      { property: "og:description", content: "Latest automotive articles from Aurexo." },
    ],
  }),
  component: NewsList,
});

function NewsList() {
  return (
    <main>
      <PageHeader eyebrow="Editorial" title="News & Blog" subtitle="Buying advice, deep-dive reviews and the stories shaping how we drive." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article key={a.slug} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white">
              <div className="relative">
                <img src={a.cover} alt={a.title} className="h-48 w-full object-cover" loading="lazy" />
                <span className="absolute left-3 top-3 rounded-full bg-ink/90 px-2.5 py-1 text-[11px] font-bold text-white">{a.date}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-brand">{a.category}</p>
                <h3 className="mt-1 text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{a.excerpt}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: a.slug }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink"
                >
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
