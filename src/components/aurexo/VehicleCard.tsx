import { Link } from "@tanstack/react-router";
import { Heart, Plus, Camera, Video, ChevronRight } from "lucide-react";
import type { Vehicle } from "@/lib/aurexo-data";

const tagColors: Record<NonNullable<Vehicle["tag"]>, string> = {
  "Great Price": "#4338CA",
  "Low Mileage": "#0EA5E9",
  "New Arrival": "#84CC16",
};

export function VehicleCard({ v }: { v: Vehicle }) {
  const tagBg = v.tag ? tagColors[v.tag] : undefined;
  return (
    <article className="rounded-2xl bg-white border border-border overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={v.img}
          alt={v.title}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        {v.tag && (
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
            style={{ background: tagBg }}
          >
            {v.tag}
          </span>
        )}
        <button
          aria-label="Save"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 border border-border text-ink"
        >
          <Heart className="h-4 w-4" />
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
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-ink truncate">{v.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {v.km} km · {v.year} · {v.fuel}
        </p>
        <p className="mt-2 text-lg font-extrabold text-ink">{v.price}</p>
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-border">
          <button className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink">
            <Plus className="h-3 w-3" /> Compare
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
