import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { STUDIO_PHONE, STUDIO_TEL } from "@/lib/whatsapp";

export const Route = createFileRoute("/dealerships")({
  head: () => ({
    meta: [
      { title: "Studio Locations — Top Coat Auto Detailers" },
      { name: "description", content: "Top Coat Auto Detailers locations across Lahore — Gulberg HQ, DHA, Bahria Town, and Model Town. Climate-controlled bays for ceramic coating and paint correction." },
      { property: "og:title", content: "Studio Locations — Top Coat Auto Detailers" },
      { property: "og:description", content: "Four Lahore detailing studios: Gulberg, DHA, Bahria Town, Model Town." },
    ],
  }),
  component: Locations,
});

const STUDIOS = [
  { city: "Gulberg (HQ)", addr: "1420 Detail Way, Gulberg, Lahore 44113", hours: "Mon–Sat · 8am–7pm", offers: "Ceramic 9H · Multi-stage correction · Interior extraction · Mobile" },
  { city: "DHA", addr: "88 Polish Ave, DHA, Lahore 43215", hours: "Mon–Sat · 8am–7pm", offers: "Ceramic 9H · Correction · Interior · Express" },
  { city: "Bahria Town", addr: "512 Gloss Blvd, Bahria Town, Lahore 45202", hours: "Tue–Sat · 9am–6pm", offers: "Interior extraction · Express · Mobile · Correction" },
  { city: "Model Town", addr: "205 Foam Lane, Model Town, Lahore 44308", hours: "Tue–Sat · 9am–6pm", offers: "Express · Interior · Mobile" },
];

function Locations() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Lahore Coverage" title="Studio Locations" subtitle="Four Lahore detailing studios plus fully mobile service across the state." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {STUDIOS.map((s) => (
            <div key={s.city} className="rounded-2xl border border-border bg-white p-6">
              <h3 className="text-xl font-bold text-ink">{s.city}</h3>
              <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 text-brand" />{s.addr}</p>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground"><Clock className="mt-0.5 h-4 w-4 text-brand" />{s.hours}</p>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground"><Phone className="mt-0.5 h-4 w-4 text-brand" /><a href={`tel:${STUDIO_TEL}`} className="hover:text-ink">{STUDIO_PHONE}</a></p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand">Services offered</p>
              <p className="mt-1 text-sm text-ink">{s.offers}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
