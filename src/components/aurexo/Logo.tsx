import logoAsset from "@/assets/prestige-shine-logo.png.asset.json";

type Props = { variant?: "dark" | "light"; className?: string };

export function Logo({ variant: _variant = "dark", className = "" }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Prestige Shine Auto Detailing">
      <img
        src={logoAsset.url}
        alt="Prestige Shine Auto Detailing — Miramichi, NB"
        className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
        loading="eager"
      />
      <span className="sr-only">Prestige Shine Auto Detailing</span>
    </div>
  );
}
