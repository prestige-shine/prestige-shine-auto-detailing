import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/financing")({
  head: () => ({
    meta: [
      { title: "Payment Plans — Top Coat Auto Detailers" },
      { name: "description", content: "Flexible payment plans for ceramic coating, paint correction, and premium detailing packages at Top Coat Auto Detailers." },
      { property: "og:title", content: "Payment Plans — Top Coat Auto Detailers" },
      { property: "og:description", content: "0% pay-in-4, 12-month promotional APR, and 24-month fixed plans." },
    ],
  }),
  component: Financing,
});

const PLANS = [
  { name: "Pay-in-4 · 0%", term: "4 bi-weekly payments", apr: "0% APR", best: "Express & Interior packages under $600", perks: ["Instant approval", "No hard credit check", "Pay directly from card"] },
  { name: "12-Month Promo · 0%", term: "12 equal monthly payments", apr: "0% promotional APR", best: "Ceramic coating & correction $1,500–$3,500", perks: ["Soft credit inquiry", "Fixed monthly billing", "No prepayment penalty"] },
  { name: "24-Month Fixed", term: "24 monthly payments", apr: "9.99% APR fixed", best: "Full paint protection builds $3,000+", perks: ["Extended term", "Predictable payments", "Combine with PPF add-ons"] },
];

function Financing() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Payment Plans" title="Book now, pay over time" subtitle="A-rated lender partners let Ohio owners spread ceramic and correction packages into affordable monthly payments." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">{p.term}</p>
              <h3 className="mt-2 text-xl font-bold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.apr}</p>
              <p className="mt-4 text-xs font-semibold text-ink">Best for</p>
              <p className="text-sm text-muted-foreground">{p.best}</p>
              <ul className="mt-4 space-y-2">
                {p.perks.map((k) => (
                  <li key={k} className="flex items-start gap-2 text-sm text-ink"><Check className="mt-0.5 h-4 w-4 text-brand" />{k}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-ink px-6 py-8 text-center text-white">
          <h2 className="text-2xl font-bold">Get pre-qualified in 60 seconds</h2>
          <p className="mt-2 text-sm text-white/70">Soft credit inquiry only. No impact on your score.</p>
          <Link to="/get-estimate" className="mt-5 inline-flex items-center rounded-full bg-brand px-5 py-3 text-sm font-bold text-ink">Start with an instant quote</Link>
        </div>
      </section>
    </main>
  );
}
