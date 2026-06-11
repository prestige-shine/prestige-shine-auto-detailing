import { createFileRoute } from "@tanstack/react-router";
import { Wrench, Gauge, Sparkles, Cog, ShieldCheck, Battery } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services Center — Aurexo" },
      { name: "description", content: "Aurexo service centers offer maintenance, repair, detailing, and EV care across our network." },
      { property: "og:title", content: "Services Center — Aurexo" },
      { property: "og:description", content: "Maintenance, repair, detailing and EV care." },
    ],
  }),
  component: Services,
});

const services = [
  { i: Wrench, t: "Maintenance", d: "Oil, brakes, tires and the full 30-point inspection." },
  { i: Gauge, t: "Diagnostics", d: "Full computer scan and live data readout in 30 minutes." },
  { i: Sparkles, t: "Detailing", d: "Interior shampoo, paint correction, ceramic coating." },
  { i: Cog, t: "Repair", d: "Transmission, engine, suspension — certified technicians." },
  { i: ShieldCheck, t: "Warranty", d: "Extended coverage from 12 to 60 months." },
  { i: Battery, t: "EV Care", d: "Battery health, charging system and software updates." },
];

function Services() {
  return (
    <main>
      <PageHeader eyebrow="Care" title="Service center." subtitle="Factory-trained technicians, transparent pricing, fixed-in-one-visit guarantee." />
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(({ i: Icon, t, d }) => (
          <article key={t} className="rounded-2xl bg-white border border-border p-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 text-ink">
              <Icon className="h-6 w-6"/>
            </div>
            <h3 className="mt-4 font-bold text-ink text-lg">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            <button className="mt-4 text-sm font-semibold text-ink underline underline-offset-2">Book service →</button>
          </article>
        ))}
      </section>
    </main>
  );
}
