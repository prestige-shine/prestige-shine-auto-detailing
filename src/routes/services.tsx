import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Layers, Wind, ShieldCheck, Hammer, Thermometer, Sparkles, Check,
} from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Roofing Services — Aurexo Roofing Studio" },
      { name: "description", content: "Premium installations, storm restoration, and certified workmanship across Ohio. Architectural shingles, standing-seam metal, luxury slate, and composite systems." },
      { property: "og:title", content: "Roofing Services — Aurexo Roofing Studio" },
      { property: "og:description", content: "Premium installations and restoration across Ohio." },
    ],
  }),
  component: Services,
});

const services = [
  { i: Hammer, t: "New Installations", d: "Full architectural design and engineered installation for new builds and additions." },
  { i: Layers, t: "Premium Re-Roofs", d: "Complete tear-off, deck inspection, and certified install on existing homes." },
  { i: Wind, t: "Storm Restoration", d: "24-hour Ohio storm response with insurance-grade documentation and emergency tarping." },
  { i: ShieldCheck, t: "Warranty Service", d: "Manufacturer-certified workmanship covered for the life of the installation." },
  { i: Thermometer, t: "Ventilation & Insulation", d: "Engineered intake and exhaust pathways that lower attic temperatures by 15–20°F." },
  { i: Sparkles, t: "Annual Inspections", d: "Photographic roof reports filed to your insurance carrier on request." },
];

const matrix = {
  "Material Composition": [
    "SBS-modified asphalt with copper-granule UV blend on every architectural shingle line",
    "G90 galvanised steel substrate with Kynar 500 fluoropolymer coatings on standing-seam panels",
    "Multi-layer polymer composites that replicate quarried slate at 25% of the structural load",
    "Class A fire-rated underlayments, ice-and-water shields, and synthetic moisture barriers throughout",
    "Copper, lead-coated copper, and galvanised steel valley and step flashing — never aluminium-on-asphalt",
  ],
  "Wind & Fire Resistance": [
    "All shingle systems installed to 130 mph six-nail uplift pattern, exceeding ASTM D7158 Class H",
    "Standing-seam metal assemblies tested to UL 580 Class 90 and Miami-Dade impact standards",
    "Class A fire rating on every premium assembly, with documented ASTM E108 burn-through resistance",
    "Class 4 impact-rated shingles available on every premium line — eligible for Ohio insurance discounts",
    "Sealed-deck construction limits wind-driven rain intrusion even at sustained 110 mph gusts",
  ],
  "Warranty Details": [
    "Lifetime limited material warranty on every premium shingle and metal system we install",
    "25-year non-prorated workmanship warranty backed in writing by Aurexo Roofing Studio",
    "50-year synthetic slate and composite warranties, transferable once at no cost to the next owner",
    "Manufacturer Master Elite, SELECT ShingleMaster, and DECRA Certified Installer credentialing on file",
    "Warranty registration filed in your name on completion day — never the contractor's",
  ],
} as const;

type TabKey = keyof typeof matrix;

function Services() {
  const tabs = Object.keys(matrix) as TabKey[];
  const [active, setActive] = useState<TabKey>(tabs[0]);

  return (
    <main>
      <PageHeader
        eyebrow="Capabilities"
        title="Engineered roofing systems."
        subtitle="Premium materials, manufacturer-certified crews, and a fixed-completion guarantee on every Ohio project."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(({ i: Icon, t, d }) => (
          <article key={t} className="rounded-2xl bg-white border border-border p-6">
            <div className="grid h-12 w-12 shrink-0 aspect-square place-items-center rounded-2xl bg-brand/15 text-ink">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-bold text-ink text-lg">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            <a
              href="https://wa.me/15615550199?text=Hi%20Aurexo%2C%20I%27d%20like%20to%20book%20a%20free%20site%20inspection."
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-ink underline underline-offset-2 hover:text-brand"
            >
              Book free inspection →
            </a>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-border bg-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">Engineering matrix</p>
          <h2 className="mt-1 text-2xl font-bold text-ink">Get to Know Your Roof</h2>

          <div role="tablist" aria-label="Roof engineering matrix" className="mt-5 flex gap-2 overflow-x-auto overscroll-x-contain border-b border-border">
            {tabs.map((tab) => {
              const isActive = active === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab)}
                  className={`relative shrink-0 px-3 py-3 text-sm font-semibold transition ${isActive ? "text-ink" : "text-muted-foreground hover:text-ink"}`}
                >
                  {tab}
                  {isActive && <span className="absolute -bottom-px left-0 right-0 h-[3px] rounded-full bg-brand" />}
                </button>
              );
            })}
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {matrix[active].map((line) => (
              <li key={line} className="flex items-start gap-3 rounded-xl border border-border bg-surface/40 p-4">
                <span className="grid h-7 w-7 shrink-0 aspect-square place-items-center rounded-full bg-brand text-ink">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed text-ink">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-ink">Complete roofing scope</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every Aurexo project begins with a documented inspection of the existing deck, ventilation pathway, and flashing details. Scope includes tear-off, deck repair, ice-and-water shield, synthetic underlayment, drip edge, starter and ridge cap, premium finish material, and full flashing — itemised on the estimate, never bundled.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink">Authorization you control</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Crew leads document any concealed condition uncovered during tear-off with photographs and a written change order before additional work begins. Urgent structural repairs are separated from elective upgrades so you choose what proceeds today and what plans for next season.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-ink">Standing-seam and copper specialists</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Architectural metal is rolled and seamed on-site by a dedicated finish crew. Copper accents, lead-coated copper valleys, and ornamental ridge details are installed by carpenters who have spent a decade exclusively on premium metal work.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-ink">Warranty-backed workmanship</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every Aurexo installation includes a 25-year non-prorated workmanship warranty in addition to the manufacturer's lifetime material coverage. Your digital project record includes inspection photos, change orders, and warranty registration filed in your name on completion day.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
