import { Link } from "@tanstack/react-router";
import { Heart, Plus, Check, Camera, Video, ChevronRight } from "lucide-react";
import type { Vehicle } from "@/lib/aurexo-data";
import { useCompare } from "@/contexts/CompareContext";
import { useFavorites } from "@/contexts/FavoritesContext";

const tagColors: Record<NonNullable<Vehicle["tag"]>, string> = {
  "Great Price": "#4338CA",
  "Low Mileage": "#0EA5E9",
  "New Arrival": "#84CC16",
  "Staff Pick": "#F59E0B",
};

export function VehicleCard({ v }: { v: Vehicle }) {
  const { has, toggle } = useCompare();
  const favorites = useFavorites();
  const inCompare = has(v.id);
  const isSaved = favorites.has(v.id);
  const tagBg = v.tag ? tagColors[v.tag] : undefined;
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white">
      <div className="relative">
        <img src={v.img} alt={v.title} className="h-44 w-full object-cover" loading="lazy" />
        {v.tag && (
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
            style={{ background: tagBg }}
          >
            {v.tag}
          </span>
        )}
        <button
          onClick={() => favorites.toggle(v.id)}
          aria-label={isSaved ? `Remove ${v.title} from saved vehicles` : `Save ${v.title}`}
          aria-pressed={isSaved}
          className={`absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border bg-background/95 transition ${isSaved ? "border-brand text-brand" : "border-border text-ink"}`}
        >
          <Heart className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
            <Camera className="h-3 w-3" /> 7
          </span>
          <span className="flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
            <Video className="h-3 w-3" /> 2
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="truncate font-bold text-ink">{v.title}</h3>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {v.km} km · {v.year} · {v.fuel} · {v.transmission}
        </p>
        <p className="mt-2 text-lg font-extrabold text-ink">{v.price}</p>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3">
          <button
            onClick={() => toggle(v.id)}
            aria-pressed={inCompare}
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              inCompare ? "border-brand bg-brand text-ink" : "border-border text-ink hover:border-ink"
            }`}
          >
            {inCompare ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            {inCompare ? "Added" : "Compare"}
          </button>
          <Link
            to="/listings/$id"
            params={{ id: v.id }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-ink"
          >
            View details <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
