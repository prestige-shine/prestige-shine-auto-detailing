import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, ArrowRight, Send, Check } from "lucide-react";
import { submitLead, formatEstimateRange, type LeadPayload } from "@/lib/whatsapp";

type Step = 0 | 1 | 2 | 3 | 4; // 0=contact, 1=scope, 2=material, 3=size, 4=summary

const SCOPES = [
  "Full Roof Replacement",
  "Premium Architectural Upgrade",
  "Emergency Leak / Storm Repair",
  "New Construction Install",
];

const MATERIALS = [
  { key: "Architectural Shingles", min: 4.5, max: 7.5 },
  { key: "Standing Seam Metal", min: 10, max: 16 },
  { key: "Luxury Slate", min: 18, max: 32 },
  { key: "Custom Clay / Concrete Tile", min: 12, max: 22 },
] as const;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [payload, setPayload] = useState<LeadPayload>({
    name: "", phone: "", email: "", zip: "",
    projectType: "", material: "", sqft: 3000, stories: "2",
    source: "chat-widget",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [step]);

  const chosenMaterial = MATERIALS.find((m) => m.key === payload.material);
  const estRange = useMemo(() => {
    if (!chosenMaterial) return null;
    const sqft = Number(payload.sqft) || 0;
    return formatEstimateRange(
      Math.round(sqft * chosenMaterial.min),
      Math.round(sqft * chosenMaterial.max),
    );
  }, [chosenMaterial, payload.sqft]);

  const canAdvance = () => {
    if (step === 0) return !!(payload.name && payload.phone && payload.zip);
    if (step === 1) return !!payload.projectType;
    if (step === 2) return !!payload.material;
    if (step === 3) return !!payload.sqft;
    return true;
  };

  const handleSubmit = async () => {
    setSending(true);
    const href = await submitLead({ ...payload, estimate: estRange ?? undefined });
    setDone(true);
    setSending(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open live chat"}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand text-ink shadow-xl shadow-brand/40 ring-2 ring-white/40 transition hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] max-w-sm origin-bottom-right rounded-2xl border border-white/10 bg-ink text-white shadow-2xl transition-all duration-300 ${
          open ? "scale-100 opacity-100 translate-y-0" : "pointer-events-none scale-95 opacity-0 translate-y-2"
        }`}
        role="dialog"
        aria-label="Aurexo roofing chat"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-brand text-ink font-extrabold">A</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Aurexo Studio Concierge</p>
            <p className="text-[11px] text-white/60">Typically replies within 2 minutes · Ohio</p>
          </div>
          <button aria-label="Close" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/80 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div ref={scrollRef} className="max-h-[60vh] space-y-4 overflow-y-auto px-4 py-4 text-sm">
          {/* Assistant intro */}
          <Bubble from="bot">
            Welcome to Aurexo Roofing Studio. Let's build your project brief in four quick steps — everything gets sent directly to a certified estimator.
          </Bubble>

          {step >= 0 && (
            <Bubble from="bot" title="Step 1 · Contact">
              Who are we designing for? Share your name, phone, email, and Ohio zip/county.
            </Bubble>
          )}
          {step === 0 && (
            <StepCard>
              <input aria-label="Full name" className="chat-input" placeholder="Full name" value={payload.name} onChange={(e) => setPayload({ ...payload, name: e.target.value })} />
              <input aria-label="Phone" className="chat-input" placeholder="Phone" value={payload.phone} onChange={(e) => setPayload({ ...payload, phone: e.target.value })} />
              <input aria-label="Email" type="email" className="chat-input" placeholder="Email (optional)" value={payload.email} onChange={(e) => setPayload({ ...payload, email: e.target.value })} />
              <div className="grid grid-cols-2 gap-2">
                <input aria-label="Zip" className="chat-input" placeholder="Ohio Zip" value={payload.zip} onChange={(e) => setPayload({ ...payload, zip: e.target.value })} />
                <input aria-label="County" className="chat-input" placeholder="County" value={payload.county ?? ""} onChange={(e) => setPayload({ ...payload, county: e.target.value })} />
              </div>
            </StepCard>
          )}

          {step >= 1 && (
            <Bubble from="user">
              {payload.name} · {payload.phone} · {payload.zip}
            </Bubble>
          )}
          {step >= 1 && (
            <Bubble from="bot" title="Step 2 · Project Scope">
              What best describes the intent of this project?
            </Bubble>
          )}
          {step === 1 && (
            <StepCard>
              <div className="grid grid-cols-1 gap-2">
                {SCOPES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPayload({ ...payload, projectType: s })}
                    className={`rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                      payload.projectType === s ? "border-brand bg-brand/15 text-white" : "border-white/15 text-white/85 hover:border-white/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </StepCard>
          )}

          {step >= 2 && <Bubble from="user">{payload.projectType}</Bubble>}
          {step >= 2 && (
            <Bubble from="bot" title="Step 3 · Material">
              Which material family are you leaning toward?
            </Bubble>
          )}
          {step === 2 && (
            <StepCard>
              <div className="grid grid-cols-1 gap-2">
                {MATERIALS.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setPayload({ ...payload, material: m.key })}
                    className={`rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                      payload.material === m.key ? "border-brand bg-brand/15 text-white" : "border-white/15 text-white/85 hover:border-white/40"
                    }`}
                  >
                    {m.key}
                    <span className="ml-2 text-[11px] font-normal text-white/60">${m.min}–${m.max}/sqft</span>
                  </button>
                ))}
              </div>
            </StepCard>
          )}

          {step >= 3 && <Bubble from="user">{payload.material}</Bubble>}
          {step >= 3 && (
            <Bubble from="bot" title="Step 4 · Footprint">
              Roughly how large is the roof, and how many stories?
            </Bubble>
          )}
          {step === 3 && (
            <StepCard>
              <label className="block text-[11px] font-medium text-white/70">Square footage: <span className="font-bold text-white">{Number(payload.sqft).toLocaleString()}</span></label>
              <input type="range" min={1000} max={15000} step={100} value={Number(payload.sqft)} onChange={(e) => setPayload({ ...payload, sqft: Number(e.target.value) })} className="w-full accent-brand" />
              <div className="grid grid-cols-3 gap-2">
                {["1", "2", "3+"].map((s) => (
                  <button key={s} type="button" onClick={() => setPayload({ ...payload, stories: s })} className={`rounded-xl border px-3 py-2 text-sm font-semibold ${payload.stories === s ? "border-brand bg-brand/15 text-white" : "border-white/15 text-white/80"}`}>
                    {s} {s === "1" ? "story" : "stories"}
                  </button>
                ))}
              </div>
            </StepCard>
          )}

          {step === 4 && !done && (
            <>
              <Bubble from="user">{Number(payload.sqft).toLocaleString()} sqft · {payload.stories} stories</Bubble>
              <Bubble from="bot" title="Summary">
                <div className="space-y-1 text-xs text-white/85">
                  <p><span className="text-white/60">Client:</span> {payload.name} ({payload.phone})</p>
                  {payload.email ? <p><span className="text-white/60">Email:</span> {payload.email}</p> : null}
                  <p><span className="text-white/60">Location:</span> {payload.zip}{payload.county ? `, ${payload.county}` : ""}, OH</p>
                  <p><span className="text-white/60">Scope:</span> {payload.projectType}</p>
                  <p><span className="text-white/60">Material:</span> {payload.material}</p>
                  <p><span className="text-white/60">Footprint:</span> {Number(payload.sqft).toLocaleString()} sqft · {payload.stories} stories</p>
                  {estRange ? <p className="pt-1 text-sm font-bold text-brand">Estimate: {estRange}</p> : null}
                </div>
              </Bubble>
            </>
          )}

          {done && (
            <Bubble from="bot" title="Sent">
              <div className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-brand" />
                <span>Brief packaged and delivered. An Aurexo estimator will reach out shortly.</span>
              </div>
            </Bubble>
          )}
        </div>

        {/* Footer actions */}
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
              <Send className="h-4 w-4" /> {sending ? "Sending…" : "Submit to WhatsApp"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setDone(false); setStep(0); setPayload({ name: "", phone: "", email: "", zip: "", projectType: "", material: "", sqft: 3000, stories: "2", source: "chat-widget" }); }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm font-semibold text-white/80"
            >
              Start a new brief
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
