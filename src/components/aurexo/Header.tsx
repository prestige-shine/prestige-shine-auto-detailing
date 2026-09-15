import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Sparkles } from "lucide-react";
import { useLeadDialog } from "@/contexts/LeadDialogContext";

type Props = { onMenuClick: () => void };

export function Header({ onMenuClick }: Props) {
  const { open } = useLeadDialog();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" aria-label="Prestige Shine Auto Detailing home">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-5 lg:flex">
          <Link
            to="/"
            className="text-sm font-medium text-foreground/80 transition hover:text-brand"
          >
            Home
          </Link>

          <Link
            to="/new-arrivals"
            className="text-sm font-medium text-foreground/80 transition hover:text-brand"
          >
            Recent Work
          </Link>

          <Link
            to="/news"
            className="text-sm font-medium text-foreground/80 transition hover:text-brand"
          >
            Detailing Journal
          </Link>

          <Link
            to="/services"
            className="text-sm font-medium text-foreground/80 transition hover:text-brand"
          >
            Services
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-foreground/80 transition hover:text-brand"
          >
            About
          </Link>

          <Link
            to="/reviews"
            className="text-sm font-medium text-foreground/80 transition hover:text-brand"
          >
            Reviews
          </Link>

          <Link
            to="/faqs"
            className="text-sm font-medium text-foreground/80 transition hover:text-brand"
          >
            FAQs
          </Link>

          <Link
            to="/contact"
            className="text-sm font-medium text-foreground/80 transition hover:text-brand"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => open()}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:opacity-90 sm:px-5"
          >
            <Sparkles className="h-4 w-4" />
            <span>Book Now</span>
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-white lg:hidden"
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