const products = [
  {
    id: 1,
    name: "Nebula X Pro Earbuds",
    category: "Wireless Headphones & Audio",
    price: 149,
    compareAtPrice: 189,
    rating: 4.8,
    reviews: 214,
    badge: "Best Seller",
    stock: 16,
    serialNumber: "MC-AUD-2101",
    illustration: "audio",
    palette: {
      panel: "from-cyan-500/18 via-slate-950 to-slate-900",
      glow: "bg-cyan-400/20",
      accent: "text-cyan-300",
      border: "border-cyan-400/20",
    },
    variants: [
      { id: "obsidian", name: "Obsidian Black", swatch: "bg-zinc-900", accent: "bg-cyan-300" },
      { id: "frost", name: "Frost Silver", swatch: "bg-slate-300", accent: "bg-sky-200" },
      { id: "violet", name: "Pulse Violet", swatch: "bg-violet-400", accent: "bg-violet-300" },
    ],
    collections: ["featured", "best-sellers", "new-arrivals", "audio", "trending"],
    tagline: "Adaptive noise cancelling earbuds for commutes, meetings, and late-night gaming.",
    description:
      "Nebula X Pro delivers low-latency wireless audio, adaptive noise control, and a sculpted fit that stays comfortable all day. The charging case supports fast top-ups and a matte finish that feels premium in hand.",
    highlights: ["48-hour battery with case", "Dual-device Bluetooth switching", "Low-latency game mode"],
    specs: {
      Drivers: "11mm graphene dynamic drivers",
      Connectivity: "Bluetooth 5.4",
      Battery: "8 hours + 40 hours with case",
      Charging: "USB-C and wireless",
      WaterResistance: "IPX5 splash resistance",
    },
    advisory: "Enable game mode before competitive sessions for the lowest possible latency.",
    delivery: "Ships in 24 hours",
    reviewsList: [
      { name: "Tara Singh", rating: 5, date: "2 days ago", comment: "Clear calls, strong bass, and the case feels more premium than earbuds twice the price." },
      { name: "Marcus Lee", rating: 4, date: "1 week ago", comment: "Excellent for commuting and quick laptop switching." },
    ],
  },
  {
    id: 2,
    name: "VoltGrid GaN Charging Hub",
    category: "Mobile Accessories",
    price: 89,
    compareAtPrice: 109,
    rating: 4.7,
    reviews: 132,
    badge: "Flash Deal",
    stock: 11,
    serialNumber: "MC-MOB-3892",
    illustration: "charging",
    palette: {
      panel: "from-amber-400/16 via-slate-950 to-slate-900",
      glow: "bg-amber-300/20",
      accent: "text-amber-300",
      border: "border-amber-300/20",
    },
    variants: [
      { id: "sand", name: "Arctic Sand", swatch: "bg-stone-300", accent: "bg-amber-300" },
      { id: "black", name: "Stealth Black", swatch: "bg-zinc-900", accent: "bg-orange-300" },
    ],
    collections: ["featured", "flash-deals", "mobile", "smart-gadgets"],
    tagline: "A compact 140W desktop charger that cleans up your entire setup.",
    description:
      "VoltGrid powers laptops, tablets, phones, and creator gear from a single sculpted aluminum hub. Smart power allocation keeps charging fast while the low-profile design sits neatly beside your monitor stand.",
    highlights: ["Three USB-C ports + one USB-A", "140W peak output", "Cool-running GaN core"],
    specs: {
      Output: "140W total power",
      Ports: "3 x USB-C, 1 x USB-A",
      Material: "Milled aluminum shell",
      Safety: "Temperature and surge protection",
      Cable: "2m braided AC cable",
    },
    advisory: "Use the included cable for best performance with high-power laptops.",
    delivery: "Flash deal ends tonight",
    reviewsList: [
      { name: "Ishaan Patel", rating: 5, date: "5 days ago", comment: "My desk is finally clean. One charger now handles my laptop, phone, and camera batteries." },
      { name: "Emily Rose", rating: 4, date: "2 weeks ago", comment: "Small footprint and plenty of power." },
    ],
  },
  {
    id: 3,
    name: "Aether Mechanical 75",
    category: "Gaming Accessories",
    price: 179,
    compareAtPrice: 219,
    rating: 4.9,
    reviews: 301,
    badge: "Trending",
    stock: 9,
    serialNumber: "MC-GAM-7505",
    illustration: "keyboard",
    palette: {
      panel: "from-violet-500/18 via-slate-950 to-slate-900",
      glow: "bg-violet-400/20",
      accent: "text-violet-300",
      border: "border-violet-400/20",
    },
    variants: [
      { id: "graphite", name: "Graphite RGB", swatch: "bg-zinc-800", accent: "bg-violet-300" },
      { id: "white", name: "Cloud White", swatch: "bg-zinc-200", accent: "bg-fuchsia-300" },
      { id: "navy", name: "Midnight Navy", swatch: "bg-sky-950", accent: "bg-sky-300" },
    ],
    collections: ["featured", "best-sellers", "gaming-workspace", "gaming", "trending"],
    tagline: "Hot-swappable wireless keyboard tuned for gaming and focused desk work.",
    description:
      "Aether Mechanical 75 blends premium acoustics with low-latency connectivity. It ships with gasket mounting, tri-mode wireless, shine-through keycaps, and a refined layout that fits cleanly into premium setups.",
    highlights: ["Hot-swappable switches", "Tri-mode wireless", "South-facing RGB"],
    specs: {
      Layout: "75% ANSI",
      Connectivity: "2.4GHz, Bluetooth, USB-C",
      Battery: "5000mAh",
      Mount: "Gasket mount",
      Switches: "Pre-lubed linear switches",
    },
    advisory: "Switch puller and extra caps are included in the box for quick customization.",
    delivery: "Limited warehouse stock",
    reviewsList: [
      { name: "Riya Thomas", rating: 5, date: "3 days ago", comment: "Looks incredible, sounds creamy, and the wireless performance is instant." },
      { name: "Ben Howard", rating: 5, date: "8 days ago", comment: "Exactly the kind of premium gaming keyboard I wanted for my hybrid setup." },
    ],
  },
  {
    id: 4,
    name: "HaloView 4K Desk Light",
    category: "Smart Home Products",
    price: 129,
    compareAtPrice: 149,
    rating: 4.6,
    reviews: 98,
    badge: "New",
    stock: 14,
    serialNumber: "MC-HOM-4016",
    illustration: "light",
    palette: {
      panel: "from-emerald-500/16 via-slate-950 to-slate-900",
      glow: "bg-emerald-400/20",
      accent: "text-emerald-300",
      border: "border-emerald-400/20",
    },
    variants: [
      { id: "sage", name: "Sage Alloy", swatch: "bg-emerald-600", accent: "bg-emerald-300" },
      { id: "pearl", name: "Pearl White", swatch: "bg-zinc-100", accent: "bg-lime-200" },
    ],
    collections: ["new-arrivals", "smart-home", "lifestyle-tech", "trending"],
    tagline: "Bias lighting and task illumination with app-controlled scenes.",
    description:
      "HaloView brightens desk setups, monitor walls, and nightstands with a slim 4K-safe light bar. It pairs with voice assistants and custom schedules so your space feels polished without effort.",
    highlights: ["Adaptive color temperature", "Ambient sync scenes", "Touch and app controls"],
    specs: {
      Brightness: "900 lumens",
      Temperature: "2700K - 6500K",
      Control: "App, touch, voice assistants",
      Mount: "Weighted magnetic base",
      Power: "USB-C PD",
    },
    advisory: "Mount above or behind a display for the most balanced bias-light effect.",
    delivery: "Ships in 2 business days",
    reviewsList: [{ name: "Mia Collins", rating: 4, date: "6 days ago", comment: "A beautiful desk light with surprisingly useful app presets." }],
  },
  {
    id: 5,
    name: "Strata Creator Dock",
    category: "Creator & Streaming Accessories",
    price: 239,
    compareAtPrice: 279,
    rating: 4.8,
    reviews: 156,
    badge: "Premium",
    stock: 7,
    serialNumber: "MC-CRT-5188",
    illustration: "dock",
    palette: {
      panel: "from-rose-400/16 via-slate-950 to-slate-900",
      glow: "bg-rose-400/20",
      accent: "text-rose-300",
      border: "border-rose-400/20",
    },
    variants: [
      { id: "graphite", name: "Graphite", swatch: "bg-zinc-800", accent: "bg-rose-300" },
      { id: "silver", name: "Studio Silver", swatch: "bg-zinc-300", accent: "bg-pink-200" },
    ],
    collections: ["featured", "creator", "gaming-workspace", "best-sellers"],
    tagline: "An all-in-one connectivity hub for creators running cameras, drives, and displays.",
    description:
      "Strata Creator Dock keeps demanding setups organized with high-speed ports, dual 4K output, UHS-II card access, and front-facing quick-connect inputs for cameras and audio interfaces.",
    highlights: ["Dual 4K display support", "UHS-II SD + microSD", "2.5GbE networking"],
    specs: {
      Upstream: "Thunderbolt 4 / USB4",
      Displays: "2 x 4K @ 60Hz",
      Storage: "10Gbps USB-C ports",
      Networking: "2.5 Gigabit Ethernet",
      Audio: "3.5mm combo jack",
    },
    advisory: "Use an external power source when connecting bus-powered drives and capture devices together.",
    delivery: "Premium support included",
    reviewsList: [
      { name: "Kavya Menon", rating: 5, date: "4 days ago", comment: "This instantly made my streaming desk feel professional." },
      { name: "Daniel Frost", rating: 4, date: "10 days ago", comment: "Reliable and fast, especially with cameras and external SSDs." },
    ],
  },
  {
    id: 6,
    name: "PulsePad RGB Mouse Mat",
    category: "Gaming Accessories",
    price: 59,
    compareAtPrice: 79,
    rating: 4.5,
    reviews: 188,
    badge: "Flash Deal",
    stock: 21,
    serialNumber: "MC-GAM-1180",
    illustration: "mousepad",
    palette: {
      panel: "from-fuchsia-500/16 via-slate-950 to-slate-900",
      glow: "bg-fuchsia-400/20",
      accent: "text-fuchsia-300",
      border: "border-fuchsia-400/20",
    },
    variants: [
      { id: "neon", name: "Neon Edge", swatch: "bg-fuchsia-500", accent: "bg-fuchsia-300" },
      { id: "ice", name: "Ice Blue", swatch: "bg-sky-400", accent: "bg-cyan-300" },
    ],
    collections: ["flash-deals", "gaming", "trending"],
    tagline: "A spacious low-friction desk mat with perimeter glow and USB-C power.",
    description:
      "PulsePad delivers smooth tracking, anti-fray edges, and synchronized lighting presets that tie into gaming rooms without overwhelming the setup. The surface feels fast for shooters and controlled for creative work.",
    highlights: ["800 x 300mm surface", "Water-resistant coating", "Addressable RGB edge"],
    specs: {
      Surface: "Speed-control hybrid weave",
      Size: "800 x 300mm",
      Lighting: "12 RGB presets",
      Cable: "Detachable USB-C",
      Base: "Textured anti-slip rubber",
    },
    advisory: "Keep the USB-C connector seated firmly to avoid intermittent lighting disconnects.",
    delivery: "Flash deal shipping today",
    reviewsList: [{ name: "Noah Kim", rating: 5, date: "1 day ago", comment: "Looks amazing and the surface is excellent for both gaming and editing." }],
  },
  {
    id: 7,
    name: "Summit Fold Laptop Stand",
    category: "Laptops & Workspace Setup",
    price: 74,
    compareAtPrice: 94,
    rating: 4.7,
    reviews: 141,
    badge: "Workspace Pick",
    stock: 18,
    serialNumber: "MC-WRK-2476",
    illustration: "stand",
    palette: {
      panel: "from-slate-400/16 via-slate-950 to-slate-900",
      glow: "bg-slate-300/20",
      accent: "text-slate-200",
      border: "border-white/10",
    },
    variants: [
      { id: "silver", name: "Brushed Silver", swatch: "bg-zinc-300", accent: "bg-zinc-100" },
      { id: "black", name: "Midnight Black", swatch: "bg-zinc-800", accent: "bg-slate-300" },
    ],
    collections: ["gaming-workspace", "workspace", "best-sellers"],
    tagline: "A fold-flat laptop riser that adds ergonomics without adding bulk.",
    description:
      "Summit Fold raises displays to a healthier viewing angle and packs away quickly when you move between desk, studio, and campus. Silicone contact points keep premium laptops stable and scratch free.",
    highlights: ["Supports laptops up to 17 inches", "Folds flat for travel", "Aerospace aluminum frame"],
    specs: {
      Material: "Anodized aluminum",
      Weight: "480g",
      Angle: "6 adjustable positions",
      Compatibility: "Up to 17-inch laptops",
      Extras: "Silicone protection pads",
    },
    advisory: "Pair with an external keyboard for the best ergonomic result during long sessions.",
    delivery: "Back in stock",
    reviewsList: [{ name: "Zoe Harper", rating: 5, date: "11 days ago", comment: "Strong, minimal, and easy to carry between home and office." }],
  },
  {
    id: 8,
    name: "Orbit Smart Tracker Card",
    category: "Smart Gadgets",
    price: 39,
    compareAtPrice: 49,
    rating: 4.4,
    reviews: 267,
    badge: "Everyday Essential",
    stock: 34,
    serialNumber: "MC-SGD-0983",
    illustration: "tracker",
    palette: {
      panel: "from-sky-400/16 via-slate-950 to-slate-900",
      glow: "bg-sky-300/20",
      accent: "text-sky-300",
      border: "border-sky-400/20",
    },
    variants: [
      { id: "black", name: "Black Carbon", swatch: "bg-zinc-900", accent: "bg-sky-300" },
      { id: "white", name: "Pearl White", swatch: "bg-zinc-100", accent: "bg-cyan-200" },
    ],
    collections: ["smart-gadgets", "new-arrivals", "mobile", "featured"],
    tagline: "Wallet-friendly tracker card with global find-network support.",
    description:
      "Orbit slips into wallets, passports, and travel sleeves while giving you reliable location pings and separation alerts. The rechargeable battery lasts months and the finish stays clean even with daily use.",
    highlights: ["Rechargeable battery", "Find-network ready", "Ultra-thin card design"],
    specs: {
      Thickness: "2.2mm",
      Battery: "5 months per charge",
      Charging: "Magnetic cable",
      Alerts: "Separation + ping",
      Range: "Global network support",
    },
    advisory: "Best stored in the outer card layer of a wallet for strongest signal performance.",
    delivery: "Ships same day",
    reviewsList: [{ name: "Olivia Grant", rating: 4, date: "9 days ago", comment: "Thin enough for my wallet and the recharge setup is simple." }],
  },
  {
    id: 9,
    name: "FrameFlow LUT Bundle",
    category: "Trending Digital Products",
    price: 29,
    compareAtPrice: 39,
    rating: 4.9,
    reviews: 93,
    badge: "Digital Download",
    stock: 999,
    serialNumber: "MC-DIG-5520",
    illustration: "digital",
    palette: {
      panel: "from-indigo-500/18 via-slate-950 to-slate-900",
      glow: "bg-indigo-400/20",
      accent: "text-indigo-300",
      border: "border-indigo-400/20",
    },
    variants: [
      { id: "cinema", name: "Cinema Pack", swatch: "bg-indigo-500", accent: "bg-indigo-300" },
      { id: "social", name: "Social Pack", swatch: "bg-pink-500", accent: "bg-pink-300" },
    ],
    collections: ["digital", "new-arrivals", "creator", "trending"],
    tagline: "Cinematic color presets for creators shipping short-form and long-form video faster.",
    description:
      "FrameFlow includes flexible LUTs designed for moody desk setups, gaming highlights, product reels, and podcast footage. Install in minutes and keep your visual identity consistent across platforms.",
    highlights: ["Works with Premiere, Final Cut, Resolve", "Optimized for LED-lit setups", "Instant download"],
    specs: {
      Format: ".cube LUT pack",
      Includes: "18 LUTs + install guide",
      Delivery: "Instant digital download",
      License: "Single creator commercial use",
      Support: "Setup guide included",
    },
    advisory: "Apply on properly exposed footage and dial intensity down for skin tones when needed.",
    delivery: "Available instantly after checkout",
    reviewsList: [{ name: "Aman Verma", rating: 5, date: "1 week ago", comment: "Fastest way I have found to make product reels look premium." }],
  },
  {
    id: 10,
    name: "Luma Bottle Pro",
    category: "Lifestyle Tech Products",
    price: 69,
    compareAtPrice: 89,
    rating: 4.5,
    reviews: 121,
    badge: "New",
    stock: 20,
    serialNumber: "MC-LIF-3022",
    illustration: "lifestyle",
    palette: {
      panel: "from-teal-400/16 via-slate-950 to-slate-900",
      glow: "bg-teal-300/20",
      accent: "text-teal-300",
      border: "border-teal-400/20",
    },
    variants: [
      { id: "mint", name: "Mint Steel", swatch: "bg-teal-400", accent: "bg-teal-200" },
      { id: "graphite", name: "Graphite", swatch: "bg-zinc-800", accent: "bg-teal-300" },
    ],
    collections: ["lifestyle-tech", "new-arrivals", "featured"],
    tagline: "A self-cleaning smart bottle built for commuters, students, and creators on the move.",
    description:
      "Luma Bottle Pro keeps drinks cold, tracks hydration reminders, and uses UV-C cleaning cycles to make everyday carry feel smarter. The brushed steel finish looks premium instead of gimmicky.",
    highlights: ["UV-C self-clean cycle", "Hydration reminders", "24-hour cold retention"],
    specs: {
      Capacity: "620ml",
      Material: "Vacuum insulated stainless steel",
      Battery: "14-day charge",
      Cleaning: "UV-C interior cycle",
      Extras: "LED status ring",
    },
    advisory: "Run a cleaning cycle with the lid closed and bottle empty for best results.",
    delivery: "Ships tomorrow",
    reviewsList: [{ name: "Hannah Scott", rating: 4, date: "12 days ago", comment: "Looks premium and the hydration reminders are actually helpful." }],
  },
  {
    id: 11,
    name: "Arc Mini Projector",
    category: "Everyday Tech Essentials",
    price: 199,
    compareAtPrice: 249,
    rating: 4.6,
    reviews: 87,
    badge: "Weekend Pick",
    stock: 13,
    serialNumber: "MC-ESS-6733",
    illustration: "projector",
    palette: {
      panel: "from-orange-400/16 via-slate-950 to-slate-900",
      glow: "bg-orange-300/20",
      accent: "text-orange-300",
      border: "border-orange-300/20",
    },
    variants: [
      { id: "sand", name: "Sandstone", swatch: "bg-stone-300", accent: "bg-orange-200" },
      { id: "graphite", name: "Graphite", swatch: "bg-zinc-800", accent: "bg-orange-300" },
    ],
    collections: ["featured", "smart-gadgets", "lifestyle-tech"],
    tagline: "Pocket-friendly projector for dorm rooms, lounge spaces, and quick presentations.",
    description:
      "Arc Mini Projector brings big-screen energy to small rooms with auto-keystone, built-in streaming, and a surprisingly rich speaker tuned for casual watching. It is perfect for flexible modern living.",
    highlights: ["Auto focus and keystone", "Built-in streaming apps", "Compact carry design"],
    specs: {
      Resolution: "1080p native",
      Brightness: "450 ANSI lumens",
      Audio: "Dual stereo speakers",
      Wireless: "Wi-Fi 6 + Bluetooth",
      Projection: "40 to 120 inches",
    },
    advisory: "Use in dimmer rooms for the best contrast and color depth.",
    delivery: "Ships in 48 hours",
    reviewsList: [{ name: "Vikram Das", rating: 5, date: "2 weeks ago", comment: "This is my go-to projector for casual movie nights and quick pitches." }],
  },
  {
    id: 12,
    name: "Nova Webcam Studio",
    category: "Creator & Streaming Accessories",
    price: 119,
    compareAtPrice: 149,
    rating: 4.7,
    reviews: 172,
    badge: "Creator Favorite",
    stock: 15,
    serialNumber: "MC-CRT-8841",
    illustration: "camera",
    palette: {
      panel: "from-red-400/16 via-slate-950 to-slate-900",
      glow: "bg-red-300/20",
      accent: "text-red-300",
      border: "border-red-300/20",
    },
    variants: [
      { id: "black", name: "Studio Black", swatch: "bg-zinc-900", accent: "bg-red-300" },
      { id: "white", name: "Porcelain White", swatch: "bg-zinc-100", accent: "bg-rose-200" },
    ],
    collections: ["creator", "best-sellers", "new-arrivals", "gaming-workspace"],
    tagline: "A sharp 4K webcam with clean low-light tuning and instant framing.",
    description:
      "Nova Webcam Studio upgrades meetings, streaming, and recorded content with crisp optics, dual microphones, and polished framing that feels professional right out of the box.",
    highlights: ["4K sensor", "Auto framing", "Dual noise-reduced microphones"],
    specs: {
      Resolution: "4K30 / 1080p60",
      FieldOfView: "90 degrees",
      Mount: "Monitor clip + tripod thread",
      Audio: "Dual beamforming mics",
      Privacy: "Magnetic privacy cover",
    },
    advisory: "Mount slightly above eye line and keep a soft key light in front for the best image.",
    delivery: "Creator support included",
    reviewsList: [{ name: "Chloe Martin", rating: 5, date: "4 days ago", comment: "A huge upgrade for calls and streams without needing a full camera rig." }],
  },
];

const categoryDescriptions = {
  "Smart Gadgets": "Compact connected tools that make everyday carry smarter.",
  "Gaming Accessories": "Performance-first gear with premium desk presence.",
  "Wireless Headphones & Audio": "Clean sound, low latency, and immersive listening.",
  "Mobile Accessories": "Fast charging and refined on-the-go essentials.",
  "Laptops & Workspace Setup": "Ergonomic upgrades for modern workstations.",
  "Smart Home Products": "Ambient, connected tech for stylish spaces.",
  "Lifestyle Tech Products": "Useful daily tech that still looks elevated.",
  "Creator & Streaming Accessories": "Tools for streaming, shooting, and editing faster.",
  "Trending Digital Products": "Instant downloads for creators and digital-first workflows.",
  "Everyday Tech Essentials": "Reliable devices for daily routines and flexible living.",
};

export const brandPartners = ["HyperPixel", "Voltware", "Auraloop", "NovaHouse", "AxisPlay", "CloudFrame"];

export const customerStories = [
  {
    name: "Nina Brooks",
    role: "Product Designer",
    initials: "NB",
    quote: "MysticCommerce feels curated instead of chaotic. I can actually discover products that fit my workspace and creator setup.",
  },
  {
    name: "Arjun Mehta",
    role: "Streamer & Editor",
    initials: "AM",
    quote: "The creator gear picks are strong, and the premium presentation makes the whole storefront feel trustworthy.",
  },
  {
    name: "Lena Ortiz",
    role: "Remote Software Engineer",
    initials: "LO",
    quote: "It is the first tech storefront where gaming gear and workspace essentials feel like part of the same lifestyle.",
  },
];

export const homeMetrics = [
  { value: "12K+", label: "Products explored weekly" },
  { value: "4.8/5", label: "Average customer satisfaction" },
  { value: "24h", label: "Fast dispatch on core inventory" },
];

export const collectionHighlights = [
  {
    title: "Creator Control Room",
    description: "Streaming, camera, and desk tools selected for clean on-camera setups.",
    href: "/products?category=Creator+%26+Streaming+Accessories",
  },
  {
    title: "Gaming & Workspace Fusion",
    description: "Performance gear that still looks refined in a premium workstation.",
    href: "/products?collection=gaming-workspace",
  },
  {
    title: "Smart Everyday Carry",
    description: "Portable gadgets and accessories for students, creators, and commuters.",
    href: "/products?category=Smart+Gadgets",
  },
];

const unsplashPaths = {
  1: "photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
  2: "photo-1585386959984-a41552231658?auto=format&fit=crop&w=1200&q=80",
  3: "photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80",
  4: "photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  5: "photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
  6: "photo-1616788494672-ec7ca25fdda9?auto=format&fit=crop&w=1200&q=80",
  7: "photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=1200&q=80",
  8: "photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80",
  9: "photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=80",
  10: "photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
  11: "photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  12: "photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
};

export function getProductImageSrc(productId) {
  return `https://images.unsplash.com/${unsplashPaths[productId] ?? unsplashPaths[1]}`;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => String(product.id) === String(id)) ?? null;
}

export function getProductsByCollection(collection) {
  return products.filter((product) => product.collections.includes(collection));
}

export function getFeaturedProducts(limit = 4) {
  return getProductsByCollection("featured").slice(0, limit);
}

export function getBestSellers(limit = 4) {
  return getProductsByCollection("best-sellers").slice(0, limit);
}

export function getFlashDeals(limit = 4) {
  return getProductsByCollection("flash-deals").slice(0, limit);
}

export function getNewArrivals(limit = 4) {
  return getProductsByCollection("new-arrivals").slice(0, limit);
}

export function getTrendingProducts(limit = 4) {
  return getProductsByCollection("trending").slice(0, limit);
}

export function getGamingWorkspaceProducts(limit = 4) {
  return getProductsByCollection("gaming-workspace").slice(0, limit);
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) {
    return [];
  }

  return products
    .filter((candidate) => candidate.id !== product.id)
    .sort((left, right) => {
      const leftScore = Number(left.category === product.category) + left.collections.filter((tag) => product.collections.includes(tag)).length;
      const rightScore = Number(right.category === product.category) + right.collections.filter((tag) => product.collections.includes(tag)).length;
      return rightScore - leftScore;
    })
    .slice(0, limit);
}

export function getStoreCategories() {
  return Object.entries(categoryDescriptions).map(([name, description]) => ({
    name,
    description,
    productCount: products.filter((product) => product.category === name).length,
  }));
}

export function filterProducts({ category, collection, query, sort = "featured" } = {}) {
  const normalizedQuery = query?.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesCategory = !category || category === "All" || product.category === category;
    const matchesCollection = !collection || collection === "all" || product.collections.includes(collection);
    const matchesQuery =
      !normalizedQuery ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.tagline.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesCollection && matchesQuery;
  });

  const sorted = [...filtered];

  switch (sort) {
    case "price-low":
      sorted.sort((left, right) => left.price - right.price);
      break;
    case "price-high":
      sorted.sort((left, right) => right.price - left.price);
      break;
    case "rating":
      sorted.sort((left, right) => right.rating - left.rating);
      break;
    case "newest":
      sorted.sort((left, right) => right.id - left.id);
      break;
    default:
      sorted.sort((left, right) => {
        const leftFeatured = left.collections.includes("featured") ? 1 : 0;
        const rightFeatured = right.collections.includes("featured") ? 1 : 0;
        return rightFeatured - leftFeatured || right.rating - left.rating;
      });
      break;
  }

  return sorted;
}
