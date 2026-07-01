const PARTNERS = [
  "GAF", "Owens Corning", "CertainTeed", "DECRA", "DaVinci Roofscapes",
  "Brava", "Boral Steel", "Malarkey", "Carlisle SynTec", "IKO",
];

export function PartnersMarquee() {
  const row = [...PARTNERS, ...PARTNERS];
  return (
    <section aria-labelledby="partners-heading" className="border-y border-white/5 bg-ink py-10 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">Trusted Brands</p>
          <h2 id="partners-heading" className="mt-1 text-2xl font-bold">Manufacturer-certified partners</h2>
          <p className="mt-2 text-sm text-white/60">
            Aurexo is credentialed by the world's leading premium roofing manufacturers — the same names that back every warranty we register.
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
              className="grid h-14 min-w-40 place-items-center rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-bold uppercase tracking-widest text-white/60 grayscale transition hover:border-brand/50 hover:text-brand"
              aria-label={`${name} certified partner`}
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
