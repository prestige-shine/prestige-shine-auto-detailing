import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Heart, Sparkles } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useLeadDialog } from "@/contexts/LeadDialogContext";

type Props = { onMenuClick: () => void };

export function Header({ onMenuClick }: Props) {
  const favorites = useFavorites();
  const { open } = useLeadDialog();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" aria-label="Top Coat Auto Detailers home">
          <Logo />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/saved" aria-label={`${favorites.ids.length} saved detailing packages`} className="relative grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-ink">
            <Heart className="h-4 w-4" fill={favorites.ids.length ? "currentColor" : "none"} />
            {favorites.ids.length > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-extrabold text-ink">{favorites.ids.length}</span>}
          </Link>
          <button
            type="button"
            onClick={() => open()}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-bold text-ink shadow-sm transition hover:opacity-90 sm:px-5"
          >
            <Sparkles className="h-4 w-4" />
            <span>Book Now</span>
          </button>
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-white"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-[2.5px] w-5 rounded-full bg-brand" />
              <span className="block h-[2.5px] w-5 rounded-full bg-brand" />
              <span className="block h-[2.5px] w-5 rounded-full bg-brand" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
