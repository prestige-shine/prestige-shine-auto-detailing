import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Plus } from "lucide-react";
import { vehicles } from "@/lib/aurexo-data";
import { PageHeader } from "@/components/aurexo/PageHeader";

export const Route = createFileRoute("/compare")({
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
  const [picks, setPicks] = useState<(string | null)[]>([vehicles[0].id, vehicles[1].id, null]);
  const cars = picks.map((id) => (id ? vehicles.find((v) => v.id === id) : null));

  const rows: { label: string; key: keyof typeof vehicles[number] | "tag" }[] = [
    { label: "Price", key: "price" },
    { label: "Year", key: "year" },
    { label: "Brand", key: "brand" },
    { label: "Body", key: "body" },
    { label: "Fuel", key: "fuel" },
    { label: "Transmission", key: "transmission" },
    { label: "Mileage (km)", key: "km" },
  ];

  return (
    <main>
      <PageHeader eyebrow="Tools" title="Compare Vehicles" subtitle="Stack up to three cars side by side. Specs, prices, the works." />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {cars.map((c, i) => (
            <div key={i} className="rounded-2xl bg-white border border-border p-3 sm:p-4">
              {c ? (
                <>
                  <div className="relative">
                    <img src={c.img} alt={c.title} className="w-full aspect-video object-cover rounded-xl" loading="lazy" />
                    <button onClick={() => setPicks(picks.map((p, idx) => (idx === i ? null : p)))} className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-white/95 border border-border">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-bold text-ink truncate">{c.title}</p>
                  <p className="text-sm sm:text-lg font-extrabold text-ink">{c.price}</p>
                </>
              ) : (
                <select onChange={(e) => setPicks(picks.map((p, idx) => (idx === i ? e.target.value : p)))} defaultValue="" className="w-full h-32 sm:h-40 rounded-xl border border-dashed border-border bg-surface text-sm text-muted-foreground text-center">
                  <option value="" disabled>+ Add a car</option>
                  {vehicles.map((v) => <option key={v.id} value={v.id}>{v.title}</option>)}
                </select>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white border border-border">
          {rows.map((row, i) => (
            <div key={row.label} className={`grid grid-cols-4 ${i % 2 ? "bg-surface" : ""}`}>
              <div className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-muted-foreground">{row.label}</div>
              {cars.map((c, j) => (
                <div key={j} className="p-3 sm:p-4 text-xs sm:text-sm text-ink font-medium">
                  {c ? String(c[row.key as keyof typeof c] ?? "—") : "—"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
