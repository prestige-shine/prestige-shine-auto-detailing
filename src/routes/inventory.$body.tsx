import { createFileRoute, Link } from "@tanstack/react-router";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/inventory/$body")({
  head: ({ params }) => ({
    meta: [
      { title: `${decodeURIComponent(params.body)} Detailing Packages — Prestige Shine` },
      { name: "description", content: `Prestige Shine detailing packages tailored for ${decodeURIComponent(params.body)} vehicles across Miramichi.` },
      { property: "og:title", content: `${decodeURIComponent(params.body)} Detailing Packages — Prestige Shine` },
    ],
  }),
  component: InventoryByBody,
});

function InventoryByBody() {
  const { body } = Route.useParams();
  const target = decodeURIComponent(body);
  const list = vehicles.filter((v) => v.body.toLowerCase() === target.toLowerCase());
  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="By Vehicle Class"
        title={`${target} Detailing Packages`}
        subtitle={`${list.length} package${list.length === 1 ? "" : "s"} tuned for ${target} sizing and labor time.`}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        {list.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((v) => <VehicleCard key={v.id} v={v} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-white p-10 text-center">
            <p className="text-sm text-muted-foreground">No packages listed for this vehicle class yet.</p>
            <Link to="/buy" className="mt-5 inline-flex items-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Browse all packages</Link>
          </div>
        )}
      </section>
    </main>
  );
}
