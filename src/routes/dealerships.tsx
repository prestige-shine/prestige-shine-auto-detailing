import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { STUDIO_PHONE, STUDIO_TEL } from "@/lib/whatsapp";

export const Route = createFileRoute("/dealerships")({
  head: () => ({
    meta: [
      { title: "Studio Location — Prestige Shine Auto Detailing, Miramichi NB" },
      { name: "description", content: "Prestige Shine Auto Detailing is located at 229 Jacqueline Dr, Miramichi, NB E1N 3Z2 — serving Miramichi and surrounding areas with ceramic coating and paint correction." },
      { property: "og:title", content: "Studio Location — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "229 Jacqueline Dr, Miramichi, NB — serving Miramichi and surrounding areas." },
    ],
  }),
  component: Locations,
});

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Prestige%20Shine%20Auto%20Detailing%2C%20229%20Jacqueline%20Dr%2C%20Miramichi%2C%20NB%20E1N%203Z2";

const STUDIOS = [
  {
    city: "Miramichi Studio",
    addr: "229 Jacqueline Dr, Miramichi, NB E1N 3Z2, Canada",
    hours: "By Appointment Only",
    offers: "Full detailing · Paint enhancement · Paint correction · Professional ceramic coatings",
  },
];

function Locations() {
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Miramichi Coverage" title="Studio Location" subtitle="Prestige Shine Auto Detailing Miramichi is an appointment-only professional detailing studio specializing in full detailing, paint enhancement, paint correction and professional ceramic coatings." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {STUDIOS.map((s) => (
            <div key={s.city} className="rounded-2xl border border-border bg-white p-6">
              <h3 className="text-xl font-bold text-ink">{s.city}</h3>
              <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
  <a
    href={GOOGLE_MAPS_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-brand hover:underline underline-offset-2"
  >
    {s.addr}
  </a>
</p>
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
