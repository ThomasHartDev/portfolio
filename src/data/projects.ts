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
  highlights: string[];
  year: string;
  status: "active" | "completed" | "in-development";
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
      "Full SaaS with Stripe subscriptions and usage-based billing",
      "Developer API with key management and rate limiting",
      "Presigned URL uploads to Cloudflare R2 for zero-server file handling",
      "WebP, AVIF, and PNG optimization with quality preservation",
      "Production-deployed with CI/CD and monitoring",
    ],
    year: "2025",
    status: "active",
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
      "Interactive choropleth maps with drill-down by state and county",
      "Community data provenance with field-level edit history",
      "Complex filtering across demographics, geography, and time periods",
      "Optimized aggregation queries handling 800K+ records",
      "Zodiac analysis feature that gained traction in the true crime community",
    ],
    year: "2025–2026",
    status: "active",
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
      "Full marketing site with SEO optimization and dynamic portfolio",
      "Customer portal with project tracking and invoice management",
      "Server-side rendered for performance and SEO",
      "Integrated blog with CMS-like content management",
      "Built and operated as a real business serving paying clients",
    ],
    year: "2023–2026",
    status: "active",
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
      "Interactive 3D body maps with WebGL rendering",
      "Radar chart visualizations for multi-dimensional relationship analysis",
      "Grounded in psychology research on somatic experiencing",
      "Privacy-first — all data stored locally on device",
      "Unique concept with no direct competitors",
    ],
    year: "2025–2026",
    status: "active",
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
      "Curated product catalog with editorial reviews",
      "Affiliate integration with Amazon and direct brands",
      "User accounts with wishlists and order history",
      "Bundle recommendations and workspace inspiration galleries",
      "Seed scripts for realistic product data in development",
    ],
    year: "2024–2026",
    status: "active",
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
      "Full ecommerce flow — browse, cart, checkout, order tracking",
      "PayPal payment integration with order confirmation",
      "User accounts with profiles, wishlists, and order history",
      "Affiliate program with tracking and payouts",
      "SEO-optimized blog and product pages with SSR",
    ],
    year: "2024–2025",
    status: "active",
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
      "Verified review system with purchase receipt validation",
      "Star ratings with detailed multi-criteria breakdowns",
      "User profiles with review history and credibility scores",
      "Product comparison tools for side-by-side evaluation",
      "SSR-optimized for search engine discoverability",
    ],
    year: "2024–2025",
    status: "active",
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
      "Conversion-optimized design with case studies and social proof",
      "Client onboarding flow with form validation and intake pipeline",
      "Portfolio showcase with dynamic project detail pages",
      "Client portal for project tracking and communication",
      "Smooth scroll animations and micro-interactions throughout",
    ],
    year: "2025–2026",
    status: "active",
  },
];
