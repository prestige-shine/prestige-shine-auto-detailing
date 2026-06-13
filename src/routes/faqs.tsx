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
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: groups.flatMap((group) => group.items.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } }))) }) }],
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
      ["How do I compare vehicles?", "Tap Compare on up to three listings. The comparison page aligns price, condition, mileage, powertrain, warranty, seating, cargo profile, and financing details."],
      ["Can I arrange an independent inspection?", "Yes. For used vehicles, request a pre-purchase inspection before final paperwork. The dealer will coordinate reasonable access and timing."],
      ["What is included in the advertised price?", "The listing price is the vehicle price. Taxes, title, registration, transport, documentation charges, optional products, and financing costs are itemized separately."],
    ],
  },
  {
    title: "Financing",
    items: [
      ["What credit score do I need?", "We work with all credit profiles. Approvals start at FICO 540, with the best rates at 700+."],
      ["Will checking my rate hurt my credit?", "No — pre-approval uses a soft pull only. Hard inquiry happens only when you accept an offer."],
      ["Can I use my own bank or credit union?", "Yes. Bring outside financing and compare its APR, term, amount financed, fees, and total payments with marketplace lender offers."],
      ["How much should I put down?", "The right down payment depends on budget, approval, trade equity, and depreciation. More money down generally reduces principal, interest, and negative-equity risk."],
    ],
  },
  {
    title: "Selling",
    items: [
      ["How is my instant offer calculated?", "We pull live auction data, regional demand, and your vehicle's spec to give a fair, transparent number."],
      ["When do I get paid?", "Funds clear via ACH within 1 business day of vehicle handover."],
      ["Can I sell a financed vehicle?", "Usually. Provide payoff details so the lien can be satisfied during closing. Remaining positive equity is paid after payoff confirmation."],
      ["What documents do sellers need?", "Prepare identification, title or payoff statement, registration, all keys, service records, and state-required transfer documents."],
    ],
  },
  {
    title: "Delivery and support",
    items: [
      ["How does delivery work?", "After payment, insurance, and documents are complete, the dealer confirms a delivery window. Timing and fees depend on distance, carrier capacity, and vehicle type."],
      ["What should I check at delivery?", "Confirm VIN, mileage, keys, accessories, visible condition, and paperwork. Photograph shipping damage before accepting the carrier condition report."],
      ["How do I contact support?", "Use the Contact page or call 1-866-288-6868. Keep your listing, reservation, or application reference ready for faster routing."],
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
