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
    excerpt: "From a $25 spray wax to a professional ceramic coating, what Miramichi drivers actually get for their money and which protection makes sense for your vehicle and budget.",
    date: "Jun 18, 2026",
    publishedAt: "2026-06-18",
    author: "Kevin Hines",
    category: "Paint Protection",
    readMinutes: 7,
    cover: kevinWorking,
    body: [
      "Miramichi weather can be tough on vehicle finishes. Between coastal salt air off the Miramichi River, road salt and brine through an Atlantic Canadian winter, and summer UV exposure, your vehicle's paint faces plenty of environmental exposure throughout the year. The question isn't whether to protect it. It is how much protection makes sense for your vehicle and budget.",
      "## What wax actually does (and doesn't do)",
      "Traditional carnauba wax lays a sacrificial layer on top of your clearcoat. It provides a warm, glossy finish that many Miramichi car owners enjoy, but its protection generally needs to be renewed more frequently than a synthetic sealant or ceramic coating. Wax can provide a simple, affordable option for owners who enjoy maintaining their vehicle regularly.",
      "## Paint sealants: the mid-tier option",
      "Synthetic paint sealants are designed to provide longer-lasting protection than traditional wax. For a daily-driven vehicle in Miramichi, a properly applied sealant can be a practical option for owners who want additional protection without moving to a ceramic coating.",
      "## Ceramic coating: what it actually does",
      "A professional ceramic coating forms a durable protective layer over the clearcoat and provides hydrophobic behavior, helping water and contaminants release more easily from the surface. It can also provide resistance to many common environmental contaminants and make routine maintenance easier.",
      "A ceramic coating is not a substitute for careful washing and maintenance, and it should not be considered scratch-proof. Its performance and longevity depend on the specific product, installation, vehicle use, and ongoing maintenance.",
      "- 3-Year Ceramic Protection",
      "- System X 6-Year Ceramic Coating",
      "- Correction + 6-Year Ceramic (paint correction performed first, then coated)",
      "Professional Ceramic Coating Packages starting at $1,000, with final pricing depending on vehicle size, paint condition, preparation required and coating package selected.",
      "## The Miramichi-specific math",
      "Winter road salt and brine are an unavoidable part of driving in Atlantic Canada. Keeping the vehicle clean and maintaining its protective layer can help reduce the amount of road film and contaminants left sitting on the paint.",
      "A ceramic coating can make regular washing and maintenance easier by providing a hydrophobic surface and an additional layer of protection against everyday environmental exposure. The coating still requires proper care, especially during the winter months.",
      "## When wax still makes sense",
      "If you drive an older daily driver, lease a vehicle short-term, or enjoy detailing your own car as a hobby, wax and sealants can still be perfectly reasonable choices. They can also be useful when you're looking for a simpler, lower-cost protection option.",
      "For an existing ceramic coating, use maintenance products that are appropriate for the coating. A ceramic-safe topper can be used when recommended for the specific coating system, rather than assuming any wax or detailing product is suitable.",
      "## What to ask any detailing shop",
      "- What is included in paint decontamination before the coating is applied?",
      "- Is paint preparation or polishing included in the selected package?",
      "- What cure and post-installation care instructions are provided?",
      "- Does the warranty information match the specific coating package installed?",
      "- What maintenance does the coating require after installation?",
      "Bottom line: for Miramichi drivers planning to keep their vehicle for several years, a professional ceramic coating can be a worthwhile long-term paint-protection option when properly installed and maintained. For owners looking for a simpler or lower-cost option, a quality sealant can provide a practical level of protection with regular maintenance.",
    ],
  },
  {
    slug: "atlantic-canada-salt-winter-paint-damage",
    title: "How Miramichi Salt & Winter Kill Your Paint (And How to Stop It)",
    excerpt: "Road salt, brine, and winter conditions can be tough on vehicles in Miramichi. Here's what happens to your vehicle during the season and how proper maintenance can help.",
    date: "Jun 10, 2026",
    publishedAt: "2026-06-10",
    author: "Kevin Hines",
    category: "Seasonal Care",
    readMinutes: 6,
    cover: hondaHrv,
    body: [
  "Miramichi roads see regular road-salt and brine application during the winter to help keep drivers safe through snow and ice. If you live in Miramichi or the surrounding region, your vehicle's paint, wheels, and undercarriage are exposed to salt, moisture, road film, and repeated temperature changes for several months of the year.",
  "## The three-phase winter exposure cycle",
  "Road salt-related problems usually develop gradually rather than happening all at once. Here's what vehicle owners should understand:",
  "Phase 1: Contamination. Salt and road film can build up on exterior surfaces and remain on the vehicle if they're not regularly washed. Keeping these contaminants from sitting on the paint for extended periods makes winter maintenance easier.",
  "Phase 2: Moisture and exposure. Sodium chloride readily absorbs moisture, which means salt residue can remain damp on vehicle surfaces. Combined with repeated freeze-thaw cycles and other environmental exposure, this creates a challenging winter environment for exterior finishes and exposed metal components.",
  "Phase 3: Long-term wear. Continued exposure to road salt, moisture, UV light, and other contaminants can contribute to corrosion on susceptible metal components and deterioration of poorly maintained exterior surfaces over time. Regular washing and proper protection can help reduce this exposure.",
  "## What a winter can do to unprotected paint",
  "Winter driving exposes your vehicle's paint to road salt, brine, dirt, moisture, and other contaminants. If these materials are allowed to remain on the vehicle for extended periods, they can contribute to staining, etching, and general deterioration of the finish.",
  "A ceramic coating or quality paint sealant doesn't make paint immune to winter conditions, but it can provide an additional protective layer and make routine washing easier. The most important factor is still regular maintenance and removing winter contaminants before they have a chance to build up.",
  "## The maintenance calendar for Miramichi paint",
  "- Late fall (pre-salt): Give the vehicle a thorough wash and decontamination before winter conditions arrive. If the vehicle has a ceramic coating or sealant, make sure its condition is assessed before the season begins.",
  "- Mid-winter: Wash the vehicle regularly when conditions allow, paying particular attention to areas where salt and road film accumulate. Avoid allowing heavy contamination to remain on the vehicle for extended periods.",
  "- Spring thaw (post-salt): A thorough wash and paint decontamination can help remove the buildup accumulated throughout the winter. This is also a good time to inspect the paint for staining, etching, chips, and other damage.",
  "- Spring (paint correction window): If winter conditions have left behind swirls, haze, or light surface defects, a paint enhancement or correction service may be appropriate depending on the condition of the vehicle.",
  "- Summer–fall: Continue regular maintenance washes and use products that are compatible with your vehicle's existing protection.",
  "## Wheels and undercarriage: the areas that need attention too",
  "Road salt and brake dust can accumulate on wheel surfaces and make regular cleaning especially important during the winter. Proper maintenance helps prevent contamination from building up and makes it easier to keep wheel finishes looking their best.",
  "The undercarriage also deserves attention. Salt, moisture, and road debris can reach exposed metal components underneath the vehicle, so rinsing these areas when practical is an important part of winter vehicle care.",
  "A wheel coating can make wheels easier to maintain by providing a protective surface that helps contaminants release more easily during washing. However, no coating eliminates the need for regular cleaning or guarantees that a wheel will never corrode or develop damage.",
  "## The Prestige Shine winter approach",
  "Prestige Shine focuses on safely removing winter contamination while minimizing unnecessary contact with the vehicle's paint. Depending on the service selected, this can include a thorough pre-wash, safe exterior washing, wheel cleaning, and paint decontamination where appropriate.",
  "The goal isn't to make unrealistic promises about stopping winter damage completely. It's to keep your vehicle properly maintained throughout the season and help protect its finish from the buildup that comes with winter driving.",
  "Book your winter maintenance appointment before the season gets into full swing. Keeping up with contamination is much easier than trying to correct months of buildup later.",
    ],
  },
  {
    slug: "interior-deep-clean-vs-full-detail-pet-hair-odor",
    title: "Interior Deep Clean vs Full Detail: What Actually Removes Pet Hair, Odor & Stains",
    excerpt: "The honest breakdown of what an interior clean includes, what actually helps with pet hair and odors, and why 'full detail' can mean different things at different shops.",
    date: "Jun 02, 2026",
    publishedAt: "2026-06-02",
    author: "Kevin Hines",
    category: "Interior Care",
    readMinutes: 8,
    cover: toyotaRav4,
    body: [
  "If you own a dog, a toddler, or both, and a Miramichi winter means they've been in your vehicle for months — the interior can quickly build up pet hair, dirt, stains, and odors. Some contamination is easy to remove, while other issues require more time and specialized cleaning methods. Here's what to expect from a thorough interior service.",
  "## What a basic 'interior clean' typically includes (and what it misses)",
  "A basic interior clean typically focuses on vacuuming, wiping down hard surfaces, cleaning the glass, and addressing everyday dirt. That's useful for routine maintenance, but heavier contamination may require additional cleaning and extraction.",
  "Embedded pet hair, set-in stains, and persistent odors can require more targeted treatment. The right approach depends on the material, the type of contamination, and how long it has been present.",
  "## The pet hair problem: what actually works",
  "Pet hair can become tightly caught in carpet and upholstery fibers, making it difficult to remove with normal vacuuming alone. A thorough pet-hair cleanup may involve agitation, brushing, compressed air, or other appropriate methods before the loosened hair is vacuumed away.",
  "The exact approach depends on the vehicle's interior materials and the amount of hair present. Heavily pet-affected vehicles can take considerably longer to clean than a vehicle receiving routine interior maintenance.",
  "## Stain removal: what to expect",
  "Different stains respond differently to cleaning products and techniques. Food, beverages, biological contamination, and other substances can require different approaches depending on the material and how long the stain has been present.",
  "Some stains can be significantly reduced or removed with the appropriate cleaning process, while others may remain partially visible because the material has been permanently affected. A professional detailer should assess the stain and set realistic expectations before treatment.",
  "Leather and other sensitive interior materials also require products and techniques appropriate for the specific surface. Aggressive cleaning is not always the best solution and can potentially cause additional damage.",
  "## Odor: the difference between masking and treating the source",
  "Interior odors can come from a variety of sources, including spills, pet contamination, smoke, food, moisture, and areas beneath carpets or seats. Spraying fragrance over the problem may temporarily change how the interior smells without addressing the source.",
  "Effective odor treatment starts with identifying and cleaning the source wherever it can be safely accessed. Depending on the situation, this may involve deep cleaning, extraction, appropriate odor-treatment products, or additional attention to affected areas.",
  "Severe contamination may require more extensive cleaning than a standard interior detail. In some cases, complete odor removal may not be possible, particularly when the source has deeply affected materials or areas that cannot be safely accessed.",
  "## Interior clean vs. Full Detail: what Prestige Shine offers",
  "Interior-focused services are designed for customers whose main priority is getting the cabin cleaned and refreshed. The exact work performed depends on the vehicle's condition and the service selected.",
  "A Full Detail combines interior and exterior care, giving the entire vehicle a more comprehensive reset. Exterior work can include hand washing, paint decontamination, wheel cleaning, tire dressing, and an appropriate protective finishing product depending on the selected package.",
  "If pet hair, stains, or interior contamination are your main concern, an interior-focused service may be the better fit. If the vehicle needs attention inside and out, a Full Detail provides a more comprehensive approach.",
  "## The realistic timeline and what to bring",
  "A thorough interior cleaning on a heavily pet-affected SUV can take several hours depending on the vehicle's size, condition, and level of contamination. Prestige Shine is appointment-only, so bring your vehicle at the scheduled time and remove personal belongings where possible to give Kevin better access to the interior.",
  "Child seats and other items can limit access to certain areas, so removing anything that does not need to remain in the vehicle can help the cleaning process.",
  "The honest answer to 'will it come out?' is that results depend on the type of contamination, the material involved, and how long the issue has been present. Kevin can assess the vehicle and explain what can realistically be achieved before the work begins.",
    ],
  },
];

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);
