type Props = { variant?: "dark" | "light"; className?: string };

export function Logo({ variant = "dark", className = "" }: Props) {
  const textColor = variant === "dark" ? "text-ink" : "text-white";
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <path d="M4 26 L16 4 L20 12 L12 26 Z" fill="#84CC16" />
        <path d="M20 12 L28 26 L16 26 Z" fill="#84CC16" opacity="0.55" />
      </svg>
      <span className={`text-xl font-extrabold tracking-tight ${textColor}`}>
        Aurexo
      </span>
    </div>
  );
}
