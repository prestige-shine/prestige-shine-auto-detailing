import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { useFavorites } from "@/contexts/FavoritesContext";
import { vehicles } from "@/lib/aurexo-data";

export const Route = createFileRoute("/saved")({
  head: () => ({ meta: [
    { title: "Saved Vehicles — Aurexo" },
    { name: "description", content: "Review and compare the vehicles you saved on Aurexo." },
    { property: "og:title", content: "Saved Vehicles — Aurexo" },
    { property: "og:description", content: "Your saved Aurexo vehicle shortlist." },
  ] }),
  component: SavedVehicles,
});

function SavedVehicles() {
  const { ids, clear } = useFavorites();
  const saved = vehicles.filter((vehicle) => ids.includes(vehicle.id));
  return (
    <main>
      <PageHeader eyebrow="Your Shortlist" title="Saved vehicles" subtitle="Keep your strongest candidates together while you compare, finance, and decide." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        {saved.length ? (
          <>
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{saved.length} saved {saved.length === 1 ? "vehicle" : "vehicles"}</p>
              <button onClick={clear} className="min-h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink">Clear all</button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{saved.map((vehicle) => <VehicleCard key={vehicle.id} v={vehicle} />)}</div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-background px-6 py-16 text-center">
            <Heart className="mx-auto h-8 w-8 text-brand" />
            <h2 className="mt-4 text-xl font-bold text-ink">Your shortlist is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any vehicle to save it here.</p>
            <Link to="/buy" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-ink">Browse inventory</Link>
          </div>
        )}
      </section>
    </main>
  );
}