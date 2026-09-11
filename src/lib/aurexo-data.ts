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
//   kmNum       -> estimated labor minutes
//   summary     -> project description
// ============================================================

import pontiacTransAm from "@/assets/pontiac_trans_am.jpg";
import audiQ5 from "@/assets/audi_q5.jpg";
import toyotaRav4 from "@/assets/toyota_rav4.jpg";
import corvetteC8 from "@/assets/corvette_c8.jpg";
import bmwX5 from "@/assets/bmwx5.jpg";
import chevelleSS from "@/assets/chevelle_ss.jpg";
import hondaOdyssey from "@/assets/honda_odyssey.jpg";
import chevyBelAir from "@/assets/chevrolette_bel_air.jpg";
import hondaHrv from "@/assets/honda_hrv.jpg";
import fordF150 from "@/assets/ford_f150.jpg";

// Project gallery images
import chevelleSS1 from "@/assets/projects/chevelle ss 1.jpg";
import chevelleSS2 from "@/assets/projects/chevelle ss 2.jpg";
import chevelleSS3 from "@/assets/projects/chevelle ss 3.jpg";
import chevelleSS4 from "@/assets/projects/chevelle ss 4.jpg";
import chevelleSS5 from "@/assets/projects/chevelle ss 5.jpg";

import honda1 from "@/assets/projects/honda 1.jpg";
import honda2 from "@/assets/projects/honda 2.jpg";
import honda3 from "@/assets/projects/honda 3.jpg";
import honda4 from "@/assets/projects/honda 4.jpg";
import honda5 from "@/assets/projects/honda 5.jpg";

import transAm1 from "@/assets/projects/trans am 1.jpg";
import transAm2 from "@/assets/projects/trans am 2.jpg";
import transAm3 from "@/assets/projects/trans am 3.jpg";
import transAm4 from "@/assets/projects/trans am 4.jpg";
import transAm5 from "@/assets/projects/trans am 5.jpg";

import audiQ51 from "@/assets/projects/audi q5 1.jpg";
import audiQ52 from "@/assets/projects/audi q5 2.jpg";
import audiQ53 from "@/assets/projects/audi q5 3.jpg";
import audiQ54 from "@/assets/projects/audi q5 4.jpg";
import audiQ55 from "@/assets/projects/audi q5 5.jpg";

import chevyBelAir1 from "@/assets/projects/chevy bel air 1.jpg";
import chevyBelAir2 from "@/assets/projects/chevy bel air 2.jpg";
import chevyBelAir3 from "@/assets/projects/chevy bel air 3.jpg";
import chevyBelAir4 from "@/assets/projects/chevy bel air 4.jpg";
import chevyBelAir5 from "@/assets/projects/chevy bel air 5.jpg";

import bmw1 from "@/assets/projects/bmw 1.jpg";
import bmw2 from "@/assets/projects/bmw 2.jpg";
import bmw3 from "@/assets/projects/bmw 3.jpg";
import bmw4 from "@/assets/projects/bmw 4.jpg";
import bmw5 from "@/assets/projects/bmw 5.jpg";

import fordF1501 from "@/assets/projects/ford f150 1.jpg";
import fordF1502 from "@/assets/projects/ford f150 2.jpg";
import fordF1503 from "@/assets/projects/ford f150 3.jpg";
import fordF1504 from "@/assets/projects/ford f150 4.jpg";
import fordF1505 from "@/assets/projects/ford f150 5.jpg";

import c81 from "@/assets/projects/c8 1.jpg";
import c82 from "@/assets/projects/c8 2.jpg";
import c83 from "@/assets/projects/c8 3.jpg";
import c84 from "@/assets/projects/c8 4.jpg";
import c85 from "@/assets/projects/c8 5.jpg";

import rav1 from "@/assets/projects/rav 1.jpg";
import rav2 from "@/assets/projects/rav 2.jpg";
import rav3 from "@/assets/projects/rav 3.jpg";
import rav4 from "@/assets/projects/rav 4.jpg";
import rav5 from "@/assets/projects/rav 5.jpg";

import hondaHrv1 from "@/assets/projects/honda hrv 1.jpg";
import hondaHrv2 from "@/assets/projects/honda hrv 2.jpg";
import hondaHrv3 from "@/assets/projects/honda hrv 3.jpg";
import hondaHrv4 from "@/assets/projects/honda hrv 4.jpg";
import hondaHrv5 from "@/assets/projects/honda hrv 5.jpg";

export type Condition = "Booked" | "In Progress" | "Completed";

export type Vehicle = {
  id: string;
  title: string;
  km: string;
  kmNum: number;
  year: number;
  fuel: "Express" | "Interior" | "Ceramic" | "Correction";
  transmission: "Interior" | "Exterior";
  body: string;
  brand: string;
  condition: Condition;
  featured?: boolean;
  img: string;
  summary?: string;
  gallery?: string[];
};

const v = (
  id: string,
  title: string,
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
  v(
    "pontiac-trans-am-restoration-detail",
    "Pontiac Trans Am — Paint Correction",
    540,
    2002,
    "Correction",
    "Exterior",
    "Coupe/Sedan",
    "Pontiac",
    "Completed",
    pontiacTransAm,
    {
      featured: true,
      gallery: [
        transAm1,
        transAm2,
        transAm3,
        transAm4,
        transAm5,
      ],
      summary:
        "A full restoration detail on a black Trans Am. A decontamination wash, clay treatment, and multi-stage machine polishing addressed years of swirl marks and oxidation on the single-stage paint, followed by a durable sealant, trim restoration, and wheel and tire detailing to restore a deep, glossy black finish.",
    },
  ),

  v(
    "audi-q5-ceramic-coating",
    "Audi Q5 — Ceramic Coating",
    480,
    2023,
    "Ceramic",
    "Exterior",
    "SUV/Crossover",
    "Audi",
    "Completed",
    audiQ5,
    {
      featured: true,
      gallery: [
        audiQ51,
        audiQ52,
        audiQ53,
        audiQ54,
        audiQ55,
      ],
      summary:
        "Nano-ceramic coating applied to a Daytona Grey Q5. The paint was chemically decontaminated, clayed, and machine polished before the selected System X coating was applied panel by panel. Wheel faces, glass, and gloss-black trim were also treated to provide a clean, glossy finish and enhanced hydrophobic protection.",
    },
  ),

  v(
    "toyota-rav4-ceramic-coating",
    "Toyota RAV4 — Ceramic Coating",
    450,
    2023,
    "Ceramic",
    "Exterior",
    "SUV/Crossover",
    "Toyota",
    "Completed",
    toyotaRav4,
    {
      gallery: [
        rav1,
        rav2,
        rav3,
        rav4,
        rav5,
      ],
      summary:
        "Ceramic coating applied to a Cavalry Blue RAV4 daily driver. Iron and tar removal, clay decontamination, and a refining polish prepared the paint before the selected System X coating was applied. The paint received a glossy, protected finish, while the black cladding and alloy wheels were also treated for easier maintenance and enhanced hydrophobic protection.",
    },
  ),

  v(
    "corvette-c8-ceramic-coating",
    "Chevrolet Corvette C8 — Ceramic Coating",
    510,
    2022,
    "Ceramic",
    "Exterior",
    "Coupe/Sedan",
    "Chevrolet",
    "Completed",
    corvetteC8,
    {
      featured: true,
      gallery: [
        c81,
        c82,
        c83,
        c84,
        c85,
      ],
      summary:
        "Ceramic coating applied to a Hypersonic Grey C8. Every panel was decontaminated and polished to remove light wash marring before the selected System X coating was applied. Special attention was given to the front splitter, side intakes, and gloss-black wheels to enhance the vehicle’s finish and bring out the metallic flake under direct light.",
    },
  ),

  v(
    "bmw-x5-full-detail",
    "BMW X5 — Full Detail",
    300,
    2021,
    "Express",
    "Exterior",
    "SUV/Crossover",
    "BMW",
    "Completed",
    bmwX5,
    {
      gallery: [
        bmw1,
        bmw2,
        bmw3,
        bmw4,
        bmw5,
      ],
      summary:
        "Complete inside-and-out detail on an X5. A two-bucket contact wash, bug and tar removal, wheel and wheel-barrel cleaning, and spray sealant were completed outside. Inside, the vehicle received a full vacuum, interior wipe-down, and streak-free glass cleaning for a clean, refreshed presentation.",
    },
  ),

  v(
    "chevelle-ss-paint-correction",
    "Chevrolet Chevelle SS — Paint Correction",
    570,
    1966,
    "Correction",
    "Exterior",
    "Coupe/Sedan",
    "Chevrolet",
    "Completed",
    chevelleSS,
    {
      featured: true,
      gallery: [
        chevelleSS1,
        chevelleSS2,
        chevelleSS3,
        chevelleSS4,
        chevelleSS5,
      ],
      summary:
        "Multi-stage paint correction on a black '66 Chevelle SS. Paint depth was mapped before compounding, then progressively refined with finishing polishes to level swirls and holograms on the delicate older finish, sealed to protect the mirror-flat gloss and polished chrome trim.",
    },
  ),

  v(
    "honda-odyssey-interior-restoration",
    "Honda Odyssey — Interior Restoration",
    330,
    2022,
    "Interior",
    "Interior",
    "Van/3-Row SUV",
    "Honda",
    "Completed",
    hondaOdyssey,
    {
      gallery: [
        honda1,
        honda2,
        honda3,
        honda4,
        honda5,
      ],
      summary:
        "Interior restoration on a family Odyssey. Full three-row vacuum and pet-hair removal, hot-water extraction of carpets and seats, enzymatic stain treatment, door jamb and console detailing, and a fabric protection top coat to keep the cabin clean between visits.",
    },
  ),

  v(
    "chevrolet-bel-air-paint-correction",
    "Chevrolet Bel Air — Paint Correction",
    600,
    1957,
    "Correction",
    "Exterior",
    "Coupe/Sedan",
    "Chevrolet",
    "Completed",
    chevyBelAir,
    {
      featured: true,
      gallery: [
        chevyBelAir1,
        chevyBelAir2,
        chevyBelAir3,
        chevyBelAir4,
        chevyBelAir5,
      ],
      summary:
        "Show-level paint correction on a custom blue '57 Bel Air. Careful hand decontamination and controlled machine polishing brought the deep metallic blue back to a flawless reflection, with hand-polished chrome brightwork and a protective sealant suited to a garage-kept classic.",
    },
  ),

  v(
    "honda-hrv-ceramic-coating",
    "Honda HR-V — Ceramic Coating",
    420,
    2024,
    "Ceramic",
    "Exterior",
    "SUV/Crossover",
    "Honda",
    "Completed",
    hondaHrv,
    {
      gallery: [
    hondaHrv1,
    hondaHrv2,
    hondaHrv3,
    hondaHrv4,
    hondaHrv5,
      ],
      summary:
        "Ceramic coating applied to an Urban Grey HR-V. A light single-stage polish removed dealer-installed marring before the selected System X coating was applied, giving the flat grey paint noticeably more depth while adding protection against UV exposure, chemical contaminants, and everyday environmental elements.",
    },
  ),

  v(
    "ford-f150-platinum-full-detail",
    "Ford F-150 — Full Detail",
    390,
    2019,
    "Express",
    "Exterior",
    "Truck",
    "Ford",
    "Completed",
    fordF150,
    {
      gallery: [
        fordF1501,
        fordF1502,
        fordF1503,
        fordF1504,
        fordF1505,
      ],
      summary:
        "Complete full detail on a black F-150. Foam pre-wash, iron decontamination, clay treatment, and a gloss-enhancing polish removed wash marring across the large panels, finished with a durable sealant, dressed trim and running boards, and a full interior clean.",
    },
  ),
];

// Vehicle makes featured in our project work
export const brands = [
  "Pontiac",
  "Audi",
  "Toyota",
  "Chevrolet",
  "BMW",
  "Honda",
  "Ford",
];

// Vehicle class filters (was: body types)
export const bodyTypes = [
  {
    label: "Coupe/Sedan",
    count: vehicles.filter((x) => x.body === "Coupe/Sedan").length,
  },
  {
    label: "SUV/Crossover",
    count: vehicles.filter((x) => x.body === "SUV/Crossover").length,
  },
  {
    label: "Truck",
    count: vehicles.filter((x) => x.body === "Truck").length,
  },
  {
    label: "Van/3-Row SUV",
    count: vehicles.filter((x) => x.body === "Van/3-Row SUV").length,
  },
];

// Service tiers (was: fuel types)
export const fuelTypes: Vehicle["fuel"][] = [
  "Express",
  "Interior",
  "Ceramic",
  "Correction",
];

// Finish focus (was: transmissions)
export const transmissions: Vehicle["transmission"][] = [
  "Interior",
  "Exterior",
];

// Booking status (was: conditions)
export const conditions: Condition[] = [
  "Booked",
  "In Progress",
  "Completed",
];

export const SERVICE_LABELS: Record<Vehicle["fuel"], string> = {
  Express: "Full Detail",
  Interior: "Interior Restoration",
  Ceramic: "Ceramic Coating",
  Correction: "Paint Correction",
};

export const serviceLabel = (v: Vehicle) => SERVICE_LABELS[v.fuel];