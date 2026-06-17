import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Star, Phone } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/dealerships")({
  head: () => ({
    meta: [
      { title: "Service Areas — Aurexo Roofing Studio" },
      { name: "description", content: "Aurexo Roofing Studio serves homeowners across every major Ohio metro — Cleveland, Columbus, Cincinnati, Akron, Toledo, Dayton, and surrounding communities." },
      { property: "og:title", content: "Service Areas — Aurexo Roofing Studio" },
      { property: "og:description", content: "Premium roofing installations across Ohio." },
    ],
  }),
  component: Dealerships,
});

const dealers = [
  { name: "Aurexo Cleveland Studio", city: "Cleveland, OH", rating: 4.9, inventory: 142, brand: "Slate · Standing-Seam · Architectural" },
  { name: "Aurexo Columbus Studio", city: "Columbus, OH", rating: 4.8, inventory: 96, brand: "Architectural · Composite · Metal" },
  { name: "Aurexo Cincinnati Studio", city: "Cincinnati, OH", rating: 4.7, inventory: 188, brand: "Slate · Synthetic Slate · Copper" },
  { name: "Aurexo Akron Studio", city: "Akron, OH", rating: 4.9, inventory: 64, brand: "Restoration · Heritage Slate" },
  { name: "Aurexo Toledo Studio", city: "Toledo, OH", rating: 4.6, inventory: 220, brand: "Architectural · Stone-Coated Steel" },
  { name: "Aurexo Dayton Studio", city: "Dayton, OH", rating: 4.8, inventory: 78, brand: "Standing-Seam · Premium Aluminium" },
];

function Dealerships() {
  return (
    <main>
      <PageHeader eyebrow="Network" title="Six studios across Ohio." subtitle="Manufacturer-certified crews dispatched from the studio closest to your home." />
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dealers.map((d) => (
          <article key={d.name} className="rounded-2xl bg-white border border-border p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-ink">{d.name}</h3>
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3"/> {d.city}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/15 px-2 py-1 text-xs font-semibold text-ink">
                <Star className="h-3 w-3 text-brand" fill="currentColor" strokeWidth={0}/> {d.rating}
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{d.brand}</p>
            <p className="mt-1 text-sm font-semibold text-ink">{d.inventory} completed projects</p>
            <div className="mt-4 flex gap-2">
              <Link to="/buy" className="flex-1 rounded-xl bg-ink py-2.5 text-center text-xs font-semibold text-white">View projects</Link>
              <a href="tel:+15615550199" className="grid h-10 w-10 place-items-center rounded-xl border border-border"><Phone className="h-4 w-4"/></a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
