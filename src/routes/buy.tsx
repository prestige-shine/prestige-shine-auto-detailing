import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { vehicles } from "@/lib/aurexo-data";
import { VehicleCard } from "@/components/aurexo/VehicleCard";

const PER_PAGE = 12;

type Search = {
  preset?: "new" | "featured";
};

export const Route = createFileRoute("/buy")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    preset: s.preset === "new" || s.preset === "featured" ? s.preset : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Recent Work — Prestige Shine Auto Detailing Miramichi" },
      { name: "description", content: "Browse completed detailing projects by Prestige Shine Auto Detailing in Miramichi, NB." },
      { property: "og:title", content: "Recent Work — Prestige Shine Auto Detailing" },
      { property: "og:description", content: "Real vehicles detailed by Prestige Shine Auto Detailing in Miramichi, NB." },
    ],
  }),
  component: BuyPage,
});

function BuyPage() {
  const search = Route.useSearch();
  const [page, setPage] = useState(1);

  const list = useMemo(() => {
    return search.preset === "featured" ? vehicles.filter((v) => v.featured) : vehicles;
  }, [search.preset]);

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const pageItems = list.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const title = search.preset === "featured" ? "Featured Projects" : search.preset === "new" ? "Recently Added Projects" : "All Recent Work";

  return (
    <main className="mx-auto w-full max-w-6xl overflow-x-hidden px-4 py-8">
      <h1 className="text-3xl font-extrabold text-ink">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Showing {pageItems.length} of {list.length} projects</p>

      <div className="mt-6">
        {pageItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center text-muted-foreground">
            No projects found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{pageItems.map((v) => <VehicleCard key={v.id} v={v} />)}</div>
            <Pagination page={safePage} pages={pages} onChange={setPage} />
          </>
        )}
      </div>
    </main>
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
