import { supabase } from "@/integrations/supabase/client";

export type LeadSubmission = {
  full_name: string;
  phone: string;
  email: string;
  vehicle_make?: string | null;
  vehicle_model?: string | null;
  vehicle_year?: string | null;
  vehicle_color?: string | null;
  services: string[];
  other_service?: string | null;
  conditions: string[];
  condition_notes?: string | null;
  photo_urls: string[];
  preferred_date?: string | null;
  preferred_time?: string | null;
  timeline?: string | null;
  schedule_flexible?: boolean | null;
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
  if (error) throw error;
  return { id };
}

export const SERVICE_OPTIONS = [
  { key: "interior", label: "Interior Detail", desc: "Deep vacuum, steam, wipe-down, glass." },
  { key: "exterior", label: "Exterior Detail", desc: "Hand wash, decontamination, wheels & tires." },
  { key: "full", label: "Full Detail", desc: "Complete inside-and-out concierge detail." },
  { key: "ceramic", label: "Ceramic Coating", desc: "9H hydrophobic paint protection." },
  { key: "paint-correction", label: "Paint Correction", desc: "Multi-stage swirl & scratch removal." },
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