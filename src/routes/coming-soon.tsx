import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";

export const Route = createFileRoute("/coming-soon")({
  head: () => ({
    meta: [
      { title: "Coming Soon — Aurexo" },
      { name: "description", content: "Something new is on the way from Aurexo." },
    ],
  }),
  component: ComingSoon,
});

function ComingSoon() {
  const target = new Date("2026-09-01T00:00:00Z").getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(target - now, 0);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return (
    <main className="bg-ink text-white">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:py-32 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand text-ink">
          <Rocket className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight">Something big is brewing.</h1>
        <p className="mt-3 text-white/70">Aurexo Marketplace 2.0 launches September 2026.</p>

        <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
          {[[d,"days"],[h,"hrs"],[m,"min"],[s,"sec"]].map(([n,l]) => (
            <div key={l} className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="text-2xl sm:text-4xl font-extrabold text-brand">{String(n).padStart(2,"0")}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">{l}</div>
            </div>
          ))}
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex items-center rounded-full bg-white/5 border border-white/15 pl-5 pr-1.5 py-1.5 max-w-md mx-auto">
          <input type="email" placeholder="Notify me at launch" className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none" />
          <button className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-ink">Notify</button>
        </form>

        <Link to="/" className="mt-8 inline-block text-sm text-white/60 underline underline-offset-2">← Back to home</Link>
      </div>
    </main>
  );
}
