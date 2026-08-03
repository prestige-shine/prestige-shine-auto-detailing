import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long does a professional ceramic 9H coating actually last on an Miramichi-driven car?",
    a: "A properly prepped and cured 9H ceramic coating from Prestige Shine delivers 5–9 years of hydrophobic protection with our recommended annual maintenance decontamination. Miramichi monsoons — road salt, brine, freeze-thaw — accelerate wear on unprotected clear coat by up to 40%; a ceramic layer keeps chemical staining and micro-marring off the paint itself.",
  },
  {
    q: "What's the difference between a polish, a paint correction, and full multi-stage correction?",
    a: "A one-step polish enhances gloss and removes light haze but leaves most defects behind. Two-stage correction cuts and refines to remove 70–85% of swirls, wash marks, and light scratches. Full multi-stage correction (our Premium tier) targets 90%+ defect removal on aged clear coat, measured with a paint depth gauge to keep every panel within safe tolerance.",
  },
  {
    q: "Can Prestige Shine actually remove heavy pet hair, deep stains, and lingering odours from an interior?",
    a: "Yes — that's the core of our Full Interior Deep Clean & Extraction. We use hot-water extraction, enzymatic pre-treatments for organic stains, ozone treatment for smoke and pet odour, and rotary brush agitation on carpets and upholstery. Heavy pet hair sessions include a dedicated pass with rubber blades and pneumatic tools before extraction.",
  },
  {
    q: "Do you come to me, or does my vehicle need to be dropped at the studio?",
    a: "Both. Express Exterior Maintenance and most Interior packages are available fully mobile across Chatham, Northside, Douglastown, Newcastle, Nelson-Miramichi, and Neguac — we bring water, power, and lighting. Premium Ceramic 9H and multi-stage Paint Correction are performed only in our climate-controlled studios so cure times, dust control, and lighting stay flight-perfect.",
  },
  {
    q: "How does ceramic coating compare to a paint protection film (PPF) wrap?",
    a: "Ceramic 9H is a bonded liquid nano-layer — chemical, UV, and hydrophobic protection with high gloss, 5–9 years. PPF is a thick urethane film — physical rock-chip and abrasion protection with self-healing properties, 8–10 years. The best luxury builds combine both: PPF on high-impact zones (hood, fenders, mirrors), ceramic 9H over the entire vehicle for uniform gloss and easy wash.",
  },
  {
    q: "Do you offer financing or subscription-style detailing plans?",
    a: "Yes. Ceramic and multi-stage correction packages qualify for 0% pay-in-4 and 12-month 0% APR promotional plans. We also run an Miramichi Owners subscription — quarterly maintenance details plus priority booking — starting at $79/month for sedans.",
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
