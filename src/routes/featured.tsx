import { createFileRoute, Link } from "@tanstack/react-router";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/featured")({
  head: () => ({
    meta: [
      { title: "Featured Vehicles — Aurexo" },
      { name: "description", content: "Staff picks and promoted vehicles selected by Aurexo's editorial team for value, condition and demand." },
      { property: "og:title", content: "Featured Vehicles — Aurexo" },
      { property: "og:description", content: "Editorial picks across our marketplace." },
    ],
  }),
  component: Featured,
});

function Featured() {
  const list = vehicles.filter((v) => v.featured || v.tag === "Studio Pick");
  return (
    <main>
      <PageHeader eyebrow="Editor's Pick" title="Featured Vehicles" subtitle="Hand-selected listings our team is shouting about this week." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => <VehicleCard key={v.id} v={v} />)}
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
