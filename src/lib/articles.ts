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
      "If you're shopping this year, focus on three things: real-world range at highway speeds, home charging readiness, and the resale curve of the model you're considering.",
      "Federal incentives still apply to most North American assembled vehicles, but state-level rebates vary widely. Stack them carefully — a thoughtful buyer can offset five figures off MSRP without much paperwork.",
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
      "If you trade vehicles every three years, leasing remains the cleanest path. If you keep a car past year five, financing almost always wins on total cost of ownership.",
      "Our calculator on the home page can compare both scenarios in seconds — plug in your numbers and let the math decide.",
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
      "Our top pick this year is the Hyundai Tucson Hybrid — it nails all three categories and brings a ten-year warranty most rivals can't match.",
      "Honorable mentions to the Honda CR-V EX-L and Toyota RAV4 Hybrid, both of which would be class leaders in any other year.",
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
      "Look for programs that include roadside assistance and a complimentary first service — those small extras add up fast.",
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
      "Be ready with maintenance records and a clean title. Buyers in 2026 are savvy and they will ask.",
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
      "Never finance through the dealer without comparing to your bank or credit union first. A single percentage point over five years is real money.",
    ],
  },
];

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);
