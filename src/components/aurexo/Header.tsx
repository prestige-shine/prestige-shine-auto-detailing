import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

type Props = { onMenuClick: () => void };

export function Header({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full border border-ink/80 px-5 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
          >
            Sign In
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
