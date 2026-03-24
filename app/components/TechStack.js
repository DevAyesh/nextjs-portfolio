"use client";

import { useRef, useState, useEffect } from "react";
import {
  FaReact, FaNodeJs, FaDocker, FaGithub, FaCode, FaDatabase, FaServer, FaTools, FaRobot, FaCloud, FaAndroid,
  FaHtml5, FaCss3Alt
} from "react-icons/fa";
import {
  SiNextdotjs, SiExpress, SiDjango, SiFastapi,
  SiMongodb, SiMysql, SiTensorflow, SiPytorch, SiNumpy, SiPandas, SiScikitlearn,
  SiPostman, SiJupyter
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import VariableProximity from "./VariableProximity";

// Brand colors for each technology (signature glow on hover)
const TECH_COLORS = {
  "React":            "#61DAFB",
  "Next.js":          "#ffffff",
  "JavaScript":       "#F7DF1E",
  "HTML":             "#E34F26",
  "CSS":              "#264DE4",
  "Node.js":          "#539E43",
  "Express":          "#aaaaaa",
  "Django":           "#092E20",
  "FastAPI":          "#009688",
  "MongoDB":          "#47A248",
  "MySQL":            "#4479A1",
  "TensorFlow":       "#FF6F00",
  "PyTorch":          "#EE4C2C",
  "NumPy":            "#4DABCF",
  "Pandas":           "#150458",
  "Scikit-learn":     "#F7931E",
  "GitHub":           "#ffffff",
  "GitHub Actions":   "#2088FF",
  "VS Code":          "#007ACC",
  "Docker":           "#2496ED",
  "Postman":          "#FF6C37",
  "Android Studio":   "#3DDC84",
  "Jupyter Notebook": "#F37626",
  "Google Cloud Console": "#4285F4",
};

const techStack = [
  {
    title: "Frontend Technologies",
    icon: FaCode,
    items: [
      { label: "React",      icon: FaReact },
      { label: "Next.js",    icon: SiNextdotjs },
      { label: "JavaScript", icon: IoLogoJavascript },
      { label: "HTML",       icon: FaHtml5 },
      { label: "CSS",        icon: FaCss3Alt },
    ],
  },
  {
    title: "Backend Technologies",
    icon: FaServer,
    items: [
      { label: "Node.js",  icon: FaNodeJs },
      { label: "Express",  icon: SiExpress },
      { label: "Django",   icon: SiDjango },
      { label: "FastAPI",  icon: SiFastapi },
    ],
  },
  {
    title: "Database",
    icon: FaDatabase,
    items: [
      { label: "MongoDB", icon: SiMongodb },
      { label: "MySQL",   icon: SiMysql },
    ],
  },
  {
    title: "Machine Learning",
    icon: FaRobot,
    items: [
      { label: "TensorFlow",   icon: SiTensorflow },
      { label: "PyTorch",      icon: SiPytorch },
      { label: "NumPy",        icon: SiNumpy },
      { label: "Pandas",       icon: SiPandas },
      { label: "Scikit-learn", icon: SiScikitlearn },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: FaTools,
    items: [
      { label: "GitHub",               icon: FaGithub },
      { label: "GitHub Actions",        icon: FaGithub },
      { label: "VS Code",              icon: FaCode },
      { label: "Docker",               icon: FaDocker },
      { label: "Postman",              icon: SiPostman },
      { label: "Android Studio",       icon: FaAndroid },
      { label: "Jupyter Notebook",     icon: SiJupyter },
      { label: "Google Cloud Console", icon: FaCloud },
    ],
  },
];

// ── Pill component ─────────────────────────────────────────────────────────
function TechPill({ item }) {
  const [hovered, setHovered] = useState(false);
  const color = TECH_COLORS[item.label] || "#ffffff";

  return (
    <div
      className="ts-pill"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered 
          ? `0 12px 30px rgba(0,0,0,0.6), inset 0 0 0 1px ${color}99` 
          : "0 4px 12px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.03)",
        borderColor: "transparent",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        background: hovered ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.02)",
        cursor: "default",
        transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, background 0.3s ease"
      }}
    >
      <item.icon
        className="ts-pill-icon"
        style={{
          filter: hovered ? "grayscale(0%) opacity(1)" : "grayscale(100%) opacity(0.45)",
          color: hovered ? color : "#ffffff",
          fontSize: "1.3rem",
          transition: "filter 0.4s ease, color 0.4s ease",
        }}
      />
      <span className="ts-pill-label">{item.label}</span>
    </div>
  );
}

// ── Category Row component ─────────────────────────────────────────────────
function CategoryRow({ category }) {
  return (
    <div className="ts-row">
      <div className="ts-row-header">
        <category.icon className="ts-row-icon" />
        <h3 className="ts-row-title">{category.title}</h3>
      </div>
      <div className="ts-pill-grid">
        {category.items.map((item) => (
          <TechPill key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

// ── Main TechStack Section: Bento Studio Style ─────────────────────────────
export default function TechStack({ skillsRef }) {
  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);
  const hasAnimated = useRef(false);

  // Soft White Interactive Spotlight Over Everything
  useEffect(() => {
    const section = sectionRef.current;
    const spotlight = spotlightRef.current;
    if (!section || !spotlight) return;

    let rafId;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        spotlight.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        spotlight.style.opacity = "1";
      });
    };

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      spotlight.style.opacity = "0";
    };

    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Anime.js scroll-triggered animation ────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector('.ts-heading');
    const rows = section.querySelectorAll('.ts-row');
    const pills = section.querySelectorAll('.ts-pill');

    const hideAll = () => {
      if (heading) {
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(30px) scale(0.95)';
      }
      rows.forEach(r => {
        r.style.opacity = '0';
        r.style.transform = 'translateY(40px)';
      });
      pills.forEach(p => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px) scale(0.92)';
      });
    };
    
    hideAll(); // Pre-hide initially

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import('animejs').then(({ animate, stagger, createTimeline }) => {
            const tl = createTimeline({
              defaults: { ease: 'out(3)' },
              autoplay: true,
            });

            if (heading) {
              tl.add(heading, { opacity: [0, 1], y: [30, 0], scale: [0.95, 1], duration: 700 });
            }
            if (rows.length) {
              tl.add(rows, { opacity: [0, 1], y: [40, 0], duration: 600, delay: stagger(100) }, '-=400');
            }
            if (pills.length) {
              tl.add(pills, { opacity: [0, 1], y: [20, 0], scale: [0.92, 1], duration: 500, delay: stagger(40) }, '-=300');
            }
          }).catch(err => console.warn('animejs load failed', err));
        } else {
          hideAll(); // Reset state when scrolling out
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="section-padding ts-section"
      ref={(el) => {
        sectionRef.current = el;
        if (skillsRef) skillsRef.current = el;
      }}
    >
      {/* Liquid Gold Blob */}
      <div className="ts-liquid-gold" />

      {/* Liquid Indigo Blob */}
      <div className="ts-liquid-indigo" />

      {/* Liquid White Subtle Blob */}
      <div className="ts-liquid-white" />

      {/* Interactive Spotlight Overlay */}
      <div 
        className="ts-spotlight" 
        ref={spotlightRef} 
        aria-hidden="true" 
        style={{ zIndex: 2, opacity: 0, transition: 'opacity 0.3s ease' }} 
      />

      <div className="container position-relative" style={{ zIndex: 3 }}>
        {/* Metallic heading */}
        <h2 className="ts-heading display-5 fw-bold text-center mb-5">
          <VariableProximity
            label="Tech Stack"
            fromFontVariationSettings="'wght' 300, 'opsz' 8"
            toFontVariationSettings="'wght' 900, 'opsz' 72"
            containerRef={skillsRef || sectionRef}
            radius={200}
            falloff="exponential"
          />
        </h2>

        {/* Category rows */}
        <div className="ts-list">
          {techStack.map((category, catIdx) => (
            <CategoryRow key={category.title} category={category} catIdx={catIdx} />
          ))}
        </div>
      </div>
    </section>
  );
}
