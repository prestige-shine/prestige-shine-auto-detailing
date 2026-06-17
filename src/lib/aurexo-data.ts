// Repurposed for Aurexo Roofing Studio.
// Type names are preserved so all downstream routes (buy, listings, compare,
// favorites, etc.) keep working — only the semantic meaning changes:
//   title       -> project name
//   brand       -> roofing material manufacturer
//   body        -> roof profile (Gable / Hip / Mansard / Flat / Shed)
//   fuel        -> material family (Asphalt / Metal / Slate / Composite)
//   transmission-> finish (Architectural / Standing-Seam)
//   condition   -> service type (New Install / Re-Roof / Restoration)
//   priceNum    -> project budget (USD)
//   kmNum       -> square footage
//   year        -> completion year
//   img         -> hero photo URL

export type Condition = "New Install" | "Re-Roof" | "Restoration";

export type Vehicle = {
  id: string;
  title: string;
  price: string;
  priceNum: number;
  km: string;
  kmNum: number;
  year: number;
  fuel: "Asphalt" | "Metal" | "Slate" | "Composite";
  transmission: "Architectural" | "Standing-Seam";
  body: string;
  brand: string;
  condition: Condition;
  featured?: boolean;
  tag?: "Best Value" | "Premium Build" | "New Project" | "Studio Pick";
  img: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1280&q=70`;

const photos = {
  modernSlate: img("photo-1592595896616-c37162298647"),
  shingleCraftsman: img("photo-1572120360610-d971b9d7767c"),
  metalStandingSeam: img("photo-1600585154340-be6161a56a0c"),
  estateMansard: img("photo-1600566753190-17f0baa2a6c3"),
  lakefrontHip: img("photo-1600585154526-990dced4db0d"),
  modernFlat: img("photo-1564013799919-ab600027ffc6"),
  copperAccent: img("photo-1600585152220-90363fe7e115"),
  farmhouseGable: img("photo-1568605114967-8130f3a36994"),
  contemporaryDark: img("photo-1600596542815-ffad4c1539a9"),
  slateHistoric: img("photo-1605114324393-9b3da72ad3c0"),
  woodShake: img("photo-1605276374104-dee2a0ed3cd6"),
  cedarShake: img("photo-1582268611958-ebfd161ef9cf"),
  villaTile: img("photo-1564507592333-c60657eea523"),
  ridgeLine: img("photo-1502005229762-cf1b2da7c5d6"),
  poolHouse: img("photo-1613977257363-707ba9348227"),
};

const v = (
  id: string,
  title: string,
  priceNum: number,
  kmNum: number,
  year: number,
  fuel: Vehicle["fuel"],
  transmission: Vehicle["transmission"],
  body: string,
  brand: string,
  condition: Condition,
  image: string,
  extra: Partial<Vehicle> = {},
): Vehicle => ({
  id,
  title,
  price: `$${priceNum.toLocaleString()}`,
  priceNum,
  km: kmNum.toLocaleString(),
  kmNum,
  year,
  fuel,
  transmission,
  body,
  brand,
  condition,
  img: image,
  ...extra,
});

export const vehicles: Vehicle[] = [
  v("2025-cleveland-slate-estate", "2025 Cleveland Slate Estate Roof", 142000, 6200, 2025, "Slate", "Architectural", "Hip", "DaVinci", "New Install", photos.modernSlate, { tag: "Studio Pick", featured: true }),
  v("2025-columbus-standing-seam", "2025 Columbus Standing-Seam Residence", 78400, 4100, 2025, "Metal", "Standing-Seam", "Gable", "DECRA", "New Install", photos.metalStandingSeam, { tag: "New Project", featured: true }),
  v("2024-cincinnati-architectural", "2024 Cincinnati Architectural Shingle Re-Roof", 24800, 3200, 2024, "Asphalt", "Architectural", "Gable", "GAF", "Re-Roof", photos.shingleCraftsman, { tag: "Best Value" }),
  v("2025-akron-mansard-estate", "2025 Akron Mansard Estate Restoration", 186000, 5400, 2025, "Slate", "Architectural", "Mansard", "CertainTeed", "Restoration", photos.estateMansard, { tag: "Premium Build", featured: true }),
  v("2024-toledo-lakefront-hip", "2024 Toledo Lakefront Hip Roof", 64500, 3800, 2024, "Composite", "Architectural", "Hip", "Brava", "New Install", photos.lakefrontHip, { tag: "Best Value" }),
  v("2025-dayton-modern-flat", "2025 Dayton Modern Flat-Profile Build", 92300, 4600, 2025, "Composite", "Architectural", "Flat", "Carlisle", "New Install", photos.modernFlat),
  v("2025-canton-copper-accent", "2025 Canton Copper Accent Roof", 158000, 3900, 2025, "Metal", "Standing-Seam", "Hip", "Revere Copper", "New Install", photos.copperAccent, { tag: "Premium Build", featured: true }),
  v("2024-medina-farmhouse-gable", "2024 Medina Farmhouse Gable Re-Roof", 28900, 2900, 2024, "Asphalt", "Architectural", "Gable", "Owens Corning", "Re-Roof", photos.farmhouseGable),
  v("2025-westlake-contemporary", "2025 Westlake Contemporary Dark Roof", 71200, 4200, 2025, "Asphalt", "Architectural", "Gable", "Malarkey", "New Install", photos.contemporaryDark, { tag: "New Project" }),
  v("2024-shaker-heights-historic-slate", "2024 Shaker Heights Historic Slate Restoration", 248000, 7100, 2024, "Slate", "Architectural", "Mansard", "North Country Slate", "Restoration", photos.slateHistoric, { tag: "Premium Build" }),
  v("2024-hudson-cedar-shake", "2024 Hudson Cedar Shake Replacement", 88600, 4400, 2024, "Composite", "Architectural", "Gable", "DaVinci", "Re-Roof", photos.woodShake),
  v("2025-rocky-river-cedar", "2025 Rocky River Cedar-Look Build", 96400, 4900, 2025, "Composite", "Architectural", "Hip", "Brava", "New Install", photos.cedarShake, { tag: "New Project" }),
  v("2025-bath-villa-tile", "2025 Bath Township Mediterranean Tile Estate", 132000, 5800, 2025, "Composite", "Architectural", "Hip", "Boral", "New Install", photos.villaTile, { featured: true }),
  v("2024-avon-ridge-line", "2024 Avon Ridge-Line Architectural Roof", 36200, 3100, 2024, "Asphalt", "Architectural", "Gable", "IKO", "New Install", photos.ridgeLine),
  v("2025-chagrin-falls-poolhouse", "2025 Chagrin Falls Pool House Standing-Seam", 42800, 1800, 2025, "Metal", "Standing-Seam", "Shed", "DECRA", "New Install", photos.poolHouse, { tag: "Studio Pick" }),
  v("2024-strongsville-architectural", "2024 Strongsville Architectural Shingle Re-Roof", 22400, 2700, 2024, "Asphalt", "Architectural", "Hip", "TAMKO", "Re-Roof", photos.shingleCraftsman, { tag: "Best Value" }),
  v("2025-mentor-aluminium", "2025 Mentor Premium Aluminium System", 84500, 4300, 2025, "Metal", "Standing-Seam", "Hip", "Classic Metal Roofs", "New Install", photos.metalStandingSeam),
  v("2024-beachwood-restoration", "2024 Beachwood Heritage Slate Restoration", 168000, 5200, 2024, "Slate", "Architectural", "Mansard", "Vermont Slate Co.", "Restoration", photos.estateMansard, { featured: true }),
  v("2025-solon-modern-hip", "2025 Solon Modern Hip Roof", 58300, 3700, 2025, "Asphalt", "Architectural", "Hip", "Atlas", "New Install", photos.modernSlate, { tag: "New Project" }),
  v("2024-bay-village-coastal", "2024 Bay Village Coastal Composite Roof", 74900, 4000, 2024, "Composite", "Architectural", "Gable", "Brava", "New Install", photos.lakefrontHip),
  v("2025-lakewood-craftsman", "2025 Lakewood Craftsman Re-Roof", 31600, 2900, 2025, "Asphalt", "Architectural", "Gable", "GAF", "Re-Roof", photos.shingleCraftsman),
  v("2025-pepper-pike-estate", "2025 Pepper Pike Estate Slate Build", 224000, 6600, 2025, "Slate", "Architectural", "Hip", "DaVinci", "New Install", photos.modernSlate, { tag: "Premium Build" }),
];

// Materials manufacturers (was: car brands)
export const brands = [
  "GAF", "CertainTeed", "Owens Corning", "DECRA", "DaVinci",
  "Brava", "Boral", "Malarkey", "IKO", "Atlas",
];

// Roof profile types (was: body types)
export const bodyTypes = [
  { label: "Gable", count: vehicles.filter(x => x.body === "Gable").length },
  { label: "Hip", count: vehicles.filter(x => x.body === "Hip").length },
  { label: "Mansard", count: vehicles.filter(x => x.body === "Mansard").length },
  { label: "Flat", count: vehicles.filter(x => x.body === "Flat").length },
  { label: "Shed", count: vehicles.filter(x => x.body === "Shed").length },
  { label: "Gambrel", count: 0 },
];

// Material families (was: fuel types)
export const fuelTypes: Vehicle["fuel"][] = ["Asphalt", "Metal", "Slate", "Composite"];
// Finish (was: transmissions)
export const transmissions: Vehicle["transmission"][] = ["Architectural", "Standing-Seam"];
// Service type (was: conditions)
export const conditions: Condition[] = ["New Install", "Re-Roof", "Restoration"];

export const priceMin = 0;
export const priceMax = 300000;
