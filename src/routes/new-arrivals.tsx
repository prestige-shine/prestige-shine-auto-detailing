import { createFileRoute, Link } from "@tanstack/react-router";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "Recently Added Projects — Prestige Shine Auto Detailing" },
      { name: "description", content: "The latest detailing packages and vehicle transformations added at Prestige Shine Auto Detailing across Miramichi." },
      { property: "og:title", content: "Recently Added Projects — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "Newest ceramic coating, paint correction, and interior deep clean packages added this month." },
    ],
  }),
  component: NewArrivals,
});

function NewArrivals() {
  const currentYear = Math.max(...vehicles.map((v) => v.year));
  const list = vehicles
    .filter((v) => v.condition === "Booked" || v.year === currentYear)
    .sort((a, b) => b.year - a.year || a.kmNum - b.kmNum);

  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="Just Added"
        title="Recently Added Projects"
        subtitle={`${list.length} recently completed and in-progress projects.`}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, 15).map((v) => (
            <VehicleCard key={v.id} v={v} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/buy" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
            Browse all work
          </Link>
        </div>
      </section>
    </main>
  );
}

