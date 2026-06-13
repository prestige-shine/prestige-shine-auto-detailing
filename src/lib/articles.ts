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

const stockCovers = [
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=70",
];

export const articles: Article[] = [
  {
    slug: "ev-buyers-guide-2026",
    title: "The Complete 2026 EV Buyer's Guide",
    excerpt: "From range anxiety to tax credits — everything you need before going electric this year.",
    date: "Jun 10, 2026",
    author: "Marcus Tate",
    category: "Electric",
    cover: stockCovers[0],
    body: [
      "Electric vehicles have crossed a meaningful tipping point in 2026. Public charging is denser than ever, sticker prices have come down across every major segment, and battery longevity finally matches owner expectations.",
      "## How much electric range do you really need?",
      "If you're shopping this year, focus on three things: real-world range at highway speeds, home charging readiness, and the resale curve of the model you're considering.",
      "- Urban commuters: 200–250 miles is usually sufficient | Frequent road-trippers: target 300 miles or more | Cold-climate drivers: budget for a 15–30% winter range reduction | Apartment residents: confirm dependable workplace or public charging",
      "EPA range is a standardized comparison tool, not a promise. Speed, temperature, elevation, wheel size, and cabin heating all change consumption. Compare independent highway tests whenever possible and retain a 10% arrival buffer on long trips.",
      "## Charging at home and on the road",
      "A 240-volt Level 2 home charger is the simplest ownership experience. Most units add 25 to 40 miles of range per hour, allowing an overnight refill. Before purchasing, ask an electrician to review panel capacity, cable routing, permits, and utility rebates.",
      "Federal incentives still apply to most North American assembled vehicles, but state-level rebates vary widely. Stack them carefully — a thoughtful buyer can offset five figures off MSRP without much paperwork.",
      "## Battery health, warranty, and resale",
      "Most manufacturers cover the traction battery for eight years or 100,000 miles and guarantee a minimum capacity threshold. Used-EV shoppers should request a battery health report, inspect fast-charging history when available, and verify that the remaining warranty transfers.",
      "## 2026 electric car buying checklist",
      "- Compare real highway range, not only advertised range | Price home charging installation before signing | Confirm peak charging speed and charging-curve stability | Review battery and powertrain warranty terms | Obtain insurance quotes for the exact trim | Calculate incentives using current eligibility rules",
      "The best electric vehicle is not automatically the model with the largest battery. It is the vehicle whose usable range, charging access, cabin space, insurance cost, and long-term warranty fit the way you actually drive.",
    ],
  },
  {
    slug: "financing-vs-leasing",
    title: "Financing vs. Leasing: Which Wins in 2026?",
    excerpt: "Rates have stabilised. We break down the math behind today's two most common ways to drive.",
    date: "Jun 04, 2026",
    author: "Priya Kapoor",
    category: "Financing",
    cover: stockCovers[1],
    body: [
      "With APRs settling between 5.5% and 7%, the gap between financing and leasing is more nuanced than ever. The right choice depends on how long you plan to keep the car and how many miles you'll put on it.",
      "## Financing: ownership and long-term value",
      "If you trade vehicles every three years, leasing remains the cleanest path. If you keep a car past year five, financing almost always wins on total cost of ownership.",
      "A financed vehicle becomes an asset once the loan is paid. You can drive without mileage limits, modify the vehicle, and sell whenever market conditions are favorable. The trade-off is exposure to depreciation and potentially higher monthly payments.",
      "## Leasing: predictable cycles with restrictions",
      "Lease payments generally cover expected depreciation plus financing charges and taxes. This can lower the monthly bill, but acquisition fees, disposition fees, excess mileage, and wear charges must be included in the comparison.",
      "- Choose financing when you drive high annual mileage | Consider leasing when you want warranty coverage and a new car every three years | Compare total cash outlay, not only monthly payments | Negotiate the vehicle price in either transaction",
      "Our calculator on the home page can compare both scenarios in seconds — plug in your numbers and let the math decide.",
      "## Questions to ask before signing",
      "Request the APR or money factor, residual value, itemized fees, early termination rules, and out-the-door purchase price. A transparent quote makes it possible to compare offers from banks, credit unions, manufacturer finance companies, and dealers on equal terms.",
    ],
  },
  {
    slug: "best-suvs-family-2026",
    title: "Best Family SUVs Under $40k",
    excerpt: "We tested twelve mid-size SUVs back to back. These five stood out for safety, space and value.",
    date: "May 28, 2026",
    author: "Sarah Mendez",
    category: "Reviews",
    cover: stockCovers[2],
    body: [
      "A great family SUV does three things: keeps occupants safe, swallows cargo without complaint, and doesn't punish you at the pump.",
      "## What we evaluated",
      "Our comparison weighted crash-test performance, active safety systems, rear-seat access, child-seat installation, cargo usability, fuel expense, warranty coverage, and ownership value. We also tested highway noise, ride comfort, visibility, and infotainment usability.",
      "Our top pick this year is the Hyundai Tucson Hybrid — it nails all three categories and brings a ten-year warranty most rivals can't match.",
      "- Hyundai Tucson Hybrid: strongest all-around value | Honda CR-V EX-L: exceptional packaging and resale | Toyota RAV4 Hybrid: proven efficiency and reliability | Mazda CX-50: premium road manners | Subaru Forester: visibility and standard all-wheel drive",
      "Honorable mentions to the Honda CR-V EX-L and Toyota RAV4 Hybrid, both of which would be class leaders in any other year.",
      "## Buying advice for families",
      "Bring your child seats, stroller, and frequently carried gear to the test drive. Check second-row door opening, tether placement, lift-over height, spare-tire provision, and whether advanced driver-assistance features are standard on the trim you are pricing.",
    ],
  },
  {
    slug: "why-certified-pre-owned",
    title: "Why Certified Pre-Owned Is Smarter Than Ever",
    excerpt: "CPO programs are quietly the best deal on the lot in 2026. Here's what to look for.",
    date: "May 17, 2026",
    author: "Daniel Kim",
    category: "Buying",
    cover: stockCovers[3],
    body: [
      "A certified pre-owned car gives you most of the warranty coverage of new at a fraction of the depreciation hit. Every major manufacturer now backs CPO inventory with multi-point inspections and extended powertrain warranties.",
      "## What certified pre-owned really means",
      "CPO is a manufacturer-backed program, not simply a dealer description. Age and mileage limits, inspection standards, warranty duration, deductible rules, and roadside benefits differ by brand. Ask for the program booklet and inspection report.",
      "Look for programs that include roadside assistance and a complimentary first service — those small extras add up fast.",
      "- Verify warranty start and expiration dates | Review excluded components and deductibles | Confirm the title is clean | Compare the CPO premium with a similar non-certified car | Obtain an independent inspection when allowed",
      "## When CPO delivers the best value",
      "Late-model luxury cars and technology-heavy vehicles often benefit most because a manufacturer warranty reduces exposure to expensive electronics, suspension, and powertrain repairs. For simpler models, compare the certification premium against a quality third-party inspection and service contract.",
    ],
  },
  {
    slug: "selling-tips-2026",
    title: "5 Tips to Sell Your Car for More",
    excerpt: "Small details that move buyers — and the photos that close deals in under 48 hours.",
    date: "May 02, 2026",
    author: "Robert Fox",
    category: "Selling",
    cover: stockCovers[4],
    body: [
      "A clean car photographed in soft natural light sells nearly twice as fast as one shot on a phone in a dim garage. Spend the afternoon detailing and the half hour shooting — it's the highest ROI work you can do.",
      "## Prepare the vehicle and paperwork",
      "Be ready with maintenance records and a clean title. Buyers in 2026 are savvy and they will ask.",
      "- Wash, decontaminate, and vacuum every surface | Repair inexpensive warning lights and trim defects | Gather title, registration, service receipts, and both keys | Remove personal data from navigation and connected apps | Photograph exterior, cabin, cargo area, tires, odometer, and known flaws",
      "## Price from real market evidence",
      "Compare vehicles with the same model year, trim, drivetrain, mileage, condition, and region. List slightly above your acceptable price to allow reasonable negotiation, but avoid an unrealistic number that prevents calls during the crucial first week.",
      "## Screen buyers and close safely",
      "Meet in a public location or financial institution, verify cleared funds before transferring title, and use a written bill of sale. Never share verification codes or accept an overpayment arrangement.",
    ],
  },
  {
    slug: "first-time-buyer-checklist",
    title: "First-Time Buyer Checklist",
    excerpt: "Nine non-negotiables to tick off before you sign anything at the dealership.",
    date: "Apr 21, 2026",
    author: "Linda Park",
    category: "Buying",
    cover: stockCovers[5],
    body: [
      "Pre-approval, insurance quotes, and an out-the-door price in writing — these three things separate confident buyers from the rest.",
      "## Set a complete ownership budget",
      "The affordable purchase price is only one part of the calculation. Include sales tax, registration, documentation fees, insurance, fuel or charging, maintenance, tires, parking, and a repair reserve.",
      "Never finance through the dealer without comparing to your bank or credit union first. A single percentage point over five years is real money.",
      "- Check credit reports before applying | Get at least two pre-approvals | Compare insurance for exact VINs | Review vehicle history and recall status | Complete a cold-start test drive | Arrange an independent inspection | Negotiate the out-the-door price | Read every contract before signing | Keep copies of all documents",
      "## Test drive with a purpose",
      "Drive on city streets and a highway. Check braking, steering alignment, transmission behavior, climate control, cameras, driver-assistance warnings, tire noise, and seat comfort. Do not let excitement compress a careful inspection.",
      "## After purchase",
      "Confirm insurance coverage before driving away, register warranty and connected services, schedule any open recall work, and create a maintenance plan based on the owner's manual rather than generic service upsells.",
    ],
  },
];

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);
