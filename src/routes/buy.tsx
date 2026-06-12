import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { vehicles, brands, bodyTypes, fuelTypes, transmissions, conditions, priceMax, priceMin } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";
import { Slider } from "@/components/ui/slider";

const PER_PAGE = 12;

type Search = {
  preset?: "new" | "featured";
  q?: string;
};

export const Route = createFileRoute("/buy")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    preset: s.preset === "new" || s.preset === "featured" ? s.preset : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Buy a Car — Aurexo" },
      { name: "description", content: "Browse our full inventory of verified vehicles. Filter by brand, body, fuel, transmission, condition and price." },
      { property: "og:title", content: "Buy a Car — Aurexo" },
      { property: "og:description", content: "Browse verified vehicles from trusted dealers." },
    ],
  }),
  component: BuyPage,
});

function BuyPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [brandSel, setBrandSel] = useState<string[]>([]);
  const [bodySel, setBodySel] = useState<string[]>([]);
  const [fuelSel, setFuelSel] = useState<string[]>([]);
  const [transSel, setTransSel] = useState<string[]>([]);
  const [condSel, setCondSel] = useState<string[]>(
    search.preset === "new" ? ["New Car"] : [],
  );
  const [price, setPrice] = useState<[number, number]>([priceMin, priceMax]);
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    let r = vehicles.filter((v) => {
      if (brandSel.length && !brandSel.includes(v.brand)) return false;
      if (bodySel.length && !bodySel.includes(v.body)) return false;
      if (fuelSel.length && !fuelSel.includes(v.fuel)) return false;
      if (transSel.length && !transSel.includes(v.transmission)) return false;
      if (condSel.length && !condSel.includes(v.condition)) return false;
      if (v.priceNum < price[0] || v.priceNum > price[1]) return false;
      if (search.preset === "featured" && !v.featured) return false;
      return true;
    });
    if (sort === "price-asc") r = [...r].sort((a, b) => a.priceNum - b.priceNum);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.priceNum - a.priceNum);
    if (sort === "year") r = [...r].sort((a, b) => b.year - a.year);
    if (sort === "km") r = [...r].sort((a, b) => a.kmNum - b.kmNum);
    return r;
  }, [brandSel, bodySel, fuelSel, transSel, condSel, price, sort, search.preset]);

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const pageItems = list.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const reset = () => {
    setBrandSel([]); setBodySel([]); setFuelSel([]); setTransSel([]); setCondSel([]);
    setPrice([priceMin, priceMax]); setPage(1);
    navigate({ to: "/buy", search: {} });
  };

  const titleByPreset =
    search.preset === "new" ? "New Arrivals" :
    search.preset === "featured" ? "Featured Vehicles" :
    "All Vehicles";

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold text-ink">{titleByPreset}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Showing {pageItems.length} of {list.length} matching vehicles
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
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
          <option value="km">Lowest Mileage</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <FiltersPanel
            brandSel={brandSel} setBrandSel={setBrandSel}
            bodySel={bodySel} setBodySel={setBodySel}
            fuelSel={fuelSel} setFuelSel={setFuelSel}
            transSel={transSel} setTransSel={setTransSel}
            condSel={condSel} setCondSel={setCondSel}
            price={price} setPrice={setPrice}
            onReset={reset}
          />
        </aside>

        <div>
          {pageItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center text-muted-foreground">
              No vehicles match your filters.
              <button onClick={reset} className="ml-2 font-semibold text-ink underline">Clear all</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {pageItems.map((v) => <VehicleCard key={v.id} v={v} />)}
              </div>
              <Pagination page={safePage} pages={pages} onChange={setPage} />
            </>
          )}
        </div>
      </div>

      {filtersOpen && (
        <>
          <div onClick={() => setFiltersOpen(false)} className="fixed inset-0 z-50 bg-black/50 lg:hidden" />
          <aside className="fixed inset-y-0 left-0 z-50 w-[90%] max-w-sm overflow-y-auto bg-white p-5 lg:hidden">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-bold text-ink"><SlidersHorizontal className="h-4 w-4"/> Filters</h3>
              <button onClick={() => setFiltersOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-border"><X className="h-4 w-4"/></button>
            </div>
            <div className="mt-4">
              <FiltersPanel
                brandSel={brandSel} setBrandSel={setBrandSel}
                bodySel={bodySel} setBodySel={setBodySel}
                fuelSel={fuelSel} setFuelSel={setFuelSel}
                transSel={transSel} setTransSel={setTransSel}
                condSel={condSel} setCondSel={setCondSel}
                price={price} setPrice={setPrice}
                onReset={reset}
              />
            </div>
          </aside>
        </>
      )}
    </main>
  );
}

function FiltersPanel(props: {
  brandSel: string[]; setBrandSel: (s: string[]) => void;
  bodySel: string[]; setBodySel: (s: string[]) => void;
  fuelSel: string[]; setFuelSel: (s: string[]) => void;
  transSel: string[]; setTransSel: (s: string[]) => void;
  condSel: string[]; setCondSel: (s: string[]) => void;
  price: [number, number]; setPrice: (p: [number, number]) => void;
  onReset: () => void;
}) {
  const toggle = (arr: string[], val: string, set: (a: string[]) => void) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  return (
    <div className="space-y-5 rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-ink">Filters</h4>
        <button onClick={props.onReset} className="text-xs font-medium text-muted-foreground hover:text-ink">Reset</button>
      </div>

      <Group title="Price">
        <div className="px-1">
          <Slider
            value={props.price}
            min={priceMin}
            max={priceMax}
            step={1000}
            onValueChange={(v) => props.setPrice([v[0], v[1]] as [number, number])}
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>${props.price[0].toLocaleString()}</span>
            <span>${props.price[1].toLocaleString()}</span>
          </div>
        </div>
      </Group>

      <Group title="Condition">
        {conditions.map((c) => (
          <Check key={c} label={c} checked={props.condSel.includes(c)} onChange={() => toggle(props.condSel, c, props.setCondSel)} />
        ))}
      </Group>

      <Group title="Brand">
        <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
          {brands.map((b) => (
            <Check key={b} label={b} checked={props.brandSel.includes(b)} onChange={() => toggle(props.brandSel, b, props.setBrandSel)} />
          ))}
        </div>
      </Group>

      <Group title="Body Type">
        {bodyTypes.map((b) => (
          <Check key={b.label} label={`${b.label} (${b.count})`} checked={props.bodySel.includes(b.label)} onChange={() => toggle(props.bodySel, b.label, props.setBodySel)} />
        ))}
      </Group>

      <Group title="Fuel">
        {fuelTypes.map((f) => (
          <Check key={f} label={f} checked={props.fuelSel.includes(f)} onChange={() => toggle(props.fuelSel, f, props.setFuelSel)} />
        ))}
      </Group>

      <Group title="Transmission">
        {transmissions.map((t) => (
          <Check key={t} label={t} checked={props.transSel.includes(t)} onChange={() => toggle(props.transSel, t, props.setTransSel)} />
        ))}
      </Group>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4 first:border-t-0 first:pt-0">
      <h5 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink">{title}</h5>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-ink">
      <span className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${checked ? "border-brand bg-brand" : "border-border bg-white"}`}>
        {checked && <span className="block h-2 w-2 rounded-[1px] bg-ink" />}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className="truncate">{label}</span>
    </label>
  );
}

function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  if (pages <= 1) return null;
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: pages }).map((_, i) => {
        const n = i + 1;
        const active = n === page;
        return (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`h-9 min-w-9 rounded-full px-3 text-sm font-semibold ${active ? "bg-ink text-white" : "border border-border bg-white text-ink"}`}
          >
            {n}
          </button>
        );
      })}
      <button
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
