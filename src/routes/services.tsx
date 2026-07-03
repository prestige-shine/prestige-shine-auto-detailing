import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sparkles, Droplets, Shield, Plus } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

const tiers = [
  {
    id: "express",
    icon: Droplets,
    name: "Express Exterior Maintenance",
    price: "from $89",
    duration: "60–90 min",
    idealFor: "Regular upkeep between deeper services, daily drivers, lease returns",
    included: [
      "Hand wash & rinse with pH-neutral foam",
      "Wheel & tire scrub with decontaminant",
      "Door jamb wipe-down",
      "Window exterior squeegee clean",
      "Tyre dressing application",
      "Quick-detailer spray & microfibre buff",
    ],
  },
  {
    id: "interior",
    icon: Sparkles,
    name: "Full Interior Deep Clean & Extraction",
    price: "from $199",
    duration: "3–5 hours",
    idealFor: "Pet owners, families, pre-sale preparation, post-winter refresh",
    included: [
      "Complete vacuum of all surfaces, crevices & boot",
      "Hot-water extraction for carpet & fabric seats",
      "Dashboard, console & trim clay and detail",
      "Door cards and pockets wiped & conditioned",
      "Headliner spot-cleaned",
      "Window interior streak-free clean",
      "Odour neutraliser treatment",
      "UV-protective dressing on all plastics",
    ],
  },
  {
    id: "ceramic",
    icon: Shield,
    name: "Premium 9H Ceramic Coating & Paint Correction",
    price: "from $999",
    duration: "2–4 days",
    idealFor: "New vehicle owners, paint-preservation enthusiasts, high-value vehicles",
    included: [
      "Full paint decontamination (clay bar + iron fallout)",
      "Paint thickness measurement at all panels",
      "Single-stage machine polish (swirl & light scratch removal)",
      "Two-stage correction available (deep scratch & oxidation)",
      "Panel wipe-down with IPA to strip all oils",
      "9H Gtechniq Crystal Serum Ultra application",
      "EXO v4 topcoat for hydrophobic performance",
      "5-year warranty registered in your name",
      "Before & after documented photo set",
    ],
  },
];

const addons = [
  { name: "Headlight Restoration", price: "$59/pair", desc: "Polish and UV-seal oxidised headlight lenses for clarity and longevity." },
  { name: "Engine Bay Detail", price: "$89", desc: "Degrease, rinse, and dress all engine bay plastics and components." },
  { name: "Leather Conditioning", price: "$79", desc: "Clean and condition all leather surfaces with pH-balanced products." },
  { name: "PPF Consultation", price: "Free", desc: "Expert advice on paint protection film placement — clear bra, full bonnet, or full wrap referral." },
  { name: "Ceramic Wheel Coating", price: "$149", desc: "Pro-grade ceramic coating on all four wheels for brake-dust resistance and easy cleaning." },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Detailing Services — Aurexo Detailing Studio Ohio" },
      { name: "description", content: "Express exterior wash, full interior deep clean, 9H ceramic coating & paint correction. Add-ons: headlight restoration, engine bay, leather conditioning and more." },
      { property: "og:title", content: "Detailing Services — Aurexo Detailing Studio" },
      { property: "og:description", content: "Professional auto detailing services across Ohio." },
    ],
  }),
  component: Services,
});

function Services() {
  const [active, setActive] = useState(tiers[0].id);
  const tier = tiers.find((t) => t.id === active)!;
  const Icon = tier.icon;

  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="Services"
        title="Every service your vehicle deserves."
        subtitle="Three core detailing tiers plus a menu of precision add-ons — each performed by IDA-certified technicians in our climate-controlled studios."
      />

      {/* Tier selector */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 lg:flex-row">
          <aside className="flex flex-row gap-2 lg:flex-col lg:w-64 shrink-0">
            {tiers.map((t) => {
              const TIcon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition w-full ${active === t.id ? "border-brand bg-brand/10" : "border-border bg-white hover:border-ink"}`}
                >
                  <TIcon className="h-5 w-5 shrink-0 text-ink" />
                  <span className="text-sm font-semibold text-ink leading-tight">{t.name}</span>
                </button>
              );
            })}
          </aside>

          <article className="flex-1 rounded-3xl border border-border bg-white p-6 sm:p-10">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/15 text-ink">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-ink">{tier.name}</h2>
                <p className="mt-1 text-xl font-bold text-brand">{tier.price}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <span className="rounded-full bg-surface border border-border px-3 py-1"><strong>Duration:</strong> {tier.duration}</span>
              <span className="rounded-full bg-surface border border-border px-3 py-1"><strong>Ideal for:</strong> {tier.idealFor}</span>
            </div>

            <h3 className="mt-7 text-sm font-bold uppercase tracking-wide text-muted-foreground">What's included</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {tier.included.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface/40 p-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-ink">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-ink leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/2347012307036?text=Hi%20Aurexo%2C%20I%27d%20like%20to%20book%20a%20detailing%20appointment."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-ink"
              >
                Book this service
              </a>
              <a
                href="/get-estimate"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-ink transition"
              >
                Get an estimate
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Add-ons */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">Enhance your detail</p>
        <h2 className="mt-1 text-2xl font-bold text-ink">Add-on services</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addons.map((a) => (
            <div key={a.name} className="rounded-2xl bg-white border border-border p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-ink">{a.name}</h3>
                <span className="shrink-0 rounded-full bg-brand/15 px-3 py-1 text-xs font-bold text-ink">{a.price}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand">
                <Plus className="h-3 w-3" /> Add to any service
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
