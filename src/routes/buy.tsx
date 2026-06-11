import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { vehicles, brands, bodyTypes } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy a Car — Aurexo" },
      { name: "description", content: "Browse thousands of verified vehicles from trusted dealers. Filter by make, body, fuel and price." },
      { property: "og:title", content: "Buy a Car — Aurexo" },
      { property: "og:description", content: "Browse thousands of verified vehicles from trusted dealers." },
    ],
  }),
  component: BuyPage,
});

function BuyPage() {
  const [brand, setBrand] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [sort, setSort] = useState<string>("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    let r = vehicles.filter(
      (v) => (!brand || v.brand === brand) && (!body || v.body === body),
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => priceN(a.price) - priceN(b.price));
    if (sort === "price-desc") r = [...r].sort((a, b) => priceN(b.price) - priceN(a.price));
    if (sort === "year") r = [...r].sort((a, b) => b.year - a.year);
    return r;
  }, [brand, body, sort]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold text-ink">Buy a Car</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Showing {list.length} of {vehicles.length} vehicles
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          onClick={() => setFiltersOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-border bg-white px-4 py-2 text-sm text-ink"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year">Newest Year</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <FiltersPanel brand={brand} setBrand={setBrand} body={body} setBody={setBody} />
        </aside>

        {/* Grid */}
        <div>
          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center text-muted-foreground">
              No vehicles match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {list.map((v) => <VehicleCard key={v.id} v={v} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      {filtersOpen && (
        <>
          <div onClick={() => setFiltersOpen(false)} className="fixed inset-0 z-50 bg-black/50 lg:hidden" />
          <aside className="fixed inset-y-0 left-0 z-50 w-[88%] max-w-sm bg-white p-5 overflow-y-auto lg:hidden">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ink flex items-center gap-2"><Filter className="h-4 w-4"/> Filters</h3>
              <button onClick={() => setFiltersOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-border"><X className="h-4 w-4"/></button>
            </div>
            <div className="mt-4">
              <FiltersPanel brand={brand} setBrand={setBrand} body={body} setBody={setBody} />
            </div>
          </aside>
        </>
      )}
    </main>
  );
}

function FiltersPanel({
  brand, setBrand, body, setBody,
}: { brand: string; setBrand: (s: string) => void; body: string; setBody: (s: string) => void }) {
  return (
    <div className="space-y-5 rounded-2xl bg-white border border-border p-5">
      <div>
        <h4 className="text-sm font-bold text-ink mb-3">Brand</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          <Radio label="Any" checked={brand === ""} onChange={() => setBrand("")} />
          {brands.map((b) => (
            <Radio key={b} label={b} checked={brand === b} onChange={() => setBrand(b)} />
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-bold text-ink mb-3">Body Type</h4>
        <div className="space-y-2">
          <Radio label="Any" checked={body === ""} onChange={() => setBody("")} />
          {bodyTypes.map((b) => (
            <Radio key={b.label} label={b.label} checked={body === b.label} onChange={() => setBody(b.label)} />
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-bold text-ink mb-3">Price</h4>
        <div className="flex gap-2">
          <input className="w-full rounded-lg border border-border px-3 py-2 text-sm" placeholder="Min" />
          <input className="w-full rounded-lg border border-border px-3 py-2 text-sm" placeholder="Max" />
        </div>
      </div>
    </div>
  );
}

function Radio({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
      <span className={`grid h-4 w-4 place-items-center rounded-full border ${checked ? "border-brand" : "border-border"}`}>
        {checked && <span className="h-2 w-2 rounded-full bg-brand" />}
      </span>
      <input type="radio" className="sr-only" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

function priceN(p: string) { return Number(p.replace(/[^0-9]/g, "")); }
