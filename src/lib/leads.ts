import { supabase } from "@/integrations/supabase/client";
import { notifyEnquirySubmitted } from "@/lib/notify.functions";

export type LeadSubmission = {
  full_name: string;
  phone: string;
  email: string;
  vehicle_make?: string | null;
  vehicle_model?: string | null;
  vehicle_year?: string | null;
  vehicle_color?: string | null;
  vehicle_size?: string | null;
  services: string[];
  other_service?: string | null;
  conditions: string[];
  condition_notes?: string | null;
  photo_urls: string[];
  preferred_date?: string | null;
  preferred_time?: string | null;
  timeline?: string | null;
  schedule_flexible?: boolean | null;
  estimate_text?: string | null;
  source?: string;
};

export async function uploadLeadPhoto(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const key = `pending/${crypto.randomUUID()}.${ext || "jpg"}`;
  const { error } = await supabase.storage
    .from("lead-photos")
    .upload(key, file, { contentType: file.type || "image/jpeg", upsert: false });
  if (error) throw error;
  return key;
}

export async function submitLead(payload: LeadSubmission): Promise<{ id: string }> {
  const id = crypto.randomUUID();
  const { error } = await supabase
    .from("leads")
    .insert({ id, ...payload } as never);
  // Storage failure = the enquiry was NOT received. Surface it, keep the form intact.
  if (error) throw error;

  // Enquiry is safely stored. Notifications are best-effort from here on:
  // a failed email/SMS never invalidates the stored enquiry.
  try {
    await notifyEnquirySubmitted({ data: { id } });
  } catch (e) {
    console.error("[lead] notification dispatch failed", e);
  }
  return { id };
}


export const SERVICE_OPTIONS = [
  { key: "interior", label: "Interior Detail", desc: "Deep vacuum, steam, extraction, glass." },
  { key: "exterior", label: "Exterior Detail", desc: "Hand wash, decontamination, wheels & tires." },
  { key: "full", label: "Full Detail", desc: "Complete inside-and-out detail. From $200." },
  { key: "combo", label: "Full Detail + Paint Enhancement", desc: "Full detail plus a 1-step gloss enhancement. From $450." },
  { key: "paint-enhancement", label: "1-Step Paint Enhancement", desc: "Improves gloss and reduces light swirls. From $300." },
  { key: "paint-correction", label: "2-Step Paint Correction", desc: "Targets moderate swirls, oxidation and paint defects. From $600." },
  { key: "paint-correction-advanced", label: "Advanced / Multi-Stage Paint Correction", desc: "For heavier defects and restoration-level work. From $900." },
  { key: "ceramic-3", label: "3-Year Ceramic Protection", desc: "Durable ceramic protection. From $800." },
  { key: "ceramic-6", label: "System X 6-Year Ceramic Coating", desc: "System X certified 6-year coating. From $1,200." },
  { key: "ceramic-correction", label: "Correction + 6-Year Ceramic", desc: "Paint correction paired with a 6-year coating. From $1,500." },
  { key: "engine-bay", label: "Engine Bay Detail", desc: "Safe degrease & dress of the engine bay." },
  { key: "headlight", label: "Headlight Restoration", desc: "Restore clarity to yellowed lenses." },
  { key: "maintenance", label: "Maintenance Detail", desc: "Regular upkeep between full details." },
  { key: "other", label: "Other", desc: "Tell us what you need." },
] as const;

export const CONDITION_OPTIONS = [
  "Heavy Pet Hair",
  "Food or Drink Stains",
  "Smoke Odor",
  "Mold or Mildew",
  "Heavy Dirt or Mud",
  "Excessive Trash",
  "Sand",
  "Tree Sap",
  "Bug Residue",
  "Kids' Messes",
] as const;

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "This week",
  "Within two weeks",
  "Within a month",
  "Just comparing prices for now",
] as const;

export const TIME_SLOTS = [
  "8:00 AM",
  "9:30 AM",
  "11:00 AM",
  "12:30 PM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
] as const;