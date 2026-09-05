import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { vehicles, brands, bodyTypes, fuelTypes, transmissions } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";

const PER_PAGE = 12;

type Search = {
  preset?: "new" | "featured";
  q?: string;
  brand?: string;
  body?: string;
  fuel?: string;
  transmission?: string;
};

export const Route = createFileRoute("/buy")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    preset: s.preset === "new" || s.preset === "featured" ? s.preset : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
    brand: typeof s.brand === "string" ? s.brand : undefined,
    body: typeof s.body === "string" ? s.body : undefined,
    fuel: typeof s.fuel === "string" ? s.fuel : undefined,
    transmission: typeof s.transmission === "string" ? s.transmission : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Recent Work — Prestige Shine Auto Detailing Miramichi" },
      { name: "description", content: "Browse completed detailing projects by Prestige Shine Auto Detailing — filter by vehicle class, service performed, and vehicle make." },
      { property: "og:title", content: "Recent Work — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "Real vehicles detailed by Prestige Shine Auto Detailing in Miramichi, NB." },
    ],
  }),
  component: BuyPage,
});

function BuyPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [brandSel, setBrandSel] = useState<string[]>(search.brand?.split(",").filter(Boolean) ?? []);
  const [bodySel, setBodySel] = useState<string[]>(search.body?.split(",").filter(Boolean) ?? []);
  const [fuelSel, setFuelSel] = useState<string[]>(search.fuel?.split(",").filter(Boolean) ?? []);
  const [transSel, setTransSel] = useState<string[]>(search.transmission?.split(",").filter(Boolean) ?? []);
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    let r = vehicles.filter((v) => {
      if (brandSel.length && !brandSel.includes(v.brand)) return false;
      if (bodySel.length && !bodySel.includes(v.body)) return false;
      if (fuelSel.length && !fuelSel.includes(v.fuel)) return false;
      if (transSel.length && !transSel.includes(v.transmission)) return false;
      if (search.preset === "featured" && !v.featured) return false;
      if (search.q && !`${v.title} ${v.brand} ${v.body} ${v.fuel}`.toLowerCase().includes(search.q.toLowerCase())) return false;
      return true;
    });
    if (sort === "oldest") r = [...r].sort((a, b) => a.year - b.year);
    if (sort === "year") r = [...r].sort((a, b) => b.year - a.year);
    return r;
  }, [brandSel, bodySel, fuelSel, transSel, sort, search.preset, search.q]);

  const updateFilters = (next: Partial<Search>) => { setPage(1); navigate({ to: "/buy", search: { ...search, ...next } }); };
  const setBrands = (v: string[]) => { setBrandSel(v); updateFilters({ brand: v.length ? v.join(",") : undefined }); };
  const setBodies = (v: string[]) => { setBodySel(v); updateFilters({ body: v.length ? v.join(",") : undefined }); };
  const setFuels = (v: string[]) => { setFuelSel(v); updateFilters({ fuel: v.length ? v.join(",") : undefined }); };
  const setTrans = (v: string[]) => { setTransSel(v); updateFilters({ transmission: v.length ? v.join(",") : undefined }); };
  const reset = () => { setBrandSel([]); setBodySel([]); setFuelSel([]); setTransSel([]); setPage(1); navigate({ to: "/buy", search: {} }); };

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const pageItems = list.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const title = search.preset === "featured" ? "Featured Projects" : search.preset === "new" ? "Recently Added Projects" : "All Recent Work";

  return (
    <main className="mx-auto w-full max-w-6xl overflow-x-hidden px-4 py-8">
      <h1 className="text-3xl font-extrabold text-ink">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Showing {pageItems.length} of {list.length} matching projects</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => setFiltersOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink lg:hidden">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-border bg-white px-4 py-2 text-sm text-ink">
          <option value="relevance">Sort: Relevance</option>
          <option value="oldest">Oldest First</option>
          <option value="year">Newest First</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <FiltersPanel brandSel={brandSel} setBrandSel={setBrands} bodySel={bodySel} setBodySel={setBodies} fuelSel={fuelSel} setFuelSel={setFuels} transSel={transSel} setTransSel={setTrans} condSel={condSel} setCondSel={setConds} onReset={reset} />
        </aside>
        <div>
          {pageItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center text-muted-foreground">
              No projects match your filters. <button onClick={reset} className="ml-2 font-semibold text-ink underline">Clear all</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{pageItems.map((v) => <VehicleCard key={v.id} v={v} />)}</div>
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
              <h3 className="flex items-center gap-2 font-bold text-ink"><SlidersHorizontal className="h-4 w-4" /> Filters</h3>
              <button onClick={() => setFiltersOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-border"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-4"><FiltersPanel brandSel={brandSel} setBrandSel={setBrands} bodySel={bodySel} setBodySel={setBodies} fuelSel={fuelSel} setFuelSel={setFuels} transSel={transSel} setTransSel={setTrans} condSel={condSel} setCondSel={setConds} onReset={reset} /></div>
          </aside>
        </>
      )}
    </main>
  );
}

function FiltersPanel(p: { brandSel: string[]; setBrandSel: (s: string[]) => void; bodySel: string[]; setBodySel: (s: string[]) => void; fuelSel: string[]; setFuelSel: (s: string[]) => void; transSel: string[]; setTransSel: (s: string[]) => void; condSel: string[]; setCondSel: (s: string[]) => void; onReset: () => void; }) {
  const toggle = (arr: string[], val: string, set: (a: string[]) => void) => set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  return (
    <div className="space-y-5 rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between"><h4 className="text-sm font-bold text-ink">Filters</h4><button onClick={p.onReset} className="text-xs font-medium text-muted-foreground hover:text-ink">Reset</button></div>
      <Group title="Booking Status">{conditions.map((c) => <ChkBox key={c} label={c} checked={p.condSel.includes(c)} onChange={() => toggle(p.condSel, c, p.setCondSel)} />)}</Group>
      <Group title="Car Make"><div className="max-h-52 space-y-2 overflow-y-auto pr-1">{brands.map((b) => <ChkBox key={b} label={b} checked={p.brandSel.includes(b)} onChange={() => toggle(p.brandSel, b, p.setBrandSel)} />)}</div></Group>
      <Group title="Vehicle Class">{bodyTypes.map((b) => <ChkBox key={b.label} label={`${b.label} (${b.count})`} checked={p.bodySel.includes(b.label)} onChange={() => toggle(p.bodySel, b.label, p.setBodySel)} />)}</Group>
      <Group title="Service Performed">{fuelTypes.map((f) => <ChkBox key={f} label={f} checked={p.fuelSel.includes(f)} onChange={() => toggle(p.fuelSel, f, p.setFuelSel)} />)}</Group>
      <Group title="Finish Focus">{transmissions.map((t) => <ChkBox key={t} label={t} checked={p.transSel.includes(t)} onChange={() => toggle(p.transSel, t, p.setTransSel)} />)}</Group>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="border-t border-border pt-4 first:border-t-0 first:pt-0"><h5 className="mb-3 text-xs font-bold uppercase tracking-wide text-ink">{title}</h5><div className="space-y-2">{children}</div></div>;
}

function ChkBox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-ink">
      <span className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${checked ? "border-brand bg-brand" : "border-border bg-white"}`}>{checked && <span className="block h-2 w-2 rounded-[1px] bg-ink" />}</span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className="truncate">{label}</span>
    </label>
  );
}

function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  if (pages <= 1) return null;
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1} className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
      {Array.from({ length: pages }).map((_, i) => { const n = i + 1; return <button key={n} onClick={() => onChange(n)} className={`h-9 min-w-9 rounded-full px-3 text-sm font-semibold ${n === page ? "bg-ink text-white" : "border border-border bg-white text-ink"}`}>{n}</button>; })}
      <button onClick={() => onChange(Math.min(pages, page + 1))} disabled={page === pages} className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
    </div>
  );
}
