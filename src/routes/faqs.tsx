import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

const groups = [
  {
    title: "Ceramic Coating",
    items: [
      ["What is a 9H ceramic coating?", "A 9H ceramic coating is a semi-permanent liquid polymer that chemically bonds to your vehicle's paint. It forms a glass-like layer rated 9H on the pencil hardness scale — harder than factory clear coat — providing scratch resistance, UV protection, and extreme hydrophobic properties that cause water and contaminants to bead off effortlessly."],
      ["How long does a ceramic coating last?", "Top Coat applies Gtechniq Crystal Serum Ultra with an EXO v4 topcoat, which carries a 5-year manufacturer-backed warranty when installed by an accredited detailer. With proper maintenance washes, coatings routinely perform well beyond the warranty period."],
      ["Does paint need to be corrected before coating?", "Yes — always. Any swirl marks, light scratches, or water spots trapped beneath the coating become permanent. Top Coat includes at minimum a single-stage machine polish in every ceramic package. Two-stage correction is available for vehicles with deeper paint defects."],
      ["Can a ceramic coating be applied over existing wax or sealant?", "No. All existing waxes and sealants must be stripped completely with an IPA (isopropyl alcohol) panel wipe before coating. Top Coat performs this decontamination step as standard — no corners are cut."],
      ["Will the coating prevent rock chips?", "Ceramic coating significantly improves scratch resistance but is not a substitute for paint protection film (PPF). For rock chip protection on the bonnet and front bumper, we recommend a PPF consult — available free at any Top Coat studio."],
      ["How should I maintain a ceramic-coated car?", "Use a pH-neutral, wax-free shampoo and a soft wash mitt. Avoid automated car washes with brushes. Top Coat recommends a professional maintenance wash every 4–6 months to inspect the coating and apply a ceramic boost spray."],
    ],
  },
  {
    title: "Paint Correction",
    items: [
      ["What is paint correction?", "Paint correction is the process of removing surface defects — swirl marks, light scratches, water spots, oxidation, and buffer trails — using machine polishers and a progression of cutting compounds and finishing polishes. The result is a mirror-like clarity that cannot be achieved by washing or waxing alone."],
      ["How long does a correction take?", "A single-stage polish (light swirl removal) typically takes 4–8 hours depending on vehicle size. A full two-stage correction with heavy cutting and refinement can take two full working days. Top Coat never rushes this process."],
      ["Will paint correction remove deep scratches?", "Single-stage correction removes light to moderate swirls and scuffs. Deep scratches that catch a fingernail cannot be polished out without wet-sanding, which removes more clear coat. Our technicians measure paint thickness before any correction work to ensure safe removal of material."],
      ["How often should I get a paint correction?", "Most vehicles benefit from a correction every 2–3 years. Applying a ceramic coating after correction dramatically extends the interval because the coating protects the corrected surface from new contamination and micro-scratches."],
      ["Does paint correction damage the clear coat?", "When performed by trained technicians using correct pad and compound combinations, correction safely removes only a tiny fraction of the clear coat. Top Coat measures paint depth at every panel before and after correction to confirm safe thickness margins."],
    ],
  },
  {
    title: "Interior Deep Clean",
    items: [
      ["What does an interior deep clean include?", "Top Coat's Full Interior Deep Clean includes a full vacuum, hot-water extraction of all carpet and fabric upholstery, dashboard and trim clay and detail, door card cleaning and conditioning, headliner spot treatment, streak-free window cleaning, odour neutraliser, and UV-protective dressing on all plastics."],
      ["Can you remove pet hair from upholstery?", "Yes. Pet hair is removed using a combination of rubber squeegees, silicone tools, and a high-powered vacuum before hot-water extraction. Heavily embedded hair may require an add-on treatment — our team will advise during check-in."],
      ["How do you remove odours from the interior?", "We treat odours at the source rather than masking them. Top Coat uses hot-water extraction on fabrics, an enzyme-based neutraliser spray, and where necessary an ozone generator session to eliminate bacteria-driven smells permanently."],
      ["Can the leather seats be repaired?", "Top Coat's interior service includes a leather clean and condition. Cracking, fading, or colour loss requires leather restoration — available as an add-on. Our technicians will document leather condition with photos and advise on appropriate treatment during check-in."],
      ["How long does an interior deep clean take?", "Most vehicles are completed in 3–5 hours. Heavily soiled interiors with pet hair, staining, or mould may require 6–8 hours. We'll give you a realistic estimate before work begins."],
    ],
  },
  {
    title: "Mobile Detail",
    items: [
      ["Do you offer mobile detailing?", "Yes. Top Coat offers mobile express exterior washes and interior deep cleans for clients within a 25-mile radius of each studio. Mobile ceramic coating application is not available — ceramic work requires our controlled studio environment."],
      ["What do I need to provide for a mobile appointment?", "Access to a flat, shaded surface and a standard outdoor water tap and electrical outlet. We bring our own equipment, chemicals, and water tank if needed. No driveway? Our team can work in a car park with permission."],
      ["Is mobile detailing the same quality as studio work?", "For wash and interior services, yes — our mobile technicians are studio-trained and use identical products. For paint correction and ceramic coating, studio conditions ensure optimal results and we do not perform these services mobile."],
      ["How far in advance should I book mobile?", "Mobile slots fill quickly. We recommend booking at least 5–7 days in advance. Same-week slots are occasionally available — check via WhatsApp for last-minute availability."],
    ],
  },
  {
    title: "Booking & Pricing",
    items: [
      ["How do I book an appointment?", "Use the Book a Free Assessment form on our website, call +92 321 9200955, or message us on WhatsApp. We'll confirm your vehicle, service, and preferred studio or mobile location within a few hours."],
      ["Are prices fixed or are there surprises?", "All prices are confirmed before work begins. If additional issues are discovered during check-in — like more severe paint damage than expected — we'll photograph the finding and offer a written change order before proceeding. You always authorise what happens next."],
      ["Do you offer payment plans?", "Yes. Top Coat partners with Klarna and a select panel of auto-finance lenders to offer Pay-in-4 (0% interest) and 12–24 month plans for larger ceramic coating packages. See the Financing page for details."],
      ["What is your cancellation policy?", "We ask for 48 hours' notice to reschedule without charge. Cancellations within 24 hours of a booked studio appointment may incur a $50 cancellation fee to cover reserved bay time. Mobile appointments carry a $25 same-day cancellation fee."],
      ["Do you offer fleet or corporate detailing?", "Yes. Top Coat serves corporate fleets, dealerships, and rental companies. Volume pricing and dedicated scheduling are available — contact studio@aurexodetailing.com or call our studio line for a fleet quote."],
      ["Is there a warranty on your work?", "All ceramic coating installations carry a 5-year warranty registered in the vehicle owner's name. If a coating defect develops within the warranty period, we will inspect and re-apply the affected area at no charge. Paint correction workmanship is guaranteed for 12 months."],
    ],
  },
];

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Auto Detailing FAQs — Top Coat Auto Detailers Lahore" },
      { name: "description", content: "Answers to Lahore drivers' most common questions about ceramic coating, paint correction, interior deep cleans, mobile detailing, and booking." },
      { property: "og:title", content: "Detailing FAQs — Top Coat Auto Detailers" },
      { property: "og:description", content: "Expert answers from Lahore's certified detailing professionals." },
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
        subtitle="Everything Lahore vehicle owners ask before, during and after a premium detailing service. Can't find yours? Our studio is one tap away."
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
