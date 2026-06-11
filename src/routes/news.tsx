import { createFileRoute } from "@tanstack/react-router";
import { Calendar, ArrowRight } from "lucide-react";
import { vehicles } from "@/lib/aurexo-data";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Aurexo" },
      { name: "description", content: "Reviews, buying guides, and industry news from the Aurexo editorial team." },
      { property: "og:title", content: "News — Aurexo" },
      { property: "og:description", content: "Reviews, guides, and news." },
    ],
  }),
  component: News,
});

const posts = vehicles.slice(0, 6).map((v, i) => ({
  id: v.id,
  title: `${v.title}: First Drive Review`,
  excerpt: `We took the ${v.title} on a 400-mile loop to find out what's really new — and what's worth the price tag.`,
  date: ["Jun 02, 2026", "May 28, 2026", "May 21, 2026", "May 14, 2026", "May 09, 2026", "Apr 30, 2026"][i],
  img: v.img,
  category: ["Review", "Guide", "News", "Review", "Guide", "Opinion"][i],
}));

function News() {
  return (
    <main>
      <PageHeader eyebrow="Editorial" title="News & buying guides." subtitle="Fresh reviews, comparisons, and industry insight from our auto journalists." />
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((p) => (
          <article key={p.id} className="rounded-2xl bg-white border border-border overflow-hidden">
            <div className="relative">
              <img src={p.img} alt={p.title} className="w-full h-48 object-cover" loading="lazy" />
              <span className="absolute top-3 left-3 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-ink">{p.category}</span>
            </div>
            <div className="p-5">
              <p className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3"/> {p.date}</p>
              <h3 className="mt-2 font-bold text-ink leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
              <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink">Read more <ArrowRight className="h-3.5 w-3.5"/></button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
