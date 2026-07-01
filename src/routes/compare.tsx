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
      { title: "Compare System Profiles — Aurexo Roofing Studio" },
      { name: "description", content: "Compare premium Ohio roofing systems side-by-side: lifespan, wind rating, fire class, eco-integration capacity, per-SqFt price, and warranty terms." },
      { property: "og:title", content: "Compare Roofing System Profiles — Aurexo" },
      { property: "og:description", content: "Side-by-side comparison of premium roofing materials and projects." },
    ],
  }),
  component: Compare,
});

type V = (typeof vehicles)[number];

// Material-driven benchmarks for high-ticket Ohio contracting spec sheets.
const materialProfile = (v: V) => {
  switch (v.fuel) {
    case "Slate":
      return { lifespan: "50+ yrs", wind: "110 mph (ASTM D3161 F)", fire: "Class A (ASTM E108)", eco: "Cool-roof rated · natural quarried", pricePerSqft: "$18 – $32", warranty: "50-yr material · 25-yr workmanship" };
    case "Metal":
      return { lifespan: "40–50 yrs", wind: "150 mph (UL 580 Class 90)", fire: "Class A", eco: "100% recyclable · solar-ready standing seam", pricePerSqft: "$10 – $16", warranty: "40-yr PVDF coating · 25-yr workmanship" };
    case "Composite":
      return { lifespan: "40–50 yrs", wind: "130 mph (ASTM D7158 H)", fire: "Class A", eco: "Recycled polymer content · Energy Star", pricePerSqft: "$12 – $22", warranty: "Lifetime limited · 25-yr workmanship" };
    default:
      return { lifespan: "25–30 yrs", wind: "130 mph (ASTM D7158 H)", fire: "Class A", eco: "Recyclable granules · reflective options", pricePerSqft: "$4.50 – $7.50", warranty: "Lifetime limited · 25-yr workmanship" };
  }
};

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

  const rows: { label: string; get: (c: V) => string }[] = [
    { label: "Material family", get: (c) => c.fuel },
    { label: "Manufacturer partner", get: (c) => c.brand },
    { label: "Roof profile", get: (c) => c.body },
    { label: "Square footage", get: (c) => `${c.km} sqft` },
    { label: "Material Lifespan (Years)", get: (c) => materialProfile(c).lifespan },
    { label: "Wind Resistance Rating (MPH)", get: (c) => materialProfile(c).wind },
    { label: "Fire Safety Classification", get: (c) => materialProfile(c).fire },
    { label: "Eco / Solar Integration Capacity", get: (c) => materialProfile(c).eco },
    { label: "Estimated Price per SqFt", get: (c) => materialProfile(c).pricePerSqft },
    { label: "Warranty Terms", get: (c) => materialProfile(c).warranty },
    { label: "Project budget (installed)", get: (c) => c.price },
    { label: "Service type", get: (c) => c.condition },
  ];

  return (
    <main>
      <PageHeader
        eyebrow="Tools"
        title="Compare System Profiles"
        subtitle="Stack up to three Ohio roofing system profiles side by side — lifespan, wind, fire, eco capacity, and warranty benchmarks in one view."
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="overflow-x-auto pb-2">
          <div className="grid min-w-[720px] grid-cols-3 gap-3 sm:gap-4">
            {cars.map((c, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white p-3 sm:p-4">
                {c ? (
                  <>
                    <div className="relative">
                      <img src={c.img} alt={`${c.title} elevation`} className="aspect-video w-full rounded-xl object-cover" loading="lazy" />
                      <button
                        aria-label="Remove roofing profile"
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
                    aria-label="Add roofing profile"
                    onChange={(e) => setPicks(picks.map((p, idx) => (idx === i ? e.target.value : p)))}
                    defaultValue=""
                    className="h-32 w-full rounded-xl border border-dashed border-border bg-surface text-center text-sm text-muted-foreground sm:h-40"
                  >
                    <option value="" disabled>+ Add Roofing Profile</option>
                    {vehicles.map((v) => <option key={v.id} value={v.id}>{v.title}</option>)}
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>

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
