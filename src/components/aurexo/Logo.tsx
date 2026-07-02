type Props = { variant?: "dark" | "light"; className?: string };

export function Logo({ variant: _variant = "dark", className = "" }: Props) {
  return (
    <div className={`flex items-center ${className}`} aria-label="Aurexo Roofing Studio">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <path d="M4 26 L16 4 L20 12 L12 26 Z" fill="#84CC16" />
        <path d="M20 12 L28 26 L16 26 Z" fill="#84CC16" opacity="0.55" />
      </svg>
    </div>
  );
}
