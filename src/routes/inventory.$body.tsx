import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { vehicles } from "@/lib/aurexo-data";

const bodies = ["sedan", "suv", "coupe", "hatchback", "truck"] as const;

export const Route = createFileRoute("/inventory/$body")({
  loader: ({ params }) => {
    const slug = params.body.toLowerCase();
    if (!bodies.includes(slug as typeof bodies[number])) throw notFound();
    const body = slug === "suv" ? "SUV" : slug.charAt(0).toUpperCase() + slug.slice(1);
    return { body, inventory: vehicles.filter((vehicle) => vehicle.body === body) };
  },
  head: ({ loaderData }) => ({ meta: loaderData ? [
    { title: `${loaderData.body} Cars for Sale — Aurexo` },
    { name: "description", content: `Shop verified ${loaderData.body} vehicles with transparent pricing, financing, and vehicle details on Aurexo.` },
    { property: "og:title", content: `${loaderData.body} Cars for Sale — Aurexo` },
    { property: "og:description", content: `Browse ${loaderData.body}-exclusive Aurexo inventory.` },
  ] : [] }),
  errorComponent: () => <div className="mx-auto max-w-3xl px-4 py-20 text-center">This inventory could not be loaded.</div>,
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-4 py-20 text-center">Vehicle class not found.</div>,
  component: BodyInventory,
});

function BodyInventory() {
  const { body, inventory } = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-wider text-brand">Body style inventory</p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">{body} vehicles for sale</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Explore only {body.toLowerCase()} models, with accurate pricing, mileage, powertrain, and condition data for every listing.</p>
      <div className="mt-5 flex flex-wrap gap-2">{bodies.map((item) => <Link key={item} to="/inventory/$body" params={{ body: item }} className={`rounded-full border px-4 py-2 text-sm font-semibold ${item === body.toLowerCase() ? "border-brand bg-brand text-ink" : "border-border bg-background text-ink"}`}>{item === "suv" ? "SUV" : item[0].toUpperCase() + item.slice(1)}</Link>)}</div>
      {inventory.length ? <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{inventory.map((vehicle) => <VehicleCard key={vehicle.id} v={vehicle} />)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-border bg-background p-10 text-center text-muted-foreground">No {body.toLowerCase()} vehicles are currently available.</div>}
    </main>
  );
}