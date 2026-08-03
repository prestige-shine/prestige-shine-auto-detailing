import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { vehicles } from "@/lib/aurexo-data";
import type { Vehicle } from "@/lib/aurexo-data";
import { PageHeader } from "@/components/aurexo/PageHeader";
import { useCompare } from "@/contexts/CompareContext";

type Search = { ids?: string };

export const Route = createFileRoute("/compare")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ids: typeof s.ids === "string" ? s.ids : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Compare Detailing Packages — Prestige Shine Auto Detailing" },
      { name: "description", content: "Detailing Maintenance vs. Ceramic Paint Protection value comparison. Weigh 5-year cost, gloss, hydrophobic performance, and resale impact side-by-side." },
      { property: "og:title", content: "Compare Detailing Packages — Prestige Shine" },
      { property: "og:description", content: "Detailing Maintenance vs Ceramic Paint Protection value comparison tool." },
    ],
  }),
  component: Compare,
});

type V = Vehicle;

// Map service tier -> spec profile
const tierProfile = (v: V) => {
  switch (v.fuel) {
    case "Ceramic":
      return {
        warranty: "5–9 year ceramic warranty",
        interval: "Annual maintenance decontamination",
        protection: "Chemical + UV + hydrophobic",
        cure: "24h dust-free · 7-day full cure",
      };
    case "Correction":
      return {
        warranty: "12-month finish warranty",
        interval: "12–18 months",
        protection: "90%+ defect removal",
        cure: "Ready same day",
      };
    case "Interior":
      return {
        warranty: "30-day satisfaction",
        interval: "Every 3–4 months",
        protection: "Deep extraction · odour neutral",
        cure: "Ready in 4–6 hours",
      };
    default:
      return {
        warranty: "30-day satisfaction",
        interval: "Every 4–6 weeks",
        protection: "Surface wash + sealant",
        cure: "Ready in 2 hours",
      };
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

  const cars = picks.map((id) => (id ? vehicles.find((v) => v.id === id) ?? null : null));

  const rows: { label: string; get: (c: V) => string }[] = [
    { label: "Vehicle Class", get: (c) => c.body },
    { label: "Vehicle Make", get: (c) => c.brand },
    { label: "Service Tier", get: (c) => c.fuel },
    { label: "Finish Focus", get: (c) => c.transmission },
    { label: "Estimated Labor (minutes)", get: (c) => `${c.km} min` },
    { label: "Package Price", get: (c) => c.price },
    { label: "Warranty", get: (c) => tierProfile(c).warranty },
    { label: "Recommended Interval", get: (c) => tierProfile(c).interval },
    { label: "Protection Profile", get: (c) => tierProfile(c).protection },
    { label: "Ready / Cure", get: (c) => tierProfile(c).cure },
    { label: "Booking Status", get: (c) => c.condition },
  ];

  return (
    <main className="overflow-x-hidden">
      <PageHeader
        eyebrow="Value Tool"
        title="Detailing Maintenance vs. Ceramic Paint Protection"
        subtitle="Weigh wax-and-wash maintenance against Prestige Shine's 9H Ceramic Paint Protection — 5-year cost, gloss, hydrophobic behavior, and resale impact — then stack up to three packages side-by-side."
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Maintenance vs Ceramic panel */}
        <div className="overflow-x-auto rounded-2xl border border-border bg-white">
          <div className="min-w-[560px] grid grid-cols-3">
            <div className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
              Value benchmark
            </div>
            <div className="p-4 border-b border-l border-border">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Traditional</p>
              <p className="mt-1 font-bold text-ink">Wax & Wash Maintenance</p>
            </div>
            <div className="p-4 border-b border-l border-border bg-brand/10">
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand">Prestige Shine</p>
              <p className="mt-1 font-bold text-ink">9H Ceramic Paint Protection</p>
            </div>

            {[
              ["Annual cost", "~$960 / yr", "$1,899 one-time"],
              ["Protection duration", "2–3 months per wax", "5–9 years"],
              ["Gloss score", "6 / 10", "10 / 10"],
              ["Hydrophobic score", "3 / 10", "10 / 10"],
              ["5-year total cost of ownership", "$4,800", "$1,899"],
              ["Resale bump on trade-in", "+$0", "+$1,500"],
              ["Wash time saved", "—", "~40% faster weekly wash"],
            ].map(([k, a, b], i) => (
              <div key={k} className={`contents ${i % 2 ? "" : ""}`}>
                <div className="p-4 text-xs font-semibold text-muted-foreground border-t border-border sm:text-sm">{k}</div>
                <div className="p-4 text-xs font-medium text-ink border-t border-l border-border sm:text-sm">{a}</div>
                <div className="p-4 text-xs font-bold text-ink border-t border-l border-border bg-brand/5 sm:text-sm">{b}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Three-slot picker */}
        <h2 className="mt-12 text-xl font-bold text-ink sm:text-2xl">Stack up to three packages</h2>
        <p className="mt-1 text-sm text-muted-foreground">Add packages from the studio and compare vehicle class, tier, labor, warranty, and booking status.</p>

        <div className="mt-6 overflow-x-auto pb-2">
          <div className="grid min-w-[720px] grid-cols-3 gap-3 sm:gap-4">
            {cars.map((c, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white p-3 sm:p-4">
                {c ? (
                  <>
                    <div className="relative">
                      <img src={c.img} alt={c.title} className="aspect-video w-full rounded-xl object-cover" loading="lazy" />
                      <button
                        aria-label="Remove package"
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
                    aria-label="Add detailing package"
                    onChange={(e) => setPicks(picks.map((p, idx) => (idx === i ? e.target.value : p)))}
                    defaultValue=""
                    className="h-32 w-full rounded-xl border border-dashed border-border bg-surface text-center text-sm text-muted-foreground sm:h-40"
                  >
                    <option value="" disabled>+ Add Detailing Package</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>{v.title}</option>
                    ))}
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
