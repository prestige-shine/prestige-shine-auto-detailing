const PARTNERS = [
  "Gtechniq", "CQuartz CarPro", "Gyeon", "Chemical Guys", "Meguiar's",
  "Rupes", "3M", "Sonax", "Koch-Chemie", "Griot's Garage",
];

export function PartnersMarquee() {
  const row = [...PARTNERS, ...PARTNERS];
  return (
    <section aria-labelledby="partners-heading" className="border-y border-white/5 bg-ink py-10 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">Trusted Brands</p>
          <h2 id="partners-heading" className="mt-1 text-2xl font-bold">Professional Brands Prestige Shine Uses & Trusts</h2>
          <p className="mt-2 text-sm text-white/60">
            Prestige Shine uses professional-grade products from industry-trusted detailing brands, the same chemistry used on concours-winning vehicles.
          </p>
        </div>
      </div>
      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" />
        <div className="flex w-max animate-[aurexo-marquee_38s_linear_infinite] gap-10 px-4">
          {row.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="grid h-14 min-w-44 place-items-center rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-bold uppercase tracking-widest text-white/60 grayscale transition hover:border-brand/50 hover:text-brand"
              aria-label={`${name} professional brand we use`}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes aurexo-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
