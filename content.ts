// All site copy lives here. Edit this file, not the components.

import type { DiagramSpec } from "@/components/Diagram";

export const profile = {
  name: "Samay Nandan",
  short: "Samay",
  role: "Team Lead – MERN & AI | Systems Architect",
  typed: [
    "Team Lead – MERN & AI",
    "Generative & Agentic AI Architect",
    "Distributed Systems Engineer",
    "Full-Stack Tech Lead",
    "Engineering Leadership",
  ],
  intro:
    "Full-stack and AI engineering leader with 6 years of experience architecting distributed MERN microservices, mission-critical IoT/healthcare systems, and production-grade Agentic AI pipelines. Directing cross-functional squads with end-to-end delivery ownership.",
  location: "Chandigarh Tricity, open to remote / hybrid",
  email: "samaynandan@gmail.com",
  phone: "+91 98156 91084",
  github: "https://github.com/Samay-Nandan",
  linkedin: "https://www.linkedin.com/in/samay-nandan",
  resume: "/Samay_Nandan_Resume.pdf?v=2026-11-25",
};

export const expertise = [
  {
    title: "Engineering leadership & delivery",
    accent: "pink",
    icon: "lead",
    body: "Direct cross-functional squads of 12+ developers, QA, and DevOps engineers: sprint execution, architecture blueprinting, code reviews, mentorship, and high-quality on-time delivery across international client accounts.",
  },
  {
    title: "Distributed systems & telemetry",
    accent: "cyan",
    icon: "plan",
    body: "Microservices architecture across Node.js, NestJS, React/Next.js, and AWS. High-concurrency message queuing with RabbitMQ & BullMQ, real-time hardware telemetry over TCP/serial, and Electron.js desktop integration.",
  },
  {
    title: "Generative & Agentic AI",
    accent: "orange",
    icon: "code",
    body: "Production-grade autonomous agentic workflows, multi-agent routing with function-calling LLMs, high-accuracy RAG pipelines with vector embeddings, and speech AI pipelines with AssemblyAI & ElevenLabs.",
  },
];

// The delivery lifecycle every client project follows, shown as an animated pipeline.
export const pipeline = [
  { label: "Requirements", sub: "calls, written scope" },
  { label: "Estimate & plan", sub: "scope, milestones" },
  { label: "Sprint delivery", sub: "the full team" },
  { label: "Review & QA", sub: "code review, testing" },
  { label: "Client sign-off", sub: "agreed acceptance" },
];

export type Project = {
  slug: string;
  name: string;
  kind: string;
  link?: { href: string; label: string };
  shots?: { desktop: string; mobile: string };
  summary: string;
  role: string;
  highlights: string[];
  stack: string[];
  diagram: DiagramSpec;
};

const row = (a: string, b: string, c: string, d: string, e: string, f: string, accents: string[] = []) => [
  { id: "a", label: a, x: 20, y: 30, accent: accents.includes("a") },
  { id: "b", label: b, x: 270, y: 30, accent: accents.includes("b") },
  { id: "c", label: c, x: 520, y: 30, accent: accents.includes("c") },
  { id: "d", label: d, x: 520, y: 130, accent: accents.includes("d") },
  { id: "e", label: e, x: 270, y: 130, accent: accents.includes("e") },
  { id: "f", label: f, x: 20, y: 130, accent: accents.includes("f") },
];
const snake: [string, string][] = [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"], ["e", "f"]];

// Featured: public products with live screenshots.
export const featured: Project[] = [
  {
    slug: "smartcaller",
    name: "SmartCaller",
    kind: "Healthcare: nurse-call & alarm telemetry platform",
    link: { href: "https://www.smartcaller.com.au/", label: "smartcaller.com.au" },
    shots: { desktop: "/projects/smartcaller-desktop.webp", mobile: "/projects/smartcaller-mobile.webp" },
    summary:
      "A mission-critical healthcare platform: on-premise life-safety nurse-call and alarm telemetry system for Australian hospitals and aged care. Ingests real-time hardware alarm telemetry over TCP/serial, RabbitMQ distributed message brokering, and self-updating Electron.js desktop consoles with sub-second alert escalation and zero message loss.",
    role: "Led the engineering team and delivery across the whole platform: on-site server, Electron desktop console, dashboard, cloud licensing portal, and mobile app. Owned architecture decisions and release quality.",
    highlights: [
      "Hardware telemetry: Ademco and Ampac panel parsers over TCP and serial ports, output to Salcom pagers and Bestlite LED signs",
      "Distributed message brokering: real-time alarm intake, escalation chains, and live updates over RabbitMQ, BullMQ, Redis, and Socket.IO",
      "Cross-platform desktop: self-updating Electron.js operator consoles and Windows installer released via CI",
      "Full operations suite: live alarms, paging devices, shift management, site structure, reporting and audit logs, with new-site wizard",
      "Security: JWT with OTP verification and role-based permissions (CASL) for superusers, admins, staff and installers",
      "Cloud tier & reliability: offline-first sync architecture pairing local NestJS/PostgreSQL nodes with cloud licensing, backed by Prometheus and Grafana monitoring",
      "React Native companion app with a duress button, plus an ElevenLabs-powered assistant in the dashboard",
    ],
    stack: ["NestJS", "RabbitMQ", "Electron.js", "Fastify", "Prisma", "PostgreSQL", "BullMQ", "Redis", "Socket.IO", "Next.js", "React Native", "Prometheus", "Grafana"],
    diagram: { width: 760, height: 200, nodes: row("Nurse-call panels", "Alarm ingest", "Escalation engine", "Socket.IO gateway", "Pagers & dashboards", "Cloud sync (outbox)", ["b", "c"]), edges: snake },
  },
  {
    slug: "podagain",
    name: "PodAgain",
    kind: "AI podcast generation",
    link: { href: "https://info.podagain.ai", label: "podagain.ai" },
    shots: { desktop: "/projects/podagain-desktop.webp", mobile: "/projects/podagain-mobile.webp" },
    summary:
      "Turns a podcast's back catalogue into new, stream-ready episodes: transcribe the library, generate a script, and voice it in the host's cloned voice.",
    role: "Built the generation pipeline and automated it end to end.",
    highlights: [
      "Transcription and speaker identification with AssemblyAI",
      "Voice synthesis for full episodes with ElevenLabs neural voice cloning",
      "Autonomous agentic script generation and automated publishing pipeline",
    ],
    stack: ["Node.js", "AssemblyAI", "ElevenLabs", "OpenAI", "Prompt Engineering"],
    diagram: { width: 760, height: 200, nodes: row("Past episodes", "AssemblyAI transcript", "Script generation", "ElevenLabs voices", "Audio assembly", "New episode", ["b", "d"]), edges: snake },
  },
  {
    slug: "trugamer",
    name: "TruGamer",
    kind: "Gaming data platform",
    link: { href: "https://trugamer.com", label: "trugamer.com" },
    shots: { desktop: "/projects/trugamer-desktop.webp", mobile: "/projects/trugamer-mobile.webp" },
    summary:
      "A high-throughput gaming data platform with real-time multi-source data sync, distributed Redis caching, and an AI conversational search assistant powered by the Perplexity API.",
    role: "Built and deployed the platform; designed the data-sync and caching strategy.",
    highlights: [
      "High-concurrency data sync worker pulling multi-source metadata into PostgreSQL",
      "Distributed Redis caching layer serving hot queries with sub-second response times",
      "SideKick: context-aware AI assistant answering natural language questions over the database (Perplexity API)",
    ],
    stack: ["Node.js", "PostgreSQL", "REST APIs", "Redis Caching", "Perplexity API"],
    diagram: { width: 760, height: 200, nodes: row("IGDB API", "Sync worker", "PostgreSQL", "Cache layer", "REST API", "trugamer.com", ["b", "d"]), edges: snake },
  },
];

export const projects: Project[] = [
  {
    slug: "group-booking",
    name: "Group hotel booking platform",
    kind: "Travel, for a Canada/UAE booking company",
    summary:
      "An AI-assisted tool that builds group hotel offers from live supplier inventory, then hands contracts and vouchers to the client's Odoo ERP.",
    role: "Led delivery of the first phase and run the production server.",
    highlights: [
      "Live supplier API integration with hotel content sync",
      "Odoo quotation, contract and voucher hand-off",
      "Production on Hetzner with PM2: diagnosed and resolved out-of-memory crash in hotel sync, added structured log rotation",
    ],
    stack: ["Next.js", "Node.js", "Odoo API", "PM2", "Hetzner", "Linux"],
    diagram: {
      width: 760,
      height: 200,
      nodes: [
        { id: "req", label: "Group request", x: 20, y: 30 },
        { id: "tool", label: "Group booking tool", x: 270, y: 30, accent: true },
        { id: "sup", label: "Hotel supplier API", x: 520, y: 30 },
        { id: "sync", label: "Hotel content sync", x: 520, y: 130 },
        { id: "odoo", label: "Odoo offer & contract", x: 270, y: 130, accent: true },
        { id: "vch", label: "Voucher", x: 20, y: 130 },
      ],
      edges: [["req", "tool"], ["tool", "sup"], ["sup", "sync"], ["tool", "odoo"], ["odoo", "vch"]],
    },
  },
  {
    slug: "restaurant-directory",
    name: "Global restaurant directory",
    kind: "Listings platform, UK launch",
    summary:
      "A high-concurrency geo-search directory of Indian restaurants, served from inside the client's existing WordPress domain.",
    role: "Led architecture and delivery; each milestone approved by the client on submission.",
    highlights: [
      "Replaced Google Places with open data (Overture + FSA) after a licensing review, eliminating recurring overhead with zero downtime",
      "PostGIS geo-search with trigram name matching and a weighted quality score",
      "Next.js app reverse-proxied under the WordPress site, which stayed untouched",
    ],
    stack: ["Next.js", "PostgreSQL", "PostGIS", "Apache", "GCP"],
    diagram: { width: 760, height: 200, nodes: row("Open data sources", "Ingest & score", "PostGIS", "Next.js directory", "Apache proxy", "Client's WordPress site", ["b", "d"]), edges: snake },
  },
  {
    slug: "daily-quiz",
    name: "Community daily quiz",
    kind: "EdTech, for a paid professional community",
    summary:
      "A daily quiz with streaks and theme leaderboards embedded in a members-only community, sized for 5,000 members.",
    role: "Re-scoped it from a quick spreadsheet hack into a full product, then took over development and client handling.",
    highlights: [
      "Admin panel so the client can schedule questions ahead",
      "Streak engine on America/New_York time so daylight saving never breaks a streak",
      "Single-file embed, because the community platform only runs pasted code",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Render", "Netlify"],
    diagram: {
      width: 760,
      height: 200,
      nodes: [
        { id: "admin", label: "Admin panel", x: 20, y: 30 },
        { id: "api", label: "Next.js API", x: 270, y: 30, accent: true },
        { id: "db", label: "PostgreSQL", x: 520, y: 30 },
        { id: "streak", label: "Streak engine", x: 520, y: 130, accent: true },
        { id: "quiz", label: "Embedded quiz", x: 20, y: 130 },
      ],
      edges: [["admin", "api"], ["api", "db"], ["api", "streak"], ["api", "quiz"]],
    },
  },
  {
    slug: "amplify-investigation",
    name: "Deployment failure investigation",
    kind: "AWS / DevOps, for a client's CDK stack",
    summary:
      "A client's AWS Amplify stack rolled back on every deploy, 20 times over eight days, blocking a milestone release. The cause turned out to be a gap in AWS's own documented GitHub token setup.",
    role: "Led the investigation and the client report.",
    highlights: [
      "Traced the failing resource from CloudFormation stack events, then reproduced it outside CloudFormation with the Amplify CLI and a minimal probe template",
      "Proved Amplify's first call is a repository read that AWS's documented webhook-only token can't make on a private repo; ruled out 8 other causes by measurement",
      "Fix: a fine-grained single-repo token. Delivered a diagnostic report, evidence log, testing report and an AWS Support case draft",
    ],
    stack: ["AWS Amplify", "CloudFormation", "CDK", "Secrets Manager", "IAM", "CloudTrail", "GitHub API"],
    diagram: { width: 760, height: 200, nodes: row("CDK deploy", "CloudFormation", "Amplify app", "Token from Secrets", "GitHub repo read: 404", "Fine-grained token fix", ["e", "f"]), edges: snake },
  },
  {
    slug: "business-platform-site",
    name: "AI business platform website",
    kind: "SaaS sales site, white-label",
    summary:
      "Sales website for an AI-powered business operations platform (CRM, HR, payroll), built for enterprise buyers and live sales pitches.",
    role: "Built and deployed the site.",
    highlights: [
      "18 pages with about 16 interactive product demos (AI proposals, AI replies, payroll run, permission matrix) as React islands in Astro",
      "Scroll-driven storytelling with GSAP and Motion",
      "Demo-booking API on Amazon SES with a honeypot, timing check and per-IP rate limit; it never reports success unless the mail server accepts",
      "Self-hosted Node on PM2 behind Nginx with a one-command deploy",
    ],
    stack: ["Astro", "React", "TypeScript", "GSAP", "Amazon SES", "Nginx", "PM2"],
    diagram: { width: 760, height: 200, nodes: row("Visitor", "Astro pages", "React demo islands", "Book-a-demo form", "Rate-limited API", "Amazon SES to sales", ["c", "e"]), edges: snake },
  },
  {
    slug: "secure-ai-saas",
    name: "Privacy-first AI SaaS",
    kind: "Architecture for a German care provider",
    summary:
      "Multi-tenant SaaS architecture for AI-drafted reports on sensitive German documents, designed for GDPR and EU data residency.",
    role: "Wrote the solution architecture and the go/no-go gates before any build budget.",
    highlights: [
      "Personal data is pseudonymised before any AI call; the mapping never leaves the tenant",
      "Postgres row-level security with per-tenant encryption keys for erasure",
      "Staged scaling plan: modular monolith first, services only on measured triggers",
    ],
    stack: ["Architecture", "PostgreSQL RLS", "pgvector", "GDPR", "AI gateway"],
    diagram: { width: 760, height: 200, nodes: row("Case documents", "Pseudonymiser", "AI gateway", "EU-hosted model", "Approval workflow", "Tenant DB (RLS)", ["b"]), edges: snake },
  },
];

export const experience = [
  {
    company: "Eminence Technology",
    place: "Mohali",
    title: "Team Lead – MERN and AI",
    period: "Jul 2024 – present",
    points: [
      "Directed cross-functional engineering squads of 12+ developers, QA, and DevOps engineers; governed sprint execution, technical architecture blueprints, and code reviews across concurrent international client platforms.",
      "Architected on-premise life-safety healthcare IoT platform (SmartCaller) with TCP/serial telemetry, RabbitMQ distributed message brokering, and self-updating Electron.js desktop consoles.",
      "Engineered autonomous agentic workflows, multi-agent task routing with function-calling LLMs, and high-accuracy RAG pipelines with vector embeddings.",
      "Built multimodal GenAI pipelines including PodAgain (AssemblyAI audio transcription + ElevenLabs voice cloning) and TruGamer (distributed sync with Perplexity LLM assistant).",
    ],
  },
  {
    company: "Eminence Technology",
    place: "Mohali",
    title: "MERN Stack Developer",
    period: "Aug 2022 – Jun 2024",
    points: [
      "Architected scalable microservices using Node.js, Express, React, and MongoDB; diagnosed and resolved critical distributed bottlenecks including out-of-memory sync crashes and silent API drops, boosting search throughput by 40%.",
      "Built Dockerized deployment pipelines with GitHub Actions across AWS EC2 and Linux, reducing pre-release regression defects by 30%.",
    ],
  },
  {
    company: "GeekyBones",
    place: "Mohali",
    title: "Software Engineer",
    period: "Mar 2021 – Jul 2022",
    points: [
      "Multi-Choice: modular REST APIs and relational data architectures using Node.js, Express, PostgreSQL, and TypeORM (35% faster database query execution).",
      "Goliath: multi-tenant headless CMS using Next.js, GraphQL, and AWS DynamoDB (securing 90+ Google Lighthouse performance scores).",
      "Unova: real-time QR and barcode asset telemetry microservices automating physical-to-digital inventory tracking.",
    ],
  },
];

// Where the work has gone: shown as a strip under the stats.
export const reach = {
  countries: [
    { code: "au", name: "Australia" },
    { code: "us", name: "United States" },
    { code: "ca", name: "Canada" },
    { code: "gb", name: "United Kingdom" },
    { code: "ae", name: "UAE" },
    { code: "de", name: "Germany" },
  ],
  industries: ["Healthcare", "Travel", "Gaming", "AI & media", "EdTech", "SaaS", "Hospitality"],
};

// Card face for each project: one line, a cover icon and its colours.
export const cardMeta: Record<string, { line: string; icon: string; from: string; to: string }> = {
  smartcaller: { line: "Mission-critical hospital alarm telemetry & Electron desktop console with RabbitMQ", icon: "pulse", from: "#0f766e", to: "#1e3a8a" },
  trugamer: { line: "High-throughput gaming data platform with context-aware AI search", icon: "game", from: "#1d4ed8", to: "#7c3aed" },
  podagain: { line: "Turns a podcast archive into new AI-voiced episodes", icon: "mic", from: "#2563eb", to: "#60a5fa" },
  "group-booking": { line: "Group hotel offers from live supplier inventory into Odoo", icon: "plane", from: "#0369a1", to: "#0891b2" },
  "restaurant-directory": { line: "Geo-search directory of 4,260 restaurants for a UK launch", icon: "pin", from: "#b45309", to: "#dc2626" },
  "daily-quiz": { line: "Daily quiz with streaks for a 5,000-member community", icon: "trophy", from: "#7c3aed", to: "#db2777" },
  "amplify-investigation": { line: "Found why an AWS deploy failed 20 times in a row", icon: "cloud", from: "#c2410c", to: "#f59e0b" },
  "business-platform-site": { line: "Sales site with 16 interactive demos for an AI business suite", icon: "browser", from: "#4338ca", to: "#0ea5e9" },
  "secure-ai-saas": { line: "GDPR-first architecture for AI on sensitive documents", icon: "shield", from: "#15803d", to: "#0f766e" },
};
