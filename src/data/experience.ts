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
      "Shipping production systems at Redo, a Forbes Cloud 100 e-commerce platform ($24M Series A) serving 5,000+ merchants including Porsche, TaylorMade, and Cozy Earth. Owned live checkout reliability where Redo's code runs inside every merchant's checkout flow, handling millions of transactions monthly. Diagnosed and resolved 250+ store-specific issues while shipping major features, available near-24/7 to protect revenue.",
    highlights: [
      "Built a real-time conversion monitoring system across 5,000+ stores for early error detection, ensuring uninterrupted revenue flow and protecting an estimated 30M+ monthly storefront visits",
      "Fully automated the shipping claim flow across 6 e-commerce platforms, eliminating manual intervention and reducing support workload by hundreds of hours annually",
      "Discovered a silent billing bug, built audit tooling, and reclaimed ~$40k in lost revenue",
      "Led a team of 3 to automate Shopify configuration issues, significantly reducing manual intervention and support escalations across the merchant base",
      "Shipped 77 PRs within first 4 months across 12+ major features and 40+ bug fixes, ramping from zero codebase context to full productivity within weeks",
      "Conducted live video calls with merchants to diagnose, explain, and resolve product issues in real time, strengthening merchant trust and retention",
    ],
    techUsed: [
      "TypeScript",
      "React",
      "Node.js",
      "MongoDB",
      "Snowflake",
      "Temporal",
      "Bazel",
      "AWS",
      "Shopify GraphQL",
      "BigCommerce API",
      "Shipsurance API",
      "Slack API",
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
