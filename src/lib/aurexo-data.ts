// ============================================================
// Prestige Shine Auto Detailing — real completed projects
// Type names are preserved so all downstream routes keep compiling.
// Semantic remapping:
//   title       -> project name (vehicle + service performed)
//   brand       -> vehicle make
//   body        -> vehicle class: "Coupe/Sedan" | "SUV/Crossover" | "Truck" | "Van/3-Row SUV"
//   fuel        -> service tier: "Express" | "Interior" | "Ceramic" | "Correction"
//   transmission-> finish focus: "Interior" | "Exterior"
//   condition   -> booking status: "Booked" | "In Progress" | "Completed"
//   priceNum    -> detailing job cost (USD)
//   kmNum       -> estimated labor minutes
//   summary     -> project description
// ============================================================

import pontiacTransAm from "@/assets/pontiac_trans_am.jpg.asset.json";
import audiQ5 from "@/assets/audi_q5.jpg.asset.json";
import toyotaRav4 from "@/assets/toyota_rav4.jpg.asset.json";
import corvetteC8 from "@/assets/corvette_c8.jpg.asset.json";
import bmwX5 from "@/assets/bmwx5.jpg.asset.json";
import chevelleSS from "@/assets/chevelle_ss.jpg.asset.json";
import hondaOdyssey from "@/assets/honda_odyssey.jpg.asset.json";
import chevyBelAir from "@/assets/chevrolette_bel_air.jpg.asset.json";
import hondaHrv from "@/assets/honda_hrv.jpg.asset.json";
import fordF150 from "@/assets/ford_f150.jpg.asset.json";

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
  summary?: string;
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
  price: `From $${priceNum.toLocaleString()}`,
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
  v("pontiac-trans-am-restoration-detail", "Pontiac Trans Am — Restoration Detail", 900, 540, 2002, "Correction", "Exterior", "Coupe/Sedan", "Pontiac", "Completed", pontiacTransAm.url, {
    tag: "Studio Pick",
    featured: true,
    summary:
      "A full restoration detail on a black Trans Am. Decontamination wash, clay treatment, and multi-stage machine polishing removed years of swirl marks and oxidation from the single-stage-sensitive panels, followed by a durable sealant, trim restoration, and wheel and tire detailing to bring the finish back to a deep, wet black.",
  }),
  v("audi-q5-ceramic-coating", "Audi Q5 — Ceramic Coating", 1200, 480, 2023, "Ceramic", "Exterior", "SUV/Crossover", "Audi", "Completed", audiQ5.url, {
    tag: "Premium Build",
    featured: true,
    summary:
      "Nano-ceramic coating applied to a Daytona Grey Q5. The paint was chemically decontaminated, clayed, and machine polished before a 9H base and top coat were applied panel by panel, with coated wheel faces, glass, and gloss-black trim for long-term hydrophobic protection.",
  }),
  v("toyota-rav4-ceramic-coating", "Toyota RAV4 — Ceramic Coating", 1200, 450, 2023, "Ceramic", "Exterior", "SUV/Crossover", "Toyota", "Completed", toyotaRav4.url, {
    summary:
      "Ceramic coating on a Cavalry Blue RAV4 daily driver. Iron and tar removal, clay decontamination, and a refining polish preceded the 9H coating, locking in gloss on the paint while adding easy-clean protection to the black cladding and alloy wheels.",
  }),
  v("corvette-c8-ceramic-coating", "Chevrolet Corvette C8 — Ceramic Coating", 1200, 510, 2022, "Ceramic", "Exterior", "Coupe/Sedan", "Chevrolet", "Completed", corvetteC8.url, {
    tag: "Premium Build",
    featured: true,
    summary:
      "9H ceramic coating on a Hypersonic Grey C8. Every panel was decontaminated and polished to remove light wash marring before coating, with special attention to the front splitter, side intakes, and gloss-black wheels so the metallic flake pops under direct light.",
  }),
  v("bmw-x5-full-detail", "BMW X5 — Full Detail", 275, 300, 2021, "Express", "Exterior", "SUV/Crossover", "BMW", "Completed", bmwX5.url, {
    summary:
      "Complete inside-and-out detail on an X5. Two-bucket contact wash, bug and tar removal, wheel and wheel-barrel cleaning, and a spray sealant outside; full vacuum, interior wipe-down, and streak-free glass inside for a factory-fresh presentation.",
  }),
  v("chevelle-ss-paint-correction", "Chevrolet Chevelle SS — Paint Correction", 600, 570, 1966, "Correction", "Exterior", "Coupe/Sedan", "Chevrolet", "Completed", chevelleSS.url, {
    tag: "Studio Pick",
    featured: true,
    summary:
      "Multi-stage paint correction on a black '66 Chevelle SS. Paint depth was mapped before compounding, then progressively refined with finishing polishes to level swirls and holograms on the delicate older finish, sealed to protect the mirror-flat gloss and polished chrome trim.",
  }),
  v("honda-odyssey-interior-restoration", "Honda Odyssey — Interior Restoration", 300, 330, 2022, "Interior", "Interior", "Van/3-Row SUV", "Honda", "Completed", hondaOdyssey.url, {
    tag: "Best Value",
    summary:
      "Interior restoration on a family Odyssey. Full three-row vacuum and pet-hair removal, hot-water extraction of carpets and seats, enzymatic stain treatment, door jamb and console detailing, and a fabric protection top coat to keep the cabin clean between visits.",
  }),
  v("chevrolet-bel-air-paint-correction", "Chevrolet Bel Air — Paint Correction", 900, 600, 1957, "Correction", "Exterior", "Coupe/Sedan", "Chevrolet", "Completed", chevyBelAir.url, {
    tag: "Premium Build",
    featured: true,
    summary:
      "Show-level paint correction on a custom blue '57 Bel Air. Careful hand decontamination and controlled machine polishing brought the deep metallic blue back to a flawless reflection, with hand-polished chrome brightwork and a protective sealant suited to a garage-kept classic.",
  }),
  v("honda-hrv-ceramic-coating", "Honda HR-V — Ceramic Coating", 800, 420, 2024, "Ceramic", "Exterior", "SUV/Crossover", "Honda", "Completed", hondaHrv.url, {
    tag: "Best Value",
    summary:
      "Ceramic coating on a Urban Grey HR-V. A light single-stage polish removed dealer-install marring before the 9H coating was applied, giving the flat grey paint noticeably more depth along with UV, chemical, and water-spot resistance.",
  }),
  v("ford-f150-platinum-full-detail", "Ford F-150 — Full Detail", 300, 390, 2019, "Express", "Exterior", "Truck", "Ford", "Completed", fordF150.url, {
    tag: "New Project",
    summary:
      "Complete full detail on a black F-150. Foam pre-wash, iron decontamination, clay treatment, and a gloss-enhancing polish removed wash marring across the large panels, finished with a durable sealant, dressed trim and running boards, and a full interior clean.",
  }),
];

// Vehicle makes featured in our project work
export const brands = [
  "Pontiac", "Audi", "Toyota", "Chevrolet", "BMW", "Honda", "Ford",
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
