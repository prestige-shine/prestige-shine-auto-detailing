import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Users, Trophy, Globe } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Aurexo" },
      { name: "description", content: "Aurexo is reshaping how people buy, sell, and finance vehicles — transparently, online, end-to-end." },
      { property: "og:title", content: "About Us — Aurexo" },
      { property: "og:description", content: "Aurexo is reshaping how people buy, sell, and finance vehicles." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main>
      <PageHeader eyebrow="About Aurexo" title="A better way to buy your next car." subtitle="Founded in 2019, Aurexo connects buyers with verified dealers across 38 states — backed by transparent pricing, instant financing, and real human support." />
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { i: Users, n: "120k+", l: "Happy customers" },
          { i: Trophy, n: "12", l: "Industry awards" },
          { i: ShieldCheck, n: "340+", l: "Verified dealers" },
          { i: Globe, n: "38", l: "States covered" },
        ].map(({ i: Icon, n, l }) => (
          <div key={l} className="rounded-2xl bg-white border border-border p-5 text-center">
            <Icon className="h-6 w-6 mx-auto text-brand" />
            <p className="mt-3 text-2xl font-extrabold text-ink">{n}</p>
            <p className="text-xs text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl bg-white border border-border p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-ink">Our mission</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            We believe buying a car should feel as easy as ordering coffee. Aurexo combines a curated dealer network, instant pre-approvals, transparent vehicle history, and white-glove delivery so you can spend less time on paperwork and more time on the road.
          </p>
          <h3 className="mt-8 text-lg font-bold text-ink">What we stand for</h3>
          <ul className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
            {["Radical price transparency","Dealer accountability and ratings","Inclusive, jargon-free financing","Carbon-conscious logistics"].map((p) => (
              <li key={p} className="flex items-center gap-2 rounded-xl bg-surface p-3"><span className="h-2 w-2 rounded-full bg-brand"/> {p}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
