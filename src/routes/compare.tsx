import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { vehicles } from "@/lib/aurexo-data";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { useCompare } from "@/contexts/CompareContext";

type Search = { ids?: string };

export const Route = createFileRoute("/compare")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ids: typeof s.ids === "string" ? s.ids : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Compare Cars — Aurexo" },
      { name: "description", content: "Compare up to three vehicles side by side on price, specs and features." },
      { property: "og:title", content: "Compare Cars — Aurexo" },
      { property: "og:description", content: "Compare vehicles side by side." },
    ],
  }),
  component: Compare,
});

function Compare() {
  const { ids: ctxIds } = useCompare();
  const search = Route.useSearch();

  const initial: (string | null)[] = (() => {
    const fromQuery = search.ids ? search.ids.split(",").filter(Boolean) : [];
    const source = fromQuery.length ? fromQuery : ctxIds;
    const padded = [...source];
    while (padded.length < 3) padded.push("");
    return padded.slice(0, 3).map((s) => (s ? s : null));
  })();

  const [picks, setPicks] = useState<(string | null)[]>(initial);

  useEffect(() => {
    if (!search.ids && ctxIds.length) {
      setPicks([ctxIds[0] ?? null, ctxIds[1] ?? null, ctxIds[2] ?? null]);
    }
  }, [ctxIds, search.ids]);

  const cars = picks.map((id) => (id ? vehicles.find((v) => v.id === id) : null));

  const rows = [
    { label: "Price", get: (c: typeof vehicles[number]) => c.price },
    { label: "Year", get: (c: typeof vehicles[number]) => c.year },
    { label: "Brand", get: (c: typeof vehicles[number]) => c.brand },
    { label: "Body", get: (c: typeof vehicles[number]) => c.body },
    { label: "Condition", get: (c: typeof vehicles[number]) => c.condition },
    { label: "Fuel", get: (c: typeof vehicles[number]) => c.fuel },
    { label: "Transmission", get: (c: typeof vehicles[number]) => c.transmission },
    { label: "Mileage (km)", get: (c: typeof vehicles[number]) => c.km },
    { label: "Estimated monthly (10% down, 60 mo.)", get: (c: typeof vehicles[number]) => `$${Math.round((c.priceNum * 0.9 * (0.059 / 12) * Math.pow(1 + 0.059 / 12, 60)) / (Math.pow(1 + 0.059 / 12, 60) - 1)).toLocaleString()}` },
    { label: "Warranty", get: (c: typeof vehicles[number]) => c.condition === "New Car" ? "4 yr / 50,000 mi" : c.condition === "Certified Pre-Owned" ? "CPO limited warranty" : "Dealer warranty available" },
    { label: "Drivetrain", get: (c: typeof vehicles[number]) => c.body === "SUV" || c.body === "Truck" ? "All-wheel drive" : "Rear-wheel drive" },
    { label: "Seating", get: (c: typeof vehicles[number]) => c.body === "Coupe" ? "2–4 passengers" : c.body === "SUV" ? "5–7 passengers" : "5 passengers" },
    { label: "Cargo profile", get: (c: typeof vehicles[number]) => c.body === "Truck" ? "Full pickup bed" : c.body === "SUV" ? "Expandable rear cargo" : "Enclosed trunk" },
    { label: "Efficiency profile", get: (c: typeof vehicles[number]) => c.fuel === "Electric" ? "Zero tailpipe emissions" : c.fuel === "Hybrid" ? "High efficiency hybrid" : c.fuel === "Diesel" ? "Long-range diesel" : "Gasoline performance" },
    { label: "Best suited for", get: (c: typeof vehicles[number]) => c.body === "Coupe" ? "Performance driving" : c.body === "Truck" ? "Towing and utility" : c.body === "SUV" ? "Family and all-weather use" : "Daily commuting" },
  ];

  return (
    <main>
      <PageHeader eyebrow="Tools" title="Compare Vehicles" subtitle="Stack up to three cars side by side. Specs, prices, the works." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="overflow-x-auto pb-2"><div className="grid min-w-[720px] grid-cols-3 gap-3 sm:gap-4">
          {cars.map((c, i) => (
            <div key={i} className="rounded-2xl border border-border bg-white p-3 sm:p-4">
              {c ? (
                <>
                  <div className="relative">
                    <img src={c.img} alt={c.title} className="aspect-video w-full rounded-xl object-cover" loading="lazy" />
                    <button
                      onClick={() => setPicks(picks.map((p, idx) => (idx === i ? null : p)))}
                      className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full border border-border bg-white/95"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="mt-2 truncate text-xs font-bold text-ink sm:mt-3 sm:text-sm">{c.title}</p>
                  <p className="text-sm font-extrabold text-ink sm:text-lg">{c.price}</p>
                </>
              ) : (
                <select
                  onChange={(e) => setPicks(picks.map((p, idx) => (idx === i ? e.target.value : p)))}
                  defaultValue=""
                  className="h-32 w-full rounded-xl border border-dashed border-border bg-surface text-center text-sm text-muted-foreground sm:h-40"
                >
                  <option value="" disabled>+ Add a car</option>
                  {vehicles.map((v) => <option key={v.id} value={v.id}>{v.title}</option>)}
                </select>
              )}
            </div>
          ))}
        </div></div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white">
          <div className="min-w-[760px]">
          {rows.map((row, i) => (
            <div key={row.label} className={`grid grid-cols-4 ${i % 2 ? "bg-surface" : ""}`}>
              <div className="p-3 text-xs font-semibold text-muted-foreground sm:p-4 sm:text-sm">{row.label}</div>
              {cars.map((c, j) => (
                <div key={j} className="p-3 text-xs font-medium text-ink sm:p-4 sm:text-sm">
                  {c ? String(row.get(c)) : "—"}
                </div>
              ))}
            </div>
          ))}
          </div>
        </div>
      </section>
    </main>
  );
}
