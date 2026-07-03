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

const stockCovers = [
  "https://images.unsplash.com/photo-1605618313023-d3f1caeeed8b?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ea?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=70",
];

export const articles: Article[] = [
  {
    slug: "ceramic-coating-vs-wax-ohio-2026",
    title: "Ceramic Coating vs Wax: A 2026 Ohio Owner's Cost Guide",
    excerpt: "From $25 spray wax to $3,000 ceramic 9H — what Ohio drivers actually get for their money and which protection makes sense for your vehicle and budget.",
    date: "Jun 18, 2026",
    publishedAt: "2026-06-18",
    author: "Marcus Tate",
    category: "Paint Protection",
    readMinutes: 7,
    cover: stockCovers[0],
    body: [
      "Ohio weather is unforgiving. Between Lake Erie salt spray, freeze-thaw road brine in Cleveland, and summer UV baking paint on Columbus highways, your car's clearcoat takes more abuse per year than vehicles in most other states. The question isn't whether to protect it — it's how much protection to pay for.",
      "## What wax actually does (and doesn't do)",
      "Traditional carnauba wax lays a soft sacrificial layer on top of your clearcoat. It gives a warm, glossy look that Ohio show-car enthusiasts love, but it typically lasts 4–8 weeks before road film, rain, and UV degrade it. High-quality paste waxes run $25–$80 per application at home, or $80–$150 professionally buffed in. Over a year of quarterly applications you're spending $120–$600 for protection that is chemically incapable of resisting road salt, bird etch, or hard water spots.",
      "## Paint sealants: the mid-tier option",
      "Synthetic polymer sealants bond slightly better to clearcoat than wax and last 3–6 months. Professionally applied, expect $150–$350 depending on vehicle size. For a daily-driven SUV in Akron or Dayton, a twice-yearly sealant service is a reasonable cost-effective baseline — it's what Aurexo includes in every Express and Interior package as standard.",
      "## Ceramic coating: what '9H' actually means",
      "A genuine SiO₂ ceramic coating chemically bonds to the clearcoat and cures to a hardness rating of 9H on the pencil scale — harder than any wax or sealant. It doesn't sit on top; it becomes part of the paint system. The result: hydrophobic behavior (water beads and rolls off), resistance to road salt, bird acid, UV oxidation, and light swirl marks for 3–5 years minimum with proper maintenance.",
      "- **Entry ceramic (1–2 year protection):** $600–$1,100 for a Coupe/Sedan | $900–$1,400 for an SUV or Truck\n- **Professional 9H (3–5 year protection):** $1,400–$2,200 for a Coupe/Sedan | $1,800–$3,000+ for a large SUV, Truck, or 3-Row SUV\n- **Graphene-enhanced ceramic:** adds 10–15% to 9H pricing; better heat resistance, fewer water spots",
      "## The Ohio-specific math",
      "In Cleveland and Toledo, ODOT applies road salt from November through March. That's five months of chloride attack on unprotected paint per year. A proper 9H ceramic significantly slows the oxidation cycle, meaning your paint — and your resale value — hold up materially better over a 5-year ownership window. When you amortize a $2,000 ceramic job over five years, it costs $400/year, roughly the same as two professional wax details plus a sealant annually.",
      "## When wax still makes sense",
      "If you drive a beater daily driver, lease a vehicle under 24 months, or detail your own car as a hobby, wax and sealants are perfectly reasonable. They also top off a cured ceramic coating beautifully — Aurexo recommends a light SiO₂-infused spray wax at every wash cycle to maximize your ceramic's longevity.",
      "## What to ask any detailing studio",
      "- What ceramic brand are you installing — and is it distributed to certified studios only? | Does the quote include paint decontamination and at least a light polishing pass before application? | Is the cure time measured and the vehicle kept out of rain for 24–48 hours post-application? | Does the warranty transfer if I sell the vehicle?",
      "Bottom line: for Ohio drivers planning to keep their vehicle 3+ years, a professional ceramic 9H package is the most cost-effective long-term paint protection you can buy. For everything else, a professional-grade sealant applied twice yearly is your best value.",
    ],
  },
  {
    slug: "ohio-salt-winter-paint-damage",
    title: "How Ohio Salt & Winter Kill Your Paint (And How to Stop It)",
    excerpt: "Road brine, freeze-thaw cycling, and Lake Erie humidity combine to eat Ohio clearcoats faster than anywhere else in the Midwest — here's the science and the fix.",
    date: "Jun 10, 2026",
    publishedAt: "2026-06-10",
    author: "Priya Kapoor",
    category: "Seasonal Care",
    readMinutes: 6,
    cover: stockCovers[1],
    body: [
      "Ohio roads see more sodium chloride per lane-mile than almost any state in the continental US. ODOT applied over 700,000 tons of road salt in a recent winter season. If you live in Cleveland, Columbus, Cincinnati, Akron, Toledo, or Dayton, your vehicle's paint, wheels, and undercarriage are under sustained chemical attack for five months of the year.",
      "## The three-phase damage cycle",
      "Road salt damage isn't immediate — it works in three phases that most owners don't notice until it's expensive to fix:\n\n**Phase 1 — Contamination:** Salt brine embeds in micro-pores in your clearcoat within days of first contact. You can't see it, but a clay bar will pull it off in weeks-old deposits.\n\n**Phase 2 — Oxidation acceleration:** Sodium chloride is hygroscopic — it holds moisture against your clearcoat. Combined with Ohio's freeze-thaw cycling (20+ freeze cycles in a typical Cleveland winter), it expands and contracts micro-cracks in unprotected paint at a cellular level.\n\n**Phase 3 — Clearcoat failure:** Once the clearcoat is compromised, UV hits the base coat directly. Oxidation whitens and dulls the finish, usually first visible on horizontal panels (hood, roof) facing south.",
      "## What a winter does to unprotected paint in numbers",
      "Independent paint-thickness studies on Midwest vehicles show unprotected clearcoats lose an average of 0.3–0.5 microns per Ohio winter season from chemical erosion alone — before any physical swirl or scratch damage. Over five winters, that's meaningful clearcoat loss. A 9H ceramic coating reduces that erosion by an estimated 70–80%, because the ceramic layer takes the chemical hit instead of your paint.",
      "## The maintenance calendar that protects Ohio paint",
      "- **November (pre-salt):** Full decontamination wash + iron fallout removal + ceramic or sealant top-up. This is the single highest-leverage detailing appointment of the year.\n- **January/February (mid-winter):** Contactless or touchless wash after every 3–4 salt exposures. Never let brine sit on paint for weeks.\n- **March (post-salt):** Full clay-bar decontamination + paint inspection. This is when oxidation and etching from the season become visible.\n- **April (paint correction window):** If the winter caused swirls, hazing, or light etch, a single-stage polish before spring UV sets in limits the damage.\n- **May–October:** Regular maintenance washes + SiO₂ spray wax at each wash if you have a ceramic base coat.",
      "## Wheel and undercarriage — the forgotten panels",
      "Salt damage to wheels costs Ohio drivers thousands in premature replacement. Brake dust mixed with road salt is particularly corrosive to alloy wheel finishes. A ceramic coating on wheels ($150–$300 per set as an add-on) creates a sacrificial layer that makes weekly cleaning faster and prevents pitting in the alloy finish. Undercarriage rinses — often skipped — are equally critical: salt packs into frame rails and rocker seams and quietly causes structural rust over a 5–7 year window.",
      "## The Aurexo Ohio winter protocol",
      "Every Aurexo service in the November–March window includes a free pH-neutral alkaline pre-wash to neutralize salt chemistry before any contact with the paint surface, iron fallout spray to dissolve embedded metallic contamination, and a documented paint-thickness reading so you know exactly where your clearcoat stands going into and out of winter.",
      "Act before the first salt truck of the season — it's the most cost-effective detailing decision an Ohio owner can make.",
    ],
  },
  {
    slug: "interior-deep-clean-vs-full-detail-pet-hair-odor",
    title: "Interior Deep Clean vs Full Detail: What Actually Removes Pet Hair, Odor & Stains",
    excerpt: "The honest breakdown of what an interior package includes, what equipment removes pet hair and odor permanently, and why 'full detail' means different things at different studios.",
    date: "Jun 02, 2026",
    publishedAt: "2026-06-02",
    author: "Sarah Mendez",
    category: "Interior Care",
    readMinutes: 8,
    cover: stockCovers[2],
    body: [
      "If you own a dog, a toddler, or both — and an Ohio winter means they've been in your car for months — the interior of your vehicle is a science experiment. Pet hair embeds in seat fabric at an angle that household vacuums can't extract. Pet dander bonds to carpet fibers. Odors penetrate the HVAC system and headliner foam. Here's what actually fixes each problem.",
      "## What a basic 'interior detail' typically includes (and what it misses)",
      "Most budget interior details ($80–$150) involve a vacuum pass, a wipe-down of hard surfaces, and a window clean. That's maintenance, not restoration. It will not remove embedded pet hair, deep stain set into carpet fibers, or organic odor from urine, vomit, or mildew. If your studio doesn't mention a specific tool for pet hair and a specific treatment for odor, it's not removing those problems — it's masking them with fragrance.",
      "## The pet hair problem: what actually works",
      "Pet hair — especially double-coat breeds like Labs, Huskies, and Golden Retrievers common in Ohio families — weaves into fabric loops and resists normal vacuuming. The tools that genuinely work:\n\n- **Rubber bristle brushes:** agitate fabric in a circular motion, breaking the static bond and lifting hair into loose piles for vacuum extraction\n- **Compressed air pre-treatment:** blows hair out of seat seams and carpet edges before vacuuming\n- **Tornado/cyclone nozzle vacuums:** high-CFM extraction with centrifugal airflow removes loosened hair without embedding it further\n\nAt Aurexo, our Interior package uses all three in sequence. Expect 2–4 hours for a heavily pet-affected SUV or Van/3-Row SUV.",
      "## Stain removal: the chemistry breakdown",
      "Stains are either protein-based (blood, pet urine, food) or tannin-based (coffee, tea, juice). The treatment is different:\n\n**Protein stains:** enzyme-based cleaners break the molecular chain of organic matter. Never use hot water first — heat sets protein stains permanently. Cold enzyme solution, agitation, extraction.\n\n**Tannin stains:** oxidizing agents (OxiClean-type chemistry) or alkaline all-purpose cleaners work best. Apply, dwell, agitate with a drill brush, hot-water extract.\n\nFor set-in stains older than a few weeks, realistic expectations: 80–95% removal on fabric, near-100% on leather with the right conditioner afterward. Some stains that have been heat-set by a hot car summer are permanent — a good studio tells you upfront.",
      "## Odor: the difference between masking and eliminating",
      "Odor from pets, smoke, or mildew lives in three places your eye can't see: the HVAC evaporator coil, the headliner foam, and the carpet backing beneath the padding. Fragrance bombs and ozempic — sorry, ozone — machines run on a timer don't fix any of those sources permanently.\n\nWhat does work:\n- **Enzyme fogger:** atomized enzyme solution reaches the headliner, HVAC, and under-seat areas physically\n- **HVAC treatment:** disinfectant fog pumped through the cabin air intake kills mold and bacteria on the evaporator\n- **Carpet pad extraction:** hot-water extraction at high temperature (180°F+) draws organic material from the pad backing, not just the carpet face\n\nAurexo's Interior Deep Clean includes all three. For severe cases — dog urine in carpet — we pull the seat and treat the bare floor pan directly.",
      "## Interior vs. Full Detail: what Aurexo defines",
      "**Interior Package ($550–$950 depending on vehicle class):** Full pet hair removal, enzyme odor treatment, stain treatment on all fabric and leather, HVAC deodorize, hot-water extraction on all carpet and fabric seats, leather clean and condition, headliner spot clean, all glass inside.\n\n**Full Detail ($900–$1,600):** Everything in the Interior package plus exterior hand wash, clay bar decontamination, one-stage machine polish on all exterior panels, wheel clean and dress, tire shine, and a paint sealant or ceramic top-coat application.\n\nIf the pet hair and odor are your only concern, book the Interior package. If the car hasn't been properly detailed in 12+ months, the Full Detail is where you get the entire vehicle reset.",
      "## The realistic timeline and what to bring",
      "A thorough Interior Deep Clean on a pet-affected SUV or 3-Row Van in our Columbus or Cleveland studio takes 4–6 hours. Mobile appointments are available but require access to power and water. Arrive with the car as empty as possible — we work around child seats but it limits access. Remove valuables; our technicians document the vehicle before and after photographically.",
      "The honest answer to 'will it come out?' is: almost always yes, with the right chemistry and equipment. Book a free 10-minute inspection and we'll tell you exactly what to expect before we start.",
    ],
  },
];

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);
