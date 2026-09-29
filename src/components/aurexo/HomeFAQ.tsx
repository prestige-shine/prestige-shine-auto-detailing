import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long does a ceramic coating last on a Miramichi-driven vehicle?",
    a: "It depends on the package. Kevin offers 3-Year Ceramic Protection from $800, System X 6-Year Ceramic Coating from $1,200, and Correction + 6-Year Ceramic from $1,500. Ceramic coating performance and durability depend on the specific product and proper maintenance, including regular pH-neutral washes.",
  },
  {
    q: "What's the difference between a polish, a paint correction, and full multi-stage correction?",
    a: "1-Step Paint Enhancement (from $300) improves gloss and reduces the appearance of light swirls. 2-Step Paint Correction (from $600) targets moderate swirls, oxidation, and paint defects. Advanced / Multi-Stage Paint Correction (from $900) is designed for heavier paint defects and more extensive correction work. Pricing depends on vehicle size and paint condition, so an inspection or photo assessment may be required.",
  },
  {
    q: "Can Prestige Shine actually remove heavy pet hair, deep stains, and lingering odours from an interior?",
    a: "Yes, that's the core of Kevin's Full Interior Deep Clean & Extraction. Kevin uses professional cleaning and extraction methods to treat carpets, upholstery, and interior surfaces. Heavy pet-hair jobs may require additional preparation before extraction, depending on the vehicle's condition.",
  },
  {
    q: "Do you come to me, or do I drop my vehicle off?",
    a: "Prestige Shine operates By Appointment Only, and all work is completed at the dedicated detailing and coating shop in Miramichi. You book a time, drop the vehicle off, and Kevin handles everything from there, keeping dust, lighting, and cure conditions controlled for correction and coating work.",
  },
  {
    q: "What does a Full Detail cost?",
    a: "Full Detail starts at $200 for cars, $225 for compact SUVs, $275 for mid-size SUVs, $300 for large / 3-row SUVs, $350 for XL SUVs, $300 for pickup trucks and $350 for large / HD trucks. Prefer the popular combination? Full Detail + Paint Enhancement starts at $450 for cars and $700 for XL SUVs and HD trucks. Final pricing is based on vehicle size and condition, excessive pet hair, staining, heavy soiling or unusually neglected vehicles may cost more.",
  },
  {
    q: "Are the prices on your website final?",
    a: "No, prices shown are starting estimates. Final pricing is confirmed after reviewing vehicle size, condition, and any additional factors that may affect the scope of work. Kevin personally reviews your photos and details before confirming a quote, and nothing starts until you approve it.",
  },
];

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-4xl px-4 pb-10 pt-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">Frequently Asked</p>
        <h2 id="faq-heading" className="mt-1 text-3xl font-bold text-ink sm:text-4xl">Miramichi owners ask…</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Answers to the most common questions before, during, and after a high-end detailing appointment at Prestige Shine Auto.
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
