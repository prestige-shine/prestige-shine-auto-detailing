import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/coming-soon")({
  head: () => ({
    meta: [
      { title: "Coming Soon — Top Coat Auto Detailers" },
      { name: "description", content: "This service is launching soon at Top Coat Auto Detailers." },
      { property: "og:title", content: "Coming Soon — Top Coat Auto Detailers" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <main className="overflow-x-hidden">
      <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-ink sm:text-4xl">This service is launching soon</h1>
        <p className="mt-3 text-sm text-muted-foreground">We're detailing the final touches. In the meantime, explore our existing ceramic, correction, and interior packages.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/services" className="rounded-full bg-brand px-5 py-3 text-sm font-bold text-ink">See services</Link>
          <Link to="/get-estimate" className="rounded-full border border-ink px-5 py-3 text-sm font-semibold text-ink">Get a quote</Link>
        </div>
      </section>
    </main>
  );
}
