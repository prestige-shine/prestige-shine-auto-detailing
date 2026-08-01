/**
 * PRICING CONFIGURATION
 * -----------------------------------------------------------
 * Business owners can update every number/label below without
 * touching any application logic.
 */
export const PRICING_CONFIG = {
  currency: "$",

  /** Vehicle classes and their starting prices per package. */
  vehicleTypes: {
    car: {
      label: "Cars",
      packages: { silver: 100, gold: 150, platinum: 200 },
    },
    suv: {
      label: "SUVs & Trucks",
      packages: { silver: 150, gold: 200, platinum: 250 },
    },
  },

  packages: {
    silver: { label: "Silver Detail" },
    gold: { label: "Gold Detail" },
    platinum: { label: "Platinum Detail" },
  },

  /** Which package each selectable service maps to. */
  serviceToPackage: {
    maintenance: "silver",
    interior: "silver",
    exterior: "silver",
    full: "gold",
    "engine-bay": "gold",
    headlight: "gold",
    ceramic: "platinum",
    "paint-correction": "platinum",
    other: "silver",
  } as Record<string, PackageKey>,

  /** Extra services selected on top of the main package. */
  addOnPrice: 40,

  /** Each reported vehicle-condition issue adds this much. */
  conditionSurcharge: 25,

  /** Conditions considered heavy — they widen the upper range. */
  heavyConditions: ["Heavy Pet Hair", "Smoke Odor", "Mold or Mildew", "Heavy Dirt or Mud"],
  heavyConditionSurcharge: 35,

  /** Upper end of the range as a multiple of the starting price. */
  rangeUpperMultiplier: 1.4,
} as const;

export type PackageKey = "silver" | "gold" | "platinum";
export type VehicleTypeKey = keyof typeof PRICING_CONFIG.vehicleTypes;

export type EstimateInput = {
  /** Optional — when unknown we show a range covering all vehicle types. */
  vehicleType?: VehicleTypeKey | null;
  services: string[];
  conditions: string[];
};

export type EstimateResult = {
  packageKey: PackageKey;
  packageLabel: string;
  vehicleTypeLabel: string;
  isRange: boolean;
  low: number;
  high: number;
  breakdown: { label: string; amount: number }[];
};

function highestPackage(services: string[]): PackageKey {
  const order: PackageKey[] = ["silver", "gold", "platinum"];
  let best: PackageKey = "silver";
  for (const s of services) {
    const p = PRICING_CONFIG.serviceToPackage[s];
    if (p && order.indexOf(p) > order.indexOf(best)) best = p;
  }
  return best;
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const cfg = PRICING_CONFIG;
  const packageKey = highestPackage(input.services);
  const packageLabel = cfg.packages[packageKey].label;

  const types = input.vehicleType
    ? [input.vehicleType]
    : (Object.keys(cfg.vehicleTypes) as VehicleTypeKey[]);

  const bases = types.map((t) => cfg.vehicleTypes[t].packages[packageKey]);
  const baseLow = Math.min(...bases);
  const baseHigh = Math.max(...bases);

  const extraServices = input.services.filter(
    (s) => cfg.serviceToPackage[s] && cfg.serviceToPackage[s] !== packageKey,
  );
  const addOnTotal = extraServices.length * cfg.addOnPrice;

  let conditionTotal = 0;
  for (const c of input.conditions) {
    conditionTotal += (cfg.heavyConditions as readonly string[]).includes(c)
      ? cfg.heavyConditionSurcharge
      : cfg.conditionSurcharge;
  }

  const low = baseLow + addOnTotal + conditionTotal;
  const rawHigh = baseHigh + addOnTotal + conditionTotal;
  const high = Math.round(rawHigh * cfg.rangeUpperMultiplier);

  const breakdown = [
    {
      label: `${packageLabel} — starting base`,
      amount: baseLow,
    },
    ...(extraServices.length
      ? [{ label: `Add-on services (${extraServices.length})`, amount: addOnTotal }]
      : []),
    ...(conditionTotal
      ? [{ label: `Vehicle condition (${input.conditions.length} noted)`, amount: conditionTotal }]
      : []),
  ];

  return {
    packageKey,
    packageLabel,
    vehicleTypeLabel: input.vehicleType
      ? cfg.vehicleTypes[input.vehicleType].label
      : "Cars, SUVs & Trucks",
    isRange: !input.vehicleType || conditionTotal > 0 || extraServices.length > 0,
    low,
    high,
    breakdown,
  };
}

export function formatPrice(n: number) {
  return `${PRICING_CONFIG.currency}${n.toLocaleString()}`;
}
