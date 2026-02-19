export interface ArchNode {
  id: string;
  label: string;
  row: number;
  col: number;
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Architecture {
  nodes: ArchNode[];
  edges: ArchEdge[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: "saas" | "ecommerce" | "data" | "ai" | "tooling";
  featured: boolean;
  image: string;
  heroImage?: string;
  gallery: string[];
  liveUrl?: string;
  githubUrl?: string;
  highlights: { title: string; description: string }[];
  year: string;
  status: "active" | "completed" | "in-development";
  architecture?: Architecture;
}

export const projects: Project[] = [
  {
    slug: "pixel-wand",
    title: "PixelWand",
    tagline: "Image optimization SaaS with API access",
    description:
      "A production SaaS platform for image optimization — format conversion, compression, and batch processing with a developer API. Handles thousands of conversions with Stripe billing, R2 storage, and a polished conversion interface.",
    longDescription:
      "PixelWand started as a tool I needed myself — a fast, no-nonsense image optimizer that could handle bulk conversions without quality loss. It grew into a full SaaS with tiered pricing, API keys for developer access, and a pipeline that processes images through WebP, AVIF, and PNG optimization. The backend handles presigned URL uploads to Cloudflare R2, server-side processing, and automatic cleanup. Stripe handles subscriptions with usage-based billing. The whole thing is deployed on Vercel with edge functions for the API layer.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "Stripe",
      "Cloudflare R2",
      "Sharp",
      "Vercel",
    ],
    category: "saas",
    featured: true,
    image: "/images/projects/pixel-wand.png",
    heroImage: "/images/projects/pixelwand-hero.png",
    gallery: ["/images/logos/pixel-wand.png"],
    highlights: [
      { title: "SaaS Billing", description: "Full Stripe integration with tiered subscriptions and usage-based billing" },
      { title: "Developer API", description: "API key management with per-key rate limiting and usage tracking" },
      { title: "Serverless Uploads", description: "Presigned URL uploads to Cloudflare R2 — zero server-side file handling" },
      { title: "Format Pipeline", description: "WebP, AVIF, and PNG optimization with configurable quality preservation" },
      { title: "Production CI/CD", description: "Deployed on Vercel with automated builds, type checking, and monitoring" },
    ],
    year: "2025",
    status: "active",
    architecture: {
      nodes: [
        { id: "app", label: "Next.js App", row: 0, col: 3 },
        { id: "api", label: "API Routes", row: 1, col: 2 },
        { id: "webhooks", label: "Stripe Webhooks", row: 1, col: 4 },
        { id: "sharp", label: "Sharp Pipeline", row: 2, col: 2 },
        { id: "billing", label: "Stripe Billing", row: 2, col: 4 },
        { id: "r2", label: "Cloudflare R2", row: 3, col: 1 },
        { id: "db", label: "PostgreSQL", row: 3, col: 3 },
        { id: "keys", label: "API Key Store", row: 3, col: 5 },
      ],
      edges: [
        { from: "app", to: "api", label: "REST" },
        { from: "app", to: "webhooks", label: "Events" },
        { from: "api", to: "sharp", label: "Image Buffer" },
        { from: "webhooks", to: "billing", label: "Subscriptions" },
        { from: "sharp", to: "r2", label: "Presigned Upload" },
        { from: "billing", to: "db", label: "Prisma" },
        { from: "api", to: "keys" },
      ],
    },
  },
  {
    slug: "murderdata",
    title: "MurderData",
    tagline: "Interactive homicide data exploration platform",
    description:
      "A data-rich visualization platform for exploring homicide statistics across the US. Features interactive maps, filterable datasets, zodiac analysis, and community-driven data provenance — built for true crime researchers and data enthusiasts.",
    longDescription:
      "MurderData is a full-stack data platform that makes FBI homicide data explorable and visual. The frontend features interactive choropleth maps, filterable data tables, and statistical breakdowns by demographics, geography, weapons, and relationships. The community layer adds field-level data provenance — users can contribute corrections with source citations, and every data point tracks its edit history. The zodiac analysis feature was a fun addition that went viral in the true crime community. The backend handles large dataset aggregation with optimized queries and caching.",
    techStack: [
      "Next.js",
      "TypeScript",
      "D3.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "Vercel",
    ],
    category: "data",
    featured: true,
    image: "/images/projects/murderdata.png",
    heroImage: "/images/projects/murderdata-hero.jpg",
    gallery: [],
    highlights: [
      { title: "Choropleth Maps", description: "Interactive D3.js maps with drill-down by state and county" },
      { title: "Data Provenance", description: "Community-driven corrections with field-level edit history and source citations" },
      { title: "Advanced Filtering", description: "Complex queries across demographics, geography, weapons, and time periods" },
      { title: "Scale", description: "Optimized aggregation queries handling 800K+ records with caching" },
      { title: "Zodiac Analysis", description: "Astrology-based statistical breakdowns that gained traction in the true crime community" },
    ],
    year: "2025–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "ui", label: "Next.js App", row: 0, col: 3 },
        { id: "maps", label: "D3.js Maps", row: 1, col: 1 },
        { id: "filters", label: "Filter Engine", row: 1, col: 3 },
        { id: "api", label: "API Routes", row: 1, col: 5 },
        { id: "agg", label: "Aggregation Engine", row: 2, col: 2 },
        { id: "provenance", label: "Provenance Tracker", row: 2, col: 4 },
        { id: "cache", label: "Cache Layer", row: 3, col: 2 },
        { id: "db", label: "PostgreSQL", row: 3, col: 4 },
      ],
      edges: [
        { from: "ui", to: "maps", label: "GeoJSON" },
        { from: "ui", to: "filters" },
        { from: "ui", to: "api", label: "REST" },
        { from: "filters", to: "agg" },
        { from: "api", to: "provenance", label: "Edit History" },
        { from: "agg", to: "cache" },
        { from: "agg", to: "db", label: "800K+ Records" },
        { from: "provenance", to: "db", label: "Prisma" },
      ],
    },
  },
  {
    slug: "hartecho-site",
    title: "Hartecho",
    tagline: "Full-stack ecommerce platform with customer portal",
    description:
      "The main website and ecommerce platform for Hartecho — a software company I co-founded. Includes a marketing site, service pages, portfolio showcase, blog, and a customer portal where clients track project progress, invoices, and deliverables.",
    longDescription:
      "Hartecho is the software company I co-founded, and this is its digital home. The public-facing site handles SEO-optimized marketing pages, a dynamic portfolio, service breakdowns, and a blog. The ecommerce side processes service bookings and digital product purchases. The customer portal — currently being integrated — gives clients a dashboard to track active projects, view invoices, download deliverables, and communicate with the team. Built with Nuxt 3 for SSR performance, MongoDB for flexible data modeling, and server routes for API logic.",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "AWS Lambda",
      "S3",
    ],
    category: "ecommerce",
    featured: true,
    image: "/images/projects/hartecho-live.png",
    heroImage: "/images/projects/hartecho-hero.webp",
    liveUrl: "https://hartecho.com",
    gallery: ["/images/logos/hartecho.webp"],
    highlights: [
      { title: "Marketing & SEO", description: "Full marketing site with SEO-optimized pages and dynamic portfolio showcase" },
      { title: "Customer Portal", description: "Clients track active projects, view invoices, and download deliverables" },
      { title: "SSR Performance", description: "Server-side rendered with Nuxt 3 for fast loads and search visibility" },
      { title: "Blog Engine", description: "Integrated blog with CMS-like content management driving organic traffic" },
      { title: "Real Business", description: "Built and operated as a real company serving paying clients" },
    ],
    year: "2023–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "nuxt", label: "Nuxt 3 SSR", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", row: 1, col: 2 },
        { id: "lambda", label: "AWS Lambda", row: 1, col: 4 },
        { id: "blog", label: "Blog Engine", row: 2, col: 1 },
        { id: "portal", label: "Customer Portal", row: 2, col: 3 },
        { id: "invoices", label: "Invoice System", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", row: 3, col: 2 },
        { id: "s3", label: "AWS S3", row: 3, col: 4 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "SSR" },
        { from: "nuxt", to: "lambda", label: "Serverless" },
        { from: "routes", to: "blog" },
        { from: "routes", to: "portal", label: "Auth" },
        { from: "lambda", to: "invoices" },
        { from: "blog", to: "mongo" },
        { from: "portal", to: "mongo", label: "Documents" },
        { from: "invoices", to: "s3", label: "PDFs" },
      ],
    },
  },
  {
    slug: "perception",
    title: "Perception",
    tagline: "Scientific relationship perception tool",
    description:
      "A scientifically-grounded tool for visualizing how people perceive their relationships. Features interactive 3D body maps where users can map emotional and physical responses, with radar chart visualizations for comparison and self-reflection.",
    longDescription:
      "Perception grew out of an interest in how people experience relationships differently — physically and emotionally. The core interaction is a 3D body map where users can paint regions to indicate where they feel different emotions or sensations in response to their partner. The data feeds into radar visualizations that break down relationship dimensions like trust, attraction, communication, and security. It's grounded in actual psychology research on body mapping and relationship science. The 3D rendering uses WebGL for smooth interaction, and all data is stored locally for privacy.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "WebGL",
      "D3.js",
      "Tailwind CSS",
      "Zod",
    ],
    category: "tooling",
    featured: true,
    image: "/images/projects/perception.png",
    heroImage: "/images/projects/perception-hero.jpg",
    gallery: [],
    highlights: [
      { title: "3D Body Maps", description: "Interactive WebGL body maps where users paint emotional and physical responses" },
      { title: "Radar Visualizations", description: "Multi-dimensional radar charts breaking down trust, attraction, communication, and more" },
      { title: "Research-Backed", description: "Grounded in psychology research on somatic experiencing and body mapping" },
      { title: "Privacy-First", description: "All data stored locally on device — nothing leaves the browser" },
      { title: "Novel Concept", description: "Unique approach to relationship self-reflection with no direct competitors" },
    ],
    year: "2025–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "app", label: "Next.js App", row: 0, col: 2 },
        { id: "three", label: "Three.js", row: 0, col: 4 },
        { id: "webgl", label: "WebGL Renderer", row: 1, col: 4 },
        { id: "d3", label: "D3.js Charts", row: 1, col: 1 },
        { id: "canvas", label: "Canvas API", row: 1, col: 3 },
        { id: "emotions", label: "Emotion Mapping", row: 2, col: 2 },
        { id: "scoring", label: "Dimension Scoring", row: 2, col: 4 },
        { id: "idb", label: "IndexedDB", row: 3, col: 3 },
      ],
      edges: [
        { from: "app", to: "three", label: "3D Models" },
        { from: "app", to: "d3", label: "Radar Data" },
        { from: "three", to: "webgl", label: "Render Loop" },
        { from: "app", to: "canvas", label: "Paint Events" },
        { from: "canvas", to: "emotions" },
        { from: "webgl", to: "scoring", label: "Region Data" },
        { from: "emotions", to: "idb", label: "Local Write" },
        { from: "scoring", to: "idb" },
      ],
    },
  },
  {
    slug: "office-aesthetics",
    title: "Office Aesthetics",
    tagline: "Curated office products marketplace",
    description:
      "An ecommerce platform for curated office products and workspace accessories. Features product reviews, affiliate integration, wishlists, and a clean shopping experience focused on workspace aesthetics.",
    longDescription:
      "Office Aesthetics is an ecommerce platform built around the idea that your workspace should look and feel intentional. The product catalog is curated — not a dump of everything on Amazon — with editorial reviews, bundle recommendations, and workspace inspiration galleries. The platform handles affiliate product linking, user wishlists, order tracking, and a review system with verified purchases. Built with Nuxt 3 for SSR and MongoDB for the product catalog with flexible schema for different product categories.",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "PayPal API",
      "AWS S3",
    ],
    category: "ecommerce",
    featured: false,
    image: "/images/projects/office-aesthetics-screenshot.png",
    heroImage: "/images/projects/OfficePic3.jpg",
    liveUrl: "https://oa-zeta.vercel.app",
    gallery: [
      "/images/logos/office-aesthetics.webp",
      "/images/projects/OfficePic6.jpg",
      "/images/projects/OfficePic7.jpg",
    ],
    highlights: [
      { title: "Curated Catalog", description: "Hand-picked products with editorial reviews — not a dump of everything on Amazon" },
      { title: "Affiliate Integration", description: "Automated affiliate linking with Amazon and direct brand partnerships" },
      { title: "User Accounts", description: "Wishlists, order history, and personalized recommendations per user" },
      { title: "Bundle System", description: "Smart bundle recommendations and workspace inspiration galleries" },
      { title: "Dev Tooling", description: "Seed scripts generating realistic product data for local development" },
    ],
    year: "2024–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "nuxt", label: "Nuxt 3 Storefront", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", row: 1, col: 2 },
        { id: "paypal", label: "PayPal API", row: 1, col: 4 },
        { id: "affiliate", label: "Affiliate Engine", row: 2, col: 1 },
        { id: "wishlist", label: "Wishlist Manager", row: 2, col: 3 },
        { id: "reviews", label: "Review System", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", row: 3, col: 2 },
        { id: "s3", label: "AWS S3", row: 3, col: 4 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "Cart Ops" },
        { from: "nuxt", to: "paypal", label: "Checkout" },
        { from: "routes", to: "affiliate" },
        { from: "routes", to: "wishlist" },
        { from: "paypal", to: "reviews", label: "Verified" },
        { from: "affiliate", to: "mongo" },
        { from: "wishlist", to: "mongo", label: "Documents" },
        { from: "reviews", to: "s3", label: "Images" },
      ],
    },
  },
  {
    slug: "national-auto-hub",
    title: "National Auto Hub",
    tagline: "Auto parts ecommerce storefront",
    description:
      "A full-featured ecommerce storefront for auto parts and accessories. Includes product browsing, cart and checkout, PayPal payments, user accounts with order history, affiliate program, and a blog — all server-side rendered for SEO.",
    longDescription:
      "National Auto Hub is a production ecommerce site for auto parts. The storefront has full product browsing with categories and variants, a cart system, and checkout with PayPal integration. Users can create accounts to track orders, manage wishlists, and participate in the affiliate program. The blog drives organic traffic with SEO-optimized content. The admin side handles inventory, order management, and promotions. Built with Nuxt 3 for SSR performance, MongoDB for the product catalog, and AWS Lambda for backend processing.",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "PayPal API",
      "AWS Lambda",
    ],
    category: "ecommerce",
    featured: false,
    image: "/images/projects/national-auto-hub.png",
    heroImage: "/images/projects/Car1.png",
    liveUrl: "https://nah-delta.vercel.app",
    gallery: ["/images/projects/Car2.png", "/images/projects/Car3.png"],
    highlights: [
      { title: "Full Ecommerce", description: "Complete flow from product browsing to cart, checkout, and order tracking" },
      { title: "PayPal Payments", description: "Integrated checkout with PayPal and automated order confirmation emails" },
      { title: "User System", description: "Accounts with profiles, wishlists, order history, and saved preferences" },
      { title: "Affiliate Program", description: "Referral tracking with automated payout calculations and reporting" },
      { title: "SEO & Blog", description: "SSR-optimized product pages and blog content driving organic search traffic" },
    ],
    year: "2024–2025",
    status: "active",
    architecture: {
      nodes: [
        { id: "nuxt", label: "Nuxt 3 App", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", row: 1, col: 1 },
        { id: "paypal", label: "PayPal API", row: 1, col: 3 },
        { id: "lambda", label: "AWS Lambda", row: 1, col: 5 },
        { id: "inventory", label: "Inventory Manager", row: 2, col: 2 },
        { id: "orders", label: "Order Pipeline", row: 2, col: 4 },
        { id: "mongo", label: "MongoDB", row: 3, col: 3 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "REST" },
        { from: "nuxt", to: "paypal", label: "Checkout" },
        { from: "nuxt", to: "lambda", label: "Background" },
        { from: "routes", to: "inventory" },
        { from: "paypal", to: "orders", label: "Callbacks" },
        { from: "inventory", to: "mongo", label: "Documents" },
        { from: "orders", to: "mongo" },
      ],
    },
  },
  {
    slug: "subsource",
    title: "Subsource",
    tagline: "Product review and comparison platform",
    description:
      "A review-driven product platform where users can browse, compare, and rate products with verified reviews. Features star ratings, detailed review pages, and user profiles — designed to be a trusted source for product research.",
    longDescription:
      "Subsource is a product review platform built to cut through the noise of fake reviews and paid sponsorships. Users can browse products by category, read and write detailed reviews with star ratings, and compare products side-by-side. The review system tracks verified purchases and surfaces the most helpful reviews. User profiles show review history and credibility scores. The platform also handles receipts and purchase verification to ensure review authenticity. Built with Nuxt 3 for SSR and MongoDB for flexible product and review schemas.",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "Vercel",
    ],
    category: "tooling",
    featured: false,
    image: "/images/projects/subsource-screenshot.png",
    heroImage: "/images/projects/LoginBG.jpg",
    liveUrl: "https://subsource.vercel.app",
    gallery: [
      "/images/logos/subsource.png",
      "/images/projects/aboutPic.webp",
      "/images/projects/subsource.webp",
    ],
    highlights: [
      { title: "Verified Reviews", description: "Purchase receipt validation ensures only real buyers leave reviews" },
      { title: "Multi-Criteria Ratings", description: "Star ratings with detailed breakdowns across quality, value, and durability" },
      { title: "Credibility System", description: "User profiles with review history and trust scores based on verification" },
      { title: "Product Comparison", description: "Side-by-side comparison tools for evaluating competing products" },
      { title: "SEO-First", description: "Server-side rendered for maximum search engine discoverability" },
    ],
    year: "2024–2025",
    status: "active",
    architecture: {
      nodes: [
        { id: "nuxt", label: "Nuxt 3 App", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", row: 1, col: 2 },
        { id: "verify", label: "Verification API", row: 1, col: 4 },
        { id: "reviews", label: "Review Engine", row: 2, col: 1 },
        { id: "compare", label: "Comparison Builder", row: 2, col: 3 },
        { id: "cred", label: "Credibility Scorer", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", row: 3, col: 3 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "REST" },
        { from: "nuxt", to: "verify", label: "Receipts" },
        { from: "routes", to: "reviews", label: "Aggregation" },
        { from: "routes", to: "compare" },
        { from: "verify", to: "cred", label: "Trust Score" },
        { from: "reviews", to: "mongo" },
        { from: "compare", to: "mongo" },
        { from: "cred", to: "mongo" },
      ],
    },
  },
  {
    slug: "custom-software-site",
    title: "Hartecho Custom Software",
    tagline: "Software consultancy marketing site with client portal",
    description:
      "The marketing site for Hartecho's custom software arm. Features service breakdowns, case studies from shipped projects, a portfolio showcase, client onboarding flow, and a portal for managing active engagements.",
    longDescription:
      "This is the client-facing site for Hartecho's custom software services — designed to convert visitors into clients. The site features detailed service pages, case studies with real metrics from the 12+ stores and apps we shipped, a portfolio showcase, and a contact-to-onboarding pipeline. The client portal lets active clients track project status, review milestones, and communicate with the development team. The design emphasizes credibility and professionalism with smooth animations, clean typography, and social proof throughout. Built as part of the Hartecho ecosystem alongside the main ecommerce platform.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zod",
      "Vercel",
    ],
    category: "saas",
    featured: false,
    image: "/images/projects/custom-software-site.png",
    heroImage: "/images/projects/css-hero.webp",
    liveUrl: "https://custom-software-site.vercel.app",
    gallery: [],
    highlights: [
      { title: "Conversion Design", description: "Case studies with real metrics and social proof throughout the funnel" },
      { title: "Onboarding Flow", description: "Multi-step intake pipeline with Zod validation and lead routing" },
      { title: "Dynamic Portfolio", description: "Project showcase with detail pages generated from structured data" },
      { title: "Client Portal", description: "Active clients track project status, milestones, and communicate with the team" },
      { title: "Micro-Interactions", description: "Smooth scroll animations and polished transitions built with Framer Motion" },
    ],
    year: "2025–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "next", label: "Next.js App", row: 0, col: 2 },
        { id: "motion", label: "Framer Motion", row: 0, col: 4 },
        { id: "api", label: "API Routes", row: 1, col: 3 },
        { id: "zod", label: "Zod Validation", row: 1, col: 5 },
        { id: "contact", label: "Contact Pipeline", row: 2, col: 2 },
        { id: "portfolio", label: "Portfolio Engine", row: 2, col: 4 },
        { id: "edge", label: "Vercel Edge Config", row: 3, col: 2 },
        { id: "cdn", label: "Image CDN", row: 3, col: 4 },
      ],
      edges: [
        { from: "next", to: "motion" },
        { from: "next", to: "api", label: "Forms" },
        { from: "api", to: "zod" },
        { from: "api", to: "contact", label: "Lead Routing" },
        { from: "api", to: "portfolio" },
        { from: "contact", to: "edge", label: "Config" },
        { from: "portfolio", to: "cdn", label: "Assets" },
      ],
    },
  },
];
