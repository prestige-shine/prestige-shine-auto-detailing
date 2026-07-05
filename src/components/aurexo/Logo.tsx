import logoAsset from "@/assets/topcoat-logo.png.asset.json";

type Props = { variant?: "dark" | "light"; className?: string };

export function Logo({ variant: _variant = "dark", className = "" }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Top Coat Auto Detailers">
      <img
        src={logoAsset.url}
        alt="Top Coat Auto Detailers"
        className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
        loading="eager"
      />
      <span className="sr-only">Top Coat Auto Detailers</span>
    </div>
  );
}
