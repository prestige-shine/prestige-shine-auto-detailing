type Props = { title: string; subtitle?: string; eyebrow?: string };

export function PageHeader({ title, subtitle, eyebrow }: Props) {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/30">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/70">{subtitle}</p>}
      </div>
    </section>
  );
}
