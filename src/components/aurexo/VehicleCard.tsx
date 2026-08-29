import { Link } from "@tanstack/react-router";
import { Heart, ChevronRight } from "lucide-react";
import { serviceLabel, type Vehicle } from "@/lib/aurexo-data";
import { useFavorites } from "@/contexts/FavoritesContext";

export function VehicleCard({ v }: { v: Vehicle }) {
  const favorites = useFavorites();
  const isSaved = favorites.has(v.id);
  const service = serviceLabel(v);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition hover:border-ink/40 hover:shadow-md">
      {/* Full-card click target — sits behind interactive controls */}
      <Link
        to="/listings/$id"
        params={{ id: v.id }}
        aria-label={`View ${v.title}`}
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 pointer-events-none">
        <img src={v.img} alt={v.title} className="h-44 w-full object-cover" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-bold text-white">
          {service}
        </span>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); favorites.toggle(v.id); }}
          aria-label={isSaved ? `Remove ${v.title} from saved projects` : `Save ${v.title}`}
          aria-pressed={isSaved}
          className={`pointer-events-auto absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border bg-background/95 transition ${isSaved ? "border-brand text-brand" : "border-border text-ink"}`}
        >
          <Heart className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="relative z-10 flex flex-1 flex-col p-4 pointer-events-none">
        <h3 className="truncate font-bold text-ink">{v.title}</h3>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {v.brand} · {v.body}
        </p>
        <p className="mt-2 text-sm font-semibold text-ink">{service} · {v.transmission} finish</p>
        <div className="mt-auto flex items-center justify-end border-t border-border pt-3 pointer-events-auto">
          <Link
            to="/listings/$id"
            params={{ id: v.id }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-brand"
          >
            View project <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
