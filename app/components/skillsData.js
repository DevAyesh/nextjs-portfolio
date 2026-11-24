/**
 * skillsData.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source-of-truth for the Tech Stack section.
 * Edit name, level, usedIn, or featured here — no JSX changes needed.
 *
 * Schema per skill:
 *   name     – display label
 *   category – "frontend" | "backend" | "database" | "ml" | "devops"
 *   icon     – react-icons component
 *   color    – brand hex used for icon glow + chip accent
 *   level    – short level badge shown on core cards
 *   usedIn   – projects shown in tooltip (keep ≤ 3 words each)
 *   featured – true → appears in the Core Strip at the top
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  FaReact, FaNodeJs, FaDocker, FaGithub, FaCode,
  FaDatabase, FaServer, FaTools, FaRobot, FaCloud,
  FaAndroid, FaHtml5, FaCss3Alt, FaJava, FaPython,
} from "react-icons/fa";
import {
  SiNextdotjs, SiExpress, SiDjango, SiFastapi,
  SiMongodb, SiMysql, SiTensorflow, SiPytorch,
  SiNumpy, SiPandas, SiScikitlearn, SiPostman,
  SiJupyter, SiTypescript, SiTailwindcss,
  SiSpringboot, SiGraphql, SiKubernetes,
  SiGithubactions, SiVscodium,
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";

/* ── All skills ────────────────────────────────────────────────────────────── */
export const skills = [

  /* ── FRONTEND ── */
  {
    name: "React",
    category: "frontend",
    icon: FaReact,
    color: "#61DAFB",
    level: "Daily use",
    usedIn: ["Portfolio", "AppStruct"],
    featured: true,
  },
  {
    name: "Next.js",
    category: "frontend",
    icon: SiNextdotjs,
    color: "#ffffff",
    level: "Daily use",
    usedIn: ["Portfolio", "AppStruct"],
    featured: true,
  },
  {
    name: "JavaScript",
    category: "frontend",
    icon: IoLogoJavascript,
    color: "#F7DF1E",
    level: "Core skill",
    usedIn: ["Portfolio", "Contact API"],
    featured: false,
  },
  {
    name: "TypeScript",
    category: "frontend",
    icon: SiTypescript,
    color: "#3178C6",
    level: "Strong",
    usedIn: ["AppStruct"],
    featured: false,
  },
  {
    name: "HTML",
    category: "frontend",
    icon: FaHtml5,
    color: "#E34F26",
    level: "Core skill",
    usedIn: ["Portfolio", "AppStruct"],
    featured: false,
  },
  {
    name: "CSS",
    category: "frontend",
    icon: FaCss3Alt,
    color: "#264DE4",
    level: "Core skill",
    usedIn: ["Portfolio"],
    featured: false,
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    icon: SiTailwindcss,
    color: "#06B6D4",
    level: "Strong",
    usedIn: ["AppStruct"],
    featured: false,
  },

  /* ── BACKEND ── */
  {
    name: "Node.js",
    category: "backend",
    icon: FaNodeJs,
    color: "#539E43",
    level: "Daily use",
    usedIn: ["Contact API", "AppStruct"],
    featured: true,
  },
  {
    name: "Express",
    category: "backend",
    icon: SiExpress,
    color: "#68A063",
    level: "Daily use",
    usedIn: ["Contact API", "REST APIs"],
    featured: true,
  },
  {
    name: "Python",
    category: "backend",
    icon: FaPython,
    color: "#3776AB",
    level: "Strong",
    usedIn: ["Credit Risk ML", "FastAPI"],
    featured: false,
  },
  {
    name: "Django",
    category: "backend",
    icon: SiDjango,
    color: "#44B78B",
    level: "Strong",
    usedIn: ["Web Projects"],
    featured: false,
  },
  {
    name: "FastAPI",
    category: "backend",
    icon: SiFastapi,
    color: "#009688",
    level: "Strong",
    usedIn: ["Credit Risk ML"],
    featured: false,
  },
  {
    name: "Java",
    category: "backend",
    icon: FaJava,
    color: "#f89820",
    level: "Core skill",
    usedIn: ["Veg Marketplace App"],
    featured: true,
  },

  /* ── DATABASE ── */
  {
    name: "MongoDB",
    category: "database",
    icon: SiMongodb,
    color: "#47A248",
    level: "Daily use",
    usedIn: ["Contact API", "AppStruct"],
    featured: true,
  },
  {
    name: "MySQL",
    category: "database",
    icon: SiMysql,
    color: "#4479A1",
    level: "Strong",
    usedIn: ["SmartInventory AWS"],
    featured: false,
  },

  /* ── ML & DATA ── */
  {
    name: "TensorFlow",
    category: "ml",
    icon: SiTensorflow,
    color: "#FF6F00",
    level: "Strong",
    usedIn: ["Credit Risk ML"],
    featured: false,
  },
  {
    name: "PyTorch",
    category: "ml",
    icon: SiPytorch,
    color: "#EE4C2C",
    level: "Strong",
    usedIn: ["ML Projects"],
    featured: false,
  },
  {
    name: "NumPy",
    category: "ml",
    icon: SiNumpy,
    color: "#4DABCF",
    level: "Core skill",
    usedIn: ["Credit Risk ML"],
    featured: false,
  },
  {
    name: "Pandas",
    category: "ml",
    icon: SiPandas,
    color: "#E70488",
    level: "Core skill",
    usedIn: ["Credit Risk ML"],
    featured: false,
  },
  {
    name: "Scikit-learn",
    category: "ml",
    icon: SiScikitlearn,
    color: "#F7931E",
    level: "Strong",
    usedIn: ["Credit Risk ML"],
    featured: false,
  },

  /* ── DEVOPS / TOOLS ── */
  {
    name: "Docker",
    category: "devops",
    icon: FaDocker,
    color: "#2496ED",
    level: "Strong",
    usedIn: ["SmartInventory AWS"],
    featured: false,
  },
  {
    name: "GitHub",
    category: "devops",
    icon: FaGithub,
    color: "#ffffff",
    level: "Daily use",
    usedIn: ["All projects"],
    featured: false,
  },
  {
    name: "GitHub Actions",
    category: "devops",
    icon: SiGithubactions,
    color: "#2088FF",
    level: "Strong",
    usedIn: ["CI/CD pipelines"],
    featured: false,
  },
  {
    name: "VS Code",
    category: "devops",
    icon: SiVscodium,
    color: "#007ACC",
    level: "Daily use",
    usedIn: ["All projects"],
    featured: false,
  },
  {
    name: "Postman",
    category: "devops",
    icon: SiPostman,
    color: "#FF6C37",
    level: "Daily use",
    usedIn: ["API testing"],
    featured: false,
  },
  {
    name: "Android Studio",
    category: "devops",
    icon: FaAndroid,
    color: "#3DDC84",
    level: "Strong",
    usedIn: ["Veg Marketplace App"],
    featured: false,
  },
  {
    name: "Jupyter",
    category: "devops",
    icon: SiJupyter,
    color: "#F37626",
    level: "Strong",
    usedIn: ["Credit Risk ML"],
    featured: false,
  },
  {
    name: "Google Cloud",
    category: "devops",
    icon: FaCloud,
    color: "#4285F4",
    level: "Strong",
    usedIn: ["SmartInventory AWS"],
    featured: false,
  },
];

/* ── Currently learning ────────────────────────────────────────────────────── */
export const learningSkills = [
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  { name: "GraphQL",     icon: SiGraphql,    color: "#E10098" },
  { name: "Kubernetes",  icon: SiKubernetes, color: "#326CE5" },
];

/* ── Filter tab definitions ──────────────────────────────────────────────────
 * "devops" category is excluded from bento (shown in marquee instead).
 * ─────────────────────────────────────────────────────────────────────────── */
export const FILTER_TABS = [
  { id: "all",      label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend",  label: "Backend" },
  { id: "database", label: "Database" },
  { id: "ml",       label: "ML & Data" },
];

/* ── Bento card sizes ────────────────────────────────────────────────────────
 * Controls how many columns / rows a category card spans.
 * ─────────────────────────────────────────────────────────────────────────── */
export const BENTO_SIZE = {
  frontend: "wide",   // span 2 cols
  backend:  "wide",   // span 2 cols
  database: "normal",
  ml:       "tall",   // span 2 rows
};

/* ── Core strip skills (ordered display) ──────────────────────────────────── */
export const coreSkills = skills.filter((s) => s.featured);
