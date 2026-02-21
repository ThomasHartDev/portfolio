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
    tagline: "Image optimization SaaS with SSIM-based compression",
    description:
      "A production SaaS platform for image optimization — format conversion, SSIM-based binary-search compression, and batch processing. Handles conversions with Stripe billing, R2 storage, Upstash Redis rate limiting, and NextAuth session management.",
    longDescription:
      "PixelWand started as a tool I needed myself — a fast, no-nonsense image optimizer that could handle bulk conversions without quality loss. It uses SSIM (Structural Similarity Index) with a binary-search algorithm to find the optimal compression level — testing quality thresholds iteratively until it hits the target SSIM score with minimal file size. The pipeline processes images through WebP, AVIF, and PNG optimization with Sharp. The backend handles presigned URL uploads to Cloudflare R2, server-side processing, and automatic cleanup. Stripe handles subscriptions with usage-based billing. Free tier users get 3 conversions/day enforced by Upstash Redis rate limiting with Postgres fallback. NextAuth manages user sessions and account linking.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "Stripe",
      "Cloudflare R2",
      "Upstash Redis",
      "Sharp",
      "NextAuth",
    ],
    category: "saas",
    featured: true,
    image: "/images/projects/pixel-wand.png",
    heroImage: "/images/projects/pixelwand-hero.png",
    liveUrl: "https://www.pixel-wand.com",
    gallery: ["/images/logos/pixel-wand.png"],
    highlights: [
      { title: "SaaS Billing", description: "Full Stripe integration with tiered subscriptions and usage-based billing" },
      { title: "Rate Limiting", description: "Dual-layer rate limiting with Upstash Redis primary and Postgres fallback — 3 free conversions/day" },
      { title: "Serverless Uploads", description: "Presigned URL uploads to Cloudflare R2 — zero server-side file handling" },
      { title: "SSIM Compression", description: "Binary-search algorithm iterates compression levels to hit target SSIM score with minimal file size" },
      { title: "Production CI/CD", description: "Deployed on Vercel with automated builds, type checking, and monitoring" },
    ],
    year: "2025",
    status: "active",
    architecture: {
      nodes: [
        { id: "app", label: "Next.js App", subtitle: "Frontend", rationale: "Next.js for the full-stack combo — SSR for the marketing pages, API routes for the backend, all in one deploy.", row: 0, col: 3 },
        { id: "auth", label: "NextAuth", subtitle: "Sessions", rationale: "NextAuth handles user sessions, account linking, and auth state. Plugs directly into the Next.js middleware layer.", row: 1, col: 1 },
        { id: "api", label: "API Routes", subtitle: "REST API", rationale: "Next.js API routes keep the backend co-located with the frontend. No separate server to deploy or maintain.", row: 1, col: 3 },
        { id: "webhooks", label: "Stripe Webhooks", subtitle: "Event Handler", rationale: "Stripe pushes subscription events via webhooks — this handler verifies signatures and syncs billing state to the DB.", row: 1, col: 5 },
        { id: "sharp", label: "Sharp Pipeline", subtitle: "Image Processing", rationale: "Sharp over Jimp or ImageMagick — it's the fastest Node.js image processor, backed by libvips. SSIM binary-search finds optimal compression per image.", row: 2, col: 2 },
        { id: "billing", label: "Stripe Billing", subtitle: "Payments", rationale: "Stripe is the standard for subscription billing. Handles tiered pricing, usage metering, and invoicing out of the box.", row: 2, col: 4 },
        { id: "redis", label: "Upstash Redis", subtitle: "Rate Limiting", rationale: "Redis for fast rate-limit checks on the free tier — 3 conversions/day tracked by user or IP. Falls back to Postgres if Redis is unavailable.", row: 3, col: 1 },
        { id: "r2", label: "Cloudflare R2", subtitle: "Object Storage", rationale: "R2 over S3 for zero egress fees. Presigned URLs keep files off the server — uploads go straight from browser to bucket.", row: 3, col: 3 },
        { id: "db", label: "PostgreSQL", subtitle: "Database", rationale: "Relational data with strict schemas — user accounts, subscriptions, usage records, and conversion history need referential integrity.", row: 3, col: 5 },
      ],
      edges: [
        { from: "app", to: "auth", label: "Sessions" },
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
      "A data platform for exploring US homicide statistics. 890K+ FBI SHR records queried through 25 API endpoints across 18 Drizzle tables — interactive Recharts dashboards, multi-dimension filtering, zodiac analysis, and a provenance schema for field-level data attribution.",
    longDescription:
      "MurderData is a Turborepo monorepo (apps/web, apps/api, packages/db, packages/shared) that makes FBI SHR (Supplementary Homicide Report) data explorable and visual. The Next.js frontend features 12+ interactive chart types — yearly trends, weapon breakdowns, demographic distributions, solve rates, and a zodiac analysis page. The Hono API backend exposes 25 endpoints (15 stats, 5 people, 5 cases) handling complex SQL aggregations across 890K+ records with Drizzle ORM across 18 tables. A provenance schema with Zod validators tracks field-level source attribution and confidence levels. Case detail pages include comments, and the Explore section provides deep statistical drill-downs.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Recharts",
      "Hono",
      "Tailwind CSS",
      "PostgreSQL",
      "Drizzle",
      "Zod",
      "Turborepo",
    ],
    category: "data",
    featured: true,
    image: "/images/projects/murderdata.png",
    heroImage: "/images/projects/murderdata-hero.jpg",
    gallery: [],
    highlights: [
      { title: "Interactive Charts", description: "12+ Recharts visualizations — yearly trends, weapon breakdowns, demographic distributions, and zodiac analysis" },
      { title: "Data Provenance", description: "Field-level Zod schema tracking source attribution, confidence levels, and contributor history" },
      { title: "Advanced Filtering", description: "Complex queries across demographics, geography, weapons, and time periods" },
      { title: "Scale", description: "Raw SQL aggregation queries handling 890K+ SHR records across 18 Drizzle tables with GROUP BY, COUNT FILTER, and window functions" },
      { title: "Monorepo", description: "Turborepo workspace — apps/web, apps/api, packages/db, packages/shared — with shared types and independent deploys" },
    ],
    year: "2025–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "ui", label: "Next.js App", subtitle: "Frontend", rationale: "Next.js for SSR — crime data pages need to be crawlable by search engines and share with rich previews.", row: 0, col: 3 },
        { id: "charts", label: "Recharts", subtitle: "Visualization", rationale: "Recharts for the 12+ chart types — yearly trends, weapon breakdowns, zodiac analysis, demographic distributions. Composable React components over D3 for faster iteration.", row: 1, col: 1 },
        { id: "filters", label: "Filter Engine", subtitle: "Query Builder", rationale: "Complex multi-dimension filters (demographics, geography, weapons, time) need a composable query builder that translates to SQL.", row: 1, col: 3 },
        { id: "api", label: "Hono API", subtitle: "25 Endpoints", rationale: "Hono over Express for a lightweight, typed API server. 25 route handlers (15 stats + 5 people + 5 cases) in a separate Turborepo package.", row: 1, col: 5 },
        { id: "agg", label: "SQL Aggregations", subtitle: "Data Processing", rationale: "Raw SQL with GROUP BY, COUNT FILTER, and window functions — the ORM can't express the complex analytics needed for 890K+ row cross-tabulations.", row: 2, col: 2 },
        { id: "provenance", label: "Provenance Schema", subtitle: "Data Attribution", rationale: "Zod validators and Drizzle schema for field-level provenance — tracks source attribution, confidence levels, and contributor history per record.", row: 2, col: 4 },
        { id: "drizzle", label: "Drizzle ORM", subtitle: "18 Tables", rationale: "Drizzle over Prisma for better raw SQL escape hatches. 18 tables covering SHR records, demographics, geography, and provenance metadata.", row: 3, col: 2 },
        { id: "db", label: "PostgreSQL", subtitle: "890K+ Records", rationale: "Postgres for relational integrity across 890K+ SHR records. Strong aggregation performance with proper indexing on demographics, geography, and time.", row: 3, col: 4 },
      ],
      edges: [
        { from: "ui", to: "charts", label: "Chart Data" },
        { from: "ui", to: "filters" },
        { from: "ui", to: "api", label: "REST" },
        { from: "filters", to: "agg" },
        { from: "api", to: "provenance" },
        { from: "agg", to: "drizzle" },
        { from: "drizzle", to: "db", label: "890K+ Records" },
        { from: "provenance", to: "db" },
      ],
    },
  },
  {
    slug: "hartecho-site",
    title: "Hartecho",
    tagline: "Full-stack marketing platform with blog and form builder",
    description:
      "The main website for Hartecho — a software company I co-founded. Marketing site with SSR pages, an integrated blog engine, a drag-and-drop form builder using vuedraggable, contact form via AWS Lambda, Klaviyo email marketing, and Meta Pixel conversion tracking.",
    longDescription:
      "Hartecho is the software company I co-founded, and this is its digital home. The public-facing site handles SEO-optimized marketing pages (services, about, portfolio), a dynamic blog engine backed by MongoDB, and a drag-and-drop form builder built with vuedraggable that lets us create custom intake forms without code changes. The contact form fires through AWS Lambda (nodemailer) to keep costs near zero. Klaviyo handles email marketing campaigns and subscriber management, while Meta Pixel tracks conversion events for ad attribution. Files go to S3 and transactional emails through SES. Built with Nuxt 3 for SSR performance and MongoDB for flexible document storage.",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "AWS Lambda",
      "AWS S3",
      "AWS SES",
      "Klaviyo",
      "vuedraggable",
    ],
    category: "tooling",
    featured: true,
    image: "/images/projects/hartecho-live.png",
    heroImage: "/images/projects/hartecho-hero.webp",
    liveUrl: "https://hartecho.com",
    gallery: ["/images/logos/hartecho.webp"],
    highlights: [
      { title: "Marketing & SEO", description: "Full marketing site with SSR pages — services, about, portfolio — optimized for search visibility" },
      { title: "Blog Engine", description: "Integrated blog with MongoDB-backed content management driving organic traffic" },
      { title: "Form Builder", description: "Drag-and-drop custom form builder using vuedraggable — create intake forms without code changes" },
      { title: "Klaviyo Integration", description: "Email marketing campaigns, subscriber management, and automated flows for lead nurturing" },
      { title: "Real Business", description: "Built and operated as a real company serving paying clients — not a demo project" },
    ],
    year: "2023–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "nuxt", label: "Nuxt 3 SSR", subtitle: "Frontend", rationale: "Nuxt 3 over Next.js because the team already had Vue expertise. SSR for SEO on the marketing pages and blog.", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", rationale: "Nuxt server routes give you a built-in API layer — no need for a separate Express server.", row: 1, col: 2 },
        { id: "lambda", label: "AWS Lambda", subtitle: "Email & Notifications", rationale: "Lambda for contact form emails via nodemailer. Pay-per-invocation keeps costs near zero for a small business site.", row: 1, col: 4 },
        { id: "blog", label: "Blog Engine", subtitle: "Content", rationale: "In-house blog engine over WordPress or Ghost for full control over SEO markup and design. Content stored in MongoDB for flexible schemas.", row: 2, col: 1 },
        { id: "forms", label: "Form Builder", subtitle: "vuedraggable", rationale: "Drag-and-drop form builder using vuedraggable — lets us create custom client intake forms without redeploying. Form submissions stored in MongoDB.", row: 2, col: 3 },
        { id: "klaviyo", label: "Klaviyo + Meta Pixel", subtitle: "Marketing & Tracking", rationale: "Klaviyo for email campaigns and subscriber flows. Meta Pixel fires conversion events for Facebook ad attribution and retargeting.", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", rationale: "MongoDB for the flexible document model — blog posts, form submissions, and service pages have very different shapes.", row: 3, col: 2 },
        { id: "s3", label: "AWS S3 + SES", subtitle: "Storage & Email", rationale: "S3 for file uploads and assets. SES for transactional emails — order confirmations, form submission receipts.", row: 3, col: 4 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "SSR" },
        { from: "nuxt", to: "lambda", label: "Contact" },
        { from: "routes", to: "blog" },
        { from: "routes", to: "forms" },
        { from: "lambda", to: "s3", label: "Email/Files" },
        { from: "blog", to: "mongo" },
        { from: "forms", to: "mongo", label: "Form Data" },
        { from: "nuxt", to: "klaviyo", label: "Events" },
      ],
    },
  },
  {
    slug: "perception",
    title: "Perception",
    tagline: "Scientific relationship perception tool",
    description:
      "A scientifically-grounded tool for visualizing how couples perceive their relationships. Features a 32-question quiz across 8 dimensions, 3D particle body maps rendered with Three.js, and multi-layer D3.js radar charts comparing self-perception vs. partner perception.",
    longDescription:
      "Perception grew out of an interest in how people experience relationships differently. Partners take a quiz independently — 32 questions across 8 psychological dimensions (emotional-security, communication, empathic-accuracy, conflict-resolution, intimacy, autonomy, shared-identity, appreciation) — then the system scores responses and visualizes gaps between self-image and partner perception. The 3D body map uses React Three Fiber to render 400+ colored particles mapped to body regions — inspired by Nummenmaa et al. (2014) research on bodily maps of emotions. D3.js draws multi-layer radar charts overlaying self, partner, and meta-perception scores. The Fastify backend handles auth (email/password, magic links, Google OAuth), sessions, and partner invites, with Prisma/Postgres storing all quiz data. Built as a 6-package Turborepo (web, server, db, shared, monitor, scaler).",
    techStack: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "D3.js",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Zod",
      "Turborepo",
      "Google OAuth",
    ],
    category: "tooling",
    featured: true,
    image: "/images/projects/perception.png",
    heroImage: "/images/projects/perception-hero.jpg",
    liveUrl: "https://perception-two.vercel.app",
    gallery: [],
    highlights: [
      { title: "3D Body Maps", description: "400+ colored particles mapped to body regions via React Three Fiber — inspired by Nummenmaa et al. (2014) research" },
      { title: "Radar Visualizations", description: "Multi-layer D3.js radar overlaying self, partner, and meta-perception scores across 8 dimensions" },
      { title: "Research-Backed", description: "32 questions derived from ECR-R, Gottman, ISOS, Sternberg, and Ickes frameworks across 8 psychological dimensions" },
      { title: "Triple Auth", description: "Email/password + magic link (Resend) + Google OAuth — three auth methods with JWT refresh tokens" },
      { title: "Monorepo", description: "6-package Turborepo — web, server, db, shared, monitor, scaler — with shared scoring logic and independent deploys" },
    ],
    year: "2025–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "app", label: "Next.js App", subtitle: "Frontend", rationale: "Next.js for the app shell and routing. The 3D interactions are client-side, but SSR helps with the landing and onboarding pages.", row: 0, col: 3 },
        { id: "three", label: "React Three Fiber", subtitle: "3D Body Map", rationale: "Three.js via R3F over Babylon.js for a lighter footprint. Renders 400+ colored particles mapped to body regions using BufferGeometry — inspired by Nummenmaa et al. (2014) body maps research.", row: 1, col: 1 },
        { id: "d3", label: "D3.js Radar", subtitle: "Visualization", rationale: "D3 for the multi-layer radar chart — draws 3 overlapping polygons (self, partner view, meta-perception) across 8 dimensions. Chart.js couldn't handle the custom multi-axis layout.", row: 1, col: 5 },
        { id: "fastify", label: "Fastify API", subtitle: "Backend", rationale: "Fastify over Express for a typed, fast API server. Handles 3 auth methods (password, magic link, Google OAuth), JWT refresh tokens, sessions, and partner invites.", row: 2, col: 2 },
        { id: "scoring", label: "Scoring Engine", subtitle: "Shared Package", rationale: "Shared Turborepo package that scores relationships across 8 dimensions (emotional-security, communication, empathic-accuracy, conflict-resolution, intimacy, autonomy, shared-identity, appreciation).", row: 2, col: 4 },
        { id: "local", label: "localStorage", subtitle: "Session Cache", rationale: "localStorage as a fallback when the API is unavailable — sessions persist locally so users don't lose progress if the server is down.", row: 3, col: 1 },
        { id: "prisma", label: "Prisma ORM", subtitle: "Data Layer", rationale: "Prisma for type-safe database access. Schema covers users, sessions, answers, invites, magic links, refresh tokens, and OAuth accounts.", row: 3, col: 3 },
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
      "A full ecommerce platform for curated office products and workspace accessories. Product reviews with photos, affiliate program with commission tracking, USPS shipping integration, Square + Amazon Pay checkout, support tickets, and Klaviyo email marketing with Facebook Pixel attribution.",
    longDescription:
      "Office Aesthetics is an ecommerce platform built around the idea that your workspace should look and feel intentional. The product catalog is curated — not a dump of everything on Amazon — with editorial reviews, bundle recommendations, and workspace inspiration galleries. The platform handles affiliate product linking with commission tracking and payout management, order tracking with USPS shipping labels and address verification, sales tax calculation, and a review system with photo uploads. A support ticket system handles customer inquiries. Klaviyo tracks order events for email marketing and Facebook Conversions API handles purchase attribution. Built with Nuxt 3 for SSR and MongoDB for the product catalog with flexible schema for different product categories.",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "Square",
      "Amazon Pay",
      "AWS S3",
      "AWS SES",
      "Klaviyo",
      "USPS",
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
      { title: "Curated Catalog", description: "Hand-picked products with editorial reviews, variants, subscriptions, and bundle recommendations" },
      { title: "Dual Payments", description: "Square for card processing and Amazon Pay for one-click checkout — broader buyer coverage than a single gateway" },
      { title: "Shipping & Tax", description: "USPS address verification, shipping labels, rate quotes, and automated sales tax calculation at checkout" },
      { title: "Affiliate Program", description: "Commission tracking, referral management, click/conversion metrics, and payout calculations per affiliate" },
      { title: "Support Tickets", description: "Customer support ticket system with threaded messages, priority levels, and status tracking" },
    ],
    year: "2024–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "nuxt", label: "Nuxt 3 Storefront", subtitle: "Frontend", rationale: "Nuxt 3 for server-rendered product pages — crucial for SEO on product listings and editorial reviews.", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", rationale: "Nuxt server routes handle cart operations, product queries, and order management without a separate backend service.", row: 1, col: 2 },
        { id: "payments", label: "Square + Amazon Pay", subtitle: "Payments", rationale: "Dual payment providers — Square for card processing and Amazon Pay for one-click checkout. Broader buyer coverage than a single gateway.", row: 1, col: 4 },
        { id: "shipping", label: "USPS Integration", subtitle: "Shipping & Tax", rationale: "USPS API for address verification, shipping rate quotes, and label generation. Sales tax calculated at checkout based on shipping destination.", row: 2, col: 1 },
        { id: "reviews", label: "Review System", subtitle: "UGC", rationale: "First-party reviews with photo uploads (max 3), helpful votes, and star ratings. Builds trust and original content that helps SEO.", row: 2, col: 3 },
        { id: "klaviyo", label: "Klaviyo + Meta Pixel", subtitle: "Marketing", rationale: "Klaviyo for server-side event tracking — fires 'Placed Order' events and manages the waitlist. Facebook Conversions API for purchase attribution.", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", rationale: "MongoDB for the flexible product schema — office accessories, tech gadgets, and furniture all have wildly different attribute sets.", row: 3, col: 2 },
        { id: "s3", label: "AWS S3 + SES", subtitle: "Storage & Email", rationale: "S3 for product images and review photos. SES with MJML templates for transactional emails — order confirmations, shipping updates.", row: 3, col: 4 },
      ],
      edges: [
        { from: "nuxt", to: "routes", label: "Cart Ops" },
        { from: "nuxt", to: "payments", label: "Checkout" },
        { from: "routes", to: "shipping", label: "Rates/Labels" },
        { from: "routes", to: "reviews" },
        { from: "payments", to: "klaviyo", label: "Order Events" },
        { from: "shipping", to: "mongo" },
        { from: "reviews", to: "s3", label: "Photos" },
        { from: "klaviyo", to: "mongo" },
      ],
    },
  },
  {
    slug: "national-auto-hub",
    title: "National Auto Hub",
    tagline: "Auto parts ecommerce storefront with PWA",
    description:
      "A full-featured ecommerce storefront for auto parts and accessories, built as an installable PWA. Includes product browsing with variants, cart and checkout via Square, USPS shipping, user accounts with order history, affiliate program, a blog, and offline support via service worker.",
    longDescription:
      "National Auto Hub is a production ecommerce site for auto parts, differentiated by its PWA capabilities via @vite-pwa/nuxt — installable on mobile devices with Workbox-powered service worker caching for offline browsing. The storefront has full product browsing with categories and variants, a cart system, and checkout with Square integration. USPS handles shipping rates, address verification, and label generation. Users can create accounts to track orders and participate in the affiliate program. The blog drives organic traffic with SEO-optimized content. Built with Nuxt 3 for SSR performance and MongoDB for the product catalog with flexible schemas for different part categories.",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "Square",
      "AWS S3",
      "USPS",
      "@vite-pwa/nuxt",
    ],
    category: "ecommerce",
    featured: false,
    image: "/images/projects/national-auto-hub.png",
    heroImage: "/images/projects/Car1.png",
    liveUrl: "https://nah-delta.vercel.app",
    gallery: ["/images/projects/Car2.png", "/images/projects/Car3.png"],
    highlights: [
      { title: "PWA", description: "Installable progressive web app with Workbox service worker — offline product browsing and fast repeat visits" },
      { title: "Full Ecommerce", description: "Complete flow from product browsing with variants to cart, Square checkout, and order tracking" },
      { title: "USPS Shipping", description: "Address verification, shipping rate quotes, and label generation via USPS API integration" },
      { title: "Affiliate Program", description: "Referral tracking with commission management, click/conversion metrics, and automated reporting" },
      { title: "SEO & Blog", description: "SSR-optimized product pages and blog content driving organic search traffic" },
    ],
    year: "2024–2025",
    status: "active",
    architecture: {
      nodes: [
        { id: "nuxt", label: "Nuxt 3 App", subtitle: "Frontend", rationale: "Nuxt 3 for SSR — auto parts product pages need to rank on Google. Consistent with the other ecommerce stores in the portfolio.", row: 0, col: 3 },
        { id: "pwa", label: "PWA + Workbox", subtitle: "Service Worker", rationale: "@vite-pwa/nuxt makes the app installable on mobile devices. Workbox caches product pages and assets for offline browsing and faster repeat visits.", row: 0, col: 5 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", rationale: "Built-in Nuxt server routes for the product API, cart logic, and order management. Keeps everything in one deployment.", row: 1, col: 2 },
        { id: "square", label: "Square Checkout", subtitle: "Payments", rationale: "Square for card processing — handles checkout, order confirmation, and payment callbacks.", row: 1, col: 4 },
        { id: "blog", label: "Blog Engine", subtitle: "Content & SEO", rationale: "In-house blog for SEO content targeting auto parts searches. DIY guides and product breakdowns drive organic traffic.", row: 2, col: 1 },
        { id: "shipping", label: "USPS Integration", subtitle: "Shipping", rationale: "USPS API for address verification, shipping rate quotes, and label generation. Standard shipping provider for domestic parts delivery.", row: 2, col: 3 },
        { id: "affiliate", label: "Affiliate Engine", subtitle: "Referrals", rationale: "Referral tracking with commission management — partners earn on referred purchases.", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", rationale: "MongoDB for flexible product documents — auto parts have dozens of fitment attributes that vary wildly between categories.", row: 3, col: 2 },
        { id: "s3", label: "AWS S3", subtitle: "File Storage", rationale: "S3 for product images and category assets. Consistent with the storage pattern across the ecommerce platforms.", row: 3, col: 4 },
      ],
      edges: [
        { from: "nuxt", to: "pwa", label: "Offline" },
        { from: "nuxt", to: "routes", label: "REST" },
        { from: "nuxt", to: "square", label: "Checkout" },
        { from: "routes", to: "blog" },
        { from: "routes", to: "shipping", label: "Rates/Labels" },
        { from: "square", to: "affiliate", label: "Referral Track" },
        { from: "blog", to: "mongo" },
        { from: "shipping", to: "mongo" },
        { from: "affiliate", to: "s3", label: "Assets" },
      ],
    },
  },
  {
    slug: "subsource",
    title: "Subsource",
    tagline: "B2B contractor and supplier review directory",
    description:
      "A B2B review platform for commercial construction — contractors, subcontractors, suppliers, and agencies searchable across 80+ industry tags. 53 API endpoints, Google OAuth with JWT tokens, reCAPTCHA v3, business profile claims, and star ratings with business replies.",
    longDescription:
      "Subsource is a B2B directory built to bring accountability to the commercial construction industry. Businesses can search for contractors, subcontractors, suppliers, and agencies by category across 80+ industry tags (HVAC, electrical, plumbing, concrete, etc.), leave detailed reviews with star ratings, and browse business profiles. The review system supports business replies so both sides are represented, with automatic average rating recalculation on each review. Companies can claim their profiles to manage their listings and respond to feedback. Google OAuth with JWT tokens (1-hour expiry) makes onboarding frictionless, and reCAPTCHA v3 blocks bot signups. 53 API endpoints cover the full CRUD for all entity types. Built with Nuxt 3 for SSR and search engine visibility.",
    techStack: [
      "Nuxt 3",
      "Vue 3",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "Google OAuth",
      "JWT",
      "reCAPTCHA v3",
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
      { title: "B2B Directory", description: "Search contractors, subcontractors, suppliers, and agencies across 80+ construction industry tags" },
      { title: "Review System", description: "Star ratings with detailed reviews, update history, and business replies — both sides get a voice" },
      { title: "Profile Claims", description: "Businesses claim their listings to manage profiles, respond to feedback, and control their public presence" },
      { title: "Auth & Security", description: "Google OAuth with JWT tokens (1-hour expiry) and reCAPTCHA v3 for frictionless, bot-resistant onboarding" },
      { title: "53 API Endpoints", description: "Full CRUD across 8 resource categories — contractors, subcontractors, suppliers, agencies, reviews, blogs, claims, and users" },
    ],
    year: "2024–2025",
    status: "active",
    architecture: {
      nodes: [
        { id: "nuxt", label: "Nuxt 3 App", subtitle: "Frontend", rationale: "Nuxt 3 for SSR — business profile pages need to rank on Google so contractors can be found by potential partners.", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "53 Endpoints", rationale: "Nuxt server routes for the full API — 53 endpoints covering CRUD for contractors, subcontractors, suppliers, agencies, reviews, blogs, claims, and users.", row: 1, col: 2 },
        { id: "oauth", label: "Google OAuth + JWT", subtitle: "Authentication", rationale: "Google OAuth for one-click sign-in with JWT tokens (1-hour expiry). reCAPTCHA v3 blocks bot signups on public forms.", row: 1, col: 4 },
        { id: "search", label: "Search Engine", subtitle: "Discovery", rationale: "Category-based search across 4 business types (contractors, subcontractors, suppliers, agencies) with 80+ construction trade tags.", row: 2, col: 1 },
        { id: "reviews", label: "Review System", subtitle: "Ratings & Replies", rationale: "Star ratings with detailed reviews, update history, and business reply support. Auto-recalculates business average rating on each review.", row: 2, col: 3 },
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
    title: "Subsource Custom Software",
    tagline: "Software consultancy marketing site",
    description:
      "The marketing site for Subsource Software — a custom software consultancy. 100% statically generated with Next.js — zero backend, zero database, zero API. Service breakdowns, case studies with real metrics, a contact form for project inquiries, and polished Framer Motion scroll animations.",
    longDescription:
      "This is the client-facing site for Subsource Software — designed to convert visitors into clients. The site is 100% statically generated at build time — no backend, no database, no API routes. All content (services, case studies, testimonials, FAQ) is hardcoded in TypeScript files for zero server cost and instant page loads via Vercel's CDN edge network. The site features detailed service pages for web apps, mobile, AI, and system integrations. Case studies showcase real client metrics from shipped projects. The contact form collects project scope, budget range, and details upfront (client-side only — no backend submission handler). The design emphasizes credibility with smooth Framer Motion animations, clean typography, and social proof throughout. SSG was the right call here — there's no dynamic content that needs a server.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    category: "tooling",
    featured: false,
    image: "/images/projects/custom-software-site.png",
    heroImage: "/images/projects/css-hero.webp",
    liveUrl: "https://custom-software-site.vercel.app",
    gallery: [],
    highlights: [
      { title: "Static Site (SSG)", description: "100% statically generated at build time — zero backend, zero database, instant loads from Vercel CDN edge" },
      { title: "Conversion Design", description: "Case studies with real metrics and social proof throughout the funnel" },
      { title: "Service Showcase", description: "Detailed service pages covering web apps, mobile, AI, and system integrations" },
      { title: "FAQ Schema", description: "Structured FAQ data with JSON-LD markup for rich search results" },
      { title: "Micro-Interactions", description: "Smooth scroll animations and polished transitions built with Framer Motion" },
    ],
    year: "2025–2026",
    status: "active",
    architecture: {
      nodes: [
        { id: "next", label: "Next.js", subtitle: "Static Site (SSG)", rationale: "Next.js with App Router generating static HTML at build time. No SSR needed — all content is hardcoded in TypeScript files. Zero server cost, instant loads.", row: 0, col: 3 },
        { id: "motion", label: "Framer Motion", subtitle: "Animations", rationale: "Framer Motion over CSS animations for orchestrated scroll-triggered sequences. The hero parallax, case study reveals, and stat counter animations need precise timing control.", row: 1, col: 2 },
        { id: "pages", label: "Static Pages", subtitle: "All Content Hardcoded", rationale: "Services, case studies, about, contact, FAQ — all content lives in TypeScript files and is baked into static HTML at build time. No CMS, no database, no API.", row: 1, col: 4 },
        { id: "contact", label: "Contact Form", subtitle: "Lead Capture", rationale: "Multi-field form collecting name, email, service type, budget range, and project details. Client-side only — qualifies leads upfront for productive first conversations.", row: 2, col: 2 },
        { id: "vercel", label: "Vercel CDN", subtitle: "Edge Hosting", rationale: "Vercel for zero-config deployment with edge CDN distribution. Static assets served from the nearest edge node — no origin server needed.", row: 2, col: 4 },
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
