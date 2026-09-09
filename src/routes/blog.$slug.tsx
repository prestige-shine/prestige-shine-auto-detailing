import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { articles, type Article } from "@/lib/articles";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const a = articles.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: a ? `${a.title} — Prestige Shine Auto Detailing` : "Article — Prestige Shine" },
        { name: "description", content: a?.excerpt ?? "Detailing guide from Prestige Shine Auto Detailing." },
        { property: "og:title", content: a?.title ?? "Article" },
        { property: "og:description", content: a?.excerpt ?? "" },
        { property: "og:image", content: a?.cover ?? "" },
        { property: "og:type", content: "article" },
      ],
      scripts: a
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: a.title,
                image: [a.cover],
                datePublished: a.publishedAt ?? a.date,
                author: [{ "@type": "Person", name: a.author }],
                publisher: { "@type": "Organization", name: "Prestige Shine Auto Detailing" },
              }),
            },
          ]
        : [],
    };
  },
  loader: ({ params }) => {
    const a = articles.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return { a };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { a } = Route.useLoaderData() as { a: Article };
  return (
    <main className="overflow-x-hidden">
      <article className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-wider text-brand">{a.category} · {a.readMinutes ?? 6} min read</p>
        <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{a.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{a.date} · {a.author}</p>
        <img src={a.cover} alt={a.title} className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />
        <p className="mt-6 text-lg leading-relaxed text-ink">{a.excerpt}</p>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-ink">
  {a.body.map((p: string, i: number) => {
    if (p.startsWith("## ")) {
      return (
        <h2 key={i} className="pt-6 text-2xl font-bold text-ink">
          {p.replace(/^## /, "")}
        </h2>
      );
    }

    if (p.startsWith("- ")) {
      return (
        <ul key={i} className="list-disc space-y-2 pl-6">
          <li>{p.replace(/^- /, "")}</li>
        </ul>
      );
    }

    return <p key={i}>{p}</p>;
  })}
</div>
        <div className="mt-10 rounded-2xl bg-surface p-6 text-center">
          <p className="text-sm font-semibold text-ink">Ready to book?</p>
          <Link to="/get-estimate" className="mt-3 inline-flex items-center rounded-full bg-brand px-5 py-3 text-sm font-bold text-ink">Get an instant detailing quote</Link>
        </div>
      </article>
    </main>
  );
}
