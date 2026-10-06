// Centralized business identity + WhatsApp lead routing for Prestige Shine Auto Detailing.
export const BUSINESS_NAME = "Prestige Shine Auto Detailing";
export const STUDIO_EMAIL = "prestige101shine@gmail.com";
export const STUDIO_ADDRESS = "229 Jacqueline Dr, Miramichi, NB E1N 3Z2, Canada";
export const SERVICE_AREA = "Miramichi, NB and surrounding areas";
export const FACEBOOK_URL = "https://www.facebook.com/share/19LTaGPm2C/";
export const WHATSAPP_NUMBER = "15062514451";
export const WHATSAPP_DISPLAY = "+1 (506) 251-4451";
export const STUDIO_PHONE = "+1 (506) 251-4451";
export const STUDIO_TEL = "+15062514451";

export type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  zip?: string;
  county?: string;
  vehicleClass?: string;   // body: Coupe/Sedan | SUV/Crossover | Truck | Van/3-Row SUV
  serviceTier?: string;    // fuel: Express | Interior | Ceramic | Correction
  addOns?: string;
  appointmentWindow?: string;
  notes?: string;
  estimate?: string;
  source?: string;
  // Legacy aliases kept so existing callers that pass these still compile
  projectType?: string;
  material?: string;
  sqft?: number | string;
  stories?: string | number;
  message?: string;
};

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function formatEstimateRange(low: number, high: number) {
  return `${usd(low)} – ${usd(high)}`;
}

export function buildLeadMessage(p: LeadPayload) {
  const lines: string[] = [
    "Hi Prestige Shine Auto Detailing — I'd like to book a detailing appointment.",
    "",
    "── Client Details ──",
  ];
  if (p.name) lines.push(`• Name: ${p.name}`);
  if (p.phone) lines.push(`• Phone: ${p.phone}`);
  if (p.email) lines.push(`• Email: ${p.email}`);
  if (p.zip) lines.push(`• Miramichi Area: ${p.zip}`);
  if (p.county) lines.push(`• County: ${p.county}`);

  lines.push("", "── Service Specification ──");
  const tier = p.serviceTier ?? p.projectType;
  const vClass = p.vehicleClass ?? p.material;
  if (vClass) lines.push(`• Vehicle Class: ${vClass}`);
  if (tier) lines.push(`• Service Tier: ${tier}`);
  if (p.addOns) lines.push(`• Add-Ons: ${p.addOns}`);
  if (p.appointmentWindow) lines.push(`• Preferred Appointment: ${p.appointmentWindow}`);
  if (p.estimate) lines.push(`• Estimated Range: ${p.estimate}`);

  const note = p.notes ?? p.message;
  if (note) {
    lines.push("", "── Notes ──", note);
  }

  lines.push("", `Submitted via: ${p.source ?? "prestigeshineautodetailing.ca"}`);
  return lines.join("\n");
}

export function buildWhatsAppHref(payload: LeadPayload) {
  const text = encodeURIComponent(buildLeadMessage(payload));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export async function submitLead(payload: LeadPayload) {
  const href = buildWhatsAppHref(payload);
  try {
    const endpoint = (typeof window !== "undefined" && (window as any).AUREXO_LEAD_WEBHOOK) || "";
    if (endpoint) {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
        keepalive: true,
      }).catch(() => {});
    }
    if (typeof window !== "undefined") {
      const key = "aurexo:leads";
      const prev = JSON.parse(window.localStorage.getItem(key) ?? "[]");
      prev.push({ ...payload, submittedAt: new Date().toISOString() });
      window.localStorage.setItem(key, JSON.stringify(prev.slice(-50)));
    }
  } catch {
    /* never block the WhatsApp handoff */
  }
  return href;
}
