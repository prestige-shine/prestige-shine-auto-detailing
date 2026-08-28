import { createFileRoute, Link } from "@tanstack/react-router";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { useFavorites } from "@/contexts/FavoritesContext";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Projects — Prestige Shine Auto Detailing" },
      { name: "description", content: "Your saved detailing projects at Prestige Shine Auto Detailing." },
      { property: "og:title", content: "Saved Projects — Prestige Shine Auto Detailing" },
    ],
  }),
  component: Saved,
});

function Saved() {
  const favorites = useFavorites();
  const list = vehicles.filter((v) => favorites.has(v.id));
  return (
    <main className="overflow-x-hidden">
      <PageHeader eyebrow="Your List" title="Saved Projects" subtitle={list.length ? `${list.length} project${list.length === 1 ? "" : "s"} saved.` : "You haven't saved any projects yet."} />
      <section className="mx-auto max-w-6xl px-4 py-10">
        {list.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((v) => <VehicleCard key={v.id} v={v} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-white p-10 text-center">
            <p className="text-sm text-muted-foreground">Tap the heart on any project to save it here.</p>
            <Link to="/buy" className="mt-5 inline-flex items-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Browse recent work</Link>
          </div>
        )}
      </section>
    </main>
  );
}
