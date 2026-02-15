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
      "Resolved a checkout-blocking defect in the Shopify extension that was preventing coverage product additions across all 5,000+ merchant storefronts — directly restoring a revenue stream reaching millions of monthly checkout sessions",
      "Designed and built the Conversion Monitor from scratch (8,500+ lines) — a full-stack observability pipeline ingesting Snowflake, Shopify, and MongoDB data with anomaly detection, Slack alerting, and an admin dashboard tracking 1,700+ merchant stores in real time",
      "Architected multi-platform refund orchestration across 6 e-commerce providers (Shopify, BigCommerce, CommentSold, Commerce Cloud with 4 payment sub-providers) for the PP+ claims system — enabling automated refund processing for denied insurance claims across every supported platform",
      "Built an end-to-end international pricing system supporting 50+ market catalogs and multiple currencies — automated price rounding engine, Shopify GraphQL batch mutations, team settings UI, RPC endpoint, and nightly cron sync ensuring accurate pricing for international customers",
      "Fixed critical cart visibility bug where Redo products returned 404 for customers in specific geographic markets due to Shopify's dual publication system — built diagnostic tooling to detect and remediate the issue across all merchant stores",
      "Shipped a dynamic CSV export system with 29+ columns and role-based data redaction for shipping claims across USPS, UPS, and FedEx — used by internal operations and merchants for carrier-level financial reporting",
      "Built the Recycle Dashboard (1,415 lines, 40 files) giving merchants first-ever visibility into recycled returns, and implemented billing system improvements ensuring accurate payout order creation tied to fulfillment events",
      "Maintained 20 PRs/month velocity (Elite tier per LinearB benchmarks — top of 8.1M PRs across 4,800 teams), with 60% merging same day and 23,779 lines shipped across 407 files in under 4 months",
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
