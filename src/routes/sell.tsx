import { createFileRoute } from "@tanstack/react-router";
import { Camera, Upload, DollarSign, Truck } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Request a Free Estimate — Aurexo Roofing Studio" },
      { name: "description", content: "Book a free, documented site inspection from Aurexo Roofing Studio. Line-item estimate delivered within 48 hours." },
      { property: "og:title", content: "Request a Free Estimate — Aurexo Roofing Studio" },
      { property: "og:description", content: "Free Ohio site inspections, documented line-item estimates within 48 hours." },
    ],
  }),
  component: Sell,
});

function Sell() {
  return (
    <main>
      <PageHeader eyebrow="Request" title="Get a documented estimate." subtitle="Free site inspection, line-item estimate within 48 hours, and a fixed-completion guarantee on the install." />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl bg-white border border-border p-6">
          <h2 className="text-xl font-bold text-ink">Tell us about your project</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="rounded-xl border border-border px-4 py-3 text-sm" placeholder="Property address" />
            <input className="rounded-xl border border-border px-4 py-3 text-sm" placeholder="Ohio ZIP code" />
            <select className="rounded-xl border border-border px-4 py-3 text-sm">
              <option>Service type</option><option>New installation</option><option>Re-roof</option><option>Restoration</option><option>Storm response</option>
            </select>
            <select className="rounded-xl border border-border px-4 py-3 text-sm">
              <option>Preferred material</option><option>Architectural Shingles</option><option>Stone-Coated Steel</option><option>Premium Aluminium</option><option>Luxury Slate</option>
            </select>
            <input className="rounded-xl border border-border px-4 py-3 text-sm sm:col-span-2" placeholder="Estimated roof square footage (optional)" />
            <button className="sm:col-span-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-ink">Book free site inspection</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-ink">How a project starts</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { i: Upload, t: "1. Tell us about the home", d: "Address, service type, and any timeline you're working with." },
            { i: Camera, t: "2. Documented inspection", d: "On-site assessment of deck, ventilation, flashing, and existing material." },
            { i: DollarSign, t: "3. Line-item estimate", d: "Itemised quote within 48 hours — every layer of the assembly is separate." },
            { i: Truck, t: "4. Scheduled install", d: "Fixed-completion guarantee with daily clean-up and final inspection." },
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
