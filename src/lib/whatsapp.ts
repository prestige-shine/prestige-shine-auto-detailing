// Centralized WhatsApp lead routing for Aurexo Roofing Studio.
// Nigerian country code +234, dropping the leading 0 from 07012307036.
export const WHATSAPP_NUMBER = "2347012307036";
export const WHATSAPP_DISPLAY = "+234 701 230 7036";
export const STUDIO_PHONE = "+1 (561) 555-0199";
export const STUDIO_TEL = "+15615550199";

export type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  zip?: string;
  county?: string;
  projectType?: string;
  material?: string;
  sqft?: number | string;
  stories?: string | number;
  estimate?: string;
  message?: string;
  source?: string;
};

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function formatEstimateRange(low: number, high: number) {
  return `${usd(low)} – ${usd(high)}`;
}

/**
 * Cleanly packages every provided metric into a legible, spaced paragraph
 * with zero missing objects. Empty fields are simply skipped.
 */
export function buildLeadMessage(p: LeadPayload) {
  const lines: string[] = [
    "Hi Aurexo Roofing Studio — I'd like to request a premium roofing consultation.",
    "",
    "── Client Details ──",
  ];
  if (p.name) lines.push(`• Name: ${p.name}`);
  if (p.phone) lines.push(`• Phone: ${p.phone}`);
  if (p.email) lines.push(`• Email: ${p.email}`);
  if (p.zip) lines.push(`• Ohio Zip: ${p.zip}`);
  if (p.county) lines.push(`• County: ${p.county}`);

  lines.push("", "── Project Specification ──");
  if (p.projectType) lines.push(`• Project Type: ${p.projectType}`);
  if (p.material) lines.push(`• Material Preference: ${p.material}`);
  if (p.sqft) lines.push(`• Roof Size: ${typeof p.sqft === "number" ? p.sqft.toLocaleString() : p.sqft} SqFt`);
  if (p.stories) lines.push(`• Stories: ${p.stories}`);
  if (p.estimate) lines.push(`• Estimated Range: ${p.estimate}`);

  if (p.message) {
    lines.push("", "── Notes ──", p.message);
  }

  lines.push("", `Submitted via: ${p.source ?? "aurexo-roofing.lovable.app"}`);
  return lines.join("\n");
}

export function buildWhatsAppHref(payload: LeadPayload) {
  const text = encodeURIComponent(buildLeadMessage(payload));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Dual-action lead submission:
 *   A) POST to a webhook / logging endpoint (fire-and-forget, never blocks)
 *   B) Redirect the user to WhatsApp with the fully-packaged paragraph
 * If no webhook is wired the payload is still journaled to localStorage
 * so no lead is ever dropped when the user leaves the WhatsApp redirect.
 */
export async function submitLead(payload: LeadPayload) {
  // Action B (WhatsApp) is computed synchronously.
  const href = buildWhatsAppHref(payload);

  // Action A (DB / webhook logging) — fire and forget.
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
