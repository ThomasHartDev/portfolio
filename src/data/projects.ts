export interface ArchNode {
  id: string;
  label: string;
  subtitle?: string;
  rationale?: string;
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
    liveUrl: "https://www.pixel-wand.com",
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
        { id: "app", label: "Next.js App", subtitle: "Frontend", rationale: "Next.js for the full-stack combo — SSR for the marketing pages, API routes for the backend, all in one deploy.", row: 0, col: 3 },
        { id: "api", label: "API Routes", subtitle: "REST API", rationale: "Next.js API routes keep the backend co-located with the frontend. No separate server to deploy or maintain.", row: 1, col: 2 },
        { id: "webhooks", label: "Stripe Webhooks", subtitle: "Event Handler", rationale: "Stripe pushes subscription events via webhooks — this handler verifies signatures and syncs billing state to the DB.", row: 1, col: 4 },
        { id: "sharp", label: "Sharp Pipeline", subtitle: "Image Processing", rationale: "Sharp over Jimp or ImageMagick — it's the fastest Node.js image processor, backed by libvips. Handles WebP/AVIF natively without loading entire files into memory.", row: 2, col: 2 },
        { id: "billing", label: "Stripe Billing", subtitle: "Payments", rationale: "Stripe is the standard for subscription billing. Handles tiered pricing, usage metering, and invoicing out of the box.", row: 2, col: 4 },
        { id: "redis", label: "Upstash Redis", subtitle: "Rate Limiting", rationale: "Redis for fast rate-limit checks on the free tier — 3 conversions/day tracked by user or IP. Falls back to Postgres if Redis is unavailable.", row: 3, col: 1 },
        { id: "r2", label: "Cloudflare R2", subtitle: "Object Storage", rationale: "R2 over S3 for zero egress fees. Presigned URLs keep files off the server — uploads go straight from browser to bucket.", row: 3, col: 3 },
        { id: "db", label: "PostgreSQL", subtitle: "Database", rationale: "Relational data with strict schemas — user accounts, subscriptions, usage records, and conversion history need referential integrity.", row: 3, col: 5 },
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
      "A data-rich visualization platform for exploring homicide statistics across the US. Features interactive Recharts dashboards, filterable datasets, zodiac analysis, and a provenance schema for data corrections — built for true crime researchers and data enthusiasts.",
    longDescription:
      "MurderData is a full-stack data platform that makes FBI SHR (Supplementary Homicide Report) data explorable and visual. The frontend features 12+ interactive chart types — yearly trends, weapon breakdowns, demographic distributions, solve rates, and a zodiac analysis page. The Hono API backend handles complex SQL aggregations across 800K+ records with Drizzle ORM. A provenance schema tracks field-level data attribution and confidence levels as the foundation for future community contributions. Case detail pages include comments, and the Explore section provides deep statistical drill-downs.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Recharts",
      "Hono",
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
      { title: "Interactive Charts", description: "12+ Recharts visualizations — yearly trends, weapon breakdowns, demographic distributions, and zodiac analysis" },
      { title: "Data Provenance", description: "Community-driven corrections with field-level edit history and source citations" },
      { title: "Advanced Filtering", description: "Complex queries across demographics, geography, weapons, and time periods" },
      { title: "Scale", description: "Raw SQL aggregation queries handling 800K+ SHR records with GROUP BY, COUNT FILTER, and window functions" },
      { title: "Zodiac Analysis", description: "Astrology-based statistical breakdowns that gained traction in the true crime community" },
    ],
    year: "2025–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "ui", label: "Next.js App", subtitle: "Frontend", rationale: "Next.js for SSR — crime data pages need to be crawlable by search engines and share with rich previews.", row: 0, col: 3 },
        { id: "charts", label: "Recharts", subtitle: "Visualization", rationale: "Recharts for the 12+ chart types — yearly trends, weapon breakdowns, zodiac analysis, demographic distributions. Composable React components over D3 for faster iteration.", row: 1, col: 1 },
        { id: "filters", label: "Filter Engine", subtitle: "Query Builder", rationale: "Complex multi-dimension filters (demographics, geography, weapons, time) need a composable query builder that translates to SQL.", row: 1, col: 3 },
        { id: "api", label: "Hono API", subtitle: "REST Server", rationale: "Hono over Express for a lightweight, typed API server. Runs as a separate process from the Next.js frontend with its own route modules.", row: 1, col: 5 },
        { id: "agg", label: "SQL Aggregations", subtitle: "Data Processing", rationale: "Raw SQL with GROUP BY, COUNT FILTER, and window functions — the ORM can't express the complex analytics needed for 800K+ row cross-tabulations.", row: 2, col: 2 },
        { id: "provenance", label: "Provenance Schema", subtitle: "Edit History", rationale: "Schema and Zod validators for field-level data provenance — tracks source attribution, confidence levels, and contributor history. Foundation layer for future community contributions.", row: 2, col: 4 },
        { id: "drizzle", label: "Drizzle ORM", subtitle: "Data Layer", rationale: "Drizzle over Prisma for better raw SQL escape hatches. The aggregation queries need direct SQL access that Prisma makes awkward.", row: 3, col: 2 },
        { id: "db", label: "PostgreSQL", subtitle: "Database", rationale: "Postgres for relational integrity across 800K+ SHR records. Strong aggregation performance with proper indexing on demographics, geography, and time.", row: 3, col: 4 },
      ],
      edges: [
        { from: "ui", to: "charts", label: "Chart Data" },
        { from: "ui", to: "filters" },
        { from: "ui", to: "api", label: "REST" },
        { from: "filters", to: "agg" },
        { from: "api", to: "provenance" },
        { from: "agg", to: "drizzle" },
        { from: "drizzle", to: "db", label: "800K+ Records" },
        { from: "provenance", to: "db" },
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
        { id: "nuxt", label: "Nuxt 3 SSR", subtitle: "Frontend", rationale: "Nuxt 3 over Next.js because the team already had Vue expertise. SSR for SEO on the marketing pages and blog.", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", rationale: "Nuxt server routes give you a built-in API layer — no need for a separate Express server.", row: 1, col: 2 },
        { id: "lambda", label: "AWS Lambda", subtitle: "Serverless", rationale: "Lambda for contact form emails and quote notifications via nodemailer. Pay-per-invocation keeps costs near zero for a small business.", row: 1, col: 4 },
        { id: "blog", label: "Blog Engine", subtitle: "Content", rationale: "In-house blog engine over WordPress or Ghost for full control over SEO markup and design. Content stored in MongoDB for flexible schemas.", row: 2, col: 1 },
        { id: "portal", label: "Customer Portal", subtitle: "Dashboard", rationale: "Clients track projects, invoices, and deliverables in one place. Keeps communication out of email and into a structured flow.", row: 2, col: 3 },
        { id: "invoices", label: "Invoice System", subtitle: "Billing", rationale: "Custom invoicing over Stripe Invoices for more control over branding and line-item flexibility.", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", rationale: "MongoDB for the flexible document model — blog posts, service pages, and client data have very different shapes.", row: 3, col: 2 },
        { id: "s3", label: "AWS S3", subtitle: "File Storage", rationale: "S3 for client deliverables and invoice PDFs. Presigned URLs for secure, time-limited downloads.", row: 3, col: 4 },
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
    liveUrl: "https://perception-two.vercel.app",
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
        { id: "app", label: "Next.js App", subtitle: "Frontend", rationale: "Next.js for the app shell and routing. The 3D interactions are client-side, but SSR helps with the landing and onboarding pages.", row: 0, col: 3 },
        { id: "three", label: "React Three Fiber", subtitle: "3D Body Map", rationale: "Three.js via R3F over Babylon.js for a lighter footprint. Renders 400+ colored particles mapped to body regions using BufferGeometry — inspired by Nummenmaa et al. (2014) body maps research.", row: 1, col: 1 },
        { id: "d3", label: "D3.js Radar", subtitle: "Visualization", rationale: "D3 for the multi-layer radar chart — draws 3 overlapping polygons (self, partner view, meta-perception) across 8 dimensions. Chart.js couldn't handle the custom multi-axis layout.", row: 1, col: 5 },
        { id: "fastify", label: "Fastify API", subtitle: "Backend", rationale: "Fastify over Express for a typed, fast API server. Handles auth, sessions, quiz answers, and partner invites with built-in rate limiting.", row: 2, col: 2 },
        { id: "scoring", label: "Scoring Engine", subtitle: "Shared Package", rationale: "Shared Turborepo package that scores relationships across 8 dimensions (trust, attraction, safety, etc.) from questionnaire responses.", row: 2, col: 4 },
        { id: "local", label: "localStorage", subtitle: "Session Cache", rationale: "localStorage as a fallback when the API is unavailable — sessions persist locally so users don't lose progress if the server is down.", row: 3, col: 1 },
        { id: "prisma", label: "Prisma ORM", subtitle: "Data Layer", rationale: "Prisma for type-safe database access. Schema covers users, sessions, answers, invites, and magic link auth.", row: 3, col: 3 },
        { id: "db", label: "PostgreSQL", subtitle: "Database", rationale: "Postgres for relational quiz data — sessions link two partners, answers reference specific questions, and invites track the pairing flow.", row: 3, col: 5 },
      ],
      edges: [
        { from: "app", to: "three", label: "Particle Map" },
        { from: "app", to: "d3", label: "Radar Data" },
        { from: "app", to: "fastify", label: "REST" },
        { from: "app", to: "local", label: "Fallback" },
        { from: "fastify", to: "scoring", label: "8 Dimensions" },
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
      "Square",
      "Amazon Pay",
      "AWS S3",
      "Klaviyo",
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
        { id: "nuxt", label: "Nuxt 3 Storefront", subtitle: "Frontend", rationale: "Nuxt 3 for server-rendered product pages — crucial for SEO on product listings and editorial reviews.", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", rationale: "Nuxt server routes handle cart operations, product queries, and order management without a separate backend service.", row: 1, col: 2 },
        { id: "payments", label: "Square + Amazon Pay", subtitle: "Payments", rationale: "Dual payment providers — Square for card processing and Amazon Pay for one-click checkout. Broader buyer coverage than a single gateway.", row: 1, col: 4 },
        { id: "affiliate", label: "Affiliate Engine", subtitle: "Tracking", rationale: "Commission-based affiliate tracking with API endpoints for referral management and payout calculations.", row: 2, col: 1 },
        { id: "reviews", label: "Review System", subtitle: "UGC", rationale: "First-party reviews with photo uploads (max 3), helpful votes, and star ratings. Builds trust and original content that helps SEO.", row: 2, col: 3 },
        { id: "klaviyo", label: "Klaviyo", subtitle: "Email Marketing", rationale: "Klaviyo for server-side event tracking — fires 'Placed Order' events and manages the waitlist. Facebook Conversions API integration for purchase attribution.", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", rationale: "MongoDB for the flexible product schema — office accessories, tech gadgets, and furniture all have wildly different attribute sets.", row: 3, col: 2 },
        { id: "s3", label: "AWS S3 + SES", subtitle: "Storage & Email", rationale: "S3 for product images and review photos. SES with MJML templates for transactional emails — order confirmations, shipping updates.", row: 3, col: 4 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "Cart Ops" },
        { from: "nuxt", to: "payments", label: "Checkout" },
        { from: "routes", to: "affiliate" },
        { from: "routes", to: "reviews" },
        { from: "payments", to: "klaviyo", label: "Order Events" },
        { from: "affiliate", to: "mongo" },
        { from: "reviews", to: "s3", label: "Photos" },
        { from: "klaviyo", to: "mongo" },
      ],
    },
  },
  {
    slug: "national-auto-hub",
    title: "National Auto Hub",
    tagline: "Auto parts ecommerce storefront",
    description:
      "A full-featured ecommerce storefront for auto parts and accessories. Includes product browsing, cart and checkout, Square payments, user accounts with order history, affiliate program, and a blog — all server-side rendered for SEO.",
    longDescription:
      "National Auto Hub is a production ecommerce site for auto parts. The storefront has full product browsing with categories and variants, a cart system, and checkout with Square integration. Users can create accounts to track orders and participate in the affiliate program. The blog drives organic traffic with SEO-optimized content. Built with Nuxt 3 for SSR performance and MongoDB for the product catalog with flexible schemas for different part categories.",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
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
      { title: "Square Payments", description: "Integrated checkout with Square for card processing and order confirmation" },
      { title: "User System", description: "Accounts with profiles, wishlists, order history, and saved preferences" },
      { title: "Affiliate Program", description: "Referral tracking with automated payout calculations and reporting" },
      { title: "SEO & Blog", description: "SSR-optimized product pages and blog content driving organic search traffic" },
    ],
    year: "2024–2025",
    status: "active",
    architecture: {
      nodes: [
        { id: "nuxt", label: "Nuxt 3 App", subtitle: "Frontend", rationale: "Nuxt 3 for SSR — auto parts product pages need to rank on Google. Consistent with the other ecommerce stores in the portfolio.", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", rationale: "Built-in Nuxt server routes for the product API, cart logic, and order management. Keeps everything in one deployment.", row: 1, col: 2 },
        { id: "square", label: "Square Checkout", subtitle: "Payments", rationale: "Square for card processing — handles checkout, order confirmation, and payment callbacks.", row: 1, col: 4 },
        { id: "blog", label: "Blog Engine", subtitle: "Content & SEO", rationale: "In-house blog for SEO content targeting auto parts searches. DIY guides and product breakdowns drive organic traffic.", row: 2, col: 1 },
        { id: "reviews", label: "Review System", subtitle: "Ratings", rationale: "Product reviews with star ratings to build buyer confidence. Auto parts buyers rely heavily on reviews for fitment confirmation.", row: 2, col: 3 },
        { id: "affiliate", label: "Affiliate Engine", subtitle: "Referrals", rationale: "Referral tracking with commission management — partners earn on referred purchases.", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", rationale: "MongoDB for flexible product documents — auto parts have dozens of fitment attributes that vary wildly between categories.", row: 3, col: 2 },
        { id: "s3", label: "AWS S3", subtitle: "File Storage", rationale: "S3 for product images and category assets. Consistent with the storage pattern across the ecommerce platforms.", row: 3, col: 4 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "REST" },
        { from: "nuxt", to: "square", label: "Checkout" },
        { from: "routes", to: "blog" },
        { from: "routes", to: "reviews" },
        { from: "square", to: "affiliate", label: "Referral Track" },
        { from: "blog", to: "mongo" },
        { from: "reviews", to: "mongo" },
        { from: "affiliate", to: "s3", label: "Assets" },
      ],
    },
  },
  {
    slug: "subsource",
    title: "Subsource",
    tagline: "B2B contractor and supplier review directory",
    description:
      "A review platform for the commercial construction industry — contractors, subcontractors, suppliers, and agencies can be searched, reviewed, and compared. Features Google OAuth, business profile claims, star ratings with business replies, and category-based search across the trades.",
    longDescription:
      "Subsource is a B2B directory built to bring accountability to the commercial construction industry. Businesses can search for contractors, subcontractors, suppliers, and agencies by category, leave detailed reviews with star ratings, and browse business profiles. The review system supports business replies so both sides are represented. Companies can claim their profiles to manage their listings and respond to feedback. Google OAuth makes onboarding frictionless. Built with Nuxt 3 for SSR and search engine visibility.",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "Google OAuth",
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
      { title: "B2B Directory", description: "Search contractors, subcontractors, suppliers, and agencies across the construction trades" },
      { title: "Review System", description: "Star ratings with detailed reviews and business replies — both sides get a voice" },
      { title: "Profile Claims", description: "Businesses claim their listings to manage profiles and respond to feedback" },
      { title: "Google OAuth", description: "One-click sign-in with Google and ReCAPTCHA v3 for frictionless, secure onboarding" },
      { title: "SEO-First", description: "Server-side rendered for maximum search engine discoverability of business listings" },
    ],
    year: "2024–2025",
    status: "active",
    architecture: {
      nodes: [
        { id: "nuxt", label: "Nuxt 3 App", subtitle: "Frontend", rationale: "Nuxt 3 for SSR — business profile pages need to rank on Google so contractors can be found by potential partners.", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", rationale: "Nuxt server routes for the review API, search endpoints, and profile management. No separate backend needed.", row: 1, col: 2 },
        { id: "oauth", label: "Google OAuth", subtitle: "Authentication", rationale: "Google OAuth for one-click sign-in — construction professionals don't want to create yet another account. ReCAPTCHA v3 blocks bot signups.", row: 1, col: 4 },
        { id: "search", label: "Search Engine", subtitle: "Discovery", rationale: "Category-based search across 4 business types (contractors, subcontractors, suppliers, agencies) with 50+ construction trade tags.", row: 2, col: 1 },
        { id: "reviews", label: "Review System", subtitle: "Ratings & Replies", rationale: "Star ratings with detailed reviews and business reply support. Both sides of the relationship get a voice, unlike one-sided review sites.", row: 2, col: 3 },
        { id: "profiles", label: "Business Profiles", subtitle: "Claims & Listings", rationale: "Businesses can claim profiles to manage their listing, respond to reviews, and control their public presence on the platform.", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", rationale: "MongoDB for flexible business schemas — contractors, suppliers, and agencies have very different profile attributes and category tags.", row: 3, col: 3 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "REST" },
        { from: "nuxt", to: "oauth", label: "Sign In" },
        { from: "routes", to: "search" },
        { from: "routes", to: "reviews" },
        { from: "oauth", to: "profiles", label: "Account" },
        { from: "search", to: "mongo", label: "Queries" },
        { from: "reviews", to: "mongo" },
        { from: "profiles", to: "mongo" },
      ],
    },
  },
  {
    slug: "custom-software-site",
    title: "Hartecho Custom Software",
    tagline: "Software consultancy marketing site",
    description:
      "The marketing site for Hartecho's custom software services. Features service breakdowns, case studies with real metrics from shipped projects, a contact form for project inquiries, FAQ section, and polished scroll animations throughout.",
    longDescription:
      "This is the client-facing site for Hartecho's custom software services — designed to convert visitors into clients. The site features detailed service pages, case studies with real metrics from the 12+ stores and apps we shipped, a process breakdown, tech stack showcase, and client testimonials. The contact form collects project scope, budget range, and details upfront. The design emphasizes credibility and professionalism with smooth Framer Motion animations, clean typography, and social proof throughout. Built as part of the Hartecho ecosystem alongside the main ecommerce platform.",
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
      { title: "Service Showcase", description: "Detailed service pages covering web apps, mobile, AI, and system integrations" },
      { title: "Case Studies", description: "6 detailed case studies with real client metrics — cost savings, time reductions, engagement lifts" },
      { title: "FAQ Schema", description: "Structured FAQ data with JSON-LD markup for rich search results" },
      { title: "Micro-Interactions", description: "Smooth scroll animations and polished transitions built with Framer Motion" },
    ],
    year: "2025–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "next", label: "Next.js 16", subtitle: "SSR Frontend", rationale: "Next.js with App Router for the marketing site — SSR for SEO on service pages and case studies, static generation for the content-heavy pages.", row: 0, col: 3 },
        { id: "motion", label: "Framer Motion", subtitle: "Animations", rationale: "Framer Motion over CSS animations for orchestrated scroll-triggered sequences. The hero parallax, case study reveals, and stat counter animations need precise timing control.", row: 1, col: 2 },
        { id: "pages", label: "Static Pages", subtitle: "Services & Work", rationale: "Service breakdowns, case studies, about page, and contact — all statically generated at build time for fast loads and zero server cost.", row: 1, col: 4 },
        { id: "contact", label: "Contact Form", subtitle: "Lead Capture", rationale: "Multi-field form collecting name, email, service type, budget range, and project details. Qualifies leads upfront so the first conversation is productive.", row: 2, col: 2 },
        { id: "vercel", label: "Vercel", subtitle: "Edge Hosting", rationale: "Vercel for zero-config deployment with edge CDN, automatic HTTPS, and preview deployments on every push.", row: 2, col: 4 },
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
