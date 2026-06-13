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
          <div className="mt-10 grid gap-8 border-t border-border pt-10 lg:grid-cols-2">
            <div><h3 className="text-lg font-bold text-ink">How our marketplace works</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Aurexo brings verified inventory, vehicle history, lender options, trade-in estimates, and delivery coordination into one guided automotive marketplace. Buyers can filter exact vehicle data, compare candidates side by side, save a shortlist, and contact accountable dealers without repeating the same information at every step.</p></div>
            <div><h3 className="text-lg font-bold text-ink">Dealer quality standards</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Dealers are reviewed for licensing, customer-service history, listing accuracy, pricing clarity, and response quality. Vehicle listings must identify condition, mileage, drivetrain, fuel type, and material fees so shoppers can make informed comparisons before visiting a showroom.</p></div>
            <div><h3 className="text-lg font-bold text-ink">Transparent car buying</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Our product is designed around the total decision—not just the advertised payment. Calculators expose principal, rate, down payment, term, and estimated total loan cost. Educational guides explain inspections, warranties, electric vehicles, certified pre-owned programs, leasing, and ownership expenses in plain language.</p></div>
            <div><h3 className="text-lg font-bold text-ink">Support after the sale</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">The relationship continues through delivery, title coordination, warranty guidance, and access to service professionals. Our customer team helps resolve documentation questions and connects owners with the correct dealer or lender when specialized support is required.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
