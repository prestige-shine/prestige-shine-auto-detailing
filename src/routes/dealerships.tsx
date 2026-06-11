import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Star, Phone } from "lucide-react";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/dealerships")({
  head: () => ({
    meta: [
      { title: "Car Dealerships — Aurexo" },
      { name: "description", content: "Explore Aurexo's network of 340+ verified dealerships across the country." },
      { property: "og:title", content: "Car Dealerships — Aurexo" },
      { property: "og:description", content: "Explore Aurexo's verified dealer network." },
    ],
  }),
  component: Dealerships,
});

const dealers = [
  { name: "Peachtree Motors", city: "Atlanta, GA", rating: 4.9, inventory: 142, brand: "Ford · BMW · Toyota" },
  { name: "Bay Area Auto Group", city: "San Francisco, CA", rating: 4.8, inventory: 96, brand: "Tesla · Rivian · Audi" },
  { name: "Downtown Cars NYC", city: "New York, NY", rating: 4.7, inventory: 188, brand: "Mercedes · BMW · Porsche" },
  { name: "Sunset Garage", city: "Miami, FL", rating: 4.9, inventory: 64, brand: "Ferrari · Lamborghini" },
  { name: "Lone Star Auto", city: "Dallas, TX", rating: 4.6, inventory: 220, brand: "Chevrolet · Ford · GMC" },
  { name: "Pacific Coast Motors", city: "Seattle, WA", rating: 4.8, inventory: 78, brand: "Subaru · Toyota · Honda" },
];

function Dealerships() {
  return (
    <main>
      <PageHeader eyebrow="Network" title="340+ verified dealerships." subtitle="Every dealer rated by real Aurexo buyers." />
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
            <p className="mt-1 text-sm font-semibold text-ink">{d.inventory} vehicles in stock</p>
            <div className="mt-4 flex gap-2">
              <Link to="/buy" className="flex-1 rounded-xl bg-ink py-2.5 text-center text-xs font-semibold text-white">View inventory</Link>
              <a href="tel:18662886868" className="grid h-10 w-10 place-items-center rounded-xl border border-border"><Phone className="h-4 w-4"/></a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
