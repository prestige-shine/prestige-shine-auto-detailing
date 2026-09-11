import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowRight, Camera, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { useLeadDialog } from "@/contexts/LeadDialogContext";

export const Route = createFileRoute("/get-estimate")({
  head: () => ({
    meta: [
      { title: "Get a Personalized Estimate — Prestige Shine Auto Detailing Miramichi" },
      { name: "description", content: "Answer a few quick questions about your vehicle and Prestige Shine will send an accurate detailing estimate — photo-based pricing, no phone tag." },
      { property: "og:title", content: "Get a Personalized Estimate — Prestige Shine Miramichi" },
      { property: "og:description", content: "Photo-based, accurate detailing quotes from Miramichi's premier studio." },
    ],
    links: [{ rel: "canonical", href: "/get-estimate" }],
  }),
  component: GetEstimate,
});

function GetEstimate() {
  const { open } = useLeadDialog();
  const autoOpened = useRef(false);

  // Auto-open on first visit for a Calendly-like landing experience
  useEffect(() => {
    if (autoOpened.current) return;
    autoOpened.current = true;
    const t = window.setTimeout(() => open(), 300);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <main className="overflow-x-hidden">
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-bold text-brand ring-1 ring-brand/30">
            <Sparkles className="h-3.5 w-3.5" /> 9-step vehicle assessment
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Get your <span className="text-brand">personalized</span> detailing estimate.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/75">
            Photo-based, accurate quotes for every vehicle. Tell me about your car, upload a few photos, and I’ll send you a fair estimate based on your vehicle’s actual condition.
          </p>
          <button
            onClick={() => open()}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-extrabold text-ink shadow-xl transition hover:scale-[1.02]"
          >
            Start My Assessment <ArrowRight className="h-4 w-4" />
          </button>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/70">
            <span className="inline-flex items-center gap-1"><Camera className="h-4 w-4 text-brand" /> Photo-based quoting</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4 text-brand" /> Fast estimate response</span>
            <span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-brand" /> No obligation</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { n: 1, t: "Tell us about your vehicle", d: "Make, model, year, and current condition." },
            { n: 2, t: "Upload a few photos", d: "Get an estimate without a site visit." },
            { n: 3, t: "Get your quote", d: "Kevin reviews your info and sends pricing." },
          ].map((s) => (
            <div key={s.n} className="rounded-3xl border border-border bg-white p-6">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-extrabold text-ink">
                {s.n}
              </div>
              <p className="mt-4 text-base font-bold text-ink">{s.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}