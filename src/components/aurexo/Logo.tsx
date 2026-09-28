import logoAsset from "@/assets/prestige-shine-logo.png";

type Props = { variant?: "dark" | "light"; className?: string };

export function Logo({ variant: _variant = "dark", className = "" }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Prestige Shine Auto Detailing">
      <img
        src={logoAsset}
        alt="Prestige Shine Auto Detailing, Miramichi, NB"
        className="h-14 w-14 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem] object-contain"
        loading="eager"
      />
      <span className="sr-only">Prestige Shine Auto Detailing</span>
    </div>
  );
}

