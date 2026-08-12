/**
 * PRICING CONFIGURATION
 * -----------------------------------------------------------
 * Single source of truth for every price shown on the website.
 * Business owners can update any number/label below without
 * touching application logic.
 */

export const VEHICLE_SIZES = [
  { key: "car", label: "Car", examples: "Sedans, coupes, hatchbacks" },
  { key: "compact-suv", label: "Compact SUV", examples: "CR-V, Tucson, Sportage, CX-5, Rogue" },
  { key: "midsize-suv", label: "Mid-Size SUV", examples: "Highlander, Outlander, Santa Fe, Sorento, Explorer" },
  { key: "large-suv", label: "Large / 3-Row SUV", examples: "Tahoe, Yukon, Expedition, Sequoia" },
  { key: "xl-suv", label: "XL SUV", examples: "Suburban, Yukon XL, Expedition MAX" },
  { key: "pickup", label: "Pickup Truck", examples: "F-150, Silverado 1500, Ram 1500" },
  { key: "hd-truck", label: "Large / HD Truck", examples: "F-250/350, Silverado HD, Ram HD" },
] as const;

export type VehicleSizeKey = (typeof VEHICLE_SIZES)[number]["key"];

export const PRICING_CONFIG = {
  currency: "$",

  /** Full Detail — starting price by vehicle size. */
  fullDetail: {
    "car": 200,
    "compact-suv": 225,
    "midsize-suv": 275,
    "large-suv": 300,
    "xl-suv": 350,
    "pickup": 300,
    "hd-truck": 350,
  } as Record<VehicleSizeKey, number>,

  /** Full Detail + Paint Enhancement combo — starting price by vehicle size. */
  combo: {
    "car": 450,
    "compact-suv": 475,
    "midsize-suv": 550,
    "large-suv": 600,
    "xl-suv": 700,
    "pickup": 600,
    "hd-truck": 700,
  } as Record<VehicleSizeKey, number>,

  /** Flat starting prices for correction and ceramic services. */
  paintEnhancement: 300,
  paintCorrection2Step: 600,
  paintCorrectionAdvanced: 900,
  ceramic3Year: 800,
  ceramic6Year: 1200,
  ceramicWithCorrection: 1500,

  /** Optional add-on services. */
  addOns: {
    "engine-bay": 89,
    "headlight": 59,
  } as Record<string, number>,

  /** Each reported vehicle-condition issue adds this much. */
  conditionSurcharge: 25,
  heavyConditions: ["Heavy Pet Hair", "Smoke Odor", "Mold or Mildew", "Heavy Dirt or Mud"],
  heavyConditionSurcharge: 35,

  /** Upper end of the estimate range as a multiple of the starting price. */
  rangeUpperMultiplier: 1.25,

  /** Standard disclaimers used across the site. */
  notes: {
    fullDetail:
      "Final pricing is based on vehicle size and condition. Excessive pet hair, staining, heavy soiling, or unusually neglected vehicles may cost more.",
    correction:
      "Paint enhancement and correction pricing depends on vehicle size and paint condition. An in-person inspection or photo assessment may be required before a final quote is confirmed.",
    estimate:
      "Prices shown are starting estimates. Final pricing is confirmed after reviewing vehicle size, condition, and any additional factors that may affect the scope of work.",
  },
} as const;

/** Starting price used by the estimator, keyed by service option. */
function servicePrice(key: string, size: VehicleSizeKey): number | null {
  const c = PRICING_CONFIG;
  switch (key) {
    case "full":
    case "interior":
    case "exterior":
    case "maintenance":
      return c.fullDetail[size];
    case "combo":
      return c.combo[size];
    case "paint-enhancement":
      return c.paintEnhancement;
    case "paint-correction":
      return c.paintCorrection2Step;
    case "paint-correction-advanced":
      return c.paintCorrectionAdvanced;
    case "ceramic-3":
      return c.ceramic3Year;
    case "ceramic-6":
      return c.ceramic6Year;
    case "ceramic-correction":
      return c.ceramicWithCorrection;
    default:
      return c.addOns[key] ?? null;
  }
}

export type EstimateInput = {
  /** Optional — when unknown we show a range covering every vehicle size. */
  vehicleSize?: VehicleSizeKey | null;
  services: string[];
  conditions: string[];
};

export type EstimateResult = {
  vehicleSizeLabel: string;
  serviceLabel: string;
  isRange: boolean;
  low: number;
  high: number;
  breakdown: { label: string; amount: number }[];
};

const SERVICE_LABELS: Record<string, string> = {
  full: "Full Detail",
  interior: "Interior Detail",
  exterior: "Exterior Detail",
  maintenance: "Maintenance Detail",
  combo: "Full Detail + Paint Enhancement",
  "paint-enhancement": "1-Step Paint Enhancement",
  "paint-correction": "2-Step Paint Correction",
  "paint-correction-advanced": "Advanced / Multi-Stage Paint Correction",
  "ceramic-3": "3-Year Ceramic Protection",
  "ceramic-6": "System X 6-Year Ceramic Coating",
  "ceramic-correction": "Correction + 6-Year Ceramic",
  "engine-bay": "Engine Bay Detail",
  headlight: "Headlight Restoration",
  other: "Custom request",
};

export function serviceLabel(key: string) {
  return SERVICE_LABELS[key] ?? key;
}

function totalForSize(services: string[], size: VehicleSizeKey) {
  // The combo already contains the full detail and a 1-step enhancement.
  const hasCombo = services.includes("combo");
  const counted = services.filter((s) => {
    if (hasCombo && (s === "full" || s === "interior" || s === "exterior" || s === "maintenance" || s === "paint-enhancement")) return false;
    if (services.includes("full") && (s === "interior" || s === "exterior" || s === "maintenance")) return false;
    if (services.includes("ceramic-correction") && (s === "ceramic-6" || s === "ceramic-3")) return false;
    return true;
  });
  let sum = 0;
  for (const s of counted) sum += servicePrice(s, size) ?? 0;
  return sum;
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const cfg = PRICING_CONFIG;
  const sizes: VehicleSizeKey[] = input.vehicleSize
    ? [input.vehicleSize]
    : (VEHICLE_SIZES.map((v) => v.key) as VehicleSizeKey[]);

  const totals = sizes.map((s) => totalForSize(input.services, s));
  const baseLow = Math.min(...totals);
  const baseHigh = Math.max(...totals);

  let conditionTotal = 0;
  for (const c of input.conditions) {
    conditionTotal += (cfg.heavyConditions as readonly string[]).includes(c)
      ? cfg.heavyConditionSurcharge
      : cfg.conditionSurcharge;
  }

  const low = baseLow + conditionTotal;
  const high = Math.round((baseHigh + conditionTotal) * cfg.rangeUpperMultiplier);

  const priced = input.services.filter((s) => servicePrice(s, sizes[0]) !== null);
  const serviceLabelText = priced.length
    ? priced.map(serviceLabel).join(" + ")
    : "Custom request";

  const breakdown = [
    { label: `${serviceLabelText} — starting base`, amount: baseLow },
    ...(conditionTotal
      ? [{ label: `Vehicle condition (${input.conditions.length} noted)`, amount: conditionTotal }]
      : []),
  ];

  return {
    vehicleSizeLabel: input.vehicleSize
      ? VEHICLE_SIZES.find((v) => v.key === input.vehicleSize)!.label
      : "All vehicle sizes",
    serviceLabel: serviceLabelText,
    isRange: !input.vehicleSize || high > low,
    low,
    high,
    breakdown,
  };
}

export function formatPrice(n: number) {
  return `${PRICING_CONFIG.currency}${n.toLocaleString()}`;
}
