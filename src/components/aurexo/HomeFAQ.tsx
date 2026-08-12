import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long does a ceramic coating last on a Miramichi-driven vehicle?",
    a: "It depends on the package. We offer 3-Year Ceramic Protection from $800, the System X 6-Year Ceramic Coating from $1,200, and Correction + 6-Year Ceramic from $1,500. Each is rated for the term in its name when maintained with regular pH-neutral washes — important here, where winter road salt and brine sit on paint for months.",
  },
  {
    q: "What's the difference between a polish, a paint correction, and full multi-stage correction?",
    a: "1-Step Paint Enhancement (from $300) improves gloss and reduces light swirls. 2-Step Paint Correction (from $600) targets moderate swirls, oxidation and paint defects. Advanced / Multi-Stage Paint Correction (from $900) is for heavier defects and restoration-level work. Pricing depends on vehicle size and paint condition, so an inspection or photo assessment may be required.",
  },
  {
    q: "Can Prestige Shine actually remove heavy pet hair, deep stains, and lingering odours from an interior?",
    a: "Yes — that's the core of our Full Interior Deep Clean & Extraction. We use hot-water extraction, enzymatic pre-treatments for organic stains, ozone treatment for smoke and pet odour, and rotary brush agitation on carpets and upholstery. Heavy pet hair sessions include a dedicated pass with rubber blades and pneumatic tools before extraction.",
  },
  {
    q: "Do you come to me, or do I drop my vehicle off?",
    a: "Prestige Shine is appointment only and all work is completed at our dedicated detailing and coating shop in Miramichi. You book a time, drop the vehicle off, and we handle everything from there — it keeps dust, lighting and cure conditions controlled for correction and coating work.",
  },
  {
    q: "What does a Full Detail cost?",
    a: "Full Detail starts at $200 for cars, $225 for compact SUVs, $275 for mid-size SUVs, $300 for large / 3-row SUVs, $350 for XL SUVs, $300 for pickup trucks and $350 for large / HD trucks. Prefer the popular combination? Full Detail + Paint Enhancement starts at $450 for cars and $700 for XL SUVs and HD trucks. Final pricing is based on vehicle size and condition — excessive pet hair, staining, heavy soiling or unusually neglected vehicles may cost more.",
  },
  {
    q: "Are the prices on your website final?",
    a: "No — prices shown are starting estimates. Final pricing is confirmed after reviewing vehicle size, condition, and any additional factors that may affect the scope of work. Kevin personally reviews your photos and details before confirming a quote, and nothing starts until you approve it.",
  },
];

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">Frequently Asked</p>
        <h2 id="faq-heading" className="mt-1 text-3xl font-bold text-ink sm:text-4xl">Miramichi owners ask us…</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          The most common questions we field before, during, and after a high-end detailing appointment.
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
