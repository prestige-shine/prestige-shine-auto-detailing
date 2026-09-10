import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

const groups = [
  {
    title: "Ceramic Coating",
    items: [
      ["What is a 9H ceramic coating?", "A 9H ceramic coating refers to a coating that has achieved a 9H rating in pencil-hardness testing. Certain System X ceramic coatings are tested to this level and are designed to provide a hard, glossy, hydrophobic protective layer over automotive paint. The coating can help resist environmental contaminants and make the vehicle easier to maintain, but it does not make the paint scratch-proof or prevent all surface damage."],
      ["How long does a ceramic coating last?", "Durability and applicable manufacturer warranty coverage depend on the specific System X coating installed. Our ceramic coating options include 3-Year Ceramic Protection (from $800), System X 6-Year Ceramic Coating (from $1,200), and Correction + 6-Year Ceramic (from $1,500). The applicable System X warranty terms, registration, inspection requirements, and maintenance conditions apply to the specific product installed."],
      ["Does paint need to be corrected before coating?", "Yes. Any existing swirl marks, light scratches, or water spots should be addressed before coating application because the coating is applied over the prepared paint surface. Prestige Shine includes paint preparation appropriate to the selected ceramic coating package. Where additional correction is needed, two-stage paint correction is available for vehicles with deeper or more extensive paint defects."],
      ["Can a ceramic coating be applied over existing wax or sealant?", "Before coating, existing waxes, sealants, oils, and other residues must be removed so the paint is properly prepared for application. Prestige Shine performs a thorough decontamination and IPA panel wipe as part of the coating preparation process to ensure the surface is clean and ready for the selected System X coating."],
      ["Will the coating prevent rock chips?", "A ceramic coating significantly improves chemical and UV resistance and makes washing far easier, but it will not prevent rock chips or physical impact damage. Prestige Shine does not currently install paint protection film (PPF)."],
      ["How should I maintain a ceramic-coated car?", "Use a pH-neutral, wax-free shampoo and a soft wash mitt. Avoid automated car washes with brushes, which can cause unnecessary wear to the coating. Prestige Shine recommends a professional maintenance wash every 4–6 months to inspect the coating and apply a ceramic boost spray."],
    ],
  },
  {
    title: "Paint Correction",
    items: [
      ["What is paint correction?", "Paint correction is the process of reducing or removing surface defects such as swirl marks, light scratches, water spots, oxidation, and buffer trails using machine polishers and a progression of cutting compounds and finishing polishes. The result is a clearer, more refined finish that cannot be achieved through washing or waxing alone."],
      ["How long does a correction take?", "A single-stage polish for light swirl removal is typically completed within a half to full day, depending on the vehicle's size, condition, and the level of correction required. A full two-stage correction involving heavier cutting and refinement generally requires significantly more time and may take up to two working days. These are estimates only, as every vehicle requires a different level of preparation and correction. Prestige Shine never rushes the process; each vehicle receives the time and attention required to achieve the best possible finish."],
      ["Will paint correction remove deep scratches?", "Single-stage correction is designed to reduce or remove light to moderate swirls and scuffs. Deep scratches that catch a fingernail may extend too far into the clear coat to be safely polished out. Correcting defects of this depth may require wet-sanding or other more intensive techniques, which remove additional clear coat and are not always appropriate. Kevin measures paint thickness before correction work to help ensure that material is removed safely and responsibly."],
      ["How often should I get a paint correction?", "The need for paint correction varies depending on the vehicle's condition, how it is washed and maintained, and how it is used. Many vehicles may benefit from periodic correction as new surface defects develop over time. Applying a ceramic coating after correction can help maintain the finish by improving resistance to contamination and making routine washing easier. However, the coating does not prevent all scratches or surface defects, and the condition of the paint will still depend on proper care and maintenance."],
      ["Does paint correction damage the clear coat?", "When performed by a trained detailer using appropriate pad and compound combinations, paint correction is carried out with the goal of removing as little clear coat as reasonably necessary. Prestige Shine measures paint depth before correction work and checks panels throughout the process to help maintain safe thickness margins."],
    ],
  },
  {
    title: "Interior Deep Clean",
    items: [
      ["What does an interior deep clean include?", "Prestige Shine's Full Interior Deep Clean includes a full vacuum, hot-water extraction of carpet and fabric upholstery, dashboard and trim clay treatment and detailing, door-card cleaning and conditioning, headliner spot treatment, streak-free window cleaning, odour neutralisation, and UV-protective dressing for interior plastics."],
      ["Can you remove pet hair from upholstery?", "Yes. Pet hair is removed using a combination of rubber squeegees, silicone tools, and a high-powered vacuum before hot-water extraction. Heavily embedded pet hair may require an additional treatment, which Kevin will assess and discuss with you during check-in."],
      ["How do you remove odours from the interior?", "Odours are treated at the source rather than simply masked. Prestige Shine uses hot-water extraction on fabrics and an enzyme-based neutraliser where appropriate. When necessary, an ozone treatment may also be used as part of the odour-removal process. Results depend on the source and severity of the odour, and some persistent odours may require additional treatment."],
      ["Can the leather seats be repaired?", "Prestige Shine's interior service includes leather cleaning and conditioning. Cracking, fading, or significant colour loss may require leather restoration, available as an add-on service. Kevin will document the leather's condition with photos and advise on the appropriate treatment during check-in."],
      ["How long does an interior deep clean take?", "Most interior services are completed within an estimated 3–5 hours, depending on the vehicle's size and condition. Heavily soiled interiors with significant pet hair, staining, or mould may require additional time. Kevin will provide a realistic time estimate before work begins based on the vehicle's condition and the services required."],
    ],
  },
  {
    title: "Booking & Pricing",
    items: [
      ["How do I book an appointment?", "Prestige Shine operates by appointment only. Use the Get an Estimate form on the website, call +1 (506) 251-4451, or message Kevin on WhatsApp. Kevin will review your vehicle and requested service, then confirm the appointment and drop-off details for the Miramichi location."],
      ["Are prices fixed or are there surprises?", "All pricing is confirmed before work begins. If additional issues are discovered during check-in, such as more severe paint damage than initially expected, Kevin will document the condition with photos and explain any additional work and associated cost before proceeding. No additional work will be carried out without your approval. Full Detail starts at $200 for cars, with pricing varying by vehicle size: $225 for compact SUVs, $275 for mid-size SUVs, $300 for large/3-row SUVs, $350 for XL SUVs, $300 for pickup trucks, and $350 for large/HD trucks. Full Detail + Paint Enhancement starts at $450 for cars and can range up to $700 for XL SUVs and HD trucks. Paint enhancement starts at $300, two-step correction at $600, and advanced multi-stage correction at $900. Ceramic coating packages start at $800. Final pricing depends on the vehicle's size, condition, and the level of service required. Excessive pet hair, staining, heavy soiling, or unusually neglected vehicles may require additional charges. Kevin will confirm the final price before work begins."],
      ["What is your cancellation policy?", "We ask for 48 hours' notice to reschedule without charge. Cancellations within 24 hours of a booked appointment may incur a $50 cancellation fee to cover reserved bay time."],
      ["What ceramic packages do you offer?", "Three ceramic coating options are available: 3-Year Ceramic Protection from $800, System X 6-Year Ceramic Coating from $1,200, and Correction + 6-Year Ceramic from $1,500. Kevin is a System X certified installer and will recommend the appropriate option after reviewing the condition of your paint. Product durability and any applicable manufacturer warranty are subject to the specific System X product, warranty terms, and required maintenance."],
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
