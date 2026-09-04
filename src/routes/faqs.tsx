import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

const groups = [
  {
    title: "Ceramic Coating",
    items: [
      ["What is a 9H ceramic coating?", "A 9H ceramic coating is a semi-permanent liquid polymer that chemically bonds to your vehicle's paint. It forms a glass-like layer rated 9H on the pencil hardness scale — harder than factory clear coat — providing scratch resistance, UV protection, and extreme hydrophobic properties that cause water and contaminants to bead off effortlessly."],
      ["How long does a ceramic coating last?", "Durability depends on the package you choose. We offer 3-Year Ceramic Protection (from $800), the System X 6-Year Ceramic Coating (from $1,200), and Correction + 6-Year Ceramic (from $1,500). Each package is rated for the term in its name when maintained with regular pH-neutral washes."],
      ["Does paint need to be corrected before coating?", "Yes — always. Any swirl marks, light scratches, or water spots trapped beneath the coating become permanent. Prestige Shine includes at minimum a single-stage machine polish in every ceramic package. Two-stage correction is available for vehicles with deeper paint defects."],
      ["Can a ceramic coating be applied over existing wax or sealant?", "No. All existing waxes and sealants must be stripped completely with an IPA (isopropyl alcohol) panel wipe before coating. Prestige Shine performs this decontamination step as standard — no corners are cut."],
      ["Will the coating prevent rock chips?", "No. A ceramic coating significantly improves chemical and UV resistance and makes washing far easier, but it will not stop rock chips. Prestige Shine does not currently install paint protection film."],
      ["How should I maintain a ceramic-coated car?", "Use a pH-neutral, wax-free shampoo and a soft wash mitt. Avoid automated car washes with brushes. Prestige Shine recommends a professional maintenance wash every 4–6 months to inspect the coating and apply a ceramic boost spray."],
    ],
  },
  {
    title: "Paint Correction",
    items: [
      ["What is paint correction?", "Paint correction is the process of removing surface defects — swirl marks, light scratches, water spots, oxidation, and buffer trails — using machine polishers and a progression of cutting compounds and finishing polishes. The result is a mirror-like clarity that cannot be achieved by washing or waxing alone."],
      ["How long does a correction take?", "A single-stage polish (light swirl removal) typically takes 4–8 hours depending on vehicle size. A full two-stage correction with heavy cutting and refinement can take two full working days. Prestige Shine never rushes this process."],
      ["Will paint correction remove deep scratches?", "Single-stage correction removes light to moderate swirls and scuffs. Deep scratches that catch a fingernail cannot be polished out without wet-sanding, which removes more clear coat. Kevin measures paint thickness before any correction work to ensure safe removal of material."],
      ["How often should I get a paint correction?", "Most vehicles benefit from a correction every 2–3 years. Applying a ceramic coating after correction dramatically extends the interval because the coating protects the corrected surface from new contamination and micro-scratches."],
      ["Does paint correction damage the clear coat?", "When performed by a trained detailer using correct pad and compound combinations, correction safely removes only a tiny fraction of the clear coat. Prestige Shine measures paint depth at every panel before and after correction to confirm safe thickness margins."],
    ],
  },
  {
    title: "Interior Deep Clean",
    items: [
      ["What does an interior deep clean include?", "Prestige Shine's Full Interior Deep Clean includes a full vacuum, hot-water extraction of all carpet and fabric upholstery, dashboard and trim clay and detail, door card cleaning and conditioning, headliner spot treatment, streak-free window cleaning, odour neutraliser, and UV-protective dressing on all plastics."],
      ["Can you remove pet hair from upholstery?", "Yes. Pet hair is removed using a combination of rubber squeegees, silicone tools, and a high-powered vacuum before hot-water extraction. Heavily embedded hair may require an add-on treatment — Kevin will advise during check-in."],
      ["How do you remove odours from the interior?", "We treat odours at the source rather than masking them. Prestige Shine uses hot-water extraction on fabrics, an enzyme-based neutraliser spray, and where necessary an ozone generator session to eliminate bacteria-driven smells permanently."],
      ["Can the leather seats be repaired?", "Prestige Shine's interior service includes a leather clean and condition. Cracking, fading, or colour loss requires leather restoration — available as an add-on. Kevin will document leather condition with photos and advise on appropriate treatment during check-in."],
      ["How long does an interior deep clean take?", "Most vehicles are completed in 3–5 hours. Heavily soiled interiors with pet hair, staining, or mould may require 6–8 hours. We'll give you a realistic estimate before work begins."],
    ],
  },
  {
    title: "Booking & Pricing",
    items: [
      ["How do I book an appointment?", "Prestige Shine operates By Appointment Only. Use the Get an Estimate form on our website, call +1 (506) 251-4451, or message us on WhatsApp. We'll confirm your vehicle, service and drop-off time at our Miramichi shop within a few hours."],
      ["Are prices fixed or are there surprises?", "All prices are confirmed before work begins. If additional issues are discovered during check-in — like more severe paint damage than expected — we'll photograph the finding and offer a written change order before proceeding. You always authorise what happens next."],
      ["What does a service cost?", "Full Detail starts at $200 for cars, $225 compact SUVs, $275 mid-size SUVs, $300 large/3-row SUVs, $350 XL SUVs, $300 pickup trucks and $350 large/HD trucks. Full Detail + Paint Enhancement starts at $450 for cars up to $700 for XL SUVs and HD trucks. Paint enhancement starts at $300, 2-step correction at $600 and advanced multi-stage correction at $900. Ceramic packages start at $800. Final pricing is based on vehicle size and condition — excessive pet hair, staining, heavy soiling or unusually neglected vehicles may cost more."],
      ["What is your cancellation policy?", "We ask for 48 hours' notice to reschedule without charge. Cancellations within 24 hours of a booked appointment may incur a $50 cancellation fee to cover reserved bay time."],
      ["Do you offer fleet or corporate detailing?", "Yes. Prestige Shine serves corporate fleets, dealerships, and rental companies. Volume pricing and dedicated scheduling are available — contact prestige101shine@gmail.com or call us for a fleet quote."],
      ["What ceramic packages do you offer?", "Three: 3-Year Ceramic Protection from $800, the System X 6-Year Ceramic Coating from $1,200, and Correction + 6-Year Ceramic from $1,500. Kevin is a System X certified installer and will recommend the right option after reviewing your paint."],
    ],
  },
];

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Auto Detailing FAQs — Prestige Shine Auto Detailing Miramichi" },
      { name: "description", content: "Answers to Miramichi drivers' most common questions about ceramic coating, paint enhancement, paint correction, interior deep cleans and booking." },
      { property: "og:title", content: "Detailing FAQs — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "Expert answers from Miramichi's certified detailing professionals." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: groups.flatMap((group) =>
            group.items.map(([question, answer]) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            }))
          ),
        }),
      },
    ],
  }),
  component: Faqs,
});

function Faqs() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="Help"
        title="Detailing questions, answered."
        subtitle="Everything Miramichi vehicle owners ask before, during and after a premium detailing service. Can't find yours? We're one tap away — By Appointment Only, with drop-off at our Miramichi shop."
      />
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
