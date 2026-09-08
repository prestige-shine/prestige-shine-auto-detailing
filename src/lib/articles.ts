import kevinWorking from "@/assets/kevin-working.jpg";
import hondaHrv from "@/assets/honda_hrv.jpg";
import toyotaRav4 from "@/assets/toyota_rav4.jpg";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  cover: string;
  body: string[];
  readMinutes?: number;
  publishedAt?: string;
};

export const articles: Article[] = [
  {
    slug: "ceramic-coating-vs-wax-miramichi-2026",
    title: "Ceramic Coating vs Wax: A 2026 Miramichi Owner's Cost Guide",
    excerpt: "From a $25 spray wax to a professional ceramic coating — what Miramichi drivers actually get for their money and which protection makes sense for your vehicle and budget.",
    date: "Jun 18, 2026",
    publishedAt: "2026-06-18",
    author: "Kevin Hines",
    category: "Paint Protection",
    readMinutes: 7,
    cover: kevinWorking,
    body: [
      "Miramichi weather is unforgiving on paint. Between coastal salt air off the Miramichi River, heavy road salt and brine through an Atlantic Canadian winter, and strong summer UV, your car's clearcoat takes more abuse per year than vehicles in milder climates. The question isn't whether to protect it — it's how much protection to pay for.",
      "## What wax actually does (and doesn't do)",
      "Traditional carnauba wax lays a soft sacrificial layer on top of your clearcoat. It gives a warm, glossy look that Miramichi car owners love, but it typically lasts 4–8 weeks before road film, rain, and UV degrade it. High-quality paste waxes run $25–$80 per application at home, or more professionally buffed in. Over a year of quarterly applications you're spending real money for protection that is chemically incapable of resisting road salt, bird etch, or hard water spots.",
      "## Paint sealants: the mid-tier option",
      "Synthetic polymer sealants bond slightly better to clearcoat than wax and last 3–6 months. For a daily-driven vehicle in Miramichi, a twice-yearly sealant service is a reasonable cost-effective baseline for owners not ready to commit to ceramic.",
      "## Ceramic coating: what it actually does",
      "A genuine ceramic coating chemically bonds to the clearcoat and cures to a hard, durable finish — far harder than any wax or sealant. It doesn't sit on top; it becomes part of the paint system. The result: hydrophobic behavior (water beads and rolls off) and resistance to road salt, bird acid, UV oxidation, and light swirl marks for the length of the package installed.",
      "- **3-Year Ceramic Protection** — from $800\n- **System X 6-Year Ceramic Coating** — from $1,200\n- **Correction + 6-Year Ceramic** (paint correction performed first, then coated) — from $1,500",
      "## The Miramichi-specific math",
      "Road crews apply salt across Miramichi and the surrounding region every winter to keep roads safe, which means months of chloride exposure on unprotected paint every year. A properly installed ceramic coating slows the oxidation cycle that salt and brine accelerate, meaning your paint — and your resale value — hold up materially better over a multi-year ownership window.",
      "## When wax still makes sense",
      "If you drive a beater daily driver, lease a vehicle short-term, or detail your own car as a hobby, wax and sealants are perfectly reasonable. They also top off a cured ceramic coating beautifully — Prestige Shine recommends a light spray wax between washes to maximize your ceramic's longevity.",
      "## What to ask any detailing shop",
      "- What is included in paint decontamination before the coating is applied? | Is at least a light polishing pass performed before application? | Is cure time respected and the vehicle kept out of rain afterward? | Does the warranty match the specific package installed?",
      "Bottom line: for Miramichi drivers planning to keep their vehicle several years, a professional ceramic coating package is the most cost-effective long-term paint protection you can buy. For everything else, a professional-grade sealant applied twice yearly is your best value.",
    ],
  },
  {
    slug: "atlantic-canada-salt-winter-paint-damage",
    title: "How Miramichi Salt & Winter Kill Your Paint (And How to Stop It)",
    excerpt: "Road salt, brine, and freeze-thaw cycling combine to eat away at Miramichi clearcoats every winter — here's the science and the fix.",
    date: "Jun 10, 2026",
    publishedAt: "2026-06-10",
    author: "Kevin Hines",
    category: "Seasonal Care",
    readMinutes: 6,
    cover: hondaHrv,
    body: [
      "Miramichi roads see heavy sodium chloride application every winter to keep drivers safe through snow and ice. If you live in Miramichi or the surrounding region, your vehicle's paint, wheels, and undercarriage are under sustained chemical attack for several months of the year.",
      "## The three-phase damage cycle",
      "Road salt damage isn't immediate — it works in three phases that most owners don't notice until it's expensive to fix:\n\n**Phase 1 — Contamination:** Salt brine embeds in micro-pores in your clearcoat within days of first contact. You can't see it, but a clay bar will pull it off in weeks-old deposits.\n\n**Phase 2 — Oxidation acceleration:** Sodium chloride is hygroscopic — it holds moisture against your clearcoat. Combined with Miramichi's freeze-thaw cycling through the winter, it expands and contracts micro-cracks in unprotected paint at a cellular level.\n\n**Phase 3 — Clearcoat failure:** Once the clearcoat is compromised, UV hits the base coat directly. Oxidation whitens and dulls the finish, usually first visible on horizontal panels (hood, roof) facing south.",
      "## What a winter does to unprotected paint",
      "Unprotected clearcoats lose measurable material over a Miramichi winter from chemical erosion alone — before any physical swirl or scratch damage. Over several winters, that adds up to meaningful clearcoat loss. A professional ceramic coating meaningfully reduces that erosion, because the ceramic layer takes the chemical hit instead of your paint.",
      "## The maintenance calendar that protects Miramichi paint",
      "- **Late fall (pre-salt):** Full decontamination wash + iron fallout removal + ceramic or sealant top-up. This is the single highest-leverage detailing appointment of the year.\n- **Mid-winter:** Wash after every few salt exposures. Never let brine sit on paint for weeks.\n- **Spring thaw (post-salt):** Full clay-bar decontamination + paint inspection. This is when oxidation and etching from the season become visible, along with gravel-road chips from spring road conditions.\n- **Spring (paint correction window):** If the winter caused swirls, hazing, or light etch, a paint enhancement or correction before summer UV sets in limits the damage.\n- **Summer–fall:** Regular maintenance washes + spray wax between visits if you have a ceramic base coat.",
      "## Wheel and undercarriage — the forgotten panels",
      "Salt damage to wheels costs Miramichi drivers real money in premature replacement. Brake dust mixed with road salt is particularly corrosive to alloy wheel finishes. A ceramic coating on wheels creates a sacrificial layer that makes weekly cleaning faster and prevents pitting in the alloy finish. Undercarriage rinses — often skipped — are equally critical: salt packs into frame rails and rocker seams and quietly causes structural rust over time.",
      "## The Prestige Shine winter protocol",
      "Every Prestige Shine appointment booked in the heart of winter includes a pH-neutral pre-wash to neutralize salt chemistry before any contact with the paint surface, and an iron fallout treatment to dissolve embedded metallic contamination from road brine.",
      "Book before the first salt truck of the season — it's the most cost-effective detailing decision a Miramichi owner can make.",
    ],
  },
  {
    slug: "interior-deep-clean-vs-full-detail-pet-hair-odor",
    title: "Interior Deep Clean vs Full Detail: What Actually Removes Pet Hair, Odor & Stains",
    excerpt: "The honest breakdown of what an interior clean includes, what equipment removes pet hair and odor permanently, and why 'full detail' means different things at different shops.",
    date: "Jun 02, 2026",
    publishedAt: "2026-06-02",
    author: "Kevin Hines",
    category: "Interior Care",
    readMinutes: 8,
    cover: toyotaRav4,
    body: [
      "If you own a dog, a toddler, or both — and a Miramichi winter means they've been in your car for months — the interior of your vehicle is a science experiment. Pet hair embeds in seat fabric at an angle that household vacuums can't extract. Pet dander bonds to carpet fibers. Odors penetrate the HVAC system and headliner foam. Here's what actually fixes each problem.",
      "## What a basic 'interior clean' typically includes (and what it misses)",
      "Most budget interior cleans involve a vacuum pass, a wipe-down of hard surfaces, and a window clean. That's maintenance, not restoration. It will not remove embedded pet hair, deep stain set into carpet fibers, or organic odor from urine, vomit, or mildew. If your shop doesn't mention a specific tool for pet hair and a specific treatment for odor, it's not removing those problems — it's masking them with fragrance.",
      "## The pet hair problem: what actually works",
      "Pet hair — especially double-coat breeds like Labs, Huskies, and Golden Retrievers common in Miramichi families — weaves into fabric loops and resists normal vacuuming. The tools that genuinely work:\n\n- **Rubber bristle brushes:** agitate fabric in a circular motion, breaking the static bond and lifting hair into loose piles for vacuum extraction\n- **Compressed air pre-treatment:** blows hair out of seat seams and carpet edges before vacuuming\n- **Tornado/cyclone nozzle vacuums:** high-CFM extraction with centrifugal airflow removes loosened hair without embedding it further\n\nAt Prestige Shine, our interior work uses all three in sequence. Expect a few hours for a heavily pet-affected SUV.",
      "## Stain removal: the chemistry breakdown",
      "Stains are either protein-based (blood, pet urine, food) or tannin-based (coffee, tea, juice). The treatment is different:\n\n**Protein stains:** enzyme-based cleaners break the molecular chain of organic matter. Never use hot water first — heat sets protein stains permanently. Cold enzyme solution, agitation, extraction.\n\n**Tannin stains:** oxidizing agents or alkaline all-purpose cleaners work best. Apply, dwell, agitate with a drill brush, hot-water extract.\n\nFor set-in stains older than a few weeks, realistic expectations: strong removal on fabric, even better results on leather with the right conditioner afterward. Some stains that have been heat-set over a hot car summer are permanent — a good shop tells you upfront.",
      "## Odor: the difference between masking and eliminating",
      "Odor from pets, smoke, or mildew lives in three places your eye can't see: the HVAC evaporator coil, the headliner foam, and the carpet backing beneath the padding. Fragrance sprays and timer-based ozone machines don't fix any of those sources permanently.",
      "What does work:\n- **Enzyme fogger:** atomized enzyme solution reaches the headliner, HVAC, and under-seat areas physically\n- **HVAC treatment:** disinfectant fog pumped through the cabin air intake targets mold and bacteria on the evaporator\n- **Carpet pad extraction:** hot-water extraction at high temperature draws organic material from the pad backing, not just the carpet face\n\nFor severe cases — pet accidents in carpet — the seat may need to come out to treat the bare floor pan directly.",
      "## Interior clean vs. Full Detail: what Prestige Shine offers",
      "**Interior-focused service:** Full pet hair removal, enzyme odor treatment, stain treatment on all fabric and leather, HVAC deodorize, hot-water extraction on all carpet and fabric seats, leather clean and condition, headliner spot clean, all glass inside.\n\n**Full Detail (from $200 for cars, scaling by vehicle size):** Everything above plus exterior hand wash, clay bar decontamination, wheel clean and dress, tire shine, and a protective finishing product.\n\nIf the pet hair and odor are your only concern, an interior-focused appointment makes sense. If the car hasn't been properly detailed in 12+ months, a Full Detail is where the entire vehicle gets reset.",
      "## The realistic timeline and what to bring",
      "A thorough interior deep clean on a pet-affected SUV at our Miramichi shop takes several hours. We are appointment-only and drop-off — bring your vehicle at your scheduled time as empty as possible; we work around child seats but it limits access. Remove valuables; we document the vehicle before and after photographically.",
      "The honest answer to 'will it come out?' is: almost always yes, with the right chemistry and equipment. Book an appointment and we'll tell you exactly what to expect before we start.",
    ],
  },
];

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);

