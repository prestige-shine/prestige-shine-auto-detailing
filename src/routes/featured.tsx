import { createFileRoute, Link } from "@tanstack/react-router";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/featured")({
  head: () => ({
    meta: [
      { title: "Featured Detailing Packages — Aurexo Detailing Studio" },
      { name: "description", content: "Hand-picked featured detailing packages selected by the Aurexo team — ceramic coatings, paint corrections, and full detail bundles for every vehicle type." },
      { property: "og:title", content: "Featured Packages — Aurexo Detailing Studio" },
      { property: "og:description", content: "Our team's top detailing package picks this season." },
    ],
  }),
  component: Featured,
});

function Featured() {
  const list = vehicles.filter((v) => v.featured || v.tag === "Studio Pick");
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Studio Picks" title="Featured Detailing Packages" subtitle="Hand-selected packages our certified detailers are recommending this season — from express refreshes to full ceramic transformations." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/buy" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Browse all packages</Link>
        </div>
      </section>
    </main>
  );
}
