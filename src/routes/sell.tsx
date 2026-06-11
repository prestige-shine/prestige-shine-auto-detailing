import { createFileRoute } from "@tanstack/react-router";
import { Camera, Upload, DollarSign, Truck } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell Your Car — Aurexo" },
      { name: "description", content: "Get an instant offer for your car in 2 minutes. Free pickup, ACH paid within 24 hours." },
      { property: "og:title", content: "Sell Your Car — Aurexo" },
      { property: "og:description", content: "Get a fair instant offer for your car in 2 minutes." },
    ],
  }),
  component: Sell,
});

function Sell() {
  return (
    <main>
      <PageHeader eyebrow="Sell" title="Sell your car in 24 hours." subtitle="Instant offer, free pickup, paid same day. No tire-kickers, no haggling." />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl bg-white border border-border p-6">
          <h2 className="text-xl font-bold text-ink">Get your instant offer</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="rounded-xl border border-border px-4 py-3 text-sm" placeholder="VIN or License Plate" />
            <input className="rounded-xl border border-border px-4 py-3 text-sm" placeholder="ZIP Code" />
            <select className="rounded-xl border border-border px-4 py-3 text-sm">
              <option>Make</option><option>BMW</option><option>Ford</option><option>Toyota</option>
            </select>
            <select className="rounded-xl border border-border px-4 py-3 text-sm">
              <option>Year</option>{Array.from({ length: 20 }).map((_, i) => <option key={i}>{2026 - i}</option>)}
            </select>
            <input className="rounded-xl border border-border px-4 py-3 text-sm sm:col-span-2" placeholder="Current mileage" />
            <button className="sm:col-span-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-ink">Get my offer</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-ink">How it works</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { i: Upload, t: "1. Tell us about your car", d: "Enter your VIN and a few details. Takes 2 minutes." },
            { i: DollarSign, t: "2. Get an instant offer", d: "Real cash number, valid for 7 days. No obligation." },
            { i: Camera, t: "3. Schedule pickup", d: "Free at-home inspection or drop off at a partner location." },
            { i: Truck, t: "4. Get paid", d: "ACH transfer hits your account within 24 hours." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl bg-white border border-border p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-ink">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold text-ink text-sm">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
