// ============================================================
// Top Coat Auto Detailers — sample data
// Type names are preserved so all downstream routes keep compiling.
// Semantic remapping:
//   title       -> service package name (e.g. "2024 Porsche 911 Ceramic 9H Package")
//   brand       -> vehicle make (Porsche, BMW, Tesla, etc.)
//   body        -> vehicle class: "Coupe/Sedan" | "SUV/Crossover" | "Truck" | "Van/3-Row SUV"
//   fuel        -> service tier: "Express" | "Interior" | "Ceramic" | "Correction"
//   transmission-> finish focus: "Interior" | "Exterior"
//   condition   -> booking status: "Booked" | "In Progress" | "Completed"
//   priceNum    -> detailing job cost ($200–$3,500 USD)
//   kmNum       -> estimated labor minutes (60–600)
//   year        -> model year of the vehicle
//   img         -> before/after or showcase photo
// ============================================================

export type Condition = "Booked" | "In Progress" | "Completed";

export type Vehicle = {
  id: string;
  title: string;
  price: string;
  priceNum: number;
  km: string;
  kmNum: number;
  year: number;
  fuel: "Express" | "Interior" | "Ceramic" | "Correction";
  transmission: "Interior" | "Exterior";
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
  p1: img("photo-1552519507-da3b142c6e3d"),
  p2: img("photo-1503376780353-7e6692767b70"),
  p3: img("photo-1494976388531-d1058494cdd8"),
  p4: img("photo-1493238792000-8113da705763"),
  p5: img("photo-1520340356584-f9917d1eea6f"),
  p6: img("photo-1560958089-b8a1929cea89"),
  p7: img("photo-1449965408869-eaa3f722e40d"),
  p8: img("photo-1583121274602-3e2820c69888"),
  p9: img("photo-1600661653561-629509216228"),
  p10: img("photo-1542362567-b07e54358753"),
  p11: img("photo-1511919884226-fd3cad34687c"),
  p12: img("photo-1494905998402-395d579af36f"),
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
  v("porsche-911-ceramic-9h", "2024 Porsche 911 Ceramic 9H Package", 2800, 480, 2024, "Ceramic", "Exterior", "Coupe/Sedan", "Porsche", "Completed", photos.p1, { tag: "Studio Pick", featured: true }),
  v("bmw-m5-paint-correction", "2023 BMW M5 Multi-Stage Paint Correction", 3200, 600, 2023, "Correction", "Exterior", "Coupe/Sedan", "BMW", "Completed", photos.p2, { tag: "Premium Build", featured: true }),
  v("tesla-modelx-interior-deep", "2024 Tesla Model X Interior Deep Clean", 650, 240, 2024, "Interior", "Interior", "SUV/Crossover", "Tesla", "Completed", photos.p3, { tag: "Best Value" }),
  v("range-rover-sport-ceramic", "2023 Range Rover Sport Ceramic 9H Package", 3100, 540, 2023, "Ceramic", "Exterior", "SUV/Crossover", "Range Rover", "Completed", photos.p4, { tag: "Premium Build", featured: true }),
  v("mercedes-gle-correction", "2024 Mercedes-Benz GLE Paint Correction & Ceramic", 3500, 600, 2024, "Correction", "Exterior", "SUV/Crossover", "Mercedes-Benz", "Completed", photos.p5, { tag: "Studio Pick", featured: true }),
  v("audi-rs7-ceramic", "2024 Audi RS7 Ceramic Coating Package", 2600, 420, 2024, "Ceramic", "Exterior", "Coupe/Sedan", "Audi", "Completed", photos.p6, { tag: "New Project" }),
  v("ford-f150-express", "2024 Ford F-150 Express Exterior Detail", 299, 90, 2024, "Express", "Exterior", "Truck", "Ford", "Completed", photos.p7, { tag: "Best Value" }),
  v("cadillac-escalade-interior", "2023 Cadillac Escalade Full Interior Package", 895, 300, 2023, "Interior", "Interior", "Van/3-Row SUV", "Cadillac", "Completed", photos.p8),
  v("lexus-lx600-ceramic", "2024 Lexus LX 600 Ceramic 9H Package", 3000, 510, 2024, "Ceramic", "Exterior", "SUV/Crossover", "Lexus", "In Progress", photos.p9, { tag: "New Project" }),
  v("ram-1500-express", "2024 RAM 1500 Express Full Detail", 349, 120, 2024, "Express", "Exterior", "Truck", "RAM", "Completed", photos.p10, { tag: "Best Value" }),
  v("porsche-cayenne-correction", "2022 Porsche Cayenne S Paint Correction", 2900, 540, 2022, "Correction", "Exterior", "SUV/Crossover", "Porsche", "Completed", photos.p11, { tag: "Premium Build" }),
  v("toyota-sienna-interior", "2023 Toyota Sienna Interior Deep Clean", 550, 210, 2023, "Interior", "Interior", "Van/3-Row SUV", "Toyota", "Completed", photos.p12),
  v("bmw-x7-ceramic", "2024 BMW X7 Ceramic 9H Full Package", 3100, 525, 2024, "Ceramic", "Exterior", "Van/3-Row SUV", "BMW", "Booked", photos.p1, { tag: "New Project" }),
  v("chevy-silverado-express", "2023 Chevrolet Silverado Express Detail", 279, 90, 2023, "Express", "Exterior", "Truck", "Chevrolet", "Completed", photos.p2, { tag: "Best Value" }),
  v("jeep-grand-cherokee-interior", "2024 Jeep Grand Cherokee Interior Package", 720, 270, 2024, "Interior", "Interior", "SUV/Crossover", "Jeep", "Completed", photos.p3),
  v("mercedes-s580-ceramic", "2024 Mercedes-Benz S 580 Ceramic 9H Package", 3400, 570, 2024, "Ceramic", "Exterior", "Coupe/Sedan", "Mercedes-Benz", "In Progress", photos.p4, { tag: "Studio Pick", featured: true }),
  v("tesla-model3-correction", "2023 Tesla Model 3 Paint Correction", 1800, 360, 2023, "Correction", "Exterior", "Coupe/Sedan", "Tesla", "Completed", photos.p5),
  v("lexus-rx500h-express", "2024 Lexus RX 500h Express Package", 319, 90, 2024, "Express", "Exterior", "SUV/Crossover", "Lexus", "Completed", photos.p6, { tag: "Best Value" }),
  v("audi-q8-interior", "2023 Audi Q8 Premium Interior Detail", 875, 300, 2023, "Interior", "Interior", "SUV/Crossover", "Audi", "Completed", photos.p7),
  v("ford-expedition-max-interior", "2024 Ford Expedition MAX Interior Deep Clean", 750, 270, 2024, "Interior", "Interior", "Van/3-Row SUV", "Ford", "Booked", photos.p8, { tag: "New Project" }),
  v("ram-trd-correction", "2023 RAM TRX Paint Correction & Sealant", 2400, 450, 2023, "Correction", "Exterior", "Truck", "RAM", "Completed", photos.p9, { tag: "Premium Build" }),
  v("chevy-tahoe-ceramic", "2024 Chevrolet Tahoe Ceramic 9H Package", 2750, 465, 2024, "Ceramic", "Exterior", "SUV/Crossover", "Chevrolet", "Booked", photos.p10, { tag: "New Project" }),
];

// Vehicle makes / brand partners
export const brands = [
  "Porsche", "BMW", "Mercedes-Benz", "Audi", "Tesla",
  "Lexus", "Range Rover", "Toyota", "Ford", "Chevrolet", "RAM", "Cadillac", "Jeep",
];

// Vehicle class filters (was: body types)
export const bodyTypes = [
  { label: "Coupe/Sedan", count: vehicles.filter((x) => x.body === "Coupe/Sedan").length },
  { label: "SUV/Crossover", count: vehicles.filter((x) => x.body === "SUV/Crossover").length },
  { label: "Truck", count: vehicles.filter((x) => x.body === "Truck").length },
  { label: "Van/3-Row SUV", count: vehicles.filter((x) => x.body === "Van/3-Row SUV").length },
];

// Service tiers (was: fuel types)
export const fuelTypes: Vehicle["fuel"][] = ["Express", "Interior", "Ceramic", "Correction"];

// Finish focus (was: transmissions)
export const transmissions: Vehicle["transmission"][] = ["Interior", "Exterior"];

// Booking status (was: conditions)
export const conditions: Condition[] = ["Booked", "In Progress", "Completed"];

export const priceMin = 0;
export const priceMax = 4000;
