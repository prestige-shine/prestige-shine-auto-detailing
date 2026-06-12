import { createFileRoute, Link } from "@tanstack/react-router";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — Aurexo" },
      { name: "description", content: "Fresh inventory just dropped. Browse the latest 2026 vehicles and brand-new condition cars on Aurexo." },
      { property: "og:title", content: "New Arrivals — Aurexo" },
      { property: "og:description", content: "The latest cars added to our inventory this month." },
    ],
  }),
  component: NewArrivals,
});

function NewArrivals() {
  const currentYear = Math.max(...vehicles.map(v => v.year));
  const list = vehicles
    .filter((v) => v.condition === "New Car" || v.year === currentYear)
    .sort((a, b) => b.year - a.year || a.kmNum - b.kmNum);

  return (
    <main>
      <PageHeader eyebrow="Just Listed" title="New Arrivals" subtitle={`${list.length} brand-new and current-year vehicles, freshly added to the lot.`} />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, 15).map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/buy" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
            Browse all inventory
          </Link>
        </div>
      </section>
    </main>
  );
}
