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
        { id: "r2", label: "Cloudflare R2", subtitle: "Object Storage", rationale: "R2 over S3 for zero egress fees. Presigned URLs keep files off the server — uploads go straight from browser to bucket.", row: 3, col: 1 },
        { id: "db", label: "PostgreSQL", subtitle: "Database", rationale: "Relational data with strict schemas — user accounts, subscriptions, API keys, and usage records need referential integrity.", row: 3, col: 3 },
        { id: "keys", label: "API Key Store", subtitle: "Auth", rationale: "Hashed API keys with per-key rate limits and usage tracking. Developers can rotate keys without downtime.", row: 3, col: 5 },
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
        { id: "ui", label: "Next.js App", subtitle: "Frontend", rationale: "Next.js for SSR — crime data pages need to be crawlable by search engines and share with rich previews.", row: 0, col: 3 },
        { id: "maps", label: "D3.js Maps", subtitle: "Visualization", rationale: "D3 over Mapbox or Leaflet for full control over the choropleth rendering. Custom color scales and drill-down behavior that map libraries don't support well.", row: 1, col: 1 },
        { id: "filters", label: "Filter Engine", subtitle: "Query Builder", rationale: "Complex multi-dimension filters (demographics, geography, weapons, time) need a composable query builder that translates to SQL.", row: 1, col: 3 },
        { id: "api", label: "API Routes", subtitle: "REST API", rationale: "Co-located API routes keep data fetching simple. REST over GraphQL because the query patterns are well-defined.", row: 1, col: 5 },
        { id: "agg", label: "Aggregation Engine", subtitle: "Data Processing", rationale: "Raw SQL aggregation over ORM queries — Prisma can't express the complex GROUP BY and window functions needed for 800K+ row analytics.", row: 2, col: 2 },
        { id: "provenance", label: "Provenance Tracker", subtitle: "Edit History", rationale: "Field-level edit tracking so every data correction is auditable. Community contributions need source citations and a full revision history.", row: 2, col: 4 },
        { id: "cache", label: "Cache Layer", subtitle: "Performance", rationale: "Expensive aggregation queries get cached to avoid re-processing 800K rows on every request. Invalidates when new data or corrections come in.", row: 3, col: 2 },
        { id: "db", label: "PostgreSQL", subtitle: "Database", rationale: "Postgres for relational integrity across records, corrections, and user contributions. Strong aggregation performance with proper indexing.", row: 3, col: 4 },
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
        { id: "nuxt", label: "Nuxt 3 SSR", subtitle: "Frontend", rationale: "Nuxt 3 over Next.js because the team already had Vue expertise. SSR for SEO on the marketing pages and blog.", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", rationale: "Nuxt server routes give you a built-in API layer — no need for a separate Express server.", row: 1, col: 2 },
        { id: "lambda", label: "AWS Lambda", subtitle: "Serverless", rationale: "Lambda for background jobs like PDF generation and email sends. Pay-per-invocation keeps costs near zero for a small business.", row: 1, col: 4 },
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
      "WebGL",
      "D3.js",
      "Tailwind CSS",
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
        { id: "app", label: "Next.js App", subtitle: "Frontend", rationale: "Next.js for the app shell and routing. The 3D interactions are client-side, but SSR helps with the landing and onboarding pages.", row: 0, col: 2 },
        { id: "three", label: "Three.js", subtitle: "3D Engine", rationale: "Three.js over Babylon.js for a lighter footprint. The body map doesn't need a full game engine — just smooth mesh rendering and raycasting.", row: 0, col: 4 },
        { id: "webgl", label: "WebGL Renderer", subtitle: "GPU Rendering", rationale: "WebGL for GPU-accelerated rendering of the 3D body model. Canvas 2D can't handle real-time mesh shading and particle effects.", row: 1, col: 4 },
        { id: "d3", label: "D3.js Charts", subtitle: "Visualization", rationale: "D3 for the radar charts — full control over the SVG paths, axis labels, and animation. Chart.js couldn't handle the custom multi-axis layout.", row: 1, col: 1 },
        { id: "canvas", label: "Canvas API", subtitle: "Paint Input", rationale: "Canvas 2D for the paint-on-body interaction. Users draw freehand to mark where they feel sensations — needs pixel-level precision.", row: 1, col: 3 },
        { id: "emotions", label: "Emotion Mapping", subtitle: "Analysis", rationale: "Maps painted body regions to emotional categories using a research-backed mapping between somatic locations and feelings.", row: 2, col: 2 },
        { id: "scoring", label: "Dimension Scoring", subtitle: "Metrics", rationale: "Scores relationship across 8 dimensions (trust, attraction, safety, etc.) derived from the body map data and questionnaire responses.", row: 2, col: 4 },
        { id: "idb", label: "IndexedDB", subtitle: "Local Storage", rationale: "IndexedDB over a server database — relationship data is deeply personal. Everything stays on-device, nothing leaves the browser.", row: 3, col: 3 },
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
        { id: "nuxt", label: "Nuxt 3 Storefront", subtitle: "Frontend", rationale: "Nuxt 3 for server-rendered product pages — crucial for SEO on product listings and editorial reviews.", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", rationale: "Nuxt server routes handle cart operations and product queries without a separate backend service.", row: 1, col: 2 },
        { id: "paypal", label: "PayPal API", subtitle: "Payments", rationale: "PayPal for broad buyer trust and one-click checkout. Lower friction than entering card details for a curated product marketplace.", row: 1, col: 4 },
        { id: "affiliate", label: "Affiliate Engine", subtitle: "Tracking", rationale: "Custom affiliate tracking to handle both Amazon Associates links and direct brand partnerships with different commission structures.", row: 2, col: 1 },
        { id: "wishlist", label: "Wishlist Manager", subtitle: "User Prefs", rationale: "Persistent wishlists encourage return visits. Stored per-user in MongoDB with optional email reminders for price drops.", row: 2, col: 3 },
        { id: "reviews", label: "Review System", subtitle: "UGC", rationale: "First-party reviews over importing from Amazon — builds trust and original content that helps SEO.", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", rationale: "MongoDB for the flexible product schema — office accessories, tech gadgets, and furniture all have wildly different attribute sets.", row: 3, col: 2 },
        { id: "s3", label: "AWS S3", subtitle: "File Storage", rationale: "S3 for product images and review photos. CloudFront CDN in front for fast delivery worldwide.", row: 3, col: 4 },
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
        { id: "nuxt", label: "Nuxt 3 App", subtitle: "Frontend", rationale: "Nuxt 3 for SSR — auto parts product pages need to rank on Google. Consistent with the other ecommerce stores in the portfolio.", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", rationale: "Built-in Nuxt server routes for the product API, cart logic, and order management. Keeps everything in one deployment.", row: 1, col: 1 },
        { id: "paypal", label: "PayPal API", subtitle: "Payments", rationale: "PayPal for trusted checkout in the auto parts space where buyers prefer established payment methods.", row: 1, col: 3 },
        { id: "lambda", label: "AWS Lambda", subtitle: "Background Jobs", rationale: "Lambda for async order processing, inventory syncs, and email notifications. Scales to zero when there's no traffic.", row: 1, col: 5 },
        { id: "inventory", label: "Inventory Manager", subtitle: "Stock Tracking", rationale: "Tracks stock levels, variants (sizes, fitments), and auto-flags low-stock items. Auto parts have complex variant matrices.", row: 2, col: 2 },
        { id: "orders", label: "Order Pipeline", subtitle: "Fulfillment", rationale: "Multi-step order flow from payment confirmation through fulfillment and shipping notification.", row: 2, col: 4 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", rationale: "MongoDB for flexible product documents — auto parts have dozens of fitment attributes that vary wildly between categories.", row: 3, col: 3 },
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
        { id: "nuxt", label: "Nuxt 3 App", subtitle: "Frontend", rationale: "Nuxt 3 for SSR — product review pages need search engine visibility. Vue ecosystem for consistency across the store platforms.", row: 0, col: 3 },
        { id: "routes", label: "Server Routes", subtitle: "API Layer", rationale: "Nuxt server routes for the review API, user accounts, and comparison data. No separate backend needed.", row: 1, col: 2 },
        { id: "verify", label: "Verification API", subtitle: "Receipt Check", rationale: "Receipt validation to ensure only real buyers can leave reviews. Prevents the fake review problem that kills trust.", row: 1, col: 4 },
        { id: "reviews", label: "Review Engine", subtitle: "Aggregation", rationale: "Custom aggregation pipeline for multi-criteria ratings. Surfaces helpful reviews and weights verified purchases higher.", row: 2, col: 1 },
        { id: "compare", label: "Comparison Builder", subtitle: "Diffing", rationale: "Side-by-side product comparison with normalized specs. Pulls attributes from different product schemas into a unified view.", row: 2, col: 3 },
        { id: "cred", label: "Credibility Scorer", subtitle: "Trust Metrics", rationale: "User trust scores based on review history, verification rate, and helpfulness votes. Reduces influence of low-quality reviewers.", row: 2, col: 5 },
        { id: "mongo", label: "MongoDB", subtitle: "Database", rationale: "MongoDB for flexible review and product schemas — different product categories have completely different attribute sets.", row: 3, col: 3 },
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
        { id: "next", label: "Next.js App", subtitle: "Frontend", rationale: "Next.js for the marketing site — SSR for SEO, App Router for layouts, and API routes for the contact pipeline.", row: 0, col: 2 },
        { id: "motion", label: "Framer Motion", subtitle: "Animations", rationale: "Framer Motion over CSS animations for orchestrated scroll-triggered sequences. The case study reveals and page transitions need precise timing control.", row: 0, col: 4 },
        { id: "api", label: "API Routes", subtitle: "Backend", rationale: "Next.js API routes handle the contact form, lead routing, and portfolio data. Keeps everything in one Vercel deployment.", row: 1, col: 3 },
        { id: "zod", label: "Zod Validation", subtitle: "Schema Guard", rationale: "Zod validates all form inputs server-side. The multi-step onboarding flow needs strict schema enforcement at each step.", row: 1, col: 5 },
        { id: "contact", label: "Contact Pipeline", subtitle: "Lead Intake", rationale: "Multi-step intake that qualifies leads before they reach the team. Collects project scope, budget range, and timeline upfront.", row: 2, col: 2 },
        { id: "portfolio", label: "Portfolio Engine", subtitle: "Case Studies", rationale: "Structured data for each project — metrics, tech stack, timeline. Generates detail pages and comparison views from a single source of truth.", row: 2, col: 4 },
        { id: "edge", label: "Vercel Edge Config", subtitle: "Runtime Config", rationale: "Edge Config for feature flags and A/B testing the landing page. Changes propagate instantly without redeploying.", row: 3, col: 2 },
        { id: "cdn", label: "Image CDN", subtitle: "Static Assets", rationale: "Vercel's built-in image optimization for case study screenshots and project galleries. Serves WebP/AVIF at the right resolution.", row: 3, col: 4 },
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
