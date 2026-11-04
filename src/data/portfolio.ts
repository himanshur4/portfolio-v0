import type {
  EducationItem,
  ExperienceItem,
  FeaturedProject,
  Links,
  Practice,
  OtherProject,
  Profile,
  Site,
  SkillGroup,
} from "./types";

/*
 * Everything personal on the site lives in this file; components only render it.
 *
 * - A value that is empty or starts with "YOUR_" is treated as not configured
 *   and hidden, so placeholders never show up as broken links.
 * - Files referenced from /public (resume, avatar, cover) are linked only once
 *   the file actually exists there. Drop the file in and rebuild.
 */

export const site: Site = {
  // TODO: set the real domain once deployed (e.g. "https://himanshur4.vercel.app").
  // It turns on the canonical URL, sitemap entry and absolute social-preview URLs.
  // NEXT_PUBLIC_SITE_URL overrides it; on Vercel the production URL is used as a fallback.
  url: "YOUR_SITE_URL",
  description:
    "Software engineer building backend systems and full-stack products. Final-year CSE student at IIIT Ranchi, open to SDE / SWE roles.",
};

export const profile: Profile = {
  name: "Himanshu Raj",
  firstName: "Himanshu",
  lastName: "Raj",
  role: "Software Engineer",
  location: "Ranchi, India",
  headline: "I build backend systems and full-stack products.",
  intro:
    "I’m a final-year Computer Science student at IIIT Ranchi. I enjoy building products end to end and understanding the systems behind them.",
  availability: "Open to SDE / SWE roles",
  // Add a square-ish photo at public/avatar.jpg (or change the path). Initials show until then.
  avatar: { src: "/avatar1.png", alt: "Portrait of Himanshu Raj" },
  // Your cover photo: save it as public/cover.jpg (for a .png or .webp, change the path here).
  // Until that file exists, the generated contour drawing is shown instead.
  cover: { src: "/cover48.png", alt: "cover" },
  coverCaption: "himanshu.tech37@gmail.com",
};

export const links: Links = {
  email: "himanshu.tech37@gmail.com",
  github: "https://github.com/himanshur4",
  linkedin: "https://linkedin.com/in/himanshur4",
  // Put the PDF at public/Himanshu_Raj_Resume.pdf and every Resume link turns on.
  resume: "/Himanshu_Raj_Resume.pdf",
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "eventrail",
    name: "EventRail",
    period: "2026",
    kind: "Event streaming broker",
    description:
      "A persistent event streaming broker built from scratch in TypeScript with no runtime dependencies, using a custom binary protocol over TCP. Its crash-safe storage engine recovers from torn writes without losing acknowledged records, and consumer groups use heartbeats to detect failures and rebalance partitions across members.",
    stack: [
      "TypeScript",
      "Node.js",
      "TCP sockets",
      "Binary protocol design",
      "Storage engines",
      "Pub/Sub messaging",
    ],
    source: "https://github.com/himanshur4/event-rail",
  },
  {
    slug: "chatter",
    name: "Chatter",
    period: "2026",
    kind: "Real-time chat platform",
    description:
      "A real-time chat platform built as 3 Node.js microservices (user, chat, mail) that communicate over REST and RabbitMQ. Passwordless OTP login uses Redis for expiry and rate limiting, and Socket.IO handles presence, typing and read receipts. GitHub Actions deploys to AWS EC2 with health checks and automatic rollback.",
    stack: [
      "TypeScript",
      "Node.js",
      "Next.js",
      "Socket.IO",
      "RabbitMQ",
      "Redis",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "AWS EC2",
      "Nginx",
    ],
    source: "https://github.com/himanshur4/chatter",
    demo: "https://chatter-t.me",
  },
  {
    slug: "lernix",
    name: "Lernix",
    period: "2025–26",
    kind: "Course platform",
    description:
      "An online learning platform where educators publish courses and students pay, enroll and track progress. A signed Stripe webhook confirms each enrollment, not the browser. Clerk handles role-based sign-in, and Redis caches the course list, clearing it when a new course is published.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Express",
      "MongoDB",
      "Redis",
      "Clerk",
      "Stripe",
      "Cloudinary",
    ],
    source: "https://github.com/himanshur4/lernix-learning-platform",
    demo: "https://lernix-psi-two.vercel.app",
  },
  {
    slug: "vibecall",
    name: "VibeCall",
    period: "2025",
    kind: "Video calls & chat",
    description:
      "A video calling and chat app where users add friends, then message or start one-to-one calls. The Express API manages accounts and friend requests and issues tokens for Stream, which runs chat and video. Login uses a JWT in an httpOnly cookie.",
    stack: [
      "React",
      "Vite",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "Express",
      "MongoDB",
      "Stream Chat & Video",
    ],
    source: "https://github.com/himanshur4/VibeCall",
    demo: "https://vibe-call.vercel.app",
  },
  {
    slug: "khetmitra",
    name: "KhetMitra",
    period: "2026",
    kind: "AI farm advisor",
    description:
      "A voice-first AI farm advisor that answers in Hindi or English. An agent loop pulls live weather, mandi prices, soil data and official advisories, and a guardrail removes any number no source supports. A daily check warns farmers before bad weather reaches their crops.",
    stack: [
      "Next.js",
      "TypeScript",
      "Vercel AI SDK",
      "Gemini",
      "PostgreSQL",
      "pgvector",
      "Prisma",
      "Sarvam AI",
      "Zod",
    ],
    source: "https://github.com/himanshur4/khet-mittar",
    demo: "https://khet-mittar.vercel.app",
  },
];

export const otherProjects: OtherProject[] = [
  {
    name: "ExpenseWise",
    period: "2025",
    description:
      "An expense tracker with a GraphQL API (Apollo Server on Express), Passport sessions stored in MongoDB, and Chart.js breakdowns by category.",
    stack: ["React", "Apollo Client", "GraphQL", "Passport", "MongoDB", "Chart.js"],
    source: "https://github.com/himanshur4/Expense-wise",
    // The Render demo (https://expense-wise-o97x.onrender.com) didn't respond on
    // 2026-10-24. Add it back as `demo` once it loads again.
  },
  {
    name: "TripNest",
    period: "2025",
    description:
      "A trip planner on Firebase with day-by-day itineraries and cover photos. Its Discover page pairs Unsplash photos with descriptions generated by Gemini.",
    stack: ["React", "Firebase Auth", "Firestore", "TanStack Query", "Cloudinary", "Gemini API"],
    source: "https://github.com/himanshur4/trip-nest",
    demo: "https://trip-nest-1.web.app",
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Full Stack Developer Intern",
    org: "CreditSea",
    location: "Remote",
    period: "Sep – Oct 2025",
    points: [
      "Replaced hardcoded push notifications with 10+ dynamic REST APIs, so admins can create notification types and send broadcasts without code changes.",
      "Automated activity-based reminders with cron jobs for an app with 50,000+ daily users, prompting users to finish pending flows.",
      "Cut API response times by 60% by moving filtering and querying into MongoDB aggregation pipelines.",
      "Built a monthly loan report API that tracks borrowers and installment payments and updates loan and application statuses automatically, plus parts of the admin dashboard.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Indian Institute of Information Technology Ranchi",
    degree: "B.Tech, Computer Science and Engineering",
    period: "2023 – 2027",
    detail: "CGPA 8.02 / 10",
  },
];

// Only max ratings are shown, and they rise on their own (src/lib/cp-ratings.ts). These values
// are the floor and the fallback for when a platform can't be reached. Last checked 2026-11-04.
export const practice: Practice = {
  summary: "1,500+ DSA problems solved and 100+ contests across platforms.",
  profiles: [
    {
      platform: "LeetCode",
      handle: "rajhimanshu403",
      href: "https://leetcode.com/u/rajhimanshu403",
      maxRating: 1841,
    },
    {
      platform: "Codeforces",
      handle: "himanshur4",
      href: "https://codeforces.com/profile/himanshur4",
      maxRating: 1280,
    },
    {
      platform: "AtCoder",
      handle: "himanshur4",
      href: "https://atcoder.jp/users/himanshur4",
      maxRating: 509,
    },
    {
      platform: "CodeChef",
      handle: "himanshur4",
      href: "https://www.codechef.com/users/himanshur4",
      maxRating: 1673,
    },
  ],
};

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "C++", "Java", "Python", "SQL"] },
  {
    label: "Backend",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "Socket.IO", "Prisma"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Redux", "Zustand", "TanStack Query"],
  },
  {
    label: "Databases & messaging",
    items: ["PostgreSQL", "MongoDB", "Redis", "Apache Kafka", "RabbitMQ"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS EC2", "Docker", "GitHub Actions", "Nginx", "Linux", "Cloudflare", "Git"],
  },
  {
    label: "Backend concepts",
    items: ["Distributed systems", "Microservices", "Event-driven architecture", "Caching", "WebSockets"],
  },
  {
    label: "CS fundamentals",
    items: ["Data structures & algorithms", "OOP", "Operating systems", "DBMS", "Computer networks"],
  },
];

/** In-page sections, in order. Used by the navigation. */
export const sections = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "problem-solving", label: "Problem solving" },
  { id: "contact", label: "Contact" },
] as const;
