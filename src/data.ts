import { Product, Category, Review } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    count: 12,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "fashion",
    name: "Fashion",
    count: 18,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "beauty",
    name: "Beauty",
    count: 15,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "furniture",
    name: "Furniture",
    count: 10,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "accessories",
    name: "Accessories",
    count: 20,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "gaming",
    name: "Gaming",
    count: 14,
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=600&auto=format&fit=crop",
  },
];

export const PRODUCTS: Product[] = [
  // Electronics
  {
    id: "elec-1",
    name: "Zone Pro Wireless ANC Headphones",
    price: 299,
    originalPrice: 349,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 124,
    description: "Experience premium sound with high-fidelity acoustics and Industry-leading Active Noise Cancellation (ANC). Designed with memory-foam ear cushions and up to 40 hours of battery life for all-day listening comfort.",
    colors: [
      { name: "Matte Black", hex: "#1e1e1e" },
      { name: "Silver Grey", hex: "#d1d5db" },
      { name: "Midnight Blue", hex: "#1e3a8a" }
    ],
    features: [
      "Hybrid Active Noise Cancellation",
      "Hi-Res Audio Certified with LDAC",
      "40-Hour Battery Life with Fast Charging",
      "Bluetooth 5.2 Multipoint Connection",
      "Crystal-Clear Calls via 5 Built-in Mics"
    ],
    stock: 15,
    isNew: true,
    isTrending: true
  },
  {
    id: "elec-2",
    name: "AuraCast Premium Bluetooth Speaker",
    price: 189,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviewCount: 78,
    description: "Immersive 360-degree sound wrapped in a elegant water-resistant woven fabric. The AuraCast delivers chest-thumping bass and crystal-clear trebles, perfect for both intimate indoor rooms and outdoor poolside parties.",
    colors: [
      { name: "Charcoal Black", hex: "#2d3748" },
      { name: "Ocean Blue", hex: "#2b6cb0" }
    ],
    features: [
      "360° Omnidirectional Room-filling Sound",
      "IP67 Waterproof and Dustproof",
      "Link Multiple Speakers for Stereo Mode",
      "24-Hour Continuous Battery Run",
      "Dynamic Ambient RGB Ring Light"
    ],
    stock: 8
  },
  {
    id: "elec-3",
    name: "NanoBuds Pro Wireless Earbuds",
    price: 129,
    originalPrice: 159,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.5,
    reviewCount: 92,
    description: "Ultra-lightweight ear buds with custom-tuned 11mm drivers, offering incredible sound depth. Perfect for active athletes with ergonomic secure-fit earhooks and dual-microphone noise isolation.",
    colors: [
      { name: "Glossy White", hex: "#ffffff" },
      { name: "Obsidian", hex: "#1a202c" }
    ],
    features: [
      "Customizable Dynamic Equalizer",
      "Ergonomic Sweatproof Secure Fit",
      "6-Hour Battery + 24 Hours in Case",
      "Touch Controls & Voice Assistant Support"
    ],
    stock: 22
  },

  // Fashion
  {
    id: "fash-1",
    name: "Minimalist Heavyweight Cotton Tee",
    price: 35,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 310,
    description: "Crafted from 100% premium long-staple organic cotton. This tee features an elegant custom boxy fit, thick ribbed collar, and durable double-stitched seams. Preshrunk to preserve shape for years.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Pitch Black", hex: "#111111" },
      { name: "Cream White", hex: "#fcfaf2" },
      { name: "Sage Green", hex: "#7a8b7b" }
    ],
    features: [
      "100% Organic Heavyweight Cotton (280 GSM)",
      "Boxy, relaxed drop-shoulder silhouette",
      "Ribbed collar holds its shape after washes",
      "Eco-friendly, chemical-free fabric dyes"
    ],
    stock: 50,
    isTrending: true
  },
  {
    id: "fash-2",
    name: "Urban Essential French Terry Hoodie",
    price: 75,
    originalPrice: 95,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 145,
    description: "An incredibly cozy hoodie made of authentic French Terry knit loops. Has a clean, hardware-free hood, kangaroo pocket, and thick ribbed cuffs. Designed to provide perfect temperature control.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal Melange", hex: "#eae6df" },
      { name: "Slate Grey", hex: "#4a5568" },
      { name: "Olive", hex: "#556b2f" }
    ],
    features: [
      "100% French Terry Cotton loops",
      "Double-lined spacious hood",
      "Seamless hidden side pockets",
      "Ultra-soft brushed interior fleece"
    ],
    stock: 30,
    isNew: true
  },
  {
    id: "fash-3",
    name: "Heritage Distressed Denim Jacket",
    price: 110,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.4,
    reviewCount: 64,
    description: "Classic trucker style denim jacket crafted from rigid selvedge denim that gets better with every single wear. Features high-quality custom metal buttons and secure chest pockets.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Vintage Indigo", hex: "#4682b4" },
      { name: "Light Wash", hex: "#add8e6" }
    ],
    features: [
      "Rigid raw selvedge cotton denim",
      "Signature chest button-flap pockets",
      "Adjustable back waist waistbands",
      "Reinforced heavy-duty thread detailing"
    ],
    stock: 12
  },

  // Beauty
  {
    id: "beau-1",
    name: "Pure Bloom Hydra-Serum Set",
    price: 89,
    originalPrice: 110,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 156,
    description: "A premium 2-piece hydrating skin set featuring high potency botanical serums. Clinically proven to hydrate skin layers, reduce wrinkles, and offer a glowing natural glass skin finish in weeks.",
    features: [
      "Enriched with Hyaluronic Acid and Peptides",
      "Vegan, Organic, and Cruelty-free Formulations",
      "Dermatologically Tested for Sensitive Skin",
      "Free of Parabens, Phthalates, and Sulfates"
    ],
    stock: 25,
    isTrending: true
  },
  {
    id: "beau-2",
    name: "Noir Oud Exquisite Eau de Parfum",
    price: 145,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 204,
    description: "A deep, rich, and mysterious perfume featuring rare agarwood, smoky incense, dark patchouli, and sweet vanilla. Offers an exceptionally long-lasting fragrance trail that turns heads.",
    features: [
      "Top notes: Cardamom, Pink Pepper, Citrus",
      "Heart notes: Natural Agarwood (Oud), Rose, Incense",
      "Base notes: Sweet Madagascar Vanilla, Vetiver, Amber",
      "Extremely high concentration perfume oil (20% concentration)"
    ],
    stock: 14,
    isNew: true
  },

  // Furniture
  {
    id: "furn-1",
    name: "Nordic Minimalist Oak Armchair",
    price: 340,
    originalPrice: 399,
    category: "furniture",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 52,
    description: "Sculpted from high-grade solid white oak wood with a soft, padded seat upholstered in premium wool melange fabric. Designed to provide ergonomic back support and add timeless Nordic warmth.",
    colors: [
      { name: "Slate Grey", hex: "#708090" },
      { name: "Cream Boucle", hex: "#f5f5dc" },
      { name: "Charcoal Black", hex: "#2b2b2b" }
    ],
    features: [
      "100% Solid white oak framing",
      "Eco-friendly natural lacquer finishing",
      "Ergonomically designed curved backrest",
      "High-density memory foam cushioning"
    ],
    stock: 6,
    isTrending: true
  },
  {
    id: "furn-2",
    name: "Sleek Industrial Wire Coffee Table",
    price: 199,
    category: "furniture",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.3,
    reviewCount: 37,
    description: "A geometric steel wire base supports a thick, circular, tempered glass top. Offers an airy, light footprint perfect for modern open-concept living rooms.",
    colors: [
      { name: "Matte Black", hex: "#111111" },
      { name: "Polished Gold", hex: "#d4af37" }
    ],
    features: [
      "Tempered safety glass (8mm thickness)",
      "Power-coated rust-resistant steel frame",
      "Non-slip scratch-resistant floor pads",
      "No assembly required, ready to unpack"
    ],
    stock: 10
  },

  // Accessories
  {
    id: "acc-1",
    name: "ShopZone Smartwatch Pro V2",
    price: 249,
    originalPrice: 299,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 184,
    description: "The ultimate companion for your health and daily organization. Features an always-on AMOLED display, 24/7 heart-rate and oxygen monitoring, dual-GPS tracking, and a premium titanium case.",
    colors: [
      { name: "Obsidian Black", hex: "#111111" },
      { name: "Titanium Silver", hex: "#e2e8f0" }
    ],
    features: [
      "Always-On AMOLED high-density touch display",
      "Advanced ECG, Blood Oxygen & Sleep trackers",
      "Built-in GPS with map navigation support",
      "Up to 10 Days battery run on a single charge",
      "Waterproof up to 50 meters (5ATM)"
    ],
    stock: 15,
    isTrending: true,
    isNew: true
  },
  {
    id: "acc-2",
    name: "Classic Acetate Polarized Sunglasses",
    price: 85,
    originalPrice: 120,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviewCount: 95,
    description: "Styled with timeless vintage square frames. Meticulously handcrafted from plant-based acetate, equipped with polarized UV400 protective lenses to fully eliminate annoying glare.",
    colors: [
      { name: "Glossy Black", hex: "#111111" },
      { name: "Amber Tortoise", hex: "#8b4513" }
    ],
    features: [
      "Handcrafted plant-based cellulose acetate frame",
      "Premium polarized lenses (100% UVA/UVB protection)",
      "Sturdy 5-barrel metal hinges for durability",
      "Includes protective leather case and cleaning cloth"
    ],
    stock: 35
  },
  {
    id: "acc-3",
    name: "Full-Grain Italian Leather Wallet",
    price: 55,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 112,
    description: "Slim bifold wallet constructed from top-tier full grain vegetable tanned leather. It develops a gorgeous natural dark patina with time. Built-in RFID protection safeguards cards.",
    colors: [
      { name: "Cognac Brown", hex: "#8b5a2b" },
      { name: "Stealth Black", hex: "#1c1c1c" }
    ],
    features: [
      "100% Genuine Full-Grain Italian Leather",
      "Integrated RFID security blocking layers",
      "Holds up to 8 cards and has a spacious cash bill compartment",
      "Ultra-slim minimal pocket profile design"
    ],
    stock: 40
  },

  // Gaming
  {
    id: "game-1",
    name: "Zone Strike Purple Wireless Controller",
    price: 79,
    originalPrice: 89,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 234,
    description: "An absolute masterpiece of gaming comfort. Built with anti-drift Hall Effect thumbsticks, tactile microswitch buttons, and customizable rear paddle controls. Extremely low latency wireless connection.",
    colors: [
      { name: "Royal Purple", hex: "#7a22e0" },
      { name: "Vibrant Cyan", hex: "#00b4d8" },
      { name: "Pure White", hex: "#ffffff" }
    ],
    features: [
      "High Precision Hall-Effect Non-Drift Joysticks",
      "Ultra-responsive mechanical click buttons",
      "Four map-able back paddles for custom macros",
      "Dual-rumble haptic feedback motors",
      "Bluetooth, 2.4Ghz, and USB-C Connection Modes"
    ],
    stock: 18,
    isTrending: true,
    isNew: true
  },
  {
    id: "game-2",
    name: "Apex Elite Mechanical Keyboard",
    price: 159,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 89,
    description: "A compact 75% mechanical keyboard with factory-lubed linear red switches for butter-smooth keystrokes. Features double-shot PBT keycaps and sound-absorbing silicone gaskets for a premium deep acoustic 'thock'.",
    colors: [
      { name: "Slate/Grey", hex: "#3e4a59" },
      { name: "All White", hex: "#ffffff" }
    ],
    features: [
      "Compact 75% Layout with aluminum top frame",
      "Hot-Swappable 5-pin mechanical switch sockets",
      "Gasket mounted structure with triple-layer sound foam",
      "Full individual per-key South-facing RGB backlighting",
      "Durable double-shot dye-sub PBT keycaps"
    ],
    stock: 12
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    userName: "Alex Johnson",
    rating: 5,
    date: "July 12, 2026",
    comment: "Absolutely outstanding quality. This is exactly what I was searching for! The attention to detail, premium packaging, and fast shipping exceeded my expectations. 10/10 will purchase again.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80"
  },
  {
    id: "rev-2",
    userName: "Sophia Miller",
    rating: 5,
    date: "June 28, 2026",
    comment: "The visual appearance is gorgeous and performance matches premium brands. It fits perfectly into my minimalist setup. Highly recommend to anyone considering it!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80"
  },
  {
    id: "rev-3",
    userName: "Marcus Chen",
    rating: 4,
    date: "May 15, 2026",
    comment: "Very solid build quality and beautiful ergonomics. The customer service team was incredibly responsive and resolved my size exchange in under 24 hours. Great brand!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80"
  }
];
