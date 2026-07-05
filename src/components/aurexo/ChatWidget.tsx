import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, ArrowRight, Send, Check } from "lucide-react";
import { submitLead, formatEstimateRange, type LeadPayload } from "@/lib/whatsapp";

type Step = 0 | 1 | 2 | 3 | 4; // 0=contact, 1=class, 2=tier, 3=window, 4=summary

const VEHICLE_CLASSES = ["Coupe/Sedan", "SUV/Crossover", "Truck", "Van/3-Row SUV"] as const;

const SIZE_MULT: Record<(typeof VEHICLE_CLASSES)[number], number> = {
  "Coupe/Sedan": 1.0,
  "SUV/Crossover": 1.25,
  "Truck": 1.35,
  "Van/3-Row SUV": 1.55,
};

const TIERS = [
  { key: "Express Exterior Maintenance", min: 149, max: 249 },
  { key: "Full Interior Deep Clean & Extraction", min: 329, max: 549 },
  { key: "Premium 9H Ceramic Coating & Paint Correction", min: 1899, max: 3499 },
] as const;

const WINDOWS = ["This week", "Next week", "Weekend slot", "Mobile at my address"] as const;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [payload, setPayload] = useState<LeadPayload>({
    name: "",
    phone: "",
    email: "",
    zip: "",
    vehicleClass: "",
    serviceTier: "",
    appointmentWindow: "",
    source: "chat-widget",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [step]);

  const tier = TIERS.find((t) => t.key === payload.serviceTier);
  const mult = SIZE_MULT[payload.vehicleClass as (typeof VEHICLE_CLASSES)[number]] ?? 1;
  const estRange = useMemo(() => {
    if (!tier) return null;
    return formatEstimateRange(Math.round(tier.min * mult), Math.round(tier.max * mult));
  }, [tier, mult]);

  const canAdvance = () => {
    if (step === 0) return !!(payload.name && payload.phone && payload.zip);
    if (step === 1) return !!payload.vehicleClass;
    if (step === 2) return !!payload.serviceTier;
    if (step === 3) return !!payload.appointmentWindow;
    return true;
  };

  const handleSubmit = () => {
    setSending(true);
    // Open WhatsApp synchronously so the tab isn't blocked
    const href = `https://wa.me/15615550142?text=${encodeURIComponent(
      `Hi Top Coat Auto Detailers — I'd like to book.\n\n• Name: ${payload.name}\n• Phone: ${payload.phone}\n• Ohio Zip: ${payload.zip}\n• Vehicle Class: ${payload.vehicleClass}\n• Service Tier: ${payload.serviceTier}\n• Preferred Window: ${payload.appointmentWindow}${estRange ? `\n• Estimated Range: ${estRange}` : ""}`,
    )}`;
    window.open(href, "_blank", "noopener,noreferrer");
    submitLead({ ...payload, estimate: estRange ?? undefined }).finally(() => {
      setDone(true);
      setSending(false);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open detailing concierge chat"}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand text-ink shadow-xl shadow-brand/40 ring-2 ring-white/40 transition hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] max-w-sm origin-bottom-right rounded-2xl border border-white/10 bg-ink text-white shadow-2xl transition-all duration-300 ${
          open ? "scale-100 opacity-100 translate-y-0" : "pointer-events-none scale-95 opacity-0 translate-y-2"
        }`}
        role="dialog"
        aria-label="Top Coat detailing concierge chat"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-brand text-ink font-extrabold">A</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Top Coat Detailing Concierge</p>
            <p className="text-[11px] text-white/60">Typically replies within 2 minutes · Ohio</p>
          </div>
          <button aria-label="Close" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/80 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={scrollRef} className="max-h-[60vh] space-y-4 overflow-y-auto px-4 py-4 text-sm">
          <Bubble from="bot">
            Hi! I'm Top Coat's detailing concierge. Ask about ceramic coatings, paint correction, interior deep cleans,
            or book a slot in four quick steps.
          </Bubble>

          {step >= 0 && (
            <Bubble from="bot" title="Step 1 · Contact">
              Who are we detailing for? Share your name, phone, and Ohio zip.
            </Bubble>
          )}
          {step === 0 && (
            <StepCard>
              <input aria-label="Full name" className="chat-input" placeholder="Full name" value={payload.name} onChange={(e) => setPayload({ ...payload, name: e.target.value })} />
              <input aria-label="Phone" className="chat-input" placeholder="Phone" value={payload.phone} onChange={(e) => setPayload({ ...payload, phone: e.target.value })} />
              <input aria-label="Email" type="email" className="chat-input" placeholder="Email (optional)" value={payload.email} onChange={(e) => setPayload({ ...payload, email: e.target.value })} />
              <input aria-label="Zip" className="chat-input" placeholder="Ohio Zip" value={payload.zip} onChange={(e) => setPayload({ ...payload, zip: e.target.value })} />
            </StepCard>
          )}

          {step >= 1 && <Bubble from="user">{payload.name} · {payload.phone} · {payload.zip}</Bubble>}
          {step >= 1 && (
            <Bubble from="bot" title="Step 2 · Vehicle Class">
              What are we detailing?
            </Bubble>
          )}
          {step === 1 && (
            <StepCard>
              <div className="grid grid-cols-1 gap-2">
                {VEHICLE_CLASSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPayload({ ...payload, vehicleClass: s })}
                    className={`rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                      payload.vehicleClass === s ? "border-brand bg-brand/15 text-white" : "border-white/15 text-white/85 hover:border-white/40"
                    }`}
                  >
                    {s}
                    <span className="ml-2 text-[11px] font-normal text-white/60">×{SIZE_MULT[s].toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </StepCard>
          )}

          {step >= 2 && <Bubble from="user">{payload.vehicleClass}</Bubble>}
          {step >= 2 && (
            <Bubble from="bot" title="Step 3 · Service Tier">
              Pick the service tier you'd like to price.
            </Bubble>
          )}
          {step === 2 && (
            <StepCard>
              <div className="grid grid-cols-1 gap-2">
                {TIERS.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setPayload({ ...payload, serviceTier: m.key })}
                    className={`rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                      payload.serviceTier === m.key ? "border-brand bg-brand/15 text-white" : "border-white/15 text-white/85 hover:border-white/40"
                    }`}
                  >
                    {m.key}
                    <span className="ml-2 block text-[11px] font-normal text-white/60">
                      From ${m.min} · Up to ${m.max}
                    </span>
                  </button>
                ))}
              </div>
            </StepCard>
          )}

          {step >= 3 && <Bubble from="user">{payload.serviceTier}</Bubble>}
          {step >= 3 && (
            <Bubble from="bot" title="Step 4 · Appointment">
              When would you like to book?
            </Bubble>
          )}
          {step === 3 && (
            <StepCard>
              <div className="grid grid-cols-2 gap-2">
                {WINDOWS.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setPayload({ ...payload, appointmentWindow: w })}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold ${
                      payload.appointmentWindow === w ? "border-brand bg-brand/15 text-white" : "border-white/15 text-white/80"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </StepCard>
          )}

          {step === 4 && !done && (
            <>
              <Bubble from="user">{payload.appointmentWindow}</Bubble>
              <Bubble from="bot" title="Summary">
                <div className="space-y-1 text-xs text-white/85">
                  <p><span className="text-white/60">Client:</span> {payload.name} ({payload.phone})</p>
                  {payload.email ? <p><span className="text-white/60">Email:</span> {payload.email}</p> : null}
                  <p><span className="text-white/60">Location:</span> {payload.zip}, OH</p>
                  <p><span className="text-white/60">Vehicle:</span> {payload.vehicleClass}</p>
                  <p><span className="text-white/60">Tier:</span> {payload.serviceTier}</p>
                  <p><span className="text-white/60">Window:</span> {payload.appointmentWindow}</p>
                  {estRange ? <p className="pt-1 text-sm font-bold text-brand">Estimate: {estRange}</p> : null}
                </div>
              </Bubble>
            </>
          )}

          {done && (
            <Bubble from="bot" title="Sent">
              <div className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-brand" />
                <span>Brief handed off. An Top Coat detailer will confirm your slot within 2 hours.</span>
              </div>
            </Bubble>
          )}
        </div>

        <div className="border-t border-white/10 p-3">
          {step < 4 ? (
            <button
              type="button"
              disabled={!canAdvance()}
              onClick={() => setStep((s) => (Math.min(4, s + 1) as Step))}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-ink disabled:opacity-40"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : !done ? (
            <button
              type="button"
              disabled={sending}
              onClick={handleSubmit}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-ink disabled:opacity-60"
            >
              <Send className="h-4 w-4" /> {sending ? "Sending…" : "Book on WhatsApp"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setDone(false);
                setStep(0);
                setPayload({ name: "", phone: "", email: "", zip: "", vehicleClass: "", serviceTier: "", appointmentWindow: "", source: "chat-widget" });
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm font-semibold text-white/80"
            >
              Start a new booking
            </button>
          )}
        </div>

        <style>{`
          .chat-input {
            width: 100%; border-radius: 0.75rem; padding: 0.6rem 0.8rem;
            background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
            color: white; font-size: 0.875rem; outline: none;
          }
          .chat-input::placeholder { color: rgba(255,255,255,0.45); }
          .chat-input:focus { border-color: rgb(132,204,22); }
        `}</style>
      </div>
    </>
  );
}

function Bubble({ from, title, children }: { from: "bot" | "user"; title?: string; children: React.ReactNode }) {
  const isBot = from === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isBot ? "bg-white/8 border border-white/10 text-white/90" : "bg-brand text-ink font-semibold"
        }`}
      >
        {title ? <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-brand">{title}</p> : null}
        {children}
      </div>
    </div>
  );
}

function StepCard({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3">{children}</div>;
}
