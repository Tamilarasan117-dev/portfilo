/**
 * TAMILARASAN — Centralized Portfolio Data Store
 * All 7 districts retrieve their structured content from here.
 * Fully editable and synchronized with Tamil Arasan's verified credentials.
 */

export const PORTFOLIO_DATA = {
  identity: {
    name: "TAMIL ARASAN",
    title: "Information Technology Professional & Software Developer",
    tagline: "Bridging Full-Stack Engineering, Digital Transformation, IT Networking & AI Agent Architecture",
    location: "Chennai, Tamil Nadu, India",
    email: "tamil636919@gmail.com",
    phone: "+91 6369199759",
    linkedin: "https://linkedin.com/in/tamil-arasan-9b2418258",
    github: "https://github.com/tamil-arasan",
    status: "Available for High-Impact Software Engineering Roles",
    bio: "Results-driven Information Technology professional with hands-on industrial experience driving digital transformation and networking initiatives. Experienced in merging robust IT networking with full-stack software engineering to optimize core business operations. Adept at accelerating software development life cycles and enhancing code quality by integrating advanced AI developer tools into daily workflows.",
    careerGoals: "Architecting high-scale distributed systems, pioneering agentic AI workflow automation, and engineering resilient digital platforms."
  },

  districts: [
    {
      id: "about",
      districtNumber: 1,
      name: "ABOUT ME DISTRICT",
      shortTitle: "About Me",
      tagline: "Identity & Philosophy",
      themeColor: "#00f0ff",
      worldPosition: [-35, 0, -25],
      beaconRadius: 10,
      description: "Landmark headquarters representing Tamil Arasan's technical identity, background, and professional ethos.",
      highlights: [
        { label: "Role", value: "Software Developer & Digital Transformation" },
        { label: "Base", value: "Chennai, Tamil Nadu" },
        { label: "Specialization", value: "Full-Stack, IT Networking & AI Agents" },
        { label: "Degree", value: "B.Tech IT (CGPA: 8.5 / 10)" }
      ]
    },
    {
      id: "education",
      districtNumber: 2,
      name: "ACADEMIC CAMPUS",
      shortTitle: "Education",
      tagline: "Knowledge & Foundations",
      themeColor: "#3b82f6",
      worldPosition: [35, 0, -25],
      beaconRadius: 10,
      description: "University-inspired learning sector representing academic qualifications and core CS foundations.",
      items: [
        {
          degree: "B.Tech. in Information Technology",
          institution: "Kings Engineering College (Autonomous, Affiliated to Anna University)",
          location: "Chennai, Tamil Nadu",
          grade: "CGPA: 8.5 / 10",
          highlights: [
            "Data Structures & Algorithms (DSA) Mastery",
            "Operating Systems, Computer Networks & Database Management",
            "Autonomous Campus Academic Distinction"
          ]
        }
      ],
      languages: [
        { name: "Tamil", proficiency: "Native" },
        { name: "English", proficiency: "Professional Working Proficiency" }
      ]
    },
    {
      id: "skills",
      districtNumber: 3,
      name: "TECH MATRIX TOWER",
      shortTitle: "Skills & Tech",
      tagline: "Stack & Capabilities",
      themeColor: "#10b981",
      worldPosition: [-45, 0, 15],
      beaconRadius: 10,
      description: "Futuristic technology spire showcasing programming languages, frameworks, developer tools, and networking infrastructure.",
      categories: [
        {
          name: "Programming Languages",
          skills: ["JavaScript", "TypeScript", "Python", "Java", "HTML5", "CSS3"]
        },
        {
          name: "Full-Stack & Frontend",
          skills: ["React.js", "Three.js", "Vite", "RESTful APIs", "Tailwind CSS", "Responsive UI/UX"]
        },
        {
          name: "Enterprise & Networking",
          skills: ["IT Networking", "Digital Transformation", "Workflow Automation", "Systems Integration", "DSA"]
        },
        {
          name: "Development & AI Tools",
          skills: ["Antigravity", "Ollama Framework", "Cursor", "GitHub Copilot", "Codex", "Claude", "Git/GitHub"]
        }
      ]
    },
    {
      id: "projects",
      districtNumber: 4,
      name: "INNOVATION LABS",
      shortTitle: "Projects",
      tagline: "Interactive Showcases",
      themeColor: "#f59e0b",
      worldPosition: [45, 0, 15],
      beaconRadius: 10,
      description: "Hub of production-grade systems, automated business solutions, and AI agent architectures.",
      projectsList: [
        {
          title: "Custom AI Agent System",
          category: "Artificial Intelligence & Tool Automation",
          description: "Engineered a localized AI agent utilizing the Ollama framework, configuring custom API parameters to maximize model inference speed and performance. Integrated advanced tool-calling capabilities including automated time calculations, cloud service integrations, and dynamic document retrieval with context window memory optimization.",
          technologies: ["Ollama Framework", "Python", "AI Agent Architecture", "Tool-Calling APIs", "Context Optimization"],
          type: "Enterprise AI System",
          status: "Completed & Deployed"
        },
        {
          title: "Project Management System",
          category: "Enterprise Full-Stack Application",
          description: "Built a centralized system to track, manage, and optimize ongoing internal business projects, timelines, team allocations, and milestone deliverables across engineering departments.",
          technologies: ["Full-Stack Engineering", "TypeScript", "React", "Workflow Automation", "Database Design"],
          type: "Operational Enterprise Software",
          status: "Deployed in Production"
        },
        {
          title: "Engine Dispatch Management System",
          category: "Industrial Workflow & Logistics",
          description: "Developed an automated dispatch workflow system to monitor, track, and streamline the engine deployment, testing verification, and logistics dispatch pipeline with real-time status reporting.",
          technologies: ["Python", "Automation", "Database Integration", "Industrial Logistics"],
          type: "Logistics Optimization",
          status: "Deployed in Production"
        },
        {
          title: "CAPEX Tracker",
          category: "Financial Analytics & Tracking",
          description: "Created an enterprise financial tracking tool to monitor capital expenditures, streamline approval hierarchies, and enhance forecast budget accuracy across manufacturing and digital operations.",
          technologies: ["Data Analysis", "Full-Stack Web", "Financial Modeling", "Reporting Dashboards"],
          type: "FinTech & Operations",
          status: "Deployed in Production"
        }
      ]
    },
    {
      id: "experience",
      districtNumber: 5,
      name: "CORPORATE PLAZA",
      shortTitle: "Experience",
      tagline: "Industrial Track Record",
      themeColor: "#8b5cf6",
      worldPosition: [-35, 0, 50],
      beaconRadius: 10,
      description: "Corporate headquarters spotlighting industrial achievements and digital transformation engineering.",
      experiences: [
        {
          company: "INDOTECH TRANSFORMER LIMITED",
          role: "Software Developer (Digital Transformation & Networking)",
          location: "Chennai, Tamil Nadu",
          duration: "Present",
          responsibilities: [
            "Engineered and deployed impactful enterprise systems to streamline organizational efficiency, operational throughput, and system reliability.",
            "Accelerated software development life cycles and enhanced code quality by integrating AI developer tools (Cursor, Codex, Claude, Antigravity) into daily engineering workflows.",
            "Supported and optimized internal IT networking, server health, and end-to-end digital transformation initiatives across departments.",
            "Handled end-to-end full-stack development tasks utilizing HTML, CSS, JavaScript, TypeScript, Python, and Java.",
            "Successfully delivered three critical operational enterprise solutions: CAPEX Tracker, Project Management System, and Engine Dispatch Management System."
          ]
        }
      ]
    },
    {
      id: "achievements",
      districtNumber: 6,
      name: "HALL OF TRIUMPH",
      shortTitle: "Achievements",
      tagline: "Milestones & Distinction",
      themeColor: "#ec4899",
      worldPosition: [35, 0, 50],
      beaconRadius: 10,
      description: "Grand exhibition dome celebrating high-impact deployments, technical milestones, and academic honors.",
      awards: [
        {
          title: "3x Enterprise Systems Deployed",
          organization: "Indotech Transformer Limited",
          description: "Successfully architected, programmed, and rolled out three mission-critical industrial software systems adopted for daily plant and business operations."
        },
        {
          title: "Academic Distinction — CGPA 8.5 / 10",
          organization: "Kings Engineering College / Anna University",
          description: "Graduated with top-tier academic standing in Information Technology with deep focus on algorithms, software architecture, and networking."
        },
        {
          title: "AI Developer Tool Acceleration Pioneer",
          organization: "Engineering Operations",
          description: "Championed the integration of agentic AI frameworks and LLM-driven tooling to accelerate production delivery cycles across full-stack applications."
        }
      ]
    },
    {
      id: "contact",
      districtNumber: 7,
      name: "CYBER GARAGE",
      shortTitle: "Contact Garage",
      tagline: "Connect & Collaborate",
      themeColor: "#ef4444",
      worldPosition: [0, 0, 70],
      beaconRadius: 12,
      description: "Futuristic vehicle workshop and terminal to initiate collaborations, discuss engineering opportunities, or connect directly.",
      contactInfo: {
        email: "tamil636919@gmail.com",
        phone: "+91 6369199759",
        linkedin: "https://linkedin.com/in/tamil-arasan-9b2418258",
        github: "https://github.com/tamil-arasan",
        location: "Chennai, Tamil Nadu, India"
      }
    }
  ],

  carConfig: {
    name: "CYBER-SPECTRE GT",
    brand: "TAMILARASAN RACING",
    topSpeed: 140, // km/h
    acceleration: 28,
    braking: 35,
    turnSpeed: 2.2,
    colors: {
      body: "#ffffff",
      trim: "#0d0e15",
      accent: "#00f0ff",
      glow: "#00f0ff",
      taillight: "#ff1e40"
    }
  }
};

