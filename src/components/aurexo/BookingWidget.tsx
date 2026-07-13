import { ArrowRight, ShieldCheck, Sparkles, Camera, Clock } from "lucide-react";
import { useLeadDialog } from "@/contexts/LeadDialogContext";

const BRAND = "#84CC16";
const BRAND_DARK = "#3f6212";

const BENEFITS = [
  { icon: Sparkles, label: "Personalized estimate", desc: "Priced to your vehicle's real condition." },
  { icon: Camera, label: "Photo-based quoting", desc: "Upload photos for accurate pricing." },
  { icon: Clock, label: "Fast turnaround", desc: "Most quotes back within a few hours." },
  { icon: ShieldCheck, label: "No obligation", desc: "Get pricing before you commit." },
];

export function BookingWidget() {
  const { open } = useLeadDialog();
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND_DARK }}>
          Book Your Detail
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
          Get your personalized detailing quote
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Answer a few quick questions about your vehicle and we'll send an accurate estimate — no phone tag required.
        </p>
      </div>

      <div
        className="mt-10 overflow-hidden rounded-[36px] shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
        }}
      >
        <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold ring-1 ring-white/25">
              <Sparkles className="h-3.5 w-3.5" /> 8-step assessment
            </span>
            <h3 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Tell us about your car. We'll take care of the rest.
            </h3>
            <p className="mt-3 text-sm text-white/85">
              A professional vehicle assessment that helps us understand your needs, so you get fair, accurate pricing every time.
            </p>
            <button
              onClick={() => open()}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold shadow-lg transition hover:scale-[1.02]"
              style={{ color: BRAND_DARK }}
            >
              Get My Personalized Quote <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-[11px] text-white/70">
              Takes about 2 minutes · No credit card required
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {BENEFITS.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/15 backdrop-blur"
              >
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[color:var(--brand-dark)]" style={{ color: BRAND_DARK }}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-3 text-sm font-bold">{label}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/80">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}