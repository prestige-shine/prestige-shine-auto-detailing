import { useNavigate } from "@tanstack/react-router";
import { X, ArrowRight } from "lucide-react";
import { useCompare } from "@/contexts/CompareContext";
import { vehicles } from "@/lib/aurexo-data";

export function CompareBar() {
  const { ids, remove, clear } = useCompare();
  const navigate = useNavigate();
  if (ids.length === 0) return null;

  const picks = ids.map((id) => vehicles.find((v) => v.id === id)).filter(Boolean) as typeof vehicles;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
          {picks.map((p) => (
            <div key={p.id} className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-2">
              <img src={p.img} alt="" className="h-7 w-10 rounded-full object-cover" />
              <span className="max-w-[110px] truncate text-xs font-semibold text-ink">{p.title}</span>
              <button onClick={() => remove(p.id)} aria-label="Remove" className="grid h-5 w-5 place-items-center rounded-full text-muted-foreground hover:bg-border">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={clear} className="text-xs font-medium text-muted-foreground hover:text-ink">Clear</button>
        <button
          disabled={ids.length < 2}
          onClick={() => navigate({ to: "/compare", search: { ids: ids.join(",") } as never })}
          className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-2 text-xs font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          Compare Now <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
