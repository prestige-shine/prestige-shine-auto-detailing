import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { serviceLabel, type Vehicle } from "@/lib/aurexo-data";

export function VehicleCard({ v, verifiedMetadataOnly = false }: { v: Vehicle; verifiedMetadataOnly?: boolean }) {
  const service = serviceLabel(v);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition hover:border-ink/40 hover:shadow-md">
      {/* Full-card click target, sits behind interactive controls */}
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
      </div>
      <div className="relative z-10 flex flex-1 flex-col p-4 pointer-events-none">
        <h3 className="truncate font-bold text-ink">{v.title}</h3>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {v.brand}{verifiedMetadataOnly ? ` · ${v.body}` : ` · ${v.year} · ${v.body}`}
        </p>
        <p className="mt-2 text-sm font-semibold text-ink">{service}</p>
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
