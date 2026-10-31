// All site copy lives here. Edit this file, not the components.
// Lines marked TODO need you to confirm a fact before the site goes live.

import type { DiagramSpec } from "@/components/Diagram";

export const profile = {
  name: "Samay Nandan",
  short: "Samay",
  role: "Team Lead",
  typed: ["Technical project manager", "Team Lead", "Engineering & delivery", "Senior full stack engineer", "Generative AI builder"],
  intro:
    "I lead teams that ship. I take client projects from the first requirement to a successful release, keeping the team focused and the client informed.",
  location: "Chandigarh Tricity, open to remote",
  email: "samaynandan@gmail.com",
  phone: "+91 98156 91084",
  github: "https://github.com/Samay-Nandan",
  linkedin: "https://www.linkedin.com/in/samay-nandan", // TODO: confirm your real LinkedIn URL
  resume: "/Samay_Nandan_Resume.pdf?v=2026-11-02",
};

export const expertise = [
  {
    title: "People & team management",
    accent: "pink",
    icon: "lead",
    body: "Lead a team of engineers across concurrent projects: allocate people by skill and capacity, run sprints, review code, and grow juniors into people who own their work.",
  },
  {
    title: "Project & delivery management",
    accent: "cyan",
    icon: "plan",
    body: "Requirement analysis and BRD/SRS documents, estimates and proposals, milestone plans with clear acceptance, scope and change control, risk tracking and client sign-off, for Upwork and direct clients worldwide.",
  },
  {
    title: "Technical leadership",
    accent: "orange",
    icon: "code",
    body: "Architecture and code review across Node.js, React/Next.js, PostgreSQL and AWS. Generative AI features with OpenAI, ElevenLabs and AssemblyAI. Production health and incident fixes.",
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
    slug: "trugamer",
    name: "TruGamer",
    kind: "Gaming data platform",
    link: { href: "https://trugamer.com", label: "trugamer.com" },
    shots: { desktop: "/projects/trugamer-desktop.webp", mobile: "/projects/trugamer-mobile.webp" },
    summary:
      "A gaming platform indexing 369,000+ games across every platform and region, kept in sync with the IGDB API without hammering it on every page view.",
    role: "Built and deployed the platform; designed the data-sync and caching strategy.",
    highlights: [
      "Sync service pulling IGDB metadata into PostgreSQL",
      "Caching layer that serves hot queries without touching IGDB",
      "SideKick: an AI assistant answering player questions over the database (Perplexity API)",
    ],
    stack: ["Node.js", "PostgreSQL", "REST", "Caching", "Perplexity API"],
    diagram: { width: 760, height: 200, nodes: row("IGDB API", "Sync worker", "PostgreSQL", "Cache layer", "REST API", "trugamer.com", ["b", "d"]), edges: snake },
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
      "Voice synthesis for full episodes with ElevenLabs",
      "Removed the manual editing and publishing steps",
    ],
    stack: ["Node.js", "AssemblyAI", "ElevenLabs", "OpenAI", "Automation"],
    diagram: { width: 760, height: 200, nodes: row("Past episodes", "AssemblyAI transcript", "Script generation", "ElevenLabs voices", "Audio assembly", "New episode", ["b", "d"]), edges: snake },
  },
  {
    slug: "smartcaller",
    name: "SmartCaller",
    kind: "Healthcare: nurse-call & alarm platform",
    link: { href: "https://www.smartcaller.com.au/", label: "smartcaller.com.au" },
    shots: { desktop: "/projects/smartcaller-desktop.webp", mobile: "/projects/smartcaller-mobile.webp" },
    summary:
      "A long-running healthcare product: an on-premise nurse-call and alarm platform for hospitals and care facilities. It takes alarms from nurse-call panels in real time, escalates unanswered calls, and pushes them to staff dashboards, pagers and LED displays. It runs on-site so it keeps working without internet, with a separate cloud tier for licensing and remote oversight.",
    role: "Lead the team and the delivery of the whole platform: on-site server, dashboard, cloud portal, mobile app and installer. Own planning, architecture decisions and release quality.",
    highlights: [
      "Hardware integration: Ademco and Ampac panel parsers over TCP and serial ports, output to Salcom pagers and Bestlite LED signs",
      "Real-time core: alarm intake, escalation chains and live updates over Socket.IO, driven by 19 BullMQ/Redis background processors (escalation, device health checks, reports, licence warnings, display rotation)",
      "Full operations suite: live alarms, paging devices, shift management, site structure, reporting and audit logs, with a new-site wizard and site import",
      "Security: JWT with OTP verification and role-based permissions (CASL) for superusers, admins, staff and installers",
      "Cloud tier: licensing, admin impersonation and a replica view of each site, fed by offline-first sync using an outbox pattern",
      "Delivery: Windows installer (Inno Setup, native PostgreSQL 16 and Redis 7) that auto-updates every 6 hours from GitHub Releases built by CI",
      "Scale of the codebase: 31-model on-site schema plus 10 cloud models, 33 backend modules, 46 migrations, 32 dashboard pages, ~230 API endpoints, Prometheus and Grafana monitoring",
      "React Native companion app with a duress button, plus an ElevenLabs-powered assistant in the dashboard",
    ],
    stack: ["NestJS", "Fastify", "Prisma", "PostgreSQL", "BullMQ", "Redis", "Socket.IO", "Next.js", "React Native", "Prometheus", "Grafana", "GitHub Actions"],
    diagram: { width: 760, height: 200, nodes: row("Nurse-call panels", "Alarm ingest", "Escalation engine", "Socket.IO gateway", "Pagers & dashboards", "Cloud sync (outbox)", ["b", "c"]), edges: snake },
  },
];

// TODO: confirm your role on each of these. Client names are left out on purpose.
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
      "Production on Hetzner with PM2: diagnosed an out-of-memory crash in the hotel sync, archived 5.8 GB of logs and added log rotation",
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
      "A geo-search directory of Indian restaurants, served from inside the client's existing WordPress domain. 4,260 restaurants discovered for the UK launch.",
    role: "Led architecture and delivery; each milestone approved by the client on submission.",
    highlights: [
      "Replaced Google Places with open data (Overture + FSA) after a licensing review, without moving price or deadline",
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
    title: "Team Lead – Full Stack",
    period: "Jul 2024 – present", // TODO: change to the last-day month after you leave
    points: [
      "Promoted to lead the team and act as reporting manager: resource allocation, sprint planning, code review and mentoring",
      "Own timely delivery of Upwork and direct client projects: estimates, milestones, scope control and client sign-off",
      "Primary contact for clients in Australia, the US, Canada, the UK, the UAE and Germany",
    ],
  },
  {
    company: "Eminence Technology",
    place: "Mohali",
    title: "MERN Stack Developer",
    period: "Aug 2022 – Jun 2024",
    points: [
      "Built and shipped client products including TruGamer, its SideKick AI assistant, and PodAgain",
      "Deployed and maintained projects on AWS (EC2, ECS, ECR, S3, CloudWatch) with Docker and CI/CD pipelines",
    ],
  },
  {
    company: "GeekyBones",
    place: "Mohali",
    title: "Software Engineer",
    period: "Mar 2021 – Jul 2022",
    points: [
      "Multi-Choice: survey and records platform for schools (Node.js, Express, PostgreSQL, TypeORM)",
      "Goliath: multi-site CMS on Next.js, GraphQL and DynamoDB",
      "Unova: QR and barcode product tracking with Apple Maps location views",
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
  smartcaller: { line: "Real-time nurse-call and alarm platform running inside hospitals", icon: "pulse", from: "#0f766e", to: "#1e3a8a" },
  trugamer: { line: "369,000+ games indexed, with an AI assistant on top", icon: "game", from: "#1d4ed8", to: "#7c3aed" },
  podagain: { line: "Turns a podcast archive into new AI-voiced episodes", icon: "mic", from: "#2563eb", to: "#60a5fa" },
  "group-booking": { line: "Group hotel offers from live supplier inventory into Odoo", icon: "plane", from: "#0369a1", to: "#0891b2" },
  "restaurant-directory": { line: "Geo-search directory of 4,260 restaurants for a UK launch", icon: "pin", from: "#b45309", to: "#dc2626" },
  "daily-quiz": { line: "Daily quiz with streaks for a 5,000-member community", icon: "trophy", from: "#7c3aed", to: "#db2777" },
  "amplify-investigation": { line: "Found why an AWS deploy failed 20 times in a row", icon: "cloud", from: "#c2410c", to: "#f59e0b" },
  "business-platform-site": { line: "Sales site with 16 interactive demos for an AI business suite", icon: "browser", from: "#4338ca", to: "#0ea5e9" },
  "secure-ai-saas": { line: "GDPR-first architecture for AI on sensitive documents", icon: "shield", from: "#15803d", to: "#0f766e" },
};
