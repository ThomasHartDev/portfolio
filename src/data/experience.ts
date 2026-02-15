export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  techUsed: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  highlights: string[];
}

export const experience: Experience[] = [
  {
    company: "Redo",
    role: "Full-Stack Engineer",
    location: "Draper, UT",
    period: "October 2025 – Present",
    description:
      "Shipping production systems at Redo — a Forbes Cloud 100 Rising Stars e-commerce platform ($24M Series A) serving 5,000+ merchants including Porsche, TaylorMade, Cozy Earth, Portland Leather Goods, and Mack Weldon. Code runs in the Shopify checkout extension on every storefront visit across all merchant stores, directly impacting millions of end-customer transactions.",
    highlights: [
      // === CONVERSION MONITOR (built from scratch, Nov 2025 - Jan 2026) ===
      "Designed and built the Conversion Monitor from scratch (8,500+ lines, 8 PRs) — a full-stack observability pipeline ingesting Snowflake DBT revenue tables, Shopify API data, and MongoDB with anomaly detection (>90% order drop alerts, extension disablement detection, missing analytics detection), Slack alerting with 3-day de-duplication, and an admin dashboard tracking 1,700+ merchant stores in real time",
      "Built long-term conversion monitor admin UI with interactive charting, click-to-view event details, Shopify audit log integration, and event attribution settings — giving the sales and success team real-time merchant health visibility for retention and upsell decisions",
      "Implemented conversion monitor cron orchestration running hourly across ~1,700 teams with bulk write optimization, batched Snowflake queries, night-hour exclusion to reduce false positives, and scope-checking polish for accurate team attribution across getredo.com and redo.com email domains",
      "Refactored the short-term conversion monitor (719 additions, 860 deletions) to improve aggregation performance with MongoDB hints and eliminate false alerts during overnight hours",

      // === PP+ CLAIMS SYSTEM (Jan 2026) ===
      "Architected multi-platform refund orchestration (~1,600 lines, 6 PRs) across 6 e-commerce providers for denied PP+ insurance claims: Shopify (GraphQL suggested refunds, gateway-mapped transactions), BigCommerce (preference-sorted refund methods), CommentSold (cents-format API), and Commerce Cloud with 4 separate payment sub-providers (Adyen, PayPal, Optty, GlobalE) — each with different metadata and partial refund handling",
      "Built denied claim processing pipeline via Temporal activities: validates PP+ charge existence, finds original premium amount, prevents duplicate refunds via idempotent checks, creates negative PayoutOrder entries for merchant billing credits, and records system messages on return timeline for audit trail",
      "Fixed race condition in return approval flow where creation side effects hadn't completed before downstream approval logic ran — preventing premature approvals that could corrupt claim state",
      "Fixed managed claim logic where recorded shipments were incorrectly counted for approval decisions (89 additions, 374 deletions across 10 files) — ensuring only actual claim shipments influenced downstream processing",
      "Integrated Shipsurance file attachment system — automatically uploading claim evidence files after filing claims with the insurance provider",
      "Handled Shipsurance 'claim already exists' edge case when fetching claim status, preventing duplicate claim creation in the PP+ flow",
      "Implemented four small fixes for PP+ claims including property handling and edge case corrections across the claim lifecycle",
      "Added PP+ UI tweaks with info messages (127 lines) improving the merchant-facing claim management interface",

      // === INTERNATIONAL PRICING SYSTEM (Feb 2026) ===
      "Built an end-to-end international pricing system (7 PRs, ~1,600 lines): price rounding engine computing base * exchangeRate * (1 + conversionFee) * catalogAdjustment with configurable penny rounding pairs (e.g., .48/.98), Shopify GraphQL catalog discovery with pagination handling 50+ catalogs, batch mutations (50 variants per batch), team settings UI, RPC endpoint for manual sync, and automated nightly cron task",
      "Built catalog utility functions for Shopify GraphQL — paginating through market and B2B catalogs, extracting price list IDs and currency codes, mapping market names to catalog IDs, and filtering 3-decimal currencies",
      "Created manage script for publishing Redo products to all market catalogs and sales channels — fixing the root cause of products being invisible in specific geographic markets",
      "Built RPC endpoint to sync international price rounding settings on save, enabling merchants to trigger manual price updates from the dashboard",
      "Made Online Store and Shop sales channels permanently enabled for Redo products, preventing accidental de-listing",

      // === CART VISIBILITY & PRODUCT AVAILABILITY (Jan-Feb 2026) ===
      "Fixed critical cart visibility bug where Redo products returned 404 for customers in specific geographic markets due to Shopify's dual publication system (Sales Channels vs Market Catalogs) — built diagnostic and remediation tooling to detect and auto-fix the issue across all merchant stores",
      "Built cart visibility check-and-fix manage script with dry-run mode: checks CartProduct existence in MongoDB, product status in Shopify, sales channel publication, and all market catalog publications — automatically publishes to missing catalogs when issues found",

      // === CHECKOUT EXTENSION & STOREFRONT FIXES (Nov-Dec 2025) ===
      "Resolved a checkout-blocking defect in the Shopify extension where app status emit fired before terms-and-conditions check, preventing coverage product additions across all 5,000+ merchant storefronts — directly restoring a revenue stream reaching millions of monthly checkout sessions",
      "Fixed cart token invalidation — tokens weren't updating when carts changed, causing stale state for customers and incorrect coverage calculations",
      "Added question mark check for cart token parsing, fixing edge case where malformed tokens caused silent failures",
      "Fixed currency label display issue on the Shopify extension where different currencies showed incorrect labels to international customers",
      "Replaced Axios with native fetch for cart change operations, reducing the Shopify extension bundle size",
      "Added requiresShipping check to checkout toggle, preventing coverage from appearing on digital-only orders where shipping protection is irrelevant",
      "Fixed Comrad Socks-specific cart render reload issue where the extension failed to re-initialize on their custom storefront",
      "Removed 'via redo' text from product title generation across 11 files, cleaning up customer-facing product names on all merchant storefronts",

      // === COVERAGE CALCULATOR & PRICING FIXES (Oct-Nov 2025) ===
      "Fixed coverage calculator discrepancies across 5 files — correcting price calculation logic, subscription detection (hasSubscription in cartItemToItemInfo), and requiring item quantity > 0 to show coverage",
      "Fixed rounding issue with legacy coverage price calculation that was producing incorrect prices for certain cart totals",
      "Built manage script to find live teams without coverage price and a companion script to update coverage prices with write capability — auditing and correcting pricing across all active merchants",

      // === DEFAULT IMAGE OVERHAUL (Oct-Nov 2025) ===
      "Led default image overhaul across the entire platform — replaced broken Redo shield images with package icons across checkout checkbox, info cards, and Shopify products (37 additions across 12 files), fixed whitespace-trimming in image URLs preventing broken images, and added new icon assets",
      "Built 1,610-line manage script to batch-update info-card, checkout checkbox, and Shopify product images across all merchant stores",
      "Built 1,313-line BigCommerce-specific manage script to update default images (or custom if applicable) across all BigCommerce stores",

      // === BILLING & PAYOUT SYSTEM (Dec 2025) ===
      "Built payout order fulfillment toggle system (593 additions, 9 files) — new merchant setting controlling when to bill for coverage (on fulfillment vs. order placement), with event-driven payout order creation triggered by Redo item fulfillment",
      "Implemented payout order creation after Redo item fulfilled setting (466 additions, 6 files) — the backend logic for the fulfillment-based billing model",
      "Built payout-match-redo-fulfillment manage script (289 additions) for auditing and reconciling payout orders against fulfillment records",
      "Fixed payout order deduplication by adding team ID to lookup query, preventing duplicate payout order creation across stores sharing order IDs",
      "Fixed Abacus billing calculation issue (39 additions across 3 files)",

      // === SHIPPING CLAIMS CSV EXPORT (Nov 2025) ===
      "Shipped a dynamic CSV export system (2,431 lines, 17 files) with 29+ column definitions for shipping claims across USPS, UPS, and FedEx — role-based data redaction (admin vs merchant views), view-based column selection respecting user-saved preferences, carrier-specific field handling, and financial calculation fields (cost basis, margin, refund tracking)",
      "Fixed UPS CSV columns for batch uploads (240 additions) — correcting column mappings and adding sensible defaults for carrier-specific batch upload requirements",

      // === RECYCLE DASHBOARD (Nov 2025) ===
      "Built the Recycle Dashboard from scratch (1,415 lines, 40 files) — full dashboard tab with navigation, view ordering, active view management, recycle-specific return workflow UI, and billing integration for recycle request processing",

      // === BIGCOMMERCE INTEGRATION (Dec 2025 - Jan 2026) ===
      "Built automatic refund creation for cancelled BigCommerce orders on order sync (129 additions, 5 files) — detecting cancelled status during sync and triggering refund through BigCommerce API",
      "Built 1,313-line BigCommerce manage script for batch-updating product images across all BC merchant stores with custom image support",

      // === SHIPSURANCE / INSURANCE PROVIDER INTEGRATION ===
      "Integrated with Shipsurance insurance API for claim filing, status polling, and evidence file attachment — including address field truncation (45-char Shipsurance limit), province code mapping, carrier ID lookup, and unique record ID generation",
      "Fixed Temporal workflow ID for recordShipment so multiple fulfillments on the same order could each be recorded with Shipsurance independently",

      // === SHOPIFY LOCATION & PRODUCT MANAGEMENT ===
      "Updated Redo location sync to include app-owned locations (228 additions, 4 files) — ensuring Redo's fulfillment locations were correctly represented across all merchant stores",
      "Fixed shipping zone refresh error thrown from invalid shipping rate tables (114 additions, 4 files)",

      // === WARRANTY & RETURNS FIXES ===
      "Fixed warranty exchange showing refund as an option when it shouldn't (81 additions, 2 files) — excluding refund from the return portal for warranty exchanges",
      "Added missing route for warranty confirmation page (16 additions)",
      "Fixed variant image not appearing on warranty returns (18 additions)",
      "Fixed confirmation page showing wrong message for lost claims — showing appropriate copy for different claim types",

      // === ADMIN & SETTINGS FIXES ===
      "Fixed general settings save timing bug across 2 PRs — resolving race condition where settings updates weren't persisting correctly",
      "Added conversion monitor alert improvement with possible reasons for alerts (269 additions) — giving the operations team actionable context on why a merchant's metrics changed",
      "Added product analyst to Slack alert notifications, expanding visibility of merchant issues to the analytics team",

      // === CODE CLEANUP & DEBT REDUCTION ===
      "Removed deprecated manual review automation strategies (548 lines of dead code across 24 files) — including handling the revert-and-redo cycle when the initial removal caused issues, demonstrating careful deprecation practices",
      "Removed 'mark as redo owned' feature (7 additions, 32 deletions) — cleaning up deprecated claim ownership logic",

      // === AUTOMATION & TOOLING ===
      "Built automation install tooling (59 additions, 5 files) for streamlining merchant onboarding workflows",
      "Built manage script for publishing products to all catalogs and sales channels (230 additions) — operational tooling for fixing product visibility issues at scale",

      // === COVERAGE TEAM / PRODUCTION SUPPORT ===
      "Served as engineering escalation point on the Coverage team — diagnosing live storefront issues across 5,000+ merchant stores when IT/Support couldn't resolve them, including network request inspection, Shopify AJAX API debugging, checkout extension behavior analysis, and cross-system root cause analysis",

      // === VELOCITY & OUTPUT ===
      "Maintained 20 PRs/month velocity (Elite tier per LinearB 2026 benchmarks — top of 8.1M PRs across 4,800 teams globally), with 60% merging same day, 86% merge rate, and 23,779 lines shipped across 407 files in under 4 months starting from zero codebase context",
    ],
    techUsed: [
      "TypeScript",
      "React",
      "Node.js",
      "Bazel",
      "MongoDB",
      "Snowflake",
      "Temporal",
      "Shopify GraphQL",
      "BigCommerce API",
      "AWS",
    ],
  },
  {
    company: "HARTECHO LLC",
    role: "Software Engineer, Full Stack",
    location: "Salt Lake City, UT",
    period: "May 2022 – October 2025",
    description:
      "Co-founded and led engineering at a software company building custom ecommerce solutions. Led a team of 5, shipped 12 production stores, and processed $3M+ in transactions.",
    highlights: [
      "Led a team of 5 to build and deploy 12 custom-coded ecommerce stores with mobile load times averaging 1.2s, reducing bounce rates and improving conversions by 30%",
      "Refactored multiple projects from Vue to Nuxt 3 and migrated hosting from AWS Amplify to Vercel, improving mobile page load speeds by up to 7 seconds",
      "Owned the CI/CD pipeline and automated testing workflow for serverless scalability, saving 700+ hours of labor across projects",
      "Integrated PayPal, Stripe, and Square payment gateways processing $3M+ in sales, with automated abandoned cart flows boosting recovered revenue by 20%",
      "Designed dynamic routing and metadata injection system that increased organic traffic by 18% on average",
      "Built custom admin portals for orders, inventory, promotions, and customers — cutting client reliance on developer support by over 80%",
    ],
    techUsed: [
      "TypeScript",
      "Vue",
      "Nuxt 3",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
      "GCP",
      "Vercel",
      "GitHub Actions",
    ],
  },
  {
    company: "Brigham Young University",
    role: "Junior Software Engineer",
    location: "Provo, UT",
    period: "April 2020 – April 2022",
    description:
      "Led NPC behavior development on a university video game project, managed version control across a 50+ student team, and maintained 30,000+ lines of legacy C++ code.",
    highlights: [
      "Led a team of 4 to design and implement 100+ NPC behaviors and mechanics, contributing to a 5th place ranking in the Rookie's international video game competition",
      "Managed SVN branching and merging using TortoiseSVN across a 50+ student multi-developer environment",
      "Debugged and maintained 30,000+ lines of legacy C++ code",
    ],
    techUsed: ["C++", "C", "Unreal Engine", "Blueprint", "TortoiseSVN"],
  },
];

export const education: Education[] = [
  {
    institution: "Brigham Young University",
    degree: "Bachelor of Science in Computer Science",
    period: "Graduated August 2022",
    highlights: [
      "Minor in Business Management",
      "5th place — Rookie's International Video Game Competition",
    ],
  },
];

export const skills = {
  languages: ["TypeScript", "JavaScript", "Python", "C++", "Java", "SQL", "HTML", "CSS"],
  frontend: [
    "React",
    "Next.js",
    "Vue 3",
    "Nuxt 3",
    "Tailwind CSS",
    "Three.js",
    "D3.js",
    "Framer Motion",
  ],
  backend: [
    "Node.js",
    "Express",
    "REST APIs",
    "tRPC",
    "Temporal",
    "WebSockets",
    "AWS Lambda",
    "GCP Cloud Functions",
  ],
  databases: ["PostgreSQL", "MongoDB", "Redis", "Snowflake", "Prisma", "Drizzle"],
  infrastructure: [
    "Docker",
    "Bazel",
    "GitHub Actions",
    "Vercel",
    "AWS (S3, Lambda, CloudFront)",
    "GCP",
    "Cloudflare R2",
  ],
  tools: [
    "Git",
    "Stripe",
    "PayPal",
    "Square",
    "Shopify GraphQL",
    "BigCommerce API",
    "Klaviyo",
    "Playwright",
    "Vitest",
  ],
};
