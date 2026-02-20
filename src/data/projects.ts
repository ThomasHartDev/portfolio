export interface ArchNode {
  id: string;
  label: string;
  subtitle?: string;
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
        { id: "app", label: "Next.js 15", subtitle: "Frontend", row: 0, col: 3 },
        { id: "api", label: "API Routes", subtitle: "REST API", row: 1, col: 2 },
        { id: "webhooks", label: "Stripe Webhooks", subtitle: "Event Handler", row: 1, col: 4 },
        { id: "sharp", label: "Sharp Pipeline", subtitle: "Image Processing", row: 2, col: 2 },
        { id: "billing", label: "Stripe Billing", subtitle: "Payments", row: 2, col: 4 },
        { id: "redis", label: "Upstash Redis", subtitle: "Rate Limiting", row: 3, col: 1 },
        { id: "r2", label: "Cloudflare R2", subtitle: "Object Storage", row: 3, col: 3 },
        { id: "db", label: "PostgreSQL", subtitle: "Database", row: 3, col: 5 },
      ],
      edges: [
        { from: "app", to: "api", label: "REST" },
        { from: "app", to: "webhooks", label: "Events" },
        { from: "api", to: "sharp", label: "Image Buffer" },
        { from: "api", to: "redis", label: "Rate Check" },
        { from: "webhooks", to: "billing", label: "Subscriptions" },
        { from: "sharp", to: "r2", label: "Presigned Upload" },
        { from: "billing", to: "db", label: "Prisma" },
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
      "Hono",
      "Recharts",
      "Tailwind CSS",
      "PostgreSQL",
      "Drizzle",
      "Zod",
    ],
    category: "data",
    featured: true,
    image: "/images/projects/murderdata.png",
    heroImage: "/images/projects/murderdata-hero.jpg",
    gallery: [],
    highlights: [
      { title: "Data Visualizations", description: "Interactive Recharts dashboards with trend analysis and demographic breakdowns" },
      { title: "Data Provenance", description: "Community-driven corrections with field-level edit history and source citations" },
      { title: "Advanced Filtering", description: "Complex queries across demographics, geography, weapons, and time periods" },
      { title: "Scale", description: "Optimized raw SQL aggregation queries handling 800K+ records" },
      { title: "Zodiac Analysis", description: "Astrology-based statistical breakdowns that gained traction in the true crime community" },
    ],
    year: "2025–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "ui", label: "Next.js App", subtitle: "Frontend", row: 0, col: 3 },
        { id: "charts", label: "Recharts", subtitle: "Visualization", row: 1, col: 1 },
        { id: "api", label: "Hono API", subtitle: "REST Server", row: 1, col: 3 },
        { id: "provenance", label: "Provenance Tracker", subtitle: "Edit History", row: 1, col: 5 },
        { id: "agg", label: "SQL Aggregations", subtitle: "Data Processing", row: 2, col: 2 },
        { id: "submissions", label: "Community Layer", subtitle: "Contributions", row: 2, col: 4 },
        { id: "db", label: "PostgreSQL", subtitle: "Database", row: 3, col: 3 },
      ],
      edges: [
        { from: "ui", to: "charts", label: "Chart Data" },
        { from: "ui", to: "api", label: "REST" },
        { from: "api", to: "provenance", label: "Field History" },
        { from: "api", to: "agg", label: "Raw SQL" },
        { from: "provenance", to: "submissions" },
        { from: "agg", to: "db", label: "800K+ Records" },
        { from: "submissions", to: "db", label: "Drizzle" },
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
      "Pinia",
      "Klaviyo",
      "Vercel",
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
        { id: "nuxt", label: "Nuxt 3 SSR", subtitle: "Frontend", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", row: 1, col: 2 },
        { id: "pinia", label: "Pinia Store", subtitle: "State Management", row: 1, col: 4 },
        { id: "blog", label: "Blog Engine", subtitle: "Content & SEO", row: 2, col: 1 },
        { id: "forms", label: "Form Handlers", subtitle: "Lead Capture", row: 2, col: 3 },
        { id: "klaviyo", label: "Klaviyo", subtitle: "Email Marketing", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB Atlas", subtitle: "Database", row: 3, col: 3 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "SSR" },
        { from: "nuxt", to: "pinia", label: "Reactive State" },
        { from: "routes", to: "blog" },
        { from: "routes", to: "forms" },
        { from: "routes", to: "klaviyo", label: "Waitlist" },
        { from: "blog", to: "mongo", label: "Mongoose" },
        { from: "forms", to: "mongo" },
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
      "D3.js",
      "Fastify",
      "Prisma",
      "PostgreSQL",
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
        { id: "app", label: "Next.js App", subtitle: "Frontend", row: 0, col: 3 },
        { id: "three", label: "Three.js", subtitle: "3D Body Map", row: 1, col: 1 },
        { id: "d3", label: "D3.js Radar", subtitle: "Visualization", row: 1, col: 3 },
        { id: "scoring", label: "Scoring Engine", subtitle: "Shared Package", row: 1, col: 5 },
        { id: "fastify", label: "Fastify API", subtitle: "Backend", row: 2, col: 2 },
        { id: "local", label: "localStorage", subtitle: "Session Cache", row: 2, col: 4 },
        { id: "prisma", label: "Prisma ORM", subtitle: "Data Layer", row: 3, col: 2 },
        { id: "db", label: "PostgreSQL", subtitle: "Database", row: 3, col: 4 },
      ],
      edges: [
        { from: "app", to: "three", label: "Particle Map" },
        { from: "app", to: "d3", label: "Radar Data" },
        { from: "app", to: "scoring", label: "8 Dimensions" },
        { from: "app", to: "fastify", label: "REST" },
        { from: "app", to: "local", label: "Session Fallback" },
        { from: "fastify", to: "prisma" },
        { from: "prisma", to: "db" },
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
      "PayPal",
      "Amazon Pay",
      "Square",
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
        { id: "nuxt", label: "Nuxt 3 Storefront", subtitle: "Frontend", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", row: 1, col: 2 },
        { id: "payments", label: "Payment Gateway", subtitle: "PayPal / Amazon / Square", row: 1, col: 4 },
        { id: "affiliate", label: "Affiliate Engine", subtitle: "Referral Tracking", row: 2, col: 1 },
        { id: "wishlist", label: "Wishlist Manager", subtitle: "User Prefs", row: 2, col: 3 },
        { id: "reviews", label: "Review System", subtitle: "UGC", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", row: 3, col: 2 },
        { id: "s3", label: "AWS S3 + SES", subtitle: "Storage & Email", row: 3, col: 4 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "Cart Ops" },
        { from: "nuxt", to: "payments", label: "Checkout" },
        { from: "routes", to: "affiliate" },
        { from: "routes", to: "wishlist" },
        { from: "payments", to: "reviews", label: "Verified" },
        { from: "affiliate", to: "mongo" },
        { from: "wishlist", to: "mongo", label: "Mongoose" },
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
      "PayPal",
      "Square",
      "AWS S3",
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
        { id: "nuxt", label: "Nuxt 3 App", subtitle: "Frontend", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", row: 1, col: 2 },
        { id: "payments", label: "Payment Gateway", subtitle: "PayPal / Square", row: 1, col: 4 },
        { id: "inventory", label: "Inventory Manager", subtitle: "Stock & Variants", row: 2, col: 1 },
        { id: "orders", label: "Order Pipeline", subtitle: "Fulfillment", row: 2, col: 3 },
        { id: "affiliate", label: "Affiliate Engine", subtitle: "Referrals", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", row: 3, col: 2 },
        { id: "s3", label: "AWS S3", subtitle: "File Storage", row: 3, col: 4 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "REST" },
        { from: "nuxt", to: "payments", label: "Checkout" },
        { from: "routes", to: "inventory" },
        { from: "routes", to: "affiliate" },
        { from: "payments", to: "orders", label: "Callbacks" },
        { from: "inventory", to: "mongo", label: "Mongoose" },
        { from: "orders", to: "mongo" },
        { from: "orders", to: "s3", label: "Assets" },
      ],
    },
  },
  {
    slug: "subsource",
    title: "Subsource",
    tagline: "B2B subcontractor and supplier marketplace",
    description:
      "A B2B marketplace connecting agencies, contractors, subcontractors, and suppliers. Features business profiles, review system with replies, Google OAuth, and search — designed to help businesses find and vet trade partners.",
    longDescription:
      "Subsource is a B2B marketplace built to connect the fragmented world of contractors, subcontractors, and suppliers. Businesses can create profiles, claim listings, and build reputation through reviews from verified partners. The search and discovery engine lets users filter by category, location, and rating to find the right partner. Google OAuth makes onboarding frictionless. The review system supports business replies so both sides of the relationship are represented. Built with Nuxt 3 for SSR and MongoDB for flexible business and review schemas.",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "Google OAuth",
      "Chart.js",
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
      { title: "B2B Marketplace", description: "Connects agencies, contractors, subcontractors, and suppliers in one platform" },
      { title: "Review System", description: "Star ratings with business replies and detailed breakdowns" },
      { title: "Google OAuth", description: "One-click sign-in with Google for frictionless onboarding" },
      { title: "Search & Discovery", description: "Browse and filter businesses by category, location, and ratings" },
      { title: "SEO-First", description: "Server-side rendered for maximum search engine discoverability" },
    ],
    year: "2024–2025",
    status: "active",
    architecture: {
      nodes: [
        { id: "nuxt", label: "Nuxt 3 App", subtitle: "Frontend", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", row: 1, col: 2 },
        { id: "oauth", label: "Google OAuth", subtitle: "Authentication", row: 1, col: 4 },
        { id: "search", label: "Search Engine", subtitle: "Discovery", row: 2, col: 1 },
        { id: "reviews", label: "Review System", subtitle: "Ratings & Replies", row: 2, col: 3 },
        { id: "profiles", label: "Business Profiles", subtitle: "Claims & Listings", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", row: 3, col: 3 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "REST" },
        { from: "nuxt", to: "oauth", label: "Sign In" },
        { from: "routes", to: "search" },
        { from: "routes", to: "reviews" },
        { from: "oauth", to: "profiles", label: "Account" },
        { from: "search", to: "mongo", label: "Queries" },
        { from: "reviews", to: "mongo", label: "Mongoose" },
        { from: "profiles", to: "mongo" },
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
      { title: "Service Pages", description: "Detailed breakdowns of capabilities with testimonials and trust signals" },
      { title: "Portfolio Showcase", description: "Project gallery highlighting shipped work across 12+ client engagements" },
      { title: "Micro-Interactions", description: "Smooth scroll animations and polished transitions built with Framer Motion" },
      { title: "SSR Performance", description: "Server-side rendered with Next.js for fast loads and SEO visibility" },
    ],
    year: "2025–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "next", label: "Next.js 16", subtitle: "SSR Frontend", row: 0, col: 3 },
        { id: "motion", label: "Framer Motion", subtitle: "Animations", row: 1, col: 2 },
        { id: "pages", label: "Static Pages", subtitle: "Services & Work", row: 1, col: 4 },
        { id: "contact", label: "Contact Page", subtitle: "Lead Capture", row: 2, col: 2 },
        { id: "vercel", label: "Vercel", subtitle: "Edge Hosting", row: 2, col: 4 },
      ],
      edges: [
        { from: "next", to: "motion" },
        { from: "next", to: "pages" },
        { from: "pages", to: "contact" },
        { from: "next", to: "vercel", label: "Deploy" },
      ],
    },
  },
];
