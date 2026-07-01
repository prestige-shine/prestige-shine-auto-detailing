import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long does a premium roof actually last in Ohio's climate?",
    a: "Architectural shingles installed to spec typically deliver 25–30 years in Ohio's freeze-thaw band. Stone-coated steel and standing-seam aluminium routinely reach 40–50 years, and luxury slate or DaVinci synthetic composites are engineered for 50 years and beyond. The single largest variable is the underlayment, ventilation and flashing package — the parts you cannot see from the street.",
  },
  {
    q: "How does Aurexo handle insurance claims for storm or leak damage?",
    a: "We document every damaged elevation with drone and ground photography, itemize the claim to Xactimate line items, and coordinate directly with your adjuster on-site. Homeowners keep the check and the paperwork; we keep the process transparent. Emergency tarping is dispatched within 24 hours across all Ohio metros.",
  },
  {
    q: "What is the real difference between architectural shingles and premium slate or metal?",
    a: "Architectural shingles are the value benchmark — 30-year lifecycle, Class A fire, 130 mph wind. Standing-seam metal upgrades the wind and lifecycle envelope with a monolithic panel and hidden fasteners. Luxury slate (natural or synthetic composite) is a fifty-year, heritage-grade finish that materially lifts appraised value on architecturally significant homes.",
  },
  {
    q: "What does the Aurexo 25-year workmanship warranty actually cover?",
    a: "Non-prorated labor coverage against installation defects — flashing, penetration seals, fastener patterns, ventilation balance and finish carpentry. It is transferable once at no cost to the next owner and is registered in your name on completion day, layered on top of the manufacturer's lifetime material warranty.",
  },
  {
    q: "How long does a typical Aurexo project take from contract to completion?",
    a: "A single-family re-roof in the 2,500–4,000 sqft range is normally on and off the property in three to five working days. Luxury slate builds and full architectural upgrades run seven to fourteen working days depending on complexity, with a fixed-completion clause protecting your schedule.",
  },
  {
    q: "Do you offer financing for premium roofing projects?",
    a: "Yes. Aurexo partners with A-rated lenders offering 0% promotional terms and extended fixed-rate options up to 15 years. Our estimator publishes a live monthly-payment view so you can plan the capital cost the same way you plan the material spec.",
  },
];

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">Frequently Asked</p>
        <h2 id="faq-heading" className="mt-1 text-3xl font-bold text-ink sm:text-4xl">Ohio homeowners ask us…</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          The most common high-ticket questions we field before, during, and after a premium roofing project.
        </p>
      </div>
      <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-white">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <article key={f.q}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >
                <h3 className="text-sm font-bold text-ink sm:text-base">{f.q}</h3>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand/15 text-ink">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
