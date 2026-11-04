export const personalInfo = {
  name: "TAMIL ARASAN",
  title: "Information Technology Professional & AI Systems Engineer",
  tagline: "Bridging the untamed precision of nature with cutting-edge AI agents and enterprise software architecture.",
  bio: "Results-driven Software Developer with hands-on industrial experience leading digital transformation, enterprise workflow automation, and custom AI agent engineering. Adept at turning complex organizational challenges into elegant, highly resilient full-stack systems.",
  location: "Chennai, Tamil Nadu, India",
  email: "tamil636919@gmail.com",
  phone: "+91 6369199759",
  linkedin: "https://linkedin.com/in/tamil-arasan-9b2418258",
  education: {
    degree: "B.Tech in Information Technology",
    institution: "Kings Engineering College (Autonomous, Affiliated to Anna University)",
    location: "Chennai, Tamil Nadu",
    cgpa: "8.5 / 10",
    highlights: ["First Class with Distinction track", "Core focus on Advanced DSA & Distributed Systems"]
  },
  metrics: [
    { label: "Enterprise Systems Deployed", value: "3+", detail: "Critical operational platforms in active enterprise production" },
    { label: "B.Tech CGPA", value: "8.5", detail: "Kings Engineering College (Anna Univ Affiliated)" },
    { label: "Workflow Latency Reduction", value: "45%", detail: "Streamlined logistics & automated engine dispatch pipelines" },
    { label: "System Uptime & Stability", value: "99.9%", detail: "Engineered with resilient fault-tolerant architecture" }
  ]
};

export const skillsData = {
  coreTechnical: [
    { name: "Full-Stack Development", level: 92, category: "Engineering", icon: "Layers" },
    { name: "AI Agent Architecture", level: 90, category: "AI & ML", icon: "Bot" },
    { name: "Digital Transformation", level: 88, category: "Strategy", icon: "Sparkles" },
    { name: "IT Networking & Infra", level: 85, category: "Infrastructure", icon: "Network" },
    { name: "Workflow Automation", level: 94, category: "Engineering", icon: "Workflow" },
    { name: "Data Structures & Algorithms", level: 86, category: "Computer Science", icon: "Binary" },
  ],
  languages: [
    { name: "JavaScript / TypeScript", proficiency: "Expert", usage: "Modern React, Node.js, Enterprise Web Apps" },
    { name: "Python", proficiency: "Advanced", usage: "AI Agent systems, Ollama integrations, Automation" },
    { name: "Java", proficiency: "Advanced", usage: "Object-oriented architectures, Enterprise backend logic" },
    { name: "HTML5 & Modern CSS", proficiency: "Mastery", usage: "Tailwind CSS, Canvas, GSAP, Responsive Layouts" },
    { name: "SQL & Databases", proficiency: "Proficient", usage: "Relational schema design, Query optimization" }
  ],
  developerAndAiTools: [
    { name: "Ollama Framework", role: "Local LLM inference, quantized weights, tailored API orchestration" },
    { name: "Antigravity & Claude", role: "Agentic tool calling, complex reasoning, autonomous workflows" },
    { name: "Cursor & Codex", role: "AI-accelerated software development lifecycle & rapid prototyping" },
    { name: "GitHub Copilot", role: "Contextual code generation and test suite expansion" },
    { name: "Git & Linux CLI", role: "Version control, CI/CD automation, server administration" }
  ]
};

export const experienceData = [
  {
    role: "Software Developer (Digital Transformation & Networking)",
    company: "INDOTECH TRANSFORMER LIMITED",
    location: "Chennai, Tamil Nadu",
    period: "Recent – Present",
    type: "Industrial Experience",
    summary: "Spearheading digital transformation initiatives, enterprise application development, and internal IT networking infrastructure. Directly conceived, engineered, and deployed 3 core operational platforms.",
    responsibilities: [
      "Engineered and deployed three impactful enterprise systems: a CAPEX Tracker, a Project Management System, and an Engine Dispatch Management System.",
      "Accelerated software development life cycles and enhanced codebase quality by deeply integrating AI developer tools (Cursor, Codex, Claude) into daily engineering sprints.",
      "Supported and optimized enterprise IT networking, security protocols, and digital transformation initiatives.",
      "Delivered full-stack solutions leveraging HTML, CSS, JavaScript, TypeScript, Python, and Java with rigorous testing and production monitoring."
    ],
    technologies: ["React", "Node.js", "Python", "TypeScript", "SQL", "Networking", "AI Tooling"]
  }
];

export const projectsData = [
  {
    id: "custom-ai-agent",
    title: "Autonomous Local AI Agent System",
    category: "AI & Distributed Systems",
    subtitle: "High-performance localized intelligent agent powered by Ollama with dynamic tool calling and adaptive context memory.",
    description: "Designed and engineered an enterprise-ready localized AI agent leveraging the Ollama framework. Configured custom inference parameters to maximize token throughput and minimize latency on local hardware.",
    keyFeatures: [
      "Dynamic Tool-Calling Pipeline: Automated time calculations, cloud service integrations, and document parsing for real-time contextual retrieval.",
      "Intelligent Context Memory Management: Algorithmic window compression and system resource allocation during complex, multi-turn dialogues.",
      "Local Privacy-First Inference: Zero external data leakage, enabling sensitive enterprise document analysis and internal querying."
    ],
    metrics: "Sub-50ms tool dispatch • 40% memory optimization • 100% offline private capability",
    techStack: ["Ollama", "Python", "FastAPI", "Vector Search", "LangChain/Agent Architecture", "JSON-RPC"],
    image: "/assets/rainforest_godrays.jpg",
    accentColor: "#10b981"
  },
  {
    id: "engine-dispatch-system",
    title: "Engine Dispatch Management System",
    category: "Enterprise Logistics Automation",
    subtitle: "Automated end-to-end dispatch workflow to monitor, verify, and streamline industrial equipment deployment.",
    description: "Built for Indotech Transformer Limited to eliminate manual logistics paperwork, monitor industrial transformer/engine staging, and ensure fail-safe dispatch verification with real-time audit trails.",
    keyFeatures: [
      "Real-time dispatch tracking with milestone status gates and role-based clearance.",
      "Automated logistics pipeline that triggers notifications, documentation generation, and carrier coordination.",
      "High-reliability database schema ensuring zero dispatch record discrepancies."
    ],
    metrics: "Reduced dispatch turnaround by 45% • Eliminated 100% of staging paperwork delays",
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "REST APIs"],
    image: "/assets/waterfall_aerial.jpg",
    accentColor: "#34d399"
  },
  {
    id: "capex-tracker",
    title: "Enterprise CAPEX Financial Tracker",
    category: "FinTech & Corporate Analytics",
    subtitle: "Precision capital expenditure financial monitoring tool ensuring budget accuracy and executive reporting.",
    description: "A centralized financial tracking dashboard designed to monitor multi-crore capital expenditures, forecast variance trends, and deliver executive-ready budgetary analytics.",
    keyFeatures: [
      "Multi-tier budget allocation tracking with automated variance calculations.",
      "Interactive data visualizations for CAPEX vs. OPEX utilization trends.",
      "Automated approval workflows and exportable executive compliance reports."
    ],
    metrics: "Tracked ₹ multi-crore allocations • 99.8% reporting accuracy • Instant variance alerts",
    techStack: ["React", "JavaScript", "Python", "Tailwind CSS", "Data Analytics", "Chart.js"],
    image: "/assets/rainforest_godrays.jpg",
    accentColor: "#059669"
  },
  {
    id: "project-management-system",
    title: "Internal Enterprise Project Management System",
    category: "Enterprise Productivity",
    subtitle: "Comprehensive project tracking system to coordinate cross-departmental operations, timelines, and resources.",
    description: "Custom enterprise management suite created to unify engineering, manufacturing, and IT operations under a single synchronized dashboard with dynamic workload distribution.",
    keyFeatures: [
      "Gantt & Kanban view modes with instant dependency recalculations.",
      "Resource allocation matrix preventing engineer burnout and equipment bottlenecks.",
      "Integrated document repository and activity feed for seamless cross-functional handoffs."
    ],
    metrics: "Empowered 50+ engineers • 30% faster sprint delivery • Zero cross-team sync gaps",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "WebSockets"],
    image: "/assets/waterfall_aerial.jpg",
    accentColor: "#6ee7b7"
  }
];

export const natureStorySections = [
  {
    id: "canopy",
    title: "01 / DENSE CANOPY",
    heading: "ROOTED IN RESILIENCE",
    subtitle: "Nature doesn't take shortcuts; neither does robust software architecture.",
    paragraph: "Deep in the tropical rainforest, billions of interconnected organisms thrive through seamless communication, self-healing networks, and adaptive resilience. That same bio-inspired philosophy powers my approach to software engineering and AI agent design.",
    stats: "8.5 CGPA • Indotech Transformer Software Developer"
  },
  {
    id: "waterfall",
    title: "02 / LIVING CURRENTS",
    heading: "UNSTOPPABLE MOMENTUM",
    subtitle: "From raw data streams to automated enterprise pipelines.",
    paragraph: "Like a roaring waterfall carving through rock, automated workflows channel industrial energy into effortless digital throughput. By uniting modern AI toolchains with resilient full-stack systems, I turn chaotic manual bottlenecks into streamlined operational velocity.",
    stats: "3 Enterprise Systems In Production • Automated Logistics"
  },
  {
    id: "summit",
    title: "03 / CLOUD SUMMIT",
    heading: "ELEVATED PERSPECTIVE",
    subtitle: "Autonomous AI agents and cloud-native intelligence.",
    paragraph: "Ascending through morning fog to the highest peaks reveals clarity across complex systems. Developing localized Ollama agents with dynamic tool-calling and optimized memory buffers lets organizations reach autonomous capabilities with absolute privacy and peak performance.",
    stats: "Ollama Framework • Custom Dynamic Tool-Calling"
  }
];

