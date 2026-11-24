// All site copy lives here. Sources: the four resumes and each project's own docs.

export const person = {
  name: "Krishna Gahlod",
  email: "krishnagahlod@gmail.com",
  linkedin: "https://www.linkedin.com/in/krishna-gahlod-65143927b/",
  github: "https://github.com/krishnagahlod",
  seeking: "Open to new roles, ideally AI product manager or forward deployed engineer",
  intro:
    "I work where product and engineering meet: I decide what to build, then build and ship it. So far: five live apps at Golash, a mindset training product with 200+ users, and conversational AI agents at Accenture.",
};

export type GolashApp = {
  name: string;
  color: string;
  tagline: string;
  what: string;
  url: string;
  tour?: string; // a looping scroll-through video of the live site
  shot: string;
  caseStudy?: string;
  stats?: { value: string; label: string }[];
};

export const golashApps: GolashApp[] = [
  {
    name: "InternPrep AI",
    color: "#8B5CF6",
    tagline: "Get shortlisted. Then walk in prepared.",
    what: "An AI interviewer that pushes back, plus a resume audit against the role you want.",
    url: "https://internprep-ai.golash.in",
    shot: "/img/app-internprep.webp",
    tour: "/tour/internprep.mp4",
    caseStudy: "internprep-ai",
    stats: [
      { value: "100+", label: "active users" },
      { value: "270+", label: "cases with answer keys" },
    ],
  },
  {
    name: "Opportunity OS",
    color: "#3B82F6",
    tagline: "High-fit opportunities, before they close.",
    what: "Internships, jobs, hackathons and fellowships in one feed, each scored against your resume.",
    url: "https://opportunity-os.golash.in",
    shot: "/img/app-opportunities.webp",
    tour: "/tour/opportunities.mp4",
    caseStudy: "opportunity-os",
    stats: [
      { value: "50+", label: "career networks" },
      { value: "10,000+", label: "opportunities processed" },
    ],
  },
  {
    name: "Finalist",
    color: "#F59E0B",
    tagline: "From case brief to final deck, faster.",
    what: "A coach for case competitions that guides a team from the brief to the deck without writing the answer for them.",
    url: "https://finalist.golash.in",
    shot: "/img/app-finalist.webp",
    tour: "/tour/finalist.mp4",
  },
  {
    name: "OnTrack",
    color: "#22C9A0",
    tagline: "Never miss a deadline.",
    what: "Deadlines, reminders, timetable and attendance on your phone, with a shared setup for class reps.",
    url: "https://ontrack.golash.in",
    shot: "/img/app-ontrack.webp",
    tour: "/tour/ontrack.mp4",
  },
  {
    name: "Attempt",
    color: "#F43F5E",
    tagline: "Turn any exam PDF into a real timed test.",
    what: "Upload a past paper and sit it as a timed computer-based test. The PDF and your score stay on your device.",
    url: "https://attempt.golash.in",
    shot: "/img/app-attempt.webp",
    tour: "/tour/attempt.mp4",
  },
];

// A live site. `embed` marks the ones that allow this site to show them in a frame, checked against their response headers.
// The rest open in a new tab. `allow` passes a browser permission, such as the camera, into the frame.
export type LiveSite = { label: string; url: string; embed?: boolean; allow?: string; poster?: string };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  when: string;
  role: string;
  deep: string; // section background
  bright: string; // accent on the deep background
  summary: string;
  live?: LiveSite[];
  stack: string[];
  cover?: string;
  tour?: string; // a looping scroll-through video of the live site, played over the cover
  example?: { prompt: string; rules: string[] }; // typographic cover when there is no screenshot
  numbers: { value: string; label: string }[];
  problem: string;
  built: string[];
  how: { title: string; text: string }[];
  gallery?: { src: string; caption: string; phone?: boolean }[]; // `phone` marks an upright phone screen with its own frame
};

export const projects: Project[] = [
  {
    slug: "golash",
    name: "Golash",
    kind: "Company and product family",
    when: "2026 to now",
    role: "Founder, solo",
    deep: "#15107A",
    bright: "#A5A0FF",
    summary:
      "Free tools and five apps for Indian college students, built by a student. I design, build and run all of it.",
    live: [{ label: "golash.in", url: "https://golash.in" }],
    stack: ["Next.js 16", "React 19", "TypeScript", "Cloudflare Workers", "Supabase", "Neon Postgres", "Vercel"],
    cover: "/img/golash-home.webp",
    tour: "/tour/golash.mp4",
    numbers: [
      { value: "5", label: "apps live on their own subdomains" },
      { value: "7", label: "free tools that run in the browser" },
      { value: "1", label: "person designing, building and running it" },
    ],
    problem:
      "Student life in India runs on scattered tools. One site for attendance maths, another for a resume check, a WhatsApp group for deadlines and a forwarded message for internship leads. Each solves a sliver, none of them know about each other, and most ask you to sign up before they help.",
    built: [
      "Golash starts with small free tools on golash.in that fix one problem in the browser with no sign-up: an attendance calculator, a 30-second resume score, a CGPA converter, a stipend budget planner, a slide title checker, a PDF to mock test converter and a list of internships closing this week.",
      "Each tool leads into a deeper app when the student needs more. The resume score opens InternPrep AI, the attendance calculator opens OnTrack, the closing-this-week list opens Opportunity OS, the mock test opens Attempt and the slide checker opens Finalist.",
    ],
    how: [
      { title: "Tools first", text: "Every tool runs fully in the browser. The resume score is a browser port of the InternPrep scoring engine, so a resume never leaves the device." },
      { title: "One catalog", text: "A single catalog file drives every product link, status label and sitemap entry. An app without a live address is never linked." },
      { title: "A static hub", text: "golash.in is a fully static Next.js export served from Cloudflare Workers, so it stays fast and costs almost nothing to run." },
      { title: "Apps that share data", text: "The hub reads live data from the apps where it helps. The closing-this-week tool calls a public Opportunity OS endpoint that only accepts requests from golash.in." },
      { title: "One brand system", text: "Each app has its own colour inside a shared identity, so five products read as one family." },
    ],
    gallery: [
      { src: "/img/app-internprep.webp", caption: "InternPrep AI" },
      { src: "/img/app-opportunities.webp", caption: "Opportunity OS" },
      { src: "/img/app-finalist.webp", caption: "Finalist" },
      { src: "/img/app-ontrack.webp", caption: "OnTrack" },
      { src: "/img/app-attempt.webp", caption: "Attempt" },
    ],
  },
  {
    slug: "internprep-ai",
    name: "InternPrep AI",
    kind: "AI interview and resume preparation",
    when: "Jul 2026 to now",
    role: "Solo builder, part of Golash",
    deep: "#2A1869",
    bright: "#B9A2FF",
    summary:
      "A placement preparation platform where an AI interviewer pushes back, runs full case interviews and ends with a written report.",
    live: [{ label: "internprep-ai.golash.in", url: "https://internprep-ai.golash.in" }],
    stack: ["Next.js 16", "FastAPI", "Supabase", "pgvector", "Gemini", "Groq", "Render", "Vercel", "PostHog", "Sentry"],
    cover: "/img/app-internprep.webp",
    tour: "/tour/internprep.mp4",
    numbers: [
      { value: "100+", label: "active users" },
      { value: "270+", label: "cases with answer keys" },
      { value: "5,000+", label: "benchmark resume points searched by similarity" },
      { value: "99%", label: "uptime through heavy inference bursts" },
    ],
    problem:
      "Interview preparation is fragmented between generic question lists, scattered advice and practice that looks nothing like the role a student is targeting. Mock interviews with seniors are scarce in placement season, and most AI tools simply agree with whatever you say.",
    built: [
      "InternPrep AI runs case, product and domain interviews across five tracks: consulting, software and systems, data and analytics, finance and product management. Students answer by voice or text, use a whiteboard for cases, and get a written report at the end.",
      "It also audits a resume against a target role with an ATS score, bullet-by-bullet rewrites and a resume builder. The platform covers 10+ user journeys with 75+ features.",
    ],
    how: [
      { title: "Read the resume", text: "Gemini parses the resume. Each bullet is embedded and matched with pgvector similarity search against 5,000+ benchmark bullets, so feedback points to a stronger real example." },
      { title: "Let code direct the interview", text: "A state machine moves a case through four phases: prompt, structuring, analysis and synthesis. Code chooses every turn and the model only writes the words, which keeps interviews on track." },
      { title: "Survive provider failures", text: "An LLM router fails over across providers and across multiple keys, so an interview does not die halfway when one provider is rate limited." },
      { title: "Keep the backend quick", text: "A FastAPI backend on Render with 8+ endpoints uses background triggers to keep response times low." },
      { title: "Watch it in production", text: "CI/CD on Vercel and Render, with PostHog and Sentry to catch errors early." },
    ],
    gallery: [
      { src: "/img/internprep-pushback.webp", caption: "The interviewer pushes back on a weak answer" },
      { src: "/img/internprep-report.webp", caption: "The written report after an interview" },
      { src: "/img/internprep-resume-ats.webp", caption: "Resume audit with an ATS score" },
    ],
  },
  {
    slug: "opportunity-os",
    name: "Opportunity OS",
    kind: "AI opportunity discovery",
    when: "Mar 2026 to now",
    role: "Solo builder, part of Golash",
    deep: "#0E2C6E",
    bright: "#8DB8FF",
    summary:
      "Internships, jobs, hackathons and fellowships from 50+ career networks in one feed, each scored against your resume.",
    live: [{ label: "opportunity-os.golash.in", url: "https://opportunity-os.golash.in" }],
    stack: ["Next.js 16", "Supabase", "n8n", "Docker", "Gemini", "Llama 3.3", "Zod", "Resend", "Telegram API", "GitHub Actions"],
    cover: "/img/app-opportunities.webp",
    tour: "/tour/opportunities.mp4",
    numbers: [
      { value: "50+", label: "career networks aggregated" },
      { value: "10,000+", label: "opportunities processed" },
      { value: "10", label: "ingestion workflows" },
      { value: "15%", label: "more matches from behavioural feedback" },
    ],
    problem:
      "Students search across disconnected job boards, newsletters and community channels. The volume is high and the signal is low, so a promising opportunity is often buried before a student knows it exists.",
    built: [
      "Opportunity OS pulls opportunities into one place and scores each one from 0 to 100 against the student's resume, so the feed opens with what deserves an application first.",
      "Around the feed sit the tools that turn discovery into action: an application tracker, an action plan for each opportunity, cold outreach drafts, a calendar feed and a daily digest by email and Telegram.",
    ],
    how: [
      { title: "Ingest", text: "A Dockerized n8n pipeline with 10 workflows collects listings. Structured sources go straight into the database at zero AI cost. Unstructured pages go through AI extraction into Zod-validated JSON." },
      { title: "Extract in two passes", text: "The first pass is strict and returns nothing rather than guess. A second, asynchronous pass enriches the record. Gemini runs first, with Llama as a fallback." },
      { title: "Score", text: "Each opportunity gets a composite score: 30% fit, 25% value, 15% actionability, 10% timing, 10% behaviour and 10% source quality, scaled by a confidence multiplier." },
      { title: "Learn from behaviour", text: "Saves, dismissals and applications feed back into the ranking, which raised user matches by 15%." },
      { title: "Deliver", text: "Digests go out through Resend and the Telegram API on a schedule." },
      { title: "Keep the bill small", text: "Scheduled runs on GitHub Actions keep API spend to a minimum." },
    ],
    gallery: [{ src: "/img/opportunity-old.webp", caption: "An earlier version of the home page" }],
  },
  {
    slug: "tarashio",
    name: "Tarashio",
    kind: "Mindset training app",
    when: "Sep 2026 to now",
    role: "CTO",
    deep: "#16205E",
    bright: "#FFC94A",
    summary:
      "A mindset training app that turns everyday moments into short practice tasks. As CTO I have built the product since its first commit: the training engine, the app, the admin console and the launch site.",
    live: [
      { label: "tarashio.com", url: "https://www.tarashio.com", embed: true },
      { label: "app.tarashio.com", url: "https://app.tarashio.com" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "PostHog", "Sentry", "Resend", "Vercel"],
    cover: "/img/tarashio-home.webp",
    tour: "/tour/tarashio.mp4",
    numbers: [
      { value: "200+", label: "users on the app, and growing" },
      { value: "46", label: "automated tests that check the build against the product spec" },
      { value: "16", label: "training tasks in the launch set" },
      { value: "160+", label: "commits since September 2026" },
    ],
    problem:
      "Most mindset advice is read once and forgotten. Tarashio starts from the idea that mindset is trained through friction: small, deliberate tasks in ordinary life, such as pausing before opening an app, repeated until they stick. The product has to hand each person the right task at the right difficulty every day, without a human coach.",
    built: [
      "The app opens with a short discovery questionnaire and then assigns everyday behavioural tasks. People check in, reflect, and the training adapts. Progress runs on energy and XP, with streaks and a capacity that grows as they do.",
      "It works in English and Roman Hinglish, lets a guest try it before signing up, and has an admin console for analytics and for managing users and drills.",
    ],
    how: [
      { title: "A daily engine", text: "Every training day resets at 04:00 IST. An energy ledger decides how much a person can take on, and their capacity grows from 3 slots to 6 as they progress." },
      { title: "Assignment and calibration", text: "Tasks come from a versioned pool of task variants and are calibrated to the person, so the difficulty moves with them." },
      { title: "Tests that follow the spec", text: "46 tests in 7 suites verify the engine against the product requirements, including the integrity of the task pool." },
      { title: "Low-friction sign-in", text: "A guest trial comes first. Accounts use email one-time codes or Google through Supabase, with transactional email through Resend." },
      { title: "Watching production", text: "PostHog and Sentry cover product analytics and errors, and an admin dashboard tracks usage." },
      { title: "The launch site", text: "tarashio.com is built from scroll-linked pinned scenes, with animation limited to properties the browser can composite cheaply." },
    ],
    gallery: [
      { src: "/img/tarashio-1-welcome.webp", caption: "Welcome, with a way to try before signing up", phone: true },
      { src: "/img/tarashio-2-discovery.webp", caption: "A short discovery of goals and routines", phone: true },
      { src: "/img/tarashio-3-home.webp", caption: "Home: the next task, and the week so far", phone: true },
      { src: "/img/tarashio-4-task.webp", caption: "A task: what to do, what to avoid, what it costs", phone: true },
      { src: "/img/tarashio-5-tasks.webp", caption: "Tasks: in progress, history and a surprise slot", phone: true },
      { src: "/img/tarashio-6-progress.webp", caption: "Progress: streak, energy capacity, achievements", phone: true },
      { src: "/img/tarashio-7-streak.webp", caption: "A missed day puts the streak on hold, not back to zero", phone: true },
    ],
  },
  {
    slug: "stock-scout",
    name: "Stock Scout",
    kind: "Plain-language investing for first-time investors",
    when: "Jul 2026 to now",
    role: "Solo builder",
    deep: "#3F2E00",
    bright: "#F4C955",
    summary:
      "Say what you want from your money in one sentence. Stock Scout finds Nifty 500 companies that fit, explains each one in everyday words and splits your budget into whole shares.",
    live: [{ label: "stockscout-five.vercel.app", url: "https://stockscout-five.vercel.app" }],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Postgres", "Python", "pandas", "GitHub Actions", "Vercel"],
    cover: "/img/stockscout-home.webp",
    numbers: [
      { value: "500+", label: "Nifty 500 companies refreshed every weeknight" },
      { value: "770,000+", label: "daily prices since 2015" },
      { value: "12", label: "metrics explained in plain words" },
    ],
    problem:
      "Most investing apps assume you already speak finance. A first-time investor with a few thousand rupees faces P/E ratios, screeners and tips from group chats, and no simple way to go from what they want to what they could actually buy.",
    built: [
      "Stock Scout starts with a sentence, such as steady companies that pay me something every year, or one of five ready-made ideas. It returns a short list of companies spread across industries, the reasons each one fits, and how many whole shares a budget buys.",
      "Every company page opens with three plain answers: is the business strong, is the price reasonable, is the share rising or falling. Every number underneath explains itself on tap. It never places orders or gives tips; people buy in their own broker app and track the result here.",
    ],
    how: [
      { title: "Words to rules", text: "A language model turns the sentence into rules drawn from a fixed list of 12 metrics. Code validates every rule and drops anything unknown, so the model cannot invent a filter." },
      { title: "Rank with code", text: "A TypeScript engine filters and ranks the Nifty 500, keeps at most two companies per industry and writes each reason from the company's real numbers." },
      { title: "Budget to shares", text: "A planner splits any amount into whole shares across the picks and shows exactly what is left over." },
      { title: "One snapshot, fast pages", text: "A Postgres materialized view keeps one row per company, so pages never scan the full price history. Supabase row-level security keeps every portfolio private." },
      { title: "No server to babysit", text: "A nightly GitHub Actions job pulls prices, fundamentals and news, then refreshes the snapshot. The web app runs on Vercel with no backend server." },
    ],
  },
  {
    slug: "plank-pro",
    name: "Plank Pro",
    kind: "Real-time pose judging in the browser",
    when: "May to Jul 2026",
    role: "Solo builder, for a sports startup",
    deep: "#0B3A4A",
    bright: "#7FDCF5",
    summary:
      "A selection portal for a plank endurance league. The webcam judges form and time in real time, with no server compute at all.",
    live: [{ label: "plank-pro.vercel.app", url: "https://plank-pro.vercel.app/", embed: true, allow: "camera" }],
    stack: ["Next.js", "TensorFlow.js", "MoveNet Lightning", "Supabase", "Vercel Edge"],
    cover: "/img/plank-home.webp",
    numbers: [
      { value: "30+", label: "frames per second in the browser" },
      { value: "90%", label: "less landmark jitter after filtering" },
      { value: "20+", label: "edge cases validated" },
      { value: "0", label: "server-side compute for inference" },
    ],
    problem:
      "A plank league needed to shortlist candidates without in-person tryouts. Sending video to a server to be judged would have been slow, expensive and a privacy problem for the people on camera.",
    built: [
      "Plank Pro runs the whole judge in the browser. A candidate records a plank through the webcam, the model tracks the body in real time, and the best scores go onto a leaderboard that organisers shortlist from.",
      "Video never leaves the device. Only the scores are sent.",
    ],
    how: [
      { title: "Calibrate", text: "A 5-second calibration flow uses geometric constraints so the judge works in different rooms and camera angles." },
      { title: "Track", text: "MoveNet Lightning runs in TensorFlow.js at 30+ frames per second and returns 17 body landmarks." },
      { title: "Smooth", text: "A One Euro Filter removes 90% of landmark jitter without adding lag." },
      { title: "Judge by geometry", text: "Hip angle, body tilt, arm angle and a knee-drop check separate a real plank from lying flat or resting on the knees." },
      { title: "Keep state", text: "A state machine moves through four form states. Short breaks pause the timer and sustained broken form ends the attempt." },
      { title: "Score and protect", text: "The score combines valid time with form quality, and geometric anti-cheat checks flag suspicious attempts for review." },
    ],
    gallery: [{ src: "/img/plank-illustration.webp", caption: "The landmark overlay a candidate sees" }],
  },
  {
    slug: "sustainability-cell",
    name: "Sustainability Cell",
    kind: "Campus website, AI co-pilot and carbon calculator",
    when: "May 2025 to Apr 2026",
    role: "Manager, Web and Design",
    deep: "#143D27",
    bright: "#86DDA0",
    summary:
      "The digital home of IIT Bombay's Sustainability Cell: a revamped website, a co-pilot that answers from the Cell's own documents, and a 100-parameter footprint calculator.",
    live: [
      { label: "Sustainability Cell site", url: "https://gymkhana.iitb.ac.in/~sustainabilitycell/", embed: true },
      { label: "GreenScore calculator", url: "https://gymkhana.iitb.ac.in/~sustainabilitycell/green-score", embed: true },
    ],
    stack: ["React", "Flask", "RAG", "MiniLM embeddings", "Llama 3.3", "Gemini", "Streamlit", "Supabase"],
    cover: "/img/suscell-live.webp",
    tour: "/tour/suscell.mp4",
    numbers: [
      { value: "800+", label: "students reached" },
      { value: "100+", label: "parameters in the calculator" },
      { value: "21", label: "hostels with digitised waste reporting" },
      { value: "23", label: "members in the team" },
    ],
    problem:
      "The Cell needed a clearer public home for its initiatives and programmes. Students had to dig through scattered pages and PDFs to get an answer, and hostel waste data lived in files that were hard to turn into a report.",
    built: [
      "As Manager for Web and Design I rebuilt the website, built a co-pilot that answers questions from the Cell's own material, and launched GreenScore, a calculator made for campus life.",
      "I also digitised waste reporting for 21 hostels, which now feeds the drafting of IIT Bombay's annual sustainability report.",
    ],
    how: [
      { title: "A clearer website", text: "The information architecture brings initiatives and resources into one understandable public experience that works on the phones students actually use." },
      { title: "A grounded co-pilot", text: "The chatbot retrieves from the Cell's own PDFs and FAQ before answering, so replies stay tied to source material." },
      { title: "GreenScore", text: "The calculator asks about hostel, credits, labs, showers, food orders and travel, then returns a score from 1 to 10 with carbon, water and waste figures." },
      { title: "Waste data", text: "A reporting portal replaces spreadsheets for hostels and mess, with roles for each kind of reporter." },
    ],
    gallery: [{ src: "/img/suscell-home.webp", caption: "The home page of the revamped site" }],
  },
  {
    slug: "hostel-affairs",
    name: "Hostel Affairs",
    kind: "Official council website for IIT Bombay's hostels",
    when: "Jul to Oct 2026",
    role: "Solo designer and developer, as Institute System Administrator",
    deep: "#3D123F",
    bright: "#EBAAF0",
    summary:
      "The official site of the Hostel Affairs Council, which looks after 21 residence halls and 13,000+ residents at IIT Bombay. It is built around what students come to do, and the next council can update it without touching code.",
    live: [{ label: "Hostel Affairs site", url: "https://gymkhana.iitb.ac.in/~hostelaffairs/", embed: true }],
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "cmdk", "JSON content files"],
    cover: "/img/hostelaffairs-home.webp",
    tour: "/tour/hostelaffairs.mp4",
    numbers: [
      { value: "21", label: "residence halls, each with its own page" },
      { value: "26", label: "questions answered across 6 topics" },
      { value: "14", label: "campus portals and resources in one searchable place" },
      { value: "111", label: "commits, all mine, from July to October 2026" },
    ],
    problem:
      "The previous site described the council, but it did not help a student get something done: find the right person, a hostel's details, a document or an answer. I also wanted the next council to be able to keep the new one current without a developer.",
    built: [
      "A fast static site built around tasks: a directory of all 21 hostels with a page for each, a searchable FAQ, the campus portals a resident needs, emergency contacts and the council team.",
      "Every piece of content sits in a plain data file, so a future council edits a file instead of code. I also wrote the deployment and maintenance guide for the system administrators who come after me.",
    ],
    how: [
      { title: "Content as data", text: "Hostels, questions, resources, the team, events and emergency contacts each live in one JSON file. Pages are generated from them, so a content change never needs a code change." },
      { title: "Search from anywhere", text: "A command palette searches hostels, questions, portals and council members from any page." },
      { title: "A page for every hostel", text: "Each of the 21 halls has its own page with its representatives, emergency contacts and facilities, and the directory filters by facility." },
      { title: "No server to maintain", text: "The site is a static Next.js export served from the Gymkhana web server under its own sub-path, so there is nothing running to patch or restart." },
      { title: "Built to be handed over", text: "A written deployment and maintenance guide lets the next administrator update the site safely." },
    ],
    gallery: [
      { src: "/img/hostelaffairs-hostels.webp", caption: "The hostels directory, with filters by facility" },
      { src: "/img/hostelaffairs-faq.webp", caption: "Questions grouped by topic, with search" },
      { src: "/img/hostelaffairs-resources.webp", caption: "Campus portals and resources in one place" },
    ],
  },
];

// Golash and its two apps are presented in the Golash section, so the work drum shows everything else.
const inGolash = ["golash", "internprep-ai", "opportunity-os"];
export const wheel = projects.filter((p) => !inGolash.includes(p.slug));

export const experience = [
  {
    company: "Accenture",
    role: "Management Consulting Delivery Associate, Strategy and Consulting",
    when: "May to Jul 2026",
    deep: "#3A0F6B",
    bright: "#D3A8FF",
    summary:
      "Developed an internal GenAI point of view: a framework for reliable, secure conversational AI agents on Google's CX Agent Studio.",
    points: [
      "Built a 10-agent telecom assistant on a flat router, cutting handoff latency to 0.4 seconds",
      "Raised the clean-pass rate from 31% to 63% across 16 evaluation scenarios",
      "Found and fixed 2 critical vulnerabilities through an 18-attempt security assessment",
      "Wrote a 37-page playbook of 8 declarations and 5 practices, presented to senior leadership",
    ],
  },
  {
    company: "Gnaan U",
    role: "AI Developer Intern",
    when: "Sep 2026 to now",
    deep: "#5B1220",
    bright: "#FF9FAE",
    summary:
      "Building the pipeline that produces classroom-ready teaching methods for Indian schools: tools that find, evaluate, map and illustrate each method before a teacher sees it.",
    points: [
      "Built a 12-stage research pipeline that finds, verifies and screens teaching methods through 4 quality and safety gates",
      "Developed an AI evaluator that reviews each method on a 7-question rubric and queues its decision for human approval",
      "Engineered a mapper that matched 51 of 69 methods to textbook topics and declined the rest when evidence was weak",
      "Benchmarked 5 image models on cost per accepted image for a pipeline that illustrates each method step by step",
    ],
  },
  {
    company: "Tarashio",
    role: "Chief Technology Officer",
    when: "Sep 2026 to now",
    deep: "#16205E",
    bright: "#FFC94A",
    summary:
      "Leading technology at a mindset training startup. I built the app, the engine behind it and the launch site, and I run them in production.",
    points: [
      "Built the product from its first commit across 160+ commits: training engine, app, admin console and launch site",
      "Grew the app to 200+ users, with a guest trial that lets people start before they sign up",
      "Designed a daily training engine with an energy ledger and a capacity that grows from 3 task slots to 6",
      "Wrote 46 automated tests in 7 suites that verify every build against the product spec",
    ],
  },
  {
    company: "Hinduja Group",
    role: "Sustainability Consulting Intern",
    when: "May to Jul 2025",
    deep: "#0F3D2E",
    bright: "#8FE0B0",
    summary:
      "Designed a Net Zero roadmap reviewed by CXOs, and received a Letter of Recommendation from the Chief Sustainability Officer of the $40B+ group.",
    points: [
      "Shaped a roadmap of 20+ initiatives across 5 sectors",
      "Benchmarked 8 conglomerates across 10+ sustainability KPIs",
      "Assessed 15+ low-carbon technologies and shortlisted 8 for adoption",
      "Reviewed ESG maturity across 12 group firms and identified 6 gaps",
    ],
  },
  {
    company: "EdMe",
    role: "UI/UX Intern, AI learning platform for competitive exams",
    when: "Nov 2025 to Jan 2026",
    deep: "#5C2500",
    bright: "#FFB27D",
    summary: "Researched, designed and helped build the app and website for learners preparing for UPSC, JEE and NEET.",
    points: [
      "Built the mobile app in Flutter and the website in React for 5,000+ active learners",
      "Designed 12-screen flows and AI features that made navigation 20% more efficient",
      "Defined the roadmap to grow coverage from 1 exam category to 3",
    ],
  },
];

// Each role leads with its biggest number, draws one of its counts as marks, and has its own colour pair and symbol.
export const leadership = [
  {
    title: "Institute System Administrator",
    where: "IIT Bombay",
    when: "Jul 2026 to now",
    deep: "#0E2C6E",
    bright: "#9DC3FF",
    glyph: "servers" as const,
    link: { label: "See the Hostel Affairs site I built", href: "/work/hostel-affairs" },
    number: "13,000+",
    numberLabel: "students connected to support portals through the Gymkhana platform I built",
    text: "The technical bridge between the Computer Centre and students. I run network operations for 10,000+ residents and manage hosting and deployment for 15+ student councils.",
    marks: { total: 21, on: 21, cols: 7, square: true, caption: "21 hostels on the network" },
  },
  {
    title: "Manager, Sustainability Cell",
    where: "Web and Design",
    when: "May 2025 to Apr 2026",
    deep: "#143D27",
    bright: "#86DDA0",
    glyph: "leaf" as const,
    number: "800+",
    numberLabel: "students reached by the AI co-pilot and carbon calculator",
    text: "Led the Cell's technical work: a rebuilt website, a 100-parameter footprint calculator and a waste-reporting platform that feeds IIT Bombay's sustainability report.",
    marks: { total: 23, on: 23, cols: 8, square: false, caption: "A 23-member team across three tiers" },
  },
  {
    title: "Manager, Yogastha",
    where: "Institute Sports Council",
    when: "Apr 2025 to Apr 2026",
    deep: "#5C2500",
    bright: "#FFB27D",
    glyph: "sun" as const,
    number: "300+",
    numberLabel: "attendees at International Day of Yoga, run with the Ministry of Ayush",
    text: "Co-led the team responsible for physical and mental wellness on campus. We ran 15+ events and 10+ competitions and grew the club's outreach by 20%.",
    marks: { total: 20, on: 20, cols: 10, square: false, caption: "A 20-member team" },
  },
  {
    title: "ISMP and DAMP Mentor",
    where: "Student Mentorship Program",
    when: "May 2025 to now",
    deep: "#2A1869",
    bright: "#C4B0FF",
    glyph: "orbit" as const,
    number: "3 of 45",
    numberLabel: "mentors given Special Recognition by the Dean, and I was one of them",
    text: "Mentoring 12 freshmen and 6 sophomores through their academic and campus journey, and leading the events subgroup that supports 200+ Chemical Engineering students.",
    marks: { total: 45, on: 3, cols: 9, square: false, caption: "45 mentors, 3 recognised" },
  },
];

// Each highlight belongs to a group. The group sets its colour pair, and each highlight has its own symbol.
export const groups = {
  Sport: { deep: "#5B1220", bright: "#FF9FAE" },
  Campus: { deep: "#2A1869", bright: "#C4B0FF" },
  Community: { deep: "#143D27", bright: "#86DDA0" },
  Markets: { deep: "#4A3200", bright: "#F7CF5E" },
};

export const highlights = [
  { n: "1 of 28", group: "Sport" as const, glyph: "chevrons" as const, text: "Athletes selected through institute-wide trials for the Inter-IIT camp team, in the 200 m sprint" },
  { n: "1 of 200+", group: "Campus" as const, glyph: "star" as const, text: "Residents named Hostel Sophomore of the Year, for 5+ General Championships and my work as Design Secretary" },
  { n: "1,000", group: "Community" as const, glyph: "leaf" as const, text: "Saplings planted across eco-drives, along with 200+ kg of beach waste removed" },
  { n: "19%", group: "Markets" as const, glyph: "bars" as const, text: "XIRR on a personal investment portfolio that I research, allocate and rebalance myself" },
  { n: "18", group: "Markets" as const, glyph: "book" as const, text: "Students guided through a Summer of Science project on stock market analysis, with weekly resources and quizzes" },
  { n: "160+", group: "Community" as const, glyph: "atom" as const, text: "Girls from rural India engaged through the WiSE initiative to encourage careers in STEM" },
  { n: "1,000+", group: "Campus" as const, glyph: "eye" as const, text: "Attendees at Vision, the Design Club's flagship event, where I led 2 projects" },
  { n: "2 medals", group: "Sport" as const, glyph: "medal" as const, text: "Bronze in Weightlifting and Silver in Triathlon at the General Championships, plus two Top-10 finishes in Crossy" },
];

export const toolkit = [
  { group: "Languages", items: "Python, TypeScript, JavaScript, C++, SQL, Dart" },
  { group: "Build", items: "Next.js, React, FastAPI, Flutter, Tailwind CSS, PostgreSQL, Supabase, Docker, n8n" },
  { group: "AI", items: "Gemini, Groq, Cerebras, Ollama, pgvector, RAG pipelines, TensorFlow.js" },
  { group: "Design", items: "Figma, Adobe Creative Cloud, Blender, Fusion 360" },
];

export const education = {
  school: "IIT Bombay",
  degree: "B.Tech in Chemical Engineering, 2023 to 2027",
  minor: "Minor in Entrepreneurship, Desai Sethi School of Entrepreneurship",
};

// The two roles I am looking for, each with its strongest evidence and the résumé written for it.
export const roles = [
  {
    title: "AI product manager",
    fit: "I find the problem, decide what to build and measure whether it worked. I have done that as a founder and as a CTO.",
    proof: [
      { n: "5 apps", text: "Founded Golash and took five apps for Indian college students from idea to launch" },
      { n: "1 to 3", text: "Defined the EdMe roadmap that grows coverage from one exam category to three" },
      { n: "31% to 63%", text: "Raised the clean-pass rate of a 10-agent assistant across 16 evaluation scenarios at Accenture" },
    ],
    resume: { name: "product résumé", file: "/Krishna-Gahlod-Resume.pdf" },
  },
  {
    title: "Forward deployed engineer",
    fit: "I build AI systems around a real user's problem, and I run what I build.",
    proof: [
      { n: "10 agents", text: "Built a telecom assistant on Google's CX Agent Studio at Accenture, with 0.4 second handoffs" },
      { n: "12 stages", text: "Built the research pipeline at Gnaan U that finds and screens teaching methods through 4 gates" },
      { n: "13,000+", text: "Students connected to support portals through the platform I built as Institute System Administrator" },
    ],
    resume: { name: "engineering résumé", file: "/Krishna-Gahlod-Resume-Tech.pdf" },
  },
];

// Résumés for the other roles I am open to.
export const moreResumes = [
  { name: "Consulting résumé", file: "/Krishna-Gahlod-Resume-Consulting.pdf" },
  { name: "Finance résumé", file: "/Krishna-Gahlod-Resume-Finance.pdf" },
];
