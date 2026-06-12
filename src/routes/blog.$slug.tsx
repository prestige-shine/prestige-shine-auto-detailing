import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { articles, findArticle } from "@/lib/articles";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = findArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.article.title} — Aurexo` },
          { name: "description", content: loaderData.article.excerpt },
          { property: "og:title", content: loaderData.article.title },
          { property: "og:description", content: loaderData.article.excerpt },
          { property: "og:image", content: loaderData.article.cover },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Link to="/news" className="mt-4 inline-block font-semibold text-ink underline">Back to all articles</Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-2xl font-extrabold text-ink">Article not found</h1>
      <Link to="/news" className="mt-4 inline-block font-semibold text-ink underline">Back to all articles</Link>
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { article } = Route.useLoaderData();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <main>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <Link to="/news" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> All Articles
        </Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-wide text-brand">{article.category}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">{article.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" /> {article.author}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {article.date}</span>
        </div>
        <img src={article.cover} alt={article.title} className="mt-6 aspect-video w-full rounded-2xl object-cover" />
        <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground">
          {article.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </article>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold text-ink">Keep reading</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {more.map((m) => (
            <Link
              key={m.slug}
              to="/blog/$slug"
              params={{ slug: m.slug }}
              className="overflow-hidden rounded-2xl border border-border bg-white"
            >
              <img src={m.cover} alt="" className="h-36 w-full object-cover" loading="lazy" />
              <div className="p-4">
                <p className="text-xs text-muted-foreground">{m.date}</p>
                <p className="mt-1 font-bold text-ink">{m.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
