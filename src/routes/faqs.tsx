import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

const groups = [
  {
    title: "Inspections & Assessments",
    items: [
      ["How do I book a roof inspection?", "Request one from the Contact page or WhatsApp our studio. A certified Aurexo estimator will schedule an on-site inspection within 48 hours across most of Ohio, including drone imagery of every slope, valley and penetration."],
      ["What does an Aurexo inspection cover?", "We assess the deck, underlayment, flashing, ventilation, ridge, valleys, penetrations, gutters and attic moisture profile. You receive a written report with photos, remaining service life, and an itemised repair or replacement recommendation."],
      ["Is a roof inspection really free?", "Yes — standard residential inspections in our Ohio service area carry no cost and no obligation. Insurance-claim documentation, engineered reports and commercial assessments are quoted separately."],
      ["How often should an Ohio roof be inspected?", "We recommend a full inspection every 2 years for asphalt systems and after any severe wind, hail or ice-dam event. Slate, tile and standing-seam metal roofs can move to a 3–5 year cadence once verified sound."],
    ],
  },
  {
    title: "Leak Repairs & Emergency Response",
    items: [
      ["My roof is leaking right now — what do I do?", "Call +1 (561) 555-0199 or WhatsApp us. Move valuables away from the drip zone, place a container to catch water, and photograph any interior staining for your insurance file. Our emergency crews target a 4-hour tarp-and-secure response in most Ohio counties."],
      ["Can you repair rather than replace?", "Whenever it is honest to do so, yes. If the deck is sound and remaining shingle life is above 30%, targeted repair is almost always the right call. We will never recommend a full replacement to solve a localised failure."],
      ["Do you handle insurance claims?", "We document every finding to carrier-grade standards, meet the adjuster on-site, and translate scope language between you and your insurer. Aurexo is not a public adjuster — we advocate for a technically correct scope of work, not a specific payout."],
      ["What is included in a typical repair?", "Repairs generally include underlayment patching, flashing re-work, replacement shingles or panels colour-matched from current inventory, sealant renewal at penetrations, and a written 2-year workmanship warranty on the repaired area."],
    ],
  },
  {
    title: "Materials & Roofing Systems",
    items: [
      ["Which roofing material lasts longest in Ohio?", "For pure lifecycle, natural slate and standing-seam metal top the chart at 50+ years. Synthetic slate composites reach 50 years at roughly half the structural load, and premium architectural shingles deliver a realistic 25–30 year service life in Ohio's freeze-thaw climate."],
      ["Are metal roofs noisy in rain?", "Modern standing-seam systems installed over a solid deck with proper underlayment are effectively as quiet as a shingle roof. Noise is only an issue on open-purlin barns and outbuildings."],
      ["What is the difference between 3-tab and architectural shingles?", "3-tab shingles are a flat, entry-grade product with a 20-year lifecycle. Architectural (dimensional) shingles are heavier, layered for depth, wind-rated to 130 mph and carry manufacturer warranties up to 50 years. We no longer install 3-tab on primary residences."],
      ["Do you install cool-roof or energy-rated systems?", "Yes. We specify ENERGY STAR® reflective granules, cool-roof tile coatings and PVDF-coated metal in high-solar-load exposures. Expect a measurable reduction in attic temperature and summer HVAC load."],
    ],
  },
  {
    title: "Roof Replacements",
    items: [
      ["How long does a full roof replacement take?", "A typical Ohio single-family home (2,500–3,500 sqft, moderate complexity) is completed in 1–3 working days for architectural shingles, 3–5 days for stone-coated steel or standing-seam, and 5–10 days for slate or tile."],
      ["Do I need to leave the house during installation?", "No. Our crews work exterior-only. We ask that vehicles be moved out of the driveway, patio furniture cleared, and pets kept indoors during active tear-off hours."],
      ["Will you protect my landscaping and gutters?", "Yes. Every project starts with tarped ground protection, plywood over shrubs, and magnetic nail sweeps morning and evening. Gutters are protected during tear-off and cleaned before demobilisation."],
      ["What happens to my old roof?", "All tear-off material is loaded directly into a job-site dumpster and disposed at a licensed Ohio facility. Recyclable metal, copper flashing and reusable decking are separated and diverted from landfill."],
      ["What warranty do I receive?", "Every Aurexo replacement includes a 25-year transferable workmanship warranty in addition to the manufacturer's material warranty (up to lifetime on premium systems). Warranty documents are delivered with your final closeout package."],
    ],
  },
  {
    title: "Estimates, Timelines & Payment",
    items: [
      ["How accurate is the online estimator?", "The /get-estimate calculator is calibrated to 2026 Ohio installed pricing and is typically within 8–12% of the final contracted number. The on-site inspection reconciles the remaining variance — deck condition, ventilation upgrades and flashing scope."],
      ["How long is an estimate valid?", "Written estimates are honoured for 45 days. Material pricing has been volatile since 2022, so we re-confirm current per-square costs before signing if the estimate is older than that."],
      ["Do you offer financing?", "Yes. We partner with Ohio-licensed lenders to offer 0% APR promotional plans up to 24 months and extended fixed-rate plans up to 15 years. Financing is fully optional and never bundled into the base price."],
      ["When is payment due?", "For residential replacements: a signed contract with 10% material deposit at scheduling, 40% at material delivery, and the balance on completion and walkthrough sign-off. Repairs under $2,500 are invoiced net-15 on completion."],
      ["What areas do you serve?", "Our primary service area covers Cleveland, Akron, Columbus, Cincinnati, Toledo and the surrounding Ohio counties. We accept select projects in western Pennsylvania and northern Kentucky on a case-by-case basis."],
    ],
  },
];

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Roofing FAQs — Aurexo Roofing Studio Ohio" },
      { name: "description", content: "Answers to the most common roofing questions in Ohio — inspections, leak repairs, materials, full replacements, estimates and warranties." },
      { property: "og:title", content: "Roofing FAQs — Aurexo Roofing Studio" },
      { property: "og:description", content: "Ohio roofing questions answered by certified Aurexo estimators." },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: groups.flatMap((group) => group.items.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } }))) }) }],
  }),
  component: Faqs,
});

function Faqs() {
  return (
    <main>
      <PageHeader eyebrow="Help" title="Roofing questions, answered." subtitle="Everything Ohio homeowners ask us before, during and after a premium roofing project. Can't find yours? Our studio is one tap away." />
      <section className="mx-auto max-w-3xl px-4 py-12 space-y-8">
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="text-xl font-bold text-ink">{g.title}</h2>
            <div className="mt-3 rounded-2xl bg-white border border-border overflow-hidden divide-y divide-border">
              {g.items.map(([q, a]) => <FaqRow key={q} q={q} a={a} />)}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
        <span className="font-semibold text-ink">{q}</span>
        {open ? <Minus className="h-4 w-4 text-brand shrink-0" /> : <Plus className="h-4 w-4 text-brand shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5 -mt-2 text-sm text-muted-foreground leading-relaxed">{a}</div>}
    </div>
  );
}
