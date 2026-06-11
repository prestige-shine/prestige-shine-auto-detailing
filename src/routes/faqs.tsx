import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Aurexo" },
      { name: "description", content: "Answers to the most common questions about buying, selling, and financing on Aurexo." },
      { property: "og:title", content: "FAQs — Aurexo" },
      { property: "og:description", content: "Answers to common Aurexo questions." },
    ],
  }),
  component: Faqs,
});

const groups = [
  {
    title: "Buying",
    items: [
      ["How do I reserve a vehicle?", "Hit the green 'Reserve' button on any listing. A refundable $500 hold pulls the car off the market for 48 hours."],
      ["Can I test drive before buying?", "Yes — every Aurexo car ships with a 7-day money-back test period after delivery."],
      ["Are vehicle histories included?", "Every listing includes a free Carfax-equivalent report with accident, service, and title history."],
    ],
  },
  {
    title: "Financing",
    items: [
      ["What credit score do I need?", "We work with all credit profiles. Approvals start at FICO 540, with the best rates at 700+."],
      ["Will checking my rate hurt my credit?", "No — pre-approval uses a soft pull only. Hard inquiry happens only when you accept an offer."],
    ],
  },
  {
    title: "Selling",
    items: [
      ["How is my instant offer calculated?", "We pull live auction data, regional demand, and your vehicle's spec to give a fair, transparent number."],
      ["When do I get paid?", "Funds clear via ACH within 1 business day of vehicle handover."],
    ],
  },
];

function Faqs() {
  return (
    <main>
      <PageHeader eyebrow="Help" title="Frequently asked questions." subtitle="If you can't find what you need here, our team is one tap away." />
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
