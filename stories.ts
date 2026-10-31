// Real problems from real projects: what broke, what I did, what changed.
// Shown as the "Problems I've solved" section and inside each project popup.

export type Story = {
  slug: string; // project this belongs to
  tag: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
};

export const stories: Story[] = [
  {
    slug: "smartcaller",
    tag: "Healthcare · Architecture",
    title: "A hospital alarm system can't wait for the internet",
    problem:
      "Nurse-call alarms are life-critical. A cloud-first design meant one dropped connection could leave a patient's call unanswered, and every site ran different panel hardware.",
    solution:
      "Kept the whole alarm path on-site: panel parsers over TCP and serial, Redis-backed escalation workers that re-route unanswered calls, live dashboards over Socket.IO. The cloud only receives data through an outbox that syncs whenever the line is up.",
    result:
      "Alarms keep flowing with the internet down. Sites install from a Windows package and update themselves every 6 hours from CI releases.",
  },
  {
    slug: "amplify-investigation",
    tag: "AWS · Incident",
    title: "20 failed deploys, and AWS's own docs were the bug",
    problem:
      "A client's AWS Amplify stack rolled back on every deploy, 20 times in eight days, blocking a milestone. The client was sure a token permission was the cause.",
    solution:
      "Pinned the failing resource from CloudFormation events, matched GitHub's error byte for byte, then reproduced it outside CloudFormation with the CLI and a one-resource probe template. Ruled out 8 causes by measurement.",
    result:
      "Proved AWS's documented token can't read a private repo, which Amplify does first. A single-repo fine-grained token fixed it, backed by a full evidence report.",
  },
  {
    slug: "group-booking",
    tag: "Production · DevOps",
    title: "Production kept crashing in the middle of the night",
    problem:
      "The booking platform's server went down during the weekly hotel-content sync, and some hotel suppliers silently vanished from search results.",
    solution:
      "Traced the crash to the sync hitting Node's default 4 GB heap, archived 5.8 GB of runaway logs and added daily log rotation, cleared orphaned sync jobs, and found the supplier codes in production didn't match the supplier API's codes.",
    result:
      "Server back to a healthy state without a restart, and 7 silently dropped suppliers identified, with the exact code mapping the client needs to bring them back.",
  },
  {
    slug: "restaurant-directory",
    tag: "Compliance · Delivery",
    title: "A licensing trap found before a line of code",
    problem:
      "The client wanted a restaurant directory built on Google Places data. Google's terms forbid using it to build a listings service, which would have put the whole product at legal risk.",
    solution:
      "Re-planned discovery on licence-safe open data (Overture Maps and the UK food hygiene register), moved maps to open tiles, and handled every later scope request through a written change process.",
    result:
      "No change to price or deadline; 4,260 restaurants discovered for the UK launch and milestones signed off by the client, the first on the day it was submitted.",
  },
  {
    slug: "daily-quiz",
    tag: "Scoping · Client",
    title: "A quick fix that would have failed at 5,000 users",
    problem:
      "The job was first scoped as quick spreadsheet glue. The client's real goal, 5,000 members playing daily inside a closed community platform, would have broken it on day one.",
    solution:
      "Ran a small paid proof of concept to prove the platform passes member identity, then re-scoped to a real product: admin panel, API, Postgres and a single-file embed.",
    result:
      "Client approved the full product plan. Streaks run on New York time, so daylight saving never quietly breaks a player's streak at 11 pm.",
  },
  {
    slug: "trugamer",
    tag: "Scale · Data",
    title: "369,000 games without hammering the source API",
    problem:
      "Every page on a gaming platform needs fresh metadata from a rate-limited upstream API, for hundreds of thousands of titles.",
    solution:
      "Moved to a sync-and-cache design: workers pull IGDB data into PostgreSQL, a cache layer serves hot queries, and an AI assistant answers questions from the same data.",
    result: "369,000+ games indexed and served fast, with upstream calls cut to the sync jobs.",
  },
];

// How I run delivery. `example` is not shown on the site; it's the real story to tell when an interviewer asks.
export type Practice = { title: string; how: string; example: string };

export const playbook: Practice[] = [
  {
    title: "Scope it before I promise it",
    how: "Every estimate is broken down by phase so the client can see where the effort goes. When a key unknown could sink the plan, I propose a small paid proof of concept first.",
    example: "Community quiz: a small paid POC proved the platform passes member identity, then the plan was split into setup, backend, admin panel, quiz and integration phases.",
  },
  {
    title: "Milestones with measurable acceptance",
    how: "Each milestone has a written definition of done with numbers, agreed before work starts, so sign-off is a check rather than a debate.",
    example: "Restaurant directory: '1,200 qualifying published records' was pinned down, including the difference between 'qualifying' and 'indexable', so it couldn't be disputed at final acceptance.",
  },
  {
    title: "Scope creep goes through change requests",
    how: "New asks are welcome, but nothing new is absorbed silently. Each one gets a cost and date impact in writing, and the client decides.",
    example: "When a client kept adding editorial pages through design files, they were quoted as a separate phase instead of quietly breaking the milestone date.",
  },
  {
    title: "Resource allocation across parallel projects",
    how: "With one team spread across several client projects, I plan capacity weekly, match people to work by skill, and re-plan quickly when someone moves or leaves.",
    example: "When a developer left mid-project, I took over development and client handling myself so the client's launch didn't slip.",
  },
  {
    title: "Quality before every release",
    how: "Every change goes through code review, gets tested on staging, and is shown to the client before it reaches production. Problems get caught by the team, not by users.",
    example: "On the nurse-call platform, releases are built by CI and shipped as versioned packages that hospital sites update to automatically, so nothing untested reaches a live ward.",
  },
  {
    title: "Clients always know the next step",
    how: "Every update says what's done, what's next with dates, and exactly what I need from the client. Verbal agreements are restated in writing.",
    example: "A non-technical client who went quiet for 5–10 days at a time got short, dated action lists instead of documents, and approved the plan.",
  },
  {
    title: "Risks surfaced early, not at launch",
    how: "Licensing, security and production health are checked as part of delivery. Problems go to the client with a recommended fix, before they turn into incidents.",
    example: "Flagged a licensing conflict before build started, credentials shared in plain text for rotation, and a production memory crash with its root cause.",
  },
  {
    title: "Clean handover",
    how: "Projects close with documented access, deployment steps and known limits, so the client is never dependent on one person's memory.",
    example: "On the directory project, a full access and logins handover document was agreed as part of final acceptance.",
  },
];
