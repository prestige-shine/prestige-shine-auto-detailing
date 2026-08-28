import { createFileRoute, Link } from "@tanstack/react-router";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/featured")({
  head: () => ({
    meta: [
      { title: "Featured Projects — Prestige Shine Auto Detailing" },
      { name: "description", content: "Hand-picked completed projects by Prestige Shine Auto Detailing — ceramic coatings, paint corrections, and full details across a range of vehicles." },
      { property: "og:title", content: "Featured Projects — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "A closer look at recent work completed in the studio." },
    ],
  }),
  component: Featured,
});

function Featured() {
  const list = vehicles.filter((v) => v.featured);
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Studio Picks" title="Featured Projects" subtitle="A closer look at standout projects recently completed in the studio." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/buy" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Browse all work</Link>
        </div>
      </section>
    </main>
  );
}
