export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  cover: string;
  body: string[];
};

// Distinct editorial imagery — deliberately NOT shared with the /projects gallery.
// Each cover maps to the article theme (materials close-up, budgeting/blueprints, inspection).
const stockCovers = [
  // Premium roofing material close-up (shingles/tile texture)
  "https://images.unsplash.com/photo-1632759145355-8b8f3ab5d6c3?auto=format&fit=crop&w=1200&q=70",
  // Architect / budgeting blueprints and drawings
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70",
  // Roofer inspecting / working with instruments
  "https://images.unsplash.com/photo-1621886292650-52c6e73aaa15?auto=format&fit=crop&w=1200&q=70",
];

export const articles: Article[] = [
  {
    slug: "luxury-roofing-systems-guide-2026",
    title: "The 2026 Luxury Roofing Systems Buyer's Guide",
    excerpt: "From synthetic slate to standing-seam copper — how Ohio homeowners are specifying premium roofs that last fifty years and beyond.",
    date: "Jun 12, 2026",
    author: "Marcus Tate",
    category: "Premium Materials",
    cover: stockCovers[0],
    body: [
      "Luxury roofing has crossed a meaningful threshold in 2026. Synthetic composites have matured to where they are visually indistinguishable from quarried slate at half the structural load, and architectural metal systems now ship with weathertight warranties that outlast the average mortgage.",
      "## What 'luxury roofing' actually means in 2026",
      "A premium roof is not defined by a single line item. It is the integrated performance of the deck, underlayment, ice-and-water shield, ventilation pathway, fastener pattern, ridge venting, and finish material — engineered as a single assembly for a specific climate zone.",
      "- Synthetic slate composites: 50-year aesthetic without the 800 lb/sq structural penalty | Standing-seam steel and aluminium: clean architectural lines with 40+ year coatings | Stone-coated steel: shingle silhouette with metal resilience | Natural slate and copper: heritage estates and registered historic homes",
      "## How premium systems perform in Ohio's climate",
      "Ohio sits at the intersection of Great Lakes humidity, freeze-thaw cycling, and Midwest convective storms. The right premium system handles all three: a self-adhered underlayment seals the deck during ice-dam events, a properly engineered ventilation channel removes attic moisture year-round, and the finish material absorbs hail, UV, and wind without telegraphing damage to the substructure.",
      "## What to ask any premium roofing studio",
      "- Request the manufacturer's installation manual page-by-page, not just a brand name | Confirm written manufacturer certification for the crew, not the company | Ask for the underlayment, ice shield, drip edge, ventilation, and flashing spec individually | Verify wind, hail, and fire ratings on the actual SKU being installed | Demand a transferable workmanship warranty separate from the material warranty",
      "## A premium roof is a capital improvement",
      "Specified well, a luxury roof recovers most of its cost at resale, eliminates a generation of repair calls, and removes the largest single insurance-claim category from your household ledger. Treat it as infrastructure, not cosmetics, and the math always works.",
    ],
  },
  {
    slug: "ohio-roof-budgeting-benchmarks",
    title: "Ohio Roof Budgeting Benchmarks: What Premium Costs in 2026",
    excerpt: "Real cost ranges per square foot for architectural shingles, stone-coated steel, premium aluminium, and luxury slate across Northeast Ohio.",
    date: "Jun 06, 2026",
    author: "Priya Kapoor",
    category: "Budgeting",
    cover: stockCovers[1],
    body: [
      "Premium roofing in Ohio has settled into predictable per-square-foot ranges. The variance is no longer driven by material scarcity — it is driven by site complexity, tear-off depth, and the level of finish carpentry around penetrations, valleys, and chimneys.",
      "## Benchmark ranges, installed, Northeast Ohio",
      "- Architectural asphalt shingles: $4.50 – $7.50 per sqft | Stone-coated steel: $9.00 – $14.00 per sqft | Premium aluminium standing-seam: $10.00 – $16.00 per sqft | Luxury slate and synthetic slate: $18.00 – $32.00 per sqft",
      "On a 3,000 sqft Cleveland-area home, that translates to roughly $14,000 for a quality architectural shingle re-roof and $54,000 to $96,000 for a luxury slate build with full tear-off, new decking where needed, and copper-flashed valleys.",
      "## What the price actually buys",
      "A defensible quote itemises the deck inspection, ice-and-water shield to code height, synthetic underlayment, starter and ridge cap, drip edge, step and counter flashing, ventilation upgrade, and a transferable workmanship warranty. If a quote is materially below benchmark, one of those line items has been removed — usually the one you cannot see from the ground.",
      "## Why Ohio premiums hold their value",
      "The Midwest insurance market has tightened sharply on roofs older than fifteen years. A documented premium install with manufacturer certification often unlocks lower premiums and full-replacement-cost coverage, which alone can offset the upgrade over a single policy cycle.",
      "## Plan the budget the way the studio plans the build",
      "Hold a 10% contingency for deck repair, plan ventilation as a line item not an afterthought, and confirm the warranty registration is filed in your name on completion day. A premium roof that is documented correctly is an asset; an undocumented one is just an expense.",
    ],
  },
  {
    slug: "midwest-weather-roof-durability",
    title: "Built for the Midwest: Roof Durability Across Ohio's Four Seasons",
    excerpt: "How premium roofing systems handle Lake Erie snow loads, summer hail, freeze-thaw cycling, and the spring storm corridor.",
    date: "May 29, 2026",
    author: "Sarah Mendez",
    category: "Durability",
    cover: stockCovers[2],
    body: [
      "Ohio roofs work harder than most. A single twelve-month cycle includes sub-zero ice loading, 90°F summer deck temperatures, hail-bearing convective storms, and the freeze-thaw band that separates surviving roofs from prematurely failing ones.",
      "## Winter: ice dams and snow load",
      "The failure mechanism is rarely the snow itself — it is melt-and-refreeze at the eaves. A premium assembly addresses this with a continuous ice-and-water membrane up the slope past the warm-wall line, balanced intake and exhaust ventilation, and properly insulated attic floors to keep the deck cold.",
      "## Spring: wind uplift and hail",
      "The spring storm corridor brings sustained wind and impact events. Architectural shingles rated for 130 mph uplift, six-nail patterns, and Class 4 impact certification dramatically reduce both visible damage and the latent micro-fractures that shorten roof life invisibly.",
      "## Summer: UV and thermal cycling",
      "South and west exposures absorb the most ultraviolet load. Premium granule blends, infrared-reflective coatings on metal panels, and proper ridge ventilation reduce attic temperatures by 20°F or more, protecting both the roof assembly and the HVAC equipment beneath it.",
      "## Autumn: the maintenance window",
      "Northeast Ohio gives a roofing studio a narrow but reliable fair-weather window between leaf drop and the first hard freeze. Use it for the annual inspection — sealant refresh at penetrations, valley clearing, gutter alignment, and photographic documentation for your insurance file.",
      "## Durability is a system, not a shingle",
      "- Underlayment continuity from eave to ridge | Sealed deck under any luxury material | Balanced ventilation as a non-negotiable | Manufacturer-certified flashing details | Annual inspection on the calendar, not on the to-do list",
      "Specified and installed correctly, a premium Ohio roof handles every season the Midwest can throw at it — and quietly outlasts everything else on the structure.",
    ],
  },
];

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);
